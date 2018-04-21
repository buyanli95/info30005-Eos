function participantSignup() {
    const fullname = document.getElementById("fullname");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    if(fullname.value === ""){
    	alert("Please enter the name.");
    }else if(email.value === ""){
    	alert("Please enter the email.");
    }else if(password.value === ""){
    	alert("please enter the password");
    }else if(fullname.value === "par" && email.value === "par@gmail.com" && password.value === "pass"){
    	window.location.href = "/participantHome";
        window.event.returnValue = false;
    }
}

function providerSignup() {
    const icName = document.getElementById("icName");
    const icEmail = document.getElementById("icEmail");
    const icPassword = document.getElementById("icPassword");

    if(icName.value === ""){
        alert("Please enter the name.");
    }else if(icEmail.value === ""){
        alert("Please enter the email.");
    }else if(icPassword.value === ""){
        alert("please enter the password");
    }else if(icName.value === "pro" && icEmail.value === "pro@gmail.com" && icPassword.value === "pass"){
        window.location.href = "/eos_provider_profile";
        window.event.returnValue = false;
    }
}