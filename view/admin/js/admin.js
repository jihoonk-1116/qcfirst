
$(()=>{
    getUsers();
})

function getUsers(){
    $.ajax({
        url:"../../admin/getusers",
        type:"GET",
    })
    .done(function(data){
        console.log(data);
        let index=0;
        for(var course of data){
            let html = createUserHTML(course, index);
            if(course.role == "student"){
                $("#stu").append(html);
            }
            else{
                $("#inst").append(html);
            }   
                    
            index++;
        }
    })
    .then(getClasses())
}

function getClasses(){
    $.ajax({
        url:"../../admin/getclasses",
        type:"GET",
    })
    .done(function(data){
        console.log(data);
        let index=0;
        for(var course of data){
            let html = createNewCourseHTML(course,index);
            $("#courses").append(html);
            index++;
        }
    })
}

function createUserHTML(user, index){
    var html = 
    '<tr>' 
       + '<td>' + user.name +'</td>' 
       + '<td>'+ user.usercode +'</td>'
       + '<td>' + user.department+'</td>'
       + '<td>' + user.email + '</td>'
       + '<td class="text-center">'
          + '<button type="button" class="btn btn-info btn-xs detail-btn" data-bs-toggle="modal" data-bs-target="#stu-details' + index + '">'
          + "Details" + '</button>' 
          + '<div class="modal fade" id="stu-details'+ index +'" tabindex="-1" aria-labelledby="stu-detailsModalLabel'+ index +'" aria-hidden="true">'
           + '<div class="modal-dialog modal-lg modal-dialog-centered">'
             +  '<div class="modal-content">'
               + '<div class="modal-header">'
                    + '<h6 class="modal-title" id="stu-detailsModalLabel'+ index +'">Click out of the box to close</h6>'
               + '</div>'
               + '<div class="modal-body">'
                        + '<ul class="class-info">'
                            + '<li>Name: '+ user.name +'</li>'
                            + '<li>Code#: '+ user.usercode +'</li>'
                            + '<li>Department:' + user.department +'</li>'
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



function createNewCourseHTML(course, index){

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

    if(deadlineDate < today){
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
           + '<td id="status'+index+'">' + status + '</td>'
           + '<td class="text-center">'
              + '<button type="button" class="btn btn-info btn-xs detail-btn" data-bs-toggle="modal" data-bs-target="#course-details' + index + '">'
              + "Details" + '</button>' 
              + '<div class="modal fade" id="course-details'+ index +'" tabindex="-1" aria-labelledby="course-detailsModalLabel'+ index +'" aria-hidden="true">'
               + '<div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">'
                 +  '<div class="modal-content">'
                   + '<div class="modal-header">'
                        + '<h5 class="modal-title" id="course-detailsModalLabel'+ index +'">Class Details</h5>'
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
                        +'<button type="button" class="btn btn-dark btn-xs" data-bs-toggle="modal" data-bs-target="#course-del'+index+'"'+deletable+'>'
        + 'Remove'
        + '</button>'
        + '<div class="modal fade" id="course-del'+index+'" tabindex="-1" aria-labelledby="course-delModalLabel'+index+'" aria-hidden="true">'
            + '<div class="modal-dialog-centered modal-dialog modal-dialog-scrollable">'
                + '<div class="modal-content">'
                    +'<div class="modal-header">'
                        +'<h5 class="modal-title" id="course-delModalLabel'+index+'">Remove Class: '+ course.subject +'</h5>'
                        +'<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'
                    +'</div>'
                    +'<div class="modal-body">'
                        +'<form>'
                            +'<label for="drop-subject'+index+'">To remove the course, type the code: <strong>'+ course.courseId+ '</strong> </label>'
                            +'<input id="drop-subject'+index+'" type="text" name="subject"></input>'
                        +'</form>'
                    +'</div>'
                    +'<input id="delete-confirm'+index+'" type="submit" class="btn btn-danger" value="Remove this class">'
                    +'<script>'
                    + 'if($("#status'+index+'").text()==="Open"){'
                    +        '$("#status'+index+'").css({"color":"Green", "font-weight":"600"});'
                    +    '}else{'
                    +        '$("#status'+index+'").css({"color":"#e93d60", "font-weight":"600"});'
                    +    '}'
                    + '$("#delete-confirm'+index+'").click((event) => {'
                    +   'var dropcode= $("#drop-subject'+index+'").val();'
                    +   'console.log("delete: " + '+ '$("#drop-subject'+index+'").val());'
                    +   'deleteClass(dropcode);'
                    +'})'
                    +'</script>'
                +'</div>'
            +'</div>'
        +'</div>'
                +'</div>'
            +'</div>'
        +'</div>'
        
         +'</td>'
       +'</tr>'

    return html;
}               