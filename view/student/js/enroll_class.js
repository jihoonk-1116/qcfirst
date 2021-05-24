const token = localStorage.getItem('token');
$(()=>{

    if(!token){
        alert("Please login first");
        window.location = '/';
    }

    getMyClass();

})

function getMyClass(){
    $.ajax({
        url:"../../stu/getmyclass",
        type:"GET",
        headers:{"X-Auth" : token}
    })
    .done(function(data){
        let index=0;
        for(var course of data){
            console.log(course);
            createHTML(course, index);
            index++;
        }
        $("#update").prepend("<h5>"+index+" class section(s) found<h5>");
    })
}
function errorHandle(data){

}
function dropClass(code){
    if(!token){
        alert("Please login first");
        window.location = '/';
    }
    console.log("in: " +code);
    code = code.toUpperCase();
    $.ajax({
        url:"../../stu/dropclass",
        type:"POST",
        headers :{"X-Auth" : token},
        data:{'code':code},
    
    })
    .done(function(data){
        alert(data.subject +" class is droped");
        window.location = '/student/html/enroll_class.html';
    })
    .catch(error=>{
        console.log(error);
    })
}
function createHTML(course,index){

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
    console.log(time);

    var html = 
    '<table class="table table-striped table-hover table-light custab">'
    + '<thead>'
      +'<tr>'
        +'<th>Class</th>'
        +'<th>Section</th>'
        +'<th>Time</th>'
        +'<th>Location</th>'
        +'<th class="text-center">Options</th>'
      +'</tr>'
    +'</thead>'
    +'<tr></tr> '
           + '<td>' + course.subject +'</td>' 
           + '<td>' + course.courseId +'</td>'
           + '<td>' + time.toString() +'</td>'
           + '<td>' + course.location + '</td>'
           + '<td class="text-center">'
              + '<button type="button" class="btn btn-info btn-xs detail-btn" data-bs-toggle="modal" data-bs-target="#details' + index + '">'
              + "Details & Drop" + '</button>' 
              + '<div class="modal fade" id="details'+ index +'" tabindex="-1" aria-labelledby="detailsModalLabel'+ index +'" aria-hidden="true">'
               + '<div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">'
                 +  '<div class="modal-content">'
                   + '<div class="modal-header">'
                        + '<h5 class="modal-title" id="detailsModalLabel'+ index +'">Class Details</h5>'
                        + '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'
                        + '</div>'
                        + '<div class="modal-body">'
                            + '<ul class="class-info">'
                                + '<li>Class Name: '+ course.subject +'</li>'
                                + '<li>Course ID: ' + course.courseId + '</li>'
                                + '<li>Instructor Name:' + course.instName +'</li>'
                                + '<li>Semester:' + course.semester +'</li>'
                                + '<li>Department:' + course.department +'</li>'
                                + '<li>Time: '+ time.toString() + '</li>'
                                + '<li>Location: ' + course.location +'</li>'
                                + '<li>Description: ' + course.desc + '</li>'
                            + '</ul>'
                        +'</div>'
                        +'<button type="button" class="btn btn-dark btn-xs" data-bs-toggle="modal" data-bs-target="#del'+index+'">'
        + 'DROP'
        + '</button>'
        + '<div class="modal fade" id="del'+index+'" tabindex="-1" aria-labelledby="delModalLabel'+index+'" aria-hidden="true">'
            + '<div class="modal-dialog-centered modal-dialog modal-dialog-scrollable">'
                + '<div class="modal-content">'
                    +'<div class="modal-header">'
                        +'<h6 class="modal-title" id="delModalLabel'+index+'">Drop Class: '+ course.subject +'</h6>'
                        + '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'
                    +'</div>'
                    +'<div class="modal-body">'
                        +'<form>'
                            +'<label for="drop-subject'+index+'">To <strong>DROP</strong> this course, type the course code: <strong>'+ course.courseId+ '</strong></label>'
                            +'<input id="drop-subject'+index+'" type="text" name="subject"></input>'
                        +'</form>'
                    +'</div>'
                    +'<input id="drop-confirm'+index+'" type="submit" class="btn btn-danger" value="Confirm">'
                    +'<script>'
                    + '$("#drop-confirm'+index+'").click((event) => {'
                    +   'var dropcode= $("#drop-subject'+index+'").val();'
                    +   'console.log("drop: " + '+ '$("#drop-subject'+index+'").val());'
                    +   'dropClass(dropcode);'
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