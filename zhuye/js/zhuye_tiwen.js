var myquestion = document.querySelector('.question');
var tiwen = document.querySelector('#tiwen');

myquestion.addEventListener('click', () => {
    tiwen.innerHTML = '<div class="tiwen_background"><div class="tiwen"><div class="tiwen_content"><div class="tiwen_inner"><div><div class="touxiang"></div><textarea name="myquestion" id="myquestion" placeholder="写下你的问题，准确地描述问题更容易得到解答"></textarea><button id="submit">发布问题</button></div></div><button><img id="close" src="./img/close.png"></button></div></div></div>';
    var close = document.querySelector('#close');
    var submit = document.querySelector('#submit');
    submit.addEventListener('click', () => {
        var data = document.querySelector('#myquestion').value;
        const request2 = new XMLHttpRequest();
        const API = 'http://127.0.0.1:8080/ask';
        request2.open('GET', API + '?myquestion=' + data, true);
        console.log(request2, API + '?myquestion=' + data);
        request2.send();
    })
    close.addEventListener('click', () => {
        tiwen.innerHTML = null;
    })
})