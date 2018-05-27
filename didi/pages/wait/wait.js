var util = require('../../utils/util.js');
Page({

  data: {
    progress_txt: '以等待', 
   count:0, 
   waitTimer: null,
    time: '00:00',
    
  },
  


parseTime: function(time){
  var time = time.toString();
    return time[1]?time:'0'+time;
},

  countInterval: function () {
    // 设置倒计时 定时器 每100毫秒执行一次，计数器count+1 ,耗时6秒绘一圈
    var count = 0;
    var timer = new Date(0,0);
    var  randomTime = Math.floor(20*Math.random()) ;
    this.waittTimer = setInterval(() => {
      if (this.data.count <= randomTime) {
        this.setData({
            time: this.parseTime(timer.getMinutes())+":"+this.parseTime(timer.getSeconds())
        });
         this.drawProgress(this.data.count /60)
        this.data.count++;
        timer.setMinutes(count/60);
        timer.setSeconds(count%60);
        count++;
      } else {
        this.setData({
          progress_txt: "匹配成功"
        });
       
      }
    }, 1000)
  },

  drawProgressbg: function(){
   var ctx = wx.createCanvasContext('canvasProgressbg');
   ctx.setLineWidth(4);
   ctx.setStrokeStyle("#e5e5e5");
   ctx.setLineCap("round");
   ctx.beginPath();
   ctx.arc(110,110,100,0,2*Math.PI,false);
   ctx.stroke();
   ctx.draw();
  },
 onReady: function () {
    this.drawProgressbg();
    this.countInterval();
    this.drawProgress();
   
    
  },
  
  drawProgress: function (step){ 
    var context = wx.createCanvasContext('canvasProgress'); 
    context.setLineWidth(4);
    context.setStrokeStyle("#fbcb02");
    context.setLineCap('round')
    context.beginPath();
      // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
    context.arc(110, 110, 100, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
    context.stroke();
    context.draw()
  },
  toCancel(){
    wx.navigateTo({
      url: "/pages/cancel/cancel"
    })
   
  },
  backIndex(){
    wx.navigateBack({
      url:  "/pages/index/index",
    })
  }
 

})