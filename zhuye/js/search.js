var search = document.querySelector('.search');
var content = document.querySelector('.search_content');
var img = document.querySelector('#search');
img.addEventListener('click', () => {
    var value = content.value;
    getques(value);
})
function getques(value) {
    var request = new XMLHttpRequest();
    var API = 'http://127.0.0.1:8080/search';
    request.open('get', API + '?keyword=' + value);
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status <= 300) {
                var req = JSON.parse(request.responseText);
                var quesArray = new Array(0);
                var desArray = new Array(0);
                for (var i in req) {
                    quesArray.push(req[i].question);
                    desArray.push(req[i].description);
                }
                addlist(quesArray, desArray);
            } else {
                console.log("请求失败");
            }
        }
    }
    request.send();
}
function Loadlist(ques, des, search_list) {
    this.build(ques, des, search_list);
}
Loadlist.prototype = {
    build: (ques, des, search_list) => {
        var list_content = document.createElement('DIV');
        list_content.classList.add('list_content');
        list_content.innerHTML = ques + '<br>' + des;
        search_list.appendChild(list_content);
    }
}
function addlist(quesArray, desArray) {
    var search_list = document.createElement('DIV');
    search_list.classList.add('search_list');
    search.appendChild(search_list);
    var closelist = document.createElement('DIV');
    closelist.classList.add('closelist');
    closelist.innerHTML = '关闭搜索';
    closelist.setAttribute('onclik', 'closelist()');
    search_list.appendChild(closelist);
    for (var i = 0; i < quesArray.length; i++) {
        var newlist = new Loadlist(quesArray[i], desArray[i], search_list);
    }
}
function closelist() {
    search.removeChild(document.querySelector('.search_list'));
}