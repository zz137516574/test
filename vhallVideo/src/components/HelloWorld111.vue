<template>
  <div class="page-pc">
    <div class="layer" id="userCusEvent">
      <div class="layer-header">
        测试自定义消息
        <img src="mobile/modal-close.png" />
      </div>
      <div class="layer-content">
        <textarea class="layer-textarea"></textarea>
        <button class="layer-btn">发送消息</button>
      </div>
    </div>
    <div class="layer" id="userinfo">
      <div class="layer-header">
        测试更新用户昵称
        <img src="mobile/modal-close.png" />
      </div>
      <div class="layer-content">
        <textarea class="layer-textarea">新的昵称</textarea>
        <button class="layer-btn">发送消息</button>
      </div>
    </div>
    <div class="player-container">
      <div class="video" id="video"></div>
      <div class="doc" id="doc" style="border: 1px solid red;"></div>
    </div>
    <div class="container">
      <div class="help-wrap">
        <div class="help-tool">
          小助手
        </div>
        <a href="javascript:;" class="help-item" id="userEvent">测试自定义消息</a>
        <a href="javascript:;" class="help-item" id="userData">测试更新用户信息</a>
        <a href="javascript:;" class="help-item" id="exchange">切换线或清晰度</a>
        <a href="javascript:;" class="help-item" id="hideVideo">隐藏文档</a>
      </div>
      <div class="sign">
        <div class="sign-header">
          签到
          <img src="mobile/modal-close.png" />
        </div>
        <div class="sign-content">
          <img class="sign-img" src="mobile/sign-icon.png" />
          <div class="sign-title">
            主持人发起了签到
          </div>
          <div class="sign-time">
            您还有
            <span class="sign-second">0秒</span>钟签到时间
          </div>
          <button class="sign-btn">签到</button>
        </div>
      </div>
      <div class="header">
        <a href="javascript:;" data-target="chatmsg-box" class="active">聊天</a>
        <a href="javascript:;" data-target="question-msg-box">问答</a>
        <a href="javascript:;" data-target="notice-msg-box">公告</a>
        <a href="javascript:;" data-target="notice-note-box">笔记</a>
      </div>
      <div class="chatmsg-box tab-pane active">
        <div class="chatmsg" id="chatmsg">
        </div>
      </div>
      <div class="question-msg-box tab-pane mCustomScrollbar">
        <div class="question-msg" id="question-msg">
        </div>
      </div>
      <div class="notice-msg-box tab-pane mCustomScrollbar">
        <div class="notice-msg" id="notice-msg">
          <ul>
          </ul>
        </div>
      </div>
      <!--笔记-->
      <div class="notice-note-box tab-pane mCustomScrollbar" style="background-color: #282830;padding-top: 30px">
        <div class="notice-note" id="notice-note" style="width: 100%;height:400px">
          <!--<ul>-->
          <!--</ul>-->
          <div style="width: 100%;" class="noteSend">
            <a href="javascript:;" class="send-chat">发送</a>
            <textarea></textarea>
          </div>
        </div>
      </div>
      <div class="send-box">
        <a id="face" href="javascript:;" class="face"></a>
        <a id="sendChat" href="javascript:;" class="send-chat">发送</a>
        <!--<textarea id="mywords" onkeypress="return!(13==event.keyCode&amp;&amp;!event.shiftKey)||(document.getElementById(&quot;sendChat&quot;).click(),!1)"></textarea>-->
      </div>
    </div>
    <div class="modal" id="modal">
      <ul id="lines"></ul>
      <ul id="definitions"></ul>
    </div>

  </div>
</template>

<script>
  import sign from '../../static/sign.js';

  export default {
    data() {
      return {
      };
    },
    components: {
    },
    mounted() {
      $("#exchange").click(function() {
        $("#modal").show()
      }),

      $("#lines").on("click", "li", function() {
        var t = $(this).text();
        $(this).siblings("li").removeClass("active"),
          $(this).addClass("active"),
          VHALL_SDK.player.setPlayerLine(t),
          $("#modal").hide(),
          $(".help-tool").click()
      }),

      $("#definitions").on("click", "li", function() {
        var t = $(this).text();
        $(this).siblings("li").removeClass("active"),
          $(this).addClass("active"),
          VHALL_SDK.player.setPlayerDefinition(t),
          $("#modal").hide(),
          $(".help-tool").click()
      }),

      $(".header").on("click", "a", function() {
        var t = $(this).attr("data-target");
        $(".header a").removeClass("active"),
          $(this).addClass("active"),
          $(".tab-pane").removeClass("active"),
          $("." + t).addClass("active"),
          "notice-msg-box" == t || 'notice-note-box' == t ? $(".send-box").hide() : $(".send-box").show()
      }),

      $("#userEvent").click(function() {
        $("#userCusEvent").show(),
          $("#userCusEvent .layer-textarea").val(JSON.stringify({
            type: "xxx_event",
            data: {
              id: 1,
              name: "test"
            }
          }))
      }),

      $("#userCusEvent img").click(function() {
        $("#userCusEvent").hide()
      }),

      $("#userCusEvent .layer-btn").click(function() {
        try {
          var t = JSON.parse($("#userCusEvent .layer-textarea").val());
          VHALL_SDK.sendCustomEvent(t),
            $("#userCusEvent img").click()
        } catch(t) {
          alert("JSON不合法")
        }
      }),

      $("#userData").click(function() {
        $("#userinfo").show()
      }),

      $("#userinfo img").click(function() {
        $("#userinfo").hide()
      }),

      $("#userinfo .layer-btn").click(function() {
        var t = $("#userinfo .layer-textarea").val();
        VHALL_SDK.updateUserInfo(t),
          $("#userinfo img").click()
      }),

      $("#video").toggleClass("on"),
      $("#doc").toggleClass("on")

      var timestamp = Date.parse(new Date());
  //    初始化
  VHALL_SDK.init({
    facedom: "#face",
    textdom: "#mywords",
    app_key: "8e620fe4bf48b7287ef235cb64240de4",
    signedat: timestamp,
    sign: sign(),
    email: "2991356504@qq.com",
    roomid: "167205018",
    account: "lixiaoxiao",
    username: 'v23426451',
    videoContent: "#video",
    docContent: "#doc"
  });

  //接收到用户自定义广播消息后触发事件
  VHALL_SDK.on("customEvent", function(t) {
    alert(JSON.stringify(t))
  }),
  //直播收到聊天消息
  VHALL_SDK.on("chatMsg", function(t) {
    $("#chatmsg").append(o(t)),
      $(".chatmsg-box").mCustomScrollbar("update").mCustomScrollbar("scrollTo", "99999")
  }),
  //直播问答消息
  VHALL_SDK.on("questionMsg", function(t) {
    console.log("问答", t),
      $("#question-msg").append(e(t)),
      $(".question-msg-box").mCustomScrollbar("update").mCustomScrollbar("scrollTo", "99999")
  }),
  //SDK准备就绪后触发事件，全局事件
  VHALL_SDK.on("ready", function() {
    VHALL_SDK.vhall_get_history_notice(),
      1 == VHALL_SDK.getRoominfo().type ? (VHALL_SDK.vhall_get_live_history_chat_msg(), 1 == VHALL_SDK.getRoominfo().openQuestion && VHALL_SDK        .vhall_get_live_history_question_msg()) : VHALL_SDK.vhall_get_record_history_chat_msg()
  }),
  //SDK调用错误事件消息，全局事件
    VHALL_SDK.on("error", function(t) {
      alert("发生错误: " + JSON.stringify(t))
    }),
  //  用户上线事件消息
    VHALL_SDK.on("userOnline", function(t) {
      console.log(t)
    }),
  //    用户下线事件消息
    VHALL_SDK.on("userOffline", function(t) {
      console.log(t)
    }),
  //    发送签到请求后触发事件
    VHALL_SDK.on("sendSign", function(t) {
      console.log(t)
    }),
  //  发送更新用户信息请求后触发事件
    VHALL_SDK.on("UpdateUser", function(t) {
      console.log(t)
    }),
    VHALL_SDK.on("sendCustomEvent",
      function(t) {
        console.log(t)
      }),
    VHALL_SDK.on("sendChat",
      function(t) {
        console.log(t)
      }),
    VHALL_SDK.on("sendChat",
      function(t) {
        console.log(t)
      }),
    VHALL_SDK.on("sendQuestion",
      function(t) {
        console.log(t)
      }),
    VHALL_SDK.on("disableChat",
      function(t) {
        console.log("禁言", t)
      }),
    VHALL_SDK.on("permitChat",
      function(t) {
        console.log("恢复禁言", t)
      }),
    VHALL_SDK.on("forbidChat",
      function(t) {
        console.log("全体禁言", t)
      }),
    VHALL_SDK.on("kickout",
      function(t) {
        console.log("踢出", t)
      }),
    VHALL_SDK.on("kickoutRestore",
      function(t) {
        console.log("恢复踢出", t)
      }),
    // [questionSwitch 直播问答开关消息]msg [msg.status 1：开启，0：关闭]
    VHALL_SDK.on("questionSwitch", function(t) {
      console.log(t);
      1 == t.status ? alert("问答已开启") : alert("问答已关闭")
    }),

    Date.prototype.Format = function(t) {
      var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,
        "H+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
      };
      /(y+)/.test(t) && (t = t.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (var e in o) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? o[e] : ("00" + o[e]).substr(("" + o[e]).length)));
      return t
    },
  //  收到公告消息时候触发
    VHALL_SDK.on("announcement", function(t) {
      var o = "<li><div>" + t + "</div><span>" + (new Date).Format("yyyy-MM-dd HH:mm:ss") + "</span></li>";
      $("#notice-msg>ul").append(o)
    }),
  //  拉取历史直播公告消息后触发事件
    VHALL_SDK.on("vhall_history_notice", function(t) {
      if ("200" == t.code) {
        var o = "";
        $.each(t.data.data,
          function(t, e) {
            o = "<li><div>" + JSON.parse(e.content).content + "</div><span>" + e.created_at + "</span></li>" + o
          }),
          $("#notice-msg>ul").html(o)
      } else console.log(t.msg)
    }),
  //  接收到签到消息后触发事件
    VHALL_SDK.on("startSign", function(t) {function o() {
      setTimeout(function() {
          e.text(--n + "秒"),
            0 != n && $(".sign").hasClass("active") ? o() : ($(".sign").removeClass("active"), e.text("0秒"), e = null)
        },
        1e3)
    }
  //  获取时间
      var e = $(".sign .sign-second"),
        n = t.sign_show_time;
      e.text(n + "秒"),
        $(".sign").data("signID", t.sign_id).addClass("active"),
        $(".sign-btn").click(function() {
          $(".sign").removeClass("active"),
            VHALL_SDK.sendSign($(".sign").data("signID"))
        }),
        o()
    }),
  //  直播活动结束，全局事件
    VHALL_SDK.on("streamOver", function(t) {
      alert("活动已结束")
    }),
  //  活动开始推流，全局事件
    VHALL_SDK.on("publishStart", function(t) {
      alert("活动开始推流")
    }),
  //  拉取直播历史消息后触发事件
    VHALL_SDK.on("vhall_live_history_chat_msg", function(t) {
      if (200 == t.code) {
        for (var e = "",n = t.data.length - 1; n >= 0; n--)
          e += o(t.data[n]);
        $("#chatmsg").append(e),
          setTimeout(function() {
              $(".chatmsg-box").mCustomScrollbar("update").mCustomScrollbar("scrollTo", "999999")
            },
            50)
      }
    }),
    VHALL_SDK.on("vhall_record_history_chat_msg",
      function(t) {
        if (200 == t.code) {
          var e = "";
          $("#chatmsg").data("curr_page", t.curr_page);
          for (var n = t.data.length - 1; n >= 0; n--) e += o(t.data[n]);
          1 == t.curr_page ? ($("#chatmsg").html(e), setTimeout(function() {
              $(".chatmsg-box").mCustomScrollbar("update").mCustomScrollbar("scrollTo", "999999")
            },
            50)) : ($("#chatmsg").prepend(e), $(".chartlist").mCustomScrollbar("update").mCustomScrollbar("scrollTo", "20px"))
        }
      }),
    VHALL_SDK.on("getQuestionList",
      function(t) {
        if (200 == t.code) {
          for (var o = "",n = t.data.length - 1; n >= 0; n--){o += e(t.data[n])};
          $("#question-msg").append(o),
            setTimeout(function() {
                $(".chatmsg-box").mCustomScrollbar("update").mCustomScrollbar("scrollTo", "999999")
              },
              50)
        }
      }),
    $(".chatmsg-box").mCustomScrollbar({
      scrollInertia: 200,
      callbacks: {
        onTotalScrollBack: function() {
          if ("1" != VHALL_SDK.room.type) {
            var t = parseInt($("#chatmsg").data("curr_page"));
            VHALL_SDK.vhall_get_record_history_chat_msg(t + 1)
          }
        }
      }
    }),
    function send(msg){
      console.log('我是笔记'+msg);
    };
  //  发送列表
  $("#sendChat").click(function() {
    console.log($("#mywords").val());
    var t = $("#mywords").val(),

      n = null;
    $(".tab-pane.active").hasClass("chatmsg-box") ? ((n = VHALL_SDK.sendChat({
      text: t
    })) && $("#chatmsg").append(n), $("#mywords").val(""), $(".chatmsg-box").mCustomScrollbar("update").mCustomScrollbar("scrollTo", "999999")) : ((n = VHALL_SDK.sendQuestion({
      text: t
    }))&& $("#question-msg").append(n), $("#mywords").val(""), $(".question-box").mCustomScrollbar("update").mCustomScrollbar("scrollTo", "999999"))
  }),
    VHALL_SDK.on("playerError",
      function(t) {
        console.log(t)
      }),
      VHALL_SDK.on("playerReady",function() {
        VHALL_SDK.player.on("canPlayLines",function(t) {
          var o = "";
          t.forEach(function(t) {
            o += "<li>" + t + "</li>"
          }),
            $("#lines").html(o).find("li").eq(0).addClass("active")
        }),
          VHALL_SDK.player.on("canPlayDefinitions",function(t) {
            var o = "";
            t.forEach(function(t) {
              o += "<li>" + t + "</li>"
            }),
              $("#definitions").html(o).find("li").eq(0).addClass("active")
          })
      }),
      $(".sign-header>img").click(function(t) {
        t.stopPropagation(),
          $(".sign").removeClass("active"),
          $(".sign .sign-second").text("0秒")
      }),
      $(".help-tool").click(function(t) {
        $("#userEvent").toggleClass("active"),
          setTimeout(function() {
              $("#userData").toggleClass("active")
            },
            100),
          setTimeout(function() {
              $("#exchange").toggleClass("active")
            },
            200),
          setTimeout(function() {
              $("#hideVideo").toggleClass("active")
            },
            300)
      })
    },
    methods: {

    }
  };

</script>
<!--<script type="text/template" id="chat-template">-->
<!--<li uid="<%= user_id%>">-->
<!--<a class="avatar" href="javascript:;" title="<%= user_name%>"><img src="<%= avatar%>" width="32" height="32" onerror="this.src='//cnstatic01.e.vhall.com/static/images/watch/head50.png'" class=""></a>-->
<!--<div class="msg">-->
<!--<p> <% if (role == 'assistant') {%> <a class="tips assistant" href="javascript:;">助理</a> <% } else if (role == 'host') {%> <a class="tips host" href="javascript:;">主持人</a> <% } else if (role == 'guest') {%> <a class="tips guest" href="javascript:;">嘉宾</a> <% } %> <a class="name" href="javascript:;" title="<%= user_name%>"> <%= user_name%> </a>-->
<!--</p>-->
<!--<p class="content"> <% print(content) %> </p>-->
<!--</div>-->
<!--</li>-->
<!--</script>-->
<!--<script type="text/template" id="question-template">-->
<!--<li question-id="<%= data.id %>" uid="<%= data.join_id %>">-->
<!--<a class="avatar" href="javascript:;"><img src="//cnstatic01.e.vhall.com/static/images/watch/question.png" width="32" height="32"></a>-->
<!--<div class="msg">-->
<!--<p>-->
<!--<a class="name" href="javascript:;" title="<%= data.nick_name%>"> <%= data.nick_name%> </a>-->
<!--<span class="time"><%= data.created_at %></span></p>-->
<!--<p class="content"> <%= data.content %> </p>-->
<!--</div> <% if (data.answer) {-->
<!--switch (data.answer.role_name) {-->
<!--case 'host' :-->
<!--data.answer.role = '主持人';-->
<!--break;-->
<!--case 'guest' :-->
<!--data.answer.role = '嘉宾';-->
<!--break;-->
<!--default :-->
<!--data.answer.role = '助理';-->
<!--break;-->
<!--}-->
<!--%> <div class="answerlist" answer-id="<%= data.answer.id %>">-->
<!--<div class="triangle">-->
<!--<div></div>-->
<!--</div>-->
<!--<ul>-->
<!--<li>-->
<!--<p> <%= data.answer.nick_name %> |-->
<!--<a class="role <%=  data.answer.role_name %>" href="javascript:;"> <%=  data.answer.role %>回答</a>-->
<!--<span class="time"><%= data.answer.created_at %></span>-->
<!--</p>-->
<!--<p class="content"> <%= data.answer.content %> </p>-->
<!--</li>-->
<!--</ul>-->
<!--</div> <%}%> </li>-->
<!--</script>-->

<style type="text/css">
  @import '../../static/jquery.mCustomScrollbar.min.css';
  .container {
    width: 100%;
    position: absolute;
    box-sizing: border-box;
    top: 240px;
    bottom: 0;
    overflow: hidden;
    cursor: pointer
  }

  .header {
    position: absolute;
    width: 100%;
    height: 36px;
    line-height: 36px;
    top:80px;
    background-color: #201f25;
    z-index: 3
  }

  .header a {
    width: 25%;
    float: left;
    text-align: center;
    text-decoration: none;
    color: #ddd
  }

  .header a.active {
    background-color: #f33;
    color: #fff
  }

  .chatmsg-box,.question-msg-box {
    padding-top: 36px;
    padding-bottom: 70px;
    box-sizing: border-box;
    height: 100%;
    display: none;
    overflow-y: auto;
    background-color: #282830
  }

  .notice-msg-box {
    padding-top: 36px;
    box-sizing: border-box;
    height: 100%;
    display: none;
    overflow-y: auto;
    background-color: #282830;
    color: #bcbcbc;
    font-size: 14px
  }

  .notice-msg-box ul {
    list-style: none
  }

  .notice-msg-box ul>li {
    padding: 10px 22px
  }

  .notice-msg-box ul>li>div {
    width: 100%;
    word-wrap: break-word;
    overflow: hidden
  }

  .notice-msg-box ul>li>span {
    font-size: 12px;
    color: #6f6f6f
  }

  .chatmsg-box.active,.notice-msg-box.active,.question-msg-box.active {
    display: block
  }

  .mCSB_inside>.mCSB_container {
    margin-right: 0
  }

  .send-box {
    position: absolute;
    bottom: 0;
    height: 70px;
    background: #201f25;
    width: 100%;
    color: #bcbcbc
  }
  .noteSend{
    position: absolute;
    height:60px;
    bottom: 0px;
    left: 0px;
  }
  .noteSend textarea{
    height: 60px;
    width: 100%;
    resize: none;
    outline: 0;
    background-color: #201f25;
    border: none;
    padding: 10px;
    color: #bcbcbc;
    box-sizing: border-box
  }
  .noteSend .send-chat{
    position: absolute;
    bottom: 5px;
    right: 5px;
  }
  .send-box textarea {
    height: 40px;
    width: 100%;
    resize: none;
    outline: 0;
    background-color: #201f25;
    border: none;
    padding: 10px;
    color: #bcbcbc;
    box-sizing: border-box
  }

  .send-box .face {
    position: absolute;
    right: 70px;
    display: inline-block;
    width: 22px;
    height: 22px;
    background-color: red;
    background: url(../../static/image/chat-icon.png) no-repeat 0 -72px;
    margin-top: 45px
  }

  .send-chat {
    margin-top: 45px;
    position: absolute;
    right: 5px;
    display: inline-block;
    width: 52px;
    height: 20px;
    font-size: 12px;
    line-height: 20px;
    vertical-align: middle;
    background-color: #353540;
    text-decoration: none;
    color: #fff;
    border-radius: 3px;
    text-align: center
  }

  .chatmsg li {
    overflow: hidden;
    padding: 10px 22px;
    text-align: left;
    list-style: none
  }

  .chatmsg li a {
    text-decoration: none
  }

  .chatmsg li img {
    vertical-align: middle
  }

  .chatmsg li .avatar {
    display: inline-block;
    float: left;
    border-radius: 50%;
    overflow: hidden;
    line-height: 0;
    position: absolute;
    left: 15px
  }

  .chatmsg li .msg {
    float: left;
    margin-left: 45px
  }

  .chatmsg li .msg p {
    color: #6f6e6e;
    line-height: 16px;
    font-size: 12px;
    margin: 0
  }

  .chatmsg li .msg p .tips {
    display: inline-block;
    float: left;
    text-align: center;
    border: 1px solid #f33;
    font-size: 12px;
    width: 42px;
    height: 16px;
    line-height: 16px;
    margin-right: 10px
  }

  .chatmsg li .msg p .tips.host {
    color: #f33;
    border: 1px solid #f33
  }

  .chatmsg li .msg p .tips.guest {
    color: #a4824b;
    border: 1px solid #ffc864
  }

  .chatmsg li .msg p .tips.assistant {
    color: #446ea4;
    border: 1px solid #5da6fc
  }

  .chatmsg li .msg p .name {
    display: inline-block;
    color: #6f6e6e;
    width: 128px;
    line-height: 18px;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left
  }

  .chatmsg li .msg p .time {
    float: right
  }

  .chatmsg li .msg .content {
    line-height: 18px;
    font-size: 14px;
    color: #bcbcbc;
    word-wrap: break-word;
    word-break: break-all;
    margin-top: 8px
  }

  .chatmsg li .msg .content.sys {
    color: #fff
  }

  .chatmsg li .msg .content.sys a {
    color: #f33
  }

  .chatmsg li .msg .content.redp {
    color: #fff
  }

  .chatmsg li .msg .content.redp .name {
    display: inline-block;
    color: #fff;
    width: auto;
    max-width: 128px;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left
  }

  .chatmsg li .msg .content.redi {
    color: #fbd75a
  }

  .question-msg li a {
    text-decoration: none
  }

  .question-msg li {
    overflow: hidden;
    padding: 10px 22px;
    text-align: left;
    list-style-type: none
  }

  .question-msg li .avatar {
    display: inline-block;
    float: left;
    border-radius: 50%;
    overflow: hidden;
    line-height: 0
  }

  .question-msg li .msg {
    margin-left: 45px
  }

  .question-msg li .msg p {
    color: #6f6e6e;
    line-height: 16px;
    font-size: 12px;
    margin: 0;
    padding-right: 10px
  }

  .question-msg li .msg p .tips {
    display: inline-block;
    float: left;
    text-align: center;
    border: 1px solid #f33;
    font-size: 12px;
    width: 42px;
    height: 16px;
    line-height: 16px;
    margin-right: 10px
  }

  .question-msg li .msg p .tips.host {
    color: #f33;
    border: 1px solid #f33
  }

  .question-msg li .msg p .tips.guest {
    color: #a4824b;
    border: 1px solid #ffc864
  }

  .question-msg li .msg p .tips.assistant {
    color: #446ea4;
    border: 1px solid #5da6fc
  }

  .question-msg li .msg p .name {
    display: inline-block;
    color: #6f6e6e;
    width: 128px;
    line-height: 18px;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
    text-decoration: none
  }

  .question-msg li .msg p .time {
    float: right
  }

  .question-msg li .msg .content {
    line-height: 18px;
    font-size: 14px;
    color: #bcbcbc;
    word-wrap: break-word;
    word-break: break-all;
    margin-top: 8px
  }

  .question-msg li .answerlist {
    position: relative;
    margin-left: 42px;
    margin-top: 10px;
    border-radius: 3px;
    border: 1px solid #393940;
    background-color: #202026;
    padding: 10px
  }

  .question-msg li .answerlist .triangle {
    position: absolute;
    top: -10px;
    left: 14px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #37373e;
    font-size: 0;
    line-height: 0
  }

  .question-msg li .answerlist .triangle div {
    position: absolute;
    top: 2px;
    left: -8.5px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid #202026;
    font-size: 0;
    line-height: 0
  }

  .question-msg li .answerlist ul li {
    padding: 0
  }

  .question-msg li .answerlist ul li p {
    font-size: 12px;
    color: #909090;
    line-height: 20px;
    vertical-align: middle
  }

  .question-msg li .answerlist ul li p .role {
    color: #f34b46
  }

  .question-msg li .answerlist ul li p .role.host {
    color: #f33
  }

  .question-msg li .answerlist ul li p .role.guest {
    color: #a4824b
  }

  .question-msg li .answerlist ul li p .role.assistant {
    color: #446ea4
  }

  .question-msg li .answerlist ul li p .time {
    float: right
  }

  .question-msg li .answerlist ul li .content {
    color: #e2e1e1;
    word-wrap: break-word;
    word-break: break-all
  }

  body,html {
    height: 100%
  }

  .player-container {
    height: 240px;
    position: relative;
    z-index: 3
  }

  .video {
    height: 240px;
    background: #000
  }

  .doc {
    height: 260px;
    width: 100%;
    margin-top: 36px;
    position: absolute;
    z-index: 3
  }

  .page-pc .player-container {
    height: 100%;
    background: #000;
    margin-right: 320px
  }

  .page-pc .container {
    width: 320px;
    right: 0;
    top: 0
  }

  .page-pc .video {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 4
  }

  .page-pc .doc {
    position: relative;
    width: 100%;
    height: 100%;
    margin-top: 0
  }

  .page-pc .hideVideo {
    display: none
  }

  .doc.on {
    display: none
  }

  .hideVideo {
    position: absolute;
    right: 5px;
    bottom: 40px
  }

  .modal {
    display: none;
    position: fixed;
    z-index: 1001;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: #e1e1e1
  }

  .modal {
    box-sizing: border-box;
    padding: 50px 0
  }

  .modal li {
    line-height: 30px;
    text-align: center
  }

  .modal li.active {
    color: #f33
  }

  .exchange {
    bottom: 70px
  }

  .page-pc .layer {
    width: 500px;
    margin-left: -250px
  }

  .layer {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 90%;
    height: 350px;
    margin-left: -45%;
    margin-top: -180px;
    z-index: 10000;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    display: none
  }

  .layer-header {
    height: 44px;
    line-height: 44px;
    font-size: 14px;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    color: #4e4e4e;
    background-color: #f7f7f7;
    text-align: center;
    position: relative
  }

  .layer-header img {
    width: 13px;
    height: 14px;
    position: absolute;
    right: 20px;
    top: 16px;
    cursor: pointer
  }

  .layer-textarea {
    width: 80%;
    height: 200px;
    margin: auto;
    display: block;
    resize: none;
    outline: 0;
    margin-top: 20px
  }

  .layer-btn {
    display: block;
    margin: auto;
    margin-top: 20px;
    background-color: #f15c5c;
    color: #fff;
    text-align: center;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    width: 80%;
    border-radius: 4px;
    border: 0
  }

  .page-pc .sign {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 500px;
    height: 350px;
    margin-left: -250px;
    margin-top: -180px;
    -webkit-transform: translate(0,0);
    transform: translate(0,0);
    display: none
  }

  .page-pc .sign.active {
    display: block
  }

  .sign.active {
    -webkit-transform: translate(0,0);
    transform: translate(0,0)
  }

  .sign {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 11;
    background-color: #fff;
    -webkit-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
    -webkit-transform: translate(0,100%);
    transform: translate(0,100%);
    font-size: 12px
  }

  .sign.active {
    -webkit-transform: translate(0,0);
    transform: translate(0,0)
  }

  .sign-header {
    height: 44px;
    line-height: 44px;
    font-size: 14px;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    color: #4e4e4e;
    background-color: #f7f7f7;
    text-align: center;
    position: relative
  }

  .sign-header img {
    width: 13px;
    height: 14px;
    position: absolute;
    right: 20px;
    top: 16px;
    cursor: pointer
  }

  .page-pc .sign-img {
    display: none
  }

  .sign-img {
    width: 22px;
    margin: auto;
    display: block;
    margin-top: 25px
  }

  .page-pc .sign-title {
    font-size: 20px;
    color: #333;
    font-weight: 700;
    margin-top: 50px
  }

  .sign-title {
    color: #f15c5c;
    text-align: center;
    margin-top: 15px
  }

  .sign-time {
    text-align: center;
    margin-top: 25px;
    color: #4e4e4e
  }

  .sign-time>span {
    color: #f15c5c
  }

  .sign-btn {
    display: block;
    margin: auto;
    margin-top: 50px;
    background-color: #f15c5c;
    color: #fff;
    text-align: center;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    width: 80%;
    border-radius: 4px;
    border: 0
  }

  .help-wrap {
    position: absolute;
    top: 100px;
    z-index: 10;
    right: 0
  }

  .page-pc #exchange,.page-pc #hideVideo {
    display: none
  }

  .help-tool {
    position: absolute;
    right: 10px;
    width: 50px;
    padding: 5px 0;
    text-align: center;
    border-radius: 15px;
    font-size: 12px;
    color: #3385ff;
    cursor: pointer;
    background-color: rgba(255,255,255,.6);
    cursor: pointer
  }

  .help-item {
    position: absolute;
    width: 115px;
    background-color: red;
    right: -10px;
    font-size: 14px;
    padding: 5px;
    text-decoration: none;
    color: #3385ff;
    background-color: rgba(255,255,255,.6);
    -webkit-transition: all .3s cubic-bezier(.08,.13,0,1.27);
    transition: all .3s cubic-bezier(.08,.13,0,1.27);
    -webkit-transform: translate(100%,0);
    transform: translate(100%,0)
  }

  .help-item.active {
    -webkit-transform: translate(0,0);
    transform: translate(0,0)
  }

  #userEvent {
    top: 40px
  }

  #userData {
    top: 80px
  }

  #exchange {
    top: 120px
  }

  #hideVideo {
    top: 160px
  }</style>
