var writeanswer = document.querySelector('.writeanswer');
var myanswer = document.querySelector('.myanswer');
var findall = document.querySelectorAll('.findall');
var allanswer = document.querySelectorAll('.allanswer');
var head = document.querySelector('.moreanswer_head');
var father = document.querySelector('.main_left');
var all_pinlun = document.querySelectorAll('.num_pinlun');
var mainpage = document.querySelector('#mainpage');
var touxiang = document.querySelector('.person .touxiang');
touxiang.addEventListener('click', () => {
    window.open('http://127.0.0.1:8080/people', "_blank");
});
mainpage.addEventListener('click', () => {
    window.open('http://127.0.0.1:8080/mainpage');
})
var id_ques = window.localStorage.getItem('id_ques');
var now_ques = window.localStorage.getItem('now_ques');
var now_des = window.localStorage.getItem('now_des');
console.log(id_ques, now_ques, now_des);

document.querySelector('.now_ques').innerHTML = now_ques;
document.querySelector('.now_des').innerHTML = now_des;

var allidArray = new Array(0);
var id_pinlun = 3;
var num_huan = 1;
myanswer.style.display = 'none';

getdata("ques=" + id_ques + "&situation=huida&num=" + num_huan, (request) => {
    var req = JSON.parse(request.responseText);
    var content = document.querySelector('.answer .answer_content');
    var content2 = document.querySelector('.moreanswer .answer_content');
    console.log(req);
    document.querySelector('#zan1').innerHTML = req[0].num_zan + '赞';
    document.querySelector('#pin1').innerHTML = req[0].num_pin + '评论';
    document.querySelector('#zan2').innerHTML = req[1].num_zan + '赞';
    document.querySelector('#pin2').innerHTML = req[1].num_pin + '评论';
    allidArray.push(req[0].id);
    allidArray.push(req[1].id);
    for (var i = 0; i < all_pinlun.length; i++) {
        all_pinlun[i].setAttribute('onclick', 'showpinlun(' + allidArray[i] + ')');
    }
    var h = document.createElement('h1');
    h.innerHTML = req[0].user;
    var p = document.createElement('p');
    p.innerHTML = req[0].answer;
    content.appendChild(h);
    content.appendChild(p);
    var h2 = document.createElement('h1');
    h2.innerHTML = req[1].user;
    var p2 = document.createElement('p');
    p2.innerHTML = req[1].answer;
    content2.appendChild(h2);
    content2.appendChild(p2);
    if (content.offsetHeight < 400) {
        content.style.height = '400px';
    }
    if (content2.offsetHeight < 400) {
        content2.style.height = '400px';
    }
    num_huan += 2;

})

allanswer[0].addEventListener('click', () => {
    findall[0].style.display = 'none';
    findall[1].style.display = 'none';
    scroll();
})
allanswer[1].addEventListener('click', () => {
    findall[0].style.display = 'none';
    findall[1].style.display = 'none';
    scroll();
})
writeanswer.addEventListener('click', () => {
    myanswer.style.display = '';
    findall[0].style.display = 'none';
    findall[1].style.display = 'none';
    document.querySelector('#sentanswer').addEventListener('click', () => {
        var request = new XMLHttpRequest();
        var data = document.querySelector('#myanswer').value;
        var API = 'http://127.0.0.1:8080/write';
        request.open('post', API, true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send(data);
    })
    scroll();
})
for (var i = 0; i < all_pinlun.length; i++) {
    all_pinlun[i].setAttribute('onclick', 'showpinlun(' + + ')');
}
function getdata(data, callback) {
    const request = new XMLHttpRequest();
    const API = "http://127.0.0.1:8080/answer";
    request.open('GET', API + '?' + data, true);
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
function getdata_pin(data, callback) {
    const request2 = new XMLHttpRequest();
    const API = "http://127.0.0.1:8080/comments";
    request2.open('GET', API + '?' + data, true);
    console.log(request2);
    request2.onreadystatechange = function () {
        if (request2.readyState === 4) {
            if (request2.status >= 200 && request2.status <= 300) {
                callback(request2);
            } else {
                console.log("请求失败");
            }
        }
    }
    request2.send();
}
function sentnum(situ, id) {
    var data = '?ques=' + id_ques + '&situation=';
    switch (situ) {
        case 'zan':
            data += 'zan';
            break;
        case 'cai':
            data += 'cai';
            break;
        case 'shou':
            data += 'shou';
            break;
    }
    data += '&id=' + id;
    const request = new XMLHttpRequest();
    const API = 'http://127.0.0.1:8080/answer';
    request.open('get', API + data, true);
    request.send();
}
function showpinlun(key) {
    var foot = document.querySelector('.foot' + key);
    var pinlunqu = document.createElement('DIV');
    pinlunqu.classList.add('pinlunqu');
    foot.appendChild(pinlunqu);
    if (document.querySelector('#pin' + key).innerHTML.includes('0') && !document.querySelector('#pin' + key).innerHTML.includes('10')) {
        var mypinlun = document.createElement('DIV');
        mypinlun.classList.add('mypinlun');
        mypinlun.innerHTML = "<input class='mypinlun_content' placeholder='评论...'><div class='sendpinlun'>发送</div>";
        pinlunqu.appendChild(mypinlun);
    } else {
        document.querySelector('#pin' + key).setAttribute('onclick', 'closepinlun(' + key + ')');
        getdata_pin('ques=' + id_ques + '&situation=pinlun&id=' + key + '', (request2) => {
            var doc = JSON.parse(request2.responseText);
            console.log(doc);
            for (var i = 0; i < doc.length; i++) {
                addPIN(doc[i]);
            }
            var mypinlun = document.createElement('DIV');
            mypinlun.classList.add('mypinlun');
            mypinlun.innerHTML = "<input class='mypinlun_content' placeholder='评论...'><div class='sendpinlun' onclick='sendpinlun(" + key + ")'>发送</div>";
            pinlunqu.appendChild(mypinlun);
            function addPIN(doc) {
                var pinlun = document.createElement('DIV');
                var h1 = document.createElement('h1');
                var p = document.createElement('p');
                var br = document.createElement('br');
                pinlun.classList.add('pinlun');
                h1.innerHTML = doc.username;
                p.innerHTML = doc.comment;
                pinlunqu.appendChild(pinlun);
                pinlun.appendChild(h1);
                pinlun.appendChild(br);
                pinlun.appendChild(p);
            }
        });
    }
}
var myname = '未赋值完';
(function () {
    var request = new XMLHttpRequest();
    request.open('get', "http://127.0.0.1:8080/myself", true);
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status <= 300) {
                var name = JSON.parse(request.responseText)[0].user;
                myname = name;
            } else {
                console.log('hhh');
                myname = "iify";
            }
        }
    }
    request.send();
}());
function sendpinlun(key) {
    var pinlunqu = document.querySelector('.foot' + key + ' .pinlunqu');
    var mypinlun = pinlunqu.querySelector('.mypinlun');
    var mypinlun_content = mypinlun.querySelector('.mypinlun_content');
    var value = mypinlun_content.value;
    var pinlun = document.createElement('DIV');
    var h1 = document.createElement('h1');
    var p = document.createElement('p');
    var br = document.createElement('br');
    pinlun.classList.add('pinlun');
    h1.innerHTML = myname;
    p.innerHTML = value;
    pinlun.appendChild(h1);
    pinlun.appendChild(br);
    pinlun.appendChild(p);
    pinlunqu.insertBefore(pinlun, mypinlun);
    var request2 = new XMLHttpRequest();
    request2.open('get', 'http://127.0.0.1:8080/reply?ques=' + id_ques + '&id=' + key + '&pinlun=' + value, true);
    request2.send();
}
function closepinlun(key) {
    var foot = document.querySelector('.foot' + key);
    var pinlunqu = document.querySelector('.foot' + key + ' .pinlunqu');
    foot.removeChild(pinlunqu);
    document.querySelector('#pin' + key).setAttribute('onclick', 'showpinlun(' + key + ')');
}
function LoadDIV(num) {
    var content = this.build(father, num);
    this.addcontent = (doc) => {
        // if (doc[i].includes('.jpg') || doc[i].includes('.png') || doc[i].includes('.gif')) {
        //     var img = document.createElement('img');
        //     img.src = doc[i];
        //     content.appendChild(img);
        // } 
        var h1 = document.createElement('h1');
        h1.innerHTML = doc[0];
        content.appendChild(h1);
        var p = document.createElement('P');
        p.innerHTML = doc[1];
        content.appendChild(p);
        if (content.offsetHeight < 400) {
            content.style.height = '400px';
        }
    }
}
LoadDIV.prototype = {
    build: (father, num) => {
        var div = document.createElement('DIV');
        var content = document.createElement('DIV');
        var foot = document.createElement('DIV');
        var foot_top = document.createElement('DIV');
        foot_top.classList.add('foot_top');
        foot.classList.add('answer_foot');
        foot.classList.add('foot' + id_pinlun);
        foot_top.innerHTML = '<img src="./img/zan.png" /><span class="num_zan" id="zan' + id_pinlun + '" onclick="sentnum(' + 'zan' + ',' + id_pinlun + ')">' + num[0] + '赞</span><img src="./img/cai.png" /><span onclick="sentnum(' + 'cai' + ',' + id_pinlun + ')">踩</span><img src="./img/pinlun.png" /><span class="num_pinlun" id="pin' + id_pinlun + '>' + num[1] + '评论</span><img src="./img/shoucang.png" /><span onclick="sentnum(' + 'zan' + ',' + id_pinlun + ')">收藏</span>';
        div.classList.add('nextanswer');
        content.classList.add('answer_content');
        foot.appendChild(foot_top);
        div.appendChild(content);
        div.appendChild(foot);
        father.appendChild(div);
        id_pinlun++;
        return content;
    }
}
function addDIV(inforArray, idArray) {
    for (var i = 0; i < inforArray.length; i++) {
        var loaddiv = new LoadDIV(inforArray[i].zan_pin);
        loaddiv.addcontent(inforArray[i].user_answer);
    }
    for (var i = 0; i < 2; i++) {
        allidArray.push(idArray[i]);
    }
    all_pinlun = document.querySelectorAll('.num_pinlun');
    for (var i = 0; i < all_pinlun.length; i++) {
        all_pinlun[i].setAttribute('onclick', 'showpinlun(' + allidArray[i] + ')');
    }
}
function Information(zan, pin, user, answer) {
    this.zan_pin = [zan, pin];
    this.user_answer = [user, answer];
}
function scroll() {
    if (allidArray[allidArray.length - 1] != 999) {
        window.onscroll = () => {
            console.log("我被执行了");
            var top = 0, high = 0, webhigh = 0;
            //滚动条位置
            top = document.documentElement.scrollTop;
            //整个页面高度
            high = document.documentElement.clientHeight;
            webhigh = document.body.scrollHeight;
            var cha = parseInt(webhigh - (top + high));
            console.log(cha);
            if (cha == 0) {
                console.log("缓加载调用data");
                getdata("ques=" + id_ques + "&situation=huida&num=" + num_huan, (request) => {
                    var req = JSON.parse(request.responseText);
                    var inforArray = new Array(0);
                    for (var i in req) {
                        inforArray[i] = new Information(req[i].num_zan, req[i].num_pin, req[i].user, req[i].answer);
                    }
                    var idArray = new Array(0);
                    for (var i = 0; i < req.length; i++) {
                        if (req[i].id != 999) {
                            idArray.push(req[i].id);
                        } else {
                            window.onscroll = null;
                            return;
                        }
                    }
                    num_huan += 2;
                    addDIV(inforArray, idArray);
                })
            }
        }
    }
}

// addDIV([["user:asd", "hasdkfh"], ["user:jojo", "djkl"]]);
// addDIV(["秀哦洗洗洗洗洗洗洗洗洗洗洗洗洗洗洗洗一一嘻嘻嘻我嘻嘻嘻", "./img/pinlun.png", "hasfhkjhdkfh"]);