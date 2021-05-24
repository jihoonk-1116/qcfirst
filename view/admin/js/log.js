
$(()=>{
    getlogs();
});
function getlogs(){
    $.ajax({
        url:"../../admin/getlogs",
        type:"GET",
    })
    .done(function(data){
        console.log(data);
        let index=0;
        for(var log of data){
            let html = createNewLogHTML(log,index);
            console.log(log);
            $("#log").append(html);
            index++;
        }
    })
}
function createNewLogHTML(log, index){
    let result_str="";
    let header = "";
    for(let result of log.result){
        if(result.courseId){
            if(header ==""){
                header += "Result: Courses"
            }
            console.log(result);
            result_str += result.subject + ", " 
                    + result.instName + ", " 
                    + result.courseId + '<br>';
        }
        else{
            if(header ==""){
                header += "Result: Users"
            }
            console.log(result);
        result_str += result.role + ", " 
        + result.usercode + ", " 
        + result.name + ", "
        + result.department + '<br>';
        }
        
    }
       
    
    
    
    var html = 
    '<tr>' 
       + '<td>' + log.username +'</td>' 
       + '<td>'+ log.userId +'</td>'
       + '<td>' + log.date+'</td>'
       + '<td class="text-center">'
          + '<button type="button" class="btn btn-info btn-xs detail-btn" data-bs-toggle="modal" data-bs-target="#stu-details' + index + '">'
          + "Details" + '</button>' 
          + '<div class="modal fade" id="stu-details'+ index +'" tabindex="-1" aria-labelledby="stu-detailsModalLabel'+ index +'" aria-hidden="true">'
           + '<div class="modal-dialog modal-lg modal-dialog-centered">'
             +  '<div class="modal-content">'
               + '<div class="modal-header">'
                    + '<h4 class="modal-title" id="stu-detailsModalLabel'+ index +'">'+header+'</h4>Click out of the box to close'
               + '</div>'
               + '<div class="modal-body">'
                       + result_str
               +'</div>'
            +'</div>'
        +'</div>'
    +'</div>'
     +'</td>'
   +'</tr>';
     
          return html;
  }