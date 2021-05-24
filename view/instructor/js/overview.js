var errorFound = false;
const token = localStorage.getItem('token');
$(()=>{
    if(!token){
        alert("Please login first");
        window.location = '/';
    }
    updateProfile();

    $("#edit-button").click(() => {
            editprofile();
        })

    $("#save-profile").click(() => {
            saveprofile();
        })

    $("#save-newclass").click((event) => {
            var newcourse = checkValidation(event);
            if(!errorFound) saveNewClass(newcourse);
        })
    
    
})

function deleteClass(code){
    if(!token){
        alert("Please login first");
        window.location = '/';
    }
    console.log("in: " +code);
    code = code.toUpperCase();
    $.ajax({
        url:"../../inst/removeclass",
        type:"POST",
        headers :{"X-Auth" : token},
        data:{'code':code}
    })
    .done(function(data){
        alert("Class is deleted: " + data.subject);
        window.location = '/instructor/html/overview.html';
    })
    .fail(error=>{
        console.log(error);
    })
    
}
function updateProfile() {
    if(!token){
        alert("Please login first");
        window.location = '/';
    }
    $.ajax({
        url:"../../user/getuserinfo",
        type:"GET",
        headers :{"X-Auth" : token}
    })
    .done(function(data){
        if(data.role !== "instructor"){
            alert("Redirect to Instructor overview...");
            window.location = '/student/html/stu_overview.html';
        }
        
        console.log(data.usercode);
        $(".name").text(data.name);
        $("#usercode-1").text("Code : "+ data.usercode);
        $(".email").text(data.email);
        $(".dept").text(data.department);
        $(".phone").text(data.phone);
        $(".profession").text(data.profession);
        $(".intro").text(data.introduction);
    })
    .then(updateCourse);
}

function updateCourse(){
    $.ajax({
        url:"../../inst/updatecourse",
        type:"GET",
        headers :{"X-Auth" : token}
    })
    .done(function(data){
        let index=0;
        for(var course of data){
            var html = createNewCourseHTML(course, index);
            $("#registered-classes").append(html);
            index++;
        }
    })
}

function saveNewClass(newcourse){
    if(!token){
        alert("Please login first");
        window.location = '/';
    }
    $.ajax({
        url:"../../inst/newclass",
        type:"POST",
        headers :{"X-Auth" : token},
        data: newcourse
    })
    .done(function(data){
        if(data.status === 'error'){
            alert(data.error);
            return;
        }
        var html = createNewCourseHTML(data);
        $(".table").append(html);
        alert(" New class is created: " + newcourse.subject);
        window.location = '/instructor/html/overview.html';
    })
}

function saveprofile(){

    var name = document.getElementById('userid').value
    if(name === "") name = $("#userid").attr("placeholder");

    var dept = document.getElementById('dept').value
    if(dept === "") dept = $("#dept").attr("placeholder");

    var phone = document.getElementById('phone').value
    if(phone === "") phone = $("#phone").attr("placeholder");

    var prof = document.getElementById('prof').value
    if(prof === "") prof = $("#prof").attr("placeholder");

    var intro = document.getElementById('intro').value
    if(intro === "") intro = $("#intro").attr("placeholder");

    $.ajax({
        url:"../../inst/saveprofile",
        type:"POST",
        headers :{"X-Auth" : token},
        data:{
            'name': name,
            'dept': dept,
            'phone': phone,
            'prof': prof,
            'intro': intro
        }
    })
    .done(function(data){
        window.location = '/instructor/html/overview.html';
    })
    
}

function editprofile(){
    if(!token){
        alert("Please login first");
        window.location = '/';
    }
    $.ajax({
        url:"../../inst/editprofile",
        type:"GET",
        headers :{"X-Auth" : token}
    })
    .done(function(data){
        $("#userid").attr("placeholder", data.name);
        $("#useremail").attr("placeholder",data.email);
        $("#dept").attr("placeholder",data.department);
        $("#phone").attr("placeholder",data.phone);
        $("#prof").attr("placeholder",data.profession);
        $("#intro").attr("placeholder",data.introduction);
    })
}



// function updateImg(event){
//     const img = $("#avatar").val();
//     console.log(img);
//     $.post("/img/upload",img,"json")
//     .done(res => {
//         console.log(res);
//     })
//     $.ajax({
//             dataType:"json",
//             url:"/img/upload",
//             type:"POST",
//             data: file,
//             success:
//         })
//         .done(function(data){
//             console.log("Back");
//             console.log(data);
//         })
// }

function checkValidation(event){

    var subject = document.getElementById('classname').value
    if(subject === "") {
        $("#classname").css({"border":"soild","border-color":"red"});
        errorFound = true;
    }
    else {
        $("#classname").css("border-color","green");
        errorFound = false;
    }
        

    var dept = document.getElementById('dep').value
    if(dept === "blank") {
        $("#dep").css({"border":"soild","border-color":"red"});
        errorFound = true;
    }
    else {
        $("#dep").css("border-color","green");
        errorFound = false;
    }
        

    var semester = document.getElementById('semester').value
    if(semester == "blank") {
        $("#semester").css({"border":"soild","border-color":"red"});
        errorFound = true;
    }
    else {
        $("#semester").css("border-color","green");
        errorFound = false;
    }
        
    
    var capacity = document.getElementById('capacity').value
    if(capacity === "") {
        $("#capacity").css({"border":"soild","border-color":"red"});
        errorFound = true;
    }
    else {
        $("#capacity").css("border-color","green");
        errorFound = false;
    }

    var deadline = document.getElementById('deadline').value
    if(capacity === "") {
        $("#deadline").css({"border":"soild","border-color":"red"});
        errorFound = true;
    }
    else {
        $("#deadline").css("border-color","green");
        errorFound = false;
    }

    var i =0;
    var schedule = [];
    $('.form-check-input:checked').each(function () {
        var selector = "." + $(this).val();
        $(selector).each(function () {
            if($(this).val() != ""){
                console.log($(this).val())
                schedule[i++] = $(this).val(); 
                $(selector).css("border-color","green");
                errorFound = false;
            }
            else{
                $(selector).css("border-color","red");
                errorFound = true;
            }    
         }); 
         schedule[i++] = $(this).val();       
    });    

    var location = document.getElementById('location').value
    if(location === "") {
        $("#location").css({"border":"soild","border-color":"red"});
        errorFound = true;
    }
    else {
        $("#location").css("border-color","green");
        errorFound = false;
    }

    var desc = document.getElementById('class-desc').value
    if(desc === "") {
        $("#class-desc").css({"border":"soild","border-color":"red"});
        errorFound = true;
    }
    else {
        $("#class-desc").css("border-color","green");
        errorFound = false;
    }

    var prefix = dept.charAt(0);
    const courseId = prefix + (Math.floor(Math.random() * 9000) + 1000);

    return {
        'subject':subject,
        'courseId' : courseId,
        'semester':semester,
        'department':dept,
        'time': schedule,
        'capacity':capacity,
        'deadline':deadline,
        'location' : location,
        'desc':desc
    }
}

function createNewCourseHTML(course, index){

    let deadlineDate = new Date(course.deadline);
    console.log(deadlineDate.getTime());
    let today = new Date();
    console.log(today.getTime());
    var enrollable = "";
    var deletable = "";
    console.log(today);

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
           + '<td id="status'+index+'">' + status + '</td>'
           + '<td class="text-center">'
              + '<button type="button" class="btn btn-info btn-xs detail-btn" data-bs-toggle="modal" data-bs-target="#details' + index + '">'
              + "Details" + '</button>' 
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
            +'</div>'
        +'</div>'
        +'<button type="button" class="btn btn-danger btn-xs" data-bs-toggle="modal" data-bs-target="#del'+index+'"'+deletable+'>'
        + 'Del'
        + '</button>'
        + '<div class="modal fade" id="del'+index+'" tabindex="-1" aria-labelledby="delModalLabel'+index+'" aria-hidden="true">'
            + '<div class="modal-dialog-centered modal-dialog modal-dialog-scrollable">'
                + '<div class="modal-content">'
                    +'<div class="modal-header">'
                        +'<h5 class="modal-title" id="delModalLabel'+index+'">Remove Class: '+ course.subject +'</h5>'
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
         +'</td>'
       +'</tr>'

    return html;
}               