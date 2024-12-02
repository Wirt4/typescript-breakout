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
        globalObject
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
})({"bTHtU":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "5c1b77e3b71e74eb";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
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
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && ![
        'localhost',
        '127.0.0.1',
        '0.0.0.0'
    ].includes(hostname) ? 'wss' : 'ws';
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        disposedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === 'reload') fullReload();
        else if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
                await hmrApplyUpdates(assets);
                hmrDisposeQueue();
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                let processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ('reload' in location) location.reload();
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
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
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
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
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
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
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
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
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
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
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
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
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
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"h7u1C":[function(require,module,exports,__globalThis) {
var _canvasView = require("./view/CanvasView");
var _game = require("./Game");
const view = new (0, _canvasView.CanvasView)("#playField");
const game = new (0, _game.Game)(view);
view.initStartButton(game.start(view));

},{"./view/CanvasView":"5noQJ","./Game":"TyEjs"}],"5noQJ":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CanvasView", ()=>CanvasView);
class CanvasView {
    constructor(canvasName){
        this.canvas = this.queryCanvas(canvasName);
        if (typeof this.canvas?.getContext == 'function') this.context = this.canvas?.getContext('2d') || null;
        else this.context = null;
        this.start = this.queryDocument('start');
        this.scoreDisplay = this.queryDocument('score');
        this.infoDisplay = this.queryDocument('info');
    }
    queryDocument(id) {
        return this.query(`#${id}`);
    }
    queryCanvas(id) {
        return this.query(id);
    }
    query(id) {
        return document.querySelector(id);
    }
    clear() {
        if (this.context) this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    initStartButton(startFunction) {
        this.start?.addEventListener('click', ()=>startFunction(this));
    }
    drawScore(score) {
        this.setComponentHTML(this.scoreDisplay, score.toString());
    }
    drawInfo(info) {
        this.setComponentHTML(this.infoDisplay, info);
    }
    setComponentHTML(element, data) {
        if (element) element.innerHTML = data;
    }
    drawSprite(sprite) {
        if (this.context && sprite.image.complete && sprite.image.naturalWidth !== 0) this.context.drawImage(sprite.image, sprite.x, sprite.y, sprite.width, sprite.height);
        else console.warn("Cannot draw sprite; image is not ready or broken.", sprite);
    }
    drawBricks(bricks) {
        this.drawSprite(bricks[0]);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
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

},{}],"TyEjs":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Game", ()=>Game);
var _helper = require("./helper");
var EndState = /*#__PURE__*/ function(EndState) {
    EndState["GAME_OVER"] = "Game Over!";
    EndState["GAME_WON"] = "Game Won!";
    EndState["BLANK"] = "";
    return EndState;
}(EndState || {});
class Game {
    constructor(view){
        this.score = 0;
        this._isGameOver = false;
        this._view = view;
    }
    get isGameOver() {
        return this._isGameOver;
    }
    setGameOver() {
        this.setGameStatus("Game Over!");
    }
    clearInfo() {
        this.setGameStatus("");
    }
    setGameWin() {
        this.setGameStatus("Game Won!");
    }
    setGameStatus(state) {
        this._view.drawInfo(state);
    }
    start(view) {
        view.drawInfo("");
        view.drawScore(0);
        this.loop(view, (0, _helper.createBricks)());
    }
    loop(view, bricks) {
        view.clear();
        view.drawBricks(bricks);
        requestAnimationFrame(()=>{
            this.loop(view, bricks);
        });
    }
}

},{"./helper":"eKZRm","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eKZRm":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "createBricks", ()=>createBricks);
var _setup = require("./setup");
var _brickRedPng = require("./images/brick-red.png");
var _brickRedPngDefault = parcelHelpers.interopDefault(_brickRedPng);
var _brickBluePng = require("./images/brick-blue.png");
var _brickBluePngDefault = parcelHelpers.interopDefault(_brickBluePng);
var _brickGreenPng = require("./images/brick-green.png");
var _brickGreenPngDefault = parcelHelpers.interopDefault(_brickGreenPng);
var _brickYellowPng = require("./images/brick-yellow.png");
var _brickYellowPngDefault = parcelHelpers.interopDefault(_brickYellowPng);
var _brickPurplePng = require("./images/brick-purple.png");
var _brickPurplePngDefault = parcelHelpers.interopDefault(_brickPurplePng);
var _brick = require("./sprites/Brick");
function createBricks() {
    return (0, _setup.LEVEL).reduce((accumulated, element, ndx)=>{
        if (element <= 0) return accumulated;
        const stats = brickStats(element);
        return [
            ...accumulated,
            new (0, _brick.Brick)(stats.img, adjustedCoords(ndx), {
                width: 0,
                height: 0
            }, stats.energyLevel)
        ];
    }, []);
}
function adjustedCoords(i) {
    const x = (0, _setup.STAGE_PADDING) + i % (0, _setup.STAGE_COLS) * ((0, _setup.BRICK_WIDTH) + (0, _setup.BRICK_PADDING));
    const y = (0, _setup.STAGE_PADDING) + Math.floor(i / (0, _setup.STAGE_COLS)) * ((0, _setup.BRICK_HEIGHT) + (0, _setup.BRICK_PADDING));
    return {
        x,
        y
    };
}
function brickStats(energyLevel) {
    let color = (0, _brickRedPngDefault.default);
    let level = 1;
    switch(energyLevel){
        case 2:
            color = (0, _brickGreenPngDefault.default);
            level = 1;
            break;
        case 3:
            color = (0, _brickYellowPngDefault.default);
            level = 2;
            break;
        case 4:
            color = (0, _brickBluePngDefault.default);
            level = 2;
            break;
        case 5:
            color = (0, _brickPurplePngDefault.default);
            level = 3;
            break;
    }
    return {
        img: `images/brick-${color}.png`,
        energyLevel: level
    };
}

},{"./setup":"1ctuX","./sprites/Brick":"lHB0T","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./images/brick-red.png":"b5cIt","./images/brick-blue.png":"7govO","./images/brick-green.png":"4lEh6","./images/brick-yellow.png":"dxIqE","./images/brick-purple.png":"fb1bd"}],"1ctuX":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "STAGE_PADDING", ()=>STAGE_PADDING);
parcelHelpers.export(exports, "STAGE_ROWS", ()=>STAGE_ROWS);
parcelHelpers.export(exports, "STAGE_COLS", ()=>STAGE_COLS);
parcelHelpers.export(exports, "BRICK_PADDING", ()=>BRICK_PADDING);
parcelHelpers.export(exports, "BRICK_WIDTH", ()=>BRICK_WIDTH);
parcelHelpers.export(exports, "BRICK_HEIGHT", ()=>BRICK_HEIGHT);
parcelHelpers.export(exports, "PADDLE_WIDTH", ()=>PADDLE_WIDTH);
parcelHelpers.export(exports, "PADDLE_HEIGHT", ()=>PADDLE_HEIGHT);
parcelHelpers.export(exports, "PADDLE_STARTX", ()=>PADDLE_STARTX);
parcelHelpers.export(exports, "PADDLE_SPEED", ()=>PADDLE_SPEED);
parcelHelpers.export(exports, "BALL_SPEED", ()=>BALL_SPEED);
parcelHelpers.export(exports, "BALL_SIZE", ()=>BALL_SIZE);
parcelHelpers.export(exports, "BALL_STARTX", ()=>BALL_STARTX);
parcelHelpers.export(exports, "BALL_STARTY", ()=>BALL_STARTY);
parcelHelpers.export(exports, "BRICK_IMAGES", ()=>BRICK_IMAGES);
parcelHelpers.export(exports, "BRICK_ENERGY", ()=>BRICK_ENERGY);
parcelHelpers.export(exports, "LEVEL", ()=>LEVEL);
var _brickRedPng = require("./images/brick-red.png");
var _brickRedPngDefault = parcelHelpers.interopDefault(_brickRedPng);
var _brickBluePng = require("./images/brick-blue.png");
var _brickBluePngDefault = parcelHelpers.interopDefault(_brickBluePng);
var _brickGreenPng = require("./images/brick-green.png");
var _brickGreenPngDefault = parcelHelpers.interopDefault(_brickGreenPng);
var _brickYellowPng = require("./images/brick-yellow.png");
var _brickYellowPngDefault = parcelHelpers.interopDefault(_brickYellowPng);
var _brickPurplePng = require("./images/brick-purple.png");
var _brickPurplePngDefault = parcelHelpers.interopDefault(_brickPurplePng);
// Grab the canvas element for calculating the brick width
// depending on canvas width
const canvas = document.querySelector('#playField');
const STAGE_PADDING = 10;
const STAGE_ROWS = 20;
const STAGE_COLS = 10;
const BRICK_PADDING = 5;
const BRICK_WIDTH = canvas ? Math.floor((canvas.width - STAGE_PADDING * 2) / STAGE_COLS) - BRICK_PADDING : 100;
const BRICK_HEIGHT = canvas ? Math.floor((canvas.height - STAGE_PADDING * 2) / STAGE_ROWS) - BRICK_PADDING : 30;
const PADDLE_WIDTH = 150;
const PADDLE_HEIGHT = 25;
const PADDLE_STARTX = 450;
const PADDLE_SPEED = 10;
const BALL_SPEED = 5;
const BALL_SIZE = 20;
const BALL_STARTX = 500;
const BALL_STARTY = 400;
const BRICK_IMAGES = {
    1: (0, _brickRedPngDefault.default),
    2: (0, _brickGreenPngDefault.default),
    3: (0, _brickYellowPngDefault.default),
    4: (0, _brickBluePngDefault.default),
    5: (0, _brickPurplePngDefault.default)
};
const BRICK_ENERGY = {
    1: 1,
    2: 1,
    3: 2,
    4: 2,
    5: 3 // Purple brick
};
const LEVEL = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    0,
    0,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    0,
    0,
    0,
    4,
    4,
    4,
    4,
    4,
    4,
    0,
    0,
    0,
    0,
    5,
    5,
    0,
    0,
    5,
    5,
    0,
    0
];

},{"./images/brick-red.png":"b5cIt","./images/brick-blue.png":"7govO","./images/brick-green.png":"4lEh6","./images/brick-yellow.png":"dxIqE","./images/brick-purple.png":"fb1bd","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"b5cIt":[function(require,module,exports,__globalThis) {
module.exports = require("ef9fd8ea970566d1").getBundleURL('7UhFu') + "brick-red.93b1aeab.png" + "?" + Date.now();

},{"ef9fd8ea970566d1":"lgJ39"}],"lgJ39":[function(require,module,exports,__globalThis) {
"use strict";
var bundleURL = {};
function getBundleURLCached(id) {
    var value = bundleURL[id];
    if (!value) {
        value = getBundleURL();
        bundleURL[id] = value;
    }
    return value;
}
function getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ('' + err.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);
        if (matches) // The first two stack frames will be this function and getBundleURLCached.
        // Use the 3rd one, which will be a runtime in the original bundle.
        return getBaseURL(matches[2]);
    }
    return '/';
}
function getBaseURL(url) {
    return ('' + url).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}
// TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function getOrigin(url) {
    var matches = ('' + url).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^/]+/);
    if (!matches) throw new Error('Origin not found');
    return matches[0];
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;

},{}],"7govO":[function(require,module,exports,__globalThis) {
module.exports = require("e8d152f9dce96594").getBundleURL('7UhFu') + "brick-blue.515be4d7.png" + "?" + Date.now();

},{"e8d152f9dce96594":"lgJ39"}],"4lEh6":[function(require,module,exports,__globalThis) {
module.exports = require("689ee4e2921e32b8").getBundleURL('7UhFu') + "brick-green.0f9bc967.png" + "?" + Date.now();

},{"689ee4e2921e32b8":"lgJ39"}],"dxIqE":[function(require,module,exports,__globalThis) {
module.exports = require("a8f6dbc03bf6df9e").getBundleURL('7UhFu') + "brick-yellow.701b8c45.png" + "?" + Date.now();

},{"a8f6dbc03bf6df9e":"lgJ39"}],"fb1bd":[function(require,module,exports,__globalThis) {
module.exports = require("71e6d92671c5ba25").getBundleURL('7UhFu') + "brick-purple.cbd6284a.png" + "?" + Date.now();

},{"71e6d92671c5ba25":"lgJ39"}],"lHB0T":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Brick", ()=>Brick);
var _sprite = require("./Sprite");
class Brick extends (0, _sprite.Sprite) {
    constructor(imgSrc, coords, size, energy = 1){
        super(imgSrc, coords, size);
        this.energy = energy;
    }
}

},{"./Sprite":"4S7ZA","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4S7ZA":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Sprite", ()=>Sprite);
class Sprite {
    constructor(imageSrc, coords, size){
        this._img = new Image();
        this._isLoaded = false;
        this._img.src = imageSrc;
        this._img.onload = ()=>{
            this._isLoaded = true;
            console.log(`Image loaded: ${imageSrc}`);
        };
        this._img.onerror = ()=>{
            console.error(`Failed to load image: ${imageSrc}`);
        };
        this._x = coords.x;
        this._y = coords.y;
        this._w = size.width;
        this._h = size.height;
    }
    get image() {
        return this._img;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get width() {
        return this._w;
    }
    get height() {
        return this._h;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["bTHtU","h7u1C"], "h7u1C", "parcelRequire94c2")

//# sourceMappingURL=index.b71e74eb.js.map
