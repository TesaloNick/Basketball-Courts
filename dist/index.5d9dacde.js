// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
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
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"9bCTy":[function(require,module,exports) {
"use strict";
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "ee62429a5d9dacde";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"1Z4Rq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _courts = require("./courts");
var _courtsDefault = parcelHelpers.interopDefault(_courts);
var _map = require("./map");
var _mapDefault = parcelHelpers.interopDefault(_map);
(0, _mapDefault.default)();
const courts = new (0, _courtsDefault.default);

},{"./courts":"cZ5GQ","./map":"5VGc0","@parcel/transformer-js/src/esmodule-helpers.js":"az0mL"}],"cZ5GQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class Court {
    constructor(){
        this.courts = document.querySelector(".courts");
        this.modal = document.querySelector(".modal");
        this.modalWrapper = document.querySelector(".modal__wrapper");
        this.BASE_URL = "http://localhost:3001";
        this.renderAll();
    }
    async getCourts() {
        const response = await fetch(`${this.BASE_URL}/courts`);
        const data = await response.json();
        return data;
    }
    async renderCourt(item) {
        const court = document.createElement("div");
        court.classList.add("courts__item");
        court.innerHTML = `<img id='court-${item.id}' src=${item.photos[0]} />`;
        this.courts.append(court);
        const courtsAPI = await this.getCourts();
        court.addEventListener("click", (e)=>{
            courtsAPI.map((item)=>{
                if (`court-${item.id}` === e.target.id) this.modalWrapper.innerHTML = `
            <div class="modal__close"><img src="images/close.svg" alt=""></div>
            <div class="modal__img"><img src="${item.photos[0]}" alt=""></div>
            <div class='modal__content'>
              <h2 class="modal__name">${item.name}</h2>
              <p class="modal__address">${item.address}</p>
              <ul class="modal__schedule">
                <p>SCHEDULE:</p>
                ${item.schedule.map((li)=>`
                  <li>${li.day}: ${li.time}</li>
                `).join("")}
              </ul>
            </div>
          `;
            });
            this.modal.classList.toggle("open");
            document.querySelector(".modal__close").addEventListener("click", ()=>this.modal.classList.toggle("open"));
        });
        document.querySelector(".modal__wrapper-close").addEventListener("click", ()=>this.modal.classList.toggle("open"));
    }
    async renderAll() {
        const courtsAPI = await this.getCourts();
        courtsAPI.map((item)=>this.renderCourt(item)).join("");
    }
}
exports.default = Court;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"az0mL"}],"az0mL":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"5VGc0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function renderMap() {
    mapboxgl.accessToken = "pk.eyJ1IjoidGVzYWxvbmljayIsImEiOiJjbDdodmdheHIwaWIyM3VtbTJjaXNreGt2In0.Er4yPKDyLrAYKJn5rRpXoQ";
    const urlBase = "https://api.mapbox.com/isochrone/v1/mapbox/";
    const lon = 27.55689040736249;
    const lat = 53.89733609094718;
    let profile = "cycling";
    let minutes = 5;
    let coordinates = "";
    const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [
            lon,
            lat
        ],
        zoom: 10
    });
    async function getIso(lat, lon) {
        const query = await fetch(`${urlBase}${profile}/${lon},${lat}?contours_minutes=${minutes}&polygons=true&access_token=${mapboxgl.accessToken}`, {
            method: "GET"
        });
        const data = await query.json();
        console.log(data);
        await map.getSource("iso").setData(data);
    }
    let from = document.querySelector(".from");
    let inputs = document.querySelector(".inputs");
    const geocoderFrom = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: true,
        placeholder: "address"
    });
    // const geocoderWhere = new MapboxGeocoder({
    //   accessToken: mapboxgl.accessToken,
    //   mapboxgl: mapboxgl,
    //   marker: true,
    //   placeholder: 'Where',
    // });
    // console.log(geocoderWhere, from);
    map.addControl(geocoderFrom);
    // map.addControl(geocoderWhere);
    map.on("load", ()=>{
        map.addSource("iso", {
            type: "geojson",
            data: {
                "type": "FeatureCollection",
                "features": []
            }
        });
        map.addLayer({
            "id": "isoLayer",
            "type": "fill",
            "source": "iso",
            "layout": {},
            "paint": {
                "fill-color": "#5a3fc0",
                "fill-opacity": 0.3
            }
        }, "poi-label");
        map.addSource("single-point", {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": []
            }
        });
        map.addLayer({
            id: "point",
            source: "single-point",
            type: "circle",
            paint: {
                "circle-radius": 10,
                "circle-color": "#448ee4"
            }
        });
        geocoderFrom.on("result", (event)=>{
            const list = document.querySelector(".list__ul");
            const inputName = document.querySelector(".inputs__name");
            const li = document.createElement("li");
            li.dataset.address = event.result.place_name;
            li.innerHTML = inputName.value;
            li.classList.add("list__li");
            list.append(li);
            coordinates = event.result.geometry.coordinates;
            getIso(coordinates[1], coordinates[0]);
        });
        getIso(lat, lon);
        //_______________________
        map.addLayer({
            id: "clearances",
            type: "fill",
            source: {
                type: "geojson",
                data: obstacle
            },
            layout: {},
            paint: {
                "fill-color": "#f03b20",
                "fill-opacity": 0.5,
                "fill-outline-color": "#f03b20"
            }
        });
        map.addSource("theRoute", {
            type: "geojson",
            data: {
                type: "Feature"
            }
        });
        map.addLayer({
            id: "theRoute",
            type: "line",
            source: "theRoute",
            layout: {
                "line-join": "round",
                "line-cap": "round"
            },
            paint: {
                "line-color": "#cccccc",
                "line-opacity": 0.5,
                "line-width": 13,
                "line-blur": 0.5
            }
        });
        // Source and layer for the bounding box
        map.addSource("theBox", {
            type: "geojson",
            data: {
                type: "Feature"
            }
        });
        map.addLayer({
            id: "theBox",
            type: "fill",
            source: "theBox",
            layout: {},
            paint: {
                "fill-color": "#FFC300",
                "fill-opacity": 0.5,
                "fill-outline-color": "#FFC300"
            }
        });
    });
    //________________________________________________________________________________________________
    const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: "metric",
        profile: "mapbox/driving",
        alternatives: false,
        geometries: "geojson",
        controls: {
            instructions: false
        },
        flyTo: false
    });
    map.addControl(directions, "top-right");
    map.scrollZoom.enable();
    const clearances = {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [
                        -84.47426,
                        38.06673
                    ]
                },
                properties: {
                    clearance: "13' 2"
                }
            },
            {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [
                        -84.47208,
                        38.06694
                    ]
                },
                properties: {
                    clearance: "13' 7"
                }
            },
            {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [
                        -84.60485,
                        38.12184
                    ]
                },
                properties: {
                    clearance: "13' 7"
                }
            },
            {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [
                        -84.61905,
                        37.87504
                    ]
                },
                properties: {
                    clearance: "12' 0"
                }
            },
            {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [
                        -84.55946,
                        38.30213
                    ]
                },
                properties: {
                    clearance: "13' 6"
                }
            },
            {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [
                        -84.27235,
                        38.04954
                    ]
                },
                properties: {
                    clearance: "13' 6"
                }
            },
            {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [
                        -84.27264,
                        37.82917
                    ]
                },
                properties: {
                    clearance: "11' 6"
                }
            }
        ]
    };
    const obstacle = turf.buffer(clearances, 0.25, {
        units: "kilometers"
    });
    let bbox = [
        0,
        0,
        0,
        0
    ];
    let polygon = turf.bboxPolygon(bbox);
    let counter = 0;
    const maxAttempts = 50;
    let emoji = "";
    let collision = "";
    let detail = "";
    const reports = document.getElementById("reports");
    function addCard(id, element, clear, detail) {
        const card = document.createElement("div");
        card.className = "card";
        // Add the response to the individual report created above
        const heading = document.createElement("div");
        // Set the class type based on clear value
        heading.className = clear === true ? "card-header route-found" : "card-header obstacle-found";
        heading.innerHTML = id === 0 ? `${emoji} The route ${collision}` : `${emoji} Route ${id} ${collision}`;
        const details = document.createElement("div");
        details.className = "card-details";
        details.innerHTML = `This ${detail} obstacles.`;
        card.appendChild(heading);
        card.appendChild(details);
        element.insertBefore(card, element.firstChild);
    }
    function noRoutes(element) {
        const card = document.createElement("div");
        card.className = "card";
        // Add the response to the individual report created above
        const heading = document.createElement("div");
        heading.className = "card-header no-route";
        emoji = "\uD83D\uDED1";
        heading.innerHTML = `${emoji} Ending search.`;
        // Add details to the individual report
        const details = document.createElement("div");
        details.className = "card-details";
        details.innerHTML = `No clear route found in ${counter} tries.`;
        card.appendChild(heading);
        card.appendChild(details);
        element.insertBefore(card, element.firstChild);
    }
    directions.on("clear", ()=>{
        map.setLayoutProperty("theRoute", "visibility", "none");
        map.setLayoutProperty("theBox", "visibility", "none");
        counter = 0;
        reports.innerHTML = "";
    });
    directions.on("route", (event)=>{
        // Hide the route and box by setting the opacity to zero
        map.setLayoutProperty("theRoute", "visibility", "none");
        map.setLayoutProperty("theBox", "visibility", "none");
        if (counter >= maxAttempts) noRoutes(reports);
        else // Make each route visible
        for (const route of event.route){
            // Make each route visible
            map.setLayoutProperty("theRoute", "visibility", "visible");
            map.setLayoutProperty("theBox", "visibility", "visible");
            // Get GeoJSON LineString feature of route
            const routeLine = polyline.toGeoJSON(route.geometry);
            // Create a bounding box around this route
            // The app will find a random point in the new bbox
            bbox = turf.bbox(routeLine);
            polygon = turf.bboxPolygon(bbox);
            // Update the data for the route
            // This will update the route line on the map
            map.getSource("theRoute").setData(routeLine);
            // Update the box
            map.getSource("theBox").setData(polygon);
            const clear = turf.booleanDisjoint(obstacle, routeLine);
            if (clear === true) {
                collision = "does not intersect any obstacles!";
                detail = `takes ${(route.duration / 60).toFixed(0)} minutes and avoids`;
                emoji = "✔️";
                map.setPaintProperty("theRoute", "line-color", "#74c476");
                // Hide the box
                map.setLayoutProperty("theBox", "visibility", "none");
                // Reset the counter
                counter = 0;
            } else {
                // Collision occurred, so increment the counter
                counter = counter + 1;
                // As the attempts increase, expand the search area
                // by a factor of the attempt count
                polygon = turf.transformScale(polygon, counter * 0.01);
                bbox = turf.bbox(polygon);
                collision = "is bad.";
                detail = `takes ${(route.duration / 60).toFixed(0)} minutes and hits`;
                emoji = "⚠️";
                map.setPaintProperty("theRoute", "line-color", "#de2d26");
                // Add a randomly selected waypoint to get a new route from the Directions API
                const randomWaypoint = turf.randomPoint(1, {
                    bbox: bbox
                });
                directions.setWaypoint(0, randomWaypoint["features"][0].geometry.coordinates);
            }
            // Add a new report section to the sidebar
            addCard(counter, reports, clear, detail);
        }
    });
}
exports.default = renderMap;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"az0mL"}]},["9bCTy","1Z4Rq"], "1Z4Rq", "parcelRequire1a32")

//# sourceMappingURL=index.5d9dacde.js.map
