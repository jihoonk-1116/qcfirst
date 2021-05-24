const checkerror = false;
window.addEventListener("DOMContentLoaded", function(){
    document.getElementById("signin").addEventListener("click", function(event) {
        //checkForm();
        if(checkerror){
            console.log("Invalid sign form");
        }else{
            console.log("Valid sign form");
            registerUser(event);
        }
        // Prevent default form action. DO NOT REMOVE THIS LINE
        event.preventDefault();
    });
})
function registerUser(event) {
    event.preventDefault()
    var r = "";
    var usercode = Math.floor(Math.random() * 9000) + 1000;
    if(document.getElementById("inst").checked){
        r = document.getElementById('inst').value
        usercode = "I" + usercode;
    }else if(document.getElementById("stu").checked){
        r = document.getElementById('stu').value
        usercode = "S" + usercode;
    }else {
        return alert("Choose your role");
    }
    const role = r;
    const name = document.getElementById('username').value
    const password = document.getElementById('userpw').value
    const email = document.getElementById('useremail').value
    const department = document.getElementById('dept').value
    const result = fetch('../../user/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            role,
            usercode,
            email,
            name,
            password,
            department
        })
    })
    .then((res) => res.json())
    .then(data => {
        if(data.status === 'error'){
            alert(data.error);
            console.log(data);
        }else{
            token = data;
            localStorage.setItem('user', token);
            console.log(localStorage.getItem('user'));
            alert('Welcome ' + name);
            window.location = '/';
        }
    })
}
    
function checkForm() {
    let email = document.getElementById("useremail").value;
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
    let form = document.getElementById("userid");
    let text = document.getElementById("text");
    //name validation
    let regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    let name = document.getElementById('username').value;
    let checkName = document.getElementById("username");
    let nameCheck = document.getElementById("nameCheck");
    //password validation
    let pswRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    let password = document.getElementById("userpw").value;
    let checkPwd = document.getElementById("userpw");
    let pswCheck = document.getElementById("pswCheck");
    let confirmPwd = document.getElementById("userpw-conf").value;
    let confirmText = document.getElementById("confPwd");


    //email validation

    if(email.match(emailRegex)) {
        form.classList.add("valid");
        form.classList.remove("invalid");
        text.innerHTML = "your email address is valid.";
        text.style.color = "green";
    }
    else {
        form.classList.remove("valid");
        form.classList.add("invalid");
        text.innerHTML = "please enter valid email address.";
        text.style.color = "red";
        checkerror = true;
    }
    if(email === "") {
        form.classList.remove("valid");
        form.classList.remove("invalid");
        text.innerHTML = "";
        text.style.color = "green";
    }

    //name validation
    if(!name.match(regName)) {
        checkName.classList.add("invalid");
        checkName.classList.remove("valid");
        nameCheck.innerHTML ="please enter your full name";
        nameCheck.style.color = "red";
        checkerror = true;
    }
    else {
        checkName.classList.remove("invalid");
        checkName.classList.add("valid");
        nameCheck.innerHTML = "valid name";
        nameCheck.style.color = "green";
    }
    if(name === "") {
        checkName.classList.remove("valid");
        checkName.classList.remove("invalid");
        nameCheck.innerHTML = "";
        nameCheck.style.color = "green";
    }

    //password validation
    if(password.match(pswRegex)) {
        checkPwd.classList.add("valid");
        checkPwd.classList.remove("invalid");
        pswCheck.innerHTML = "password as all required field";
        pswCheck.style.color ="green";
    }
    else {
        checkPwd.classList.remove("valid");
        checkPwd.classList.add("invalid");
        pswCheck.innerHTML = "password need at least 1 upper case letter 1 lowercase letter a number a special chracter and must at least 8 characters long";
        pswCheck.style.color = "red";
        checkerror = true;
    }


    //confirm password validation
    if(confirmPwd.match(password)) {
        confirmText.innerHTML = "password matches"
        confirmText.style.color ="green";
    }
    else {
        confirmText.innerHTML ="password does not match"
        confirmText.style.color = "red";
        checkerror = true;
    }
}


