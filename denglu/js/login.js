var input_acc = document.querySelector('.input_acc');
var input_pas = document.querySelector('.input_pas');
var btn = document.querySelector('.log_in');
var register = document.querySelector('.register');
var log = document.querySelector('.log_with');
var content = document.querySelector('.main_content');
var help = document.querySelector('.log_help');
console.log(content.childNodes[0]);
console.log(content.childNodes[1]);
console.log(content.childNodes[2]);
console.log(content.childNodes[3]);
log.addEventListener('click', () => {
    if (!log.classList.contains('active')) {
        input_acc.value = '';
        input_pas.value = '';
        document.querySelector('.submit_pas').value = '';
        log.classList.add('active');
        register.classList.remove('active');
        content.removeChild(content.childNodes[4]);
    }
})
register.addEventListener('click', () => {
    if (!register.classList.contains('active')) {
        input_acc.value = '';
        input_pas.value = '';
        register.classList.add('active');
        log.classList.remove('active');
        var submit = document.createElement('DIV');
        submit.classList.add('submit');
        var submit_pas = document.createElement('input');
        submit_pas.classList.add('submit_pas');
        submit_pas.setAttribute('placeholder', '请再次输入密码');
        submit.appendChild(submit_pas);
        content.insertBefore(submit, content.childNodes[4]);
    }
})
btn.addEventListener('click', () => {
    if (register.classList.contains('active')) {
        var data = 'situation=register&username=' + input_acc.value + '&password=' + input_pas.value + '&submitpassword' + document.querySelector('.submit_pas'.value);
        getdata_zhuce(data);
    } else {
        var data = 'situation=login&username=' + input_acc.value + '&password=' + input_pas.value;
        getdata(data);
    }
})
function getdata_zhuce(data) {
    const request = new XMLHttpRequest();
    const API = 'http://127.0.0.1:8080/sigin/register';
    request.open('post', API, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(data);
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status <= 300) {
                window.open('http://127.0.0.1:8080/mainpage');
            } else {
                alert("密码错误");
            }
        }
    }
}
function getdata(data) {
    const request = new XMLHttpRequest();
    const API = 'http://127.0.0.1:8080/sigin/login';
    request.open('post', API, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(data);
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status <= 300) {
                window.open('http://127.0.0.1:8080/mainpage');
            } else {
                alert("密码错误");
            }
        }
    }
}