function updateProfile() {
        const token = localStorage.getItem('token');
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
            $(".name").text(data.name);
            $(".email").text(data.email);
            $(".dept").text(data.department);
            $(".phone").text(data.phone);
            $(".profession").text(data.profession);
            $(".intro").text(data.introduction);
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