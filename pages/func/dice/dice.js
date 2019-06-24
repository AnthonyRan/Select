// pages/func/dice/dice.js
Page({
  //页面的初始数据
  data: {
    showThis: false,    //是否显示文字
    nowNum: "",
    dice: ["dice_1", "dice_2", "dice_3", "dice_4", "dice_5", "dice_6", "dice_t", "dice_s", "dice_e"],
    sdice: "dice_1"
  },
  
  //摇色子效果函数
  yaoYiYao: function () {
    var id = 0;
    var that = this;
    var nowTmp = 0;
    //调用setInterval产生摇色子的效果
    var mytimer = setInterval(function () {
      id++;
      var n = id % 3;
      that.setData(
        {
          sdice: that.data.dice[6 + n]
        }
      )
      nowTmp = that.randomNum();

      if (id >= 10) {
        //调用随机数函数产生一个1-6间的数
        //显示最后结果
        console.log(nowTmp);
        that.setData(
          {
            sdice: that.data.dice[nowTmp - 1],
            nowNum: nowTmp,
            showThis: true
          }
        )
        //提示成功
        wx.showToast({
          title: '投掷成功',
        })
        // wx.showModal({
        //   title: '结果',
        //   content: '您掷出的数是 ' + nowTmp,
        //   showCancel: false,
        //   confirmText: '确定'
        // })
        clearInterval(mytimer);
        mytimer = null;
      }
    }, 100);
  },

  
  //按钮函数
  point: function () {
    this.yaoYiYao();
    this.setData(
      {
        showThis: false,
      }
    )

  },


  //随机数函数
  randomNum: function () {
    return Math.floor(Math.random() * 6 + 1);
  }
 
})