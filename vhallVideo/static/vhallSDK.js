/*!
 *  @copyright (c) 2016
 *  @author: wenfeng.lei
 *  @update: Thu Dec 07 2017 23:30:57 GMT+0800 (中国标准时间)
 */
console.log('VHALL_SDK');
!function(e) {
    function t(n) {
        if (i[n]) return i[n].exports;
        var r = i[n] = {
            exports: {},
            id: n,
            loaded: !1
        };
        return e[n].call(r.exports, r, r.exports, t),
        r.loaded = !0,
        r.exports
    }
    var i = {};
    return t.m = e,
    t.c = i,
    t.p = "/",
    t(0)
} ([function(e, t, i) {
    e.exports = i(25)
},
function(e, t) {
    var i = {},
    n = null,
    r = null,
    a = null;
    n = function(e, t) {
        i[e] || (i[e] = []),
        i[e].push(t)
    },
    r = function() {
        var e = Array.prototype.slice.call(arguments),
        t = Array.prototype.shift.call(e),
        n = i[t];
        if (n && n.length >= 0) for (var r = 0,
        a = n.length; r < a; r++) n[r].apply(null, e)
    },
    a = function(e, t) {
        var n = i[e];
        if (!n) return ! 1;
        if (t) for (var r = n.length - 1; r >= 0; r--) {
            var a = n[r];
            a === t && n.splice(r, 1)
        } else n && (n.length = 0)
    },
    e.exports = {
        listen: n,
        trigger: r,
        remove: a
    }
},
function(e, t, i) {
    var n = i(7),
    r = {};
    e.exports = {
        create: function(e) {
            n(e) && (r = e)
        },
        setter: function(e, t) {
            r[e] = t
        },
        getter: function(e) {
            return r[e]
        },
        get: function() {
            return r
        }
    }
},
function(e, t, i) {
    var n = i(7),
    r = i(1),
    a = {};
    e.exports = {
        create: function(e) {
            n(e) && (a = e)
        },
        setter: function(e, t) {
            a[e] = t
        },
        getter: function(e) {
            return a[e]
        },
        get: function() {
            return a
        },
        sendSign: function(e) {
            var t = {
                webinar_id: VHALL_SDK.options.roomid,
                user_id: this.get().userid,
                nick_name: this.get().username,
                sign_id: e
            };
            $.ajax({
                url: "//e.vhall.com/api/jssdk/v1/webinar/add-sign-record",
                type: "get",
                dataType: "jsonp",
                jsonp: "callback",
                data: t,
                success: function(e) {
                    n(e) || (e = JSON.parse(e));
                    var t = {
                        code: 2e4,
                        msg: "请求成功"
                    };
                    "200" != e.code && (t = {
                        code: 20005,
                        msg: "接口请求失败"
                    }),
                    r.trigger("sendSign", t)
                },
                error: function(e) {
                    r.trigger("sendSign", {
                        code: 20005,
                        msg: "接口请求失败"
                    })
                }
            })
        },
        updateUserInfo: function(e) {
            var t = {
                update_auth: a.updateAuth,
                join_id: a.userid
            };
            e && (t.username = encodeURIComponent(e)),
            a.dataToken && (t.token = a.dataToken),
            $.ajax({
                url: "//e.vhall.com/api/jssdk/v1/webinar/update-token",
                type: "get",
                dataType: "jsonp",
                jsonp: "callback",
                data: t,
                success: function(e) {
                    var t = {
                        code: 2e4,
                        msg: "请求成功"
                    };
                    200 == e.code ? (a.dataToken = e.data.token, a.username = e.data.visitor.nick_name, a.avatar = e.data.visitor.avatar, a.dataToken && r.trigger("_updateUserInfo", a.dataToken)) : t = {
                        code: 20005,
                        msg: "接口请求失败"
                    },
                    r.trigger("UpdateUser", t)
                },
                error: function(e) {
                    r.trigger("UpdateUser", {
                        code: 20005,
                        msg: "接口请求失败"
                    })
                }
            })
        }
    }
},
function(e, t, i) {
    function n(e) {
        if (e) {
            e = e.replace(/\</g, "&lt;").replace(/\>/g, "&gt;").replace(/\n/g, "<br/>");
            var t = "//cnstatic01.e.vhall.com/static/img/arclist/",
            i = e.match(/\[[^@]{1,3}\]/g);
            if (null !== i) for (var n = 0; n < i.length; n++) {
                var r = a(i[n]);
                r && (e = e.replace(i[n], '<img width="24" src="' + t + "Expression_" + r + '@2x.png" border="0"/>'))
            }
        }
        return e
    }
    i(27);
    var r = i(8),
    a = i(24);
    $.fn.qqFace = function(e) {
        var t = {
            id: "facebox",
            path: "face/",
            assign: "#content"
        },
        i = $.extend(t, e),
        n = i.assign,
        o = i.id,
        s = i.path;
        return n.length <= 0 ? (alert("缺少表情赋值对象。"), !1) : ($(this).click(function(e) {
            var t, n, c;
            if (!$(this).hasClass("disabled")) {
                var d = $(this).parent().find("." + o);
                if (d.length <= 0) if (r) {
                    t = '<div class="' + o + ' facebox-pc mCustomScrollbar"><table border="0" cellspacing="0" cellpadding="0"><tr>';
                    for (var l = 1; l <= 90; l++) n = a(l - 1),
                    t += '<td><img width="24" src="' + s + "Expression_" + l + '@2x.png" onclick="$(\'' + i.assign + "').setCaret();$('" + i.assign + "').insertAtCaret('" + n + "');\" /></td>",
                    l % 9 === 0 && (t += "</tr><tr>");
                    t += "</tr></table></div>",
                    $(this).parent().append(t),
                    c = $(this).position()
                } else {
                    var u = $(window).width(),
                    p = "";
                    t = '<div class="' + o + ' facebox-mobile" style="width:' + u + 'px;"><div class="qqFace-box" style="width:' + 5 * u + 'px">';
                    for (var l = 1; l <= 5; l++) {
                        t += '<div class="qqFace-mobile" style="width:' + u + 'px">';
                        for (var g = 1; g <= 20; g++) {
                            var f = 20 * (l - 1) + g;
                            n = a(f - 1),
                            n && (t += "<li onclick=\"$('" + i.assign + "').setCaret();$('" + i.assign + "').insertAtCaret('" + n + '\');"><img width="24" src="' + s + "Expression_" + f + '@2x.png" /></li>')
                        }
                        t += "<li onclick=\"$('" + i.assign + '\').deleteCaret();" ><img width="24" src="' + s + 'faceDelete@2x.png" /></li></div>',
                        p += 1 === l ? "<a class='active'></a>": "<a></a>"
                    }
                    t += "<div style='clear:both'></div></div><div class='text-center'>" + p + "</div></div>",
                    $(this).parent().append(t),
                    c = $(this).position(),
                    d = $(this).parent().find("." + o),
                    d.data("data", {
                        index: 0
                    });
                    var h, v, y = !1,
                    m = d.find(".qqFace-box").eq(0).get(0);
                    d[0].addEventListener("touchstart",
                    function(e) {
                        h = e.touches[0].pageX
                    },
                    !1),
                    d[0].addEventListener("touchmove",
                    function(e) {
                        e.preventDefault(),
                        v = e.touches[0].pageX - h;
                        var t = $(this).data("data").index * u,
                        i = "translate3d(" + (v - t) + "px, 0, 0)";
                        m.style.webkitTransform = i,
                        m.style.mozTransform = i,
                        m.style.transform = i,
                        y = !0
                    },
                    !1),
                    d[0].addEventListener("touchend",
                    function(e) {
                        if (y) {
                            var t = $(this).data("data").index,
                            i = t * u;
                            v < -50 ? t < 4 && (t += 1, $(this).data("data", {
                                index: t
                            }), i += u) : v > 50 && t >= 1 && (t -= 1, $(this).data("data", {
                                index: t
                            }), i -= u),
                            d.find(".text-center a").removeClass("active").eq(t).addClass("active");
                            var n = "translate3d(-" + i + "px, 0, 0)";
                            m.style.webkitTransform = n,
                            m.style.mozTransform = n,
                            m.style.transform = n
                        }
                        y = !1
                    },
                    !1),
                    d.on("click", "li",
                    function(e) {
                        e.stopPropagation()
                    })
                }
                $(this).parent().find("." + o).toggle(),
                e.stopPropagation()
            }
        }), void $(document).click(function() {
            $("." + o).hide()
        }))
    },
    $.fn.extend({
        selectContents: function() {
            $(this).each(function(e) {
                var t, i, n, r, a = this; (n = a.ownerDocument) && (r = n.defaultView) && "undefined" != typeof r.getSelection && "undefined" != typeof n.createRange && (t = window.getSelection()) && "undefined" != typeof t.removeAllRanges ? (i = n.createRange(), i.selectNode(a), 0 === e && t.removeAllRanges(), t.addRange(i)) : document.body && "undefined" != typeof document.body.createTextRange && (i = document.body.createTextRange()) && (i.moveToElementText(a), i.select())
            })
        },
        setCaret: function() {
            if (/msie/.test(navigator.userAgent.toLowerCase())) {
                var e = function() {
                    var e = $(this).get(0);
                    e.caretPos = document.selection.createRange().duplicate()
                };
                $(this).click(e).select(e).keyup(e)
            }
        },
        insertAtCaret: function(e) {
            var t = $(this).get(0);
            if (document.all && t.createTextRange && t.caretPos) {
                var i = t.caretPos;
                i.text = "" === i.text.charAt(i.text.length - 1) ? e + "": e
            } else if (t.setSelectionRange) {
                var n = t.selectionStart,
                a = t.selectionEnd,
                o = t.value.substring(0, n),
                s = t.value.substring(a);
                t.value = o + e + s;
                var c = e.length;
                t.setSelectionRange(n + c, n + c),
                r ? $(this).focus() : $(this).blur()
            } else t.value += e
        },
        deleteCaret: function() {
            var e = $(this),
            t = e.val(),
            i = /(\[[^@]{1,3}\])$/;
            t = i.test(t) ? t.replace(i, "") : t.substring(0, t.length - 1),
            e.val(t),
            e.blur()
        }
    }),
    e.exports = n
},
function(e, t) {
    e.exports = {
        10000 : "消息体格式不正确",
        10001 : "输入不能为空",
        10002 : "当前用户被禁言",
        10003 : "聊天输入不能超过140个字符",
        10004 : "当前已开启全员禁言",
        10005 : "当前活动不在直播",
        10006 : "当前活动未开启问答",
        10007 : "当前用户被踢出",
        20000 : "接口请求成功",
        20005 : "接口请求失败",
        50400 : "用户身份认证错误",
        50401 : "用户发送消息频次超过限制",
        50402 : "活动xxx发送消息频次超过限制",
        50403 : "自定义广播消息内容长度超过限制"
    }
},
function(e, t, i) {
    var n = i(1),
    r = i(5),
    a = i(4),
    o = (i(3), {
        eventProcessors: {},
        init: function(e) {
            this.options = e,
            this.pushstream = new PushStream({
                host: e.domain,
                port: e.port,
                modes: "websocket|longpolling",
                messagesPublishedAfter: 0,
                useSSL: "https:" === window.location.protocol,
                messagesControlByArgument: !0
            }),
            this.pushstream.addChannel(e.roomid),
            this.pushstream.connect(),
            this.bind()
        },
        close: function() {
            this.pushstream.disconnect()
        },
        open: function() {
            this.pushstream.connect()
        },
        onevent: function(e, t) {
            return "string" != typeof e ? console.log("事件类型必须传入string") : void(this.eventProcessors[e] = t)
        },
        bind: function() {
            var e = this;
            this.pushstream.onmessage = function(t) {
                var i;
                try {
                    i = JSON.parse(t)
                } catch(e) {
                    return void console.log(e, t)
                }
                try {
                    e.eventProcessors[i.event](i)
                } catch(e) {
                    return void console.log(e, i)
                }
            },
            n.listen("_updateUserInfo",
            function(e) {
                this.options.token = e
            }.bind(this)),
            this.onevent("online",
            function(e) {
                n.trigger("userOnline", e)
            }),
            this.onevent("offline",
            function(e) {
                n.trigger("userOffline", e)
            }),
            this.onevent("msg",
            function(e) {
                var t = VHALL_SDK.getUserinfo();
                return ! (e.user_id == t.userid || t.forbidchat && "user" == e.role || e.data.notpublic && "host" != e.role) && (e.avatar = e.avatar ? e.avatar: "//cnstatic01.e.vhall.com/static/images/watch/head50.png", e.content = a(e.data.text), void n.trigger("chatMsg", e))
            }),
            this.onevent("custom_broadcast",
            function(e) {
                n.trigger("customEvent", e.data)
            }),
            this.onevent("question",
            function(e) {
                var t = VHALL_SDK.getUserinfo();
                return ("question" != e.data.type || "user" != t.role && t.userid != e.data.join_id) && ((!e.data.answer || "0" != e.data.answer.is_open || "user" != t.role || e.data.join_id == t.userid) && (e.data.content = a(e.data.content), e.data.answer && (e.data.answer.content = a(e.data.answer.content)), void n.trigger("questionMsg", e)))
            })
        },
        sendCustomEvent: function(e) {
            $.ajax({
                url: o.options.pubUrl,
                type: "get",
                dataType: "jsonp",
                jsonp: "callback",
                data: {
                    token: o.options.token,
                    event: "custom_broadcast",
                    app_key: o.options.app_key,
                    data: JSON.stringify(e)
                },
                success: function(t) {
                    t = JSON.parse(t);
                    var i = {
                        code: 2e4,
                        msg: "请求成功",
                        data: e
                    };
                    "200" != t.code && (i = r[t.code] ? {
                        code: t.code,
                        msg: r[t.code],
                        data: e
                    }: {
                        code: 20005,
                        msg: "接口请求失败",
                        data: e
                    }),
                    n.trigger("sendCustomEvent", i)
                },
                error: function(e) {
                    n.trigger("sendCustomEvent", {
                        code: 20005,
                        msg: "接口请求失败"
                    })
                }
            })
        },
        sendChat: function(e) {
            if (o.filterWords && o.filterWords.length > 0) {
                for (var t = !1,
                i = e.text,
                r = o.filterWords,
                a = 0,
                s = o.filterWords.length; a < s; a++) if (i.indexOf(r[a]) >= 0) {
                    t = !0;
                    break
                }
                if (t) return void n.trigger("sendChat", e)
            }
            $.ajax({
                url: o.options.pubUrl,
                type: "get",
                dataType: "jsonp",
                jsonp: "callback",
                data: {
                    token: o.options.token,
                    event: "msg",
                    app_key: o.options.app_key,
                    data: JSON.stringify(e)
                },
                success: function(e) {
                    e = JSON.parse(e);
                    var t = {
                        code: 2e4,
                        msg: "请求成功"
                    };
                    "200" != e.code && (t = {
                        code: 20005,
                        msg: "接口请求失败"
                    }),
                    n.trigger("sendChat", t)
                },
                error: function(e) {
                    n.trigger("sendChat", {
                        code: 20005,
                        msg: "接口请求失败"
                    })
                }
            })
        },
        sendQuestion: function(e) {
            $.ajax({
                url: "//e.vhall.com/api/jssdk/v1/question/addquestion",
                type: "get",
                dataType: "jsonp",
                jsonp: "callback",
                data: {
                    token: o.options.token,
                    content: e,
                    app_key: o.options.app_key
                },
                success: function(e) {
                    var t = {
                        code: 2e4,
                        msg: "请求成功"
                    };
                    "200" != e.code && (t = {
                        code: 20005,
                        msg: "接口请求失败"
                    }),
                    n.trigger("sendQuestion", t)
                },
                error: function(e) {
                    n.trigger("sendQuestion", {
                        code: 20005,
                        msg: "接口请求失败"
                    })
                }
            })
        }
    });
    e.exports = o
},
function(e, t) {
    function i(e) {
        return "[object Object]" === Object.prototype.toString.call(e)
    }
    e.exports = i
},
function(e, t) {
    function i() {
        for (var e = navigator.userAgent,
        t = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"], i = !0, n = 0; n < t.length; n++) if (e.indexOf(t[n]) > 0) {
            i = !1;
            break
        }
        return i
    }
    e.exports = i()
},
function(e, t, i) {
    function n(e) {
        e !== c && (c = e, s.doc[0].src = e)
    }
    function r() {
        var e = "";
        e = "1" == o.get().isBoard ? s.board_url: s.curr_file && "0" != s.curr_file ? s.doc_url + "/" + s.curr_file + "/" + s.curr_page + ".jpg": "mobile/doc_noloading.png",
        n(e)
    }
    var a = i(7),
    o = (i(1), i(2)),
    s = {
        doc_url: "",
        curr_file: "0",
        curr_page: "",
        totalPage: "",
        board_url: "//cnstatic01.e.vhall.com/static/img/mobile/blankspace.jpg"
    },
    c = "";
    e.exports = {
        create: function(e) {
            s = $.extend({},
            s, e),
            $(s.docContent).html('<img style="width:100%" src="mobile/doc_noloading.png" onerror="this.src = \'//cnstatic01.e.vhall.com/static/img/mobile/doc_error.png\'"/>'),
            s.doc = $(s.docContent).find("img"),
            r()
        },
        setter: function(e, t) {
            1 == o.getter("type") ? setTimeout(function() {
                a(e) ? s = $.extend({},
                s, e) : s[e] = t,
                r()
            },
            15e3) : (a(e) ? s = $.extend({},
            s, e) : s[e] = t, r())
        },
        getter: function(e) {
            return e ? s[e] : s
        }
    }
},
function(e, t, i) {
    var n = i(8),
    r = i(15),
    a = i(2),
    o = i(1),
    s = i(12),
    c = i(16),
    d = {
        init: function(e) {
            n ? (s(["//cnstatic01.e.vhall.com/3rdlibs/swfobject/2.2.0/swfobject.js", "//cnstatic01.e.vhall.com/3rdlibs/jquery-object/jqueryObject.js"],
            function() {
                c.init(e)
            }), this.exchageWhite = c.exchageWhite) : (this.player = new r(e), this.player.on("_playerError",
            function(e) {
                o.trigger("playerError", e)
            }), this.player.on("_playerReady",
            function() {
                var e = this;
                this.on = function(t, i) {
                    e.player.on(t, i)
                },
                this.setPlayerLine = function(t) {
                    e.player.setPlayerLine(t)
                },
                this.setPlayerDefinition = function(t) {
                    e.player.setPlayerDefinition(t)
                },
                1 == a.getter("type") && (this.seek = function(t) {
                    e.player.seek(t)
                }),
                o.trigger("playerReady"),
                this.player.onready()
            }.bind(this)))
        }
    };
    e.exports = d
},
function(e, t, i) {
    function n(e) {
        this.content = c(JSON.parse(e.content).text),
        this.avatar = e.avatar ? e.avatar: "//cnstatic01.e.vhall.com/static/images/watch/head50.png",
        this.role = e.user_role,
        this.user_name = e.user_name,
        this.time = e.created_at,
        this.user_id = e.user_id
    }
    function r(e) {
        var t = new Date;
        if (t.setHours(0), t.setMinutes(0), e) {
            var i = e.split(":");
            2 === i.length && (t.setHours(i[0]), t.setMinutes(i[1]))
        }
        return t
    }
    function a(e) {
        var t = sessionStorage.getItem("historyFilter"),
        i = [];
        if (t && (i = JSON.parse(t)), 0 === i.length) return e;
        for (var n = [], a = 0; a < e.length && !(n.length >= 20); a++) 0 === i.length ? n.push(e[a]) : r(e[a].time) > r(i[0].time) ? n.push(e[a]) : (n.push(i[0]), a--, i.shift());
        if (n.length < 20 && i.length > 0) for (var a = 0; a < i.length && !(n.length >= 20); a++) n.push(i[a]);
        return n
    }
    var o = i(1),
    s = i(5),
    c = i(4),
    d = i(6);
    e.exports = {
        sign: 0,
        getLiveChatMsg: function() {
            return this.sign ? void $.ajax({
                url: "//e.vhall.com/api/jssdk/v1/webinar/historymsg",
                dataType: "jsonp",
                jsonp: "callback",
                data: {
                    webinar_id: VHALL_SDK.options.roomid
                },
                success: function(e) {
                    if ("200" == e.code) {
                        var t = [],
                        i = 0;
                        for (e.data.length; i < e.data.length; i++) t.push(new n(e.data[i]));
                        o.trigger("vhall_live_history_chat_msg", {
                            code: 200,
                            data: t,
                            msg: "拉取数据成功"
                        })
                    } else o.trigger("vhall_live_history_chat_msg", {
                        code: 20005,
                        msg: s[20005]
                    })
                },
                error: function(e) {
                    o.trigger("vhall_live_history_chat_msg", {
                        code: 20005,
                        msg: s[20005]
                    })
                }
            }) : o.trigger("error", {
                code: 1006,
                msg: "sign error"
            })
        },
        getRecordChatMsg: function(e) {
            return this.sign ? void $.ajax({
                url: "//e.vhall.com/api/jssdk/v1/webinar/getmsg",
                dataType: "jsonp",
                jsonp: "callback",
                data: {
                    webinar_id: VHALL_SDK.options.roomid,
                    curr_page: e
                },
                success: function(e) {
                    if ("200" == e.code) {
                        var t = [],
                        i = 0;
                        for (e.data.data.length; i < e.data.data.length; i++) t.push(new n(e.data.data[i]));
                        var r = a(t);
                        o.trigger("vhall_record_history_chat_msg", {
                            code: 200,
                            curr_page: e.data.curr_page,
                            total: e.data.total,
                            data: r,
                            total_page: e.data.total_page,
                            msg: "拉取数据成功"
                        })
                    } else o.trigger("vhall_record_history_chat_msg", {
                        code: 20005,
                        msg: s[20005]
                    })
                },
                error: function(e) {
                    o.trigger("vhall_record_history_chat_msg", {
                        code: 20005,
                        msg: s[20005]
                    })
                }
            }) : o.trigger("error", {
                code: 1006,
                msg: "sign error"
            })
        },
        sendRecordChat: function(e) {
            if (!this.sign) return o.trigger("error", {
                code: 1006,
                msg: "sign error"
            });
            if (this.filterWords && this.filterWords.length > 0) {
                var t = sessionStorage.getItem("historyFilter"),
                i = [];
                t && (i = JSON.parse(t));
                for (var n = !1,
                r = e.content,
                a = this.filterWords,
                s = 0,
                c = this.filterWords.length; s < c; s++) if (r.indexOf(a[s]) >= 0) {
                    i.length >= 20 && i.pop(),
                    i.unshift(e),
                    sessionStorage.setItem("historyFilter", JSON.stringify(i)),
                    n = !0;
                    break
                }
                if (n) return void this.getRecordChatMsg(1)
            }
            var d = this;
            $.ajax({
                url: "//e.vhall.com/api/jssdk/v1/webinar/addmsg",
                dataType: "jsonp",
                jsonp: "callback",
                data: e,
                success: function(e) {
                    "200" == e.code ? (o.trigger("sendChat", {
                        code: 2e4,
                        msg: "请求成功"
                    }), setTimeout(function() {
                        d.getRecordChatMsg(1)
                    },
                    800)) : o.trigger("sendChat", {
                        code: 20005,
                        msg: "接口请求失败"
                    })
                },
                error: function(e) {
                    o.trigger("sendChat", {
                        code: 20005,
                        msg: "接口请求失败"
                    })
                }
            })
        },
        getQuestionlist: function() {
            return this.sign ? 1 != VHALL_SDK.getRoominfo().openQuestion ? o.trigger("error", {
                code: 10006,
                msg: s[10006]
            }) : 1 != VHALL_SDK.getRoominfo().type ? o.trigger("error", {
                code: 10005,
                msg: s[10005]
            }) : void $.ajax({
                url: "//e.vhall.com/api/jssdk/v1/question/list",
                dataType: "jsonp",
                jsonp: "callback",
                data: {
                    token: d.options.token
                },
                success: function(e) {
                    if ("200" == e.code) {
                        var t = [],
                        i = 0;
                        for (e.data.length; i < e.data.length; i++) e.data[i].content = c(e.data[i].content),
                        e.data[i].answer && (e.data[i].answer.content = c(e.data[i].answer.content)),
                        t.push({
                            data: e.data[i]
                        });
                        o.trigger("getQuestionList", {
                            code: 200,
                            data: t,
                            msg: "请求成功"
                        })
                    } else o.trigger("getQuestionList", e)
                },
                error: function(e) {
                    o.trigger("getQuestionList", e)
                }
            }) : o.trigger("error", {
                code: 1006,
                msg: "sign error"
            })
        },
        getNotice: function(e) {
            return e = e ? e: 1,
            this.sign ? void $.ajax({
                url: "//e.vhall.com/api/jssdk/v1/webinar/announcement-list",
                dataType: "jsonp",
                jsonp: "callback",
                data: {
                    webinar_id: VHALL_SDK.options.roomid,
                    curr_page: e
                },
                success: function(e) {
                    o.trigger("vhall_history_notice", e)
                },
                error: function(e) {
                    o.trigger("vhall_history_notice", e)
                }
            }) : o.trigger("error", {
                code: 1006,
                msg: "sign error"
            })
        }
    }
},
function(e, t) {
    function i(e, t) {
        if ("string" == typeof e) {
            var i = e;
            e = [],
            e.push(i)
        }
        var r = function(e, t) {
            n(e.shift(),
            function() {
                e.length ? r(e, t) : t && t()
            })
        };
        r(e, t)
    }
    function n(e, t) {
        var i = !1,
        n = document.createElement("script");
        n.src = e,
        n.onload = n.onreadystatechange = function() {
            i || this.readyState && "loaded" != this.readyState && "complete" != this.readyState || (i = !0, t && t())
        },
        document.body.appendChild(n)
    }
    e.exports = i
},
function(e, t, i) {
    t = e.exports = i(14)(),
    t.push([e.id, ".facebox-pc{background:#f7f7f7;padding:2px;border:1px solid #afafaf;position:absolute;display:none;z-index:2;top:-266px;left:0}.facebox-pc table td{padding:0}.facebox-pc table td img{cursor:pointer;border:1px solid #f7f7f7}.facebox-pc table td img:hover{border:1px solid #06c}.facebox-mobile{background:#fff;border-top:1px solid #ddd;position:absolute;display:none;z-index:2;overflow:hidden;height:170px;padding:0 1%;top:-170px}.facebox-mobile .qqFace-mobile{float:left}.facebox-mobile .qqFace{float:left;text-align:left}.facebox-mobile li{display:inline-block;padding:10px 0;width:14%;text-align:center}.facebox-mobile .text-center a{width:10px;height:10px;border-radius:100%;background:#ddd;border:none;color:#fff;margin:5px 15px 0 0;display:inline-block;text-decoration:none}.facebox-mobile .text-center a.active{background:#ff3334}.facebox-mobile .text-center{text-align:center}", ""])
},
function(e, t) {
    e.exports = function() {
        var e = [];
        return e.toString = function() {
            for (var e = [], t = 0; t < this.length; t++) {
                var i = this[t];
                i[2] ? e.push("@media " + i[2] + "{" + i[1] + "}") : e.push(i[1])
            }
            return e.join("")
        },
        e.i = function(t, i) {
            "string" == typeof t && (t = [[null, t, ""]]);
            for (var n = {},
            r = 0; r < this.length; r++) {
                var a = this[r][0];
                "number" == typeof a && (n[a] = !0)
            }
            for (r = 0; r < t.length; r++) {
                var o = t[r];
                "number" == typeof o[0] && n[o[0]] || (i && !o[2] ? o[2] = i: i && (o[2] = "(" + o[2] + ") and (" + i + ")"), e.push(o))
            }
        },
        e
    }
},
function(e, t, i) {
    function n(e) {
        return this.sourceType = 0,
        this.queryTime = 0,
        this.querySetTimeId = 0,
        this.slowSetTimeId = 0,
        this.stream = e.stream,
        this.clientList = {},
        this.$videoCont = $(e.videoCont),
        this.type = h.getter("type"),
        this.currentLine = "",
        this.lines = e.lines,
        this.definitions = e.definitions,
        this.playSource = {
            defaultLines: {},
            play_token: "",
            lines: {}
        },
        this.api_host = e.against_url,
        this.default_token = e.against_token,
        this.init(e),
        this
    }
    function r(e) {
        for (var t = window.crcTable || (window.crcTable = S()), i = -1, n = 0; n < e.length; n++) i = i >>> 8 ^ t[255 & (i ^ e.charCodeAt(n))];
        return (i ^ -1) >>> 0
    }
    function a(e) {
        var t = e.split("_"),
        i = t[0].split("").reverse().join("");
        return i = r(i).toString(16).toUpperCase(),
        i + "_" + t[1]
    }
    function o(e) {
        0 != e.lines.length && (e.playSource.default_token = a(e.default_token), e.lines.forEach(function(t) {
            var i = t.name.replace(/\D/g, "");
            if (e.playSource.defaultLines[i] || (e.playSource.defaultLines[i] = {}), 1 == e.type) e.playSource.defaultLines[i].same = t.srv.replace("{stream}", e.stream),
            e.definitions.forEach(function(n) {
                1 == n.valid && (e.playSource.defaultLines[i][n.value.replace("_", "")] = t.srv.replace("{stream}", e.stream + n.value))
            });
            else if (3 == e.type) for (var n in t)"srv" == n ? e.playSource.defaultLines[i].same = t[n] : "srv_audio" == n ? e.playSource.defaultLines[i].a = t[n] : 0 == n.indexOf("srv_") && (e.playSource.defaultLines[i][n.replace("srv_", "")] = t[n])
        }))
    }
    function s(e, t, i, n) {
        $.ajax({
            url: e,
            type: "get",
            dataType: "json",
            timeout: 3e3,
            data: t,
            success: function(e) {
                if ("200" == e.code) {
                    if (i.playSource.play_token = a(e.data.token), 1 == i.type && e.data.hls_urls) for (var t in e.data.hls_urls) e.data.hls_urls[t].forEach(function(e) {
                        var n = e.line.replace(/\D/g, "");
                        i.playSource.lines[n] || (i.playSource.lines[n] = {}),
                        i.playSource.lines[n][t] = e.hls_url
                    });
                    else if (3 == i.type) {
                        var n = e.data.hls_domainnames || e.data.mp4_domainnames;
                        n.forEach(function(e) {
                            var t = e.line.replace(/\D/g, "");
                            i.playSource.lines[t] || (i.playSource.lines[t] = {}),
                            i.playSource.lines[t][i.currDefinitions] = e.hls_domainname || e.mp4_domainname
                        })
                    }
                    i.sourceType = 1
                }
            },
            complete: function(e, t) {
                if (1 == i.sourceType) {
                    var r = Object.keys(i.playSource.lines);
                    0 == r.length && 0 == i.sourceType
                }
                if (o(i), 0 == i.sourceType) {
                    var r = Object.keys(i.playSource.defaultLines);
                    if (0 == r.length) return void i.trigger("_playerError", {
                        msg: "当前无播放线路！"
                    })
                }
                console.log(i.playSource),
                clearInterval(i.querySetTimeId),
                i.queryTime = 0,
                i.querySetTimeId = setInterval(function() {
                    i.queryTime++,
                    i.queryTime > b && (clearInterval(i.querySetTimeId), i.queryTime = 0, d.call(i))
                },
                1e3),
                n && n(i)
            }
        })
    }
    function c(e) {
        e.currDefinitions = e.currDefinitions || "same";
        var t = g.call(e);
        e.currentLine = "1",
        e.currCdnServerLine = t[e.currentLine],
        e.video = e.createVideo(e.$videoCont),
        m.init(),
        e.bind(),
        e.trigger("_playerReady")
    }
    function d(e) {
        l.call(this,
        function() {
            e && e()
        }.bind(this))
    }
    function l(e) {
        if (1 == this.type) var t = this.api_host + "api/dispatch_play",
        i = {
            webinar_id: h.getter("id"),
            rand: Math.floor(899999999 * Math.random()) + 1e8,
            uid: v.getter("userid")
        };
        else if (3 == this.type) {
            if (0 == this.lines.length) return void setTimeout(function() {
                this.trigger("_playerError", {
                    msg: "当前无播放线路！"
                })
            }.bind(this), 0);
            var t = this.api_host + "api/dispatch_replay",
            n = "";
            this.playSource.defaultLines[1] ? n = this.playSource.defaultLines[1][this.currDefinitions] : this.lines[0].srv ? (this.currDefinitions = "same", n = this.lines[0].srv) : (this.currDefinitions = "a", n = this.lines[0].srv_audio);
            var i = {
                webinar_id: h.getter("id"),
                rand: Math.floor(899999999 * Math.random()) + 1e8,
                uid: v.getter("userid"),
                uri: n.replace(/(.+\.com)/, "")
            }
        }
        s(t, i, this, e)
    }
    function u(e, t) {
        for (var i = "",
        e = Object.keys(e), n = 0; n < e.length; n++) if (t.indexOf(e[n]) == -1) {
            i = e[n];
            break
        }
        return i
    }
    function p(e) {
        0 == $("#_log").length && $("body").prepend('<div id="_log" style="display:none;word-break: break-all;font-size:12px;position:fixed;width:100%;height:200px;bottom:0;overflow-y:auto;background-color:white;z-index:1111;"></div>');
        var t = new Date;
        $("#_log").prepend("<div>" + e + " 时间:" + t.getHours() + ":" + t.getMinutes() + "</div>")
    }
    function g(e) {
        return 1 == this.sourceType ? e ? this.playSource.lines[e] : this.playSource.lines: e ? this.playSource.defaultLines[e] : this.playSource.defaultLines
    }
    function f() {
        return 1 == this.sourceType ? this.playSource.play_token: this.playSource.default_token
    }
    var h = i(2),
    v = i(3),
    y = i(9),
    m = i(19),
    b = (i(5), 300),
    A = [],
    k = {
        same: "原画",
        "720p": "超清",
        "480p": "高清",
        "360p": "标清",
        a: "纯音频"
    },
    _ = {
        "原画": "same",
        "超清": "720p",
        "高清": "480p",
        "标清": "360p",
        "纯音频": "a"
    },
    w = 0,
    x = 0;
    $(".container").bind("touchstart",
    function(e) {
        w++,
        5 == w ? $("#_log").show() : (clearTimeout(x), x = setTimeout(function() {
            w = 0
        },
        500))
    });
    var S = function() {
        for (var e, t = [], i = 0; i < 256; i++) {
            e = i;
            for (var n = 0; n < 8; n++) e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
            t[i] = e
        }
        return t
    };
    n.prototype.init = function() {
        this.on("_streamOver",
        function() {
            clearInterval(this.querySetTimeId),
            this.queryTime = 0
        }.bind(this)),
        l.call(this, c)
    },
    n.prototype.onready = function() {
        if (2 != this.type) {
            var e = [],
            t = g.call(this);
            Object.keys(t).forEach(function(t) {
                e.push("线路" + t)
            }),
            this.trigger("canPlayLines", e),
            this.getCanPlayDefinitions()
        }
    },
    n.prototype.getCanPlayDefinitions = function() {
        var e = [],
        t = [];
        Object.keys(this.playSource.defaultLines[1]).forEach(function(t) {
            this.playSource.defaultLines[1][t] && e.push(k[t])
        }.bind(this));
        for (var i in k) e.indexOf(k[i]) != -1 && t.push(k[i]);
        this.trigger("canPlayDefinitions", t)
    },
    n.prototype.createVideo = function(e) {
        var t = $("<video id='vhall-h5-player'></video>");
        t.attr("webkit-playsinline", ""),
        t.attr("playsinline", ""),
        t.attr("x5-playsinline", ""),
        t.attr("x-webkit-airplay", "allow"),
        t.attr("controls", ""),
        t.css({
            width: "100%",
            height: "100%"
        });
        var i = f.call(this);
        return _src = this.currCdnServerLine[this.currDefinitions] + "?token=" + i,
        p("地址类型:" + (this.sourceType ? "防盗链": "原始") + " 播放地址:" + _src),
        t.attr("src", _src),
        e.append(t),
        t.load(),
        t[0]
    },
    n.prototype.seek = function(e) {
        this.type && (this.video.currentTime = e, this.trigger("seek", e))
    },
    n.prototype.on = function(e, t) {
        this.clientList[e] || (this.clientList[e] = []),
        this.clientList[e].push(t)
    },
    n.prototype.trigger = function() {
        var e = Array.prototype.slice.call(arguments),
        t = Array.prototype.shift.call(e),
        i = this.clientList[t];
        if (i && i.length >= 0) for (var n = 0,
        r = i.length; n < r; n++) i[n].apply(null, e)
    },
    n.prototype.bind = function() {
        var e = this;
        this.video.addEventListener("waiting",
        function() {
            p("开始卡顿,当前线路:" + e.currentLine),
            clearTimeout(e.slowSetTimeId),
            e.slowSetTimeId = setTimeout(function() {
                var t = g.call(e);
                if (4 == e.video.readyState) return void p("不卡了,当前线路:" + e.currentLine);
                clearInterval(e.querySetTimeId),
                e.queryTime = 0,
                A.indexOf(e.currentLine) == -1 && A.push(e.currentLine);
                var i = u(t, A);
                i ? (p("卡顿5秒,尝试换线:" + i), e.setPlayerLine(i)) : (p("卡顿5秒,重新获取原画线路"), A = [], e.playSource.defaultLines[1].same ? e.setPlayerDefinition(k.same) : e.setPlayerDefinition(k[e.currDefinitions]))
            },
            5e3),
            e.trigger("waiting")
        },
        !1),
        this.video.addEventListener("play",
        function() {
            e.trigger("play")
        },
        !1),
        this.video.addEventListener("pause",
        function() {
            e.trigger("pause")
        },
        !1),
        1 == this.type ? this.video.addEventListener("timeupdate",
        function() {
            e.trigger("timeupdate")
        },
        !1) : this.recordTimeupdate()
    },
    n.prototype.recordTimeupdate = function() {
        var e = 0,
        t = -1,
        i = "",
        n = "no",
        r = null;
        $.ajax({
            url: "//e.vhall.com/api/jssdk/v1/webinar/cuepoint",
            type: "GET",
            dataType: "jsonp",
            jsonp: "callback",
            data: {
                roomid: h.getter("id"),
                app_key: VHALL_SDK.options.appkey
            },
            success: function(e) {
                if ($.trim(e.data)) {
                    var t = $.parseJSON(e.data).cuepoint;
                    if ("object" == typeof t) {
                        for (var a = [], o = !1, s = !1, c = 0, d = t.length - 1; c <= d; c++) {
                            var l = $.parseJSON(t[c].content);
                            "flipOver" != l.type && "change_showtype" != l.type || a.push({
                                created_at: t[c].created_at,
                                type: l.type,
                                page: l.page ? l.page: "",
                                doc: l.doc ? l.doc: "",
                                showType: l.showType
                            }),
                            0 === t[c].created_at && ("flipOver" === l.type ? (l.doc && l.page ? y.create({
                                curr_file: l.doc,
                                curr_page: l.page
                            }) : y.create({
                                curr_file: "",
                                curr_page: ""
                            }), n = i, s = !0) : "change_showtype" === l.type && (h.setter("isBoard", l.showType), y.create({}), 1 === l.showType ? o = !0 : 0 === l.showType && (o = !1)))
                        }
                        r = a
                    }
                }
            }
        }),
        this.video.addEventListener("timeupdate",
        function() {
            var i = this.currentTime;
            if (e = parseInt(i), r && e != t) {
                for (var n = r.length - 1; n >= 0; n--) {
                    var a = r[n];
                    if (e > parseFloat(a.created_at)) {
                        if ("flipOver" === a.type) {
                            y.setter({
                                curr_file: a.doc,
                                curr_page: a.page
                            });
                            break
                        }
                        if ("change_showtype" === a.type) {
                            h.setter("isBoard", a.showType),
                            y.setter({});
                            break
                        }
                    }
                }
                t = e
            }
        },
        !1)
    },
    n.prototype.setPlayerLine = function(e) {
        e = e.replace(/\D/g, "");
        var t = "";
        this.currentLine = e,
        this.currCdnServerLine = g.call(this, e),
        t = this.currCdnServerLine[this.currDefinitions] + "?token=" + f.call(this),
        p("地址类型:" + (this.sourceType ? "防盗链": "原始") + " 播放地址:" + t);
        var i = this.video.paused;
        if (this.video.src = t, this.video.load(), this.video.dataset.ct && (this.video.currentTime = this.video.dataset.ct), !i) {
            var n = this.video.play();
            n.then(function() {
                A.count = 0,
                A = [],
                p("播放视频中")
            }).
            catch(function(e) {})
        }
    },
    n.prototype.setPlayerDefinition = function(e) {
        var t = "";
        if (1 == this.type) {
            this.currCdnServerLine[_[e]] && (this.currDefinitions = _[e], t = this.currCdnServerLine[this.currDefinitions] + "?token=" + f.call(this)),
            p("地址类型:" + (this.sourceType ? "防盗链": "原始") + " 播放地址:" + t);
            var i = this.video.paused;
            this.video.src = t,
            this.video.load(),
            !i && this.video.play()
        } else if (3 == this.type) {
            var n = this.api_host + "api/dispatch_replay";
            this.currDefinitions = _[e];
            var r = {
                webinar_id: h.getter("id"),
                rand: Math.floor(899999999 * Math.random()) + 1e8,
                uid: v.getter("userid"),
                uri: this.playSource.defaultLines[1][this.currDefinitions].replace(/(.+\.com)/, "")
            };
            clearInterval(this.querySetTimeId),
            this.queryTime = 0,
            s(n, r, this,
            function(e) {
                e.video.dataset.ct = e.video.currentTime;
                var t = e.video.paused;
                e.video.src = e.currCdnServerLine[e.currDefinitions] + "?token=" + f.call(e),
                p("地址类型:" + (e.sourceType ? "防盗链": "原始") + " 播放地址:" + e.video.src),
                e.video.load(),
                e.video.dataset.ct && (e.video.currentTime = e.video.dataset.ct),
                !t && e.video.play()
            })
        }
    },
    e.exports = n
},
function(e, t, i) {
    function n(e) {
        e ? ($("#" + o).css({
            height: "1px",
            width: "1px",
            visibility: "hidden"
        }), $("#" + s).css({
            height: "100%",
            width: "100%",
            visibility: "visible"
        })) : ($("#" + s).css({
            height: "1px",
            width: "1px",
            visibility: "hidden"
        }), $("#" + o).css({
            height: "100%",
            width: "100%",
            visibility: "visible"
        }))
    }
    var r = i(2),
    a = "vhall-video-player",
    o = "vhall-doc-player",
    s = "vhall-white-board",
    c = function(e) {
        function t(t, i) {
            $("#" + t).flash({
                swf: i,
                width: "100%",
                height: "100%",
                allowfullscreen: !0,
                wmode: e.isFlashVR ? "direct": "transparent",
                allowscriptaccess: "always",
                allowFullScreenInteractive: !0,
                encodeParams: !1,
                bgcolor: "#363636",
                quality: "high",
                class: "Intranet_Runner",
                name: "Intranet_Runner",
                style: "visibility:visible",
                id: t,
                flashvars: e.flashvars
            })
        }
        function i(i) {
            var a = r.getter("isBoard");
            if (console.log(a), i.success) return n(parseInt(a)),
            !1;
            t(s, e.flash_whiteBoard_url);
            var o = setInterval(function() {
                100 == Math.floor($("#" + s)[0].PercentLoaded()) && (n(a), clearInterval(o))
            },
            60)
        }
        function c(i) {
            i.success || t(a, e.flash_video_url)
        }
        function d(i) {
            i.success || t(o, e.flash_doc_url)
        }
        $videoContent = $(e.videoCont),
        $docContent = $(e.docContent),
        $docContent.css({
            "background-color": "#cccccc",
            "background-image": "url(data:image/png;base64,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OHny5FczgZEhZaKjsFgQ4MM+xTyUbWWDYaV3Y8E1JnYlf89ZlAmGdu0y0VFYLAiw/f0ShvQyxpL2QNuMibDpfmFeOBqRvDTkjy2BTIaSKcwFJkNyScgVgS4QkCF1AZ6iioBLQIbkkpArAl0gIEPqAjxFFQGXgAzJJSFXBLpAQIbUBXiKKgIugVgaEtuZzQaAt5kHuCDi7rosXDZx55Fr/WP5QJYHbC8B6vrW1tZDCxYsyJVZJPVhkaiXwyaSdcxnpWI5IvFKyAygPqe779mu5bB4zmFzNkA+ERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABEYgMgT5hrsmePXsu5Hd3HuAV/49Rzif5WN8Pw1xelS2+BEL9/0j8StoUjOgSmqcf5x38RKEZlA4RCB2BUBtS6GipQCIQQCDUhlRYWFjLvz6/Qdntt2q+7/xEYUBVJBYBERABERABERABERABERABERABERABERABERABERABERABEfgICSRfEVq4cOHnSHfYR5h2UFIHHn744eeDAk3ejWXJVAy/sNbS0tKt8+fPf88vMFXWyXp0mMcjjzxywalTp8aTX74/OR2msqTiDct1oj8nG4IHn1fwOk7/fJeOfAaSR0ZD6q6ydKauLS0tFxEvK0PqbD06ysMJv7gz5c81TpjKkmvZu0Pf7c/JEYlfIzifn0e3Tp7Xg5dQD5HX0UyZdFdZMpXBL4wbTSuj0UHctF+/9tPvTD2yyYPG68OoNBQ3eSP0y7+rsjCVpat1yVf8bPpzvvJWuiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiKQZwLJ50h5zqfXJ2/PhKjEKM5Q/1dxlqBPo7c30/M8b335Xdn9/Gj121mmHUu1vD7QixjRATygHByVOvEwdwB1yfRgPFlfPkJzCl0ZUobG14iUAY43yN4mePTRR8t5x63IK++Nft4XbJs3b15Dpjc03PriFjY3Nx9hhGrtjXVVmUVABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABEQgkgQ2bdpUklqx6urqP3jxxRcz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)",
            "background-repeat": "no-repeat",
            "background-position": "center center",
            "background-size": "220px 220px"
        });
        var l = !1;
        try {
            var u = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
            u && (l = !0)
        } catch(e) {
            try {
                l = void 0 != navigator.plugins["Shockwave Flash"]
            } catch(e) {
                l = !1
            }
        }
        if (!l) return void(e.videoCont ? $videoContent.html('<div style="position:absolute;color:#999;text-align:center;font-size:16px;height:30px;top:50%;margin-top:-15px;width:100%;">系统检测到您的浏览器未安装flash插件,点击<a href="//get.adobe.com/cn/flashplayer/" target="_blank">这里</a>安装</div>') : e.docContent && $docContent.html('<div style="position:absolute;color:#999;text-align:center;font-size:16px;height:30px;top:50%;margin-top:-15px;width:100%;">系统检测到您的浏览器未安装flash插件,点击<a href="//get.adobe.com/cn/flashplayer/" target="_blank">这里</a>安装</div>'));
        e.videoCont && $videoContent.append('<div style="width:100%;height:100%;" id="' + a + '"></div>'),
        e.docContent && $docContent.append("<div style='width:100%;height:100%;' id='" + o + "'></div><div style='width:1px;height:1px;' id='" + s + "'></div>");
        var p = "10.0.0",
        g = "//cnstatic01.e.vhall.com/3rdlibs/swfobject/2.2.0/expressInstall.swf",
        f = {};
        f.quality = "high",
        f.bgcolor = "#363636",
        f.allowscriptaccess = "always",
        f.allowfullscreen = "true",
        f.allowFullScreenInteractive = "true",
        f.wmode = e.isFlashVR ? "direct": "transparent";
        var h = {};
        h.styleclass = "Intranet_Runner",
        h.name = "Intranet_Runner",
        h.align = "middle",
        !e.flash_doc_url || swfobject.embedSWF(e.flash_doc_url, o, "100%", "100%", p, g, e.flashvar, f, h, d),
        !e.flash_whiteBoard_url || swfobject.embedSWF(e.flash_whiteBoard_url, s, "100%", "100%", p, g, e.flashvar, f, h, i),
        !e.flash_video_url || swfobject.embedSWF(e.flash_video_url, a, "100%", "100%", p, g, e.flashvar, f, h, c),
        swfobject.createCSS(".Intranet_Runner", "display:block;text-align:left;position:absolute;")
    }; !
    function(e) {
        e.sendMsgToFlash = function(e, t) {
            var i = $(".Intranet_Runner");
            $.each(i,
            function(i, n) {
                try {
                    n.sendMsgToAs(e, t)
                } catch(e) {
                    console.log("flsah 错误信息：" + e.message)
                }
            })
        },
        e.sendEveToFlash = function(e, t) {
            var i = $(".Intranet_Runner");
            $.each(i,
            function(i, n) {
                try {
                    n.sendEventToAs(e, t)
                } catch(e) {
                    console.log("flsah 错误信息：" + e.message)
                }
            })
        },
        e.sendCmdMsg = function(t) {
            try {
                var i = Base64.decode(t);
                return t = $.parseJSON(i),
                e.sendMsgToFlash(t.type, t),
                3 == r.getter("type") && "*changeShowType" == t.type && n(parseInt(t.showType)),
                !0
            } catch(e) {
                return console.log("parse JSON error:" + e.message),
                !1
            }
        },
        e.sendRecordMsg = function(e, t) {
            try {
                return sendEveToFlash(e, t),
                !0
            } catch(e) {
                return ldebug("parse JSON error:" + e.message),
                !1
            }
        }
    } (window),
    e.exports.init = c,
    e.exports.exchageWhite = n
},
function(e, t, i) {
    function n(e) {
        if ("undefined" == typeof e) return e = {},
        console.error("请先阅读文档传入正确参数");
        if (! (e.roomid && e.app_key && e.signedat && e.sign && e.username)) return console.error("有必填项未填");
        var t = {
            account: e.account,
            email: e.email,
            roomid: e.roomid,
            username: e.username,
            appkey: e.app_key,
            signedat: e.signedat,
            sign: e.sign,
            facedom: e.facedom,
            textdom: e.textdom,
            videoContent: e.videoContent,
            docContent: e.docContent
        };
        VHALL_SDK.options = t,
        a(["//cnstatic01.e.vhall.com/3rdlibs/nginx-push-stream/0.5.1/pushstream.js", "//cnstatic01.e.vhall.com/3rdlibs/socket.io/1.3.5/socket.io.min.js", "//cnstatic01.e.vhall.com/3rdlibs/jquery-json/2.4.0/jquery.json.min.js", "//cnstatic01.e.vhall.com/3rdlibs/base64/base64.js"],
        function() {
            r(t)
        })
    }
    var r = i(18),
    a = i(12);
    e.exports = n
},
function(e, t, i) {
    function n(e) {
        c.filterWords = [],
        g.filterWords = [];
        var t = {
            webinar_id: e
        };
        $.ajax({
            url: "//e.vhall.com/api/webinar/v1/webinar/keywords-list",
            type: "get",
            dataType: "jsonp",
            jsonp: "callback",
            data: t,
            success: function(e) {
                200 == e.code ? (c.filterWords = e.data, g.filterWords = e.data) : d.trigger("error", e)
            },
            error: function(e) {
                d.trigger("error", e)
            }
        })
    }
    function r(e) {
        var t = {
            roomid: e.roomid,
            account: e.account,
            username: e.username,
            app_key: e.appkey,
            signedat: e.signedat,
            sign: e.sign
        };
        e.email && (t.email = e.email),
        $.ajax({
            url: "//e.vhall.com/api/jssdk/v1/webinar/init",
            type: "get",
            dataType: "jsonp",
            jsonp: "callback",
            data: t,
            success: function(t) {
                200 == t.code ? (t.data.roomid = e.roomid, o(t.data, e), n(e.roomid), d.trigger("ready")) : d.trigger("error", t)
            },
            error: function(e) {
                d.trigger("error", e)
            }
        })
    }
    function a(e, t) {
        var i = e.visitor;
        console.log(e),
        l.create({
            id: e.roomid,
            type: e.webinarStatus,
            openQuestion: e.openQuestion,
            isBoard: parseInt(e.doc.whiteBoard),
            vid: e.reportedData.vid,
            vfid: e.reportedData.vfid,
            guid: e.reportedData.guid,
            vtype: e.reportedData.vtype,
            topic: e.reportedData.topic,
            webConfig: e.webConfig
        }),
        u.create({
            username: i.nick_name,
            userid: i.id,
            sessionId: e.sessionId,
            forbidchat: e.forbidchat ? e.forbidchat: 0,
            role: i.role ? i.role: "user",
            avatar: i.avatar ? i.avatar: "//cnstatic01.e.vhall.com/static/images/watch/head50.png",
            is_gag: e.visitor.is_gag,
            is_kickout: e.visitor.is_kickout,
            updateAuth: e.updateAuth,
            dataToken: e.socketToken
        }),
        t.docContent && !h && p.create({
            doc_url: e.doc.srv,
            curr_file: e.doc.currFile,
            curr_page: e.doc.currPage,
            totalPage: e.doc.totalPage,
            docContent: t.docContent
        })
    }
    function o(e, t) {
        a(e, t),
        1 == e.webinarStatus && (c.init({
            pubUrl: e.pushstreamPubUrl,
            token: e.socketToken,
            domain: e.pushstreamDomain,
            port: e.pushstreamPort,
            roomid: t.roomid
        }), s.init({
            srv: e.socketSrv,
            token: e.socketToken,
            app: "vhall"
        })),
        g.sign = 1,
        t.facedom && t.textdom && $(t.facedom).qqFace({
            assign: t.textdom,
            path: "//cnstatic01.e.vhall.com/static/img/arclist/"
        }),
        t.videoContent && f.init($.extend({
            videoCont: t.videoContent,
            docContent: t.docContent
        },
        h ? e.flashPlayer: e.mobilePlayer))
    }
    var s = i(20),
    c = i(6),
    d = i(1),
    l = i(2),
    u = i(3),
    p = i(9);
    i(4);
    var g = i(11),
    f = i(10),
    h = i(8);
    e.exports = r
},
function(e, t, i) {
    function n() {
        var e = r();
        return e = e.match(/(https?:|rtmp:)?(\/\/)?([a-zA-Z0-9]+\.)?([a-zA-Z0-9]+\.)+[a-zA-Z0-9]+/),
        e && (e = e[0]),
        e
    }
    function r() {
        var e = "";
        return e = $("video#vhall-h5-player")[0].src
    }
    function a() {
        return (new Date).getTime() - b
    }
    function o() {
        return {
            p: L.p,
            pf: "3",
            aid: L.p,
            uid: R.join_uid,
            s: L.s,
            vid: L.vid,
            vfid: L.vfid,
            guid: L.guid,
            vtype: L.vtype,
            topic: L.topic
        }
    }
    function s() {
        var e = o();
        e.tt = a(),
        1 == R.webinar_type ? (e.sd = n(), e.browser = L.ua, e._bc = w, e._bt = S) : e.fd = r(),
        e.ua = L.ua,
        e.tf = L.tf,
        E({
            k: v.heart_beat,
            id: String(L.s) + (new Date).getTime(),
            s: L.s,
            token: e
        })
    }
    function c() {
        var e = o();
        1 == R.webinar_type ? (e.sd = n(), e.browser = L.ua) : e.fd = r(),
        E({
            k: v.player_pause,
            id: String(L.s) + (new Date).getTime(),
            s: L.s,
            token: e
        })
    }
    function d() {
        var e = o();
        1 == R.webinar_type ? (e.sd = n(), e.browser = L.ua) : e.fd = r(),
        E({
            k: v.player_resume,
            id: String(L.s) + (new Date).getTime(),
            s: L.s,
            token: e
        })
    }
    function l() {
        _ = 0,
        x = 0;
        var e = o();
        1 == R.webinar_type ? (e.sd = n(), e.browser = L.ua) : e.fd = r(),
        E({
            k: v.open_stream,
            id: String(L.s) + (new Date).getTime(),
            s: L.s,
            token: e
        })
    }
    function u() {
        var e = o();
        1 == R.webinar_type ? (e.sd = n(), e.browser = L.ua) : e.fd = r(),
        e.tt = a(),
        e._bc = _,
        e._bt = "",
        E({
            k: v.close_stream,
            id: String(L.s) + (new Date).getTime(),
            s: L.s,
            token: e
        })
    }
    function p() {
        var e = o();
        1 == R.webinar_type ? (e.sd = n(), e.browser = L.ua) : e.fd = r(),
        e.tt = (new Date).getTime() - b,
        e._bc = w,
        e._bt = S,
        E({
            k: v.lag,
            id: String(L.s) + (new Date).getTime(),
            s: L.s,
            token: e
        }),
        w = 0
    }
    function g() {
        var e = f.get(),
        t = h.get();
        R.webinar_id = e.id,
        R.webinar_type = e.type,
        R.sessionId = t.sessionId,
        R.join_uid = t.userid,
        1 == e.type && (v = {
            open_stream: 52001,
            close_stream: 52002,
            heart_beat: 52003,
            player_pause: 52004,
            player_resume: 52005,
            lag: 54001
        }),
        L = {
            p: R.webinar_id,
            s: R.sessionId,
            ua: navigator.userAgent,
            tf: "",
            vid: e.vid,
            vfid: e.vfid,
            guid: e.guid,
            vtype: e.vtype,
            topic: e.topic
        },
        setTimeout(function() {
            var e = 1;
            $("video#vhall-h5-player")[0] ? e = $("video#vhall-h5-player")[0].paused: $("audio")[0] && (e = $("audio")[0].paused),
            k || e || (l(this.src), clearInterval(k), k = setInterval(function() {
                s(),
                1 != R.webinar_type && p(),
                w = 0
            },
            6e4))
        },
        1e3),
        $("video#vhall-h5-player")[0] && ($("video#vhall-h5-player")[0].addEventListener("play",
        function() {
            b = (new Date).getTime(),
            clearInterval(k),
            k = setInterval(function() {
                s(),
                1 != R.webinar_type && p(),
                w = 0
            },
            6e4),
            A && (l(this.src), A = !1),
            x = 0,
            d()
        },
        !1), $("video#vhall-h5-player")[0].addEventListener("timeupdate",
        function() {
            x && (S = (new Date).getTime() - x)
        },
        !1), $("video#vhall-h5-player")[0].addEventListener("pause",
        function() {
            x = 0,
            clearInterval(k),
            c()
        },
        !1), $("video#vhall-h5-player")[0].addEventListener("ended",
        function() {
            x = 0,
            clearInterval(k)
        },
        !1), $("video#vhall-h5-player")[0].addEventListener("waiting",
        function() {
            w++,
            _++,
            x = (new Date).getTime()
        }))
    }
    var f = i(2),
    h = i(3),
    v = {
        open_stream: 92001,
        close_stream: 92002,
        heart_beat: 92003,
        player_pause: 92004,
        player_resume: 92005,
        lag: 94001
    },
    y = "//la.e.vhall.com/login",
    m = {},
    b = (new Date).getTime(),
    A = !0,
    k = null,
    _ = 0,
    w = 0,
    x = 0,
    S = 0,
    R = {},
    L = {
        p: R.webinar_id,
        s: R.sessionId,
        ua: navigator.userAgent
    },
    E = function(e) {
        e.token = Base64.encode(JSON.stringify(e.token)),
        $.getJSON(y, e,
        function() {})
    },
    T = {},
    j = null;
    j = function(e, t) {
        T[e] || (T[e] = []),
        T[e].push(t)
    },
    m.trigger = function() {
        var e = Array.prototype.slice.call(arguments),
        t = Array.prototype.shift.call(e),
        i = T[t];
        if (i && i.length >= 0) for (var n = 0,
        r = i.length; n < r; n++) i[n].apply(null, e)
    },
    j("changeline",
    function(e, t) {
        u(e),
        l(t)
    }),
    m.init = g,
    e.exports = m
},
function(e, t, i) {
    function n(e) {
        switch (e.type) {
        case "*disablechat":
            d.getter("userid") == e.user_id && d.setter("is_gag", 1),
            r.trigger("disableChat", e.user_id);
            break;
        case "*permitchat":
            d.getter("userid") == e.user_id && d.setter("is_gag", 0),
            r.trigger("permitChat", e.user_id);
            break;
        case "*kickout":
            d.getter("userid") == e.user_id && d.setter("is_kickout", 1),
            r.trigger("kickout", e.user_id);
            break;
        case "*kickoutrestore":
            d.getter("userid") == e.user_id && d.setter("is_kickout", 0),
            r.trigger("kickoutRestore", e.user_id);
            break;
        case "*forbidchat":
            "1" === e.status ? d.setter("forbidchat", 1) : d.setter("forbidchat", 0),
            r.trigger("forbidChat", e.status);
            break;
        case "*question":
            "1" == e.status ? c.setter("openQuestion", 1) : c.setter("openQuestion", 0),
            r.trigger("questionSwitch", {
                status: e.status
            });
            break;
        case "*publish_start":
            o ? window.sendMsgToFlash("*publish_start", $.toJSON(e)) : l.player.setPlayerDefinition(e.trans);
            break;
        case "*whiteBoard":
            o ? (c.setter("isBoard", e.status), window.sendMsgToFlash("*changeShowType", $.toJSON({
                showType: parseInt(e.status)
            })), "1" == e.status ? l.exchageWhite(1) : l.exchageWhite(0)) : (setTimeout(function() {
                c.setter("isBoard", e.status)
            },
            15e3), s.setter({}));
            break;
        case "*over":
            if (o) {
                var t = {};
                t.desc = "活动结束",
                c.setter("type", 3),
                window.sendMsgToFlash("*over", $.toJSON(t))
            } else setTimeout(function() {
                r.trigger("streamOver"),
                l.player.trigger("_streamOver")
            },
            15e3);
            break;
        case "*publishStart":
            o ? (c.setter("type", 1), window.sendMsgToFlash("*publishStart", $.toJSON(e))) : setTimeout(function() {
                r.trigger("publishStart")
            },
            15e3);
            break;
        case "*announcement":
            r.trigger("announcement", e.content);
            break;
        case "*startSign":
            r.trigger("startSign", e)
        }
    }
    var r = i(1),
    a = (i(4), i(21)),
    o = i(8),
    s = i(9),
    c = i(2),
    d = i(3),
    l = i(10),
    u = (i(6), {
        init: function(e) {
            this.options = e,
            this.socket = io.connect(e.srv, {
                query: "token=" + e.token + "&app=" + (e.app || "vhall"),
                transports: a ? ["polling"] : ["websocket", "polling"]
            }),
            this.bind()
        },
        bind: function() {
            this.socket.on("online",
            function(e) {}),
            this.socket.on("cmd",
            function(e) {
                try {
                    e = $.parseJSON(e)
                } catch(t) {
                    e = e
                }
                n(e)
            }),
            this.socket.on("flashMsg",
            function(e) {
                if (o) window.sendEveToFlash("flashMsg", e);
                else try {
                    var t = $.parseJSON(e);
                    "flipOver" == t.type && s.setter({
                        curr_file: t.doc,
                        curr_page: t.page,
                        totalPage: t.totalPage
                    })
                } catch(e) {}
            })
        },
        close: function() {
            this.socket.close()
        },
        open: function() {
            this.socket.open()
        }
    });
    e.exports = u
},
function(e, t) {
    function i() {
        var e = !1;
        return "Microsoft Internet Explorer" == navigator.appName && ("MSIE9.0" != navigator.appVersion.split(";")[1].replace(/[ ]/g, "") && "MSIE8.0" != navigator.appVersion.split(";")[1].replace(/[ ]/g, "") || (e = !0)),
        e
    }
    e.exports = i()
},
function(e, t) {
    function i(e) {
        return "[object Number]" === Object.prototype.toString.call(e)
    }
    e.exports = i
},
function(e, t) {
    function i(e) {
        return "[object String]" === Object.prototype.toString.call(e)
    }
    e.exports = i
},
function(e, t, i) {
    function n(e) {
        return c.indexOf(e)
    }
    function r(e) {
        return c[e]
    }
    function a(e) {
        return s(e) ? n(e) + 1 : o(e) ? r(e) : null
    }
    var o = i(22),
    s = i(23),
    c = ["[微笑]", "[撇嘴]", "[色]", "[发呆]", "[得意]", "[流泪]", "[害羞]", "[闭嘴]", "[睡]", "[哭]", "[尴尬]", "[发怒]", "[调皮]", "[呲牙]", "[惊讶]", "[难过]", "[酷]", "[汗]", "[抓狂]", "[吐]", "[偷笑]", "[愉快]", "[白眼]", "[傲慢]", "[饥饿]", "[困]", "[惊恐]", "[流汗]", "[憨笑]", "[悠闲]", "[奋斗]", "[咒骂]", "[疑问]", "[嘘]", "[晕]", "[疯了]", "[衰]", "[骷髅]", "[敲打]", "[再见]", "[擦汗]", "[抠鼻]", "[鼓掌]", "[糗大了]", "[坏笑]", "[左哼哼]", "[右哼哼]", "[哈欠]", "[鄙视]", "[委屈]", "[快哭了]", "[阴险]", "[亲亲]", "[吓]", "[可怜]", "[菜刀]", "[西瓜]", "[啤酒]", "[篮球]", "[乒乓]", "[咖啡]", "[饭]", "[猪头]", "[玫瑰]", "[凋谢]", "[嘴唇]", "[爱心]", "[心碎]", "[蛋糕]", "[闪电]", "[炸弹]", "[刀]", "[足球]", "[瓢虫]", "[便便]", "[月亮]", "[太阳]", "[礼物]", "[拥抱]", "[强]", "[弱]", "[握手]", "[胜利]", "[抱拳]", "[勾引]", "[拳头]", "[差劲]", "[爱你]", "[NO]", "[OK]"];
    Array.prototype.indexOf || (Array.prototype.indexOf = function(e) {
        var t = this.length >>> 0,
        i = Number(arguments[1]) || 0;
        for (i = i < 0 ? Math.ceil(i) : Math.floor(i), i < 0 && (i += t); i < t; i++) if (i in this && this[i] === e) return i;
        return - 1
    }),
    e.exports = a
},
function(e, t, i) {
    function n(e, t) {
        if (!c.sign) return a.trigger(e, {
            code: 1006,
            msg: "sign error"
        }) && !1;
        if (!t) return a.trigger(e, {
            code: 1e4,
            msg: u[1e4]
        }) && !1;
        if (!$.trim(t.text)) return a.trigger(e, {
            code: 10001,
            msg: u[10001]
        }) && !1;
        var i = o.getter("webConfig").chat_limit,
        n = 140;
        return "1" == i && (n = 1e3),
        t.text && $.trim(t.text).length > n ? a.trigger(e, {
            code: 10003,
            msg: u[10003]
        }) && !1 : ("1" == s.getter("is_gag") && a.trigger(e, {
            code: 10002,
            msg: u[10002]
        }) && !1, 1 != s.getter("forbidchat") || a.trigger(e, {
            code: 10004,
            msg: u[10004]
        }) && !1)
    }
    var r = i(17),
    a = i(1),
    o = i(2),
    s = i(3),
    c = i(11),
    d = i(6),
    l = i(4),
    u = i(5),
    p = i(10),
    g = i(7);
    window.VHALL_SDK = window.VHALL_SDK || {},
    VHALL_SDK.Version = "2.0.0",
    VHALL_SDK.on = a.listen,
    VHALL_SDK.remove = a.remove,
    VHALL_SDK.init = r,
    VHALL_SDK.getRoominfo = o.get,
    VHALL_SDK.getUserinfo = s.get,
    VHALL_SDK.vhall_get_live_history_chat_msg = function(e) {
        c.getLiveChatMsg(e)
    },
    VHALL_SDK.vhall_get_live_history_question_msg = function(e) {
        c.getQuestionlist(e)
    },
    VHALL_SDK.vhall_get_record_history_chat_msg = function(e) {
        c.getRecordChatMsg(e)
    },
    VHALL_SDK.vhall_get_history_notice = function(e) {
        c.getNotice(e)
    },
    VHALL_SDK.sendSign = function(e) {
        if (!e) return a.trigger("sendSign", {
            code: 1e4,
            msg: u[1e4]
        }) && !1;
        var t = s.get();
        return "1" == t.is_kickout ? a.trigger("sendSign", {
            code: 10007,
            msg: u[10007]
        }) && !1 : 1 != VHALL_SDK.getRoominfo().type ? a.trigger("sendSign", {
            code: 10005,
            msg: u[10005]
        }) && !1 : void s.sendSign(e)
    },
    VHALL_SDK.updateUserInfo = function(e) {
        return ! e || e.length > 30 ? a.trigger("UpdateUser", {
            code: 1e4,
            msg: u[1e4]
        }) && !1 : void s.updateUserInfo(e)
    },
    VHALL_SDK.sendCustomEvent = function(e) {
        return e && g(e) ? JSON.stringify(e).length > 200 ? a.trigger("sendCustomEvent", {
            code: 50403,
            msg: u[50403]
        }) && !1 : 1 != VHALL_SDK.getRoominfo().type ? a.trigger("sendCustomEvent", {
            code: 10005,
            msg: u[10005]
        }) && !1 : void d.sendCustomEvent(e) : a.trigger("sendCustomEvent", {
            code: 1e4,
            msg: u[1e4]
        }) && !1
    },
    VHALL_SDK.sendChat = function(e) {
        if (!n("sendChat", e)) return ! 1;
        var t = s.get();
        if ("1" != t.is_gag && 1 != t.forbidchat) if (1 == VHALL_SDK.getRoominfo().type) d.sendChat(e);
        else {
            var i = new Date,
            r = i.getHours() < 10 ? "0" + i.getHours() : i.getHours(),
            a = i.getMinutes() < 10 ? "0" + i.getMinutes() : i.getMinutes(),
            o = r + ":" + a;
            c.sendRecordChat({
                content: e.text,
                webinar_id: VHALL_SDK.options.roomid,
                nick_name: t.username,
                user_id: t.userid,
                avatar: t.avatar,
                role: t.role,
                user_name: t.username,
                time: o
            })
        }
        return {
            avatar: t.avatar,
            content: l(e.text),
            user_name: t.username,
            user_id: t.userid,
            role: t.role
        }
    },
    VHALL_SDK.sendQuestion = function(e) {
        if (!n("sendQuestion", e)) return ! 1;
        if (1 != VHALL_SDK.getRoominfo().type) return a.trigger("sendQuestion", {
            code: 10005,
            msg: u[10005]
        }) && !1;
        if (1 != VHALL_SDK.getRoominfo().openQuestion) return a.trigger("sendQuestion", {
            code: 10006,
            msg: u[10006]
        }) && !1;
        var t = s.get();
        "1" != t.is_gag && 1 != t.forbidchat && d.sendQuestion(e.text);
        var i = new Date;
        return i = (i.getHours() > 9 ? i.getHours() : "0" + i.getHours()) + ":" + (i.getMinutes() > 9 ? i.getMinutes() : "0" + i.getMinutes()),
        {
            avatar: t.avatar,
            data: {
                content: l(e.text),
                created_at: i,
                join_id: t.userid,
                nick_name: t.username
            }
        }
    },
    VHALL_SDK.player = p
},
function(e, t, i) {
    function n(e, t) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i],
            r = g[n.id];
            if (r) {
                r.refs++;
                for (var a = 0; a < r.parts.length; a++) r.parts[a](n.parts[a]);
                for (; a < n.parts.length; a++) r.parts.push(d(n.parts[a], t))
            } else {
                for (var o = [], a = 0; a < n.parts.length; a++) o.push(d(n.parts[a], t));
                g[n.id] = {
                    id: n.id,
                    refs: 1,
                    parts: o
                }
            }
        }
    }
    function r(e) {
        for (var t = [], i = {},
        n = 0; n < e.length; n++) {
            var r = e[n],
            a = r[0],
            o = r[1],
            s = r[2],
            c = r[3],
            d = {
                css: o,
                media: s,
                sourceMap: c
            };
            i[a] ? i[a].parts.push(d) : t.push(i[a] = {
                id: a,
                parts: [d]
            })
        }
        return t
    }
    function a(e, t) {
        var i = v(),
        n = b[b.length - 1];
        if ("top" === e.insertAt) n ? n.nextSibling ? i.insertBefore(t, n.nextSibling) : i.appendChild(t) : i.insertBefore(t, i.firstChild),
        b.push(t);
        else {
            if ("bottom" !== e.insertAt) throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
            i.appendChild(t)
        }
    }
    function o(e) {
        e.parentNode.removeChild(e);
        var t = b.indexOf(e);
        t >= 0 && b.splice(t, 1)
    }
    function s(e) {
        var t = document.createElement("style");
        return t.type = "text/css",
        a(e, t),
        t
    }
    function c(e) {
        var t = document.createElement("link");
        return t.rel = "stylesheet",
        a(e, t),
        t
    }
    function d(e, t) {
        var i, n, r;
        if (t.singleton) {
            var a = m++;
            i = y || (y = s(t)),
            n = l.bind(null, i, a, !1),
            r = l.bind(null, i, a, !0)
        } else e.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (i = c(t), n = p.bind(null, i), r = function() {
            o(i),
            i.href && URL.revokeObjectURL(i.href)
        }) : (i = s(t), n = u.bind(null, i), r = function() {
            o(i)
        });
        return n(e),
        function(t) {
            if (t) {
                if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
                n(e = t)
            } else r()
        }
    }
    function l(e, t, i, n) {
        var r = i ? "": n.css;
        if (e.styleSheet) e.styleSheet.cssText = A(t, r);
        else {
            var a = document.createTextNode(r),
            o = e.childNodes;
            o[t] && e.removeChild(o[t]),
            o.length ? e.insertBefore(a, o[t]) : e.appendChild(a)
        }
    }
    function u(e, t) {
        var i = t.css,
        n = t.media;
        if (n && e.setAttribute("media", n), e.styleSheet) e.styleSheet.cssText = i;
        else {
            for (; e.firstChild;) e.removeChild(e.firstChild);
            e.appendChild(document.createTextNode(i))
        }
    }
    function p(e, t) {
        var i = t.css,
        n = t.sourceMap;
        n && (i += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(n)))) + " */");
        var r = new Blob([i], {
            type: "text/css"
        }),
        a = e.href;
        e.href = URL.createObjectURL(r),
        a && URL.revokeObjectURL(a)
    }
    var g = {},
    f = function(e) {
        var t;
        return function() {
            return "undefined" == typeof t && (t = e.apply(this, arguments)),
            t
        }
    },
    h = f(function() {
        return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase())
    }),
    v = f(function() {
        return document.head || document.getElementsByTagName("head")[0]
    }),
    y = null,
    m = 0,
    b = [];
    e.exports = function(e, t) {
        t = t || {},
        "undefined" == typeof t.singleton && (t.singleton = h()),
        "undefined" == typeof t.insertAt && (t.insertAt = "bottom");
        var i = r(e);
        return n(i, t),
        function(e) {
            for (var a = [], o = 0; o < i.length; o++) {
                var s = i[o],
                c = g[s.id];
                c.refs--,
                a.push(c)
            }
            if (e) {
                var d = r(e);
                n(d, t)
            }
            for (var o = 0; o < a.length; o++) {
                var c = a[o];
                if (0 === c.refs) {
                    for (var l = 0; l < c.parts.length; l++) c.parts[l]();
                    delete g[c.id]
                }
            }
        }
    };
    var A = function() {
        var e = [];
        return function(t, i) {
            return e[t] = i,
            e.filter(Boolean).join("\n")
        }
    } ()
},
function(e, t, i) {
    var n = i(13);
    "string" == typeof n && (n = [[e.id, n, ""]]);
    i(26)(n, {});
    n.locals && (e.exports = n.locals)
}]);
