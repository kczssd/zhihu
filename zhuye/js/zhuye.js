// 推荐及总部分
// document.querySelector('#test').addEventListener('click', () => {
//     var id_ques = 1;
//     var now_ques = "bmz是铁憨憨";
//     var now_des = "这个问题";
//     window.open('.././wenti/wenti.html', "_blank");
//     window.localStorage.setItem("id_ques", id_ques);
//     window.localStorage.setItem("now_ques", now_ques);
//     window.localStorage.setItem("now_des", now_des);
// })
var num_huan = 1;
var num_scroll = 1;
var now_data = "?situation=onload&num=" + num_huan;
var touxiang = document.querySelector('.person .touxiang');
touxiang.addEventListener('click', () => {
    window.open('http://127.0.0.1:8080/people', "_blank");
});
var father = document.querySelector('.main_content');
var ques = document.querySelectorAll('.ques');
var allidArray = new Array(0);
getdata(now_data, (array1, array2, array3) => {
    advanceADD(array1, array2, array3);
}, () => {
    advanceADD2();
});
function getdata(data, callback, callback2) {
    const request = new XMLHttpRequest();
    const API = "http://127.0.0.1:8080/question";
    request.open('GET', API + data, true);
    console.log(request);
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status <= 300) {
                var questionAll = JSON.parse(request.responseText);
                var questionArray = new Array(0);
                var descriptionArray = new Array(0);
                var idArray = new Array(0);
                for (let i in questionAll) {
                    if (questionAll[i].question != undefined) {
                        questionArray.push(questionAll[i].question);
                    } else {
                        num_scroll = 2;
                        console.log("滚动事件被停了");
                        return;
                    }
                }
                for (let k in questionAll) {
                    descriptionArray.push(questionAll[k].description);
                }
                for (let j in questionAll) {
                    idArray.push(questionAll[j].id);
                }
                num_huan += 6;
                now_data = "?situation=onload&num=" + num_huan;
                callback(questionArray, descriptionArray, idArray);
            } else {
                callback2();
                console.log("请求失败");
            }
        }
    }
    request.send();
}
var div = document.createElement("DIV");

function LoadDiv() {
    var now_div = this.build(father);
    this.setquestion = this.rebuild(now_div);
}
LoadDiv.prototype = {
    build: (father) => {
        var div = document.createElement("DIV");
        var img = document.createElement('img');
        img.src = './img/yujiazai.png';
        img.style.cssText = 'width:716px;height:140px;';
        div.appendChild(img);
        father.appendChild(div);
        return div;
    },
    rebuild: (div) => {
        return (ques, des, id) => {
            div.classList.add('tuijian');
            div.innerHTML = '<h1 class="ques ques_num' + id + '">' + ques + '</h1>' + '<h2 class="des_num' + id + '">' + des + '</h2>';
        }
    }
}
function advanceADD2() {
    for (var i = 0; i < 6; i++) {
        var loadDiv = new LoadDiv();
    }
}
function advanceADD(questionArray, descriptionArray, idArray) {
    for (var i = 0; i < questionArray.length; i++) {
        var loadDiv = new LoadDiv();
        loadDiv.setquestion(questionArray[i], descriptionArray[i], idArray[i]);
        allidArray.push(idArray[i]);
    }
    ques = document.querySelectorAll('.ques');
    for (var i = 0; i < ques.length; i++) {
        ques[i].setAttribute('onclick', 'turnwenti(' + allidArray[i] + ')');
    }
}
function turnwenti(key) {
    var id_ques = key;
    var now_ques = document.querySelector('.ques_num' + key).innerHTML;
    var now_des = document.querySelector('.des_num' + key).innerHTML;

    window.localStorage.setItem("id_ques", id_ques);
    window.localStorage.setItem("now_ques", now_ques);
    window.localStorage.setItem("now_des", now_des);

    window.open('http://127.0.0.1:8080/Question', "_blank");
    console.log(id_ques, now_ques, now_des);
}

window.onscroll = () => {
    switch (num_scroll) {
        case 1:
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
                getdata(now_data, (array1, array2, array3) => {
                    advanceADD(array1, array2, array3);
                }, () => {
                    advanceADD2();
                })
            }
            break;
        case 2:
            break;
    }
}
//关注
var tui = document.querySelector('.tui');
var guan = document.querySelector('.guan');
var re = document.querySelector('.re');
tui.addEventListener('click', () => {
    if (tui.className != 'tui active') {
        num_scroll = 1;
        num_huan = 1;
        tui.className = 'tui active';
        guan.classList.remove('active');
        re.classList.remove('active');
        now_data = "?situation=onload&num=" + num_huan;
        getdata(now_data, (array1, array2, array3) => {
            advanceADD(array1, array2, array3);
        }, () => {
            advanceADD2();
        });
    }
})
guan.addEventListener('click', () => {
    num_scroll = 1;
    num_huan = 1;
    guan.className = 'guan active';
    tui.classList.remove('active');
    re.classList.remove('active');
    father.innerHTML = null;
    now_data = "?situation=guanzhu&num=" + num_huan;
    getdata(now_data, (array1, array2, array3) => {
        advanceADD(array1, array2, array3);
    }, () => {
        advanceADD2();
    });
})
re.addEventListener('click', () => {
    num_scroll = 1;
    num_huan = 1;
    re.className = 're active';
    tui.classList.remove('active');
    guan.classList.remove('active');
    father.innerHTML = null;
    now_data = "?situation=rebang&num=" + num_huan;
    getdata(now_data, (array1, array2, array3) => {
        advanceADD(array1, array2, array3);
    }, () => {
        advanceADD2();
    });
})
