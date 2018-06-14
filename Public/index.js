document.getElementById('form').onsubmit = () => {
    submit();
}

function submit(){
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
    var res = axios.post('/add_users', json);
    console.log(res);
    // console.log(username);   
}