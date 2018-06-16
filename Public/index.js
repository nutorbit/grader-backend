document.getElementById('Register').onsubmit = () => {
    submitRegister();
}
document.getElementById('Upload_code').onsubmit = () => {
    submitUploadCode();
}

function submitRegister(){
    var username = document.getElementsByName('username')[0].value;
    var password = document.getElementsByName('password')[0].value;
    var email = document.getElementsByName('email')[0].value;
    var json = {
        "username": username,
        "password": password,
        "email": email
    }
    console.log(json);
    // send user
    axios.post('/add_users', json).then( (res) => {
        console.log('Success to adding user');
    }).catch( (err) => {
        console.log('Something was wrong');
    });
    
    console.log(res);
    // console.log(username);   
}

function submitProblem(){

}