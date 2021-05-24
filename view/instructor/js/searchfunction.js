
$(()=>{
    
    $("#searchbar").on("keydown", (event)=>{
        $("#search-result").html("");
        $("#result-header").text("");
        if(event.which == 13) 
            searchByKeyword(event, $("#searchbar").val())  
    })
  
})

function searchByKeyword(event, key){

    event.preventDefault()
    console.log(key)
    
    //code
    //username
    //course
    //term
    //department
    
    if(key){
        console.log(key);
        $.ajax({
            url:"../../search/" + key,
            type:"GET",
            headers :{"X-Auth" : token}
        })
        .done(function(data){
            if(data.length == 0){
                $("#result-header").text('0 result(s) are found');
            }
            console.log(data);
            let index=0;
            for(var result of data){
                if(result.courseId){
                    let html = createCourseHTML(result, index);
                    $("#search-result").append(html);
                }
                else if(result.usercode){
                    let html = createUserHTML(result, index);
                    $("#search-result").append(html);
                }
                index++;
            }
            $("#result-header").text(index +' result(s) are found');
        })
    }
}
function createUserHTML(user, index){
    var html = 
    '<tr>' 
       + '<td>' + user.name +'</td>' 
       + '<td>'+ user.role +'</td>'
       + '<td>' + user.department+'</td>'
       + '<td>' + user.email + '</td>'
       + '<td class="text-center">'
          + '<button type="button" class="btn btn-info btn-xs detail-btn" data-bs-toggle="modal" data-bs-target="#stu-details' + index + '">'
          + "Details" + '</button>' 
          + '<div class="modal fade" id="stu-details'+ index +'" tabindex="-1" aria-labelledby="stu-detailsModalLabel'+ index +'" aria-hidden="true">'
           + '<div class="modal-dialog modal-dialog modal-lg modal-dialog-scrollable">'
             +  '<div class="modal-content">'
               + '<div class="modal-header">'
                    + '<h6 class="modal-title" id="stu-detailsModalLabel'+ index +'">Click out of the box to close</h6>'
               + '</div>'
               + '<div class="modal-body">'
                        + '<ul class="class-info">'
                            + '<li>Student Name: '+ user.name +'</li>'
                            + '<li>Student Code: '+ user.usercode +'</li>'
                            + '<li>Major:' + user.department +'</li>'
                            + '<li>Email: ' + user.email + '</li>'
                            + '<li>Phone:' + user.phone +'</li>'
                            + '<li>Introduction:'+ user.introduction + '</li>'
                            + '<li>Profession: '+ user.profession+ '</li>'
                        + '</ul>'
               +'</div>'
            +'</div>'
        +'</div>'
    +'</div>'
     +'</td>'
   +'</tr>';
     
          return html;
}
function createCourseHTML(course, index){
    //course or user
    let deadlineDate = new Date(course.deadline);
    let today = new Date();
    var enrollable = "";
    var deletable = "";

    let status="Open";
    if(course.enrolled >= course.capacity){
        status = 'Closed';
        enrollable = "disabled";
    }
    if(course.enrolled > 0){
        deletable = "disabled";
    }

    if(deadlineDate.getTime() + 1000*60*60*24 < today.getTime()){
        enrollable = "disabled";
        status = "Closed";
    }

    var class_time = course.time.toString().split(",");
    var time = [];
    for(let i=0;i<class_time.length;i++){
        if(i % 3 == 0){

            let hour = parseInt(class_time[i]);
            let min = class_time[i].slice(3,5);
            let time_str ="", time_str2 ="";
            
            if(hour > 12){    
                hour = hour - 12;
                time_str = hour + ":" + min + " PM - ";
            }else{
                time_str = hour + ":" + min + " AM - "
            }

            hour = parseInt(class_time[i+1]);
            min = class_time[i+1].slice(3,5);

            if(hour > 12){    
                hour = hour - 12;
                time_str2 = hour + ":" + min + " PM";
            }else{
                time_str2 = hour + ":" + min + " AM"
            }
            time.push(time_str + time_str2);
        }
        else if(i % 3 == 2){
            console.log(class_time[i].toUpperCase() +" " + time);
            time[((i+1)/3)-1] = class_time[i].toUpperCase() + "  " + time[((i+1)/3)-1] + "<br>";
        }
    }
    var deadline = course.deadline.toString().slice(0,10);

    var html = 
        '<tr>' 
           + '<td>' + course.subject +'</td>' 
           + '<td>' + course.courseId +'</td>'
           + '<td>' + time.toString() +'</td>'
           + '<td>' + course.location + '</td>'
           + '<td id="search-status'+index+'">' + status + '</td>'
           + '<td class="text-center">'
              + '<button type="button" class="btn btn-info btn-xs detail-btn" data-bs-toggle="modal" data-bs-target="#search-details' + index + '">'
              + "Details" + '</button>' 
              + '<div class="modal fade" id="search-details'+ index +'" tabindex="-1" aria-labelledby="search-detailsModalLabel'+ index +'" aria-hidden="true">'
               + '<div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">'
                 +  '<div class="modal-content">'
                        + '<div class="modal-header">'
                        + '<h5 class="modal-title" id="search-detailsModalLabel'+ index +'">Class Details</h5>'
                        + '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'
                        + '</div>'
                        + '<div class="modal-body">'
                            + '<ul class="class-info">'
                                + '<li> Class Name: '+ course.subject +'</li>'
                                + '<li>Class ID: ' + course.courseId + '</li>'
                                + '<li>Instructor Name:' + course.instName +'</li>'
                                + '<li>Department:'+ course.department+ '</li>'
                                + '<li>Time: '+ time.toString() + '</li>'
                                + '<li>Location: ' + course.location +'</li>'
                                + '<li>Enrolled & Capacity: ' + course.enrolled + ' / '+ course.capacity + '</li>'
                                + '<li>Enroll Deadline: ' + deadline+ '</li>'
                                + '<li>Description: ' + course.desc + '</li>'
                            + '</ul>'
                        +'</div>'
                        +'<button type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>'
                +'</div>'
                +'<script>'
                    + 'if($("#search-status'+index+'").text()==="Open"){'
                    +        '$("#search-status'+index+'").css({"color":"Green", "font-weight":"600"});'
                    +    '}else{'
                    +        '$("#search-status'+index+'").css({"color":"#e93d60", "font-weight":"600"});'
                    +    '}'
                    +'</script>'
                +'</div>'
            +'</div>'
         +'</td>'
       +'</tr>'

    return html;
}               