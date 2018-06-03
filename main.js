//初始化数据
var hashA = init()
var keys = hashA["keys"]
var hash = hashA["hash"]
var imgs = hashA["imgs"]
var img1 = hashA["img"]
//生成搜索栏,键盘,说明
searchBar()
keyboard(keys, hash)
createDescription()
copyRight()
// 随机换肤
changeBg(imgs)
//监听事件
listenKeyPress(hash)
listenInputEvent()
listenSearchEvent()
window.onload = function () {
    if (!img1) {
        img1 = 'bg1'
        setImg(img1)
    } else {
        setImg(img1)
    }

}
//下面是工具函数

//换肤

function setImg(img) {
    document.body.style.backgroundImage = "url(./imgs/" + img + ".jpg)";
}

function changeBg(imgs) {
    var body = document.querySelector('body')
    var div = document.createElement('div')
    body.appendChild(div)
    div.textContent = '炫彩换肤'
    div.className = "changeBg"
    div.onclick = function () {
        changeBgRandom(imgs)
    }

    function changeBgRandom(imgs) {
        var s = imgs.length - 1
        var index = Math.round(Math.random() * s);
        var img = imgs[index]
        setImg(img)
        localStorage.setItem('img', JSON.stringify(img))
    }
}

function searchBar() {
    var form = document.querySelector('form')
    var input = document.createElement('input')
    var a1 = document.createElement('a')
    var a2 = document.createElement('a')
    form.appendChild(input)
    form.appendChild(a1)
    form.appendChild(a2)
    a1.textContent = '百度'
    a2.textContent = '谷歌'
    a1.id = 'baidu'
    a2.id = 'google'
    input.setAttribute('placeholder', 'Search Anything U Want')
}

function listenInputEvent() {
    var body = document.querySelector('body')
    var input = document.querySelector('input')
    body.onclick = function (e) {
        e.target.localName == "input" ? input.setAttribute("autofocus", "autofocus") : input.removeAttribute("autofocus");
    }
    input.onkeydown = function(e){
        if (e.keyCode == "13") {
            var search = document.querySelector('input').value
            if (search) {
                window.open("//" + "www.baidu.com/s?wd=" + search)
                return false
            }
        }
    }
}

function listenSearchEvent() {
    var searchButton = document.querySelectorAll('form>a')
    
    for (var i = 0; i < searchButton.length; i++) {
        searchButton[i].onclick = function (e) {
            var search = document.querySelector('input').value
            if (search) {
                if (e.target.id === "baidu") {
                    window.open("//" + "www.baidu.com/s?wd=" + search)
                } else if (e.target.id === "google") {
                    window.open("//" + "www.google.com/search?q=" + search)
                } 
            } else {
                alert("请输入您想搜索的内容")
            }
        }
    }
}

function createDescription() {
    var body = document.querySelector('body')
    var p = document.createElement('p')
    p.setAttribute('class', 'description')
    p.innerHTML = `<span>Tips:</span><br>
        1. 鼠标单击相应字母可打开对应页面<br>
        2. 鼠标双击可自定义网址(直接输入域名即可)<br>
        3. 鼠标双击后输入 0 可以取消绑定<br>
        4. 鼠标放在相应字母上可查看对应的网址 <br>
        5. 新增换肤功能,让你的每一次浏览都赏心悦目!`
    body.appendChild(p);
}

function copyRight() {
    var body = document.querySelector("body");
    var p = document.createElement("p");
    p.setAttribute("class", "copyright");
    p.innerHTML = `Copyright&nbsp;&copy;
        &nbsp;2016-2018&nbsp;
        <a href="http://whhjdi.github.io/">沐雪</a>&nbsp;
        版权所有`
    body.appendChild(p);
}
//创建键盘,添加事件
function keyboard(keys, hash) {
    for (var i = 0; i < keys.length; i++) {
        var row = []
        row = keys[i];
        var div = document.createElement('div')
        main.appendChild(div);
        for (var j = 0; j < row.length; j++) {
            var kbd = document.createElement('kbd');
            div.appendChild(kbd);
            kbd.textContent = row[j];
            if (hash[row[j]] === "0") {
                kbd.setAttribute('title', '未绑定网址,请双击绑定')
            } else {
                kbd.setAttribute('title', hash[row[j]])
            }

            kbd.id = row[j]
            var timer = null
            kbd.onclick = function (e) {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    el = e.target;
                    key = el.id;
                    var website = hash[key]
                    if (website === '0') {
                        alert('亲!请双击绑定网址哦')
                    } else {
                        window.open('http://' + website, '_blank')
                    }
                }, 250);
            }
            kbd.ondblclick = function (e) {
                clearTimeout(timer); //清除timeout
                el = e.target;
                key = el.id;
                if (hash[key] === '0') {
                    link = prompt(`您还没有绑定网址
请输入您想绑定的网址`)
                } else {
                    link = prompt(`现在绑定的网址是: ${hash[key]}
请输入要绑定的按键`);
                }
                if (link !== null) {
                    hash[key] = link
                    localStorage.setItem('local', JSON.stringify(hash));
                    alert('保存成功')
                }

            }
        }
    }
}

function listenKeyPress(hash) {
    var input = document.querySelector('input')
    var kbds = document.querySelectorAll('kbd')
    var search = document.querySelector('input').value
    document.onkeypress = function (e) {
        console.log(e.keyCode)
        if (!input.getAttribute("autofocus")) {
            var key = e['key']
            if (hash[key]) {
                var website = hash[key]
                console.log(e['key'])
                if (website === '0') {
                    alert('亲!请双击绑定网址哦')
                } else {
                    window.open('http://' + website, '_blank')
                }
            }
        }
    }
}

function init() {
    var keys = {
        '0': {
            0: 'q',
            1: 'w',
            2: 'e',
            3: 'r',
            4: 't',
            5: 'y',
            6: 'u',
            7: 'i',
            8: 'o',
            9: 'p',
            length: 10
        },
        '1': {
            0: 'a',
            1: 's',
            2: 'd',
            3: 'f',
            4: 'g',
            5: 'h',
            6: 'j',
            7: 'k',
            8: 'l',
            length: 9
        },
        '2': {
            0: 'z',
            1: 'x',
            2: 'c',
            3: 'v',
            4: 'b',
            5: 'n',
            6: 'm',
            length: 7
        },
        'length': 3
    }
    var hash = {
        q: 'qq.com',
        w: 'weibo.com',
        e: 'ele.me',
        r: 'renren.com',
        t: 'twitter.com',
        y: 'youtube.com',
        u: 'ubuntu.com',
        i: 'iciba.com',
        o: 'office.com',
        p: 'processon.com',
        a: 'alipay.com',
        s: 'shadowsocks.org',
        d: 'deepin.org',
        f: 'facebook.com',
        g: 'github.com',
        h: 'hackerrank.com',
        j: 'jirengu.com',
        k: 'kugou.com',
        l: 'leetcode.com',
        z: 'zybuluo.com',
        x: 'xunlei.com',
        c: 'ctrip.com',
        v: 'vip.com',
        b: 'baidu.com',
        n: 'nodejs.org',
        m: 'material-ui.com'
    }
    var imgs = ['bg1', 'bg2', 'bg3', 'bg4', 'bg5', 'bg6', 'bg7', 'bg8', 'bg9', 'bg0']
    var hashInLocalStorage = loadHash('local')
    if (hashInLocalStorage) {
        hash = hashInLocalStorage
    }
    var img = loadHash('img')
    if (img) {
        img = img
    }
    return {
        "keys": keys,
        "hash": hash,
        "imgs": imgs,
        "img": img
    }
}

function loadHash(name) {
    return JSON.parse(localStorage.getItem(name) || 'null')
}