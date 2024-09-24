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
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"node_modules/@rive-app/webgl-advanced/webgl_advanced.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var Rive = (() => {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
  return function (moduleArg = {}) {
    var m = moduleArg,
      aa,
      ba;
    m.ready = new Promise((a, b) => {
      aa = a;
      ba = b;
    });
    function ca() {
      function a(g) {
        const k = d;
        c = b = 0;
        d = new Map();
        k.forEach(q => {
          try {
            q(g);
          } catch (n) {
            console.error(n);
          }
        });
        this.kb();
        e && e.Mb();
      }
      let b = 0,
        c = 0,
        d = new Map(),
        e = null,
        f = null;
      this.requestAnimationFrame = function (g) {
        b || (b = requestAnimationFrame(a.bind(this)));
        const k = ++c;
        d.set(k, g);
        return k;
      };
      this.cancelAnimationFrame = function (g) {
        d.delete(g);
        b && 0 == d.size && (cancelAnimationFrame(b), b = 0);
      };
      this.Kb = function (g) {
        f && (document.body.remove(f), f = null);
        g || (f = document.createElement("div"), f.style.backgroundColor = "black", f.style.position = "fixed", f.style.right = 0, f.style.top = 0, f.style.color = "white", f.style.padding = "4px", f.innerHTML = "RIVE FPS", g = function (k) {
          f.innerHTML = "RIVE FPS " + k.toFixed(1);
        }, document.body.appendChild(f));
        e = new function () {
          let k = 0,
            q = 0;
          this.Mb = function () {
            var n = performance.now();
            q ? (++k, n -= q, 1000 < n && (g(1000 * k / n), k = q = 0)) : (q = n, k = 0);
          };
        }();
      };
      this.kb = function () {};
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
    const ea = m.onRuntimeInitialized;
    m.onRuntimeInitialized = function () {
      ea && ea();
      let a = m.decodeAudio;
      m.decodeAudio = function (d, e) {
        d = a(d);
        e(d);
      };
      let b = m.decodeFont;
      m.decodeFont = function (d, e) {
        d = b(d);
        e(d);
      };
      const c = m.FileAssetLoader;
      m.ptrToAsset = d => {
        let e = m.ptrToFileAsset(d);
        return e.isImage ? m.ptrToImageAsset(d) : e.isFont ? m.ptrToFontAsset(d) : e.isAudio ? m.ptrToAudioAsset(d) : e;
      };
      m.CustomFileAssetLoader = c.extend("CustomFileAssetLoader", {
        __construct: function ({
          loadContents: d
        }) {
          this.__parent.__construct.call(this);
          this.Bb = d;
        },
        loadContents: function (d, e) {
          d = m.ptrToAsset(d);
          return this.Bb(d, e);
        }
      });
      m.CDNFileAssetLoader = c.extend("CDNFileAssetLoader", {
        __construct: function () {
          this.__parent.__construct.call(this);
        },
        loadContents: function (d) {
          let e = m.ptrToAsset(d);
          d = e.cdnUuid;
          if ("" === d) {
            return !1;
          }
          (function (f, g) {
            var k = new XMLHttpRequest();
            k.responseType = "arraybuffer";
            k.onreadystatechange = function () {
              4 == k.readyState && 200 == k.status && g(k);
            };
            k.open("GET", f, !0);
            k.send(null);
          })(e.cdnBaseUrl + "/" + d, f => {
            e.decode(new Uint8Array(f.response));
          });
          return !0;
        }
      });
      m.FallbackFileAssetLoader = c.extend("FallbackFileAssetLoader", {
        __construct: function () {
          this.__parent.__construct.call(this);
          this.fb = [];
        },
        addLoader: function (d) {
          this.fb.push(d);
        },
        loadContents: function (d, e) {
          for (let f of this.fb) {
            if (f.loadContents(d, e)) {
              return !0;
            }
          }
          return !1;
        }
      });
    };
    const fa = m.onRuntimeInitialized;
    m.onRuntimeInitialized = function () {
      function a(l) {
        this.F = l;
        this.yb = l.getContext("2d");
        this.Db = e;
        this.R = [];
        this.ja = 0;
        this.clear = function () {
          console.assert(0 == this.ja);
          this.R = [];
          f.delete(this);
        };
        this.save = function () {
          ++this.ja;
          this.R.push(e.save.bind(e));
        };
        this.restore = function () {
          0 < this.ja && (this.R.push(e.restore.bind(e)), --this.ja);
        };
        this.transform = function (r) {
          this.R.push(e.transform.bind(e, r));
        };
        this.align = function (r, x, z, G) {
          this.R.push(e.align.bind(e, r, x, z, G));
        };
        this.flush = function () {
          console.assert(0 == this.ja);
          f.add(this);
          d && c();
        };
      }
      function b(l) {
        var r = {
            alpha: 1,
            depth: 0,
            stencil: 8,
            antialias: 0,
            premultipliedAlpha: 1,
            preserveDrawingBuffer: 0,
            preferLowPowerToHighPerformance: 0,
            failIfMajorPerformanceCaveat: 0,
            enableExtensionsByDefault: 1,
            explicitSwapControl: 0,
            renderViaOffscreenBackBuffer: 0
          },
          x = l.getContext("webgl2", r);
        x || (x = l.getContext("webgl", r));
        var z = x,
          G = ia(ja),
          C = {
            handle: G,
            attributes: r,
            version: r.Dc,
            Ta: z
          };
        z.canvas && (z.canvas.pc = C);
        ja[G] = C;
        ("undefined" == typeof r.Jb || r.Jb) && ka(C);
        la(G);
        r = g(l.width, l.height);
        r.Ab = G;
        r.F = l;
        r.Va = l.width;
        r.Ua = l.height;
        r.zb = x;
        return r;
      }
      function c() {
        if (e) {
          var l = e.Cb,
            r = 0,
            x = 0,
            z = 0,
            G = Array(f.size),
            C = 0;
          for (var J of f) {
            J.da = Math.min(J.F.width, l), J.ca = Math.min(J.F.height, l), J.Ja = J.ca * J.da, r = Math.max(r, J.da), x = Math.max(x, J.ca), z += J.Ja, G[C++] = J;
          }
          f.clear();
          if (!(0 >= z)) {
            r = 1 << (0 >= r ? 0 : 32 - Math.clz32(r - 1));
            for (x = 1 << (0 >= x ? 0 : 32 - Math.clz32(x - 1)); x * r < z;) {
              r <= x ? r *= 2 : x *= 2;
            }
            r = Math.min(r, l);
            r = Math.min(x, l);
            G.sort((ha, Fb) => Fb.Ja - ha.Ja);
            z = new m.DynamicRectanizer(l);
            for (J = 0; J < G.length;) {
              z.reset(r, x);
              for (C = J; C < G.length; ++C) {
                var N = G[C],
                  K = z.addRect(N.da, N.ca);
                if (0 > K) {
                  console.assert(C > J);
                  break;
                }
                N.pa = K & 65535;
                N.qa = K >> 16;
              }
              N = q.push(z.drawWidth());
              K = n.push(z.drawHeight());
              console.assert(N >= z.drawWidth());
              console.assert(K >= z.drawHeight());
              console.assert(N <= l);
              console.assert(K <= l);
              e.F.width != N && (e.F.width = N);
              e.F.height != K && (e.F.height = K);
              e.clear();
              for (N = J; N < C; ++N) {
                K = G[N];
                e.saveClipRect(K.pa, K.qa, K.pa + K.da, K.qa + K.ca);
                let ha = new m.Mat2D();
                ha.xx = K.da / K.F.width;
                ha.yy = K.ca / K.F.height;
                ha.xy = ha.yx = 0;
                ha.tx = K.pa;
                ha.ty = K.qa;
                e.transform(ha);
                for (const Fb of K.R) {
                  Fb();
                }
                e.restoreClipRect();
                K.R = [];
              }
              for (e.flush(); J < C; ++J) {
                N = G[J], K = N.yb, K.globalCompositeOperation = "copy", K.drawImage(e.F, N.pa, N.qa, N.da, N.ca, 0, 0, N.F.width, N.F.height);
              }
              J = C;
            }
          }
        }
      }
      fa && fa();
      const d = navigator.userAgent.match(/firefox|fxios/i);
      let e = null;
      const f = new Set(),
        g = m.makeRenderer;
      m.makeRenderer = function (l, r) {
        return r ? (e || (e = b(document.createElement("canvas")), r = e.zb, e.Cb = Math.min(r.getParameter(r.MAX_RENDERBUFFER_SIZE), r.getParameter(r.MAX_TEXTURE_SIZE))), new a(l)) : b(l);
      };
      const k = m.Artboard.prototype.draw;
      m.Artboard.prototype.draw = function (l) {
        l.R ? l.R.push(k.bind(this, l.Db)) : k.call(this, l);
      };
      const q = new da(),
        n = new da(),
        t = new ca();
      m.requestAnimationFrame = t.requestAnimationFrame.bind(t);
      m.cancelAnimationFrame = t.cancelAnimationFrame.bind(t);
      m.enableFPSCounter = t.Kb.bind(t);
      t.kb = c;
      m.resolveAnimationFrame = c;
      let v = m.load;
      m.load = function (l, r, x = !0) {
        const z = new m.FallbackFileAssetLoader();
        void 0 !== r && z.addLoader(r);
        x && (r = new m.CDNFileAssetLoader(), z.addLoader(r));
        return Promise.resolve(v(l, z));
      };
      const y = m.WebGLRenderer.prototype.clear;
      m.WebGLRenderer.prototype.clear = function () {
        la(this.Ab);
        const l = this.F;
        if (this.Va != l.width || this.Ua != l.height) {
          this.resize(l.width, l.height), this.Va = l.width, this.Ua = l.height;
        }
        y.call(this);
      };
      m.decodeImage = function (l, r) {
        l = m.decodeImageSkia(l);
        r(l);
      };
    };
    var ma = Object.assign({}, m),
      na = "./this.program",
      oa = "object" == typeof window,
      pa = "function" == typeof importScripts,
      qa = "",
      ra,
      sa;
    if (oa || pa) {
      pa ? qa = self.location.href : "undefined" != typeof document && document.currentScript && (qa = document.currentScript.src), _scriptDir && (qa = _scriptDir), 0 !== qa.indexOf("blob:") ? qa = qa.substr(0, qa.replace(/[?#].*/, "").lastIndexOf("/") + 1) : qa = "", pa && (sa = a => {
        var b = new XMLHttpRequest();
        b.open("GET", a, !1);
        b.responseType = "arraybuffer";
        b.send(null);
        return new Uint8Array(b.response);
      }), ra = (a, b, c) => {
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
    var ta = m.print || console.log.bind(console),
      ua = m.printErr || console.error.bind(console);
    Object.assign(m, ma);
    ma = null;
    m.thisProgram && (na = m.thisProgram);
    var va;
    m.wasmBinary && (va = m.wasmBinary);
    var noExitRuntime = m.noExitRuntime || !0;
    "object" != typeof WebAssembly && wa("no native wasm support detected");
    var xa,
      p,
      ya = !1,
      u,
      w,
      A,
      za,
      B,
      D,
      E,
      Aa;
    function Ba() {
      var a = xa.buffer;
      m.HEAP8 = u = new Int8Array(a);
      m.HEAP16 = A = new Int16Array(a);
      m.HEAP32 = B = new Int32Array(a);
      m.HEAPU8 = w = new Uint8Array(a);
      m.HEAPU16 = za = new Uint16Array(a);
      m.HEAPU32 = D = new Uint32Array(a);
      m.HEAPF32 = E = new Float32Array(a);
      m.HEAPF64 = Aa = new Float64Array(a);
    }
    var Ca,
      Da = [],
      Ea = [],
      Fa = [];
    function Ga() {
      var a = m.preRun.shift();
      Da.unshift(a);
    }
    var Ha = 0,
      Ia = null,
      Ja = null;
    function wa(a) {
      if (m.onAbort) {
        m.onAbort(a);
      }
      a = "Aborted(" + a + ")";
      ua(a);
      ya = !0;
      a = new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");
      ba(a);
      throw a;
    }
    function Ka(a) {
      return a.startsWith("data:application/octet-stream;base64,");
    }
    var La;
    La = "webgl_advanced.wasm";
    if (!Ka(La)) {
      var Ma = La;
      La = m.locateFile ? m.locateFile(Ma, qa) : qa + Ma;
    }
    function Na(a) {
      if (a == La && va) {
        return new Uint8Array(va);
      }
      if (sa) {
        return sa(a);
      }
      throw "both async and sync fetching of the wasm failed";
    }
    function Oa(a) {
      if (!va && (oa || pa)) {
        if ("function" == typeof fetch && !a.startsWith("file://")) {
          return fetch(a, {
            credentials: "same-origin"
          }).then(b => {
            if (!b.ok) {
              throw "failed to load wasm binary file at '" + a + "'";
            }
            return b.arrayBuffer();
          }).catch(() => Na(a));
        }
        if (ra) {
          return new Promise((b, c) => {
            ra(a, d => b(new Uint8Array(d)), c);
          });
        }
      }
      return Promise.resolve().then(() => Na(a));
    }
    function Pa(a, b, c) {
      return Oa(a).then(d => WebAssembly.instantiate(d, b)).then(d => d).then(c, d => {
        ua("failed to asynchronously prepare wasm: " + d);
        wa(d);
      });
    }
    function Qa(a, b) {
      var c = La;
      return va || "function" != typeof WebAssembly.instantiateStreaming || Ka(c) || c.startsWith("file://") || "function" != typeof fetch ? Pa(c, a, b) : fetch(c, {
        credentials: "same-origin"
      }).then(d => WebAssembly.instantiateStreaming(d, a).then(b, function (e) {
        ua("wasm streaming compile failed: " + e);
        ua("falling back to ArrayBuffer instantiation");
        return Pa(c, a, b);
      }));
    }
    var Ra,
      Sa,
      Wa = {
        692508: (a, b, c, d, e) => {
          if ("undefined" === typeof window || void 0 === (window.AudioContext || window.webkitAudioContext)) {
            return 0;
          }
          if ("undefined" === typeof window.h) {
            window.h = {
              Ea: 0
            };
            window.h.H = {};
            window.h.H.Ca = a;
            window.h.H.capture = b;
            window.h.H.La = c;
            window.h.ha = {};
            window.h.ha.stopped = d;
            window.h.ha.sb = e;
            let f = window.h;
            f.C = [];
            f.nc = function (g) {
              for (var k = 0; k < f.C.length; ++k) {
                if (null == f.C[k]) {
                  return f.C[k] = g, k;
                }
              }
              f.C.push(g);
              return f.C.length - 1;
            };
            f.xb = function (g) {
              for (f.C[g] = null; 0 < f.C.length;) {
                if (null == f.C[f.C.length - 1]) {
                  f.C.pop();
                } else {
                  break;
                }
              }
            };
            f.Kc = function (g) {
              for (var k = 0; k < f.C.length; ++k) {
                if (f.C[k] == g) {
                  return f.xb(k);
                }
              }
            };
            f.ta = function (g) {
              return f.C[g];
            };
            f.wb = ["touchend", "click"];
            f.unlock = function () {
              for (var g = 0; g < f.C.length; ++g) {
                var k = f.C[g];
                null != k && null != k.I && k.state === f.ha.sb && k.I.resume().then(() => {
                  Ta(k.lb);
                }, q => {
                  console.error("Failed to resume audiocontext", q);
                });
              }
              f.wb.map(function (q) {
                document.removeEventListener(q, f.unlock, !0);
              });
            };
            f.wb.map(function (g) {
              document.addEventListener(g, f.unlock, !0);
            });
          }
          window.h.Ea += 1;
          return 1;
        },
        694686: () => {
          "undefined" !== typeof window.h && (--window.h.Ea, 0 === window.h.Ea && delete window.h);
        },
        694850: () => void 0 !== navigator.mediaDevices && void 0 !== navigator.mediaDevices.getUserMedia,
        694954: () => {
          try {
            var a = new (window.AudioContext || window.webkitAudioContext)(),
              b = a.sampleRate;
            a.close();
            return b;
          } catch (c) {
            return 0;
          }
        },
        695125: (a, b, c, d, e, f) => {
          if ("undefined" === typeof window.h) {
            return -1;
          }
          var g = {},
            k = {};
          a == window.h.H.Ca && 0 != c && (k.sampleRate = c);
          g.I = new (window.AudioContext || window.webkitAudioContext)(k);
          g.I.suspend();
          g.state = window.h.ha.stopped;
          c = 0;
          a != window.h.H.Ca && (c = b);
          g.X = g.I.createScriptProcessor(d, c, b);
          g.X.onaudioprocess = function (q) {
            if (null == g.ua || 0 == g.ua.length) {
              g.ua = new Float32Array(E.buffer, e, d * b);
            }
            if (a == window.h.H.capture || a == window.h.H.La) {
              for (var n = 0; n < b; n += 1) {
                for (var t = q.inputBuffer.getChannelData(n), v = g.ua, y = 0; y < d; y += 1) {
                  v[y * b + n] = t[y];
                }
              }
              Ua(f, d, e);
            }
            if (a == window.h.H.Ca || a == window.h.H.La) {
              for (Va(f, d, e), n = 0; n < q.outputBuffer.numberOfChannels; ++n) {
                for (t = q.outputBuffer.getChannelData(n), v = g.ua, y = 0; y < d; y += 1) {
                  t[y] = v[y * b + n];
                }
              }
            } else {
              for (n = 0; n < q.outputBuffer.numberOfChannels; ++n) {
                q.outputBuffer.getChannelData(n).fill(0.0);
              }
            }
          };
          a != window.h.H.capture && a != window.h.H.La || navigator.mediaDevices.getUserMedia({
            audio: !0,
            video: !1
          }).then(function (q) {
            g.Fa = g.I.createMediaStreamSource(q);
            g.Fa.connect(g.X);
            g.X.connect(g.I.destination);
          }).catch(function (q) {
            console.log("Failed to get user media: " + q);
          });
          a == window.h.H.Ca && g.X.connect(g.I.destination);
          g.lb = f;
          return window.h.nc(g);
        },
        698002: a => window.h.ta(a).I.sampleRate,
        698075: a => {
          a = window.h.ta(a);
          void 0 !== a.X && (a.X.onaudioprocess = function () {}, a.X.disconnect(), a.X = void 0);
          void 0 !== a.Fa && (a.Fa.disconnect(), a.Fa = void 0);
          a.I.close();
          a.I = void 0;
          a.lb = void 0;
        },
        698475: a => {
          window.h.xb(a);
        },
        698525: a => {
          a = window.h.ta(a);
          a.I.resume();
          a.state = window.h.ha.sb;
        },
        698664: a => {
          a = window.h.ta(a);
          a.I.suspend();
          a.state = window.h.ha.stopped;
        }
      },
      Xa = a => {
        for (; 0 < a.length;) {
          a.shift()(m);
        }
      },
      Ya = (a, b) => {
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
      Za = a => {
        var b = "/" === a.charAt(0),
          c = "/" === a.substr(-1);
        (a = Ya(a.split("/").filter(d => !!d), !b).join("/")) || b || (a = ".");
        a && c && (a += "/");
        return (b ? "/" : "") + a;
      },
      $a = a => {
        var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);
        a = b[0];
        b = b[1];
        if (!a && !b) {
          return ".";
        }
        b && (b = b.substr(0, b.length - 1));
        return a + b;
      },
      ab = a => {
        if ("/" === a) {
          return "/";
        }
        a = Za(a);
        a = a.replace(/\/$/, "");
        var b = a.lastIndexOf("/");
        return -1 === b ? a : a.substr(b + 1);
      },
      bb = () => {
        if ("object" == typeof crypto && "function" == typeof crypto.getRandomValues) {
          return a => crypto.getRandomValues(a);
        }
        wa("initRandomDevice");
      },
      cb = a => (cb = bb())(a);
    function db() {
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
      a = Ya(a.split("/").filter(d => !!d), !b).join("/");
      return (b ? "/" : "") + a || ".";
    }
    var eb = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0,
      F = (a, b, c) => {
        var d = b + c;
        for (c = b; a[c] && !(c >= d);) {
          ++c;
        }
        if (16 < c - b && a.buffer && eb) {
          return eb.decode(a.subarray(b, c));
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
      fb = [],
      gb = a => {
        for (var b = 0, c = 0; c < a.length; ++c) {
          var d = a.charCodeAt(c);
          127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, ++c) : b += 3;
        }
        return b;
      },
      hb = (a, b, c, d) => {
        if (!(0 < d)) {
          return 0;
        }
        var e = c;
        d = c + d - 1;
        for (var f = 0; f < a.length; ++f) {
          var g = a.charCodeAt(f);
          if (55296 <= g && 57343 >= g) {
            var k = a.charCodeAt(++f);
            g = 65536 + ((g & 1023) << 10) | k & 1023;
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
    function ib(a, b) {
      var c = Array(gb(a) + 1);
      a = hb(a, c, 0, c.length);
      b && (c.length = a);
      return c;
    }
    var jb = [];
    function kb(a, b) {
      jb[a] = {
        input: [],
        D: [],
        T: b
      };
      lb(a, mb);
    }
    var mb = {
        open: function (a) {
          var b = jb[a.node.Da];
          if (!b) {
            throw new H(43);
          }
          a.s = b;
          a.seekable = !1;
        },
        close: function (a) {
          a.s.T.sa(a.s);
        },
        sa: function (a) {
          a.s.T.sa(a.s);
        },
        read: function (a, b, c, d) {
          if (!a.s || !a.s.T.eb) {
            throw new H(60);
          }
          for (var e = 0, f = 0; f < d; f++) {
            try {
              var g = a.s.T.eb(a.s);
            } catch (k) {
              throw new H(29);
            }
            if (void 0 === g && 0 === e) {
              throw new H(6);
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
          if (!a.s || !a.s.T.Oa) {
            throw new H(60);
          }
          try {
            for (var e = 0; e < d; e++) {
              a.s.T.Oa(a.s, b[c + e]);
            }
          } catch (f) {
            throw new H(29);
          }
          d && (a.node.timestamp = Date.now());
          return e;
        }
      },
      nb = {
        eb: function () {
          a: {
            if (!fb.length) {
              var a = null;
              "undefined" != typeof window && "function" == typeof window.prompt ? (a = window.prompt("Input: "), null !== a && (a += "\n")) : "function" == typeof readline && (a = readline(), null !== a && (a += "\n"));
              if (!a) {
                a = null;
                break a;
              }
              fb = ib(a, !0);
            }
            a = fb.shift();
          }
          return a;
        },
        Oa: function (a, b) {
          null === b || 10 === b ? (ta(F(a.D, 0)), a.D = []) : 0 != b && a.D.push(b);
        },
        sa: function (a) {
          a.D && 0 < a.D.length && (ta(F(a.D, 0)), a.D = []);
        },
        Wb: function () {
          return {
            uc: 25856,
            wc: 5,
            tc: 191,
            vc: 35387,
            sc: [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          };
        },
        Xb: function () {
          return 0;
        },
        Yb: function () {
          return [24, 80];
        }
      },
      ob = {
        Oa: function (a, b) {
          null === b || 10 === b ? (ua(F(a.D, 0)), a.D = []) : 0 != b && a.D.push(b);
        },
        sa: function (a) {
          a.D && 0 < a.D.length && (ua(F(a.D, 0)), a.D = []);
        }
      };
    function pb(a, b) {
      var c = a.j ? a.j.length : 0;
      c >= b || (b = Math.max(b, c * (1048576 > c ? 2.0 : 1.125) >>> 0), 0 != c && (b = Math.max(b, 256)), c = a.j, a.j = new Uint8Array(b), 0 < a.v && a.j.set(c.subarray(0, a.v), 0));
    }
    var I = {
      N: null,
      S() {
        return I.createNode(null, "/", 16895, 0);
      },
      createNode(a, b, c, d) {
        if (24576 === (c & 61440) || 4096 === (c & 61440)) {
          throw new H(63);
        }
        I.N || (I.N = {
          dir: {
            node: {
              W: I.l.W,
              O: I.l.O,
              ka: I.l.ka,
              Aa: I.l.Aa,
              qb: I.l.qb,
              vb: I.l.vb,
              rb: I.l.rb,
              ob: I.l.ob,
              Ga: I.l.Ga
            },
            stream: {
              $: I.m.$
            }
          },
          file: {
            node: {
              W: I.l.W,
              O: I.l.O
            },
            stream: {
              $: I.m.$,
              read: I.m.read,
              write: I.m.write,
              ra: I.m.ra,
              hb: I.m.hb,
              jb: I.m.jb
            }
          },
          link: {
            node: {
              W: I.l.W,
              O: I.l.O,
              la: I.l.la
            },
            stream: {}
          },
          Wa: {
            node: {
              W: I.l.W,
              O: I.l.O
            },
            stream: qb
          }
        });
        c = rb(a, b, c, d);
        16384 === (c.mode & 61440) ? (c.l = I.N.dir.node, c.m = I.N.dir.stream, c.j = {}) : 32768 === (c.mode & 61440) ? (c.l = I.N.file.node, c.m = I.N.file.stream, c.v = 0, c.j = null) : 40960 === (c.mode & 61440) ? (c.l = I.N.link.node, c.m = I.N.link.stream) : 8192 === (c.mode & 61440) && (c.l = I.N.Wa.node, c.m = I.N.Wa.stream);
        c.timestamp = Date.now();
        a && (a.j[b] = c, a.timestamp = c.timestamp);
        return c;
      },
      Ac(a) {
        return a.j ? a.j.subarray ? a.j.subarray(0, a.v) : new Uint8Array(a.j) : new Uint8Array(0);
      },
      l: {
        W(a) {
          var b = {};
          b.zc = 8192 === (a.mode & 61440) ? a.id : 1;
          b.Cc = a.id;
          b.mode = a.mode;
          b.Gc = 1;
          b.uid = 0;
          b.Bc = 0;
          b.Da = a.Da;
          16384 === (a.mode & 61440) ? b.size = 4096 : 32768 === (a.mode & 61440) ? b.size = a.v : 40960 === (a.mode & 61440) ? b.size = a.link.length : b.size = 0;
          b.qc = new Date(a.timestamp);
          b.Ec = new Date(a.timestamp);
          b.xc = new Date(a.timestamp);
          b.Eb = 4096;
          b.rc = Math.ceil(b.size / b.Eb);
          return b;
        },
        O(a, b) {
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
        ka() {
          throw sb[44];
        },
        Aa(a, b, c, d) {
          return I.createNode(a, b, c, d);
        },
        qb(a, b, c) {
          if (16384 === (a.mode & 61440)) {
            try {
              var d = tb(b, c);
            } catch (f) {}
            if (d) {
              for (var e in d.j) {
                throw new H(55);
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
        vb(a, b) {
          delete a.j[b];
          a.timestamp = Date.now();
        },
        rb(a, b) {
          var c = tb(a, b),
            d;
          for (d in c.j) {
            throw new H(55);
          }
          delete a.j[b];
          a.timestamp = Date.now();
        },
        ob(a) {
          var b = [".", ".."],
            c;
          for (c in a.j) {
            a.j.hasOwnProperty(c) && b.push(c);
          }
          return b;
        },
        Ga(a, b, c) {
          a = I.createNode(a, b, 41471, 0);
          a.link = c;
          return a;
        },
        la(a) {
          if (40960 !== (a.mode & 61440)) {
            throw new H(28);
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
          b.buffer === u.buffer && (f = !1);
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
          pb(a, e + d);
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
        $(a, b, c) {
          1 === c ? b += a.position : 2 === c && 32768 === (a.node.mode & 61440) && (b += a.node.v);
          if (0 > b) {
            throw new H(28);
          }
          return b;
        },
        ra(a, b, c) {
          pb(a.node, b + c);
          a.node.v = Math.max(a.node.v, b + c);
        },
        hb(a, b, c, d, e) {
          if (32768 !== (a.node.mode & 61440)) {
            throw new H(43);
          }
          a = a.node.j;
          if (e & 2 || a.buffer !== u.buffer) {
            if (0 < c || c + b < a.length) {
              a.subarray ? a = a.subarray(c, c + b) : a = Array.prototype.slice.call(a, c, c + b);
            }
            c = !0;
            b = 65536 * Math.ceil(b / 65536);
            (e = ub(65536, b)) ? (w.fill(0, e, e + b), b = e) : b = 0;
            if (!b) {
              throw new H(48);
            }
            u.set(a, b);
          } else {
            c = !1, b = a.byteOffset;
          }
          return {
            o: b,
            L: c
          };
        },
        jb(a, b, c, d) {
          I.m.write(a, b, 0, d, c, !1);
          return 0;
        }
      }
    };
    function vb(a, b) {
      var c = 0;
      a && (c |= 365);
      b && (c |= 146);
      return c;
    }
    var wb = null,
      xb = {},
      yb = [],
      zb = 1,
      Ab = null,
      Bb = !0,
      H = null,
      sb = {},
      Db = (a, b = {}) => {
        a = db(a);
        if (!a) {
          return {
            path: "",
            node: null
          };
        }
        b = Object.assign({
          bb: !0,
          Qa: 0
        }, b);
        if (8 < b.Qa) {
          throw new H(32);
        }
        a = a.split("/").filter(g => !!g);
        for (var c = wb, d = "/", e = 0; e < a.length; e++) {
          var f = e === a.length - 1;
          if (f && b.parent) {
            break;
          }
          c = tb(c, a[e]);
          d = Za(d + "/" + a[e]);
          c.Ba && (!f || f && b.bb) && (c = c.Ba.root);
          if (!f || b.ab) {
            for (f = 0; 40960 === (c.mode & 61440);) {
              if (c = Cb(d), d = db($a(d), c), c = Db(d, {
                Qa: b.Qa + 1
              }).node, 40 < f++) {
                throw new H(32);
              }
            }
          }
        }
        return {
          path: d,
          node: c
        };
      },
      Eb = a => {
        for (var b;;) {
          if (a === a.parent) {
            return a = a.S.ib, b ? "/" !== a[a.length - 1] ? `${a}/${b}` : a + b : a;
          }
          b = b ? `${a.name}/${b}` : a.name;
          a = a.parent;
        }
      },
      Gb = (a, b) => {
        for (var c = 0, d = 0; d < b.length; d++) {
          c = (c << 5) - c + b.charCodeAt(d) | 0;
        }
        return (a + c >>> 0) % Ab.length;
      },
      tb = (a, b) => {
        var c;
        if (c = (c = Hb(a, "x")) ? c : a.l.ka ? 0 : 2) {
          throw new H(c, a);
        }
        for (c = Ab[Gb(a.id, b)]; c; c = c.ac) {
          var d = c.name;
          if (c.parent.id === a.id && d === b) {
            return c;
          }
        }
        return a.l.ka(a, b);
      },
      rb = (a, b, c, d) => {
        a = new Ib(a, b, c, d);
        b = Gb(a.parent.id, a.name);
        a.ac = Ab[b];
        return Ab[b] = a;
      },
      Jb = a => {
        var b = ["r", "w", "rw"][a & 3];
        a & 512 && (b += "w");
        return b;
      },
      Hb = (a, b) => {
        if (Bb) {
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
      Kb = (a, b) => {
        try {
          return tb(a, b), 20;
        } catch (c) {}
        return Hb(a, "wx");
      },
      Lb = () => {
        for (var a = 0; 4096 >= a; a++) {
          if (!yb[a]) {
            return a;
          }
        }
        throw new H(33);
      },
      Mb = a => {
        a = yb[a];
        if (!a) {
          throw new H(8);
        }
        return a;
      },
      Ob = (a, b = -1) => {
        Nb || (Nb = function () {
          this.h = {};
        }, Nb.prototype = {}, Object.defineProperties(Nb.prototype, {
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
        a = Object.assign(new Nb(), a);
        -1 == b && (b = Lb());
        a.V = b;
        return yb[b] = a;
      },
      qb = {
        open: a => {
          a.m = xb[a.node.Da].m;
          a.m.open && a.m.open(a);
        },
        $: () => {
          throw new H(70);
        }
      },
      lb = (a, b) => {
        xb[a] = {
          m: b
        };
      },
      Pb = (a, b) => {
        var c = "/" === b,
          d = !b;
        if (c && wb) {
          throw new H(10);
        }
        if (!c && !d) {
          var e = Db(b, {
            bb: !1
          });
          b = e.path;
          e = e.node;
          if (e.Ba) {
            throw new H(10);
          }
          if (16384 !== (e.mode & 61440)) {
            throw new H(54);
          }
        }
        b = {
          type: a,
          Ic: {},
          ib: b,
          $b: []
        };
        a = a.S(b);
        a.S = b;
        b.root = a;
        c ? wb = a : e && (e.Ba = b, e.S && e.S.$b.push(b));
      },
      Qb = (a, b, c) => {
        var d = Db(a, {
          parent: !0
        }).node;
        a = ab(a);
        if (!a || "." === a || ".." === a) {
          throw new H(28);
        }
        var e = Kb(d, a);
        if (e) {
          throw new H(e);
        }
        if (!d.l.Aa) {
          throw new H(63);
        }
        return d.l.Aa(d, a, b, c);
      },
      Rb = (a, b, c) => {
        "undefined" == typeof c && (c = b, b = 438);
        Qb(a, b | 8192, c);
      },
      Sb = (a, b) => {
        if (!db(a)) {
          throw new H(44);
        }
        var c = Db(b, {
          parent: !0
        }).node;
        if (!c) {
          throw new H(44);
        }
        b = ab(b);
        var d = Kb(c, b);
        if (d) {
          throw new H(d);
        }
        if (!c.l.Ga) {
          throw new H(63);
        }
        c.l.Ga(c, b, a);
      },
      Cb = a => {
        a = Db(a).node;
        if (!a) {
          throw new H(44);
        }
        if (!a.l.la) {
          throw new H(28);
        }
        return db(Eb(a.parent), a.l.la(a));
      },
      Ub = (a, b, c) => {
        if ("" === a) {
          throw new H(44);
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
          a = Za(a);
          try {
            e = Db(a, {
              ab: !(b & 131072)
            }).node;
          } catch (f) {}
        }
        d = !1;
        if (b & 64) {
          if (e) {
            if (b & 128) {
              throw new H(20);
            }
          } else {
            e = Qb(a, c, 0), d = !0;
          }
        }
        if (!e) {
          throw new H(44);
        }
        8192 === (e.mode & 61440) && (b &= -513);
        if (b & 65536 && 16384 !== (e.mode & 61440)) {
          throw new H(54);
        }
        if (!d && (c = e ? 40960 === (e.mode & 61440) ? 32 : 16384 === (e.mode & 61440) && ("r" !== Jb(b) || b & 512) ? 31 : Hb(e, Jb(b)) : 44)) {
          throw new H(c);
        }
        if (b & 512 && !d) {
          c = e;
          c = "string" == typeof c ? Db(c, {
            ab: !0
          }).node : c;
          if (!c.l.O) {
            throw new H(63);
          }
          if (16384 === (c.mode & 61440)) {
            throw new H(31);
          }
          if (32768 !== (c.mode & 61440)) {
            throw new H(28);
          }
          if (d = Hb(c, "w")) {
            throw new H(d);
          }
          c.l.O(c, {
            size: 0,
            timestamp: Date.now()
          });
        }
        b &= -131713;
        e = Ob({
          node: e,
          path: Eb(e),
          flags: b,
          seekable: !0,
          position: 0,
          m: e.m,
          oc: [],
          error: !1
        });
        e.m.open && e.m.open(e);
        !m.logReadFiles || b & 1 || (Tb || (Tb = {}), a in Tb || (Tb[a] = 1));
        return e;
      },
      Vb = (a, b, c) => {
        if (null === a.V) {
          throw new H(8);
        }
        if (!a.seekable || !a.m.$) {
          throw new H(70);
        }
        if (0 != c && 1 != c && 2 != c) {
          throw new H(28);
        }
        a.position = a.m.$(a, b, c);
        a.oc = [];
      },
      Wb = () => {
        H || (H = function (a, b) {
          this.name = "ErrnoError";
          this.node = b;
          this.dc = function (c) {
            this.Z = c;
          };
          this.dc(a);
          this.message = "FS error";
        }, H.prototype = Error(), H.prototype.constructor = H, [44].forEach(a => {
          sb[a] = new H(a);
          sb[a].stack = "<generic error, no stack>";
        }));
      },
      Xb,
      Zb = (a, b, c) => {
        a = Za("/dev/" + a);
        var d = vb(!!b, !!c);
        Yb || (Yb = 64);
        var e = Yb++ << 8 | 0;
        lb(e, {
          open: f => {
            f.seekable = !1;
          },
          close: () => {
            c && c.buffer && c.buffer.length && c(10);
          },
          read: (f, g, k, q) => {
            for (var n = 0, t = 0; t < q; t++) {
              try {
                var v = b();
              } catch (y) {
                throw new H(29);
              }
              if (void 0 === v && 0 === n) {
                throw new H(6);
              }
              if (null === v || void 0 === v) {
                break;
              }
              n++;
              g[k + t] = v;
            }
            n && (f.node.timestamp = Date.now());
            return n;
          },
          write: (f, g, k, q) => {
            for (var n = 0; n < q; n++) {
              try {
                c(g[k + n]);
              } catch (t) {
                throw new H(29);
              }
            }
            q && (f.node.timestamp = Date.now());
            return n;
          }
        });
        Rb(a, d, e);
      },
      Yb,
      $b = {},
      Nb,
      Tb,
      ac = void 0;
    function bc() {
      ac += 4;
      return B[ac - 4 >> 2];
    }
    function cc(a) {
      if (void 0 === a) {
        return "_unknown";
      }
      a = a.replace(/[^a-zA-Z0-9_]/g, "$");
      var b = a.charCodeAt(0);
      return 48 <= b && 57 >= b ? `_${a}` : a;
    }
    function dc(a, b) {
      a = cc(a);
      return {
        [a]: function () {
          return b.apply(this, arguments);
        }
      }[a];
    }
    function ec() {
      this.L = [void 0];
      this.cb = [];
    }
    var L = new ec(),
      fc = void 0;
    function M(a) {
      throw new fc(a);
    }
    var gc = a => {
        a || M("Cannot use deleted val. handle = " + a);
        return L.get(a).value;
      },
      hc = a => {
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
            return L.ra({
              pb: 1,
              value: a
            });
        }
      };
    function ic(a) {
      var b = Error,
        c = dc(a, function (d) {
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
    var jc = void 0,
      kc = void 0;
    function O(a) {
      for (var b = ""; w[a];) {
        b += kc[w[a++]];
      }
      return b;
    }
    var lc = [];
    function mc() {
      for (; lc.length;) {
        var a = lc.pop();
        a.g.ga = !1;
        a["delete"]();
      }
    }
    var nc = void 0,
      oc = {};
    function pc(a, b) {
      for (void 0 === b && M("ptr should not be undefined"); a.A;) {
        b = a.na(b), a = a.A;
      }
      return b;
    }
    var qc = {};
    function rc(a) {
      a = sc(a);
      var b = O(a);
      tc(a);
      return b;
    }
    function uc(a, b) {
      var c = qc[a];
      void 0 === c && M(b + " has unknown type " + rc(a));
      return c;
    }
    function vc() {}
    var wc = !1;
    function xc(a) {
      --a.count.value;
      0 === a.count.value && (a.G ? a.K.U(a.G) : a.u.i.U(a.o));
    }
    function yc(a, b, c) {
      if (b === c) {
        return a;
      }
      if (void 0 === c.A) {
        return null;
      }
      a = yc(a, b, c.A);
      return null === a ? null : c.Ib(a);
    }
    var zc = {};
    function Ac(a, b) {
      b = pc(a, b);
      return oc[b];
    }
    var Bc = void 0;
    function Cc(a) {
      throw new Bc(a);
    }
    function Dc(a, b) {
      b.u && b.o || Cc("makeClassHandle requires ptr and ptrType");
      !!b.K !== !!b.G && Cc("Both smartPtrType and smartPtr must be specified");
      b.count = {
        value: 1
      };
      return Ec(Object.create(a, {
        g: {
          value: b
        }
      }));
    }
    function Ec(a) {
      if ("undefined" === typeof FinalizationRegistry) {
        return Ec = b => b, a;
      }
      wc = new FinalizationRegistry(b => {
        xc(b.g);
      });
      Ec = b => {
        var c = b.g;
        c.G && wc.register(b, {
          g: c
        }, b);
        return b;
      };
      vc = b => {
        wc.unregister(b);
      };
      return Ec(a);
    }
    var Fc = {};
    function Gc(a) {
      for (; a.length;) {
        var b = a.pop();
        a.pop()(b);
      }
    }
    function Hc(a) {
      return this.fromWireType(B[a >> 2]);
    }
    var Ic = {},
      Jc = {};
    function P(a, b, c) {
      function d(k) {
        k = c(k);
        k.length !== a.length && Cc("Mismatched type converter count");
        for (var q = 0; q < a.length; ++q) {
          Kc(a[q], k[q]);
        }
      }
      a.forEach(function (k) {
        Jc[k] = b;
      });
      var e = Array(b.length),
        f = [],
        g = 0;
      b.forEach((k, q) => {
        qc.hasOwnProperty(k) ? e[q] = qc[k] : (f.push(k), Ic.hasOwnProperty(k) || (Ic[k] = []), Ic[k].push(() => {
          e[q] = qc[k];
          ++g;
          g === f.length && d(e);
        }));
      });
      0 === f.length && d(e);
    }
    function Lc(a) {
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
    function Mc(a, b, c = {}) {
      var d = b.name;
      a || M(`type "${d}" must have a positive integer typeid pointer`);
      if (qc.hasOwnProperty(a)) {
        if (c.Tb) {
          return;
        }
        M(`Cannot register type '${d}' twice`);
      }
      qc[a] = b;
      delete Jc[a];
      Ic.hasOwnProperty(a) && (b = Ic[a], delete Ic[a], b.forEach(e => e()));
    }
    function Kc(a, b, c = {}) {
      if (!("argPackAdvance" in b)) {
        throw new TypeError("registerType registeredInstance requires argPackAdvance");
      }
      Mc(a, b, c);
    }
    function Nc(a) {
      M(a.g.u.i.name + " instance already deleted");
    }
    function Oc() {}
    function Pc(a, b, c) {
      if (void 0 === a[b].B) {
        var d = a[b];
        a[b] = function () {
          a[b].B.hasOwnProperty(arguments.length) || M(`Function '${c}' called with an invalid number of arguments (${arguments.length}) - expects one of (${a[b].B})!`);
          return a[b].B[arguments.length].apply(this, arguments);
        };
        a[b].B = [];
        a[b].B[d.ea] = d;
      }
    }
    function Qc(a, b, c) {
      m.hasOwnProperty(a) ? ((void 0 === c || void 0 !== m[a].B && void 0 !== m[a].B[c]) && M(`Cannot register public name '${a}' twice`), Pc(m, a, a), m.hasOwnProperty(c) && M(`Cannot register multiple overloads of a function with the same number of arguments (${c})!`), m[a].B[c] = b) : (m[a] = b, void 0 !== c && (m[a].Hc = c));
    }
    function Rc(a, b, c, d, e, f, g, k) {
      this.name = a;
      this.constructor = b;
      this.M = c;
      this.U = d;
      this.A = e;
      this.Nb = f;
      this.na = g;
      this.Ib = k;
      this.mb = [];
    }
    function Sc(a, b, c) {
      for (; b !== c;) {
        b.na || M(`Expected null or instance of ${c.name}, got an instance of ${b.name}`), a = b.na(a), b = b.A;
      }
      return a;
    }
    function Tc(a, b) {
      if (null === b) {
        return this.Na && M(`null is not a valid ${this.name}`), 0;
      }
      b.g || M(`Cannot pass "${Uc(b)}" as a ${this.name}`);
      b.g.o || M(`Cannot pass deleted object as a pointer of type ${this.name}`);
      return Sc(b.g.o, b.g.u.i, this.i);
    }
    function Vc(a, b) {
      if (null === b) {
        this.Na && M(`null is not a valid ${this.name}`);
        if (this.wa) {
          var c = this.Pa();
          null !== a && a.push(this.U, c);
          return c;
        }
        return 0;
      }
      b.g || M(`Cannot pass "${Uc(b)}" as a ${this.name}`);
      b.g.o || M(`Cannot pass deleted object as a pointer of type ${this.name}`);
      !this.va && b.g.u.va && M(`Cannot convert argument of type ${b.g.K ? b.g.K.name : b.g.u.name} to parameter type ${this.name}`);
      c = Sc(b.g.o, b.g.u.i, this.i);
      if (this.wa) {
        switch (void 0 === b.g.G && M("Passing raw pointer to smart pointer is illegal"), this.ic) {
          case 0:
            b.g.K === this ? c = b.g.G : M(`Cannot convert argument of type ${b.g.K ? b.g.K.name : b.g.u.name} to parameter type ${this.name}`);
            break;
          case 1:
            c = b.g.G;
            break;
          case 2:
            if (b.g.K === this) {
              c = b.g.G;
            } else {
              var d = b.clone();
              c = this.cc(c, hc(function () {
                d["delete"]();
              }));
              null !== a && a.push(this.U, c);
            }
            break;
          default:
            M("Unsupporting sharing policy");
        }
      }
      return c;
    }
    function Wc(a, b) {
      if (null === b) {
        return this.Na && M(`null is not a valid ${this.name}`), 0;
      }
      b.g || M(`Cannot pass "${Uc(b)}" as a ${this.name}`);
      b.g.o || M(`Cannot pass deleted object as a pointer of type ${this.name}`);
      b.g.u.va && M(`Cannot convert argument of type ${b.g.u.name} to parameter type ${this.name}`);
      return Sc(b.g.o, b.g.u.i, this.i);
    }
    function Xc(a, b, c, d) {
      this.name = a;
      this.i = b;
      this.Na = c;
      this.va = d;
      this.wa = !1;
      this.U = this.cc = this.Pa = this.nb = this.ic = this.bc = void 0;
      void 0 !== b.A ? this.toWireType = Vc : (this.toWireType = d ? Tc : Wc, this.J = null);
    }
    function Yc(a, b, c) {
      m.hasOwnProperty(a) || Cc("Replacing nonexistant public symbol");
      void 0 !== m[a].B && void 0 !== c ? m[a].B[c] = b : (m[a] = b, m[a].ea = c);
    }
    var Zc = [],
      Q = a => {
        var b = Zc[a];
        b || (a >= Zc.length && (Zc.length = a + 1), Zc[a] = b = Ca.get(a));
        return b;
      },
      $c = (a, b) => {
        var c = [];
        return function () {
          c.length = 0;
          Object.assign(c, arguments);
          if (a.includes("j")) {
            var d = m["dynCall_" + a];
            d = c && c.length ? d.apply(null, [b].concat(c)) : d.call(null, b);
          } else {
            d = Q(b).apply(null, c);
          }
          return d;
        };
      };
    function R(a, b) {
      a = O(a);
      var c = a.includes("j") ? $c(a, b) : Q(b);
      "function" != typeof c && M(`unknown function pointer with signature ${a}: ${b}`);
      return c;
    }
    var ad = void 0;
    function bd(a, b) {
      function c(f) {
        e[f] || qc[f] || (Jc[f] ? Jc[f].forEach(c) : (d.push(f), e[f] = !0));
      }
      var d = [],
        e = {};
      b.forEach(c);
      throw new ad(`${a}: ` + d.map(rc).join([", "]));
    }
    function cd(a, b, c, d, e) {
      var f = b.length;
      2 > f && M("argTypes array size mismatch! Must at least get return value and 'this' types!");
      var g = null !== b[1] && null !== c,
        k = !1;
      for (c = 1; c < b.length; ++c) {
        if (null !== b[c] && void 0 === b[c].J) {
          k = !0;
          break;
        }
      }
      var q = "void" !== b[0].name,
        n = f - 2,
        t = Array(n),
        v = [],
        y = [];
      return function () {
        arguments.length !== n && M(`function ${a} called with ${arguments.length} arguments, expected ${n} args!`);
        y.length = 0;
        v.length = g ? 2 : 1;
        v[0] = e;
        if (g) {
          var l = b[1].toWireType(y, this);
          v[1] = l;
        }
        for (var r = 0; r < n; ++r) {
          t[r] = b[r + 2].toWireType(y, arguments[r]), v.push(t[r]);
        }
        r = d.apply(null, v);
        if (k) {
          Gc(y);
        } else {
          for (var x = g ? 1 : 2; x < b.length; x++) {
            var z = 1 === x ? l : t[x - 2];
            null !== b[x].J && b[x].J(z);
          }
        }
        l = q ? b[0].fromWireType(r) : void 0;
        return l;
      };
    }
    function dd(a, b) {
      for (var c = [], d = 0; d < a; d++) {
        c.push(D[b + 4 * d >> 2]);
      }
      return c;
    }
    function ed(a, b, c) {
      a instanceof Object || M(`${c} with invalid "this": ${a}`);
      a instanceof b.i.constructor || M(`${c} incompatible with "this" of type ${a.constructor.name}`);
      a.g.o || M(`cannot call emscripten binding method ${c} on deleted object`);
      return Sc(a.g.o, a.g.u.i, b.i);
    }
    function fd(a) {
      a >= L.h && 0 === --L.get(a).pb && L.Sb(a);
    }
    function gd(a, b, c) {
      switch (b) {
        case 0:
          return function (d) {
            return this.fromWireType((c ? u : w)[d]);
          };
        case 1:
          return function (d) {
            return this.fromWireType((c ? A : za)[d >> 1]);
          };
        case 2:
          return function (d) {
            return this.fromWireType((c ? B : D)[d >> 2]);
          };
        default:
          throw new TypeError("Unknown integer type: " + a);
      }
    }
    function Uc(a) {
      if (null === a) {
        return "null";
      }
      var b = typeof a;
      return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a;
    }
    function hd(a, b) {
      switch (b) {
        case 2:
          return function (c) {
            return this.fromWireType(E[c >> 2]);
          };
        case 3:
          return function (c) {
            return this.fromWireType(Aa[c >> 3]);
          };
        default:
          throw new TypeError("Unknown float type: " + a);
      }
    }
    function jd(a, b, c) {
      switch (b) {
        case 0:
          return c ? function (d) {
            return u[d];
          } : function (d) {
            return w[d];
          };
        case 1:
          return c ? function (d) {
            return A[d >> 1];
          } : function (d) {
            return za[d >> 1];
          };
        case 2:
          return c ? function (d) {
            return B[d >> 2];
          } : function (d) {
            return D[d >> 2];
          };
        default:
          throw new TypeError("Unknown integer type: " + a);
      }
    }
    var kd = "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0,
      ld = (a, b) => {
        var c = a >> 1;
        for (var d = c + b / 2; !(c >= d) && za[c];) {
          ++c;
        }
        c <<= 1;
        if (32 < c - a && kd) {
          return kd.decode(w.subarray(a, c));
        }
        c = "";
        for (d = 0; !(d >= b / 2); ++d) {
          var e = A[a + 2 * d >> 1];
          if (0 == e) {
            break;
          }
          c += String.fromCharCode(e);
        }
        return c;
      },
      md = (a, b, c) => {
        void 0 === c && (c = 2147483647);
        if (2 > c) {
          return 0;
        }
        c -= 2;
        var d = b;
        c = c < 2 * a.length ? c / 2 : a.length;
        for (var e = 0; e < c; ++e) {
          A[b >> 1] = a.charCodeAt(e), b += 2;
        }
        A[b >> 1] = 0;
        return b - d;
      },
      nd = a => 2 * a.length,
      od = (a, b) => {
        for (var c = 0, d = ""; !(c >= b / 4);) {
          var e = B[a + 4 * c >> 2];
          if (0 == e) {
            break;
          }
          ++c;
          65536 <= e ? (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023)) : d += String.fromCharCode(e);
        }
        return d;
      },
      pd = (a, b, c) => {
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
          B[b >> 2] = f;
          b += 4;
          if (b + 4 > c) {
            break;
          }
        }
        B[b >> 2] = 0;
        return b - d;
      },
      qd = a => {
        for (var b = 0, c = 0; c < a.length; ++c) {
          var d = a.charCodeAt(c);
          55296 <= d && 57343 >= d && ++c;
          b += 4;
        }
        return b;
      },
      rd = {};
    function sd(a) {
      var b = rd[a];
      return void 0 === b ? O(a) : b;
    }
    var td = [];
    function ud(a) {
      var b = td.length;
      td.push(a);
      return b;
    }
    function vd(a, b) {
      for (var c = Array(a), d = 0; d < a; ++d) {
        c[d] = uc(D[b + 4 * d >> 2], "parameter " + d);
      }
      return c;
    }
    var wd = [],
      xd = [];
    function yd(a) {
      var b = a.getExtension("ANGLE_instanced_arrays");
      b && (a.vertexAttribDivisor = function (c, d) {
        b.vertexAttribDivisorANGLE(c, d);
      }, a.drawArraysInstanced = function (c, d, e, f) {
        b.drawArraysInstancedANGLE(c, d, e, f);
      }, a.drawElementsInstanced = function (c, d, e, f, g) {
        b.drawElementsInstancedANGLE(c, d, e, f, g);
      });
    }
    function zd(a) {
      var b = a.getExtension("OES_vertex_array_object");
      b && (a.createVertexArray = function () {
        return b.createVertexArrayOES();
      }, a.deleteVertexArray = function (c) {
        b.deleteVertexArrayOES(c);
      }, a.bindVertexArray = function (c) {
        b.bindVertexArrayOES(c);
      }, a.isVertexArray = function (c) {
        return b.isVertexArrayOES(c);
      });
    }
    function Ad(a) {
      var b = a.getExtension("WEBGL_draw_buffers");
      b && (a.drawBuffers = function (c, d) {
        b.drawBuffersWEBGL(c, d);
      });
    }
    var Bd = 1,
      Cd = [],
      Dd = [],
      Ed = [],
      Fd = [],
      Gd = [],
      Hd = [],
      Id = [],
      ja = [],
      Jd = [],
      Kd = [],
      Ld = {},
      Md = {},
      Nd = 4;
    function S(a) {
      Od || (Od = a);
    }
    function ia(a) {
      for (var b = Bd++, c = a.length; c < b; c++) {
        a[c] = null;
      }
      return b;
    }
    function la(a) {
      T = ja[a];
      m.yc = U = T && T.Ta;
      return !(a && !U);
    }
    function ka(a) {
      a || (a = T);
      if (!a.Ub) {
        a.Ub = !0;
        var b = a.Ta;
        yd(b);
        zd(b);
        Ad(b);
        b.Ya = b.getExtension("WEBGL_draw_instanced_base_vertex_base_instance");
        b.gb = b.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance");
        2 <= a.version && (b.Za = b.getExtension("EXT_disjoint_timer_query_webgl2"));
        if (2 > a.version || !b.Za) {
          b.Za = b.getExtension("EXT_disjoint_timer_query");
        }
        b.Fc = b.getExtension("WEBGL_multi_draw");
        (b.getSupportedExtensions() || []).forEach(function (c) {
          c.includes("lose_context") || c.includes("debug") || b.getExtension(c);
        });
      }
    }
    var Od, T;
    function Pd(a, b) {
      U.bindFramebuffer(a, Ed[b]);
    }
    function Qd(a) {
      U.bindVertexArray(Id[a]);
    }
    function Rd(a, b) {
      for (var c = 0; c < a; c++) {
        var d = B[b + 4 * c >> 2];
        U.deleteVertexArray(Id[d]);
        Id[d] = null;
      }
    }
    var Sd = [];
    function Td(a, b, c, d) {
      U.drawElements(a, b, c, d);
    }
    function Ud(a, b, c, d) {
      for (var e = 0; e < a; e++) {
        var f = U[c](),
          g = f && ia(d);
        f ? (f.name = g, d[g] = f) : S(1282);
        B[b + 4 * e >> 2] = g;
      }
    }
    function Vd(a, b) {
      Ud(a, b, "createVertexArray", Id);
    }
    function Wd(a, b) {
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
            var d = U.getParameter(34467);
            c = d ? d.length : 0;
            break;
          case 33309:
            if (2 > T.version) {
              S(1282);
              return;
            }
            c = 2 * (U.getSupportedExtensions() || []).length;
            break;
          case 33307:
          case 33308:
            if (2 > T.version) {
              S(1280);
              return;
            }
            c = 33307 == a ? 3 : 0;
        }
        if (void 0 === c) {
          switch (d = U.getParameter(a), typeof d) {
            case "number":
              c = d;
              break;
            case "boolean":
              c = d ? 1 : 0;
              break;
            case "string":
              S(1280);
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
                    S(1280);
                    return;
                }
              } else {
                if (d instanceof Float32Array || d instanceof Uint32Array || d instanceof Int32Array || d instanceof Array) {
                  for (a = 0; a < d.length; ++a) {
                    B[b + 4 * a >> 2] = d[a];
                  }
                  return;
                }
                try {
                  c = d.name | 0;
                } catch (e) {
                  S(1280);
                  ua("GL_INVALID_ENUM in glGet0v: Unknown object returned from WebGL getParameter(" + a + ")! (error: " + e + ")");
                  return;
                }
              }
              break;
            default:
              S(1280);
              ua("GL_INVALID_ENUM in glGet0v: Native code calling glGet0v(" + a + ") and it returns " + d + " of type " + typeof d + "!");
              return;
          }
        }
        B[b >> 2] = c;
      } else {
        S(1281);
      }
    }
    function Xd(a, b) {
      Wd(a, b);
    }
    var Zd = a => {
      var b = gb(a) + 1,
        c = Yd(b);
      c && hb(a, w, c, b);
      return c;
    };
    function $d(a) {
      return "]" == a.slice(-1) && a.lastIndexOf("[");
    }
    function ae(a) {
      a -= 5120;
      return 0 == a ? u : 1 == a ? w : 2 == a ? A : 4 == a ? B : 6 == a ? E : 5 == a || 28922 == a || 28520 == a || 30779 == a || 30782 == a ? D : za;
    }
    function be(a, b, c, d, e) {
      a = ae(a);
      var f = 31 - Math.clz32(a.BYTES_PER_ELEMENT),
        g = Nd;
      return a.subarray(e >> f, e + d * (c * ({
        5: 3,
        6: 4,
        8: 2,
        29502: 3,
        29504: 4,
        26917: 2,
        26918: 2,
        29846: 3,
        29847: 4
      }[b - 6402] || 1) * (1 << f) + g - 1 & -g) >> f);
    }
    function V(a) {
      var b = U.Gb;
      if (b) {
        var c = b.ma[a];
        "number" == typeof c && (b.ma[a] = c = U.getUniformLocation(b, b.tb[a] + (0 < c ? "[" + c + "]" : "")));
        return c;
      }
      S(1282);
    }
    var ce = [],
      de = [],
      ee = {},
      ge = () => {
        if (!fe) {
          var a = {
              USER: "web_user",
              LOGNAME: "web_user",
              PATH: "/",
              PWD: "/",
              HOME: "/home/web_user",
              LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8",
              _: na || "./this.program"
            },
            b;
          for (b in ee) {
            void 0 === ee[b] ? delete a[b] : a[b] = ee[b];
          }
          var c = [];
          for (b in a) {
            c.push(`${b}=${a[b]}`);
          }
          fe = c;
        }
        return fe;
      },
      fe,
      he = a => 0 === a % 4 && (0 !== a % 100 || 0 === a % 400),
      ie = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      je = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      ke = (a, b, c, d) => {
        function e(l, r, x) {
          for (l = "number" == typeof l ? l.toString() : l || ""; l.length < r;) {
            l = x[0] + l;
          }
          return l;
        }
        function f(l, r) {
          return e(l, r, "0");
        }
        function g(l, r) {
          function x(G) {
            return 0 > G ? -1 : 0 < G ? 1 : 0;
          }
          var z;
          0 === (z = x(l.getFullYear() - r.getFullYear())) && 0 === (z = x(l.getMonth() - r.getMonth())) && (z = x(l.getDate() - r.getDate()));
          return z;
        }
        function k(l) {
          switch (l.getDay()) {
            case 0:
              return new Date(l.getFullYear() - 1, 11, 29);
            case 1:
              return l;
            case 2:
              return new Date(l.getFullYear(), 0, 3);
            case 3:
              return new Date(l.getFullYear(), 0, 2);
            case 4:
              return new Date(l.getFullYear(), 0, 1);
            case 5:
              return new Date(l.getFullYear() - 1, 11, 31);
            case 6:
              return new Date(l.getFullYear() - 1, 11, 30);
          }
        }
        function q(l) {
          var r = l.aa;
          for (l = new Date(new Date(l.ba + 1900, 0, 1).getTime()); 0 < r;) {
            var x = l.getMonth(),
              z = (he(l.getFullYear()) ? ie : je)[x];
            if (r > z - l.getDate()) {
              r -= z - l.getDate() + 1, l.setDate(1), 11 > x ? l.setMonth(x + 1) : (l.setMonth(0), l.setFullYear(l.getFullYear() + 1));
            } else {
              l.setDate(l.getDate() + r);
              break;
            }
          }
          x = new Date(l.getFullYear() + 1, 0, 4);
          r = k(new Date(l.getFullYear(), 0, 4));
          x = k(x);
          return 0 >= g(r, l) ? 0 >= g(x, l) ? l.getFullYear() + 1 : l.getFullYear() : l.getFullYear() - 1;
        }
        var n = B[d + 40 >> 2];
        d = {
          lc: B[d >> 2],
          kc: B[d + 4 >> 2],
          Ha: B[d + 8 >> 2],
          Ra: B[d + 12 >> 2],
          Ia: B[d + 16 >> 2],
          ba: B[d + 20 >> 2],
          P: B[d + 24 >> 2],
          aa: B[d + 28 >> 2],
          Jc: B[d + 32 >> 2],
          jc: B[d + 36 >> 2],
          mc: n ? n ? F(w, n) : "" : ""
        };
        c = c ? F(w, c) : "";
        n = {
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
        for (var t in n) {
          c = c.replace(new RegExp(t, "g"), n[t]);
        }
        var v = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
          y = "January February March April May June July August September October November December".split(" ");
        n = {
          "%a": l => v[l.P].substring(0, 3),
          "%A": l => v[l.P],
          "%b": l => y[l.Ia].substring(0, 3),
          "%B": l => y[l.Ia],
          "%C": l => f((l.ba + 1900) / 100 | 0, 2),
          "%d": l => f(l.Ra, 2),
          "%e": l => e(l.Ra, 2, " "),
          "%g": l => q(l).toString().substring(2),
          "%G": l => q(l),
          "%H": l => f(l.Ha, 2),
          "%I": l => {
            l = l.Ha;
            0 == l ? l = 12 : 12 < l && (l -= 12);
            return f(l, 2);
          },
          "%j": l => {
            for (var r = 0, x = 0; x <= l.Ia - 1; r += (he(l.ba + 1900) ? ie : je)[x++]) {}
            return f(l.Ra + r, 3);
          },
          "%m": l => f(l.Ia + 1, 2),
          "%M": l => f(l.kc, 2),
          "%n": () => "\n",
          "%p": l => 0 <= l.Ha && 12 > l.Ha ? "AM" : "PM",
          "%S": l => f(l.lc, 2),
          "%t": () => "\t",
          "%u": l => l.P || 7,
          "%U": l => f(Math.floor((l.aa + 7 - l.P) / 7), 2),
          "%V": l => {
            var r = Math.floor((l.aa + 7 - (l.P + 6) % 7) / 7);
            2 >= (l.P + 371 - l.aa - 2) % 7 && r++;
            if (r) {
              53 == r && (x = (l.P + 371 - l.aa) % 7, 4 == x || 3 == x && he(l.ba) || (r = 1));
            } else {
              r = 52;
              var x = (l.P + 7 - l.aa - 1) % 7;
              (4 == x || 5 == x && he(l.ba % 400 - 1)) && r++;
            }
            return f(r, 2);
          },
          "%w": l => l.P,
          "%W": l => f(Math.floor((l.aa + 7 - (l.P + 6) % 7) / 7), 2),
          "%y": l => (l.ba + 1900).toString().substring(2),
          "%Y": l => l.ba + 1900,
          "%z": l => {
            l = l.jc;
            var r = 0 <= l;
            l = Math.abs(l) / 60;
            return (r ? "+" : "-") + String("0000" + (l / 60 * 100 + l % 60)).slice(-4);
          },
          "%Z": l => l.mc,
          "%%": () => "%"
        };
        c = c.replace(/%%/g, "\x00\x00");
        for (t in n) {
          c.includes(t) && (c = c.replace(new RegExp(t, "g"), n[t](d)));
        }
        c = c.replace(/\0\0/g, "%");
        t = ib(c, !1);
        if (t.length > b) {
          return 0;
        }
        u.set(t, a);
        return t.length - 1;
      };
    function Ib(a, b, c, d) {
      a || (a = this);
      this.parent = a;
      this.S = a.S;
      this.Ba = null;
      this.id = zb++;
      this.name = b;
      this.mode = c;
      this.l = {};
      this.m = {};
      this.Da = d;
    }
    Object.defineProperties(Ib.prototype, {
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
    Wb();
    Ab = Array(4096);
    Pb(I, "/");
    Qb("/tmp", 16895, 0);
    Qb("/home", 16895, 0);
    Qb("/home/web_user", 16895, 0);
    (() => {
      Qb("/dev", 16895, 0);
      lb(259, {
        read: () => 0,
        write: (d, e, f, g) => g
      });
      Rb("/dev/null", 259);
      kb(1280, nb);
      kb(1536, ob);
      Rb("/dev/tty", 1280);
      Rb("/dev/tty1", 1536);
      var a = new Uint8Array(1024),
        b = 0,
        c = () => {
          0 === b && (b = cb(a).byteLength);
          return a[--b];
        };
      Zb("random", c);
      Zb("urandom", c);
      Qb("/dev/shm", 16895, 0);
      Qb("/dev/shm/tmp", 16895, 0);
    })();
    (() => {
      Qb("/proc", 16895, 0);
      var a = Qb("/proc/self", 16895, 0);
      Qb("/proc/self/fd", 16895, 0);
      Pb({
        S: () => {
          var b = rb(a, "fd", 16895, 73);
          b.l = {
            ka: (c, d) => {
              var e = Mb(+d);
              c = {
                parent: null,
                S: {
                  ib: "fake"
                },
                l: {
                  la: () => e.path
                }
              };
              return c.parent = c;
            }
          };
          return b;
        }
      }, "/proc/self/fd");
    })();
    Object.assign(ec.prototype, {
      get(a) {
        return this.L[a];
      },
      has(a) {
        return void 0 !== this.L[a];
      },
      ra(a) {
        var b = this.cb.pop() || this.L.length;
        this.L[b] = a;
        return b;
      },
      Sb(a) {
        this.L[a] = void 0;
        this.cb.push(a);
      }
    });
    fc = m.BindingError = class extends Error {
      constructor(a) {
        super(a);
        this.name = "BindingError";
      }
    };
    L.L.push({
      value: void 0
    }, {
      value: null
    }, {
      value: !0
    }, {
      value: !1
    });
    L.h = L.L.length;
    m.count_emval_handles = function () {
      for (var a = 0, b = L.h; b < L.L.length; ++b) {
        void 0 !== L.L[b] && ++a;
      }
      return a;
    };
    jc = m.PureVirtualError = ic("PureVirtualError");
    for (var le = Array(256), me = 0; 256 > me; ++me) {
      le[me] = String.fromCharCode(me);
    }
    kc = le;
    m.getInheritedInstanceCount = function () {
      return Object.keys(oc).length;
    };
    m.getLiveInheritedInstances = function () {
      var a = [],
        b;
      for (b in oc) {
        oc.hasOwnProperty(b) && a.push(oc[b]);
      }
      return a;
    };
    m.flushPendingDeletes = mc;
    m.setDelayFunction = function (a) {
      nc = a;
      lc.length && nc && nc(mc);
    };
    Bc = m.InternalError = class extends Error {
      constructor(a) {
        super(a);
        this.name = "InternalError";
      }
    };
    Oc.prototype.isAliasOf = function (a) {
      if (!(this instanceof Oc && a instanceof Oc)) {
        return !1;
      }
      var b = this.g.u.i,
        c = this.g.o,
        d = a.g.u.i;
      for (a = a.g.o; b.A;) {
        c = b.na(c), b = b.A;
      }
      for (; d.A;) {
        a = d.na(a), d = d.A;
      }
      return b === d && c === a;
    };
    Oc.prototype.clone = function () {
      this.g.o || Nc(this);
      if (this.g.ia) {
        return this.g.count.value += 1, this;
      }
      var a = Ec,
        b = Object,
        c = b.create,
        d = Object.getPrototypeOf(this),
        e = this.g;
      a = a(c.call(b, d, {
        g: {
          value: {
            count: e.count,
            ga: e.ga,
            ia: e.ia,
            o: e.o,
            u: e.u,
            G: e.G,
            K: e.K
          }
        }
      }));
      a.g.count.value += 1;
      a.g.ga = !1;
      return a;
    };
    Oc.prototype["delete"] = function () {
      this.g.o || Nc(this);
      this.g.ga && !this.g.ia && M("Object already scheduled for deletion");
      vc(this);
      xc(this.g);
      this.g.ia || (this.g.G = void 0, this.g.o = void 0);
    };
    Oc.prototype.isDeleted = function () {
      return !this.g.o;
    };
    Oc.prototype.deleteLater = function () {
      this.g.o || Nc(this);
      this.g.ga && !this.g.ia && M("Object already scheduled for deletion");
      lc.push(this);
      1 === lc.length && nc && nc(mc);
      this.g.ga = !0;
      return this;
    };
    Xc.prototype.Ob = function (a) {
      this.nb && (a = this.nb(a));
      return a;
    };
    Xc.prototype.Xa = function (a) {
      this.U && this.U(a);
    };
    Xc.prototype.argPackAdvance = 8;
    Xc.prototype.readValueFromPointer = Hc;
    Xc.prototype.deleteObject = function (a) {
      if (null !== a) {
        a["delete"]();
      }
    };
    Xc.prototype.fromWireType = function (a) {
      function b() {
        return this.wa ? Dc(this.i.M, {
          u: this.bc,
          o: c,
          K: this,
          G: a
        }) : Dc(this.i.M, {
          u: this,
          o: a
        });
      }
      var c = this.Ob(a);
      if (!c) {
        return this.Xa(a), null;
      }
      var d = Ac(this.i, c);
      if (void 0 !== d) {
        if (0 === d.g.count.value) {
          return d.g.o = c, d.g.G = a, d.clone();
        }
        d = d.clone();
        this.Xa(a);
        return d;
      }
      d = this.i.Nb(c);
      d = zc[d];
      if (!d) {
        return b.call(this);
      }
      d = this.va ? d.Fb : d.pointerType;
      var e = yc(c, this.i, d.i);
      return null === e ? b.call(this) : this.wa ? Dc(d.i.M, {
        u: d,
        o: e,
        K: this,
        G: a
      }) : Dc(d.i.M, {
        u: d,
        o: e
      });
    };
    ad = m.UnboundTypeError = ic("UnboundTypeError");
    for (var U, W = 0; 32 > W; ++W) {
      Sd.push(Array(W));
    }
    var ne = new Float32Array(288);
    for (W = 0; 288 > W; ++W) {
      ce[W] = ne.subarray(0, W + 1);
    }
    var oe = new Int32Array(288);
    for (W = 0; 288 > W; ++W) {
      de[W] = oe.subarray(0, W + 1);
    }
    var Fe = {
      __syscall_fcntl64: function (a, b, c) {
        ac = c;
        try {
          var d = Mb(a);
          switch (b) {
            case 0:
              var e = bc();
              return 0 > e ? -28 : Ob(d, e).V;
            case 1:
            case 2:
              return 0;
            case 3:
              return d.flags;
            case 4:
              return e = bc(), d.flags |= e, 0;
            case 5:
              return e = bc(), A[e + 0 >> 1] = 2, 0;
            case 6:
            case 7:
              return 0;
            case 16:
            case 8:
              return -28;
            case 9:
              return B[pe() >> 2] = 28, -1;
            default:
              return -28;
          }
        } catch (f) {
          if ("undefined" == typeof $b || "ErrnoError" !== f.name) {
            throw f;
          }
          return -f.Z;
        }
      },
      __syscall_ioctl: function (a, b, c) {
        ac = c;
        try {
          var d = Mb(a);
          switch (b) {
            case 21509:
              return d.s ? 0 : -59;
            case 21505:
              if (!d.s) {
                return -59;
              }
              if (d.s.T.Wb) {
                b = [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                var e = bc();
                B[e >> 2] = 25856;
                B[e + 4 >> 2] = 5;
                B[e + 8 >> 2] = 191;
                B[e + 12 >> 2] = 35387;
                for (var f = 0; 32 > f; f++) {
                  u[e + f + 17 >> 0] = b[f] || 0;
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
              if (d.s.T.Xb) {
                for (e = bc(), b = [], f = 0; 32 > f; f++) {
                  b.push(u[e + f + 17 >> 0]);
                }
              }
              return 0;
            case 21519:
              if (!d.s) {
                return -59;
              }
              e = bc();
              return B[e >> 2] = 0;
            case 21520:
              return d.s ? -28 : -59;
            case 21531:
              e = bc();
              if (!d.m.Vb) {
                throw new H(59);
              }
              return d.m.Vb(d, b, e);
            case 21523:
              if (!d.s) {
                return -59;
              }
              d.s.T.Yb && (f = [24, 80], e = bc(), A[e >> 1] = f[0], A[e + 2 >> 1] = f[1]);
              return 0;
            case 21524:
              return d.s ? 0 : -59;
            case 21515:
              return d.s ? 0 : -59;
            default:
              return -28;
          }
        } catch (g) {
          if ("undefined" == typeof $b || "ErrnoError" !== g.name) {
            throw g;
          }
          return -g.Z;
        }
      },
      __syscall_openat: function (a, b, c, d) {
        ac = d;
        try {
          b = b ? F(w, b) : "";
          var e = b;
          if ("/" === e.charAt(0)) {
            b = e;
          } else {
            var f = -100 === a ? "/" : Mb(a).path;
            if (0 == e.length) {
              throw new H(44);
            }
            b = Za(f + "/" + e);
          }
          var g = d ? bc() : 0;
          return Ub(b, c, g).V;
        } catch (k) {
          if ("undefined" == typeof $b || "ErrnoError" !== k.name) {
            throw k;
          }
          return -k.Z;
        }
      },
      _embind_create_inheriting_constructor: function (a, b, c) {
        a = O(a);
        b = uc(b, "wrapper");
        c = gc(c);
        var d = [].slice,
          e = b.i,
          f = e.M,
          g = e.A.M,
          k = e.A.constructor;
        a = dc(a, function () {
          e.A.mb.forEach(function (n) {
            if (this[n] === g[n]) {
              throw new jc(`Pure virtual function ${n} must be implemented in JavaScript`);
            }
          }.bind(this));
          Object.defineProperty(this, "__parent", {
            value: f
          });
          this.__construct.apply(this, d.call(arguments));
        });
        f.__construct = function () {
          this === f && M("Pass correct 'this' to __construct");
          var n = k.implement.apply(void 0, [this].concat(d.call(arguments)));
          vc(n);
          var t = n.g;
          n.notifyOnDestruction();
          t.ia = !0;
          Object.defineProperties(this, {
            g: {
              value: t
            }
          });
          Ec(this);
          n = t.o;
          n = pc(e, n);
          oc.hasOwnProperty(n) ? M(`Tried to register registered instance: ${n}`) : oc[n] = this;
        };
        f.__destruct = function () {
          this === f && M("Pass correct 'this' to __destruct");
          vc(this);
          var n = this.g.o;
          n = pc(e, n);
          oc.hasOwnProperty(n) ? delete oc[n] : M(`Tried to unregister unregistered instance: ${n}`);
        };
        a.prototype = Object.create(f);
        for (var q in c) {
          a.prototype[q] = c[q];
        }
        return hc(a);
      },
      _embind_finalize_value_object: function (a) {
        var b = Fc[a];
        delete Fc[a];
        var c = b.Pa,
          d = b.U,
          e = b.$a,
          f = e.map(g => g.Rb).concat(e.map(g => g.fc));
        P([a], f, g => {
          var k = {};
          e.forEach((q, n) => {
            var t = g[n],
              v = q.Pb,
              y = q.Qb,
              l = g[n + e.length],
              r = q.ec,
              x = q.hc;
            k[q.Lb] = {
              read: z => t.fromWireType(v(y, z)),
              write: (z, G) => {
                var C = [];
                r(x, z, l.toWireType(C, G));
                Gc(C);
              }
            };
          });
          return [{
            name: b.name,
            fromWireType: function (q) {
              var n = {},
                t;
              for (t in k) {
                n[t] = k[t].read(q);
              }
              d(q);
              return n;
            },
            toWireType: function (q, n) {
              for (var t in k) {
                if (!(t in n)) {
                  throw new TypeError(`Missing field: "${t}"`);
                }
              }
              var v = c();
              for (t in k) {
                k[t].write(v, n[t]);
              }
              null !== q && q.push(d, v);
              return v;
            },
            argPackAdvance: 8,
            readValueFromPointer: Hc,
            J: d
          }];
        });
      },
      _embind_register_bigint: function () {},
      _embind_register_bool: function (a, b, c, d, e) {
        var f = Lc(c);
        b = O(b);
        Kc(a, {
          name: b,
          fromWireType: function (g) {
            return !!g;
          },
          toWireType: function (g, k) {
            return k ? d : e;
          },
          argPackAdvance: 8,
          readValueFromPointer: function (g) {
            if (1 === c) {
              var k = u;
            } else if (2 === c) {
              k = A;
            } else if (4 === c) {
              k = B;
            } else {
              throw new TypeError("Unknown boolean type size: " + b);
            }
            return this.fromWireType(k[g >> f]);
          },
          J: null
        });
      },
      _embind_register_class: function (a, b, c, d, e, f, g, k, q, n, t, v, y) {
        t = O(t);
        f = R(e, f);
        k && (k = R(g, k));
        n && (n = R(q, n));
        y = R(v, y);
        var l = cc(t);
        Qc(l, function () {
          bd(`Cannot construct ${t} due to unbound types`, [d]);
        });
        P([a, b, c], d ? [d] : [], function (r) {
          r = r[0];
          if (d) {
            var x = r.i;
            var z = x.M;
          } else {
            z = Oc.prototype;
          }
          r = dc(l, function () {
            if (Object.getPrototypeOf(this) !== G) {
              throw new fc("Use 'new' to construct " + t);
            }
            if (void 0 === C.Y) {
              throw new fc(t + " has no accessible constructor");
            }
            var N = C.Y[arguments.length];
            if (void 0 === N) {
              throw new fc(`Tried to invoke ctor of ${t} with invalid number of parameters (${arguments.length}) - expected (${Object.keys(C.Y).toString()}) parameters instead!`);
            }
            return N.apply(this, arguments);
          });
          var G = Object.create(z, {
            constructor: {
              value: r
            }
          });
          r.prototype = G;
          var C = new Rc(t, r, G, y, x, f, k, n);
          C.A && (void 0 === C.A.oa && (C.A.oa = []), C.A.oa.push(C));
          x = new Xc(t, C, !0, !1);
          z = new Xc(t + "*", C, !1, !1);
          var J = new Xc(t + " const*", C, !1, !0);
          zc[a] = {
            pointerType: z,
            Fb: J
          };
          Yc(l, r);
          return [x, z, J];
        });
      },
      _embind_register_class_class_function: function (a, b, c, d, e, f, g) {
        var k = dd(c, d);
        b = O(b);
        f = R(e, f);
        P([], [a], function (q) {
          function n() {
            bd(`Cannot call ${t} due to unbound types`, k);
          }
          q = q[0];
          var t = `${q.name}.${b}`;
          b.startsWith("@@") && (b = Symbol[b.substring(2)]);
          var v = q.i.constructor;
          void 0 === v[b] ? (n.ea = c - 1, v[b] = n) : (Pc(v, b, t), v[b].B[c - 1] = n);
          P([], k, function (y) {
            y = cd(t, [y[0], null].concat(y.slice(1)), null, f, g);
            void 0 === v[b].B ? (y.ea = c - 1, v[b] = y) : v[b].B[c - 1] = y;
            if (q.i.oa) {
              for (const l of q.i.oa) {
                l.constructor.hasOwnProperty(b) || (l.constructor[b] = y);
              }
            }
            return [];
          });
          return [];
        });
      },
      _embind_register_class_class_property: function (a, b, c, d, e, f, g, k) {
        b = O(b);
        f = R(e, f);
        P([], [a], function (q) {
          q = q[0];
          var n = `${q.name}.${b}`,
            t = {
              get() {
                bd(`Cannot access ${n} due to unbound types`, [c]);
              },
              enumerable: !0,
              configurable: !0
            };
          t.set = k ? () => {
            bd(`Cannot access ${n} due to unbound types`, [c]);
          } : () => {
            M(`${n} is a read-only property`);
          };
          Object.defineProperty(q.i.constructor, b, t);
          P([], [c], function (v) {
            v = v[0];
            var y = {
              get() {
                return v.fromWireType(f(d));
              },
              enumerable: !0
            };
            k && (k = R(g, k), y.set = l => {
              var r = [];
              k(d, v.toWireType(r, l));
              Gc(r);
            });
            Object.defineProperty(q.i.constructor, b, y);
            return [];
          });
          return [];
        });
      },
      _embind_register_class_constructor: function (a, b, c, d, e, f) {
        var g = dd(b, c);
        e = R(d, e);
        P([], [a], function (k) {
          k = k[0];
          var q = `constructor ${k.name}`;
          void 0 === k.i.Y && (k.i.Y = []);
          if (void 0 !== k.i.Y[b - 1]) {
            throw new fc(`Cannot register multiple constructors with identical number of parameters (${b - 1}) for class '${k.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
          }
          k.i.Y[b - 1] = () => {
            bd(`Cannot construct ${k.name} due to unbound types`, g);
          };
          P([], g, function (n) {
            n.splice(1, 0, null);
            k.i.Y[b - 1] = cd(q, n, null, e, f);
            return [];
          });
          return [];
        });
      },
      _embind_register_class_function: function (a, b, c, d, e, f, g, k) {
        var q = dd(c, d);
        b = O(b);
        f = R(e, f);
        P([], [a], function (n) {
          function t() {
            bd(`Cannot call ${v} due to unbound types`, q);
          }
          n = n[0];
          var v = `${n.name}.${b}`;
          b.startsWith("@@") && (b = Symbol[b.substring(2)]);
          k && n.i.mb.push(b);
          var y = n.i.M,
            l = y[b];
          void 0 === l || void 0 === l.B && l.className !== n.name && l.ea === c - 2 ? (t.ea = c - 2, t.className = n.name, y[b] = t) : (Pc(y, b, v), y[b].B[c - 2] = t);
          P([], q, function (r) {
            r = cd(v, r, n, f, g);
            void 0 === y[b].B ? (r.ea = c - 2, y[b] = r) : y[b].B[c - 2] = r;
            return [];
          });
          return [];
        });
      },
      _embind_register_class_property: function (a, b, c, d, e, f, g, k, q, n) {
        b = O(b);
        e = R(d, e);
        P([], [a], function (t) {
          t = t[0];
          var v = `${t.name}.${b}`,
            y = {
              get() {
                bd(`Cannot access ${v} due to unbound types`, [c, g]);
              },
              enumerable: !0,
              configurable: !0
            };
          y.set = q ? () => {
            bd(`Cannot access ${v} due to unbound types`, [c, g]);
          } : () => {
            M(v + " is a read-only property");
          };
          Object.defineProperty(t.i.M, b, y);
          P([], q ? [c, g] : [c], function (l) {
            var r = l[0],
              x = {
                get() {
                  var G = ed(this, t, v + " getter");
                  return r.fromWireType(e(f, G));
                },
                enumerable: !0
              };
            if (q) {
              q = R(k, q);
              var z = l[1];
              x.set = function (G) {
                var C = ed(this, t, v + " setter"),
                  J = [];
                q(n, C, z.toWireType(J, G));
                Gc(J);
              };
            }
            Object.defineProperty(t.i.M, b, x);
            return [];
          });
          return [];
        });
      },
      _embind_register_emval: function (a, b) {
        b = O(b);
        Kc(a, {
          name: b,
          fromWireType: function (c) {
            var d = gc(c);
            fd(c);
            return d;
          },
          toWireType: function (c, d) {
            return hc(d);
          },
          argPackAdvance: 8,
          readValueFromPointer: Hc,
          J: null
        });
      },
      _embind_register_enum: function (a, b, c, d) {
        function e() {}
        c = Lc(c);
        b = O(b);
        e.values = {};
        Kc(a, {
          name: b,
          constructor: e,
          fromWireType: function (f) {
            return this.constructor.values[f];
          },
          toWireType: function (f, g) {
            return g.value;
          },
          argPackAdvance: 8,
          readValueFromPointer: gd(b, c, d),
          J: null
        });
        Qc(b, e);
      },
      _embind_register_enum_value: function (a, b, c) {
        var d = uc(a, "enum");
        b = O(b);
        a = d.constructor;
        d = Object.create(d.constructor.prototype, {
          value: {
            value: c
          },
          constructor: {
            value: dc(`${d.name}_${b}`, function () {})
          }
        });
        a.values[c] = d;
        a[b] = d;
      },
      _embind_register_float: function (a, b, c) {
        c = Lc(c);
        b = O(b);
        Kc(a, {
          name: b,
          fromWireType: function (d) {
            return d;
          },
          toWireType: function (d, e) {
            return e;
          },
          argPackAdvance: 8,
          readValueFromPointer: hd(b, c),
          J: null
        });
      },
      _embind_register_function: function (a, b, c, d, e, f) {
        var g = dd(b, c);
        a = O(a);
        e = R(d, e);
        Qc(a, function () {
          bd(`Cannot call ${a} due to unbound types`, g);
        }, b - 1);
        P([], g, function (k) {
          Yc(a, cd(a, [k[0], null].concat(k.slice(1)), null, e, f), b - 1);
          return [];
        });
      },
      _embind_register_integer: function (a, b, c, d, e) {
        b = O(b);
        -1 === e && (e = 4294967295);
        e = Lc(c);
        var f = k => k;
        if (0 === d) {
          var g = 32 - 8 * c;
          f = k => k << g >>> g;
        }
        c = b.includes("unsigned") ? function (k, q) {
          return q >>> 0;
        } : function (k, q) {
          return q;
        };
        Kc(a, {
          name: b,
          fromWireType: f,
          toWireType: c,
          argPackAdvance: 8,
          readValueFromPointer: jd(b, e, 0 !== d),
          J: null
        });
      },
      _embind_register_memory_view: function (a, b, c) {
        function d(f) {
          f >>= 2;
          var g = D;
          return new e(g.buffer, g[f + 1], g[f]);
        }
        var e = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][b];
        c = O(c);
        Kc(a, {
          name: c,
          fromWireType: d,
          argPackAdvance: 8,
          readValueFromPointer: d
        }, {
          Tb: !0
        });
      },
      _embind_register_std_string: function (a, b) {
        b = O(b);
        var c = "std::string" === b;
        Kc(a, {
          name: b,
          fromWireType: function (d) {
            var e = D[d >> 2],
              f = d + 4;
            if (c) {
              for (var g = f, k = 0; k <= e; ++k) {
                var q = f + k;
                if (k == e || 0 == w[q]) {
                  g = g ? F(w, g, q - g) : "";
                  if (void 0 === n) {
                    var n = g;
                  } else {
                    n += String.fromCharCode(0), n += g;
                  }
                  g = q + 1;
                }
              }
            } else {
              n = Array(e);
              for (k = 0; k < e; ++k) {
                n[k] = String.fromCharCode(w[f + k]);
              }
              n = n.join("");
            }
            tc(d);
            return n;
          },
          toWireType: function (d, e) {
            e instanceof ArrayBuffer && (e = new Uint8Array(e));
            var f = "string" == typeof e;
            f || e instanceof Uint8Array || e instanceof Uint8ClampedArray || e instanceof Int8Array || M("Cannot pass non-string to std::string");
            var g = c && f ? gb(e) : e.length;
            var k = Yd(4 + g + 1),
              q = k + 4;
            D[k >> 2] = g;
            if (c && f) {
              hb(e, w, q, g + 1);
            } else {
              if (f) {
                for (f = 0; f < g; ++f) {
                  var n = e.charCodeAt(f);
                  255 < n && (tc(q), M("String has UTF-16 code units that do not fit in 8 bits"));
                  w[q + f] = n;
                }
              } else {
                for (f = 0; f < g; ++f) {
                  w[q + f] = e[f];
                }
              }
            }
            null !== d && d.push(tc, k);
            return k;
          },
          argPackAdvance: 8,
          readValueFromPointer: Hc,
          J: function (d) {
            tc(d);
          }
        });
      },
      _embind_register_std_wstring: function (a, b, c) {
        c = O(c);
        if (2 === b) {
          var d = ld;
          var e = md;
          var f = nd;
          var g = () => za;
          var k = 1;
        } else {
          4 === b && (d = od, e = pd, f = qd, g = () => D, k = 2);
        }
        Kc(a, {
          name: c,
          fromWireType: function (q) {
            for (var n = D[q >> 2], t = g(), v, y = q + 4, l = 0; l <= n; ++l) {
              var r = q + 4 + l * b;
              if (l == n || 0 == t[r >> k]) {
                y = d(y, r - y), void 0 === v ? v = y : (v += String.fromCharCode(0), v += y), y = r + b;
              }
            }
            tc(q);
            return v;
          },
          toWireType: function (q, n) {
            "string" != typeof n && M(`Cannot pass non-string to C++ string type ${c}`);
            var t = f(n),
              v = Yd(4 + t + b);
            D[v >> 2] = t >> k;
            e(n, v + 4, t + b);
            null !== q && q.push(tc, v);
            return v;
          },
          argPackAdvance: 8,
          readValueFromPointer: Hc,
          J: function (q) {
            tc(q);
          }
        });
      },
      _embind_register_value_object: function (a, b, c, d, e, f) {
        Fc[a] = {
          name: O(b),
          Pa: R(c, d),
          U: R(e, f),
          $a: []
        };
      },
      _embind_register_value_object_field: function (a, b, c, d, e, f, g, k, q, n) {
        Fc[a].$a.push({
          Lb: O(b),
          Rb: c,
          Pb: R(d, e),
          Qb: f,
          fc: g,
          ec: R(k, q),
          hc: n
        });
      },
      _embind_register_void: function (a, b) {
        b = O(b);
        Kc(a, {
          Zb: !0,
          name: b,
          argPackAdvance: 0,
          fromWireType: function () {},
          toWireType: function () {}
        });
      },
      _emscripten_get_now_is_monotonic: () => !0,
      _emscripten_throw_longjmp: () => {
        throw Infinity;
      },
      _emval_as: function (a, b, c) {
        a = gc(a);
        b = uc(b, "emval::as");
        var d = [],
          e = hc(d);
        D[c >> 2] = e;
        return b.toWireType(d, a);
      },
      _emval_call_method: function (a, b, c, d, e) {
        a = td[a];
        b = gc(b);
        c = sd(c);
        var f = [];
        D[d >> 2] = hc(f);
        return a(b, c, f, e);
      },
      _emval_call_void_method: function (a, b, c, d) {
        a = td[a];
        b = gc(b);
        c = sd(c);
        a(b, c, null, d);
      },
      _emval_decref: fd,
      _emval_get_method_caller: function (a, b) {
        var c = vd(a, b),
          d = c[0];
        b = d.name + "_$" + c.slice(1).map(function (g) {
          return g.name;
        }).join("_") + "$";
        var e = wd[b];
        if (void 0 !== e) {
          return e;
        }
        var f = Array(a - 1);
        e = ud((g, k, q, n) => {
          for (var t = 0, v = 0; v < a - 1; ++v) {
            f[v] = c[v + 1].readValueFromPointer(n + t), t += c[v + 1].argPackAdvance;
          }
          g = g[k].apply(g, f);
          for (v = 0; v < a - 1; ++v) {
            c[v + 1].Hb && c[v + 1].Hb(f[v]);
          }
          if (!d.Zb) {
            return d.toWireType(q, g);
          }
        });
        return wd[b] = e;
      },
      _emval_get_property: function (a, b) {
        a = gc(a);
        b = gc(b);
        return hc(a[b]);
      },
      _emval_incref: function (a) {
        4 < a && (L.get(a).pb += 1);
      },
      _emval_new_cstring: function (a) {
        return hc(sd(a));
      },
      _emval_new_object: function () {
        return hc({});
      },
      _emval_run_destructors: function (a) {
        var b = gc(a);
        Gc(b);
        fd(a);
      },
      _emval_set_property: function (a, b, c) {
        a = gc(a);
        b = gc(b);
        c = gc(c);
        a[b] = c;
      },
      _emval_take_value: function (a, b) {
        a = uc(a, "_emval_take_value");
        a = a.readValueFromPointer(b);
        return hc(a);
      },
      abort: () => {
        wa("");
      },
      emscripten_asm_const_int: (a, b, c) => {
        xd.length = 0;
        var d;
        for (c >>= 2; d = w[b++];) {
          c += 105 != d & c, xd.push(105 == d ? B[c] : Aa[c++ >> 1]), ++c;
        }
        return Wa[a].apply(null, xd);
      },
      emscripten_date_now: function () {
        return Date.now();
      },
      emscripten_get_now: () => performance.now(),
      emscripten_glActiveTexture: function (a) {
        U.activeTexture(a);
      },
      emscripten_glAttachShader: function (a, b) {
        U.attachShader(Dd[a], Hd[b]);
      },
      emscripten_glBindAttribLocation: function (a, b, c) {
        U.bindAttribLocation(Dd[a], b, c ? F(w, c) : "");
      },
      emscripten_glBindBuffer: function (a, b) {
        35051 == a ? U.Ka = b : 35052 == a && (U.fa = b);
        U.bindBuffer(a, Cd[b]);
      },
      emscripten_glBindFramebuffer: Pd,
      emscripten_glBindRenderbuffer: function (a, b) {
        U.bindRenderbuffer(a, Fd[b]);
      },
      emscripten_glBindSampler: function (a, b) {
        U.bindSampler(a, Jd[b]);
      },
      emscripten_glBindTexture: function (a, b) {
        U.bindTexture(a, Gd[b]);
      },
      emscripten_glBindVertexArray: Qd,
      emscripten_glBindVertexArrayOES: Qd,
      emscripten_glBlendColor: function (a, b, c, d) {
        U.blendColor(a, b, c, d);
      },
      emscripten_glBlendEquation: function (a) {
        U.blendEquation(a);
      },
      emscripten_glBlendFunc: function (a, b) {
        U.blendFunc(a, b);
      },
      emscripten_glBlitFramebuffer: function (a, b, c, d, e, f, g, k, q, n) {
        U.blitFramebuffer(a, b, c, d, e, f, g, k, q, n);
      },
      emscripten_glBufferData: function (a, b, c, d) {
        2 <= T.version ? c && b ? U.bufferData(a, w, d, c, b) : U.bufferData(a, b, d) : U.bufferData(a, c ? w.subarray(c, c + b) : b, d);
      },
      emscripten_glBufferSubData: function (a, b, c, d) {
        2 <= T.version ? c && U.bufferSubData(a, b, w, d, c) : U.bufferSubData(a, b, w.subarray(d, d + c));
      },
      emscripten_glCheckFramebufferStatus: function (a) {
        return U.checkFramebufferStatus(a);
      },
      emscripten_glClear: function (a) {
        U.clear(a);
      },
      emscripten_glClearColor: function (a, b, c, d) {
        U.clearColor(a, b, c, d);
      },
      emscripten_glClearStencil: function (a) {
        U.clearStencil(a);
      },
      emscripten_glClientWaitSync: function (a, b, c, d) {
        return U.clientWaitSync(Kd[a], b, (c >>> 0) + 4294967296 * d);
      },
      emscripten_glColorMask: function (a, b, c, d) {
        U.colorMask(!!a, !!b, !!c, !!d);
      },
      emscripten_glCompileShader: function (a) {
        U.compileShader(Hd[a]);
      },
      emscripten_glCompressedTexImage2D: function (a, b, c, d, e, f, g, k) {
        2 <= T.version ? U.fa || !g ? U.compressedTexImage2D(a, b, c, d, e, f, g, k) : U.compressedTexImage2D(a, b, c, d, e, f, w, k, g) : U.compressedTexImage2D(a, b, c, d, e, f, k ? w.subarray(k, k + g) : null);
      },
      emscripten_glCompressedTexSubImage2D: function (a, b, c, d, e, f, g, k, q) {
        2 <= T.version ? U.fa || !k ? U.compressedTexSubImage2D(a, b, c, d, e, f, g, k, q) : U.compressedTexSubImage2D(a, b, c, d, e, f, g, w, q, k) : U.compressedTexSubImage2D(a, b, c, d, e, f, g, q ? w.subarray(q, q + k) : null);
      },
      emscripten_glCopyTexSubImage2D: function (a, b, c, d, e, f, g, k) {
        U.copyTexSubImage2D(a, b, c, d, e, f, g, k);
      },
      emscripten_glCreateProgram: function () {
        var a = ia(Dd),
          b = U.createProgram();
        b.name = a;
        b.za = b.xa = b.ya = 0;
        b.Sa = 1;
        Dd[a] = b;
        return a;
      },
      emscripten_glCreateShader: function (a) {
        var b = ia(Hd);
        Hd[b] = U.createShader(a);
        return b;
      },
      emscripten_glCullFace: function (a) {
        U.cullFace(a);
      },
      emscripten_glDeleteBuffers: function (a, b) {
        for (var c = 0; c < a; c++) {
          var d = B[b + 4 * c >> 2],
            e = Cd[d];
          e && (U.deleteBuffer(e), e.name = 0, Cd[d] = null, d == U.Ka && (U.Ka = 0), d == U.fa && (U.fa = 0));
        }
      },
      emscripten_glDeleteFramebuffers: function (a, b) {
        for (var c = 0; c < a; ++c) {
          var d = B[b + 4 * c >> 2],
            e = Ed[d];
          e && (U.deleteFramebuffer(e), e.name = 0, Ed[d] = null);
        }
      },
      emscripten_glDeleteProgram: function (a) {
        if (a) {
          var b = Dd[a];
          b ? (U.deleteProgram(b), b.name = 0, Dd[a] = null) : S(1281);
        }
      },
      emscripten_glDeleteRenderbuffers: function (a, b) {
        for (var c = 0; c < a; c++) {
          var d = B[b + 4 * c >> 2],
            e = Fd[d];
          e && (U.deleteRenderbuffer(e), e.name = 0, Fd[d] = null);
        }
      },
      emscripten_glDeleteSamplers: function (a, b) {
        for (var c = 0; c < a; c++) {
          var d = B[b + 4 * c >> 2],
            e = Jd[d];
          e && (U.deleteSampler(e), e.name = 0, Jd[d] = null);
        }
      },
      emscripten_glDeleteShader: function (a) {
        if (a) {
          var b = Hd[a];
          b ? (U.deleteShader(b), Hd[a] = null) : S(1281);
        }
      },
      emscripten_glDeleteSync: function (a) {
        if (a) {
          var b = Kd[a];
          b ? (U.deleteSync(b), b.name = 0, Kd[a] = null) : S(1281);
        }
      },
      emscripten_glDeleteTextures: function (a, b) {
        for (var c = 0; c < a; c++) {
          var d = B[b + 4 * c >> 2],
            e = Gd[d];
          e && (U.deleteTexture(e), e.name = 0, Gd[d] = null);
        }
      },
      emscripten_glDeleteVertexArrays: Rd,
      emscripten_glDeleteVertexArraysOES: Rd,
      emscripten_glDepthMask: function (a) {
        U.depthMask(!!a);
      },
      emscripten_glDisable: function (a) {
        U.disable(a);
      },
      emscripten_glDisableVertexAttribArray: function (a) {
        U.disableVertexAttribArray(a);
      },
      emscripten_glDrawArrays: function (a, b, c) {
        U.drawArrays(a, b, c);
      },
      emscripten_glDrawArraysInstanced: function (a, b, c, d) {
        U.drawArraysInstanced(a, b, c, d);
      },
      emscripten_glDrawArraysInstancedBaseInstanceWEBGL: function (a, b, c, d, e) {
        U.Ya.drawArraysInstancedBaseInstanceWEBGL(a, b, c, d, e);
      },
      emscripten_glDrawBuffers: function (a, b) {
        for (var c = Sd[a], d = 0; d < a; d++) {
          c[d] = B[b + 4 * d >> 2];
        }
        U.drawBuffers(c);
      },
      emscripten_glDrawElements: Td,
      emscripten_glDrawElementsInstanced: function (a, b, c, d, e) {
        U.drawElementsInstanced(a, b, c, d, e);
      },
      emscripten_glDrawElementsInstancedBaseVertexBaseInstanceWEBGL: function (a, b, c, d, e, f, g) {
        U.Ya.drawElementsInstancedBaseVertexBaseInstanceWEBGL(a, b, c, d, e, f, g);
      },
      emscripten_glDrawRangeElements: function (a, b, c, d, e, f) {
        Td(a, d, e, f);
      },
      emscripten_glEnable: function (a) {
        U.enable(a);
      },
      emscripten_glEnableVertexAttribArray: function (a) {
        U.enableVertexAttribArray(a);
      },
      emscripten_glFenceSync: function (a, b) {
        return (a = U.fenceSync(a, b)) ? (b = ia(Kd), a.name = b, Kd[b] = a, b) : 0;
      },
      emscripten_glFinish: function () {
        U.finish();
      },
      emscripten_glFlush: function () {
        U.flush();
      },
      emscripten_glFramebufferRenderbuffer: function (a, b, c, d) {
        U.framebufferRenderbuffer(a, b, c, Fd[d]);
      },
      emscripten_glFramebufferTexture2D: function (a, b, c, d, e) {
        U.framebufferTexture2D(a, b, c, Gd[d], e);
      },
      emscripten_glFrontFace: function (a) {
        U.frontFace(a);
      },
      emscripten_glGenBuffers: function (a, b) {
        Ud(a, b, "createBuffer", Cd);
      },
      emscripten_glGenFramebuffers: function (a, b) {
        Ud(a, b, "createFramebuffer", Ed);
      },
      emscripten_glGenRenderbuffers: function (a, b) {
        Ud(a, b, "createRenderbuffer", Fd);
      },
      emscripten_glGenSamplers: function (a, b) {
        Ud(a, b, "createSampler", Jd);
      },
      emscripten_glGenTextures: function (a, b) {
        Ud(a, b, "createTexture", Gd);
      },
      emscripten_glGenVertexArrays: Vd,
      emscripten_glGenVertexArraysOES: Vd,
      emscripten_glGenerateMipmap: function (a) {
        U.generateMipmap(a);
      },
      emscripten_glGetBufferParameteriv: function (a, b, c) {
        c ? B[c >> 2] = U.getBufferParameter(a, b) : S(1281);
      },
      emscripten_glGetError: function () {
        var a = U.getError() || Od;
        Od = 0;
        return a;
      },
      emscripten_glGetFramebufferAttachmentParameteriv: function (a, b, c, d) {
        a = U.getFramebufferAttachmentParameter(a, b, c);
        if (a instanceof WebGLRenderbuffer || a instanceof WebGLTexture) {
          a = a.name | 0;
        }
        B[d >> 2] = a;
      },
      emscripten_glGetIntegerv: Xd,
      emscripten_glGetProgramInfoLog: function (a, b, c, d) {
        a = U.getProgramInfoLog(Dd[a]);
        null === a && (a = "(unknown error)");
        b = 0 < b && d ? hb(a, w, d, b) : 0;
        c && (B[c >> 2] = b);
      },
      emscripten_glGetProgramiv: function (a, b, c) {
        if (c) {
          if (a >= Bd) {
            S(1281);
          } else {
            if (a = Dd[a], 35716 == b) {
              a = U.getProgramInfoLog(a), null === a && (a = "(unknown error)"), B[c >> 2] = a.length + 1;
            } else if (35719 == b) {
              if (!a.za) {
                for (b = 0; b < U.getProgramParameter(a, 35718); ++b) {
                  a.za = Math.max(a.za, U.getActiveUniform(a, b).name.length + 1);
                }
              }
              B[c >> 2] = a.za;
            } else if (35722 == b) {
              if (!a.xa) {
                for (b = 0; b < U.getProgramParameter(a, 35721); ++b) {
                  a.xa = Math.max(a.xa, U.getActiveAttrib(a, b).name.length + 1);
                }
              }
              B[c >> 2] = a.xa;
            } else if (35381 == b) {
              if (!a.ya) {
                for (b = 0; b < U.getProgramParameter(a, 35382); ++b) {
                  a.ya = Math.max(a.ya, U.getActiveUniformBlockName(a, b).length + 1);
                }
              }
              B[c >> 2] = a.ya;
            } else {
              B[c >> 2] = U.getProgramParameter(a, b);
            }
          }
        } else {
          S(1281);
        }
      },
      emscripten_glGetRenderbufferParameteriv: function (a, b, c) {
        c ? B[c >> 2] = U.getRenderbufferParameter(a, b) : S(1281);
      },
      emscripten_glGetShaderInfoLog: function (a, b, c, d) {
        a = U.getShaderInfoLog(Hd[a]);
        null === a && (a = "(unknown error)");
        b = 0 < b && d ? hb(a, w, d, b) : 0;
        c && (B[c >> 2] = b);
      },
      emscripten_glGetShaderPrecisionFormat: function (a, b, c, d) {
        a = U.getShaderPrecisionFormat(a, b);
        B[c >> 2] = a.rangeMin;
        B[c + 4 >> 2] = a.rangeMax;
        B[d >> 2] = a.precision;
      },
      emscripten_glGetShaderiv: function (a, b, c) {
        c ? 35716 == b ? (a = U.getShaderInfoLog(Hd[a]), null === a && (a = "(unknown error)"), B[c >> 2] = a ? a.length + 1 : 0) : 35720 == b ? (a = U.getShaderSource(Hd[a]), B[c >> 2] = a ? a.length + 1 : 0) : B[c >> 2] = U.getShaderParameter(Hd[a], b) : S(1281);
      },
      emscripten_glGetString: function (a) {
        var b = Ld[a];
        if (!b) {
          switch (a) {
            case 7939:
              b = U.getSupportedExtensions() || [];
              b = b.concat(b.map(function (d) {
                return "GL_" + d;
              }));
              b = Zd(b.join(" "));
              break;
            case 7936:
            case 7937:
            case 37445:
            case 37446:
              (b = U.getParameter(a)) || S(1280);
              b = b && Zd(b);
              break;
            case 7938:
              b = U.getParameter(7938);
              b = 2 <= T.version ? "OpenGL ES 3.0 (" + b + ")" : "OpenGL ES 2.0 (" + b + ")";
              b = Zd(b);
              break;
            case 35724:
              b = U.getParameter(35724);
              var c = b.match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);
              null !== c && (3 == c[1].length && (c[1] += "0"), b = "OpenGL ES GLSL ES " + c[1] + " (" + b + ")");
              b = Zd(b);
              break;
            default:
              S(1280);
          }
          Ld[a] = b;
        }
        return b;
      },
      emscripten_glGetStringi: function (a, b) {
        if (2 > T.version) {
          return S(1282), 0;
        }
        var c = Md[a];
        if (c) {
          return 0 > b || b >= c.length ? (S(1281), 0) : c[b];
        }
        switch (a) {
          case 7939:
            return c = U.getSupportedExtensions() || [], c = c.concat(c.map(function (d) {
              return "GL_" + d;
            })), c = c.map(function (d) {
              return Zd(d);
            }), c = Md[a] = c, 0 > b || b >= c.length ? (S(1281), 0) : c[b];
          default:
            return S(1280), 0;
        }
      },
      emscripten_glGetUniformLocation: function (a, b) {
        b = b ? F(w, b) : "";
        if (a = Dd[a]) {
          var c = a,
            d = c.ma,
            e = c.ub,
            f;
          if (!d) {
            for (c.ma = d = {}, c.tb = {}, f = 0; f < U.getProgramParameter(c, 35718); ++f) {
              var g = U.getActiveUniform(c, f);
              var k = g.name;
              g = g.size;
              var q = $d(k);
              q = 0 < q ? k.slice(0, q) : k;
              var n = c.Sa;
              c.Sa += g;
              e[q] = [g, n];
              for (k = 0; k < g; ++k) {
                d[n] = k, c.tb[n++] = q;
              }
            }
          }
          c = a.ma;
          d = 0;
          e = b;
          f = $d(b);
          0 < f && (d = parseInt(b.slice(f + 1)) >>> 0, e = b.slice(0, f));
          if ((e = a.ub[e]) && d < e[0] && (d += e[1], c[d] = c[d] || U.getUniformLocation(a, b))) {
            return d;
          }
        } else {
          S(1281);
        }
        return -1;
      },
      emscripten_glInvalidateFramebuffer: function (a, b, c) {
        for (var d = Sd[b], e = 0; e < b; e++) {
          d[e] = B[c + 4 * e >> 2];
        }
        U.invalidateFramebuffer(a, d);
      },
      emscripten_glInvalidateSubFramebuffer: function (a, b, c, d, e, f, g) {
        for (var k = Sd[b], q = 0; q < b; q++) {
          k[q] = B[c + 4 * q >> 2];
        }
        U.invalidateSubFramebuffer(a, k, d, e, f, g);
      },
      emscripten_glIsSync: function (a) {
        return U.isSync(Kd[a]);
      },
      emscripten_glIsTexture: function (a) {
        return (a = Gd[a]) ? U.isTexture(a) : 0;
      },
      emscripten_glLineWidth: function (a) {
        U.lineWidth(a);
      },
      emscripten_glLinkProgram: function (a) {
        a = Dd[a];
        U.linkProgram(a);
        a.ma = 0;
        a.ub = {};
      },
      emscripten_glMultiDrawArraysInstancedBaseInstanceWEBGL: function (a, b, c, d, e, f) {
        U.gb.multiDrawArraysInstancedBaseInstanceWEBGL(a, B, b >> 2, B, c >> 2, B, d >> 2, D, e >> 2, f);
      },
      emscripten_glMultiDrawElementsInstancedBaseVertexBaseInstanceWEBGL: function (a, b, c, d, e, f, g, k) {
        U.gb.multiDrawElementsInstancedBaseVertexBaseInstanceWEBGL(a, B, b >> 2, c, B, d >> 2, B, e >> 2, B, f >> 2, D, g >> 2, k);
      },
      emscripten_glPixelStorei: function (a, b) {
        3317 == a && (Nd = b);
        U.pixelStorei(a, b);
      },
      emscripten_glReadBuffer: function (a) {
        U.readBuffer(a);
      },
      emscripten_glReadPixels: function (a, b, c, d, e, f, g) {
        if (2 <= T.version) {
          if (U.Ka) {
            U.readPixels(a, b, c, d, e, f, g);
          } else {
            var k = ae(f);
            U.readPixels(a, b, c, d, e, f, k, g >> 31 - Math.clz32(k.BYTES_PER_ELEMENT));
          }
        } else {
          (g = be(f, e, c, d, g)) ? U.readPixels(a, b, c, d, e, f, g) : S(1280);
        }
      },
      emscripten_glRenderbufferStorage: function (a, b, c, d) {
        U.renderbufferStorage(a, b, c, d);
      },
      emscripten_glRenderbufferStorageMultisample: function (a, b, c, d, e) {
        U.renderbufferStorageMultisample(a, b, c, d, e);
      },
      emscripten_glSamplerParameteri: function (a, b, c) {
        U.samplerParameteri(Jd[a], b, c);
      },
      emscripten_glSamplerParameteriv: function (a, b, c) {
        U.samplerParameteri(Jd[a], b, B[c >> 2]);
      },
      emscripten_glScissor: function (a, b, c, d) {
        U.scissor(a, b, c, d);
      },
      emscripten_glShaderSource: function (a, b, c, d) {
        for (var e = "", f = 0; f < b; ++f) {
          var g = d ? B[d + 4 * f >> 2] : -1,
            k = B[c + 4 * f >> 2];
          g = k ? F(w, k, 0 > g ? void 0 : g) : "";
          e += g;
        }
        U.shaderSource(Hd[a], e);
      },
      emscripten_glStencilFunc: function (a, b, c) {
        U.stencilFunc(a, b, c);
      },
      emscripten_glStencilFuncSeparate: function (a, b, c, d) {
        U.stencilFuncSeparate(a, b, c, d);
      },
      emscripten_glStencilMask: function (a) {
        U.stencilMask(a);
      },
      emscripten_glStencilMaskSeparate: function (a, b) {
        U.stencilMaskSeparate(a, b);
      },
      emscripten_glStencilOp: function (a, b, c) {
        U.stencilOp(a, b, c);
      },
      emscripten_glStencilOpSeparate: function (a, b, c, d) {
        U.stencilOpSeparate(a, b, c, d);
      },
      emscripten_glTexImage2D: function (a, b, c, d, e, f, g, k, q) {
        if (2 <= T.version) {
          if (U.fa) {
            U.texImage2D(a, b, c, d, e, f, g, k, q);
          } else if (q) {
            var n = ae(k);
            U.texImage2D(a, b, c, d, e, f, g, k, n, q >> 31 - Math.clz32(n.BYTES_PER_ELEMENT));
          } else {
            U.texImage2D(a, b, c, d, e, f, g, k, null);
          }
        } else {
          U.texImage2D(a, b, c, d, e, f, g, k, q ? be(k, g, d, e, q) : null);
        }
      },
      emscripten_glTexParameterf: function (a, b, c) {
        U.texParameterf(a, b, c);
      },
      emscripten_glTexParameterfv: function (a, b, c) {
        U.texParameterf(a, b, E[c >> 2]);
      },
      emscripten_glTexParameteri: function (a, b, c) {
        U.texParameteri(a, b, c);
      },
      emscripten_glTexParameteriv: function (a, b, c) {
        U.texParameteri(a, b, B[c >> 2]);
      },
      emscripten_glTexStorage2D: function (a, b, c, d, e) {
        U.texStorage2D(a, b, c, d, e);
      },
      emscripten_glTexSubImage2D: function (a, b, c, d, e, f, g, k, q) {
        if (2 <= T.version) {
          if (U.fa) {
            U.texSubImage2D(a, b, c, d, e, f, g, k, q);
          } else if (q) {
            var n = ae(k);
            U.texSubImage2D(a, b, c, d, e, f, g, k, n, q >> 31 - Math.clz32(n.BYTES_PER_ELEMENT));
          } else {
            U.texSubImage2D(a, b, c, d, e, f, g, k, null);
          }
        } else {
          n = null, q && (n = be(k, g, e, f, q)), U.texSubImage2D(a, b, c, d, e, f, g, k, n);
        }
      },
      emscripten_glUniform1f: function (a, b) {
        U.uniform1f(V(a), b);
      },
      emscripten_glUniform1fv: function (a, b, c) {
        if (2 <= T.version) {
          b && U.uniform1fv(V(a), E, c >> 2, b);
        } else {
          if (288 >= b) {
            for (var d = ce[b - 1], e = 0; e < b; ++e) {
              d[e] = E[c + 4 * e >> 2];
            }
          } else {
            d = E.subarray(c >> 2, c + 4 * b >> 2);
          }
          U.uniform1fv(V(a), d);
        }
      },
      emscripten_glUniform1i: function (a, b) {
        U.uniform1i(V(a), b);
      },
      emscripten_glUniform1iv: function (a, b, c) {
        if (2 <= T.version) {
          b && U.uniform1iv(V(a), B, c >> 2, b);
        } else {
          if (288 >= b) {
            for (var d = de[b - 1], e = 0; e < b; ++e) {
              d[e] = B[c + 4 * e >> 2];
            }
          } else {
            d = B.subarray(c >> 2, c + 4 * b >> 2);
          }
          U.uniform1iv(V(a), d);
        }
      },
      emscripten_glUniform2f: function (a, b, c) {
        U.uniform2f(V(a), b, c);
      },
      emscripten_glUniform2fv: function (a, b, c) {
        if (2 <= T.version) {
          b && U.uniform2fv(V(a), E, c >> 2, 2 * b);
        } else {
          if (144 >= b) {
            for (var d = ce[2 * b - 1], e = 0; e < 2 * b; e += 2) {
              d[e] = E[c + 4 * e >> 2], d[e + 1] = E[c + (4 * e + 4) >> 2];
            }
          } else {
            d = E.subarray(c >> 2, c + 8 * b >> 2);
          }
          U.uniform2fv(V(a), d);
        }
      },
      emscripten_glUniform2i: function (a, b, c) {
        U.uniform2i(V(a), b, c);
      },
      emscripten_glUniform2iv: function (a, b, c) {
        if (2 <= T.version) {
          b && U.uniform2iv(V(a), B, c >> 2, 2 * b);
        } else {
          if (144 >= b) {
            for (var d = de[2 * b - 1], e = 0; e < 2 * b; e += 2) {
              d[e] = B[c + 4 * e >> 2], d[e + 1] = B[c + (4 * e + 4) >> 2];
            }
          } else {
            d = B.subarray(c >> 2, c + 8 * b >> 2);
          }
          U.uniform2iv(V(a), d);
        }
      },
      emscripten_glUniform3f: function (a, b, c, d) {
        U.uniform3f(V(a), b, c, d);
      },
      emscripten_glUniform3fv: function (a, b, c) {
        if (2 <= T.version) {
          b && U.uniform3fv(V(a), E, c >> 2, 3 * b);
        } else {
          if (96 >= b) {
            for (var d = ce[3 * b - 1], e = 0; e < 3 * b; e += 3) {
              d[e] = E[c + 4 * e >> 2], d[e + 1] = E[c + (4 * e + 4) >> 2], d[e + 2] = E[c + (4 * e + 8) >> 2];
            }
          } else {
            d = E.subarray(c >> 2, c + 12 * b >> 2);
          }
          U.uniform3fv(V(a), d);
        }
      },
      emscripten_glUniform3i: function (a, b, c, d) {
        U.uniform3i(V(a), b, c, d);
      },
      emscripten_glUniform3iv: function (a, b, c) {
        if (2 <= T.version) {
          b && U.uniform3iv(V(a), B, c >> 2, 3 * b);
        } else {
          if (96 >= b) {
            for (var d = de[3 * b - 1], e = 0; e < 3 * b; e += 3) {
              d[e] = B[c + 4 * e >> 2], d[e + 1] = B[c + (4 * e + 4) >> 2], d[e + 2] = B[c + (4 * e + 8) >> 2];
            }
          } else {
            d = B.subarray(c >> 2, c + 12 * b >> 2);
          }
          U.uniform3iv(V(a), d);
        }
      },
      emscripten_glUniform4f: function (a, b, c, d, e) {
        U.uniform4f(V(a), b, c, d, e);
      },
      emscripten_glUniform4fv: function (a, b, c) {
        if (2 <= T.version) {
          b && U.uniform4fv(V(a), E, c >> 2, 4 * b);
        } else {
          if (72 >= b) {
            var d = ce[4 * b - 1],
              e = E;
            c >>= 2;
            for (var f = 0; f < 4 * b; f += 4) {
              var g = c + f;
              d[f] = e[g];
              d[f + 1] = e[g + 1];
              d[f + 2] = e[g + 2];
              d[f + 3] = e[g + 3];
            }
          } else {
            d = E.subarray(c >> 2, c + 16 * b >> 2);
          }
          U.uniform4fv(V(a), d);
        }
      },
      emscripten_glUniform4i: function (a, b, c, d, e) {
        U.uniform4i(V(a), b, c, d, e);
      },
      emscripten_glUniform4iv: function (a, b, c) {
        if (2 <= T.version) {
          b && U.uniform4iv(V(a), B, c >> 2, 4 * b);
        } else {
          if (72 >= b) {
            for (var d = de[4 * b - 1], e = 0; e < 4 * b; e += 4) {
              d[e] = B[c + 4 * e >> 2], d[e + 1] = B[c + (4 * e + 4) >> 2], d[e + 2] = B[c + (4 * e + 8) >> 2], d[e + 3] = B[c + (4 * e + 12) >> 2];
            }
          } else {
            d = B.subarray(c >> 2, c + 16 * b >> 2);
          }
          U.uniform4iv(V(a), d);
        }
      },
      emscripten_glUniformMatrix2fv: function (a, b, c, d) {
        if (2 <= T.version) {
          b && U.uniformMatrix2fv(V(a), !!c, E, d >> 2, 4 * b);
        } else {
          if (72 >= b) {
            for (var e = ce[4 * b - 1], f = 0; f < 4 * b; f += 4) {
              e[f] = E[d + 4 * f >> 2], e[f + 1] = E[d + (4 * f + 4) >> 2], e[f + 2] = E[d + (4 * f + 8) >> 2], e[f + 3] = E[d + (4 * f + 12) >> 2];
            }
          } else {
            e = E.subarray(d >> 2, d + 16 * b >> 2);
          }
          U.uniformMatrix2fv(V(a), !!c, e);
        }
      },
      emscripten_glUniformMatrix3fv: function (a, b, c, d) {
        if (2 <= T.version) {
          b && U.uniformMatrix3fv(V(a), !!c, E, d >> 2, 9 * b);
        } else {
          if (32 >= b) {
            for (var e = ce[9 * b - 1], f = 0; f < 9 * b; f += 9) {
              e[f] = E[d + 4 * f >> 2], e[f + 1] = E[d + (4 * f + 4) >> 2], e[f + 2] = E[d + (4 * f + 8) >> 2], e[f + 3] = E[d + (4 * f + 12) >> 2], e[f + 4] = E[d + (4 * f + 16) >> 2], e[f + 5] = E[d + (4 * f + 20) >> 2], e[f + 6] = E[d + (4 * f + 24) >> 2], e[f + 7] = E[d + (4 * f + 28) >> 2], e[f + 8] = E[d + (4 * f + 32) >> 2];
            }
          } else {
            e = E.subarray(d >> 2, d + 36 * b >> 2);
          }
          U.uniformMatrix3fv(V(a), !!c, e);
        }
      },
      emscripten_glUniformMatrix4fv: function (a, b, c, d) {
        if (2 <= T.version) {
          b && U.uniformMatrix4fv(V(a), !!c, E, d >> 2, 16 * b);
        } else {
          if (18 >= b) {
            var e = ce[16 * b - 1],
              f = E;
            d >>= 2;
            for (var g = 0; g < 16 * b; g += 16) {
              var k = d + g;
              e[g] = f[k];
              e[g + 1] = f[k + 1];
              e[g + 2] = f[k + 2];
              e[g + 3] = f[k + 3];
              e[g + 4] = f[k + 4];
              e[g + 5] = f[k + 5];
              e[g + 6] = f[k + 6];
              e[g + 7] = f[k + 7];
              e[g + 8] = f[k + 8];
              e[g + 9] = f[k + 9];
              e[g + 10] = f[k + 10];
              e[g + 11] = f[k + 11];
              e[g + 12] = f[k + 12];
              e[g + 13] = f[k + 13];
              e[g + 14] = f[k + 14];
              e[g + 15] = f[k + 15];
            }
          } else {
            e = E.subarray(d >> 2, d + 64 * b >> 2);
          }
          U.uniformMatrix4fv(V(a), !!c, e);
        }
      },
      emscripten_glUseProgram: function (a) {
        a = Dd[a];
        U.useProgram(a);
        U.Gb = a;
      },
      emscripten_glVertexAttrib1f: function (a, b) {
        U.vertexAttrib1f(a, b);
      },
      emscripten_glVertexAttrib2fv: function (a, b) {
        U.vertexAttrib2f(a, E[b >> 2], E[b + 4 >> 2]);
      },
      emscripten_glVertexAttrib3fv: function (a, b) {
        U.vertexAttrib3f(a, E[b >> 2], E[b + 4 >> 2], E[b + 8 >> 2]);
      },
      emscripten_glVertexAttrib4fv: function (a, b) {
        U.vertexAttrib4f(a, E[b >> 2], E[b + 4 >> 2], E[b + 8 >> 2], E[b + 12 >> 2]);
      },
      emscripten_glVertexAttribDivisor: function (a, b) {
        U.vertexAttribDivisor(a, b);
      },
      emscripten_glVertexAttribIPointer: function (a, b, c, d, e) {
        U.vertexAttribIPointer(a, b, c, d, e);
      },
      emscripten_glVertexAttribPointer: function (a, b, c, d, e, f) {
        U.vertexAttribPointer(a, b, c, !!d, e, f);
      },
      emscripten_glViewport: function (a, b, c, d) {
        U.viewport(a, b, c, d);
      },
      emscripten_glWaitSync: function (a, b, c, d) {
        U.waitSync(Kd[a], b, (c >>> 0) + 4294967296 * d);
      },
      emscripten_memcpy_big: (a, b, c) => w.copyWithin(a, b, b + c),
      emscripten_resize_heap: a => {
        var b = w.length;
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
            e = e.min.call(e, 2147483648, d + (65536 - d % 65536) % 65536) - xa.buffer.byteLength + 65535 >>> 16;
            try {
              xa.grow(e);
              Ba();
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
      emscripten_webgl_get_current_context: function () {
        return T ? T.handle : 0;
      },
      emscripten_webgl_make_context_current: function (a) {
        return la(a) ? 0 : -5;
      },
      environ_get: (a, b) => {
        var c = 0;
        ge().forEach(function (d, e) {
          var f = b + c;
          e = D[a + 4 * e >> 2] = f;
          for (f = 0; f < d.length; ++f) {
            u[e++ >> 0] = d.charCodeAt(f);
          }
          u[e >> 0] = 0;
          c += d.length + 1;
        });
        return 0;
      },
      environ_sizes_get: (a, b) => {
        var c = ge();
        D[a >> 2] = c.length;
        var d = 0;
        c.forEach(function (e) {
          d += e.length + 1;
        });
        D[b >> 2] = d;
        return 0;
      },
      fd_close: function (a) {
        try {
          var b = Mb(a);
          if (null === b.V) {
            throw new H(8);
          }
          b.Ma && (b.Ma = null);
          try {
            b.m.close && b.m.close(b);
          } catch (c) {
            throw c;
          } finally {
            yb[b.V] = null;
          }
          b.V = null;
          return 0;
        } catch (c) {
          if ("undefined" == typeof $b || "ErrnoError" !== c.name) {
            throw c;
          }
          return c.Z;
        }
      },
      fd_read: function (a, b, c, d) {
        try {
          a: {
            var e = Mb(a);
            a = b;
            for (var f, g = b = 0; g < c; g++) {
              var k = D[a >> 2],
                q = D[a + 4 >> 2];
              a += 8;
              var n = e,
                t = k,
                v = q,
                y = f,
                l = u;
              if (0 > v || 0 > y) {
                throw new H(28);
              }
              if (null === n.V) {
                throw new H(8);
              }
              if (1 === (n.flags & 2097155)) {
                throw new H(8);
              }
              if (16384 === (n.node.mode & 61440)) {
                throw new H(31);
              }
              if (!n.m.read) {
                throw new H(28);
              }
              var r = "undefined" != typeof y;
              if (!r) {
                y = n.position;
              } else if (!n.seekable) {
                throw new H(70);
              }
              var x = n.m.read(n, l, t, v, y);
              r || (n.position += x);
              var z = x;
              if (0 > z) {
                var G = -1;
                break a;
              }
              b += z;
              if (z < q) {
                break;
              }
              "undefined" !== typeof f && (f += z);
            }
            G = b;
          }
          D[d >> 2] = G;
          return 0;
        } catch (C) {
          if ("undefined" == typeof $b || "ErrnoError" !== C.name) {
            throw C;
          }
          return C.Z;
        }
      },
      fd_seek: function (a, b, c, d, e) {
        b = c + 2097152 >>> 0 < 4194305 - !!b ? (b >>> 0) + 4294967296 * c : NaN;
        try {
          if (isNaN(b)) {
            return 61;
          }
          var f = Mb(a);
          Vb(f, b, d);
          Sa = [f.position >>> 0, (Ra = f.position, 1.0 <= +Math.abs(Ra) ? 0.0 < Ra ? +Math.floor(Ra / 4294967296.0) >>> 0 : ~~+Math.ceil((Ra - +(~~Ra >>> 0)) / 4294967296.0) >>> 0 : 0)];
          B[e >> 2] = Sa[0];
          B[e + 4 >> 2] = Sa[1];
          f.Ma && 0 === b && 0 === d && (f.Ma = null);
          return 0;
        } catch (g) {
          if ("undefined" == typeof $b || "ErrnoError" !== g.name) {
            throw g;
          }
          return g.Z;
        }
      },
      fd_write: function (a, b, c, d) {
        try {
          a: {
            var e = Mb(a);
            a = b;
            for (var f, g = b = 0; g < c; g++) {
              var k = D[a >> 2],
                q = D[a + 4 >> 2];
              a += 8;
              var n = e,
                t = k,
                v = q,
                y = f,
                l = u;
              if (0 > v || 0 > y) {
                throw new H(28);
              }
              if (null === n.V) {
                throw new H(8);
              }
              if (0 === (n.flags & 2097155)) {
                throw new H(8);
              }
              if (16384 === (n.node.mode & 61440)) {
                throw new H(31);
              }
              if (!n.m.write) {
                throw new H(28);
              }
              n.seekable && n.flags & 1024 && Vb(n, 0, 2);
              var r = "undefined" != typeof y;
              if (!r) {
                y = n.position;
              } else if (!n.seekable) {
                throw new H(70);
              }
              var x = n.m.write(n, l, t, v, y, void 0);
              r || (n.position += x);
              var z = x;
              if (0 > z) {
                var G = -1;
                break a;
              }
              b += z;
              "undefined" !== typeof f && (f += z);
            }
            G = b;
          }
          D[d >> 2] = G;
          return 0;
        } catch (C) {
          if ("undefined" == typeof $b || "ErrnoError" !== C.name) {
            throw C;
          }
          return C.Z;
        }
      },
      glBindFramebuffer: Pd,
      glGetIntegerv: Xd,
      invoke_ii: qe,
      invoke_iii: re,
      invoke_iiii: se,
      invoke_iiiii: te,
      invoke_iiiiii: ue,
      invoke_iiiiiii: ve,
      invoke_iiiiiiiiii: we,
      invoke_v: xe,
      invoke_vi: ye,
      invoke_vii: ze,
      invoke_viii: Ae,
      invoke_viiii: Be,
      invoke_viiiiii: Ce,
      invoke_viiiiiii: De,
      invoke_viiiiiiii: Ee,
      strftime_l: (a, b, c, d) => ke(a, b, c, d)
    };
    (function () {
      function a(c) {
        p = c = c.exports;
        xa = p.memory;
        Ba();
        Ca = p.__indirect_function_table;
        Ea.unshift(p.__wasm_call_ctors);
        Ha--;
        m.monitorRunDependencies && m.monitorRunDependencies(Ha);
        if (0 == Ha && (null !== Ia && (clearInterval(Ia), Ia = null), Ja)) {
          var d = Ja;
          Ja = null;
          d();
        }
        return c;
      }
      var b = {
        env: Fe,
        wasi_snapshot_preview1: Fe
      };
      Ha++;
      m.monitorRunDependencies && m.monitorRunDependencies(Ha);
      if (m.instantiateWasm) {
        try {
          return m.instantiateWasm(b, a);
        } catch (c) {
          ua("Module.instantiateWasm callback failed with error: " + c), ba(c);
        }
      }
      Qa(b, function (c) {
        a(c.instance);
      }).catch(ba);
      return {};
    })();
    var tc = a => (tc = p.free)(a),
      Yd = a => (Yd = p.malloc)(a),
      Ta = m._ma_device__on_notification_unlocked = a => (Ta = m._ma_device__on_notification_unlocked = p.ma_device__on_notification_unlocked)(a);
    m._ma_malloc_emscripten = (a, b) => (m._ma_malloc_emscripten = p.ma_malloc_emscripten)(a, b);
    m._ma_free_emscripten = (a, b) => (m._ma_free_emscripten = p.ma_free_emscripten)(a, b);
    var Ua = m._ma_device_process_pcm_frames_capture__webaudio = (a, b, c) => (Ua = m._ma_device_process_pcm_frames_capture__webaudio = p.ma_device_process_pcm_frames_capture__webaudio)(a, b, c),
      Va = m._ma_device_process_pcm_frames_playback__webaudio = (a, b, c) => (Va = m._ma_device_process_pcm_frames_playback__webaudio = p.ma_device_process_pcm_frames_playback__webaudio)(a, b, c),
      pe = () => (pe = p.__errno_location)(),
      sc = a => (sc = p.__getTypeName)(a);
    m.__embind_initialize_bindings = () => (m.__embind_initialize_bindings = p._embind_initialize_bindings)();
    var ub = (a, b) => (ub = p.emscripten_builtin_memalign)(a, b),
      X = (a, b) => (X = p.setThrew)(a, b),
      Y = () => (Y = p.stackSave)(),
      Z = a => (Z = p.stackRestore)(a);
    m.dynCall_iiiij = (a, b, c, d, e, f) => (m.dynCall_iiiij = p.dynCall_iiiij)(a, b, c, d, e, f);
    m.dynCall_viiij = (a, b, c, d, e, f) => (m.dynCall_viiij = p.dynCall_viiij)(a, b, c, d, e, f);
    m.dynCall_iiij = (a, b, c, d, e) => (m.dynCall_iiij = p.dynCall_iiij)(a, b, c, d, e);
    m.dynCall_viij = (a, b, c, d, e) => (m.dynCall_viij = p.dynCall_viij)(a, b, c, d, e);
    m.dynCall_iiji = (a, b, c, d, e) => (m.dynCall_iiji = p.dynCall_iiji)(a, b, c, d, e);
    m.dynCall_jiji = (a, b, c, d, e) => (m.dynCall_jiji = p.dynCall_jiji)(a, b, c, d, e);
    m.dynCall_iiiji = (a, b, c, d, e, f) => (m.dynCall_iiiji = p.dynCall_iiiji)(a, b, c, d, e, f);
    m.dynCall_iij = (a, b, c, d) => (m.dynCall_iij = p.dynCall_iij)(a, b, c, d);
    m.dynCall_jii = (a, b, c) => (m.dynCall_jii = p.dynCall_jii)(a, b, c);
    m.dynCall_viiiiij = (a, b, c, d, e, f, g, k) => (m.dynCall_viiiiij = p.dynCall_viiiiij)(a, b, c, d, e, f, g, k);
    m.dynCall_viji = (a, b, c, d, e) => (m.dynCall_viji = p.dynCall_viji)(a, b, c, d, e);
    m.dynCall_ji = (a, b) => (m.dynCall_ji = p.dynCall_ji)(a, b);
    m.dynCall_vij = (a, b, c, d) => (m.dynCall_vij = p.dynCall_vij)(a, b, c, d);
    m.dynCall_viijii = (a, b, c, d, e, f, g) => (m.dynCall_viijii = p.dynCall_viijii)(a, b, c, d, e, f, g);
    m.dynCall_iiiiij = (a, b, c, d, e, f, g) => (m.dynCall_iiiiij = p.dynCall_iiiiij)(a, b, c, d, e, f, g);
    m.dynCall_iiiiijj = (a, b, c, d, e, f, g, k, q) => (m.dynCall_iiiiijj = p.dynCall_iiiiijj)(a, b, c, d, e, f, g, k, q);
    m.dynCall_iiiiiijj = (a, b, c, d, e, f, g, k, q, n) => (m.dynCall_iiiiiijj = p.dynCall_iiiiiijj)(a, b, c, d, e, f, g, k, q, n);
    function qe(a, b) {
      var c = Y();
      try {
        return Q(a)(b);
      } catch (d) {
        Z(c);
        if (d !== d + 0) {
          throw d;
        }
        X(1, 0);
      }
    }
    function ze(a, b, c) {
      var d = Y();
      try {
        Q(a)(b, c);
      } catch (e) {
        Z(d);
        if (e !== e + 0) {
          throw e;
        }
        X(1, 0);
      }
    }
    function ye(a, b) {
      var c = Y();
      try {
        Q(a)(b);
      } catch (d) {
        Z(c);
        if (d !== d + 0) {
          throw d;
        }
        X(1, 0);
      }
    }
    function se(a, b, c, d) {
      var e = Y();
      try {
        return Q(a)(b, c, d);
      } catch (f) {
        Z(e);
        if (f !== f + 0) {
          throw f;
        }
        X(1, 0);
      }
    }
    function Ae(a, b, c, d) {
      var e = Y();
      try {
        Q(a)(b, c, d);
      } catch (f) {
        Z(e);
        if (f !== f + 0) {
          throw f;
        }
        X(1, 0);
      }
    }
    function Be(a, b, c, d, e) {
      var f = Y();
      try {
        Q(a)(b, c, d, e);
      } catch (g) {
        Z(f);
        if (g !== g + 0) {
          throw g;
        }
        X(1, 0);
      }
    }
    function xe(a) {
      var b = Y();
      try {
        Q(a)();
      } catch (c) {
        Z(b);
        if (c !== c + 0) {
          throw c;
        }
        X(1, 0);
      }
    }
    function ve(a, b, c, d, e, f, g) {
      var k = Y();
      try {
        return Q(a)(b, c, d, e, f, g);
      } catch (q) {
        Z(k);
        if (q !== q + 0) {
          throw q;
        }
        X(1, 0);
      }
    }
    function re(a, b, c) {
      var d = Y();
      try {
        return Q(a)(b, c);
      } catch (e) {
        Z(d);
        if (e !== e + 0) {
          throw e;
        }
        X(1, 0);
      }
    }
    function De(a, b, c, d, e, f, g, k) {
      var q = Y();
      try {
        Q(a)(b, c, d, e, f, g, k);
      } catch (n) {
        Z(q);
        if (n !== n + 0) {
          throw n;
        }
        X(1, 0);
      }
    }
    function we(a, b, c, d, e, f, g, k, q, n) {
      var t = Y();
      try {
        return Q(a)(b, c, d, e, f, g, k, q, n);
      } catch (v) {
        Z(t);
        if (v !== v + 0) {
          throw v;
        }
        X(1, 0);
      }
    }
    function te(a, b, c, d, e) {
      var f = Y();
      try {
        return Q(a)(b, c, d, e);
      } catch (g) {
        Z(f);
        if (g !== g + 0) {
          throw g;
        }
        X(1, 0);
      }
    }
    function Ee(a, b, c, d, e, f, g, k, q) {
      var n = Y();
      try {
        Q(a)(b, c, d, e, f, g, k, q);
      } catch (t) {
        Z(n);
        if (t !== t + 0) {
          throw t;
        }
        X(1, 0);
      }
    }
    function ue(a, b, c, d, e, f) {
      var g = Y();
      try {
        return Q(a)(b, c, d, e, f);
      } catch (k) {
        Z(g);
        if (k !== k + 0) {
          throw k;
        }
        X(1, 0);
      }
    }
    function Ce(a, b, c, d, e, f, g) {
      var k = Y();
      try {
        Q(a)(b, c, d, e, f, g);
      } catch (q) {
        Z(k);
        if (q !== q + 0) {
          throw q;
        }
        X(1, 0);
      }
    }
    var Ge;
    Ja = function He() {
      Ge || Ie();
      Ge || (Ja = He);
    };
    function Ie() {
      function a() {
        if (!Ge && (Ge = !0, m.calledRun = !0, !ya)) {
          m.noFSInit || Xb || (Xb = !0, Wb(), m.stdin = m.stdin, m.stdout = m.stdout, m.stderr = m.stderr, m.stdin ? Zb("stdin", m.stdin) : Sb("/dev/tty", "/dev/stdin"), m.stdout ? Zb("stdout", null, m.stdout) : Sb("/dev/tty", "/dev/stdout"), m.stderr ? Zb("stderr", null, m.stderr) : Sb("/dev/tty1", "/dev/stderr"), Ub("/dev/stdin", 0), Ub("/dev/stdout", 1), Ub("/dev/stderr", 1));
          Bb = !1;
          Xa(Ea);
          aa(m);
          if (m.onRuntimeInitialized) {
            m.onRuntimeInitialized();
          }
          if (m.postRun) {
            for ("function" == typeof m.postRun && (m.postRun = [m.postRun]); m.postRun.length;) {
              var b = m.postRun.shift();
              Fa.unshift(b);
            }
          }
          Xa(Fa);
        }
      }
      if (!(0 < Ha)) {
        if (m.preRun) {
          for ("function" == typeof m.preRun && (m.preRun = [m.preRun]); m.preRun.length;) {
            Ga();
          }
        }
        Xa(Da);
        0 < Ha || (m.setStatus ? (m.setStatus("Running..."), setTimeout(function () {
          setTimeout(function () {
            m.setStatus("");
          }, 1);
          a();
        }, 1)) : a());
      }
    }
    if (m.preInit) {
      for ("function" == typeof m.preInit && (m.preInit = [m.preInit]); 0 < m.preInit.length;) {
        m.preInit.pop()();
      }
    }
    Ie();
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
var webgl_advanced_1 = __importDefault(require("@rive-app/webgl-advanced"));
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
          return [4 /*yield*/, (0, webgl_advanced_1.default)({
            // Loads Wasm bundle
            locateFile: function locateFile(_) {
              return "\u200Bhttps://unpkg.com/@rive-app/canvas-advanced@2.17.3/rive.wasm";
            }
          })];
        case 1:
          rive = _a.sent();
          canvas = document.getElementById('rive-canvas');
          canvas.height = 400;
          canvas.width = 500;
          renderer = rive.makeRenderer(canvas, true);
          return [4 /*yield*/, fetch(new Request('basketball.riv'))];
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
},{"./styles.css":"src/styles.css","@rive-app/webgl-advanced":"node_modules/@rive-app/webgl-advanced/webgl_advanced.mjs"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58623" + '/');
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