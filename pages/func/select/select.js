// pages/func/select/select.js
var t = getApp();

Page({
  data: {
    showTopTips: !1,
    showTopTips_op: !1,
    showTopTips_info: !1,
    showTopTips_num: !1,
    ac_name: "",      //活动名称
    itemInfo: [{
      id: "0",
      text: "",
      num: "1"
    }],
    repeat: !1,
    operType: "1",
    globalDisabled: !1
  },

  onLoad: function () {
    console.log("info---\x3eonLoad()");
    this.initData();
  },

  //下拉更新函数
  onPullDownRefresh: function () {
    console.log("info---\x3eonPullDownRefresh()");
    var t = this;
    this.initData();
    wx.stopPullDownRefresh();
    this.setData({
      showTopTips_info: !0
    });
    setTimeout(function () {
      t.setData({
        showTopTips_info: !1
      });
    }, 1e3);
  },

  //初始化数据
  initData: function () {
    console.log("info---\x3einitData()");
    var t = [{
      id: "0",
      text: "",
      num: "1"
    }];
    this.setData({
      itemInfo: wx.getStorageSync("itemInfo") || t,
      ac_name: wx.getStorageSync("ac_name") || "",
      repeat: wx.getStorageSync("repeat") || !1,
      operType: wx.getStorageSync("operType") || "1",
      globalDisabled: "2" == wx.getStorageSync("operType")
    });
  },

  //新增选项
  newOption: function () {
    console.log("info---\x3enewOption()");
    var t = this.data.itemInfo;
    t.push({
      id: t.length,
      text: "",
      num: "1"
    }), this.setData({
      itemInfo: t
    });
  },

  //删除选项
  deleteOption: function (t) {
    console.log("info---\x3edeleteOption()");
    var e = this;
    wx.showModal({
      title: "提示",
      content: "确定删除此选项？",
      confirmText: "确定",
      cancelText: "取消",
      success: function (a) {
        if (a.confirm) {
          var n = t.target.dataset.index, o = e.newItemInfo(n);
          e.setData({
            itemInfo: o
          }), wx.showToast({
            title: "删除成功",
            mask: !0
          });
        }
      }
    });
  },

  newItemInfo: function (t) {
    console.log("info---\x3enewItemInfo()");
    for (var e = this.data.itemInfo, a = [], n = 0; n < e.length; n++) t != n && a.push(e[n]);
    return a;
  },

  //提交按钮
  submitBtn: function () {
    console.log("info---\x3esubmitBtn()"), this.verifyOptions() && (this.saveOp2Local(),
      wx.setStorageSync("ac_id", ""), wx.showModal({
        title: "提示",
        content: "保存成功，是否前往抽签？",
        confirmText: "确定",
        cancelText: "取消",
        success: function (t) {
          t.confirm && wx.navigateTo({
            url: "../select2/select2"
          });
        }
      }));
  },

  //验证选项是否符合要求
  verifyOptions: function () {
    console.log("info---\x3everifyOptions()");
    var t = this, e = this.data.itemInfo;
    if (e.length <= 0) return this.setData({
      showTopTips_op: !0
    }), setTimeout(function () {
      t.setData({
        showTopTips_op: !1
      });
    }, 3e3), !1;
    var a = /^[1-9]+[0-9]*]*$/;
    for (var n in e) {
      if ("" == e[n].text) return this.setData({
        showTopTips: !0
      }), setTimeout(function () {
        t.setData({
          showTopTips: !1
        });
      }, 3e3), !1;
      if (!a.test(e[n].num)) return this.setData({
        showTopTips_num: !0
      }), setTimeout(function () {
        t.setData({
          showTopTips_num: !1
        });
      }, 3000), !1;
    }
    return true;
  },

  //保存数据到本地
  saveOp2Local: function () {
    console.log("info---\x3esaveOp2Local()"), wx.setStorageSync("modified", "true"),
      wx.setStorageSync("ac_name", this.data.ac_name), wx.setStorageSync("repeat", this.data.repeat),
      wx.setStorageSync("itemInfo", this.data.itemInfo), wx.setStorageSync("operType", "1");

  },

  //重置按钮
  resetBtn: function () {
    console.log("info---\x3eresetBtn()"), this.setData({
      itemInfo: [{
        id: "0",
        text: "",
        num: "1"
      }],
      repeat: !1,
      operType: "1",
      globalDisabled: !1,
      ac_name: "",
    });
  },

  //更改页面数据
  nameinputchange: function (t) {
    console.log("info---\x3enameinputchange()");
    var e = t.detail.value;
    this.setData({
      ac_name: e
    });
  },

  inputchange: function (t) {
    console.log("info---\x3einputchange()");
    var e = t.target.dataset.index, a = this.data.itemInfo;
    void 0 !== a[e] && (a[e].text = t.detail.value, this.setData({
      itemInfo: a
    }));
  },

  opnumschange: function (t) {
    console.log("info---\x3eopnumschange()");
    var e = t.target.dataset.index, a = this.data.itemInfo;
    void 0 !== a[e] && (a[e].num = t.detail.value, this.setData({
      itemInfo: a
    }));
  },

  switchchange: function (t) {
    console.log("info---\x3eswitchchange()");
    var e = t.detail.value;
    this.setData({
      repeat: e
    });
  }  
});