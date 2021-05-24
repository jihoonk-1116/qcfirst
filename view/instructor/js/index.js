$(()=>{
        localStorage.clear();
        $("#log").click((event)=> {
            
           loginUser(event);
        })
    })

function loginUser(event) {
    event.preventDefault()
    const password = document.getElementById('userpw').value
    const email = document.getElementById('useremail').value
    
    
        var r = "";
        if(document.getElementById("inst").checked){
            r = document.getElementById('inst').value
        }else if(document.getElementById("stu").checked){
            r = document.getElementById('stu').value
        }else if(email == 'admin' & password == 'admin'){
           return window.location = 'admin/html/admin.html';
        }
        else {
            return alert("Choose your role");
        }

        const role = r;
        const result = fetch('user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                role,
                email,
                password
            })
        })
        .then((res) => res.json()) //success
        .then(data => {
            if(data.status === 'error'){
                alert(data.error);
                console.log(data);
            }else{
                token = data;
                localStorage.setItem('token', token);
                console.log(localStorage.getItem('token'));
                alert('Welcome to qcFirst');
                if(role === "instructor"){
                    window.location = 'instructor/html/overview.html';
                }else{
                    window.location = 'student/html/stu_overview.html';
                }
            }
        })
        .catch(err => {
            console.log(err)  //reject 500
            } 
        );
    
    
    
}  
    

