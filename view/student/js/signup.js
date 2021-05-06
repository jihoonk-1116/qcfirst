function checkForm() {
    let email = document.getElementById("userid").value;
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
    let password = document.getElementById("userPw").value;
    let checkPwd = document.getElementById("userPw");
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
    }


    //confirm password validation
    if(confirmPwd.match(password)) {
        confirmText.innerHTML = "password matches"
        confirmText.style.color ="green";
    }
    else {
        confirmText.innerHTML ="password does not match"
        confirmText.style.color = "red";
    }
    if (confirmPwd === "") {
        confirmText.innerHTML ="password does not match"
        confirmText.style.color = "red";
    }
}

document.getElementById("submit").addEventListener("click", function(event) {
    checkForm();

    // Prevent default form action. DO NOT REMOVE THIS LINE
    event.preventDefault();
});