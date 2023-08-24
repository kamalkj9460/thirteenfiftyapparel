document.addEventListener("lazybeforeunveil", function(t) {
    var e = t.target.getAttribute("data-bg");
    e && (t.target.style.backgroundImage = "url(" + e + ")")
});
function debounce(e, t, a) {
    var r;
    return function() {
        var o = this
          , n = arguments
          , s = a && !r;
        clearTimeout(r),
        r = setTimeout(function() {
            r = null,
            a || e.apply(o, n)
        }, t),
        s && e.apply(o, n)
    }
}
var xxx, roar = {
    init: function() {
        this.handleAccount(),
        this.handleCartAgree(),
        this.handleAddress(),
        this.initProductQuickShopItem(),
        this.initFilterSidebar(),
        this.initVerticalMenuSidebar(),
        this.initCountdown(),
        this.addToCart(),
        this.cartSidebar(),
        this.removeCart(),
        this.addToWishlist(),
        this.handleCompare(),
        this.removeToWishlist(),
        this.handlePopups(),
        this.handleGMap(),
        this.handleScrollToTop(),
        this.handleSmoothScroll(),
        this.mapFilters(),
        this.handleQuickshop(),
        this.handleBlog(),
        this.handleCookie(),
        this.handleDropdown(),
        this.toggleFilter(),
        this.handleCartPage(),
        this.handleUpsellProducts(),
        this.handleTabs()
    },
    handleTab: function(e) {
        $(e).removeClass("rt-tab--loaded").css("minHeight", "").find(".rt-tab__content").css("position", "unset");
        let t = e.querySelectorAll(".rt-tab");
        t.forEach(t=>{
            let a = t.querySelector(".rt-tab__radio")
              , r = t.querySelector(".rt-tab__content")
              , o = r.offsetHeight;
            r.style.position = "absolute",
            a.addEventListener("click", function() {
                e.style.minHeight = t.querySelector(".rt-tab__content").offsetHeight + 40 + "px"
            }, !1),
            a.checked && (e.style.minHeight = o + 40 + "px")
        }
        ),
        e.className += " rt-tab--loaded"
    },
    handleTabs: function() {
        if (window.IntersectionObserver) {
            let e = document.querySelectorAll(".rt-tabs");
            let t = !1
              , a = new IntersectionObserver(function(e) {
                e.forEach(e=>{
                    e.isIntersecting ? (t = !0,
                    roar.handleTab(e.target)) : t && (t = !1)
                }
                )
            }
            ,{
                root: null,
                rootMargin: "0px",
                threshold: 0
            });
            e.forEach(e=>{
                a.observe(e)
            }
            )
        } else
            console.log("Your browser is out of date. Please upgrade it first!");
        roar.handleTabResize()
    },
    handleTabResize: function() {
        if (window.ResizeObserver) {
            let t = document.querySelectorAll(".rt-tab__content");
            var e = new ResizeObserver(e=>{
                for (let t of e) {
                    let e = t.target.closest(".rt-tabs");
                    roar.handleTab(e)
                }
            }
            );
            t.forEach(t=>{
                e.observe(t)
            }
            )
        } else
            console.log("Your browser is out of date. Please upgrade it first!")
    },
    handleSeasonalFrame: function() {
        $(window).resize(function() {
            if (0 < $(".rt-seasonal-frames").length) {
                var e = !1;
                if (!1 == $(".rt-seasonal-frames").data("mobile") && 768 < roar.getWidthBrowser() && (e = !0),
                !0 == $(".rt-seasonal-frames").data("mobile") && (e = !0),
                !0 == e) {
                    $(".rt-seasonal-frames").show();
                    for (var t = $(".rt-seasonal-frames"), a = t.data("ow"), r = t.data("oh"), o = 0; o < t.children().length; o++) {
                        var n, s, l, d, c = $(t.children()[o]), p = c.data("position"), u = c.data("idx"), m = c.data("w"), h = c.data("h"), g = c.data("x"), f = c.data("y"), v = c.data("src"), y = 1e3 + u;
                        "top" == p || "bottom" == p ? (n = window.innerWidth / a,
                        s = m * n,
                        _newHeight = h * n,
                        l = g * n,
                        d = "top" == p ? f * n : (r - f - h) * n,
                        c.html(""),
                        c.html("<img class=\"position-fixed\" width=\"" + s + "\" height=\"" + _newHeight + "\" style=\"z-index:" + y + ";left:" + l + "px;" + p + ":" + d + "px\" src=\"" + v + "\"/>")) : (n = window.innerHeight / r,
                        s = m * n,
                        _newHeight = h * n,
                        d = f * n,
                        l = "left" == p ? g * n : (a - g - m) * n,
                        c.html(""),
                        c.html("<img class=\"position-fixed\" width=\"" + s + "\" height=\"" + _newHeight + "\" style=\"z-index:" + y + ";top:" + d + "px;" + p + ":" + l + "px\" src=\"" + v + "\"/>"))
                    }
                } else
                    $(".rt-seasonal-frames").hide()
            }
        }).resize()
    },
    handleCartAgree: function() {
        $("body").on("change", ".product-cart__agree", function() {
            var e = $(this)
              , t = $(this).closest(".cart__condition__wrapper").find(".checkout-button");
            e.is(":checked") ? t.removeClass("btn-disabled") : t.addClass("btn-disabled")
        })
    },
    handleAddress: function() {
        var e = $("#AddressNewForm");
        e.length && (Shopify && new Shopify.CountryProvinceSelector("AddressCountryNew","AddressProvinceNew",{
            hideElement: "AddressProvinceContainerNew"
        }),
        $(".address-country-option").each(function() {
            var e = $(this).data("form-id");
            new Shopify.CountryProvinceSelector("AddressCountry_" + e,"AddressProvince_" + e,{
                hideElement: "AddressProvinceContainer_" + e
            })
        }),
        $(".address-new-toggle").on("click", function() {
            e.toggleClass("hide")
        }),
        $(".address-edit-toggle").on("click", function() {
            var e = $(this).data("form-id");
            $("#EditAddress_" + e).toggleClass("hide")
        }),
        $(".address-delete").on("click", function() {
            var e = $(this)
              , t = e.data("form-id")
              , a = e.data("confirm-message");
            confirm(a || "Are you sure you wish to delete this address?") && Shopify.postLink("/account/addresses/" + t, {
                parameters: {
                    _method: "delete"
                }
            })
        }))
    },
    handleAccount: function() {
        function e() {
            return $("#recover-password").fadeIn(),
            $("#customer-login").hide(),
            window.location.hash = "#recover",
            !1
        }
        function t() {
            return $("#recover-password").hide(),
            $("#customer-login").fadeIn(),
            window.location.hash = "",
            !1
        }
        $("#forgot_password a").on("click", function() {
            e()
        }),
        "#recover" == window.location.hash ? e() : t(),
        $("#recover-password .cancel").on("click", function() {
            t()
        })
    },
    initProductQuickShopItem: function(e) {
        function t(e) {
            var t = e.replace("https:", "").replace("http:", "").split("?v=")[0].split("/")
              , a = t[t.length - 1].split(".")
              , r = a.pop()
              , o = a.join(".") + "@2x." + r
              , n = a.join(".") + "." + r
              , s = {};
            return s.srcset = e.replace(t[t.length - 1], o) + " 500w," + e.replace(t[t.length - 1], n) + " 166w",
            s.src = e.replace(t[t.length - 1], n),
            s
        }
        function a(e, t) {
            var a = t.replace("https:", "").replace("http:", "").split("?v=")[0]
              , r = "";
            0 < e.find(".item-images-wrapper a").length && e.find(".item-images-wrapper a").each(function() {
                var e = $(this).data("_image").replace("https:", "").replace("http:", "").split("?v=")[0];
                if (e == a)
                    return void (r = $(this))
            }),
            e.find(".item-images-wrapper a").removeClass("active"),
            "" != r && r.addClass("active")
        }
        function r(e) {
            var t, a = e, r = [], o = a.get(0).attributes, n = o.length;
            for (t = 0; t < n; t++)
                "data-" === o[t].name.substring(0, 5) && r.push(o[t].name);
            $.each(r, function(e, t) {
                a.removeAttr(t)
            })
        }
        function o(e, o) {
            if (o.available ? (e.find("div.price").data("price", o.price),
            e.find(".btn-action.addtocart-item-js span").text(theme.strings.addToCart),
            e.find(".btn-action.addtocart-item-js").prop("disabled", !1)) : (e.find("div.price").data("price", "0"),
            e.find(".btn-action.addtocart-item-js span").text(theme.strings.soldOut),
            e.find(".btn-action.addtocart-item-js").prop("disabled", !0)),
            0 < e.closest(".grouped-product").length && roar.updateGroupedPrice(),
            e.find("select.variation-select.no-js").val(o.id),
            e.find("span.price-new.money").html(theme.Currency.formatMoney(o.price, theme.settings.moneyFormat)),
            !(o.compare_at_price > o.price))
                e.find("span.price-old.money").addClass("hide"),
                e.find(".sale").addClass("hide");
            else if (e.find("span.price-old.money").html(theme.Currency.formatMoney(o.compare_at_price, theme.settings.moneyFormat)).removeClass("hide"),
            e.find(".sale").text(theme.strings.sale).removeClass("hide"),
            e.find(".sale").hasClass("percentage")) {
                var n = Math.round(100 * (o.compare_at_price - o.price) / o.compare_at_price);
                e.find(".sale").text("-" + n + "%")
            }
            if (window.builtin_currencies_used && (r(e.find(".money")),
            theme.CurrencyPicker.convert(".product-item-advanced-wrapper .money")),
            null !== o.featured_image) {
                a(e, o.featured_image.src);
                var s = t(o.featured_image.src);
                e.find("img.mpt-image").attr("srcset", s.srcset).attr("src", s.src)
            }
        }
        function n(t, a, e, r) {
            if (1 < a.options.length)
                for (var o = t.closest(".product-item-option"), n = 0; n < a.options.length; n++)
                    n != e && o.find(".single-option-selector-item-" + n + " option").each(function() {
                        var t = "unavailable"
                          , o = $(this).attr("value");
                        for (j = 0; j < a.variants.length; j++) {
                            var s = a.variants[j];
                            if (s.options[e] != r)
                                continue;
                            else if (s.options[n] == o) {
                                t = !0 == s.available ? "available" : "sold_out";
                                break
                            }
                        }
                        $(this).closest(".selector-wrapper-item").find(".swatch-element-item." + $(this).data("swatch")).removeClass("available").removeClass("sold_out").removeClass("unavailable").addClass(t)
                    });
            else {
                for (var n = 0; n < a.variants.length; n++)
                    var s = a.variants[n]
                      , l = s.option1;
                for (var n = 0; n < a.options.length; n++)
                    t.find("option").each(function() {
                        var e = "unavailable"
                          , t = $(this).attr("value");
                        for (j = 0; j < a.variants.length; j++)
                            if (a.variants[j].options[n] == t) {
                                e = a.variants[j].available ? "available" : "sold_out";
                                break
                            }
                        $(this).closest(".selector-wrapper-item").find(".swatch-element-item." + $(this).data("swatch")).removeClass("available").removeClass("sold_out").removeClass("unavailable").addClass(e)
                    })
            }
        }
        var e = e || "body";
        0 < $(".single-option-selector-item").length && $(".single-option-selector-item").unbind("change") && $(document).on("change", ".single-option-selector-item", function() {
            var e = $(this).closest(".product-item-advanced-wrapper");
            if (0 < e.find(".ProductItemJson").length) {
                var t = JSON.parse(e.find(".ProductItemJson").html())
                  , a = {}
                  , r = "not_found";
                for ($(this).closest(".variations-content").find(".single-option-selector-item").each(function() {
                    a[$(this).data("index")] = $(this).val()
                }),
                k = 0; k < t.variants.length; k++) {
                    var n = !1;
                    for (ol = 1; ol <= t.options.length; ol++)
                        if (a["option" + ol] == t.variants[k]["option" + ol])
                            n = !0;
                        else {
                            n = !1;
                            break
                        }
                    if (!0 == n) {
                        r = "found",
                        o(e, t.variants[k]);
                        break
                    }
                }
                "not_found" == r && (e.find(".btn-action.addtocart-item-js span").text(theme.strings.unavailable),
                e.closest(".product-item-advanced-wrapper").find(".btn-action.addtocart-item-js").prop("disabled", !0))
            }
        });
        var s = e + " .swatch-item-radio-js";
        0 < $(s).length && ($(s).unbind("click"),
        $(document).on("click", s, function() {
            var e = JSON.parse($(this).closest(".product-item-advanced-wrapper").find(".ProductItemJson").html())
              , t = $(this).closest(".selector-wrapper-item")
              , a = t.find("select.single-option-selector-item")
              , r = $(this).data("poption")
              , o = $(this).data("value");
            $(this).data("value") != a.val() && (a.val($(this).data("value")).trigger("change"),
            t.find("label").removeClass("label-selected"),
            $(this).parent("label").addClass("label-selected"),
            t.find(".swatch-radio").removeClass("selected"),
            $(this).addClass("selected")),
            n(a, e, r, o)
        }),
        $(document).ajaxComplete(function() {
            $(s + ".selected").trigger("click")
        }),
        $(s + ".selected").trigger("click")),
        $(document).on("mouseenter mouseleave click", ".product-item-advanced-wrapper", function() {
            $(this).parent().hasClass("mproducts-list-detail")
        }),
        $(document).on("click", ".item-images-wrapper a", function() {
            if (!$(this).hasClass("active")) {
                var e = $(this).data("_image")
                  , a = t(e);
                $(this).closest(".item-images-wrapper").find("a").removeClass("active"),
                $(this).addClass("active"),
                $(this).closest(".product-content-wrapper").find("img.mpt-image").attr("srcset", a.srcset).attr("src", a.src)
            }
        }),
        $(document).on("click", ".items-image-buttons a", function(t) {
            t.preventDefault(),
            $(this).hasClass("next") ? $(this).closest(".product").find(".item-images-wrapper a.active").next().trigger("click") : $(this).closest(".product").find(".item-images-wrapper a.active").prev().trigger("click")
        })
    },
    initFilterSidebar: function() {
        $(".filter_title .arrow").on("click", function() {
            $(this).toggleClass("rotArr"),
            $(this).parent().next().slideToggle(300)
        })
    },
    initVerticalMenuSidebar: function() {
        $(".ver-dropdown-parent-submenu a.dropdown-link").on("click", function(t) {
            t.preventDefault();
            var e = $(this).closest(".ver-dropdown-parent-submenu").find("ul.ver-dropdown-menu")
              , a = $(this).find("i.fa");
            a.hasClass("aDown") ? a.removeClass("aDown") && e.slideUp() : a.addClass("aDown") && e.slideDown()
        })
    },
    fixedHeaderMenu: function() {
        if (!(991 >= $(window).width())) {
            if (0 < $("#header-phantom").length && $("#header-phantom").remove(),
            0 < $(".section-megamenu-content").length && $(".section-megamenu-content").each(function() {
                var t = $(this).data("menu_width_class");
                0 < $(this).closest(".shopify-section").length && ($(this).closest(".shopify-section").hasClass(t) || $(this).closest(".shopify-section").addClass(t))
            }),
            "menu" == window.fixed_header) {
                var t = $("<div id=\"header-phantom\" class=\"fixed-header-1 sticky-header\"></div>");
                t.insertAfter(".mega-menu-modules"),
                $(".mega-menu-modules").clone().appendTo("#header-phantom"),
                roar.fixedMenu(),
                $(window).resize(function() {
                    roar.fixedMenu()
                }),
                $(window).scroll(function() {
                    roar.fixedMenu()
                })
            } else if ("header" == window.fixed_header) {
                var t = $("<div id=\"header-phantom\" class=\"fixed-header-1 sticky-header\"></div>");
                t.insertAfter("#header-parts"),
                $("#header-parts").clone().appendTo("#header-phantom"),
                roar.fixedHeader(),
                $(window).resize(function() {
                    roar.fixedHeader()
                }),
                $(window).scroll(function() {
                    roar.fixedHeader()
                })
            }
            0 < $("#header-phantom .shopify-section").length && $("#header-phantom .shopify-section").each(function() {
                $(this).removeClass("shopify-section")
            })
        }
    },
    fixedHeader: function() {
        var t = $("header #header-parts").first().width();
        $("header #header-parts .background").first().width() != $("header").first().width() && $(".sticky-header").css("background", "none"),
        $(".sticky-header").css("width", t).css("left", "50%").css("right", "auto").css("margin-left", "-" + Math.ceil(t / 2) + "px").css("margin-right", "-" + Math.ceil(t / 2) + "px"),
        1160 <= roar.getWidthBrowser() && 280 < $(window).scrollTop() ? $(".sticky-header").addClass("fixed-header") : $(".sticky-header").removeClass("fixed-header")
    },
    fixedMenu: function() {
        var t = $("header .mega-menu-modules").first().width();
        $("header #header-parts .background").first().width() != $("header").first().width() && $(".sticky-header").css("background", "none"),
        $(".sticky-header").css("width", t).css("left", "50%").css("right", "auto").css("margin-left", "-" + Math.ceil(t / 2) + "px").css("margin-right", "-" + Math.ceil(t / 2) + "px"),
        1160 <= roar.getWidthBrowser() && 280 < $(window).scrollTop() ? $(".sticky-header").addClass("fixed-header") : $(".sticky-header").removeClass("fixed-header")
    },
    toggleFilter: function() {
        $("#filter-sidebar").on("click", function() {
            $("body").toggleClass("open_filter")
        }),
        $(document).on("click", ".open_filter .spinner", function() {
            $("body").removeClass("open_filter")
        }),
        $("#filter-addtocart").on("click", function() {
            $("#product .add-to-cart").trigger("click")
        })
    },
    destroyCountdown: function() {
        $.fn.countdown && $(".is-countdown").countdown("destroy")
    },
    initCountdown: function() {
        $.fn.countdown && $(".countdown:not(.is-countdown)").each(function() {
            var a = $(this)
              , e = new Date
              , t = new Date(parseInt(a.data("year")),parseInt(a.data("month")) - 1,a.data("day"));
            t > e ? a.countdown({
                until: t
            }) : a.parent().hide()
        })
    },
    handleCookie: function() {
        function e() {
            try {
                var t = "domain=." + document.domain
                  , e = new Date;
                e.setTime(e.getTime() + 31536e6);
                var a = "; expires=" + e.toGMTString();
                document.cookie = "popup-module-cookie=true" + a + "; path=/; " + t
            } catch (t) {}
        }
        function t() {
            try {
                if (0 < document.cookie.length) {
                    var e = document.cookie.indexOf("popup-module-cookie=");
                    if (-1 != e) {
                        e = e + "popup-module-cookie".length + 1;
                        var a = document.cookie.indexOf(";", e);
                        return -1 == a && (a = document.cookie.length),
                        unescape(document.cookie.substring(e, a))
                    }
                }
            } catch (t) {}
        }
        !t() && $("#cookie").length && (function() {
            $("#cookie.cookie").length ? $("#cookie").fadeIn("slow") : $("#cookie.popup").length && $.magnificPopup.open({
                items: {
                    src: "#cookie",
                    type: "inline"
                },
                tLoading: "",
                mainClass: "popup-module mfp-with-zoom popup-type-2",
                removalDelay: 200,
                modal: !0
            })
        }(),
        $("#cookie .accept").on("click", function() {
            e(),
            $("#cookie.cookie").length ? $("#cookie").fadeOut("slow") : $("#cookie.popup").length && $.magnificPopup.close()
        }))
    },
    handleBlog: function() {
        function a(t) {
            $.ajax({
                url: location.href,
                type: "get",
                dataType: "html",
                data: {
                    page: t
                },
                success: function(t) {
                    "" != $(t).find(".blog-page .empty").html() && $(".pagination-ajax").hide()
                },
                error: function() {
                    $(".pagination-ajax").hide()
                }
            })
        }
        function e() {
            t = $(".posts").masonry({
                itemSelector: ".post"
            }),
            t.imagesLoaded().progress(function() {
                t.masonry("layout")
            })
        }
        if ($("body").hasClass("templateBlog")) {
            var t = {};
            $(".posts").hasClass("posts-grid") && e(),
            $("#load-more").on("click", function() {
                var e = $(this).attr("data-page");
                $.ajax({
                    url: location.href,
                    type: "get",
                    dataType: "html",
                    data: {
                        page: e
                    },
                    beforeSend: function() {
                        $("#load-more").button("loading")
                    },
                    complete: function() {
                        $("#load-more").button("reset")
                    },
                    success: function(t) {
                        return "" == t ? void $(".pagination-ajax").fadeOut() : ($(".posts").hasClass("posts-grid") ? ($(".posts").append($(t).find(".posts").html()),
                        $(".posts").masonry("reloadItems").masonry({
                            sortBy: "original-order"
                        }),
                        setTimeout(function() {
                            $(".posts").masonry("reloadItems").masonry({
                                sortBy: "original-order"
                            })
                        }, 500)) : $(".posts").append($(t).find(".posts").html()),
                        $("#load-more").attr("data-page", parseInt(++e)),
                        void a(e))
                    }
                })
            })
        }
    },
    handleCompare: function() {
        "1" == window.compare && (roar.handleCompareEvent(),
        roar.autoloadCompare(),
        roar.handleCompareScroll())
    },
    handleCompareEvent: function() {
        var e = $("body")
          , t = $("a.add_to_compare");
        e.on("click", "a.add_to_compare", function() {
            var e = $(this)
              , t = e.data("pid")
              , a = ""
              , r = RoarCookie.cookie.rtread("rt-compare");
            if (r = null != r && "" != r ? r.split(",") : [],
            0 > r.indexOf(t) && !1 === $(this).hasClass("added")) {
                r.push(t);
                var o = r.join(",");
                "," == o.substring(0, 1) && (o = o.substring(1)),
                RoarCookie.cookie.rtwrite("rt-compare", o)
            }
            !1 === $(this).hasClass("added") || "" === a ? (a = "",
            $.ajax({
                url: "/search?view=compare&q=" + r,
                dataType: "html",
                type: "GET",
                success: function(e) {
                    a = e
                },
                error: function() {
                    console.log("ajax error")
                },
                complete: function() {
                    $.magnificPopup.open({
                        items: {
                            src: a,
                            type: "inline"
                        },
                        preloader: !0,
                        tLoading: "",
                        mainClass: "quickview compareview",
                        removalDelay: 200,
                        gallery: {
                            enabled: !0
                        },
                        callbacks: {
                            open: function() {
                                $("[data-pid=\"" + t + "\"]").addClass("added").attr("title", $("[data-pid=\"" + t + "\"]").attr("data-added")),
                                $("[data-pid=\"" + t + "\"]").find("span").html($("[data-pid=\"" + t + "\"]").attr("data-add")),
                                window.builtin_currencies_used && theme.CurrencyPicker.convert(".compare-content .money"),
                                roar.handleReviews(),
                                roar.handleCompareScroll()
                            }
                        }
                    })
                }
            })) : $.ajax({
                url: "/search?view=compare&q=" + r,
                dataType: "html",
                type: "GET",
                success: function(e) {
                    a = e
                },
                error: function() {
                    console.log("ajax error")
                },
                complete: function() {
                    $.magnificPopup.open({
                        items: {
                            src: a,
                            type: "inline"
                        },
                        preloader: !0,
                        tLoading: "",
                        mainClass: "quickview compareview",
                        removalDelay: 200,
                        gallery: {
                            enabled: !0
                        },
                        callbacks: {
                            open: function() {
                                window.builtin_currencies_used && theme.CurrencyPicker.convert(".compare-content .money"),
                                roar.handleReviews(),
                                roar.handleCompareScroll()
                            }
                        }
                    })
                }
            })
        }),
        e.on("click", ".remove_from_compare", function(e) {
            e.preventDefault();
            var t = $(this)
              , a = t.attr("data-rev")
              , r = $(".compare-content");
            $("[data-pid=\"" + a + "\"]").removeClass("added").attr("title", $("[data-pid=\"" + a + "\"]").attr("data-add")),
            $("[data-pid=\"" + a + "\"]").find("span").html($("[data-pid=\"" + a + "\"]").attr("data-add"));
            var o = decodeURI(RoarCookie.cookie.rtread("rt-compare"));
            null != o && (o = o.split(",")),
            o = $.grep(o, function(e) {
                return e != a
            }),
            o = $.trim(o),
            RoarCookie.cookie.rtwrite("rt-compare", o),
            $(".fastor_" + a).remove(),
            0 >= o.length && $(".mfp-close").trigger("click")
        })
    },
    autoloadCompare: function() {
        if (0 != parseInt(theme.compare)) {
            var e = RoarCookie.cookie.rtread("rt-compare");
            null == e ? e = [] : (e = e.split(","),
            e.map(function(e) {
                $("[data-pid=\"" + e + "\"]").addClass("added").attr("title", $("[data-pid=\"" + e + "\"]").attr("data-added")),
                $("[data-pid=\"" + e + "\"]").find("span").html($("[data-pid=\"" + e + "\"]").attr("data-added"))
            }))
        }
    },
    handleCompareScroll: function() {
        $("#be_compare_features_table").on("scroll", function() {
            var e = $(this).parent();
            $(this).scrollLeft() + $(this).innerWidth() >= $(this)[0].scrollWidth ? e.hasClass("scroll-right") && e.removeClass("scroll-right") : 0 === $(this).scrollLeft() ? e.hasClass("scroll-left") && e.removeClass("scroll-left") : (!e.hasClass("scroll-right") && e.addClass("scroll-right"),
            !e.hasClass("scroll-left") && e.addClass("scroll-left"))
        }),
        be_compare_container = document.getElementById("be_compare_features_table"),
        null !== be_compare_container && be_compare_container.offsetWidth < be_compare_container.scrollWidth && !$("#be_compare_features_table_inner").hasClass("scroll-right") && $("#be_compare_features_table_inner").addClass("scroll-right"),
        $(window).on("resize", function() {
            roar.be_compare_products_table_shadows()
        }),
        $("#be_compare_features_table_inner").hasClass("scroll-left") || $("#be_compare_features_table_inner").hasClass("scroll-right") ? $(".compareview").addClass("no-flex") : $(".compareview").removeClass("no-flex")
    },
    be_compare_products_table_shadows: function() {
        be_compare_container = document.getElementById("be_compare_features_table");
        null === be_compare_container || (be_compare_container.offsetWidth < be_compare_container.scrollWidth ? !$("#be_compare_features_table_inner").hasClass("scroll-right") && $("#be_compare_features_table_inner").addClass("scroll-right") : ($("#be_compare_features_table_inner").hasClass("scroll-right") && $("#be_compare_features_table_inner").removeClass("scroll-right"),
        $("#be_compare_features_table_inner").hasClass("scroll-left") && $("#be_compare_features_table_inner").removeClass("scroll-left")),
        $("#be_compare_features_table_inner").hasClass("scroll-left") || $("#be_compare_features_table_inner").hasClass("scroll-right") ? $(".compareview").addClass("no-flex") : $(".compareview").removeClass("no-flex"))
    },
    removeToWishlist: function() {
        $(document).on("click", ".remove-wishlist", function(r) {
            r.preventDefault();
            var n = $(this)
              , e = n.closest("form")
              , t = {
                action: "remove_wishlist"
            };
            return t = e.serialize() + "&" + $.param(t),
            $.ajax({
                type: "POST",
                url: "/a/wishlist",
                async: !0,
                cache: !1,
                data: t,
                dataType: "json",
                beforeSend: function() {
                    $(".page-wishlist").addClass("is_loading")
                },
                error: function() {
                    $(".page-wishlist").removeClass("is_loading")
                },
                success: function(t) {
                    1 == t.code ? n.closest(".item").slideUp("fast", function() {
                        n.closest(".item").remove(),
                        $(".page-wishlist .infos").removeClass("hide"),
                        $(".wishlist_items_number").text(t.json),
                        0 == t.json && $(".wishlist-empty").removeClass("hide")
                    }) : alert(t.json),
                    $(".page-wishlist").removeClass("is_loading")
                }
            }),
            !1
        })
    },
    addToWishlist: function() {
        $(document).on("click", ".add-to-wishlist:not(.added)", function() {
            if ($(this).hasClass("need-login")) {
                var e = $("#wishlist_error").html();
                return $.notify({
                    message: e,
                    target: "_blank"
                }, {
                    type: "info",
                    showProgressbar: !0,
                    z_index: 2031,
                    mouse_over: "pause",
                    placement: {
                        from: "top",
                        align: window.rtl ? "left" : "right"
                    }
                }),
                !1
            }
            var r = $(this)
              , t = r.closest("form")
              , a = {
                action: "add_wishlist"
            };
            return a = t.serialize() + "&" + $.param(a),
            $.ajax({
                type: "POST",
                url: "/a/wishlist",
                async: !0,
                cache: !1,
                data: a,
                dataType: "json",
                beforeSend: function() {
                    r.hasClass("btooltip") ? r.addClass("loading") : r.attr("title", r.attr("data-loading-text")).find("span").text(r.attr("data-loading-text"))
                },
                complete: function() {
                    r.hasClass("btooltip") && r.removeClass("loading"),
                    $(".wishlist" + r.prev().val()).attr("title", r.attr("data-added")).addClass("added").find("span").text(r.attr("data-added"))
                },
                error: function(a) {
                    var e = i = $.parseJSON(a.responseText)
                      , t = e.message + ": " + e.description;
                    $.notify({
                        message: t,
                        target: "_blank"
                    }, {
                        type: "info",
                        showProgressbar: !0,
                        z_index: 2031,
                        mouse_over: "pause",
                        placement: {
                            from: "top",
                            align: window.rtl ? "left" : "right"
                        }
                    })
                },
                success: function() {
                    var a = r.closest(".product")
                      , e = [{
                        product_url: a.find(".name a").attr("href"),
                        product_name: a.find(".name a").text()
                    }];
                    $.notify({
                        message: $("<div>").append($("#wishlist_success").tmpl(e).clone()).html(),
                        target: "_blank"
                    }, {
                        type: "success",
                        showProgressbar: !0,
                        z_index: 2031,
                        mouse_over: "pause",
                        placement: {
                            from: "top",
                            align: window.rtl ? "left" : "right"
                        }
                    })
                }
            }),
            !1
        })
    },
    handleUpsellProducts: function() {
        if (0 == $("#productUpsells ").length)
            return;
        if ($("#productUpsells .splide").length) {
            let e = new Splide("#productUpsells .splide",{
                updateOnMove: !0
            });
            e.on("mounted moved", debounce(function() {
                $(e.root).find(".splide__slide").removeClass("is-last-visible"),
                $(e.root).find(".splide__slide[tabindex=0]").last().addClass("is-last-visible")
            }, 2e3)),
            e.mount()
        }
        roar.handleQuickshop("#productUpsells .splide")
    },
    handleCartPage: function() {
        function e(a) {
            var e = a.closest("tr").index()
              , r = {
                type: "get",
                dataType: "json",
                url: "/cart/change?line=" + (e + 1) + "&quantity=" + a.val(),
                success: function(r) {
                    var n = "<span class=\"money\">" + theme.Currency.formatMoney(r.items[e].line_price, theme.settings.moneyFormat) + "</span>"
                      , s = a.closest("tr").find(".subtotal");
                    s.length && s.empty().append(n),
                    t(r)
                },
                error: function() {
                    console.log("some ajax error with count")
                }
            };
            $.ajax(r)
        }
        function t(e) {
            var t = "<span class=\"money\">" + theme.Currency.formatMoney(e.total_price, theme.settings.moneyFormat) + "</span>";
            $("#subtotal .subtotal-price").length && $("#subtotal .subtotal-price").html(t),
            window.builtin_currencies_used && theme.CurrencyPicker.convert(".cart-info .money")
        }
        if ($("body").hasClass("templateCart")) {
            $(window).on("resize", function() {
                789 >= $(window).width() ? function() {
                    $(".cart-info .cart-quantity-desktop").each(function() {
                        var e = $(this).find(".cart-quantity-wrapper").detach().get(0);
                        $(this).closest("tr").find(".cart-quantity-mobile").append(e)
                    })
                }() : function() {
                    $(".cart-info .cart-quantity-mobile").each(function() {
                        var e = $(this).find(".cart-quantity-wrapper").detach().get(0);
                        $(this).closest("tr").find(".cart-quantity-desktop").append(e)
                    })
                }()
            }).trigger("resize"),
            $(document).on("click", ".cart-quantity-wrapper span", function(t) {
                t.preventDefault();
                var e = $(this).parent().find("input")
                  , a = parseInt(e.val());
                $(this).hasClass("cart-plus") ? (++a,
                e.val(a).trigger("change")) : 1 < a && (--a,
                e.val(a).trigger("change"))
                if (window.BOLD && BOLD.common && BOLD.common.eventEmitter &&
                 typeof BOLD.common.eventEmitter.emit === 'function'){
               BOLD.common.eventEmitter.emit('BOLD_COMMON_cart_loaded');
}
            }),
            $(document).on("click", "[href$=\"quantity=0\"]", function(a) {
                $("[href$=\"quantity=0\"]").length && $("[href$=\"quantity=0\"]").css("pointer-events", "none"),
                a.preventDefault();
                var e = $(this).closest("tr")
                  , r = e.index() + 1;
                $.ajax({
                    type: "get",
                    dataType: "json",
                    url: "/cart/change?line=" + r + "&quantity=0",
                    success: function(a) {
                        e.fadeOut(400, function() {
                            $(this).remove();
                            var e = $("[href$=\"quantity=0\"]");
                            e.length || ($(".cart-page-content").remove(),
                            $(".cart-page-empty").removeClass("hide")),
                            $("[href$=\"quantity=0\"]").length && $("[href$=\"quantity=0\"]").css("pointer-events", "unset"),
                            t(a)
                        })

                      if (window.BOLD && BOLD.common && BOLD.common.eventEmitter &&
                 typeof BOLD.common.eventEmitter.emit === 'function'){
               BOLD.common.eventEmitter.emit('BOLD_COMMON_cart_loaded');
}
                    },
                    error: function() {
                        console.log("some ajax error with delete"),
                        $("[href$=\"quantity=0\"]").length && $("[href$=\"quantity=0\"]").css("pointer-events", "unset")
                    }
                })
            });
            var a = [];
            $(".cart-quantity-wrapper input").on("change", function() {
                var t = $(this)
                  , r = t.closest("tr").index();
                a[r] && (clearTimeout(a[r]),
                a[r] = null),
                a[r] = setTimeout(e.bind(null, t), 500)
            })
        }
    },
    addToCart: function() { 
        "direct" != window.shopping_cart_type && $(document).on("click", ".add-to-cart:not(.disabled)", function() { //debugger;
            var a = $(this)
              , e = a.closest("form");
            return $.ajax({
                type: "POST",
                url: "/cart/add.js",
                async: !0,
                cache: !1,
                data: e.serialize(),
                dataType: "json",
                beforeSend: function() {
                    a.hasClass("btooltip") ? a.addClass("loading") : a.button("loading") && $("#filter-addtocart span").text(a.attr("data-loading-text")) && $("#filter-addtocart").addClass("active")
                },
                complete: function() {
                    a.hasClass("btooltip") ? a.removeClass("loading") : a.button("reset") && $("#filter-addtocart").removeClass("active")
                },
                error: function(t) {
                    roar.updateCart(t, !1)
                },
                success: function(t) {
                    "sidebar" == window.shopping_cart_type ? roar.updateCartSidebar(t, !0) : roar.updateCart(t, !0)
                  setTimeout(function(){
         if (window.BOLD && BOLD.common && BOLD.common.eventEmitter &&
                  typeof BOLD.common.eventEmitter.emit === 'function'){
                BOLD.common.eventEmitter.emit('BOLD_COMMON_cart_loaded');
 }


        },500);
                }
            }).done(function() {}),
            !1
        })
    },
    cartSidebar: function() {
        "sidebar" != window.shopping_cart_type || ($("body").on("click", ".cart-item a.remove-cart", function(e) {
            e.preventDefault();
            var t = $(this)
              , a = t.attr("data-id");
            $.ajax({
                type: "POST",
                url: "/cart/change.js",
                data: "quantity=0&id=" + a,
                dataType: "json",
                beforeSend: function() {
                    $(".cart-window-body").addClass("loading")
                },
                success: function() {
                    $.ajax({
                        url: "/search",
                        beforeSend: function() {},
                        success: function() {
                            roar.updateCart(t, !0)
                        },
                        error: function(e) {
                            console.log(e)
                        }
                    }).done(function() {
                        $(".cart-window-body").removeClass("loading")
                    })
                },
                error: function(e, t) {
                    Shopify.onError(e, t),
                    $(".cart-window-body").removeClass("loading")
                }
            })
        }),
        $(document).on("focus", "#cart_info .update", function() {
            $(this).select()
        }).on("blur", "#cart_info .update", function() {
            var e = $(this)
              , t = e.val()
              , a = e.attr("data-id");
            $.ajax({
                type: "POST",
                url: "/cart/change.js",
                data: "quantity=" + t + "&id=" + a,
                dataType: "json",
                beforeSend: function() {
                    $(".cart-window-body").addClass("loading")
                },
                success: function() {
                    roar.updateCart(e, !0)
                    if (window.BOLD && BOLD.common && BOLD.common.eventEmitter &&
                 typeof BOLD.common.eventEmitter.emit === 'function'){
               BOLD.common.eventEmitter.emit('BOLD_COMMON_cart_loaded');
}
                },
                error: function(e, t) {
                    Shopify.onError(e, t)
                }
            }).done(function() {
                $(".cart-window-body").removeClass("loading")
            })
        }),
        $("body").on("click", ".cart-sidebar-trigger", function(t) {
            t.target === this && (t.preventDefault(),
            $(".cart-window-bg").toggleClass("window-hide"))
        }),
        $("body").on("click", ".cart-sidebar-trigger a.button", function(t) {
            t.preventDefault();
            var e = $(this).attr("href");
            window.location.href = window.location.origin + e
        }),
        $("body").on("click", ".close-cart", function(t) {
            t.preventDefault(),
            $(".cart-window-bg").addClass("window-hide")
        }),
        $("body").on("click", ".qty-btn.cart-plus", function() {
            var e = $(this).data("id")
              , t = parseInt($(e).val()) + 1;
            $(e).val(t);
            var a = $(e)
              , r = a.val()
              , o = a.attr("data-id");
            $.ajax({
                type: "POST",
                url: "/cart/change.js",
                data: "quantity=" + r + "&id=" + o,
                dataType: "json",
                beforeSend: function() {
                    $(".cart-window-body").addClass("loading")
                },
                success: function() {
                    roar.updateCart(a, !0)
                    if (window.BOLD && BOLD.common && BOLD.common.eventEmitter &&
                 typeof BOLD.common.eventEmitter.emit === 'function'){
               BOLD.common.eventEmitter.emit('BOLD_COMMON_cart_loaded');
}
                },
              
              
                error: function(e, t) {
                    Shopify.onError(e, t)
                }
            }).done(function() {
                $(".cart-window-body").removeClass("loading")
            })
        }),
        $("body").on("click", ".qty-btn.cart-minus", function() {
            var e = $(this).data("id")
              , t = parseInt($(e).val());
            if (1 < t) {
                $(e).val(t - 1);
                var a = $(e)
                  , r = a.val()
                  , o = a.attr("data-id")
                  , n = {
                    type: "POST",
                    url: "/cart/change.js",
                    data: "quantity=" + r + "&id=" + o,
                    dataType: "json",
                    beforeSend: function() {
                        $(".cart-window-body").addClass("loading")
                    },
                    success: function() {
                        roar.updateCart(a, !0)
                        if (window.BOLD && BOLD.common && BOLD.common.eventEmitter &&
                 typeof BOLD.common.eventEmitter.emit === 'function'){
               BOLD.common.eventEmitter.emit('BOLD_COMMON_cart_loaded');
}
                    },
                    error: function(e, t) {
                        Shopify.onError(e, t)
                    }
                };
                $.ajax(n).done(function() {
                    $(".cart-window-body").removeClass("loading")
                })
            }
        }))
    },
    updateCartSidebar: function() {
        $.ajax({
            url: "/search",
            beforeSend: function() {
                $(".cart-window-body").addClass("loading")
            },
            success: function(e) {
                0 < $("div#cart-sidebar").length && ($("div#cart-sidebar").html($(e).find("div#cart-sidebar").html()),
                setTimeout(function() {
                    $(".cart-sidebar-trigger").trigger("click")
                }, 100)),
                $("div#cart_block").html($(e).find("div#cart_block").html()),
                $("div#cart_popup").html($(e).find("div#cart_popup").html()),
                $(".mobile-nav-cart").html($(e).find(".mobile-nav-cart").html()),
                $("#filter-cart").html($(e).find("#filter-cart").html()),
                window.builtin_currencies_used && (theme.CurrencyPicker.convert("#cart_block .money"),
                theme.CurrencyPicker.convert("#cart_popup .money"),
                theme.CurrencyPicker.convert("#cart-sidebar .money")),
                roar.handleReviews()
            },
            error: function(e) {
                console.log(e)
            }
        }).done(function() {
            $(".cart-window-body").removeClass("loading")
        })
    },
    updateCart: function(e, a) {
        if (!0 == a)
            "sidebar" == window.shopping_cart_type ? $.ajax({
                url: "/search",
                beforeSend: function() {
                    $(".cart-window-body").addClass("loading")
                },
                success: function(e) {
                    0 < $("#cart-sidebar").length && $("#cart-sidebar").html($(e).find("#cart-sidebar").html()),
                    $("div#cart_block").html($(e).find("div#cart_block").html()),
                    $("div#cart_popup").html($(e).find("div#cart_popup").html()),
                    $(".mobile-nav-cart").html($(e).find(".mobile-nav-cart").html()),
                    $("#filter-cart").html($(e).find("#filter-cart").html()),
                    window.builtin_currencies_used && (theme.CurrencyPicker.convert("#cart_block .money"),
                    theme.CurrencyPicker.convert("#cart_popup .money"),
                    theme.CurrencyPicker.convert("#cart-sidebar .money")),
                    roar.handleReviews()
                  if (window.BOLD && BOLD.common && BOLD.common.eventEmitter &&
                 typeof BOLD.common.eventEmitter.emit === 'function'){
               BOLD.common.eventEmitter.emit('BOLD_COMMON_cart_loaded');
}
                },
                error: function(e) {
                    console.log(e)
                }
            }).done(function() {
                $(".cart-window-body").removeClass("loading")
              if (window.BOLD && BOLD.common && BOLD.common.eventEmitter &&
                 typeof BOLD.common.eventEmitter.emit === 'function'){
               BOLD.common.eventEmitter.emit('BOLD_COMMON_cart_loaded');
}
            }) : $.ajax({
                url: "/search?view=cart&q=" + e.handle + "_sp_" + e.variant_id + "_sp_" + e.quantity + "_sp_" + e.price,
                beforeSend: function() {},
                success: function(e) {
                    $("div#cart_block").html($(e).find("div#cart_block").html()),
                    $("div#cart_popup").html($(e).find("div#cart_popup").html()),
                    $(".mobile-nav-cart").html($(e).find(".mobile-nav-cart").html()),
                    $("#filter-cart").html($(e).find("#filter-cart").html()),
                    window.builtin_currencies_used && (theme.CurrencyPicker.convert("#cart_popup .money"),
                    theme.CurrencyPicker.convert("#cart_block .money"))
                  if (window.BOLD && BOLD.common && BOLD.common.eventEmitter &&
                 typeof BOLD.common.eventEmitter.emit === 'function'){
               BOLD.common.eventEmitter.emit('BOLD_COMMON_cart_loaded');
}
                },
                error: function(e) {
                    console.log(e)
                }
            }).done(function() {
                if ("ajax_notify" == window.shopping_cart_type) {
                    var r = [{
                        product_url: e.url,
                        product_name: e.title
                    }];
                    $.notify({
                        message: $("<div>").append($("#cart_success").tmpl(r).clone()).html(),
                        target: "_blank"
                    }, {
                        type: "success",
                        showProgressbar: !0,
                        z_index: 2031,
                        mouse_over: "pause",
                        placement: {
                            from: "top",
                            align: window.rtl ? "left" : "right"
                        }
                    })
                } else
                    roar.popupCart(a)
              if (window.BOLD && BOLD.common && BOLD.common.eventEmitter &&
                 typeof BOLD.common.eventEmitter.emit === 'function'){
               BOLD.common.eventEmitter.emit('BOLD_COMMON_cart_loaded');
}
            });
        else {
            var r = $.parseJSON(e.responseText);
            $.ajax({
                url: "/search?view=cart_error&q=" + r.description,
                beforeSend: function() {},
                success: function(e) {
                    $("div#cart_error_popup").html($(e).filter("div#cart_error_popup").html())
                },
                error: function(e) {
                    console.log(e)
                }
            }).done(function() {
                if ("ajax_notify" == window.shopping_cart_type) {
                    var r = i = $.parseJSON(e.responseText)
                      , t = r.message + ": " + r.description;
                    $.notify({
                        message: t,
                        target: "_blank"
                    }, {
                        type: "info",
                        showProgressbar: !0,
                        z_index: 2031,
                        mouse_over: "pause",
                        placement: {
                            from: "top",
                            align: window.rtl ? "left" : "right"
                        }
                    })
                } else
                    roar.popupCart(a)
            })
        }
    },
    removeCart: function() {
        $(document).on("click", ".mini-cart-info .remove a", function(e) {
            e.preventDefault();
            var t = $(this)
              , a = t.attr("data-id");
            $.ajax({
                type: "POST",
                url: "/cart/change.js",
                data: "quantity=0&id=" + a,
                dataType: "json",
                beforeSend: function() {
                    $("#cart_content").addClass("loading")
                },
                success: function() {
                    $.ajax({
                        url: "/search",
                        beforeSend: function() {},
                        success: function(e) {
                            $("div#cart_block").html($(e).find("div#cart_block").html()),
                            $("div#cart_popup").html($(e).find("div#cart_popup").html()),
                            $(".mobile-nav-cart").html($(e).find(".mobile-nav-cart").html()),
                            $("#filter-cart").html($(e).find("#filter-cart").html()),
                            window.builtin_currencies_used && (theme.CurrencyPicker.convert("#cart_popup .money"),
                            theme.CurrencyPicker.convert("#cart_block .money"))
                        },
                        error: function(e) {
                            console.log(e)
                        }
                    }).done(function() {
                        $("#cart_content").removeClass("loading")
                    })
                },
                error: function(e, t) {
                    Shopify.onError(e, t),
                    $("#cart_content").removeClass("loading")
                }
            })
        })
    },
    popupCart: function(e) {
        !0 == e ? $.magnificPopup.open({
            items: {
                src: "#cart_popup",
                type: "inline"
            },
            tLoading: "",
            mainClass: "popup-module mfp-with-zoom popup-type-1",
            removalDelay: 200,
            callbacks: {
                open: function() {
                    $("#cart_popup .continue-shopping").unbind("click"),
                    $("body").on("click", "#cart_popup .continue-shopping", function(e) {
                        e.preventDefault(),
                        $.magnificPopup.close()
                    })
                }
            }
        }) : $.magnificPopup.open({
            items: {
                src: "#cart_error_popup",
                type: "inline"
            },
            tLoading: "",
            mainClass: "popup-module mfp-with-zoom popup-type-1",
            removalDelay: 200,
            callbacks: {
             open: function() {
                    window.location.reload();
                }
          }
        })
    },
    handlePopups: function() {
        function r() {
            if (0 == window.popup_mailchimp_expire ? $("#popup-mailchimp .dont-show-me").change(function() {
                $(this).is(":checked") ? n() : t()
            }) : 1 == window.popup_mailchimp_expire && t(),
            !o()) {
                var a = parseInt(window.popup_mailchimp_delay, 20)
                  , e = parseInt(window.popup_mailchimp_close, 20);
                setTimeout(function() {
                    $.magnificPopup.open({
                        items: {
                            src: "#popup-mailchimp",
                            type: "inline"
                        },
                        tLoading: "",
                        mainClass: "popup-module mfp-with-zoom popup-type-1",
                        removalDelay: 200
                    }),
                    0 < e && setTimeout(function() {
                        $.magnificPopup.close()
                    }, e)
                }, a),
                2 == window.popup_mailchimp_expire && n()
            }
            var s = $("#mc-form")
              , l = s.attr("action");
            s.ajaxChimp({
                url: l,
                callback: function() {}
            })
        }
        function n() {
            try {
                var a = parseInt(window.popup_mailchimp_period);
                0 >= a && (a = 1);
                var r = "domain=." + document.domain
                  , t = new Date;
                t.setTime(t.getTime() + 1e3 * (60 * (60 * (24 * a))));
                var o = "; expires=" + t.toGMTString();
                document.cookie = "popup-module-mailchimp=true" + o + "; path=/; " + r
            } catch (e) {}
        }
        function t() {
            try {
                var t = "domain=." + document.domain;
                document.cookie = "popup-module-mailchimp=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; " + t
            } catch (t) {}
        }
        function o() {
            try {
                if (0 < document.cookie.length) {
                    var e = document.cookie.indexOf("popup-module-mailchimp=");
                    if (-1 != e) {
                        e = e + "popup-module-mailchimp".length + 1;
                        var a = document.cookie.indexOf(";", e);
                        return -1 == a && (a = document.cookie.length),
                        unescape(document.cookie.substring(e, a))
                    }
                }
            } catch (t) {
                console.log(t.message)
            }
        }
        $(".newsletter-terms").on("change", function() {
            !0 == $(this).prop("checked") ? $(this).closest("form").find("button").prop("disabled", !1) : $(this).closest("form").find("button").prop("disabled", !0)
        }),
        $("#popup-mailchimp").length && ($("#popup-mailchimp").hasClass("d-none d-sm-block") ? 768 <= roar.getWidthBrowser() && r() : r())
    },
    handleVerticalMenu: function() {
        $(".category_trigger").on("click", function() {
            (768 > roar.getWidthBrowser() || $("html").hasClass("touch")) && ($(".shop_category").hasClass("is_open") ? ($(".shop_category").removeClass("is_open"),
            $(".shop_category .submenu-group").slideUp()) : ($(".shop_category").addClass("is_open"),
            $(".shop_category .submenu-group").slideDown()))
        }),
        $(".shop_category .has-children>span>.fa").on("click", function() {
            var a = $(this).closest(".menu-item")
              , e = a.find(".submenu");
            (768 > roar.getWidthBrowser() || $("html").hasClass("touch")) && (a.hasClass("is_open") ? (a.removeClass("is_open"),
            e.slideUp()) : (a.addClass("is_open"),
            e.slideDown()))
        })
    },
    updateGroupedPrice: function() {
        if (0 != $("#grouped-price").length) {
            var e = 0;
            $(".grouped-product-item .grouped-checkbox").each(function() {
                $(this).is(":checked") && (e += parseFloat($($(this).data("id")).find("div.price").data("price")),
                $("#grouped-price").html("<span class=\"money\">" + theme.Currency.formatMoney(e, theme.settings.moneyFormat) + "</span>"),
                window.builtin_currencies_used && theme.CurrencyPicker.convert("#grouped-price .money"))
            })
        }
    },
    handleQuickshop: function(e) {
        var e = e || "body";
        let t = loadScriptAsync(theme.libs.mpopup);
        t.then(function() {
            return $(e).find(".quickview .quick_view").magnificPopup({
                type: "ajax",
                preloader: !0,
                tLoading: "",
                mainClass: "quickview",
                removalDelay: 200,
                gallery: {
                    enabled: !1
                },
                callbacks: {
                    ajaxContentAdded: function() {
                        roar.handleReviews();
                        var t = new theme.Sections;
                        t.register("product-quickview-template", theme.Product),
                        window.builtin_currencies_used && theme.CurrencyPicker.convert("#ProductSection-product-quickview-template .money"),
                        Shopify.PaymentButton.init();
                        var a = $(".quickview").find(".add-to-wishlist");
                        a.attr("title", a.attr("data-added")).addClass("added").find("span").text(a.attr("data-added")),
                        setTimeout(function() {
                            $(window).trigger("resize")
                        }, 1e3)
                    }
                }
            }),
            !1
        })
    },
    mapClearFilter: function() {
        $(".mfilter-box .column").each(function() {
            var a = $(this);
            0 < a.find("input:checked").length && a.find(".clear").on("click", function(e) {
                var r = [];
                Shopify.queryParams.constraint && (r = Shopify.queryParams.constraint.split("+")),
                a.find("input:checked").each(function() {
                    var o = $(this)
                      , e = o.val();
                    if (e) {
                        var t = r.indexOf(e);
                        0 <= t && r.splice(t, 1)
                    }
                }),
                r.length ? Shopify.queryParams.constraint = r.join("+") : delete Shopify.queryParams.constraint,
                roar.filterAjaxClick(),
                e.preventDefault()
            })
        })
    },
    mapSingleFilter: function() {
        $("body").on("change", ".advanced-filter .field:not(.disable) input", function() {
            var r = $(this).parent()
              , e = $(this).val()
              , n = [];
            if (Shopify.queryParams.constraint && (n = Shopify.queryParams.constraint.split("+")),
            !window.enable_filter_multiple_choice && !r.hasClass("active")) {
                var t = r.parents(".advanced-filter").find(".active");
                0 < t.length && t.each(function() {
                    var a = $(this).data("handle");
                    if ($(this).removeClass("active"),
                    a) {
                        var e = n.indexOf(a);
                        0 <= e && n.splice(e, 1)
                    }
                })
            }
            if (e) {
                var a = n.indexOf(e);
                0 > a ? (n.push(e),
                r.addClass("active")) : (n.splice(a, 1),
                r.removeClass("active"))
            }
            n.length ? Shopify.queryParams.constraint = n.join("+") : delete Shopify.queryParams.constraint,
            roar.filterAjaxClick()
        })
    },
    mapSingleCollection: function() {
        $("body").on("click", ".advanced-collection .field", function(a) {
            var e = $(this)
              , t = e.attr("href");
            e.hasClass("active") || (roar.filterAjaxClick(t),
            $(".advanced-collection .field").removeClass("active"),
            e.addClass("active"),
            a.preventDefault())
        })
    },
    mapSingleSort: function() {
        $("body").on("change", ".advanced-sortby .field", function(a) {
            var e = $(this)
              , t = e.val();
            Shopify.queryParams.sort_by = t,
            roar.filterAjaxClick(),
            a.preventDefault()
        })
    },
    mapSingleLimit: function() {
        $("body").on("change", ".advanced-limit .field", function(a) {
            var e = $(this)
              , t = e.val();
            Shopify.queryParams.view = t,
            roar.filterAjaxClick(),
            a.preventDefault()
        })
    },
    mapSinglePagination: function() {
        $("body").on("click", "#mfilter-content-container .advanced-pagination a", function(a) {
            var e = $(this);
            delete Shopify.queryParams.page,
            delete Shopify.queryParams.constraint,
            delete Shopify.queryParams.q,
            delete Shopify.queryParams.sort_by,
            roar.filterAjaxClickPaging(e.attr("href")),
            a.preventDefault()
        })
    },
    mapFilters: function() {
        roar.handleGridList(),
        roar.handleShopView(),
        roar.mapPagination()
    },
    mapPaginationCallback: function() {
        roar.handleGridList(),
        roar.handleShopView(),
        roar.handleQuickshop(),
        roar.handleReviews(),
        roar.initCountdown(),
        window.builtin_currencies_used && theme.CurrencyPicker.convert("#sandbox .money")
    },
    mapPagination: function() {
        if ($(document.body).on("click", ".fastor_ajax_load_button a", function(t) {
            if (t.preventDefault(),
            $(".pagination a.next").length) {
                $(".fastor_ajax_load_button a").attr("data-processing", 1);
                var e = $(".pagination a.next").attr("href")
                  , a = $(".fastor_ajax_load_button a").attr("data-loading-items")
                  , r = $(".fastor_ajax_load_button a").attr("data-no-more");
                $(".fastor_ajax_load_button").hide(),
                $(".pagination").before("<div class=\"fastor_ajax_load_more_loader animated fadeIn\"><a href=\"#\"><i class=\"icon-px-outline-load\"></i>&nbsp;&nbsp;<span>" + a + "</span></a></div>"),
                $.get(e, function(e) {
                    $(".advanced-pagination").html($(e).find(".advanced-pagination").html()),
                    $(e).find(".product-list .product").each(function() {
                        $(".product-list .product:last").after($(this))
                    }),
                    $(e).find(".product-grid .product-item").each(function() {
                        $(".product-grid .product-item:last").after($(this))
                    }),
                    roar.mapPaginationCallback(),
                    $(".fastor_ajax_load_more_loader").fadeOut("slow"),
                    $(".fastor_ajax_load_button").fadeIn("slow"),
                    $(".fastor_ajax_load_button a").attr("data-processing", 0),
                    0 == $(".pagination a.next").length && ($(".fastor_ajax_load_button").addClass("finished").removeClass("fastor_ajax_load_more_hidden"),
                    $(".fastor_ajax_load_button a").show().html(r).addClass("disabled"))
                })
            } else {
                var r = $(".fastor_ajax_load_button a").attr("data-no-more");
                $(".fastor_ajax_load_button").addClass("finished").removeClass("fastor_ajax_load_more_hidden"),
                $(".fastor_ajax_load_button a").show().html(r).addClass("disabled")
            }
        }),
        $(".fastor_ajax_load_button").hasClass("fastor_ajax_load_more_hidden")) {
            Math.abs(0);
            $(window).scroll(function() {
                var e = $(".fastor_ajax_load_button a");
                if (0 < e.length) {
                    var t = $(window)
                      , a = t.scrollTop()
                      , r = a + t.height()
                      , o = e.offset().top
                      , n = o + e.height();
                    n <= r && o >= a && 0 == $(".fastor_ajax_load_button a").attr("data-processing") && e.trigger("click")
                }
            })
        }
    },
    filterCreateUrl: function(a) {
        var e = $.param(Shopify.queryParams).replace(/%2B/g, "+");
        return a ? "" == e ? a : a + "?" + e : location.pathname + "?" + e
    },
    updateQueryStringParameter: function(e, t, a) {
        var r = new RegExp("([?&])" + t + "=.*?(&|$)","i")
          , o = -1 === e.indexOf("?") ? "?" : "&";
        return e.match(r) ? e.replace(r, "$1" + t + "=" + a + "$2") : e + o + t + "=" + a
    },
    filterCreateUrlPaging: function(t) {
        var e = 1
          , a = t.split("page=");
        return 1 < a.length && (e = parseInt(a[1])),
        roar.updateQueryStringParameter(window.location.href, "page", e)
    },
    filterAjaxClick: function(a) {
        delete Shopify.queryParams.page;
        var e = roar.filterCreateUrl(a);
        roar.filterGetContent(e)
    },
    filterAjaxClickPaging: function(a) {
        delete Shopify.queryParams.page;
        var e = roar.filterCreateUrlPaging(a);
        roar.filterGetContent(e)
    },
    filterGetContent: function(a) {
        $.ajax({
            type: "get",
            url: a,
            beforeSend: function() {
                roar.destroyCountdown(),
                $("body").addClass("is_loading").removeClass("open_filter")
            },
            success: function(e) {
                var t = e.match("<title>(.*?)</title>")[1];
                $(e).find(".breadcrumb-content").length && $(".breadcrumb-content").html($(e).find(".breadcrumb-content").html()),
                $(".category-info").remove(),
                $(e).find(".category-info").length && $("#mfilter-content-container").prepend($(e).find(".category-info")),
                $("#sandbox").empty().html($(e).find("#sandbox").html()),
                $(".mfilter-box .mfilter-content").empty().html($(e).find(".mfilter-box .mfilter-content").html()),
                $("#mfilter-content-container .advanced-pagination").empty().html($(e).find("#mfilter-content-container .advanced-pagination").html()),
                $(".page-top").empty().html($(e).find(".page-top").html()),
                History.pushState({
                    param: Shopify.queryParams
                }, t, a),
                setTimeout(function() {
                    $("html,body").animate({
                        scrollTop: $("body #sandbox").offset().top
                    }, 500, "swing")
                }, 100),
                $("body").removeClass("is_loading"),
                roar.mapClearFilter(),
                roar.handleQuickshop(),
                roar.handleReviews(),
                roar.initCountdown(),
                roar.initFilterSidebar(),
                window.builtin_currencies_used && theme.CurrencyPicker.convert("#sandbox .money")
            },
            error: function() {
                $("body").removeClass("is_loading")
            }
        })
    },
    handleReviews: function() {
        "1" == window.reviews_enable ? "undefined" != typeof SPR && (SPR.registerCallbacks(),
        SPR.initRatingHandler(),
        SPR.initDomEls(),
        SPR.loadProducts(),
        SPR.loadBadges()) : "2" == window.reviews_enable && $.aliReviewsAddRatingCollection()
    },
    convertToSlug: function(t) {
        return t.toLowerCase().replace(/[^\w\u00C0-\u024f]+/g, "-").replace(/^-+|-+$/g, "")
    },
    getWidthBrowser: function() {
        var t;
        return "number" == typeof window.innerWidth ? t = window.innerWidth : document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight) ? t = document.documentElement.clientWidth : document.body && (document.body.clientWidth || document.body.clientHeight) && (t = document.body.clientWidth),
        t
    },
    handleScrollToTop: function() {
        $(window).scroll(function() {
            if (767 < $(window).width()) {
                var e = $(this).scrollTop()
                  , t = $(this).height()
                  , a = 1;
                0 < e && (a = e + t / 2);
                var r = $("#scroll-top");
                1e3 > a ? r.removeClass("on") : r.addClass("on")
            } else {
                var e = $(this).scrollTop();
                if (0 < $("#shopify-section-mobile-nav").length)
                    var t = $("#shopify-section-mobile-nav").offset().top + $("#shopify-section-mobile-nav").height();
                else
                    var t = $("header").offset().top + $("header").height();
                var r = $("#widgets");
                t > e ? r.removeClass("on") : r.addClass("on")
            }
        }),
        $("#scroll-top").on("click", function(t) {
            t.preventDefault(),
            $("html,body").animate({
                scrollTop: 0
            }, 800, "swing")
        })
    },
    handleGMap: function() {
        $("#contact_map").length && $().gMap && $("#contact_map").gMap({
            zoom: 17,
            scrollwheel: !1,
            maptype: "ROADMAP",
            markers: [{
                address: window.contact_map_address,
                html: "_address",
                icon: {
                    iconsize: [188, 68],
                    iconanchor: [0, 68]
                }
            }]
        })
    },
    handleGridList: function() {
        $(document).on("click", "#grid", function() {
            $("#mfilter-content-container").removeClass("list").addClass("grid")
        }),
        $(document).on("click", "#list", function() {
            $("#mfilter-content-container").removeClass("grid").addClass("list"),
            $("body").removeClass("flex-view-2 flex-view-3 flex-view-4 flex-view-6").addClass("flex-view-1")
        })
    },
    handleShopView: function() {
        var e, t;
        0 < $("#mfilter-content-container .shop__view").length && ($("#mfilter-content-container .shop__view").unbind("click"),
        $("#mfilter-content-container .shop__view").on("click", function() {
            e = "flex-view-1 flex-view-" + $("#mfilter-content-container .shop__view.active").data("per_row"),
            $(this).hasClass("active") || ("grid" == $(this).data("view") ? (t = "flex-view-" + $(this).data("per_row"),
            $(document.body).removeClass("flex-view-1 flex-view-2 flex-view-3 flex-view-4 flex-view-6").addClass(t),
            $("#mfilter-content-container").removeClass("list").addClass("grid")) : ($("#mfilter-content-container").removeClass("grid").addClass("list"),
            $("body").removeClass("flex-view-2 flex-view-3 flex-view-4 flex-view-6").addClass("flex-view-1")),
            $("#mfilter-content-container .shop__view").removeClass("active"),
            $(this).addClass("active"))
        }))
    },
    handleSmoothScroll: function() {
        $(document).on("click", ".smoothscroll", function(a) {
            a.preventDefault();
            var e = $(this).attr("href");
            $(e).trigger("click"),
            setTimeout(function() {
                $("html,body").animate({
                    scrollTop: $(e).offset().top - 100
                }, 800, "swing")
            }, 300)
        })
    },
    handleDropdown: function() {
        $("[data-toggle='dropdown']").on("click", function() {
            $(this).parent().toggleClass("open")
        })
    }
};
theme.ThePilot = function() {
    var e = {
        sourceWrapper: ".rt-pilot",
        destination: ".rt-destination",
        arrivedClass: "rt-arrived"
    };
    return {
        doPilot: function() {
            var t = $(e.destination + ":not(." + e.arrivedClass + ")");
            if (!t.length)
                return !1;
            for (var a = 0; a < t.length; a++) {
                var r = $(t[a])
                  , o = r.attr("id")
                  , n = $(e.sourceWrapper + "[data-destination-id=" + o + "] template").html();
                r.html(n)
            }
            return !0
        }
    }
}(),
theme.CurrencyPicker = function() {
    function e() {
        if ("false" == s.auto_switch)
            return !1;
        var e = Currency.cookie.read();
        null == e && $.getJSON("//ipinfo.io/json", function(e) {
            var t = JSON.parse(JSON.stringify(e, null, 2));
            "undefined" != typeof t.country && $.getJSON("//restcountries.eu/rest/v1/alpha/" + t.country, function(e) {
                var t = e.currencies
                  , a = t[0];
                $(n.currencyPicker + "[data-code=\"" + a + "\"]").trigger("click")
            })
        })
    }
    function t() {
        if ("false" == s.original_price)
            return !1;
        var e = Currency.currentCurrency
          , t = Currency.cookie.read()
          , a = s.shop_currency;
        t && (e = t),
        $(n.selector).each(function() {
            var t = $(this);
            if (t.removeAttr("data-currency-default"),
            a != e) {
                var r = t.attr("data-currency-" + a);
                "USD" == a && (r += " USD"),
                t.attr("data-currency-default", r)
            }
        })
    }
    function a() {
        return $(n.currencyNotification).length ? Currency.currentCurrency == s.shop_currency ? void $(n.currencyNotification).removeClass("loaded").slideUp() : void $(n.currencyNotification).each(function() {
            var e = $(this)
              , t = e.data("html")
              , a = "<strong>" + Currency.currentCurrency + "</strong>";
            t = t.replace(/{{ current_currency }}/g, a),
            e.html(t),
            e.hasClass("loaded") || e.addClass("loaded").slideDown()
        }) : void 0
    }
    function r() {
        var r = $(n.container);
        s.currency_format = r.find(".currency_format").val(),
        s.shop_currency = r.find(".shop_currency").val(),
        s.default_currency = r.find(".default_currency").val(),
        s.money_with_currency_format = r.find(".money_with_currency_format").val(),
        s.money_format = r.find(".money_format").val(),
        s.auto_switch = r.find(".auto_switch").val(),
        s.original_price = r.find(".original_price").val(),
        Currency.format = s.currency_format;
        var o = s.shop_currency;
        Currency.moneyFormats[o].money_with_currency_format = s.money_with_currency_format,
        Currency.moneyFormats[o].money_format = s.money_format;
        var l = s.default_currency
          , d = Currency.cookie.read();
        $(".money .money").each(function() {
            $(this).parents(".money").removeClass("money")
        }),
        $(n.selector).each(function() {
            var e = $(this);
            if ("undefined" == typeof e.attr("data-currency-" + s.shop_currency)) {
                var t = e.text();
                e.attr("data-currency-" + s.shop_currency, t)
            }
        }),
        null == d ? o === l ? Currency.currentCurrency = l : Currency.convertAll(o, l, n.selector) : $(n.currenciesList).length && 0 === $(n.currenciesList + " .currency[data-code=" + d + "]").length ? (Currency.currentCurrency = o,
        Currency.cookie.write(o)) : d === o ? Currency.currentCurrency = o : Currency.convertAll(o, d, n.selector),
        $(n.currenciesList).on("click", ".currency:not(.active)", function() {
            var e = $(this).data("code");
            Currency.convertAll(Currency.currentCurrency, e, n.selector),
            $(n.currencyPicker).removeClass("active"),
            $(this).addClass("active"),
            $(n.currencyCurrent).text(Currency.currentCurrency).attr("data-code", Currency.currentCurrency),
            t(),
            a()
        });
        var c = window.selectCallback;
        $(n.currencyPicker).removeClass("active"),
        $(n.currenciesList + " .currency[data-code=" + Currency.currentCurrency + "]").addClass("active"),
        $(n.currencyCurrent).text(Currency.currentCurrency).attr("data-code", Currency.currentCurrency),
        t(),
        e(),
        a()
    }
    function o() {
        $(n.currenciesList).off("click", ".currency:not(.active)"),
        $(n.currenciesList).on("click", ".currency:not(.active)", function() {
            var e = $(this).data("code")
              , t = window.location
              , a = t.pathname + t.search + t.hash
              , r = document.createElement("form");
            r.setAttribute("action", "/cart/update"),
            r.setAttribute("method", "POST"),
            r.setAttribute("style", "display:none");
            var o = document.createElement("input");
            o.setAttribute("type", "hidden"),
            o.setAttribute("name", "form_type"),
            o.setAttribute("value", "currency");
            var n = document.createElement("input");
            n.setAttribute("type", "hidden"),
            n.setAttribute("name", "currency"),
            n.setAttribute("value", e);
            var s = document.createElement("input");
            s.setAttribute("type", "hidden"),
            s.setAttribute("name", "return_to"),
            s.setAttribute("value", a),
            r.appendChild(o),
            r.appendChild(n),
            r.appendChild(s),
            $(r).appendTo("body").submit()
        })
    }
    var n = {
        selector: ".money",
        container: ".currency__picker",
        currenciesList: ".currency__picker .currencies__list",
        currencyPicker: ".currency__picker .currency",
        currencyActive: ".currency__picker .currency.active",
        currencyCurrent: ".currency__picker .currency__current",
        currencyNotification: ".currency__notification"
    }
      , s = {
        currency_format: "",
        shop_currency: "",
        default_currency: "",
        money_with_currency_format: "",
        money_format: "",
        auto_switch: "true",
        original_price: "true"
    };
    return {
        init: function() {
            $(n.currenciesList).length && ($(n.currenciesList).hasClass("ml__js") ? r() : o())
        },
        convert: function(e) {
            $(n.currenciesList).length && ($(e).each(function() {
                var e = $(this);
                if ("undefined" == typeof e.attr("data-currency-" + s.shop_currency)) {
                    var t = e.text();
                    e.attr("data-currency-" + s.shop_currency, t)
                }
            }),
            Currency.convertAll(s.shop_currency, $(n.currencyActive).attr("data-code"), e, s.currency_format),
            t())
        },
        convertAll: function() {
            $(n.currenciesList).length && ($(n.selector).each(function() {
                var e = $(this);
                if ("undefined" == typeof e.attr("data-currency-" + s.shop_currency)) {
                    var t = e.text();
                    e.attr("data-currency-" + s.shop_currency, t)
                }
            }),
            Currency.convertAll(s.shop_currency, $(n.currencyActive).attr("data-code"), n.selector),
            t())
        }
    }
}(),
theme.LanguagePicker = function() {
    function e(e) {
        $(t.selector + " .goog-te-combo").val(e);
        var a = document.getElementsByClassName("goog-te-combo")[0];
        event = new Event("change"),
        a.dispatchEvent(event)
    }
    var t = {
        language: ".language__picker .language__switcher",
        languagePicker: ".language__picker .language",
        languageCurrent: ".language__picker .language__current",
        selector: "#weketing_google_translate_element"
    };
    return {
        init: function() {
            if ($(t.language).empty(),
            $(t.languageCurrent).empty(),
            !!$(t.selector).length) {
                var a = new MutationObserver(function(a, r) {
                    var o = document.getElementsByClassName("goog-te-combo")[0];
                    if (o) {
                        for (var n = JSON.parse(JSON.stringify(weketingJS.settingsJS[8])), s = n.default_language, l = n.custom_languages, d = weketingSGT.languages(), c = localStorage.getItem("roarStorage_language"), p = 0; p < l.length - 1; p++)
                            if (l[p] == s) {
                                l.pop();
                                break
                            }
                        for (var p = 0; p < l.length; p++)
                            if (l[p] == c) {
                                s = c;
                                break
                            }
                        for (var p = 0; p < $(t.language).length; p++) {
                            var u = !1
                              , m = $(t.language)[p];
                            $(m).hasClass("lang-code-mode") && (u = !0);
                            var h = $(t.languageCurrent)[p];
                            if ("yes" == n.enable && !$(m).children().length) {
                                for (var g, f = $(m).attr("data-item-class"), v = 0; v < l.length; v++)
                                    g = "<li class=\"language active notranslate " + f + "\" data-code=\"" + s + "\">" + (!0 == u ? s : d[s]) + "</li>",
                                    l[v] != s && (g = "<li class=\"language notranslate " + f + "\" data-code=\"" + l[v] + "\">" + (!0 == u ? l[v] : d[l[v]]) + "</li>"),
                                    $(m).append(g);
                                $(h).text(d[s])
                            }
                        }
                        return e(s),
                        void r.disconnect()
                    }
                }
                );
                a.observe(document, {
                    childList: !0,
                    subtree: !0
                }),
                $("body").on("click", t.languagePicker + ":not(.active)", function() {
                    var a = $(this).data("code");
                    if ("" != a) {
                        var r = $(this).text();
                        $(t.languagePicker).removeClass("active"),
                        $(t.languagePicker + "[data-code=\"" + a + "\"]").addClass("active"),
                        $(t.languageCurrent).text(r),
                        localStorage.setItem("roarStorage_language", a),
                        e(a)
                    }
                })
            }
        }
    }
}(),
window.theme = window.theme || {},
theme.Sections = function() {
    this.constructors = {},
    this.instances = [],
    $(document).on("shopify:section:load", this._onSectionLoad.bind(this)).on("shopify:section:unload", this._onSectionUnload.bind(this)).on("shopify:section:select", this._onSelect.bind(this)).on("shopify:section:deselect", this._onDeselect.bind(this)).on("shopify:block:select", this._onBlockSelect.bind(this)).on("shopify:block:deselect", this._onBlockDeselect.bind(this))
}
,
theme.Sections.prototype = _.assignIn({}, theme.Sections.prototype, {
    _createInstance: function(e, t) {
        var a = $(e)
          , r = a.attr("data-section-id")
          , o = a.attr("data-section-type");
        if (t = t || this.constructors[o],
        !_.isUndefined(t)) {
            var n = _.assignIn(new t(e), {
                id: r,
                type: o,
                container: e
            });
            this.instances.push(n)
        }
    },
    _onSectionLoad: function(e) {
        if ($(".rt-pilot", e.target).length) {
            var t = "#" + $($(".rt-pilot", e.target)[0]).attr("data-container-id")
              , a = $(t);
            a && this._createInstance(a)
        } else {
            var a = $("[data-section-id]", e.target)[0];
            a && this._createInstance(a)
        }
    },
    _onSectionUnload: function(e) {
        this.instances = _.filter(this.instances, function(t) {
            var a = t.id === e.originalEvent.detail.sectionId;
            return a && _.isFunction(t.onUnload) && t.onUnload(e),
            !a
        })
    },
    _onSelect: function(e) {
        theme.ThePilot.doPilot();
        var t = _.find(this.instances, function(t) {
            return t.id === e.originalEvent.detail.sectionId
        });
        !_.isUndefined(t) && _.isFunction(t.onSelect) && t.onSelect(e),
        "undefined" != typeof theme && theme.roarAdminJs.init()
    },
    _onDeselect: function(e) {
        var t = _.find(this.instances, function(t) {
            return t.id === e.originalEvent.detail.sectionId
        });
        !_.isUndefined(t) && _.isFunction(t.onDeselect) && t.onDeselect(e)
    },
    _onBlockSelect: function(e) {
        var t = _.find(this.instances, function(t) {
            return t.id === e.originalEvent.detail.sectionId
        });
        !_.isUndefined(t) && _.isFunction(t.onBlockSelect) && t.onBlockSelect(e)
    },
    _onBlockDeselect: function(e) {
        var t = _.find(this.instances, function(t) {
            return t.id === e.originalEvent.detail.sectionId
        });
        !_.isUndefined(t) && _.isFunction(t.onBlockDeselect) && t.onBlockDeselect(e)
    },
    register: function(e, t) {
        this.constructors[e] = t,
        $("[data-section-type=" + e + "]").each(function(e, a) {
            this._createInstance(a, t)
        }
        .bind(this))
    }
}),
window.slate = window.slate || {},
theme.Images = function() {
    return {
        preload: function(e, t) {
            "string" == typeof e && (e = [e]);
            for (var a, r = 0; r < e.length; r++)
                a = e[r],
                this.loadImage(this.getSizedImageUrl(a, t))
        },
        loadImage: function(e) {
            new Image().src = e
        },
        switchImage: function(e, t, a) {
            var r = this.imageSize(t.src)
              , o = this.getSizedImageUrl(e.src, r);
            a ? a(o, e, t) : t.src = o
        },
        imageSize: function(e) {
            var t = e.match(/.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\.@]/);
            return null === t ? null : t[1]
        },
        getSizedImageUrl: function(e, t) {
            if (null == t)
                return e;
            if ("master" === t)
                return this.removeProtocol(e);
            var a = e.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);
            if (null != a) {
                var r = e.split(a[0])
                  , o = a[0];
                return this.removeProtocol(r[0] + "_" + t + o)
            }
            return null
        },
        removeProtocol: function(e) {
            return e.replace(/http(s)?:/, "")
        }
    }
}(),
theme.Currency = function() {
    return {
        formatMoney: function(e, t) {
            function a(e, t, a, r) {
                if (a = a || ",",
                r = r || ".",
                isNaN(e) || null === e)
                    return 0;
                e = (e / 100).toFixed(t);
                var o = e.split(".")
                  , n = o[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + a)
                  , s = o[1] ? r + o[1] : "";
                return n + s
            }
            "string" == typeof e && (e = e.replace(".", ""));
            var r = ""
              , o = /\{\{\s*(\w+)\s*\}\}/
              , n = t || "${{amount}}";
            switch (n.match(o)[1]) {
            case "amount":
                r = a(e, 2);
                break;
            case "amount_no_decimals":
                r = a(e, 0);
                break;
            case "amount_with_comma_separator":
                r = a(e, 2, ".", ",");
                break;
            case "amount_no_decimals_with_comma_separator":
                r = a(e, 0, ".", ",");
                break;
            case "amount_no_decimals_with_space_separator":
                r = a(e, 0, " ");
                break;
            case "amount_with_apostrophe_separator":
                r = a(e, 2, "'");
            }
            return n.replace(o, r)
        }
    }
}(),
theme.Helpers = function() {
    function e() {
        return r
    }
    function t() {
        n = window.pageYOffset,
        document.body.style.top = "-" + n + "px",
        document.body.classList.add(o.preventScrolling)
    }
    function a() {
        document.body.classList.remove(o.preventScrolling),
        document.body.style.removeProperty("top"),
        window.scrollTo(0, n)
    }
    var r = !1
      , o = {
        preventScrolling: "prevent-scrolling"
    }
      , n = window.pageYOffset;
    return {
        setTouch: function() {
            r = !0
        },
        isTouch: e,
        enableScrollLock: t,
        disableScrollLock: a,
        prepareTransition: function(e) {
            e.addEventListener("transitionend", function(e) {
                e.currentTarget.classList.remove("is-transitioning")
            }, {
                once: !0
            });
            var t = 0;
            ["transition-duration", "-moz-transition-duration", "-webkit-transition-duration", "-o-transition-duration"].forEach(function(a) {
                var r = getComputedStyle(e)[a];
                r && (r.replace(/\D/g, ""),
                t || (t = parseFloat(r)))
            }),
            0 !== t && (e.classList.add("is-transitioning"),
            e.offsetWidth)
        }
    }
}(),
theme.LibraryLoader = function() {
    function e(e, t) {
        var o = document.createElement("script");
        return o.src = e.src + "?" + a.randomString,
        o.addEventListener("load", function() {
            e.status = r.loaded,
            t()
        }),
        o
    }
    function t(e, t) {
        var o = document.createElement("link");
        return o.href = e.src + "?" + a.randomString,
        o.rel = "stylesheet",
        o.type = "text/css",
        o.addEventListener("load", function() {
            e.status = r.loaded,
            t()
        }),
        o
    }
    var a = {
        link: "link",
        script: "script",
        randomString: Math.random().toString(36).substr(2, 5)
    }
      , r = {
        requested: "requested",
        loaded: "loaded"
    }
      , o = "https://cdn.shopify.com/shopifycloud/"
      , n = {
        youtubeSdk: {
            tagId: "youtube-sdk",
            src: "https://www.youtube.com/iframe_api",
            type: a.script
        },
        plyrShopifyStyles: {
            tagId: "plyr-shopify-styles",
            src: o + "shopify-plyr/v1.0/shopify-plyr.css",
            type: a.link
        },
        modelViewerUiStyles: {
            tagId: "shopify-model-viewer-ui-styles",
            src: o + "model-viewer-ui/assets/v1.0/model-viewer-ui.css",
            type: a.link
        },
        bannerStyles: {
            tagId: "banner-css",
            src: "https:" + theme.asset_url.substring(0, theme.asset_url.lastIndexOf("?")) + "rt.cbuilder.scss.css",
            type: a.link
        },
        CssHelper: {
            tagId: "css-helper",
            src: "https:" + theme.asset_url.substring(0, theme.asset_url.lastIndexOf("?")) + "rt.helper.scss.css",
            type: a.link
        }
    };
    return {
        load: function(o, s) {
            var l = n[o];
            if (l && l.status !== r.requested) {
                if (s = s || function() {}
                ,
                l.status === r.loaded)
                    return void s();
                l.status = r.requested;
                var d;
                switch (l.type) {
                case a.script:
                    d = e(l, s);
                    break;
                case a.link:
                    d = t(l, s);
                }
                d.id = l.tagId,
                l.element = d;
                var c = document.getElementsByTagName(l.type)[0];
                c.parentNode.appendChild(d, c)
            }
        }
    }
}(),
slate.Variants = function() {
    function e(e) {
        this.$container = e.$container,
        this.product = e.product,
        this.singleOptionSelector = e.singleOptionSelector,
        this.originalSelectorId = e.originalSelectorId,
        this.enableHistoryState = e.enableHistoryState,
        this.currentVariant = this._getVariantFromOptions(),
        $(this.singleOptionSelector, this.$container).on("change", this._onSelectChange.bind(this))
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _getCurrentOptions: function() {
            var e = _.map($(this.singleOptionSelector, this.$container), function(e) {
                var t = $(e)
                  , a = t.attr("type")
                  , r = {};
                return "radio" === a || "checkbox" === a ? !!t[0].checked && (r.value = t.val(),
                r.index = t.data("index"),
                r) : (r.value = t.val(),
                r.index = t.data("index"),
                r)
            });
            return e = _.compact(e),
            e
        },
        _getVariantFromOptions: function() {
            var e = this._getCurrentOptions()
              , t = this.product.variants
              , a = _.find(t, function(t) {
                return e.every(function(e) {
                    return _.isEqual(t[e.index], e.value)
                })
            });
            return a
        },
        _onSelectChange: function() {
            var e = this._getVariantFromOptions();
            this.$container.trigger({
                type: "variantChange",
                variant: e
            }),
            e && (this._updateMasterSelect(e),
            this._updateImages(e),
            this._updatePrice(e),
            this._updateSKU(e),
            this.currentVariant = e,
            this.enableHistoryState && this._updateHistoryState(e))
        },
        _updateImages: function(e) {
            var t = e.featured_image || {}
              , a = this.currentVariant.featured_image || {};
            e.featured_image && t.src !== a.src && this.$container.trigger({
                type: "variantImageChange",
                variant: e
            })
        },
        _updatePrice: function(e) {
            e.price === this.currentVariant.price && e.compare_at_price === this.currentVariant.compare_at_price || this.$container.trigger({
                type: "variantPriceChange",
                variant: e
            })
        },
        _updateSKU: function(e) {
            e.sku === this.currentVariant.sku || this.$container.trigger({
                type: "variantSKUChange",
                variant: e
            })
        },
        _updateHistoryState: function(e) {
            if (history.replaceState && e) {
                var t = window.location.protocol + "//" + window.location.host + window.location.pathname + "?variant=" + e.id;
                window.history.replaceState({
                    path: t
                }, "", t)
            }
        },
        _updateMasterSelect: function(e) {
            $(this.originalSelectorId, this.$container).val(e.id)
        }
    }),
    e
}(),
window.theme = window.theme || {},
theme.Product = function() {
    function e(e) {
        var t = this.$container = $(e)
          , a = this.sectionId = t.attr("data-section-id")
          , r = t.attr("data-section-type");
        if (this.settings = {
            mediaQueryMediumUp: "screen and (min-width: 750px)",
            mediaQuerySmall: "screen and (max-width: 749px)",
            bpSmall: !1,
            enableHistoryState: t.data("enable-history-state") || !1,
            imageSize: null,
            namespace: ".product-page-section",
            sectionId: a,
            sliderActive: !1,
            variant_image_grouped: t.attr("data-variant_image_grouped"),
            product_design: t.attr("data-product_design"),
            product_image_count: t.data("product_image_count")
        },
        this.selectors = {
            product: "#ProductSection-" + a,
            addToCart: "#AddToCart-" + a,
            addToCartText: "#AddToCartText-" + a,
            stockText: ".stock-" + a,
            SKU: ".variant-sku",
            originalSelectorId: "#ProductSelect-" + a,
            productFeaturedImage: ".FeaturedImage-" + a,
            productImageWrap: "#FeaturedImageZoom-" + a,
            productMainImages: "#product-images-" + a,
            productPreviewMainImages: ".product-preview-images-" + a,
            singleOptionSelector: ".single-option-selector-" + a,
            singleOptionSelectorId: "#single-option-selector-" + a,
            singleOptionSwatches: "wrapper-swatches-" + a,
            variationsSelector: "#variations-" + a,
            variationSelector: ".variation-select-" + a,
            qtyVariant: ".qty-variant-" + a,
            threedId: ".threed-id-" + a,
            countDownId: ".countdown-" + a,
            couponCode: "#coupon-code-" + a,
            couponBtn: "#coupon-btn-" + a,
            sidebarSlide: ".sidebar-slick-vertical-" + a,
            optionsSelect: "#single-option-selector-" + a,
            stickCart: "#sticky-info-" + a,
            cartAgree: "#product-cart__agree-" + a,
            cartCheckout: "#product-buy__1click-" + a,
            groupedProduct: "#products-grouped-" + a,
            moreProducts: "#product-more-products-" + a,
            groupedButton: "#grouped-add-button-" + a,
            groupedCheckbox: "#products-grouped-" + a + " .grouped-checkbox",
            imageZoomWrapper: "[data-image-zoom-wrapper]",
            productThumbImages: ".product-single__thumbnail--" + a,
            productThumbImagesWrapper: ".product-single__thumbnails-" + a,
            productThumbListItem: ".product-single__thumbnails-item",
            priceContainer: "[data-price]",
            regularPrice: "[data-regular-price]",
            salePrice: "[data-sale-price]",
            saleLabel: "[data-sale-label]",
            unitPrice: "[data-unit-price]",
            unitPriceBaseUnit: "[data-unit-price-base-unit]",
            productPolicies: "[data-product-policies]",
            productMediaWrapper: "[data-product-single-media-wrapper]",
            productMediaTypeVideo: ":not(.slick-cloned)[data-product-media-type-video]",
            productMediaTypeModel: "[data-product-media-type-model]",
            stockCountdown: "#product-single__stock-" + a,
            visitorCounter: "#product-single__visitor-" + a,
            totalSold: "#product-single__sold-" + a
        },
        this.classes = {
            hidden: "hide",
            visibilityHidden: "visibility-hidden",
            productOnSale: "price--on-sale",
            productUnitAvailable: "price--unit-available",
            productUnavailable: "price--unavailable",
            productSoldOut: "price--sold-out",
            activeClass: "active-thumb",
            jsZoomEnabled: "js-zoom-enabled"
        },
        this.$productPolicies = $(this.selectors.productPolicies, t),
        !$("#ProductJson-" + a).html())
            return;
        this.productSingleObject = JSON.parse(document.getElementById("ProductJson-" + a).innerHTML),
        this.settings.zoomEnabled = $(this.selectors.imageZoomWrapper).hasClass(this.classes.jsZoomEnabled),
        this._initBreakpoints(),
        this._stringOverrides();
        let o = this
          , n = loadScriptAsync(theme.libs.slick);
        n.then(function() {
            o._initVariants(),
            o._initSwatches(),
            o._initFeature(),
            o._initCompact(),
            o._initStickyImages(),
            o._initThumbnailsGallery(),
            o._initImages(),
            o._initSidebar(),
            o._initGallery(),
            o._initQuantity(),
            o._initHandleProduct(),
            o._checkoutCart(),
            o._initStockCountdown(),
            o._visitorCounter(),
            o._totalSold(),
            "product-template" == a && o._initRelatedProducts(),
            "product-template" == a && o._initViewedProducts(),
            "product-template" == a && o._initStickyInfo(),
            "product-template" == a && o._initGroupedProduct(),
            "product-template" == a && o._initMoreProducts(),
            o._initMediaSwitch(),
            o._initProductVideo(),
            o._initModelViewerLibraries(),
            o._initShopifyXrLaunch()
        })
    }
    function t(e) {
        var t = $(e).data("zoom");
        $(e).zoom({
            url: t
        })
    }
    function a(e) {
        $(e).trigger("zoom.destroy")
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _stringOverrides: function() {
            theme.productStrings = theme.productStrings || {},
            $.extend(theme.strings, theme.productStrings)
        },
        _totalSold: function() {
            if ($(this.selectors.totalSold).length) {
                var e = $(this.selectors.totalSold)
                  , t = e.data("qty_min")
                  , a = e.data("qty_max")
                  , r = e.data("time_min")
                  , o = e.data("time_max");
                t = Math.ceil(t),
                a = Math.floor(a),
                r = Math.ceil(r),
                o = Math.floor(o);
                var n = Math.floor(Math.random() * (a - t + 1)) + t;
                n = parseInt(n),
                n <= t && (n = t),
                n > a && (n = a),
                e.html(e.html().replace("/count/", n));
                var s = Math.floor(Math.random() * (o - r + 1)) + r;
                s = parseInt(s),
                s <= r && (s = r),
                s > o && (s = o),
                e.html(e.html().replace("/time/", s)),
                e.addClass("active"),
                e.find("img").first().length && setInterval(function() {
                    e.find("img").first().fadeIn(function() {
                        $(this).css("visibility", "visible")
                    }).delay(1600).fadeIn(function() {
                        $(this).css("visibility", "hidden")
                    }).delay(400)
                }, 2e3)
            }
        },
        _visitorCounter: function() {
            if ($(this.selectors.visitorCounter).length) {
                var s = $(this.selectors.visitorCounter)
                  , d = 1
                  , c = s.data("max")
                  , p = s.data("interval")
                  , u = d
                  , m = c;
                u = Math.ceil(u),
                m = Math.floor(m);
                var g = Math.floor(Math.random() * (m - u + 1)) + u
                  , f = ["1", "2", "4", "3", "6", "10", "-1", "-3", "-2", "-4", "-6"]
                  , n = ""
                  , v = ""
                  , y = ["10", "20", "15"]
                  , n = ""
                  , v = ""
                  , l = "";
                setInterval(function() {
                    if (n = Math.floor(Math.random() * f.length),
                    v = f[n],
                    g = parseInt(g) + parseInt(v),
                    d >= g) {
                        l = Math.floor(Math.random() * y.length);
                        var e = y[l];
                        g += e
                    }
                    (1 > g || g > c) && (g = Math.floor(Math.random() * (m - u + 1)) + u),
                    s.find("strong").first().text(parseInt(g)),
                    s.addClass("active")
                }, 1e3 * p)
            }
        },
        _initStockCountdown: function() {
            if ($(this.selectors.stockCountdown).length) {
                var e = this
                  , t = $(e.selectors.stockCountdown);
                if (t.hasClass("is-fake")) {
                    function e(e, t) {
                        return Math.floor(Math.random() * (t - e + 1) + e)
                    }
                    function l() {
                        t.find(".stock-countdown-message").first().html(theme.strings.onlyLeft.replace("{{ count }}", o)),
                        n = setTimeout(function() {
                            o--,
                            1 > o && (o = e(a, r)),
                            t.find(".stock-countdown-message strong").text(o),
                            d(),
                            o < a && clearTimeout(n)
                        }, 3000),
                        s = setInterval(function() {
                            o--,
                            1 > o && (o = e(a, r)),
                            t.find(".stock-countdown-message strong").text(o),
                            d(),
                            o < a && clearInterval(s)
                        }, 102000)
                    }
                    function d() {
                        var e = 100 * o / 60;
                        t.find(".progress-bar span").css("width", e + "%")
                    }
                    var a = t.data("min")
                      , r = t.data("max")
                      , o = e(a, r)
                      , n = null
                      , s = null;
                    l(),
                    t.hasClass("is-visible") && t.removeClass("hide")
                }
            }
        },
        _updateStockCountdown: function(e) {
            var t = $(this.selectors.stockCountdown);
            t.hasClass("is-fake") ? t.removeClass("hide") : (t.find(".stock-countdown-message").first().html(theme.strings.onlyLeft.replace("{{ count }}", e)),
            t.find(".progress-bar span").first().css("width", "100%"),
            t.removeClass("hide"),
            setTimeout(function() {
                t.find(".progress-bar span").first().css("width", "28%")
            }, 500))
        },
        _initBreakpoints: function() {
            var e = this;
            enquire.register(this.settings.mediaQuerySmall, {
                match: function() {
                    e.settings.zoomEnabled && $(e.selectors.imageZoomWrapper).each(function() {
                        a(this)
                    }),
                    e.settings.bpSmall = !0
                },
                unmatch: function() {
                    e.settings.bpSmall = !1
                }
            }),
            enquire.register(this.settings.mediaQueryMediumUp, {
                match: function() {
                    e.settings.zoomEnabled && $(e.selectors.imageZoomWrapper).each(function() {
                        t(this)
                    })
                }
            })
        },
        _initMediaSwitch: function() {
            var e = this;
            0 < $(e.selectors.productMainImages).length && $(e.selectors.productMainImages).on("afterChange", function(t, a, r) {
                var o = $(e.selectors.productMediaWrapper + ":not(.slick-cloned)[data-slick-index='" + r + "']", e.$container)
                  , n = $(e.selectors.productMediaWrapper + ":not([data-slick-index='" + r + "'])", e.$container);
                o.removeClass(e.classes.hidden).trigger("mediaVisible"),
                n.addClass(e.classes.hidden).trigger("mediaHidden")
            }),
            $(this.selectors.productThumbImages).length && $(this.selectors.productThumbImages).on("click", function(t) {
                t.preventDefault();
                var a = $(this)
                  , r = a.data("thumbnail-id");
                e._switchMedia(r),
                e._setActiveThumbnail(r)
            }).on("keyup", e._handleMediaFocus.bind(e))
        },
        _switchMedia: function(e) {
            var t = $(this.selectors.productMediaWrapper + ":not(." + this.classes.hidden + ")", this.$container)
              , a = $(this.selectors.productMediaWrapper + "[data-media-id='" + e + "']", this.$container)
              , r = $(this.selectors.productMediaWrapper + ":not([data-media-id='" + e + "'])", this.$container);
            if ("carousel" == this.settings.product_design && "product-quickview-template" != this.sectionId)
                var a = $(this.selectors.productMediaWrapper + ":not(.slick-cloned)[data-media-id='" + e + "']", this.$container);
            t.trigger("mediaHidden"),
            a.removeClass(this.classes.hidden).trigger("mediaVisible"),
            r.addClass(this.classes.hidden)
        },
        _setActiveThumbnail: function(e) {
            if ("scroll" == this.settings.product_design) {
                var t = $(this.selectors.productMediaWrapper + "[data-media-id='" + e + "']", this.$container)
                  , a = parseInt(t.offset().top) - 50;
                $("html,body").animate({
                    scrollTop: a
                }, "slow");
                var r = $(this.selectors.productMediaWrapper + ":not([data-media-id='" + e + "'])", this.$container);
                return t.trigger("mediaVisible"),
                void r.trigger("mediaHidden")
            }
            if ("carousel" == this.settings.product_design && "product-quickview-template" != this.sectionId) {
                var o = $(this.selectors.productMainImages)
                  , n = $(this.selectors.productMediaWrapper + ":not(.slick-cloned)[data-media-id='" + e + "']", this.$container)
                  , s = n.attr("data-slick-index");
                o.slick("slickGoTo", s)
            }
            "undefined" == typeof e && (e = $(this.selectors.productMediaWrapper + ":not(.hide)", this.$container).data("media-id"));
            var l = $(this.selectors.productThumbListItem + ":not(.slick-cloned)", this.$container)
              , d = l.find(this.selectors.productThumbImages + "[data-thumbnail-id='" + e + "']");
            if ($(this.selectors.productThumbImages).removeClass(this.classes.activeClass).removeAttr("aria-current"),
            d.addClass(this.classes.activeClass),
            d.attr("aria-current", !0),
            !!l.hasClass("slick-slide")) {
                var c = d.parent().data("slick-index");
                $(this.selectors.productThumbImagesWrapper).slick("slickGoTo", c, !0)
            }
        },
        _initProductVideo: function() {
            var e = this.settings.sectionId;
            $(this.selectors.productMediaTypeVideo, this.$container).each(function() {
                var t = $(this);
                theme.ProductVideo.init(t, e)
            })
        },
        _initModelViewerLibraries: function() {
            var e = $(this.selectors.productMediaTypeModel, this.$container);
            1 > e.length || theme.ProductModel.init(e, this.settings.sectionId)
        },
        _initShopifyXrLaunch: function() {
            var e = this;
            $(document).on("shopify_xr_launch", function() {
                var t = $(e.selectors.productMediaWrapper + ":not(." + e.classes.hidden + ")", e.$container);
                t.trigger("xrLaunch")
            })
        },
        _updateMedia: function(e) {
            var t = e.variant
              , a = t.featured_media.id
              , r = this.settings.sectionId + "-" + a;
            this._switchMedia(r),
            this._setActiveThumbnail(r)
        },
        _handleMediaFocus: function(e) {
            if (e.keyCode === slate.utils.keyboardKeys.ENTER) {
                var t = $(e.currentTarget).data("thumbnail-id");
                $(this.selectors.productMediaWrapper + "[data-media-id='" + t + "']", this.$container).focus()
            }
        },
        _initMoreProducts: function() {
            var e = this.selectors.moreProducts
              , t = $(e).find("a.mproduct-item");
            0 < t.length && t.on("click", function(a) {
                a.preventDefault(),
                t.removeClass("active"),
                $(this).addClass("active");
                var r = $(this).data("url");
                return $.ajax({
                    url: r,
                    dataType: "html",
                    type: "GET",
                    beforeSend: function() {
                        $(e).find(".mproducts-list-detail").addClass("loading")
                    },
                    success: function(t) {
                        $(e).find(".mproducts-list-detail").html(t)
                    },
                    error: function() {
                        console.log("ajax error")
                    },
                    complete: function() {
                        roar.handleQuickshop(e),
                        $(e).find(".mproducts-list-detail").removeClass("loading")
                    }
                })
            })
        },
        _initGroupedProduct: function() {
            var e = $(this.selectors.groupedProduct);
            0 == e.length || ($(document).on("change", this.selectors.groupedCheckbox, function() {
                $(this).is(":checked") ? $($(this).data("id")).removeClass("hide") : $($(this).data("id")).addClass("hide"),
                roar.updateGroupedPrice()
            }),
            0 < $(this.selectors.groupedButton).length && $(this.selectors.groupedButton).unbind("click"),
            $(document).on("click", this.selectors.groupedButton, function() {
                var t = $(this);
                return Shopify.queue = [],
                e.find(".grouped-checkbox").each(function() {
                    if ($(this).is(":checked")) {
                        var e = $($(this).data("id")).find("form .variation-select").val();
                        null !== e && Shopify.queue.push({
                            variantId: e,
                            quantity: 1
                        })
                    }
                }),
                Shopify.moveAlong = function() {
                    if (Shopify.queue.length)
                        var e = Shopify.queue.shift()
                          , a = $.ajax({
                            type: "POST",
                            url: "/cart/add.js",
                            async: !0,
                            cache: !1,
                            data: {
                                quantity: e.quantity,
                                id: e.variantId
                            },
                            dataType: "json",
                            beforeSend: function() {
                                t.addClass("loading")
                            },
                            complete: function() {
                                roar.updateCart(t, !1)
                            },
                            error: function(e) {
                                var t = $.parseJSON(e.responseText)
                                  , a = t.message + ": " + t.description;
                                alert(a)
                            },
                            success: function() {
                                Shopify.moveAlong()
                            }
                        });
                    else
                        window.location.href = "/cart"
                }
                ,
                Shopify.moveAlong(),
                !1
            }))
        },
        _initStickyInfo: function() {
            if ($(this.selectors.stickCart).length) {
                var e = this;
                $(window).scroll(function() {
                    var t = $(this).scrollTop();
                    if ($(e.selectors.addToCart).length) {
                        var a = $(e.selectors.addToCart);
                        if ($(a).length) {
                            var r = $(a).offset();
                            t >= r.top ? !$("body").hasClass("show-sticky-info-product") && $("body").addClass("show-sticky-info-product") : $("body").removeClass("show-sticky-info-product")
                        }
                    }
                }),
                $("body").on("click", ".sticky-button.button-cart", function() {
                    0 < $(e.selectors.addToCart).length && $(e.selectors.addToCart).trigger("click")
                })
            }
        },
        _checkoutCart: function() {
            var e = this
              , t = $(e.selectors.cartAgree);
            0 == t.length || ($(document).on("DOMNodeInserted", e.selectors.cartCheckout, function() {
                var e = $(this);
                setTimeout(function() {
                    var a = e.find(".shopify-payment-button__button");
                    a.length && (e.hide(),
                    setTimeout(function() {
                        t.is(":checked") ? a.removeClass("btn-disabled") : a.addClass("btn-disabled"),
                        e.fadeIn()
                    }, 300))
                }, 0)
            }),
            $(document).on("change", e.selectors.cartAgree, function() {
                var t = $(this)
                  , a = $(e.selectors.cartCheckout).find(".shopify-payment-button__button");
                t.is(":checked") ? a.removeClass("btn-disabled") : a.addClass("btn-disabled")
            }))
        },
        _initHandleProduct: function() {
            0 == $("#main").next("#popup-product-sizechart").length && $("#main").after($("#popup-product-sizechart")),
            0 == $("#main").next("#popup-product-delivery").length && $("#main").after($("#popup-product-delivery")),
            0 == $("#main").next("#popup-product-question").length && $("#main").after($("#popup-product-question")),
            $(".button-product-delivery").on("click", function() {
                var e = $(this).data("question")
                  , t = $(this).data("_qid");
                return $.magnificPopup.open({
                    items: {
                        src: "#popup-product-delivery",
                        type: "inline"
                    },
                    tLoading: "",
                    mainClass: "popup-module mfp-with-zoom",
                    removalDelay: 200
                }),
                !1,
                void ((0 < $(".quickview .mfp-content").find("#popup-product-question").length || 0 < $(".quickview .mfp-content").find("#popup-product-delivery").length || 0 < $(".quickview .mfp-content").find("#popup-product-sizechart").length) && ($(".quickview.mfp-wrap").addClass("_reopen"),
                $(".quickview.mfp-wrap").data("_qid", t)))
            }),
            $(".button-product-question").on("click", function() {
                var e = $(this).data("question")
                  , t = $(this).data("_qid");
                return $.magnificPopup.open({
                    items: {
                        src: "#popup-product-question",
                        type: "inline"
                    },
                    tLoading: "",
                    mainClass: "popup-module mfp-with-zoom",
                    removalDelay: 200
                }),
                !1,
                void ((0 < $(".quickview .mfp-content").find("#popup-product-question").length || 0 < $(".quickview .mfp-content").find("#popup-product-sizechart").length) && ($(".quickview.mfp-wrap").addClass("_reopen"),
                $(".quickview.mfp-wrap").data("_qid", t)))
            }),
            $(".button-product-sizechart").on("click", function() {
                var e = $(this).data("sizechart")
                  , t = $(this).data("_qid");
                return $.magnificPopup.open({
                    items: {
                        src: e,
                        type: "inline"
                    },
                    tLoading: "",
                    mainClass: "popup-module mfp-with-zoom",
                    removalDelay: 200
                }),
                !1,
                void ((0 < $(".quickview .mfp-content").find("#popup-product-sizechart").length || 0 < $(".quickview .mfp-content").find("#popup-product-question").length) && ($(".quickview.mfp-wrap").addClass("_reopen"),
                $(".quickview.mfp-wrap").data("_qid", t)))
            }),
            $(document).on("click", "#tabProduct a", function(t) {
                t.preventDefault(),
                $(this).tab("show")
            })
        },
        _initRelatedProducts: function() {
            if (0 == $("#productsRelated ").length)
                return;
            if ($("#productsRelated .splide").length) {
                let e = new Splide("#productsRelated .splide",{
                    updateOnMove: !0
                });
                e.on("mounted moved", debounce(function() {
                    $(e.root).find(".splide__slide").removeClass("is-last-visible"),
                    $(e.root).find(".splide__slide[tabindex=0]").last().addClass("is-last-visible")
                }, 2e3)),
                e.mount()
            }
            roar.handleQuickshop("#productsRelated .splide")
        },
        _initViewedProducts: function() {
            var e = RoarCookie.cookie.rtread("rt-recent")
              , t = $(".templateProduct #recently-viewed-products").data("handle")
              , a = $(".templateProduct #recently-viewed-products").data("id")
              , r = $(".templateProduct #recently-viewed-products").data("limit");
            if (null != e) {
                e = e.split(",");
                var e = e.reverse();
                if (1 < e.length ? $("#recently-viewed-products").show() : e != t && $("#recently-viewed-products").show(),
                $.ajax({
                    url: "/search?view=viewed&q=" + e + "_sp_" + a,
                    dataType: "html",
                    type: "GET",
                    success: function(e) {
                        $("#recently-viewed-products").html(e)
                    },
                    error: function() {
                        console.log("ajax error")
                    },
                    complete: function() {
                        if (0 == $("#productsViewed ").length)
                            return;
                        if ($("#productsViewed .splide").length) {
                            let e = new Splide("#productsViewed .splide",{
                                updateOnMove: !0
                            });
                            e.on("mounted moved", debounce(function() {
                                $(e.root).find(".splide__slide").removeClass("is-last-visible"),
                                $(e.root).find(".splide__slide[tabindex=0]").last().addClass("is-last-visible")
                            }, 2e3)),
                            e.mount()
                        }
                        roar.handleQuickshop("#productsViewed .splide")
                    }
                }),
                0 > e.indexOf(t)) {
                    e.length >= r && e.pop(),
                    e.push(t);
                    try {
                        e = e.join(",")
                    } catch (e) {}
                }
            } else
                e = t;
            RoarCookie.cookie.rtwrite("rt-recent", e)
        },
        _initImages: function() {
            var e = this
              , t = $(e.selectors.productMainImages)
              , a = !1;
            if (1 == parseInt(window.rtl) && (a = !0),
            "left" == this.settings.product_design || "upsell" == this.settings.product_design || "bottom" == this.settings.product_design || "compact2" == this.settings.product_design || "split" == this.settings.product_design || "sidebar" == this.settings.product_design || "simple" == this.settings.product_design || "full-screen" == this.settings.product_design) {
                if (0 < $(e.selectors.productThumbImages).length) {
                    var r = $(e.selectors.productThumbImagesWrapper)
                      , o = "0" != r.data("vertical")
                      , n = 4
                      , s = !1
                      , l = r.find(".product-single__thumbnails-item").length;
                    4 < l ? (n = 4,
                    s = !0) : n = l - 1,
                    $(".product-page-section").hasClass("product-has-sidebar") && (3 < l ? (n = 3,
                    s = !0) : n = l - 1),
                    !0 == s ? (0 < t.length && t.not(".slick-initialized").slick({
                        rtl: a,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: !1,
                        adaptiveHeight: !0,
                        asNavFor: r,
                        prevArrow: "<span class=\"fa fa-angle-left slick-prev-arrow\"></span>",
                        nextArrow: "<span class=\"fa fa-angle-right slick-next-arrow\"></span>"
                    }),
                    r.not(".slick-initialized").slick({
                        slidesToShow: n,
                        slidesToScroll: 1,
                        focusOnSelect: !0,
                        vertical: o,
                        infinite: !1,
                        prevArrow: "<span class=\"fa fa-angle-up slick-prev-arrow\"></span>",
                        nextArrow: "<span class=\"fa fa-angle-down slick-next-arrow\"></span>",
                        responsive: [{
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 3
                            }
                        }, {
                            breakpoint: 992,
                            settings: {
                                slidesToShow: 3
                            }
                        }, {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 3
                            }
                        }]
                    })) : t.not(".slick-initialized").slick({
                        rtl: a,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: !1,
                        adaptiveHeight: !0,
                        prevArrow: "<span class=\"fa fa-angle-left slick-prev-arrow\"></span>",
                        nextArrow: "<span class=\"fa fa-angle-right slick-next-arrow\"></span>"
                    })
                }
            } else if ("carousel" == this.settings.product_design) {
                var d = t.width() / 4;
                t.not(".slick-initialized").slick({
                    rtl: a,
                    centerMode: !0,
                    centerPadding: d + "px",
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    adaptiveHeight: !0,
                    prevArrow: "<span class=\"fa fa-angle-left slick-prev-arrow\"></span>",
                    nextArrow: "<span class=\"fa fa-angle-right slick-next-arrow\"></span>",
                    responsive: [{
                        breakpoint: 1680,
                        settings: {
                            centerMode: !0,
                            centerPadding: "400px",
                            slidesToShow: 1
                        }
                    }, {
                        breakpoint: 1440,
                        settings: {
                            centerMode: !0,
                            centerPadding: "350px",
                            slidesToShow: 1
                        }
                    }, {
                        breakpoint: 1200,
                        settings: {
                            centerMode: !0,
                            centerPadding: "300px",
                            slidesToShow: 1
                        }
                    }, {
                        breakpoint: 1024,
                        settings: {
                            arrows: !1,
                            centerMode: !0,
                            centerPadding: "250px",
                            slidesToShow: 1
                        }
                    }, {
                        breakpoint: 992,
                        settings: {
                            centerMode: !0,
                            centerPadding: "200px",
                            slidesToShow: 1
                        }
                    }, {
                        breakpoint: 768,
                        settings: {
                            arrows: !1,
                            centerMode: !0,
                            centerPadding: "125px",
                            slidesToShow: 1
                        }
                    }, {
                        breakpoint: 480,
                        settings: {
                            arrows: !1,
                            centerMode: !0,
                            centerPadding: "50px",
                            slidesToShow: 1
                        }
                    }]
                })
            } else
                t.not(".slick-initialized").slick({
                    rtl: a,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: !1,
                    adaptiveHeight: !0,
                    asNavFor: r,
                    prevArrow: "<span class=\"fa fa-angle-left slick-prev-arrow\"></span>",
                    nextArrow: "<span class=\"fa fa-angle-right slick-next-arrow\"></span>"
                })
        },
        _initThumbnailsGallery: function() {
            var e = $(this.selectors.productMainImages);
            "gallery" == this.settings.product_design && $(".thumbnail-gallery-item").on("click", function() {
                var t = $(this);
                t.hasClass("active") || ($(".thumbnail-gallery-item").removeClass("active"),
                t.addClass("active"),
                $(".thumbnail-gallery-item").each(function(a) {
                    if ($(this).attr("id") == t.attr("id"))
                        return void e.slick("slickGoTo", a, !0)
                }))
            })
        },
        _initQuantity: function() {
            $(".q_up").unbind("click"),
            $(".q_up").on("click", function() {
                var e = $(this).data("product_id")
                  , t = parseInt($(".quantity-cart-" + e).val()) + 1;
                $(".quantity-cart-" + e).val(t)
            }),
            $(".q_down").unbind("click"),
            $(".q_down").on("click", function() {
                var e = $(this).data("product_id")
                  , t = parseInt($(".quantity-cart-" + e).val());
                1 < t && $(".quantity-cart-" + e).val(t - 1)
            })
        },
        _initPopup: function() {
            $(".sizechart-btn").magnificPopup({
                type: "image",
                midClick: !0
            }),
            $(".return-btn").on("click", function() {
                return $.magnificPopup.open({
                    items: {
                        src: "#delivery-return",
                        type: "inline"
                    },
                    tLoading: "",
                    mainClass: "popup-wrapper mfp-with-zoom",
                    removalDelay: 200
                }),
                !1
            })
        },
        _initFeature: function() {
            0 < $(this.selectors.product + " .product-video-button a").length && $(this.selectors.product + " .product-video-button a").unbind("click") && $(this.selectors.product + " .product-video-button a").on("click", function(t) {
                t.stopPropagation();
                var e = $(this).data("video")
                  , a = $(this).data("_qid");
                $.magnificPopup.open({
                    items: {
                        src: e,
                        type: "iframe"
                    },
                    type: "iframe",
                    mainClass: "mfp-fade",
                    removalDelay: 160,
                    preloader: !1,
                    disableOn: !1,
                    fixedContentPos: !1,
                    callbacks: {
                        beforeClose: function() {
                            console.log("Popup close has been initiated")
                        }
                    }
                })
            })
        },
        _initCompact: function() {
            0 < $(".product-accordions").length && $(".product-accordions .tab-heading").unbind("click") && $(".product-accordions .tab-heading").on("click", function(t) {
                t.preventDefault();
                var e = $(this)
                  , a = e.closest(".product-accordion")
                  , r = e.closest(".product-accordions");
                a.hasClass("active") ? (a.removeClass("active"),
                a.find(".product-accordion-content").stop(!0, !0).slideUp()) : (r.find(".product-accordion").removeClass("active"),
                a.addClass("active"),
                r.find(".product-accordion-content").stop(!0, !0).slideUp(),
                a.find(".product-accordion-content").stop(!0, !0).slideDown())
            })
        },
        _initStickyImages: function() {
            $("body").hasClass("fastor-product-design-sticky") && $(".product-design-sticky .product-summary").stick_in_parent()
        },
        _initGallery: function() {
            (function(e) {
                function t(e, t) {
                    return -1 < (" " + e.className + " ").indexOf(" " + t + " ")
                }
                for (var a = function(e) {
                    for (var t, a, r, o, n = $(e).find(".photoswipe-item").get(), s = n.length, l = [], d = 0; d < s; d++)
                        if (t = n[d],
                        1 === t.nodeType)
                            if (a = t.children[0],
                            r = a.getAttribute("data-size").split("x"),
                            "video" == $(a).data("type")) {
                                var c = $($(a).data("id")).html();
                                l.push({
                                    html: c
                                })
                            } else
                                o = {
                                    src: a.getAttribute("href"),
                                    w: parseInt(r[0], 10),
                                    h: parseInt(r[1], 10)
                                },
                                1 < t.children.length && (o.title = $(t).find(".caption").html()),
                                0 < a.children.length && (o.msrc = a.children[0].getAttribute("src")),
                                o.el = t,
                                l.push(o);
                    return l
                }, r = function e(t, a) {
                    return t && (a(t) ? t : e(t.parentNode, a))
                }, o = function(a) {
                    a = a || window.event,
                    a.preventDefault ? a.preventDefault() : a.returnValue = !1;
                    var o = a.target || a.srcElement
                      , n = r(o, function(e) {
                        return t(e, "photoswipe-item")
                    });
                    if (n) {
                        for (var l, d = n.closest(".photoswipe-wrapper"), c = $(n.closest(".photoswipe-wrapper")).find(".photoswipe-item").get(), p = c.length, u = 0, m = 0; m < p; m++)
                            if (1 === c[m].nodeType) {
                                if (c[m] === n) {
                                    l = u;
                                    break
                                }
                                u++
                            }
                        return 0 <= l && s(l, d),
                        !1
                    }
                }, n = function() {
                    var e = window.location.hash.substring(1)
                      , t = {};
                    if (5 > e.length)
                        return t;
                    for (var a = e.split("&"), r = 0; r < a.length; r++)
                        if (a[r]) {
                            var o = a[r].split("=");
                            2 > o.length || (t[o[0]] = o[1])
                        }
                    return t.gid && (t.gid = parseInt(t.gid, 10)),
                    t
                }, s = function(e, t, r, o) {
                    var n, s, l, d = document.querySelectorAll(".pswp")[0];
                    if (l = a(t),
                    s = {
                        closeOnScroll: !1,
                        galleryUID: t.getAttribute("data-pswp-uid")
                    },
                    !o)
                        s.index = parseInt(e, 10);
                    else if (s.galleryPIDs) {
                        for (var c = 0; c < l.length; c++)
                            if (l[c].pid == e) {
                                s.index = c;
                                break
                            }
                    } else
                        s.index = parseInt(e, 10) - 1;
                    if (!isNaN(s.index)) {
                        r && (s.showAnimationDuration = 0);
                        let e = loadScriptAsync(theme.libs.photoswipe);
                        e.then(function() {
                            n = new PhotoSwipe(d,PhotoSwipeUI_Default,l,s),
                            n.init(),
                            n.listen("beforeChange", function() {
                                var e = $(n.currItem.container);
                                $(".pswp__video").removeClass("active");
                                e.find(".pswp__video").addClass("active");
                                $(".pswp__video").each(function() {
                                    $(this).hasClass("active") || $(this).attr("src", $(this).attr("src"))
                                })
                            }),
                            n.listen("close", function() {
                                $(".pswp__video").each(function() {
                                    $(this).attr("src", $(this).attr("src"))
                                }),
                                $(".pswp__container .video-wrapper").empty()
                            })
                        })
                    }
                }, d = document.querySelectorAll(e), c = 0, p = d.length; c < p; c++)
                    d[c].setAttribute("data-pswp-uid", c + 1),
                    d[c].onclick = o;
                var l = n();
                l.pid && l.gid && s(l.pid, d[l.gid - 1], !0, !0)
            }
            )(this.selectors.product + " .photoswipe-wrapper")
        },
        _initZoom: function() {
            if ($(".easyzoom").length)
                if (1024 < $(window).width())
                    var e = $(".easyzoom:not(.feature-video)").easyZoom({
                        loadingNotice: "",
                        errorNotice: "",
                        preventClicks: !1
                    })
                      , t = e.data("easyZoom");
                else
                    $(".easyzoom a").on("click", function(e) {
                        e.preventDefault()
                    })
        },
        _initSidebar: function() {
            var e = this;
            $sidebarSlide = $(e.selectors.sidebarSlide),
            0 < $sidebarSlide.length && $sidebarSlide.each(function() {
                var e = $(this)
                  , t = $(this).data("per_view");
                $(this).not(".slick-initialized").slick({
                    slidesToShow: t,
                    slidesToScroll: 1,
                    vertical: !0,
                    focusOnSelect: !0,
                    infinite: !1,
                    prevArrow: "<span class=\"fa fa-angle-up slick-prev-arrow\"></span>",
                    nextArrow: "<span class=\"fa fa-angle-down slick-next-arrow\"></span>"
                }),
                e.imagesLoaded(function() {
                    e.addClass("loaded")
                })
            })
        },
        _initForceHeight: function() {
            0 < $(this.selectors.productPreviewMainImages).length && $(this.selectors.productPreviewMainImages).not(".slick-initialized").slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: !1,
                prevArrow: "<span class=\"fa fa-angle-left slick-prev-arrow\"></span>",
                nextArrow: "<span class=\"fa fa-angle-right slick-next-arrow\"></span>"
            })
        },
        _initSwatches: function() {
            function t(t, e, r, o, n) {
                if (1 < t.options.length)
                    for (var s = 0; s < t.options.length; s++)
                        s != e && $(a + "-" + s + " option").each(function() {
                            var a = "unavailable"
                              , o = $(this).attr("value");
                            for (j = 0; j < t.variants.length; j++) {
                                var n = t.variants[j];
                                if (n.options[e] != r)
                                    continue;
                                else if (n.options[s] == o) {
                                    a = !0 == n.available ? "available" : "sold_out";
                                    break
                                }
                            }
                            $(this).closest(".selector-wrapper").find(".swatch-element." + $(this).data("swatch")).removeClass("available").removeClass("sold_out").removeClass("unavailable").addClass(a)
                        });
                else
                    for (var s = 0; s < t.options.length; s++)
                        $(a + "-" + s + " option").each(function() {
                            var e = "unavailable"
                              , a = $(this).attr("value");
                            for (j = 0; j < t.variants.length; j++)
                                if (t.variants[j].options[s] == a) {
                                    e = t.variants[j].available ? "available" : "sold_out";
                                    break
                                }
                            $(this).closest(".selector-wrapper").find(".swatch-element." + $(this).data("swatch")).removeClass("available").removeClass("sold_out").removeClass("unavailable").addClass(e)
                        });
                var l = n.settings.variant_image_grouped
                  , d = n.selectors.productMainImages + ".slick-slider"
                  , c = n.selectors.productThumbImages + " .slick-slider"
                  , p = r
                  , u = n.productSingleObject
                  , m = n.selectors.originalSelectorId;
                if ("1" == l && ("color" == o || "colour" == o)) {
                    $(c).slick("slickUnfilter").slick("slickFilter", "[data-color='" + p + "']");
                    var h = $(c).find(".slick-slide")
                      , g = 0
                      , f = !1;
                    h.each(function(e, t) {
                        $(t).attr("data-slick-index", e),
                        $.each(u.variants, function(a, r) {
                            if (r.id == $(m).val() && !1 == f) {
                                var o = r.featured_image.src.replace(/^https?\:/i, "").split("?")[0].replace(".png", "").replace(".jpg", "")
                                  , n = $(t).find("img").first().attr("src");
                                0 <= n.indexOf(o) && (g = e,
                                f = !0)
                            }
                        })
                    }),
                    $(c).slick("slickGoTo", g, !0),
                    $(d).slick("slickUnfilter").slick("slickFilter", "[data-color='" + p + "']");
                    var h = $(d).find(".slick-slide")
                      , g = 0
                      , f = !1;
                    h.each(function(e, t) {
                        $(t).attr("data-slick-index", e),
                        $.each(u.variants, function(a, r) {
                            if (r.id == $(m).val() && !1 == f) {
                                var o = r.featured_image.src.replace(/^https?\:/i, "").split("?")[0].replace(".png", "").replace(".jpg", "")
                                  , n = $(t).find("img").first().attr("src");
                                0 <= n.indexOf(o) && (g = e,
                                f = !0)
                            }
                        })
                    }),
                    $(d).slick("slickGoTo", g, !0),
                    $(".templateProduct .thumbnails .slick-list").width() >= $(".templateProduct .thumbnails .slick-track").width() ? $("body").append("<style id=\"product-images-filtering-style\" type=\"text/css\">.templateProduct .thumbnails .slick-track{transform:none!important;}</style>") : 0 < $("style#product-images-filtering-style").length && $("style#product-images-filtering-style").remove()
                }
            }
            var a = this.selectors.optionsSelect
              , r = this.productSingleObject
              , e = ""
              , o = "." + this.selectors.singleOptionSwatches + " .swatch-radio"
              , n = this;
            0 < $("." + this.selectors.singleOptionSwatches).length && (e = $(o),
            e.unbind("click"),
            e.on("click", function() {
                var e = $(this).data("id")
                  , a = $(this).data("poption")
                  , o = $(this).data("value")
                  , s = $(this).data("swatch");
                $(this).data("value") != $(e).val() && ($(e).val($(this).data("value")).trigger("change"),
                $(e).closest(".selector-wrapper").find(".swatch-radio").removeClass("selected"),
                $(this).addClass("selected"),
                $(e).closest(".selector-wrapper").find("label").removeClass("label-selected"),
                $(this).parent("label").addClass("label-selected"),
                $(e).closest(".selector-wrapper"),
                $(e).closest(".selector-wrapper").find(".option-select-value").html($(this).data("value"))),
                t(r, a, o, s, n)
            })),
            $(".swatch-radio.selected").trigger("click")
        },
        _initVariants: function() {
            var e = {
                $container: this.$container,
                enableHistoryState: this.$container.data("enable-history-state") || !1,
                singleOptionSelector: this.selectors.singleOptionSelector,
                originalSelectorId: this.selectors.originalSelectorId,
                product: this.productSingleObject
            };
            this.variants = new slate.Variants(e),
            this.$container.on("variantChange" + this.settings.namespace, this._updateAddToCart.bind(this)),
            this.$container.on("variantImageChange" + this.settings.namespace, this._updateMedia.bind(this)),
            this.$container.on("variantPriceChange" + this.settings.namespace, this._updatePrice.bind(this)),
            this.$container.on("variantSKUChange" + this.settings.namespace, this._updateSKU.bind(this))
        },
        _updateAddToCart: function(e) {
          
            var t = e.variant;
          if (t && t.available) {
            $('#BIS_trigger').hide(); // hide the button
          } else {
            $('#BIS_trigger').show().attr('data-variant-id', t.id); // show the button and set the default variant
          }
          
          
      t ? ($(this.selectors.productPrices).removeClass("invisible").attr("aria-hidden", "true"),
            t.available ? ($(".variations_button .product-cart__condition").removeClass("hide"),
            $(".variations_button .dynamic-payment-button").removeClass("hide"),
            $(this.selectors.addToCart).prop("disabled", !1).toggleClass("hide", !1),
            $(this.selectors.addToCart).val(theme.strings.addToCart),
            $(this.selectors.stockText).html(theme.strings.inStock).removeClass("out-of-stock unavailable").addClass("in-stock"),
            "shopify" == t.inventory_management && "continue" != t.inventory_policy && (0 < t.inventory_quantity && 1 == parseInt(theme.inventory) ? $(this.selectors.stockText).html(t.inventory_quantity + " " + theme.strings.inStock) : $(this.selectors.stockText).html(theme.strings.inStock))) : ($(this.selectors.addToCart).prop("disabled", !0).toggleClass("hide", !1),
            $(this.selectors.addToCart).val(theme.strings.soldOut),
            $(this.selectors.stockText).html(theme.strings.outStock).removeClass("in-stock unavailable").addClass("out-of-stock"))) : ($(".variations_button .product-cart__condition").addClass("hide"),
            $(".variations_button .dynamic-payment-button").addClass("hide"),
            $(this.selectors.addToCart).prop("disabled", !0),
            $(this.selectors.addToCart).val(theme.strings.unavailable),
            $(this.selectors.stockText).html(theme.strings.unavailable).removeClass("in-stock").addClass("out-of-stock unavailable"),
            $(this.selectors.productPrices).addClass("invisible").attr("aria-hidden", "false"))
        },
        _updateImages: function(e) {
            var t = e.variant
              , a = this
              , r = this.settings.product_design
              , o = t.featured_image.src.replace("https:", "").replace("http:", "").split("?v=")[0];
            $(this.selectors.productFeaturedImage).each(function() {
                var e = $(this)
                  , t = e.attr("href");
                if (0 <= t.indexOf(o) && !e.closest(".slick-slide").hasClass("slick-cloned")) {
                    var n = $(a.selectors.productMainImages)
                      , s = e.closest(".slick-slide").attr("data-slick-index");
                    if ("carousel" == r ? n.slick("slickGoTo", s) : n.slick("slickGoTo", s, !0),
                    "scroll" == r) {
                        var l = parseInt(e.closest(".shopify-product-gallery__image").offset().top) - 50;
                        $("html,body").animate({
                            scrollTop: l
                        }, "slow")
                    }
                    return void ("gallery" == r && 0 < $(".thumbnails .thumbnail-gallery-item").length && $(".thumbnails .thumbnail-gallery-item").each(function() {
                        var e = $(this).data("href");
                        0 <= e.indexOf(o) && $(this).trigger("click")
                    }))
                }
            })
        },
        _updatePrice: function(e) {
            var t = e.variant
              , a = $(this.selectors.priceContainer, this.$container)
              , r = $(this.selectors.regularPrice, a)
              , o = $(this.selectors.salePrice, a)
              , n = $(this.selectors.saleLabel, this.$container)
              , s = $(this.selectors.unitPrice, a)
              , l = $(this.selectors.unitPriceBaseUnit, a);
            if (a.removeClass(this.classes.productUnavailable).removeClass(this.classes.productOnSale).removeClass(this.classes.productUnitAvailable).removeClass(this.classes.productSoldOut).removeAttr("aria-hidden"),
            this.$productPolicies.removeClass(this.classes.visibilityHidden),
            !t)
                return a.addClass(this.classes.productUnavailable).attr("aria-hidden", !0),
                void this.$productPolicies.addClass(this.classes.visibilityHidden);
            if (t.available || a.addClass(this.classes.productSoldOut),
            t.compare_at_price > t.price) {
                if (r.removeClass("hide"),
                r.html("<span class=\"money\">" + theme.Currency.formatMoney(t.compare_at_price, theme.settings.moneyFormat) + "</span>"),
                o.html("<span class=\"money\">" + theme.Currency.formatMoney(t.price, theme.settings.moneyFormat) + "</span>"),
                a.addClass(this.classes.productOnSale),
                n.text(theme.strings.sale),
                "" != theme.sale_percentages) {
                    var d = Math.round(100 * (t.compare_at_price - t.price) / t.compare_at_price);
                    n.text("-" + d + "%")
                }
                n.removeClass("hide")
            } else
                n.addClass("hide"),
                r.addClass("hide"),
                o.html("<span class=\"money\">" + theme.Currency.formatMoney(t.price, theme.settings.moneyFormat) + "</span>");
            t.unit_price && (s.html("<span class=\"money\">" + theme.Currency.formatMoney(t.unit_price, theme.settings.moneyFormat) + "</span>"),
            l.html(this._getBaseUnit(t)),
            a.addClass(this.classes.productUnitAvailable)),
            window.builtin_currencies_used && theme.CurrencyPicker.convert(this.selectors.product + " .money")
        },
        _getBaseUnit: function(e) {
            return 1 === e.unit_price_measurement.reference_value ? e.unit_price_measurement.reference_unit : e.unit_price_measurement.reference_value + e.unit_price_measurement.reference_unit
        },
        _updateSKU: function(e) {
            var t = e.variant;
            "" == t.sku ? $(this.selectors.SKU).addClass("hide") : $(this.selectors.SKU).removeClass("hide").find(".sku").text(t.sku)
        },
        onUnload: function() {
            this.$container.off(this.settings.namespace),
            theme.ProductVideo.removeSectionVideos(this.settings.sectionId),
            theme.ProductModel.removeSectionModels(this.settings.sectionId)
        }
    }),
    e
}(),
theme.ProductModel = function() {
    function e(t) {
        if (!t) {
            if (!window.ShopifyXR)
                return void document.addEventListener("shopify_xr_initialized", function() {
                    e()
                });
            for (var a in r)
                if (r.hasOwnProperty(a)) {
                    var o = r[a];
                    if (o.loaded)
                        continue;
                    var n = $("#ModelJson-" + a);
                    window.ShopifyXR.addModels(JSON.parse(n.html())),
                    o.loaded = !0
                }
            window.ShopifyXR.setupXRElements()
        }
    }
    function t(e) {
        if (!e)
            for (var t in o)
                if (o.hasOwnProperty(t)) {
                    var r = o[t];
                    r.modelViewerUi || (r.modelViewerUi = new Shopify.ModelViewerUI(r.$element)),
                    a(r)
                }
    }
    function a(e) {
        var t = n[e.sectionId];
        e.$container.on("mediaVisible", function() {
            t.$element.attr("data-shopify-model3d-id", e.modelId);
            theme.Helpers.isTouch() || e.modelViewerUi.play()
        }),
        e.$container.on("mediaHidden", function() {
            t.$element.attr("data-shopify-model3d-id", t.defaultId),
            e.modelViewerUi.pause()
        }).on("xrLaunch", function() {
            e.modelViewerUi.pause()
        })
    }
    var r = {}
      , o = {}
      , n = {}
      , s = {
        mediaGroup: "[data-product-single-media-group]",
        xrButton: "[data-shopify-xr]"
    };
    return {
        init: function(a, l) {
            r[l] = {
                loaded: !1
            },
            a.each(function(e) {
                var t = $(this)
                  , a = t.data("media-id")
                  , r = $(t.find("model-viewer")[0])
                  , d = r.data("model-id");
                if (0 === e) {
                    var c = t.closest(s.mediaGroup).find(s.xrButton);
                    n[l] = {
                        $element: c,
                        defaultId: d
                    }
                }
                o[a] = {
                    modelId: d,
                    sectionId: l,
                    $container: t,
                    $element: r
                }
            }),
            window.Shopify.loadFeatures([{
                name: "shopify-xr",
                version: "1.0",
                onLoad: e
            }, {
                name: "model-viewer-ui",
                version: "1.0",
                onLoad: t
            }]),
            theme.LibraryLoader.load("modelViewerUiStyles")
        },
        removeSectionModels: function(e) {
            for (var t in o)
                if (o.hasOwnProperty(t)) {
                    var a = o[t];
                    a.sectionId === e && (o[t].modelViewerUi.destroy(),
                    delete o[t])
                }
            delete r[e]
        }
    }
}(),
theme.ProductVideo = function() {
    function e(e) {
        return e ? void n() : void o(l.html5)
    }
    function t() {
        window.YT.Player && o(l.youtube)
    }
    function a(e) {
        if (!e.player) {
            var t = e.container.closest(d.productMediaWrapper)
              , a = t.data(c.enableVideoLooping);
            switch (e.host) {
            case l.html5:
                e.player = new Shopify.Plyr(e.element,{
                    loop: {
                        active: a
                    }
                });
                break;
            case l.youtube:
                var r = t.data(c.videoId);
                e.player = new YT.Player(e.element,{
                    videoId: r,
                    events: {
                        onStateChange: function(e) {
                            0 === e.data && a && e.target.seekTo(0)
                        }
                    }
                }),
                e.container.on("click", ".yt-video--cover", function() {
                    e.player.playVideo(),
                    $(this).css("z-index", "-1")
                });
            }
            t.on("mediaHidden xrLaunch", function() {
                e.player && (e.host === l.html5 && e.player.pause(),
                e.host === l.youtube && e.player.pauseVideo && e.player.pauseVideo())
            }),
            t.on("mediaVisible", function() {
                theme.Helpers.isTouch() || !e.player || (e.host === l.html5 && e.player.play(),
                e.host === l.youtube && e.player.playVideo && e.player.playVideo())
            })
        }
    }
    function r(e) {
        return "VIDEO" === e.tagName ? l.html5 : "IFRAME" === e.tagName && /^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(e.src) ? l.youtube : null
    }
    function o(e) {
        for (var t in s)
            if (s.hasOwnProperty(t)) {
                var a = s[t];
                a.host === e && a.ready()
            }
    }
    function n() {
        for (var e in s)
            if (s.hasOwnProperty(e)) {
                var t = s[e];
                if (t.nativeVideo)
                    continue;
                t.host === l.html5 && (t.element.setAttribute("controls", "controls"),
                t.nativeVideo = !0)
            }
    }
    var s = {}
      , l = {
        html5: "html5",
        youtube: "youtube"
    }
      , d = {
        productMediaWrapper: "[data-product-single-media-wrapper]"
    }
      , c = {
        enableVideoLooping: "enable-video-looping",
        videoId: "video-id"
    };
    return {
        init: function(o, n) {
            if (o.length) {
                var d = o.find("iframe, video")[0]
                  , c = o.data("mediaId");
                if (d) {
                    s[c] = {
                        mediaId: c,
                        sectionId: n,
                        host: r(d),
                        container: o,
                        element: d,
                        ready: function() {
                            a(this)
                        }
                    };
                    var p = s[c];
                    switch (p.host) {
                    case l.html5:
                        window.Shopify.loadFeatures([{
                            name: "video-ui",
                            version: "1.0",
                            onLoad: e
                        }]),
                        theme.LibraryLoader.load("plyrShopifyStyles");
                        break;
                    case l.youtube:
                        theme.LibraryLoader.load("youtubeSdk", t);
                    }
                }
            }
        },
        hosts: l,
        loadVideos: o,
        removeSectionVideos: function(e) {
            for (var t in s)
                if (s.hasOwnProperty(t)) {
                    var a = s[t];
                    a.sectionId === e && (a.player && a.player.destroy(),
                    delete s[t])
                }
        }
    }
}(),
theme.productRecommendationsSection = function() {
    function e(e) {
        var t = this.$container = $(e)
          , a = this.sectionId = t.attr("data-section-id")
          , r = t.attr("data-section-type");
        this.settings = {
            namespace: ".product-recommendations",
            sectionId: a
        },
        this.init()
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        init: function() {
            var e = function() {
                var e = document.querySelector(".product-recommendations");
                if (null !== e) {
                    var t = e.dataset.productId
                      , a = e.dataset.limit
                      , r = new XMLHttpRequest;
                    r.open("GET", "/recommendations/products?section_id=product-recommendations&limit=" + a + "&product_id=" + t),
                    r.onload = function() {
                        if (200 <= r.status && 300 > r.status) {
                            var t = document.createElement("div");
                            t.innerHTML = r.response,
                            e.parentElement.innerHTML = t.querySelector(".product-recommendations").innerHTML;
                            if ($("#productRecommendations .splide").length) {
                                let e = new Splide("#productRecommendations .splide",{
                                    updateOnMove: !0
                                });
                                e.on("mounted moved", debounce(function() {
                                    $(e.root).find(".splide__slide").removeClass("is-last-visible"),
                                    $(e.root).find(".splide__slide[tabindex=0]").last().addClass("is-last-visible")
                                }, 2e3)),
                                e.mount()
                            }
                            roar.handleQuickshop("#productRecommendations .splide")
                        }
                    }
                    ,
                    r.send()
                }
            };
            document.addEventListener("shopify:section:load", function(t) {
                "product-recommendations" === t.detail.sectionId && e()
            }),
            e()
        },
        onUnload: function() {
            this.$container.off(this.settings.namespace)
        }
    }),
    e
}(),
window.theme = window.theme || {},
theme.Filters = function() {
    function e() {
        $(a.filter).length && ($(a.fiterTarget).html(""),
        $(a.filter).clone().appendTo(a.fiterTarget),
        $(".offcanvas_shop_sidebar").fitVids())
    }
    function t(t) {
        var r = this.$container = $(t);
        this.$filterSelect = $(a.filter, r),
        this.$sortSelect = $(a.sortSelection, r),
        this.$viewSelect = $(a.defaultView, r),
        this.$filterClear = $(a.filterClear, r),
        e(),
        $(document).on("change", a.viewSelection, this._onViewChange.bind(this)),
        $(document).on("change", a.sortSelection, this._onSortChange.bind(this)),
        $(document).on("change", a.filterSelection, this._onFilterChange.bind(this)),
        $(document).on("click", a.filterClear, this._onFilterClear.bind(this))
    }
    var a = {
        sortSelection: ".filters-toolbar__input--sort",
        defaultSort: ".collection-header__default-sort",
        viewSelection: ".filters-toolbar__input--view",
        defaultView: ".collection-header__default-view",
        filter: ".shop-page #secondary",
        fiterTarget: ".offcanvas_aside_left .offcanvas_shop_sidebar .widget-area",
        filterSelection: ".mfilter-content .filter",
        filterClear: ".mfilter-content .clear"
    };
    return t.prototype = _.assignIn({}, t.prototype, {
        _filterAjaxClick: function(e) {
            delete Shopify.queryParams.page;
            var t = this._filterCreateUrl(e);
            this._filterGetContent(t)
        },
        _filterCreateUrl: function(e) {
            var t = $.param(Shopify.queryParams).replace(/%2B/g, "+");
            return e ? "" == t ? e : e + "?" + t : location.pathname + "?" + t
        },
        _filterGetContent: function(e) {
            var t = ".mfilter-box .mfilter-content"
              , a = this;
            $.ajax({
                type: "get",
                url: e,
                beforeSend: function() {
                    roar.destroyCountdown(),
                    $("body").addClass("is_loading").removeClass("open_filter")
                },
                success: function(a) {
                    var r = $(a).filter("title").text();
                   $("#mfilter-content-container").length > 0 && 
                     $("#mfilter-content-container").html($(a).find("#mfilter-content-container").html()),
                    $(t).empty().html($(a).find(t).html()),
                    History.pushState({
                        param: Shopify.queryParams
                    }, r, e),
                    setTimeout(function() {
                        $("html,body").animate({
                            scrollTop: $("body #sandbox").offset().top
                        }, 500, "swing")
                    }, 100),
                    $("body").removeClass("is_loading"),
                    roar.mapPaginationCallback()
                },
                error: function() {
                    $("body").removeClass("is_loading")
                }
            })
        },
        _onFilterClear: function(e) {
            var t = [];
            Shopify.queryParams.constraint && (t = Shopify.queryParams.constraint.split("+"));
            var a = $(e.currentTarget)
              , r = a.closest(".column").find("input:checked");
            0 < r.length && r.each(function() {
                var e = $(this).val();
                if (e) {
                    var a = t.indexOf(e);
                    0 <= a && t.splice(a, 1)
                }
            }),
            t.length ? Shopify.queryParams.constraint = t.join("+") : delete Shopify.queryParams.constraint,
            this._filterAjaxClick()
        },
        _onViewChange: function(e) {
            var t = $(e.currentTarget)
              , r = $(a.defaultView, this.$container).val()
              , o = t.val() ? t.val() : r;
            Shopify.queryParams.view = o,
            this._filterAjaxClick()
        },
        _onSortChange: function(e) {
            var t = $(e.currentTarget)
              , r = $(a.defaultSort, this.$container).val()
              , o = t.val() ? t.val() : r;
            Shopify.queryParams.sort_by = o,
            this._filterAjaxClick()
        },
        _onFilterChange: function(e) {
            var t = $(e.currentTarget)
              , a = t.closest(".column").attr("data-multi_choice")
              , r = [];
            if (Shopify.queryParams.constraint && (r = Shopify.queryParams.constraint.split("+")),
            "false" == a && !t.closest(".field").hasClass("active")) {
                var o = t.closest(".column").find("input:checked");
                0 < o.length && o.each(function() {
                    var e = $(this).val();
                    if (e) {
                        var t = r.indexOf(e);
                        0 <= t && r.splice(t, 1)
                    }
                })
            }
            var n = t.val();
            if (n) {
                var s = r.indexOf(n);
                0 <= s ? r.splice(s, 1) : r.push(n)
            }
            r.length ? Shopify.queryParams.constraint = r.join("+") : delete Shopify.queryParams.constraint,
            this._filterAjaxClick()
        },
        onUnload: function() {
            this.$sortSelect.off("change", this._onSortChange),
            this.$filterSelect.off("change", this._onFilterChange),
            this.$filterClear.off("click", this._onFilterClear)
        }
    }),
    t
}(),
theme.MegaMenuSection = function() {
    function e(e) {
        var t = this.$container = $(e)
          , a = t.attr("data-section-id")
          , r = t.attr("data-section-type");
        this.MegaMenu = $("#megamenu-" + a),
        this.megaMenuNamspace = "#megamenu-" + a,
        this._init()
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _init: function() {
            this._handleMegaMenu(),
            this._handleVermenuCategory()
        },
        _handleVermenuCategory: function() {
            if ($("#vermenu_cat_gap").length && 992 <= roar.getWidthBrowser() && 0 < $(".container-megamenu.vertical .megamenu-wrapper").length) {
                var e = $(".container-megamenu.vertical .megamenu-wrapper").outerHeight()
                  , t = $(".container-megamenu.vertical .megamenu-wrapper").offset().top
                  , a = $("#sidebar").offset().top;
                $("#vermenu_cat_gap").css("height", e - (a - t))
            }
        },
        _handleMegaMenu: function() {},
        onUnload: function() {
            this.$container.off(this.megaMenuNamspace)
        },
        onSelect: function() {
            this._handleMegaMenu(),
            this._handleVermenuCategory(),
            0 < $(this.megaMenuNamspace + " .product-grid.cb-item").length && roar.initCountdown(),
            roar.handleQuickshop(this.megaMenuNamspace + " .product-grid.cb-item")
        },
        onBlockSelect: function() {},
        onBlockDeselect: function() {}
    }),
    e
}(),
theme.HeaderNotice = function() {
    function e(e) {
        var t = this.$container = $(e)
          , a = this.sectionId = t.attr("data-section-id")
          , r = t.attr("data-section-type");
        this.sectionWidgetId = $("#shopify-section-" + a),
        this.sectionNamspace = "#" + a,
        this.sectionContent = $(this.sectionNamspace),
        this._init()
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _init: function() {
            var e = this;
            if ("1" == e.sectionContent.data("hn_use")) {
                var t = !0;
                "1" == e.sectionContent.data("hn_once") && "yes" == localStorage.getItem("displayNotice") && (t = !1),
                !0 == t && ($(e.sectionNamspace + " .header-notice").children().show(),
                $(e.sectionNamspace + " .hn--close").on("click", function() {
                    return "1" == e.sectionContent.data("hn_once") && localStorage.setItem("displayNotice", "yes"),
                    $(e.sectionNamspace + " .header-notice").addClass("closed"),
                    !1
                }))
            }
        },
        onUnload: function() {
            this.$container.off(this.sectionNamspace)
        }
    }),
    e
}(),
theme.CreativeBuilder = function() {
    function e(e) {
        var t = this.$container = $(e)
          , a = this.sectionId = t.attr("data-section-id")
          , r = t.attr("data-section-type");
        this.sectionNamspace = "#" + a,
        this.sectionContent = $(this.sectionNamspace),
        this._init()
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _init: function() {
            this.initSlider(),
            this.initVideo(),
            document.querySelectorAll("#creative-builder-" + this.sectionId + " .rt-tabs").forEach(e=>{
                roar.handleTab(e)
            }
            )
        },
        initSlider: function() {
            let e = this.$container[0].querySelectorAll(".splide");
            e.forEach(e=>{
                let t = new Splide(e,{
                    updateOnMove: !0
                });
                t.on("mounted moved", debounce(function() {
                    $(t.root).find(".splide__slide").removeClass("is-last-visible"),
                    $(t.root).find(".splide__slide[tabindex=0]").last().addClass("is-last-visible")
                }, 2e3)),
                t.mount()
            }
            )
        },
        initVideo: function() {
            let e = "#" + this.$container[0].id + " .cb-item.video";
            if ($(e).length) {
                let a = document.querySelectorAll(e);
                for (var t = 0; t < a.length; t++)
                    theme.ProductVideo.init($(a[t]), this.sectionId)
            }
        },
        onUnload: function() {
            theme.ProductVideo.removeSectionVideos(this.sectionId),
            this.$container.off(this.sectionNamspace)
        },
        onSelect: function() {}
    }),
    e
}(),
theme.HeaderSection = function() {
    function e(e) {
        var t = this.$container = $(e)
          , a = this.sectionId = t.attr("data-section-id")
          , r = t.attr("data-section-type");
        this.sectionNamspace = "#" + a,
        this.sectionContent = $(this.sectionNamspace),
        this._init()
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _init: function() {
            document.querySelectorAll("[data-predictive-search-open-drawer], [data-predictive-search-mobile-open-drawer]").forEach(e=>{
                e.onclick = function(t) {
                    if (0 == theme.libs.psearch.state) {
                        t.preventDefault();
                        let a = loadScriptAsync(theme.libs.psearch);
                        a.then(function() {
                            e.dispatchEvent(new Event("click"))
                        })
                    }
                }
            }
            )
        },
        onUnload: function() {
            1 == theme.libs.psearch.state && theme.Search.unload(),
            this.$container.off(this.sectionNamspace)
        },
        onSelect: function() {
            theme.CurrencyPicker.init(),
            theme.LanguagePicker.init()
        }
    }),
    e
}(),
theme.Footer = function() {
    function e(e) {
        var t = this.$container = $(e)
          , a = this.sectionId = t.attr("data-section-id")
          , r = t.attr("data-section-type");
        this.sectionNamspace = "#" + a,
        this.sectionContent = $(this.sectionNamspace)/*,
        this._init()*/
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _init: function() {
            this.initNewsletterForm()
        },
        initNewsletterForm: function() {
            var e = $("#" + this.$container[0].id + " .cb-item.newsletter-form form");
            if (e.length)
                for (var t = 0; t < e.length; t++) {
                    let a = $(e[t])
                      , r = a.attr("action");
                    a.ajaxChimp({
                        url: r,
                        callback: function() {}
                    })
                }
        },
        onUnload: function() {
            this.$container.off(this.sectionNamspace)
        },
        onSelect: function() {}
    }),
    e
}(),
theme.mobileNavSection = function() {
    function e(e) {
        var t = this.$container = $(e)
          , a = this.sectionId = t.attr("data-section-id")
          , r = t.attr("data-section-type");
        this.mobileNavId = $("#shopify-section-" + a),
        this.mobileNav = $("#primary-" + a),
        this.mobilenavNamespace = "#primary-" + a,
        this._init()
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _init: function() {
            this._initMobile()
        },
        _initMobile: function() {
          $(".custom-mobilemenu-heading").on("click", function(e){
          	e.preventDefault();
            if(!$(this).hasClass('active')) {
             	var mobile_ele = $(this).data("id");
              	$(".custom-mobilemenu-heading").removeClass("active");
              	$(this).addClass("active");
              	$(".custom-mobilemenu").addClass("hide");
              	$("." + mobile_ele).removeClass("hide");
            }
          
          });
          
          
            $("#off-canvas-layer").on("click", function() {
                $(document.body).removeClass("open-canvas-panel"),
                $(document.body).removeClass("open_filter")
            }),
            $(".mobile-nav-icon").on("click", function() {
                $(document.body).toggleClass("open-canvas-panel")
            }),
              
              $(".menu-item-has-children > a").on("click", function(evt) {
              evt.preventDefault();
              var e = $(this).closest(".menu-item-has-children");
              e.toggleClass("mobile-active")
            }),
            $(".mobile-child-menu").on("click", function() {
                var e = $(this).closest(".menu-item-has-children");
                e.toggleClass("mobile-active")
            }),
            $(window).on("resize", function() {
                991 < $(window).width() && $(document.body).removeClass("open-canvas-panel")
            })
        },
        onUnload: function() {
            this.$container.off(this.mobilenavNamespace)
        }
    }),
    e
}(),
theme.ProductVariantMobile = function() {
    function e(e) {
        var t = this.$container = $(e)
          , a = this.sectionId = t.attr("data-section-id")
          , r = t.attr("data-section-type");
        this.wrapperId = $("#" + a),
        this.wrapper = $("#" + a),
        this.wrapperNamspace = "#" + a,
        this.addCartId = $("#btn-" + a + ".m-allow-cart"),
        this.addCartClass = $(".variant-item-" + a + ".m-allow-cart"),
        this._init()
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _init: function() {
            var e = this;
            e._initScroll(),
            e._initCompact(),
            e._initEvents(),
            $(window).resize(function() {
                991 >= $(window).width() && e._initCompact()
            })
        },
        _initScroll: function() {
            $(window).on("scroll", function() {
                var e = $("#shopify-section-product-variants-mobile").height();
                $(window).scrollTop() > e ? $(document.body).addClass("sticky-product-variants-mobile") : ($(document.body).removeClass("sticky-product-variants-mobile"),
                $(".product-variants-mobile").hasClass("active") && $(".product-variants-mobile").height($(".variants-header").data("height")))
            })
        },
        _initCompact: function() {
            if (0 < $(".product-variant-mobile-section").length) {
                var e = $(".product-variant-mobile-section")
                  , t = $(".product-variants-mobile");
                t.each(function() {
                    var e = $(this)
                      , t = e.find(".variants-header")
                      , a = t.innerHeight()
                      , r = e.find(".variants-content").outerHeight()
                      , o = t.closest(".product-variants-mobile");
                    t.data("height", a),
                    e.data("height", a + r)
                }),
                t.each(function() {
                    var e = $(this)
                      , t = e.find(".variants-header")
                      , a = t.innerHeight()
                      , r = e.find(".variants-content").outerHeight()
                      , o = t.closest(".product-variants-mobile");
                    t.data("height", a),
                    e.data("height", a + r),
                    o.hasClass("active") && o.height(o.data("height"))
                }),
                e.unbind("click") && e.on("click", ".variants-header .title", function() {
                    var e = $(this)
                      , a = e.closest(".variants-header")
                      , r = e.closest(".product-variants-mobile");
                    r.hasClass("active") || t.closest(".active").removeClass("active").height(e.data("height")),
                    r.toggleClass("active"),
                    r.hasClass("active") ? r.height(r.data("height")) : r.height(a.data("height"))
                })
            }
        },
        _initEvents: function() {
            var e = $("#ProductSelect-product-template.variation-select").val();
            0 < this.addCartId.length && (this.addCartId.unbind("click"),
            this.addCartId.on("click", function() {
                $("#ProductSelect-product-template.variation-select").val(e),
                $("#AddToCart-product-template").trigger("click")
            })),
            0 < this.addCartClass.length && (this.addCartClass.unbind("click"),
            this.addCartClass.on("click", function() {
                var e = $(this).data("id");
                $("#ProductSelect-product-template.variation-select").val(e),
                $("#AddToCart-product-template").trigger("click")
            }))
        },
        onUnload: function() {
            this.$container.off(this.wrapperNamspace)
        }
    }),
    e
}(),
theme.CartVariantMobile = function() {
    function e(e) {
        var t = this.$container = $(e)
          , a = this.sectionId = t.attr("data-section-id")
          , r = t.attr("data-section-type");
        this.wrapperId = $("#" + a),
        this.wrapper = $("#" + a),
        this.wrapperNamspace = "#" + a,
        this.addCartId = $("#btn-" + a + ".m-allow-cart"),
        this.addCartClass = $(".variant-item-" + a + ".m-allow-cart"),
        this._init()
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _init: function() {
            var e = this;
            e._initScroll()
        },
        _initScroll: function() {
            $(window).on("scroll", function() {
                var e = $("#shopify-section-product-variants-mobile").height();
                $(window).scrollTop() > e ? $(document.body).addClass("sticky-product-variants-mobile") : ($(document.body).removeClass("sticky-product-variants-mobile"),
                $(".product-variants-mobile").hasClass("active") && $(".product-variants-mobile").height($(".variants-header").data("height")))
            })
        },
        onUnload: function() {
            this.$container.off(this.wrapperNamspace)
        }
    }),
    e
}(),
theme.ShippingCalculator = function() {
    function ShippingCalculator(e) {
        var t = this.$container = $(e)
          , a = t.attr("data-section-id");
        this.selectors = {
            shipping_btn: "#cart__shipping-btn-" + a,
            shipping_calculator: "#shipping__calculator-" + a,
            get_rates: "#shipping__calculator-btn-" + a,
            response: "#shipping__calculator-response-" + a,
            template: "<p id =\"shipping-rates-feedback-" + a + "\" class=\"shipping-rates-feedback\"></p>",
            address_country: "address_country-" + a,
            address_province: "address_province-" + a,
            address_zip: "address_zip-" + a,
            address_province_label: "address_province_label-" + a,
            address_province_container: "address_province_container-" + a
        },
        this.strings = {
            submitButton: "Calculate shipping",
            submitButtonDisabled: "Calculating...",
            customerIsLoggedIn: !1,
            moneyFormat: theme.settings.moneyFormat
        },
        this._init()
    }
    return ShippingCalculator.prototype = _.assignIn({}, ShippingCalculator.prototype, {
        _disableButtons: function() {
            var e = this.selectors
              , t = this.strings;
            $(e.get_rates).text(t.submitButtonDisabled).attr("disabled", "disabled").addClass("disabled")
        },
        _enableButtons: function() {
            var e = this.selectors
              , t = this.strings;
            $(e.get_rates).removeAttr("disabled").removeClass("disabled").text(t.submitButton)
        },
        _render: function(e) {
            var t = this.selectors
              , a = this.strings
              , r = $(t.template)
              , o = $(t.response);
            if (o.length) {
                if (!e.success)
                    r.addClass("error"),
                    r.append(e.errorFeedback);
                else if (r.addClass("success"),
                e.rates) {
                    r.append(e.rates);
                    var n = e.rates;
                    if (n[0]) {
                        var s = n[0];
                        r.append("Rates start at <span class=\"money\">" + s.price + "</span>.")
                    }
                } else
                    r.append("We do not ship to this destination.");
                r.appendTo(o),
                window.builtin_currencies_used && theme.CurrencyPicker.convert(t.response + " .money")
            }
        },
        _formatRate: function(e) {
            function t(e, t) {
                return "undefined" == typeof e ? t : e
            }
            function a(e, a, r, o) {
                if (a = t(a, 2),
                r = t(r, ","),
                o = t(o, "."),
                isNaN(e) || null == e)
                    return 0;
                e = (e / 100).toFixed(a);
                var n = e.split(".")
                  , s = n[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + r)
                  , l = n[1] ? o + n[1] : "";
                return s + l
            }
            var r = this.selectors
              , o = this.strings;
            if ("function" == typeof theme.Currency.formatMoney)
                return theme.Currency.formatMoney(e, o.moneyFormat);
            "string" == typeof e && (e = e.replace(".", ""));
            var n = ""
              , s = /\{\{\s*(\w+)\s*\}\}/
              , l = o.moneyFormat;
            switch (l.match(s)[1]) {
            case "amount":
                n = a(e, 2);
                break;
            case "amount_no_decimals":
                n = a(e, 0);
                break;
            case "amount_with_comma_separator":
                n = a(e, 2, ".", ",");
                break;
            case "amount_no_decimals_with_comma_separator":
                n = a(e, 0, ".", ",");
            }
            return l.replace(s, n)
        },
        _onCartShippingRatesUpdate: function(e, t) {
            var a = this
              , r = this.selectors
              , o = this.strings;
            a._enableButtons();
            var n = "";
            if (t.zip && (n += t.zip + ", "),
            t.province && (n += t.province + ", "),
            n += t.country,
            e.length)
                for (var s = 0; s < e.length; s++)
                    e[s].price = a._formatRate(e[s].price);
            a._render({
                rates: e,
                address: n,
                success: !0
            }),
            $(r.response).fadeIn()
        },
        _pollForCartShippingRatesForDestination: function(e) {
            var t = this
              , a = this.selectors
              , r = this.strings
              , o = function() {
                $.ajax("/cart/async_shipping_rates", {
                    dataType: "json",
                    success: function(a, r, n) {
                        200 === n.status ? t._onCartShippingRatesUpdate(a.shipping_rates, e) : setTimeout(o, 500)
                    },
                    error: function(e, a) {
                        t._onError(e, a, t)
                    }
                })
            };
            return o
        },
        _fullMessagesFromErrors: function(e) {
            var t = this.selectors
              , a = this.strings
              , r = [];
            return $.each(e, function(e, t) {
                $.each(t, function(t, a) {
                    r.push(e + " " + a)
                })
            }),
            r
        },
        _onError: function(XMLHttpRequest, textStatus, self) {
            var selectors = self.selectors
              , strings = self.strings;
            self._enableButtons();
            var feedback = ""
              , data = eval("(" + XMLHttpRequest.responseText + ")");
            feedback = data.message ? data.message + "(" + data.status + "): " + data.description : "Error : " + self._fullMessagesFromErrors(data).join("; ") + ".",
            "Error : country is not supported." == feedback && (feedback = "We do not ship to this destination."),
            self._render({
                rates: [],
                errorFeedback: feedback,
                success: !1
            }),
            $(selectors.response).show()
        },
        _getCartShippingRatesForDestination: function(e) {
            var t = this
              , a = this.selectors
              , r = this.strings;
            $.ajax({
                type: "POST",
                url: "/cart/prepare_shipping_rates",
                data: $.param({
                    shipping_address: e
                }),
                success: t._pollForCartShippingRatesForDestination(e),
                error: function(e, a) {
                    t._onError(e, a, t)
                }
            })
        },
        _init: function() {
            var e = this
              , t = this.selectors
              , a = this.strings;
            if ($(t.shipping_calculator).length) {
                new Shopify.CountryProvinceSelector(t.address_country,t.address_province,{
                    hideElement: t.address_province_container
                });
                var r = $("#" + t.address_country)
                  , o = $("#" + t.address_province_label).get(0);
                "undefined" != typeof Countries && (Countries.updateProvinceLabel(r.val(), o),
                r.change(function() {
                    Countries.updateProvinceLabel(r.val(), o)
                })),
                $(t.get_rates).on("click", function() {
                    e._disableButtons(),
                    $(t.response).empty().hide();
                    var a = {};
                    a.zip = $("#" + t.address_zip).val() || "",
                    a.country = $("#" + t.address_country).val() || "",
                    a.province = $("#" + t.address_province).val() || "",
                    e._getCartShippingRatesForDestination(a)
                }),
                a.customerIsLoggedIn && $(t.get_rates + ":eq(0)").trigger("click"),
                $(t.shipping_btn).on("click", function() {
                    $(t.shipping_calculator).slideToggle()
                })
            }
        },
        onUnload: function() {}
    }),
    ShippingCalculator
}(),
theme.GalleryTemplate = function() {
    function e(e) {
        var t = this.$container = $(e)
          , a = t.attr("data-section-id");
        this.selectors = {
            grid_gallery: "grid-gallery-" + a
        },
        this._init()
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _init: function() {
            new CBPGridGallery(document.getElementById(this.selectors.grid_gallery))
        },
        onUnload: function() {}
    }),
    e
}(),
theme.FilterWidgetSection = function() {
    function e(e) {
        var t = this.$container = $(e)
          , a = this.sectionId = t.attr("data-section-id")
          , r = t.attr("data-section-type");
        this.filterWidgetId = $("#shopify-section-" + a),
        this.filterWidgetNamspace = "#home-filter-" + a,
        this.filterNewSelect = $("#home-filter-" + a + " .home-filter--dropdown-wrapper"),
        this.filterCollectionId = $("#home-filter-" + a + " .collection__selection select"),
        this.filterTagSelection = $("#home-filter-" + a + " .tag__selection"),
        this.filterButton = $("#home-filter-" + a + " .button"),
        this._init(),
        this._initDropdown()
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _init: function() {},
        _initDropdown: function() {
            this.filterNewSelect.each(function() {
                var e = $(this).find("select")
                  , t = $(this).find("a.mimic-selected")
                  , a = $(this).find("ul.mimic-options")
                  , r = a.find("a");
                t.on("click", function(e) {
                    e.stopPropagation(),
                    $("a.mimic-selected").not(this).next("ul.options").hide().removeClass("active");
                    var t = $(this).next(a);
                    t.stop().slideToggle("fast", function() {
                        $(this).toggleClass("active")
                    })
                }),
                r.on("click", function(r) {
                    r.stopPropagation(),
                    t.text($(this).text()).removeClass("active"),
                    e.find("option").prop("selected", !1),
                    e.find("option[value=\"" + $(this).attr("rel") + "\"]").prop("selected", "selected"),
                    a.hide(),
                    e.change()
                }),
                $(document).on("click", function() {
                    t.removeClass("active"),
                    a.hide()
                })
            });
            var e = this.filterTagSelection;
            this.filterCollectionId.on("change", function() {
                var t = $(this).find("option:selected").val();
                $(this).parent().find(".first").removeClass("hidden"),
                "" === t ? (e.find(".home-filter--dropdown-backdrop").addClass("disabled"),
                e.find("select").val("").attr("disabled", !0)) : ($(this).parent().find(".error").hide(),
                e.find(".home-filter--dropdown-backdrop").removeClass("disabled").addClass("enabled"),
                e.find("select").val("").attr("disabled", !1))
            });
            var t = this.filterTagSelection.find("select");
            t.on("change", function() {
                $(this).find("option:selected").val();
                $(this).parent().find(".first").removeClass("hidden")
            });
            var a = this.filterCollectionId
              , r = this.filterCollectionId.parent().find(".error");
            this.filterButton.on("click", function() {
                var e = [];
                if (t.each(function() {
                    var t = $(this).val();
                    "" !== t && e.push(t)
                }),
                "" == a.val())
                    r.show();
                else {
                    var o = window.location.origin + a.val() + "?constraint=" + e.join("+");
                    window.location = o,
                    r.hide()
                }
            })
        },
        onUnload: function() {
            this.$container.off(this.filterWidgetNamspace)
        }
    }),
    e
}();
function onYouTubeIframeAPIReady() {
    theme.ProductVideo.loadVideos(theme.ProductVideo.hosts.youtube)
}
$(document).ready(function() {
    theme.ThePilot.doPilot();
    var e = new theme.Sections;
    e.register("header-notice", theme.HeaderNotice),
    e.register("product-template", theme.Product),
    e.register("mega-menu", theme.MegaMenuSection),
    e.register("mobile-nav-section", theme.mobileNavSection),
    e.register("product-variant-mobile", theme.ProductVariantMobile),
    e.register("cart-variant-mobile", theme.CartVariantMobile),
    e.register("shipping-calculator", theme.ShippingCalculator),
    e.register("collection-template", theme.Filters),
    e.register("search-template", theme.Filters),
    e.register("gallery-template", theme.GalleryTemplate),
    e.register("home-filter", theme.FilterWidgetSection),
    e.register("product-recommendations", theme.productRecommendationsSection),
    e.register("header-elements", theme.HeaderSection),
    e.register("creative-builder", theme.CreativeBuilder),
    e.register("footer", theme.Footer)
}),
$(document).one("touchstart", function() {
    theme.Helpers.setTouch()
}),
NProgress.start(),
$(window).resize(function() {
    768 > roar.getWidthBrowser() && $("#popup-mailchimp.d-none.d-sm-block").find(".mfp-close").trigger("click")
}),
$(document).ready(function() {
    try {
        roar.init(),
        theme.CurrencyPicker.init(),
        theme.LanguagePicker.init()
    } finally {
        NProgress.done()
    }
}),
$(window).on("load", function() {
    setTimeout(function() {
        roar.handleSeasonalFrame()
    }, 3e3)
});


