var errorFound = false;
const token = localStorage.getItem('token');
$(()=>{
    if(!token){
        alert("Please login first");
        window.location = '/';
    }
    updateProfile();

// $("#submit-img").click((event)=> {
//     updateImg(event)
// })

    $("#edit-button").click(() => {
            editprofile();
        })

    $("#save-profile").click(() => {
            saveprofile();
        })

})
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
        if(data.role !== "student"){
            alert("Redirect to Instructor overview...");
            window.location = '/instructor/html/overview.html';
        }
        console.log(data);
        $(".name").text(data.name);
        $("#usercode-1").text("Code : "+ data.usercode);
        $(".email").text(data.email);
        $(".dept").text(data.department);
        $(".phone").text(data.phone);
        $(".profession").text(data.profession);
        $(".intro").text(data.introduction);
    })
    .then(updateSchedule);
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
        url:"../../stu/saveprofile",
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
        window.location = '/student/html/stu_overview.html';
    })
    
}

function editprofile(){
    if(!token){
        alert("Please login first");
        window.location = '/';
    }
    $.ajax({
        url:"../../stu/editprofile",
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


function updateSchedule(){
    $.ajax({
        url:"../../stu/getmyclass",
        type:"GET",
        headers :{"X-Auth" : token}
    })
    .done(function(data){
        let index=0;
        for(var course of data){
            manipulateHTML(course);
            index++;
        }
    })
}

function manipulateHTML(course){
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
  
     var index =0;
     var s,e,day;
     //how to calculate row span
      for(var schedule of course.time){
          if(index % 3 == 0){
              s = parseInt(schedule);
              console.log(schedule);
          }
          else if(index % 3 ==1){
              e = parseInt(schedule);
              console.log(schedule);
          }
          else{
              day = schedule;
              console.log(schedule);
              let t = e-s;
  
              console.log(t);
              let selector = '#'+day+(s+1);
              console.log(selector);
              $(selector).attr("rowspan",t);
              $(selector).attr("class","table-active");
              $(selector).html(course.subject +'<br>'+ time.toString());
          }
          index++
      }
}

