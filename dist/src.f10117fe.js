// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }
  return bundleURL;
}
function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }
  return '/';
}
function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"node_modules/@rive-app/webgl2-advanced/webgl2_advanced.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var Rive = (() => {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
  return function (moduleArg = {}) {
    var n = moduleArg,
      aa,
      ba;
    n.ready = new Promise((a, b) => {
      aa = a;
      ba = b;
    });
    function ca() {
      function a(g) {
        const m = d;
        c = b = 0;
        d = new Map();
        m.forEach(p => {
          try {
            p(g);
          } catch (l) {
            console.error(l);
          }
        });
        this.ib();
        e && e.Kb();
      }
      let b = 0,
        c = 0,
        d = new Map(),
        e = null,
        f = null;
      this.requestAnimationFrame = function (g) {
        b || (b = requestAnimationFrame(a.bind(this)));
        const m = ++c;
        d.set(m, g);
        return m;
      };
      this.cancelAnimationFrame = function (g) {
        d.delete(g);
        b && 0 == d.size && (cancelAnimationFrame(b), b = 0);
      };
      this.Ib = function (g) {
        f && (document.body.remove(f), f = null);
        g || (f = document.createElement("div"), f.style.backgroundColor = "black", f.style.position = "fixed", f.style.right = 0, f.style.top = 0, f.style.color = "white", f.style.padding = "4px", f.innerHTML = "RIVE FPS", g = function (m) {
          f.innerHTML = "RIVE FPS " + m.toFixed(1);
        }, document.body.appendChild(f));
        e = new function () {
          let m = 0,
            p = 0;
          this.Kb = function () {
            var l = performance.now();
            p ? (++m, l -= p, 1000 < l && (g(1000 * m / l), m = p = 0)) : (p = l, m = 0);
          };
        }();
      };
      this.ib = function () {};
    }
    function da() {
      console.assert(!0);
      const a = new Map();
      let b = -Infinity;
      this.push = function (c) {
        c = c + 255 >> 8;
        a.has(c) && clearTimeout(a.get(c));
        a.set(c, setTimeout(function () {
          a.delete(c);
          0 == a.length ? b = -Infinity : c == b && (b = Math.max(...a.keys()), console.assert(b < c));
        }, 1000));
        b = Math.max(c, b);
        return b << 8;
      };
    }
    const ea = n.onRuntimeInitialized;
    n.onRuntimeInitialized = function () {
      ea && ea();
      let a = n.decodeAudio;
      n.decodeAudio = function (d, e) {
        d = a(d);
        e(d);
      };
      let b = n.decodeFont;
      n.decodeFont = function (d, e) {
        d = b(d);
        e(d);
      };
      const c = n.FileAssetLoader;
      n.ptrToAsset = d => {
        let e = n.ptrToFileAsset(d);
        return e.isImage ? n.ptrToImageAsset(d) : e.isFont ? n.ptrToFontAsset(d) : e.isAudio ? n.ptrToAudioAsset(d) : e;
      };
      n.CustomFileAssetLoader = c.extend("CustomFileAssetLoader", {
        __construct: function ({
          loadContents: d
        }) {
          this.__parent.__construct.call(this);
          this.zb = d;
        },
        loadContents: function (d, e) {
          d = n.ptrToAsset(d);
          return this.zb(d, e);
        }
      });
      n.CDNFileAssetLoader = c.extend("CDNFileAssetLoader", {
        __construct: function () {
          this.__parent.__construct.call(this);
        },
        loadContents: function (d) {
          let e = n.ptrToAsset(d);
          d = e.cdnUuid;
          if ("" === d) {
            return !1;
          }
          (function (f, g) {
            var m = new XMLHttpRequest();
            m.responseType = "arraybuffer";
            m.onreadystatechange = function () {
              4 == m.readyState && 200 == m.status && g(m);
            };
            m.open("GET", f, !0);
            m.send(null);
          })(e.cdnBaseUrl + "/" + d, f => {
            e.decode(new Uint8Array(f.response));
          });
          return !0;
        }
      });
      n.FallbackFileAssetLoader = c.extend("FallbackFileAssetLoader", {
        __construct: function () {
          this.__parent.__construct.call(this);
          this.eb = [];
        },
        addLoader: function (d) {
          this.eb.push(d);
        },
        loadContents: function (d, e) {
          for (let f of this.eb) {
            if (f.loadContents(d, e)) {
              return !0;
            }
          }
          return !1;
        }
      });
    };
    const fa = n.onRuntimeInitialized;
    n.onRuntimeInitialized = function () {
      function a(q) {
        this.F = q;
        this.xb = q.getContext("2d");
        this.Bb = d;
        this.S = [];
        this.la = 0;
        this.clear = function () {
          console.assert(0 == this.la);
          this.S = [];
          e.delete(this);
        };
        this.save = function () {
          ++this.la;
          this.S.push(d.save.bind(d));
        };
        this.restore = function () {
          0 < this.la && (this.S.push(d.restore.bind(d)), --this.la);
        };
        this.transform = function (k) {
          this.S.push(d.transform.bind(d, k));
        };
        this.align = function (k, r, w, y) {
          this.S.push(d.align.bind(d, k, r, w, y));
        };
        this.flush = function () {
          console.assert(0 == this.la);
          e.add(this);
          d.Ja || c();
        };
      }
      function b(q, k = !1) {
        var r = {
          alpha: !0,
          depth: k,
          stencil: k,
          antialias: k,
          premultipliedAlpha: !0,
          preserveDrawingBuffer: 0,
          preferLowPowerToHighPerformance: 0,
          failIfMajorPerformanceCaveat: 0,
          enableExtensionsByDefault: !1,
          explicitSwapControl: 0,
          renderViaOffscreenBackBuffer: 0
        };
        k = q.getContext("webgl2", r);
        if (!k) {
          return null;
        }
        var w = ha(t),
          y = {
            handle: w,
            attributes: r,
            version: r.Cc,
            H: k
          };
        k.canvas && (k.canvas.nc = y);
        t[w] = y;
        ("undefined" == typeof r.Hb || r.Hb) && ia(y);
        ja(w);
        r = f(q.width, q.height);
        r.yb = w;
        r.F = q;
        r.Ua = q.width;
        r.Ta = q.height;
        r.ka = k;
        return r;
      }
      function c() {
        if (d) {
          var q = d.Ab,
            k = 0,
            r = 0,
            w = 0,
            y = Array(e.size),
            E = 0;
          for (var z of e) {
            z.ea = Math.min(z.F.width, q), z.da = Math.min(z.F.height, q), z.Ia = z.da * z.ea, k = Math.max(k, z.ea), r = Math.max(r, z.da), w += z.Ia, y[E++] = z;
          }
          e.clear();
          if (!(0 >= w)) {
            k = 1 << (0 >= k ? 0 : 32 - Math.clz32(k - 1));
            for (r = 1 << (0 >= r ? 0 : 32 - Math.clz32(r - 1)); r * k < w;) {
              k <= r ? k *= 2 : r *= 2;
            }
            k = Math.min(k, q);
            k = Math.min(r, q);
            y.sort((Y, qb) => qb.Ia - Y.Ia);
            w = new n.DynamicRectanizer(q);
            for (z = 0; z < y.length;) {
              w.reset(k, r);
              for (E = z; E < y.length; ++E) {
                var F = y[E],
                  D = w.addRect(F.ea, F.da);
                if (0 > D) {
                  console.assert(E > z);
                  break;
                }
                F.ra = D & 65535;
                F.sa = D >> 16;
              }
              F = m.push(w.drawWidth());
              D = p.push(w.drawHeight());
              console.assert(F >= w.drawWidth());
              console.assert(D >= w.drawHeight());
              console.assert(F <= q);
              console.assert(D <= q);
              d.F.width != F && (d.F.width = F);
              d.F.height != D && (d.F.height = D);
              d.clear();
              for (F = z; F < E; ++F) {
                D = y[F];
                d.saveClipRect(D.ra, D.sa, D.ra + D.ea, D.sa + D.da);
                let Y = new n.Mat2D();
                Y.xx = D.ea / D.F.width;
                Y.yy = D.da / D.F.height;
                Y.xy = Y.yx = 0;
                Y.tx = D.ra;
                Y.ty = D.sa;
                d.transform(Y);
                for (const qb of D.S) {
                  qb();
                }
                d.restoreClipRect();
                D.S = [];
              }
              for (d.flush(); z < E; ++z) {
                F = y[z], D = F.xb, D.globalCompositeOperation = "copy", D.drawImage(d.F, F.ra, F.sa, F.ea, F.da, 0, 0, F.F.width, F.F.height);
              }
              z = E;
            }
          }
        }
      }
      fa && fa();
      let d = null;
      const e = new Set(),
        f = n.makeRenderer;
      n.makeRenderer = function (q, k) {
        if (!d) {
          function r(w) {
            const y = document.createElement("canvas");
            y.width = 1;
            y.height = 1;
            d = b(y, w);
            d.Ja = !!d.ka.getExtension("WEBGL_shader_pixel_local_storage");
            d.Ab = Math.min(d.ka.getParameter(d.ka.MAX_RENDERBUFFER_SIZE), d.ka.getParameter(d.ka.MAX_TEXTURE_SIZE));
            return d;
          }
          d = r(!0);
          d.Ja && (d = r(!1));
        }
        return k ? new a(q) : b(q, !d.Ja);
      };
      const g = n.Artboard.prototype.draw;
      n.Artboard.prototype.draw = function (q) {
        q.S ? q.S.push(g.bind(this, q.Bb)) : g.call(this, q);
      };
      const m = new da(),
        p = new da(),
        l = new ca();
      n.requestAnimationFrame = l.requestAnimationFrame.bind(l);
      n.cancelAnimationFrame = l.cancelAnimationFrame.bind(l);
      n.enableFPSCounter = l.Ib.bind(l);
      l.ib = c;
      n.resolveAnimationFrame = c;
      let u = n.load;
      n.load = function (q, k, r = !0) {
        const w = new n.FallbackFileAssetLoader();
        void 0 !== k && w.addLoader(k);
        r && (k = new n.CDNFileAssetLoader(), w.addLoader(k));
        return Promise.resolve(u(q, w));
      };
      const v = n.WebGL2Renderer.prototype.clear;
      n.WebGL2Renderer.prototype.clear = function () {
        ja(this.yb);
        const q = this.F;
        if (this.Ua != q.width || this.Ta != q.height) {
          this.resize(q.width, q.height), this.Ua = q.width, this.Ta = q.height;
        }
        v.call(this);
      };
      n.decodeImage = function (q, k) {
        q = n.decodeWebGL2Image(q);
        k(q);
      };
    };
    var ka = Object.assign({}, n),
      la = "./this.program",
      ma = "object" == typeof window,
      na = "function" == typeof importScripts,
      x = "",
      oa,
      pa;
    if (ma || na) {
      na ? x = self.location.href : "undefined" != typeof document && document.currentScript && (x = document.currentScript.src), _scriptDir && (x = _scriptDir), 0 !== x.indexOf("blob:") ? x = x.substr(0, x.replace(/[?#].*/, "").lastIndexOf("/") + 1) : x = "", na && (pa = a => {
        var b = new XMLHttpRequest();
        b.open("GET", a, !1);
        b.responseType = "arraybuffer";
        b.send(null);
        return new Uint8Array(b.response);
      }), oa = (a, b, c) => {
        var d = new XMLHttpRequest();
        d.open("GET", a, !0);
        d.responseType = "arraybuffer";
        d.onload = () => {
          200 == d.status || 0 == d.status && d.response ? b(d.response) : c();
        };
        d.onerror = c;
        d.send(null);
      };
    }
    var qa = n.print || console.log.bind(console),
      A = n.printErr || console.error.bind(console);
    Object.assign(n, ka);
    ka = null;
    n.thisProgram && (la = n.thisProgram);
    var ra;
    n.wasmBinary && (ra = n.wasmBinary);
    var noExitRuntime = n.noExitRuntime || !0;
    "object" != typeof WebAssembly && sa("no native wasm support detected");
    var ta,
      B,
      ua = !1,
      C,
      G,
      H,
      va,
      I,
      J,
      wa,
      xa;
    function ya() {
      var a = ta.buffer;
      n.HEAP8 = C = new Int8Array(a);
      n.HEAP16 = H = new Int16Array(a);
      n.HEAP32 = I = new Int32Array(a);
      n.HEAPU8 = G = new Uint8Array(a);
      n.HEAPU16 = va = new Uint16Array(a);
      n.HEAPU32 = J = new Uint32Array(a);
      n.HEAPF32 = wa = new Float32Array(a);
      n.HEAPF64 = xa = new Float64Array(a);
    }
    var za,
      Aa = [],
      Ba = [],
      Ca = [];
    function Da() {
      var a = n.preRun.shift();
      Aa.unshift(a);
    }
    var Ea = 0,
      Fa = null,
      Ga = null;
    function sa(a) {
      if (n.onAbort) {
        n.onAbort(a);
      }
      a = "Aborted(" + a + ")";
      A(a);
      ua = !0;
      a = new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");
      ba(a);
      throw a;
    }
    function Ha(a) {
      return a.startsWith("data:application/octet-stream;base64,");
    }
    var Ia;
    Ia = "webgl2_advanced.wasm";
    if (!Ha(Ia)) {
      var Ja = Ia;
      Ia = n.locateFile ? n.locateFile(Ja, x) : x + Ja;
    }
    function Ka(a) {
      if (a == Ia && ra) {
        return new Uint8Array(ra);
      }
      if (pa) {
        return pa(a);
      }
      throw "both async and sync fetching of the wasm failed";
    }
    function La(a) {
      if (!ra && (ma || na)) {
        if ("function" == typeof fetch && !a.startsWith("file://")) {
          return fetch(a, {
            credentials: "same-origin"
          }).then(b => {
            if (!b.ok) {
              throw "failed to load wasm binary file at '" + a + "'";
            }
            return b.arrayBuffer();
          }).catch(() => Ka(a));
        }
        if (oa) {
          return new Promise((b, c) => {
            oa(a, d => b(new Uint8Array(d)), c);
          });
        }
      }
      return Promise.resolve().then(() => Ka(a));
    }
    function Ma(a, b, c) {
      return La(a).then(d => WebAssembly.instantiate(d, b)).then(d => d).then(c, d => {
        A("failed to asynchronously prepare wasm: " + d);
        sa(d);
      });
    }
    function Na(a, b) {
      var c = Ia;
      return ra || "function" != typeof WebAssembly.instantiateStreaming || Ha(c) || c.startsWith("file://") || "function" != typeof fetch ? Ma(c, a, b) : fetch(c, {
        credentials: "same-origin"
      }).then(d => WebAssembly.instantiateStreaming(d, a).then(b, function (e) {
        A("wasm streaming compile failed: " + e);
        A("falling back to ArrayBuffer instantiation");
        return Ma(c, a, b);
      }));
    }
    var Oa,
      Pa,
      Ta = {
        482788: (a, b, c, d, e) => {
          if ("undefined" === typeof window || void 0 === (window.AudioContext || window.webkitAudioContext)) {
            return 0;
          }
          if ("undefined" === typeof window.h) {
            window.h = {
              Da: 0
            };
            window.h.I = {};
            window.h.I.Ba = a;
            window.h.I.capture = b;
            window.h.I.La = c;
            window.h.ha = {};
            window.h.ha.stopped = d;
            window.h.ha.rb = e;
            let f = window.h;
            f.C = [];
            f.lc = function (g) {
              for (var m = 0; m < f.C.length; ++m) {
                if (null == f.C[m]) {
                  return f.C[m] = g, m;
                }
              }
              f.C.push(g);
              return f.C.length - 1;
            };
            f.wb = function (g) {
              for (f.C[g] = null; 0 < f.C.length;) {
                if (null == f.C[f.C.length - 1]) {
                  f.C.pop();
                } else {
                  break;
                }
              }
            };
            f.Nc = function (g) {
              for (var m = 0; m < f.C.length; ++m) {
                if (f.C[m] == g) {
                  return f.wb(m);
                }
              }
            };
            f.va = function (g) {
              return f.C[g];
            };
            f.vb = ["touchend", "click"];
            f.unlock = function () {
              for (var g = 0; g < f.C.length; ++g) {
                var m = f.C[g];
                null != m && null != m.J && m.state === f.ha.rb && m.J.resume().then(() => {
                  Qa(m.jb);
                }, p => {
                  console.error("Failed to resume audiocontext", p);
                });
              }
              f.vb.map(function (p) {
                document.removeEventListener(p, f.unlock, !0);
              });
            };
            f.vb.map(function (g) {
              document.addEventListener(g, f.unlock, !0);
            });
          }
          window.h.Da += 1;
          return 1;
        },
        484966: () => {
          "undefined" !== typeof window.h && (--window.h.Da, 0 === window.h.Da && delete window.h);
        },
        485130: () => void 0 !== navigator.mediaDevices && void 0 !== navigator.mediaDevices.getUserMedia,
        485234: () => {
          try {
            var a = new (window.AudioContext || window.webkitAudioContext)(),
              b = a.sampleRate;
            a.close();
            return b;
          } catch (c) {
            return 0;
          }
        },
        485405: (a, b, c, d, e, f) => {
          if ("undefined" === typeof window.h) {
            return -1;
          }
          var g = {},
            m = {};
          a == window.h.I.Ba && 0 != c && (m.sampleRate = c);
          g.J = new (window.AudioContext || window.webkitAudioContext)(m);
          g.J.suspend();
          g.state = window.h.ha.stopped;
          c = 0;
          a != window.h.I.Ba && (c = b);
          g.Y = g.J.createScriptProcessor(d, c, b);
          g.Y.onaudioprocess = function (p) {
            if (null == g.wa || 0 == g.wa.length) {
              g.wa = new Float32Array(wa.buffer, e, d * b);
            }
            if (a == window.h.I.capture || a == window.h.I.La) {
              for (var l = 0; l < b; l += 1) {
                for (var u = p.inputBuffer.getChannelData(l), v = g.wa, q = 0; q < d; q += 1) {
                  v[q * b + l] = u[q];
                }
              }
              Ra(f, d, e);
            }
            if (a == window.h.I.Ba || a == window.h.I.La) {
              for (Sa(f, d, e), l = 0; l < p.outputBuffer.numberOfChannels; ++l) {
                for (u = p.outputBuffer.getChannelData(l), v = g.wa, q = 0; q < d; q += 1) {
                  u[q] = v[q * b + l];
                }
              }
            } else {
              for (l = 0; l < p.outputBuffer.numberOfChannels; ++l) {
                p.outputBuffer.getChannelData(l).fill(0.0);
              }
            }
          };
          a != window.h.I.capture && a != window.h.I.La || navigator.mediaDevices.getUserMedia({
            audio: !0,
            video: !1
          }).then(function (p) {
            g.Ea = g.J.createMediaStreamSource(p);
            g.Ea.connect(g.Y);
            g.Y.connect(g.J.destination);
          }).catch(function (p) {
            console.log("Failed to get user media: " + p);
          });
          a == window.h.I.Ba && g.Y.connect(g.J.destination);
          g.jb = f;
          return window.h.lc(g);
        },
        488282: a => window.h.va(a).J.sampleRate,
        488355: a => {
          a = window.h.va(a);
          void 0 !== a.Y && (a.Y.onaudioprocess = function () {}, a.Y.disconnect(), a.Y = void 0);
          void 0 !== a.Ea && (a.Ea.disconnect(), a.Ea = void 0);
          a.J.close();
          a.J = void 0;
          a.jb = void 0;
        },
        488755: a => {
          window.h.wb(a);
        },
        488805: a => {
          a = window.h.va(a);
          a.J.resume();
          a.state = window.h.ha.rb;
        },
        488944: a => {
          a = window.h.va(a);
          a.J.suspend();
          a.state = window.h.ha.stopped;
        }
      },
      Ua = a => {
        for (; 0 < a.length;) {
          a.shift()(n);
        }
      },
      Va = (a, b) => {
        for (var c = 0, d = a.length - 1; 0 <= d; d--) {
          var e = a[d];
          "." === e ? a.splice(d, 1) : ".." === e ? (a.splice(d, 1), c++) : c && (a.splice(d, 1), c--);
        }
        if (b) {
          for (; c; c--) {
            a.unshift("..");
          }
        }
        return a;
      },
      Wa = a => {
        var b = "/" === a.charAt(0),
          c = "/" === a.substr(-1);
        (a = Va(a.split("/").filter(d => !!d), !b).join("/")) || b || (a = ".");
        a && c && (a += "/");
        return (b ? "/" : "") + a;
      },
      Xa = a => {
        var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);
        a = b[0];
        b = b[1];
        if (!a && !b) {
          return ".";
        }
        b && (b = b.substr(0, b.length - 1));
        return a + b;
      },
      Ya = a => {
        if ("/" === a) {
          return "/";
        }
        a = Wa(a);
        a = a.replace(/\/$/, "");
        var b = a.lastIndexOf("/");
        return -1 === b ? a : a.substr(b + 1);
      },
      Za = () => {
        if ("object" == typeof crypto && "function" == typeof crypto.getRandomValues) {
          return a => crypto.getRandomValues(a);
        }
        sa("initRandomDevice");
      },
      $a = a => ($a = Za())(a);
    function ab() {
      for (var a = "", b = !1, c = arguments.length - 1; -1 <= c && !b; c--) {
        b = 0 <= c ? arguments[c] : "/";
        if ("string" != typeof b) {
          throw new TypeError("Arguments to path.resolve must be strings");
        }
        if (!b) {
          return "";
        }
        a = b + "/" + a;
        b = "/" === b.charAt(0);
      }
      a = Va(a.split("/").filter(d => !!d), !b).join("/");
      return (b ? "/" : "") + a || ".";
    }
    var bb = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0,
      K = (a, b, c) => {
        var d = b + c;
        for (c = b; a[c] && !(c >= d);) {
          ++c;
        }
        if (16 < c - b && a.buffer && bb) {
          return bb.decode(a.subarray(b, c));
        }
        for (d = ""; b < c;) {
          var e = a[b++];
          if (e & 128) {
            var f = a[b++] & 63;
            if (192 == (e & 224)) {
              d += String.fromCharCode((e & 31) << 6 | f);
            } else {
              var g = a[b++] & 63;
              e = 224 == (e & 240) ? (e & 15) << 12 | f << 6 | g : (e & 7) << 18 | f << 12 | g << 6 | a[b++] & 63;
              65536 > e ? d += String.fromCharCode(e) : (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023));
            }
          } else {
            d += String.fromCharCode(e);
          }
        }
        return d;
      },
      cb = [],
      db = a => {
        for (var b = 0, c = 0; c < a.length; ++c) {
          var d = a.charCodeAt(c);
          127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, ++c) : b += 3;
        }
        return b;
      },
      eb = (a, b, c, d) => {
        if (!(0 < d)) {
          return 0;
        }
        var e = c;
        d = c + d - 1;
        for (var f = 0; f < a.length; ++f) {
          var g = a.charCodeAt(f);
          if (55296 <= g && 57343 >= g) {
            var m = a.charCodeAt(++f);
            g = 65536 + ((g & 1023) << 10) | m & 1023;
          }
          if (127 >= g) {
            if (c >= d) {
              break;
            }
            b[c++] = g;
          } else {
            if (2047 >= g) {
              if (c + 1 >= d) {
                break;
              }
              b[c++] = 192 | g >> 6;
            } else {
              if (65535 >= g) {
                if (c + 2 >= d) {
                  break;
                }
                b[c++] = 224 | g >> 12;
              } else {
                if (c + 3 >= d) {
                  break;
                }
                b[c++] = 240 | g >> 18;
                b[c++] = 128 | g >> 12 & 63;
              }
              b[c++] = 128 | g >> 6 & 63;
            }
            b[c++] = 128 | g & 63;
          }
        }
        b[c] = 0;
        return c - e;
      };
    function fb(a, b) {
      var c = Array(db(a) + 1);
      a = eb(a, c, 0, c.length);
      b && (c.length = a);
      return c;
    }
    var gb = [];
    function hb(a, b) {
      gb[a] = {
        input: [],
        D: [],
        U: b
      };
      ib(a, jb);
    }
    var jb = {
        open: function (a) {
          var b = gb[a.node.Ca];
          if (!b) {
            throw new L(43);
          }
          a.s = b;
          a.seekable = !1;
        },
        close: function (a) {
          a.s.U.ua(a.s);
        },
        ua: function (a) {
          a.s.U.ua(a.s);
        },
        read: function (a, b, c, d) {
          if (!a.s || !a.s.U.cb) {
            throw new L(60);
          }
          for (var e = 0, f = 0; f < d; f++) {
            try {
              var g = a.s.U.cb(a.s);
            } catch (m) {
              throw new L(29);
            }
            if (void 0 === g && 0 === e) {
              throw new L(6);
            }
            if (null === g || void 0 === g) {
              break;
            }
            e++;
            b[c + f] = g;
          }
          e && (a.node.timestamp = Date.now());
          return e;
        },
        write: function (a, b, c, d) {
          if (!a.s || !a.s.U.Oa) {
            throw new L(60);
          }
          try {
            for (var e = 0; e < d; e++) {
              a.s.U.Oa(a.s, b[c + e]);
            }
          } catch (f) {
            throw new L(29);
          }
          d && (a.node.timestamp = Date.now());
          return e;
        }
      },
      kb = {
        cb: function () {
          a: {
            if (!cb.length) {
              var a = null;
              "undefined" != typeof window && "function" == typeof window.prompt ? (a = window.prompt("Input: "), null !== a && (a += "\n")) : "function" == typeof readline && (a = readline(), null !== a && (a += "\n"));
              if (!a) {
                a = null;
                break a;
              }
              cb = fb(a, !0);
            }
            a = cb.shift();
          }
          return a;
        },
        Oa: function (a, b) {
          null === b || 10 === b ? (qa(K(a.D, 0)), a.D = []) : 0 != b && a.D.push(b);
        },
        ua: function (a) {
          a.D && 0 < a.D.length && (qa(K(a.D, 0)), a.D = []);
        },
        Ub: function () {
          return {
            sc: 25856,
            uc: 5,
            rc: 191,
            tc: 35387,
            qc: [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          };
        },
        Vb: function () {
          return 0;
        },
        Wb: function () {
          return [24, 80];
        }
      },
      lb = {
        Oa: function (a, b) {
          null === b || 10 === b ? (A(K(a.D, 0)), a.D = []) : 0 != b && a.D.push(b);
        },
        ua: function (a) {
          a.D && 0 < a.D.length && (A(K(a.D, 0)), a.D = []);
        }
      };
    function mb(a, b) {
      var c = a.j ? a.j.length : 0;
      c >= b || (b = Math.max(b, c * (1048576 > c ? 2.0 : 1.125) >>> 0), 0 != c && (b = Math.max(b, 256)), c = a.j, a.j = new Uint8Array(b), 0 < a.v && a.j.set(c.subarray(0, a.v), 0));
    }
    var M = {
      O: null,
      T() {
        return M.createNode(null, "/", 16895, 0);
      },
      createNode(a, b, c, d) {
        if (24576 === (c & 61440) || 4096 === (c & 61440)) {
          throw new L(63);
        }
        M.O || (M.O = {
          dir: {
            node: {
              X: M.l.X,
              P: M.l.P,
              ma: M.l.ma,
              za: M.l.za,
              pb: M.l.pb,
              ub: M.l.ub,
              qb: M.l.qb,
              nb: M.l.nb,
              Fa: M.l.Fa
            },
            stream: {
              aa: M.m.aa
            }
          },
          file: {
            node: {
              X: M.l.X,
              P: M.l.P
            },
            stream: {
              aa: M.m.aa,
              read: M.m.read,
              write: M.m.write,
              ta: M.m.ta,
              fb: M.m.fb,
              hb: M.m.hb
            }
          },
          link: {
            node: {
              X: M.l.X,
              P: M.l.P,
              na: M.l.na
            },
            stream: {}
          },
          Va: {
            node: {
              X: M.l.X,
              P: M.l.P
            },
            stream: nb
          }
        });
        c = ob(a, b, c, d);
        16384 === (c.mode & 61440) ? (c.l = M.O.dir.node, c.m = M.O.dir.stream, c.j = {}) : 32768 === (c.mode & 61440) ? (c.l = M.O.file.node, c.m = M.O.file.stream, c.v = 0, c.j = null) : 40960 === (c.mode & 61440) ? (c.l = M.O.link.node, c.m = M.O.link.stream) : 8192 === (c.mode & 61440) && (c.l = M.O.Va.node, c.m = M.O.Va.stream);
        c.timestamp = Date.now();
        a && (a.j[b] = c, a.timestamp = c.timestamp);
        return c;
      },
      zc(a) {
        return a.j ? a.j.subarray ? a.j.subarray(0, a.v) : new Uint8Array(a.j) : new Uint8Array(0);
      },
      l: {
        X(a) {
          var b = {};
          b.xc = 8192 === (a.mode & 61440) ? a.id : 1;
          b.Bc = a.id;
          b.mode = a.mode;
          b.Jc = 1;
          b.uid = 0;
          b.Ac = 0;
          b.Ca = a.Ca;
          16384 === (a.mode & 61440) ? b.size = 4096 : 32768 === (a.mode & 61440) ? b.size = a.v : 40960 === (a.mode & 61440) ? b.size = a.link.length : b.size = 0;
          b.oc = new Date(a.timestamp);
          b.Hc = new Date(a.timestamp);
          b.vc = new Date(a.timestamp);
          b.Cb = 4096;
          b.pc = Math.ceil(b.size / b.Cb);
          return b;
        },
        P(a, b) {
          void 0 !== b.mode && (a.mode = b.mode);
          void 0 !== b.timestamp && (a.timestamp = b.timestamp);
          if (void 0 !== b.size && (b = b.size, a.v != b)) {
            if (0 == b) {
              a.j = null, a.v = 0;
            } else {
              var c = a.j;
              a.j = new Uint8Array(b);
              c && a.j.set(c.subarray(0, Math.min(b, a.v)));
              a.v = b;
            }
          }
        },
        ma() {
          throw pb[44];
        },
        za(a, b, c, d) {
          return M.createNode(a, b, c, d);
        },
        pb(a, b, c) {
          if (16384 === (a.mode & 61440)) {
            try {
              var d = rb(b, c);
            } catch (f) {}
            if (d) {
              for (var e in d.j) {
                throw new L(55);
              }
            }
          }
          delete a.parent.j[a.name];
          a.parent.timestamp = Date.now();
          a.name = c;
          b.j[c] = a;
          b.timestamp = a.parent.timestamp;
          a.parent = b;
        },
        ub(a, b) {
          delete a.j[b];
          a.timestamp = Date.now();
        },
        qb(a, b) {
          var c = rb(a, b),
            d;
          for (d in c.j) {
            throw new L(55);
          }
          delete a.j[b];
          a.timestamp = Date.now();
        },
        nb(a) {
          var b = [".", ".."],
            c;
          for (c in a.j) {
            a.j.hasOwnProperty(c) && b.push(c);
          }
          return b;
        },
        Fa(a, b, c) {
          a = M.createNode(a, b, 41471, 0);
          a.link = c;
          return a;
        },
        na(a) {
          if (40960 !== (a.mode & 61440)) {
            throw new L(28);
          }
          return a.link;
        }
      },
      m: {
        read(a, b, c, d, e) {
          var f = a.node.j;
          if (e >= a.node.v) {
            return 0;
          }
          a = Math.min(a.node.v - e, d);
          if (8 < a && f.subarray) {
            b.set(f.subarray(e, e + a), c);
          } else {
            for (d = 0; d < a; d++) {
              b[c + d] = f[e + d];
            }
          }
          return a;
        },
        write(a, b, c, d, e, f) {
          b.buffer === C.buffer && (f = !1);
          if (!d) {
            return 0;
          }
          a = a.node;
          a.timestamp = Date.now();
          if (b.subarray && (!a.j || a.j.subarray)) {
            if (f) {
              return a.j = b.subarray(c, c + d), a.v = d;
            }
            if (0 === a.v && 0 === e) {
              return a.j = b.slice(c, c + d), a.v = d;
            }
            if (e + d <= a.v) {
              return a.j.set(b.subarray(c, c + d), e), d;
            }
          }
          mb(a, e + d);
          if (a.j.subarray && b.subarray) {
            a.j.set(b.subarray(c, c + d), e);
          } else {
            for (f = 0; f < d; f++) {
              a.j[e + f] = b[c + f];
            }
          }
          a.v = Math.max(a.v, e + d);
          return d;
        },
        aa(a, b, c) {
          1 === c ? b += a.position : 2 === c && 32768 === (a.node.mode & 61440) && (b += a.node.v);
          if (0 > b) {
            throw new L(28);
          }
          return b;
        },
        ta(a, b, c) {
          mb(a.node, b + c);
          a.node.v = Math.max(a.node.v, b + c);
        },
        fb(a, b, c, d, e) {
          if (32768 !== (a.node.mode & 61440)) {
            throw new L(43);
          }
          a = a.node.j;
          if (e & 2 || a.buffer !== C.buffer) {
            if (0 < c || c + b < a.length) {
              a.subarray ? a = a.subarray(c, c + b) : a = Array.prototype.slice.call(a, c, c + b);
            }
            c = !0;
            sa();
            b = void 0;
            if (!b) {
              throw new L(48);
            }
            C.set(a, b);
          } else {
            c = !1, b = a.byteOffset;
          }
          return {
            o: b,
            M: c
          };
        },
        hb(a, b, c, d) {
          M.m.write(a, b, 0, d, c, !1);
          return 0;
        }
      }
    };
    function sb(a, b) {
      var c = 0;
      a && (c |= 365);
      b && (c |= 146);
      return c;
    }
    var tb = null,
      ub = {},
      vb = [],
      wb = 1,
      xb = null,
      yb = !0,
      L = null,
      pb = {},
      Ab = (a, b = {}) => {
        a = ab(a);
        if (!a) {
          return {
            path: "",
            node: null
          };
        }
        b = Object.assign({
          ab: !0,
          Qa: 0
        }, b);
        if (8 < b.Qa) {
          throw new L(32);
        }
        a = a.split("/").filter(g => !!g);
        for (var c = tb, d = "/", e = 0; e < a.length; e++) {
          var f = e === a.length - 1;
          if (f && b.parent) {
            break;
          }
          c = rb(c, a[e]);
          d = Wa(d + "/" + a[e]);
          c.Aa && (!f || f && b.ab) && (c = c.Aa.root);
          if (!f || b.$a) {
            for (f = 0; 40960 === (c.mode & 61440);) {
              if (c = zb(d), d = ab(Xa(d), c), c = Ab(d, {
                Qa: b.Qa + 1
              }).node, 40 < f++) {
                throw new L(32);
              }
            }
          }
        }
        return {
          path: d,
          node: c
        };
      },
      Bb = a => {
        for (var b;;) {
          if (a === a.parent) {
            return a = a.T.gb, b ? "/" !== a[a.length - 1] ? `${a}/${b}` : a + b : a;
          }
          b = b ? `${a.name}/${b}` : a.name;
          a = a.parent;
        }
      },
      Cb = (a, b) => {
        for (var c = 0, d = 0; d < b.length; d++) {
          c = (c << 5) - c + b.charCodeAt(d) | 0;
        }
        return (a + c >>> 0) % xb.length;
      },
      rb = (a, b) => {
        var c;
        if (c = (c = Db(a, "x")) ? c : a.l.ma ? 0 : 2) {
          throw new L(c, a);
        }
        for (c = xb[Cb(a.id, b)]; c; c = c.Zb) {
          var d = c.name;
          if (c.parent.id === a.id && d === b) {
            return c;
          }
        }
        return a.l.ma(a, b);
      },
      ob = (a, b, c, d) => {
        a = new Eb(a, b, c, d);
        b = Cb(a.parent.id, a.name);
        a.Zb = xb[b];
        return xb[b] = a;
      },
      Fb = a => {
        var b = ["r", "w", "rw"][a & 3];
        a & 512 && (b += "w");
        return b;
      },
      Db = (a, b) => {
        if (yb) {
          return 0;
        }
        if (!b.includes("r") || a.mode & 292) {
          if (b.includes("w") && !(a.mode & 146) || b.includes("x") && !(a.mode & 73)) {
            return 2;
          }
        } else {
          return 2;
        }
        return 0;
      },
      Gb = (a, b) => {
        try {
          return rb(a, b), 20;
        } catch (c) {}
        return Db(a, "wx");
      },
      Hb = () => {
        for (var a = 0; 4096 >= a; a++) {
          if (!vb[a]) {
            return a;
          }
        }
        throw new L(33);
      },
      Ib = a => {
        a = vb[a];
        if (!a) {
          throw new L(8);
        }
        return a;
      },
      Kb = (a, b = -1) => {
        Jb || (Jb = function () {
          this.h = {};
        }, Jb.prototype = {}, Object.defineProperties(Jb.prototype, {
          object: {
            get() {
              return this.node;
            },
            set(c) {
              this.node = c;
            }
          },
          flags: {
            get() {
              return this.h.flags;
            },
            set(c) {
              this.h.flags = c;
            }
          },
          position: {
            get() {
              return this.h.position;
            },
            set(c) {
              this.h.position = c;
            }
          }
        }));
        a = Object.assign(new Jb(), a);
        -1 == b && (b = Hb());
        a.W = b;
        return vb[b] = a;
      },
      nb = {
        open: a => {
          a.m = ub[a.node.Ca].m;
          a.m.open && a.m.open(a);
        },
        aa: () => {
          throw new L(70);
        }
      },
      ib = (a, b) => {
        ub[a] = {
          m: b
        };
      },
      Lb = (a, b) => {
        var c = "/" === b,
          d = !b;
        if (c && tb) {
          throw new L(10);
        }
        if (!c && !d) {
          var e = Ab(b, {
            ab: !1
          });
          b = e.path;
          e = e.node;
          if (e.Aa) {
            throw new L(10);
          }
          if (16384 !== (e.mode & 61440)) {
            throw new L(54);
          }
        }
        b = {
          type: a,
          Lc: {},
          gb: b,
          Yb: []
        };
        a = a.T(b);
        a.T = b;
        b.root = a;
        c ? tb = a : e && (e.Aa = b, e.T && e.T.Yb.push(b));
      },
      N = (a, b, c) => {
        var d = Ab(a, {
          parent: !0
        }).node;
        a = Ya(a);
        if (!a || "." === a || ".." === a) {
          throw new L(28);
        }
        var e = Gb(d, a);
        if (e) {
          throw new L(e);
        }
        if (!d.l.za) {
          throw new L(63);
        }
        return d.l.za(d, a, b, c);
      },
      Mb = (a, b, c) => {
        "undefined" == typeof c && (c = b, b = 438);
        N(a, b | 8192, c);
      },
      Nb = (a, b) => {
        if (!ab(a)) {
          throw new L(44);
        }
        var c = Ab(b, {
          parent: !0
        }).node;
        if (!c) {
          throw new L(44);
        }
        b = Ya(b);
        var d = Gb(c, b);
        if (d) {
          throw new L(d);
        }
        if (!c.l.Fa) {
          throw new L(63);
        }
        c.l.Fa(c, b, a);
      },
      zb = a => {
        a = Ab(a).node;
        if (!a) {
          throw new L(44);
        }
        if (!a.l.na) {
          throw new L(28);
        }
        return ab(Bb(a.parent), a.l.na(a));
      },
      Pb = (a, b, c) => {
        if ("" === a) {
          throw new L(44);
        }
        if ("string" == typeof b) {
          var d = {
            r: 0,
            "r+": 2,
            w: 577,
            "w+": 578,
            a: 1089,
            "a+": 1090
          }[b];
          if ("undefined" == typeof d) {
            throw Error(`Unknown file open mode: ${b}`);
          }
          b = d;
        }
        c = b & 64 ? ("undefined" == typeof c ? 438 : c) & 4095 | 32768 : 0;
        if ("object" == typeof a) {
          var e = a;
        } else {
          a = Wa(a);
          try {
            e = Ab(a, {
              $a: !(b & 131072)
            }).node;
          } catch (f) {}
        }
        d = !1;
        if (b & 64) {
          if (e) {
            if (b & 128) {
              throw new L(20);
            }
          } else {
            e = N(a, c, 0), d = !0;
          }
        }
        if (!e) {
          throw new L(44);
        }
        8192 === (e.mode & 61440) && (b &= -513);
        if (b & 65536 && 16384 !== (e.mode & 61440)) {
          throw new L(54);
        }
        if (!d && (c = e ? 40960 === (e.mode & 61440) ? 32 : 16384 === (e.mode & 61440) && ("r" !== Fb(b) || b & 512) ? 31 : Db(e, Fb(b)) : 44)) {
          throw new L(c);
        }
        if (b & 512 && !d) {
          c = e;
          c = "string" == typeof c ? Ab(c, {
            $a: !0
          }).node : c;
          if (!c.l.P) {
            throw new L(63);
          }
          if (16384 === (c.mode & 61440)) {
            throw new L(31);
          }
          if (32768 !== (c.mode & 61440)) {
            throw new L(28);
          }
          if (d = Db(c, "w")) {
            throw new L(d);
          }
          c.l.P(c, {
            size: 0,
            timestamp: Date.now()
          });
        }
        b &= -131713;
        e = Kb({
          node: e,
          path: Bb(e),
          flags: b,
          seekable: !0,
          position: 0,
          m: e.m,
          mc: [],
          error: !1
        });
        e.m.open && e.m.open(e);
        !n.logReadFiles || b & 1 || (Ob || (Ob = {}), a in Ob || (Ob[a] = 1));
        return e;
      },
      Qb = (a, b, c) => {
        if (null === a.W) {
          throw new L(8);
        }
        if (!a.seekable || !a.m.aa) {
          throw new L(70);
        }
        if (0 != c && 1 != c && 2 != c) {
          throw new L(28);
        }
        a.position = a.m.aa(a, b, c);
        a.mc = [];
      },
      Rb = () => {
        L || (L = function (a, b) {
          this.name = "ErrnoError";
          this.node = b;
          this.bc = function (c) {
            this.$ = c;
          };
          this.bc(a);
          this.message = "FS error";
        }, L.prototype = Error(), L.prototype.constructor = L, [44].forEach(a => {
          pb[a] = new L(a);
          pb[a].stack = "<generic error, no stack>";
        }));
      },
      Sb,
      Ub = (a, b, c) => {
        a = Wa("/dev/" + a);
        var d = sb(!!b, !!c);
        Tb || (Tb = 64);
        var e = Tb++ << 8 | 0;
        ib(e, {
          open: f => {
            f.seekable = !1;
          },
          close: () => {
            c && c.buffer && c.buffer.length && c(10);
          },
          read: (f, g, m, p) => {
            for (var l = 0, u = 0; u < p; u++) {
              try {
                var v = b();
              } catch (q) {
                throw new L(29);
              }
              if (void 0 === v && 0 === l) {
                throw new L(6);
              }
              if (null === v || void 0 === v) {
                break;
              }
              l++;
              g[m + u] = v;
            }
            l && (f.node.timestamp = Date.now());
            return l;
          },
          write: (f, g, m, p) => {
            for (var l = 0; l < p; l++) {
              try {
                c(g[m + l]);
              } catch (u) {
                throw new L(29);
              }
            }
            p && (f.node.timestamp = Date.now());
            return l;
          }
        });
        Mb(a, d, e);
      },
      Tb,
      Vb = {},
      Jb,
      Ob,
      Wb = void 0;
    function Xb() {
      Wb += 4;
      return I[Wb - 4 >> 2];
    }
    function Yb(a) {
      if (void 0 === a) {
        return "_unknown";
      }
      a = a.replace(/[^a-zA-Z0-9_]/g, "$");
      var b = a.charCodeAt(0);
      return 48 <= b && 57 >= b ? `_${a}` : a;
    }
    function Zb(a, b) {
      a = Yb(a);
      return {
        [a]: function () {
          return b.apply(this, arguments);
        }
      }[a];
    }
    function $b() {
      this.M = [void 0];
      this.bb = [];
    }
    var O = new $b(),
      ac = void 0;
    function P(a) {
      throw new ac(a);
    }
    var Q = a => {
        a || P("Cannot use deleted val. handle = " + a);
        return O.get(a).value;
      },
      bc = a => {
        switch (a) {
          case void 0:
            return 1;
          case null:
            return 2;
          case !0:
            return 3;
          case !1:
            return 4;
          default:
            return O.ta({
              ob: 1,
              value: a
            });
        }
      };
    function cc(a) {
      var b = Error,
        c = Zb(a, function (d) {
          this.name = a;
          this.message = d;
          d = Error(d).stack;
          void 0 !== d && (this.stack = this.toString() + "\n" + d.replace(/^Error(:[^\n]*)?\n/, ""));
        });
      c.prototype = Object.create(b.prototype);
      c.prototype.constructor = c;
      c.prototype.toString = function () {
        return void 0 === this.message ? this.name : `${this.name}: ${this.message}`;
      };
      return c;
    }
    var dc = void 0,
      ec = void 0;
    function R(a) {
      for (var b = ""; G[a];) {
        b += ec[G[a++]];
      }
      return b;
    }
    var fc = [];
    function gc() {
      for (; fc.length;) {
        var a = fc.pop();
        a.g.ga = !1;
        a["delete"]();
      }
    }
    var hc = void 0,
      ic = {};
    function jc(a, b) {
      for (void 0 === b && P("ptr should not be undefined"); a.A;) {
        b = a.pa(b), a = a.A;
      }
      return b;
    }
    var kc = {};
    function lc(a) {
      a = mc(a);
      var b = R(a);
      nc(a);
      return b;
    }
    function oc(a, b) {
      var c = kc[a];
      void 0 === c && P(b + " has unknown type " + lc(a));
      return c;
    }
    function pc() {}
    var qc = !1;
    function rc(a) {
      --a.count.value;
      0 === a.count.value && (a.G ? a.L.V(a.G) : a.u.i.V(a.o));
    }
    function sc(a, b, c) {
      if (b === c) {
        return a;
      }
      if (void 0 === c.A) {
        return null;
      }
      a = sc(a, b, c.A);
      return null === a ? null : c.Gb(a);
    }
    var tc = {};
    function uc(a, b) {
      b = jc(a, b);
      return ic[b];
    }
    var vc = void 0;
    function wc(a) {
      throw new vc(a);
    }
    function xc(a, b) {
      b.u && b.o || wc("makeClassHandle requires ptr and ptrType");
      !!b.L !== !!b.G && wc("Both smartPtrType and smartPtr must be specified");
      b.count = {
        value: 1
      };
      return yc(Object.create(a, {
        g: {
          value: b
        }
      }));
    }
    function yc(a) {
      if ("undefined" === typeof FinalizationRegistry) {
        return yc = b => b, a;
      }
      qc = new FinalizationRegistry(b => {
        rc(b.g);
      });
      yc = b => {
        var c = b.g;
        c.G && qc.register(b, {
          g: c
        }, b);
        return b;
      };
      pc = b => {
        qc.unregister(b);
      };
      return yc(a);
    }
    var zc = {};
    function Ac(a) {
      for (; a.length;) {
        var b = a.pop();
        a.pop()(b);
      }
    }
    function Bc(a) {
      return this.fromWireType(I[a >> 2]);
    }
    var Cc = {},
      Dc = {};
    function S(a, b, c) {
      function d(m) {
        m = c(m);
        m.length !== a.length && wc("Mismatched type converter count");
        for (var p = 0; p < a.length; ++p) {
          T(a[p], m[p]);
        }
      }
      a.forEach(function (m) {
        Dc[m] = b;
      });
      var e = Array(b.length),
        f = [],
        g = 0;
      b.forEach((m, p) => {
        kc.hasOwnProperty(m) ? e[p] = kc[m] : (f.push(m), Cc.hasOwnProperty(m) || (Cc[m] = []), Cc[m].push(() => {
          e[p] = kc[m];
          ++g;
          g === f.length && d(e);
        }));
      });
      0 === f.length && d(e);
    }
    function Ec(a) {
      switch (a) {
        case 1:
          return 0;
        case 2:
          return 1;
        case 4:
          return 2;
        case 8:
          return 3;
        default:
          throw new TypeError(`Unknown type size: ${a}`);
      }
    }
    function Fc(a, b, c = {}) {
      var d = b.name;
      a || P(`type "${d}" must have a positive integer typeid pointer`);
      if (kc.hasOwnProperty(a)) {
        if (c.Rb) {
          return;
        }
        P(`Cannot register type '${d}' twice`);
      }
      kc[a] = b;
      delete Dc[a];
      Cc.hasOwnProperty(a) && (b = Cc[a], delete Cc[a], b.forEach(e => e()));
    }
    function T(a, b, c = {}) {
      if (!("argPackAdvance" in b)) {
        throw new TypeError("registerType registeredInstance requires argPackAdvance");
      }
      Fc(a, b, c);
    }
    function Gc(a) {
      P(a.g.u.i.name + " instance already deleted");
    }
    function Hc() {}
    function Ic(a, b, c) {
      if (void 0 === a[b].B) {
        var d = a[b];
        a[b] = function () {
          a[b].B.hasOwnProperty(arguments.length) || P(`Function '${c}' called with an invalid number of arguments (${arguments.length}) - expects one of (${a[b].B})!`);
          return a[b].B[arguments.length].apply(this, arguments);
        };
        a[b].B = [];
        a[b].B[d.fa] = d;
      }
    }
    function Jc(a, b, c) {
      n.hasOwnProperty(a) ? ((void 0 === c || void 0 !== n[a].B && void 0 !== n[a].B[c]) && P(`Cannot register public name '${a}' twice`), Ic(n, a, a), n.hasOwnProperty(c) && P(`Cannot register multiple overloads of a function with the same number of arguments (${c})!`), n[a].B[c] = b) : (n[a] = b, void 0 !== c && (n[a].Kc = c));
    }
    function Kc(a, b, c, d, e, f, g, m) {
      this.name = a;
      this.constructor = b;
      this.N = c;
      this.V = d;
      this.A = e;
      this.Lb = f;
      this.pa = g;
      this.Gb = m;
      this.kb = [];
    }
    function Lc(a, b, c) {
      for (; b !== c;) {
        b.pa || P(`Expected null or instance of ${c.name}, got an instance of ${b.name}`), a = b.pa(a), b = b.A;
      }
      return a;
    }
    function Mc(a, b) {
      if (null === b) {
        return this.Na && P(`null is not a valid ${this.name}`), 0;
      }
      b.g || P(`Cannot pass "${Nc(b)}" as a ${this.name}`);
      b.g.o || P(`Cannot pass deleted object as a pointer of type ${this.name}`);
      return Lc(b.g.o, b.g.u.i, this.i);
    }
    function Oc(a, b) {
      if (null === b) {
        this.Na && P(`null is not a valid ${this.name}`);
        if (this.ya) {
          var c = this.Pa();
          null !== a && a.push(this.V, c);
          return c;
        }
        return 0;
      }
      b.g || P(`Cannot pass "${Nc(b)}" as a ${this.name}`);
      b.g.o || P(`Cannot pass deleted object as a pointer of type ${this.name}`);
      !this.xa && b.g.u.xa && P(`Cannot convert argument of type ${b.g.L ? b.g.L.name : b.g.u.name} to parameter type ${this.name}`);
      c = Lc(b.g.o, b.g.u.i, this.i);
      if (this.ya) {
        switch (void 0 === b.g.G && P("Passing raw pointer to smart pointer is illegal"), this.fc) {
          case 0:
            b.g.L === this ? c = b.g.G : P(`Cannot convert argument of type ${b.g.L ? b.g.L.name : b.g.u.name} to parameter type ${this.name}`);
            break;
          case 1:
            c = b.g.G;
            break;
          case 2:
            if (b.g.L === this) {
              c = b.g.G;
            } else {
              var d = b.clone();
              c = this.ac(c, bc(function () {
                d["delete"]();
              }));
              null !== a && a.push(this.V, c);
            }
            break;
          default:
            P("Unsupporting sharing policy");
        }
      }
      return c;
    }
    function Pc(a, b) {
      if (null === b) {
        return this.Na && P(`null is not a valid ${this.name}`), 0;
      }
      b.g || P(`Cannot pass "${Nc(b)}" as a ${this.name}`);
      b.g.o || P(`Cannot pass deleted object as a pointer of type ${this.name}`);
      b.g.u.xa && P(`Cannot convert argument of type ${b.g.u.name} to parameter type ${this.name}`);
      return Lc(b.g.o, b.g.u.i, this.i);
    }
    function Qc(a, b, c, d) {
      this.name = a;
      this.i = b;
      this.Na = c;
      this.xa = d;
      this.ya = !1;
      this.V = this.ac = this.Pa = this.mb = this.fc = this.$b = void 0;
      void 0 !== b.A ? this.toWireType = Oc : (this.toWireType = d ? Mc : Pc, this.K = null);
    }
    function Rc(a, b, c) {
      n.hasOwnProperty(a) || wc("Replacing nonexistant public symbol");
      void 0 !== n[a].B && void 0 !== c ? n[a].B[c] = b : (n[a] = b, n[a].fa = c);
    }
    var Sc = [],
      Tc = a => {
        var b = Sc[a];
        b || (a >= Sc.length && (Sc.length = a + 1), Sc[a] = b = za.get(a));
        return b;
      },
      Uc = (a, b) => {
        var c = [];
        return function () {
          c.length = 0;
          Object.assign(c, arguments);
          if (a.includes("j")) {
            var d = n["dynCall_" + a];
            d = c && c.length ? d.apply(null, [b].concat(c)) : d.call(null, b);
          } else {
            d = Tc(b).apply(null, c);
          }
          return d;
        };
      };
    function U(a, b) {
      a = R(a);
      var c = a.includes("j") ? Uc(a, b) : Tc(b);
      "function" != typeof c && P(`unknown function pointer with signature ${a}: ${b}`);
      return c;
    }
    var Vc = void 0;
    function Wc(a, b) {
      function c(f) {
        e[f] || kc[f] || (Dc[f] ? Dc[f].forEach(c) : (d.push(f), e[f] = !0));
      }
      var d = [],
        e = {};
      b.forEach(c);
      throw new Vc(`${a}: ` + d.map(lc).join([", "]));
    }
    function Xc(a, b, c, d, e) {
      var f = b.length;
      2 > f && P("argTypes array size mismatch! Must at least get return value and 'this' types!");
      var g = null !== b[1] && null !== c,
        m = !1;
      for (c = 1; c < b.length; ++c) {
        if (null !== b[c] && void 0 === b[c].K) {
          m = !0;
          break;
        }
      }
      var p = "void" !== b[0].name,
        l = f - 2,
        u = Array(l),
        v = [],
        q = [];
      return function () {
        arguments.length !== l && P(`function ${a} called with ${arguments.length} arguments, expected ${l} args!`);
        q.length = 0;
        v.length = g ? 2 : 1;
        v[0] = e;
        if (g) {
          var k = b[1].toWireType(q, this);
          v[1] = k;
        }
        for (var r = 0; r < l; ++r) {
          u[r] = b[r + 2].toWireType(q, arguments[r]), v.push(u[r]);
        }
        r = d.apply(null, v);
        if (m) {
          Ac(q);
        } else {
          for (var w = g ? 1 : 2; w < b.length; w++) {
            var y = 1 === w ? k : u[w - 2];
            null !== b[w].K && b[w].K(y);
          }
        }
        k = p ? b[0].fromWireType(r) : void 0;
        return k;
      };
    }
    function Yc(a, b) {
      for (var c = [], d = 0; d < a; d++) {
        c.push(J[b + 4 * d >> 2]);
      }
      return c;
    }
    function Zc(a, b, c) {
      a instanceof Object || P(`${c} with invalid "this": ${a}`);
      a instanceof b.i.constructor || P(`${c} incompatible with "this" of type ${a.constructor.name}`);
      a.g.o || P(`cannot call emscripten binding method ${c} on deleted object`);
      return Lc(a.g.o, a.g.u.i, b.i);
    }
    function $c(a) {
      a >= O.h && 0 === --O.get(a).ob && O.Qb(a);
    }
    function ad(a, b, c) {
      switch (b) {
        case 0:
          return function (d) {
            return this.fromWireType((c ? C : G)[d]);
          };
        case 1:
          return function (d) {
            return this.fromWireType((c ? H : va)[d >> 1]);
          };
        case 2:
          return function (d) {
            return this.fromWireType((c ? I : J)[d >> 2]);
          };
        default:
          throw new TypeError("Unknown integer type: " + a);
      }
    }
    function Nc(a) {
      if (null === a) {
        return "null";
      }
      var b = typeof a;
      return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a;
    }
    function bd(a, b) {
      switch (b) {
        case 2:
          return function (c) {
            return this.fromWireType(wa[c >> 2]);
          };
        case 3:
          return function (c) {
            return this.fromWireType(xa[c >> 3]);
          };
        default:
          throw new TypeError("Unknown float type: " + a);
      }
    }
    function cd(a, b, c) {
      switch (b) {
        case 0:
          return c ? function (d) {
            return C[d];
          } : function (d) {
            return G[d];
          };
        case 1:
          return c ? function (d) {
            return H[d >> 1];
          } : function (d) {
            return va[d >> 1];
          };
        case 2:
          return c ? function (d) {
            return I[d >> 2];
          } : function (d) {
            return J[d >> 2];
          };
        default:
          throw new TypeError("Unknown integer type: " + a);
      }
    }
    var dd = "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0,
      ed = (a, b) => {
        var c = a >> 1;
        for (var d = c + b / 2; !(c >= d) && va[c];) {
          ++c;
        }
        c <<= 1;
        if (32 < c - a && dd) {
          return dd.decode(G.subarray(a, c));
        }
        c = "";
        for (d = 0; !(d >= b / 2); ++d) {
          var e = H[a + 2 * d >> 1];
          if (0 == e) {
            break;
          }
          c += String.fromCharCode(e);
        }
        return c;
      },
      fd = (a, b, c) => {
        void 0 === c && (c = 2147483647);
        if (2 > c) {
          return 0;
        }
        c -= 2;
        var d = b;
        c = c < 2 * a.length ? c / 2 : a.length;
        for (var e = 0; e < c; ++e) {
          H[b >> 1] = a.charCodeAt(e), b += 2;
        }
        H[b >> 1] = 0;
        return b - d;
      },
      gd = a => 2 * a.length,
      hd = (a, b) => {
        for (var c = 0, d = ""; !(c >= b / 4);) {
          var e = I[a + 4 * c >> 2];
          if (0 == e) {
            break;
          }
          ++c;
          65536 <= e ? (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023)) : d += String.fromCharCode(e);
        }
        return d;
      },
      jd = (a, b, c) => {
        void 0 === c && (c = 2147483647);
        if (4 > c) {
          return 0;
        }
        var d = b;
        c = d + c - 4;
        for (var e = 0; e < a.length; ++e) {
          var f = a.charCodeAt(e);
          if (55296 <= f && 57343 >= f) {
            var g = a.charCodeAt(++e);
            f = 65536 + ((f & 1023) << 10) | g & 1023;
          }
          I[b >> 2] = f;
          b += 4;
          if (b + 4 > c) {
            break;
          }
        }
        I[b >> 2] = 0;
        return b - d;
      },
      kd = a => {
        for (var b = 0, c = 0; c < a.length; ++c) {
          var d = a.charCodeAt(c);
          55296 <= d && 57343 >= d && ++c;
          b += 4;
        }
        return b;
      },
      ld = {};
    function md(a) {
      var b = ld[a];
      return void 0 === b ? R(a) : b;
    }
    var nd = [];
    function od(a) {
      var b = nd.length;
      nd.push(a);
      return b;
    }
    function pd(a, b) {
      for (var c = Array(a), d = 0; d < a; ++d) {
        c[d] = oc(J[b + 4 * d >> 2], "parameter " + d);
      }
      return c;
    }
    var qd = [],
      rd = [];
    function sd(a) {
      a.yc = a.getExtension("WEBGL_draw_instanced_base_vertex_base_instance");
    }
    function td(a) {
      a.Gc = a.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance");
    }
    var ud = 1,
      vd = [],
      V = [],
      wd = [],
      xd = [],
      W = [],
      yd = [],
      zd = [],
      t = [],
      Ad = {};
    function X(a) {
      Bd || (Bd = a);
    }
    function ha(a) {
      for (var b = ud++, c = a.length; c < b; c++) {
        a[c] = null;
      }
      return b;
    }
    function ja(a) {
      Cd = t[a];
      n.wc = Z = Cd && Cd.H;
      return !(a && !Z);
    }
    function ia(a) {
      a || (a = Cd);
      if (!a.Sb) {
        a.Sb = !0;
        var b = a.H;
        sd(b);
        td(b);
        2 <= a.version && (b.Ya = b.getExtension("EXT_disjoint_timer_query_webgl2"));
        if (2 > a.version || !b.Ya) {
          b.Ya = b.getExtension("EXT_disjoint_timer_query");
        }
        Dd(b);
        (b.getSupportedExtensions() || []).forEach(function (c) {
          c.includes("lose_context") || c.includes("debug") || b.getExtension(c);
        });
      }
    }
    var Bd, Cd;
    function Dd(a) {
      a.Ic = a.getExtension("WEBGL_multi_draw");
    }
    var Ed = {},
      Gd = () => {
        if (!Fd) {
          var a = {
              USER: "web_user",
              LOGNAME: "web_user",
              PATH: "/",
              PWD: "/",
              HOME: "/home/web_user",
              LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8",
              _: la || "./this.program"
            },
            b;
          for (b in Ed) {
            void 0 === Ed[b] ? delete a[b] : a[b] = Ed[b];
          }
          var c = [];
          for (b in a) {
            c.push(`${b}=${a[b]}`);
          }
          Fd = c;
        }
        return Fd;
      },
      Fd,
      Hd = [];
    function Id(a, b, c, d) {
      for (var e = 0; e < a; e++) {
        var f = Z[c](),
          g = f && ha(d);
        f ? (f.name = g, d[g] = f) : X(1282);
        I[b + 4 * e >> 2] = g;
      }
    }
    function Jd(a, b) {
      if (b) {
        var c = void 0;
        switch (a) {
          case 36346:
            c = 1;
            break;
          case 36344:
            return;
          case 34814:
          case 36345:
            c = 0;
            break;
          case 34466:
            var d = Z.getParameter(34467);
            c = d ? d.length : 0;
            break;
          case 33309:
            if (2 > Cd.version) {
              X(1282);
              return;
            }
            c = 2 * (Z.getSupportedExtensions() || []).length;
            break;
          case 33307:
          case 33308:
            if (2 > Cd.version) {
              X(1280);
              return;
            }
            c = 33307 == a ? 3 : 0;
        }
        if (void 0 === c) {
          switch (d = Z.getParameter(a), typeof d) {
            case "number":
              c = d;
              break;
            case "boolean":
              c = d ? 1 : 0;
              break;
            case "string":
              X(1280);
              return;
            case "object":
              if (null === d) {
                switch (a) {
                  case 34964:
                  case 35725:
                  case 34965:
                  case 36006:
                  case 36007:
                  case 32873:
                  case 34229:
                  case 36662:
                  case 36663:
                  case 35053:
                  case 35055:
                  case 36010:
                  case 35097:
                  case 35869:
                  case 32874:
                  case 36389:
                  case 35983:
                  case 35368:
                  case 34068:
                    c = 0;
                    break;
                  default:
                    X(1280);
                    return;
                }
              } else {
                if (d instanceof Float32Array || d instanceof Uint32Array || d instanceof Int32Array || d instanceof Array) {
                  for (a = 0; a < d.length; ++a) {
                    I[b + 4 * a >> 2] = d[a];
                  }
                  return;
                }
                try {
                  c = d.name | 0;
                } catch (e) {
                  X(1280);
                  A("GL_INVALID_ENUM in glGet0v: Unknown object returned from WebGL getParameter(" + a + ")! (error: " + e + ")");
                  return;
                }
              }
              break;
            default:
              X(1280);
              A("GL_INVALID_ENUM in glGet0v: Native code calling glGet0v(" + a + ") and it returns " + d + " of type " + typeof d + "!");
              return;
          }
        }
        I[b >> 2] = c;
      } else {
        X(1281);
      }
    }
    var Ld = a => {
      var b = db(a) + 1,
        c = Kd(b);
      c && eb(a, G, c, b);
      return c;
    };
    function Md(a) {
      return "]" == a.slice(-1) && a.lastIndexOf("[");
    }
    var Nd = a => 0 === a % 4 && (0 !== a % 100 || 0 === a % 400),
      Od = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      Pd = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      Qd = (a, b, c, d) => {
        function e(k, r, w) {
          for (k = "number" == typeof k ? k.toString() : k || ""; k.length < r;) {
            k = w[0] + k;
          }
          return k;
        }
        function f(k, r) {
          return e(k, r, "0");
        }
        function g(k, r) {
          function w(E) {
            return 0 > E ? -1 : 0 < E ? 1 : 0;
          }
          var y;
          0 === (y = w(k.getFullYear() - r.getFullYear())) && 0 === (y = w(k.getMonth() - r.getMonth())) && (y = w(k.getDate() - r.getDate()));
          return y;
        }
        function m(k) {
          switch (k.getDay()) {
            case 0:
              return new Date(k.getFullYear() - 1, 11, 29);
            case 1:
              return k;
            case 2:
              return new Date(k.getFullYear(), 0, 3);
            case 3:
              return new Date(k.getFullYear(), 0, 2);
            case 4:
              return new Date(k.getFullYear(), 0, 1);
            case 5:
              return new Date(k.getFullYear() - 1, 11, 31);
            case 6:
              return new Date(k.getFullYear() - 1, 11, 30);
          }
        }
        function p(k) {
          var r = k.ba;
          for (k = new Date(new Date(k.ca + 1900, 0, 1).getTime()); 0 < r;) {
            var w = k.getMonth(),
              y = (Nd(k.getFullYear()) ? Od : Pd)[w];
            if (r > y - k.getDate()) {
              r -= y - k.getDate() + 1, k.setDate(1), 11 > w ? k.setMonth(w + 1) : (k.setMonth(0), k.setFullYear(k.getFullYear() + 1));
            } else {
              k.setDate(k.getDate() + r);
              break;
            }
          }
          w = new Date(k.getFullYear() + 1, 0, 4);
          r = m(new Date(k.getFullYear(), 0, 4));
          w = m(w);
          return 0 >= g(r, k) ? 0 >= g(w, k) ? k.getFullYear() + 1 : k.getFullYear() : k.getFullYear() - 1;
        }
        var l = I[d + 40 >> 2];
        d = {
          jc: I[d >> 2],
          ic: I[d + 4 >> 2],
          Ga: I[d + 8 >> 2],
          Ra: I[d + 12 >> 2],
          Ha: I[d + 16 >> 2],
          ca: I[d + 20 >> 2],
          R: I[d + 24 >> 2],
          ba: I[d + 28 >> 2],
          Mc: I[d + 32 >> 2],
          hc: I[d + 36 >> 2],
          kc: l ? l ? K(G, l) : "" : ""
        };
        c = c ? K(G, c) : "";
        l = {
          "%c": "%a %b %d %H:%M:%S %Y",
          "%D": "%m/%d/%y",
          "%F": "%Y-%m-%d",
          "%h": "%b",
          "%r": "%I:%M:%S %p",
          "%R": "%H:%M",
          "%T": "%H:%M:%S",
          "%x": "%m/%d/%y",
          "%X": "%H:%M:%S",
          "%Ec": "%c",
          "%EC": "%C",
          "%Ex": "%m/%d/%y",
          "%EX": "%H:%M:%S",
          "%Ey": "%y",
          "%EY": "%Y",
          "%Od": "%d",
          "%Oe": "%e",
          "%OH": "%H",
          "%OI": "%I",
          "%Om": "%m",
          "%OM": "%M",
          "%OS": "%S",
          "%Ou": "%u",
          "%OU": "%U",
          "%OV": "%V",
          "%Ow": "%w",
          "%OW": "%W",
          "%Oy": "%y"
        };
        for (var u in l) {
          c = c.replace(new RegExp(u, "g"), l[u]);
        }
        var v = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
          q = "January February March April May June July August September October November December".split(" ");
        l = {
          "%a": k => v[k.R].substring(0, 3),
          "%A": k => v[k.R],
          "%b": k => q[k.Ha].substring(0, 3),
          "%B": k => q[k.Ha],
          "%C": k => f((k.ca + 1900) / 100 | 0, 2),
          "%d": k => f(k.Ra, 2),
          "%e": k => e(k.Ra, 2, " "),
          "%g": k => p(k).toString().substring(2),
          "%G": k => p(k),
          "%H": k => f(k.Ga, 2),
          "%I": k => {
            k = k.Ga;
            0 == k ? k = 12 : 12 < k && (k -= 12);
            return f(k, 2);
          },
          "%j": k => {
            for (var r = 0, w = 0; w <= k.Ha - 1; r += (Nd(k.ca + 1900) ? Od : Pd)[w++]) {}
            return f(k.Ra + r, 3);
          },
          "%m": k => f(k.Ha + 1, 2),
          "%M": k => f(k.ic, 2),
          "%n": () => "\n",
          "%p": k => 0 <= k.Ga && 12 > k.Ga ? "AM" : "PM",
          "%S": k => f(k.jc, 2),
          "%t": () => "\t",
          "%u": k => k.R || 7,
          "%U": k => f(Math.floor((k.ba + 7 - k.R) / 7), 2),
          "%V": k => {
            var r = Math.floor((k.ba + 7 - (k.R + 6) % 7) / 7);
            2 >= (k.R + 371 - k.ba - 2) % 7 && r++;
            if (r) {
              53 == r && (w = (k.R + 371 - k.ba) % 7, 4 == w || 3 == w && Nd(k.ca) || (r = 1));
            } else {
              r = 52;
              var w = (k.R + 7 - k.ba - 1) % 7;
              (4 == w || 5 == w && Nd(k.ca % 400 - 1)) && r++;
            }
            return f(r, 2);
          },
          "%w": k => k.R,
          "%W": k => f(Math.floor((k.ba + 7 - (k.R + 6) % 7) / 7), 2),
          "%y": k => (k.ca + 1900).toString().substring(2),
          "%Y": k => k.ca + 1900,
          "%z": k => {
            k = k.hc;
            var r = 0 <= k;
            k = Math.abs(k) / 60;
            return (r ? "+" : "-") + String("0000" + (k / 60 * 100 + k % 60)).slice(-4);
          },
          "%Z": k => k.kc,
          "%%": () => "%"
        };
        c = c.replace(/%%/g, "\x00\x00");
        for (u in l) {
          c.includes(u) && (c = c.replace(new RegExp(u, "g"), l[u](d)));
        }
        c = c.replace(/\0\0/g, "%");
        u = fb(c, !1);
        if (u.length > b) {
          return 0;
        }
        C.set(u, a);
        return u.length - 1;
      };
    function Eb(a, b, c, d) {
      a || (a = this);
      this.parent = a;
      this.T = a.T;
      this.Aa = null;
      this.id = wb++;
      this.name = b;
      this.mode = c;
      this.l = {};
      this.m = {};
      this.Ca = d;
    }
    Object.defineProperties(Eb.prototype, {
      read: {
        get: function () {
          return 365 === (this.mode & 365);
        },
        set: function (a) {
          a ? this.mode |= 365 : this.mode &= -366;
        }
      },
      write: {
        get: function () {
          return 146 === (this.mode & 146);
        },
        set: function (a) {
          a ? this.mode |= 146 : this.mode &= -147;
        }
      }
    });
    Rb();
    xb = Array(4096);
    Lb(M, "/");
    N("/tmp", 16895, 0);
    N("/home", 16895, 0);
    N("/home/web_user", 16895, 0);
    (() => {
      N("/dev", 16895, 0);
      ib(259, {
        read: () => 0,
        write: (d, e, f, g) => g
      });
      Mb("/dev/null", 259);
      hb(1280, kb);
      hb(1536, lb);
      Mb("/dev/tty", 1280);
      Mb("/dev/tty1", 1536);
      var a = new Uint8Array(1024),
        b = 0,
        c = () => {
          0 === b && (b = $a(a).byteLength);
          return a[--b];
        };
      Ub("random", c);
      Ub("urandom", c);
      N("/dev/shm", 16895, 0);
      N("/dev/shm/tmp", 16895, 0);
    })();
    (() => {
      N("/proc", 16895, 0);
      var a = N("/proc/self", 16895, 0);
      N("/proc/self/fd", 16895, 0);
      Lb({
        T: () => {
          var b = ob(a, "fd", 16895, 73);
          b.l = {
            ma: (c, d) => {
              var e = Ib(+d);
              c = {
                parent: null,
                T: {
                  gb: "fake"
                },
                l: {
                  na: () => e.path
                }
              };
              return c.parent = c;
            }
          };
          return b;
        }
      }, "/proc/self/fd");
    })();
    Object.assign($b.prototype, {
      get(a) {
        return this.M[a];
      },
      has(a) {
        return void 0 !== this.M[a];
      },
      ta(a) {
        var b = this.bb.pop() || this.M.length;
        this.M[b] = a;
        return b;
      },
      Qb(a) {
        this.M[a] = void 0;
        this.bb.push(a);
      }
    });
    ac = n.BindingError = class extends Error {
      constructor(a) {
        super(a);
        this.name = "BindingError";
      }
    };
    O.M.push({
      value: void 0
    }, {
      value: null
    }, {
      value: !0
    }, {
      value: !1
    });
    O.h = O.M.length;
    n.count_emval_handles = function () {
      for (var a = 0, b = O.h; b < O.M.length; ++b) {
        void 0 !== O.M[b] && ++a;
      }
      return a;
    };
    dc = n.PureVirtualError = cc("PureVirtualError");
    for (var Rd = Array(256), Sd = 0; 256 > Sd; ++Sd) {
      Rd[Sd] = String.fromCharCode(Sd);
    }
    ec = Rd;
    n.getInheritedInstanceCount = function () {
      return Object.keys(ic).length;
    };
    n.getLiveInheritedInstances = function () {
      var a = [],
        b;
      for (b in ic) {
        ic.hasOwnProperty(b) && a.push(ic[b]);
      }
      return a;
    };
    n.flushPendingDeletes = gc;
    n.setDelayFunction = function (a) {
      hc = a;
      fc.length && hc && hc(gc);
    };
    vc = n.InternalError = class extends Error {
      constructor(a) {
        super(a);
        this.name = "InternalError";
      }
    };
    Hc.prototype.isAliasOf = function (a) {
      if (!(this instanceof Hc && a instanceof Hc)) {
        return !1;
      }
      var b = this.g.u.i,
        c = this.g.o,
        d = a.g.u.i;
      for (a = a.g.o; b.A;) {
        c = b.pa(c), b = b.A;
      }
      for (; d.A;) {
        a = d.pa(a), d = d.A;
      }
      return b === d && c === a;
    };
    Hc.prototype.clone = function () {
      this.g.o || Gc(this);
      if (this.g.ja) {
        return this.g.count.value += 1, this;
      }
      var a = yc,
        b = Object,
        c = b.create,
        d = Object.getPrototypeOf(this),
        e = this.g;
      a = a(c.call(b, d, {
        g: {
          value: {
            count: e.count,
            ga: e.ga,
            ja: e.ja,
            o: e.o,
            u: e.u,
            G: e.G,
            L: e.L
          }
        }
      }));
      a.g.count.value += 1;
      a.g.ga = !1;
      return a;
    };
    Hc.prototype["delete"] = function () {
      this.g.o || Gc(this);
      this.g.ga && !this.g.ja && P("Object already scheduled for deletion");
      pc(this);
      rc(this.g);
      this.g.ja || (this.g.G = void 0, this.g.o = void 0);
    };
    Hc.prototype.isDeleted = function () {
      return !this.g.o;
    };
    Hc.prototype.deleteLater = function () {
      this.g.o || Gc(this);
      this.g.ga && !this.g.ja && P("Object already scheduled for deletion");
      fc.push(this);
      1 === fc.length && hc && hc(gc);
      this.g.ga = !0;
      return this;
    };
    Qc.prototype.Mb = function (a) {
      this.mb && (a = this.mb(a));
      return a;
    };
    Qc.prototype.Xa = function (a) {
      this.V && this.V(a);
    };
    Qc.prototype.argPackAdvance = 8;
    Qc.prototype.readValueFromPointer = Bc;
    Qc.prototype.deleteObject = function (a) {
      if (null !== a) {
        a["delete"]();
      }
    };
    Qc.prototype.fromWireType = function (a) {
      function b() {
        return this.ya ? xc(this.i.N, {
          u: this.$b,
          o: c,
          L: this,
          G: a
        }) : xc(this.i.N, {
          u: this,
          o: a
        });
      }
      var c = this.Mb(a);
      if (!c) {
        return this.Xa(a), null;
      }
      var d = uc(this.i, c);
      if (void 0 !== d) {
        if (0 === d.g.count.value) {
          return d.g.o = c, d.g.G = a, d.clone();
        }
        d = d.clone();
        this.Xa(a);
        return d;
      }
      d = this.i.Lb(c);
      d = tc[d];
      if (!d) {
        return b.call(this);
      }
      d = this.xa ? d.Db : d.pointerType;
      var e = sc(c, this.i, d.i);
      return null === e ? b.call(this) : this.ya ? xc(d.i.N, {
        u: d,
        o: e,
        L: this,
        G: a
      }) : xc(d.i.N, {
        u: d,
        o: e
      });
    };
    Vc = n.UnboundTypeError = cc("UnboundTypeError");
    for (var Z, Td = 0; 32 > Td; ++Td) {
      Hd.push(Array(Td));
    }
    var Vd = {
      __syscall_fcntl64: function (a, b, c) {
        Wb = c;
        try {
          var d = Ib(a);
          switch (b) {
            case 0:
              var e = Xb();
              return 0 > e ? -28 : Kb(d, e).W;
            case 1:
            case 2:
              return 0;
            case 3:
              return d.flags;
            case 4:
              return e = Xb(), d.flags |= e, 0;
            case 5:
              return e = Xb(), H[e + 0 >> 1] = 2, 0;
            case 6:
            case 7:
              return 0;
            case 16:
            case 8:
              return -28;
            case 9:
              return I[Ud() >> 2] = 28, -1;
            default:
              return -28;
          }
        } catch (f) {
          if ("undefined" == typeof Vb || "ErrnoError" !== f.name) {
            throw f;
          }
          return -f.$;
        }
      },
      __syscall_ioctl: function (a, b, c) {
        Wb = c;
        try {
          var d = Ib(a);
          switch (b) {
            case 21509:
              return d.s ? 0 : -59;
            case 21505:
              if (!d.s) {
                return -59;
              }
              if (d.s.U.Ub) {
                b = [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                var e = Xb();
                I[e >> 2] = 25856;
                I[e + 4 >> 2] = 5;
                I[e + 8 >> 2] = 191;
                I[e + 12 >> 2] = 35387;
                for (var f = 0; 32 > f; f++) {
                  C[e + f + 17 >> 0] = b[f] || 0;
                }
              }
              return 0;
            case 21510:
            case 21511:
            case 21512:
              return d.s ? 0 : -59;
            case 21506:
            case 21507:
            case 21508:
              if (!d.s) {
                return -59;
              }
              if (d.s.U.Vb) {
                for (e = Xb(), b = [], f = 0; 32 > f; f++) {
                  b.push(C[e + f + 17 >> 0]);
                }
              }
              return 0;
            case 21519:
              if (!d.s) {
                return -59;
              }
              e = Xb();
              return I[e >> 2] = 0;
            case 21520:
              return d.s ? -28 : -59;
            case 21531:
              e = Xb();
              if (!d.m.Tb) {
                throw new L(59);
              }
              return d.m.Tb(d, b, e);
            case 21523:
              if (!d.s) {
                return -59;
              }
              d.s.U.Wb && (f = [24, 80], e = Xb(), H[e >> 1] = f[0], H[e + 2 >> 1] = f[1]);
              return 0;
            case 21524:
              return d.s ? 0 : -59;
            case 21515:
              return d.s ? 0 : -59;
            default:
              return -28;
          }
        } catch (g) {
          if ("undefined" == typeof Vb || "ErrnoError" !== g.name) {
            throw g;
          }
          return -g.$;
        }
      },
      __syscall_openat: function (a, b, c, d) {
        Wb = d;
        try {
          b = b ? K(G, b) : "";
          var e = b;
          if ("/" === e.charAt(0)) {
            b = e;
          } else {
            var f = -100 === a ? "/" : Ib(a).path;
            if (0 == e.length) {
              throw new L(44);
            }
            b = Wa(f + "/" + e);
          }
          var g = d ? Xb() : 0;
          return Pb(b, c, g).W;
        } catch (m) {
          if ("undefined" == typeof Vb || "ErrnoError" !== m.name) {
            throw m;
          }
          return -m.$;
        }
      },
      _embind_create_inheriting_constructor: function (a, b, c) {
        a = R(a);
        b = oc(b, "wrapper");
        c = Q(c);
        var d = [].slice,
          e = b.i,
          f = e.N,
          g = e.A.N,
          m = e.A.constructor;
        a = Zb(a, function () {
          e.A.kb.forEach(function (l) {
            if (this[l] === g[l]) {
              throw new dc(`Pure virtual function ${l} must be implemented in JavaScript`);
            }
          }.bind(this));
          Object.defineProperty(this, "__parent", {
            value: f
          });
          this.__construct.apply(this, d.call(arguments));
        });
        f.__construct = function () {
          this === f && P("Pass correct 'this' to __construct");
          var l = m.implement.apply(void 0, [this].concat(d.call(arguments)));
          pc(l);
          var u = l.g;
          l.notifyOnDestruction();
          u.ja = !0;
          Object.defineProperties(this, {
            g: {
              value: u
            }
          });
          yc(this);
          l = u.o;
          l = jc(e, l);
          ic.hasOwnProperty(l) ? P(`Tried to register registered instance: ${l}`) : ic[l] = this;
        };
        f.__destruct = function () {
          this === f && P("Pass correct 'this' to __destruct");
          pc(this);
          var l = this.g.o;
          l = jc(e, l);
          ic.hasOwnProperty(l) ? delete ic[l] : P(`Tried to unregister unregistered instance: ${l}`);
        };
        a.prototype = Object.create(f);
        for (var p in c) {
          a.prototype[p] = c[p];
        }
        return bc(a);
      },
      _embind_finalize_value_object: function (a) {
        var b = zc[a];
        delete zc[a];
        var c = b.Pa,
          d = b.V,
          e = b.Za,
          f = e.map(g => g.Pb).concat(e.map(g => g.dc));
        S([a], f, g => {
          var m = {};
          e.forEach((p, l) => {
            var u = g[l],
              v = p.Nb,
              q = p.Ob,
              k = g[l + e.length],
              r = p.cc,
              w = p.ec;
            m[p.Jb] = {
              read: y => u.fromWireType(v(q, y)),
              write: (y, E) => {
                var z = [];
                r(w, y, k.toWireType(z, E));
                Ac(z);
              }
            };
          });
          return [{
            name: b.name,
            fromWireType: function (p) {
              var l = {},
                u;
              for (u in m) {
                l[u] = m[u].read(p);
              }
              d(p);
              return l;
            },
            toWireType: function (p, l) {
              for (var u in m) {
                if (!(u in l)) {
                  throw new TypeError(`Missing field: "${u}"`);
                }
              }
              var v = c();
              for (u in m) {
                m[u].write(v, l[u]);
              }
              null !== p && p.push(d, v);
              return v;
            },
            argPackAdvance: 8,
            readValueFromPointer: Bc,
            K: d
          }];
        });
      },
      _embind_register_bigint: function () {},
      _embind_register_bool: function (a, b, c, d, e) {
        var f = Ec(c);
        b = R(b);
        T(a, {
          name: b,
          fromWireType: function (g) {
            return !!g;
          },
          toWireType: function (g, m) {
            return m ? d : e;
          },
          argPackAdvance: 8,
          readValueFromPointer: function (g) {
            if (1 === c) {
              var m = C;
            } else if (2 === c) {
              m = H;
            } else if (4 === c) {
              m = I;
            } else {
              throw new TypeError("Unknown boolean type size: " + b);
            }
            return this.fromWireType(m[g >> f]);
          },
          K: null
        });
      },
      _embind_register_class: function (a, b, c, d, e, f, g, m, p, l, u, v, q) {
        u = R(u);
        f = U(e, f);
        m && (m = U(g, m));
        l && (l = U(p, l));
        q = U(v, q);
        var k = Yb(u);
        Jc(k, function () {
          Wc(`Cannot construct ${u} due to unbound types`, [d]);
        });
        S([a, b, c], d ? [d] : [], function (r) {
          r = r[0];
          if (d) {
            var w = r.i;
            var y = w.N;
          } else {
            y = Hc.prototype;
          }
          r = Zb(k, function () {
            if (Object.getPrototypeOf(this) !== E) {
              throw new ac("Use 'new' to construct " + u);
            }
            if (void 0 === z.Z) {
              throw new ac(u + " has no accessible constructor");
            }
            var D = z.Z[arguments.length];
            if (void 0 === D) {
              throw new ac(`Tried to invoke ctor of ${u} with invalid number of parameters (${arguments.length}) - expected (${Object.keys(z.Z).toString()}) parameters instead!`);
            }
            return D.apply(this, arguments);
          });
          var E = Object.create(y, {
            constructor: {
              value: r
            }
          });
          r.prototype = E;
          var z = new Kc(u, r, E, q, w, f, m, l);
          z.A && (void 0 === z.A.qa && (z.A.qa = []), z.A.qa.push(z));
          w = new Qc(u, z, !0, !1);
          y = new Qc(u + "*", z, !1, !1);
          var F = new Qc(u + " const*", z, !1, !0);
          tc[a] = {
            pointerType: y,
            Db: F
          };
          Rc(k, r);
          return [w, y, F];
        });
      },
      _embind_register_class_class_function: function (a, b, c, d, e, f, g) {
        var m = Yc(c, d);
        b = R(b);
        f = U(e, f);
        S([], [a], function (p) {
          function l() {
            Wc(`Cannot call ${u} due to unbound types`, m);
          }
          p = p[0];
          var u = `${p.name}.${b}`;
          b.startsWith("@@") && (b = Symbol[b.substring(2)]);
          var v = p.i.constructor;
          void 0 === v[b] ? (l.fa = c - 1, v[b] = l) : (Ic(v, b, u), v[b].B[c - 1] = l);
          S([], m, function (q) {
            q = Xc(u, [q[0], null].concat(q.slice(1)), null, f, g);
            void 0 === v[b].B ? (q.fa = c - 1, v[b] = q) : v[b].B[c - 1] = q;
            if (p.i.qa) {
              for (const k of p.i.qa) {
                k.constructor.hasOwnProperty(b) || (k.constructor[b] = q);
              }
            }
            return [];
          });
          return [];
        });
      },
      _embind_register_class_class_property: function (a, b, c, d, e, f, g, m) {
        b = R(b);
        f = U(e, f);
        S([], [a], function (p) {
          p = p[0];
          var l = `${p.name}.${b}`,
            u = {
              get() {
                Wc(`Cannot access ${l} due to unbound types`, [c]);
              },
              enumerable: !0,
              configurable: !0
            };
          u.set = m ? () => {
            Wc(`Cannot access ${l} due to unbound types`, [c]);
          } : () => {
            P(`${l} is a read-only property`);
          };
          Object.defineProperty(p.i.constructor, b, u);
          S([], [c], function (v) {
            v = v[0];
            var q = {
              get() {
                return v.fromWireType(f(d));
              },
              enumerable: !0
            };
            m && (m = U(g, m), q.set = k => {
              var r = [];
              m(d, v.toWireType(r, k));
              Ac(r);
            });
            Object.defineProperty(p.i.constructor, b, q);
            return [];
          });
          return [];
        });
      },
      _embind_register_class_constructor: function (a, b, c, d, e, f) {
        var g = Yc(b, c);
        e = U(d, e);
        S([], [a], function (m) {
          m = m[0];
          var p = `constructor ${m.name}`;
          void 0 === m.i.Z && (m.i.Z = []);
          if (void 0 !== m.i.Z[b - 1]) {
            throw new ac(`Cannot register multiple constructors with identical number of parameters (${b - 1}) for class '${m.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
          }
          m.i.Z[b - 1] = () => {
            Wc(`Cannot construct ${m.name} due to unbound types`, g);
          };
          S([], g, function (l) {
            l.splice(1, 0, null);
            m.i.Z[b - 1] = Xc(p, l, null, e, f);
            return [];
          });
          return [];
        });
      },
      _embind_register_class_function: function (a, b, c, d, e, f, g, m) {
        var p = Yc(c, d);
        b = R(b);
        f = U(e, f);
        S([], [a], function (l) {
          function u() {
            Wc(`Cannot call ${v} due to unbound types`, p);
          }
          l = l[0];
          var v = `${l.name}.${b}`;
          b.startsWith("@@") && (b = Symbol[b.substring(2)]);
          m && l.i.kb.push(b);
          var q = l.i.N,
            k = q[b];
          void 0 === k || void 0 === k.B && k.className !== l.name && k.fa === c - 2 ? (u.fa = c - 2, u.className = l.name, q[b] = u) : (Ic(q, b, v), q[b].B[c - 2] = u);
          S([], p, function (r) {
            r = Xc(v, r, l, f, g);
            void 0 === q[b].B ? (r.fa = c - 2, q[b] = r) : q[b].B[c - 2] = r;
            return [];
          });
          return [];
        });
      },
      _embind_register_class_property: function (a, b, c, d, e, f, g, m, p, l) {
        b = R(b);
        e = U(d, e);
        S([], [a], function (u) {
          u = u[0];
          var v = `${u.name}.${b}`,
            q = {
              get() {
                Wc(`Cannot access ${v} due to unbound types`, [c, g]);
              },
              enumerable: !0,
              configurable: !0
            };
          q.set = p ? () => {
            Wc(`Cannot access ${v} due to unbound types`, [c, g]);
          } : () => {
            P(v + " is a read-only property");
          };
          Object.defineProperty(u.i.N, b, q);
          S([], p ? [c, g] : [c], function (k) {
            var r = k[0],
              w = {
                get() {
                  var E = Zc(this, u, v + " getter");
                  return r.fromWireType(e(f, E));
                },
                enumerable: !0
              };
            if (p) {
              p = U(m, p);
              var y = k[1];
              w.set = function (E) {
                var z = Zc(this, u, v + " setter"),
                  F = [];
                p(l, z, y.toWireType(F, E));
                Ac(F);
              };
            }
            Object.defineProperty(u.i.N, b, w);
            return [];
          });
          return [];
        });
      },
      _embind_register_emval: function (a, b) {
        b = R(b);
        T(a, {
          name: b,
          fromWireType: function (c) {
            var d = Q(c);
            $c(c);
            return d;
          },
          toWireType: function (c, d) {
            return bc(d);
          },
          argPackAdvance: 8,
          readValueFromPointer: Bc,
          K: null
        });
      },
      _embind_register_enum: function (a, b, c, d) {
        function e() {}
        c = Ec(c);
        b = R(b);
        e.values = {};
        T(a, {
          name: b,
          constructor: e,
          fromWireType: function (f) {
            return this.constructor.values[f];
          },
          toWireType: function (f, g) {
            return g.value;
          },
          argPackAdvance: 8,
          readValueFromPointer: ad(b, c, d),
          K: null
        });
        Jc(b, e);
      },
      _embind_register_enum_value: function (a, b, c) {
        var d = oc(a, "enum");
        b = R(b);
        a = d.constructor;
        d = Object.create(d.constructor.prototype, {
          value: {
            value: c
          },
          constructor: {
            value: Zb(`${d.name}_${b}`, function () {})
          }
        });
        a.values[c] = d;
        a[b] = d;
      },
      _embind_register_float: function (a, b, c) {
        c = Ec(c);
        b = R(b);
        T(a, {
          name: b,
          fromWireType: function (d) {
            return d;
          },
          toWireType: function (d, e) {
            return e;
          },
          argPackAdvance: 8,
          readValueFromPointer: bd(b, c),
          K: null
        });
      },
      _embind_register_function: function (a, b, c, d, e, f) {
        var g = Yc(b, c);
        a = R(a);
        e = U(d, e);
        Jc(a, function () {
          Wc(`Cannot call ${a} due to unbound types`, g);
        }, b - 1);
        S([], g, function (m) {
          Rc(a, Xc(a, [m[0], null].concat(m.slice(1)), null, e, f), b - 1);
          return [];
        });
      },
      _embind_register_integer: function (a, b, c, d, e) {
        b = R(b);
        -1 === e && (e = 4294967295);
        e = Ec(c);
        var f = m => m;
        if (0 === d) {
          var g = 32 - 8 * c;
          f = m => m << g >>> g;
        }
        c = b.includes("unsigned") ? function (m, p) {
          return p >>> 0;
        } : function (m, p) {
          return p;
        };
        T(a, {
          name: b,
          fromWireType: f,
          toWireType: c,
          argPackAdvance: 8,
          readValueFromPointer: cd(b, e, 0 !== d),
          K: null
        });
      },
      _embind_register_memory_view: function (a, b, c) {
        function d(f) {
          f >>= 2;
          var g = J;
          return new e(g.buffer, g[f + 1], g[f]);
        }
        var e = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][b];
        c = R(c);
        T(a, {
          name: c,
          fromWireType: d,
          argPackAdvance: 8,
          readValueFromPointer: d
        }, {
          Rb: !0
        });
      },
      _embind_register_std_string: function (a, b) {
        b = R(b);
        var c = "std::string" === b;
        T(a, {
          name: b,
          fromWireType: function (d) {
            var e = J[d >> 2],
              f = d + 4;
            if (c) {
              for (var g = f, m = 0; m <= e; ++m) {
                var p = f + m;
                if (m == e || 0 == G[p]) {
                  g = g ? K(G, g, p - g) : "";
                  if (void 0 === l) {
                    var l = g;
                  } else {
                    l += String.fromCharCode(0), l += g;
                  }
                  g = p + 1;
                }
              }
            } else {
              l = Array(e);
              for (m = 0; m < e; ++m) {
                l[m] = String.fromCharCode(G[f + m]);
              }
              l = l.join("");
            }
            nc(d);
            return l;
          },
          toWireType: function (d, e) {
            e instanceof ArrayBuffer && (e = new Uint8Array(e));
            var f = "string" == typeof e;
            f || e instanceof Uint8Array || e instanceof Uint8ClampedArray || e instanceof Int8Array || P("Cannot pass non-string to std::string");
            var g = c && f ? db(e) : e.length;
            var m = Kd(4 + g + 1),
              p = m + 4;
            J[m >> 2] = g;
            if (c && f) {
              eb(e, G, p, g + 1);
            } else {
              if (f) {
                for (f = 0; f < g; ++f) {
                  var l = e.charCodeAt(f);
                  255 < l && (nc(p), P("String has UTF-16 code units that do not fit in 8 bits"));
                  G[p + f] = l;
                }
              } else {
                for (f = 0; f < g; ++f) {
                  G[p + f] = e[f];
                }
              }
            }
            null !== d && d.push(nc, m);
            return m;
          },
          argPackAdvance: 8,
          readValueFromPointer: Bc,
          K: function (d) {
            nc(d);
          }
        });
      },
      _embind_register_std_wstring: function (a, b, c) {
        c = R(c);
        if (2 === b) {
          var d = ed;
          var e = fd;
          var f = gd;
          var g = () => va;
          var m = 1;
        } else {
          4 === b && (d = hd, e = jd, f = kd, g = () => J, m = 2);
        }
        T(a, {
          name: c,
          fromWireType: function (p) {
            for (var l = J[p >> 2], u = g(), v, q = p + 4, k = 0; k <= l; ++k) {
              var r = p + 4 + k * b;
              if (k == l || 0 == u[r >> m]) {
                q = d(q, r - q), void 0 === v ? v = q : (v += String.fromCharCode(0), v += q), q = r + b;
              }
            }
            nc(p);
            return v;
          },
          toWireType: function (p, l) {
            "string" != typeof l && P(`Cannot pass non-string to C++ string type ${c}`);
            var u = f(l),
              v = Kd(4 + u + b);
            J[v >> 2] = u >> m;
            e(l, v + 4, u + b);
            null !== p && p.push(nc, v);
            return v;
          },
          argPackAdvance: 8,
          readValueFromPointer: Bc,
          K: function (p) {
            nc(p);
          }
        });
      },
      _embind_register_value_object: function (a, b, c, d, e, f) {
        zc[a] = {
          name: R(b),
          Pa: U(c, d),
          V: U(e, f),
          Za: []
        };
      },
      _embind_register_value_object_field: function (a, b, c, d, e, f, g, m, p, l) {
        zc[a].Za.push({
          Jb: R(b),
          Pb: c,
          Nb: U(d, e),
          Ob: f,
          dc: g,
          cc: U(m, p),
          ec: l
        });
      },
      _embind_register_void: function (a, b) {
        b = R(b);
        T(a, {
          Xb: !0,
          name: b,
          argPackAdvance: 0,
          fromWireType: function () {},
          toWireType: function () {}
        });
      },
      _emscripten_get_now_is_monotonic: () => !0,
      _emval_as: function (a, b, c) {
        a = Q(a);
        b = oc(b, "emval::as");
        var d = [],
          e = bc(d);
        J[c >> 2] = e;
        return b.toWireType(d, a);
      },
      _emval_call_method: function (a, b, c, d, e) {
        a = nd[a];
        b = Q(b);
        c = md(c);
        var f = [];
        J[d >> 2] = bc(f);
        return a(b, c, f, e);
      },
      _emval_call_void_method: function (a, b, c, d) {
        a = nd[a];
        b = Q(b);
        c = md(c);
        a(b, c, null, d);
      },
      _emval_decref: $c,
      _emval_get_method_caller: function (a, b) {
        var c = pd(a, b),
          d = c[0];
        b = d.name + "_$" + c.slice(1).map(function (g) {
          return g.name;
        }).join("_") + "$";
        var e = qd[b];
        if (void 0 !== e) {
          return e;
        }
        var f = Array(a - 1);
        e = od((g, m, p, l) => {
          for (var u = 0, v = 0; v < a - 1; ++v) {
            f[v] = c[v + 1].readValueFromPointer(l + u), u += c[v + 1].argPackAdvance;
          }
          g = g[m].apply(g, f);
          for (v = 0; v < a - 1; ++v) {
            c[v + 1].Fb && c[v + 1].Fb(f[v]);
          }
          if (!d.Xb) {
            return d.toWireType(p, g);
          }
        });
        return qd[b] = e;
      },
      _emval_get_property: function (a, b) {
        a = Q(a);
        b = Q(b);
        return bc(a[b]);
      },
      _emval_incref: function (a) {
        4 < a && (O.get(a).ob += 1);
      },
      _emval_new_cstring: function (a) {
        return bc(md(a));
      },
      _emval_new_object: function () {
        return bc({});
      },
      _emval_run_destructors: function (a) {
        var b = Q(a);
        Ac(b);
        $c(a);
      },
      _emval_set_property: function (a, b, c) {
        a = Q(a);
        b = Q(b);
        c = Q(c);
        a[b] = c;
      },
      _emval_take_value: function (a, b) {
        a = oc(a, "_emval_take_value");
        a = a.readValueFromPointer(b);
        return bc(a);
      },
      abort: () => {
        sa("");
      },
      beginPixelLocalStorageWEBGL: function (a, b, c) {
        (a = t[a].H.ia) && a.beginPixelLocalStorageWEBGL(n.HEAPU32.subarray(c, c + b));
      },
      begin_texture_image_decode: function (a, b, c) {
        a = W[a];
        a.image = new Image();
        a.image.src = URL.createObjectURL(new Blob([n.HEAP8.subarray(b, b + c)]), {
          type: "image/png"
        });
        a.complete = !1;
      },
      emscripten_asm_const_int: (a, b, c) => {
        rd.length = 0;
        var d;
        for (c >>= 2; d = G[b++];) {
          c += 105 != d & c, rd.push(105 == d ? I[c] : xa[c++ >> 1]), ++c;
        }
        return Ta[a].apply(null, rd);
      },
      emscripten_date_now: function () {
        return Date.now();
      },
      emscripten_get_now: () => performance.now(),
      emscripten_memcpy_big: (a, b, c) => G.copyWithin(a, b, b + c),
      emscripten_resize_heap: a => {
        var b = G.length;
        a >>>= 0;
        if (2147483648 < a) {
          return !1;
        }
        for (var c = 1; 4 >= c; c *= 2) {
          var d = b * (1 + 0.2 / c);
          d = Math.min(d, a + 100663296);
          var e = Math;
          d = Math.max(a, d);
          a: {
            e = e.min.call(e, 2147483648, d + (65536 - d % 65536) % 65536) - ta.buffer.byteLength + 65535 >>> 16;
            try {
              ta.grow(e);
              ya();
              var f = 1;
              break a;
            } catch (g) {}
            f = void 0;
          }
          if (f) {
            return !0;
          }
        }
        return !1;
      },
      emscripten_webgl_enable_extension: function (a, b) {
        a = t[a];
        b = b ? K(G, b) : "";
        b.startsWith("GL_") && (b = b.substr(3));
        "WEBGL_draw_instanced_base_vertex_base_instance" == b && sd(Z);
        "WEBGL_multi_draw_instanced_base_vertex_base_instance" == b && td(Z);
        "WEBGL_multi_draw" == b && Dd(Z);
        return !!a.H.getExtension(b);
      },
      emscripten_webgl_get_current_context: function () {
        return Cd ? Cd.handle : 0;
      },
      emscripten_webgl_make_context_current: function (a) {
        return ja(a) ? 0 : -5;
      },
      enable_WEBGL_provoking_vertex: function (a) {
        a = t[a].H;
        a.lb = a.getExtension("WEBGL_provoking_vertex");
        return !!a.lb;
      },
      enable_WEBGL_shader_pixel_local_storage_coherent: function (a) {
        a = t[a].H;
        a.ia = a.getExtension("WEBGL_shader_pixel_local_storage");
        return !(!a.ia || !a.ia.isCoherent());
      },
      endPixelLocalStorageWEBGL: function (a, b, c) {
        (a = t[a].H.ia) && a.endPixelLocalStorageWEBGL(n.HEAPU32.subarray(c, c + b));
      },
      environ_get: (a, b) => {
        var c = 0;
        Gd().forEach(function (d, e) {
          var f = b + c;
          e = J[a + 4 * e >> 2] = f;
          for (f = 0; f < d.length; ++f) {
            C[e++ >> 0] = d.charCodeAt(f);
          }
          C[e >> 0] = 0;
          c += d.length + 1;
        });
        return 0;
      },
      environ_sizes_get: (a, b) => {
        var c = Gd();
        J[a >> 2] = c.length;
        var d = 0;
        c.forEach(function (e) {
          d += e.length + 1;
        });
        J[b >> 2] = d;
        return 0;
      },
      fd_close: function (a) {
        try {
          var b = Ib(a);
          if (null === b.W) {
            throw new L(8);
          }
          b.Ma && (b.Ma = null);
          try {
            b.m.close && b.m.close(b);
          } catch (c) {
            throw c;
          } finally {
            vb[b.W] = null;
          }
          b.W = null;
          return 0;
        } catch (c) {
          if ("undefined" == typeof Vb || "ErrnoError" !== c.name) {
            throw c;
          }
          return c.$;
        }
      },
      fd_read: function (a, b, c, d) {
        try {
          a: {
            var e = Ib(a);
            a = b;
            for (var f, g = b = 0; g < c; g++) {
              var m = J[a >> 2],
                p = J[a + 4 >> 2];
              a += 8;
              var l = e,
                u = m,
                v = p,
                q = f,
                k = C;
              if (0 > v || 0 > q) {
                throw new L(28);
              }
              if (null === l.W) {
                throw new L(8);
              }
              if (1 === (l.flags & 2097155)) {
                throw new L(8);
              }
              if (16384 === (l.node.mode & 61440)) {
                throw new L(31);
              }
              if (!l.m.read) {
                throw new L(28);
              }
              var r = "undefined" != typeof q;
              if (!r) {
                q = l.position;
              } else if (!l.seekable) {
                throw new L(70);
              }
              var w = l.m.read(l, k, u, v, q);
              r || (l.position += w);
              var y = w;
              if (0 > y) {
                var E = -1;
                break a;
              }
              b += y;
              if (y < p) {
                break;
              }
              "undefined" !== typeof f && (f += y);
            }
            E = b;
          }
          J[d >> 2] = E;
          return 0;
        } catch (z) {
          if ("undefined" == typeof Vb || "ErrnoError" !== z.name) {
            throw z;
          }
          return z.$;
        }
      },
      fd_seek: function (a, b, c, d, e) {
        b = c + 2097152 >>> 0 < 4194305 - !!b ? (b >>> 0) + 4294967296 * c : NaN;
        try {
          if (isNaN(b)) {
            return 61;
          }
          var f = Ib(a);
          Qb(f, b, d);
          Pa = [f.position >>> 0, (Oa = f.position, 1.0 <= +Math.abs(Oa) ? 0.0 < Oa ? +Math.floor(Oa / 4294967296.0) >>> 0 : ~~+Math.ceil((Oa - +(~~Oa >>> 0)) / 4294967296.0) >>> 0 : 0)];
          I[e >> 2] = Pa[0];
          I[e + 4 >> 2] = Pa[1];
          f.Ma && 0 === b && 0 === d && (f.Ma = null);
          return 0;
        } catch (g) {
          if ("undefined" == typeof Vb || "ErrnoError" !== g.name) {
            throw g;
          }
          return g.$;
        }
      },
      fd_write: function (a, b, c, d) {
        try {
          a: {
            var e = Ib(a);
            a = b;
            for (var f, g = b = 0; g < c; g++) {
              var m = J[a >> 2],
                p = J[a + 4 >> 2];
              a += 8;
              var l = e,
                u = m,
                v = p,
                q = f,
                k = C;
              if (0 > v || 0 > q) {
                throw new L(28);
              }
              if (null === l.W) {
                throw new L(8);
              }
              if (0 === (l.flags & 2097155)) {
                throw new L(8);
              }
              if (16384 === (l.node.mode & 61440)) {
                throw new L(31);
              }
              if (!l.m.write) {
                throw new L(28);
              }
              l.seekable && l.flags & 1024 && Qb(l, 0, 2);
              var r = "undefined" != typeof q;
              if (!r) {
                q = l.position;
              } else if (!l.seekable) {
                throw new L(70);
              }
              var w = l.m.write(l, k, u, v, q, void 0);
              r || (l.position += w);
              var y = w;
              if (0 > y) {
                var E = -1;
                break a;
              }
              b += y;
              "undefined" !== typeof f && (f += y);
            }
            E = b;
          }
          J[d >> 2] = E;
          return 0;
        } catch (z) {
          if ("undefined" == typeof Vb || "ErrnoError" !== z.name) {
            throw z;
          }
          return z.$;
        }
      },
      framebufferPixelLocalClearValuefvWEBGL: function (a, b, c, d, e, f) {
        (a = t[a].H.ia) && a.framebufferPixelLocalClearValuefvWEBGL(b, [c, d, e, f]);
      },
      framebufferTexturePixelLocalStorageWEBGL: function (a, b, c, d, e) {
        (a = t[a].H.ia) && a.framebufferTexturePixelLocalStorageWEBGL(b, W[c], d, e);
      },
      glActiveTexture: function (a) {
        Z.activeTexture(a);
      },
      glAttachShader: function (a, b) {
        Z.attachShader(V[a], yd[b]);
      },
      glBindBuffer: function (a, b) {
        35051 == a ? Z.Wa = b : 35052 == a && (Z.Ka = b);
        Z.bindBuffer(a, vd[b]);
      },
      glBindBufferRange: function (a, b, c, d, e) {
        Z.bindBufferRange(a, b, vd[c], d, e);
      },
      glBindFramebuffer: function (a, b) {
        Z.bindFramebuffer(a, wd[b]);
      },
      glBindRenderbuffer: function (a, b) {
        Z.bindRenderbuffer(a, xd[b]);
      },
      glBindTexture: function (a, b) {
        Z.bindTexture(a, W[b]);
      },
      glBindVertexArray: function (a) {
        Z.bindVertexArray(zd[a]);
      },
      glBlendEquation: function (a) {
        Z.blendEquation(a);
      },
      glBlendFunc: function (a, b) {
        Z.blendFunc(a, b);
      },
      glBlitFramebuffer: function (a, b, c, d, e, f, g, m, p, l) {
        Z.blitFramebuffer(a, b, c, d, e, f, g, m, p, l);
      },
      glBufferData: function (a, b, c, d) {
        c && b ? Z.bufferData(a, G, d, c, b) : Z.bufferData(a, b, d);
      },
      glBufferSubData: function (a, b, c, d) {
        c && Z.bufferSubData(a, b, G, d, c);
      },
      glClear: function (a) {
        Z.clear(a);
      },
      glClearColor: function (a, b, c, d) {
        Z.clearColor(a, b, c, d);
      },
      glClearDepthf: function (a) {
        Z.clearDepth(a);
      },
      glClearStencil: function (a) {
        Z.clearStencil(a);
      },
      glColorMask: function (a, b, c, d) {
        Z.colorMask(!!a, !!b, !!c, !!d);
      },
      glCompileShader: function (a) {
        Z.compileShader(yd[a]);
      },
      glCreateProgram: function () {
        var a = ha(V),
          b = Z.createProgram();
        b.name = a;
        b.Fc = b.Dc = b.Ec = 0;
        b.Sa = 1;
        V[a] = b;
        return a;
      },
      glCreateShader: function (a) {
        var b = ha(yd);
        yd[b] = Z.createShader(a);
        return b;
      },
      glCullFace: function (a) {
        Z.cullFace(a);
      },
      glDeleteBuffers: function (a, b) {
        for (var c = 0; c < a; c++) {
          var d = I[b + 4 * c >> 2],
            e = vd[d];
          e && (Z.deleteBuffer(e), e.name = 0, vd[d] = null, d == Z.Wa && (Z.Wa = 0), d == Z.Ka && (Z.Ka = 0));
        }
      },
      glDeleteFramebuffers: function (a, b) {
        for (var c = 0; c < a; ++c) {
          var d = I[b + 4 * c >> 2],
            e = wd[d];
          e && (Z.deleteFramebuffer(e), e.name = 0, wd[d] = null);
        }
      },
      glDeleteProgram: function (a) {
        if (a) {
          var b = V[a];
          b ? (Z.deleteProgram(b), b.name = 0, V[a] = null) : X(1281);
        }
      },
      glDeleteRenderbuffers: function (a, b) {
        for (var c = 0; c < a; c++) {
          var d = I[b + 4 * c >> 2],
            e = xd[d];
          e && (Z.deleteRenderbuffer(e), e.name = 0, xd[d] = null);
        }
      },
      glDeleteShader: function (a) {
        if (a) {
          var b = yd[a];
          b ? (Z.deleteShader(b), yd[a] = null) : X(1281);
        }
      },
      glDeleteTextures: function (a, b) {
        for (var c = 0; c < a; c++) {
          var d = I[b + 4 * c >> 2],
            e = W[d];
          e && (Z.deleteTexture(e), e.name = 0, W[d] = null);
        }
      },
      glDeleteVertexArrays: function (a, b) {
        for (var c = 0; c < a; c++) {
          var d = I[b + 4 * c >> 2];
          Z.deleteVertexArray(zd[d]);
          zd[d] = null;
        }
      },
      glDepthFunc: function (a) {
        Z.depthFunc(a);
      },
      glDepthMask: function (a) {
        Z.depthMask(!!a);
      },
      glDepthRangef: function (a, b) {
        Z.depthRange(a, b);
      },
      glDisable: function (a) {
        Z.disable(a);
      },
      glDrawArrays: function (a, b, c) {
        Z.drawArrays(a, b, c);
      },
      glDrawArraysInstanced: function (a, b, c, d) {
        Z.drawArraysInstanced(a, b, c, d);
      },
      glDrawBuffers: function (a, b) {
        for (var c = Hd[a], d = 0; d < a; d++) {
          c[d] = I[b + 4 * d >> 2];
        }
        Z.drawBuffers(c);
      },
      glDrawElements: function (a, b, c, d) {
        Z.drawElements(a, b, c, d);
      },
      glDrawElementsInstanced: function (a, b, c, d, e) {
        Z.drawElementsInstanced(a, b, c, d, e);
      },
      glEnable: function (a) {
        Z.enable(a);
      },
      glEnableVertexAttribArray: function (a) {
        Z.enableVertexAttribArray(a);
      },
      glFramebufferRenderbuffer: function (a, b, c, d) {
        Z.framebufferRenderbuffer(a, b, c, xd[d]);
      },
      glFramebufferTexture2D: function (a, b, c, d, e) {
        Z.framebufferTexture2D(a, b, c, W[d], e);
      },
      glFrontFace: function (a) {
        Z.frontFace(a);
      },
      glGenBuffers: function (a, b) {
        Id(a, b, "createBuffer", vd);
      },
      glGenFramebuffers: function (a, b) {
        Id(a, b, "createFramebuffer", wd);
      },
      glGenRenderbuffers: function (a, b) {
        Id(a, b, "createRenderbuffer", xd);
      },
      glGenTextures: function (a, b) {
        Id(a, b, "createTexture", W);
      },
      glGenVertexArrays: function (a, b) {
        Id(a, b, "createVertexArray", zd);
      },
      glGenerateMipmap: function (a) {
        Z.generateMipmap(a);
      },
      glGetIntegerv: function (a, b) {
        Jd(a, b);
      },
      glGetString: function (a) {
        var b = Ad[a];
        if (!b) {
          switch (a) {
            case 7939:
              b = Z.getSupportedExtensions() || [];
              b = b.concat(b.map(function (d) {
                return "GL_" + d;
              }));
              b = Ld(b.join(" "));
              break;
            case 7936:
            case 7937:
            case 37445:
            case 37446:
              (b = Z.getParameter(a)) || X(1280);
              b = b && Ld(b);
              break;
            case 7938:
              b = Ld("OpenGL ES 3.0 (" + Z.getParameter(7938) + ")");
              break;
            case 35724:
              b = Z.getParameter(35724);
              var c = b.match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);
              null !== c && (3 == c[1].length && (c[1] += "0"), b = "OpenGL ES GLSL ES " + c[1] + " (" + b + ")");
              b = Ld(b);
              break;
            default:
              X(1280);
          }
          Ad[a] = b;
        }
        return b;
      },
      glGetUniformBlockIndex: function (a, b) {
        return Z.getUniformBlockIndex(V[a], b ? K(G, b) : "");
      },
      glGetUniformLocation: function (a, b) {
        b = b ? K(G, b) : "";
        if (a = V[a]) {
          var c = a,
            d = c.oa,
            e = c.tb,
            f;
          if (!d) {
            for (c.oa = d = {}, c.sb = {}, f = 0; f < Z.getProgramParameter(c, 35718); ++f) {
              var g = Z.getActiveUniform(c, f);
              var m = g.name;
              g = g.size;
              var p = Md(m);
              p = 0 < p ? m.slice(0, p) : m;
              var l = c.Sa;
              c.Sa += g;
              e[p] = [g, l];
              for (m = 0; m < g; ++m) {
                d[l] = m, c.sb[l++] = p;
              }
            }
          }
          c = a.oa;
          d = 0;
          e = b;
          f = Md(b);
          0 < f && (d = parseInt(b.slice(f + 1)) >>> 0, e = b.slice(0, f));
          if ((e = a.tb[e]) && d < e[0] && (d += e[1], c[d] = c[d] || Z.getUniformLocation(a, b))) {
            return d;
          }
        } else {
          X(1281);
        }
        return -1;
      },
      glInvalidateFramebuffer: function (a, b, c) {
        for (var d = Hd[b], e = 0; e < b; e++) {
          d[e] = I[c + 4 * e >> 2];
        }
        Z.invalidateFramebuffer(a, d);
      },
      glLinkProgram: function (a) {
        a = V[a];
        Z.linkProgram(a);
        a.oa = 0;
        a.tb = {};
      },
      glPixelStorei: function (a, b) {
        Z.pixelStorei(a, b);
      },
      glRenderbufferStorageMultisample: function (a, b, c, d, e) {
        Z.renderbufferStorageMultisample(a, b, c, d, e);
      },
      glScissor: function (a, b, c, d) {
        Z.scissor(a, b, c, d);
      },
      glShaderSource: function (a, b, c, d) {
        for (var e = "", f = 0; f < b; ++f) {
          var g = d ? I[d + 4 * f >> 2] : -1,
            m = I[c + 4 * f >> 2];
          g = m ? K(G, m, 0 > g ? void 0 : g) : "";
          e += g;
        }
        Z.shaderSource(yd[a], e);
      },
      glStencilFunc: function (a, b, c) {
        Z.stencilFunc(a, b, c);
      },
      glStencilFuncSeparate: function (a, b, c, d) {
        Z.stencilFuncSeparate(a, b, c, d);
      },
      glStencilMask: function (a) {
        Z.stencilMask(a);
      },
      glStencilOp: function (a, b, c) {
        Z.stencilOp(a, b, c);
      },
      glStencilOpSeparate: function (a, b, c, d) {
        Z.stencilOpSeparate(a, b, c, d);
      },
      glTexParameteri: function (a, b, c) {
        Z.texParameteri(a, b, c);
      },
      glTexStorage2D: function (a, b, c, d, e) {
        Z.texStorage2D(a, b, c, d, e);
      },
      glTexSubImage2D: function (a, b, c, d, e, f, g, m, p) {
        if (Z.Ka) {
          Z.texSubImage2D(a, b, c, d, e, f, g, m, p);
        } else if (p) {
          var l = m - 5120;
          l = 0 == l ? C : 1 == l ? G : 2 == l ? H : 4 == l ? I : 6 == l ? wa : 5 == l || 28922 == l || 28520 == l || 30779 == l || 30782 == l ? J : va;
          Z.texSubImage2D(a, b, c, d, e, f, g, m, l, p >> 31 - Math.clz32(l.BYTES_PER_ELEMENT));
        } else {
          Z.texSubImage2D(a, b, c, d, e, f, g, m, null);
        }
      },
      glUniform1i: function (a, b) {
        var c = Z,
          d = c.uniform1i;
        var e = Z.Eb;
        if (e) {
          var f = e.oa[a];
          "number" == typeof f && (e.oa[a] = f = Z.getUniformLocation(e, e.sb[a] + (0 < f ? "[" + f + "]" : "")));
          a = f;
        } else {
          X(1282), a = void 0;
        }
        d.call(c, a, b);
      },
      glUniformBlockBinding: function (a, b, c) {
        a = V[a];
        Z.uniformBlockBinding(a, b, c);
      },
      glUseProgram: function (a) {
        a = V[a];
        Z.useProgram(a);
        Z.Eb = a;
      },
      glVertexAttribDivisor: function (a, b) {
        Z.vertexAttribDivisor(a, b);
      },
      glVertexAttribIPointer: function (a, b, c, d, e) {
        Z.vertexAttribIPointer(a, b, c, d, e);
      },
      glVertexAttribPointer: function (a, b, c, d, e, f) {
        Z.vertexAttribPointer(a, b, c, !!d, e, f);
      },
      glViewport: function (a, b, c, d) {
        Z.viewport(a, b, c, d);
      },
      is_texture_image_done_decoding: function (a) {
        a = W[a];
        return a.complete || a.image.complete;
      },
      provokingVertexWEBGL: function (a, b) {
        (a = t[a].H.lb) && a.provokingVertexWEBGL(b);
      },
      set_decoded_tex_image_2d: function (a, b) {
        a = t[a].H;
        b = W[b];
        a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, a.RGBA, a.UNSIGNED_BYTE, b.image);
        b.imageWidth = b.image.width;
        b.imageHeight = b.image.height;
        b.complete = !0;
        delete b.image;
      },
      strftime_l: (a, b, c, d) => Qd(a, b, c, d),
      texture_image_height: function (a) {
        a = W[a];
        return a.imageHeight;
      },
      texture_image_width: function (a) {
        a = W[a];
        return a.imageWidth;
      },
      webgl_texSubImage2DWithOffset: function (a, b, c, d, e, f, g, m, p, l) {
        a = t[a].H;
        a.texSubImage2D(b, c, d, e, f, g, m, p, l);
      }
    };
    (function () {
      function a(c) {
        B = c = c.exports;
        ta = B.memory;
        ya();
        za = B.__indirect_function_table;
        Ba.unshift(B.__wasm_call_ctors);
        Ea--;
        n.monitorRunDependencies && n.monitorRunDependencies(Ea);
        if (0 == Ea && (null !== Fa && (clearInterval(Fa), Fa = null), Ga)) {
          var d = Ga;
          Ga = null;
          d();
        }
        return c;
      }
      var b = {
        env: Vd,
        wasi_snapshot_preview1: Vd
      };
      Ea++;
      n.monitorRunDependencies && n.monitorRunDependencies(Ea);
      if (n.instantiateWasm) {
        try {
          return n.instantiateWasm(b, a);
        } catch (c) {
          A("Module.instantiateWasm callback failed with error: " + c), ba(c);
        }
      }
      Na(b, function (c) {
        a(c.instance);
      }).catch(ba);
      return {};
    })();
    var nc = a => (nc = B.free)(a),
      Kd = a => (Kd = B.malloc)(a),
      Qa = n._ma_device__on_notification_unlocked = a => (Qa = n._ma_device__on_notification_unlocked = B.ma_device__on_notification_unlocked)(a);
    n._ma_malloc_emscripten = (a, b) => (n._ma_malloc_emscripten = B.ma_malloc_emscripten)(a, b);
    n._ma_free_emscripten = (a, b) => (n._ma_free_emscripten = B.ma_free_emscripten)(a, b);
    var Ra = n._ma_device_process_pcm_frames_capture__webaudio = (a, b, c) => (Ra = n._ma_device_process_pcm_frames_capture__webaudio = B.ma_device_process_pcm_frames_capture__webaudio)(a, b, c),
      Sa = n._ma_device_process_pcm_frames_playback__webaudio = (a, b, c) => (Sa = n._ma_device_process_pcm_frames_playback__webaudio = B.ma_device_process_pcm_frames_playback__webaudio)(a, b, c),
      Ud = () => (Ud = B.__errno_location)(),
      mc = a => (mc = B.__getTypeName)(a);
    n.__embind_initialize_bindings = () => (n.__embind_initialize_bindings = B._embind_initialize_bindings)();
    n.dynCall_iiji = (a, b, c, d, e) => (n.dynCall_iiji = B.dynCall_iiji)(a, b, c, d, e);
    n.dynCall_iiiji = (a, b, c, d, e, f) => (n.dynCall_iiiji = B.dynCall_iiiji)(a, b, c, d, e, f);
    n.dynCall_iij = (a, b, c, d) => (n.dynCall_iij = B.dynCall_iij)(a, b, c, d);
    n.dynCall_jii = (a, b, c) => (n.dynCall_jii = B.dynCall_jii)(a, b, c);
    n.dynCall_jiji = (a, b, c, d, e) => (n.dynCall_jiji = B.dynCall_jiji)(a, b, c, d, e);
    n.dynCall_viijii = (a, b, c, d, e, f, g) => (n.dynCall_viijii = B.dynCall_viijii)(a, b, c, d, e, f, g);
    n.dynCall_iiiiij = (a, b, c, d, e, f, g) => (n.dynCall_iiiiij = B.dynCall_iiiiij)(a, b, c, d, e, f, g);
    n.dynCall_iiiiijj = (a, b, c, d, e, f, g, m, p) => (n.dynCall_iiiiijj = B.dynCall_iiiiijj)(a, b, c, d, e, f, g, m, p);
    n.dynCall_iiiiiijj = (a, b, c, d, e, f, g, m, p, l) => (n.dynCall_iiiiiijj = B.dynCall_iiiiiijj)(a, b, c, d, e, f, g, m, p, l);
    n.___start_em_js = 480164;
    n.___stop_em_js = 482788;
    var Wd;
    Ga = function Xd() {
      Wd || Yd();
      Wd || (Ga = Xd);
    };
    function Yd() {
      function a() {
        if (!Wd && (Wd = !0, n.calledRun = !0, !ua)) {
          n.noFSInit || Sb || (Sb = !0, Rb(), n.stdin = n.stdin, n.stdout = n.stdout, n.stderr = n.stderr, n.stdin ? Ub("stdin", n.stdin) : Nb("/dev/tty", "/dev/stdin"), n.stdout ? Ub("stdout", null, n.stdout) : Nb("/dev/tty", "/dev/stdout"), n.stderr ? Ub("stderr", null, n.stderr) : Nb("/dev/tty1", "/dev/stderr"), Pb("/dev/stdin", 0), Pb("/dev/stdout", 1), Pb("/dev/stderr", 1));
          yb = !1;
          Ua(Ba);
          aa(n);
          if (n.onRuntimeInitialized) {
            n.onRuntimeInitialized();
          }
          if (n.postRun) {
            for ("function" == typeof n.postRun && (n.postRun = [n.postRun]); n.postRun.length;) {
              var b = n.postRun.shift();
              Ca.unshift(b);
            }
          }
          Ua(Ca);
        }
      }
      if (!(0 < Ea)) {
        if (n.preRun) {
          for ("function" == typeof n.preRun && (n.preRun = [n.preRun]); n.preRun.length;) {
            Da();
          }
        }
        Ua(Aa);
        0 < Ea || (n.setStatus ? (n.setStatus("Running..."), setTimeout(function () {
          setTimeout(function () {
            n.setStatus("");
          }, 1);
          a();
        }, 1)) : a());
      }
    }
    if (n.preInit) {
      for ("function" == typeof n.preInit && (n.preInit = [n.preInit]); 0 < n.preInit.length;) {
        n.preInit.pop()();
      }
    }
    Yd();
    return moduleArg.ready;
  };
})();
var _default = exports.default = Rive;
},{}],"src/index.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
      label: 0,
      sent: function sent() {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
require("./styles.css");
var webgl2_advanced_1 = __importDefault(require("@rive-app/webgl2-advanced"));
function main() {
  return __awaiter(this, void 0, void 0, function () {
    function renderLoop(time) {
      if (!lastTime) {
        lastTime = time;
      }
      var elapsedTimeMs = time - lastTime;
      var elapsedTimeSec = elapsedTimeMs / 1000;
      lastTime = time;
      renderer.clear();
      if (artboard) {
        if (animation) {
          animation.advance(elapsedTimeSec);
          animation.apply(1);
        }
        artboard.advance(elapsedTimeSec);
        renderer.save();
        artboard.draw(renderer);
        renderer.restore();
      }
      renderer.flush();
      rive.requestAnimationFrame(renderLoop);
    }
    var rive, canvas, renderer, bytes, file, artboard, animation, lastTime;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, (0, webgl2_advanced_1.default)({
            // Loads Wasm bundle
            locateFile: function locateFile(_) {
              return "https://unpkg.com/@rive-app/webgl2-advanced@2.21.3/rive.wasm";
            }
          })];
        case 1:
          rive = _a.sent();
          canvas = document.getElementById('rive-canvas');
          canvas.height = 400;
          canvas.width = 500;
          renderer = rive.makeRenderer(canvas, true);
          return [4 /*yield*/, fetch(new Request('./basketball.riv'))];
        case 2:
          return [4 /*yield*/, _a.sent().arrayBuffer()];
        case 3:
          bytes = _a.sent();
          return [4 /*yield*/, rive.load(new Uint8Array(bytes))];
        case 4:
          file = _a.sent();
          artboard = file.defaultArtboard();
          animation = new rive.LinearAnimationInstance(artboard.animationByIndex(0), artboard);
          lastTime = 0;
          rive.requestAnimationFrame(renderLoop);
          return [2 /*return*/];
      }
    });
  });
}
main();
},{"./styles.css":"src/styles.css","@rive-app/webgl2-advanced":"node_modules/@rive-app/webgl2-advanced/webgl2_advanced.mjs"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51510" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map