 // 通过jQuery来实现
 $(function() {
     // 1.获取播放器
     var video = $("video")[0];
     // 2.实现播放暂停
     $(".switch").click(function() {
         // 调用播放暂停函数
         videoToggle();
         // 设置标签的样式
         $(this).toggleClass("fa-play fa-pause");
     });
     // 3.实现全屏操作
     $(".expand").click(function() {
         // 调用全屏
         fullScreen();
     });


     // 4.实现播放的业务逻辑，当视频文件可以播放时触发下面的事件

     video.oncanplay = function() {
         // 延迟显示  ---->过渡 使视频出现不那么唐突
         setTimeout(function() {
             // 将当前视频文件设置为显示
             video.style.display = "block";
             // 获取当前视频的总时长(总时长是以秒为单位的，同时获取了小数值) ，所以需要根据总时长计算出时分秒
             var total = video.duration;
             // 计算结果的显示格式
             var result = getResult(total);
             // 将计算结果放置到指定的dom元素中
             $(".totalTime").html(result);
         }, 2000);
     };


     // 5.实现播放过程中的业务逻辑，当视频播放时会触发
     // 只要currentTime值改变就会触发这个事件（timeupdate）
     video.ontimeupdate = function() {
         // 获取当前的播放时间
         var current = video.currentTime;
         // 计算时分秒
         var result = getResult(current);
         // 将结果展示在指定的dom元素中
         $(".currentTime").html(result);
         // 设置进度条样式  eg.播放了总时长的12% 0.12-->0.12 *100 + %
         var percent = current / video.duration * 100 + "%";
         $(".elapse").css("width", percent);
     }

     // 6.实现视频的跳播
     $(".bar").click(function(e) {
         var offset = e.offsetX;
         // 获取当前鼠标相对于父元素的left值    ---->偏移值
         var percent = offset / $(this).width();
         // 计算偏移值相对父元素总宽度的比例
         var current = percent * video.duration;
         // 计算这个位置对应的视频进度值
         video.currentTime = current;
         // 设置当前视频的currentTime  使进度条与当前实现的显示对应上
     });
     // 7.播放完毕后，重置播放器的状态
     video.onended = function() {
         video.currentTime = 0;
         $(".switch").removeClass("fa-pause").addClass("fa-play");
     }

 });