module.exports.participantSignup = function(req, res){
    res.render('participant_signup');
}

module.exports.participantSignupSubmit = function (req, res) {
    res.render('participantHome');
}

module.exports.providerSignup = function(req, res){
    res.render('provider_signup');
}

module.exports.providerSignupSubmit = function (req, res) {
    res.render('eos_provider_profile');
}



