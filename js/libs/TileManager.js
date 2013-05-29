var gridUnits;
var columnCount;
var focusTile = null;
var selectedTile = null;
var activeTile = null;
var minColumns = 4;
var topLevelGrid;
var initialLoad = true;
var warpspeed = 1;
var csstrans = false;
var gridWidth = null;
var dpi = null;
var pageCounter = 0;
var pushStateSupport = false;
var pushStatePop = false;
var animationsOn = true;
var isTouch = $("body").attr("data-touch");
var deBugOn = true;
var callProcessing = false;
var windowMoving = true;
var visibleViewport = {
    top: $("body").scrollTop(),
    bottom: $("body").scrollTop() + $(window).height()
};
var lastPageReached = false;
var pageReqInProgress = false;
var rowCount = 0;
var colCount = -1;
var scrollTrigger = null;


function initPage()
{
	thinkLib.page.init();
    thinkLib.tileActions.init();
    thinkLib.page.orientation();
    thinkLib.navigation.init();
    thinkLib.animations.init();
    thinkLib.article.init();
    $(".list-share").share();
    setInterval(PingServer, 600000);
    $(".tile-detail").not(".person").find("h1").noWordLeftBehind();
    $(".tile-collapsed").not(".person").find(".trunc1").noWordLeftBehind();
    if ($("body").hasClass("skinny")) {
        $(window).bind("orientationchange", function () {
                b()
            })
    } else {
        window.onresize = function (c) {
            b()
        }
    }

    function b() {
        function e() {
            var g = false;
            var f = false;
            if ($(".pagewrap").outerWidth() > $("#top-level-grid").outerWidth() + gridUnits.x) {
                g = true
            }
            if ($(".pagewrap").outerWidth() < $("#top-level-grid").outerWidth()) {
                f = true
            }
            if (g || f) {
                return true
            } else {
                return false
            }
        }

        function c() {
            windowMoving = false;
            setTimeout(function () {
                    if (windowMoving == false) {
                        callProcessing = false;
                        windowMoving = true;
                        thinkLib.page.setDimensions({
                                loc: "resize-cols-changed"
                            })
                    }
                }, 500)
        }

        function d() {
            if (e) {
                c()
            }
        }
        d()
    }
}



$(document).ready(function (a) {
	return;
        thinkLib.page.init();
        thinkLib.tileActions.init();
        thinkLib.page.orientation();
        thinkLib.navigation.init();
        thinkLib.animations.init();
        thinkLib.article.init();
        $(".list-share").share();
        setInterval(PingServer, 600000);
        $(".tile-detail").not(".person").find("h1").noWordLeftBehind();
        $(".tile-collapsed").not(".person").find(".trunc1").noWordLeftBehind();
        if ($("body").hasClass("skinny")) {
            $(window).bind("orientationchange", function () {
                    b()
                })
        } else {
            window.onresize = function (c) {
                b()
            }
        }

        function b() {
            function e() {
                var g = false;
                var f = false;
                if ($(".pagewrap").outerWidth() > $("#top-level-grid").outerWidth() + gridUnits.x) {
                    g = true
                }
                if ($(".pagewrap").outerWidth() < $("#top-level-grid").outerWidth()) {
                    f = true
                }
                if (g || f) {
                    return true
                } else {
                    return false
                }
            }

            function c() {
                windowMoving = false;
                setTimeout(function () {
                        if (windowMoving == false) {
                            callProcessing = false;
                            windowMoving = true;
                            thinkLib.page.setDimensions({
                                    loc: "resize-cols-changed"
                                })
                        }
                    }, 500)
            }

            function d() {
                if (e) {
                    c()
                }
            }
            d()
        }
    });

var iePrevent = false;
if (navigator.appVersion.indexOf("MSIE") != -1) {
    var version = parseFloat(navigator.appVersion.split("MSIE")[1]);
    if (version <= 8) {
        var iePrevent = true;
        $.fx.off = true
    }
}

function runGoogleShare() {
    window.___gcfg = {
        lang: "en-GB"
    };
    (function () {
            var a = document.createElement("script");
            a.type = "text/javascript";
            a.async = true;
            a.src = "https://apis.google.com/js/plusone.js";
            var b = document.getElementsByTagName("script")[0];
            b.parentNode.insertBefore(a, b)
        })()
}

function runFBShare() {
    (function (a, f, c) {
            var e, b = a.getElementsByTagName(f)[0];
            if (a.getElementById(c)) {
                return
            }
            e = a.createElement(f);
            e.id = c;
            e.src = "//connect.facebook.net/en_GB/all.js#xfbml=1";
            b.parentNode.insertBefore(e, b)
        }(document, "script", "facebook-jssdk"))
}

function runLinkedInShare() {
    $("#share .linkedin").append('<script src="//platform.linkedin.com/in.js" type="text/javascript"></script><script type="IN/Share" data-url="' + $("#share").attr("data-url") + '"></script>');
    if (typeof (IN) == "function") {
        IN.parse(document.body);
        IN.init()
    }
}

function runTwitterShare() {
    ! function (a, f, c) {
        var e, b = a.getElementsByTagName(f)[0];
        if (!a.getElementById(c)) {
            e = a.createElement(f);
            e.id = c;
            e.src = "//platform.twitter.com/widgets.js";
            b.parentNode.insertBefore(e, b)
        }
    }(document, "script", "twitter-wjs")
}

function runWidows(a) {
    a.not(".person").find(".trunc1").noWordLeftBehind();
    if (a.find(".trunc1").length == 0) {
        a.not(".person").find("h1").noWordLeftBehind()
    }
}

function loadTile(b) {
    var a;
    if (b) {
        a = b
    } else {
        a = $("#" + $(".loading").first().attr("id"))
    }
    var c = 10;
    if (a.hasClass("activeTile")) {
        c = 4
    }
    a.find(".tileContent").css({
            top: c + "px"
        });
    a.addClass("loaded");
    a.removeClass("ninjaMode").removeClass("loading");
    runWidows(a);
    setTimeout(function () {
            a.css({
                    overflow: "visible"
                });
            a.find(".tileContent").attr("style", "")
        }, 400);
    setTimeout(function () {
            if ($(".loading").length > 0) {
                loadTile()
            }
        }, 20)
}

function replaceItem(a) {
    var b = a.attr("id");
    if (deBugOn) {
        console.log("REPLACE: " + b)
    }
    if ($("#" + b).length > 0) {
        $("#" + b).html(a.html());
        runWidows($("#" + b))
    } else {
        if (a.attr("data-parent") > "") {
            a.insertAfter($("#" + a.attr("data-parent")));
            if (a.attr("data-root") == $("#" + selectedTile).attr("id")) {
                a.addClass("ninjaMode")
            } else {
                a.addClass("loading").appendTo("#top-level-grid");
                preloadTile(a);
                loadTile()
            }
        }
    }
}

function addTiles(a) {
    var b = a.attr("id");
    if (deBugOn) {
        console.log("ADD: " + b)
    }
    if ($("#" + b).length == 0) {
        if (a.attr("data-parent") !== undefined) {
            a.insertAfter($("#" + a.attr("data-parent")));
            if (a.attr("data-root") == $("#" + selectedTile).attr("id")) {
                a.addClass("ninjaMode");
                runWidows($("#" + b))
            } else {
                a.addClass("loading").appendTo("#top-level-grid");
                preloadTile(a);
                loadTile()
            }
        } else {
            a.addClass("loading").appendTo("#top-level-grid");
            preloadTile(a);
            loadTile()
        }
    } else {}
}
var thinkLib = {
    complete: {
        init: function (a, b) {
            if ($("article > .tile").first().length > 0) {
                selectedTile = $("article > .tile").first().attr("id");
                if (selectedTile) {
                    focusTile = $("#" + selectedTile);
                    setTimeout(function () {
                            SetFocus()
                        }, 300)
                }
            }
            $("body").addClass("ready");
            if ($("article").length == 0) {
                $(".tile.tile-detail").wrapAll("<article/>")
            }
            IEfact();
            if (callProcessing) {
                callProcessing = false
            }
            GetImages();
            thinkLib.animations.reset();
            if ($("#london").hasClass("tile-detail")) {
                placeGMapLondon()
            } else {
                if ($("#newcastle").hasClass("tile-detail")) {
                    placeGMapNewcastle()
                }
            }
            setTimeout(function () {
                    $(".tile").addClass("loaded")
                }, 500);
            if (deBugOn) {
                $(".coords").remove();
                $(".tile").each(function () {
                        $(this).prepend('<div class="coords">x: ' + $(this).css("left") + " y: " + $(this).css("top") + "</div>")
                    })
            }
        }
    },
    tileActions: {
        init: function () {
            thinkLib.tileActions.tileClick()
        },
        loadTiles: function () {
            setTimeout(loadTile, 100)
        },
        tileClick: function () {
            $("body").on("click", ".tileNav", function (a) {
                    $('iframe[src^="//assets.pinterest.com"]').remove();
                    $("#twitter-wjs").remove();
                    $("#facebook-jssdk").remove();
                    $("#fb-root").remove();
                    thinkLib.animations.stop();
                    if ($(this).attr("href").indexOf("mailto") == -1 && iePrevent == false) {
                        a.preventDefault()
                    }
                    if (deBugOn) {
                        $(".conflicted").removeClass("conflicted");
                        $("#conflicts").html("")
                    }
                    $(this).activateTile({
                            ev: a 
                        })
                })
        }
    },
    article: {
        init: function () {
            thinkLib.article.share();
            thinkLib.article.breadcrumb()
        },
        share: function () {
            $("body").on("click", ".share-trigger", function (b) {
                    b.preventDefault();
                    var a = $(this);
                    if (a.attr("data-state") === "inactive") {
                        $.ajax({
                                url: a.attr("href"),
                                dataType: "html",
                                type: "GET",
                                success: function (d) {
                                    a.after('<div class="share-wrap"><div>');
                                    var c = a.next(".share-wrap");
                                    c.hide();
                                    c.append(d);
                                    runGoogleShare();
                                    runTwitterShare();
                                    runFBShare();
                                    runLinkedInShare();
                                    if (typeof (IN) == "object") {
                                        IN.parse()
                                    }
                                    c.fadeIn(500);
                                    a.attr("data-state", "enabled")
                                }
                            })
                    }
                })
        },
        breadcrumb: function () {
            $(".trunc1").not(".checked").each(function () {
                    var j = $(this);
                    j.addClass("checked");
                    var b = j.parents(".bc");
                    var c = b.find(".header");
                    var f = b.outerHeight();
                    var g = parseInt(b.css("bottom"));
                    var e = c.position().top;
                    var d = c.outerHeight();
                    var l = f - (-g);
                    var i = 3;
                    if ((e + d) > (l - i)) {
                        var k = b.find(".trunc1").text();
                        var a = k.split(" ");
                        if (a.length > 0) {
                            var h = a[a.length - 1];
                            a.pop();
                            if (j.next(".trunc2").length > 0) {
                                j.next(".trunc2").prepend(" " + h)
                            } else {
                                j.after('<span class="trunc trunc2"> ' + h + "</span>")
                            }
                        }
                        j.text(a.join(" "))
                    }
                })
        }
    },
    page: {
        init: function () {
            dpi = GetDPI();
            thinkLib.tileActions.loadTiles();
            if ($("body").hasClass("debug")) {
                deBugOn = true
            }
            IEfact();
            if (typeof history.pushState === "function") {
                pushStateSupport = true;
                var a = window.location.pathname + window.location.hash;
                $.ajax({
                        url: a,
                        type: "GET"
                    }).success(function (b) {
                        if (pushStateSupport) {}
                    });
                window.addEventListener("popstate", function (b) {
                        if (b.state != null) {
                            selectedTile = b.state.tile;
                            if (selectedTile) {
                                focusTile = $("#" + selectedTile);
                                thinkLib.page.updateLayout({
                                        ev: b,
                                        autoscroll: true,
                                        selectedTile: focusTile
                                    })
                            } else {
                                thinkLib.page.updateLayout({
                                        ev: b,
                                        autoscroll: true
                                    })
                            }
                        } else {
                            thinkLib.page.updateLayout({
                                    ev: b,
                                    autoscroll: true
                                })
                        }
                    })
            }
            if ($("html.csstransitions").length > 0) {
                csstrans = true
            }
            topLevelGrid = $("#top-level-grid");
            if (initialLoad) {
                thinkLib.page.setDimensions({
                        loc: "initial"
                    });
                initialLoad = false
            }
            GetImages();
            $(".activeTile").addClass("bgFade");
            if ($("#newcastle-article").attr("data-root") === "newcastle") {
                placeGMapNewcastle()
            }
            if ($("#london-article").attr("data-root") === "london") {
                placeGMapLondon()
            }
        },
        updateLayout: function (a) {
            var b = selectedTile;
            if (!pushStatePop && pushStateSupport && b) {
                pushStatePop = true
            }
            if (a.selectedTile) {
                selectedTile = a.selectedTile.attr("id");
                focusTile = $("#" + selectedTile);
                warpspeed = 1;
                if (a.ev != null) {
                    if (a.ev.type == "resize") {
                        warpspeed = 1.8
                    } else {
                        warpspeed = 1.3
                    }
                } else {
                    warpspeed = 1.3
                }
                var c = $("#" + selectedTile + " .tileNav").attr("href");
                $.ajax({
                        url: c,
                        type: "GET",
                        async: true
                    }).success(function (d) {
                        if (pushStateSupport && b != selectedTile) {
                            history.pushState({
                                    tile: selectedTile
                                }, d.Title, c)
                        }
                        document.title = d.Title;
                        thinkLib.page.processLayoutResponse({
                                data: d,
                                autoscroll: a.autoscroll
                            })
                    })
            } else {
                var c = window.location.pathname;
                $.ajax({
                        url: c,
                        type: "GET",
                        async: true
                    }).success(function (d) {
                        document.title = d.Title;
                        thinkLib.page.processLayoutResponse({
                                data: d,
                                autoscroll: a.autoscroll
                            })
                    })
            }
        },
        processLayoutResponse: function (g) {
            thinkLib.animations.stop();
            $("article .tile").unwrap();
            visibleViewport = {
                top: $("body").scrollTop(),
                bottom: $("body").scrollTop() + $(window).height()
            };
            var h = g.data.Remove;
            if (h != null) {
                for (e = 0; e < h.length; e++) {
                    if (deBugOn) {
                        console.log("REMOVE: " + h[e])
                    }
                    $("#" + h[e]).remove()
                }
            }
            columnCount = g.data.Columns;
            gridUnits = {
                x: g.data.GridUnit,
                y: g.data.GridUnit
            };
            topLevelGrid.width(g.data.Width);
            topLevelGrid.height(g.data.Height);
            var a = g.data.ActivePage;
            if (a) {
                $("body").addClass("activeGrid")
            } else {
                $("body").removeClass("activeGrid")
            }
            gridWidth = topLevelGrid.outerWidth();
            if (deBugOn) {
                $("#process").html("")
            }
            $(".activeTile").removeClass("bgFade");
            $(".tile").removeClass("pullForward").removeClass("pushBack").removeClass("pullToFront");
            if (g.data.ImageStep != undefined) {
                $("body").removeClass("imagestep1 imagestep2 imagestep3 imagestep4 imagestep5 imagestep6 imagestep7").addClass("imagestep" + g.data.ImageStep.toString())
            }
            if (g.data.TileHtml != undefined) {
                var d = '<div id="outOfSight">' + g.data.TileHtml + "</div>";
                var b = $(d).find(".changed-content .tile");
                var f = $(d).find(".new .tile");
                if (deBugOn) {
                    console.log("CHANGED ITEMS ========================================");
                    console.log(b);
                    console.log("NEW ITEMS ========================================");
                    console.log(f);
                    console.log("========================================");
                    currtext = b.html();
                    $("#contentPollCurrentList").html("");
                    $("#contentPollPrevList").html("");
                    $("#contentPollCurrent pre").text(currtext);
                    prettyPrint();
                    b.find(".tile").each(function () {
                            $("#contentPollCurrentList").append($(this).attr("id") + "<br>")
                        })
                }
                b.each(function () {
                        replaceItem($(this))
                    });
                f.each(function () {
                        addTiles($(this))
                    });
                d = null;
                GetImages()
            }
            $(".tile").addClass("pullForward");
            $(".pullForward.tile-collapsed .view-collapsed").parents(".tile").removeClass("pullForward").addClass("pushBack");
            $(".tile").removeClass("ok");
            if (g.data.TileChanges) {
                if (g.data.TileChanges.length > 0) {
                    var c = [];
                    var e = g.data.TileChanges.length;
                    while (e--) {
                        var j = $("#" + g.data.TileChanges[e].ID);
                        c[e] = {
                            top: parseInt(j.css("top")),
                            left: parseInt(j.css("left")),
                            height: parseInt(j.css("height")),
                            width: parseInt(j.css("width"))
                        }
                    }
                    var e = g.data.TileChanges.length;
                    while (e--) {
                        thinkLib.page.updateTile(g.data.TileChanges[e], g.data.TileChanges.length, g.data.ActivePage, c, e)
                    }
                } else {
                    thinkLib.complete.init()
                }
            } else {
                thinkLib.complete.init()
            }
            initialLoad = false;
            if (animationsOn) {
                thinkLib.animations.reset()
            }
            runDebug()
        },
        setDimensions: function (a) {
            var b = Math.ceil(Math.random() * 10000);
            if (!callProcessing) {
                callProcessing = true;
                $(".tile").removeClass("ok");
                var c = window.location.pathname;
                
                $.ajax({
                        url: "/action/set-dimensions?loc=" + a.loc + "&timestamp=" + b,
                		data: {
                            url: c,
                            screenWidth: screen.width,
                            screenHeight: screen.height,
                            browserWidth: $(window).width(),
                            browserHeight: $(window).height(),
                            DPI: dpi
                        },
                        type: "GET"
                    }).success(function (d) {
                        if (d.DimensionsChanged) {
                            thinkLib.page.processLayoutResponse({
                                    data: d,
                                    autoscroll: true
                                });
                            $("body").attr("data-columns", d.Columns);
                            resizeNav(d.Width)
                        } else {
                            gridUnits = {
                                x: d.GridUnit,
                                y: d.GridUnit
                            };
                            resizeNav($("#top-level-grid").outerWidth());
                            thinkLib.complete.init()
                        }
                    });
                runDebug()
            }
        },
        updateTile: function (w, u, a, A, m) {
            function x(C) {
                C.addClass("ok");
                if (C && selectedTile) {
                    if (C.attr("id") === selectedTile) {
                        $('.tile[data-root="' + C.attr("id") + '"]').removeClass("ninjaMode").addClass("loaded");
                        SetFocus()
                    }
                }
                if ($(".tile.ok").length == u) {
                    $(".tile").removeClass("ok");
                    thinkLib.complete.init()
                }
            }
            var t = $("#" + w.ID);
            var B = false;
            if (t.length > 0) {
                if (t.hasClass("activeTile")) {
                    B = true
                }
                t.removeClass("activeTile LE TE RE BE LE-partial TE-partial RE-partial BE-partial tile-detail tile-collapsed tile-hero");
                var v = w.C;
                if (v) {
                    t.addClass(v)
                }
                if (w.S != undefined) {
                    t.addClass(w.S.toString());
                    if (w.S === "tile-detail" || w.S === "tile-expanded") {
                        t.addClass("activeTile")
                    }
                }
                var f = parseInt(A[m].top);
                var e = parseInt(A[m].left);
                var d = parseInt(A[m].height);
                var g = parseInt(A[m].width);
                var l = true;
                if (w.W == null) {
                    w.W = g;
                    l = false
                }
                var i = true;
                if (w.H == null) {
                    w.H = d;
                    i = false
                }
                var k = true;
                if (w.T == null) {
                    w.T = f;
                    k = false
                }
                var j = true;
                if (w.L == null) {
                    w.L = e;
                    j = false
                }
                if (deBugOn) {
                    $("#process").append("<h3>" + w.ID + "</h3>");
                    $("#process").append("<p>" + t.attr("class") + "</p>");
                    $("#process").append("<ul><li>w: " + w.W + " " + l + "</li><li>h: " + w.H + " " + i + "</li><li>t: " + w.T + " " + k + "</li><li>l: " + w.L + " " + j + "</li></ul>")
                }
                var y = false;
                if (B || (f >= (visibleViewport.top - 50) && f + d <= visibleViewport.bottom) || (k > visibleViewport.top && k + i < visibleViewport.bottom)) {
                    y = true
                }
                if ((l || i) && (j || k)) {
                    if (y) {
                        var z = 450 / warpspeed;

                        function r() {
                            if (k) {
                                t.moveTop({
                                        speed: z,
                                        newPos: w.T.toString()
                                    });
                                setTimeout(function () {
                                        x(t)
                                    }, z)
                            } else {
                                x(t)
                            }
                        }

                        function q() {
                            if (j) {
                                t.moveLeft({
                                        speed: z,
                                        newPos: w.L.toString()
                                    });
                                setTimeout(r, z)
                            } else {
                                r()
                            }
                        }

                        function p() {
                            if (i) {
                                t.moveHeight({
                                        speed: z,
                                        newPos: w.H.toString()
                                    });
                                setTimeout(q, z)
                            } else {
                                q()
                            }
                        }
                        if (l) {
                            t.moveWidth({
                                    speed: z,
                                    newPos: w.W.toString()
                                });
                            setTimeout(p, z)
                        } else {
                            p()
                        }
                    } else {
                        t.css({
                                top: w.T.toString() + "px",
                                left: w.L.toString() + "px",
                                width: w.W.toString() + "px",
                                height: w.H.toString() + "px"
                            });
                        x(t)
                    }
                } else {
                    if (t.hasClass("activeTile") && (j || k) && (l === false && i === false)) {
                        var z = 450 / warpspeed;

                        function o() {
                            if (k) {
                                t.moveTop({
                                        speed: z,
                                        newPos: w.T.toString()
                                    });
                                setTimeout(function () {
                                        x(t)
                                    }, z)
                            } else {
                                x(t)
                            }
                        }
                        if (j) {
                            t.moveLeft({
                                    speed: z,
                                    newPos: w.L.toString()
                                });
                            setTimeout(o, z)
                        } else {
                            o()
                        }
                    } else {
                        if ((j || k) && (l === false && i === false)) {
                            if (y) {
                                var n = 2000;
                                var h = "";
                                if (e < (gridWidth / 2)) {
                                    if (w.L != 0) {
                                        var c = (w.L / gridUnits.x);
                                        n = 100 * (c + 1);
                                        n = (1000 + (1000 / c)) - n
                                    }
                                    n = n / warpspeed;
                                    h = "-" + ((columnCount * 1.5) * gridUnits.x).toString()
                                } else {
                                    n = 1000 / warpspeed;
                                    h = (((columnCount * 1.5) + 1) * gridUnits.x).toString()
                                }
                                t.moveLeft({
                                        speed: n,
                                        newPos: h
                                    });
                                setTimeout(function () {
                                        b()
                                    }, (1000 / warpspeed));

                                function b() {
                                    setTimeout(function () {
                                            if (w.L < (gridWidth / 2)) {
                                                if (csstrans == true) {
                                                    t.css({
                                                            "-o-transition": "none",
                                                            "-moz-transition": "none",
                                                            "-webkit-transition": "none",
                                                            transition: "none"
                                                        })
                                                }
                                                t.css({
                                                        top: w.T,
                                                        left: -(gridUnits.x * 2)
                                                    });
                                                setTimeout(function () {
                                                        var D = 2000;
                                                        var C = 1;
                                                        if (w.L != 0) {
                                                            C = (w.L / gridUnits.x) + 1
                                                        }
                                                        D = 100 * (C - 1);
                                                        D = (300 + (300 / C)) - D;
                                                        D = D / warpspeed;
                                                        t.moveLeft({
                                                                speed: D,
                                                                newPos: w.L
                                                            });
                                                        setTimeout(function () {
                                                                x(t)
                                                            }, D)
                                                    }, 100)
                                            } else {
                                                if (w.L >= (gridWidth / 2)) {
                                                    if (csstrans == true) {
                                                        t.css({
                                                                "-o-transition": "none",
                                                                "-moz-transition": "none",
                                                                "-webkit-transition": "none",
                                                                transition: "none"
                                                            })
                                                    }
                                                    t.css({
                                                            top: w.T,
                                                            left: ((columnCount * gridUnits.x) + (gridUnits.x * 2))
                                                        });
                                                    setTimeout(function () {
                                                            var D = 2000;
                                                            if (w.L != 0) {
                                                                var C = ((gridWidth - w.L) / gridUnits.x) + 1;
                                                                D = 100 * C;
                                                                D = (300 + (300 / C)) - D
                                                            }
                                                            D = D / warpspeed;
                                                            t.moveLeft({
                                                                    speed: D,
                                                                    newPos: w.L
                                                                });
                                                            setTimeout(function () {
                                                                    x(t)
                                                                }, D)
                                                        }, 100)
                                                } else {
                                                    t.moveLeft({
                                                            speed: 500,
                                                            newPos: w.L
                                                        });
                                                    setTimeout(function () {
                                                            t.moveTop({
                                                                    speed: 500,
                                                                    newPos: w.T
                                                                });
                                                            setTimeout(function () {
                                                                    x(t)
                                                                }, 500)
                                                        }, 500 / warpspeed)
                                                }
                                            }
                                        }, 100)
                                }
                            } else {
                                t.css({
                                        top: w.T.toString() + "px",
                                        left: w.L.toString() + "px"
                                    });
                                x(t)
                            }
                        } else {
                            if ((l || i) && (j === false || k === false)) {
                                function s() {
                                    if (i) {
                                        t.moveHeight({
                                                speed: 125,
                                                newPos: w.H.toString()
                                            });
                                        setTimeout(function () {
                                                x(t)
                                            }, 125)
                                    } else {
                                        x(t)
                                    }
                                }
                                if (l) {
                                    t.moveWidth({
                                            speed: 300,
                                            newPos: w.W.toString()
                                        });
                                    setTimeout(s, 300)
                                } else {
                                    s()
                                }
                            } else {
                                if (j === false && k === false && l == false && i == false) {
                                    x(t)
                                }
                            }
                        }
                    }
                }
            } else {
                callProcessing = false;
                thinkLib.complete.init()
            }
        },
        orientation: function () {
            $(window).bind("orientationchange", function (a) {
                    selectedTile = null;
                    $("body").removeClass("ready");
                    thinkLib.page.setDimensions({
                            loc: "orientation"
                        });
                    thinkLib.page.updateLayout({
                            ev: a,
                            autoscroll: true
                        })
                })
        }
    },
    navigation: {
        init: function () {
            $("#btnNavOptions").bind("click", function (a) {
                    a.preventDefault();
                    var b = $("#subnavmenu");
                    if (!b.hasClass("visible")) {
                        b.show();
                        b.addClass("visible")
                    } else {
                        b.hide();
                        b.removeClass("visible")
                    }
                })
        }
    },
    animations: {
        init: function () {
            if (animationsOn) {
                thinkLib.animations.profile()
            }
        },
        stop: function () {
            setTimeout(function () {
                    rowCount = 0;
                    colCount = -1;
                    $(".tile").removeClass("run")
                }, 500)
        },
        reset: function () {
            setTimeout(function () {
                    $(".tile").removeClass("run");
                    thinkLib.animations.init()
                }, 500)
        },
        profile: function () {
            var e;
            if (gridUnits) {
                e = gridUnits.y
            } else {
                e = $(".fact").outerHeight()
            }

            function c() {
                colCount = colCount + 1;
                if (e * rowCount > parseInt($(".tile").last().css("top"))) {
                    rowCount = 0
                }
                if (e * colCount > $("#top-level-grid").outerWidth()) {
                    colCount = 0;
                    rowCount = rowCount + 1
                }
                imageTargets = $('.tile-collapsed[style*="top:' + e * rowCount + 'px"][style*="left:' + e * colCount + 'px"] .profile-photo.master').not($(".tile.run .profile-photo"));
                return imageTargets
            }

            function b(f) {
                f.removeClass("run")
            }

            function a(g) {
                if (g.length > 0) {
                    if (g.find(".master").length == 0) {
                        var f = g.find("img.profile-photo");
                        f.addClass("master");
                        f.clone().removeClass("master").addClass("clone").insertAfter(f)
                    }
                    g.addClass("run");
                    setTimeout(function () {
                            b(g)
                        }, 20000)
                }
            }

            function d() {
                var f = c();
                if (f.length > 0) {
                    a(f.parents(".tile"))
                } else {
                    setTimeout(function () {
                            d()
                        }, 100)
                }
            }
            a($(".tile-detail .profile-photo.master").parents(".tile"))
        }
    }
};
var ajaxManager = (function () {
        var a = [];
        return {
            addReq: function (b) {
                a.push(b)
            },
            run: function () {
                if (lastPageReached) {
                    ajaxManager.stop()
                } else {
                    var c = this,
                        b;
                    if (a.length) {
                        b = a[0].complete;
                        a[0].complete = function () {
                            if (typeof b === "function") {
                                b()
                            }
                            a.shift();
                            c.run.apply(c, [])
                        };
                        $.ajax(a[0])
                    } else {
                        c.tid = setTimeout(function () {
                                c.run.apply(c, [])
                            }, 1000)
                    }
                }
            },
            stop: function () {
                a = [];
                clearTimeout(this.tid)
            }
        }
    }());

function runDebug() {
    if (deBugOn) {
        $("#debugBar #screen-h").html(screen.height);
        $("#debugBar #screen-w").html(screen.width);
        $("#debugBar #browser-h").html($(window).height());
        $("#debugBar #browser-w").html($(window).width());
        $("#debugBar #dpi").html(dpi);
        if ($("body").hasClass("People")) {
            $("#debugBar #tileCount").html($(".tile.person").length)
        }
        var a = "";
        $(".tile.activeTile").each(function () {
                a = a + "<li>" + $(this).attr("id") + "</li>"
            });
        if (a > "") {
            a = "<ul>" + a + "</ul>"
        }
        $("#debugBar #activeTileList").html(a)
    }
}

function PingServer() {
    $.ajax({
            url: "/action/idle",
            type: "POST"
        }).done(function (a) {})
}(function (a) {
        a.fn.activateTile = function (b) {
            return this.each(function () {
                    var c = a(this);
                    a("body").removeClass("ready");
                    a("#subnavmenu").hide();
                    var d = c.attr("data-endpoint");
                    if (d != a("body").attr("data-page-endpoint") || a("body").hasClass("ie8")) {
                        window.location.href = c.attr("href");
                        return
                    }
                    thinkLib.page.updateLayout({
                            ev: b.ev,
                            autoscroll: true,
                            selectedTile: c.parents(".tile")
                        })
                })
        }
    })(jQuery);

function GetDPI() {
    $("body").append('<div id="dpidiv" style="height: 1in; left: -100%; position: absolute; top: -100%; width: 1in;"></div>');
    var a = document.getElementById("dpidiv").offsetWidth;
    $("#dpidiv").remove();
    return a
}(function (a) {
        a.fn.moveLeft = function (b) {
            return this.each(function () {
                    var c = a(this);
                    var d = (b.speed / 1000);
                    if (csstrans == true) {
                        c.css({
                                "-o-transition": "left ease-in-out " + d + "s",
                                "-moz-transition": "left ease-in-out " + d + "s",
                                "-webkit-transition": "left ease-in-out " + d + "s",
                                transition: "left ease-in-out " + d + "s",
                                left: b.newPos + "px"
                            })
                    } else {
                        c.animate({
                                left: b.newPos + "px"
                            }, b.speed)
                    }
                })
        }
    })(jQuery);
(function (a) {
        a.fn.moveTop = function (b) {
            return this.each(function () {
                    var c = a(this);
                    var d = (b.speed / 1000);
                    if (csstrans == true) {
                        c.css({
                                "-o-transition": "top ease-in-out " + d + "s",
                                "-moz-transition": "top ease-in-out " + d + "s",
                                "-webkit-transition": "top ease-in-out " + d + "s",
                                transition: "top ease-in-out " + d + "s",
                                top: b.newPos + "px"
                            })
                    } else {
                        c.animate({
                                top: b.newPos + "px"
                            }, b.speed)
                    }
                })
        }
    })(jQuery);
(function (a) {
        a.fn.moveWidth = function (b) {
            return this.each(function () {
                    var c = a(this);
                    var d = (b.speed / 1000);
                    if (csstrans == true) {
                        c.css({
                                "-o-transition": "width ease-in-out " + d + "s",
                                "-moz-transition": "width ease-in-out " + d + "s",
                                "-webkit-transition": "width ease-in-out " + d + "s",
                                transition: "width ease-in-out " + d + "s",
                                width: b.newPos + "px"
                            })
                    } else {
                        c.animate({
                                width: b.newPos + "px"
                            }, b.speed)
                    }
                })
        }
    })(jQuery);
(function (a) {
        a.fn.moveHeight = function (b) {
            return this.each(function () {
                    var c = a(this);
                    var d = (b.speed / 1000);
                    if (csstrans == true) {
                        c.css({
                                "-o-transition": "height ease-in-out " + d + "s",
                                "-moz-transition": "height ease-in-out " + d + "s",
                                "-webkit-transition": "height ease-in-out " + d + "s",
                                transition: "height ease-in-out " + d + "s",
                                height: b.newPos + "px"
                            })
                    } else {
                        c.animate({
                                height: b.newPos + "px"
                            }, b.speed)
                    }
                })
        }
    })(jQuery);

function placeGMapNewcastle() {
    var e;
    var f;
    var c;

    function d() {
        var h = new google.maps.LatLng(54.9716889, -1.608688);
        map = new google.maps.Map(document.getElementById("officeMapNewcastle"), {
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                center: h,
                zoom: 14
            });
        c = new google.maps.InfoWindow();

        function g() {
            var i = new google.maps.MarkerImage("/content/img/newcastle.png", new google.maps.Size(120, 48), new google.maps.Point(0, 0), new google.maps.Point(110, 45));
            var j = new google.maps.Marker({
                    map: map,
                    icon: i,
                    position: h
                })
        }
        g()
    }

    function a(j, k) {
        if (k == google.maps.places.PlacesServiceStatus.OK) {
            for (var g = 0; g < j.length; g++) {
                var h = j[g];
                b(j[g])
            }
        }
    }

    function b(h) {
        var i = h.geometry.location;
        var g = new google.maps.Marker({
                map: map,
                position: h.geometry.location
            });
        google.maps.event.addListener(g, "click", function () {
                c.setContent(h.name);
                c.open(map, this)
            })
    }
    d()
}

function placeGMapLondon() {
    var e;
    var f;
    var c;

    function d() {
        var h = new google.maps.LatLng(51.5223778, -0.1108394);
        map = new google.maps.Map(document.getElementById("officeMapLondon"), {
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                center: h,
                zoom: 16
            });
        c = new google.maps.InfoWindow();

        function g() {
            var i = new google.maps.MarkerImage("/content/img/london.png", new google.maps.Size(108, 48), new google.maps.Point(0, 0), new google.maps.Point(100, 48));
            var j = new google.maps.Marker({
                    map: map,
                    icon: i,
                    position: h
                })
        }
        g()
    }

    function a(j, k) {
        if (k == google.maps.places.PlacesServiceStatus.OK) {
            for (var g = 0; g < j.length; g++) {
                var h = j[g];
                b(j[g])
            }
        }
    }

    function b(h) {
        var i = h.geometry.location;
        var g = new google.maps.Marker({
                map: map,
                position: h.geometry.location
            });
        google.maps.event.addListener(g, "click", function () {
                c.setContent(h.name);
                c.open(map, this)
            })
    }
    d()
}
$.fn.imageLoad = function (a) {
    this.load(a);
    this.each(function () {
            if (this.complete && this.naturalWidth !== 0) {
                $(this).trigger("load")
            }
        })
};

function GetImages() {
    var a = "";
    var b = "";
    var c = $("html").attr("data-image-step");
    $(".rImg").each(function () {
            var d = $(this);
            var f = d.next("noscript");
            var e = f.attr("data-class");
            b = d.attr("data-url").toString();
            a = b.Format({
                    ImageStep: c
                });
            var g = '<img class="imp ' + e + '" src="' + a + '" alt="" data-step="' + c + '" data-url="' + b + '" />';
            d.after(g);
            f.remove();
            d.remove()
        });
    $(".imp").each(function () {
            $img = $(this);
            if (c != $img.attr("data-step")) {
                b = $img.attr("data-url").toString();
                a = b.Format({
                        ImageStep: c
                    });
                $img.attr("src", a)
            }
        });
    flashImages()
}

function flashImages() {
    var b = $('.tile-collapsed .profile-photo[src*="1280"], .tile-detail .profile-photo[src*="5120"]');
    b.attr("data-photocount", "4");
    b = b.not($(".tile.run .profile-photo, .profile-photo.clone, .profile-photo.master"));

    function a(c) {
        c.addClass("master");
        c.clone().removeClass("master").addClass("clone").insertAfter(c)
    }
    b.each(function () {
            $(this).imageLoad();
            a($(this))
        })
}
var scrollTrigger = $(window).height() / 4;

function requestMorePages(a) {
    var b = Math.ceil(Math.random() * 10000);
    if ($(".loader").length == 0) {
        if ($("body").hasClass(".ie8") || $("body").hasClass(".ie9")) {
            $('<div class="loader"><img src="/content/images/ajax-load.gif" /></div>').insertAfter("#top-level-grid").last()
        } else {
            $('<div class="loader"><img src="/content/images/ajax-load.png" /></div>').insertAfter("#top-level-grid").last()
        }
    }
    pageReqInProgress = true;
    pageCounter = pageCounter + 1;
    ajaxManager.addReq({
            url: a + "?timestamp=" + b,
            dataType: "json",
            type: "GET",
            success: function (d) {
                var c = d;
                pageReqInProgress = false;
                if (c.HasMorePages == false) {
                    lastPageReached = true
                }
                var f = c.NewTiles;
                var e = c.Height;
                var g = c.TotalHeight;
                if (pushStateSupport) {
                    history.replaceState({
                            tile: selectedTile
                        }, null, c.DirectUrl)
                }
                if (g > 0) {
                    $("#top-level-grid").css("height", g);
                    $(f).children().each(function () {
                            var i = $(this);
                            var h = i.attr("id");
                            i.appendTo("#top-level-grid").css({
                                    opacity: 0
                                });
                            if ($("#" + h).attr("data-parent") !== undefined) {
                                $("#" + h).insertAfter($("#" + $("#" + h).attr("data-parent")));
                                $("#" + h).css({
                                        opacity: 0
                                    }).addClass("loaded")
                            } else {
                                $("#" + h).addClass("loaded")
                            }
                            setTimeout(function () {
                                    $("#" + h).css({
                                            opacity: 1
                                        })
                                }, 50)
                        });
                    scrollTrigger = e - ($(window).height() * 2);
                    $(".loader").fadeOut(1000).remove();
                    $("#height").remove();
                    IEfact();
                    GetImages();
                    thinkLib.article.breadcrumb()
                }
                $(".loader").fadeOut(1000).remove();
                $(window).trigger("scroll")
            }
        })
}
var pagiFunc = function () {
    ajaxManager.run();
    var a = $("body").attr("data-more");
    $(window).scroll(function () {
            if (!lastPageReached) {
                if ($(window).scrollTop() > scrollTrigger && pageReqInProgress == false) {
                    requestMorePages(a)
                }
            }
        })
};
//pagiFunc();
var IEfact = function () {
    if ($("body").hasClass("ie8")) {
        var a = '<div class="fact-image"><img src="/Content/css/img/fact_purple.png" alt=""></div>';
        var b = '<div class="fact-image"><img src="/Content/css/img/fact.png" alt=""></div>';
        $(".fact").each(function () {
                $fact = $(this);
                if ($fact.find(".fact-image").length == 0) {
                    if ($fact.hasClass("purple")) {
                        $(a).insertAfter($fact.find(".tile-wrap"))
                    } else {
                        $(b).insertAfter($fact.find(".tile-wrap"))
                    }
                }
            })
    }
};

function SetFocus() {
    jumpTile = focusTile;
    console.log("#" + jumpTile.attr("id") + "-anchor");
    if (jumpTile == null) {
        jumpTile = $("article .tile").first()
    }
    if (jumpTile != null) {
        var d = document.createElement("div");
        d.style.height = "101%";
        document.body.appendChild(d);
        setTimeout(function () {
                document.body.removeChild(d);
                d = null
            }, 0);
        menuHeight = 50;
        var c, f;

        function e() {
            $("body, html").clearQueue().animate({
                    scrollTop: c.top - menuHeight
                }, 500, function () {})
        }
        var b = 0;

        function a() {
            c = $("#" + jumpTile.attr("data-root") + "-anchor").offset();
            f = $(window).height() + $(window).scrollTop();
            if (c != undefined) {
                e()
            } else {
                if (b < 2) {
                    b = b + 1;
                    setTimeout(a, 100)
                }
            }
        }
        a()
    }
}

function SetFocusIE() {
    if (focusTile != null) {
        var a = focusTile.offset();
        var c = $("body, html").scrollTop();
        var b = focusTile.outerHeight();
        if (a.top - c < 0) {
            $("body, html").animate({
                    scrollTop: a.top - b - 60
                }, "slow")
        }
    }
}

function checkConflicts() {
    if (deBugOn) {
        var a = "";
        $(".conflicted").removeClass("conflicted");
        $(".tile:visible").each(function () {
                var b = $(this).attr("id");
                var c = parseInt($(this).css("left"));
                var d = parseInt($(this).css("top"));
                $("#" + b + " ~ .tile:visible").each(function () {
                        if (c == parseInt($(this).css("left")) && d == parseInt($(this).css("top"))) {
                            a = a + "<li>" + b + " | " + $(this).attr("id") + "</li>";
                            $("#" + b + ", #" + $(this).attr("id")).addClass("conflicted")
                        }
                    })
            });
        if (a > "") {
            a = "<ul>" + a + "</ul>";
            $("#conflicts").html(a)
        }
    }
}(function (a) {
        a.fn.noWordLeftBehind = function (b) {
            return this.each(function () {
                    var c = a(this);
                    var d = a.trim(c.text()).split(" ");
                    if (d.length > 1) {
                        d[d.length - 2] += "&nbsp;" + d[d.length - 1];
                        d.pop();
                        c.html(d.join(" "))
                    }
                    if (c.outerWidth() + (parseInt(c.parents(".bc").css("padding-left")) * 2) > c.parents(".bc").width()) {
                        c.html(c.html().replace("&nbsp;", " "))
                    }
                })
        }
    })(jQuery);
var Browser = {
    Version: function () {
        var a = 999;
        if (navigator.appVersion.indexOf("MSIE") != -1) {
            a = parseFloat(navigator.appVersion.split("MSIE")[1])
        }
        return a
    }
};
String.prototype.Format = function (b) {
    var c = this;
    if (typeof b != "object") {
        b = [].slice.call(arguments, 0)
    }
    for (var a in b) {
        c = c.replace(new RegExp("\\{" + a + "\\}", "gm"), b[a])
    }
    return c
};
String.IsNullOrEmpty = function (b) {
    var a = true;
    if (b != null && typeof (b) == "string") {
        if (b.length > 0) {
            a = false
        }
    }
    return a
};
String.IsNullOrWhiteSpace = function (b) {
    var a = true;
    if (!String.IsNullOrEmpty(b)) {
        if (!/^\s*$/.test(b)) {
            a = false
        }
    }
    return a
};
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (a) {
        var c = this.length >>> 0;
        var b = Number(arguments[1]) || 0;
        b = (b < 0) ? Math.ceil(b) : Math.floor(b);
        if (b < 0) {
            b += c
        }
        for (; b < c; b++) {
            if (b in this && this[b] === a) {
                return b
            }
        }
        return -1
    }
}(function (a) {
        a.sharedCount = function (e, d) {
            e = encodeURIComponent(e || location.href);
            var b = {
                url: "//" + (location.protocol == "https:" ? "sharedcount.appspot" : "api.sharedcount") + ".com/?url=" + e,
                cache: true,
                dataType: "json"
            };
            if ("withCredentials" in new XMLHttpRequest) {
                b.success = d
            } else {
                var c = "sc_" + e.replace(/\W/g, "");
                window[c] = d;
                b.jsonpCallback = c;
                b.dataType += "p"
            }
            return a.ajax(b)
        };
        a.fn.share = function () {
            return this.each(function () {
                    var b = a(this);
                    var c = b.attr("data-url");
                    a.sharedCount(c, function (d) {
                            a("[data-share]", b).each(function (e) {
                                    var f = a(this).attr("data-share");
                                    if (d[f] != null) {
                                        var h = d[f];
                                        if (typeof h == "object") {
                                            var g = a(this).attr("data-share-sub");
                                            if (h[g] != null) {
                                                h = h[g]
                                            } else {
                                                h = null
                                            }
                                        }
                                        if (h != null) {
                                            if (h > 1000) {
                                                h = Math.floor((h / 1000)) + "k"
                                            }
                                            a(this).addClass("has-count");
                                            a(this).append("<span>" + h + "</span>")
                                        }
                                    }
                                })
                        })
                })
        }
    }(jQuery));
