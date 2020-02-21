var changeinfor = document.querySelector('.changeinfor');
var foot = document.querySelector('.myinfor_foot');
var gender = document.querySelector('.gender');
var nickname = document.querySelector('#myname');
var myintro = document.querySelector('#myintroduce');
var content = document.querySelector('.content');
var inforcontent = document.querySelector('.information_content');
var huida = document.querySelector('.huida');
var tiwen = document.querySelector('.tiwen');
var shoucang = document.querySelector('.shoucang');
var father = document.querySelector('.father');
var follow = document.querySelector('#num_follow');
var followed = document.querySelector('#num_followed');
var mainpage = document.querySelector('#mainpage');
mainpage.addEventListener('click', () => {
    window.open('http://127.0.0.1:8080/mainpage');
})
getdata("personal", (request) => {
    var req = JSON.parse(request.responseText);
    huida.innerHTML = req.answers + "回答";
    tiwen.innerHTML = req.asks + "提问";
    shoucang.innerHTML = req.collections + "收藏";
    follow.innerHTML = req.following;
    followed.innerHTML = req.follower;
    nickname.innerHTML = req.nickname;
    myintro.innerHTML = req.introduction;
})
getdata("/person/answer", (request) => {
    var req = JSON.parse(request.responseText);
    var questionArray = new Array(0);
    var answerArray = new Array(0);
    var idArray = new Array(0);
    for (var i in req) {
        questionArray.push(req[i].question.question);
        answerArray.push(req[i].answer.answer);
        idArray.push(req[i].answer.id);
    }
    addDiv(questionArray, answerArray, idArray);
})

changeinfor.addEventListener('click', () => {
    inforcontent.style.height = '450px';
    foot.innerHTML = "<div class='returngeren'>返回我的主页</div><form class='cinfor'>昵称:<input id='cmyname'>简介:<input id='cmyintroduce'><select id='xing'><option value='男'>男</option><option value='女'>女</option></select></form>"
    var backgeren = document.querySelector('.returngeren');
    backgeren.addEventListener('click', () => {
        var xing = document.querySelector('#xing');
        var index = xing.selectedIndex;
        var text = xing.options[index].value;
        gender.innerHTML = "性别 " + text;
        nickname.innerHTML = document.querySelector('#cmyname').value;
        myintro.innerHTML = document.querySelector('#cmyintroduce').value;
        foot.innerHTML = '';
        foot.appendChild(gender);
        foot.appendChild(changeinfor);
        inforcontent.style.height = '250px';
        getdata_xiu("nickname=" + nickname.innerHTML + "&description=" + myintro.innerHTML + "&gender=" + text, "/update/information");
    })
})
function getdata_xiu(data, API) {
    const request = new XMLHttpRequest();
    API = "http://127.0.0.1:8080/" + API;
    request.open('GET', API + "?" + data, true);
    request.send();
}
function changeanswer(key) {
    var changecontent = document.querySelector('#answer' + key);
    var xiu = document.querySelector('#xiu' + key);
    changecontent.removeChild(changecontent.childNodes[1]);
    changecontent.removeChild(xiu);
    changecontent.style.height = '200px';
    var area = document.createElement('textarea');
    var button = document.createElement('button');
    area.setAttribute('id', 'xiucontent' + key);
    area.setAttribute('placeholder', '请输入修改内容');
    button.classList.add('finish');
    button.innerHTML = '完成';
    changecontent.appendChild(area);
    changecontent.appendChild(button);
    button.addEventListener('click', () => {
        var value = area.value;
        changecontent.removeChild(area);
        changecontent.removeChild(button);
        changecontent.style.height = '100px';
        var h2 = document.createElement('h2');
        h2.innerHTML = value;
        h2.style.display = 'inline-block';
        changecontent.appendChild(h2);
        changecontent.appendChild(xiu);
        if (tiwen.className == 'tiwen active') {
            getdata_xiu("id=" + key + "&description=" + value, "/update/question");
        } else {
            getdata_xiu("id=" + key + "&description=" + value, "/update/answer");
        }

    })
}
function getdata(API, callback) {
    const request = new XMLHttpRequest();
    API = "http://127.0.0.1:8080/" + API;
    request.open('GET', API, true);
    console.log(request);
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status <= 300) {
                callback(request);
            } else {
                console.log("请求失败");
            }
        }
    }
    request.send();
}
function LoadDiv() {
    this.setcontent = this.build(father);
}
LoadDiv.prototype = {
    build: (father) => {
        return (ques, answer, other) => {
            if (huida.className == 'huida active' || tiwen.className == 'tiwen active') {
                var div = document.createElement("DIV");
                div.classList.add('main_content');
                div.setAttribute('id', 'answer' + other);
                div.innerHTML = '<h1>' + ques + '</h1><h2 style="display: inline-block;">' + answer + '</h2><span style="color: #0084ff;" id="xiu' + other + '" onclick="changeanswer(' + other + ')">修改</span>';
                father.appendChild(div);
            } else {
                var div = document.createElement("DIV");
                div.classList.add('main_content');
                div.innerHTML = '<h1>' + ques + '</h1><span style="display: block;">user:' + other + '</span><h2 style="display: inline-block;">' + answer + '</h2>';
                father.appendChild(div);
            }
        }
    }
}
function addDiv(questionArray, answerArray, otherArray) {
    for (var i = 0; i < questionArray.length; i++) {
        var loaddiv = new LoadDiv();
        loaddiv.setcontent(questionArray[i], answerArray[i], otherArray[i]);
    }
}
huida.addEventListener('click', () => {
    if (huida.className != 'huida active') {
        huida.className = 'huida active';
        tiwen.classList.remove('active');
        shoucang.classList.remove('active');
        father.innerHTML = null;
        getdata("person/answer", (request) => {
            var req = JSON.parse(request.responseText);
            var questionArray = new Array(0);
            var descriptionArray = new Array(0);
            var idArray = new Array(0);
            for (var i in req) {
                questionArray.push(req[i].question.question);
                descriptionArray.push(req[i].answer.answer);
                idArray.push(req[i].answer.id);
            }
            addDiv(questionArray, descriptionArray, idArray);
        })
    }
})
tiwen.addEventListener('click', () => {
    tiwen.className = 'tiwen active';
    huida.classList.remove('active');
    shoucang.classList.remove('active');
    father.innerHTML = null;
    getdata("person/question", (request) => {
        var req = JSON.parse(request.responseText);
        var questionArray = new Array(0);
        var answerArray = new Array(0);
        var idArray = new Array(0);
        for (var i in req) {
            questionArray.push(req[i].question);
            answerArray.push(req[i].description);
            idArray.push(req[i].id);
        }
        addDiv(questionArray, answerArray, idArray);
    })
})
shoucang.addEventListener('click', () => {
    shoucang.className = 'shoucang active';
    huida.classList.remove('active');
    tiwen.classList.remove('active');
    father.innerHTML = null;
    getdata("collect", (request) => {
        var req = JSON.parse(request.responseText);
        var questionArray = new Array(0);
        var answerArray = new Array(0);
        var userArray = new Array(0);
        for (var i in req) {
            questionArray.push(req[i].question.question);
            answerArray.push(req[i].answer.answer);
            userArray.push(req[i].answer.user);
        }
        addDiv(questionArray, answerArray, userArray);
    })
})