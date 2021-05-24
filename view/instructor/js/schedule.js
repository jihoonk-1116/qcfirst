const token = localStorage.getItem('token');
$(()=>{
    if(!token){
        alert("Please login first");
        window.location = '/';
    }
    updateSchedule();
})

function updateSchedule(){
    $.ajax({
        url:"../../inst/updatecourse",
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