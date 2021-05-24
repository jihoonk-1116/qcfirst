var errorFound = false;
const token = localStorage.getItem('token');
$(()=>{
    if(!token){
        alert("Please login first");
        window.location = '/';
    }
    updateClass();
})

function updateClass(){
    $.ajax({
        url:"../../inst/updatecourse",
        type:"GET",
        headers :{"X-Auth" : token}
    })
    .done(function(data){
        let index=0;
        for(var course of data){
            var html = createNewModal(course,index);
            $("main").append(html); 
            index++;
        }
    })
}
function getRoster(code,table_index){ //this index points table id

  console.log("call" + code);
    $.ajax({
      url:"../../inst/getroster",
      type:"POST",
      data:{'code':code}
    })
    .done(function(data){
      
      let index=0;
      for(var student of data){
        var selector = "#modal-table" + table_index;
        console.log(student);
          var html = createStuentHTML(student,index, table_index);
          if(index == 0){
            let table_head = 
            '<thead>'
            +  '<tr>'
            +    '<th>Name</th>'
            +    '<th>Student Code</th>'
            +    '<th>Major</th>'
            +    '<th>Email</th>'
            +    '<th class="text-center">Options</th>'
            +  '</tr>'
            +'</thead>'
            +'<tr></tr>';
            $(selector).html(table_head); 
            $(selector).append(html); 
          }
          else $(selector).append(html); 
          index++;
      }
    })
}

function createStuentHTML(student, index,table_index){
  var html = 
  '<tr>' 
     + '<td>' + student.name +'</td>' 
     + '<td>'+ student.usercode +'</td>'
     + '<td>' + student.department+'</td>'
     + '<td>' + student.email + '</td>'
     + '<td class="text-center">'
        + '<button type="button" class="btn btn-info btn-xs detail-btn" data-bs-toggle="modal" data-bs-target="#stu-details' + index + '-'+ table_index+'">'
        + "Details" + '</button>' 
        + '<div class="modal fade" id="stu-details'+ index +'-'+ table_index+'" tabindex="-1" aria-labelledby="stu-detailsModalLabel'+ index +'-'+ table_index+'" aria-hidden="true">'
         + '<div class="modal-dialog modal-dialog modal-lg modal-dialog-scrollable">'
           +  '<div class="modal-content">'
             + '<div class="modal-header">'
                  + '<h6 class="modal-title" id="stu-detailsModalLabel'+ index +'-'+ table_index+'">Click out of the box to close</h6>'
             + '</div>'
             + '<div class="modal-body">'
                      + '<ul class="class-info">'
                          + '<li>Student Name: '+ student.name +'</li>'
                          + '<li>Student Code: '+ student.usercode +'</li>'
                          + '<li>Major:' + student.department +'</li>'
                          + '<li>Email: ' + student.email + '</li>'
                          + '<li>Phone:' + student.phone +'</li>'
                          + '<li>Introduction:'+ student.introduction + '</li>'
                          + '<li>Profession: '+ student.profession+ '</li>'
                      + '</ul>'
             +'</div>'
          +'</div>'
      +'</div>'
  +'</div>'
   +'</td>'
 +'</tr>';
   
        return html;
}

function createNewModal(course, index){

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
    
    var html = 
        ' <section class="container">'
          + '<div class="card mb-4">'
              +'<div class="card-body">'
                + '<h4>Class: '+ course.subject + ' , Class Code : '+ course.courseId+'</h4>'
                + '<p>'+ time.toString() +'</p>'
              + '</div>'
              + '<div class="card-footer d-flex align-items-center justify-content-between">'
                + '<button id="show-roster'+index+'" type="button" class="btn" data-bs-toggle="modal" data-bs-target="#stu-roster'+index+'">Show Roster</button>'
                + '<div class="modal fade" id="stu-roster'+index+'" tabindex="-1" aria-labelledby="rosterModalLabel'+index+'" aria-hidden="true">'
                + '<div class="modal-dialog modal-xl modal-dialog-scrollable">'
                    +'<div class="modal-content">'
                        + '<div class="modal-header">'
                            +'<h5 class="modal-title" id="rosterModalLabel'+index+'">Student Roster</h5>'
                            +'<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'
                        +'</div>'
                        +'<div class="modal-body">'//
                          + '<h4>Class: '+ course.subject + ' , ID:<span id=courseId' + index+'>'+course.courseId+'</h4>'
                          +'<script>'
                            + '$("#show-roster'+index+'").click((event) => {'
                            +   'var rostercode= '+ '$("#courseId'+index+'").text();'
                            +   ' console.log(rostercode);'
                            +   'getRoster(rostercode, '+index+' );'
                            +'});'
                          +'</script>'
                          + '<table id="modal-table'+index+'" class="table table-striped custab">'
                            +'<thead>'
                            +  '<tr>'
                            +    '<th>Name</th>'
                            +    '<th>Student Code</th>'
                            +    '<th>Major</th>'
                            +    '<th>Email</th>'
                            +    '<th class="text-center">Options</th>'
                            +  '</tr>'
                            +'</thead>'  //
                            +'<tr></tr>'
                          +'</table>'
                        +'</div>'
                        +'<div class="modal-footer">'
                          +'<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>'
                        +'</div>'
                        +'</div>'
                      +'</div>'
                    +'</div>'
                +'</div>'
            +'</div>'
        +'</section>'
        
        return html;
}               