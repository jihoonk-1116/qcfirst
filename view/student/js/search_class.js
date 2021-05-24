const token = localStorage.getItem('token');
$(()=>{

    if(!token){
        alert("Please login first");
        window.location = '/';
    }

    $("#search-class-btn").click(() => {
            $("#update").html("<h3>Result<h3>");
            searchClass();
            
    })

    $("#reset").click(() => {
        window.location = '/student/html/search_class.html';
    })
})


function searchClass(){
    var term = $("#semester").val();
    var dept = $("#dept").val();
    var code = $("#code").val().toUpperCase();
    var subject = $("#subject").val();
    var inst_name = $("#inst-name").val();

    if(term != "choose" && dept != "choose" || code){
       
        $("#semester").css("border", "");
        $("#dept").css("border", "");
        $("#code").css("border", "");
       
    }
    else{
        if(term == "choose"){
            $("#semester").css("border", "solid 1px red");
        }
        if(dept == "choose"){
            $("#dept").css("border", "solid 1px red");
        }
        $("#code").css("border", "solid 1px red");
        return;
    }
    
    if(code){
        console.log(code);
        $.ajax({
            url:"../../stu/searchbycode",
            type:"POST",
            headers :{"X-Auth" : token},
            data:{
                'code':code
            }
        })
         //success
        .then(function(data){
            if(!data){
                $("#update").prepend("<h3>No Result<h3>");
            }
            console.log(data);
            var course = data;
            manipulateHTML(course,0);
            $("#update").prepend("<h3><strong>"+ course.subject + "</strong> is found<h3>");
        })

    }
    else if(term !== "choose" && dept !== "choose"){
        console.log(dept + " " + term);
        $.ajax({
            url:"../../stu/searchclass",
            type:"POST",
            data:{
                'semester':term,
                'department':dept,
            }
        })
        .done(function(data){
            let index=0;
            for(var course of data){
                if(subject){
                    let course_sub = course.subject.toUpperCase();
                    subject = subject.toUpperCase();
                    if(course_sub != subject){
                        continue;
                    }
                }
                if(inst_name){
                    let course_inst = course.instName.toUpperCase();
                    inst_name = inst_name.toUpperCase();
                    if(course_inst != inst_name){
                        continue;
                    }
                }
                console.log(course);
                manipulateHTML(course, index);
                index++;
            }
            $("#update").prepend("<h3>"+ index+ " courses are found<h3>");
        })
    }
    else{
        console.log("error");
    }
}

function enrollClass(event, code){
    event.preventDefault();
    if(!token){
        alert("Please login first");
        window.location = '/';
    }
    var courseId = code;
    courseId = courseId.toUpperCase();
    console.log(courseId);
    $.ajax({
        url:"../../stu/enrollclass",
        type:"POST",
        headers :{"X-Auth" : token},
        data:{
            'code':courseId
        },
        error:function(res){
            let err = res.responseJSON
            alert(err.error);
        }
    })
    .done(function(data){
        console.log(data);
        alert("Success to register!");
        window.location = '/student/html/search_class.html';
    })
    
}
function manipulateHTML(course,index){
    // console.log(Date.now().);
    let deadlineDate = new Date(course.deadline);
    let today = new Date();
    var enrollable = "";

    let status="Open";
    if(course.enrolled >= course.capacity){
        status = 'Closed';
        enrollable = "disabled";
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
    '<table class="table table-striped table-hover table-success custab">'
    + '<thead>'
      +'<tr>'
        +'<th>Class</th>'
        +'<th>Class code</th>'
        +'<th>Time</th>'
        +'<th>Location</th>'
        +'<th>Status</th>'
        +'<th class="text-center">Options</th>'
      +'</tr>'
    +'</thead>'
    +'<tr></tr> '
           + '<td>' + course.subject +'</td>' 
           + '<td>' + course.courseId +'</td>'
           + '<td>' + time.toString() +'</td>'
           + '<td>' + course.location + '</td>'
           + '<td id="status'+index+'">' + status + '</td>'
           + '<td class="text-center">'
              + '<button type="button" class="btn btn-info btn-xs detail-btn" data-bs-toggle="modal" data-bs-target="#details' + index + '">'
              + "Details & Enroll" + '</button>' 
              + '<div class="modal fade" id="details'+ index +'" tabindex="-1" aria-labelledby="detailsModalLabel'+ index +'" aria-hidden="true">'
               + '<div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">'
                 +  '<div class="modal-content">'
                   + '<div class="modal-header">'
                        + '<h5 class="modal-title" id="detailsModalLabel'+ index +'">Class Details</h5>'
                        + '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'
                        + '</div>'
                        + '<div class="modal-body">'
                            + '<ul class="class-info">'
                                + '<li> Class Name: '+ course.subject +'</li>'
                                + '<li>Class Code: ' + course.courseId + '</li>'
                                + '<li>Instructor Name:' + course.instName +'</li>'
                                + '<li>Semester:' + course.semester +'</li>'
                                + '<li>Department:' + course.department +'</li>'
                                + '<li>Time: '+ time.toString()+ '</li>'
                                + '<li>Location: ' + course.location +'</li>'
                                + '<li>Enrolled & Capacity: ' + course.enrolled + ' / '+ course.capacity + '</li>'
                                + '<li>Enroll Deadline: ' + deadline+ '</li>'
                                + '<li>Description: ' + course.desc + '</li>'
                            + '</ul>'
                        +'</div>'
                    +'<button type="button" class="btn btn-dark btn-xs" data-bs-toggle="modal" data-bs-target="#del'+index+'" '+ enrollable+'>'
        + 'Enroll'
        + '</button>'
        + '<div class="modal fade" id="del'+index+'" tabindex="-1" aria-labelledby="delModalLabel'+index+'" aria-hidden="true">'
            + '<div class="modal-dialog-centered modal-dialog modal-dialog-scrollable">'
                + '<div class="modal-content">'
                    +'<div class="modal-header">'
                        +'<h6 class="modal-title" id="delModalLabel'+index+'">Enroll Class: '+ course.subject +'</h6>'
                        + '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'
                    +'</div>'
                    +'<div class="modal-body">'
                        +'<form>'
                            +'<label for="enroll-subject'+index+'">To Enroll this course, type the course code: <strong>'+ course.courseId+ '</strong></label>'
                            +'<input id="enroll-subject'+index+'" type="text" name="subject"></input>'
                        +'</form>'
                    +'</div>'
                    +'<input id="enroll-confirm'+index+'" type="submit" class="btn btn-primary" value="Confirm">'
                    +'<script>'
                    + 'if($("#status'+index+'").text()==="Open"){'
                    +        '$("#status'+index+'").css({"color":"Green", "font-weight":"600"});'
                    +    '}else{'
                    +        '$("#status'+index+'").css({"color":"#e93d60", "font-weight":"600"});'
                    +    '}'
                    + '$("#enroll-confirm'+index+'").click((event) => {'
                    +   'event.preventDefault();'
                    +   'var enrollcode= $("#enroll-subject'+index+'").val();'
                    +   'console.log("enroll: " + '+ '$("#enroll-subject'+index+'").val());'
                    +   'enrollClass(event, enrollcode);'
                    +'})'
                    +'</script>'
                +'</div>'
            +'</div>'
        +'</div>'
                +'</div>'
            +'</div>'
            
         +'</td>'
       +'</tr>'
      +'</table>';
    
    if(index >=1){
        $('#update').append(html);
    }
    else{
        $('#update').html(html);
    }
       
}
