function login() {
    const email = document.getElementById("login_email");
    const password = document.getElementById("login_password");

    if(email.value === ""){
        alert("Please enter your Email.");
    }else if(password.value === ""){
        alert("Please enter your Password.");
    }else if(email.value === "admin" && password.value === "110110"){
        window.location.href = "/participantHome";
    }else if(email.value === "admin2" && password.value === "110110"){
        window.location.href = "/eos_provider_profile";
    }else{
        alert("Incorrect Email or Password.");
    }
}