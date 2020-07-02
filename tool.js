// 封装兼容性方法，返回浏览器滚动条距离
function getScrollOffset() {
    if (window.pageXOffset) {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        }
    } else {
        return {
            x: document.body.scrollLeft + document.documentElement.scrollLeft,
            y: document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}
// 封装兼容性方法，返回浏览器视口尺寸
function getViewportOffset() {
    if (window.innerWidth) {
        return {
            w: window.innerWidth,
            h: window.innerHeight
        }
    } else {
        if (document.compatMode === "BackCompat") {
            return {
                w: document.body.clientWidth,
                h: document.body.clientHeight
            }
        } else {
            return {
                w: document.documentElement.clientWidth,
                h: document.documentElement.clientHeight
            }
        }
    }
}
// 封装兼容性查询样式
function getStyle(elem, prop) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(elem, null)[prop];
    } else {
        return elem.currentStyle[prop];
    }
}
// 封装兼容性绑定事件
function addEvent(elem, type, handle) {
    if (elem.addEventListener) {
        elem.addEventListener(type, handle, false);
    } else if (elem.attachEvent) {
        elem.attachEvent('on' + type, function() {
            handle.call(elem);
        })
    } else {
        elem['on' + type] = handle;
    }
}
// 封装取消冒泡的函数
function stopBubble(event) {
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
}
// 封装阻止默认事件的函数
function cancelHandler(event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}
// 封装异步加载函数
function loadScript(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) {
        script.onreadystatechange = function() {
            // IE兼容
            if (script.readyState == "complete" || script.readyState == "loaded") {
                callback();
            }
        }
    } else {
        script.onload = function() {
            // Safari chrome firefox opera兼容
            callback();
        }
    }
    script.src = url;
    document.head.appendChild(script);
}
// 封装获取非行间样式
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, false)[attr];
    }
}
// 头像预览  即时显示
function showImg(obj) {
    var file = $(obj)[0].files[0]; //获取文件信息
    var imgdata = '';
    if (file) {
        var reader = new FileReader(); //调用FileReader
        reader.readAsDataURL(file); //将文件读取为 DataURL(base64)
        reader.onload = function(evt) { //读取操作完成时触发。
            $("#img").attr('src', evt.target.result) //将img标签的src绑定为DataURL
        };
    } else {
        alert("上传失败");
    }
}
// 视频播放暂停的切换
function videoToggle() {
    var video = $("video")[0];
    if (video.paused) {
        video.play();
        // 移除暂停样式，添加播放样式
    } else {
        video.pause();
        // 移除播放样式，添加暂停样式
    }
}
// 封装兼容性全屏操作
function fullScreen() {
    var video = $("video")[0];
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.oRequestFullscreen) {
        video.oRequestFullscreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    } else if (video.mozRequestFullscreen) {
        video.mozRequestFullscreen();
    }
}
// 将视频以秒计改为时分秒，同时补零
function getResult(time) {
    // 时 60 * 60 = 3600  
    // 分 总时长 / 3600 的余数
    // 秒 总时长 / 60 的余数
    var hour = Math.floor(time / 3600);
    var minute = Math.floor(time % 3600 / 60);
    var second = Math.floor(time % 60);
    // 补零操作 eg.01:02:01
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;
    return hour + ":" + minute + ":" + second;
}