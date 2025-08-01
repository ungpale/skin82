/*! fancyBox v2.1.7 fancyapps.com | fancyapps.com/fancybox/#license */
!(function (t, J, f, x) {
  var L = f('html'),
    q = f(t),
    p = f(J),
    b = (f.fancybox = function () {
      b.open.apply(this, arguments);
    }),
    K = navigator.userAgent.match(/msie/i),
    D = null,
    u = J.createTouch !== x,
    v = function (a) {
      return a && a.hasOwnProperty && a instanceof f;
    },
    r = function (a) {
      return a && 'string' === f.type(a);
    },
    G = function (a) {
      return r(a) && 0 < a.indexOf('%');
    },
    m = function (a, c) {
      var d = parseInt(a, 10) || 0;
      c && G(a) && (d *= b.getViewport()[c] / 100);
      return Math.ceil(d);
    },
    y = function (a, b) {
      return m(a, b) + 'px';
    };
  f.extend(b, {
    version: '2.1.7',
    defaults: {
      padding: 15,
      margin: 20,
      width: 800,
      height: 600,
      minWidth: 100,
      minHeight: 100,
      maxWidth: 9999,
      maxHeight: 9999,
      pixelRatio: 1,
      autoSize: !0,
      autoHeight: !1,
      autoWidth: !1,
      autoResize: !0,
      autoCenter: !u,
      fitToView: !0,
      aspectRatio: !1,
      topRatio: 0.5,
      leftRatio: 0.5,
      scrolling: 'auto',
      wrapCSS: '',
      arrows: !0,
      closeBtn: !0,
      closeClick: !1,
      nextClick: !1,
      mouseWheel: !0,
      autoPlay: !1,
      playSpeed: 3e3,
      preload: 3,
      modal: !1,
      loop: !0,
      ajax: { dataType: 'html', headers: { 'X-fancyBox': !0 } },
      iframe: { scrolling: 'auto', preload: !0 },
      swf: { wmode: 'transparent', allowfullscreen: 'true', allowscriptaccess: 'always' },
      keys: { next: { 13: 'left', 34: 'up', 39: 'left', 40: 'up' }, prev: { 8: 'right', 33: 'down', 37: 'right', 38: 'down' }, close: [27], play: [32], toggle: [70] },
      direction: { next: 'left', prev: 'right' },
      scrollOutside: !0,
      index: 0,
      type: null,
      href: null,
      content: null,
      title: null,
      tpl: {
        wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
        image: '<img class="fancybox-image" src="{href}" alt="" />',
        iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (K ? ' allowtransparency="true"' : '') + '></iframe>',
        error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
        closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
        next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
        prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>',
        loading: '<div id="fancybox-loading"><div></div></div>',
      },
      openEffect: 'fade',
      openSpeed: 250,
      openEasing: 'swing',
      openOpacity: !0,
      openMethod: 'zoomIn',
      closeEffect: 'fade',
      closeSpeed: 250,
      closeEasing: 'swing',
      closeOpacity: !0,
      closeMethod: 'zoomOut',
      nextEffect: 'elastic',
      nextSpeed: 250,
      nextEasing: 'swing',
      nextMethod: 'changeIn',
      prevEffect: 'elastic',
      prevSpeed: 250,
      prevEasing: 'swing',
      prevMethod: 'changeOut',
      helpers: { overlay: !0, title: !0 },
      onCancel: f.noop,
      beforeLoad: f.noop,
      afterLoad: f.noop,
      beforeShow: f.noop,
      afterShow: f.noop,
      beforeChange: f.noop,
      beforeClose: f.noop,
      afterClose: f.noop,
    },
    group: {},
    opts: {},
    previous: null,
    coming: null,
    current: null,
    isActive: !1,
    isOpen: !1,
    isOpened: !1,
    wrap: null,
    skin: null,
    outer: null,
    inner: null,
    player: { timer: null, isActive: !1 },
    ajaxLoad: null,
    imgPreload: null,
    transitions: {},
    helpers: {},
    open: function (a, c) {
      if (a && (f.isPlainObject(c) || (c = {}), !1 !== b.close(!0)))
        return (
          f.isArray(a) || (a = v(a) ? f(a).get() : [a]),
          f.each(a, function (d, e) {
            var k = {},
              g,
              l,
              h,
              n,
              m;
            'object' === f.type(e) &&
              (e.nodeType && (e = f(e)),
              v(e)
                ? ((k = {
                    href: e.data('fancybox-href') || e.attr('href'),
                    title: f('<div/>')
                      .text(e.data('fancybox-title') || e.attr('title') || '')
                      .html(),
                    isDom: !0,
                    element: e,
                  }),
                  f.metadata && f.extend(!0, k, e.metadata()))
                : (k = e));
            g = c.href || k.href || (r(e) ? e : null);
            l = c.title !== x ? c.title : k.title || '';
            n = (h = c.content || k.content) ? 'html' : c.type || k.type;
            !n && k.isDom && ((n = e.data('fancybox-type')), n || (n = (n = e.prop('class').match(/fancybox\.(\w+)/)) ? n[1] : null));
            r(g) && (n || (b.isImage(g) ? (n = 'image') : b.isSWF(g) ? (n = 'swf') : '#' === g.charAt(0) ? (n = 'inline') : r(e) && ((n = 'html'), (h = e))), 'ajax' === n && ((m = g.split(/\s+/, 2)), (g = m.shift()), (m = m.shift())));
            h || ('inline' === n ? (g ? (h = f(r(g) ? g.replace(/.*(?=#[^\s]+$)/, '') : g)) : k.isDom && (h = e)) : 'html' === n ? (h = g) : n || g || !k.isDom || ((n = 'inline'), (h = e)));
            f.extend(k, { href: g, type: n, content: h, title: l, selector: m });
            a[d] = k;
          }),
          (b.opts = f.extend(!0, {}, b.defaults, c)),
          c.keys !== x && (b.opts.keys = c.keys ? f.extend({}, b.defaults.keys, c.keys) : !1),
          (b.group = a),
          b._start(b.opts.index)
        );
    },
    cancel: function () {
      var a = b.coming;
      (a && !1 === b.trigger('onCancel')) ||
        (b.hideLoading(), a && (b.ajaxLoad && b.ajaxLoad.abort(), (b.ajaxLoad = null), b.imgPreload && (b.imgPreload.onload = b.imgPreload.onerror = null), a.wrap && a.wrap.stop(!0, !0).trigger('onReset').remove(), (b.coming = null), b.current || b._afterZoomOut(a)));
    },
    close: function (a) {
      b.cancel();
      !1 !== b.trigger('beforeClose') &&
        (b.unbindEvents(),
        b.isActive &&
          (b.isOpen && !0 !== a
            ? ((b.isOpen = b.isOpened = !1), (b.isClosing = !0), f('.fancybox-item, .fancybox-nav').remove(), b.wrap.stop(!0, !0).removeClass('fancybox-opened'), b.transitions[b.current.closeMethod]())
            : (f('.fancybox-wrap').stop(!0).trigger('onReset').remove(), b._afterZoomOut())));
    },
    play: function (a) {
      var c = function () {
          clearTimeout(b.player.timer);
        },
        d = function () {
          c();
          b.current && b.player.isActive && (b.player.timer = setTimeout(b.next, b.current.playSpeed));
        },
        e = function () {
          c();
          p.unbind('.player');
          b.player.isActive = !1;
          b.trigger('onPlayEnd');
        };
      !0 === a || (!b.player.isActive && !1 !== a) ? b.current && (b.current.loop || b.current.index < b.group.length - 1) && ((b.player.isActive = !0), p.bind({ 'onCancel.player beforeClose.player': e, 'onUpdate.player': d, 'beforeLoad.player': c }), d(), b.trigger('onPlayStart')) : e();
    },
    next: function (a) {
      var c = b.current;
      c && (r(a) || (a = c.direction.next), b.jumpto(c.index + 1, a, 'next'));
    },
    prev: function (a) {
      var c = b.current;
      c && (r(a) || (a = c.direction.prev), b.jumpto(c.index - 1, a, 'prev'));
    },
    jumpto: function (a, c, d) {
      var e = b.current;
      e && ((a = m(a)), (b.direction = c || e.direction[a >= e.index ? 'next' : 'prev']), (b.router = d || 'jumpto'), e.loop && (0 > a && (a = e.group.length + (a % e.group.length)), (a %= e.group.length)), e.group[a] !== x && (b.cancel(), b._start(a)));
    },
    reposition: function (a, c) {
      var d = b.current,
        e = d ? d.wrap : null,
        k;
      e && ((k = b._getPosition(c)), a && 'scroll' === a.type ? (delete k.position, e.stop(!0, !0).animate(k, 200)) : (e.css(k), (d.pos = f.extend({}, d.dim, k))));
    },
    update: function (a) {
      var c = a && a.originalEvent && a.originalEvent.type,
        d = !c || 'orientationchange' === c;
      d && (clearTimeout(D), (D = null));
      b.isOpen &&
        !D &&
        (D = setTimeout(
          function () {
            var e = b.current;
            e && !b.isClosing && (b.wrap.removeClass('fancybox-tmp'), (d || 'load' === c || ('resize' === c && e.autoResize)) && b._setDimension(), ('scroll' === c && e.canShrink) || b.reposition(a), b.trigger('onUpdate'), (D = null));
          },
          d && !u ? 0 : 300
        ));
    },
    toggle: function (a) {
      b.isOpen && ((b.current.fitToView = 'boolean' === f.type(a) ? a : !b.current.fitToView), u && (b.wrap.removeAttr('style').addClass('fancybox-tmp'), b.trigger('onUpdate')), b.update());
    },
    hideLoading: function () {
      p.unbind('.loading');
      f('#fancybox-loading').remove();
    },
    showLoading: function () {
      var a, c;
      b.hideLoading();
      a = f(b.opts.tpl.loading).click(b.cancel).appendTo('body');
      p.bind('keydown.loading', function (a) {
        27 === (a.which || a.keyCode) && (a.preventDefault(), b.cancel());
      });
      b.defaults.fixed || ((c = b.getViewport()), a.css({ position: 'absolute', top: 0.5 * c.h + c.y, left: 0.5 * c.w + c.x }));
      b.trigger('onLoading');
    },
    getViewport: function () {
      var a = (b.current && b.current.locked) || !1,
        c = { x: q.scrollLeft(), y: q.scrollTop() };
      a && a.length ? ((c.w = a[0].clientWidth), (c.h = a[0].clientHeight)) : ((c.w = u && t.innerWidth ? t.innerWidth : q.width()), (c.h = u && t.innerHeight ? t.innerHeight : q.height()));
      return c;
    },
    unbindEvents: function () {
      b.wrap && v(b.wrap) && b.wrap.unbind('.fb');
      p.unbind('.fb');
      q.unbind('.fb');
    },
    bindEvents: function () {
      var a = b.current,
        c;
      a &&
        (q.bind('orientationchange.fb' + (u ? '' : ' resize.fb') + (a.autoCenter && !a.locked ? ' scroll.fb' : ''), b.update),
        (c = a.keys) &&
          p.bind('keydown.fb', function (d) {
            var e = d.which || d.keyCode,
              k = d.target || d.srcElement;
            if (27 === e && b.coming) return !1;
            d.ctrlKey ||
              d.altKey ||
              d.shiftKey ||
              d.metaKey ||
              (k && (k.type || f(k).is('[contenteditable]'))) ||
              f.each(c, function (c, k) {
                if (1 < a.group.length && k[e] !== x) return b[c](k[e]), d.preventDefault(), !1;
                if (-1 < f.inArray(e, k)) return b[c](), d.preventDefault(), !1;
              });
          }),
        f.fn.mousewheel &&
          a.mouseWheel &&
          b.wrap.bind('mousewheel.fb', function (c, e, k, g) {
            for (var d = f(c.target || null), h = !1; d.length && !(h || d.is('.fancybox-skin') || d.is('.fancybox-wrap')); )
              (h = (h = d[0]) && !(h.style.overflow && 'hidden' === h.style.overflow) && ((h.clientWidth && h.scrollWidth > h.clientWidth) || (h.clientHeight && h.scrollHeight > h.clientHeight))), (d = f(d).parent());
            0 !== e && !h && 1 < b.group.length && !a.canShrink && (0 < g || 0 < k ? b.prev(0 < g ? 'down' : 'left') : (0 > g || 0 > k) && b.next(0 > g ? 'up' : 'right'), c.preventDefault());
          }));
    },
    trigger: function (a, c) {
      var d,
        e = c || b.coming || b.current;
      if (e) {
        f.isFunction(e[a]) && (d = e[a].apply(e, Array.prototype.slice.call(arguments, 1)));
        if (!1 === d) return !1;
        e.helpers &&
          f.each(e.helpers, function (c, d) {
            if (d && b.helpers[c] && f.isFunction(b.helpers[c][a])) b.helpers[c][a](f.extend(!0, {}, b.helpers[c].defaults, d), e);
          });
      }
      p.trigger(a);
    },
    isImage: function (a) {
      return r(a) && a.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i);
    },
    isSWF: function (a) {
      return r(a) && a.match(/\.(swf)((\?|#).*)?$/i);
    },
    _start: function (a) {
      var c = {},
        d,
        e;
      a = m(a);
      d = b.group[a] || null;
      if (!d) return !1;
      c = f.extend(!0, {}, b.opts, d);
      d = c.margin;
      e = c.padding;
      'number' === f.type(d) && (c.margin = [d, d, d, d]);
      'number' === f.type(e) && (c.padding = [e, e, e, e]);
      c.modal && f.extend(!0, c, { closeBtn: !1, closeClick: !1, nextClick: !1, arrows: !1, mouseWheel: !1, keys: null, helpers: { overlay: { closeClick: !1 } } });
      c.autoSize && (c.autoWidth = c.autoHeight = !0);
      'auto' === c.width && (c.autoWidth = !0);
      'auto' === c.height && (c.autoHeight = !0);
      c.group = b.group;
      c.index = a;
      b.coming = c;
      if (!1 === b.trigger('beforeLoad')) b.coming = null;
      else {
        e = c.type;
        d = c.href;
        if (!e) return (b.coming = null), b.current && b.router && 'jumpto' !== b.router ? ((b.current.index = a), b[b.router](b.direction)) : !1;
        b.isActive = !0;
        if ('image' === e || 'swf' === e) (c.autoHeight = c.autoWidth = !1), (c.scrolling = 'visible');
        'image' === e && (c.aspectRatio = !0);
        'iframe' === e && u && (c.scrolling = 'scroll');
        c.wrap = f(c.tpl.wrap)
          .addClass('fancybox-' + (u ? 'mobile' : 'desktop') + ' fancybox-type-' + e + ' fancybox-tmp ' + c.wrapCSS)
          .appendTo(c.parent || 'body');
        f.extend(c, { skin: f('.fancybox-skin', c.wrap), outer: f('.fancybox-outer', c.wrap), inner: f('.fancybox-inner', c.wrap) });
        f.each(['Top', 'Right', 'Bottom', 'Left'], function (a, b) {
          c.skin.css('padding' + b, y(c.padding[a]));
        });
        b.trigger('onReady');
        if ('inline' === e || 'html' === e) {
          if (!c.content || !c.content.length) return b._error('content');
        } else if (!d) return b._error('href');
        'image' === e ? b._loadImage() : 'ajax' === e ? b._loadAjax() : 'iframe' === e ? b._loadIframe() : b._afterLoad();
      }
    },
    _error: function (a) {
      f.extend(b.coming, { type: 'html', autoWidth: !0, autoHeight: !0, minWidth: 0, minHeight: 0, scrolling: 'no', hasError: a, content: b.coming.tpl.error });
      b._afterLoad();
    },
    _loadImage: function () {
      var a = (b.imgPreload = new Image());
      a.onload = function () {
        this.onload = this.onerror = null;
        b.coming.width = this.width / b.opts.pixelRatio;
        b.coming.height = this.height / b.opts.pixelRatio;
        b._afterLoad();
      };
      a.onerror = function () {
        this.onload = this.onerror = null;
        b._error('image');
      };
      a.src = b.coming.href;
      !0 !== a.complete && b.showLoading();
    },
    _loadAjax: function () {
      var a = b.coming;
      b.showLoading();
      b.ajaxLoad = f.ajax(
        f.extend({}, a.ajax, {
          url: a.href,
          error: function (a, d) {
            b.coming && 'abort' !== d ? b._error('ajax', a) : b.hideLoading();
          },
          success: function (c, d) {
            'success' === d && ((a.content = c), b._afterLoad());
          },
        })
      );
    },
    _loadIframe: function () {
      var a = b.coming,
        c = f(a.tpl.iframe.replace(/\{rnd\}/g, new Date().getTime()))
          .attr('scrolling', u ? 'auto' : a.iframe.scrolling)
          .attr('src', a.href);
      f(a.wrap).bind('onReset', function () {
        try {
          f(this).find('iframe').hide().attr('src', '//about:blank').end().empty();
        } catch (d) {}
      });
      a.iframe.preload &&
        (b.showLoading(),
        c.one('load', function () {
          f(this).data('ready', 1);
          u || f(this).bind('load.fb', b.update);
          f(this).parents('.fancybox-wrap').width('100%').removeClass('fancybox-tmp').show();
          b._afterLoad();
        }));
      a.content = c.appendTo(a.inner);
      a.iframe.preload || b._afterLoad();
    },
    _preloadImages: function () {
      var a = b.group,
        c = b.current,
        d = a.length,
        e = c.preload ? Math.min(c.preload, d - 1) : 0,
        f,
        g;
      for (g = 1; g <= e; g += 1) (f = a[(c.index + g) % d]), 'image' === f.type && f.href && (new Image().src = f.href);
    },
    _afterLoad: function () {
      var a = b.coming,
        c = b.current,
        d,
        e,
        k,
        g,
        l;
      b.hideLoading();
      if (a && !1 !== b.isActive)
        if (!1 === b.trigger('afterLoad', a, c)) a.wrap.stop(!0).trigger('onReset').remove(), (b.coming = null);
        else {
          c && (b.trigger('beforeChange', c), c.wrap.stop(!0).removeClass('fancybox-opened').find('.fancybox-item, .fancybox-nav').remove());
          b.unbindEvents();
          d = a.content;
          e = a.type;
          k = a.scrolling;
          f.extend(b, { wrap: a.wrap, skin: a.skin, outer: a.outer, inner: a.inner, current: a, previous: c });
          g = a.href;
          switch (e) {
            case 'inline':
            case 'ajax':
            case 'html':
              a.selector
                ? (d = f('<div>').html(d).find(a.selector))
                : v(d) &&
                  (d.data('fancybox-placeholder') || d.data('fancybox-placeholder', f('<div class="fancybox-placeholder"></div>').insertAfter(d).hide()),
                  (d = d.show().detach()),
                  a.wrap.bind('onReset', function () {
                    f(this).find(d).length && d.hide().replaceAll(d.data('fancybox-placeholder')).data('fancybox-placeholder', !1);
                  }));
              break;
            case 'image':
              d = a.tpl.image.replace(/\{href\}/g, g);
              break;
            case 'swf':
              (d = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + g + '"></param>'),
                (l = ''),
                f.each(a.swf, function (a, b) {
                  d += '<param name="' + a + '" value="' + b + '"></param>';
                  l += ' ' + a + '="' + b + '"';
                }),
                (d += '<embed src="' + g + '" type="application/x-shockwave-flash" width="100%" height="100%"' + l + '></embed></object>');
          }
          (v(d) && d.parent().is(a.inner)) || a.inner.append(d);
          b.trigger('beforeShow');
          a.inner.css('overflow', 'yes' === k ? 'scroll' : 'no' === k ? 'hidden' : k);
          b._setDimension();
          b.reposition();
          b.isOpen = !1;
          b.coming = null;
          b.bindEvents();
          if (!b.isOpened) f('.fancybox-wrap').not(a.wrap).stop(!0).trigger('onReset').remove();
          else if (c.prevMethod) b.transitions[c.prevMethod]();
          b.transitions[b.isOpened ? a.nextMethod : a.openMethod]();
          b._preloadImages();
        }
    },
    _setDimension: function () {
      var a = b.getViewport(),
        c = 0,
        d,
        e = b.wrap,
        k = b.skin,
        g = b.inner,
        l = b.current;
      d = l.width;
      var h = l.height,
        n = l.minWidth,
        w = l.minHeight,
        p = l.maxWidth,
        q = l.maxHeight,
        u = l.scrolling,
        r = l.scrollOutside ? l.scrollbarWidth : 0,
        z = l.margin,
        A = m(z[1] + z[3]),
        t = m(z[0] + z[2]),
        x,
        B,
        v,
        E,
        C,
        H,
        D,
        F,
        I;
      e.add(k).add(g).width('auto').height('auto').removeClass('fancybox-tmp');
      z = m(k.outerWidth(!0) - k.width());
      x = m(k.outerHeight(!0) - k.height());
      B = A + z;
      v = t + x;
      E = G(d) ? ((a.w - B) * m(d)) / 100 : d;
      C = G(h) ? ((a.h - v) * m(h)) / 100 : h;
      if ('iframe' === l.type) {
        if (((I = l.content), l.autoHeight && I && 1 === I.data('ready')))
          try {
            I[0].contentWindow.document.location && (g.width(E).height(9999), (H = I.contents().find('body')), r && H.css('overflow-x', 'hidden'), (C = H.outerHeight(!0)));
          } catch (M) {}
      } else if (l.autoWidth || l.autoHeight) g.addClass('fancybox-tmp'), l.autoWidth || g.width(E), l.autoHeight || g.height(C), l.autoWidth && (E = g.width()), l.autoHeight && (C = g.height()), g.removeClass('fancybox-tmp');
      d = m(E);
      h = m(C);
      F = E / C;
      n = m(G(n) ? m(n, 'w') - B : n);
      p = m(G(p) ? m(p, 'w') - B : p);
      w = m(G(w) ? m(w, 'h') - v : w);
      q = m(G(q) ? m(q, 'h') - v : q);
      H = p;
      D = q;
      l.fitToView && ((p = Math.min(a.w - B, p)), (q = Math.min(a.h - v, q)));
      B = a.w - A;
      t = a.h - t;
      l.aspectRatio
        ? (d > p && ((d = p), (h = m(d / F))), h > q && ((h = q), (d = m(h * F))), d < n && ((d = n), (h = m(d / F))), h < w && ((h = w), (d = m(h * F))))
        : ((d = Math.max(n, Math.min(d, p))), l.autoHeight && 'iframe' !== l.type && (g.width(d), (h = g.height())), (h = Math.max(w, Math.min(h, q))));
      if (l.fitToView)
        if ((g.width(d).height(h), e.width(d + z), (a = e.width()), (A = e.height()), l.aspectRatio))
          for (; (a > B || A > t) && d > n && h > w && !(19 < c++); ) (h = Math.max(w, Math.min(q, h - 10))), (d = m(h * F)), d < n && ((d = n), (h = m(d / F))), d > p && ((d = p), (h = m(d / F))), g.width(d).height(h), e.width(d + z), (a = e.width()), (A = e.height());
        else (d = Math.max(n, Math.min(d, d - (a - B)))), (h = Math.max(w, Math.min(h, h - (A - t))));
      r && 'auto' === u && h < C && d + z + r < B && (d += r);
      g.width(d).height(h);
      e.width(d + z);
      a = e.width();
      A = e.height();
      c = (a > B || A > t) && d > n && h > w;
      d = l.aspectRatio ? d < H && h < D && d < E && h < C : (d < H || h < D) && (d < E || h < C);
      f.extend(l, { dim: { width: y(a), height: y(A) }, origWidth: E, origHeight: C, canShrink: c, canExpand: d, wPadding: z, hPadding: x, wrapSpace: A - k.outerHeight(!0), skinSpace: k.height() - h });
      !I && l.autoHeight && h > w && h < q && !d && g.height('auto');
    },
    _getPosition: function (a) {
      var c = b.current,
        d = b.getViewport(),
        e = c.margin,
        f = b.wrap.width() + e[1] + e[3],
        g = b.wrap.height() + e[0] + e[2],
        e = { position: 'absolute', top: e[0], left: e[3] };
      c.autoCenter && c.fixed && !a && g <= d.h && f <= d.w ? (e.position = 'fixed') : c.locked || ((e.top += d.y), (e.left += d.x));
      e.top = y(Math.max(e.top, e.top + (d.h - g) * c.topRatio));
      e.left = y(Math.max(e.left, e.left + (d.w - f) * c.leftRatio));
      return e;
    },
    _afterZoomIn: function () {
      var a = b.current;
      a &&
        (((b.isOpen = b.isOpened = !0),
        b.wrap.css('overflow', 'visible').addClass('fancybox-opened').hide().show(0),
        b.update(),
        (a.closeClick || (a.nextClick && 1 < b.group.length)) &&
          b.inner.css('cursor', 'pointer').bind('click.fb', function (c) {
            f(c.target).is('a') || f(c.target).parent().is('a') || (c.preventDefault(), b[a.closeClick ? 'close' : 'next']());
          }),
        a.closeBtn &&
          f(a.tpl.closeBtn)
            .appendTo(b.skin)
            .bind('click.fb', function (a) {
              a.preventDefault();
              b.close();
            }),
        a.arrows && 1 < b.group.length && ((a.loop || 0 < a.index) && f(a.tpl.prev).appendTo(b.outer).bind('click.fb', b.prev), (a.loop || a.index < b.group.length - 1) && f(a.tpl.next).appendTo(b.outer).bind('click.fb', b.next)),
        b.trigger('afterShow'),
        a.loop || a.index !== a.group.length - 1)
          ? b.opts.autoPlay && !b.player.isActive && ((b.opts.autoPlay = !1), b.play(!0))
          : b.play(!1));
    },
    _afterZoomOut: function (a) {
      a = a || b.current;
      f('.fancybox-wrap').trigger('onReset').remove();
      f.extend(b, { group: {}, opts: {}, router: !1, current: null, isActive: !1, isOpened: !1, isOpen: !1, isClosing: !1, wrap: null, skin: null, outer: null, inner: null });
      b.trigger('afterClose', a);
    },
  });
  b.transitions = {
    getOrigPosition: function () {
      var a = b.current,
        c = a.element,
        d = a.orig,
        e = {},
        f = 50,
        g = 50,
        l = a.hPadding,
        h = a.wPadding,
        n = b.getViewport();
      !d && a.isDom && c.is(':visible') && ((d = c.find('img:first')), d.length || (d = c));
      v(d) ? ((e = d.offset()), d.is('img') && ((f = d.outerWidth()), (g = d.outerHeight()))) : ((e.top = n.y + (n.h - g) * a.topRatio), (e.left = n.x + (n.w - f) * a.leftRatio));
      if ('fixed' === b.wrap.css('position') || a.locked) (e.top -= n.y), (e.left -= n.x);
      return (e = { top: y(e.top - l * a.topRatio), left: y(e.left - h * a.leftRatio), width: y(f + h), height: y(g + l) });
    },
    step: function (a, c) {
      var d,
        e,
        f = c.prop;
      e = b.current;
      var g = e.wrapSpace,
        l = e.skinSpace;
      if ('width' === f || 'height' === f) (d = c.end === c.start ? 1 : (a - c.start) / (c.end - c.start)), b.isClosing && (d = 1 - d), (e = 'width' === f ? e.wPadding : e.hPadding), (e = a - e), b.skin[f](m('width' === f ? e : e - g * d)), b.inner[f](m('width' === f ? e : e - g * d - l * d));
    },
    zoomIn: function () {
      var a = b.current,
        c = a.pos,
        d = a.openEffect,
        e = 'elastic' === d,
        k = f.extend({ opacity: 1 }, c);
      delete k.position;
      e ? ((c = this.getOrigPosition()), a.openOpacity && (c.opacity = 0.1)) : 'fade' === d && (c.opacity = 0.1);
      b.wrap.css(c).animate(k, { duration: 'none' === d ? 0 : a.openSpeed, easing: a.openEasing, step: e ? this.step : null, complete: b._afterZoomIn });
    },
    zoomOut: function () {
      var a = b.current,
        c = a.closeEffect,
        d = 'elastic' === c,
        e = { opacity: 0.1 };
      d && ((e = this.getOrigPosition()), a.closeOpacity && (e.opacity = 0.1));
      b.wrap.animate(e, { duration: 'none' === c ? 0 : a.closeSpeed, easing: a.closeEasing, step: d ? this.step : null, complete: b._afterZoomOut });
    },
    changeIn: function () {
      var a = b.current,
        c = a.nextEffect,
        d = a.pos,
        e = { opacity: 1 },
        f = b.direction,
        g;
      d.opacity = 0.1;
      'elastic' === c && ((g = 'down' === f || 'up' === f ? 'top' : 'left'), 'down' === f || 'right' === f ? ((d[g] = y(m(d[g]) - 200)), (e[g] = '+=200px')) : ((d[g] = y(m(d[g]) + 200)), (e[g] = '-=200px')));
      'none' === c ? b._afterZoomIn() : b.wrap.css(d).animate(e, { duration: a.nextSpeed, easing: a.nextEasing, complete: b._afterZoomIn });
    },
    changeOut: function () {
      var a = b.previous,
        c = a.prevEffect,
        d = { opacity: 0.1 },
        e = b.direction;
      'elastic' === c && (d['down' === e || 'up' === e ? 'top' : 'left'] = ('up' === e || 'left' === e ? '-' : '+') + '=200px');
      a.wrap.animate(d, {
        duration: 'none' === c ? 0 : a.prevSpeed,
        easing: a.prevEasing,
        complete: function () {
          f(this).trigger('onReset').remove();
        },
      });
    },
  };
  b.helpers.overlay = {
    defaults: { closeClick: !0, speedOut: 200, showEarly: !0, css: {}, locked: !u, fixed: !0 },
    overlay: null,
    fixed: !1,
    el: f('html'),
    create: function (a) {
      var c;
      a = f.extend({}, this.defaults, a);
      this.overlay && this.close();
      c = b.coming ? b.coming.parent : a.parent;
      this.overlay = f('<div class="fancybox-overlay"></div>').appendTo(c && c.length ? c : 'body');
      this.fixed = !1;
      a.fixed && b.defaults.fixed && (this.overlay.addClass('fancybox-overlay-fixed'), (this.fixed = !0));
    },
    open: function (a) {
      var c = this;
      a = f.extend({}, this.defaults, a);
      this.overlay ? this.overlay.unbind('.overlay').width('auto').height('auto') : this.create(a);
      this.fixed || (q.bind('resize.overlay', f.proxy(this.update, this)), this.update());
      a.closeClick &&
        this.overlay.bind('click.overlay', function (a) {
          if (f(a.target).hasClass('fancybox-overlay')) return b.isActive ? b.close() : c.close(), !1;
        });
      this.overlay.css(a.css).show();
    },
    close: function () {
      q.unbind('resize.overlay');
      this.el.hasClass('fancybox-lock') && (f('.fancybox-margin').removeClass('fancybox-margin'), this.el.removeClass('fancybox-lock'), q.scrollTop(this.scrollV).scrollLeft(this.scrollH));
      f('.fancybox-overlay').remove().hide();
      f.extend(this, { overlay: null, fixed: !1 });
    },
    update: function () {
      var a = '100%',
        b;
      this.overlay.width(a).height('100%');
      K ? ((b = Math.max(J.documentElement.offsetWidth, J.body.offsetWidth)), p.width() > b && (a = p.width())) : p.width() > q.width() && (a = p.width());
      this.overlay.width(a).height(p.height());
    },
    onReady: function (a, b) {
      var d = this.overlay;
      f('.fancybox-overlay').stop(!0, !0);
      d || this.create(a);
      a.locked && this.fixed && b.fixed && ((b.locked = this.overlay.append(b.wrap)), (b.fixed = !1));
      !0 === a.showEarly && this.beforeShow.apply(this, arguments);
    },
    beforeShow: function (a, b) {
      b.locked &&
        !this.el.hasClass('fancybox-lock') &&
        (!1 !== this.fixPosition &&
          f('*:not(object)')
            .filter(function () {
              return 'fixed' === f(this).css('position') && !f(this).hasClass('fancybox-overlay') && !f(this).hasClass('fancybox-wrap');
            })
            .addClass('fancybox-margin'),
        this.el.addClass('fancybox-margin'),
        (this.scrollV = q.scrollTop()),
        (this.scrollH = q.scrollLeft()),
        this.el.addClass('fancybox-lock'),
        q.scrollTop(this.scrollV).scrollLeft(this.scrollH));
      this.open(a);
    },
    onUpdate: function () {
      this.fixed || this.update();
    },
    afterClose: function (a) {
      this.overlay && !b.coming && this.overlay.fadeOut(a.speedOut, f.proxy(this.close, this));
    },
  };
  b.helpers.title = {
    defaults: { type: 'float', position: 'bottom' },
    beforeShow: function (a) {
      var c = b.current,
        d = c.title,
        e = a.type;
      f.isFunction(d) && (d = d.call(c.element, c));
      if (r(d) && '' !== f.trim(d)) {
        c = f('<div class="fancybox-title fancybox-title-' + e + '-wrap">' + d + '</div>');
        switch (e) {
          case 'inside':
            e = b.skin;
            break;
          case 'outside':
            e = b.wrap;
            break;
          case 'over':
            e = b.inner;
            break;
          default:
            (e = b.skin), c.appendTo('body'), K && c.width(c.width()), c.wrapInner('<span class="child"></span>'), (b.current.margin[2] += Math.abs(m(c.css('margin-bottom'))));
        }
        c['top' === a.position ? 'prependTo' : 'appendTo'](e);
      }
    },
  };
  f.fn.fancybox = function (a) {
    var c,
      d = f(this),
      e = this.selector || '',
      k = function (g) {
        var l = f(this).blur(),
          h = c,
          k,
          m;
        g.ctrlKey ||
          g.altKey ||
          g.shiftKey ||
          g.metaKey ||
          l.is('.fancybox-wrap') ||
          ((k = a.groupAttr || 'data-fancybox-group'), (m = l.attr(k)), m || ((k = 'rel'), (m = l.get(0)[k])), m && '' !== m && 'nofollow' !== m && ((l = e.length ? f(e) : d), (l = l.filter('[' + k + '="' + m + '"]')), (h = l.index(this))), (a.index = h), !1 !== b.open(l, a) && g.preventDefault());
      };
    a = a || {};
    c = a.index || 0;
    e && !1 !== a.live ? p.undelegate(e, 'click.fb-start').delegate(e + ":not('.fancybox-item, .fancybox-nav')", 'click.fb-start', k) : d.unbind('click.fb-start').bind('click.fb-start', k);
    this.filter('[data-fancybox-start=1]').trigger('click');
    return this;
  };
  p.ready(function () {
    var a, c;
    f.scrollbarWidth === x &&
      (f.scrollbarWidth = function () {
        var a = f('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body'),
          b = a.children(),
          b = b.innerWidth() - b.height(99).innerWidth();
        a.remove();
        return b;
      });
    f.support.fixedPosition === x &&
      (f.support.fixedPosition = (function () {
        var a = f('<div style="position:fixed;top:20px;"></div>').appendTo('body'),
          b = 20 === a[0].offsetTop || 15 === a[0].offsetTop;
        a.remove();
        return b;
      })());
    f.extend(b.defaults, { scrollbarWidth: f.scrollbarWidth(), fixed: f.support.fixedPosition, parent: f('body') });
    a = f(t).width();
    L.addClass('fancybox-lock-test');
    c = f(t).width();
    L.removeClass('fancybox-lock-test');
    f("<style type='text/css'>.fancybox-margin{margin-right:" + (c - a) + 'px;}</style>').appendTo('head');
  });
})(window, document, window.jQuery);
