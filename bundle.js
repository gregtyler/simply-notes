(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target2) => (target2 = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target2, "default", { value: mod, enumerable: true }) : target2,
    mod
  ));

  // node_modules/vuex/dist/vuex.common.js
  var require_vuex_common = __commonJS({
    "node_modules/vuex/dist/vuex.common.js"(exports, module) {
      "use strict";
      function applyMixin(Vue3) {
        var version3 = Number(Vue3.version.split(".")[0]);
        if (version3 >= 2) {
          Vue3.mixin({ beforeCreate: vuexInit });
        } else {
          var _init = Vue3.prototype._init;
          Vue3.prototype._init = function(options) {
            if (options === void 0)
              options = {};
            options.init = options.init ? [vuexInit].concat(options.init) : vuexInit;
            _init.call(this, options);
          };
        }
        function vuexInit() {
          var options = this.$options;
          if (options.store) {
            this.$store = typeof options.store === "function" ? options.store() : options.store;
          } else if (options.parent && options.parent.$store) {
            this.$store = options.parent.$store;
          }
        }
      }
      var target2 = typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
      var devtoolHook = target2.__VUE_DEVTOOLS_GLOBAL_HOOK__;
      function devtoolPlugin(store2) {
        if (!devtoolHook) {
          return;
        }
        store2._devtoolHook = devtoolHook;
        devtoolHook.emit("vuex:init", store2);
        devtoolHook.on("vuex:travel-to-state", function(targetState) {
          store2.replaceState(targetState);
        });
        store2.subscribe(function(mutation, state) {
          devtoolHook.emit("vuex:mutation", mutation, state);
        }, { prepend: true });
        store2.subscribeAction(function(action, state) {
          devtoolHook.emit("vuex:action", action, state);
        }, { prepend: true });
      }
      function find(list, f) {
        return list.filter(f)[0];
      }
      function deepCopy(obj, cache) {
        if (cache === void 0)
          cache = [];
        if (obj === null || typeof obj !== "object") {
          return obj;
        }
        var hit = find(cache, function(c) {
          return c.original === obj;
        });
        if (hit) {
          return hit.copy;
        }
        var copy = Array.isArray(obj) ? [] : {};
        cache.push({
          original: obj,
          copy
        });
        Object.keys(obj).forEach(function(key) {
          copy[key] = deepCopy(obj[key], cache);
        });
        return copy;
      }
      function forEachValue(obj, fn) {
        Object.keys(obj).forEach(function(key) {
          return fn(obj[key], key);
        });
      }
      function isObject2(obj) {
        return obj !== null && typeof obj === "object";
      }
      function isPromise2(val) {
        return val && typeof val.then === "function";
      }
      function assert3(condition, msg) {
        if (!condition) {
          throw new Error("[vuex] " + msg);
        }
      }
      function partial(fn, arg) {
        return function() {
          return fn(arg);
        };
      }
      var Module = function Module2(rawModule, runtime) {
        this.runtime = runtime;
        this._children = /* @__PURE__ */ Object.create(null);
        this._rawModule = rawModule;
        var rawState = rawModule.state;
        this.state = (typeof rawState === "function" ? rawState() : rawState) || {};
      };
      var prototypeAccessors2 = { namespaced: { configurable: true } };
      prototypeAccessors2.namespaced.get = function() {
        return !!this._rawModule.namespaced;
      };
      Module.prototype.addChild = function addChild(key, module2) {
        this._children[key] = module2;
      };
      Module.prototype.removeChild = function removeChild2(key) {
        delete this._children[key];
      };
      Module.prototype.getChild = function getChild(key) {
        return this._children[key];
      };
      Module.prototype.hasChild = function hasChild(key) {
        return key in this._children;
      };
      Module.prototype.update = function update2(rawModule) {
        this._rawModule.namespaced = rawModule.namespaced;
        if (rawModule.actions) {
          this._rawModule.actions = rawModule.actions;
        }
        if (rawModule.mutations) {
          this._rawModule.mutations = rawModule.mutations;
        }
        if (rawModule.getters) {
          this._rawModule.getters = rawModule.getters;
        }
      };
      Module.prototype.forEachChild = function forEachChild(fn) {
        forEachValue(this._children, fn);
      };
      Module.prototype.forEachGetter = function forEachGetter(fn) {
        if (this._rawModule.getters) {
          forEachValue(this._rawModule.getters, fn);
        }
      };
      Module.prototype.forEachAction = function forEachAction(fn) {
        if (this._rawModule.actions) {
          forEachValue(this._rawModule.actions, fn);
        }
      };
      Module.prototype.forEachMutation = function forEachMutation(fn) {
        if (this._rawModule.mutations) {
          forEachValue(this._rawModule.mutations, fn);
        }
      };
      Object.defineProperties(Module.prototype, prototypeAccessors2);
      var ModuleCollection = function ModuleCollection2(rawRootModule) {
        this.register([], rawRootModule, false);
      };
      ModuleCollection.prototype.get = function get(path) {
        return path.reduce(function(module2, key) {
          return module2.getChild(key);
        }, this.root);
      };
      ModuleCollection.prototype.getNamespace = function getNamespace(path) {
        var module2 = this.root;
        return path.reduce(function(namespace, key) {
          module2 = module2.getChild(key);
          return namespace + (module2.namespaced ? key + "/" : "");
        }, "");
      };
      ModuleCollection.prototype.update = function update$1(rawRootModule) {
        update([], this.root, rawRootModule);
      };
      ModuleCollection.prototype.register = function register(path, rawModule, runtime) {
        var this$1 = this;
        if (runtime === void 0)
          runtime = true;
        if (true) {
          assertRawModule(path, rawModule);
        }
        var newModule = new Module(rawModule, runtime);
        if (path.length === 0) {
          this.root = newModule;
        } else {
          var parent = this.get(path.slice(0, -1));
          parent.addChild(path[path.length - 1], newModule);
        }
        if (rawModule.modules) {
          forEachValue(rawModule.modules, function(rawChildModule, key) {
            this$1.register(path.concat(key), rawChildModule, runtime);
          });
        }
      };
      ModuleCollection.prototype.unregister = function unregister(path) {
        var parent = this.get(path.slice(0, -1));
        var key = path[path.length - 1];
        var child = parent.getChild(key);
        if (!child) {
          if (true) {
            console.warn(
              "[vuex] trying to unregister module '" + key + "', which is not registered"
            );
          }
          return;
        }
        if (!child.runtime) {
          return;
        }
        parent.removeChild(key);
      };
      ModuleCollection.prototype.isRegistered = function isRegistered(path) {
        var parent = this.get(path.slice(0, -1));
        var key = path[path.length - 1];
        if (parent) {
          return parent.hasChild(key);
        }
        return false;
      };
      function update(path, targetModule, newModule) {
        if (true) {
          assertRawModule(path, newModule);
        }
        targetModule.update(newModule);
        if (newModule.modules) {
          for (var key in newModule.modules) {
            if (!targetModule.getChild(key)) {
              if (true) {
                console.warn(
                  "[vuex] trying to add a new module '" + key + "' on hot reloading, manual reload is needed"
                );
              }
              return;
            }
            update(
              path.concat(key),
              targetModule.getChild(key),
              newModule.modules[key]
            );
          }
        }
      }
      var functionAssert = {
        assert: function(value) {
          return typeof value === "function";
        },
        expected: "function"
      };
      var objectAssert = {
        assert: function(value) {
          return typeof value === "function" || typeof value === "object" && typeof value.handler === "function";
        },
        expected: 'function or object with "handler" function'
      };
      var assertTypes = {
        getters: functionAssert,
        mutations: functionAssert,
        actions: objectAssert
      };
      function assertRawModule(path, rawModule) {
        Object.keys(assertTypes).forEach(function(key) {
          if (!rawModule[key]) {
            return;
          }
          var assertOptions = assertTypes[key];
          forEachValue(rawModule[key], function(value, type2) {
            assert3(
              assertOptions.assert(value),
              makeAssertionMessage(path, key, type2, value, assertOptions.expected)
            );
          });
        });
      }
      function makeAssertionMessage(path, key, type2, value, expected) {
        var buf = key + " should be " + expected + ' but "' + key + "." + type2 + '"';
        if (path.length > 0) {
          buf += ' in module "' + path.join(".") + '"';
        }
        buf += " is " + JSON.stringify(value) + ".";
        return buf;
      }
      var Vue2;
      var Store2 = function Store3(options) {
        var this$1 = this;
        if (options === void 0)
          options = {};
        if (!Vue2 && typeof window !== "undefined" && window.Vue) {
          install3(window.Vue);
        }
        if (true) {
          assert3(Vue2, "must call Vue.use(Vuex) before creating a store instance.");
          assert3(typeof Promise !== "undefined", "vuex requires a Promise polyfill in this browser.");
          assert3(this instanceof Store3, "store must be called with the new operator.");
        }
        var plugins = options.plugins;
        if (plugins === void 0)
          plugins = [];
        var strict = options.strict;
        if (strict === void 0)
          strict = false;
        this._committing = false;
        this._actions = /* @__PURE__ */ Object.create(null);
        this._actionSubscribers = [];
        this._mutations = /* @__PURE__ */ Object.create(null);
        this._wrappedGetters = /* @__PURE__ */ Object.create(null);
        this._modules = new ModuleCollection(options);
        this._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
        this._subscribers = [];
        this._watcherVM = new Vue2();
        this._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
        var store2 = this;
        var ref2 = this;
        var dispatch = ref2.dispatch;
        var commit = ref2.commit;
        this.dispatch = function boundDispatch(type2, payload) {
          return dispatch.call(store2, type2, payload);
        };
        this.commit = function boundCommit(type2, payload, options2) {
          return commit.call(store2, type2, payload, options2);
        };
        this.strict = strict;
        var state = this._modules.root.state;
        installModule(this, state, [], this._modules.root);
        resetStoreVM(this, state);
        plugins.forEach(function(plugin) {
          return plugin(this$1);
        });
        var useDevtools = options.devtools !== void 0 ? options.devtools : Vue2.config.devtools;
        if (useDevtools) {
          devtoolPlugin(this);
        }
      };
      var prototypeAccessors$1 = { state: { configurable: true } };
      prototypeAccessors$1.state.get = function() {
        return this._vm._data.$$state;
      };
      prototypeAccessors$1.state.set = function(v) {
        if (true) {
          assert3(false, "use store.replaceState() to explicit replace store state.");
        }
      };
      Store2.prototype.commit = function commit(_type, _payload, _options) {
        var this$1 = this;
        var ref2 = unifyObjectStyle(_type, _payload, _options);
        var type2 = ref2.type;
        var payload = ref2.payload;
        var options = ref2.options;
        var mutation = { type: type2, payload };
        var entry = this._mutations[type2];
        if (!entry) {
          if (true) {
            console.error("[vuex] unknown mutation type: " + type2);
          }
          return;
        }
        this._withCommit(function() {
          entry.forEach(function commitIterator(handler) {
            handler(payload);
          });
        });
        this._subscribers.slice().forEach(function(sub) {
          return sub(mutation, this$1.state);
        });
        if (options && options.silent) {
          console.warn(
            "[vuex] mutation type: " + type2 + ". Silent option has been removed. Use the filter functionality in the vue-devtools"
          );
        }
      };
      Store2.prototype.dispatch = function dispatch(_type, _payload) {
        var this$1 = this;
        var ref2 = unifyObjectStyle(_type, _payload);
        var type2 = ref2.type;
        var payload = ref2.payload;
        var action = { type: type2, payload };
        var entry = this._actions[type2];
        if (!entry) {
          if (true) {
            console.error("[vuex] unknown action type: " + type2);
          }
          return;
        }
        try {
          this._actionSubscribers.slice().filter(function(sub) {
            return sub.before;
          }).forEach(function(sub) {
            return sub.before(action, this$1.state);
          });
        } catch (e) {
          if (true) {
            console.warn("[vuex] error in before action subscribers: ");
            console.error(e);
          }
        }
        var result = entry.length > 1 ? Promise.all(entry.map(function(handler) {
          return handler(payload);
        })) : entry[0](payload);
        return new Promise(function(resolve2, reject) {
          result.then(function(res) {
            try {
              this$1._actionSubscribers.filter(function(sub) {
                return sub.after;
              }).forEach(function(sub) {
                return sub.after(action, this$1.state);
              });
            } catch (e) {
              if (true) {
                console.warn("[vuex] error in after action subscribers: ");
                console.error(e);
              }
            }
            resolve2(res);
          }, function(error) {
            try {
              this$1._actionSubscribers.filter(function(sub) {
                return sub.error;
              }).forEach(function(sub) {
                return sub.error(action, this$1.state, error);
              });
            } catch (e) {
              if (true) {
                console.warn("[vuex] error in error action subscribers: ");
                console.error(e);
              }
            }
            reject(error);
          });
        });
      };
      Store2.prototype.subscribe = function subscribe(fn, options) {
        return genericSubscribe(fn, this._subscribers, options);
      };
      Store2.prototype.subscribeAction = function subscribeAction(fn, options) {
        var subs = typeof fn === "function" ? { before: fn } : fn;
        return genericSubscribe(subs, this._actionSubscribers, options);
      };
      Store2.prototype.watch = function watch(getter, cb, options) {
        var this$1 = this;
        if (true) {
          assert3(typeof getter === "function", "store.watch only accepts a function.");
        }
        return this._watcherVM.$watch(function() {
          return getter(this$1.state, this$1.getters);
        }, cb, options);
      };
      Store2.prototype.replaceState = function replaceState2(state) {
        var this$1 = this;
        this._withCommit(function() {
          this$1._vm._data.$$state = state;
        });
      };
      Store2.prototype.registerModule = function registerModule(path, rawModule, options) {
        if (options === void 0)
          options = {};
        if (typeof path === "string") {
          path = [path];
        }
        if (true) {
          assert3(Array.isArray(path), "module path must be a string or an Array.");
          assert3(path.length > 0, "cannot register the root module by using registerModule.");
        }
        this._modules.register(path, rawModule);
        installModule(this, this.state, path, this._modules.get(path), options.preserveState);
        resetStoreVM(this, this.state);
      };
      Store2.prototype.unregisterModule = function unregisterModule(path) {
        var this$1 = this;
        if (typeof path === "string") {
          path = [path];
        }
        if (true) {
          assert3(Array.isArray(path), "module path must be a string or an Array.");
        }
        this._modules.unregister(path);
        this._withCommit(function() {
          var parentState = getNestedState(this$1.state, path.slice(0, -1));
          Vue2.delete(parentState, path[path.length - 1]);
        });
        resetStore(this);
      };
      Store2.prototype.hasModule = function hasModule(path) {
        if (typeof path === "string") {
          path = [path];
        }
        if (true) {
          assert3(Array.isArray(path), "module path must be a string or an Array.");
        }
        return this._modules.isRegistered(path);
      };
      Store2.prototype.hotUpdate = function hotUpdate(newOptions) {
        this._modules.update(newOptions);
        resetStore(this, true);
      };
      Store2.prototype._withCommit = function _withCommit(fn) {
        var committing = this._committing;
        this._committing = true;
        fn();
        this._committing = committing;
      };
      Object.defineProperties(Store2.prototype, prototypeAccessors$1);
      function genericSubscribe(fn, subs, options) {
        if (subs.indexOf(fn) < 0) {
          options && options.prepend ? subs.unshift(fn) : subs.push(fn);
        }
        return function() {
          var i = subs.indexOf(fn);
          if (i > -1) {
            subs.splice(i, 1);
          }
        };
      }
      function resetStore(store2, hot) {
        store2._actions = /* @__PURE__ */ Object.create(null);
        store2._mutations = /* @__PURE__ */ Object.create(null);
        store2._wrappedGetters = /* @__PURE__ */ Object.create(null);
        store2._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
        var state = store2.state;
        installModule(store2, state, [], store2._modules.root, true);
        resetStoreVM(store2, state, hot);
      }
      function resetStoreVM(store2, state, hot) {
        var oldVm = store2._vm;
        store2.getters = {};
        store2._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
        var wrappedGetters = store2._wrappedGetters;
        var computed = {};
        forEachValue(wrappedGetters, function(fn, key) {
          computed[key] = partial(fn, store2);
          Object.defineProperty(store2.getters, key, {
            get: function() {
              return store2._vm[key];
            },
            enumerable: true
          });
        });
        var silent = Vue2.config.silent;
        Vue2.config.silent = true;
        store2._vm = new Vue2({
          data: {
            $$state: state
          },
          computed
        });
        Vue2.config.silent = silent;
        if (store2.strict) {
          enableStrictMode(store2);
        }
        if (oldVm) {
          if (hot) {
            store2._withCommit(function() {
              oldVm._data.$$state = null;
            });
          }
          Vue2.nextTick(function() {
            return oldVm.$destroy();
          });
        }
      }
      function installModule(store2, rootState, path, module2, hot) {
        var isRoot = !path.length;
        var namespace = store2._modules.getNamespace(path);
        if (module2.namespaced) {
          if (store2._modulesNamespaceMap[namespace] && true) {
            console.error("[vuex] duplicate namespace " + namespace + " for the namespaced module " + path.join("/"));
          }
          store2._modulesNamespaceMap[namespace] = module2;
        }
        if (!isRoot && !hot) {
          var parentState = getNestedState(rootState, path.slice(0, -1));
          var moduleName = path[path.length - 1];
          store2._withCommit(function() {
            if (true) {
              if (moduleName in parentState) {
                console.warn(
                  '[vuex] state field "' + moduleName + '" was overridden by a module with the same name at "' + path.join(".") + '"'
                );
              }
            }
            Vue2.set(parentState, moduleName, module2.state);
          });
        }
        var local = module2.context = makeLocalContext(store2, namespace, path);
        module2.forEachMutation(function(mutation, key) {
          var namespacedType = namespace + key;
          registerMutation(store2, namespacedType, mutation, local);
        });
        module2.forEachAction(function(action, key) {
          var type2 = action.root ? key : namespace + key;
          var handler = action.handler || action;
          registerAction(store2, type2, handler, local);
        });
        module2.forEachGetter(function(getter, key) {
          var namespacedType = namespace + key;
          registerGetter(store2, namespacedType, getter, local);
        });
        module2.forEachChild(function(child, key) {
          installModule(store2, rootState, path.concat(key), child, hot);
        });
      }
      function makeLocalContext(store2, namespace, path) {
        var noNamespace = namespace === "";
        var local = {
          dispatch: noNamespace ? store2.dispatch : function(_type, _payload, _options) {
            var args = unifyObjectStyle(_type, _payload, _options);
            var payload = args.payload;
            var options = args.options;
            var type2 = args.type;
            if (!options || !options.root) {
              type2 = namespace + type2;
              if (!store2._actions[type2]) {
                console.error("[vuex] unknown local action type: " + args.type + ", global type: " + type2);
                return;
              }
            }
            return store2.dispatch(type2, payload);
          },
          commit: noNamespace ? store2.commit : function(_type, _payload, _options) {
            var args = unifyObjectStyle(_type, _payload, _options);
            var payload = args.payload;
            var options = args.options;
            var type2 = args.type;
            if (!options || !options.root) {
              type2 = namespace + type2;
              if (!store2._mutations[type2]) {
                console.error("[vuex] unknown local mutation type: " + args.type + ", global type: " + type2);
                return;
              }
            }
            store2.commit(type2, payload, options);
          }
        };
        Object.defineProperties(local, {
          getters: {
            get: noNamespace ? function() {
              return store2.getters;
            } : function() {
              return makeLocalGetters(store2, namespace);
            }
          },
          state: {
            get: function() {
              return getNestedState(store2.state, path);
            }
          }
        });
        return local;
      }
      function makeLocalGetters(store2, namespace) {
        if (!store2._makeLocalGettersCache[namespace]) {
          var gettersProxy = {};
          var splitPos = namespace.length;
          Object.keys(store2.getters).forEach(function(type2) {
            if (type2.slice(0, splitPos) !== namespace) {
              return;
            }
            var localType = type2.slice(splitPos);
            Object.defineProperty(gettersProxy, localType, {
              get: function() {
                return store2.getters[type2];
              },
              enumerable: true
            });
          });
          store2._makeLocalGettersCache[namespace] = gettersProxy;
        }
        return store2._makeLocalGettersCache[namespace];
      }
      function registerMutation(store2, type2, handler, local) {
        var entry = store2._mutations[type2] || (store2._mutations[type2] = []);
        entry.push(function wrappedMutationHandler(payload) {
          handler.call(store2, local.state, payload);
        });
      }
      function registerAction(store2, type2, handler, local) {
        var entry = store2._actions[type2] || (store2._actions[type2] = []);
        entry.push(function wrappedActionHandler(payload) {
          var res = handler.call(store2, {
            dispatch: local.dispatch,
            commit: local.commit,
            getters: local.getters,
            state: local.state,
            rootGetters: store2.getters,
            rootState: store2.state
          }, payload);
          if (!isPromise2(res)) {
            res = Promise.resolve(res);
          }
          if (store2._devtoolHook) {
            return res.catch(function(err) {
              store2._devtoolHook.emit("vuex:error", err);
              throw err;
            });
          } else {
            return res;
          }
        });
      }
      function registerGetter(store2, type2, rawGetter, local) {
        if (store2._wrappedGetters[type2]) {
          if (true) {
            console.error("[vuex] duplicate getter key: " + type2);
          }
          return;
        }
        store2._wrappedGetters[type2] = function wrappedGetter(store3) {
          return rawGetter(
            local.state,
            local.getters,
            store3.state,
            store3.getters
          );
        };
      }
      function enableStrictMode(store2) {
        store2._vm.$watch(function() {
          return this._data.$$state;
        }, function() {
          if (true) {
            assert3(store2._committing, "do not mutate vuex store state outside mutation handlers.");
          }
        }, { deep: true, sync: true });
      }
      function getNestedState(state, path) {
        return path.reduce(function(state2, key) {
          return state2[key];
        }, state);
      }
      function unifyObjectStyle(type2, payload, options) {
        if (isObject2(type2) && type2.type) {
          options = payload;
          payload = type2;
          type2 = type2.type;
        }
        if (true) {
          assert3(typeof type2 === "string", "expects string as the type, but found " + typeof type2 + ".");
        }
        return { type: type2, payload, options };
      }
      function install3(_Vue2) {
        if (Vue2 && _Vue2 === Vue2) {
          if (true) {
            console.error(
              "[vuex] already installed. Vue.use(Vuex) should be called only once."
            );
          }
          return;
        }
        Vue2 = _Vue2;
        applyMixin(Vue2);
      }
      var mapState2 = normalizeNamespace(function(namespace, states) {
        var res = {};
        if (!isValidMap(states)) {
          console.error("[vuex] mapState: mapper parameter must be either an Array or an Object");
        }
        normalizeMap(states).forEach(function(ref2) {
          var key = ref2.key;
          var val = ref2.val;
          res[key] = function mappedState() {
            var state = this.$store.state;
            var getters = this.$store.getters;
            if (namespace) {
              var module2 = getModuleByNamespace(this.$store, "mapState", namespace);
              if (!module2) {
                return;
              }
              state = module2.context.state;
              getters = module2.context.getters;
            }
            return typeof val === "function" ? val.call(this, state, getters) : state[val];
          };
          res[key].vuex = true;
        });
        return res;
      });
      var mapMutations2 = normalizeNamespace(function(namespace, mutations) {
        var res = {};
        if (!isValidMap(mutations)) {
          console.error("[vuex] mapMutations: mapper parameter must be either an Array or an Object");
        }
        normalizeMap(mutations).forEach(function(ref2) {
          var key = ref2.key;
          var val = ref2.val;
          res[key] = function mappedMutation() {
            var args = [], len = arguments.length;
            while (len--)
              args[len] = arguments[len];
            var commit = this.$store.commit;
            if (namespace) {
              var module2 = getModuleByNamespace(this.$store, "mapMutations", namespace);
              if (!module2) {
                return;
              }
              commit = module2.context.commit;
            }
            return typeof val === "function" ? val.apply(this, [commit].concat(args)) : commit.apply(this.$store, [val].concat(args));
          };
        });
        return res;
      });
      var mapGetters2 = normalizeNamespace(function(namespace, getters) {
        var res = {};
        if (!isValidMap(getters)) {
          console.error("[vuex] mapGetters: mapper parameter must be either an Array or an Object");
        }
        normalizeMap(getters).forEach(function(ref2) {
          var key = ref2.key;
          var val = ref2.val;
          val = namespace + val;
          res[key] = function mappedGetter() {
            if (namespace && !getModuleByNamespace(this.$store, "mapGetters", namespace)) {
              return;
            }
            if (!(val in this.$store.getters)) {
              console.error("[vuex] unknown getter: " + val);
              return;
            }
            return this.$store.getters[val];
          };
          res[key].vuex = true;
        });
        return res;
      });
      var mapActions2 = normalizeNamespace(function(namespace, actions) {
        var res = {};
        if (!isValidMap(actions)) {
          console.error("[vuex] mapActions: mapper parameter must be either an Array or an Object");
        }
        normalizeMap(actions).forEach(function(ref2) {
          var key = ref2.key;
          var val = ref2.val;
          res[key] = function mappedAction() {
            var args = [], len = arguments.length;
            while (len--)
              args[len] = arguments[len];
            var dispatch = this.$store.dispatch;
            if (namespace) {
              var module2 = getModuleByNamespace(this.$store, "mapActions", namespace);
              if (!module2) {
                return;
              }
              dispatch = module2.context.dispatch;
            }
            return typeof val === "function" ? val.apply(this, [dispatch].concat(args)) : dispatch.apply(this.$store, [val].concat(args));
          };
        });
        return res;
      });
      var createNamespacedHelpers2 = function(namespace) {
        return {
          mapState: mapState2.bind(null, namespace),
          mapGetters: mapGetters2.bind(null, namespace),
          mapMutations: mapMutations2.bind(null, namespace),
          mapActions: mapActions2.bind(null, namespace)
        };
      };
      function normalizeMap(map) {
        if (!isValidMap(map)) {
          return [];
        }
        return Array.isArray(map) ? map.map(function(key) {
          return { key, val: key };
        }) : Object.keys(map).map(function(key) {
          return { key, val: map[key] };
        });
      }
      function isValidMap(map) {
        return Array.isArray(map) || isObject2(map);
      }
      function normalizeNamespace(fn) {
        return function(namespace, map) {
          if (typeof namespace !== "string") {
            map = namespace;
            namespace = "";
          } else if (namespace.charAt(namespace.length - 1) !== "/") {
            namespace += "/";
          }
          return fn(namespace, map);
        };
      }
      function getModuleByNamespace(store2, helper, namespace) {
        var module2 = store2._modulesNamespaceMap[namespace];
        if (!module2) {
          console.error("[vuex] module namespace not found in " + helper + "(): " + namespace);
        }
        return module2;
      }
      function createLogger2(ref2) {
        if (ref2 === void 0)
          ref2 = {};
        var collapsed = ref2.collapsed;
        if (collapsed === void 0)
          collapsed = true;
        var filter = ref2.filter;
        if (filter === void 0)
          filter = function(mutation, stateBefore, stateAfter) {
            return true;
          };
        var transformer = ref2.transformer;
        if (transformer === void 0)
          transformer = function(state) {
            return state;
          };
        var mutationTransformer = ref2.mutationTransformer;
        if (mutationTransformer === void 0)
          mutationTransformer = function(mut) {
            return mut;
          };
        var actionFilter = ref2.actionFilter;
        if (actionFilter === void 0)
          actionFilter = function(action, state) {
            return true;
          };
        var actionTransformer = ref2.actionTransformer;
        if (actionTransformer === void 0)
          actionTransformer = function(act) {
            return act;
          };
        var logMutations = ref2.logMutations;
        if (logMutations === void 0)
          logMutations = true;
        var logActions = ref2.logActions;
        if (logActions === void 0)
          logActions = true;
        var logger = ref2.logger;
        if (logger === void 0)
          logger = console;
        return function(store2) {
          var prevState = deepCopy(store2.state);
          if (typeof logger === "undefined") {
            return;
          }
          if (logMutations) {
            store2.subscribe(function(mutation, state) {
              var nextState = deepCopy(state);
              if (filter(mutation, prevState, nextState)) {
                var formattedTime = getFormattedTime();
                var formattedMutation = mutationTransformer(mutation);
                var message = "mutation " + mutation.type + formattedTime;
                startMessage(logger, message, collapsed);
                logger.log("%c prev state", "color: #9E9E9E; font-weight: bold", transformer(prevState));
                logger.log("%c mutation", "color: #03A9F4; font-weight: bold", formattedMutation);
                logger.log("%c next state", "color: #4CAF50; font-weight: bold", transformer(nextState));
                endMessage(logger);
              }
              prevState = nextState;
            });
          }
          if (logActions) {
            store2.subscribeAction(function(action, state) {
              if (actionFilter(action, state)) {
                var formattedTime = getFormattedTime();
                var formattedAction = actionTransformer(action);
                var message = "action " + action.type + formattedTime;
                startMessage(logger, message, collapsed);
                logger.log("%c action", "color: #03A9F4; font-weight: bold", formattedAction);
                endMessage(logger);
              }
            });
          }
        };
      }
      function startMessage(logger, message, collapsed) {
        var startMessage2 = collapsed ? logger.groupCollapsed : logger.group;
        try {
          startMessage2.call(logger, message);
        } catch (e) {
          logger.log(message);
        }
      }
      function endMessage(logger) {
        try {
          logger.groupEnd();
        } catch (e) {
          logger.log("\u2014\u2014 log end \u2014\u2014");
        }
      }
      function getFormattedTime() {
        var time = new Date();
        return " @ " + pad2(time.getHours(), 2) + ":" + pad2(time.getMinutes(), 2) + ":" + pad2(time.getSeconds(), 2) + "." + pad2(time.getMilliseconds(), 3);
      }
      function repeat(str, times) {
        return new Array(times + 1).join(str);
      }
      function pad2(num, maxLength) {
        return repeat("0", maxLength - num.toString().length) + num;
      }
      var index_cjs = {
        Store: Store2,
        install: install3,
        version: "3.6.2",
        mapState: mapState2,
        mapMutations: mapMutations2,
        mapGetters: mapGetters2,
        mapActions: mapActions2,
        createNamespacedHelpers: createNamespacedHelpers2,
        createLogger: createLogger2
      };
      module.exports = index_cjs;
    }
  });

  // node_modules/vue/dist/vue.runtime.esm.js
  var emptyObject = Object.freeze({});
  var isArray = Array.isArray;
  function isUndef(v) {
    return v === void 0 || v === null;
  }
  function isDef(v) {
    return v !== void 0 && v !== null;
  }
  function isTrue(v) {
    return v === true;
  }
  function isFalse(v) {
    return v === false;
  }
  function isPrimitive(value) {
    return typeof value === "string" || typeof value === "number" || typeof value === "symbol" || typeof value === "boolean";
  }
  function isFunction(value) {
    return typeof value === "function";
  }
  function isObject(obj) {
    return obj !== null && typeof obj === "object";
  }
  var _toString = Object.prototype.toString;
  function toRawType(value) {
    return _toString.call(value).slice(8, -1);
  }
  function isPlainObject(obj) {
    return _toString.call(obj) === "[object Object]";
  }
  function isRegExp(v) {
    return _toString.call(v) === "[object RegExp]";
  }
  function isValidArrayIndex(val) {
    var n = parseFloat(String(val));
    return n >= 0 && Math.floor(n) === n && isFinite(val);
  }
  function isPromise(val) {
    return isDef(val) && typeof val.then === "function" && typeof val.catch === "function";
  }
  function toString(val) {
    return val == null ? "" : Array.isArray(val) || isPlainObject(val) && val.toString === _toString ? JSON.stringify(val, null, 2) : String(val);
  }
  function toNumber(val) {
    var n = parseFloat(val);
    return isNaN(n) ? val : n;
  }
  function makeMap(str, expectsLowerCase) {
    var map = /* @__PURE__ */ Object.create(null);
    var list = str.split(",");
    for (var i = 0; i < list.length; i++) {
      map[list[i]] = true;
    }
    return expectsLowerCase ? function(val) {
      return map[val.toLowerCase()];
    } : function(val) {
      return map[val];
    };
  }
  var isBuiltInTag = makeMap("slot,component", true);
  var isReservedAttribute = makeMap("key,ref,slot,slot-scope,is");
  function remove$2(arr, item) {
    var len = arr.length;
    if (len) {
      if (item === arr[len - 1]) {
        arr.length = len - 1;
        return;
      }
      var index2 = arr.indexOf(item);
      if (index2 > -1) {
        return arr.splice(index2, 1);
      }
    }
  }
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
  }
  function cached(fn) {
    var cache = /* @__PURE__ */ Object.create(null);
    return function cachedFn(str) {
      var hit = cache[str];
      return hit || (cache[str] = fn(str));
    };
  }
  var camelizeRE = /-(\w)/g;
  var camelize = cached(function(str) {
    return str.replace(camelizeRE, function(_, c) {
      return c ? c.toUpperCase() : "";
    });
  });
  var capitalize = cached(function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  });
  var hyphenateRE = /\B([A-Z])/g;
  var hyphenate = cached(function(str) {
    return str.replace(hyphenateRE, "-$1").toLowerCase();
  });
  function polyfillBind(fn, ctx) {
    function boundFn(a) {
      var l = arguments.length;
      return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
    }
    boundFn._length = fn.length;
    return boundFn;
  }
  function nativeBind(fn, ctx) {
    return fn.bind(ctx);
  }
  var bind = Function.prototype.bind ? nativeBind : polyfillBind;
  function toArray(list, start) {
    start = start || 0;
    var i = list.length - start;
    var ret = new Array(i);
    while (i--) {
      ret[i] = list[i + start];
    }
    return ret;
  }
  function extend(to, _from) {
    for (var key in _from) {
      to[key] = _from[key];
    }
    return to;
  }
  function toObject(arr) {
    var res = {};
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]) {
        extend(res, arr[i]);
      }
    }
    return res;
  }
  function noop(a, b, c) {
  }
  var no = function(a, b, c) {
    return false;
  };
  var identity = function(_) {
    return _;
  };
  function looseEqual(a, b) {
    if (a === b)
      return true;
    var isObjectA = isObject(a);
    var isObjectB = isObject(b);
    if (isObjectA && isObjectB) {
      try {
        var isArrayA = Array.isArray(a);
        var isArrayB = Array.isArray(b);
        if (isArrayA && isArrayB) {
          return a.length === b.length && a.every(function(e, i) {
            return looseEqual(e, b[i]);
          });
        } else if (a instanceof Date && b instanceof Date) {
          return a.getTime() === b.getTime();
        } else if (!isArrayA && !isArrayB) {
          var keysA = Object.keys(a);
          var keysB = Object.keys(b);
          return keysA.length === keysB.length && keysA.every(function(key) {
            return looseEqual(a[key], b[key]);
          });
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    } else if (!isObjectA && !isObjectB) {
      return String(a) === String(b);
    } else {
      return false;
    }
  }
  function looseIndexOf(arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (looseEqual(arr[i], val))
        return i;
    }
    return -1;
  }
  function once(fn) {
    var called = false;
    return function() {
      if (!called) {
        called = true;
        fn.apply(this, arguments);
      }
    };
  }
  function hasChanged(x, y) {
    if (x === y) {
      return x === 0 && 1 / x !== 1 / y;
    } else {
      return x === x || y === y;
    }
  }
  var SSR_ATTR = "data-server-rendered";
  var ASSET_TYPES = ["component", "directive", "filter"];
  var LIFECYCLE_HOOKS = [
    "beforeCreate",
    "created",
    "beforeMount",
    "mounted",
    "beforeUpdate",
    "updated",
    "beforeDestroy",
    "destroyed",
    "activated",
    "deactivated",
    "errorCaptured",
    "serverPrefetch",
    "renderTracked",
    "renderTriggered"
  ];
  var config = {
    optionMergeStrategies: /* @__PURE__ */ Object.create(null),
    silent: false,
    productionTip: true,
    devtools: true,
    performance: false,
    errorHandler: null,
    warnHandler: null,
    ignoredElements: [],
    keyCodes: /* @__PURE__ */ Object.create(null),
    isReservedTag: no,
    isReservedAttr: no,
    isUnknownElement: no,
    getTagNamespace: noop,
    parsePlatformTagName: identity,
    mustUseProp: no,
    async: true,
    _lifecycleHooks: LIFECYCLE_HOOKS
  };
  var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
  function isReserved(str) {
    var c = (str + "").charCodeAt(0);
    return c === 36 || c === 95;
  }
  function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
      value: val,
      enumerable: !!enumerable,
      writable: true,
      configurable: true
    });
  }
  var bailRE = new RegExp("[^".concat(unicodeRegExp.source, ".$_\\d]"));
  function parsePath(path) {
    if (bailRE.test(path)) {
      return;
    }
    var segments = path.split(".");
    return function(obj) {
      for (var i = 0; i < segments.length; i++) {
        if (!obj)
          return;
        obj = obj[segments[i]];
      }
      return obj;
    };
  }
  var hasProto = "__proto__" in {};
  var inBrowser = typeof window !== "undefined";
  var UA = inBrowser && window.navigator.userAgent.toLowerCase();
  var isIE = UA && /msie|trident/.test(UA);
  var isIE9 = UA && UA.indexOf("msie 9.0") > 0;
  var isEdge = UA && UA.indexOf("edge/") > 0;
  UA && UA.indexOf("android") > 0;
  var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
  UA && /chrome\/\d+/.test(UA) && !isEdge;
  UA && /phantomjs/.test(UA);
  var isFF = UA && UA.match(/firefox\/(\d+)/);
  var nativeWatch = {}.watch;
  var supportsPassive = false;
  if (inBrowser) {
    try {
      opts = {};
      Object.defineProperty(opts, "passive", {
        get: function() {
          supportsPassive = true;
        }
      });
      window.addEventListener("test-passive", null, opts);
    } catch (e) {
    }
  }
  var opts;
  var _isServer;
  var isServerRendering = function() {
    if (_isServer === void 0) {
      if (!inBrowser && typeof global !== "undefined") {
        _isServer = global["process"] && global["process"].env.VUE_ENV === "server";
      } else {
        _isServer = false;
      }
    }
    return _isServer;
  };
  var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
  function isNative(Ctor) {
    return typeof Ctor === "function" && /native code/.test(Ctor.toString());
  }
  var hasSymbol = typeof Symbol !== "undefined" && isNative(Symbol) && typeof Reflect !== "undefined" && isNative(Reflect.ownKeys);
  var _Set;
  if (typeof Set !== "undefined" && isNative(Set)) {
    _Set = Set;
  } else {
    _Set = function() {
      function Set2() {
        this.set = /* @__PURE__ */ Object.create(null);
      }
      Set2.prototype.has = function(key) {
        return this.set[key] === true;
      };
      Set2.prototype.add = function(key) {
        this.set[key] = true;
      };
      Set2.prototype.clear = function() {
        this.set = /* @__PURE__ */ Object.create(null);
      };
      return Set2;
    }();
  }
  var currentInstance = null;
  function setCurrentInstance(vm) {
    if (vm === void 0) {
      vm = null;
    }
    if (!vm)
      currentInstance && currentInstance._scope.off();
    currentInstance = vm;
    vm && vm._scope.on();
  }
  var VNode = function() {
    function VNode2(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
      this.tag = tag;
      this.data = data;
      this.children = children;
      this.text = text;
      this.elm = elm;
      this.ns = void 0;
      this.context = context;
      this.fnContext = void 0;
      this.fnOptions = void 0;
      this.fnScopeId = void 0;
      this.key = data && data.key;
      this.componentOptions = componentOptions;
      this.componentInstance = void 0;
      this.parent = void 0;
      this.raw = false;
      this.isStatic = false;
      this.isRootInsert = true;
      this.isComment = false;
      this.isCloned = false;
      this.isOnce = false;
      this.asyncFactory = asyncFactory;
      this.asyncMeta = void 0;
      this.isAsyncPlaceholder = false;
    }
    Object.defineProperty(VNode2.prototype, "child", {
      get: function() {
        return this.componentInstance;
      },
      enumerable: false,
      configurable: true
    });
    return VNode2;
  }();
  var createEmptyVNode = function(text) {
    if (text === void 0) {
      text = "";
    }
    var node = new VNode();
    node.text = text;
    node.isComment = true;
    return node;
  };
  function createTextVNode(val) {
    return new VNode(void 0, void 0, void 0, String(val));
  }
  function cloneVNode(vnode) {
    var cloned = new VNode(
      vnode.tag,
      vnode.data,
      vnode.children && vnode.children.slice(),
      vnode.text,
      vnode.elm,
      vnode.context,
      vnode.componentOptions,
      vnode.asyncFactory
    );
    cloned.ns = vnode.ns;
    cloned.isStatic = vnode.isStatic;
    cloned.key = vnode.key;
    cloned.isComment = vnode.isComment;
    cloned.fnContext = vnode.fnContext;
    cloned.fnOptions = vnode.fnOptions;
    cloned.fnScopeId = vnode.fnScopeId;
    cloned.asyncMeta = vnode.asyncMeta;
    cloned.isCloned = true;
    return cloned;
  }
  var __assign = function() {
    __assign = Object.assign || function __assign2(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  var uid$2 = 0;
  var pendingCleanupDeps = [];
  var cleanupDeps = function() {
    for (var i = 0; i < pendingCleanupDeps.length; i++) {
      var dep = pendingCleanupDeps[i];
      dep.subs = dep.subs.filter(function(s) {
        return s;
      });
      dep._pending = false;
    }
    pendingCleanupDeps.length = 0;
  };
  var Dep = function() {
    function Dep2() {
      this._pending = false;
      this.id = uid$2++;
      this.subs = [];
    }
    Dep2.prototype.addSub = function(sub) {
      this.subs.push(sub);
    };
    Dep2.prototype.removeSub = function(sub) {
      this.subs[this.subs.indexOf(sub)] = null;
      if (!this._pending) {
        this._pending = true;
        pendingCleanupDeps.push(this);
      }
    };
    Dep2.prototype.depend = function(info) {
      if (Dep2.target) {
        Dep2.target.addDep(this);
        if (info && Dep2.target.onTrack) {
          Dep2.target.onTrack(__assign({ effect: Dep2.target }, info));
        }
      }
    };
    Dep2.prototype.notify = function(info) {
      var subs = this.subs.filter(function(s) {
        return s;
      });
      if (!config.async) {
        subs.sort(function(a, b) {
          return a.id - b.id;
        });
      }
      for (var i = 0, l = subs.length; i < l; i++) {
        var sub = subs[i];
        if (info) {
          sub.onTrigger && sub.onTrigger(__assign({ effect: subs[i] }, info));
        }
        sub.update();
      }
    };
    return Dep2;
  }();
  Dep.target = null;
  var targetStack = [];
  function pushTarget(target2) {
    targetStack.push(target2);
    Dep.target = target2;
  }
  function popTarget() {
    targetStack.pop();
    Dep.target = targetStack[targetStack.length - 1];
  }
  var arrayProto = Array.prototype;
  var arrayMethods = Object.create(arrayProto);
  var methodsToPatch = [
    "push",
    "pop",
    "shift",
    "unshift",
    "splice",
    "sort",
    "reverse"
  ];
  methodsToPatch.forEach(function(method) {
    var original = arrayProto[method];
    def(arrayMethods, method, function mutator() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var result = original.apply(this, args);
      var ob = this.__ob__;
      var inserted;
      switch (method) {
        case "push":
        case "unshift":
          inserted = args;
          break;
        case "splice":
          inserted = args.slice(2);
          break;
      }
      if (inserted)
        ob.observeArray(inserted);
      if (true) {
        ob.dep.notify({
          type: "array mutation",
          target: this,
          key: method
        });
      } else {
        ob.dep.notify();
      }
      return result;
    });
  });
  var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
  var NO_INIITIAL_VALUE = {};
  var shouldObserve = true;
  function toggleObserving(value) {
    shouldObserve = value;
  }
  var mockDep = {
    notify: noop,
    depend: noop,
    addSub: noop,
    removeSub: noop
  };
  var Observer = function() {
    function Observer2(value, shallow, mock) {
      if (shallow === void 0) {
        shallow = false;
      }
      if (mock === void 0) {
        mock = false;
      }
      this.value = value;
      this.shallow = shallow;
      this.mock = mock;
      this.dep = mock ? mockDep : new Dep();
      this.vmCount = 0;
      def(value, "__ob__", this);
      if (isArray(value)) {
        if (!mock) {
          if (hasProto) {
            value.__proto__ = arrayMethods;
          } else {
            for (var i = 0, l = arrayKeys.length; i < l; i++) {
              var key = arrayKeys[i];
              def(value, key, arrayMethods[key]);
            }
          }
        }
        if (!shallow) {
          this.observeArray(value);
        }
      } else {
        var keys2 = Object.keys(value);
        for (var i = 0; i < keys2.length; i++) {
          var key = keys2[i];
          defineReactive(value, key, NO_INIITIAL_VALUE, void 0, shallow, mock);
        }
      }
    }
    Observer2.prototype.observeArray = function(value) {
      for (var i = 0, l = value.length; i < l; i++) {
        observe(value[i], false, this.mock);
      }
    };
    return Observer2;
  }();
  function observe(value, shallow, ssrMockReactivity) {
    if (value && hasOwn(value, "__ob__") && value.__ob__ instanceof Observer) {
      return value.__ob__;
    }
    if (shouldObserve && (ssrMockReactivity || !isServerRendering()) && (isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value.__v_skip && !isRef(value) && !(value instanceof VNode)) {
      return new Observer(value, shallow, ssrMockReactivity);
    }
  }
  function defineReactive(obj, key, val, customSetter, shallow, mock) {
    var dep = new Dep();
    var property = Object.getOwnPropertyDescriptor(obj, key);
    if (property && property.configurable === false) {
      return;
    }
    var getter = property && property.get;
    var setter = property && property.set;
    if ((!getter || setter) && (val === NO_INIITIAL_VALUE || arguments.length === 2)) {
      val = obj[key];
    }
    var childOb = !shallow && observe(val, false, mock);
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function reactiveGetter() {
        var value = getter ? getter.call(obj) : val;
        if (Dep.target) {
          if (true) {
            dep.depend({
              target: obj,
              type: "get",
              key
            });
          } else {
            dep.depend();
          }
          if (childOb) {
            childOb.dep.depend();
            if (isArray(value)) {
              dependArray(value);
            }
          }
        }
        return isRef(value) && !shallow ? value.value : value;
      },
      set: function reactiveSetter(newVal) {
        var value = getter ? getter.call(obj) : val;
        if (!hasChanged(value, newVal)) {
          return;
        }
        if (customSetter) {
          customSetter();
        }
        if (setter) {
          setter.call(obj, newVal);
        } else if (getter) {
          return;
        } else if (!shallow && isRef(value) && !isRef(newVal)) {
          value.value = newVal;
          return;
        } else {
          val = newVal;
        }
        childOb = !shallow && observe(newVal, false, mock);
        if (true) {
          dep.notify({
            type: "set",
            target: obj,
            key,
            newValue: newVal,
            oldValue: value
          });
        } else {
          dep.notify();
        }
      }
    });
    return dep;
  }
  function set(target2, key, val) {
    if (isUndef(target2) || isPrimitive(target2)) {
      warn("Cannot set reactive property on undefined, null, or primitive value: ".concat(target2));
    }
    if (isReadonly(target2)) {
      warn('Set operation on key "'.concat(key, '" failed: target is readonly.'));
      return;
    }
    var ob = target2.__ob__;
    if (isArray(target2) && isValidArrayIndex(key)) {
      target2.length = Math.max(target2.length, key);
      target2.splice(key, 1, val);
      if (ob && !ob.shallow && ob.mock) {
        observe(val, false, true);
      }
      return val;
    }
    if (key in target2 && !(key in Object.prototype)) {
      target2[key] = val;
      return val;
    }
    if (target2._isVue || ob && ob.vmCount) {
      warn("Avoid adding reactive properties to a Vue instance or its root $data at runtime - declare it upfront in the data option.");
      return val;
    }
    if (!ob) {
      target2[key] = val;
      return val;
    }
    defineReactive(ob.value, key, val, void 0, ob.shallow, ob.mock);
    if (true) {
      ob.dep.notify({
        type: "add",
        target: target2,
        key,
        newValue: val,
        oldValue: void 0
      });
    } else {
      ob.dep.notify();
    }
    return val;
  }
  function del(target2, key) {
    if (isUndef(target2) || isPrimitive(target2)) {
      warn("Cannot delete reactive property on undefined, null, or primitive value: ".concat(target2));
    }
    if (isArray(target2) && isValidArrayIndex(key)) {
      target2.splice(key, 1);
      return;
    }
    var ob = target2.__ob__;
    if (target2._isVue || ob && ob.vmCount) {
      warn("Avoid deleting properties on a Vue instance or its root $data - just set it to null.");
      return;
    }
    if (isReadonly(target2)) {
      warn('Delete operation on key "'.concat(key, '" failed: target is readonly.'));
      return;
    }
    if (!hasOwn(target2, key)) {
      return;
    }
    delete target2[key];
    if (!ob) {
      return;
    }
    if (true) {
      ob.dep.notify({
        type: "delete",
        target: target2,
        key
      });
    } else {
      ob.dep.notify();
    }
  }
  function dependArray(value) {
    for (var e = void 0, i = 0, l = value.length; i < l; i++) {
      e = value[i];
      if (e && e.__ob__) {
        e.__ob__.dep.depend();
      }
      if (isArray(e)) {
        dependArray(e);
      }
    }
  }
  function shallowReactive(target2) {
    makeReactive(target2, true);
    def(target2, "__v_isShallow", true);
    return target2;
  }
  function makeReactive(target2, shallow) {
    if (!isReadonly(target2)) {
      if (true) {
        if (isArray(target2)) {
          warn("Avoid using Array as root value for ".concat(shallow ? "shallowReactive()" : "reactive()", " as it cannot be tracked in watch() or watchEffect(). Use ").concat(shallow ? "shallowRef()" : "ref()", " instead. This is a Vue-2-only limitation."));
        }
        var existingOb = target2 && target2.__ob__;
        if (existingOb && existingOb.shallow !== shallow) {
          warn("Target is already a ".concat(existingOb.shallow ? "" : "non-", "shallow reactive object, and cannot be converted to ").concat(shallow ? "" : "non-", "shallow."));
        }
      }
      var ob = observe(target2, shallow, isServerRendering());
      if (!ob) {
        if (target2 == null || isPrimitive(target2)) {
          warn("value cannot be made reactive: ".concat(String(target2)));
        }
        if (isCollectionType(target2)) {
          warn("Vue 2 does not support reactive collection types such as Map or Set.");
        }
      }
    }
  }
  function isReadonly(value) {
    return !!(value && value.__v_isReadonly);
  }
  function isCollectionType(value) {
    var type2 = toRawType(value);
    return type2 === "Map" || type2 === "WeakMap" || type2 === "Set" || type2 === "WeakSet";
  }
  function isRef(r) {
    return !!(r && r.__v_isRef === true);
  }
  function proxyWithRefUnwrap(target2, source, key) {
    Object.defineProperty(target2, key, {
      enumerable: true,
      configurable: true,
      get: function() {
        var val = source[key];
        if (isRef(val)) {
          return val.value;
        } else {
          var ob = val && val.__ob__;
          if (ob)
            ob.dep.depend();
          return val;
        }
      },
      set: function(value) {
        var oldValue = source[key];
        if (isRef(oldValue) && !isRef(value)) {
          oldValue.value = value;
        } else {
          source[key] = value;
        }
      }
    });
  }
  var WATCHER = "watcher";
  var WATCHER_CB = "".concat(WATCHER, " callback");
  var WATCHER_GETTER = "".concat(WATCHER, " getter");
  var WATCHER_CLEANUP = "".concat(WATCHER, " cleanup");
  var activeEffectScope;
  var EffectScope = function() {
    function EffectScope2(detached) {
      if (detached === void 0) {
        detached = false;
      }
      this.detached = detached;
      this.active = true;
      this.effects = [];
      this.cleanups = [];
      this.parent = activeEffectScope;
      if (!detached && activeEffectScope) {
        this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
      }
    }
    EffectScope2.prototype.run = function(fn) {
      if (this.active) {
        var currentEffectScope = activeEffectScope;
        try {
          activeEffectScope = this;
          return fn();
        } finally {
          activeEffectScope = currentEffectScope;
        }
      } else if (true) {
        warn("cannot run an inactive effect scope.");
      }
    };
    EffectScope2.prototype.on = function() {
      activeEffectScope = this;
    };
    EffectScope2.prototype.off = function() {
      activeEffectScope = this.parent;
    };
    EffectScope2.prototype.stop = function(fromParent) {
      if (this.active) {
        var i = void 0, l = void 0;
        for (i = 0, l = this.effects.length; i < l; i++) {
          this.effects[i].teardown();
        }
        for (i = 0, l = this.cleanups.length; i < l; i++) {
          this.cleanups[i]();
        }
        if (this.scopes) {
          for (i = 0, l = this.scopes.length; i < l; i++) {
            this.scopes[i].stop(true);
          }
        }
        if (!this.detached && this.parent && !fromParent) {
          var last = this.parent.scopes.pop();
          if (last && last !== this) {
            this.parent.scopes[this.index] = last;
            last.index = this.index;
          }
        }
        this.parent = void 0;
        this.active = false;
      }
    };
    return EffectScope2;
  }();
  function recordEffectScope(effect, scope) {
    if (scope === void 0) {
      scope = activeEffectScope;
    }
    if (scope && scope.active) {
      scope.effects.push(effect);
    }
  }
  function resolveProvided(vm) {
    var existing = vm._provided;
    var parentProvides = vm.$parent && vm.$parent._provided;
    if (parentProvides === existing) {
      return vm._provided = Object.create(parentProvides);
    } else {
      return existing;
    }
  }
  var normalizeEvent = cached(function(name) {
    var passive = name.charAt(0) === "&";
    name = passive ? name.slice(1) : name;
    var once3 = name.charAt(0) === "~";
    name = once3 ? name.slice(1) : name;
    var capture = name.charAt(0) === "!";
    name = capture ? name.slice(1) : name;
    return {
      name,
      once: once3,
      capture,
      passive
    };
  });
  function createFnInvoker(fns, vm) {
    function invoker() {
      var fns2 = invoker.fns;
      if (isArray(fns2)) {
        var cloned = fns2.slice();
        for (var i = 0; i < cloned.length; i++) {
          invokeWithErrorHandling(cloned[i], null, arguments, vm, "v-on handler");
        }
      } else {
        return invokeWithErrorHandling(fns2, null, arguments, vm, "v-on handler");
      }
    }
    invoker.fns = fns;
    return invoker;
  }
  function updateListeners(on, oldOn, add2, remove2, createOnceHandler2, vm) {
    var name, cur, old, event;
    for (name in on) {
      cur = on[name];
      old = oldOn[name];
      event = normalizeEvent(name);
      if (isUndef(cur)) {
        warn('Invalid handler for event "'.concat(event.name, '": got ') + String(cur), vm);
      } else if (isUndef(old)) {
        if (isUndef(cur.fns)) {
          cur = on[name] = createFnInvoker(cur, vm);
        }
        if (isTrue(event.once)) {
          cur = on[name] = createOnceHandler2(event.name, cur, event.capture);
        }
        add2(event.name, cur, event.capture, event.passive, event.params);
      } else if (cur !== old) {
        old.fns = cur;
        on[name] = old;
      }
    }
    for (name in oldOn) {
      if (isUndef(on[name])) {
        event = normalizeEvent(name);
        remove2(event.name, oldOn[name], event.capture);
      }
    }
  }
  function mergeVNodeHook(def2, hookKey, hook) {
    if (def2 instanceof VNode) {
      def2 = def2.data.hook || (def2.data.hook = {});
    }
    var invoker;
    var oldHook = def2[hookKey];
    function wrappedHook() {
      hook.apply(this, arguments);
      remove$2(invoker.fns, wrappedHook);
    }
    if (isUndef(oldHook)) {
      invoker = createFnInvoker([wrappedHook]);
    } else {
      if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
        invoker = oldHook;
        invoker.fns.push(wrappedHook);
      } else {
        invoker = createFnInvoker([oldHook, wrappedHook]);
      }
    }
    invoker.merged = true;
    def2[hookKey] = invoker;
  }
  function extractPropsFromVNodeData(data, Ctor, tag) {
    var propOptions = Ctor.options.props;
    if (isUndef(propOptions)) {
      return;
    }
    var res = {};
    var attrs2 = data.attrs, props3 = data.props;
    if (isDef(attrs2) || isDef(props3)) {
      for (var key in propOptions) {
        var altKey = hyphenate(key);
        if (true) {
          var keyInLowerCase = key.toLowerCase();
          if (key !== keyInLowerCase && attrs2 && hasOwn(attrs2, keyInLowerCase)) {
            tip('Prop "'.concat(keyInLowerCase, '" is passed to component ') + "".concat(formatComponentName(
              tag || Ctor
            ), ", but the declared prop name is") + ' "'.concat(key, '". ') + "Note that HTML attributes are case-insensitive and camelCased props need to use their kebab-case equivalents when using in-DOM " + 'templates. You should probably use "'.concat(altKey, '" instead of "').concat(key, '".'));
          }
        }
        checkProp(res, props3, key, altKey, true) || checkProp(res, attrs2, key, altKey, false);
      }
    }
    return res;
  }
  function checkProp(res, hash, key, altKey, preserve) {
    if (isDef(hash)) {
      if (hasOwn(hash, key)) {
        res[key] = hash[key];
        if (!preserve) {
          delete hash[key];
        }
        return true;
      } else if (hasOwn(hash, altKey)) {
        res[key] = hash[altKey];
        if (!preserve) {
          delete hash[altKey];
        }
        return true;
      }
    }
    return false;
  }
  function simpleNormalizeChildren(children) {
    for (var i = 0; i < children.length; i++) {
      if (isArray(children[i])) {
        return Array.prototype.concat.apply([], children);
      }
    }
    return children;
  }
  function normalizeChildren(children) {
    return isPrimitive(children) ? [createTextVNode(children)] : isArray(children) ? normalizeArrayChildren(children) : void 0;
  }
  function isTextNode(node) {
    return isDef(node) && isDef(node.text) && isFalse(node.isComment);
  }
  function normalizeArrayChildren(children, nestedIndex) {
    var res = [];
    var i, c, lastIndex, last;
    for (i = 0; i < children.length; i++) {
      c = children[i];
      if (isUndef(c) || typeof c === "boolean")
        continue;
      lastIndex = res.length - 1;
      last = res[lastIndex];
      if (isArray(c)) {
        if (c.length > 0) {
          c = normalizeArrayChildren(c, "".concat(nestedIndex || "", "_").concat(i));
          if (isTextNode(c[0]) && isTextNode(last)) {
            res[lastIndex] = createTextVNode(last.text + c[0].text);
            c.shift();
          }
          res.push.apply(res, c);
        }
      } else if (isPrimitive(c)) {
        if (isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + c);
        } else if (c !== "") {
          res.push(createTextVNode(c));
        }
      } else {
        if (isTextNode(c) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + c.text);
        } else {
          if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
            c.key = "__vlist".concat(nestedIndex, "_").concat(i, "__");
          }
          res.push(c);
        }
      }
    }
    return res;
  }
  function renderList(val, render3) {
    var ret = null, i, l, keys2, key;
    if (isArray(val) || typeof val === "string") {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = render3(val[i], i);
      }
    } else if (typeof val === "number") {
      ret = new Array(val);
      for (i = 0; i < val; i++) {
        ret[i] = render3(i + 1, i);
      }
    } else if (isObject(val)) {
      if (hasSymbol && val[Symbol.iterator]) {
        ret = [];
        var iterator = val[Symbol.iterator]();
        var result = iterator.next();
        while (!result.done) {
          ret.push(render3(result.value, ret.length));
          result = iterator.next();
        }
      } else {
        keys2 = Object.keys(val);
        ret = new Array(keys2.length);
        for (i = 0, l = keys2.length; i < l; i++) {
          key = keys2[i];
          ret[i] = render3(val[key], key, i);
        }
      }
    }
    if (!isDef(ret)) {
      ret = [];
    }
    ret._isVList = true;
    return ret;
  }
  function renderSlot(name, fallbackRender, props3, bindObject) {
    var scopedSlotFn = this.$scopedSlots[name];
    var nodes;
    if (scopedSlotFn) {
      props3 = props3 || {};
      if (bindObject) {
        if (!isObject(bindObject)) {
          warn("slot v-bind without argument expects an Object", this);
        }
        props3 = extend(extend({}, bindObject), props3);
      }
      nodes = scopedSlotFn(props3) || (isFunction(fallbackRender) ? fallbackRender() : fallbackRender);
    } else {
      nodes = this.$slots[name] || (isFunction(fallbackRender) ? fallbackRender() : fallbackRender);
    }
    var target2 = props3 && props3.slot;
    if (target2) {
      return this.$createElement("template", { slot: target2 }, nodes);
    } else {
      return nodes;
    }
  }
  function resolveFilter(id) {
    return resolveAsset(this.$options, "filters", id, true) || identity;
  }
  function isKeyNotMatch(expect, actual) {
    if (isArray(expect)) {
      return expect.indexOf(actual) === -1;
    } else {
      return expect !== actual;
    }
  }
  function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
    var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
    if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
      return isKeyNotMatch(builtInKeyName, eventKeyName);
    } else if (mappedKeyCode) {
      return isKeyNotMatch(mappedKeyCode, eventKeyCode);
    } else if (eventKeyName) {
      return hyphenate(eventKeyName) !== key;
    }
    return eventKeyCode === void 0;
  }
  function bindObjectProps(data, tag, value, asProp, isSync) {
    if (value) {
      if (!isObject(value)) {
        warn("v-bind without argument expects an Object or Array value", this);
      } else {
        if (isArray(value)) {
          value = toObject(value);
        }
        var hash = void 0;
        var _loop_1 = function(key2) {
          if (key2 === "class" || key2 === "style" || isReservedAttribute(key2)) {
            hash = data;
          } else {
            var type2 = data.attrs && data.attrs.type;
            hash = asProp || config.mustUseProp(tag, type2, key2) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
          }
          var camelizedKey = camelize(key2);
          var hyphenatedKey = hyphenate(key2);
          if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
            hash[key2] = value[key2];
            if (isSync) {
              var on = data.on || (data.on = {});
              on["update:".concat(key2)] = function($event) {
                value[key2] = $event;
              };
            }
          }
        };
        for (var key in value) {
          _loop_1(key);
        }
      }
    }
    return data;
  }
  function renderStatic(index2, isInFor) {
    var cached2 = this._staticTrees || (this._staticTrees = []);
    var tree = cached2[index2];
    if (tree && !isInFor) {
      return tree;
    }
    tree = cached2[index2] = this.$options.staticRenderFns[index2].call(
      this._renderProxy,
      this._c,
      this
    );
    markStatic(tree, "__static__".concat(index2), false);
    return tree;
  }
  function markOnce(tree, index2, key) {
    markStatic(tree, "__once__".concat(index2).concat(key ? "_".concat(key) : ""), true);
    return tree;
  }
  function markStatic(tree, key, isOnce) {
    if (isArray(tree)) {
      for (var i = 0; i < tree.length; i++) {
        if (tree[i] && typeof tree[i] !== "string") {
          markStaticNode(tree[i], "".concat(key, "_").concat(i), isOnce);
        }
      }
    } else {
      markStaticNode(tree, key, isOnce);
    }
  }
  function markStaticNode(node, key, isOnce) {
    node.isStatic = true;
    node.key = key;
    node.isOnce = isOnce;
  }
  function bindObjectListeners(data, value) {
    if (value) {
      if (!isPlainObject(value)) {
        warn("v-on without argument expects an Object value", this);
      } else {
        var on = data.on = data.on ? extend({}, data.on) : {};
        for (var key in value) {
          var existing = on[key];
          var ours = value[key];
          on[key] = existing ? [].concat(existing, ours) : ours;
        }
      }
    }
    return data;
  }
  function resolveScopedSlots(fns, res, hasDynamicKeys, contentHashKey) {
    res = res || { $stable: !hasDynamicKeys };
    for (var i = 0; i < fns.length; i++) {
      var slot = fns[i];
      if (isArray(slot)) {
        resolveScopedSlots(slot, res, hasDynamicKeys);
      } else if (slot) {
        if (slot.proxy) {
          slot.fn.proxy = true;
        }
        res[slot.key] = slot.fn;
      }
    }
    if (contentHashKey) {
      res.$key = contentHashKey;
    }
    return res;
  }
  function bindDynamicKeys(baseObj, values) {
    for (var i = 0; i < values.length; i += 2) {
      var key = values[i];
      if (typeof key === "string" && key) {
        baseObj[values[i]] = values[i + 1];
      } else if (key !== "" && key !== null) {
        warn("Invalid value for dynamic directive argument (expected string or null): ".concat(key), this);
      }
    }
    return baseObj;
  }
  function prependModifier(value, symbol) {
    return typeof value === "string" ? symbol + value : value;
  }
  function installRenderHelpers(target2) {
    target2._o = markOnce;
    target2._n = toNumber;
    target2._s = toString;
    target2._l = renderList;
    target2._t = renderSlot;
    target2._q = looseEqual;
    target2._i = looseIndexOf;
    target2._m = renderStatic;
    target2._f = resolveFilter;
    target2._k = checkKeyCodes;
    target2._b = bindObjectProps;
    target2._v = createTextVNode;
    target2._e = createEmptyVNode;
    target2._u = resolveScopedSlots;
    target2._g = bindObjectListeners;
    target2._d = bindDynamicKeys;
    target2._p = prependModifier;
  }
  function resolveSlots(children, context) {
    if (!children || !children.length) {
      return {};
    }
    var slots = {};
    for (var i = 0, l = children.length; i < l; i++) {
      var child = children[i];
      var data = child.data;
      if (data && data.attrs && data.attrs.slot) {
        delete data.attrs.slot;
      }
      if ((child.context === context || child.fnContext === context) && data && data.slot != null) {
        var name_1 = data.slot;
        var slot = slots[name_1] || (slots[name_1] = []);
        if (child.tag === "template") {
          slot.push.apply(slot, child.children || []);
        } else {
          slot.push(child);
        }
      } else {
        (slots.default || (slots.default = [])).push(child);
      }
    }
    for (var name_2 in slots) {
      if (slots[name_2].every(isWhitespace)) {
        delete slots[name_2];
      }
    }
    return slots;
  }
  function isWhitespace(node) {
    return node.isComment && !node.asyncFactory || node.text === " ";
  }
  function isAsyncPlaceholder(node) {
    return node.isComment && node.asyncFactory;
  }
  function normalizeScopedSlots(ownerVm, scopedSlots, normalSlots, prevScopedSlots) {
    var res;
    var hasNormalSlots = Object.keys(normalSlots).length > 0;
    var isStable = scopedSlots ? !!scopedSlots.$stable : !hasNormalSlots;
    var key = scopedSlots && scopedSlots.$key;
    if (!scopedSlots) {
      res = {};
    } else if (scopedSlots._normalized) {
      return scopedSlots._normalized;
    } else if (isStable && prevScopedSlots && prevScopedSlots !== emptyObject && key === prevScopedSlots.$key && !hasNormalSlots && !prevScopedSlots.$hasNormal) {
      return prevScopedSlots;
    } else {
      res = {};
      for (var key_1 in scopedSlots) {
        if (scopedSlots[key_1] && key_1[0] !== "$") {
          res[key_1] = normalizeScopedSlot(ownerVm, normalSlots, key_1, scopedSlots[key_1]);
        }
      }
    }
    for (var key_2 in normalSlots) {
      if (!(key_2 in res)) {
        res[key_2] = proxyNormalSlot(normalSlots, key_2);
      }
    }
    if (scopedSlots && Object.isExtensible(scopedSlots)) {
      scopedSlots._normalized = res;
    }
    def(res, "$stable", isStable);
    def(res, "$key", key);
    def(res, "$hasNormal", hasNormalSlots);
    return res;
  }
  function normalizeScopedSlot(vm, normalSlots, key, fn) {
    var normalized = function() {
      var cur = currentInstance;
      setCurrentInstance(vm);
      var res = arguments.length ? fn.apply(null, arguments) : fn({});
      res = res && typeof res === "object" && !isArray(res) ? [res] : normalizeChildren(res);
      var vnode = res && res[0];
      setCurrentInstance(cur);
      return res && (!vnode || res.length === 1 && vnode.isComment && !isAsyncPlaceholder(vnode)) ? void 0 : res;
    };
    if (fn.proxy) {
      Object.defineProperty(normalSlots, key, {
        get: normalized,
        enumerable: true,
        configurable: true
      });
    }
    return normalized;
  }
  function proxyNormalSlot(slots, key) {
    return function() {
      return slots[key];
    };
  }
  function initSetup(vm) {
    var options = vm.$options;
    var setup = options.setup;
    if (setup) {
      var ctx = vm._setupContext = createSetupContext(vm);
      setCurrentInstance(vm);
      pushTarget();
      var setupResult = invokeWithErrorHandling(setup, null, [vm._props || shallowReactive({}), ctx], vm, "setup");
      popTarget();
      setCurrentInstance();
      if (isFunction(setupResult)) {
        options.render = setupResult;
      } else if (isObject(setupResult)) {
        if (setupResult instanceof VNode) {
          warn("setup() should not return VNodes directly - return a render function instead.");
        }
        vm._setupState = setupResult;
        if (!setupResult.__sfc) {
          for (var key in setupResult) {
            if (!isReserved(key)) {
              proxyWithRefUnwrap(vm, setupResult, key);
            } else if (true) {
              warn("Avoid using variables that start with _ or $ in setup().");
            }
          }
        } else {
          var proxy2 = vm._setupProxy = {};
          for (var key in setupResult) {
            if (key !== "__sfc") {
              proxyWithRefUnwrap(proxy2, setupResult, key);
            }
          }
        }
      } else if (setupResult !== void 0) {
        warn("setup() should return an object. Received: ".concat(setupResult === null ? "null" : typeof setupResult));
      }
    }
  }
  function createSetupContext(vm) {
    var exposeCalled = false;
    return {
      get attrs() {
        if (!vm._attrsProxy) {
          var proxy2 = vm._attrsProxy = {};
          def(proxy2, "_v_attr_proxy", true);
          syncSetupProxy(proxy2, vm.$attrs, emptyObject, vm, "$attrs");
        }
        return vm._attrsProxy;
      },
      get listeners() {
        if (!vm._listenersProxy) {
          var proxy2 = vm._listenersProxy = {};
          syncSetupProxy(proxy2, vm.$listeners, emptyObject, vm, "$listeners");
        }
        return vm._listenersProxy;
      },
      get slots() {
        return initSlotsProxy(vm);
      },
      emit: bind(vm.$emit, vm),
      expose: function(exposed) {
        if (true) {
          if (exposeCalled) {
            warn("expose() should be called only once per setup().", vm);
          }
          exposeCalled = true;
        }
        if (exposed) {
          Object.keys(exposed).forEach(function(key) {
            return proxyWithRefUnwrap(vm, exposed, key);
          });
        }
      }
    };
  }
  function syncSetupProxy(to, from, prev, instance, type2) {
    var changed = false;
    for (var key in from) {
      if (!(key in to)) {
        changed = true;
        defineProxyAttr(to, key, instance, type2);
      } else if (from[key] !== prev[key]) {
        changed = true;
      }
    }
    for (var key in to) {
      if (!(key in from)) {
        changed = true;
        delete to[key];
      }
    }
    return changed;
  }
  function defineProxyAttr(proxy2, key, instance, type2) {
    Object.defineProperty(proxy2, key, {
      enumerable: true,
      configurable: true,
      get: function() {
        return instance[type2][key];
      }
    });
  }
  function initSlotsProxy(vm) {
    if (!vm._slotsProxy) {
      syncSetupSlots(vm._slotsProxy = {}, vm.$scopedSlots);
    }
    return vm._slotsProxy;
  }
  function syncSetupSlots(to, from) {
    for (var key in from) {
      to[key] = from[key];
    }
    for (var key in to) {
      if (!(key in from)) {
        delete to[key];
      }
    }
  }
  function initRender(vm) {
    vm._vnode = null;
    vm._staticTrees = null;
    var options = vm.$options;
    var parentVnode = vm.$vnode = options._parentVnode;
    var renderContext = parentVnode && parentVnode.context;
    vm.$slots = resolveSlots(options._renderChildren, renderContext);
    vm.$scopedSlots = parentVnode ? normalizeScopedSlots(vm.$parent, parentVnode.data.scopedSlots, vm.$slots) : emptyObject;
    vm._c = function(a, b, c, d) {
      return createElement$1(vm, a, b, c, d, false);
    };
    vm.$createElement = function(a, b, c, d) {
      return createElement$1(vm, a, b, c, d, true);
    };
    var parentData = parentVnode && parentVnode.data;
    if (true) {
      defineReactive(vm, "$attrs", parentData && parentData.attrs || emptyObject, function() {
        !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
      }, true);
      defineReactive(vm, "$listeners", options._parentListeners || emptyObject, function() {
        !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
      }, true);
    } else {
      defineReactive(vm, "$attrs", parentData && parentData.attrs || emptyObject, null, true);
      defineReactive(vm, "$listeners", options._parentListeners || emptyObject, null, true);
    }
  }
  var currentRenderingInstance = null;
  function renderMixin(Vue2) {
    installRenderHelpers(Vue2.prototype);
    Vue2.prototype.$nextTick = function(fn) {
      return nextTick(fn, this);
    };
    Vue2.prototype._render = function() {
      var vm = this;
      var _a = vm.$options, render3 = _a.render, _parentVnode = _a._parentVnode;
      if (_parentVnode && vm._isMounted) {
        vm.$scopedSlots = normalizeScopedSlots(vm.$parent, _parentVnode.data.scopedSlots, vm.$slots, vm.$scopedSlots);
        if (vm._slotsProxy) {
          syncSetupSlots(vm._slotsProxy, vm.$scopedSlots);
        }
      }
      vm.$vnode = _parentVnode;
      var vnode;
      try {
        setCurrentInstance(vm);
        currentRenderingInstance = vm;
        vnode = render3.call(vm._renderProxy, vm.$createElement);
      } catch (e) {
        handleError(e, vm, "render");
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e2) {
            handleError(e2, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      } finally {
        currentRenderingInstance = null;
        setCurrentInstance();
      }
      if (isArray(vnode) && vnode.length === 1) {
        vnode = vnode[0];
      }
      if (!(vnode instanceof VNode)) {
        if (isArray(vnode)) {
          warn("Multiple root nodes returned from render function. Render function should return a single root node.", vm);
        }
        vnode = createEmptyVNode();
      }
      vnode.parent = _parentVnode;
      return vnode;
    };
  }
  function ensureCtor(comp, base) {
    if (comp.__esModule || hasSymbol && comp[Symbol.toStringTag] === "Module") {
      comp = comp.default;
    }
    return isObject(comp) ? base.extend(comp) : comp;
  }
  function createAsyncPlaceholder(factory, data, context, children, tag) {
    var node = createEmptyVNode();
    node.asyncFactory = factory;
    node.asyncMeta = { data, context, children, tag };
    return node;
  }
  function resolveAsyncComponent(factory, baseCtor) {
    if (isTrue(factory.error) && isDef(factory.errorComp)) {
      return factory.errorComp;
    }
    if (isDef(factory.resolved)) {
      return factory.resolved;
    }
    var owner = currentRenderingInstance;
    if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
      factory.owners.push(owner);
    }
    if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
      return factory.loadingComp;
    }
    if (owner && !isDef(factory.owners)) {
      var owners_1 = factory.owners = [owner];
      var sync_1 = true;
      var timerLoading_1 = null;
      var timerTimeout_1 = null;
      owner.$on("hook:destroyed", function() {
        return remove$2(owners_1, owner);
      });
      var forceRender_1 = function(renderCompleted) {
        for (var i = 0, l = owners_1.length; i < l; i++) {
          owners_1[i].$forceUpdate();
        }
        if (renderCompleted) {
          owners_1.length = 0;
          if (timerLoading_1 !== null) {
            clearTimeout(timerLoading_1);
            timerLoading_1 = null;
          }
          if (timerTimeout_1 !== null) {
            clearTimeout(timerTimeout_1);
            timerTimeout_1 = null;
          }
        }
      };
      var resolve2 = once(function(res) {
        factory.resolved = ensureCtor(res, baseCtor);
        if (!sync_1) {
          forceRender_1(true);
        } else {
          owners_1.length = 0;
        }
      });
      var reject_1 = once(function(reason) {
        warn("Failed to resolve async component: ".concat(String(factory)) + (reason ? "\nReason: ".concat(reason) : ""));
        if (isDef(factory.errorComp)) {
          factory.error = true;
          forceRender_1(true);
        }
      });
      var res_1 = factory(resolve2, reject_1);
      if (isObject(res_1)) {
        if (isPromise(res_1)) {
          if (isUndef(factory.resolved)) {
            res_1.then(resolve2, reject_1);
          }
        } else if (isPromise(res_1.component)) {
          res_1.component.then(resolve2, reject_1);
          if (isDef(res_1.error)) {
            factory.errorComp = ensureCtor(res_1.error, baseCtor);
          }
          if (isDef(res_1.loading)) {
            factory.loadingComp = ensureCtor(res_1.loading, baseCtor);
            if (res_1.delay === 0) {
              factory.loading = true;
            } else {
              timerLoading_1 = setTimeout(function() {
                timerLoading_1 = null;
                if (isUndef(factory.resolved) && isUndef(factory.error)) {
                  factory.loading = true;
                  forceRender_1(false);
                }
              }, res_1.delay || 200);
            }
          }
          if (isDef(res_1.timeout)) {
            timerTimeout_1 = setTimeout(function() {
              timerTimeout_1 = null;
              if (isUndef(factory.resolved)) {
                reject_1(true ? "timeout (".concat(res_1.timeout, "ms)") : null);
              }
            }, res_1.timeout);
          }
        }
      }
      sync_1 = false;
      return factory.loading ? factory.loadingComp : factory.resolved;
    }
  }
  function getFirstComponentChild(children) {
    if (isArray(children)) {
      for (var i = 0; i < children.length; i++) {
        var c = children[i];
        if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
          return c;
        }
      }
    }
  }
  var SIMPLE_NORMALIZE = 1;
  var ALWAYS_NORMALIZE = 2;
  function createElement$1(context, tag, data, children, normalizationType, alwaysNormalize) {
    if (isArray(data) || isPrimitive(data)) {
      normalizationType = children;
      children = data;
      data = void 0;
    }
    if (isTrue(alwaysNormalize)) {
      normalizationType = ALWAYS_NORMALIZE;
    }
    return _createElement(context, tag, data, children, normalizationType);
  }
  function _createElement(context, tag, data, children, normalizationType) {
    if (isDef(data) && isDef(data.__ob__)) {
      warn("Avoid using observed data object as vnode data: ".concat(JSON.stringify(data), "\n") + "Always create fresh vnode data objects in each render!", context);
      return createEmptyVNode();
    }
    if (isDef(data) && isDef(data.is)) {
      tag = data.is;
    }
    if (!tag) {
      return createEmptyVNode();
    }
    if (isDef(data) && isDef(data.key) && !isPrimitive(data.key)) {
      warn("Avoid using non-primitive value as key, use string/number value instead.", context);
    }
    if (isArray(children) && isFunction(children[0])) {
      data = data || {};
      data.scopedSlots = { default: children[0] };
      children.length = 0;
    }
    if (normalizationType === ALWAYS_NORMALIZE) {
      children = normalizeChildren(children);
    } else if (normalizationType === SIMPLE_NORMALIZE) {
      children = simpleNormalizeChildren(children);
    }
    var vnode, ns;
    if (typeof tag === "string") {
      var Ctor = void 0;
      ns = context.$vnode && context.$vnode.ns || config.getTagNamespace(tag);
      if (config.isReservedTag(tag)) {
        if (isDef(data) && isDef(data.nativeOn) && data.tag !== "component") {
          warn("The .native modifier for v-on is only valid on components but it was used on <".concat(tag, ">."), context);
        }
        vnode = new VNode(config.parsePlatformTagName(tag), data, children, void 0, void 0, context);
      } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, "components", tag))) {
        vnode = createComponent(Ctor, data, context, children, tag);
      } else {
        vnode = new VNode(tag, data, children, void 0, void 0, context);
      }
    } else {
      vnode = createComponent(tag, data, context, children);
    }
    if (isArray(vnode)) {
      return vnode;
    } else if (isDef(vnode)) {
      if (isDef(ns))
        applyNS(vnode, ns);
      if (isDef(data))
        registerDeepBindings(data);
      return vnode;
    } else {
      return createEmptyVNode();
    }
  }
  function applyNS(vnode, ns, force) {
    vnode.ns = ns;
    if (vnode.tag === "foreignObject") {
      ns = void 0;
      force = true;
    }
    if (isDef(vnode.children)) {
      for (var i = 0, l = vnode.children.length; i < l; i++) {
        var child = vnode.children[i];
        if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force) && child.tag !== "svg")) {
          applyNS(child, ns, force);
        }
      }
    }
  }
  function registerDeepBindings(data) {
    if (isObject(data.style)) {
      traverse(data.style);
    }
    if (isObject(data.class)) {
      traverse(data.class);
    }
  }
  function handleError(err, vm, info) {
    pushTarget();
    try {
      if (vm) {
        var cur = vm;
        while (cur = cur.$parent) {
          var hooks2 = cur.$options.errorCaptured;
          if (hooks2) {
            for (var i = 0; i < hooks2.length; i++) {
              try {
                var capture = hooks2[i].call(cur, err, vm, info) === false;
                if (capture)
                  return;
              } catch (e) {
                globalHandleError(e, cur, "errorCaptured hook");
              }
            }
          }
        }
      }
      globalHandleError(err, vm, info);
    } finally {
      popTarget();
    }
  }
  function invokeWithErrorHandling(handler, context, args, vm, info) {
    var res;
    try {
      res = args ? handler.apply(context, args) : handler.call(context);
      if (res && !res._isVue && isPromise(res) && !res._handled) {
        res.catch(function(e) {
          return handleError(e, vm, info + " (Promise/async)");
        });
        res._handled = true;
      }
    } catch (e) {
      handleError(e, vm, info);
    }
    return res;
  }
  function globalHandleError(err, vm, info) {
    if (config.errorHandler) {
      try {
        return config.errorHandler.call(null, err, vm, info);
      } catch (e) {
        if (e !== err) {
          logError(e, null, "config.errorHandler");
        }
      }
    }
    logError(err, vm, info);
  }
  function logError(err, vm, info) {
    if (true) {
      warn("Error in ".concat(info, ': "').concat(err.toString(), '"'), vm);
    }
    if (inBrowser && typeof console !== "undefined") {
      console.error(err);
    } else {
      throw err;
    }
  }
  var isUsingMicroTask = false;
  var callbacks = [];
  var pending = false;
  function flushCallbacks() {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }
  var timerFunc;
  if (typeof Promise !== "undefined" && isNative(Promise)) {
    p_1 = Promise.resolve();
    timerFunc = function() {
      p_1.then(flushCallbacks);
      if (isIOS)
        setTimeout(noop);
    };
    isUsingMicroTask = true;
  } else if (!isIE && typeof MutationObserver !== "undefined" && (isNative(MutationObserver) || MutationObserver.toString() === "[object MutationObserverConstructor]")) {
    counter_1 = 1;
    observer = new MutationObserver(flushCallbacks);
    textNode_1 = document.createTextNode(String(counter_1));
    observer.observe(textNode_1, {
      characterData: true
    });
    timerFunc = function() {
      counter_1 = (counter_1 + 1) % 2;
      textNode_1.data = String(counter_1);
    };
    isUsingMicroTask = true;
  } else if (typeof setImmediate !== "undefined" && isNative(setImmediate)) {
    timerFunc = function() {
      setImmediate(flushCallbacks);
    };
  } else {
    timerFunc = function() {
      setTimeout(flushCallbacks, 0);
    };
  }
  var p_1;
  var counter_1;
  var observer;
  var textNode_1;
  function nextTick(cb, ctx) {
    var _resolve;
    callbacks.push(function() {
      if (cb) {
        try {
          cb.call(ctx);
        } catch (e) {
          handleError(e, ctx, "nextTick");
        }
      } else if (_resolve) {
        _resolve(ctx);
      }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== "undefined") {
      return new Promise(function(resolve2) {
        _resolve = resolve2;
      });
    }
  }
  function createLifeCycle(hookName) {
    return function(fn, target2) {
      if (target2 === void 0) {
        target2 = currentInstance;
      }
      if (!target2) {
        warn("".concat(formatName(hookName), " is called when there is no active component instance to be ") + "associated with. Lifecycle injection APIs can only be used during execution of setup().");
        return;
      }
      return injectHook(target2, hookName, fn);
    };
  }
  function formatName(name) {
    if (name === "beforeDestroy") {
      name = "beforeUnmount";
    } else if (name === "destroyed") {
      name = "unmounted";
    }
    return "on".concat(name[0].toUpperCase() + name.slice(1));
  }
  function injectHook(instance, hookName, fn) {
    var options = instance.$options;
    options[hookName] = mergeLifecycleHook(options[hookName], fn);
  }
  var onBeforeMount = createLifeCycle("beforeMount");
  var onMounted = createLifeCycle("mounted");
  var onBeforeUpdate = createLifeCycle("beforeUpdate");
  var onUpdated = createLifeCycle("updated");
  var onBeforeUnmount = createLifeCycle("beforeDestroy");
  var onUnmounted = createLifeCycle("destroyed");
  var onActivated = createLifeCycle("activated");
  var onDeactivated = createLifeCycle("deactivated");
  var onServerPrefetch = createLifeCycle("serverPrefetch");
  var onRenderTracked = createLifeCycle("renderTracked");
  var onRenderTriggered = createLifeCycle("renderTriggered");
  var injectErrorCapturedHook = createLifeCycle("errorCaptured");
  var version = "2.7.14";
  var seenObjects = new _Set();
  function traverse(val) {
    _traverse(val, seenObjects);
    seenObjects.clear();
    return val;
  }
  function _traverse(val, seen) {
    var i, keys2;
    var isA = isArray(val);
    if (!isA && !isObject(val) || val.__v_skip || Object.isFrozen(val) || val instanceof VNode) {
      return;
    }
    if (val.__ob__) {
      var depId = val.__ob__.dep.id;
      if (seen.has(depId)) {
        return;
      }
      seen.add(depId);
    }
    if (isA) {
      i = val.length;
      while (i--)
        _traverse(val[i], seen);
    } else if (isRef(val)) {
      _traverse(val.value, seen);
    } else {
      keys2 = Object.keys(val);
      i = keys2.length;
      while (i--)
        _traverse(val[keys2[i]], seen);
    }
  }
  var uid$1 = 0;
  var Watcher = function() {
    function Watcher2(vm, expOrFn, cb, options, isRenderWatcher) {
      recordEffectScope(
        this,
        activeEffectScope && !activeEffectScope._vm ? activeEffectScope : vm ? vm._scope : void 0
      );
      if ((this.vm = vm) && isRenderWatcher) {
        vm._watcher = this;
      }
      if (options) {
        this.deep = !!options.deep;
        this.user = !!options.user;
        this.lazy = !!options.lazy;
        this.sync = !!options.sync;
        this.before = options.before;
        if (true) {
          this.onTrack = options.onTrack;
          this.onTrigger = options.onTrigger;
        }
      } else {
        this.deep = this.user = this.lazy = this.sync = false;
      }
      this.cb = cb;
      this.id = ++uid$1;
      this.active = true;
      this.post = false;
      this.dirty = this.lazy;
      this.deps = [];
      this.newDeps = [];
      this.depIds = new _Set();
      this.newDepIds = new _Set();
      this.expression = true ? expOrFn.toString() : "";
      if (isFunction(expOrFn)) {
        this.getter = expOrFn;
      } else {
        this.getter = parsePath(expOrFn);
        if (!this.getter) {
          this.getter = noop;
          warn('Failed watching path: "'.concat(expOrFn, '" ') + "Watcher only accepts simple dot-delimited paths. For full control, use a function instead.", vm);
        }
      }
      this.value = this.lazy ? void 0 : this.get();
    }
    Watcher2.prototype.get = function() {
      pushTarget(this);
      var value;
      var vm = this.vm;
      try {
        value = this.getter.call(vm, vm);
      } catch (e) {
        if (this.user) {
          handleError(e, vm, 'getter for watcher "'.concat(this.expression, '"'));
        } else {
          throw e;
        }
      } finally {
        if (this.deep) {
          traverse(value);
        }
        popTarget();
        this.cleanupDeps();
      }
      return value;
    };
    Watcher2.prototype.addDep = function(dep) {
      var id = dep.id;
      if (!this.newDepIds.has(id)) {
        this.newDepIds.add(id);
        this.newDeps.push(dep);
        if (!this.depIds.has(id)) {
          dep.addSub(this);
        }
      }
    };
    Watcher2.prototype.cleanupDeps = function() {
      var i = this.deps.length;
      while (i--) {
        var dep = this.deps[i];
        if (!this.newDepIds.has(dep.id)) {
          dep.removeSub(this);
        }
      }
      var tmp = this.depIds;
      this.depIds = this.newDepIds;
      this.newDepIds = tmp;
      this.newDepIds.clear();
      tmp = this.deps;
      this.deps = this.newDeps;
      this.newDeps = tmp;
      this.newDeps.length = 0;
    };
    Watcher2.prototype.update = function() {
      if (this.lazy) {
        this.dirty = true;
      } else if (this.sync) {
        this.run();
      } else {
        queueWatcher(this);
      }
    };
    Watcher2.prototype.run = function() {
      if (this.active) {
        var value = this.get();
        if (value !== this.value || isObject(value) || this.deep) {
          var oldValue = this.value;
          this.value = value;
          if (this.user) {
            var info = 'callback for watcher "'.concat(this.expression, '"');
            invokeWithErrorHandling(this.cb, this.vm, [value, oldValue], this.vm, info);
          } else {
            this.cb.call(this.vm, value, oldValue);
          }
        }
      }
    };
    Watcher2.prototype.evaluate = function() {
      this.value = this.get();
      this.dirty = false;
    };
    Watcher2.prototype.depend = function() {
      var i = this.deps.length;
      while (i--) {
        this.deps[i].depend();
      }
    };
    Watcher2.prototype.teardown = function() {
      if (this.vm && !this.vm._isBeingDestroyed) {
        remove$2(this.vm._scope.effects, this);
      }
      if (this.active) {
        var i = this.deps.length;
        while (i--) {
          this.deps[i].removeSub(this);
        }
        this.active = false;
        if (this.onStop) {
          this.onStop();
        }
      }
    };
    return Watcher2;
  }();
  var mark;
  var measure;
  if (true) {
    perf_1 = inBrowser && window.performance;
    if (perf_1 && perf_1.mark && perf_1.measure && perf_1.clearMarks && perf_1.clearMeasures) {
      mark = function(tag) {
        return perf_1.mark(tag);
      };
      measure = function(name, startTag, endTag) {
        perf_1.measure(name, startTag, endTag);
        perf_1.clearMarks(startTag);
        perf_1.clearMarks(endTag);
      };
    }
  }
  var perf_1;
  function initEvents(vm) {
    vm._events = /* @__PURE__ */ Object.create(null);
    vm._hasHookEvent = false;
    var listeners = vm.$options._parentListeners;
    if (listeners) {
      updateComponentListeners(vm, listeners);
    }
  }
  var target$1;
  function add$1(event, fn) {
    target$1.$on(event, fn);
  }
  function remove$1(event, fn) {
    target$1.$off(event, fn);
  }
  function createOnceHandler$1(event, fn) {
    var _target = target$1;
    return function onceHandler() {
      var res = fn.apply(null, arguments);
      if (res !== null) {
        _target.$off(event, onceHandler);
      }
    };
  }
  function updateComponentListeners(vm, listeners, oldListeners) {
    target$1 = vm;
    updateListeners(listeners, oldListeners || {}, add$1, remove$1, createOnceHandler$1, vm);
    target$1 = void 0;
  }
  function eventsMixin(Vue2) {
    var hookRE = /^hook:/;
    Vue2.prototype.$on = function(event, fn) {
      var vm = this;
      if (isArray(event)) {
        for (var i = 0, l = event.length; i < l; i++) {
          vm.$on(event[i], fn);
        }
      } else {
        (vm._events[event] || (vm._events[event] = [])).push(fn);
        if (hookRE.test(event)) {
          vm._hasHookEvent = true;
        }
      }
      return vm;
    };
    Vue2.prototype.$once = function(event, fn) {
      var vm = this;
      function on() {
        vm.$off(event, on);
        fn.apply(vm, arguments);
      }
      on.fn = fn;
      vm.$on(event, on);
      return vm;
    };
    Vue2.prototype.$off = function(event, fn) {
      var vm = this;
      if (!arguments.length) {
        vm._events = /* @__PURE__ */ Object.create(null);
        return vm;
      }
      if (isArray(event)) {
        for (var i_1 = 0, l = event.length; i_1 < l; i_1++) {
          vm.$off(event[i_1], fn);
        }
        return vm;
      }
      var cbs = vm._events[event];
      if (!cbs) {
        return vm;
      }
      if (!fn) {
        vm._events[event] = null;
        return vm;
      }
      var cb;
      var i = cbs.length;
      while (i--) {
        cb = cbs[i];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i, 1);
          break;
        }
      }
      return vm;
    };
    Vue2.prototype.$emit = function(event) {
      var vm = this;
      if (true) {
        var lowerCaseEvent = event.toLowerCase();
        if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
          tip('Event "'.concat(lowerCaseEvent, '" is emitted in component ') + "".concat(formatComponentName(vm), ' but the handler is registered for "').concat(event, '". ') + "Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. " + 'You should probably use "'.concat(hyphenate(event), '" instead of "').concat(event, '".'));
        }
      }
      var cbs = vm._events[event];
      if (cbs) {
        cbs = cbs.length > 1 ? toArray(cbs) : cbs;
        var args = toArray(arguments, 1);
        var info = 'event handler for "'.concat(event, '"');
        for (var i = 0, l = cbs.length; i < l; i++) {
          invokeWithErrorHandling(cbs[i], vm, args, vm, info);
        }
      }
      return vm;
    };
  }
  var activeInstance = null;
  var isUpdatingChildComponent = false;
  function setActiveInstance(vm) {
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    return function() {
      activeInstance = prevActiveInstance;
    };
  }
  function initLifecycle(vm) {
    var options = vm.$options;
    var parent = options.parent;
    if (parent && !options.abstract) {
      while (parent.$options.abstract && parent.$parent) {
        parent = parent.$parent;
      }
      parent.$children.push(vm);
    }
    vm.$parent = parent;
    vm.$root = parent ? parent.$root : vm;
    vm.$children = [];
    vm.$refs = {};
    vm._provided = parent ? parent._provided : /* @__PURE__ */ Object.create(null);
    vm._watcher = null;
    vm._inactive = null;
    vm._directInactive = false;
    vm._isMounted = false;
    vm._isDestroyed = false;
    vm._isBeingDestroyed = false;
  }
  function lifecycleMixin(Vue2) {
    Vue2.prototype._update = function(vnode, hydrating) {
      var vm = this;
      var prevEl = vm.$el;
      var prevVnode = vm._vnode;
      var restoreActiveInstance = setActiveInstance(vm);
      vm._vnode = vnode;
      if (!prevVnode) {
        vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false);
      } else {
        vm.$el = vm.__patch__(prevVnode, vnode);
      }
      restoreActiveInstance();
      if (prevEl) {
        prevEl.__vue__ = null;
      }
      if (vm.$el) {
        vm.$el.__vue__ = vm;
      }
      var wrapper = vm;
      while (wrapper && wrapper.$vnode && wrapper.$parent && wrapper.$vnode === wrapper.$parent._vnode) {
        wrapper.$parent.$el = wrapper.$el;
        wrapper = wrapper.$parent;
      }
    };
    Vue2.prototype.$forceUpdate = function() {
      var vm = this;
      if (vm._watcher) {
        vm._watcher.update();
      }
    };
    Vue2.prototype.$destroy = function() {
      var vm = this;
      if (vm._isBeingDestroyed) {
        return;
      }
      callHook$1(vm, "beforeDestroy");
      vm._isBeingDestroyed = true;
      var parent = vm.$parent;
      if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
        remove$2(parent.$children, vm);
      }
      vm._scope.stop();
      if (vm._data.__ob__) {
        vm._data.__ob__.vmCount--;
      }
      vm._isDestroyed = true;
      vm.__patch__(vm._vnode, null);
      callHook$1(vm, "destroyed");
      vm.$off();
      if (vm.$el) {
        vm.$el.__vue__ = null;
      }
      if (vm.$vnode) {
        vm.$vnode.parent = null;
      }
    };
  }
  function mountComponent(vm, el, hydrating) {
    vm.$el = el;
    if (!vm.$options.render) {
      vm.$options.render = createEmptyVNode;
      if (true) {
        if (vm.$options.template && vm.$options.template.charAt(0) !== "#" || vm.$options.el || el) {
          warn("You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.", vm);
        } else {
          warn("Failed to mount component: template or render function not defined.", vm);
        }
      }
    }
    callHook$1(vm, "beforeMount");
    var updateComponent;
    if (config.performance && mark) {
      updateComponent = function() {
        var name = vm._name;
        var id = vm._uid;
        var startTag = "vue-perf-start:".concat(id);
        var endTag = "vue-perf-end:".concat(id);
        mark(startTag);
        var vnode = vm._render();
        mark(endTag);
        measure("vue ".concat(name, " render"), startTag, endTag);
        mark(startTag);
        vm._update(vnode, hydrating);
        mark(endTag);
        measure("vue ".concat(name, " patch"), startTag, endTag);
      };
    } else {
      updateComponent = function() {
        vm._update(vm._render(), hydrating);
      };
    }
    var watcherOptions = {
      before: function() {
        if (vm._isMounted && !vm._isDestroyed) {
          callHook$1(vm, "beforeUpdate");
        }
      }
    };
    if (true) {
      watcherOptions.onTrack = function(e) {
        return callHook$1(vm, "renderTracked", [e]);
      };
      watcherOptions.onTrigger = function(e) {
        return callHook$1(vm, "renderTriggered", [e]);
      };
    }
    new Watcher(vm, updateComponent, noop, watcherOptions, true);
    hydrating = false;
    var preWatchers = vm._preWatchers;
    if (preWatchers) {
      for (var i = 0; i < preWatchers.length; i++) {
        preWatchers[i].run();
      }
    }
    if (vm.$vnode == null) {
      vm._isMounted = true;
      callHook$1(vm, "mounted");
    }
    return vm;
  }
  function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
    if (true) {
      isUpdatingChildComponent = true;
    }
    var newScopedSlots = parentVnode.data.scopedSlots;
    var oldScopedSlots = vm.$scopedSlots;
    var hasDynamicScopedSlot = !!(newScopedSlots && !newScopedSlots.$stable || oldScopedSlots !== emptyObject && !oldScopedSlots.$stable || newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key || !newScopedSlots && vm.$scopedSlots.$key);
    var needsForceUpdate = !!(renderChildren || vm.$options._renderChildren || hasDynamicScopedSlot);
    var prevVNode = vm.$vnode;
    vm.$options._parentVnode = parentVnode;
    vm.$vnode = parentVnode;
    if (vm._vnode) {
      vm._vnode.parent = parentVnode;
    }
    vm.$options._renderChildren = renderChildren;
    var attrs2 = parentVnode.data.attrs || emptyObject;
    if (vm._attrsProxy) {
      if (syncSetupProxy(vm._attrsProxy, attrs2, prevVNode.data && prevVNode.data.attrs || emptyObject, vm, "$attrs")) {
        needsForceUpdate = true;
      }
    }
    vm.$attrs = attrs2;
    listeners = listeners || emptyObject;
    var prevListeners = vm.$options._parentListeners;
    if (vm._listenersProxy) {
      syncSetupProxy(vm._listenersProxy, listeners, prevListeners || emptyObject, vm, "$listeners");
    }
    vm.$listeners = vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, prevListeners);
    if (propsData && vm.$options.props) {
      toggleObserving(false);
      var props3 = vm._props;
      var propKeys = vm.$options._propKeys || [];
      for (var i = 0; i < propKeys.length; i++) {
        var key = propKeys[i];
        var propOptions = vm.$options.props;
        props3[key] = validateProp(key, propOptions, propsData, vm);
      }
      toggleObserving(true);
      vm.$options.propsData = propsData;
    }
    if (needsForceUpdate) {
      vm.$slots = resolveSlots(renderChildren, parentVnode.context);
      vm.$forceUpdate();
    }
    if (true) {
      isUpdatingChildComponent = false;
    }
  }
  function isInInactiveTree(vm) {
    while (vm && (vm = vm.$parent)) {
      if (vm._inactive)
        return true;
    }
    return false;
  }
  function activateChildComponent(vm, direct) {
    if (direct) {
      vm._directInactive = false;
      if (isInInactiveTree(vm)) {
        return;
      }
    } else if (vm._directInactive) {
      return;
    }
    if (vm._inactive || vm._inactive === null) {
      vm._inactive = false;
      for (var i = 0; i < vm.$children.length; i++) {
        activateChildComponent(vm.$children[i]);
      }
      callHook$1(vm, "activated");
    }
  }
  function deactivateChildComponent(vm, direct) {
    if (direct) {
      vm._directInactive = true;
      if (isInInactiveTree(vm)) {
        return;
      }
    }
    if (!vm._inactive) {
      vm._inactive = true;
      for (var i = 0; i < vm.$children.length; i++) {
        deactivateChildComponent(vm.$children[i]);
      }
      callHook$1(vm, "deactivated");
    }
  }
  function callHook$1(vm, hook, args, setContext) {
    if (setContext === void 0) {
      setContext = true;
    }
    pushTarget();
    var prev = currentInstance;
    setContext && setCurrentInstance(vm);
    var handlers = vm.$options[hook];
    var info = "".concat(hook, " hook");
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        invokeWithErrorHandling(handlers[i], vm, args || null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit("hook:" + hook);
    }
    setContext && setCurrentInstance(prev);
    popTarget();
  }
  var MAX_UPDATE_COUNT = 100;
  var queue = [];
  var activatedChildren = [];
  var has = {};
  var circular = {};
  var waiting = false;
  var flushing = false;
  var index = 0;
  function resetSchedulerState() {
    index = queue.length = activatedChildren.length = 0;
    has = {};
    if (true) {
      circular = {};
    }
    waiting = flushing = false;
  }
  var currentFlushTimestamp = 0;
  var getNow = Date.now;
  if (inBrowser && !isIE) {
    performance_1 = window.performance;
    if (performance_1 && typeof performance_1.now === "function" && getNow() > document.createEvent("Event").timeStamp) {
      getNow = function() {
        return performance_1.now();
      };
    }
  }
  var performance_1;
  var sortCompareFn = function(a, b) {
    if (a.post) {
      if (!b.post)
        return 1;
    } else if (b.post) {
      return -1;
    }
    return a.id - b.id;
  };
  function flushSchedulerQueue() {
    currentFlushTimestamp = getNow();
    flushing = true;
    var watcher, id;
    queue.sort(sortCompareFn);
    for (index = 0; index < queue.length; index++) {
      watcher = queue[index];
      if (watcher.before) {
        watcher.before();
      }
      id = watcher.id;
      has[id] = null;
      watcher.run();
      if (has[id] != null) {
        circular[id] = (circular[id] || 0) + 1;
        if (circular[id] > MAX_UPDATE_COUNT) {
          warn("You may have an infinite update loop " + (watcher.user ? 'in watcher with expression "'.concat(watcher.expression, '"') : "in a component render function."), watcher.vm);
          break;
        }
      }
    }
    var activatedQueue = activatedChildren.slice();
    var updatedQueue = queue.slice();
    resetSchedulerState();
    callActivatedHooks(activatedQueue);
    callUpdatedHooks(updatedQueue);
    cleanupDeps();
    if (devtools && config.devtools) {
      devtools.emit("flush");
    }
  }
  function callUpdatedHooks(queue2) {
    var i = queue2.length;
    while (i--) {
      var watcher = queue2[i];
      var vm = watcher.vm;
      if (vm && vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
        callHook$1(vm, "updated");
      }
    }
  }
  function queueActivatedComponent(vm) {
    vm._inactive = false;
    activatedChildren.push(vm);
  }
  function callActivatedHooks(queue2) {
    for (var i = 0; i < queue2.length; i++) {
      queue2[i]._inactive = true;
      activateChildComponent(queue2[i], true);
    }
  }
  function queueWatcher(watcher) {
    var id = watcher.id;
    if (has[id] != null) {
      return;
    }
    if (watcher === Dep.target && watcher.noRecurse) {
      return;
    }
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    if (!waiting) {
      waiting = true;
      if (!config.async) {
        flushSchedulerQueue();
        return;
      }
      nextTick(flushSchedulerQueue);
    }
  }
  function initProvide(vm) {
    var provideOption = vm.$options.provide;
    if (provideOption) {
      var provided = isFunction(provideOption) ? provideOption.call(vm) : provideOption;
      if (!isObject(provided)) {
        return;
      }
      var source = resolveProvided(vm);
      var keys2 = hasSymbol ? Reflect.ownKeys(provided) : Object.keys(provided);
      for (var i = 0; i < keys2.length; i++) {
        var key = keys2[i];
        Object.defineProperty(source, key, Object.getOwnPropertyDescriptor(provided, key));
      }
    }
  }
  function initInjections(vm) {
    var result = resolveInject(vm.$options.inject, vm);
    if (result) {
      toggleObserving(false);
      Object.keys(result).forEach(function(key) {
        if (true) {
          defineReactive(vm, key, result[key], function() {
            warn("Avoid mutating an injected value directly since the changes will be overwritten whenever the provided component re-renders. " + 'injection being mutated: "'.concat(key, '"'), vm);
          });
        } else {
          defineReactive(vm, key, result[key]);
        }
      });
      toggleObserving(true);
    }
  }
  function resolveInject(inject, vm) {
    if (inject) {
      var result = /* @__PURE__ */ Object.create(null);
      var keys2 = hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject);
      for (var i = 0; i < keys2.length; i++) {
        var key = keys2[i];
        if (key === "__ob__")
          continue;
        var provideKey = inject[key].from;
        if (provideKey in vm._provided) {
          result[key] = vm._provided[provideKey];
        } else if ("default" in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = isFunction(provideDefault) ? provideDefault.call(vm) : provideDefault;
        } else if (true) {
          warn('Injection "'.concat(key, '" not found'), vm);
        }
      }
      return result;
    }
  }
  function FunctionalRenderContext(data, props3, children, parent, Ctor) {
    var _this = this;
    var options = Ctor.options;
    var contextVm;
    if (hasOwn(parent, "_uid")) {
      contextVm = Object.create(parent);
      contextVm._original = parent;
    } else {
      contextVm = parent;
      parent = parent._original;
    }
    var isCompiled = isTrue(options._compiled);
    var needNormalization = !isCompiled;
    this.data = data;
    this.props = props3;
    this.children = children;
    this.parent = parent;
    this.listeners = data.on || emptyObject;
    this.injections = resolveInject(options.inject, parent);
    this.slots = function() {
      if (!_this.$slots) {
        normalizeScopedSlots(parent, data.scopedSlots, _this.$slots = resolveSlots(children, parent));
      }
      return _this.$slots;
    };
    Object.defineProperty(this, "scopedSlots", {
      enumerable: true,
      get: function() {
        return normalizeScopedSlots(parent, data.scopedSlots, this.slots());
      }
    });
    if (isCompiled) {
      this.$options = options;
      this.$slots = this.slots();
      this.$scopedSlots = normalizeScopedSlots(parent, data.scopedSlots, this.$slots);
    }
    if (options._scopeId) {
      this._c = function(a, b, c, d) {
        var vnode = createElement$1(contextVm, a, b, c, d, needNormalization);
        if (vnode && !isArray(vnode)) {
          vnode.fnScopeId = options._scopeId;
          vnode.fnContext = parent;
        }
        return vnode;
      };
    } else {
      this._c = function(a, b, c, d) {
        return createElement$1(contextVm, a, b, c, d, needNormalization);
      };
    }
  }
  installRenderHelpers(FunctionalRenderContext.prototype);
  function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
    var options = Ctor.options;
    var props3 = {};
    var propOptions = options.props;
    if (isDef(propOptions)) {
      for (var key in propOptions) {
        props3[key] = validateProp(key, propOptions, propsData || emptyObject);
      }
    } else {
      if (isDef(data.attrs))
        mergeProps(props3, data.attrs);
      if (isDef(data.props))
        mergeProps(props3, data.props);
    }
    var renderContext = new FunctionalRenderContext(data, props3, children, contextVm, Ctor);
    var vnode = options.render.call(null, renderContext._c, renderContext);
    if (vnode instanceof VNode) {
      return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext);
    } else if (isArray(vnode)) {
      var vnodes = normalizeChildren(vnode) || [];
      var res = new Array(vnodes.length);
      for (var i = 0; i < vnodes.length; i++) {
        res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
      }
      return res;
    }
  }
  function cloneAndMarkFunctionalResult(vnode, data, contextVm, options, renderContext) {
    var clone2 = cloneVNode(vnode);
    clone2.fnContext = contextVm;
    clone2.fnOptions = options;
    if (true) {
      (clone2.devtoolsMeta = clone2.devtoolsMeta || {}).renderContext = renderContext;
    }
    if (data.slot) {
      (clone2.data || (clone2.data = {})).slot = data.slot;
    }
    return clone2;
  }
  function mergeProps(to, from) {
    for (var key in from) {
      to[camelize(key)] = from[key];
    }
  }
  function getComponentName(options) {
    return options.name || options.__name || options._componentTag;
  }
  var componentVNodeHooks = {
    init: function(vnode, hydrating) {
      if (vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive) {
        var mountedNode = vnode;
        componentVNodeHooks.prepatch(mountedNode, mountedNode);
      } else {
        var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance);
        child.$mount(hydrating ? vnode.elm : void 0, hydrating);
      }
    },
    prepatch: function(oldVnode, vnode) {
      var options = vnode.componentOptions;
      var child = vnode.componentInstance = oldVnode.componentInstance;
      updateChildComponent(
        child,
        options.propsData,
        options.listeners,
        vnode,
        options.children
      );
    },
    insert: function(vnode) {
      var context = vnode.context, componentInstance = vnode.componentInstance;
      if (!componentInstance._isMounted) {
        componentInstance._isMounted = true;
        callHook$1(componentInstance, "mounted");
      }
      if (vnode.data.keepAlive) {
        if (context._isMounted) {
          queueActivatedComponent(componentInstance);
        } else {
          activateChildComponent(componentInstance, true);
        }
      }
    },
    destroy: function(vnode) {
      var componentInstance = vnode.componentInstance;
      if (!componentInstance._isDestroyed) {
        if (!vnode.data.keepAlive) {
          componentInstance.$destroy();
        } else {
          deactivateChildComponent(componentInstance, true);
        }
      }
    }
  };
  var hooksToMerge = Object.keys(componentVNodeHooks);
  function createComponent(Ctor, data, context, children, tag) {
    if (isUndef(Ctor)) {
      return;
    }
    var baseCtor = context.$options._base;
    if (isObject(Ctor)) {
      Ctor = baseCtor.extend(Ctor);
    }
    if (typeof Ctor !== "function") {
      if (true) {
        warn("Invalid Component definition: ".concat(String(Ctor)), context);
      }
      return;
    }
    var asyncFactory;
    if (isUndef(Ctor.cid)) {
      asyncFactory = Ctor;
      Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
      if (Ctor === void 0) {
        return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
      }
    }
    data = data || {};
    resolveConstructorOptions(Ctor);
    if (isDef(data.model)) {
      transformModel(Ctor.options, data);
    }
    var propsData = extractPropsFromVNodeData(data, Ctor, tag);
    if (isTrue(Ctor.options.functional)) {
      return createFunctionalComponent(Ctor, propsData, data, context, children);
    }
    var listeners = data.on;
    data.on = data.nativeOn;
    if (isTrue(Ctor.options.abstract)) {
      var slot = data.slot;
      data = {};
      if (slot) {
        data.slot = slot;
      }
    }
    installComponentHooks(data);
    var name = getComponentName(Ctor.options) || tag;
    var vnode = new VNode(
      "vue-component-".concat(Ctor.cid).concat(name ? "-".concat(name) : ""),
      data,
      void 0,
      void 0,
      void 0,
      context,
      { Ctor, propsData, listeners, tag, children },
      asyncFactory
    );
    return vnode;
  }
  function createComponentInstanceForVnode(vnode, parent) {
    var options = {
      _isComponent: true,
      _parentVnode: vnode,
      parent
    };
    var inlineTemplate = vnode.data.inlineTemplate;
    if (isDef(inlineTemplate)) {
      options.render = inlineTemplate.render;
      options.staticRenderFns = inlineTemplate.staticRenderFns;
    }
    return new vnode.componentOptions.Ctor(options);
  }
  function installComponentHooks(data) {
    var hooks2 = data.hook || (data.hook = {});
    for (var i = 0; i < hooksToMerge.length; i++) {
      var key = hooksToMerge[i];
      var existing = hooks2[key];
      var toMerge = componentVNodeHooks[key];
      if (existing !== toMerge && !(existing && existing._merged)) {
        hooks2[key] = existing ? mergeHook(toMerge, existing) : toMerge;
      }
    }
  }
  function mergeHook(f1, f2) {
    var merged = function(a, b) {
      f1(a, b);
      f2(a, b);
    };
    merged._merged = true;
    return merged;
  }
  function transformModel(options, data) {
    var prop = options.model && options.model.prop || "value";
    var event = options.model && options.model.event || "input";
    (data.attrs || (data.attrs = {}))[prop] = data.model.value;
    var on = data.on || (data.on = {});
    var existing = on[event];
    var callback = data.model.callback;
    if (isDef(existing)) {
      if (isArray(existing) ? existing.indexOf(callback) === -1 : existing !== callback) {
        on[event] = [callback].concat(existing);
      }
    } else {
      on[event] = callback;
    }
  }
  var warn = noop;
  var tip = noop;
  var generateComponentTrace;
  var formatComponentName;
  if (true) {
    hasConsole_1 = typeof console !== "undefined";
    classifyRE_1 = /(?:^|[-_])(\w)/g;
    classify_1 = function(str) {
      return str.replace(classifyRE_1, function(c) {
        return c.toUpperCase();
      }).replace(/[-_]/g, "");
    };
    warn = function(msg, vm) {
      if (vm === void 0) {
        vm = currentInstance;
      }
      var trace = vm ? generateComponentTrace(vm) : "";
      if (config.warnHandler) {
        config.warnHandler.call(null, msg, vm, trace);
      } else if (hasConsole_1 && !config.silent) {
        console.error("[Vue warn]: ".concat(msg).concat(trace));
      }
    };
    tip = function(msg, vm) {
      if (hasConsole_1 && !config.silent) {
        console.warn("[Vue tip]: ".concat(msg) + (vm ? generateComponentTrace(vm) : ""));
      }
    };
    formatComponentName = function(vm, includeFile) {
      if (vm.$root === vm) {
        return "<Root>";
      }
      var options = isFunction(vm) && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm;
      var name = getComponentName(options);
      var file = options.__file;
      if (!name && file) {
        var match2 = file.match(/([^/\\]+)\.vue$/);
        name = match2 && match2[1];
      }
      return (name ? "<".concat(classify_1(name), ">") : "<Anonymous>") + (file && includeFile !== false ? " at ".concat(file) : "");
    };
    repeat_1 = function(str, n) {
      var res = "";
      while (n) {
        if (n % 2 === 1)
          res += str;
        if (n > 1)
          str += str;
        n >>= 1;
      }
      return res;
    };
    generateComponentTrace = function(vm) {
      if (vm._isVue && vm.$parent) {
        var tree = [];
        var currentRecursiveSequence = 0;
        while (vm) {
          if (tree.length > 0) {
            var last = tree[tree.length - 1];
            if (last.constructor === vm.constructor) {
              currentRecursiveSequence++;
              vm = vm.$parent;
              continue;
            } else if (currentRecursiveSequence > 0) {
              tree[tree.length - 1] = [last, currentRecursiveSequence];
              currentRecursiveSequence = 0;
            }
          }
          tree.push(vm);
          vm = vm.$parent;
        }
        return "\n\nfound in\n\n" + tree.map(function(vm2, i) {
          return "".concat(i === 0 ? "---> " : repeat_1(" ", 5 + i * 2)).concat(isArray(vm2) ? "".concat(formatComponentName(vm2[0]), "... (").concat(vm2[1], " recursive calls)") : formatComponentName(vm2));
        }).join("\n");
      } else {
        return "\n\n(found in ".concat(formatComponentName(vm), ")");
      }
    };
  }
  var hasConsole_1;
  var classifyRE_1;
  var classify_1;
  var repeat_1;
  var strats = config.optionMergeStrategies;
  if (true) {
    strats.el = strats.propsData = function(parent, child, vm, key) {
      if (!vm) {
        warn('option "'.concat(key, '" can only be used during instance ') + "creation with the `new` keyword.");
      }
      return defaultStrat(parent, child);
    };
  }
  function mergeData(to, from, recursive) {
    if (recursive === void 0) {
      recursive = true;
    }
    if (!from)
      return to;
    var key, toVal, fromVal;
    var keys2 = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from);
    for (var i = 0; i < keys2.length; i++) {
      key = keys2[i];
      if (key === "__ob__")
        continue;
      toVal = to[key];
      fromVal = from[key];
      if (!recursive || !hasOwn(to, key)) {
        set(to, key, fromVal);
      } else if (toVal !== fromVal && isPlainObject(toVal) && isPlainObject(fromVal)) {
        mergeData(toVal, fromVal);
      }
    }
    return to;
  }
  function mergeDataOrFn(parentVal, childVal, vm) {
    if (!vm) {
      if (!childVal) {
        return parentVal;
      }
      if (!parentVal) {
        return childVal;
      }
      return function mergedDataFn() {
        return mergeData(isFunction(childVal) ? childVal.call(this, this) : childVal, isFunction(parentVal) ? parentVal.call(this, this) : parentVal);
      };
    } else {
      return function mergedInstanceDataFn() {
        var instanceData = isFunction(childVal) ? childVal.call(vm, vm) : childVal;
        var defaultData = isFunction(parentVal) ? parentVal.call(vm, vm) : parentVal;
        if (instanceData) {
          return mergeData(instanceData, defaultData);
        } else {
          return defaultData;
        }
      };
    }
  }
  strats.data = function(parentVal, childVal, vm) {
    if (!vm) {
      if (childVal && typeof childVal !== "function") {
        warn('The "data" option should be a function that returns a per-instance value in component definitions.', vm);
        return parentVal;
      }
      return mergeDataOrFn(parentVal, childVal);
    }
    return mergeDataOrFn(parentVal, childVal, vm);
  };
  function mergeLifecycleHook(parentVal, childVal) {
    var res = childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
    return res ? dedupeHooks(res) : res;
  }
  function dedupeHooks(hooks2) {
    var res = [];
    for (var i = 0; i < hooks2.length; i++) {
      if (res.indexOf(hooks2[i]) === -1) {
        res.push(hooks2[i]);
      }
    }
    return res;
  }
  LIFECYCLE_HOOKS.forEach(function(hook) {
    strats[hook] = mergeLifecycleHook;
  });
  function mergeAssets(parentVal, childVal, vm, key) {
    var res = Object.create(parentVal || null);
    if (childVal) {
      assertObjectType(key, childVal, vm);
      return extend(res, childVal);
    } else {
      return res;
    }
  }
  ASSET_TYPES.forEach(function(type2) {
    strats[type2 + "s"] = mergeAssets;
  });
  strats.watch = function(parentVal, childVal, vm, key) {
    if (parentVal === nativeWatch)
      parentVal = void 0;
    if (childVal === nativeWatch)
      childVal = void 0;
    if (!childVal)
      return Object.create(parentVal || null);
    if (true) {
      assertObjectType(key, childVal, vm);
    }
    if (!parentVal)
      return childVal;
    var ret = {};
    extend(ret, parentVal);
    for (var key_1 in childVal) {
      var parent_1 = ret[key_1];
      var child = childVal[key_1];
      if (parent_1 && !isArray(parent_1)) {
        parent_1 = [parent_1];
      }
      ret[key_1] = parent_1 ? parent_1.concat(child) : isArray(child) ? child : [child];
    }
    return ret;
  };
  strats.props = strats.methods = strats.inject = strats.computed = function(parentVal, childVal, vm, key) {
    if (childVal && true) {
      assertObjectType(key, childVal, vm);
    }
    if (!parentVal)
      return childVal;
    var ret = /* @__PURE__ */ Object.create(null);
    extend(ret, parentVal);
    if (childVal)
      extend(ret, childVal);
    return ret;
  };
  strats.provide = function(parentVal, childVal) {
    if (!parentVal)
      return childVal;
    return function() {
      var ret = /* @__PURE__ */ Object.create(null);
      mergeData(ret, isFunction(parentVal) ? parentVal.call(this) : parentVal);
      if (childVal) {
        mergeData(
          ret,
          isFunction(childVal) ? childVal.call(this) : childVal,
          false
        );
      }
      return ret;
    };
  };
  var defaultStrat = function(parentVal, childVal) {
    return childVal === void 0 ? parentVal : childVal;
  };
  function checkComponents(options) {
    for (var key in options.components) {
      validateComponentName(key);
    }
  }
  function validateComponentName(name) {
    if (!new RegExp("^[a-zA-Z][\\-\\.0-9_".concat(unicodeRegExp.source, "]*$")).test(name)) {
      warn('Invalid component name: "' + name + '". Component names should conform to valid custom element name in html5 specification.');
    }
    if (isBuiltInTag(name) || config.isReservedTag(name)) {
      warn("Do not use built-in or reserved HTML elements as component id: " + name);
    }
  }
  function normalizeProps(options, vm) {
    var props3 = options.props;
    if (!props3)
      return;
    var res = {};
    var i, val, name;
    if (isArray(props3)) {
      i = props3.length;
      while (i--) {
        val = props3[i];
        if (typeof val === "string") {
          name = camelize(val);
          res[name] = { type: null };
        } else if (true) {
          warn("props must be strings when using array syntax.");
        }
      }
    } else if (isPlainObject(props3)) {
      for (var key in props3) {
        val = props3[key];
        name = camelize(key);
        res[name] = isPlainObject(val) ? val : { type: val };
      }
    } else if (true) {
      warn('Invalid value for option "props": expected an Array or an Object, ' + "but got ".concat(toRawType(props3), "."), vm);
    }
    options.props = res;
  }
  function normalizeInject(options, vm) {
    var inject = options.inject;
    if (!inject)
      return;
    var normalized = options.inject = {};
    if (isArray(inject)) {
      for (var i = 0; i < inject.length; i++) {
        normalized[inject[i]] = { from: inject[i] };
      }
    } else if (isPlainObject(inject)) {
      for (var key in inject) {
        var val = inject[key];
        normalized[key] = isPlainObject(val) ? extend({ from: key }, val) : { from: val };
      }
    } else if (true) {
      warn('Invalid value for option "inject": expected an Array or an Object, ' + "but got ".concat(toRawType(inject), "."), vm);
    }
  }
  function normalizeDirectives$1(options) {
    var dirs = options.directives;
    if (dirs) {
      for (var key in dirs) {
        var def2 = dirs[key];
        if (isFunction(def2)) {
          dirs[key] = { bind: def2, update: def2 };
        }
      }
    }
  }
  function assertObjectType(name, value, vm) {
    if (!isPlainObject(value)) {
      warn('Invalid value for option "'.concat(name, '": expected an Object, ') + "but got ".concat(toRawType(value), "."), vm);
    }
  }
  function mergeOptions(parent, child, vm) {
    if (true) {
      checkComponents(child);
    }
    if (isFunction(child)) {
      child = child.options;
    }
    normalizeProps(child, vm);
    normalizeInject(child, vm);
    normalizeDirectives$1(child);
    if (!child._base) {
      if (child.extends) {
        parent = mergeOptions(parent, child.extends, vm);
      }
      if (child.mixins) {
        for (var i = 0, l = child.mixins.length; i < l; i++) {
          parent = mergeOptions(parent, child.mixins[i], vm);
        }
      }
    }
    var options = {};
    var key;
    for (key in parent) {
      mergeField(key);
    }
    for (key in child) {
      if (!hasOwn(parent, key)) {
        mergeField(key);
      }
    }
    function mergeField(key2) {
      var strat = strats[key2] || defaultStrat;
      options[key2] = strat(parent[key2], child[key2], vm, key2);
    }
    return options;
  }
  function resolveAsset(options, type2, id, warnMissing) {
    if (typeof id !== "string") {
      return;
    }
    var assets = options[type2];
    if (hasOwn(assets, id))
      return assets[id];
    var camelizedId = camelize(id);
    if (hasOwn(assets, camelizedId))
      return assets[camelizedId];
    var PascalCaseId = capitalize(camelizedId);
    if (hasOwn(assets, PascalCaseId))
      return assets[PascalCaseId];
    var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
    if (warnMissing && !res) {
      warn("Failed to resolve " + type2.slice(0, -1) + ": " + id);
    }
    return res;
  }
  function validateProp(key, propOptions, propsData, vm) {
    var prop = propOptions[key];
    var absent = !hasOwn(propsData, key);
    var value = propsData[key];
    var booleanIndex = getTypeIndex(Boolean, prop.type);
    if (booleanIndex > -1) {
      if (absent && !hasOwn(prop, "default")) {
        value = false;
      } else if (value === "" || value === hyphenate(key)) {
        var stringIndex = getTypeIndex(String, prop.type);
        if (stringIndex < 0 || booleanIndex < stringIndex) {
          value = true;
        }
      }
    }
    if (value === void 0) {
      value = getPropDefaultValue(vm, prop, key);
      var prevShouldObserve = shouldObserve;
      toggleObserving(true);
      observe(value);
      toggleObserving(prevShouldObserve);
    }
    if (true) {
      assertProp(prop, key, value, vm, absent);
    }
    return value;
  }
  function getPropDefaultValue(vm, prop, key) {
    if (!hasOwn(prop, "default")) {
      return void 0;
    }
    var def2 = prop.default;
    if (isObject(def2)) {
      warn('Invalid default value for prop "' + key + '": Props with type Object/Array must use a factory function to return the default value.', vm);
    }
    if (vm && vm.$options.propsData && vm.$options.propsData[key] === void 0 && vm._props[key] !== void 0) {
      return vm._props[key];
    }
    return isFunction(def2) && getType(prop.type) !== "Function" ? def2.call(vm) : def2;
  }
  function assertProp(prop, name, value, vm, absent) {
    if (prop.required && absent) {
      warn('Missing required prop: "' + name + '"', vm);
      return;
    }
    if (value == null && !prop.required) {
      return;
    }
    var type2 = prop.type;
    var valid = !type2 || type2 === true;
    var expectedTypes = [];
    if (type2) {
      if (!isArray(type2)) {
        type2 = [type2];
      }
      for (var i = 0; i < type2.length && !valid; i++) {
        var assertedType = assertType(value, type2[i], vm);
        expectedTypes.push(assertedType.expectedType || "");
        valid = assertedType.valid;
      }
    }
    var haveExpectedTypes = expectedTypes.some(function(t) {
      return t;
    });
    if (!valid && haveExpectedTypes) {
      warn(getInvalidTypeMessage(name, value, expectedTypes), vm);
      return;
    }
    var validator = prop.validator;
    if (validator) {
      if (!validator(value)) {
        warn('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
      }
    }
  }
  var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol|BigInt)$/;
  function assertType(value, type2, vm) {
    var valid;
    var expectedType = getType(type2);
    if (simpleCheckRE.test(expectedType)) {
      var t = typeof value;
      valid = t === expectedType.toLowerCase();
      if (!valid && t === "object") {
        valid = value instanceof type2;
      }
    } else if (expectedType === "Object") {
      valid = isPlainObject(value);
    } else if (expectedType === "Array") {
      valid = isArray(value);
    } else {
      try {
        valid = value instanceof type2;
      } catch (e) {
        warn('Invalid prop type: "' + String(type2) + '" is not a constructor', vm);
        valid = false;
      }
    }
    return {
      valid,
      expectedType
    };
  }
  var functionTypeCheckRE = /^\s*function (\w+)/;
  function getType(fn) {
    var match2 = fn && fn.toString().match(functionTypeCheckRE);
    return match2 ? match2[1] : "";
  }
  function isSameType(a, b) {
    return getType(a) === getType(b);
  }
  function getTypeIndex(type2, expectedTypes) {
    if (!isArray(expectedTypes)) {
      return isSameType(expectedTypes, type2) ? 0 : -1;
    }
    for (var i = 0, len = expectedTypes.length; i < len; i++) {
      if (isSameType(expectedTypes[i], type2)) {
        return i;
      }
    }
    return -1;
  }
  function getInvalidTypeMessage(name, value, expectedTypes) {
    var message = 'Invalid prop: type check failed for prop "'.concat(name, '".') + " Expected ".concat(expectedTypes.map(capitalize).join(", "));
    var expectedType = expectedTypes[0];
    var receivedType = toRawType(value);
    if (expectedTypes.length === 1 && isExplicable(expectedType) && isExplicable(typeof value) && !isBoolean(expectedType, receivedType)) {
      message += " with value ".concat(styleValue(value, expectedType));
    }
    message += ", got ".concat(receivedType, " ");
    if (isExplicable(receivedType)) {
      message += "with value ".concat(styleValue(value, receivedType), ".");
    }
    return message;
  }
  function styleValue(value, type2) {
    if (type2 === "String") {
      return '"'.concat(value, '"');
    } else if (type2 === "Number") {
      return "".concat(Number(value));
    } else {
      return "".concat(value);
    }
  }
  var EXPLICABLE_TYPES = ["string", "number", "boolean"];
  function isExplicable(value) {
    return EXPLICABLE_TYPES.some(function(elem) {
      return value.toLowerCase() === elem;
    });
  }
  function isBoolean() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    return args.some(function(elem) {
      return elem.toLowerCase() === "boolean";
    });
  }
  var initProxy;
  if (true) {
    allowedGlobals_1 = makeMap(
      "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,require"
    );
    warnNonPresent_1 = function(target2, key) {
      warn('Property or method "'.concat(key, '" is not defined on the instance but ') + "referenced during render. Make sure that this property is reactive, either in the data option, or for class-based components, by initializing the property. See: https://v2.vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.", target2);
    };
    warnReservedPrefix_1 = function(target2, key) {
      warn('Property "'.concat(key, '" must be accessed with "$data.').concat(key, '" because ') + 'properties starting with "$" or "_" are not proxied in the Vue instance to prevent conflicts with Vue internals. See: https://v2.vuejs.org/v2/api/#data', target2);
    };
    hasProxy_1 = typeof Proxy !== "undefined" && isNative(Proxy);
    if (hasProxy_1) {
      isBuiltInModifier_1 = makeMap("stop,prevent,self,ctrl,shift,alt,meta,exact");
      config.keyCodes = new Proxy(config.keyCodes, {
        set: function(target2, key, value) {
          if (isBuiltInModifier_1(key)) {
            warn("Avoid overwriting built-in modifier in config.keyCodes: .".concat(key));
            return false;
          } else {
            target2[key] = value;
            return true;
          }
        }
      });
    }
    hasHandler_1 = {
      has: function(target2, key) {
        var has2 = key in target2;
        var isAllowed = allowedGlobals_1(key) || typeof key === "string" && key.charAt(0) === "_" && !(key in target2.$data);
        if (!has2 && !isAllowed) {
          if (key in target2.$data)
            warnReservedPrefix_1(target2, key);
          else
            warnNonPresent_1(target2, key);
        }
        return has2 || !isAllowed;
      }
    };
    getHandler_1 = {
      get: function(target2, key) {
        if (typeof key === "string" && !(key in target2)) {
          if (key in target2.$data)
            warnReservedPrefix_1(target2, key);
          else
            warnNonPresent_1(target2, key);
        }
        return target2[key];
      }
    };
    initProxy = function initProxy2(vm) {
      if (hasProxy_1) {
        var options = vm.$options;
        var handlers = options.render && options.render._withStripped ? getHandler_1 : hasHandler_1;
        vm._renderProxy = new Proxy(vm, handlers);
      } else {
        vm._renderProxy = vm;
      }
    };
  }
  var allowedGlobals_1;
  var warnNonPresent_1;
  var warnReservedPrefix_1;
  var hasProxy_1;
  var isBuiltInModifier_1;
  var hasHandler_1;
  var getHandler_1;
  var sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
  };
  function proxy(target2, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter() {
      return this[sourceKey][key];
    };
    sharedPropertyDefinition.set = function proxySetter(val) {
      this[sourceKey][key] = val;
    };
    Object.defineProperty(target2, key, sharedPropertyDefinition);
  }
  function initState(vm) {
    var opts = vm.$options;
    if (opts.props)
      initProps$1(vm, opts.props);
    initSetup(vm);
    if (opts.methods)
      initMethods(vm, opts.methods);
    if (opts.data) {
      initData(vm);
    } else {
      var ob = observe(vm._data = {});
      ob && ob.vmCount++;
    }
    if (opts.computed)
      initComputed$1(vm, opts.computed);
    if (opts.watch && opts.watch !== nativeWatch) {
      initWatch(vm, opts.watch);
    }
  }
  function initProps$1(vm, propsOptions) {
    var propsData = vm.$options.propsData || {};
    var props3 = vm._props = shallowReactive({});
    var keys2 = vm.$options._propKeys = [];
    var isRoot = !vm.$parent;
    if (!isRoot) {
      toggleObserving(false);
    }
    var _loop_1 = function(key2) {
      keys2.push(key2);
      var value = validateProp(key2, propsOptions, propsData, vm);
      if (true) {
        var hyphenatedKey = hyphenate(key2);
        if (isReservedAttribute(hyphenatedKey) || config.isReservedAttr(hyphenatedKey)) {
          warn('"'.concat(hyphenatedKey, '" is a reserved attribute and cannot be used as component prop.'), vm);
        }
        defineReactive(props3, key2, value, function() {
          if (!isRoot && !isUpdatingChildComponent) {
            warn("Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's " + 'value. Prop being mutated: "'.concat(key2, '"'), vm);
          }
        });
      } else {
        defineReactive(props3, key2, value);
      }
      if (!(key2 in vm)) {
        proxy(vm, "_props", key2);
      }
    };
    for (var key in propsOptions) {
      _loop_1(key);
    }
    toggleObserving(true);
  }
  function initData(vm) {
    var data = vm.$options.data;
    data = vm._data = isFunction(data) ? getData(data, vm) : data || {};
    if (!isPlainObject(data)) {
      data = {};
      warn("data functions should return an object:\nhttps://v2.vuejs.org/v2/guide/components.html#data-Must-Be-a-Function", vm);
    }
    var keys2 = Object.keys(data);
    var props3 = vm.$options.props;
    var methods = vm.$options.methods;
    var i = keys2.length;
    while (i--) {
      var key = keys2[i];
      if (true) {
        if (methods && hasOwn(methods, key)) {
          warn('Method "'.concat(key, '" has already been defined as a data property.'), vm);
        }
      }
      if (props3 && hasOwn(props3, key)) {
        warn('The data property "'.concat(key, '" is already declared as a prop. ') + "Use prop default value instead.", vm);
      } else if (!isReserved(key)) {
        proxy(vm, "_data", key);
      }
    }
    var ob = observe(data);
    ob && ob.vmCount++;
  }
  function getData(data, vm) {
    pushTarget();
    try {
      return data.call(vm, vm);
    } catch (e) {
      handleError(e, vm, "data()");
      return {};
    } finally {
      popTarget();
    }
  }
  var computedWatcherOptions = { lazy: true };
  function initComputed$1(vm, computed) {
    var watchers = vm._computedWatchers = /* @__PURE__ */ Object.create(null);
    var isSSR = isServerRendering();
    for (var key in computed) {
      var userDef = computed[key];
      var getter = isFunction(userDef) ? userDef : userDef.get;
      if (getter == null) {
        warn('Getter is missing for computed property "'.concat(key, '".'), vm);
      }
      if (!isSSR) {
        watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
      }
      if (!(key in vm)) {
        defineComputed(vm, key, userDef);
      } else if (true) {
        if (key in vm.$data) {
          warn('The computed property "'.concat(key, '" is already defined in data.'), vm);
        } else if (vm.$options.props && key in vm.$options.props) {
          warn('The computed property "'.concat(key, '" is already defined as a prop.'), vm);
        } else if (vm.$options.methods && key in vm.$options.methods) {
          warn('The computed property "'.concat(key, '" is already defined as a method.'), vm);
        }
      }
    }
  }
  function defineComputed(target2, key, userDef) {
    var shouldCache = !isServerRendering();
    if (isFunction(userDef)) {
      sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : createGetterInvoker(userDef);
      sharedPropertyDefinition.set = noop;
    } else {
      sharedPropertyDefinition.get = userDef.get ? shouldCache && userDef.cache !== false ? createComputedGetter(key) : createGetterInvoker(userDef.get) : noop;
      sharedPropertyDefinition.set = userDef.set || noop;
    }
    if (sharedPropertyDefinition.set === noop) {
      sharedPropertyDefinition.set = function() {
        warn('Computed property "'.concat(key, '" was assigned to but it has no setter.'), this);
      };
    }
    Object.defineProperty(target2, key, sharedPropertyDefinition);
  }
  function createComputedGetter(key) {
    return function computedGetter() {
      var watcher = this._computedWatchers && this._computedWatchers[key];
      if (watcher) {
        if (watcher.dirty) {
          watcher.evaluate();
        }
        if (Dep.target) {
          if (Dep.target.onTrack) {
            Dep.target.onTrack({
              effect: Dep.target,
              target: this,
              type: "get",
              key
            });
          }
          watcher.depend();
        }
        return watcher.value;
      }
    };
  }
  function createGetterInvoker(fn) {
    return function computedGetter() {
      return fn.call(this, this);
    };
  }
  function initMethods(vm, methods) {
    var props3 = vm.$options.props;
    for (var key in methods) {
      if (true) {
        if (typeof methods[key] !== "function") {
          warn('Method "'.concat(key, '" has type "').concat(typeof methods[key], '" in the component definition. ') + "Did you reference the function correctly?", vm);
        }
        if (props3 && hasOwn(props3, key)) {
          warn('Method "'.concat(key, '" has already been defined as a prop.'), vm);
        }
        if (key in vm && isReserved(key)) {
          warn('Method "'.concat(key, '" conflicts with an existing Vue instance method. ') + "Avoid defining component methods that start with _ or $.");
        }
      }
      vm[key] = typeof methods[key] !== "function" ? noop : bind(methods[key], vm);
    }
  }
  function initWatch(vm, watch) {
    for (var key in watch) {
      var handler = watch[key];
      if (isArray(handler)) {
        for (var i = 0; i < handler.length; i++) {
          createWatcher(vm, key, handler[i]);
        }
      } else {
        createWatcher(vm, key, handler);
      }
    }
  }
  function createWatcher(vm, expOrFn, handler, options) {
    if (isPlainObject(handler)) {
      options = handler;
      handler = handler.handler;
    }
    if (typeof handler === "string") {
      handler = vm[handler];
    }
    return vm.$watch(expOrFn, handler, options);
  }
  function stateMixin(Vue2) {
    var dataDef = {};
    dataDef.get = function() {
      return this._data;
    };
    var propsDef = {};
    propsDef.get = function() {
      return this._props;
    };
    if (true) {
      dataDef.set = function() {
        warn("Avoid replacing instance root $data. Use nested data properties instead.", this);
      };
      propsDef.set = function() {
        warn("$props is readonly.", this);
      };
    }
    Object.defineProperty(Vue2.prototype, "$data", dataDef);
    Object.defineProperty(Vue2.prototype, "$props", propsDef);
    Vue2.prototype.$set = set;
    Vue2.prototype.$delete = del;
    Vue2.prototype.$watch = function(expOrFn, cb, options) {
      var vm = this;
      if (isPlainObject(cb)) {
        return createWatcher(vm, expOrFn, cb, options);
      }
      options = options || {};
      options.user = true;
      var watcher = new Watcher(vm, expOrFn, cb, options);
      if (options.immediate) {
        var info = 'callback for immediate watcher "'.concat(watcher.expression, '"');
        pushTarget();
        invokeWithErrorHandling(cb, vm, [watcher.value], vm, info);
        popTarget();
      }
      return function unwatchFn() {
        watcher.teardown();
      };
    };
  }
  var uid = 0;
  function initMixin$1(Vue2) {
    Vue2.prototype._init = function(options) {
      var vm = this;
      vm._uid = uid++;
      var startTag, endTag;
      if (config.performance && mark) {
        startTag = "vue-perf-start:".concat(vm._uid);
        endTag = "vue-perf-end:".concat(vm._uid);
        mark(startTag);
      }
      vm._isVue = true;
      vm.__v_skip = true;
      vm._scope = new EffectScope(true);
      vm._scope._vm = true;
      if (options && options._isComponent) {
        initInternalComponent(vm, options);
      } else {
        vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
      }
      if (true) {
        initProxy(vm);
      } else {
        vm._renderProxy = vm;
      }
      vm._self = vm;
      initLifecycle(vm);
      initEvents(vm);
      initRender(vm);
      callHook$1(vm, "beforeCreate", void 0, false);
      initInjections(vm);
      initState(vm);
      initProvide(vm);
      callHook$1(vm, "created");
      if (config.performance && mark) {
        vm._name = formatComponentName(vm, false);
        mark(endTag);
        measure("vue ".concat(vm._name, " init"), startTag, endTag);
      }
      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    };
  }
  function initInternalComponent(vm, options) {
    var opts = vm.$options = Object.create(vm.constructor.options);
    var parentVnode = options._parentVnode;
    opts.parent = options.parent;
    opts._parentVnode = parentVnode;
    var vnodeComponentOptions = parentVnode.componentOptions;
    opts.propsData = vnodeComponentOptions.propsData;
    opts._parentListeners = vnodeComponentOptions.listeners;
    opts._renderChildren = vnodeComponentOptions.children;
    opts._componentTag = vnodeComponentOptions.tag;
    if (options.render) {
      opts.render = options.render;
      opts.staticRenderFns = options.staticRenderFns;
    }
  }
  function resolveConstructorOptions(Ctor) {
    var options = Ctor.options;
    if (Ctor.super) {
      var superOptions = resolveConstructorOptions(Ctor.super);
      var cachedSuperOptions = Ctor.superOptions;
      if (superOptions !== cachedSuperOptions) {
        Ctor.superOptions = superOptions;
        var modifiedOptions = resolveModifiedOptions(Ctor);
        if (modifiedOptions) {
          extend(Ctor.extendOptions, modifiedOptions);
        }
        options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
        if (options.name) {
          options.components[options.name] = Ctor;
        }
      }
    }
    return options;
  }
  function resolveModifiedOptions(Ctor) {
    var modified;
    var latest = Ctor.options;
    var sealed = Ctor.sealedOptions;
    for (var key in latest) {
      if (latest[key] !== sealed[key]) {
        if (!modified)
          modified = {};
        modified[key] = latest[key];
      }
    }
    return modified;
  }
  function Vue(options) {
    if (!(this instanceof Vue)) {
      warn("Vue is a constructor and should be called with the `new` keyword");
    }
    this._init(options);
  }
  initMixin$1(Vue);
  stateMixin(Vue);
  eventsMixin(Vue);
  lifecycleMixin(Vue);
  renderMixin(Vue);
  function initUse(Vue2) {
    Vue2.use = function(plugin) {
      var installedPlugins = this._installedPlugins || (this._installedPlugins = []);
      if (installedPlugins.indexOf(plugin) > -1) {
        return this;
      }
      var args = toArray(arguments, 1);
      args.unshift(this);
      if (isFunction(plugin.install)) {
        plugin.install.apply(plugin, args);
      } else if (isFunction(plugin)) {
        plugin.apply(null, args);
      }
      installedPlugins.push(plugin);
      return this;
    };
  }
  function initMixin(Vue2) {
    Vue2.mixin = function(mixin) {
      this.options = mergeOptions(this.options, mixin);
      return this;
    };
  }
  function initExtend(Vue2) {
    Vue2.cid = 0;
    var cid = 1;
    Vue2.extend = function(extendOptions) {
      extendOptions = extendOptions || {};
      var Super = this;
      var SuperId = Super.cid;
      var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
      if (cachedCtors[SuperId]) {
        return cachedCtors[SuperId];
      }
      var name = getComponentName(extendOptions) || getComponentName(Super.options);
      if (name) {
        validateComponentName(name);
      }
      var Sub = function VueComponent(options) {
        this._init(options);
      };
      Sub.prototype = Object.create(Super.prototype);
      Sub.prototype.constructor = Sub;
      Sub.cid = cid++;
      Sub.options = mergeOptions(Super.options, extendOptions);
      Sub["super"] = Super;
      if (Sub.options.props) {
        initProps(Sub);
      }
      if (Sub.options.computed) {
        initComputed(Sub);
      }
      Sub.extend = Super.extend;
      Sub.mixin = Super.mixin;
      Sub.use = Super.use;
      ASSET_TYPES.forEach(function(type2) {
        Sub[type2] = Super[type2];
      });
      if (name) {
        Sub.options.components[name] = Sub;
      }
      Sub.superOptions = Super.options;
      Sub.extendOptions = extendOptions;
      Sub.sealedOptions = extend({}, Sub.options);
      cachedCtors[SuperId] = Sub;
      return Sub;
    };
  }
  function initProps(Comp) {
    var props3 = Comp.options.props;
    for (var key in props3) {
      proxy(Comp.prototype, "_props", key);
    }
  }
  function initComputed(Comp) {
    var computed = Comp.options.computed;
    for (var key in computed) {
      defineComputed(Comp.prototype, key, computed[key]);
    }
  }
  function initAssetRegisters(Vue2) {
    ASSET_TYPES.forEach(function(type2) {
      Vue2[type2] = function(id, definition) {
        if (!definition) {
          return this.options[type2 + "s"][id];
        } else {
          if (type2 === "component") {
            validateComponentName(id);
          }
          if (type2 === "component" && isPlainObject(definition)) {
            definition.name = definition.name || id;
            definition = this.options._base.extend(definition);
          }
          if (type2 === "directive" && isFunction(definition)) {
            definition = { bind: definition, update: definition };
          }
          this.options[type2 + "s"][id] = definition;
          return definition;
        }
      };
    });
  }
  function _getComponentName(opts) {
    return opts && (getComponentName(opts.Ctor.options) || opts.tag);
  }
  function matches(pattern, name) {
    if (isArray(pattern)) {
      return pattern.indexOf(name) > -1;
    } else if (typeof pattern === "string") {
      return pattern.split(",").indexOf(name) > -1;
    } else if (isRegExp(pattern)) {
      return pattern.test(name);
    }
    return false;
  }
  function pruneCache(keepAliveInstance, filter) {
    var cache = keepAliveInstance.cache, keys2 = keepAliveInstance.keys, _vnode = keepAliveInstance._vnode;
    for (var key in cache) {
      var entry = cache[key];
      if (entry) {
        var name_1 = entry.name;
        if (name_1 && !filter(name_1)) {
          pruneCacheEntry(cache, key, keys2, _vnode);
        }
      }
    }
  }
  function pruneCacheEntry(cache, key, keys2, current) {
    var entry = cache[key];
    if (entry && (!current || entry.tag !== current.tag)) {
      entry.componentInstance.$destroy();
    }
    cache[key] = null;
    remove$2(keys2, key);
  }
  var patternTypes = [String, RegExp, Array];
  var KeepAlive = {
    name: "keep-alive",
    abstract: true,
    props: {
      include: patternTypes,
      exclude: patternTypes,
      max: [String, Number]
    },
    methods: {
      cacheVNode: function() {
        var _a = this, cache = _a.cache, keys2 = _a.keys, vnodeToCache = _a.vnodeToCache, keyToCache = _a.keyToCache;
        if (vnodeToCache) {
          var tag = vnodeToCache.tag, componentInstance = vnodeToCache.componentInstance, componentOptions = vnodeToCache.componentOptions;
          cache[keyToCache] = {
            name: _getComponentName(componentOptions),
            tag,
            componentInstance
          };
          keys2.push(keyToCache);
          if (this.max && keys2.length > parseInt(this.max)) {
            pruneCacheEntry(cache, keys2[0], keys2, this._vnode);
          }
          this.vnodeToCache = null;
        }
      }
    },
    created: function() {
      this.cache = /* @__PURE__ */ Object.create(null);
      this.keys = [];
    },
    destroyed: function() {
      for (var key in this.cache) {
        pruneCacheEntry(this.cache, key, this.keys);
      }
    },
    mounted: function() {
      var _this = this;
      this.cacheVNode();
      this.$watch("include", function(val) {
        pruneCache(_this, function(name) {
          return matches(val, name);
        });
      });
      this.$watch("exclude", function(val) {
        pruneCache(_this, function(name) {
          return !matches(val, name);
        });
      });
    },
    updated: function() {
      this.cacheVNode();
    },
    render: function() {
      var slot = this.$slots.default;
      var vnode = getFirstComponentChild(slot);
      var componentOptions = vnode && vnode.componentOptions;
      if (componentOptions) {
        var name_2 = _getComponentName(componentOptions);
        var _a = this, include = _a.include, exclude = _a.exclude;
        if (include && (!name_2 || !matches(include, name_2)) || exclude && name_2 && matches(exclude, name_2)) {
          return vnode;
        }
        var _b = this, cache = _b.cache, keys2 = _b.keys;
        var key = vnode.key == null ? componentOptions.Ctor.cid + (componentOptions.tag ? "::".concat(componentOptions.tag) : "") : vnode.key;
        if (cache[key]) {
          vnode.componentInstance = cache[key].componentInstance;
          remove$2(keys2, key);
          keys2.push(key);
        } else {
          this.vnodeToCache = vnode;
          this.keyToCache = key;
        }
        vnode.data.keepAlive = true;
      }
      return vnode || slot && slot[0];
    }
  };
  var builtInComponents = {
    KeepAlive
  };
  function initGlobalAPI(Vue2) {
    var configDef = {};
    configDef.get = function() {
      return config;
    };
    if (true) {
      configDef.set = function() {
        warn("Do not replace the Vue.config object, set individual fields instead.");
      };
    }
    Object.defineProperty(Vue2, "config", configDef);
    Vue2.util = {
      warn,
      extend,
      mergeOptions,
      defineReactive
    };
    Vue2.set = set;
    Vue2.delete = del;
    Vue2.nextTick = nextTick;
    Vue2.observable = function(obj) {
      observe(obj);
      return obj;
    };
    Vue2.options = /* @__PURE__ */ Object.create(null);
    ASSET_TYPES.forEach(function(type2) {
      Vue2.options[type2 + "s"] = /* @__PURE__ */ Object.create(null);
    });
    Vue2.options._base = Vue2;
    extend(Vue2.options.components, builtInComponents);
    initUse(Vue2);
    initMixin(Vue2);
    initExtend(Vue2);
    initAssetRegisters(Vue2);
  }
  initGlobalAPI(Vue);
  Object.defineProperty(Vue.prototype, "$isServer", {
    get: isServerRendering
  });
  Object.defineProperty(Vue.prototype, "$ssrContext", {
    get: function() {
      return this.$vnode && this.$vnode.ssrContext;
    }
  });
  Object.defineProperty(Vue, "FunctionalRenderContext", {
    value: FunctionalRenderContext
  });
  Vue.version = version;
  var isReservedAttr = makeMap("style,class");
  var acceptValue = makeMap("input,textarea,option,select,progress");
  var mustUseProp = function(tag, type2, attr) {
    return attr === "value" && acceptValue(tag) && type2 !== "button" || attr === "selected" && tag === "option" || attr === "checked" && tag === "input" || attr === "muted" && tag === "video";
  };
  var isEnumeratedAttr = makeMap("contenteditable,draggable,spellcheck");
  var isValidContentEditableValue = makeMap("events,caret,typing,plaintext-only");
  var convertEnumeratedValue = function(key, value) {
    return isFalsyAttrValue(value) || value === "false" ? "false" : key === "contenteditable" && isValidContentEditableValue(value) ? value : "true";
  };
  var isBooleanAttr = makeMap("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,truespeed,typemustmatch,visible");
  var xlinkNS = "http://www.w3.org/1999/xlink";
  var isXlink = function(name) {
    return name.charAt(5) === ":" && name.slice(0, 5) === "xlink";
  };
  var getXlinkProp = function(name) {
    return isXlink(name) ? name.slice(6, name.length) : "";
  };
  var isFalsyAttrValue = function(val) {
    return val == null || val === false;
  };
  function genClassForVnode(vnode) {
    var data = vnode.data;
    var parentNode2 = vnode;
    var childNode = vnode;
    while (isDef(childNode.componentInstance)) {
      childNode = childNode.componentInstance._vnode;
      if (childNode && childNode.data) {
        data = mergeClassData(childNode.data, data);
      }
    }
    while (isDef(parentNode2 = parentNode2.parent)) {
      if (parentNode2 && parentNode2.data) {
        data = mergeClassData(data, parentNode2.data);
      }
    }
    return renderClass(data.staticClass, data.class);
  }
  function mergeClassData(child, parent) {
    return {
      staticClass: concat(child.staticClass, parent.staticClass),
      class: isDef(child.class) ? [child.class, parent.class] : parent.class
    };
  }
  function renderClass(staticClass, dynamicClass) {
    if (isDef(staticClass) || isDef(dynamicClass)) {
      return concat(staticClass, stringifyClass(dynamicClass));
    }
    return "";
  }
  function concat(a, b) {
    return a ? b ? a + " " + b : a : b || "";
  }
  function stringifyClass(value) {
    if (Array.isArray(value)) {
      return stringifyArray(value);
    }
    if (isObject(value)) {
      return stringifyObject(value);
    }
    if (typeof value === "string") {
      return value;
    }
    return "";
  }
  function stringifyArray(value) {
    var res = "";
    var stringified;
    for (var i = 0, l = value.length; i < l; i++) {
      if (isDef(stringified = stringifyClass(value[i])) && stringified !== "") {
        if (res)
          res += " ";
        res += stringified;
      }
    }
    return res;
  }
  function stringifyObject(value) {
    var res = "";
    for (var key in value) {
      if (value[key]) {
        if (res)
          res += " ";
        res += key;
      }
    }
    return res;
  }
  var namespaceMap = {
    svg: "http://www.w3.org/2000/svg",
    math: "http://www.w3.org/1998/Math/MathML"
  };
  var isHTMLTag = makeMap("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot");
  var isSVG = makeMap("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignobject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view", true);
  var isReservedTag = function(tag) {
    return isHTMLTag(tag) || isSVG(tag);
  };
  function getTagNamespace(tag) {
    if (isSVG(tag)) {
      return "svg";
    }
    if (tag === "math") {
      return "math";
    }
  }
  var unknownElementCache = /* @__PURE__ */ Object.create(null);
  function isUnknownElement(tag) {
    if (!inBrowser) {
      return true;
    }
    if (isReservedTag(tag)) {
      return false;
    }
    tag = tag.toLowerCase();
    if (unknownElementCache[tag] != null) {
      return unknownElementCache[tag];
    }
    var el = document.createElement(tag);
    if (tag.indexOf("-") > -1) {
      return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
    } else {
      return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
    }
  }
  var isTextInputType = makeMap("text,number,password,search,email,tel,url");
  function query(el) {
    if (typeof el === "string") {
      var selected = document.querySelector(el);
      if (!selected) {
        warn("Cannot find element: " + el);
        return document.createElement("div");
      }
      return selected;
    } else {
      return el;
    }
  }
  function createElement(tagName2, vnode) {
    var elm = document.createElement(tagName2);
    if (tagName2 !== "select") {
      return elm;
    }
    if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== void 0) {
      elm.setAttribute("multiple", "multiple");
    }
    return elm;
  }
  function createElementNS(namespace, tagName2) {
    return document.createElementNS(namespaceMap[namespace], tagName2);
  }
  function createTextNode(text) {
    return document.createTextNode(text);
  }
  function createComment(text) {
    return document.createComment(text);
  }
  function insertBefore(parentNode2, newNode, referenceNode) {
    parentNode2.insertBefore(newNode, referenceNode);
  }
  function removeChild(node, child) {
    node.removeChild(child);
  }
  function appendChild(node, child) {
    node.appendChild(child);
  }
  function parentNode(node) {
    return node.parentNode;
  }
  function nextSibling(node) {
    return node.nextSibling;
  }
  function tagName(node) {
    return node.tagName;
  }
  function setTextContent(node, text) {
    node.textContent = text;
  }
  function setStyleScope(node, scopeId) {
    node.setAttribute(scopeId, "");
  }
  var nodeOps = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    createElement,
    createElementNS,
    createTextNode,
    createComment,
    insertBefore,
    removeChild,
    appendChild,
    parentNode,
    nextSibling,
    tagName,
    setTextContent,
    setStyleScope
  });
  var ref = {
    create: function(_, vnode) {
      registerRef(vnode);
    },
    update: function(oldVnode, vnode) {
      if (oldVnode.data.ref !== vnode.data.ref) {
        registerRef(oldVnode, true);
        registerRef(vnode);
      }
    },
    destroy: function(vnode) {
      registerRef(vnode, true);
    }
  };
  function registerRef(vnode, isRemoval) {
    var ref2 = vnode.data.ref;
    if (!isDef(ref2))
      return;
    var vm = vnode.context;
    var refValue = vnode.componentInstance || vnode.elm;
    var value = isRemoval ? null : refValue;
    var $refsValue = isRemoval ? void 0 : refValue;
    if (isFunction(ref2)) {
      invokeWithErrorHandling(ref2, vm, [value], vm, "template ref function");
      return;
    }
    var isFor = vnode.data.refInFor;
    var _isString = typeof ref2 === "string" || typeof ref2 === "number";
    var _isRef = isRef(ref2);
    var refs = vm.$refs;
    if (_isString || _isRef) {
      if (isFor) {
        var existing = _isString ? refs[ref2] : ref2.value;
        if (isRemoval) {
          isArray(existing) && remove$2(existing, refValue);
        } else {
          if (!isArray(existing)) {
            if (_isString) {
              refs[ref2] = [refValue];
              setSetupRef(vm, ref2, refs[ref2]);
            } else {
              ref2.value = [refValue];
            }
          } else if (!existing.includes(refValue)) {
            existing.push(refValue);
          }
        }
      } else if (_isString) {
        if (isRemoval && refs[ref2] !== refValue) {
          return;
        }
        refs[ref2] = $refsValue;
        setSetupRef(vm, ref2, value);
      } else if (_isRef) {
        if (isRemoval && ref2.value !== refValue) {
          return;
        }
        ref2.value = value;
      } else if (true) {
        warn("Invalid template ref type: ".concat(typeof ref2));
      }
    }
  }
  function setSetupRef(_a, key, val) {
    var _setupState = _a._setupState;
    if (_setupState && hasOwn(_setupState, key)) {
      if (isRef(_setupState[key])) {
        _setupState[key].value = val;
      } else {
        _setupState[key] = val;
      }
    }
  }
  var emptyNode = new VNode("", {}, []);
  var hooks = ["create", "activate", "update", "remove", "destroy"];
  function sameVnode(a, b) {
    return a.key === b.key && a.asyncFactory === b.asyncFactory && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && isUndef(b.asyncFactory.error));
  }
  function sameInputType(a, b) {
    if (a.tag !== "input")
      return true;
    var i;
    var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
    var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
    return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB);
  }
  function createKeyToOldIdx(children, beginIdx, endIdx) {
    var i, key;
    var map = {};
    for (i = beginIdx; i <= endIdx; ++i) {
      key = children[i].key;
      if (isDef(key))
        map[key] = i;
    }
    return map;
  }
  function createPatchFunction(backend) {
    var i, j;
    var cbs = {};
    var modules2 = backend.modules, nodeOps2 = backend.nodeOps;
    for (i = 0; i < hooks.length; ++i) {
      cbs[hooks[i]] = [];
      for (j = 0; j < modules2.length; ++j) {
        if (isDef(modules2[j][hooks[i]])) {
          cbs[hooks[i]].push(modules2[j][hooks[i]]);
        }
      }
    }
    function emptyNodeAt(elm) {
      return new VNode(nodeOps2.tagName(elm).toLowerCase(), {}, [], void 0, elm);
    }
    function createRmCb(childElm, listeners) {
      function remove2() {
        if (--remove2.listeners === 0) {
          removeNode(childElm);
        }
      }
      remove2.listeners = listeners;
      return remove2;
    }
    function removeNode(el) {
      var parent = nodeOps2.parentNode(el);
      if (isDef(parent)) {
        nodeOps2.removeChild(parent, el);
      }
    }
    function isUnknownElement2(vnode, inVPre) {
      return !inVPre && !vnode.ns && !(config.ignoredElements.length && config.ignoredElements.some(function(ignore) {
        return isRegExp(ignore) ? ignore.test(vnode.tag) : ignore === vnode.tag;
      })) && config.isUnknownElement(vnode.tag);
    }
    var creatingElmInVPre = 0;
    function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index2) {
      if (isDef(vnode.elm) && isDef(ownerArray)) {
        vnode = ownerArray[index2] = cloneVNode(vnode);
      }
      vnode.isRootInsert = !nested;
      if (createComponent2(vnode, insertedVnodeQueue, parentElm, refElm)) {
        return;
      }
      var data = vnode.data;
      var children = vnode.children;
      var tag = vnode.tag;
      if (isDef(tag)) {
        if (true) {
          if (data && data.pre) {
            creatingElmInVPre++;
          }
          if (isUnknownElement2(vnode, creatingElmInVPre)) {
            warn("Unknown custom element: <" + tag + '> - did you register the component correctly? For recursive components, make sure to provide the "name" option.', vnode.context);
          }
        }
        vnode.elm = vnode.ns ? nodeOps2.createElementNS(vnode.ns, tag) : nodeOps2.createElement(tag, vnode);
        setScope(vnode);
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
        if (data && data.pre) {
          creatingElmInVPre--;
        }
      } else if (isTrue(vnode.isComment)) {
        vnode.elm = nodeOps2.createComment(vnode.text);
        insert(parentElm, vnode.elm, refElm);
      } else {
        vnode.elm = nodeOps2.createTextNode(vnode.text);
        insert(parentElm, vnode.elm, refElm);
      }
    }
    function createComponent2(vnode, insertedVnodeQueue, parentElm, refElm) {
      var i2 = vnode.data;
      if (isDef(i2)) {
        var isReactivated = isDef(vnode.componentInstance) && i2.keepAlive;
        if (isDef(i2 = i2.hook) && isDef(i2 = i2.init)) {
          i2(vnode, false);
        }
        if (isDef(vnode.componentInstance)) {
          initComponent(vnode, insertedVnodeQueue);
          insert(parentElm, vnode.elm, refElm);
          if (isTrue(isReactivated)) {
            reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
          }
          return true;
        }
      }
    }
    function initComponent(vnode, insertedVnodeQueue) {
      if (isDef(vnode.data.pendingInsert)) {
        insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
        vnode.data.pendingInsert = null;
      }
      vnode.elm = vnode.componentInstance.$el;
      if (isPatchable(vnode)) {
        invokeCreateHooks(vnode, insertedVnodeQueue);
        setScope(vnode);
      } else {
        registerRef(vnode);
        insertedVnodeQueue.push(vnode);
      }
    }
    function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
      var i2;
      var innerNode = vnode;
      while (innerNode.componentInstance) {
        innerNode = innerNode.componentInstance._vnode;
        if (isDef(i2 = innerNode.data) && isDef(i2 = i2.transition)) {
          for (i2 = 0; i2 < cbs.activate.length; ++i2) {
            cbs.activate[i2](emptyNode, innerNode);
          }
          insertedVnodeQueue.push(innerNode);
          break;
        }
      }
      insert(parentElm, vnode.elm, refElm);
    }
    function insert(parent, elm, ref2) {
      if (isDef(parent)) {
        if (isDef(ref2)) {
          if (nodeOps2.parentNode(ref2) === parent) {
            nodeOps2.insertBefore(parent, elm, ref2);
          }
        } else {
          nodeOps2.appendChild(parent, elm);
        }
      }
    }
    function createChildren(vnode, children, insertedVnodeQueue) {
      if (isArray(children)) {
        if (true) {
          checkDuplicateKeys(children);
        }
        for (var i_1 = 0; i_1 < children.length; ++i_1) {
          createElm(children[i_1], insertedVnodeQueue, vnode.elm, null, true, children, i_1);
        }
      } else if (isPrimitive(vnode.text)) {
        nodeOps2.appendChild(vnode.elm, nodeOps2.createTextNode(String(vnode.text)));
      }
    }
    function isPatchable(vnode) {
      while (vnode.componentInstance) {
        vnode = vnode.componentInstance._vnode;
      }
      return isDef(vnode.tag);
    }
    function invokeCreateHooks(vnode, insertedVnodeQueue) {
      for (var i_2 = 0; i_2 < cbs.create.length; ++i_2) {
        cbs.create[i_2](emptyNode, vnode);
      }
      i = vnode.data.hook;
      if (isDef(i)) {
        if (isDef(i.create))
          i.create(emptyNode, vnode);
        if (isDef(i.insert))
          insertedVnodeQueue.push(vnode);
      }
    }
    function setScope(vnode) {
      var i2;
      if (isDef(i2 = vnode.fnScopeId)) {
        nodeOps2.setStyleScope(vnode.elm, i2);
      } else {
        var ancestor = vnode;
        while (ancestor) {
          if (isDef(i2 = ancestor.context) && isDef(i2 = i2.$options._scopeId)) {
            nodeOps2.setStyleScope(vnode.elm, i2);
          }
          ancestor = ancestor.parent;
        }
      }
      if (isDef(i2 = activeInstance) && i2 !== vnode.context && i2 !== vnode.fnContext && isDef(i2 = i2.$options._scopeId)) {
        nodeOps2.setStyleScope(vnode.elm, i2);
      }
    }
    function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
      for (; startIdx <= endIdx; ++startIdx) {
        createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
      }
    }
    function invokeDestroyHook(vnode) {
      var i2, j2;
      var data = vnode.data;
      if (isDef(data)) {
        if (isDef(i2 = data.hook) && isDef(i2 = i2.destroy))
          i2(vnode);
        for (i2 = 0; i2 < cbs.destroy.length; ++i2)
          cbs.destroy[i2](vnode);
      }
      if (isDef(i2 = vnode.children)) {
        for (j2 = 0; j2 < vnode.children.length; ++j2) {
          invokeDestroyHook(vnode.children[j2]);
        }
      }
    }
    function removeVnodes(vnodes, startIdx, endIdx) {
      for (; startIdx <= endIdx; ++startIdx) {
        var ch = vnodes[startIdx];
        if (isDef(ch)) {
          if (isDef(ch.tag)) {
            removeAndInvokeRemoveHook(ch);
            invokeDestroyHook(ch);
          } else {
            removeNode(ch.elm);
          }
        }
      }
    }
    function removeAndInvokeRemoveHook(vnode, rm) {
      if (isDef(rm) || isDef(vnode.data)) {
        var i_3;
        var listeners = cbs.remove.length + 1;
        if (isDef(rm)) {
          rm.listeners += listeners;
        } else {
          rm = createRmCb(vnode.elm, listeners);
        }
        if (isDef(i_3 = vnode.componentInstance) && isDef(i_3 = i_3._vnode) && isDef(i_3.data)) {
          removeAndInvokeRemoveHook(i_3, rm);
        }
        for (i_3 = 0; i_3 < cbs.remove.length; ++i_3) {
          cbs.remove[i_3](vnode, rm);
        }
        if (isDef(i_3 = vnode.data.hook) && isDef(i_3 = i_3.remove)) {
          i_3(vnode, rm);
        } else {
          rm();
        }
      } else {
        removeNode(vnode.elm);
      }
    }
    function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
      var oldStartIdx = 0;
      var newStartIdx = 0;
      var oldEndIdx = oldCh.length - 1;
      var oldStartVnode = oldCh[0];
      var oldEndVnode = oldCh[oldEndIdx];
      var newEndIdx = newCh.length - 1;
      var newStartVnode = newCh[0];
      var newEndVnode = newCh[newEndIdx];
      var oldKeyToIdx, idxInOld, vnodeToMove, refElm;
      var canMove = !removeOnly;
      if (true) {
        checkDuplicateKeys(newCh);
      }
      while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (isUndef(oldStartVnode)) {
          oldStartVnode = oldCh[++oldStartIdx];
        } else if (isUndef(oldEndVnode)) {
          oldEndVnode = oldCh[--oldEndIdx];
        } else if (sameVnode(oldStartVnode, newStartVnode)) {
          patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
          oldStartVnode = oldCh[++oldStartIdx];
          newStartVnode = newCh[++newStartIdx];
        } else if (sameVnode(oldEndVnode, newEndVnode)) {
          patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
          oldEndVnode = oldCh[--oldEndIdx];
          newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldStartVnode, newEndVnode)) {
          patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
          canMove && nodeOps2.insertBefore(parentElm, oldStartVnode.elm, nodeOps2.nextSibling(oldEndVnode.elm));
          oldStartVnode = oldCh[++oldStartIdx];
          newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldEndVnode, newStartVnode)) {
          patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
          canMove && nodeOps2.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
          oldEndVnode = oldCh[--oldEndIdx];
          newStartVnode = newCh[++newStartIdx];
        } else {
          if (isUndef(oldKeyToIdx))
            oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
          idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
          if (isUndef(idxInOld)) {
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          } else {
            vnodeToMove = oldCh[idxInOld];
            if (sameVnode(vnodeToMove, newStartVnode)) {
              patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
              oldCh[idxInOld] = void 0;
              canMove && nodeOps2.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
            } else {
              createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
            }
          }
          newStartVnode = newCh[++newStartIdx];
        }
      }
      if (oldStartIdx > oldEndIdx) {
        refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
        addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
      } else if (newStartIdx > newEndIdx) {
        removeVnodes(oldCh, oldStartIdx, oldEndIdx);
      }
    }
    function checkDuplicateKeys(children) {
      var seenKeys = {};
      for (var i_4 = 0; i_4 < children.length; i_4++) {
        var vnode = children[i_4];
        var key = vnode.key;
        if (isDef(key)) {
          if (seenKeys[key]) {
            warn("Duplicate keys detected: '".concat(key, "'. This may cause an update error."), vnode.context);
          } else {
            seenKeys[key] = true;
          }
        }
      }
    }
    function findIdxInOld(node, oldCh, start, end) {
      for (var i_5 = start; i_5 < end; i_5++) {
        var c = oldCh[i_5];
        if (isDef(c) && sameVnode(node, c))
          return i_5;
      }
    }
    function patchVnode(oldVnode, vnode, insertedVnodeQueue, ownerArray, index2, removeOnly) {
      if (oldVnode === vnode) {
        return;
      }
      if (isDef(vnode.elm) && isDef(ownerArray)) {
        vnode = ownerArray[index2] = cloneVNode(vnode);
      }
      var elm = vnode.elm = oldVnode.elm;
      if (isTrue(oldVnode.isAsyncPlaceholder)) {
        if (isDef(vnode.asyncFactory.resolved)) {
          hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
        } else {
          vnode.isAsyncPlaceholder = true;
        }
        return;
      }
      if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
        vnode.componentInstance = oldVnode.componentInstance;
        return;
      }
      var i2;
      var data = vnode.data;
      if (isDef(data) && isDef(i2 = data.hook) && isDef(i2 = i2.prepatch)) {
        i2(oldVnode, vnode);
      }
      var oldCh = oldVnode.children;
      var ch = vnode.children;
      if (isDef(data) && isPatchable(vnode)) {
        for (i2 = 0; i2 < cbs.update.length; ++i2)
          cbs.update[i2](oldVnode, vnode);
        if (isDef(i2 = data.hook) && isDef(i2 = i2.update))
          i2(oldVnode, vnode);
      }
      if (isUndef(vnode.text)) {
        if (isDef(oldCh) && isDef(ch)) {
          if (oldCh !== ch)
            updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
        } else if (isDef(ch)) {
          if (true) {
            checkDuplicateKeys(ch);
          }
          if (isDef(oldVnode.text))
            nodeOps2.setTextContent(elm, "");
          addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
        } else if (isDef(oldCh)) {
          removeVnodes(oldCh, 0, oldCh.length - 1);
        } else if (isDef(oldVnode.text)) {
          nodeOps2.setTextContent(elm, "");
        }
      } else if (oldVnode.text !== vnode.text) {
        nodeOps2.setTextContent(elm, vnode.text);
      }
      if (isDef(data)) {
        if (isDef(i2 = data.hook) && isDef(i2 = i2.postpatch))
          i2(oldVnode, vnode);
      }
    }
    function invokeInsertHook(vnode, queue2, initial) {
      if (isTrue(initial) && isDef(vnode.parent)) {
        vnode.parent.data.pendingInsert = queue2;
      } else {
        for (var i_6 = 0; i_6 < queue2.length; ++i_6) {
          queue2[i_6].data.hook.insert(queue2[i_6]);
        }
      }
    }
    var hydrationBailed = false;
    var isRenderedModule = makeMap("attrs,class,staticClass,staticStyle,key");
    function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
      var i2;
      var tag = vnode.tag, data = vnode.data, children = vnode.children;
      inVPre = inVPre || data && data.pre;
      vnode.elm = elm;
      if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
        vnode.isAsyncPlaceholder = true;
        return true;
      }
      if (true) {
        if (!assertNodeMatch(elm, vnode, inVPre)) {
          return false;
        }
      }
      if (isDef(data)) {
        if (isDef(i2 = data.hook) && isDef(i2 = i2.init))
          i2(vnode, true);
        if (isDef(i2 = vnode.componentInstance)) {
          initComponent(vnode, insertedVnodeQueue);
          return true;
        }
      }
      if (isDef(tag)) {
        if (isDef(children)) {
          if (!elm.hasChildNodes()) {
            createChildren(vnode, children, insertedVnodeQueue);
          } else {
            if (isDef(i2 = data) && isDef(i2 = i2.domProps) && isDef(i2 = i2.innerHTML)) {
              if (i2 !== elm.innerHTML) {
                if (typeof console !== "undefined" && !hydrationBailed) {
                  hydrationBailed = true;
                  console.warn("Parent: ", elm);
                  console.warn("server innerHTML: ", i2);
                  console.warn("client innerHTML: ", elm.innerHTML);
                }
                return false;
              }
            } else {
              var childrenMatch = true;
              var childNode = elm.firstChild;
              for (var i_7 = 0; i_7 < children.length; i_7++) {
                if (!childNode || !hydrate(childNode, children[i_7], insertedVnodeQueue, inVPre)) {
                  childrenMatch = false;
                  break;
                }
                childNode = childNode.nextSibling;
              }
              if (!childrenMatch || childNode) {
                if (typeof console !== "undefined" && !hydrationBailed) {
                  hydrationBailed = true;
                  console.warn("Parent: ", elm);
                  console.warn("Mismatching childNodes vs. VNodes: ", elm.childNodes, children);
                }
                return false;
              }
            }
          }
        }
        if (isDef(data)) {
          var fullInvoke = false;
          for (var key in data) {
            if (!isRenderedModule(key)) {
              fullInvoke = true;
              invokeCreateHooks(vnode, insertedVnodeQueue);
              break;
            }
          }
          if (!fullInvoke && data["class"]) {
            traverse(data["class"]);
          }
        }
      } else if (elm.data !== vnode.text) {
        elm.data = vnode.text;
      }
      return true;
    }
    function assertNodeMatch(node, vnode, inVPre) {
      if (isDef(vnode.tag)) {
        return vnode.tag.indexOf("vue-component") === 0 || !isUnknownElement2(vnode, inVPre) && vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase());
      } else {
        return node.nodeType === (vnode.isComment ? 8 : 3);
      }
    }
    return function patch2(oldVnode, vnode, hydrating, removeOnly) {
      if (isUndef(vnode)) {
        if (isDef(oldVnode))
          invokeDestroyHook(oldVnode);
        return;
      }
      var isInitialPatch = false;
      var insertedVnodeQueue = [];
      if (isUndef(oldVnode)) {
        isInitialPatch = true;
        createElm(vnode, insertedVnodeQueue);
      } else {
        var isRealElement = isDef(oldVnode.nodeType);
        if (!isRealElement && sameVnode(oldVnode, vnode)) {
          patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
        } else {
          if (isRealElement) {
            if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
              oldVnode.removeAttribute(SSR_ATTR);
              hydrating = true;
            }
            if (isTrue(hydrating)) {
              if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
                invokeInsertHook(vnode, insertedVnodeQueue, true);
                return oldVnode;
              } else if (true) {
                warn("The client-side rendered virtual DOM tree is not matching server-rendered content. This is likely caused by incorrect HTML markup, for example nesting block-level elements inside <p>, or missing <tbody>. Bailing hydration and performing full client-side render.");
              }
            }
            oldVnode = emptyNodeAt(oldVnode);
          }
          var oldElm = oldVnode.elm;
          var parentElm = nodeOps2.parentNode(oldElm);
          createElm(
            vnode,
            insertedVnodeQueue,
            oldElm._leaveCb ? null : parentElm,
            nodeOps2.nextSibling(oldElm)
          );
          if (isDef(vnode.parent)) {
            var ancestor = vnode.parent;
            var patchable = isPatchable(vnode);
            while (ancestor) {
              for (var i_8 = 0; i_8 < cbs.destroy.length; ++i_8) {
                cbs.destroy[i_8](ancestor);
              }
              ancestor.elm = vnode.elm;
              if (patchable) {
                for (var i_9 = 0; i_9 < cbs.create.length; ++i_9) {
                  cbs.create[i_9](emptyNode, ancestor);
                }
                var insert_1 = ancestor.data.hook.insert;
                if (insert_1.merged) {
                  for (var i_10 = 1; i_10 < insert_1.fns.length; i_10++) {
                    insert_1.fns[i_10]();
                  }
                }
              } else {
                registerRef(ancestor);
              }
              ancestor = ancestor.parent;
            }
          }
          if (isDef(parentElm)) {
            removeVnodes([oldVnode], 0, 0);
          } else if (isDef(oldVnode.tag)) {
            invokeDestroyHook(oldVnode);
          }
        }
      }
      invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
      return vnode.elm;
    };
  }
  var directives = {
    create: updateDirectives,
    update: updateDirectives,
    destroy: function unbindDirectives(vnode) {
      updateDirectives(vnode, emptyNode);
    }
  };
  function updateDirectives(oldVnode, vnode) {
    if (oldVnode.data.directives || vnode.data.directives) {
      _update(oldVnode, vnode);
    }
  }
  function _update(oldVnode, vnode) {
    var isCreate = oldVnode === emptyNode;
    var isDestroy = vnode === emptyNode;
    var oldDirs = normalizeDirectives(oldVnode.data.directives, oldVnode.context);
    var newDirs = normalizeDirectives(vnode.data.directives, vnode.context);
    var dirsWithInsert = [];
    var dirsWithPostpatch = [];
    var key, oldDir, dir;
    for (key in newDirs) {
      oldDir = oldDirs[key];
      dir = newDirs[key];
      if (!oldDir) {
        callHook(dir, "bind", vnode, oldVnode);
        if (dir.def && dir.def.inserted) {
          dirsWithInsert.push(dir);
        }
      } else {
        dir.oldValue = oldDir.value;
        dir.oldArg = oldDir.arg;
        callHook(dir, "update", vnode, oldVnode);
        if (dir.def && dir.def.componentUpdated) {
          dirsWithPostpatch.push(dir);
        }
      }
    }
    if (dirsWithInsert.length) {
      var callInsert = function() {
        for (var i = 0; i < dirsWithInsert.length; i++) {
          callHook(dirsWithInsert[i], "inserted", vnode, oldVnode);
        }
      };
      if (isCreate) {
        mergeVNodeHook(vnode, "insert", callInsert);
      } else {
        callInsert();
      }
    }
    if (dirsWithPostpatch.length) {
      mergeVNodeHook(vnode, "postpatch", function() {
        for (var i = 0; i < dirsWithPostpatch.length; i++) {
          callHook(dirsWithPostpatch[i], "componentUpdated", vnode, oldVnode);
        }
      });
    }
    if (!isCreate) {
      for (key in oldDirs) {
        if (!newDirs[key]) {
          callHook(oldDirs[key], "unbind", oldVnode, oldVnode, isDestroy);
        }
      }
    }
  }
  var emptyModifiers = /* @__PURE__ */ Object.create(null);
  function normalizeDirectives(dirs, vm) {
    var res = /* @__PURE__ */ Object.create(null);
    if (!dirs) {
      return res;
    }
    var i, dir;
    for (i = 0; i < dirs.length; i++) {
      dir = dirs[i];
      if (!dir.modifiers) {
        dir.modifiers = emptyModifiers;
      }
      res[getRawDirName(dir)] = dir;
      if (vm._setupState && vm._setupState.__sfc) {
        var setupDef = dir.def || resolveAsset(vm, "_setupState", "v-" + dir.name);
        if (typeof setupDef === "function") {
          dir.def = {
            bind: setupDef,
            update: setupDef
          };
        } else {
          dir.def = setupDef;
        }
      }
      dir.def = dir.def || resolveAsset(vm.$options, "directives", dir.name, true);
    }
    return res;
  }
  function getRawDirName(dir) {
    return dir.rawName || "".concat(dir.name, ".").concat(Object.keys(dir.modifiers || {}).join("."));
  }
  function callHook(dir, hook, vnode, oldVnode, isDestroy) {
    var fn = dir.def && dir.def[hook];
    if (fn) {
      try {
        fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
      } catch (e) {
        handleError(e, vnode.context, "directive ".concat(dir.name, " ").concat(hook, " hook"));
      }
    }
  }
  var baseModules = [ref, directives];
  function updateAttrs(oldVnode, vnode) {
    var opts = vnode.componentOptions;
    if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
      return;
    }
    if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
      return;
    }
    var key, cur, old;
    var elm = vnode.elm;
    var oldAttrs = oldVnode.data.attrs || {};
    var attrs2 = vnode.data.attrs || {};
    if (isDef(attrs2.__ob__) || isTrue(attrs2._v_attr_proxy)) {
      attrs2 = vnode.data.attrs = extend({}, attrs2);
    }
    for (key in attrs2) {
      cur = attrs2[key];
      old = oldAttrs[key];
      if (old !== cur) {
        setAttr(elm, key, cur, vnode.data.pre);
      }
    }
    if ((isIE || isEdge) && attrs2.value !== oldAttrs.value) {
      setAttr(elm, "value", attrs2.value);
    }
    for (key in oldAttrs) {
      if (isUndef(attrs2[key])) {
        if (isXlink(key)) {
          elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
        } else if (!isEnumeratedAttr(key)) {
          elm.removeAttribute(key);
        }
      }
    }
  }
  function setAttr(el, key, value, isInPre) {
    if (isInPre || el.tagName.indexOf("-") > -1) {
      baseSetAttr(el, key, value);
    } else if (isBooleanAttr(key)) {
      if (isFalsyAttrValue(value)) {
        el.removeAttribute(key);
      } else {
        value = key === "allowfullscreen" && el.tagName === "EMBED" ? "true" : key;
        el.setAttribute(key, value);
      }
    } else if (isEnumeratedAttr(key)) {
      el.setAttribute(key, convertEnumeratedValue(key, value));
    } else if (isXlink(key)) {
      if (isFalsyAttrValue(value)) {
        el.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else {
        el.setAttributeNS(xlinkNS, key, value);
      }
    } else {
      baseSetAttr(el, key, value);
    }
  }
  function baseSetAttr(el, key, value) {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      if (isIE && !isIE9 && el.tagName === "TEXTAREA" && key === "placeholder" && value !== "" && !el.__ieph) {
        var blocker_1 = function(e) {
          e.stopImmediatePropagation();
          el.removeEventListener("input", blocker_1);
        };
        el.addEventListener("input", blocker_1);
        el.__ieph = true;
      }
      el.setAttribute(key, value);
    }
  }
  var attrs = {
    create: updateAttrs,
    update: updateAttrs
  };
  function updateClass(oldVnode, vnode) {
    var el = vnode.elm;
    var data = vnode.data;
    var oldData = oldVnode.data;
    if (isUndef(data.staticClass) && isUndef(data.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class))) {
      return;
    }
    var cls = genClassForVnode(vnode);
    var transitionClass = el._transitionClasses;
    if (isDef(transitionClass)) {
      cls = concat(cls, stringifyClass(transitionClass));
    }
    if (cls !== el._prevClass) {
      el.setAttribute("class", cls);
      el._prevClass = cls;
    }
  }
  var klass = {
    create: updateClass,
    update: updateClass
  };
  var RANGE_TOKEN = "__r";
  var CHECKBOX_RADIO_TOKEN = "__c";
  function normalizeEvents(on) {
    if (isDef(on[RANGE_TOKEN])) {
      var event_1 = isIE ? "change" : "input";
      on[event_1] = [].concat(on[RANGE_TOKEN], on[event_1] || []);
      delete on[RANGE_TOKEN];
    }
    if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
      on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
      delete on[CHECKBOX_RADIO_TOKEN];
    }
  }
  var target;
  function createOnceHandler(event, handler, capture) {
    var _target = target;
    return function onceHandler() {
      var res = handler.apply(null, arguments);
      if (res !== null) {
        remove(event, onceHandler, capture, _target);
      }
    };
  }
  var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);
  function add(name, handler, capture, passive) {
    if (useMicrotaskFix) {
      var attachedTimestamp_1 = currentFlushTimestamp;
      var original_1 = handler;
      handler = original_1._wrapper = function(e) {
        if (e.target === e.currentTarget || e.timeStamp >= attachedTimestamp_1 || e.timeStamp <= 0 || e.target.ownerDocument !== document) {
          return original_1.apply(this, arguments);
        }
      };
    }
    target.addEventListener(name, handler, supportsPassive ? { capture, passive } : capture);
  }
  function remove(name, handler, capture, _target) {
    (_target || target).removeEventListener(
      name,
      handler._wrapper || handler,
      capture
    );
  }
  function updateDOMListeners(oldVnode, vnode) {
    if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
      return;
    }
    var on = vnode.data.on || {};
    var oldOn = oldVnode.data.on || {};
    target = vnode.elm || oldVnode.elm;
    normalizeEvents(on);
    updateListeners(on, oldOn, add, remove, createOnceHandler, vnode.context);
    target = void 0;
  }
  var events = {
    create: updateDOMListeners,
    update: updateDOMListeners,
    destroy: function(vnode) {
      return updateDOMListeners(vnode, emptyNode);
    }
  };
  var svgContainer;
  function updateDOMProps(oldVnode, vnode) {
    if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
      return;
    }
    var key, cur;
    var elm = vnode.elm;
    var oldProps = oldVnode.data.domProps || {};
    var props3 = vnode.data.domProps || {};
    if (isDef(props3.__ob__) || isTrue(props3._v_attr_proxy)) {
      props3 = vnode.data.domProps = extend({}, props3);
    }
    for (key in oldProps) {
      if (!(key in props3)) {
        elm[key] = "";
      }
    }
    for (key in props3) {
      cur = props3[key];
      if (key === "textContent" || key === "innerHTML") {
        if (vnode.children)
          vnode.children.length = 0;
        if (cur === oldProps[key])
          continue;
        if (elm.childNodes.length === 1) {
          elm.removeChild(elm.childNodes[0]);
        }
      }
      if (key === "value" && elm.tagName !== "PROGRESS") {
        elm._value = cur;
        var strCur = isUndef(cur) ? "" : String(cur);
        if (shouldUpdateValue(elm, strCur)) {
          elm.value = strCur;
        }
      } else if (key === "innerHTML" && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
        svgContainer = svgContainer || document.createElement("div");
        svgContainer.innerHTML = "<svg>".concat(cur, "</svg>");
        var svg = svgContainer.firstChild;
        while (elm.firstChild) {
          elm.removeChild(elm.firstChild);
        }
        while (svg.firstChild) {
          elm.appendChild(svg.firstChild);
        }
      } else if (cur !== oldProps[key]) {
        try {
          elm[key] = cur;
        } catch (e) {
        }
      }
    }
  }
  function shouldUpdateValue(elm, checkVal) {
    return !elm.composing && (elm.tagName === "OPTION" || isNotInFocusAndDirty(elm, checkVal) || isDirtyWithModifiers(elm, checkVal));
  }
  function isNotInFocusAndDirty(elm, checkVal) {
    var notInFocus = true;
    try {
      notInFocus = document.activeElement !== elm;
    } catch (e) {
    }
    return notInFocus && elm.value !== checkVal;
  }
  function isDirtyWithModifiers(elm, newVal) {
    var value = elm.value;
    var modifiers = elm._vModifiers;
    if (isDef(modifiers)) {
      if (modifiers.number) {
        return toNumber(value) !== toNumber(newVal);
      }
      if (modifiers.trim) {
        return value.trim() !== newVal.trim();
      }
    }
    return value !== newVal;
  }
  var domProps = {
    create: updateDOMProps,
    update: updateDOMProps
  };
  var parseStyleText = cached(function(cssText) {
    var res = {};
    var listDelimiter = /;(?![^(]*\))/g;
    var propertyDelimiter = /:(.+)/;
    cssText.split(listDelimiter).forEach(function(item) {
      if (item) {
        var tmp = item.split(propertyDelimiter);
        tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
      }
    });
    return res;
  });
  function normalizeStyleData(data) {
    var style2 = normalizeStyleBinding(data.style);
    return data.staticStyle ? extend(data.staticStyle, style2) : style2;
  }
  function normalizeStyleBinding(bindingStyle) {
    if (Array.isArray(bindingStyle)) {
      return toObject(bindingStyle);
    }
    if (typeof bindingStyle === "string") {
      return parseStyleText(bindingStyle);
    }
    return bindingStyle;
  }
  function getStyle(vnode, checkChild) {
    var res = {};
    var styleData;
    if (checkChild) {
      var childNode = vnode;
      while (childNode.componentInstance) {
        childNode = childNode.componentInstance._vnode;
        if (childNode && childNode.data && (styleData = normalizeStyleData(childNode.data))) {
          extend(res, styleData);
        }
      }
    }
    if (styleData = normalizeStyleData(vnode.data)) {
      extend(res, styleData);
    }
    var parentNode2 = vnode;
    while (parentNode2 = parentNode2.parent) {
      if (parentNode2.data && (styleData = normalizeStyleData(parentNode2.data))) {
        extend(res, styleData);
      }
    }
    return res;
  }
  var cssVarRE = /^--/;
  var importantRE = /\s*!important$/;
  var setProp = function(el, name, val) {
    if (cssVarRE.test(name)) {
      el.style.setProperty(name, val);
    } else if (importantRE.test(val)) {
      el.style.setProperty(hyphenate(name), val.replace(importantRE, ""), "important");
    } else {
      var normalizedName = normalize(name);
      if (Array.isArray(val)) {
        for (var i = 0, len = val.length; i < len; i++) {
          el.style[normalizedName] = val[i];
        }
      } else {
        el.style[normalizedName] = val;
      }
    }
  };
  var vendorNames = ["Webkit", "Moz", "ms"];
  var emptyStyle;
  var normalize = cached(function(prop) {
    emptyStyle = emptyStyle || document.createElement("div").style;
    prop = camelize(prop);
    if (prop !== "filter" && prop in emptyStyle) {
      return prop;
    }
    var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
    for (var i = 0; i < vendorNames.length; i++) {
      var name_1 = vendorNames[i] + capName;
      if (name_1 in emptyStyle) {
        return name_1;
      }
    }
  });
  function updateStyle(oldVnode, vnode) {
    var data = vnode.data;
    var oldData = oldVnode.data;
    if (isUndef(data.staticStyle) && isUndef(data.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
      return;
    }
    var cur, name;
    var el = vnode.elm;
    var oldStaticStyle = oldData.staticStyle;
    var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};
    var oldStyle = oldStaticStyle || oldStyleBinding;
    var style2 = normalizeStyleBinding(vnode.data.style) || {};
    vnode.data.normalizedStyle = isDef(style2.__ob__) ? extend({}, style2) : style2;
    var newStyle = getStyle(vnode, true);
    for (name in oldStyle) {
      if (isUndef(newStyle[name])) {
        setProp(el, name, "");
      }
    }
    for (name in newStyle) {
      cur = newStyle[name];
      if (cur !== oldStyle[name]) {
        setProp(el, name, cur == null ? "" : cur);
      }
    }
  }
  var style = {
    create: updateStyle,
    update: updateStyle
  };
  var whitespaceRE = /\s+/;
  function addClass(el, cls) {
    if (!cls || !(cls = cls.trim())) {
      return;
    }
    if (el.classList) {
      if (cls.indexOf(" ") > -1) {
        cls.split(whitespaceRE).forEach(function(c) {
          return el.classList.add(c);
        });
      } else {
        el.classList.add(cls);
      }
    } else {
      var cur = " ".concat(el.getAttribute("class") || "", " ");
      if (cur.indexOf(" " + cls + " ") < 0) {
        el.setAttribute("class", (cur + cls).trim());
      }
    }
  }
  function removeClass(el, cls) {
    if (!cls || !(cls = cls.trim())) {
      return;
    }
    if (el.classList) {
      if (cls.indexOf(" ") > -1) {
        cls.split(whitespaceRE).forEach(function(c) {
          return el.classList.remove(c);
        });
      } else {
        el.classList.remove(cls);
      }
      if (!el.classList.length) {
        el.removeAttribute("class");
      }
    } else {
      var cur = " ".concat(el.getAttribute("class") || "", " ");
      var tar = " " + cls + " ";
      while (cur.indexOf(tar) >= 0) {
        cur = cur.replace(tar, " ");
      }
      cur = cur.trim();
      if (cur) {
        el.setAttribute("class", cur);
      } else {
        el.removeAttribute("class");
      }
    }
  }
  function resolveTransition(def2) {
    if (!def2) {
      return;
    }
    if (typeof def2 === "object") {
      var res = {};
      if (def2.css !== false) {
        extend(res, autoCssTransition(def2.name || "v"));
      }
      extend(res, def2);
      return res;
    } else if (typeof def2 === "string") {
      return autoCssTransition(def2);
    }
  }
  var autoCssTransition = cached(function(name) {
    return {
      enterClass: "".concat(name, "-enter"),
      enterToClass: "".concat(name, "-enter-to"),
      enterActiveClass: "".concat(name, "-enter-active"),
      leaveClass: "".concat(name, "-leave"),
      leaveToClass: "".concat(name, "-leave-to"),
      leaveActiveClass: "".concat(name, "-leave-active")
    };
  });
  var hasTransition = inBrowser && !isIE9;
  var TRANSITION = "transition";
  var ANIMATION = "animation";
  var transitionProp = "transition";
  var transitionEndEvent = "transitionend";
  var animationProp = "animation";
  var animationEndEvent = "animationend";
  if (hasTransition) {
    if (window.ontransitionend === void 0 && window.onwebkittransitionend !== void 0) {
      transitionProp = "WebkitTransition";
      transitionEndEvent = "webkitTransitionEnd";
    }
    if (window.onanimationend === void 0 && window.onwebkitanimationend !== void 0) {
      animationProp = "WebkitAnimation";
      animationEndEvent = "webkitAnimationEnd";
    }
  }
  var raf = inBrowser ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout : function(fn) {
    return fn();
  };
  function nextFrame(fn) {
    raf(function() {
      raf(fn);
    });
  }
  function addTransitionClass(el, cls) {
    var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
    if (transitionClasses.indexOf(cls) < 0) {
      transitionClasses.push(cls);
      addClass(el, cls);
    }
  }
  function removeTransitionClass(el, cls) {
    if (el._transitionClasses) {
      remove$2(el._transitionClasses, cls);
    }
    removeClass(el, cls);
  }
  function whenTransitionEnds(el, expectedType, cb) {
    var _a = getTransitionInfo(el, expectedType), type2 = _a.type, timeout = _a.timeout, propCount = _a.propCount;
    if (!type2)
      return cb();
    var event = type2 === TRANSITION ? transitionEndEvent : animationEndEvent;
    var ended = 0;
    var end = function() {
      el.removeEventListener(event, onEnd);
      cb();
    };
    var onEnd = function(e) {
      if (e.target === el) {
        if (++ended >= propCount) {
          end();
        }
      }
    };
    setTimeout(function() {
      if (ended < propCount) {
        end();
      }
    }, timeout + 1);
    el.addEventListener(event, onEnd);
  }
  var transformRE = /\b(transform|all)(,|$)/;
  function getTransitionInfo(el, expectedType) {
    var styles = window.getComputedStyle(el);
    var transitionDelays = (styles[transitionProp + "Delay"] || "").split(", ");
    var transitionDurations = (styles[transitionProp + "Duration"] || "").split(", ");
    var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
    var animationDelays = (styles[animationProp + "Delay"] || "").split(", ");
    var animationDurations = (styles[animationProp + "Duration"] || "").split(", ");
    var animationTimeout = getTimeout(animationDelays, animationDurations);
    var type2;
    var timeout = 0;
    var propCount = 0;
    if (expectedType === TRANSITION) {
      if (transitionTimeout > 0) {
        type2 = TRANSITION;
        timeout = transitionTimeout;
        propCount = transitionDurations.length;
      }
    } else if (expectedType === ANIMATION) {
      if (animationTimeout > 0) {
        type2 = ANIMATION;
        timeout = animationTimeout;
        propCount = animationDurations.length;
      }
    } else {
      timeout = Math.max(transitionTimeout, animationTimeout);
      type2 = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
      propCount = type2 ? type2 === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
    }
    var hasTransform = type2 === TRANSITION && transformRE.test(styles[transitionProp + "Property"]);
    return {
      type: type2,
      timeout,
      propCount,
      hasTransform
    };
  }
  function getTimeout(delays, durations) {
    while (delays.length < durations.length) {
      delays = delays.concat(delays);
    }
    return Math.max.apply(null, durations.map(function(d, i) {
      return toMs(d) + toMs(delays[i]);
    }));
  }
  function toMs(s) {
    return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
  }
  function enter(vnode, toggleDisplay) {
    var el = vnode.elm;
    if (isDef(el._leaveCb)) {
      el._leaveCb.cancelled = true;
      el._leaveCb();
    }
    var data = resolveTransition(vnode.data.transition);
    if (isUndef(data)) {
      return;
    }
    if (isDef(el._enterCb) || el.nodeType !== 1) {
      return;
    }
    var css = data.css, type2 = data.type, enterClass = data.enterClass, enterToClass = data.enterToClass, enterActiveClass = data.enterActiveClass, appearClass = data.appearClass, appearToClass = data.appearToClass, appearActiveClass = data.appearActiveClass, beforeEnter = data.beforeEnter, enter2 = data.enter, afterEnter = data.afterEnter, enterCancelled = data.enterCancelled, beforeAppear = data.beforeAppear, appear = data.appear, afterAppear = data.afterAppear, appearCancelled = data.appearCancelled, duration = data.duration;
    var context = activeInstance;
    var transitionNode = activeInstance.$vnode;
    while (transitionNode && transitionNode.parent) {
      context = transitionNode.context;
      transitionNode = transitionNode.parent;
    }
    var isAppear = !context._isMounted || !vnode.isRootInsert;
    if (isAppear && !appear && appear !== "") {
      return;
    }
    var startClass = isAppear && appearClass ? appearClass : enterClass;
    var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
    var toClass = isAppear && appearToClass ? appearToClass : enterToClass;
    var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
    var enterHook = isAppear ? isFunction(appear) ? appear : enter2 : enter2;
    var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
    var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;
    var explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);
    if (explicitEnterDuration != null) {
      checkDuration(explicitEnterDuration, "enter", vnode);
    }
    var expectsCSS = css !== false && !isIE9;
    var userWantsControl = getHookArgumentsLength(enterHook);
    var cb = el._enterCb = once(function() {
      if (expectsCSS) {
        removeTransitionClass(el, toClass);
        removeTransitionClass(el, activeClass);
      }
      if (cb.cancelled) {
        if (expectsCSS) {
          removeTransitionClass(el, startClass);
        }
        enterCancelledHook && enterCancelledHook(el);
      } else {
        afterEnterHook && afterEnterHook(el);
      }
      el._enterCb = null;
    });
    if (!vnode.data.show) {
      mergeVNodeHook(vnode, "insert", function() {
        var parent = el.parentNode;
        var pendingNode = parent && parent._pending && parent._pending[vnode.key];
        if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
          pendingNode.elm._leaveCb();
        }
        enterHook && enterHook(el, cb);
      });
    }
    beforeEnterHook && beforeEnterHook(el);
    if (expectsCSS) {
      addTransitionClass(el, startClass);
      addTransitionClass(el, activeClass);
      nextFrame(function() {
        removeTransitionClass(el, startClass);
        if (!cb.cancelled) {
          addTransitionClass(el, toClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitEnterDuration)) {
              setTimeout(cb, explicitEnterDuration);
            } else {
              whenTransitionEnds(el, type2, cb);
            }
          }
        }
      });
    }
    if (vnode.data.show) {
      toggleDisplay && toggleDisplay();
      enterHook && enterHook(el, cb);
    }
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
  function leave(vnode, rm) {
    var el = vnode.elm;
    if (isDef(el._enterCb)) {
      el._enterCb.cancelled = true;
      el._enterCb();
    }
    var data = resolveTransition(vnode.data.transition);
    if (isUndef(data) || el.nodeType !== 1) {
      return rm();
    }
    if (isDef(el._leaveCb)) {
      return;
    }
    var css = data.css, type2 = data.type, leaveClass = data.leaveClass, leaveToClass = data.leaveToClass, leaveActiveClass = data.leaveActiveClass, beforeLeave = data.beforeLeave, leave2 = data.leave, afterLeave = data.afterLeave, leaveCancelled = data.leaveCancelled, delayLeave = data.delayLeave, duration = data.duration;
    var expectsCSS = css !== false && !isIE9;
    var userWantsControl = getHookArgumentsLength(leave2);
    var explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);
    if (isDef(explicitLeaveDuration)) {
      checkDuration(explicitLeaveDuration, "leave", vnode);
    }
    var cb = el._leaveCb = once(function() {
      if (el.parentNode && el.parentNode._pending) {
        el.parentNode._pending[vnode.key] = null;
      }
      if (expectsCSS) {
        removeTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveActiveClass);
      }
      if (cb.cancelled) {
        if (expectsCSS) {
          removeTransitionClass(el, leaveClass);
        }
        leaveCancelled && leaveCancelled(el);
      } else {
        rm();
        afterLeave && afterLeave(el);
      }
      el._leaveCb = null;
    });
    if (delayLeave) {
      delayLeave(performLeave);
    } else {
      performLeave();
    }
    function performLeave() {
      if (cb.cancelled) {
        return;
      }
      if (!vnode.data.show && el.parentNode) {
        (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
      }
      beforeLeave && beforeLeave(el);
      if (expectsCSS) {
        addTransitionClass(el, leaveClass);
        addTransitionClass(el, leaveActiveClass);
        nextFrame(function() {
          removeTransitionClass(el, leaveClass);
          if (!cb.cancelled) {
            addTransitionClass(el, leaveToClass);
            if (!userWantsControl) {
              if (isValidDuration(explicitLeaveDuration)) {
                setTimeout(cb, explicitLeaveDuration);
              } else {
                whenTransitionEnds(el, type2, cb);
              }
            }
          }
        });
      }
      leave2 && leave2(el, cb);
      if (!expectsCSS && !userWantsControl) {
        cb();
      }
    }
  }
  function checkDuration(val, name, vnode) {
    if (typeof val !== "number") {
      warn("<transition> explicit ".concat(name, " duration is not a valid number - ") + "got ".concat(JSON.stringify(val), "."), vnode.context);
    } else if (isNaN(val)) {
      warn("<transition> explicit ".concat(name, " duration is NaN - ") + "the duration expression might be incorrect.", vnode.context);
    }
  }
  function isValidDuration(val) {
    return typeof val === "number" && !isNaN(val);
  }
  function getHookArgumentsLength(fn) {
    if (isUndef(fn)) {
      return false;
    }
    var invokerFns = fn.fns;
    if (isDef(invokerFns)) {
      return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
    } else {
      return (fn._length || fn.length) > 1;
    }
  }
  function _enter(_, vnode) {
    if (vnode.data.show !== true) {
      enter(vnode);
    }
  }
  var transition = inBrowser ? {
    create: _enter,
    activate: _enter,
    remove: function(vnode, rm) {
      if (vnode.data.show !== true) {
        leave(vnode, rm);
      } else {
        rm();
      }
    }
  } : {};
  var platformModules = [attrs, klass, events, domProps, style, transition];
  var modules = platformModules.concat(baseModules);
  var patch = createPatchFunction({ nodeOps, modules });
  if (isIE9) {
    document.addEventListener("selectionchange", function() {
      var el = document.activeElement;
      if (el && el.vmodel) {
        trigger(el, "input");
      }
    });
  }
  var directive = {
    inserted: function(el, binding, vnode, oldVnode) {
      if (vnode.tag === "select") {
        if (oldVnode.elm && !oldVnode.elm._vOptions) {
          mergeVNodeHook(vnode, "postpatch", function() {
            directive.componentUpdated(el, binding, vnode);
          });
        } else {
          setSelected(el, binding, vnode.context);
        }
        el._vOptions = [].map.call(el.options, getValue);
      } else if (vnode.tag === "textarea" || isTextInputType(el.type)) {
        el._vModifiers = binding.modifiers;
        if (!binding.modifiers.lazy) {
          el.addEventListener("compositionstart", onCompositionStart);
          el.addEventListener("compositionend", onCompositionEnd);
          el.addEventListener("change", onCompositionEnd);
          if (isIE9) {
            el.vmodel = true;
          }
        }
      }
    },
    componentUpdated: function(el, binding, vnode) {
      if (vnode.tag === "select") {
        setSelected(el, binding, vnode.context);
        var prevOptions_1 = el._vOptions;
        var curOptions_1 = el._vOptions = [].map.call(el.options, getValue);
        if (curOptions_1.some(function(o, i) {
          return !looseEqual(o, prevOptions_1[i]);
        })) {
          var needReset = el.multiple ? binding.value.some(function(v) {
            return hasNoMatchingOption(v, curOptions_1);
          }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions_1);
          if (needReset) {
            trigger(el, "change");
          }
        }
      }
    }
  };
  function setSelected(el, binding, vm) {
    actuallySetSelected(el, binding, vm);
    if (isIE || isEdge) {
      setTimeout(function() {
        actuallySetSelected(el, binding, vm);
      }, 0);
    }
  }
  function actuallySetSelected(el, binding, vm) {
    var value = binding.value;
    var isMultiple = el.multiple;
    if (isMultiple && !Array.isArray(value)) {
      warn('<select multiple v-model="'.concat(binding.expression, '"> ') + "expects an Array value for its binding, but got ".concat(Object.prototype.toString.call(value).slice(8, -1)), vm);
      return;
    }
    var selected, option;
    for (var i = 0, l = el.options.length; i < l; i++) {
      option = el.options[i];
      if (isMultiple) {
        selected = looseIndexOf(value, getValue(option)) > -1;
        if (option.selected !== selected) {
          option.selected = selected;
        }
      } else {
        if (looseEqual(getValue(option), value)) {
          if (el.selectedIndex !== i) {
            el.selectedIndex = i;
          }
          return;
        }
      }
    }
    if (!isMultiple) {
      el.selectedIndex = -1;
    }
  }
  function hasNoMatchingOption(value, options) {
    return options.every(function(o) {
      return !looseEqual(o, value);
    });
  }
  function getValue(option) {
    return "_value" in option ? option._value : option.value;
  }
  function onCompositionStart(e) {
    e.target.composing = true;
  }
  function onCompositionEnd(e) {
    if (!e.target.composing)
      return;
    e.target.composing = false;
    trigger(e.target, "input");
  }
  function trigger(el, type2) {
    var e = document.createEvent("HTMLEvents");
    e.initEvent(type2, true, true);
    el.dispatchEvent(e);
  }
  function locateNode(vnode) {
    return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
  }
  var show = {
    bind: function(el, _a, vnode) {
      var value = _a.value;
      vnode = locateNode(vnode);
      var transition2 = vnode.data && vnode.data.transition;
      var originalDisplay = el.__vOriginalDisplay = el.style.display === "none" ? "" : el.style.display;
      if (value && transition2) {
        vnode.data.show = true;
        enter(vnode, function() {
          el.style.display = originalDisplay;
        });
      } else {
        el.style.display = value ? originalDisplay : "none";
      }
    },
    update: function(el, _a, vnode) {
      var value = _a.value, oldValue = _a.oldValue;
      if (!value === !oldValue)
        return;
      vnode = locateNode(vnode);
      var transition2 = vnode.data && vnode.data.transition;
      if (transition2) {
        vnode.data.show = true;
        if (value) {
          enter(vnode, function() {
            el.style.display = el.__vOriginalDisplay;
          });
        } else {
          leave(vnode, function() {
            el.style.display = "none";
          });
        }
      } else {
        el.style.display = value ? el.__vOriginalDisplay : "none";
      }
    },
    unbind: function(el, binding, vnode, oldVnode, isDestroy) {
      if (!isDestroy) {
        el.style.display = el.__vOriginalDisplay;
      }
    }
  };
  var platformDirectives = {
    model: directive,
    show
  };
  var transitionProps = {
    name: String,
    appear: Boolean,
    css: Boolean,
    mode: String,
    type: String,
    enterClass: String,
    leaveClass: String,
    enterToClass: String,
    leaveToClass: String,
    enterActiveClass: String,
    leaveActiveClass: String,
    appearClass: String,
    appearActiveClass: String,
    appearToClass: String,
    duration: [Number, String, Object]
  };
  function getRealChild(vnode) {
    var compOptions = vnode && vnode.componentOptions;
    if (compOptions && compOptions.Ctor.options.abstract) {
      return getRealChild(getFirstComponentChild(compOptions.children));
    } else {
      return vnode;
    }
  }
  function extractTransitionData(comp) {
    var data = {};
    var options = comp.$options;
    for (var key in options.propsData) {
      data[key] = comp[key];
    }
    var listeners = options._parentListeners;
    for (var key in listeners) {
      data[camelize(key)] = listeners[key];
    }
    return data;
  }
  function placeholder(h, rawChild) {
    if (/\d-keep-alive$/.test(rawChild.tag)) {
      return h("keep-alive", {
        props: rawChild.componentOptions.propsData
      });
    }
  }
  function hasParentTransition(vnode) {
    while (vnode = vnode.parent) {
      if (vnode.data.transition) {
        return true;
      }
    }
  }
  function isSameChild(child, oldChild) {
    return oldChild.key === child.key && oldChild.tag === child.tag;
  }
  var isNotTextNode = function(c) {
    return c.tag || isAsyncPlaceholder(c);
  };
  var isVShowDirective = function(d) {
    return d.name === "show";
  };
  var Transition = {
    name: "transition",
    props: transitionProps,
    abstract: true,
    render: function(h) {
      var _this = this;
      var children = this.$slots.default;
      if (!children) {
        return;
      }
      children = children.filter(isNotTextNode);
      if (!children.length) {
        return;
      }
      if (children.length > 1) {
        warn("<transition> can only be used on a single element. Use <transition-group> for lists.", this.$parent);
      }
      var mode = this.mode;
      if (mode && mode !== "in-out" && mode !== "out-in") {
        warn("invalid <transition> mode: " + mode, this.$parent);
      }
      var rawChild = children[0];
      if (hasParentTransition(this.$vnode)) {
        return rawChild;
      }
      var child = getRealChild(rawChild);
      if (!child) {
        return rawChild;
      }
      if (this._leaving) {
        return placeholder(h, rawChild);
      }
      var id = "__transition-".concat(this._uid, "-");
      child.key = child.key == null ? child.isComment ? id + "comment" : id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;
      var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
      var oldRawChild = this._vnode;
      var oldChild = getRealChild(oldRawChild);
      if (child.data.directives && child.data.directives.some(isVShowDirective)) {
        child.data.show = true;
      }
      if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild) && !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)) {
        var oldData = oldChild.data.transition = extend({}, data);
        if (mode === "out-in") {
          this._leaving = true;
          mergeVNodeHook(oldData, "afterLeave", function() {
            _this._leaving = false;
            _this.$forceUpdate();
          });
          return placeholder(h, rawChild);
        } else if (mode === "in-out") {
          if (isAsyncPlaceholder(child)) {
            return oldRawChild;
          }
          var delayedLeave_1;
          var performLeave = function() {
            delayedLeave_1();
          };
          mergeVNodeHook(data, "afterEnter", performLeave);
          mergeVNodeHook(data, "enterCancelled", performLeave);
          mergeVNodeHook(oldData, "delayLeave", function(leave2) {
            delayedLeave_1 = leave2;
          });
        }
      }
      return rawChild;
    }
  };
  var props = extend({
    tag: String,
    moveClass: String
  }, transitionProps);
  delete props.mode;
  var TransitionGroup = {
    props,
    beforeMount: function() {
      var _this = this;
      var update = this._update;
      this._update = function(vnode, hydrating) {
        var restoreActiveInstance = setActiveInstance(_this);
        _this.__patch__(
          _this._vnode,
          _this.kept,
          false,
          true
        );
        _this._vnode = _this.kept;
        restoreActiveInstance();
        update.call(_this, vnode, hydrating);
      };
    },
    render: function(h) {
      var tag = this.tag || this.$vnode.data.tag || "span";
      var map = /* @__PURE__ */ Object.create(null);
      var prevChildren = this.prevChildren = this.children;
      var rawChildren = this.$slots.default || [];
      var children = this.children = [];
      var transitionData = extractTransitionData(this);
      for (var i = 0; i < rawChildren.length; i++) {
        var c = rawChildren[i];
        if (c.tag) {
          if (c.key != null && String(c.key).indexOf("__vlist") !== 0) {
            children.push(c);
            map[c.key] = c;
            (c.data || (c.data = {})).transition = transitionData;
          } else if (true) {
            var opts = c.componentOptions;
            var name_1 = opts ? getComponentName(opts.Ctor.options) || opts.tag || "" : c.tag;
            warn("<transition-group> children must be keyed: <".concat(name_1, ">"));
          }
        }
      }
      if (prevChildren) {
        var kept = [];
        var removed = [];
        for (var i = 0; i < prevChildren.length; i++) {
          var c = prevChildren[i];
          c.data.transition = transitionData;
          c.data.pos = c.elm.getBoundingClientRect();
          if (map[c.key]) {
            kept.push(c);
          } else {
            removed.push(c);
          }
        }
        this.kept = h(tag, null, kept);
        this.removed = removed;
      }
      return h(tag, null, children);
    },
    updated: function() {
      var children = this.prevChildren;
      var moveClass = this.moveClass || (this.name || "v") + "-move";
      if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
        return;
      }
      children.forEach(callPendingCbs);
      children.forEach(recordPosition);
      children.forEach(applyTranslation);
      this._reflow = document.body.offsetHeight;
      children.forEach(function(c) {
        if (c.data.moved) {
          var el_1 = c.elm;
          var s = el_1.style;
          addTransitionClass(el_1, moveClass);
          s.transform = s.WebkitTransform = s.transitionDuration = "";
          el_1.addEventListener(transitionEndEvent, el_1._moveCb = function cb(e) {
            if (e && e.target !== el_1) {
              return;
            }
            if (!e || /transform$/.test(e.propertyName)) {
              el_1.removeEventListener(transitionEndEvent, cb);
              el_1._moveCb = null;
              removeTransitionClass(el_1, moveClass);
            }
          });
        }
      });
    },
    methods: {
      hasMove: function(el, moveClass) {
        if (!hasTransition) {
          return false;
        }
        if (this._hasMove) {
          return this._hasMove;
        }
        var clone2 = el.cloneNode();
        if (el._transitionClasses) {
          el._transitionClasses.forEach(function(cls) {
            removeClass(clone2, cls);
          });
        }
        addClass(clone2, moveClass);
        clone2.style.display = "none";
        this.$el.appendChild(clone2);
        var info = getTransitionInfo(clone2);
        this.$el.removeChild(clone2);
        return this._hasMove = info.hasTransform;
      }
    }
  };
  function callPendingCbs(c) {
    if (c.elm._moveCb) {
      c.elm._moveCb();
    }
    if (c.elm._enterCb) {
      c.elm._enterCb();
    }
  }
  function recordPosition(c) {
    c.data.newPos = c.elm.getBoundingClientRect();
  }
  function applyTranslation(c) {
    var oldPos = c.data.pos;
    var newPos = c.data.newPos;
    var dx = oldPos.left - newPos.left;
    var dy = oldPos.top - newPos.top;
    if (dx || dy) {
      c.data.moved = true;
      var s = c.elm.style;
      s.transform = s.WebkitTransform = "translate(".concat(dx, "px,").concat(dy, "px)");
      s.transitionDuration = "0s";
    }
  }
  var platformComponents = {
    Transition,
    TransitionGroup
  };
  Vue.config.mustUseProp = mustUseProp;
  Vue.config.isReservedTag = isReservedTag;
  Vue.config.isReservedAttr = isReservedAttr;
  Vue.config.getTagNamespace = getTagNamespace;
  Vue.config.isUnknownElement = isUnknownElement;
  extend(Vue.options.directives, platformDirectives);
  extend(Vue.options.components, platformComponents);
  Vue.prototype.__patch__ = inBrowser ? patch : noop;
  Vue.prototype.$mount = function(el, hydrating) {
    el = el && inBrowser ? query(el) : void 0;
    return mountComponent(this, el, hydrating);
  };
  if (inBrowser) {
    setTimeout(function() {
      if (config.devtools) {
        if (devtools) {
          devtools.emit("init", Vue);
        } else if (true) {
          console[console.info ? "info" : "log"]("Download the Vue Devtools extension for a better development experience:\nhttps://github.com/vuejs/vue-devtools");
        }
      }
      if (config.productionTip !== false && typeof console !== "undefined") {
        console[console.info ? "info" : "log"]("You are running Vue in development mode.\nMake sure to turn on production mode when deploying for production.\nSee more tips at https://vuejs.org/guide/deployment.html");
      }
    }, 0);
  }

  // node_modules/vue-router/dist/vue-router.esm.js
  function assert(condition, message) {
    if (!condition) {
      throw new Error("[vue-router] " + message);
    }
  }
  function warn2(condition, message) {
    if (!condition) {
      typeof console !== "undefined" && console.warn("[vue-router] " + message);
    }
  }
  function extend2(a, b) {
    for (var key in b) {
      a[key] = b[key];
    }
    return a;
  }
  var encodeReserveRE = /[!'()*]/g;
  var encodeReserveReplacer = function(c) {
    return "%" + c.charCodeAt(0).toString(16);
  };
  var commaRE = /%2C/g;
  var encode = function(str) {
    return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ",");
  };
  function decode(str) {
    try {
      return decodeURIComponent(str);
    } catch (err) {
      if (true) {
        warn2(false, 'Error decoding "' + str + '". Leaving it intact.');
      }
    }
    return str;
  }
  function resolveQuery(query2, extraQuery, _parseQuery) {
    if (extraQuery === void 0)
      extraQuery = {};
    var parse2 = _parseQuery || parseQuery;
    var parsedQuery;
    try {
      parsedQuery = parse2(query2 || "");
    } catch (e) {
      warn2(false, e.message);
      parsedQuery = {};
    }
    for (var key in extraQuery) {
      var value = extraQuery[key];
      parsedQuery[key] = Array.isArray(value) ? value.map(castQueryParamValue) : castQueryParamValue(value);
    }
    return parsedQuery;
  }
  var castQueryParamValue = function(value) {
    return value == null || typeof value === "object" ? value : String(value);
  };
  function parseQuery(query2) {
    var res = {};
    query2 = query2.trim().replace(/^(\?|#|&)/, "");
    if (!query2) {
      return res;
    }
    query2.split("&").forEach(function(param) {
      var parts = param.replace(/\+/g, " ").split("=");
      var key = decode(parts.shift());
      var val = parts.length > 0 ? decode(parts.join("=")) : null;
      if (res[key] === void 0) {
        res[key] = val;
      } else if (Array.isArray(res[key])) {
        res[key].push(val);
      } else {
        res[key] = [res[key], val];
      }
    });
    return res;
  }
  function stringifyQuery(obj) {
    var res = obj ? Object.keys(obj).map(function(key) {
      var val = obj[key];
      if (val === void 0) {
        return "";
      }
      if (val === null) {
        return encode(key);
      }
      if (Array.isArray(val)) {
        var result = [];
        val.forEach(function(val2) {
          if (val2 === void 0) {
            return;
          }
          if (val2 === null) {
            result.push(encode(key));
          } else {
            result.push(encode(key) + "=" + encode(val2));
          }
        });
        return result.join("&");
      }
      return encode(key) + "=" + encode(val);
    }).filter(function(x) {
      return x.length > 0;
    }).join("&") : null;
    return res ? "?" + res : "";
  }
  var trailingSlashRE = /\/?$/;
  function createRoute(record, location2, redirectedFrom, router2) {
    var stringifyQuery2 = router2 && router2.options.stringifyQuery;
    var query2 = location2.query || {};
    try {
      query2 = clone(query2);
    } catch (e) {
    }
    var route = {
      name: location2.name || record && record.name,
      meta: record && record.meta || {},
      path: location2.path || "/",
      hash: location2.hash || "",
      query: query2,
      params: location2.params || {},
      fullPath: getFullPath(location2, stringifyQuery2),
      matched: record ? formatMatch(record) : []
    };
    if (redirectedFrom) {
      route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery2);
    }
    return Object.freeze(route);
  }
  function clone(value) {
    if (Array.isArray(value)) {
      return value.map(clone);
    } else if (value && typeof value === "object") {
      var res = {};
      for (var key in value) {
        res[key] = clone(value[key]);
      }
      return res;
    } else {
      return value;
    }
  }
  var START = createRoute(null, {
    path: "/"
  });
  function formatMatch(record) {
    var res = [];
    while (record) {
      res.unshift(record);
      record = record.parent;
    }
    return res;
  }
  function getFullPath(ref2, _stringifyQuery) {
    var path = ref2.path;
    var query2 = ref2.query;
    if (query2 === void 0)
      query2 = {};
    var hash = ref2.hash;
    if (hash === void 0)
      hash = "";
    var stringify = _stringifyQuery || stringifyQuery;
    return (path || "/") + stringify(query2) + hash;
  }
  function isSameRoute(a, b, onlyPath) {
    if (b === START) {
      return a === b;
    } else if (!b) {
      return false;
    } else if (a.path && b.path) {
      return a.path.replace(trailingSlashRE, "") === b.path.replace(trailingSlashRE, "") && (onlyPath || a.hash === b.hash && isObjectEqual(a.query, b.query));
    } else if (a.name && b.name) {
      return a.name === b.name && (onlyPath || a.hash === b.hash && isObjectEqual(a.query, b.query) && isObjectEqual(a.params, b.params));
    } else {
      return false;
    }
  }
  function isObjectEqual(a, b) {
    if (a === void 0)
      a = {};
    if (b === void 0)
      b = {};
    if (!a || !b) {
      return a === b;
    }
    var aKeys = Object.keys(a).sort();
    var bKeys = Object.keys(b).sort();
    if (aKeys.length !== bKeys.length) {
      return false;
    }
    return aKeys.every(function(key, i) {
      var aVal = a[key];
      var bKey = bKeys[i];
      if (bKey !== key) {
        return false;
      }
      var bVal = b[key];
      if (aVal == null || bVal == null) {
        return aVal === bVal;
      }
      if (typeof aVal === "object" && typeof bVal === "object") {
        return isObjectEqual(aVal, bVal);
      }
      return String(aVal) === String(bVal);
    });
  }
  function isIncludedRoute(current, target2) {
    return current.path.replace(trailingSlashRE, "/").indexOf(
      target2.path.replace(trailingSlashRE, "/")
    ) === 0 && (!target2.hash || current.hash === target2.hash) && queryIncludes(current.query, target2.query);
  }
  function queryIncludes(current, target2) {
    for (var key in target2) {
      if (!(key in current)) {
        return false;
      }
    }
    return true;
  }
  function handleRouteEntered(route) {
    for (var i = 0; i < route.matched.length; i++) {
      var record = route.matched[i];
      for (var name in record.instances) {
        var instance = record.instances[name];
        var cbs = record.enteredCbs[name];
        if (!instance || !cbs) {
          continue;
        }
        delete record.enteredCbs[name];
        for (var i$1 = 0; i$1 < cbs.length; i$1++) {
          if (!instance._isBeingDestroyed) {
            cbs[i$1](instance);
          }
        }
      }
    }
  }
  var View = {
    name: "RouterView",
    functional: true,
    props: {
      name: {
        type: String,
        default: "default"
      }
    },
    render: function render(_, ref2) {
      var props3 = ref2.props;
      var children = ref2.children;
      var parent = ref2.parent;
      var data = ref2.data;
      data.routerView = true;
      var h = parent.$createElement;
      var name = props3.name;
      var route = parent.$route;
      var cache = parent._routerViewCache || (parent._routerViewCache = {});
      var depth = 0;
      var inactive = false;
      while (parent && parent._routerRoot !== parent) {
        var vnodeData = parent.$vnode ? parent.$vnode.data : {};
        if (vnodeData.routerView) {
          depth++;
        }
        if (vnodeData.keepAlive && parent._directInactive && parent._inactive) {
          inactive = true;
        }
        parent = parent.$parent;
      }
      data.routerViewDepth = depth;
      if (inactive) {
        var cachedData = cache[name];
        var cachedComponent = cachedData && cachedData.component;
        if (cachedComponent) {
          if (cachedData.configProps) {
            fillPropsinData(cachedComponent, data, cachedData.route, cachedData.configProps);
          }
          return h(cachedComponent, data, children);
        } else {
          return h();
        }
      }
      var matched = route.matched[depth];
      var component = matched && matched.components[name];
      if (!matched || !component) {
        cache[name] = null;
        return h();
      }
      cache[name] = { component };
      data.registerRouteInstance = function(vm, val) {
        var current = matched.instances[name];
        if (val && current !== vm || !val && current === vm) {
          matched.instances[name] = val;
        }
      };
      (data.hook || (data.hook = {})).prepatch = function(_2, vnode) {
        matched.instances[name] = vnode.componentInstance;
      };
      data.hook.init = function(vnode) {
        if (vnode.data.keepAlive && vnode.componentInstance && vnode.componentInstance !== matched.instances[name]) {
          matched.instances[name] = vnode.componentInstance;
        }
        handleRouteEntered(route);
      };
      var configProps = matched.props && matched.props[name];
      if (configProps) {
        extend2(cache[name], {
          route,
          configProps
        });
        fillPropsinData(component, data, route, configProps);
      }
      return h(component, data, children);
    }
  };
  function fillPropsinData(component, data, route, configProps) {
    var propsToPass = data.props = resolveProps(route, configProps);
    if (propsToPass) {
      propsToPass = data.props = extend2({}, propsToPass);
      var attrs2 = data.attrs = data.attrs || {};
      for (var key in propsToPass) {
        if (!component.props || !(key in component.props)) {
          attrs2[key] = propsToPass[key];
          delete propsToPass[key];
        }
      }
    }
  }
  function resolveProps(route, config2) {
    switch (typeof config2) {
      case "undefined":
        return;
      case "object":
        return config2;
      case "function":
        return config2(route);
      case "boolean":
        return config2 ? route.params : void 0;
      default:
        if (true) {
          warn2(
            false,
            'props in "' + route.path + '" is a ' + typeof config2 + ", expecting an object, function or boolean."
          );
        }
    }
  }
  function resolvePath(relative, base, append) {
    var firstChar = relative.charAt(0);
    if (firstChar === "/") {
      return relative;
    }
    if (firstChar === "?" || firstChar === "#") {
      return base + relative;
    }
    var stack = base.split("/");
    if (!append || !stack[stack.length - 1]) {
      stack.pop();
    }
    var segments = relative.replace(/^\//, "").split("/");
    for (var i = 0; i < segments.length; i++) {
      var segment = segments[i];
      if (segment === "..") {
        stack.pop();
      } else if (segment !== ".") {
        stack.push(segment);
      }
    }
    if (stack[0] !== "") {
      stack.unshift("");
    }
    return stack.join("/");
  }
  function parsePath2(path) {
    var hash = "";
    var query2 = "";
    var hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      hash = path.slice(hashIndex);
      path = path.slice(0, hashIndex);
    }
    var queryIndex = path.indexOf("?");
    if (queryIndex >= 0) {
      query2 = path.slice(queryIndex + 1);
      path = path.slice(0, queryIndex);
    }
    return {
      path,
      query: query2,
      hash
    };
  }
  function cleanPath(path) {
    return path.replace(/\/(?:\s*\/)+/g, "/");
  }
  var isarray = Array.isArray || function(arr) {
    return Object.prototype.toString.call(arr) == "[object Array]";
  };
  var pathToRegexp_1 = pathToRegexp;
  var parse_1 = parse;
  var compile_1 = compile;
  var tokensToFunction_1 = tokensToFunction;
  var tokensToRegExp_1 = tokensToRegExp;
  var PATH_REGEXP = new RegExp([
    "(\\\\.)",
    "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"
  ].join("|"), "g");
  function parse(str, options) {
    var tokens = [];
    var key = 0;
    var index2 = 0;
    var path = "";
    var defaultDelimiter = options && options.delimiter || "/";
    var res;
    while ((res = PATH_REGEXP.exec(str)) != null) {
      var m = res[0];
      var escaped = res[1];
      var offset = res.index;
      path += str.slice(index2, offset);
      index2 = offset + m.length;
      if (escaped) {
        path += escaped[1];
        continue;
      }
      var next = str[index2];
      var prefix = res[2];
      var name = res[3];
      var capture = res[4];
      var group = res[5];
      var modifier = res[6];
      var asterisk = res[7];
      if (path) {
        tokens.push(path);
        path = "";
      }
      var partial = prefix != null && next != null && next !== prefix;
      var repeat = modifier === "+" || modifier === "*";
      var optional = modifier === "?" || modifier === "*";
      var delimiter = res[2] || defaultDelimiter;
      var pattern = capture || group;
      tokens.push({
        name: name || key++,
        prefix: prefix || "",
        delimiter,
        optional,
        repeat,
        partial,
        asterisk: !!asterisk,
        pattern: pattern ? escapeGroup(pattern) : asterisk ? ".*" : "[^" + escapeString(delimiter) + "]+?"
      });
    }
    if (index2 < str.length) {
      path += str.substr(index2);
    }
    if (path) {
      tokens.push(path);
    }
    return tokens;
  }
  function compile(str, options) {
    return tokensToFunction(parse(str, options), options);
  }
  function encodeURIComponentPretty(str) {
    return encodeURI(str).replace(/[\/?#]/g, function(c) {
      return "%" + c.charCodeAt(0).toString(16).toUpperCase();
    });
  }
  function encodeAsterisk(str) {
    return encodeURI(str).replace(/[?#]/g, function(c) {
      return "%" + c.charCodeAt(0).toString(16).toUpperCase();
    });
  }
  function tokensToFunction(tokens, options) {
    var matches2 = new Array(tokens.length);
    for (var i = 0; i < tokens.length; i++) {
      if (typeof tokens[i] === "object") {
        matches2[i] = new RegExp("^(?:" + tokens[i].pattern + ")$", flags(options));
      }
    }
    return function(obj, opts) {
      var path = "";
      var data = obj || {};
      var options2 = opts || {};
      var encode2 = options2.pretty ? encodeURIComponentPretty : encodeURIComponent;
      for (var i2 = 0; i2 < tokens.length; i2++) {
        var token = tokens[i2];
        if (typeof token === "string") {
          path += token;
          continue;
        }
        var value = data[token.name];
        var segment;
        if (value == null) {
          if (token.optional) {
            if (token.partial) {
              path += token.prefix;
            }
            continue;
          } else {
            throw new TypeError('Expected "' + token.name + '" to be defined');
          }
        }
        if (isarray(value)) {
          if (!token.repeat) {
            throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + "`");
          }
          if (value.length === 0) {
            if (token.optional) {
              continue;
            } else {
              throw new TypeError('Expected "' + token.name + '" to not be empty');
            }
          }
          for (var j = 0; j < value.length; j++) {
            segment = encode2(value[j]);
            if (!matches2[i2].test(segment)) {
              throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + "`");
            }
            path += (j === 0 ? token.prefix : token.delimiter) + segment;
          }
          continue;
        }
        segment = token.asterisk ? encodeAsterisk(value) : encode2(value);
        if (!matches2[i2].test(segment)) {
          throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
        }
        path += token.prefix + segment;
      }
      return path;
    };
  }
  function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, "\\$1");
  }
  function escapeGroup(group) {
    return group.replace(/([=!:$\/()])/g, "\\$1");
  }
  function attachKeys(re, keys2) {
    re.keys = keys2;
    return re;
  }
  function flags(options) {
    return options && options.sensitive ? "" : "i";
  }
  function regexpToRegexp(path, keys2) {
    var groups = path.source.match(/\((?!\?)/g);
    if (groups) {
      for (var i = 0; i < groups.length; i++) {
        keys2.push({
          name: i,
          prefix: null,
          delimiter: null,
          optional: false,
          repeat: false,
          partial: false,
          asterisk: false,
          pattern: null
        });
      }
    }
    return attachKeys(path, keys2);
  }
  function arrayToRegexp(path, keys2, options) {
    var parts = [];
    for (var i = 0; i < path.length; i++) {
      parts.push(pathToRegexp(path[i], keys2, options).source);
    }
    var regexp = new RegExp("(?:" + parts.join("|") + ")", flags(options));
    return attachKeys(regexp, keys2);
  }
  function stringToRegexp(path, keys2, options) {
    return tokensToRegExp(parse(path, options), keys2, options);
  }
  function tokensToRegExp(tokens, keys2, options) {
    if (!isarray(keys2)) {
      options = keys2 || options;
      keys2 = [];
    }
    options = options || {};
    var strict = options.strict;
    var end = options.end !== false;
    var route = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        route += escapeString(token);
      } else {
        var prefix = escapeString(token.prefix);
        var capture = "(?:" + token.pattern + ")";
        keys2.push(token);
        if (token.repeat) {
          capture += "(?:" + prefix + capture + ")*";
        }
        if (token.optional) {
          if (!token.partial) {
            capture = "(?:" + prefix + "(" + capture + "))?";
          } else {
            capture = prefix + "(" + capture + ")?";
          }
        } else {
          capture = prefix + "(" + capture + ")";
        }
        route += capture;
      }
    }
    var delimiter = escapeString(options.delimiter || "/");
    var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;
    if (!strict) {
      route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + "(?:" + delimiter + "(?=$))?";
    }
    if (end) {
      route += "$";
    } else {
      route += strict && endsWithDelimiter ? "" : "(?=" + delimiter + "|$)";
    }
    return attachKeys(new RegExp("^" + route, flags(options)), keys2);
  }
  function pathToRegexp(path, keys2, options) {
    if (!isarray(keys2)) {
      options = keys2 || options;
      keys2 = [];
    }
    options = options || {};
    if (path instanceof RegExp) {
      return regexpToRegexp(path, keys2);
    }
    if (isarray(path)) {
      return arrayToRegexp(path, keys2, options);
    }
    return stringToRegexp(path, keys2, options);
  }
  pathToRegexp_1.parse = parse_1;
  pathToRegexp_1.compile = compile_1;
  pathToRegexp_1.tokensToFunction = tokensToFunction_1;
  pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;
  var regexpCompileCache = /* @__PURE__ */ Object.create(null);
  function fillParams(path, params, routeMsg) {
    params = params || {};
    try {
      var filler = regexpCompileCache[path] || (regexpCompileCache[path] = pathToRegexp_1.compile(path));
      if (typeof params.pathMatch === "string") {
        params[0] = params.pathMatch;
      }
      return filler(params, { pretty: true });
    } catch (e) {
      if (true) {
        warn2(typeof params.pathMatch === "string", "missing param for " + routeMsg + ": " + e.message);
      }
      return "";
    } finally {
      delete params[0];
    }
  }
  function normalizeLocation(raw, current, append, router2) {
    var next = typeof raw === "string" ? { path: raw } : raw;
    if (next._normalized) {
      return next;
    } else if (next.name) {
      next = extend2({}, raw);
      var params = next.params;
      if (params && typeof params === "object") {
        next.params = extend2({}, params);
      }
      return next;
    }
    if (!next.path && next.params && current) {
      next = extend2({}, next);
      next._normalized = true;
      var params$1 = extend2(extend2({}, current.params), next.params);
      if (current.name) {
        next.name = current.name;
        next.params = params$1;
      } else if (current.matched.length) {
        var rawPath = current.matched[current.matched.length - 1].path;
        next.path = fillParams(rawPath, params$1, "path " + current.path);
      } else if (true) {
        warn2(false, "relative params navigation requires a current route.");
      }
      return next;
    }
    var parsedPath = parsePath2(next.path || "");
    var basePath = current && current.path || "/";
    var path = parsedPath.path ? resolvePath(parsedPath.path, basePath, append || next.append) : basePath;
    var query2 = resolveQuery(
      parsedPath.query,
      next.query,
      router2 && router2.options.parseQuery
    );
    var hash = next.hash || parsedPath.hash;
    if (hash && hash.charAt(0) !== "#") {
      hash = "#" + hash;
    }
    return {
      _normalized: true,
      path,
      query: query2,
      hash
    };
  }
  var toTypes = [String, Object];
  var eventTypes = [String, Array];
  var noop2 = function() {
  };
  var warnedCustomSlot;
  var warnedTagProp;
  var warnedEventProp;
  var Link = {
    name: "RouterLink",
    props: {
      to: {
        type: toTypes,
        required: true
      },
      tag: {
        type: String,
        default: "a"
      },
      custom: Boolean,
      exact: Boolean,
      exactPath: Boolean,
      append: Boolean,
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      ariaCurrentValue: {
        type: String,
        default: "page"
      },
      event: {
        type: eventTypes,
        default: "click"
      }
    },
    render: function render2(h) {
      var this$1$1 = this;
      var router2 = this.$router;
      var current = this.$route;
      var ref2 = router2.resolve(
        this.to,
        current,
        this.append
      );
      var location2 = ref2.location;
      var route = ref2.route;
      var href = ref2.href;
      var classes = {};
      var globalActiveClass = router2.options.linkActiveClass;
      var globalExactActiveClass = router2.options.linkExactActiveClass;
      var activeClassFallback = globalActiveClass == null ? "router-link-active" : globalActiveClass;
      var exactActiveClassFallback = globalExactActiveClass == null ? "router-link-exact-active" : globalExactActiveClass;
      var activeClass = this.activeClass == null ? activeClassFallback : this.activeClass;
      var exactActiveClass = this.exactActiveClass == null ? exactActiveClassFallback : this.exactActiveClass;
      var compareTarget = route.redirectedFrom ? createRoute(null, normalizeLocation(route.redirectedFrom), null, router2) : route;
      classes[exactActiveClass] = isSameRoute(current, compareTarget, this.exactPath);
      classes[activeClass] = this.exact || this.exactPath ? classes[exactActiveClass] : isIncludedRoute(current, compareTarget);
      var ariaCurrentValue = classes[exactActiveClass] ? this.ariaCurrentValue : null;
      var handler = function(e) {
        if (guardEvent(e)) {
          if (this$1$1.replace) {
            router2.replace(location2, noop2);
          } else {
            router2.push(location2, noop2);
          }
        }
      };
      var on = { click: guardEvent };
      if (Array.isArray(this.event)) {
        this.event.forEach(function(e) {
          on[e] = handler;
        });
      } else {
        on[this.event] = handler;
      }
      var data = { class: classes };
      var scopedSlot = !this.$scopedSlots.$hasNormal && this.$scopedSlots.default && this.$scopedSlots.default({
        href,
        route,
        navigate: handler,
        isActive: classes[activeClass],
        isExactActive: classes[exactActiveClass]
      });
      if (scopedSlot) {
        if (!this.custom) {
          !warnedCustomSlot && warn2(false, 'In Vue Router 4, the v-slot API will by default wrap its content with an <a> element. Use the custom prop to remove this warning:\n<router-link v-slot="{ navigate, href }" custom></router-link>\n');
          warnedCustomSlot = true;
        }
        if (scopedSlot.length === 1) {
          return scopedSlot[0];
        } else if (scopedSlot.length > 1 || !scopedSlot.length) {
          if (true) {
            warn2(
              false,
              '<router-link> with to="' + this.to + `" is trying to use a scoped slot but it didn't provide exactly one child. Wrapping the content with a span element.`
            );
          }
          return scopedSlot.length === 0 ? h() : h("span", {}, scopedSlot);
        }
      }
      if (true) {
        if ("tag" in this.$options.propsData && !warnedTagProp) {
          warn2(
            false,
            "<router-link>'s tag prop is deprecated and has been removed in Vue Router 4. Use the v-slot API to remove this warning: https://next.router.vuejs.org/guide/migration/#removal-of-event-and-tag-props-in-router-link."
          );
          warnedTagProp = true;
        }
        if ("event" in this.$options.propsData && !warnedEventProp) {
          warn2(
            false,
            "<router-link>'s event prop is deprecated and has been removed in Vue Router 4. Use the v-slot API to remove this warning: https://next.router.vuejs.org/guide/migration/#removal-of-event-and-tag-props-in-router-link."
          );
          warnedEventProp = true;
        }
      }
      if (this.tag === "a") {
        data.on = on;
        data.attrs = { href, "aria-current": ariaCurrentValue };
      } else {
        var a = findAnchor(this.$slots.default);
        if (a) {
          a.isStatic = false;
          var aData = a.data = extend2({}, a.data);
          aData.on = aData.on || {};
          for (var event in aData.on) {
            var handler$1 = aData.on[event];
            if (event in on) {
              aData.on[event] = Array.isArray(handler$1) ? handler$1 : [handler$1];
            }
          }
          for (var event$1 in on) {
            if (event$1 in aData.on) {
              aData.on[event$1].push(on[event$1]);
            } else {
              aData.on[event$1] = handler;
            }
          }
          var aAttrs = a.data.attrs = extend2({}, a.data.attrs);
          aAttrs.href = href;
          aAttrs["aria-current"] = ariaCurrentValue;
        } else {
          data.on = on;
        }
      }
      return h(this.tag, data, this.$slots.default);
    }
  };
  function guardEvent(e) {
    if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) {
      return;
    }
    if (e.defaultPrevented) {
      return;
    }
    if (e.button !== void 0 && e.button !== 0) {
      return;
    }
    if (e.currentTarget && e.currentTarget.getAttribute) {
      var target2 = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(target2)) {
        return;
      }
    }
    if (e.preventDefault) {
      e.preventDefault();
    }
    return true;
  }
  function findAnchor(children) {
    if (children) {
      var child;
      for (var i = 0; i < children.length; i++) {
        child = children[i];
        if (child.tag === "a") {
          return child;
        }
        if (child.children && (child = findAnchor(child.children))) {
          return child;
        }
      }
    }
  }
  var _Vue;
  function install(Vue2) {
    if (install.installed && _Vue === Vue2) {
      return;
    }
    install.installed = true;
    _Vue = Vue2;
    var isDef2 = function(v) {
      return v !== void 0;
    };
    var registerInstance = function(vm, callVal) {
      var i = vm.$options._parentVnode;
      if (isDef2(i) && isDef2(i = i.data) && isDef2(i = i.registerRouteInstance)) {
        i(vm, callVal);
      }
    };
    Vue2.mixin({
      beforeCreate: function beforeCreate() {
        if (isDef2(this.$options.router)) {
          this._routerRoot = this;
          this._router = this.$options.router;
          this._router.init(this);
          Vue2.util.defineReactive(this, "_route", this._router.history.current);
        } else {
          this._routerRoot = this.$parent && this.$parent._routerRoot || this;
        }
        registerInstance(this, this);
      },
      destroyed: function destroyed() {
        registerInstance(this);
      }
    });
    Object.defineProperty(Vue2.prototype, "$router", {
      get: function get() {
        return this._routerRoot._router;
      }
    });
    Object.defineProperty(Vue2.prototype, "$route", {
      get: function get() {
        return this._routerRoot._route;
      }
    });
    Vue2.component("RouterView", View);
    Vue2.component("RouterLink", Link);
    var strats2 = Vue2.config.optionMergeStrategies;
    strats2.beforeRouteEnter = strats2.beforeRouteLeave = strats2.beforeRouteUpdate = strats2.created;
  }
  var inBrowser2 = typeof window !== "undefined";
  function createRouteMap(routes, oldPathList, oldPathMap, oldNameMap, parentRoute) {
    var pathList = oldPathList || [];
    var pathMap = oldPathMap || /* @__PURE__ */ Object.create(null);
    var nameMap = oldNameMap || /* @__PURE__ */ Object.create(null);
    routes.forEach(function(route) {
      addRouteRecord(pathList, pathMap, nameMap, route, parentRoute);
    });
    for (var i = 0, l = pathList.length; i < l; i++) {
      if (pathList[i] === "*") {
        pathList.push(pathList.splice(i, 1)[0]);
        l--;
        i--;
      }
    }
    if (true) {
      var found = pathList.filter(function(path) {
        return path && path.charAt(0) !== "*" && path.charAt(0) !== "/";
      });
      if (found.length > 0) {
        var pathNames = found.map(function(path) {
          return "- " + path;
        }).join("\n");
        warn2(false, "Non-nested routes must include a leading slash character. Fix the following routes: \n" + pathNames);
      }
    }
    return {
      pathList,
      pathMap,
      nameMap
    };
  }
  function addRouteRecord(pathList, pathMap, nameMap, route, parent, matchAs) {
    var path = route.path;
    var name = route.name;
    if (true) {
      assert(path != null, '"path" is required in a route configuration.');
      assert(
        typeof route.component !== "string",
        'route config "component" for path: ' + String(
          path || name
        ) + " cannot be a string id. Use an actual component instead."
      );
      warn2(
        !/[^\u0000-\u007F]+/.test(path),
        'Route with path "' + path + '" contains unencoded characters, make sure your path is correctly encoded before passing it to the router. Use encodeURI to encode static segments of your path.'
      );
    }
    var pathToRegexpOptions = route.pathToRegexpOptions || {};
    var normalizedPath = normalizePath(path, parent, pathToRegexpOptions.strict);
    if (typeof route.caseSensitive === "boolean") {
      pathToRegexpOptions.sensitive = route.caseSensitive;
    }
    var record = {
      path: normalizedPath,
      regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
      components: route.components || { default: route.component },
      alias: route.alias ? typeof route.alias === "string" ? [route.alias] : route.alias : [],
      instances: {},
      enteredCbs: {},
      name,
      parent,
      matchAs,
      redirect: route.redirect,
      beforeEnter: route.beforeEnter,
      meta: route.meta || {},
      props: route.props == null ? {} : route.components ? route.props : { default: route.props }
    };
    if (route.children) {
      if (true) {
        if (route.name && !route.redirect && route.children.some(function(child) {
          return /^\/?$/.test(child.path);
        })) {
          warn2(
            false,
            "Named Route '" + route.name + `' has a default child route. When navigating to this named route (:to="{name: '` + route.name + `'}"), the default child route will not be rendered. Remove the name from this route and use the name of the default child route for named links instead.`
          );
        }
      }
      route.children.forEach(function(child) {
        var childMatchAs = matchAs ? cleanPath(matchAs + "/" + child.path) : void 0;
        addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
      });
    }
    if (!pathMap[record.path]) {
      pathList.push(record.path);
      pathMap[record.path] = record;
    }
    if (route.alias !== void 0) {
      var aliases = Array.isArray(route.alias) ? route.alias : [route.alias];
      for (var i = 0; i < aliases.length; ++i) {
        var alias = aliases[i];
        if (alias === path) {
          warn2(
            false,
            'Found an alias with the same value as the path: "' + path + '". You have to remove that alias. It will be ignored in development.'
          );
          continue;
        }
        var aliasRoute = {
          path: alias,
          children: route.children
        };
        addRouteRecord(
          pathList,
          pathMap,
          nameMap,
          aliasRoute,
          parent,
          record.path || "/"
        );
      }
    }
    if (name) {
      if (!nameMap[name]) {
        nameMap[name] = record;
      } else if (!matchAs) {
        warn2(
          false,
          'Duplicate named routes definition: { name: "' + name + '", path: "' + record.path + '" }'
        );
      }
    }
  }
  function compileRouteRegex(path, pathToRegexpOptions) {
    var regex = pathToRegexp_1(path, [], pathToRegexpOptions);
    if (true) {
      var keys2 = /* @__PURE__ */ Object.create(null);
      regex.keys.forEach(function(key) {
        warn2(
          !keys2[key.name],
          'Duplicate param keys in route with path: "' + path + '"'
        );
        keys2[key.name] = true;
      });
    }
    return regex;
  }
  function normalizePath(path, parent, strict) {
    if (!strict) {
      path = path.replace(/\/$/, "");
    }
    if (path[0] === "/") {
      return path;
    }
    if (parent == null) {
      return path;
    }
    return cleanPath(parent.path + "/" + path);
  }
  function createMatcher(routes, router2) {
    var ref2 = createRouteMap(routes);
    var pathList = ref2.pathList;
    var pathMap = ref2.pathMap;
    var nameMap = ref2.nameMap;
    function addRoutes2(routes2) {
      createRouteMap(routes2, pathList, pathMap, nameMap);
    }
    function addRoute2(parentOrRoute, route) {
      var parent = typeof parentOrRoute !== "object" ? nameMap[parentOrRoute] : void 0;
      createRouteMap([route || parentOrRoute], pathList, pathMap, nameMap, parent);
      if (parent && parent.alias.length) {
        createRouteMap(
          parent.alias.map(function(alias2) {
            return { path: alias2, children: [route] };
          }),
          pathList,
          pathMap,
          nameMap,
          parent
        );
      }
    }
    function getRoutes2() {
      return pathList.map(function(path) {
        return pathMap[path];
      });
    }
    function match2(raw, currentRoute, redirectedFrom) {
      var location2 = normalizeLocation(raw, currentRoute, false, router2);
      var name = location2.name;
      if (name) {
        var record = nameMap[name];
        if (true) {
          warn2(record, "Route with name '" + name + "' does not exist");
        }
        if (!record) {
          return _createRoute(null, location2);
        }
        var paramNames = record.regex.keys.filter(function(key2) {
          return !key2.optional;
        }).map(function(key2) {
          return key2.name;
        });
        if (typeof location2.params !== "object") {
          location2.params = {};
        }
        if (currentRoute && typeof currentRoute.params === "object") {
          for (var key in currentRoute.params) {
            if (!(key in location2.params) && paramNames.indexOf(key) > -1) {
              location2.params[key] = currentRoute.params[key];
            }
          }
        }
        location2.path = fillParams(record.path, location2.params, 'named route "' + name + '"');
        return _createRoute(record, location2, redirectedFrom);
      } else if (location2.path) {
        location2.params = {};
        for (var i = 0; i < pathList.length; i++) {
          var path = pathList[i];
          var record$1 = pathMap[path];
          if (matchRoute(record$1.regex, location2.path, location2.params)) {
            return _createRoute(record$1, location2, redirectedFrom);
          }
        }
      }
      return _createRoute(null, location2);
    }
    function redirect(record, location2) {
      var originalRedirect = record.redirect;
      var redirect2 = typeof originalRedirect === "function" ? originalRedirect(createRoute(record, location2, null, router2)) : originalRedirect;
      if (typeof redirect2 === "string") {
        redirect2 = { path: redirect2 };
      }
      if (!redirect2 || typeof redirect2 !== "object") {
        if (true) {
          warn2(
            false,
            "invalid redirect option: " + JSON.stringify(redirect2)
          );
        }
        return _createRoute(null, location2);
      }
      var re = redirect2;
      var name = re.name;
      var path = re.path;
      var query2 = location2.query;
      var hash = location2.hash;
      var params = location2.params;
      query2 = re.hasOwnProperty("query") ? re.query : query2;
      hash = re.hasOwnProperty("hash") ? re.hash : hash;
      params = re.hasOwnProperty("params") ? re.params : params;
      if (name) {
        var targetRecord = nameMap[name];
        if (true) {
          assert(targetRecord, 'redirect failed: named route "' + name + '" not found.');
        }
        return match2({
          _normalized: true,
          name,
          query: query2,
          hash,
          params
        }, void 0, location2);
      } else if (path) {
        var rawPath = resolveRecordPath(path, record);
        var resolvedPath = fillParams(rawPath, params, 'redirect route with path "' + rawPath + '"');
        return match2({
          _normalized: true,
          path: resolvedPath,
          query: query2,
          hash
        }, void 0, location2);
      } else {
        if (true) {
          warn2(false, "invalid redirect option: " + JSON.stringify(redirect2));
        }
        return _createRoute(null, location2);
      }
    }
    function alias(record, location2, matchAs) {
      var aliasedPath = fillParams(matchAs, location2.params, 'aliased route with path "' + matchAs + '"');
      var aliasedMatch = match2({
        _normalized: true,
        path: aliasedPath
      });
      if (aliasedMatch) {
        var matched = aliasedMatch.matched;
        var aliasedRecord = matched[matched.length - 1];
        location2.params = aliasedMatch.params;
        return _createRoute(aliasedRecord, location2);
      }
      return _createRoute(null, location2);
    }
    function _createRoute(record, location2, redirectedFrom) {
      if (record && record.redirect) {
        return redirect(record, redirectedFrom || location2);
      }
      if (record && record.matchAs) {
        return alias(record, location2, record.matchAs);
      }
      return createRoute(record, location2, redirectedFrom, router2);
    }
    return {
      match: match2,
      addRoute: addRoute2,
      getRoutes: getRoutes2,
      addRoutes: addRoutes2
    };
  }
  function matchRoute(regex, path, params) {
    var m = path.match(regex);
    if (!m) {
      return false;
    } else if (!params) {
      return true;
    }
    for (var i = 1, len = m.length; i < len; ++i) {
      var key = regex.keys[i - 1];
      if (key) {
        params[key.name || "pathMatch"] = typeof m[i] === "string" ? decode(m[i]) : m[i];
      }
    }
    return true;
  }
  function resolveRecordPath(path, record) {
    return resolvePath(path, record.parent ? record.parent.path : "/", true);
  }
  var Time = inBrowser2 && window.performance && window.performance.now ? window.performance : Date;
  function genStateKey() {
    return Time.now().toFixed(3);
  }
  var _key = genStateKey();
  function getStateKey() {
    return _key;
  }
  function setStateKey(key) {
    return _key = key;
  }
  var positionStore = /* @__PURE__ */ Object.create(null);
  function setupScroll() {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    var protocolAndPath = window.location.protocol + "//" + window.location.host;
    var absolutePath = window.location.href.replace(protocolAndPath, "");
    var stateCopy = extend2({}, window.history.state);
    stateCopy.key = getStateKey();
    window.history.replaceState(stateCopy, "", absolutePath);
    window.addEventListener("popstate", handlePopState);
    return function() {
      window.removeEventListener("popstate", handlePopState);
    };
  }
  function handleScroll(router2, to, from, isPop) {
    if (!router2.app) {
      return;
    }
    var behavior = router2.options.scrollBehavior;
    if (!behavior) {
      return;
    }
    if (true) {
      assert(typeof behavior === "function", "scrollBehavior must be a function");
    }
    router2.app.$nextTick(function() {
      var position = getScrollPosition();
      var shouldScroll = behavior.call(
        router2,
        to,
        from,
        isPop ? position : null
      );
      if (!shouldScroll) {
        return;
      }
      if (typeof shouldScroll.then === "function") {
        shouldScroll.then(function(shouldScroll2) {
          scrollToPosition(shouldScroll2, position);
        }).catch(function(err) {
          if (true) {
            assert(false, err.toString());
          }
        });
      } else {
        scrollToPosition(shouldScroll, position);
      }
    });
  }
  function saveScrollPosition() {
    var key = getStateKey();
    if (key) {
      positionStore[key] = {
        x: window.pageXOffset,
        y: window.pageYOffset
      };
    }
  }
  function handlePopState(e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  }
  function getScrollPosition() {
    var key = getStateKey();
    if (key) {
      return positionStore[key];
    }
  }
  function getElementPosition(el, offset) {
    var docEl = document.documentElement;
    var docRect = docEl.getBoundingClientRect();
    var elRect = el.getBoundingClientRect();
    return {
      x: elRect.left - docRect.left - offset.x,
      y: elRect.top - docRect.top - offset.y
    };
  }
  function isValidPosition(obj) {
    return isNumber(obj.x) || isNumber(obj.y);
  }
  function normalizePosition(obj) {
    return {
      x: isNumber(obj.x) ? obj.x : window.pageXOffset,
      y: isNumber(obj.y) ? obj.y : window.pageYOffset
    };
  }
  function normalizeOffset(obj) {
    return {
      x: isNumber(obj.x) ? obj.x : 0,
      y: isNumber(obj.y) ? obj.y : 0
    };
  }
  function isNumber(v) {
    return typeof v === "number";
  }
  var hashStartsWithNumberRE = /^#\d/;
  function scrollToPosition(shouldScroll, position) {
    var isObject2 = typeof shouldScroll === "object";
    if (isObject2 && typeof shouldScroll.selector === "string") {
      var el = hashStartsWithNumberRE.test(shouldScroll.selector) ? document.getElementById(shouldScroll.selector.slice(1)) : document.querySelector(shouldScroll.selector);
      if (el) {
        var offset = shouldScroll.offset && typeof shouldScroll.offset === "object" ? shouldScroll.offset : {};
        offset = normalizeOffset(offset);
        position = getElementPosition(el, offset);
      } else if (isValidPosition(shouldScroll)) {
        position = normalizePosition(shouldScroll);
      }
    } else if (isObject2 && isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
    if (position) {
      if ("scrollBehavior" in document.documentElement.style) {
        window.scrollTo({
          left: position.x,
          top: position.y,
          behavior: shouldScroll.behavior
        });
      } else {
        window.scrollTo(position.x, position.y);
      }
    }
  }
  var supportsPushState = inBrowser2 && function() {
    var ua = window.navigator.userAgent;
    if ((ua.indexOf("Android 2.") !== -1 || ua.indexOf("Android 4.0") !== -1) && ua.indexOf("Mobile Safari") !== -1 && ua.indexOf("Chrome") === -1 && ua.indexOf("Windows Phone") === -1) {
      return false;
    }
    return window.history && typeof window.history.pushState === "function";
  }();
  function pushState(url, replace2) {
    saveScrollPosition();
    var history = window.history;
    try {
      if (replace2) {
        var stateCopy = extend2({}, history.state);
        stateCopy.key = getStateKey();
        history.replaceState(stateCopy, "", url);
      } else {
        history.pushState({ key: setStateKey(genStateKey()) }, "", url);
      }
    } catch (e) {
      window.location[replace2 ? "replace" : "assign"](url);
    }
  }
  function replaceState(url) {
    pushState(url, true);
  }
  var NavigationFailureType = {
    redirected: 2,
    aborted: 4,
    cancelled: 8,
    duplicated: 16
  };
  function createNavigationRedirectedError(from, to) {
    return createRouterError(
      from,
      to,
      NavigationFailureType.redirected,
      'Redirected when going from "' + from.fullPath + '" to "' + stringifyRoute(
        to
      ) + '" via a navigation guard.'
    );
  }
  function createNavigationDuplicatedError(from, to) {
    var error = createRouterError(
      from,
      to,
      NavigationFailureType.duplicated,
      'Avoided redundant navigation to current location: "' + from.fullPath + '".'
    );
    error.name = "NavigationDuplicated";
    return error;
  }
  function createNavigationCancelledError(from, to) {
    return createRouterError(
      from,
      to,
      NavigationFailureType.cancelled,
      'Navigation cancelled from "' + from.fullPath + '" to "' + to.fullPath + '" with a new navigation.'
    );
  }
  function createNavigationAbortedError(from, to) {
    return createRouterError(
      from,
      to,
      NavigationFailureType.aborted,
      'Navigation aborted from "' + from.fullPath + '" to "' + to.fullPath + '" via a navigation guard.'
    );
  }
  function createRouterError(from, to, type2, message) {
    var error = new Error(message);
    error._isRouter = true;
    error.from = from;
    error.to = to;
    error.type = type2;
    return error;
  }
  var propertiesToLog = ["params", "query", "hash"];
  function stringifyRoute(to) {
    if (typeof to === "string") {
      return to;
    }
    if ("path" in to) {
      return to.path;
    }
    var location2 = {};
    propertiesToLog.forEach(function(key) {
      if (key in to) {
        location2[key] = to[key];
      }
    });
    return JSON.stringify(location2, null, 2);
  }
  function isError(err) {
    return Object.prototype.toString.call(err).indexOf("Error") > -1;
  }
  function isNavigationFailure(err, errorType) {
    return isError(err) && err._isRouter && (errorType == null || err.type === errorType);
  }
  function runQueue(queue2, fn, cb) {
    var step = function(index2) {
      if (index2 >= queue2.length) {
        cb();
      } else {
        if (queue2[index2]) {
          fn(queue2[index2], function() {
            step(index2 + 1);
          });
        } else {
          step(index2 + 1);
        }
      }
    };
    step(0);
  }
  function resolveAsyncComponents(matched) {
    return function(to, from, next) {
      var hasAsync = false;
      var pending2 = 0;
      var error = null;
      flatMapComponents(matched, function(def2, _, match2, key) {
        if (typeof def2 === "function" && def2.cid === void 0) {
          hasAsync = true;
          pending2++;
          var resolve2 = once2(function(resolvedDef) {
            if (isESModule(resolvedDef)) {
              resolvedDef = resolvedDef.default;
            }
            def2.resolved = typeof resolvedDef === "function" ? resolvedDef : _Vue.extend(resolvedDef);
            match2.components[key] = resolvedDef;
            pending2--;
            if (pending2 <= 0) {
              next();
            }
          });
          var reject = once2(function(reason) {
            var msg = "Failed to resolve async component " + key + ": " + reason;
            warn2(false, msg);
            if (!error) {
              error = isError(reason) ? reason : new Error(msg);
              next(error);
            }
          });
          var res;
          try {
            res = def2(resolve2, reject);
          } catch (e) {
            reject(e);
          }
          if (res) {
            if (typeof res.then === "function") {
              res.then(resolve2, reject);
            } else {
              var comp = res.component;
              if (comp && typeof comp.then === "function") {
                comp.then(resolve2, reject);
              }
            }
          }
        }
      });
      if (!hasAsync) {
        next();
      }
    };
  }
  function flatMapComponents(matched, fn) {
    return flatten(matched.map(function(m) {
      return Object.keys(m.components).map(function(key) {
        return fn(
          m.components[key],
          m.instances[key],
          m,
          key
        );
      });
    }));
  }
  function flatten(arr) {
    return Array.prototype.concat.apply([], arr);
  }
  var hasSymbol2 = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
  function isESModule(obj) {
    return obj.__esModule || hasSymbol2 && obj[Symbol.toStringTag] === "Module";
  }
  function once2(fn) {
    var called = false;
    return function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      if (called) {
        return;
      }
      called = true;
      return fn.apply(this, args);
    };
  }
  var History = function History2(router2, base) {
    this.router = router2;
    this.base = normalizeBase(base);
    this.current = START;
    this.pending = null;
    this.ready = false;
    this.readyCbs = [];
    this.readyErrorCbs = [];
    this.errorCbs = [];
    this.listeners = [];
  };
  History.prototype.listen = function listen(cb) {
    this.cb = cb;
  };
  History.prototype.onReady = function onReady(cb, errorCb) {
    if (this.ready) {
      cb();
    } else {
      this.readyCbs.push(cb);
      if (errorCb) {
        this.readyErrorCbs.push(errorCb);
      }
    }
  };
  History.prototype.onError = function onError(errorCb) {
    this.errorCbs.push(errorCb);
  };
  History.prototype.transitionTo = function transitionTo(location2, onComplete, onAbort) {
    var this$1$1 = this;
    var route;
    try {
      route = this.router.match(location2, this.current);
    } catch (e) {
      this.errorCbs.forEach(function(cb) {
        cb(e);
      });
      throw e;
    }
    var prev = this.current;
    this.confirmTransition(
      route,
      function() {
        this$1$1.updateRoute(route);
        onComplete && onComplete(route);
        this$1$1.ensureURL();
        this$1$1.router.afterHooks.forEach(function(hook) {
          hook && hook(route, prev);
        });
        if (!this$1$1.ready) {
          this$1$1.ready = true;
          this$1$1.readyCbs.forEach(function(cb) {
            cb(route);
          });
        }
      },
      function(err) {
        if (onAbort) {
          onAbort(err);
        }
        if (err && !this$1$1.ready) {
          if (!isNavigationFailure(err, NavigationFailureType.redirected) || prev !== START) {
            this$1$1.ready = true;
            this$1$1.readyErrorCbs.forEach(function(cb) {
              cb(err);
            });
          }
        }
      }
    );
  };
  History.prototype.confirmTransition = function confirmTransition(route, onComplete, onAbort) {
    var this$1$1 = this;
    var current = this.current;
    this.pending = route;
    var abort = function(err) {
      if (!isNavigationFailure(err) && isError(err)) {
        if (this$1$1.errorCbs.length) {
          this$1$1.errorCbs.forEach(function(cb) {
            cb(err);
          });
        } else {
          if (true) {
            warn2(false, "uncaught error during route navigation:");
          }
          console.error(err);
        }
      }
      onAbort && onAbort(err);
    };
    var lastRouteIndex = route.matched.length - 1;
    var lastCurrentIndex = current.matched.length - 1;
    if (isSameRoute(route, current) && lastRouteIndex === lastCurrentIndex && route.matched[lastRouteIndex] === current.matched[lastCurrentIndex]) {
      this.ensureURL();
      if (route.hash) {
        handleScroll(this.router, current, route, false);
      }
      return abort(createNavigationDuplicatedError(current, route));
    }
    var ref2 = resolveQueue(
      this.current.matched,
      route.matched
    );
    var updated = ref2.updated;
    var deactivated = ref2.deactivated;
    var activated = ref2.activated;
    var queue2 = [].concat(
      extractLeaveGuards(deactivated),
      this.router.beforeHooks,
      extractUpdateHooks(updated),
      activated.map(function(m) {
        return m.beforeEnter;
      }),
      resolveAsyncComponents(activated)
    );
    var iterator = function(hook, next) {
      if (this$1$1.pending !== route) {
        return abort(createNavigationCancelledError(current, route));
      }
      try {
        hook(route, current, function(to) {
          if (to === false) {
            this$1$1.ensureURL(true);
            abort(createNavigationAbortedError(current, route));
          } else if (isError(to)) {
            this$1$1.ensureURL(true);
            abort(to);
          } else if (typeof to === "string" || typeof to === "object" && (typeof to.path === "string" || typeof to.name === "string")) {
            abort(createNavigationRedirectedError(current, route));
            if (typeof to === "object" && to.replace) {
              this$1$1.replace(to);
            } else {
              this$1$1.push(to);
            }
          } else {
            next(to);
          }
        });
      } catch (e) {
        abort(e);
      }
    };
    runQueue(queue2, iterator, function() {
      var enterGuards = extractEnterGuards(activated);
      var queue3 = enterGuards.concat(this$1$1.router.resolveHooks);
      runQueue(queue3, iterator, function() {
        if (this$1$1.pending !== route) {
          return abort(createNavigationCancelledError(current, route));
        }
        this$1$1.pending = null;
        onComplete(route);
        if (this$1$1.router.app) {
          this$1$1.router.app.$nextTick(function() {
            handleRouteEntered(route);
          });
        }
      });
    });
  };
  History.prototype.updateRoute = function updateRoute(route) {
    this.current = route;
    this.cb && this.cb(route);
  };
  History.prototype.setupListeners = function setupListeners() {
  };
  History.prototype.teardown = function teardown() {
    this.listeners.forEach(function(cleanupListener) {
      cleanupListener();
    });
    this.listeners = [];
    this.current = START;
    this.pending = null;
  };
  function normalizeBase(base) {
    if (!base) {
      if (inBrowser2) {
        var baseEl = document.querySelector("base");
        base = baseEl && baseEl.getAttribute("href") || "/";
        base = base.replace(/^https?:\/\/[^\/]+/, "");
      } else {
        base = "/";
      }
    }
    if (base.charAt(0) !== "/") {
      base = "/" + base;
    }
    return base.replace(/\/$/, "");
  }
  function resolveQueue(current, next) {
    var i;
    var max = Math.max(current.length, next.length);
    for (i = 0; i < max; i++) {
      if (current[i] !== next[i]) {
        break;
      }
    }
    return {
      updated: next.slice(0, i),
      activated: next.slice(i),
      deactivated: current.slice(i)
    };
  }
  function extractGuards(records, name, bind2, reverse) {
    var guards = flatMapComponents(records, function(def2, instance, match2, key) {
      var guard = extractGuard(def2, name);
      if (guard) {
        return Array.isArray(guard) ? guard.map(function(guard2) {
          return bind2(guard2, instance, match2, key);
        }) : bind2(guard, instance, match2, key);
      }
    });
    return flatten(reverse ? guards.reverse() : guards);
  }
  function extractGuard(def2, key) {
    if (typeof def2 !== "function") {
      def2 = _Vue.extend(def2);
    }
    return def2.options[key];
  }
  function extractLeaveGuards(deactivated) {
    return extractGuards(deactivated, "beforeRouteLeave", bindGuard, true);
  }
  function extractUpdateHooks(updated) {
    return extractGuards(updated, "beforeRouteUpdate", bindGuard);
  }
  function bindGuard(guard, instance) {
    if (instance) {
      return function boundRouteGuard() {
        return guard.apply(instance, arguments);
      };
    }
  }
  function extractEnterGuards(activated) {
    return extractGuards(
      activated,
      "beforeRouteEnter",
      function(guard, _, match2, key) {
        return bindEnterGuard(guard, match2, key);
      }
    );
  }
  function bindEnterGuard(guard, match2, key) {
    return function routeEnterGuard(to, from, next) {
      return guard(to, from, function(cb) {
        if (typeof cb === "function") {
          if (!match2.enteredCbs[key]) {
            match2.enteredCbs[key] = [];
          }
          match2.enteredCbs[key].push(cb);
        }
        next(cb);
      });
    };
  }
  var HTML5History = /* @__PURE__ */ function(History3) {
    function HTML5History2(router2, base) {
      History3.call(this, router2, base);
      this._startLocation = getLocation(this.base);
    }
    if (History3)
      HTML5History2.__proto__ = History3;
    HTML5History2.prototype = Object.create(History3 && History3.prototype);
    HTML5History2.prototype.constructor = HTML5History2;
    HTML5History2.prototype.setupListeners = function setupListeners2() {
      var this$1$1 = this;
      if (this.listeners.length > 0) {
        return;
      }
      var router2 = this.router;
      var expectScroll = router2.options.scrollBehavior;
      var supportsScroll = supportsPushState && expectScroll;
      if (supportsScroll) {
        this.listeners.push(setupScroll());
      }
      var handleRoutingEvent = function() {
        var current = this$1$1.current;
        var location2 = getLocation(this$1$1.base);
        if (this$1$1.current === START && location2 === this$1$1._startLocation) {
          return;
        }
        this$1$1.transitionTo(location2, function(route) {
          if (supportsScroll) {
            handleScroll(router2, route, current, true);
          }
        });
      };
      window.addEventListener("popstate", handleRoutingEvent);
      this.listeners.push(function() {
        window.removeEventListener("popstate", handleRoutingEvent);
      });
    };
    HTML5History2.prototype.go = function go2(n) {
      window.history.go(n);
    };
    HTML5History2.prototype.push = function push2(location2, onComplete, onAbort) {
      var this$1$1 = this;
      var ref2 = this;
      var fromRoute = ref2.current;
      this.transitionTo(location2, function(route) {
        pushState(cleanPath(this$1$1.base + route.fullPath));
        handleScroll(this$1$1.router, route, fromRoute, false);
        onComplete && onComplete(route);
      }, onAbort);
    };
    HTML5History2.prototype.replace = function replace2(location2, onComplete, onAbort) {
      var this$1$1 = this;
      var ref2 = this;
      var fromRoute = ref2.current;
      this.transitionTo(location2, function(route) {
        replaceState(cleanPath(this$1$1.base + route.fullPath));
        handleScroll(this$1$1.router, route, fromRoute, false);
        onComplete && onComplete(route);
      }, onAbort);
    };
    HTML5History2.prototype.ensureURL = function ensureURL(push2) {
      if (getLocation(this.base) !== this.current.fullPath) {
        var current = cleanPath(this.base + this.current.fullPath);
        push2 ? pushState(current) : replaceState(current);
      }
    };
    HTML5History2.prototype.getCurrentLocation = function getCurrentLocation() {
      return getLocation(this.base);
    };
    return HTML5History2;
  }(History);
  function getLocation(base) {
    var path = window.location.pathname;
    var pathLowerCase = path.toLowerCase();
    var baseLowerCase = base.toLowerCase();
    if (base && (pathLowerCase === baseLowerCase || pathLowerCase.indexOf(cleanPath(baseLowerCase + "/")) === 0)) {
      path = path.slice(base.length);
    }
    return (path || "/") + window.location.search + window.location.hash;
  }
  var HashHistory = /* @__PURE__ */ function(History3) {
    function HashHistory2(router2, base, fallback) {
      History3.call(this, router2, base);
      if (fallback && checkFallback(this.base)) {
        return;
      }
      ensureSlash();
    }
    if (History3)
      HashHistory2.__proto__ = History3;
    HashHistory2.prototype = Object.create(History3 && History3.prototype);
    HashHistory2.prototype.constructor = HashHistory2;
    HashHistory2.prototype.setupListeners = function setupListeners2() {
      var this$1$1 = this;
      if (this.listeners.length > 0) {
        return;
      }
      var router2 = this.router;
      var expectScroll = router2.options.scrollBehavior;
      var supportsScroll = supportsPushState && expectScroll;
      if (supportsScroll) {
        this.listeners.push(setupScroll());
      }
      var handleRoutingEvent = function() {
        var current = this$1$1.current;
        if (!ensureSlash()) {
          return;
        }
        this$1$1.transitionTo(getHash(), function(route) {
          if (supportsScroll) {
            handleScroll(this$1$1.router, route, current, true);
          }
          if (!supportsPushState) {
            replaceHash(route.fullPath);
          }
        });
      };
      var eventType = supportsPushState ? "popstate" : "hashchange";
      window.addEventListener(
        eventType,
        handleRoutingEvent
      );
      this.listeners.push(function() {
        window.removeEventListener(eventType, handleRoutingEvent);
      });
    };
    HashHistory2.prototype.push = function push2(location2, onComplete, onAbort) {
      var this$1$1 = this;
      var ref2 = this;
      var fromRoute = ref2.current;
      this.transitionTo(
        location2,
        function(route) {
          pushHash(route.fullPath);
          handleScroll(this$1$1.router, route, fromRoute, false);
          onComplete && onComplete(route);
        },
        onAbort
      );
    };
    HashHistory2.prototype.replace = function replace2(location2, onComplete, onAbort) {
      var this$1$1 = this;
      var ref2 = this;
      var fromRoute = ref2.current;
      this.transitionTo(
        location2,
        function(route) {
          replaceHash(route.fullPath);
          handleScroll(this$1$1.router, route, fromRoute, false);
          onComplete && onComplete(route);
        },
        onAbort
      );
    };
    HashHistory2.prototype.go = function go2(n) {
      window.history.go(n);
    };
    HashHistory2.prototype.ensureURL = function ensureURL(push2) {
      var current = this.current.fullPath;
      if (getHash() !== current) {
        push2 ? pushHash(current) : replaceHash(current);
      }
    };
    HashHistory2.prototype.getCurrentLocation = function getCurrentLocation() {
      return getHash();
    };
    return HashHistory2;
  }(History);
  function checkFallback(base) {
    var location2 = getLocation(base);
    if (!/^\/#/.test(location2)) {
      window.location.replace(cleanPath(base + "/#" + location2));
      return true;
    }
  }
  function ensureSlash() {
    var path = getHash();
    if (path.charAt(0) === "/") {
      return true;
    }
    replaceHash("/" + path);
    return false;
  }
  function getHash() {
    var href = window.location.href;
    var index2 = href.indexOf("#");
    if (index2 < 0) {
      return "";
    }
    href = href.slice(index2 + 1);
    return href;
  }
  function getUrl(path) {
    var href = window.location.href;
    var i = href.indexOf("#");
    var base = i >= 0 ? href.slice(0, i) : href;
    return base + "#" + path;
  }
  function pushHash(path) {
    if (supportsPushState) {
      pushState(getUrl(path));
    } else {
      window.location.hash = path;
    }
  }
  function replaceHash(path) {
    if (supportsPushState) {
      replaceState(getUrl(path));
    } else {
      window.location.replace(getUrl(path));
    }
  }
  var AbstractHistory = /* @__PURE__ */ function(History3) {
    function AbstractHistory2(router2, base) {
      History3.call(this, router2, base);
      this.stack = [];
      this.index = -1;
    }
    if (History3)
      AbstractHistory2.__proto__ = History3;
    AbstractHistory2.prototype = Object.create(History3 && History3.prototype);
    AbstractHistory2.prototype.constructor = AbstractHistory2;
    AbstractHistory2.prototype.push = function push2(location2, onComplete, onAbort) {
      var this$1$1 = this;
      this.transitionTo(
        location2,
        function(route) {
          this$1$1.stack = this$1$1.stack.slice(0, this$1$1.index + 1).concat(route);
          this$1$1.index++;
          onComplete && onComplete(route);
        },
        onAbort
      );
    };
    AbstractHistory2.prototype.replace = function replace2(location2, onComplete, onAbort) {
      var this$1$1 = this;
      this.transitionTo(
        location2,
        function(route) {
          this$1$1.stack = this$1$1.stack.slice(0, this$1$1.index).concat(route);
          onComplete && onComplete(route);
        },
        onAbort
      );
    };
    AbstractHistory2.prototype.go = function go2(n) {
      var this$1$1 = this;
      var targetIndex = this.index + n;
      if (targetIndex < 0 || targetIndex >= this.stack.length) {
        return;
      }
      var route = this.stack[targetIndex];
      this.confirmTransition(
        route,
        function() {
          var prev = this$1$1.current;
          this$1$1.index = targetIndex;
          this$1$1.updateRoute(route);
          this$1$1.router.afterHooks.forEach(function(hook) {
            hook && hook(route, prev);
          });
        },
        function(err) {
          if (isNavigationFailure(err, NavigationFailureType.duplicated)) {
            this$1$1.index = targetIndex;
          }
        }
      );
    };
    AbstractHistory2.prototype.getCurrentLocation = function getCurrentLocation() {
      var current = this.stack[this.stack.length - 1];
      return current ? current.fullPath : "/";
    };
    AbstractHistory2.prototype.ensureURL = function ensureURL() {
    };
    return AbstractHistory2;
  }(History);
  var VueRouter = function VueRouter2(options) {
    if (options === void 0)
      options = {};
    if (true) {
      warn2(this instanceof VueRouter2, "Router must be called with the new operator.");
    }
    this.app = null;
    this.apps = [];
    this.options = options;
    this.beforeHooks = [];
    this.resolveHooks = [];
    this.afterHooks = [];
    this.matcher = createMatcher(options.routes || [], this);
    var mode = options.mode || "hash";
    this.fallback = mode === "history" && !supportsPushState && options.fallback !== false;
    if (this.fallback) {
      mode = "hash";
    }
    if (!inBrowser2) {
      mode = "abstract";
    }
    this.mode = mode;
    switch (mode) {
      case "history":
        this.history = new HTML5History(this, options.base);
        break;
      case "hash":
        this.history = new HashHistory(this, options.base, this.fallback);
        break;
      case "abstract":
        this.history = new AbstractHistory(this, options.base);
        break;
      default:
        if (true) {
          assert(false, "invalid mode: " + mode);
        }
    }
  };
  var prototypeAccessors = { currentRoute: { configurable: true } };
  VueRouter.prototype.match = function match(raw, current, redirectedFrom) {
    return this.matcher.match(raw, current, redirectedFrom);
  };
  prototypeAccessors.currentRoute.get = function() {
    return this.history && this.history.current;
  };
  VueRouter.prototype.init = function init(app) {
    var this$1$1 = this;
    assert(
      install.installed,
      "not installed. Make sure to call `Vue.use(VueRouter)` before creating root instance."
    );
    this.apps.push(app);
    app.$once("hook:destroyed", function() {
      var index2 = this$1$1.apps.indexOf(app);
      if (index2 > -1) {
        this$1$1.apps.splice(index2, 1);
      }
      if (this$1$1.app === app) {
        this$1$1.app = this$1$1.apps[0] || null;
      }
      if (!this$1$1.app) {
        this$1$1.history.teardown();
      }
    });
    if (this.app) {
      return;
    }
    this.app = app;
    var history = this.history;
    if (history instanceof HTML5History || history instanceof HashHistory) {
      var handleInitialScroll = function(routeOrError) {
        var from = history.current;
        var expectScroll = this$1$1.options.scrollBehavior;
        var supportsScroll = supportsPushState && expectScroll;
        if (supportsScroll && "fullPath" in routeOrError) {
          handleScroll(this$1$1, routeOrError, from, false);
        }
      };
      var setupListeners2 = function(routeOrError) {
        history.setupListeners();
        handleInitialScroll(routeOrError);
      };
      history.transitionTo(
        history.getCurrentLocation(),
        setupListeners2,
        setupListeners2
      );
    }
    history.listen(function(route) {
      this$1$1.apps.forEach(function(app2) {
        app2._route = route;
      });
    });
  };
  VueRouter.prototype.beforeEach = function beforeEach(fn) {
    return registerHook(this.beforeHooks, fn);
  };
  VueRouter.prototype.beforeResolve = function beforeResolve(fn) {
    return registerHook(this.resolveHooks, fn);
  };
  VueRouter.prototype.afterEach = function afterEach(fn) {
    return registerHook(this.afterHooks, fn);
  };
  VueRouter.prototype.onReady = function onReady2(cb, errorCb) {
    this.history.onReady(cb, errorCb);
  };
  VueRouter.prototype.onError = function onError2(errorCb) {
    this.history.onError(errorCb);
  };
  VueRouter.prototype.push = function push(location2, onComplete, onAbort) {
    var this$1$1 = this;
    if (!onComplete && !onAbort && typeof Promise !== "undefined") {
      return new Promise(function(resolve2, reject) {
        this$1$1.history.push(location2, resolve2, reject);
      });
    } else {
      this.history.push(location2, onComplete, onAbort);
    }
  };
  VueRouter.prototype.replace = function replace(location2, onComplete, onAbort) {
    var this$1$1 = this;
    if (!onComplete && !onAbort && typeof Promise !== "undefined") {
      return new Promise(function(resolve2, reject) {
        this$1$1.history.replace(location2, resolve2, reject);
      });
    } else {
      this.history.replace(location2, onComplete, onAbort);
    }
  };
  VueRouter.prototype.go = function go(n) {
    this.history.go(n);
  };
  VueRouter.prototype.back = function back() {
    this.go(-1);
  };
  VueRouter.prototype.forward = function forward() {
    this.go(1);
  };
  VueRouter.prototype.getMatchedComponents = function getMatchedComponents(to) {
    var route = to ? to.matched ? to : this.resolve(to).route : this.currentRoute;
    if (!route) {
      return [];
    }
    return [].concat.apply(
      [],
      route.matched.map(function(m) {
        return Object.keys(m.components).map(function(key) {
          return m.components[key];
        });
      })
    );
  };
  VueRouter.prototype.resolve = function resolve(to, current, append) {
    current = current || this.history.current;
    var location2 = normalizeLocation(to, current, append, this);
    var route = this.match(location2, current);
    var fullPath = route.redirectedFrom || route.fullPath;
    var base = this.history.base;
    var href = createHref(base, fullPath, this.mode);
    return {
      location: location2,
      route,
      href,
      normalizedTo: location2,
      resolved: route
    };
  };
  VueRouter.prototype.getRoutes = function getRoutes() {
    return this.matcher.getRoutes();
  };
  VueRouter.prototype.addRoute = function addRoute(parentOrRoute, route) {
    this.matcher.addRoute(parentOrRoute, route);
    if (this.history.current !== START) {
      this.history.transitionTo(this.history.getCurrentLocation());
    }
  };
  VueRouter.prototype.addRoutes = function addRoutes(routes) {
    if (true) {
      warn2(false, "router.addRoutes() is deprecated and has been removed in Vue Router 4. Use router.addRoute() instead.");
    }
    this.matcher.addRoutes(routes);
    if (this.history.current !== START) {
      this.history.transitionTo(this.history.getCurrentLocation());
    }
  };
  Object.defineProperties(VueRouter.prototype, prototypeAccessors);
  var VueRouter$1 = VueRouter;
  function registerHook(list, fn) {
    list.push(fn);
    return function() {
      var i = list.indexOf(fn);
      if (i > -1) {
        list.splice(i, 1);
      }
    };
  }
  function createHref(base, fullPath, mode) {
    var path = mode === "hash" ? "#" + fullPath : fullPath;
    return base ? cleanPath(base + "/" + path) : path;
  }
  VueRouter.install = install;
  VueRouter.version = "3.6.5";
  VueRouter.isNavigationFailure = isNavigationFailure;
  VueRouter.NavigationFailureType = NavigationFailureType;
  VueRouter.START_LOCATION = START;
  if (inBrowser2 && window.Vue) {
    window.Vue.use(VueRouter);
  }

  // src/components/UiIcon.vue
  var __vue_script__ = {
    props: {
      type: {
        type: String,
        required: true
      }
    }
  };
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "svg",
      {
        staticClass: "icon",
        attrs: { viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }
      },
      [
        _vm.type === "archive" ? _c("path", {
          attrs: {
            d: "M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"
          }
        }) : _vm._e(),
        _vm._v(" "),
        _vm.type === "add" ? _c("path", { attrs: { d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" } }) : _vm._e(),
        _vm._v(" "),
        _vm.type === "delete" ? _c("path", {
          attrs: {
            d: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
          }
        }) : _vm._e(),
        _vm._v(" "),
        _vm.type === "share" ? _c("path", {
          attrs: {
            d: "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"
          }
        }) : _vm._e(),
        _vm._v(" "),
        _vm.type === "unarchive" ? _c("path", {
          attrs: {
            d: "M20.55 5.22l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.15.55L3.46 5.22C3.17 5.57 3 6.01 3 6.5V19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.49-.17-.93-.45-1.28zM12 9.5l5.5 5.5H14v2h-4v-2H6.5L12 9.5zM5.12 5l.82-1h12l.93 1H5.12z"
          }
        }) : _vm._e(),
        _vm._v(" "),
        _vm.type === "edit" ? _c("path", {
          attrs: {
            d: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
          }
        }) : _vm._e(),
        _vm._v(" "),
        _vm.type === "document" ? _c("path", {
          attrs: {
            d: "M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"
          }
        }) : _vm._e(),
        _vm._v(" "),
        _vm.type === "menu" ? _c("path", {
          attrs: { d: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" }
        }) : _vm._e(),
        _vm._v(" "),
        _vm.type === "home" ? _c("path", { attrs: { d: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" } }) : _vm._e(),
        _vm._v(" "),
        _vm.type === "close" ? _c("path", {
          attrs: {
            d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
          }
        }) : _vm._e(),
        _vm._v(" "),
        _c("path", { attrs: { d: "M0 0h24v24H0z", fill: "none" } })
      ]
    );
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;
  var __vue_inject_styles__ = function(inject) {
    if (!inject)
      return;
    inject("data-v-acba1d44_0", { source: "\n.icon {\n  fill: currentColor;\n  height: 1em;\n  width: auto;\n}\n", map: { "version": 3, "sources": ["src/components/UiIcon.vue"], "names": [], "mappings": ";AAoDA;EACA,kBAAA;EACA,WAAA;EACA,WAAA;AACA", "file": "UiIcon.vue", "sourcesContent": [`<template>
  <svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      v-if="type === 'archive'"
      d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"
    />
    <path v-if="type === 'add'" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    <path
      v-if="type === 'delete'"
      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
    />
    <path
      v-if="type === 'share'"
      d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"
    />
    <path
      v-if="type === 'unarchive'"
      d="M20.55 5.22l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.15.55L3.46 5.22C3.17 5.57 3 6.01 3 6.5V19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.49-.17-.93-.45-1.28zM12 9.5l5.5 5.5H14v2h-4v-2H6.5L12 9.5zM5.12 5l.82-1h12l.93 1H5.12z"
    />
    <path
      v-if="type === 'edit'"
      d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
    />
    <path
      v-if="type === 'document'"
      d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"
    />
    <path
      v-if="type === 'menu'"
      d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
    />
    <path v-if="type === 'home'" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    <path
      v-if="type === 'close'"
      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
    />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
  },
};
<\/script>

<style lang="css">
.icon {
  fill: currentColor;
  height: 1em;
  width: auto;
}
</style>
`] }, media: void 0 });
  };
  var __vue_scope_id__ = void 0;
  var __vue_module_identifier__ = void 0;
  var __vue_is_functional_template__ = false;
  function __vue_normalize__(template, style2, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "src/components/UiIcon.vue";
    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional)
        component.functional = true;
    }
    component._scopeId = scope;
    if (true) {
      let hook;
      if (false) {
        hook = function(context) {
          context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
          if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
            context = __VUE_SSR_CONTEXT__;
          }
          if (style2) {
            style2.call(this, createInjectorSSR(context));
          }
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        component._ssrRegister = hook;
      } else if (style2) {
        hook = shadowMode ? function(context) {
          style2.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function(context) {
          style2.call(this, createInjector(context));
        };
      }
      if (hook !== void 0) {
        if (component.functional) {
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }
    return component;
  }
  function __vue_create_injector__() {
    const styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
    const isOldIE = typeof navigator !== "undefined" && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]'))
        return;
      const group = isOldIE ? css.media || "default" : id;
      const style2 = styles[group] || (styles[group] = { ids: [], parts: [], element: void 0 });
      if (!style2.ids.includes(id)) {
        let code = css.source;
        let index2 = style2.ids.length;
        style2.ids.push(id);
        if (false) {
          code += "\n/*# sourceURL=" + css.map.sources[0] + " */";
          code += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + " */";
        }
        if (isOldIE) {
          style2.element = style2.element || document.querySelector("style[data-group=" + group + "]");
        }
        if (!style2.element) {
          const head = document.head || document.getElementsByTagName("head")[0];
          const el = style2.element = document.createElement("style");
          el.type = "text/css";
          if (css.media)
            el.setAttribute("media", css.media);
          if (isOldIE) {
            el.setAttribute("data-group", group);
            el.setAttribute("data-next-index", "0");
          }
          head.appendChild(el);
        }
        if (isOldIE) {
          index2 = parseInt(style2.element.getAttribute("data-next-index"));
          style2.element.setAttribute("data-next-index", index2 + 1);
        }
        if (style2.element.styleSheet) {
          style2.parts.push(code);
          style2.element.styleSheet.cssText = style2.parts.filter(Boolean).join("\n");
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style2.element.childNodes;
          if (nodes[index2])
            style2.element.removeChild(nodes[index2]);
          if (nodes.length)
            style2.element.insertBefore(textNode, nodes[index2]);
          else
            style2.element.appendChild(textNode);
        }
      }
    };
  }
  var __vue_component__ = /* @__PURE__ */ __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    __vue_create_injector__,
    void 0,
    void 0
  );
  var UiIcon_default = __vue_component__;

  // src/components/AppBar.vue
  var __vue_script__2 = {
    components: {
      UiIcon: UiIcon_default
    },
    computed: {
      showArchive() {
        return this.$route.name === "home";
      }
    }
  };
  var __vue_render__2 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "app-bar" }, [
      _c(
        "div",
        {
          staticStyle: { display: "flex" },
          on: {
            click: function($event) {
              return _vm.$emit("toggleMenu");
            }
          }
        },
        [
          _c("UiIcon", {
            staticStyle: { height: "1.5rem" },
            attrs: { type: "menu" }
          })
        ],
        1
      ),
      _vm._v("\n  \xA0\n  "),
      _c(
        "h1",
        { staticClass: "app-bar__title" },
        [
          _c(
            "router-link",
            {
              staticClass: "app-bar__title-link",
              attrs: { to: { name: "home" } }
            },
            [_vm._v("\n      Simply Notes\n    ")]
          )
        ],
        1
      )
    ]);
  };
  var __vue_staticRenderFns__2 = [];
  __vue_render__2._withStripped = true;
  var __vue_inject_styles__2 = function(inject) {
    if (!inject)
      return;
    inject("data-v-dffad83c_0", { source: "\n.app-bar {\n  display: flex;\n  position: sticky;\n  margin: calc(var(--spacing) * 0.5);\n  padding: calc(var(--spacing) * 0.5);\n  top: 0;\n  left: 0;\n  right: 0;\n  background-color: var(--color-primary);\n  color: var(--color-primary-text);\n  box-shadow: 0 2px 0.25rem hsla(0, 0%, 0%, 0.2);\n  align-items: center;\n}\n.app-bar__title {\n  flex: auto;\n  margin: 0;\n  font-size: 1.2rem;\n  font-weight: normal;\n  text-transform: uppercase;\n}\n.app-bar__title-link {\n  display: block;\n  color: inherit;\n  text-decoration: none;\n}\n", map: { "version": 3, "sources": ["src/components/AppBar.vue"], "names": [], "mappings": ";AA8BA;EACA,aAAA;EACA,gBAAA;EACA,kCAAA;EACA,mCAAA;EACA,MAAA;EACA,OAAA;EACA,QAAA;EACA,sCAAA;EACA,gCAAA;EACA,8CAAA;EACA,mBAAA;AACA;AAEA;EACA,UAAA;EACA,SAAA;EACA,iBAAA;EACA,mBAAA;EACA,yBAAA;AACA;AAEA;EACA,cAAA;EACA,cAAA;EACA,qBAAA;AACA", "file": "AppBar.vue", "sourcesContent": [`<template>
  <div class="app-bar">
    <div @click="$emit('toggleMenu')" style="display: flex">
      <UiIcon type="menu" style="height: 1.5rem" />
    </div>
    &nbsp;
    <h1 class="app-bar__title">
      <router-link :to="{ name: 'home' }" class="app-bar__title-link">
        Simply Notes
      </router-link>
    </h1>
  </div>
</template>

<script>
import UiIcon from "./UiIcon.vue";

export default {
  components: {
    UiIcon,
  },
  computed: {
    showArchive() {
      return this.$route.name === "home";
    },
  },
};
<\/script>

<style lang="css">
.app-bar {
  display: flex;
  position: sticky;
  margin: calc(var(--spacing) * 0.5);
  padding: calc(var(--spacing) * 0.5);
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--color-primary);
  color: var(--color-primary-text);
  box-shadow: 0 2px 0.25rem hsla(0, 0%, 0%, 0.2);
  align-items: center;
}

.app-bar__title {
  flex: auto;
  margin: 0;
  font-size: 1.2rem;
  font-weight: normal;
  text-transform: uppercase;
}

.app-bar__title-link {
  display: block;
  color: inherit;
  text-decoration: none;
}
</style>
`] }, media: void 0 });
  };
  var __vue_scope_id__2 = void 0;
  var __vue_module_identifier__2 = void 0;
  var __vue_is_functional_template__2 = false;
  function __vue_normalize__2(template, style2, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "src/components/AppBar.vue";
    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional)
        component.functional = true;
    }
    component._scopeId = scope;
    if (true) {
      let hook;
      if (false) {
        hook = function(context) {
          context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
          if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
            context = __VUE_SSR_CONTEXT__;
          }
          if (style2) {
            style2.call(this, createInjectorSSR(context));
          }
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        component._ssrRegister = hook;
      } else if (style2) {
        hook = shadowMode ? function(context) {
          style2.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function(context) {
          style2.call(this, createInjector(context));
        };
      }
      if (hook !== void 0) {
        if (component.functional) {
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }
    return component;
  }
  function __vue_create_injector__2() {
    const styles = __vue_create_injector__2.styles || (__vue_create_injector__2.styles = {});
    const isOldIE = typeof navigator !== "undefined" && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]'))
        return;
      const group = isOldIE ? css.media || "default" : id;
      const style2 = styles[group] || (styles[group] = { ids: [], parts: [], element: void 0 });
      if (!style2.ids.includes(id)) {
        let code = css.source;
        let index2 = style2.ids.length;
        style2.ids.push(id);
        if (false) {
          code += "\n/*# sourceURL=" + css.map.sources[0] + " */";
          code += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + " */";
        }
        if (isOldIE) {
          style2.element = style2.element || document.querySelector("style[data-group=" + group + "]");
        }
        if (!style2.element) {
          const head = document.head || document.getElementsByTagName("head")[0];
          const el = style2.element = document.createElement("style");
          el.type = "text/css";
          if (css.media)
            el.setAttribute("media", css.media);
          if (isOldIE) {
            el.setAttribute("data-group", group);
            el.setAttribute("data-next-index", "0");
          }
          head.appendChild(el);
        }
        if (isOldIE) {
          index2 = parseInt(style2.element.getAttribute("data-next-index"));
          style2.element.setAttribute("data-next-index", index2 + 1);
        }
        if (style2.element.styleSheet) {
          style2.parts.push(code);
          style2.element.styleSheet.cssText = style2.parts.filter(Boolean).join("\n");
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style2.element.childNodes;
          if (nodes[index2])
            style2.element.removeChild(nodes[index2]);
          if (nodes.length)
            style2.element.insertBefore(textNode, nodes[index2]);
          else
            style2.element.appendChild(textNode);
        }
      }
    };
  }
  var __vue_component__2 = /* @__PURE__ */ __vue_normalize__2(
    { render: __vue_render__2, staticRenderFns: __vue_staticRenderFns__2 },
    __vue_inject_styles__2,
    __vue_script__2,
    __vue_scope_id__2,
    __vue_is_functional_template__2,
    __vue_module_identifier__2,
    false,
    __vue_create_injector__2,
    void 0,
    void 0
  );
  var AppBar_default = __vue_component__2;

  // src/components/AppMenu.vue
  var __vue_script__3 = {
    components: {
      UiIcon: UiIcon_default
    },
    props: {
      visible: {
        type: Boolean,
        required: true
      }
    }
  };
  var __vue_render__3 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "app-menu__container" }, [
      _c("div", {
        class: {
          "app-menu__backdrop": true,
          "app-menu__backdrop--visible": _vm.visible
        },
        on: {
          click: function($event) {
            if ($event.target !== $event.currentTarget) {
              return null;
            }
            return _vm.$emit("close");
          }
        }
      }),
      _vm._v(" "),
      _c(
        "menu",
        { class: { "app-menu": true, "app-menu--visible": _vm.visible } },
        [
          _c(
            "li",
            [
              _c(
                "router-link",
                {
                  class: {
                    "app-menu__action": true,
                    "app-menu__action--active": _vm.$route.name === "home"
                  },
                  attrs: { to: { name: "home" } },
                  nativeOn: {
                    click: function($event) {
                      return _vm.$emit("close");
                    }
                  }
                },
                [
                  _c("UiIcon", { attrs: { type: "home" } }),
                  _vm._v(" Home\n      ")
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "li",
            [
              _c(
                "router-link",
                {
                  class: {
                    "app-menu__action": true,
                    "app-menu__action--active": _vm.$route.name === "archive"
                  },
                  attrs: { to: { name: "archive" } },
                  nativeOn: {
                    click: function($event) {
                      return _vm.$emit("close");
                    }
                  }
                },
                [
                  _c("UiIcon", { attrs: { type: "archive" } }),
                  _vm._v(" Archive\n      ")
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c("li", [
            _c(
              "span",
              {
                staticClass: "app-menu__action",
                on: {
                  click: function($event) {
                    return _vm.$emit("close");
                  }
                }
              },
              [
                _c("UiIcon", { attrs: { type: "close" } }),
                _vm._v(" Close\n      ")
              ],
              1
            )
          ])
        ]
      )
    ]);
  };
  var __vue_staticRenderFns__3 = [];
  __vue_render__3._withStripped = true;
  var __vue_inject_styles__3 = function(inject) {
    if (!inject)
      return;
    inject("data-v-79c8ff87_0", { source: "\n.app-menu__backdrop {\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  opacity: 0;\n  z-index: -10;\n  transition: opacity ease-in-out 0.5s;\n}\n.app-menu__backdrop--visible {\n  display: block;\n  opacity: 1;\n  z-index: 1300;\n}\n.app-menu {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-evenly;\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  margin: 0;\n  min-width: 230px;\n  width: 100%;\n  padding: 0;\n  background-color: hsla(0, 0%, 0%, 0.6);\n  list-style-type: none;\n  z-index: 1305;\n  transform: translateX(-100%);\n  transition: transform ease-in-out 0.4s;\n}\n.app-menu--visible {\n  transform: translateX(0%);\n}\n.app-menu__action {\n  display: flex;\n  flex-direction: column;\n  padding: calc(var(--spacing) * 2) var(--spacing);\n  font-size: 1.5rem;\n  font-weight: 500;\n  text-decoration: none;\n  align-items: center;\n  color: inherit;\n  cursor: pointer;\n}\n.app-menu__action--active {\n  color: var(--color-highlight);\n  text-shadow: 0 0 10px currentColor;\n}\n.app-menu__action > .icon {\n  font-size: 3rem;\n}\n", map: { "version": 3, "sources": ["src/components/AppMenu.vue"], "names": [], "mappings": ";AA6DA;EACA,cAAA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,SAAA;EACA,QAAA;EACA,oCAAA;EACA,UAAA;EACA,YAAA;EACA,oCAAA;AACA;AAEA;EACA,cAAA;EACA,UAAA;EACA,aAAA;AACA;AAEA;EACA,aAAA;EACA,sBAAA;EACA,6BAAA;EACA,kBAAA;EACA,OAAA;EACA,MAAA;EACA,SAAA;EACA,SAAA;EACA,gBAAA;EACA,WAAA;EACA,UAAA;EACA,sCAAA;EACA,qBAAA;EACA,aAAA;EACA,4BAAA;EACA,sCAAA;AACA;AAEA;EACA,yBAAA;AACA;AAEA;EACA,aAAA;EACA,sBAAA;EACA,gDAAA;EACA,iBAAA;EACA,gBAAA;EACA,qBAAA;EACA,mBAAA;EACA,cAAA;EACA,eAAA;AACA;AAEA;EACA,6BAAA;EACA,kCAAA;AACA;AAEA;EACA,eAAA;AACA", "file": "AppMenu.vue", "sourcesContent": [`<template>
  <div class="app-menu__container">
    <div
      :class="{
        'app-menu__backdrop': true,
        'app-menu__backdrop--visible': visible,
      }"
      @click.self="$emit('close')"
    />

    <menu :class="{ 'app-menu': true, 'app-menu--visible': visible }">
      <li>
        <router-link
          :to="{ name: 'home' }"
          :class="{
            'app-menu__action': true,
            'app-menu__action--active': $route.name === 'home',
          }"
          @click.native="$emit('close')"
        >
          <UiIcon type="home" /> Home
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'archive' }"
          :class="{
            'app-menu__action': true,
            'app-menu__action--active': $route.name === 'archive',
          }"
          @click.native="$emit('close')"
        >
          <UiIcon type="archive" /> Archive
        </router-link>
      </li>
      <li>
        <span class="app-menu__action" @click="$emit('close')">
          <UiIcon type="close" /> Close
        </span>
      </li>
    </menu>
  </div>
</template>

<script>
import UiIcon from "./UiIcon.vue";

export default {
  components: {
    UiIcon,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
};
<\/script>

<style lang="css">
.app-menu__backdrop {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: -10;
  transition: opacity ease-in-out 0.5s;
}

.app-menu__backdrop--visible {
  display: block;
  opacity: 1;
  z-index: 1300;
}

.app-menu {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  margin: 0;
  min-width: 230px;
  width: 100%;
  padding: 0;
  background-color: hsla(0, 0%, 0%, 0.6);
  list-style-type: none;
  z-index: 1305;
  transform: translateX(-100%);
  transition: transform ease-in-out 0.4s;
}

.app-menu--visible {
  transform: translateX(0%);
}

.app-menu__action {
  display: flex;
  flex-direction: column;
  padding: calc(var(--spacing) * 2) var(--spacing);
  font-size: 1.5rem;
  font-weight: 500;
  text-decoration: none;
  align-items: center;
  color: inherit;
  cursor: pointer;
}

.app-menu__action--active {
  color: var(--color-highlight);
  text-shadow: 0 0 10px currentColor;
}

.app-menu__action > .icon {
  font-size: 3rem;
}
</style>
`] }, media: void 0 });
  };
  var __vue_scope_id__3 = void 0;
  var __vue_module_identifier__3 = void 0;
  var __vue_is_functional_template__3 = false;
  function __vue_normalize__3(template, style2, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "src/components/AppMenu.vue";
    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional)
        component.functional = true;
    }
    component._scopeId = scope;
    if (true) {
      let hook;
      if (false) {
        hook = function(context) {
          context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
          if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
            context = __VUE_SSR_CONTEXT__;
          }
          if (style2) {
            style2.call(this, createInjectorSSR(context));
          }
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        component._ssrRegister = hook;
      } else if (style2) {
        hook = shadowMode ? function(context) {
          style2.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function(context) {
          style2.call(this, createInjector(context));
        };
      }
      if (hook !== void 0) {
        if (component.functional) {
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }
    return component;
  }
  function __vue_create_injector__3() {
    const styles = __vue_create_injector__3.styles || (__vue_create_injector__3.styles = {});
    const isOldIE = typeof navigator !== "undefined" && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]'))
        return;
      const group = isOldIE ? css.media || "default" : id;
      const style2 = styles[group] || (styles[group] = { ids: [], parts: [], element: void 0 });
      if (!style2.ids.includes(id)) {
        let code = css.source;
        let index2 = style2.ids.length;
        style2.ids.push(id);
        if (false) {
          code += "\n/*# sourceURL=" + css.map.sources[0] + " */";
          code += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + " */";
        }
        if (isOldIE) {
          style2.element = style2.element || document.querySelector("style[data-group=" + group + "]");
        }
        if (!style2.element) {
          const head = document.head || document.getElementsByTagName("head")[0];
          const el = style2.element = document.createElement("style");
          el.type = "text/css";
          if (css.media)
            el.setAttribute("media", css.media);
          if (isOldIE) {
            el.setAttribute("data-group", group);
            el.setAttribute("data-next-index", "0");
          }
          head.appendChild(el);
        }
        if (isOldIE) {
          index2 = parseInt(style2.element.getAttribute("data-next-index"));
          style2.element.setAttribute("data-next-index", index2 + 1);
        }
        if (style2.element.styleSheet) {
          style2.parts.push(code);
          style2.element.styleSheet.cssText = style2.parts.filter(Boolean).join("\n");
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style2.element.childNodes;
          if (nodes[index2])
            style2.element.removeChild(nodes[index2]);
          if (nodes.length)
            style2.element.insertBefore(textNode, nodes[index2]);
          else
            style2.element.appendChild(textNode);
        }
      }
    };
  }
  var __vue_component__3 = /* @__PURE__ */ __vue_normalize__3(
    { render: __vue_render__3, staticRenderFns: __vue_staticRenderFns__3 },
    __vue_inject_styles__3,
    __vue_script__3,
    __vue_scope_id__3,
    __vue_is_functional_template__3,
    __vue_module_identifier__3,
    false,
    __vue_create_injector__3,
    void 0,
    void 0
  );
  var AppMenu_default = __vue_component__3;

  // src/App.vue
  var __vue_script__4 = {
    components: {
      AppBar: AppBar_default,
      AppMenu: AppMenu_default
    },
    data: () => ({
      showMenu: false
    })
  };
  var __vue_render__4 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "app" },
      [
        _c("AppBar", {
          on: {
            toggleMenu: function($event) {
              _vm.showMenu = !_vm.showMenu;
            }
          }
        }),
        _vm._v(" "),
        _c("AppMenu", {
          attrs: { visible: _vm.showMenu },
          on: {
            close: function($event) {
              _vm.showMenu = false;
            }
          }
        }),
        _vm._v(" "),
        _vm.$store.state.app.isLoaded ? _c("router-view", { key: _vm.$route.fullPath }) : _c("div", { staticClass: "app__loading" }, [_vm._v("Loading...")])
      ],
      1
    );
  };
  var __vue_staticRenderFns__4 = [];
  __vue_render__4._withStripped = true;
  var __vue_inject_styles__4 = function(inject) {
    if (!inject)
      return;
    inject("data-v-eb11d7ae_0", { source: "\n.app {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  user-select: none;\n  -ms-user-select: none;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n}\n.app__loading {\n  margin-top: 2rem;\n  align-self: center;\n  text-align: center;\n}\n", map: { "version": 3, "sources": ["src/App.vue"], "names": [], "mappings": ";AAyBA;EACA,aAAA;EACA,sBAAA;EACA,iBAAA;EACA,iBAAA;EACA,qBAAA;EACA,sBAAA;EACA,yBAAA;AACA;AAEA;EACA,gBAAA;EACA,kBAAA;EACA,kBAAA;AACA", "file": "App.vue", "sourcesContent": ['<template>\n  <div class="app">\n    <AppBar @toggleMenu="showMenu = !showMenu" />\n    <AppMenu :visible="showMenu" @close="showMenu = false" />\n    <router-view v-if="$store.state.app.isLoaded" :key="$route.fullPath" />\n    <div v-else class="app__loading">Loading...</div>\n  </div>\n</template>\n\n<script>\nimport AppBar from "./components/AppBar.vue";\nimport AppMenu from "./components/AppMenu.vue";\n\nexport default {\n  components: {\n    AppBar,\n    AppMenu,\n  },\n  data: () => ({\n    showMenu: false,\n  }),\n};\n<\/script>\n\n<style lang="css">\n.app {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  user-select: none;\n  -ms-user-select: none;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n}\n\n.app__loading {\n  margin-top: 2rem;\n  align-self: center;\n  text-align: center;\n}\n</style>\n'] }, media: void 0 });
  };
  var __vue_scope_id__4 = void 0;
  var __vue_module_identifier__4 = void 0;
  var __vue_is_functional_template__4 = false;
  function __vue_normalize__4(template, style2, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "src/App.vue";
    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional)
        component.functional = true;
    }
    component._scopeId = scope;
    if (true) {
      let hook;
      if (false) {
        hook = function(context) {
          context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
          if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
            context = __VUE_SSR_CONTEXT__;
          }
          if (style2) {
            style2.call(this, createInjectorSSR(context));
          }
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        component._ssrRegister = hook;
      } else if (style2) {
        hook = shadowMode ? function(context) {
          style2.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function(context) {
          style2.call(this, createInjector(context));
        };
      }
      if (hook !== void 0) {
        if (component.functional) {
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }
    return component;
  }
  function __vue_create_injector__4() {
    const styles = __vue_create_injector__4.styles || (__vue_create_injector__4.styles = {});
    const isOldIE = typeof navigator !== "undefined" && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]'))
        return;
      const group = isOldIE ? css.media || "default" : id;
      const style2 = styles[group] || (styles[group] = { ids: [], parts: [], element: void 0 });
      if (!style2.ids.includes(id)) {
        let code = css.source;
        let index2 = style2.ids.length;
        style2.ids.push(id);
        if (false) {
          code += "\n/*# sourceURL=" + css.map.sources[0] + " */";
          code += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + " */";
        }
        if (isOldIE) {
          style2.element = style2.element || document.querySelector("style[data-group=" + group + "]");
        }
        if (!style2.element) {
          const head = document.head || document.getElementsByTagName("head")[0];
          const el = style2.element = document.createElement("style");
          el.type = "text/css";
          if (css.media)
            el.setAttribute("media", css.media);
          if (isOldIE) {
            el.setAttribute("data-group", group);
            el.setAttribute("data-next-index", "0");
          }
          head.appendChild(el);
        }
        if (isOldIE) {
          index2 = parseInt(style2.element.getAttribute("data-next-index"));
          style2.element.setAttribute("data-next-index", index2 + 1);
        }
        if (style2.element.styleSheet) {
          style2.parts.push(code);
          style2.element.styleSheet.cssText = style2.parts.filter(Boolean).join("\n");
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style2.element.childNodes;
          if (nodes[index2])
            style2.element.removeChild(nodes[index2]);
          if (nodes.length)
            style2.element.insertBefore(textNode, nodes[index2]);
          else
            style2.element.appendChild(textNode);
        }
      }
    };
  }
  var __vue_component__4 = /* @__PURE__ */ __vue_normalize__4(
    { render: __vue_render__4, staticRenderFns: __vue_staticRenderFns__4 },
    __vue_inject_styles__4,
    __vue_script__4,
    __vue_scope_id__4,
    __vue_is_functional_template__4,
    __vue_module_identifier__4,
    false,
    __vue_create_injector__4,
    void 0,
    void 0
  );
  var App_default = __vue_component__4;

  // node_modules/vuex/dist/vuex.mjs
  var import_vuex_common = __toESM(require_vuex_common(), 1);
  var {
    Store,
    install: install2,
    version: version2,
    mapState,
    mapMutations,
    mapGetters,
    mapActions,
    createNamespacedHelpers,
    createLogger
  } = import_vuex_common.default;

  // store/mutation-types.js
  var POPULATE = "POPULATE";
  var ADD_NOTE = "ADD_NOTE";
  var EDIT_NOTE = "EDIT_NOTE";
  var DELETE_NOTE = "DELETE_NOTE";
  var ARCHIVE_NOTE = "ARCHIVE_NOTE";
  var UNARCHIVE_NOTE = "UNARCHIVE_NOTE";

  // node_modules/dexie/dist/modern/dexie.mjs
  var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
  var keys = Object.keys;
  var isArray2 = Array.isArray;
  if (typeof Promise !== "undefined" && !_global.Promise) {
    _global.Promise = Promise;
  }
  function extend3(obj, extension) {
    if (typeof extension !== "object")
      return obj;
    keys(extension).forEach(function(key) {
      obj[key] = extension[key];
    });
    return obj;
  }
  var getProto = Object.getPrototypeOf;
  var _hasOwn = {}.hasOwnProperty;
  function hasOwn2(obj, prop) {
    return _hasOwn.call(obj, prop);
  }
  function props2(proto, extension) {
    if (typeof extension === "function")
      extension = extension(getProto(proto));
    (typeof Reflect === "undefined" ? keys : Reflect.ownKeys)(extension).forEach((key) => {
      setProp2(proto, key, extension[key]);
    });
  }
  var defineProperty = Object.defineProperty;
  function setProp2(obj, prop, functionOrGetSet, options) {
    defineProperty(obj, prop, extend3(functionOrGetSet && hasOwn2(functionOrGetSet, "get") && typeof functionOrGetSet.get === "function" ? { get: functionOrGetSet.get, set: functionOrGetSet.set, configurable: true } : { value: functionOrGetSet, configurable: true, writable: true }, options));
  }
  function derive(Child) {
    return {
      from: function(Parent) {
        Child.prototype = Object.create(Parent.prototype);
        setProp2(Child.prototype, "constructor", Child);
        return {
          extend: props2.bind(null, Child.prototype)
        };
      }
    };
  }
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  function getPropertyDescriptor(obj, prop) {
    const pd = getOwnPropertyDescriptor(obj, prop);
    let proto;
    return pd || (proto = getProto(obj)) && getPropertyDescriptor(proto, prop);
  }
  var _slice = [].slice;
  function slice(args, start, end) {
    return _slice.call(args, start, end);
  }
  function override(origFunc, overridedFactory) {
    return overridedFactory(origFunc);
  }
  function assert2(b) {
    if (!b)
      throw new Error("Assertion Failed");
  }
  function asap$1(fn) {
    if (_global.setImmediate)
      setImmediate(fn);
    else
      setTimeout(fn, 0);
  }
  function arrayToObject(array, extractor) {
    return array.reduce((result, item, i) => {
      var nameAndValue = extractor(item, i);
      if (nameAndValue)
        result[nameAndValue[0]] = nameAndValue[1];
      return result;
    }, {});
  }
  function tryCatch(fn, onerror, args) {
    try {
      fn.apply(null, args);
    } catch (ex) {
      onerror && onerror(ex);
    }
  }
  function getByKeyPath(obj, keyPath) {
    if (hasOwn2(obj, keyPath))
      return obj[keyPath];
    if (!keyPath)
      return obj;
    if (typeof keyPath !== "string") {
      var rv = [];
      for (var i = 0, l = keyPath.length; i < l; ++i) {
        var val = getByKeyPath(obj, keyPath[i]);
        rv.push(val);
      }
      return rv;
    }
    var period = keyPath.indexOf(".");
    if (period !== -1) {
      var innerObj = obj[keyPath.substr(0, period)];
      return innerObj === void 0 ? void 0 : getByKeyPath(innerObj, keyPath.substr(period + 1));
    }
    return void 0;
  }
  function setByKeyPath(obj, keyPath, value) {
    if (!obj || keyPath === void 0)
      return;
    if ("isFrozen" in Object && Object.isFrozen(obj))
      return;
    if (typeof keyPath !== "string" && "length" in keyPath) {
      assert2(typeof value !== "string" && "length" in value);
      for (var i = 0, l = keyPath.length; i < l; ++i) {
        setByKeyPath(obj, keyPath[i], value[i]);
      }
    } else {
      var period = keyPath.indexOf(".");
      if (period !== -1) {
        var currentKeyPath = keyPath.substr(0, period);
        var remainingKeyPath = keyPath.substr(period + 1);
        if (remainingKeyPath === "")
          if (value === void 0) {
            if (isArray2(obj) && !isNaN(parseInt(currentKeyPath)))
              obj.splice(currentKeyPath, 1);
            else
              delete obj[currentKeyPath];
          } else
            obj[currentKeyPath] = value;
        else {
          var innerObj = obj[currentKeyPath];
          if (!innerObj || !hasOwn2(obj, currentKeyPath))
            innerObj = obj[currentKeyPath] = {};
          setByKeyPath(innerObj, remainingKeyPath, value);
        }
      } else {
        if (value === void 0) {
          if (isArray2(obj) && !isNaN(parseInt(keyPath)))
            obj.splice(keyPath, 1);
          else
            delete obj[keyPath];
        } else
          obj[keyPath] = value;
      }
    }
  }
  function delByKeyPath(obj, keyPath) {
    if (typeof keyPath === "string")
      setByKeyPath(obj, keyPath, void 0);
    else if ("length" in keyPath)
      [].map.call(keyPath, function(kp) {
        setByKeyPath(obj, kp, void 0);
      });
  }
  function shallowClone(obj) {
    var rv = {};
    for (var m in obj) {
      if (hasOwn2(obj, m))
        rv[m] = obj[m];
    }
    return rv;
  }
  var concat2 = [].concat;
  function flatten2(a) {
    return concat2.apply([], a);
  }
  var intrinsicTypeNames = "Boolean,String,Date,RegExp,Blob,File,FileList,FileSystemFileHandle,ArrayBuffer,DataView,Uint8ClampedArray,ImageBitmap,ImageData,Map,Set,CryptoKey".split(",").concat(flatten2([8, 16, 32, 64].map((num) => ["Int", "Uint", "Float"].map((t) => t + num + "Array")))).filter((t) => _global[t]);
  var intrinsicTypes = intrinsicTypeNames.map((t) => _global[t]);
  arrayToObject(intrinsicTypeNames, (x) => [x, true]);
  var circularRefs = null;
  function deepClone(any) {
    circularRefs = typeof WeakMap !== "undefined" && /* @__PURE__ */ new WeakMap();
    const rv = innerDeepClone(any);
    circularRefs = null;
    return rv;
  }
  function innerDeepClone(any) {
    if (!any || typeof any !== "object")
      return any;
    let rv = circularRefs && circularRefs.get(any);
    if (rv)
      return rv;
    if (isArray2(any)) {
      rv = [];
      circularRefs && circularRefs.set(any, rv);
      for (var i = 0, l = any.length; i < l; ++i) {
        rv.push(innerDeepClone(any[i]));
      }
    } else if (intrinsicTypes.indexOf(any.constructor) >= 0) {
      rv = any;
    } else {
      const proto = getProto(any);
      rv = proto === Object.prototype ? {} : Object.create(proto);
      circularRefs && circularRefs.set(any, rv);
      for (var prop in any) {
        if (hasOwn2(any, prop)) {
          rv[prop] = innerDeepClone(any[prop]);
        }
      }
    }
    return rv;
  }
  var { toString: toString2 } = {};
  function toStringTag(o) {
    return toString2.call(o).slice(8, -1);
  }
  var iteratorSymbol = typeof Symbol !== "undefined" ? Symbol.iterator : "@@iterator";
  var getIteratorOf = typeof iteratorSymbol === "symbol" ? function(x) {
    var i;
    return x != null && (i = x[iteratorSymbol]) && i.apply(x);
  } : function() {
    return null;
  };
  var NO_CHAR_ARRAY = {};
  function getArrayOf(arrayLike) {
    var i, a, x, it;
    if (arguments.length === 1) {
      if (isArray2(arrayLike))
        return arrayLike.slice();
      if (this === NO_CHAR_ARRAY && typeof arrayLike === "string")
        return [arrayLike];
      if (it = getIteratorOf(arrayLike)) {
        a = [];
        while (x = it.next(), !x.done)
          a.push(x.value);
        return a;
      }
      if (arrayLike == null)
        return [arrayLike];
      i = arrayLike.length;
      if (typeof i === "number") {
        a = new Array(i);
        while (i--)
          a[i] = arrayLike[i];
        return a;
      }
      return [arrayLike];
    }
    i = arguments.length;
    a = new Array(i);
    while (i--)
      a[i] = arguments[i];
    return a;
  }
  var isAsyncFunction = typeof Symbol !== "undefined" ? (fn) => fn[Symbol.toStringTag] === "AsyncFunction" : () => false;
  var debug = typeof location !== "undefined" && /^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);
  function setDebug(value, filter) {
    debug = value;
    libraryFilter = filter;
  }
  var libraryFilter = () => true;
  var NEEDS_THROW_FOR_STACK = !new Error("").stack;
  function getErrorWithStack() {
    if (NEEDS_THROW_FOR_STACK)
      try {
        getErrorWithStack.arguments;
        throw new Error();
      } catch (e) {
        return e;
      }
    return new Error();
  }
  function prettyStack(exception, numIgnoredFrames) {
    var stack = exception.stack;
    if (!stack)
      return "";
    numIgnoredFrames = numIgnoredFrames || 0;
    if (stack.indexOf(exception.name) === 0)
      numIgnoredFrames += (exception.name + exception.message).split("\n").length;
    return stack.split("\n").slice(numIgnoredFrames).filter(libraryFilter).map((frame) => "\n" + frame).join("");
  }
  var dexieErrorNames = [
    "Modify",
    "Bulk",
    "OpenFailed",
    "VersionChange",
    "Schema",
    "Upgrade",
    "InvalidTable",
    "MissingAPI",
    "NoSuchDatabase",
    "InvalidArgument",
    "SubTransaction",
    "Unsupported",
    "Internal",
    "DatabaseClosed",
    "PrematureCommit",
    "ForeignAwait"
  ];
  var idbDomErrorNames = [
    "Unknown",
    "Constraint",
    "Data",
    "TransactionInactive",
    "ReadOnly",
    "Version",
    "NotFound",
    "InvalidState",
    "InvalidAccess",
    "Abort",
    "Timeout",
    "QuotaExceeded",
    "Syntax",
    "DataClone"
  ];
  var errorList = dexieErrorNames.concat(idbDomErrorNames);
  var defaultTexts = {
    VersionChanged: "Database version changed by other database connection",
    DatabaseClosed: "Database has been closed",
    Abort: "Transaction aborted",
    TransactionInactive: "Transaction has already completed or failed",
    MissingAPI: "IndexedDB API missing. Please visit https://tinyurl.com/y2uuvskb"
  };
  function DexieError(name, msg) {
    this._e = getErrorWithStack();
    this.name = name;
    this.message = msg;
  }
  derive(DexieError).from(Error).extend({
    stack: {
      get: function() {
        return this._stack || (this._stack = this.name + ": " + this.message + prettyStack(this._e, 2));
      }
    },
    toString: function() {
      return this.name + ": " + this.message;
    }
  });
  function getMultiErrorMessage(msg, failures) {
    return msg + ". Errors: " + Object.keys(failures).map((key) => failures[key].toString()).filter((v, i, s) => s.indexOf(v) === i).join("\n");
  }
  function ModifyError(msg, failures, successCount, failedKeys) {
    this._e = getErrorWithStack();
    this.failures = failures;
    this.failedKeys = failedKeys;
    this.successCount = successCount;
    this.message = getMultiErrorMessage(msg, failures);
  }
  derive(ModifyError).from(DexieError);
  function BulkError(msg, failures) {
    this._e = getErrorWithStack();
    this.name = "BulkError";
    this.failures = Object.keys(failures).map((pos) => failures[pos]);
    this.failuresByPos = failures;
    this.message = getMultiErrorMessage(msg, failures);
  }
  derive(BulkError).from(DexieError);
  var errnames = errorList.reduce((obj, name) => (obj[name] = name + "Error", obj), {});
  var BaseException = DexieError;
  var exceptions = errorList.reduce((obj, name) => {
    var fullName = name + "Error";
    function DexieError2(msgOrInner, inner) {
      this._e = getErrorWithStack();
      this.name = fullName;
      if (!msgOrInner) {
        this.message = defaultTexts[name] || fullName;
        this.inner = null;
      } else if (typeof msgOrInner === "string") {
        this.message = `${msgOrInner}${!inner ? "" : "\n " + inner}`;
        this.inner = inner || null;
      } else if (typeof msgOrInner === "object") {
        this.message = `${msgOrInner.name} ${msgOrInner.message}`;
        this.inner = msgOrInner;
      }
    }
    derive(DexieError2).from(BaseException);
    obj[name] = DexieError2;
    return obj;
  }, {});
  exceptions.Syntax = SyntaxError;
  exceptions.Type = TypeError;
  exceptions.Range = RangeError;
  var exceptionMap = idbDomErrorNames.reduce((obj, name) => {
    obj[name + "Error"] = exceptions[name];
    return obj;
  }, {});
  function mapError(domError, message) {
    if (!domError || domError instanceof DexieError || domError instanceof TypeError || domError instanceof SyntaxError || !domError.name || !exceptionMap[domError.name])
      return domError;
    var rv = new exceptionMap[domError.name](message || domError.message, domError);
    if ("stack" in domError) {
      setProp2(rv, "stack", { get: function() {
        return this.inner.stack;
      } });
    }
    return rv;
  }
  var fullNameExceptions = errorList.reduce((obj, name) => {
    if (["Syntax", "Type", "Range"].indexOf(name) === -1)
      obj[name + "Error"] = exceptions[name];
    return obj;
  }, {});
  fullNameExceptions.ModifyError = ModifyError;
  fullNameExceptions.DexieError = DexieError;
  fullNameExceptions.BulkError = BulkError;
  function nop() {
  }
  function mirror(val) {
    return val;
  }
  function pureFunctionChain(f1, f2) {
    if (f1 == null || f1 === mirror)
      return f2;
    return function(val) {
      return f2(f1(val));
    };
  }
  function callBoth(on1, on2) {
    return function() {
      on1.apply(this, arguments);
      on2.apply(this, arguments);
    };
  }
  function hookCreatingChain(f1, f2) {
    if (f1 === nop)
      return f2;
    return function() {
      var res = f1.apply(this, arguments);
      if (res !== void 0)
        arguments[0] = res;
      var onsuccess = this.onsuccess, onerror = this.onerror;
      this.onsuccess = null;
      this.onerror = null;
      var res2 = f2.apply(this, arguments);
      if (onsuccess)
        this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
      if (onerror)
        this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
      return res2 !== void 0 ? res2 : res;
    };
  }
  function hookDeletingChain(f1, f2) {
    if (f1 === nop)
      return f2;
    return function() {
      f1.apply(this, arguments);
      var onsuccess = this.onsuccess, onerror = this.onerror;
      this.onsuccess = this.onerror = null;
      f2.apply(this, arguments);
      if (onsuccess)
        this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
      if (onerror)
        this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
    };
  }
  function hookUpdatingChain(f1, f2) {
    if (f1 === nop)
      return f2;
    return function(modifications) {
      var res = f1.apply(this, arguments);
      extend3(modifications, res);
      var onsuccess = this.onsuccess, onerror = this.onerror;
      this.onsuccess = null;
      this.onerror = null;
      var res2 = f2.apply(this, arguments);
      if (onsuccess)
        this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
      if (onerror)
        this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
      return res === void 0 ? res2 === void 0 ? void 0 : res2 : extend3(res, res2);
    };
  }
  function reverseStoppableEventChain(f1, f2) {
    if (f1 === nop)
      return f2;
    return function() {
      if (f2.apply(this, arguments) === false)
        return false;
      return f1.apply(this, arguments);
    };
  }
  function promisableChain(f1, f2) {
    if (f1 === nop)
      return f2;
    return function() {
      var res = f1.apply(this, arguments);
      if (res && typeof res.then === "function") {
        var thiz = this, i = arguments.length, args = new Array(i);
        while (i--)
          args[i] = arguments[i];
        return res.then(function() {
          return f2.apply(thiz, args);
        });
      }
      return f2.apply(this, arguments);
    };
  }
  var INTERNAL = {};
  var LONG_STACKS_CLIP_LIMIT = 100;
  var MAX_LONG_STACKS = 20;
  var ZONE_ECHO_LIMIT = 100;
  var [resolvedNativePromise, nativePromiseProto, resolvedGlobalPromise] = typeof Promise === "undefined" ? [] : (() => {
    let globalP = Promise.resolve();
    if (typeof crypto === "undefined" || !crypto.subtle)
      return [globalP, getProto(globalP), globalP];
    const nativeP = crypto.subtle.digest("SHA-512", new Uint8Array([0]));
    return [
      nativeP,
      getProto(nativeP),
      globalP
    ];
  })();
  var nativePromiseThen = nativePromiseProto && nativePromiseProto.then;
  var NativePromise = resolvedNativePromise && resolvedNativePromise.constructor;
  var patchGlobalPromise = !!resolvedGlobalPromise;
  var stack_being_generated = false;
  var schedulePhysicalTick = resolvedGlobalPromise ? () => {
    resolvedGlobalPromise.then(physicalTick);
  } : _global.setImmediate ? setImmediate.bind(null, physicalTick) : _global.MutationObserver ? () => {
    var hiddenDiv = document.createElement("div");
    new MutationObserver(() => {
      physicalTick();
      hiddenDiv = null;
    }).observe(hiddenDiv, { attributes: true });
    hiddenDiv.setAttribute("i", "1");
  } : () => {
    setTimeout(physicalTick, 0);
  };
  var asap = function(callback, args) {
    microtickQueue.push([callback, args]);
    if (needsNewPhysicalTick) {
      schedulePhysicalTick();
      needsNewPhysicalTick = false;
    }
  };
  var isOutsideMicroTick = true;
  var needsNewPhysicalTick = true;
  var unhandledErrors = [];
  var rejectingErrors = [];
  var currentFulfiller = null;
  var rejectionMapper = mirror;
  var globalPSD = {
    id: "global",
    global: true,
    ref: 0,
    unhandleds: [],
    onunhandled: globalError,
    pgp: false,
    env: {},
    finalize: function() {
      this.unhandleds.forEach((uh) => {
        try {
          globalError(uh[0], uh[1]);
        } catch (e) {
        }
      });
    }
  };
  var PSD = globalPSD;
  var microtickQueue = [];
  var numScheduledCalls = 0;
  var tickFinalizers = [];
  function DexiePromise(fn) {
    if (typeof this !== "object")
      throw new TypeError("Promises must be constructed via new");
    this._listeners = [];
    this.onuncatched = nop;
    this._lib = false;
    var psd = this._PSD = PSD;
    if (debug) {
      this._stackHolder = getErrorWithStack();
      this._prev = null;
      this._numPrev = 0;
    }
    if (typeof fn !== "function") {
      if (fn !== INTERNAL)
        throw new TypeError("Not a function");
      this._state = arguments[1];
      this._value = arguments[2];
      if (this._state === false)
        handleRejection(this, this._value);
      return;
    }
    this._state = null;
    this._value = null;
    ++psd.ref;
    executePromiseTask(this, fn);
  }
  var thenProp = {
    get: function() {
      var psd = PSD, microTaskId = totalEchoes;
      function then(onFulfilled, onRejected) {
        var possibleAwait = !psd.global && (psd !== PSD || microTaskId !== totalEchoes);
        const cleanup = possibleAwait && !decrementExpectedAwaits();
        var rv = new DexiePromise((resolve2, reject) => {
          propagateToListener(this, new Listener(nativeAwaitCompatibleWrap(onFulfilled, psd, possibleAwait, cleanup), nativeAwaitCompatibleWrap(onRejected, psd, possibleAwait, cleanup), resolve2, reject, psd));
        });
        debug && linkToPreviousPromise(rv, this);
        return rv;
      }
      then.prototype = INTERNAL;
      return then;
    },
    set: function(value) {
      setProp2(this, "then", value && value.prototype === INTERNAL ? thenProp : {
        get: function() {
          return value;
        },
        set: thenProp.set
      });
    }
  };
  props2(DexiePromise.prototype, {
    then: thenProp,
    _then: function(onFulfilled, onRejected) {
      propagateToListener(this, new Listener(null, null, onFulfilled, onRejected, PSD));
    },
    catch: function(onRejected) {
      if (arguments.length === 1)
        return this.then(null, onRejected);
      var type2 = arguments[0], handler = arguments[1];
      return typeof type2 === "function" ? this.then(null, (err) => err instanceof type2 ? handler(err) : PromiseReject(err)) : this.then(null, (err) => err && err.name === type2 ? handler(err) : PromiseReject(err));
    },
    finally: function(onFinally) {
      return this.then((value) => {
        onFinally();
        return value;
      }, (err) => {
        onFinally();
        return PromiseReject(err);
      });
    },
    stack: {
      get: function() {
        if (this._stack)
          return this._stack;
        try {
          stack_being_generated = true;
          var stacks = getStack(this, [], MAX_LONG_STACKS);
          var stack = stacks.join("\nFrom previous: ");
          if (this._state !== null)
            this._stack = stack;
          return stack;
        } finally {
          stack_being_generated = false;
        }
      }
    },
    timeout: function(ms, msg) {
      return ms < Infinity ? new DexiePromise((resolve2, reject) => {
        var handle = setTimeout(() => reject(new exceptions.Timeout(msg)), ms);
        this.then(resolve2, reject).finally(clearTimeout.bind(null, handle));
      }) : this;
    }
  });
  if (typeof Symbol !== "undefined" && Symbol.toStringTag)
    setProp2(DexiePromise.prototype, Symbol.toStringTag, "Dexie.Promise");
  globalPSD.env = snapShot();
  function Listener(onFulfilled, onRejected, resolve2, reject, zone) {
    this.onFulfilled = typeof onFulfilled === "function" ? onFulfilled : null;
    this.onRejected = typeof onRejected === "function" ? onRejected : null;
    this.resolve = resolve2;
    this.reject = reject;
    this.psd = zone;
  }
  props2(DexiePromise, {
    all: function() {
      var values = getArrayOf.apply(null, arguments).map(onPossibleParallellAsync);
      return new DexiePromise(function(resolve2, reject) {
        if (values.length === 0)
          resolve2([]);
        var remaining = values.length;
        values.forEach((a, i) => DexiePromise.resolve(a).then((x) => {
          values[i] = x;
          if (!--remaining)
            resolve2(values);
        }, reject));
      });
    },
    resolve: (value) => {
      if (value instanceof DexiePromise)
        return value;
      if (value && typeof value.then === "function")
        return new DexiePromise((resolve2, reject) => {
          value.then(resolve2, reject);
        });
      var rv = new DexiePromise(INTERNAL, true, value);
      linkToPreviousPromise(rv, currentFulfiller);
      return rv;
    },
    reject: PromiseReject,
    race: function() {
      var values = getArrayOf.apply(null, arguments).map(onPossibleParallellAsync);
      return new DexiePromise((resolve2, reject) => {
        values.map((value) => DexiePromise.resolve(value).then(resolve2, reject));
      });
    },
    PSD: {
      get: () => PSD,
      set: (value) => PSD = value
    },
    totalEchoes: { get: () => totalEchoes },
    newPSD: newScope,
    usePSD,
    scheduler: {
      get: () => asap,
      set: (value) => {
        asap = value;
      }
    },
    rejectionMapper: {
      get: () => rejectionMapper,
      set: (value) => {
        rejectionMapper = value;
      }
    },
    follow: (fn, zoneProps) => {
      return new DexiePromise((resolve2, reject) => {
        return newScope((resolve3, reject2) => {
          var psd = PSD;
          psd.unhandleds = [];
          psd.onunhandled = reject2;
          psd.finalize = callBoth(function() {
            run_at_end_of_this_or_next_physical_tick(() => {
              this.unhandleds.length === 0 ? resolve3() : reject2(this.unhandleds[0]);
            });
          }, psd.finalize);
          fn();
        }, zoneProps, resolve2, reject);
      });
    }
  });
  if (NativePromise) {
    if (NativePromise.allSettled)
      setProp2(DexiePromise, "allSettled", function() {
        const possiblePromises = getArrayOf.apply(null, arguments).map(onPossibleParallellAsync);
        return new DexiePromise((resolve2) => {
          if (possiblePromises.length === 0)
            resolve2([]);
          let remaining = possiblePromises.length;
          const results = new Array(remaining);
          possiblePromises.forEach((p, i) => DexiePromise.resolve(p).then((value) => results[i] = { status: "fulfilled", value }, (reason) => results[i] = { status: "rejected", reason }).then(() => --remaining || resolve2(results)));
        });
      });
    if (NativePromise.any && typeof AggregateError !== "undefined")
      setProp2(DexiePromise, "any", function() {
        const possiblePromises = getArrayOf.apply(null, arguments).map(onPossibleParallellAsync);
        return new DexiePromise((resolve2, reject) => {
          if (possiblePromises.length === 0)
            reject(new AggregateError([]));
          let remaining = possiblePromises.length;
          const failures = new Array(remaining);
          possiblePromises.forEach((p, i) => DexiePromise.resolve(p).then((value) => resolve2(value), (failure) => {
            failures[i] = failure;
            if (!--remaining)
              reject(new AggregateError(failures));
          }));
        });
      });
  }
  function executePromiseTask(promise, fn) {
    try {
      fn((value) => {
        if (promise._state !== null)
          return;
        if (value === promise)
          throw new TypeError("A promise cannot be resolved with itself.");
        var shouldExecuteTick = promise._lib && beginMicroTickScope();
        if (value && typeof value.then === "function") {
          executePromiseTask(promise, (resolve2, reject) => {
            value instanceof DexiePromise ? value._then(resolve2, reject) : value.then(resolve2, reject);
          });
        } else {
          promise._state = true;
          promise._value = value;
          propagateAllListeners(promise);
        }
        if (shouldExecuteTick)
          endMicroTickScope();
      }, handleRejection.bind(null, promise));
    } catch (ex) {
      handleRejection(promise, ex);
    }
  }
  function handleRejection(promise, reason) {
    rejectingErrors.push(reason);
    if (promise._state !== null)
      return;
    var shouldExecuteTick = promise._lib && beginMicroTickScope();
    reason = rejectionMapper(reason);
    promise._state = false;
    promise._value = reason;
    debug && reason !== null && typeof reason === "object" && !reason._promise && tryCatch(() => {
      var origProp = getPropertyDescriptor(reason, "stack");
      reason._promise = promise;
      setProp2(reason, "stack", {
        get: () => stack_being_generated ? origProp && (origProp.get ? origProp.get.apply(reason) : origProp.value) : promise.stack
      });
    });
    addPossiblyUnhandledError(promise);
    propagateAllListeners(promise);
    if (shouldExecuteTick)
      endMicroTickScope();
  }
  function propagateAllListeners(promise) {
    var listeners = promise._listeners;
    promise._listeners = [];
    for (var i = 0, len = listeners.length; i < len; ++i) {
      propagateToListener(promise, listeners[i]);
    }
    var psd = promise._PSD;
    --psd.ref || psd.finalize();
    if (numScheduledCalls === 0) {
      ++numScheduledCalls;
      asap(() => {
        if (--numScheduledCalls === 0)
          finalizePhysicalTick();
      }, []);
    }
  }
  function propagateToListener(promise, listener) {
    if (promise._state === null) {
      promise._listeners.push(listener);
      return;
    }
    var cb = promise._state ? listener.onFulfilled : listener.onRejected;
    if (cb === null) {
      return (promise._state ? listener.resolve : listener.reject)(promise._value);
    }
    ++listener.psd.ref;
    ++numScheduledCalls;
    asap(callListener, [cb, promise, listener]);
  }
  function callListener(cb, promise, listener) {
    try {
      currentFulfiller = promise;
      var ret, value = promise._value;
      if (promise._state) {
        ret = cb(value);
      } else {
        if (rejectingErrors.length)
          rejectingErrors = [];
        ret = cb(value);
        if (rejectingErrors.indexOf(value) === -1)
          markErrorAsHandled(promise);
      }
      listener.resolve(ret);
    } catch (e) {
      listener.reject(e);
    } finally {
      currentFulfiller = null;
      if (--numScheduledCalls === 0)
        finalizePhysicalTick();
      --listener.psd.ref || listener.psd.finalize();
    }
  }
  function getStack(promise, stacks, limit) {
    if (stacks.length === limit)
      return stacks;
    var stack = "";
    if (promise._state === false) {
      var failure = promise._value, errorName, message;
      if (failure != null) {
        errorName = failure.name || "Error";
        message = failure.message || failure;
        stack = prettyStack(failure, 0);
      } else {
        errorName = failure;
        message = "";
      }
      stacks.push(errorName + (message ? ": " + message : "") + stack);
    }
    if (debug) {
      stack = prettyStack(promise._stackHolder, 2);
      if (stack && stacks.indexOf(stack) === -1)
        stacks.push(stack);
      if (promise._prev)
        getStack(promise._prev, stacks, limit);
    }
    return stacks;
  }
  function linkToPreviousPromise(promise, prev) {
    var numPrev = prev ? prev._numPrev + 1 : 0;
    if (numPrev < LONG_STACKS_CLIP_LIMIT) {
      promise._prev = prev;
      promise._numPrev = numPrev;
    }
  }
  function physicalTick() {
    beginMicroTickScope() && endMicroTickScope();
  }
  function beginMicroTickScope() {
    var wasRootExec = isOutsideMicroTick;
    isOutsideMicroTick = false;
    needsNewPhysicalTick = false;
    return wasRootExec;
  }
  function endMicroTickScope() {
    var callbacks2, i, l;
    do {
      while (microtickQueue.length > 0) {
        callbacks2 = microtickQueue;
        microtickQueue = [];
        l = callbacks2.length;
        for (i = 0; i < l; ++i) {
          var item = callbacks2[i];
          item[0].apply(null, item[1]);
        }
      }
    } while (microtickQueue.length > 0);
    isOutsideMicroTick = true;
    needsNewPhysicalTick = true;
  }
  function finalizePhysicalTick() {
    var unhandledErrs = unhandledErrors;
    unhandledErrors = [];
    unhandledErrs.forEach((p) => {
      p._PSD.onunhandled.call(null, p._value, p);
    });
    var finalizers = tickFinalizers.slice(0);
    var i = finalizers.length;
    while (i)
      finalizers[--i]();
  }
  function run_at_end_of_this_or_next_physical_tick(fn) {
    function finalizer() {
      fn();
      tickFinalizers.splice(tickFinalizers.indexOf(finalizer), 1);
    }
    tickFinalizers.push(finalizer);
    ++numScheduledCalls;
    asap(() => {
      if (--numScheduledCalls === 0)
        finalizePhysicalTick();
    }, []);
  }
  function addPossiblyUnhandledError(promise) {
    if (!unhandledErrors.some((p) => p._value === promise._value))
      unhandledErrors.push(promise);
  }
  function markErrorAsHandled(promise) {
    var i = unhandledErrors.length;
    while (i)
      if (unhandledErrors[--i]._value === promise._value) {
        unhandledErrors.splice(i, 1);
        return;
      }
  }
  function PromiseReject(reason) {
    return new DexiePromise(INTERNAL, false, reason);
  }
  function wrap(fn, errorCatcher) {
    var psd = PSD;
    return function() {
      var wasRootExec = beginMicroTickScope(), outerScope = PSD;
      try {
        switchToZone(psd, true);
        return fn.apply(this, arguments);
      } catch (e) {
        errorCatcher && errorCatcher(e);
      } finally {
        switchToZone(outerScope, false);
        if (wasRootExec)
          endMicroTickScope();
      }
    };
  }
  var task = { awaits: 0, echoes: 0, id: 0 };
  var taskCounter = 0;
  var zoneStack = [];
  var zoneEchoes = 0;
  var totalEchoes = 0;
  var zone_id_counter = 0;
  function newScope(fn, props3, a1, a2) {
    var parent = PSD, psd = Object.create(parent);
    psd.parent = parent;
    psd.ref = 0;
    psd.global = false;
    psd.id = ++zone_id_counter;
    var globalEnv = globalPSD.env;
    psd.env = patchGlobalPromise ? {
      Promise: DexiePromise,
      PromiseProp: { value: DexiePromise, configurable: true, writable: true },
      all: DexiePromise.all,
      race: DexiePromise.race,
      allSettled: DexiePromise.allSettled,
      any: DexiePromise.any,
      resolve: DexiePromise.resolve,
      reject: DexiePromise.reject,
      nthen: getPatchedPromiseThen(globalEnv.nthen, psd),
      gthen: getPatchedPromiseThen(globalEnv.gthen, psd)
    } : {};
    if (props3)
      extend3(psd, props3);
    ++parent.ref;
    psd.finalize = function() {
      --this.parent.ref || this.parent.finalize();
    };
    var rv = usePSD(psd, fn, a1, a2);
    if (psd.ref === 0)
      psd.finalize();
    return rv;
  }
  function incrementExpectedAwaits() {
    if (!task.id)
      task.id = ++taskCounter;
    ++task.awaits;
    task.echoes += ZONE_ECHO_LIMIT;
    return task.id;
  }
  function decrementExpectedAwaits() {
    if (!task.awaits)
      return false;
    if (--task.awaits === 0)
      task.id = 0;
    task.echoes = task.awaits * ZONE_ECHO_LIMIT;
    return true;
  }
  if (("" + nativePromiseThen).indexOf("[native code]") === -1) {
    incrementExpectedAwaits = decrementExpectedAwaits = nop;
  }
  function onPossibleParallellAsync(possiblePromise) {
    if (task.echoes && possiblePromise && possiblePromise.constructor === NativePromise) {
      incrementExpectedAwaits();
      return possiblePromise.then((x) => {
        decrementExpectedAwaits();
        return x;
      }, (e) => {
        decrementExpectedAwaits();
        return rejection(e);
      });
    }
    return possiblePromise;
  }
  function zoneEnterEcho(targetZone) {
    ++totalEchoes;
    if (!task.echoes || --task.echoes === 0) {
      task.echoes = task.id = 0;
    }
    zoneStack.push(PSD);
    switchToZone(targetZone, true);
  }
  function zoneLeaveEcho() {
    var zone = zoneStack[zoneStack.length - 1];
    zoneStack.pop();
    switchToZone(zone, false);
  }
  function switchToZone(targetZone, bEnteringZone) {
    var currentZone = PSD;
    if (bEnteringZone ? task.echoes && (!zoneEchoes++ || targetZone !== PSD) : zoneEchoes && (!--zoneEchoes || targetZone !== PSD)) {
      enqueueNativeMicroTask(bEnteringZone ? zoneEnterEcho.bind(null, targetZone) : zoneLeaveEcho);
    }
    if (targetZone === PSD)
      return;
    PSD = targetZone;
    if (currentZone === globalPSD)
      globalPSD.env = snapShot();
    if (patchGlobalPromise) {
      var GlobalPromise = globalPSD.env.Promise;
      var targetEnv = targetZone.env;
      nativePromiseProto.then = targetEnv.nthen;
      GlobalPromise.prototype.then = targetEnv.gthen;
      if (currentZone.global || targetZone.global) {
        Object.defineProperty(_global, "Promise", targetEnv.PromiseProp);
        GlobalPromise.all = targetEnv.all;
        GlobalPromise.race = targetEnv.race;
        GlobalPromise.resolve = targetEnv.resolve;
        GlobalPromise.reject = targetEnv.reject;
        if (targetEnv.allSettled)
          GlobalPromise.allSettled = targetEnv.allSettled;
        if (targetEnv.any)
          GlobalPromise.any = targetEnv.any;
      }
    }
  }
  function snapShot() {
    var GlobalPromise = _global.Promise;
    return patchGlobalPromise ? {
      Promise: GlobalPromise,
      PromiseProp: Object.getOwnPropertyDescriptor(_global, "Promise"),
      all: GlobalPromise.all,
      race: GlobalPromise.race,
      allSettled: GlobalPromise.allSettled,
      any: GlobalPromise.any,
      resolve: GlobalPromise.resolve,
      reject: GlobalPromise.reject,
      nthen: nativePromiseProto.then,
      gthen: GlobalPromise.prototype.then
    } : {};
  }
  function usePSD(psd, fn, a1, a2, a3) {
    var outerScope = PSD;
    try {
      switchToZone(psd, true);
      return fn(a1, a2, a3);
    } finally {
      switchToZone(outerScope, false);
    }
  }
  function enqueueNativeMicroTask(job) {
    nativePromiseThen.call(resolvedNativePromise, job);
  }
  function nativeAwaitCompatibleWrap(fn, zone, possibleAwait, cleanup) {
    return typeof fn !== "function" ? fn : function() {
      var outerZone = PSD;
      if (possibleAwait)
        incrementExpectedAwaits();
      switchToZone(zone, true);
      try {
        return fn.apply(this, arguments);
      } finally {
        switchToZone(outerZone, false);
        if (cleanup)
          enqueueNativeMicroTask(decrementExpectedAwaits);
      }
    };
  }
  function getPatchedPromiseThen(origThen, zone) {
    return function(onResolved, onRejected) {
      return origThen.call(this, nativeAwaitCompatibleWrap(onResolved, zone), nativeAwaitCompatibleWrap(onRejected, zone));
    };
  }
  var UNHANDLEDREJECTION = "unhandledrejection";
  function globalError(err, promise) {
    var rv;
    try {
      rv = promise.onuncatched(err);
    } catch (e) {
    }
    if (rv !== false)
      try {
        var event, eventData = { promise, reason: err };
        if (_global.document && document.createEvent) {
          event = document.createEvent("Event");
          event.initEvent(UNHANDLEDREJECTION, true, true);
          extend3(event, eventData);
        } else if (_global.CustomEvent) {
          event = new CustomEvent(UNHANDLEDREJECTION, { detail: eventData });
          extend3(event, eventData);
        }
        if (event && _global.dispatchEvent) {
          dispatchEvent(event);
          if (!_global.PromiseRejectionEvent && _global.onunhandledrejection)
            try {
              _global.onunhandledrejection(event);
            } catch (_) {
            }
        }
        if (debug && event && !event.defaultPrevented) {
          console.warn(`Unhandled rejection: ${err.stack || err}`);
        }
      } catch (e) {
      }
  }
  var rejection = DexiePromise.reject;
  function tempTransaction(db2, mode, storeNames, fn) {
    if (!db2.idbdb || !db2._state.openComplete && (!PSD.letThrough && !db2._vip)) {
      if (db2._state.openComplete) {
        return rejection(new exceptions.DatabaseClosed(db2._state.dbOpenError));
      }
      if (!db2._state.isBeingOpened) {
        if (!db2._options.autoOpen)
          return rejection(new exceptions.DatabaseClosed());
        db2.open().catch(nop);
      }
      return db2._state.dbReadyPromise.then(() => tempTransaction(db2, mode, storeNames, fn));
    } else {
      var trans = db2._createTransaction(mode, storeNames, db2._dbSchema);
      try {
        trans.create();
        db2._state.PR1398_maxLoop = 3;
      } catch (ex) {
        if (ex.name === errnames.InvalidState && db2.isOpen() && --db2._state.PR1398_maxLoop > 0) {
          console.warn("Dexie: Need to reopen db");
          db2._close();
          return db2.open().then(() => tempTransaction(db2, mode, storeNames, fn));
        }
        return rejection(ex);
      }
      return trans._promise(mode, (resolve2, reject) => {
        return newScope(() => {
          PSD.trans = trans;
          return fn(resolve2, reject, trans);
        });
      }).then((result) => {
        return trans._completion.then(() => result);
      });
    }
  }
  var DEXIE_VERSION = "3.2.2";
  var maxString = String.fromCharCode(65535);
  var minKey = -Infinity;
  var INVALID_KEY_ARGUMENT = "Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.";
  var STRING_EXPECTED = "String expected.";
  var connections = [];
  var isIEOrEdge = typeof navigator !== "undefined" && /(MSIE|Trident|Edge)/.test(navigator.userAgent);
  var hasIEDeleteObjectStoreBug = isIEOrEdge;
  var hangsOnDeleteLargeKeyRange = isIEOrEdge;
  var dexieStackFrameFilter = (frame) => !/(dexie\.js|dexie\.min\.js)/.test(frame);
  var DBNAMES_DB = "__dbnames";
  var READONLY = "readonly";
  var READWRITE = "readwrite";
  function combine(filter1, filter2) {
    return filter1 ? filter2 ? function() {
      return filter1.apply(this, arguments) && filter2.apply(this, arguments);
    } : filter1 : filter2;
  }
  var AnyRange = {
    type: 3,
    lower: -Infinity,
    lowerOpen: false,
    upper: [[]],
    upperOpen: false
  };
  function workaroundForUndefinedPrimKey(keyPath) {
    return typeof keyPath === "string" && !/\./.test(keyPath) ? (obj) => {
      if (obj[keyPath] === void 0 && keyPath in obj) {
        obj = deepClone(obj);
        delete obj[keyPath];
      }
      return obj;
    } : (obj) => obj;
  }
  var Table = class {
    _trans(mode, fn, writeLocked) {
      const trans = this._tx || PSD.trans;
      const tableName = this.name;
      function checkTableInTransaction(resolve2, reject, trans2) {
        if (!trans2.schema[tableName])
          throw new exceptions.NotFound("Table " + tableName + " not part of transaction");
        return fn(trans2.idbtrans, trans2);
      }
      const wasRootExec = beginMicroTickScope();
      try {
        return trans && trans.db === this.db ? trans === PSD.trans ? trans._promise(mode, checkTableInTransaction, writeLocked) : newScope(() => trans._promise(mode, checkTableInTransaction, writeLocked), { trans, transless: PSD.transless || PSD }) : tempTransaction(this.db, mode, [this.name], checkTableInTransaction);
      } finally {
        if (wasRootExec)
          endMicroTickScope();
      }
    }
    get(keyOrCrit, cb) {
      if (keyOrCrit && keyOrCrit.constructor === Object)
        return this.where(keyOrCrit).first(cb);
      return this._trans("readonly", (trans) => {
        return this.core.get({ trans, key: keyOrCrit }).then((res) => this.hook.reading.fire(res));
      }).then(cb);
    }
    where(indexOrCrit) {
      if (typeof indexOrCrit === "string")
        return new this.db.WhereClause(this, indexOrCrit);
      if (isArray2(indexOrCrit))
        return new this.db.WhereClause(this, `[${indexOrCrit.join("+")}]`);
      const keyPaths = keys(indexOrCrit);
      if (keyPaths.length === 1)
        return this.where(keyPaths[0]).equals(indexOrCrit[keyPaths[0]]);
      const compoundIndex = this.schema.indexes.concat(this.schema.primKey).filter((ix) => ix.compound && keyPaths.every((keyPath) => ix.keyPath.indexOf(keyPath) >= 0) && ix.keyPath.every((keyPath) => keyPaths.indexOf(keyPath) >= 0))[0];
      if (compoundIndex && this.db._maxKey !== maxString)
        return this.where(compoundIndex.name).equals(compoundIndex.keyPath.map((kp) => indexOrCrit[kp]));
      if (!compoundIndex && debug)
        console.warn(`The query ${JSON.stringify(indexOrCrit)} on ${this.name} would benefit of a compound index [${keyPaths.join("+")}]`);
      const { idxByName } = this.schema;
      const idb = this.db._deps.indexedDB;
      function equals(a, b) {
        try {
          return idb.cmp(a, b) === 0;
        } catch (e) {
          return false;
        }
      }
      const [idx, filterFunction] = keyPaths.reduce(([prevIndex, prevFilterFn], keyPath) => {
        const index2 = idxByName[keyPath];
        const value = indexOrCrit[keyPath];
        return [
          prevIndex || index2,
          prevIndex || !index2 ? combine(prevFilterFn, index2 && index2.multi ? (x) => {
            const prop = getByKeyPath(x, keyPath);
            return isArray2(prop) && prop.some((item) => equals(value, item));
          } : (x) => equals(value, getByKeyPath(x, keyPath))) : prevFilterFn
        ];
      }, [null, null]);
      return idx ? this.where(idx.name).equals(indexOrCrit[idx.keyPath]).filter(filterFunction) : compoundIndex ? this.filter(filterFunction) : this.where(keyPaths).equals("");
    }
    filter(filterFunction) {
      return this.toCollection().and(filterFunction);
    }
    count(thenShortcut) {
      return this.toCollection().count(thenShortcut);
    }
    offset(offset) {
      return this.toCollection().offset(offset);
    }
    limit(numRows) {
      return this.toCollection().limit(numRows);
    }
    each(callback) {
      return this.toCollection().each(callback);
    }
    toArray(thenShortcut) {
      return this.toCollection().toArray(thenShortcut);
    }
    toCollection() {
      return new this.db.Collection(new this.db.WhereClause(this));
    }
    orderBy(index2) {
      return new this.db.Collection(new this.db.WhereClause(this, isArray2(index2) ? `[${index2.join("+")}]` : index2));
    }
    reverse() {
      return this.toCollection().reverse();
    }
    mapToClass(constructor) {
      this.schema.mappedClass = constructor;
      const readHook = (obj) => {
        if (!obj)
          return obj;
        const res = Object.create(constructor.prototype);
        for (var m in obj)
          if (hasOwn2(obj, m))
            try {
              res[m] = obj[m];
            } catch (_) {
            }
        return res;
      };
      if (this.schema.readHook) {
        this.hook.reading.unsubscribe(this.schema.readHook);
      }
      this.schema.readHook = readHook;
      this.hook("reading", readHook);
      return constructor;
    }
    defineClass() {
      function Class(content) {
        extend3(this, content);
      }
      return this.mapToClass(Class);
    }
    add(obj, key) {
      const { auto, keyPath } = this.schema.primKey;
      let objToAdd = obj;
      if (keyPath && auto) {
        objToAdd = workaroundForUndefinedPrimKey(keyPath)(obj);
      }
      return this._trans("readwrite", (trans) => {
        return this.core.mutate({ trans, type: "add", keys: key != null ? [key] : null, values: [objToAdd] });
      }).then((res) => res.numFailures ? DexiePromise.reject(res.failures[0]) : res.lastResult).then((lastResult) => {
        if (keyPath) {
          try {
            setByKeyPath(obj, keyPath, lastResult);
          } catch (_) {
          }
        }
        return lastResult;
      });
    }
    update(keyOrObject, modifications) {
      if (typeof keyOrObject === "object" && !isArray2(keyOrObject)) {
        const key = getByKeyPath(keyOrObject, this.schema.primKey.keyPath);
        if (key === void 0)
          return rejection(new exceptions.InvalidArgument("Given object does not contain its primary key"));
        try {
          if (typeof modifications !== "function") {
            keys(modifications).forEach((keyPath) => {
              setByKeyPath(keyOrObject, keyPath, modifications[keyPath]);
            });
          } else {
            modifications(keyOrObject, { value: keyOrObject, primKey: key });
          }
        } catch (_a) {
        }
        return this.where(":id").equals(key).modify(modifications);
      } else {
        return this.where(":id").equals(keyOrObject).modify(modifications);
      }
    }
    put(obj, key) {
      const { auto, keyPath } = this.schema.primKey;
      let objToAdd = obj;
      if (keyPath && auto) {
        objToAdd = workaroundForUndefinedPrimKey(keyPath)(obj);
      }
      return this._trans("readwrite", (trans) => this.core.mutate({ trans, type: "put", values: [objToAdd], keys: key != null ? [key] : null })).then((res) => res.numFailures ? DexiePromise.reject(res.failures[0]) : res.lastResult).then((lastResult) => {
        if (keyPath) {
          try {
            setByKeyPath(obj, keyPath, lastResult);
          } catch (_) {
          }
        }
        return lastResult;
      });
    }
    delete(key) {
      return this._trans("readwrite", (trans) => this.core.mutate({ trans, type: "delete", keys: [key] })).then((res) => res.numFailures ? DexiePromise.reject(res.failures[0]) : void 0);
    }
    clear() {
      return this._trans("readwrite", (trans) => this.core.mutate({ trans, type: "deleteRange", range: AnyRange })).then((res) => res.numFailures ? DexiePromise.reject(res.failures[0]) : void 0);
    }
    bulkGet(keys2) {
      return this._trans("readonly", (trans) => {
        return this.core.getMany({
          keys: keys2,
          trans
        }).then((result) => result.map((res) => this.hook.reading.fire(res)));
      });
    }
    bulkAdd(objects, keysOrOptions, options) {
      const keys2 = Array.isArray(keysOrOptions) ? keysOrOptions : void 0;
      options = options || (keys2 ? void 0 : keysOrOptions);
      const wantResults = options ? options.allKeys : void 0;
      return this._trans("readwrite", (trans) => {
        const { auto, keyPath } = this.schema.primKey;
        if (keyPath && keys2)
          throw new exceptions.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");
        if (keys2 && keys2.length !== objects.length)
          throw new exceptions.InvalidArgument("Arguments objects and keys must have the same length");
        const numObjects = objects.length;
        let objectsToAdd = keyPath && auto ? objects.map(workaroundForUndefinedPrimKey(keyPath)) : objects;
        return this.core.mutate({ trans, type: "add", keys: keys2, values: objectsToAdd, wantResults }).then(({ numFailures, results, lastResult, failures }) => {
          const result = wantResults ? results : lastResult;
          if (numFailures === 0)
            return result;
          throw new BulkError(`${this.name}.bulkAdd(): ${numFailures} of ${numObjects} operations failed`, failures);
        });
      });
    }
    bulkPut(objects, keysOrOptions, options) {
      const keys2 = Array.isArray(keysOrOptions) ? keysOrOptions : void 0;
      options = options || (keys2 ? void 0 : keysOrOptions);
      const wantResults = options ? options.allKeys : void 0;
      return this._trans("readwrite", (trans) => {
        const { auto, keyPath } = this.schema.primKey;
        if (keyPath && keys2)
          throw new exceptions.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");
        if (keys2 && keys2.length !== objects.length)
          throw new exceptions.InvalidArgument("Arguments objects and keys must have the same length");
        const numObjects = objects.length;
        let objectsToPut = keyPath && auto ? objects.map(workaroundForUndefinedPrimKey(keyPath)) : objects;
        return this.core.mutate({ trans, type: "put", keys: keys2, values: objectsToPut, wantResults }).then(({ numFailures, results, lastResult, failures }) => {
          const result = wantResults ? results : lastResult;
          if (numFailures === 0)
            return result;
          throw new BulkError(`${this.name}.bulkPut(): ${numFailures} of ${numObjects} operations failed`, failures);
        });
      });
    }
    bulkDelete(keys2) {
      const numKeys = keys2.length;
      return this._trans("readwrite", (trans) => {
        return this.core.mutate({ trans, type: "delete", keys: keys2 });
      }).then(({ numFailures, lastResult, failures }) => {
        if (numFailures === 0)
          return lastResult;
        throw new BulkError(`${this.name}.bulkDelete(): ${numFailures} of ${numKeys} operations failed`, failures);
      });
    }
  };
  function Events(ctx) {
    var evs = {};
    var rv = function(eventName, subscriber) {
      if (subscriber) {
        var i2 = arguments.length, args = new Array(i2 - 1);
        while (--i2)
          args[i2 - 1] = arguments[i2];
        evs[eventName].subscribe.apply(null, args);
        return ctx;
      } else if (typeof eventName === "string") {
        return evs[eventName];
      }
    };
    rv.addEventType = add2;
    for (var i = 1, l = arguments.length; i < l; ++i) {
      add2(arguments[i]);
    }
    return rv;
    function add2(eventName, chainFunction, defaultFunction) {
      if (typeof eventName === "object")
        return addConfiguredEvents(eventName);
      if (!chainFunction)
        chainFunction = reverseStoppableEventChain;
      if (!defaultFunction)
        defaultFunction = nop;
      var context = {
        subscribers: [],
        fire: defaultFunction,
        subscribe: function(cb) {
          if (context.subscribers.indexOf(cb) === -1) {
            context.subscribers.push(cb);
            context.fire = chainFunction(context.fire, cb);
          }
        },
        unsubscribe: function(cb) {
          context.subscribers = context.subscribers.filter(function(fn) {
            return fn !== cb;
          });
          context.fire = context.subscribers.reduce(chainFunction, defaultFunction);
        }
      };
      evs[eventName] = rv[eventName] = context;
      return context;
    }
    function addConfiguredEvents(cfg) {
      keys(cfg).forEach(function(eventName) {
        var args = cfg[eventName];
        if (isArray2(args)) {
          add2(eventName, cfg[eventName][0], cfg[eventName][1]);
        } else if (args === "asap") {
          var context = add2(eventName, mirror, function fire() {
            var i2 = arguments.length, args2 = new Array(i2);
            while (i2--)
              args2[i2] = arguments[i2];
            context.subscribers.forEach(function(fn) {
              asap$1(function fireEvent() {
                fn.apply(null, args2);
              });
            });
          });
        } else
          throw new exceptions.InvalidArgument("Invalid event config");
      });
    }
  }
  function makeClassConstructor(prototype, constructor) {
    derive(constructor).from({ prototype });
    return constructor;
  }
  function createTableConstructor(db2) {
    return makeClassConstructor(Table.prototype, function Table2(name, tableSchema, trans) {
      this.db = db2;
      this._tx = trans;
      this.name = name;
      this.schema = tableSchema;
      this.hook = db2._allTables[name] ? db2._allTables[name].hook : Events(null, {
        "creating": [hookCreatingChain, nop],
        "reading": [pureFunctionChain, mirror],
        "updating": [hookUpdatingChain, nop],
        "deleting": [hookDeletingChain, nop]
      });
    });
  }
  function isPlainKeyRange(ctx, ignoreLimitFilter) {
    return !(ctx.filter || ctx.algorithm || ctx.or) && (ignoreLimitFilter ? ctx.justLimit : !ctx.replayFilter);
  }
  function addFilter(ctx, fn) {
    ctx.filter = combine(ctx.filter, fn);
  }
  function addReplayFilter(ctx, factory, isLimitFilter) {
    var curr = ctx.replayFilter;
    ctx.replayFilter = curr ? () => combine(curr(), factory()) : factory;
    ctx.justLimit = isLimitFilter && !curr;
  }
  function addMatchFilter(ctx, fn) {
    ctx.isMatch = combine(ctx.isMatch, fn);
  }
  function getIndexOrStore(ctx, coreSchema) {
    if (ctx.isPrimKey)
      return coreSchema.primaryKey;
    const index2 = coreSchema.getIndexByKeyPath(ctx.index);
    if (!index2)
      throw new exceptions.Schema("KeyPath " + ctx.index + " on object store " + coreSchema.name + " is not indexed");
    return index2;
  }
  function openCursor(ctx, coreTable, trans) {
    const index2 = getIndexOrStore(ctx, coreTable.schema);
    return coreTable.openCursor({
      trans,
      values: !ctx.keysOnly,
      reverse: ctx.dir === "prev",
      unique: !!ctx.unique,
      query: {
        index: index2,
        range: ctx.range
      }
    });
  }
  function iter(ctx, fn, coreTrans, coreTable) {
    const filter = ctx.replayFilter ? combine(ctx.filter, ctx.replayFilter()) : ctx.filter;
    if (!ctx.or) {
      return iterate(openCursor(ctx, coreTable, coreTrans), combine(ctx.algorithm, filter), fn, !ctx.keysOnly && ctx.valueMapper);
    } else {
      const set2 = {};
      const union = (item, cursor, advance) => {
        if (!filter || filter(cursor, advance, (result) => cursor.stop(result), (err) => cursor.fail(err))) {
          var primaryKey = cursor.primaryKey;
          var key = "" + primaryKey;
          if (key === "[object ArrayBuffer]")
            key = "" + new Uint8Array(primaryKey);
          if (!hasOwn2(set2, key)) {
            set2[key] = true;
            fn(item, cursor, advance);
          }
        }
      };
      return Promise.all([
        ctx.or._iterate(union, coreTrans),
        iterate(openCursor(ctx, coreTable, coreTrans), ctx.algorithm, union, !ctx.keysOnly && ctx.valueMapper)
      ]);
    }
  }
  function iterate(cursorPromise, filter, fn, valueMapper) {
    var mappedFn = valueMapper ? (x, c, a) => fn(valueMapper(x), c, a) : fn;
    var wrappedFn = wrap(mappedFn);
    return cursorPromise.then((cursor) => {
      if (cursor) {
        return cursor.start(() => {
          var c = () => cursor.continue();
          if (!filter || filter(cursor, (advancer) => c = advancer, (val) => {
            cursor.stop(val);
            c = nop;
          }, (e) => {
            cursor.fail(e);
            c = nop;
          }))
            wrappedFn(cursor.value, cursor, (advancer) => c = advancer);
          c();
        });
      }
    });
  }
  function cmp(a, b) {
    try {
      const ta = type(a);
      const tb = type(b);
      if (ta !== tb) {
        if (ta === "Array")
          return 1;
        if (tb === "Array")
          return -1;
        if (ta === "binary")
          return 1;
        if (tb === "binary")
          return -1;
        if (ta === "string")
          return 1;
        if (tb === "string")
          return -1;
        if (ta === "Date")
          return 1;
        if (tb !== "Date")
          return NaN;
        return -1;
      }
      switch (ta) {
        case "number":
        case "Date":
        case "string":
          return a > b ? 1 : a < b ? -1 : 0;
        case "binary": {
          return compareUint8Arrays(getUint8Array(a), getUint8Array(b));
        }
        case "Array":
          return compareArrays(a, b);
      }
    } catch (_a) {
    }
    return NaN;
  }
  function compareArrays(a, b) {
    const al = a.length;
    const bl = b.length;
    const l = al < bl ? al : bl;
    for (let i = 0; i < l; ++i) {
      const res = cmp(a[i], b[i]);
      if (res !== 0)
        return res;
    }
    return al === bl ? 0 : al < bl ? -1 : 1;
  }
  function compareUint8Arrays(a, b) {
    const al = a.length;
    const bl = b.length;
    const l = al < bl ? al : bl;
    for (let i = 0; i < l; ++i) {
      if (a[i] !== b[i])
        return a[i] < b[i] ? -1 : 1;
    }
    return al === bl ? 0 : al < bl ? -1 : 1;
  }
  function type(x) {
    const t = typeof x;
    if (t !== "object")
      return t;
    if (ArrayBuffer.isView(x))
      return "binary";
    const tsTag = toStringTag(x);
    return tsTag === "ArrayBuffer" ? "binary" : tsTag;
  }
  function getUint8Array(a) {
    if (a instanceof Uint8Array)
      return a;
    if (ArrayBuffer.isView(a))
      return new Uint8Array(a.buffer, a.byteOffset, a.byteLength);
    return new Uint8Array(a);
  }
  var Collection = class {
    _read(fn, cb) {
      var ctx = this._ctx;
      return ctx.error ? ctx.table._trans(null, rejection.bind(null, ctx.error)) : ctx.table._trans("readonly", fn).then(cb);
    }
    _write(fn) {
      var ctx = this._ctx;
      return ctx.error ? ctx.table._trans(null, rejection.bind(null, ctx.error)) : ctx.table._trans("readwrite", fn, "locked");
    }
    _addAlgorithm(fn) {
      var ctx = this._ctx;
      ctx.algorithm = combine(ctx.algorithm, fn);
    }
    _iterate(fn, coreTrans) {
      return iter(this._ctx, fn, coreTrans, this._ctx.table.core);
    }
    clone(props3) {
      var rv = Object.create(this.constructor.prototype), ctx = Object.create(this._ctx);
      if (props3)
        extend3(ctx, props3);
      rv._ctx = ctx;
      return rv;
    }
    raw() {
      this._ctx.valueMapper = null;
      return this;
    }
    each(fn) {
      var ctx = this._ctx;
      return this._read((trans) => iter(ctx, fn, trans, ctx.table.core));
    }
    count(cb) {
      return this._read((trans) => {
        const ctx = this._ctx;
        const coreTable = ctx.table.core;
        if (isPlainKeyRange(ctx, true)) {
          return coreTable.count({
            trans,
            query: {
              index: getIndexOrStore(ctx, coreTable.schema),
              range: ctx.range
            }
          }).then((count2) => Math.min(count2, ctx.limit));
        } else {
          var count = 0;
          return iter(ctx, () => {
            ++count;
            return false;
          }, trans, coreTable).then(() => count);
        }
      }).then(cb);
    }
    sortBy(keyPath, cb) {
      const parts = keyPath.split(".").reverse(), lastPart = parts[0], lastIndex = parts.length - 1;
      function getval(obj, i) {
        if (i)
          return getval(obj[parts[i]], i - 1);
        return obj[lastPart];
      }
      var order = this._ctx.dir === "next" ? 1 : -1;
      function sorter(a, b) {
        var aVal = getval(a, lastIndex), bVal = getval(b, lastIndex);
        return aVal < bVal ? -order : aVal > bVal ? order : 0;
      }
      return this.toArray(function(a) {
        return a.sort(sorter);
      }).then(cb);
    }
    toArray(cb) {
      return this._read((trans) => {
        var ctx = this._ctx;
        if (ctx.dir === "next" && isPlainKeyRange(ctx, true) && ctx.limit > 0) {
          const { valueMapper } = ctx;
          const index2 = getIndexOrStore(ctx, ctx.table.core.schema);
          return ctx.table.core.query({
            trans,
            limit: ctx.limit,
            values: true,
            query: {
              index: index2,
              range: ctx.range
            }
          }).then(({ result }) => valueMapper ? result.map(valueMapper) : result);
        } else {
          const a = [];
          return iter(ctx, (item) => a.push(item), trans, ctx.table.core).then(() => a);
        }
      }, cb);
    }
    offset(offset) {
      var ctx = this._ctx;
      if (offset <= 0)
        return this;
      ctx.offset += offset;
      if (isPlainKeyRange(ctx)) {
        addReplayFilter(ctx, () => {
          var offsetLeft = offset;
          return (cursor, advance) => {
            if (offsetLeft === 0)
              return true;
            if (offsetLeft === 1) {
              --offsetLeft;
              return false;
            }
            advance(() => {
              cursor.advance(offsetLeft);
              offsetLeft = 0;
            });
            return false;
          };
        });
      } else {
        addReplayFilter(ctx, () => {
          var offsetLeft = offset;
          return () => --offsetLeft < 0;
        });
      }
      return this;
    }
    limit(numRows) {
      this._ctx.limit = Math.min(this._ctx.limit, numRows);
      addReplayFilter(this._ctx, () => {
        var rowsLeft = numRows;
        return function(cursor, advance, resolve2) {
          if (--rowsLeft <= 0)
            advance(resolve2);
          return rowsLeft >= 0;
        };
      }, true);
      return this;
    }
    until(filterFunction, bIncludeStopEntry) {
      addFilter(this._ctx, function(cursor, advance, resolve2) {
        if (filterFunction(cursor.value)) {
          advance(resolve2);
          return bIncludeStopEntry;
        } else {
          return true;
        }
      });
      return this;
    }
    first(cb) {
      return this.limit(1).toArray(function(a) {
        return a[0];
      }).then(cb);
    }
    last(cb) {
      return this.reverse().first(cb);
    }
    filter(filterFunction) {
      addFilter(this._ctx, function(cursor) {
        return filterFunction(cursor.value);
      });
      addMatchFilter(this._ctx, filterFunction);
      return this;
    }
    and(filter) {
      return this.filter(filter);
    }
    or(indexName) {
      return new this.db.WhereClause(this._ctx.table, indexName, this);
    }
    reverse() {
      this._ctx.dir = this._ctx.dir === "prev" ? "next" : "prev";
      if (this._ondirectionchange)
        this._ondirectionchange(this._ctx.dir);
      return this;
    }
    desc() {
      return this.reverse();
    }
    eachKey(cb) {
      var ctx = this._ctx;
      ctx.keysOnly = !ctx.isMatch;
      return this.each(function(val, cursor) {
        cb(cursor.key, cursor);
      });
    }
    eachUniqueKey(cb) {
      this._ctx.unique = "unique";
      return this.eachKey(cb);
    }
    eachPrimaryKey(cb) {
      var ctx = this._ctx;
      ctx.keysOnly = !ctx.isMatch;
      return this.each(function(val, cursor) {
        cb(cursor.primaryKey, cursor);
      });
    }
    keys(cb) {
      var ctx = this._ctx;
      ctx.keysOnly = !ctx.isMatch;
      var a = [];
      return this.each(function(item, cursor) {
        a.push(cursor.key);
      }).then(function() {
        return a;
      }).then(cb);
    }
    primaryKeys(cb) {
      var ctx = this._ctx;
      if (ctx.dir === "next" && isPlainKeyRange(ctx, true) && ctx.limit > 0) {
        return this._read((trans) => {
          var index2 = getIndexOrStore(ctx, ctx.table.core.schema);
          return ctx.table.core.query({
            trans,
            values: false,
            limit: ctx.limit,
            query: {
              index: index2,
              range: ctx.range
            }
          });
        }).then(({ result }) => result).then(cb);
      }
      ctx.keysOnly = !ctx.isMatch;
      var a = [];
      return this.each(function(item, cursor) {
        a.push(cursor.primaryKey);
      }).then(function() {
        return a;
      }).then(cb);
    }
    uniqueKeys(cb) {
      this._ctx.unique = "unique";
      return this.keys(cb);
    }
    firstKey(cb) {
      return this.limit(1).keys(function(a) {
        return a[0];
      }).then(cb);
    }
    lastKey(cb) {
      return this.reverse().firstKey(cb);
    }
    distinct() {
      var ctx = this._ctx, idx = ctx.index && ctx.table.schema.idxByName[ctx.index];
      if (!idx || !idx.multi)
        return this;
      var set2 = {};
      addFilter(this._ctx, function(cursor) {
        var strKey = cursor.primaryKey.toString();
        var found = hasOwn2(set2, strKey);
        set2[strKey] = true;
        return !found;
      });
      return this;
    }
    modify(changes) {
      var ctx = this._ctx;
      return this._write((trans) => {
        var modifyer;
        if (typeof changes === "function") {
          modifyer = changes;
        } else {
          var keyPaths = keys(changes);
          var numKeys = keyPaths.length;
          modifyer = function(item) {
            var anythingModified = false;
            for (var i = 0; i < numKeys; ++i) {
              var keyPath = keyPaths[i], val = changes[keyPath];
              if (getByKeyPath(item, keyPath) !== val) {
                setByKeyPath(item, keyPath, val);
                anythingModified = true;
              }
            }
            return anythingModified;
          };
        }
        const coreTable = ctx.table.core;
        const { outbound, extractKey } = coreTable.schema.primaryKey;
        const limit = this.db._options.modifyChunkSize || 200;
        const totalFailures = [];
        let successCount = 0;
        const failedKeys = [];
        const applyMutateResult = (expectedCount, res) => {
          const { failures, numFailures } = res;
          successCount += expectedCount - numFailures;
          for (let pos of keys(failures)) {
            totalFailures.push(failures[pos]);
          }
        };
        return this.clone().primaryKeys().then((keys2) => {
          const nextChunk = (offset) => {
            const count = Math.min(limit, keys2.length - offset);
            return coreTable.getMany({
              trans,
              keys: keys2.slice(offset, offset + count),
              cache: "immutable"
            }).then((values) => {
              const addValues = [];
              const putValues = [];
              const putKeys = outbound ? [] : null;
              const deleteKeys = [];
              for (let i = 0; i < count; ++i) {
                const origValue = values[i];
                const ctx2 = {
                  value: deepClone(origValue),
                  primKey: keys2[offset + i]
                };
                if (modifyer.call(ctx2, ctx2.value, ctx2) !== false) {
                  if (ctx2.value == null) {
                    deleteKeys.push(keys2[offset + i]);
                  } else if (!outbound && cmp(extractKey(origValue), extractKey(ctx2.value)) !== 0) {
                    deleteKeys.push(keys2[offset + i]);
                    addValues.push(ctx2.value);
                  } else {
                    putValues.push(ctx2.value);
                    if (outbound)
                      putKeys.push(keys2[offset + i]);
                  }
                }
              }
              const criteria = isPlainKeyRange(ctx) && ctx.limit === Infinity && (typeof changes !== "function" || changes === deleteCallback) && {
                index: ctx.index,
                range: ctx.range
              };
              return Promise.resolve(addValues.length > 0 && coreTable.mutate({ trans, type: "add", values: addValues }).then((res) => {
                for (let pos in res.failures) {
                  deleteKeys.splice(parseInt(pos), 1);
                }
                applyMutateResult(addValues.length, res);
              })).then(() => (putValues.length > 0 || criteria && typeof changes === "object") && coreTable.mutate({
                trans,
                type: "put",
                keys: putKeys,
                values: putValues,
                criteria,
                changeSpec: typeof changes !== "function" && changes
              }).then((res) => applyMutateResult(putValues.length, res))).then(() => (deleteKeys.length > 0 || criteria && changes === deleteCallback) && coreTable.mutate({
                trans,
                type: "delete",
                keys: deleteKeys,
                criteria
              }).then((res) => applyMutateResult(deleteKeys.length, res))).then(() => {
                return keys2.length > offset + count && nextChunk(offset + limit);
              });
            });
          };
          return nextChunk(0).then(() => {
            if (totalFailures.length > 0)
              throw new ModifyError("Error modifying one or more objects", totalFailures, successCount, failedKeys);
            return keys2.length;
          });
        });
      });
    }
    delete() {
      var ctx = this._ctx, range = ctx.range;
      if (isPlainKeyRange(ctx) && (ctx.isPrimKey && !hangsOnDeleteLargeKeyRange || range.type === 3)) {
        return this._write((trans) => {
          const { primaryKey } = ctx.table.core.schema;
          const coreRange = range;
          return ctx.table.core.count({ trans, query: { index: primaryKey, range: coreRange } }).then((count) => {
            return ctx.table.core.mutate({ trans, type: "deleteRange", range: coreRange }).then(({ failures, lastResult, results, numFailures }) => {
              if (numFailures)
                throw new ModifyError("Could not delete some values", Object.keys(failures).map((pos) => failures[pos]), count - numFailures);
              return count - numFailures;
            });
          });
        });
      }
      return this.modify(deleteCallback);
    }
  };
  var deleteCallback = (value, ctx) => ctx.value = null;
  function createCollectionConstructor(db2) {
    return makeClassConstructor(Collection.prototype, function Collection2(whereClause, keyRangeGenerator) {
      this.db = db2;
      let keyRange = AnyRange, error = null;
      if (keyRangeGenerator)
        try {
          keyRange = keyRangeGenerator();
        } catch (ex) {
          error = ex;
        }
      const whereCtx = whereClause._ctx;
      const table = whereCtx.table;
      const readingHook = table.hook.reading.fire;
      this._ctx = {
        table,
        index: whereCtx.index,
        isPrimKey: !whereCtx.index || table.schema.primKey.keyPath && whereCtx.index === table.schema.primKey.name,
        range: keyRange,
        keysOnly: false,
        dir: "next",
        unique: "",
        algorithm: null,
        filter: null,
        replayFilter: null,
        justLimit: true,
        isMatch: null,
        offset: 0,
        limit: Infinity,
        error,
        or: whereCtx.or,
        valueMapper: readingHook !== mirror ? readingHook : null
      };
    });
  }
  function simpleCompare(a, b) {
    return a < b ? -1 : a === b ? 0 : 1;
  }
  function simpleCompareReverse(a, b) {
    return a > b ? -1 : a === b ? 0 : 1;
  }
  function fail(collectionOrWhereClause, err, T) {
    var collection = collectionOrWhereClause instanceof WhereClause ? new collectionOrWhereClause.Collection(collectionOrWhereClause) : collectionOrWhereClause;
    collection._ctx.error = T ? new T(err) : new TypeError(err);
    return collection;
  }
  function emptyCollection(whereClause) {
    return new whereClause.Collection(whereClause, () => rangeEqual("")).limit(0);
  }
  function upperFactory(dir) {
    return dir === "next" ? (s) => s.toUpperCase() : (s) => s.toLowerCase();
  }
  function lowerFactory(dir) {
    return dir === "next" ? (s) => s.toLowerCase() : (s) => s.toUpperCase();
  }
  function nextCasing(key, lowerKey, upperNeedle, lowerNeedle, cmp2, dir) {
    var length = Math.min(key.length, lowerNeedle.length);
    var llp = -1;
    for (var i = 0; i < length; ++i) {
      var lwrKeyChar = lowerKey[i];
      if (lwrKeyChar !== lowerNeedle[i]) {
        if (cmp2(key[i], upperNeedle[i]) < 0)
          return key.substr(0, i) + upperNeedle[i] + upperNeedle.substr(i + 1);
        if (cmp2(key[i], lowerNeedle[i]) < 0)
          return key.substr(0, i) + lowerNeedle[i] + upperNeedle.substr(i + 1);
        if (llp >= 0)
          return key.substr(0, llp) + lowerKey[llp] + upperNeedle.substr(llp + 1);
        return null;
      }
      if (cmp2(key[i], lwrKeyChar) < 0)
        llp = i;
    }
    if (length < lowerNeedle.length && dir === "next")
      return key + upperNeedle.substr(key.length);
    if (length < key.length && dir === "prev")
      return key.substr(0, upperNeedle.length);
    return llp < 0 ? null : key.substr(0, llp) + lowerNeedle[llp] + upperNeedle.substr(llp + 1);
  }
  function addIgnoreCaseAlgorithm(whereClause, match2, needles, suffix) {
    var upper, lower, compare, upperNeedles, lowerNeedles, direction, nextKeySuffix, needlesLen = needles.length;
    if (!needles.every((s) => typeof s === "string")) {
      return fail(whereClause, STRING_EXPECTED);
    }
    function initDirection(dir) {
      upper = upperFactory(dir);
      lower = lowerFactory(dir);
      compare = dir === "next" ? simpleCompare : simpleCompareReverse;
      var needleBounds = needles.map(function(needle) {
        return { lower: lower(needle), upper: upper(needle) };
      }).sort(function(a, b) {
        return compare(a.lower, b.lower);
      });
      upperNeedles = needleBounds.map(function(nb) {
        return nb.upper;
      });
      lowerNeedles = needleBounds.map(function(nb) {
        return nb.lower;
      });
      direction = dir;
      nextKeySuffix = dir === "next" ? "" : suffix;
    }
    initDirection("next");
    var c = new whereClause.Collection(whereClause, () => createRange(upperNeedles[0], lowerNeedles[needlesLen - 1] + suffix));
    c._ondirectionchange = function(direction2) {
      initDirection(direction2);
    };
    var firstPossibleNeedle = 0;
    c._addAlgorithm(function(cursor, advance, resolve2) {
      var key = cursor.key;
      if (typeof key !== "string")
        return false;
      var lowerKey = lower(key);
      if (match2(lowerKey, lowerNeedles, firstPossibleNeedle)) {
        return true;
      } else {
        var lowestPossibleCasing = null;
        for (var i = firstPossibleNeedle; i < needlesLen; ++i) {
          var casing = nextCasing(key, lowerKey, upperNeedles[i], lowerNeedles[i], compare, direction);
          if (casing === null && lowestPossibleCasing === null)
            firstPossibleNeedle = i + 1;
          else if (lowestPossibleCasing === null || compare(lowestPossibleCasing, casing) > 0) {
            lowestPossibleCasing = casing;
          }
        }
        if (lowestPossibleCasing !== null) {
          advance(function() {
            cursor.continue(lowestPossibleCasing + nextKeySuffix);
          });
        } else {
          advance(resolve2);
        }
        return false;
      }
    });
    return c;
  }
  function createRange(lower, upper, lowerOpen, upperOpen) {
    return {
      type: 2,
      lower,
      upper,
      lowerOpen,
      upperOpen
    };
  }
  function rangeEqual(value) {
    return {
      type: 1,
      lower: value,
      upper: value
    };
  }
  var WhereClause = class {
    get Collection() {
      return this._ctx.table.db.Collection;
    }
    between(lower, upper, includeLower, includeUpper) {
      includeLower = includeLower !== false;
      includeUpper = includeUpper === true;
      try {
        if (this._cmp(lower, upper) > 0 || this._cmp(lower, upper) === 0 && (includeLower || includeUpper) && !(includeLower && includeUpper))
          return emptyCollection(this);
        return new this.Collection(this, () => createRange(lower, upper, !includeLower, !includeUpper));
      } catch (e) {
        return fail(this, INVALID_KEY_ARGUMENT);
      }
    }
    equals(value) {
      if (value == null)
        return fail(this, INVALID_KEY_ARGUMENT);
      return new this.Collection(this, () => rangeEqual(value));
    }
    above(value) {
      if (value == null)
        return fail(this, INVALID_KEY_ARGUMENT);
      return new this.Collection(this, () => createRange(value, void 0, true));
    }
    aboveOrEqual(value) {
      if (value == null)
        return fail(this, INVALID_KEY_ARGUMENT);
      return new this.Collection(this, () => createRange(value, void 0, false));
    }
    below(value) {
      if (value == null)
        return fail(this, INVALID_KEY_ARGUMENT);
      return new this.Collection(this, () => createRange(void 0, value, false, true));
    }
    belowOrEqual(value) {
      if (value == null)
        return fail(this, INVALID_KEY_ARGUMENT);
      return new this.Collection(this, () => createRange(void 0, value));
    }
    startsWith(str) {
      if (typeof str !== "string")
        return fail(this, STRING_EXPECTED);
      return this.between(str, str + maxString, true, true);
    }
    startsWithIgnoreCase(str) {
      if (str === "")
        return this.startsWith(str);
      return addIgnoreCaseAlgorithm(this, (x, a) => x.indexOf(a[0]) === 0, [str], maxString);
    }
    equalsIgnoreCase(str) {
      return addIgnoreCaseAlgorithm(this, (x, a) => x === a[0], [str], "");
    }
    anyOfIgnoreCase() {
      var set2 = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
      if (set2.length === 0)
        return emptyCollection(this);
      return addIgnoreCaseAlgorithm(this, (x, a) => a.indexOf(x) !== -1, set2, "");
    }
    startsWithAnyOfIgnoreCase() {
      var set2 = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
      if (set2.length === 0)
        return emptyCollection(this);
      return addIgnoreCaseAlgorithm(this, (x, a) => a.some((n) => x.indexOf(n) === 0), set2, maxString);
    }
    anyOf() {
      const set2 = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
      let compare = this._cmp;
      try {
        set2.sort(compare);
      } catch (e) {
        return fail(this, INVALID_KEY_ARGUMENT);
      }
      if (set2.length === 0)
        return emptyCollection(this);
      const c = new this.Collection(this, () => createRange(set2[0], set2[set2.length - 1]));
      c._ondirectionchange = (direction) => {
        compare = direction === "next" ? this._ascending : this._descending;
        set2.sort(compare);
      };
      let i = 0;
      c._addAlgorithm((cursor, advance, resolve2) => {
        const key = cursor.key;
        while (compare(key, set2[i]) > 0) {
          ++i;
          if (i === set2.length) {
            advance(resolve2);
            return false;
          }
        }
        if (compare(key, set2[i]) === 0) {
          return true;
        } else {
          advance(() => {
            cursor.continue(set2[i]);
          });
          return false;
        }
      });
      return c;
    }
    notEqual(value) {
      return this.inAnyRange([[minKey, value], [value, this.db._maxKey]], { includeLowers: false, includeUppers: false });
    }
    noneOf() {
      const set2 = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
      if (set2.length === 0)
        return new this.Collection(this);
      try {
        set2.sort(this._ascending);
      } catch (e) {
        return fail(this, INVALID_KEY_ARGUMENT);
      }
      const ranges = set2.reduce((res, val) => res ? res.concat([[res[res.length - 1][1], val]]) : [[minKey, val]], null);
      ranges.push([set2[set2.length - 1], this.db._maxKey]);
      return this.inAnyRange(ranges, { includeLowers: false, includeUppers: false });
    }
    inAnyRange(ranges, options) {
      const cmp2 = this._cmp, ascending = this._ascending, descending = this._descending, min = this._min, max = this._max;
      if (ranges.length === 0)
        return emptyCollection(this);
      if (!ranges.every((range) => range[0] !== void 0 && range[1] !== void 0 && ascending(range[0], range[1]) <= 0)) {
        return fail(this, "First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower", exceptions.InvalidArgument);
      }
      const includeLowers = !options || options.includeLowers !== false;
      const includeUppers = options && options.includeUppers === true;
      function addRange2(ranges2, newRange) {
        let i = 0, l = ranges2.length;
        for (; i < l; ++i) {
          const range = ranges2[i];
          if (cmp2(newRange[0], range[1]) < 0 && cmp2(newRange[1], range[0]) > 0) {
            range[0] = min(range[0], newRange[0]);
            range[1] = max(range[1], newRange[1]);
            break;
          }
        }
        if (i === l)
          ranges2.push(newRange);
        return ranges2;
      }
      let sortDirection = ascending;
      function rangeSorter(a, b) {
        return sortDirection(a[0], b[0]);
      }
      let set2;
      try {
        set2 = ranges.reduce(addRange2, []);
        set2.sort(rangeSorter);
      } catch (ex) {
        return fail(this, INVALID_KEY_ARGUMENT);
      }
      let rangePos = 0;
      const keyIsBeyondCurrentEntry = includeUppers ? (key) => ascending(key, set2[rangePos][1]) > 0 : (key) => ascending(key, set2[rangePos][1]) >= 0;
      const keyIsBeforeCurrentEntry = includeLowers ? (key) => descending(key, set2[rangePos][0]) > 0 : (key) => descending(key, set2[rangePos][0]) >= 0;
      function keyWithinCurrentRange(key) {
        return !keyIsBeyondCurrentEntry(key) && !keyIsBeforeCurrentEntry(key);
      }
      let checkKey = keyIsBeyondCurrentEntry;
      const c = new this.Collection(this, () => createRange(set2[0][0], set2[set2.length - 1][1], !includeLowers, !includeUppers));
      c._ondirectionchange = (direction) => {
        if (direction === "next") {
          checkKey = keyIsBeyondCurrentEntry;
          sortDirection = ascending;
        } else {
          checkKey = keyIsBeforeCurrentEntry;
          sortDirection = descending;
        }
        set2.sort(rangeSorter);
      };
      c._addAlgorithm((cursor, advance, resolve2) => {
        var key = cursor.key;
        while (checkKey(key)) {
          ++rangePos;
          if (rangePos === set2.length) {
            advance(resolve2);
            return false;
          }
        }
        if (keyWithinCurrentRange(key)) {
          return true;
        } else if (this._cmp(key, set2[rangePos][1]) === 0 || this._cmp(key, set2[rangePos][0]) === 0) {
          return false;
        } else {
          advance(() => {
            if (sortDirection === ascending)
              cursor.continue(set2[rangePos][0]);
            else
              cursor.continue(set2[rangePos][1]);
          });
          return false;
        }
      });
      return c;
    }
    startsWithAnyOf() {
      const set2 = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
      if (!set2.every((s) => typeof s === "string")) {
        return fail(this, "startsWithAnyOf() only works with strings");
      }
      if (set2.length === 0)
        return emptyCollection(this);
      return this.inAnyRange(set2.map((str) => [str, str + maxString]));
    }
  };
  function createWhereClauseConstructor(db2) {
    return makeClassConstructor(WhereClause.prototype, function WhereClause2(table, index2, orCollection) {
      this.db = db2;
      this._ctx = {
        table,
        index: index2 === ":id" ? null : index2,
        or: orCollection
      };
      const indexedDB2 = db2._deps.indexedDB;
      if (!indexedDB2)
        throw new exceptions.MissingAPI();
      this._cmp = this._ascending = indexedDB2.cmp.bind(indexedDB2);
      this._descending = (a, b) => indexedDB2.cmp(b, a);
      this._max = (a, b) => indexedDB2.cmp(a, b) > 0 ? a : b;
      this._min = (a, b) => indexedDB2.cmp(a, b) < 0 ? a : b;
      this._IDBKeyRange = db2._deps.IDBKeyRange;
    });
  }
  function eventRejectHandler(reject) {
    return wrap(function(event) {
      preventDefault(event);
      reject(event.target.error);
      return false;
    });
  }
  function preventDefault(event) {
    if (event.stopPropagation)
      event.stopPropagation();
    if (event.preventDefault)
      event.preventDefault();
  }
  var DEXIE_STORAGE_MUTATED_EVENT_NAME = "storagemutated";
  var STORAGE_MUTATED_DOM_EVENT_NAME = "x-storagemutated-1";
  var globalEvents = Events(null, DEXIE_STORAGE_MUTATED_EVENT_NAME);
  var Transaction = class {
    _lock() {
      assert2(!PSD.global);
      ++this._reculock;
      if (this._reculock === 1 && !PSD.global)
        PSD.lockOwnerFor = this;
      return this;
    }
    _unlock() {
      assert2(!PSD.global);
      if (--this._reculock === 0) {
        if (!PSD.global)
          PSD.lockOwnerFor = null;
        while (this._blockedFuncs.length > 0 && !this._locked()) {
          var fnAndPSD = this._blockedFuncs.shift();
          try {
            usePSD(fnAndPSD[1], fnAndPSD[0]);
          } catch (e) {
          }
        }
      }
      return this;
    }
    _locked() {
      return this._reculock && PSD.lockOwnerFor !== this;
    }
    create(idbtrans) {
      if (!this.mode)
        return this;
      const idbdb = this.db.idbdb;
      const dbOpenError = this.db._state.dbOpenError;
      assert2(!this.idbtrans);
      if (!idbtrans && !idbdb) {
        switch (dbOpenError && dbOpenError.name) {
          case "DatabaseClosedError":
            throw new exceptions.DatabaseClosed(dbOpenError);
          case "MissingAPIError":
            throw new exceptions.MissingAPI(dbOpenError.message, dbOpenError);
          default:
            throw new exceptions.OpenFailed(dbOpenError);
        }
      }
      if (!this.active)
        throw new exceptions.TransactionInactive();
      assert2(this._completion._state === null);
      idbtrans = this.idbtrans = idbtrans || (this.db.core ? this.db.core.transaction(this.storeNames, this.mode, { durability: this.chromeTransactionDurability }) : idbdb.transaction(this.storeNames, this.mode, { durability: this.chromeTransactionDurability }));
      idbtrans.onerror = wrap((ev) => {
        preventDefault(ev);
        this._reject(idbtrans.error);
      });
      idbtrans.onabort = wrap((ev) => {
        preventDefault(ev);
        this.active && this._reject(new exceptions.Abort(idbtrans.error));
        this.active = false;
        this.on("abort").fire(ev);
      });
      idbtrans.oncomplete = wrap(() => {
        this.active = false;
        this._resolve();
        if ("mutatedParts" in idbtrans) {
          globalEvents.storagemutated.fire(idbtrans["mutatedParts"]);
        }
      });
      return this;
    }
    _promise(mode, fn, bWriteLock) {
      if (mode === "readwrite" && this.mode !== "readwrite")
        return rejection(new exceptions.ReadOnly("Transaction is readonly"));
      if (!this.active)
        return rejection(new exceptions.TransactionInactive());
      if (this._locked()) {
        return new DexiePromise((resolve2, reject) => {
          this._blockedFuncs.push([() => {
            this._promise(mode, fn, bWriteLock).then(resolve2, reject);
          }, PSD]);
        });
      } else if (bWriteLock) {
        return newScope(() => {
          var p2 = new DexiePromise((resolve2, reject) => {
            this._lock();
            const rv = fn(resolve2, reject, this);
            if (rv && rv.then)
              rv.then(resolve2, reject);
          });
          p2.finally(() => this._unlock());
          p2._lib = true;
          return p2;
        });
      } else {
        var p = new DexiePromise((resolve2, reject) => {
          var rv = fn(resolve2, reject, this);
          if (rv && rv.then)
            rv.then(resolve2, reject);
        });
        p._lib = true;
        return p;
      }
    }
    _root() {
      return this.parent ? this.parent._root() : this;
    }
    waitFor(promiseLike) {
      var root = this._root();
      const promise = DexiePromise.resolve(promiseLike);
      if (root._waitingFor) {
        root._waitingFor = root._waitingFor.then(() => promise);
      } else {
        root._waitingFor = promise;
        root._waitingQueue = [];
        var store2 = root.idbtrans.objectStore(root.storeNames[0]);
        (function spin() {
          ++root._spinCount;
          while (root._waitingQueue.length)
            root._waitingQueue.shift()();
          if (root._waitingFor)
            store2.get(-Infinity).onsuccess = spin;
        })();
      }
      var currentWaitPromise = root._waitingFor;
      return new DexiePromise((resolve2, reject) => {
        promise.then((res) => root._waitingQueue.push(wrap(resolve2.bind(null, res))), (err) => root._waitingQueue.push(wrap(reject.bind(null, err)))).finally(() => {
          if (root._waitingFor === currentWaitPromise) {
            root._waitingFor = null;
          }
        });
      });
    }
    abort() {
      if (this.active) {
        this.active = false;
        if (this.idbtrans)
          this.idbtrans.abort();
        this._reject(new exceptions.Abort());
      }
    }
    table(tableName) {
      const memoizedTables = this._memoizedTables || (this._memoizedTables = {});
      if (hasOwn2(memoizedTables, tableName))
        return memoizedTables[tableName];
      const tableSchema = this.schema[tableName];
      if (!tableSchema) {
        throw new exceptions.NotFound("Table " + tableName + " not part of transaction");
      }
      const transactionBoundTable = new this.db.Table(tableName, tableSchema, this);
      transactionBoundTable.core = this.db.core.table(tableName);
      memoizedTables[tableName] = transactionBoundTable;
      return transactionBoundTable;
    }
  };
  function createTransactionConstructor(db2) {
    return makeClassConstructor(Transaction.prototype, function Transaction2(mode, storeNames, dbschema, chromeTransactionDurability, parent) {
      this.db = db2;
      this.mode = mode;
      this.storeNames = storeNames;
      this.schema = dbschema;
      this.chromeTransactionDurability = chromeTransactionDurability;
      this.idbtrans = null;
      this.on = Events(this, "complete", "error", "abort");
      this.parent = parent || null;
      this.active = true;
      this._reculock = 0;
      this._blockedFuncs = [];
      this._resolve = null;
      this._reject = null;
      this._waitingFor = null;
      this._waitingQueue = null;
      this._spinCount = 0;
      this._completion = new DexiePromise((resolve2, reject) => {
        this._resolve = resolve2;
        this._reject = reject;
      });
      this._completion.then(() => {
        this.active = false;
        this.on.complete.fire();
      }, (e) => {
        var wasActive = this.active;
        this.active = false;
        this.on.error.fire(e);
        this.parent ? this.parent._reject(e) : wasActive && this.idbtrans && this.idbtrans.abort();
        return rejection(e);
      });
    });
  }
  function createIndexSpec(name, keyPath, unique, multi, auto, compound, isPrimKey) {
    return {
      name,
      keyPath,
      unique,
      multi,
      auto,
      compound,
      src: (unique && !isPrimKey ? "&" : "") + (multi ? "*" : "") + (auto ? "++" : "") + nameFromKeyPath(keyPath)
    };
  }
  function nameFromKeyPath(keyPath) {
    return typeof keyPath === "string" ? keyPath : keyPath ? "[" + [].join.call(keyPath, "+") + "]" : "";
  }
  function createTableSchema(name, primKey, indexes) {
    return {
      name,
      primKey,
      indexes,
      mappedClass: null,
      idxByName: arrayToObject(indexes, (index2) => [index2.name, index2])
    };
  }
  function safariMultiStoreFix(storeNames) {
    return storeNames.length === 1 ? storeNames[0] : storeNames;
  }
  var getMaxKey = (IdbKeyRange) => {
    try {
      IdbKeyRange.only([[]]);
      getMaxKey = () => [[]];
      return [[]];
    } catch (e) {
      getMaxKey = () => maxString;
      return maxString;
    }
  };
  function getKeyExtractor(keyPath) {
    if (keyPath == null) {
      return () => void 0;
    } else if (typeof keyPath === "string") {
      return getSinglePathKeyExtractor(keyPath);
    } else {
      return (obj) => getByKeyPath(obj, keyPath);
    }
  }
  function getSinglePathKeyExtractor(keyPath) {
    const split = keyPath.split(".");
    if (split.length === 1) {
      return (obj) => obj[keyPath];
    } else {
      return (obj) => getByKeyPath(obj, keyPath);
    }
  }
  function arrayify(arrayLike) {
    return [].slice.call(arrayLike);
  }
  var _id_counter = 0;
  function getKeyPathAlias(keyPath) {
    return keyPath == null ? ":id" : typeof keyPath === "string" ? keyPath : `[${keyPath.join("+")}]`;
  }
  function createDBCore(db2, IdbKeyRange, tmpTrans) {
    function extractSchema(db3, trans) {
      const tables2 = arrayify(db3.objectStoreNames);
      return {
        schema: {
          name: db3.name,
          tables: tables2.map((table) => trans.objectStore(table)).map((store2) => {
            const { keyPath, autoIncrement } = store2;
            const compound = isArray2(keyPath);
            const outbound = keyPath == null;
            const indexByKeyPath = {};
            const result = {
              name: store2.name,
              primaryKey: {
                name: null,
                isPrimaryKey: true,
                outbound,
                compound,
                keyPath,
                autoIncrement,
                unique: true,
                extractKey: getKeyExtractor(keyPath)
              },
              indexes: arrayify(store2.indexNames).map((indexName) => store2.index(indexName)).map((index2) => {
                const { name, unique, multiEntry, keyPath: keyPath2 } = index2;
                const compound2 = isArray2(keyPath2);
                const result2 = {
                  name,
                  compound: compound2,
                  keyPath: keyPath2,
                  unique,
                  multiEntry,
                  extractKey: getKeyExtractor(keyPath2)
                };
                indexByKeyPath[getKeyPathAlias(keyPath2)] = result2;
                return result2;
              }),
              getIndexByKeyPath: (keyPath2) => indexByKeyPath[getKeyPathAlias(keyPath2)]
            };
            indexByKeyPath[":id"] = result.primaryKey;
            if (keyPath != null) {
              indexByKeyPath[getKeyPathAlias(keyPath)] = result.primaryKey;
            }
            return result;
          })
        },
        hasGetAll: tables2.length > 0 && "getAll" in trans.objectStore(tables2[0]) && !(typeof navigator !== "undefined" && /Safari/.test(navigator.userAgent) && !/(Chrome\/|Edge\/)/.test(navigator.userAgent) && [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604)
      };
    }
    function makeIDBKeyRange(range) {
      if (range.type === 3)
        return null;
      if (range.type === 4)
        throw new Error("Cannot convert never type to IDBKeyRange");
      const { lower, upper, lowerOpen, upperOpen } = range;
      const idbRange = lower === void 0 ? upper === void 0 ? null : IdbKeyRange.upperBound(upper, !!upperOpen) : upper === void 0 ? IdbKeyRange.lowerBound(lower, !!lowerOpen) : IdbKeyRange.bound(lower, upper, !!lowerOpen, !!upperOpen);
      return idbRange;
    }
    function createDbCoreTable(tableSchema) {
      const tableName = tableSchema.name;
      function mutate({ trans, type: type2, keys: keys2, values, range }) {
        return new Promise((resolve2, reject) => {
          resolve2 = wrap(resolve2);
          const store2 = trans.objectStore(tableName);
          const outbound = store2.keyPath == null;
          const isAddOrPut = type2 === "put" || type2 === "add";
          if (!isAddOrPut && type2 !== "delete" && type2 !== "deleteRange")
            throw new Error("Invalid operation type: " + type2);
          const { length } = keys2 || values || { length: 1 };
          if (keys2 && values && keys2.length !== values.length) {
            throw new Error("Given keys array must have same length as given values array.");
          }
          if (length === 0)
            return resolve2({ numFailures: 0, failures: {}, results: [], lastResult: void 0 });
          let req;
          const reqs = [];
          const failures = [];
          let numFailures = 0;
          const errorHandler = (event) => {
            ++numFailures;
            preventDefault(event);
          };
          if (type2 === "deleteRange") {
            if (range.type === 4)
              return resolve2({ numFailures, failures, results: [], lastResult: void 0 });
            if (range.type === 3)
              reqs.push(req = store2.clear());
            else
              reqs.push(req = store2.delete(makeIDBKeyRange(range)));
          } else {
            const [args1, args2] = isAddOrPut ? outbound ? [values, keys2] : [values, null] : [keys2, null];
            if (isAddOrPut) {
              for (let i = 0; i < length; ++i) {
                reqs.push(req = args2 && args2[i] !== void 0 ? store2[type2](args1[i], args2[i]) : store2[type2](args1[i]));
                req.onerror = errorHandler;
              }
            } else {
              for (let i = 0; i < length; ++i) {
                reqs.push(req = store2[type2](args1[i]));
                req.onerror = errorHandler;
              }
            }
          }
          const done = (event) => {
            const lastResult = event.target.result;
            reqs.forEach((req2, i) => req2.error != null && (failures[i] = req2.error));
            resolve2({
              numFailures,
              failures,
              results: type2 === "delete" ? keys2 : reqs.map((req2) => req2.result),
              lastResult
            });
          };
          req.onerror = (event) => {
            errorHandler(event);
            done(event);
          };
          req.onsuccess = done;
        });
      }
      function openCursor2({ trans, values, query: query3, reverse, unique }) {
        return new Promise((resolve2, reject) => {
          resolve2 = wrap(resolve2);
          const { index: index2, range } = query3;
          const store2 = trans.objectStore(tableName);
          const source = index2.isPrimaryKey ? store2 : store2.index(index2.name);
          const direction = reverse ? unique ? "prevunique" : "prev" : unique ? "nextunique" : "next";
          const req = values || !("openKeyCursor" in source) ? source.openCursor(makeIDBKeyRange(range), direction) : source.openKeyCursor(makeIDBKeyRange(range), direction);
          req.onerror = eventRejectHandler(reject);
          req.onsuccess = wrap((ev) => {
            const cursor = req.result;
            if (!cursor) {
              resolve2(null);
              return;
            }
            cursor.___id = ++_id_counter;
            cursor.done = false;
            const _cursorContinue = cursor.continue.bind(cursor);
            let _cursorContinuePrimaryKey = cursor.continuePrimaryKey;
            if (_cursorContinuePrimaryKey)
              _cursorContinuePrimaryKey = _cursorContinuePrimaryKey.bind(cursor);
            const _cursorAdvance = cursor.advance.bind(cursor);
            const doThrowCursorIsNotStarted = () => {
              throw new Error("Cursor not started");
            };
            const doThrowCursorIsStopped = () => {
              throw new Error("Cursor not stopped");
            };
            cursor.trans = trans;
            cursor.stop = cursor.continue = cursor.continuePrimaryKey = cursor.advance = doThrowCursorIsNotStarted;
            cursor.fail = wrap(reject);
            cursor.next = function() {
              let gotOne = 1;
              return this.start(() => gotOne-- ? this.continue() : this.stop()).then(() => this);
            };
            cursor.start = (callback) => {
              const iterationPromise = new Promise((resolveIteration, rejectIteration) => {
                resolveIteration = wrap(resolveIteration);
                req.onerror = eventRejectHandler(rejectIteration);
                cursor.fail = rejectIteration;
                cursor.stop = (value) => {
                  cursor.stop = cursor.continue = cursor.continuePrimaryKey = cursor.advance = doThrowCursorIsStopped;
                  resolveIteration(value);
                };
              });
              const guardedCallback = () => {
                if (req.result) {
                  try {
                    callback();
                  } catch (err) {
                    cursor.fail(err);
                  }
                } else {
                  cursor.done = true;
                  cursor.start = () => {
                    throw new Error("Cursor behind last entry");
                  };
                  cursor.stop();
                }
              };
              req.onsuccess = wrap((ev2) => {
                req.onsuccess = guardedCallback;
                guardedCallback();
              });
              cursor.continue = _cursorContinue;
              cursor.continuePrimaryKey = _cursorContinuePrimaryKey;
              cursor.advance = _cursorAdvance;
              guardedCallback();
              return iterationPromise;
            };
            resolve2(cursor);
          }, reject);
        });
      }
      function query2(hasGetAll2) {
        return (request) => {
          return new Promise((resolve2, reject) => {
            resolve2 = wrap(resolve2);
            const { trans, values, limit, query: query3 } = request;
            const nonInfinitLimit = limit === Infinity ? void 0 : limit;
            const { index: index2, range } = query3;
            const store2 = trans.objectStore(tableName);
            const source = index2.isPrimaryKey ? store2 : store2.index(index2.name);
            const idbKeyRange = makeIDBKeyRange(range);
            if (limit === 0)
              return resolve2({ result: [] });
            if (hasGetAll2) {
              const req = values ? source.getAll(idbKeyRange, nonInfinitLimit) : source.getAllKeys(idbKeyRange, nonInfinitLimit);
              req.onsuccess = (event) => resolve2({ result: event.target.result });
              req.onerror = eventRejectHandler(reject);
            } else {
              let count = 0;
              const req = values || !("openKeyCursor" in source) ? source.openCursor(idbKeyRange) : source.openKeyCursor(idbKeyRange);
              const result = [];
              req.onsuccess = (event) => {
                const cursor = req.result;
                if (!cursor)
                  return resolve2({ result });
                result.push(values ? cursor.value : cursor.primaryKey);
                if (++count === limit)
                  return resolve2({ result });
                cursor.continue();
              };
              req.onerror = eventRejectHandler(reject);
            }
          });
        };
      }
      return {
        name: tableName,
        schema: tableSchema,
        mutate,
        getMany({ trans, keys: keys2 }) {
          return new Promise((resolve2, reject) => {
            resolve2 = wrap(resolve2);
            const store2 = trans.objectStore(tableName);
            const length = keys2.length;
            const result = new Array(length);
            let keyCount = 0;
            let callbackCount = 0;
            let req;
            const successHandler = (event) => {
              const req2 = event.target;
              if ((result[req2._pos] = req2.result) != null)
                ;
              if (++callbackCount === keyCount)
                resolve2(result);
            };
            const errorHandler = eventRejectHandler(reject);
            for (let i = 0; i < length; ++i) {
              const key = keys2[i];
              if (key != null) {
                req = store2.get(keys2[i]);
                req._pos = i;
                req.onsuccess = successHandler;
                req.onerror = errorHandler;
                ++keyCount;
              }
            }
            if (keyCount === 0)
              resolve2(result);
          });
        },
        get({ trans, key }) {
          return new Promise((resolve2, reject) => {
            resolve2 = wrap(resolve2);
            const store2 = trans.objectStore(tableName);
            const req = store2.get(key);
            req.onsuccess = (event) => resolve2(event.target.result);
            req.onerror = eventRejectHandler(reject);
          });
        },
        query: query2(hasGetAll),
        openCursor: openCursor2,
        count({ query: query3, trans }) {
          const { index: index2, range } = query3;
          return new Promise((resolve2, reject) => {
            const store2 = trans.objectStore(tableName);
            const source = index2.isPrimaryKey ? store2 : store2.index(index2.name);
            const idbKeyRange = makeIDBKeyRange(range);
            const req = idbKeyRange ? source.count(idbKeyRange) : source.count();
            req.onsuccess = wrap((ev) => resolve2(ev.target.result));
            req.onerror = eventRejectHandler(reject);
          });
        }
      };
    }
    const { schema, hasGetAll } = extractSchema(db2, tmpTrans);
    const tables = schema.tables.map((tableSchema) => createDbCoreTable(tableSchema));
    const tableMap = {};
    tables.forEach((table) => tableMap[table.name] = table);
    return {
      stack: "dbcore",
      transaction: db2.transaction.bind(db2),
      table(name) {
        const result = tableMap[name];
        if (!result)
          throw new Error(`Table '${name}' not found`);
        return tableMap[name];
      },
      MIN_KEY: -Infinity,
      MAX_KEY: getMaxKey(IdbKeyRange),
      schema
    };
  }
  function createMiddlewareStack(stackImpl, middlewares) {
    return middlewares.reduce((down, { create }) => ({ ...down, ...create(down) }), stackImpl);
  }
  function createMiddlewareStacks(middlewares, idbdb, { IDBKeyRange, indexedDB: indexedDB2 }, tmpTrans) {
    const dbcore = createMiddlewareStack(createDBCore(idbdb, IDBKeyRange, tmpTrans), middlewares.dbcore);
    return {
      dbcore
    };
  }
  function generateMiddlewareStacks({ _novip: db2 }, tmpTrans) {
    const idbdb = tmpTrans.db;
    const stacks = createMiddlewareStacks(db2._middlewares, idbdb, db2._deps, tmpTrans);
    db2.core = stacks.dbcore;
    db2.tables.forEach((table) => {
      const tableName = table.name;
      if (db2.core.schema.tables.some((tbl) => tbl.name === tableName)) {
        table.core = db2.core.table(tableName);
        if (db2[tableName] instanceof db2.Table) {
          db2[tableName].core = table.core;
        }
      }
    });
  }
  function setApiOnPlace({ _novip: db2 }, objs, tableNames, dbschema) {
    tableNames.forEach((tableName) => {
      const schema = dbschema[tableName];
      objs.forEach((obj) => {
        const propDesc = getPropertyDescriptor(obj, tableName);
        if (!propDesc || "value" in propDesc && propDesc.value === void 0) {
          if (obj === db2.Transaction.prototype || obj instanceof db2.Transaction) {
            setProp2(obj, tableName, {
              get() {
                return this.table(tableName);
              },
              set(value) {
                defineProperty(this, tableName, { value, writable: true, configurable: true, enumerable: true });
              }
            });
          } else {
            obj[tableName] = new db2.Table(tableName, schema);
          }
        }
      });
    });
  }
  function removeTablesApi({ _novip: db2 }, objs) {
    objs.forEach((obj) => {
      for (let key in obj) {
        if (obj[key] instanceof db2.Table)
          delete obj[key];
      }
    });
  }
  function lowerVersionFirst(a, b) {
    return a._cfg.version - b._cfg.version;
  }
  function runUpgraders(db2, oldVersion, idbUpgradeTrans, reject) {
    const globalSchema = db2._dbSchema;
    const trans = db2._createTransaction("readwrite", db2._storeNames, globalSchema);
    trans.create(idbUpgradeTrans);
    trans._completion.catch(reject);
    const rejectTransaction = trans._reject.bind(trans);
    const transless = PSD.transless || PSD;
    newScope(() => {
      PSD.trans = trans;
      PSD.transless = transless;
      if (oldVersion === 0) {
        keys(globalSchema).forEach((tableName) => {
          createTable(idbUpgradeTrans, tableName, globalSchema[tableName].primKey, globalSchema[tableName].indexes);
        });
        generateMiddlewareStacks(db2, idbUpgradeTrans);
        DexiePromise.follow(() => db2.on.populate.fire(trans)).catch(rejectTransaction);
      } else
        updateTablesAndIndexes(db2, oldVersion, trans, idbUpgradeTrans).catch(rejectTransaction);
    });
  }
  function updateTablesAndIndexes({ _novip: db2 }, oldVersion, trans, idbUpgradeTrans) {
    const queue2 = [];
    const versions = db2._versions;
    let globalSchema = db2._dbSchema = buildGlobalSchema(db2, db2.idbdb, idbUpgradeTrans);
    let anyContentUpgraderHasRun = false;
    const versToRun = versions.filter((v) => v._cfg.version >= oldVersion);
    versToRun.forEach((version3) => {
      queue2.push(() => {
        const oldSchema = globalSchema;
        const newSchema = version3._cfg.dbschema;
        adjustToExistingIndexNames(db2, oldSchema, idbUpgradeTrans);
        adjustToExistingIndexNames(db2, newSchema, idbUpgradeTrans);
        globalSchema = db2._dbSchema = newSchema;
        const diff = getSchemaDiff(oldSchema, newSchema);
        diff.add.forEach((tuple) => {
          createTable(idbUpgradeTrans, tuple[0], tuple[1].primKey, tuple[1].indexes);
        });
        diff.change.forEach((change) => {
          if (change.recreate) {
            throw new exceptions.Upgrade("Not yet support for changing primary key");
          } else {
            const store2 = idbUpgradeTrans.objectStore(change.name);
            change.add.forEach((idx) => addIndex(store2, idx));
            change.change.forEach((idx) => {
              store2.deleteIndex(idx.name);
              addIndex(store2, idx);
            });
            change.del.forEach((idxName) => store2.deleteIndex(idxName));
          }
        });
        const contentUpgrade = version3._cfg.contentUpgrade;
        if (contentUpgrade && version3._cfg.version > oldVersion) {
          generateMiddlewareStacks(db2, idbUpgradeTrans);
          trans._memoizedTables = {};
          anyContentUpgraderHasRun = true;
          let upgradeSchema = shallowClone(newSchema);
          diff.del.forEach((table) => {
            upgradeSchema[table] = oldSchema[table];
          });
          removeTablesApi(db2, [db2.Transaction.prototype]);
          setApiOnPlace(db2, [db2.Transaction.prototype], keys(upgradeSchema), upgradeSchema);
          trans.schema = upgradeSchema;
          const contentUpgradeIsAsync = isAsyncFunction(contentUpgrade);
          if (contentUpgradeIsAsync) {
            incrementExpectedAwaits();
          }
          let returnValue;
          const promiseFollowed = DexiePromise.follow(() => {
            returnValue = contentUpgrade(trans);
            if (returnValue) {
              if (contentUpgradeIsAsync) {
                var decrementor = decrementExpectedAwaits.bind(null, null);
                returnValue.then(decrementor, decrementor);
              }
            }
          });
          return returnValue && typeof returnValue.then === "function" ? DexiePromise.resolve(returnValue) : promiseFollowed.then(() => returnValue);
        }
      });
      queue2.push((idbtrans) => {
        if (!anyContentUpgraderHasRun || !hasIEDeleteObjectStoreBug) {
          const newSchema = version3._cfg.dbschema;
          deleteRemovedTables(newSchema, idbtrans);
        }
        removeTablesApi(db2, [db2.Transaction.prototype]);
        setApiOnPlace(db2, [db2.Transaction.prototype], db2._storeNames, db2._dbSchema);
        trans.schema = db2._dbSchema;
      });
    });
    function runQueue2() {
      return queue2.length ? DexiePromise.resolve(queue2.shift()(trans.idbtrans)).then(runQueue2) : DexiePromise.resolve();
    }
    return runQueue2().then(() => {
      createMissingTables(globalSchema, idbUpgradeTrans);
    });
  }
  function getSchemaDiff(oldSchema, newSchema) {
    const diff = {
      del: [],
      add: [],
      change: []
    };
    let table;
    for (table in oldSchema) {
      if (!newSchema[table])
        diff.del.push(table);
    }
    for (table in newSchema) {
      const oldDef = oldSchema[table], newDef = newSchema[table];
      if (!oldDef) {
        diff.add.push([table, newDef]);
      } else {
        const change = {
          name: table,
          def: newDef,
          recreate: false,
          del: [],
          add: [],
          change: []
        };
        if ("" + (oldDef.primKey.keyPath || "") !== "" + (newDef.primKey.keyPath || "") || oldDef.primKey.auto !== newDef.primKey.auto && !isIEOrEdge) {
          change.recreate = true;
          diff.change.push(change);
        } else {
          const oldIndexes = oldDef.idxByName;
          const newIndexes = newDef.idxByName;
          let idxName;
          for (idxName in oldIndexes) {
            if (!newIndexes[idxName])
              change.del.push(idxName);
          }
          for (idxName in newIndexes) {
            const oldIdx = oldIndexes[idxName], newIdx = newIndexes[idxName];
            if (!oldIdx)
              change.add.push(newIdx);
            else if (oldIdx.src !== newIdx.src)
              change.change.push(newIdx);
          }
          if (change.del.length > 0 || change.add.length > 0 || change.change.length > 0) {
            diff.change.push(change);
          }
        }
      }
    }
    return diff;
  }
  function createTable(idbtrans, tableName, primKey, indexes) {
    const store2 = idbtrans.db.createObjectStore(tableName, primKey.keyPath ? { keyPath: primKey.keyPath, autoIncrement: primKey.auto } : { autoIncrement: primKey.auto });
    indexes.forEach((idx) => addIndex(store2, idx));
    return store2;
  }
  function createMissingTables(newSchema, idbtrans) {
    keys(newSchema).forEach((tableName) => {
      if (!idbtrans.db.objectStoreNames.contains(tableName)) {
        createTable(idbtrans, tableName, newSchema[tableName].primKey, newSchema[tableName].indexes);
      }
    });
  }
  function deleteRemovedTables(newSchema, idbtrans) {
    [].slice.call(idbtrans.db.objectStoreNames).forEach((storeName) => newSchema[storeName] == null && idbtrans.db.deleteObjectStore(storeName));
  }
  function addIndex(store2, idx) {
    store2.createIndex(idx.name, idx.keyPath, { unique: idx.unique, multiEntry: idx.multi });
  }
  function buildGlobalSchema(db2, idbdb, tmpTrans) {
    const globalSchema = {};
    const dbStoreNames = slice(idbdb.objectStoreNames, 0);
    dbStoreNames.forEach((storeName) => {
      const store2 = tmpTrans.objectStore(storeName);
      let keyPath = store2.keyPath;
      const primKey = createIndexSpec(nameFromKeyPath(keyPath), keyPath || "", false, false, !!store2.autoIncrement, keyPath && typeof keyPath !== "string", true);
      const indexes = [];
      for (let j = 0; j < store2.indexNames.length; ++j) {
        const idbindex = store2.index(store2.indexNames[j]);
        keyPath = idbindex.keyPath;
        var index2 = createIndexSpec(idbindex.name, keyPath, !!idbindex.unique, !!idbindex.multiEntry, false, keyPath && typeof keyPath !== "string", false);
        indexes.push(index2);
      }
      globalSchema[storeName] = createTableSchema(storeName, primKey, indexes);
    });
    return globalSchema;
  }
  function readGlobalSchema({ _novip: db2 }, idbdb, tmpTrans) {
    db2.verno = idbdb.version / 10;
    const globalSchema = db2._dbSchema = buildGlobalSchema(db2, idbdb, tmpTrans);
    db2._storeNames = slice(idbdb.objectStoreNames, 0);
    setApiOnPlace(db2, [db2._allTables], keys(globalSchema), globalSchema);
  }
  function verifyInstalledSchema(db2, tmpTrans) {
    const installedSchema = buildGlobalSchema(db2, db2.idbdb, tmpTrans);
    const diff = getSchemaDiff(installedSchema, db2._dbSchema);
    return !(diff.add.length || diff.change.some((ch) => ch.add.length || ch.change.length));
  }
  function adjustToExistingIndexNames({ _novip: db2 }, schema, idbtrans) {
    const storeNames = idbtrans.db.objectStoreNames;
    for (let i = 0; i < storeNames.length; ++i) {
      const storeName = storeNames[i];
      const store2 = idbtrans.objectStore(storeName);
      db2._hasGetAll = "getAll" in store2;
      for (let j = 0; j < store2.indexNames.length; ++j) {
        const indexName = store2.indexNames[j];
        const keyPath = store2.index(indexName).keyPath;
        const dexieName = typeof keyPath === "string" ? keyPath : "[" + slice(keyPath).join("+") + "]";
        if (schema[storeName]) {
          const indexSpec = schema[storeName].idxByName[dexieName];
          if (indexSpec) {
            indexSpec.name = indexName;
            delete schema[storeName].idxByName[dexieName];
            schema[storeName].idxByName[indexName] = indexSpec;
          }
        }
      }
    }
    if (typeof navigator !== "undefined" && /Safari/.test(navigator.userAgent) && !/(Chrome\/|Edge\/)/.test(navigator.userAgent) && _global.WorkerGlobalScope && _global instanceof _global.WorkerGlobalScope && [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604) {
      db2._hasGetAll = false;
    }
  }
  function parseIndexSyntax(primKeyAndIndexes) {
    return primKeyAndIndexes.split(",").map((index2, indexNum) => {
      index2 = index2.trim();
      const name = index2.replace(/([&*]|\+\+)/g, "");
      const keyPath = /^\[/.test(name) ? name.match(/^\[(.*)\]$/)[1].split("+") : name;
      return createIndexSpec(name, keyPath || null, /\&/.test(index2), /\*/.test(index2), /\+\+/.test(index2), isArray2(keyPath), indexNum === 0);
    });
  }
  var Version = class {
    _parseStoresSpec(stores, outSchema) {
      keys(stores).forEach((tableName) => {
        if (stores[tableName] !== null) {
          var indexes = parseIndexSyntax(stores[tableName]);
          var primKey = indexes.shift();
          if (primKey.multi)
            throw new exceptions.Schema("Primary key cannot be multi-valued");
          indexes.forEach((idx) => {
            if (idx.auto)
              throw new exceptions.Schema("Only primary key can be marked as autoIncrement (++)");
            if (!idx.keyPath)
              throw new exceptions.Schema("Index must have a name and cannot be an empty string");
          });
          outSchema[tableName] = createTableSchema(tableName, primKey, indexes);
        }
      });
    }
    stores(stores) {
      const db2 = this.db;
      this._cfg.storesSource = this._cfg.storesSource ? extend3(this._cfg.storesSource, stores) : stores;
      const versions = db2._versions;
      const storesSpec = {};
      let dbschema = {};
      versions.forEach((version3) => {
        extend3(storesSpec, version3._cfg.storesSource);
        dbschema = version3._cfg.dbschema = {};
        version3._parseStoresSpec(storesSpec, dbschema);
      });
      db2._dbSchema = dbschema;
      removeTablesApi(db2, [db2._allTables, db2, db2.Transaction.prototype]);
      setApiOnPlace(db2, [db2._allTables, db2, db2.Transaction.prototype, this._cfg.tables], keys(dbschema), dbschema);
      db2._storeNames = keys(dbschema);
      return this;
    }
    upgrade(upgradeFunction) {
      this._cfg.contentUpgrade = promisableChain(this._cfg.contentUpgrade || nop, upgradeFunction);
      return this;
    }
  };
  function createVersionConstructor(db2) {
    return makeClassConstructor(Version.prototype, function Version2(versionNumber) {
      this.db = db2;
      this._cfg = {
        version: versionNumber,
        storesSource: null,
        dbschema: {},
        tables: {},
        contentUpgrade: null
      };
    });
  }
  function getDbNamesTable(indexedDB2, IDBKeyRange) {
    let dbNamesDB = indexedDB2["_dbNamesDB"];
    if (!dbNamesDB) {
      dbNamesDB = indexedDB2["_dbNamesDB"] = new Dexie$1(DBNAMES_DB, {
        addons: [],
        indexedDB: indexedDB2,
        IDBKeyRange
      });
      dbNamesDB.version(1).stores({ dbnames: "name" });
    }
    return dbNamesDB.table("dbnames");
  }
  function hasDatabasesNative(indexedDB2) {
    return indexedDB2 && typeof indexedDB2.databases === "function";
  }
  function getDatabaseNames({ indexedDB: indexedDB2, IDBKeyRange }) {
    return hasDatabasesNative(indexedDB2) ? Promise.resolve(indexedDB2.databases()).then((infos) => infos.map((info) => info.name).filter((name) => name !== DBNAMES_DB)) : getDbNamesTable(indexedDB2, IDBKeyRange).toCollection().primaryKeys();
  }
  function _onDatabaseCreated({ indexedDB: indexedDB2, IDBKeyRange }, name) {
    !hasDatabasesNative(indexedDB2) && name !== DBNAMES_DB && getDbNamesTable(indexedDB2, IDBKeyRange).put({ name }).catch(nop);
  }
  function _onDatabaseDeleted({ indexedDB: indexedDB2, IDBKeyRange }, name) {
    !hasDatabasesNative(indexedDB2) && name !== DBNAMES_DB && getDbNamesTable(indexedDB2, IDBKeyRange).delete(name).catch(nop);
  }
  function vip(fn) {
    return newScope(function() {
      PSD.letThrough = true;
      return fn();
    });
  }
  function idbReady() {
    var isSafari = !navigator.userAgentData && /Safari\//.test(navigator.userAgent) && !/Chrom(e|ium)\//.test(navigator.userAgent);
    if (!isSafari || !indexedDB.databases)
      return Promise.resolve();
    var intervalId;
    return new Promise(function(resolve2) {
      var tryIdb = function() {
        return indexedDB.databases().finally(resolve2);
      };
      intervalId = setInterval(tryIdb, 100);
      tryIdb();
    }).finally(function() {
      return clearInterval(intervalId);
    });
  }
  function dexieOpen(db2) {
    const state = db2._state;
    const { indexedDB: indexedDB2 } = db2._deps;
    if (state.isBeingOpened || db2.idbdb)
      return state.dbReadyPromise.then(() => state.dbOpenError ? rejection(state.dbOpenError) : db2);
    debug && (state.openCanceller._stackHolder = getErrorWithStack());
    state.isBeingOpened = true;
    state.dbOpenError = null;
    state.openComplete = false;
    const openCanceller = state.openCanceller;
    function throwIfCancelled() {
      if (state.openCanceller !== openCanceller)
        throw new exceptions.DatabaseClosed("db.open() was cancelled");
    }
    let resolveDbReady = state.dbReadyResolve, upgradeTransaction = null, wasCreated = false;
    return DexiePromise.race([openCanceller, (typeof navigator === "undefined" ? DexiePromise.resolve() : idbReady()).then(() => new DexiePromise((resolve2, reject) => {
      throwIfCancelled();
      if (!indexedDB2)
        throw new exceptions.MissingAPI();
      const dbName = db2.name;
      const req = state.autoSchema ? indexedDB2.open(dbName) : indexedDB2.open(dbName, Math.round(db2.verno * 10));
      if (!req)
        throw new exceptions.MissingAPI();
      req.onerror = eventRejectHandler(reject);
      req.onblocked = wrap(db2._fireOnBlocked);
      req.onupgradeneeded = wrap((e) => {
        upgradeTransaction = req.transaction;
        if (state.autoSchema && !db2._options.allowEmptyDB) {
          req.onerror = preventDefault;
          upgradeTransaction.abort();
          req.result.close();
          const delreq = indexedDB2.deleteDatabase(dbName);
          delreq.onsuccess = delreq.onerror = wrap(() => {
            reject(new exceptions.NoSuchDatabase(`Database ${dbName} doesnt exist`));
          });
        } else {
          upgradeTransaction.onerror = eventRejectHandler(reject);
          var oldVer = e.oldVersion > Math.pow(2, 62) ? 0 : e.oldVersion;
          wasCreated = oldVer < 1;
          db2._novip.idbdb = req.result;
          runUpgraders(db2, oldVer / 10, upgradeTransaction, reject);
        }
      }, reject);
      req.onsuccess = wrap(() => {
        upgradeTransaction = null;
        const idbdb = db2._novip.idbdb = req.result;
        const objectStoreNames = slice(idbdb.objectStoreNames);
        if (objectStoreNames.length > 0)
          try {
            const tmpTrans = idbdb.transaction(safariMultiStoreFix(objectStoreNames), "readonly");
            if (state.autoSchema)
              readGlobalSchema(db2, idbdb, tmpTrans);
            else {
              adjustToExistingIndexNames(db2, db2._dbSchema, tmpTrans);
              if (!verifyInstalledSchema(db2, tmpTrans)) {
                console.warn(`Dexie SchemaDiff: Schema was extended without increasing the number passed to db.version(). Some queries may fail.`);
              }
            }
            generateMiddlewareStacks(db2, tmpTrans);
          } catch (e) {
          }
        connections.push(db2);
        idbdb.onversionchange = wrap((ev) => {
          state.vcFired = true;
          db2.on("versionchange").fire(ev);
        });
        idbdb.onclose = wrap((ev) => {
          db2.on("close").fire(ev);
        });
        if (wasCreated)
          _onDatabaseCreated(db2._deps, dbName);
        resolve2();
      }, reject);
    }))]).then(() => {
      throwIfCancelled();
      state.onReadyBeingFired = [];
      return DexiePromise.resolve(vip(() => db2.on.ready.fire(db2.vip))).then(function fireRemainders() {
        if (state.onReadyBeingFired.length > 0) {
          let remainders = state.onReadyBeingFired.reduce(promisableChain, nop);
          state.onReadyBeingFired = [];
          return DexiePromise.resolve(vip(() => remainders(db2.vip))).then(fireRemainders);
        }
      });
    }).finally(() => {
      state.onReadyBeingFired = null;
      state.isBeingOpened = false;
    }).then(() => {
      return db2;
    }).catch((err) => {
      state.dbOpenError = err;
      try {
        upgradeTransaction && upgradeTransaction.abort();
      } catch (_a) {
      }
      if (openCanceller === state.openCanceller) {
        db2._close();
      }
      return rejection(err);
    }).finally(() => {
      state.openComplete = true;
      resolveDbReady();
    });
  }
  function awaitIterator(iterator) {
    var callNext = (result) => iterator.next(result), doThrow = (error) => iterator.throw(error), onSuccess = step(callNext), onError3 = step(doThrow);
    function step(getNext) {
      return (val) => {
        var next = getNext(val), value = next.value;
        return next.done ? value : !value || typeof value.then !== "function" ? isArray2(value) ? Promise.all(value).then(onSuccess, onError3) : onSuccess(value) : value.then(onSuccess, onError3);
      };
    }
    return step(callNext)();
  }
  function extractTransactionArgs(mode, _tableArgs_, scopeFunc) {
    var i = arguments.length;
    if (i < 2)
      throw new exceptions.InvalidArgument("Too few arguments");
    var args = new Array(i - 1);
    while (--i)
      args[i - 1] = arguments[i];
    scopeFunc = args.pop();
    var tables = flatten2(args);
    return [mode, tables, scopeFunc];
  }
  function enterTransactionScope(db2, mode, storeNames, parentTransaction, scopeFunc) {
    return DexiePromise.resolve().then(() => {
      const transless = PSD.transless || PSD;
      const trans = db2._createTransaction(mode, storeNames, db2._dbSchema, parentTransaction);
      const zoneProps = {
        trans,
        transless
      };
      if (parentTransaction) {
        trans.idbtrans = parentTransaction.idbtrans;
      } else {
        try {
          trans.create();
          db2._state.PR1398_maxLoop = 3;
        } catch (ex) {
          if (ex.name === errnames.InvalidState && db2.isOpen() && --db2._state.PR1398_maxLoop > 0) {
            console.warn("Dexie: Need to reopen db");
            db2._close();
            return db2.open().then(() => enterTransactionScope(db2, mode, storeNames, null, scopeFunc));
          }
          return rejection(ex);
        }
      }
      const scopeFuncIsAsync = isAsyncFunction(scopeFunc);
      if (scopeFuncIsAsync) {
        incrementExpectedAwaits();
      }
      let returnValue;
      const promiseFollowed = DexiePromise.follow(() => {
        returnValue = scopeFunc.call(trans, trans);
        if (returnValue) {
          if (scopeFuncIsAsync) {
            var decrementor = decrementExpectedAwaits.bind(null, null);
            returnValue.then(decrementor, decrementor);
          } else if (typeof returnValue.next === "function" && typeof returnValue.throw === "function") {
            returnValue = awaitIterator(returnValue);
          }
        }
      }, zoneProps);
      return (returnValue && typeof returnValue.then === "function" ? DexiePromise.resolve(returnValue).then((x) => trans.active ? x : rejection(new exceptions.PrematureCommit("Transaction committed too early. See http://bit.ly/2kdckMn"))) : promiseFollowed.then(() => returnValue)).then((x) => {
        if (parentTransaction)
          trans._resolve();
        return trans._completion.then(() => x);
      }).catch((e) => {
        trans._reject(e);
        return rejection(e);
      });
    });
  }
  function pad(a, value, count) {
    const result = isArray2(a) ? a.slice() : [a];
    for (let i = 0; i < count; ++i)
      result.push(value);
    return result;
  }
  function createVirtualIndexMiddleware(down) {
    return {
      ...down,
      table(tableName) {
        const table = down.table(tableName);
        const { schema } = table;
        const indexLookup = {};
        const allVirtualIndexes = [];
        function addVirtualIndexes(keyPath, keyTail, lowLevelIndex) {
          const keyPathAlias = getKeyPathAlias(keyPath);
          const indexList = indexLookup[keyPathAlias] = indexLookup[keyPathAlias] || [];
          const keyLength = keyPath == null ? 0 : typeof keyPath === "string" ? 1 : keyPath.length;
          const isVirtual = keyTail > 0;
          const virtualIndex = {
            ...lowLevelIndex,
            isVirtual,
            keyTail,
            keyLength,
            extractKey: getKeyExtractor(keyPath),
            unique: !isVirtual && lowLevelIndex.unique
          };
          indexList.push(virtualIndex);
          if (!virtualIndex.isPrimaryKey) {
            allVirtualIndexes.push(virtualIndex);
          }
          if (keyLength > 1) {
            const virtualKeyPath = keyLength === 2 ? keyPath[0] : keyPath.slice(0, keyLength - 1);
            addVirtualIndexes(virtualKeyPath, keyTail + 1, lowLevelIndex);
          }
          indexList.sort((a, b) => a.keyTail - b.keyTail);
          return virtualIndex;
        }
        const primaryKey = addVirtualIndexes(schema.primaryKey.keyPath, 0, schema.primaryKey);
        indexLookup[":id"] = [primaryKey];
        for (const index2 of schema.indexes) {
          addVirtualIndexes(index2.keyPath, 0, index2);
        }
        function findBestIndex(keyPath) {
          const result2 = indexLookup[getKeyPathAlias(keyPath)];
          return result2 && result2[0];
        }
        function translateRange(range, keyTail) {
          return {
            type: range.type === 1 ? 2 : range.type,
            lower: pad(range.lower, range.lowerOpen ? down.MAX_KEY : down.MIN_KEY, keyTail),
            lowerOpen: true,
            upper: pad(range.upper, range.upperOpen ? down.MIN_KEY : down.MAX_KEY, keyTail),
            upperOpen: true
          };
        }
        function translateRequest(req) {
          const index2 = req.query.index;
          return index2.isVirtual ? {
            ...req,
            query: {
              index: index2,
              range: translateRange(req.query.range, index2.keyTail)
            }
          } : req;
        }
        const result = {
          ...table,
          schema: {
            ...schema,
            primaryKey,
            indexes: allVirtualIndexes,
            getIndexByKeyPath: findBestIndex
          },
          count(req) {
            return table.count(translateRequest(req));
          },
          query(req) {
            return table.query(translateRequest(req));
          },
          openCursor(req) {
            const { keyTail, isVirtual, keyLength } = req.query.index;
            if (!isVirtual)
              return table.openCursor(req);
            function createVirtualCursor(cursor) {
              function _continue(key) {
                key != null ? cursor.continue(pad(key, req.reverse ? down.MAX_KEY : down.MIN_KEY, keyTail)) : req.unique ? cursor.continue(cursor.key.slice(0, keyLength).concat(req.reverse ? down.MIN_KEY : down.MAX_KEY, keyTail)) : cursor.continue();
              }
              const virtualCursor = Object.create(cursor, {
                continue: { value: _continue },
                continuePrimaryKey: {
                  value(key, primaryKey2) {
                    cursor.continuePrimaryKey(pad(key, down.MAX_KEY, keyTail), primaryKey2);
                  }
                },
                primaryKey: {
                  get() {
                    return cursor.primaryKey;
                  }
                },
                key: {
                  get() {
                    const key = cursor.key;
                    return keyLength === 1 ? key[0] : key.slice(0, keyLength);
                  }
                },
                value: {
                  get() {
                    return cursor.value;
                  }
                }
              });
              return virtualCursor;
            }
            return table.openCursor(translateRequest(req)).then((cursor) => cursor && createVirtualCursor(cursor));
          }
        };
        return result;
      }
    };
  }
  var virtualIndexMiddleware = {
    stack: "dbcore",
    name: "VirtualIndexMiddleware",
    level: 1,
    create: createVirtualIndexMiddleware
  };
  function getObjectDiff(a, b, rv, prfx) {
    rv = rv || {};
    prfx = prfx || "";
    keys(a).forEach((prop) => {
      if (!hasOwn2(b, prop)) {
        rv[prfx + prop] = void 0;
      } else {
        var ap = a[prop], bp = b[prop];
        if (typeof ap === "object" && typeof bp === "object" && ap && bp) {
          const apTypeName = toStringTag(ap);
          const bpTypeName = toStringTag(bp);
          if (apTypeName !== bpTypeName) {
            rv[prfx + prop] = b[prop];
          } else if (apTypeName === "Object") {
            getObjectDiff(ap, bp, rv, prfx + prop + ".");
          } else if (ap !== bp) {
            rv[prfx + prop] = b[prop];
          }
        } else if (ap !== bp)
          rv[prfx + prop] = b[prop];
      }
    });
    keys(b).forEach((prop) => {
      if (!hasOwn2(a, prop)) {
        rv[prfx + prop] = b[prop];
      }
    });
    return rv;
  }
  function getEffectiveKeys(primaryKey, req) {
    if (req.type === "delete")
      return req.keys;
    return req.keys || req.values.map(primaryKey.extractKey);
  }
  var hooksMiddleware = {
    stack: "dbcore",
    name: "HooksMiddleware",
    level: 2,
    create: (downCore) => ({
      ...downCore,
      table(tableName) {
        const downTable = downCore.table(tableName);
        const { primaryKey } = downTable.schema;
        const tableMiddleware = {
          ...downTable,
          mutate(req) {
            const dxTrans = PSD.trans;
            const { deleting, creating, updating } = dxTrans.table(tableName).hook;
            switch (req.type) {
              case "add":
                if (creating.fire === nop)
                  break;
                return dxTrans._promise("readwrite", () => addPutOrDelete(req), true);
              case "put":
                if (creating.fire === nop && updating.fire === nop)
                  break;
                return dxTrans._promise("readwrite", () => addPutOrDelete(req), true);
              case "delete":
                if (deleting.fire === nop)
                  break;
                return dxTrans._promise("readwrite", () => addPutOrDelete(req), true);
              case "deleteRange":
                if (deleting.fire === nop)
                  break;
                return dxTrans._promise("readwrite", () => deleteRange(req), true);
            }
            return downTable.mutate(req);
            function addPutOrDelete(req2) {
              const dxTrans2 = PSD.trans;
              const keys2 = req2.keys || getEffectiveKeys(primaryKey, req2);
              if (!keys2)
                throw new Error("Keys missing");
              req2 = req2.type === "add" || req2.type === "put" ? { ...req2, keys: keys2 } : { ...req2 };
              if (req2.type !== "delete")
                req2.values = [...req2.values];
              if (req2.keys)
                req2.keys = [...req2.keys];
              return getExistingValues(downTable, req2, keys2).then((existingValues) => {
                const contexts = keys2.map((key, i) => {
                  const existingValue = existingValues[i];
                  const ctx = { onerror: null, onsuccess: null };
                  if (req2.type === "delete") {
                    deleting.fire.call(ctx, key, existingValue, dxTrans2);
                  } else if (req2.type === "add" || existingValue === void 0) {
                    const generatedPrimaryKey = creating.fire.call(ctx, key, req2.values[i], dxTrans2);
                    if (key == null && generatedPrimaryKey != null) {
                      key = generatedPrimaryKey;
                      req2.keys[i] = key;
                      if (!primaryKey.outbound) {
                        setByKeyPath(req2.values[i], primaryKey.keyPath, key);
                      }
                    }
                  } else {
                    const objectDiff = getObjectDiff(existingValue, req2.values[i]);
                    const additionalChanges = updating.fire.call(ctx, objectDiff, key, existingValue, dxTrans2);
                    if (additionalChanges) {
                      const requestedValue = req2.values[i];
                      Object.keys(additionalChanges).forEach((keyPath) => {
                        if (hasOwn2(requestedValue, keyPath)) {
                          requestedValue[keyPath] = additionalChanges[keyPath];
                        } else {
                          setByKeyPath(requestedValue, keyPath, additionalChanges[keyPath]);
                        }
                      });
                    }
                  }
                  return ctx;
                });
                return downTable.mutate(req2).then(({ failures, results, numFailures, lastResult }) => {
                  for (let i = 0; i < keys2.length; ++i) {
                    const primKey = results ? results[i] : keys2[i];
                    const ctx = contexts[i];
                    if (primKey == null) {
                      ctx.onerror && ctx.onerror(failures[i]);
                    } else {
                      ctx.onsuccess && ctx.onsuccess(
                        req2.type === "put" && existingValues[i] ? req2.values[i] : primKey
                      );
                    }
                  }
                  return { failures, results, numFailures, lastResult };
                }).catch((error) => {
                  contexts.forEach((ctx) => ctx.onerror && ctx.onerror(error));
                  return Promise.reject(error);
                });
              });
            }
            function deleteRange(req2) {
              return deleteNextChunk(req2.trans, req2.range, 1e4);
            }
            function deleteNextChunk(trans, range, limit) {
              return downTable.query({ trans, values: false, query: { index: primaryKey, range }, limit }).then(({ result }) => {
                return addPutOrDelete({ type: "delete", keys: result, trans }).then((res) => {
                  if (res.numFailures > 0)
                    return Promise.reject(res.failures[0]);
                  if (result.length < limit) {
                    return { failures: [], numFailures: 0, lastResult: void 0 };
                  } else {
                    return deleteNextChunk(trans, { ...range, lower: result[result.length - 1], lowerOpen: true }, limit);
                  }
                });
              });
            }
          }
        };
        return tableMiddleware;
      }
    })
  };
  function getExistingValues(table, req, effectiveKeys) {
    return req.type === "add" ? Promise.resolve([]) : table.getMany({ trans: req.trans, keys: effectiveKeys, cache: "immutable" });
  }
  function getFromTransactionCache(keys2, cache, clone2) {
    try {
      if (!cache)
        return null;
      if (cache.keys.length < keys2.length)
        return null;
      const result = [];
      for (let i = 0, j = 0; i < cache.keys.length && j < keys2.length; ++i) {
        if (cmp(cache.keys[i], keys2[j]) !== 0)
          continue;
        result.push(clone2 ? deepClone(cache.values[i]) : cache.values[i]);
        ++j;
      }
      return result.length === keys2.length ? result : null;
    } catch (_a) {
      return null;
    }
  }
  var cacheExistingValuesMiddleware = {
    stack: "dbcore",
    level: -1,
    create: (core) => {
      return {
        table: (tableName) => {
          const table = core.table(tableName);
          return {
            ...table,
            getMany: (req) => {
              if (!req.cache) {
                return table.getMany(req);
              }
              const cachedResult = getFromTransactionCache(req.keys, req.trans["_cache"], req.cache === "clone");
              if (cachedResult) {
                return DexiePromise.resolve(cachedResult);
              }
              return table.getMany(req).then((res) => {
                req.trans["_cache"] = {
                  keys: req.keys,
                  values: req.cache === "clone" ? deepClone(res) : res
                };
                return res;
              });
            },
            mutate: (req) => {
              if (req.type !== "add")
                req.trans["_cache"] = null;
              return table.mutate(req);
            }
          };
        }
      };
    }
  };
  function isEmptyRange(node) {
    return !("from" in node);
  }
  var RangeSet = function(fromOrTree, to) {
    if (this) {
      extend3(this, arguments.length ? { d: 1, from: fromOrTree, to: arguments.length > 1 ? to : fromOrTree } : { d: 0 });
    } else {
      const rv = new RangeSet();
      if (fromOrTree && "d" in fromOrTree) {
        extend3(rv, fromOrTree);
      }
      return rv;
    }
  };
  props2(RangeSet.prototype, {
    add(rangeSet) {
      mergeRanges(this, rangeSet);
      return this;
    },
    addKey(key) {
      addRange(this, key, key);
      return this;
    },
    addKeys(keys2) {
      keys2.forEach((key) => addRange(this, key, key));
      return this;
    },
    [iteratorSymbol]() {
      return getRangeSetIterator(this);
    }
  });
  function addRange(target2, from, to) {
    const diff = cmp(from, to);
    if (isNaN(diff))
      return;
    if (diff > 0)
      throw RangeError();
    if (isEmptyRange(target2))
      return extend3(target2, { from, to, d: 1 });
    const left = target2.l;
    const right = target2.r;
    if (cmp(to, target2.from) < 0) {
      left ? addRange(left, from, to) : target2.l = { from, to, d: 1, l: null, r: null };
      return rebalance(target2);
    }
    if (cmp(from, target2.to) > 0) {
      right ? addRange(right, from, to) : target2.r = { from, to, d: 1, l: null, r: null };
      return rebalance(target2);
    }
    if (cmp(from, target2.from) < 0) {
      target2.from = from;
      target2.l = null;
      target2.d = right ? right.d + 1 : 1;
    }
    if (cmp(to, target2.to) > 0) {
      target2.to = to;
      target2.r = null;
      target2.d = target2.l ? target2.l.d + 1 : 1;
    }
    const rightWasCutOff = !target2.r;
    if (left && !target2.l) {
      mergeRanges(target2, left);
    }
    if (right && rightWasCutOff) {
      mergeRanges(target2, right);
    }
  }
  function mergeRanges(target2, newSet) {
    function _addRangeSet(target3, { from, to, l, r }) {
      addRange(target3, from, to);
      if (l)
        _addRangeSet(target3, l);
      if (r)
        _addRangeSet(target3, r);
    }
    if (!isEmptyRange(newSet))
      _addRangeSet(target2, newSet);
  }
  function rangesOverlap(rangeSet1, rangeSet2) {
    const i1 = getRangeSetIterator(rangeSet2);
    let nextResult1 = i1.next();
    if (nextResult1.done)
      return false;
    let a = nextResult1.value;
    const i2 = getRangeSetIterator(rangeSet1);
    let nextResult2 = i2.next(a.from);
    let b = nextResult2.value;
    while (!nextResult1.done && !nextResult2.done) {
      if (cmp(b.from, a.to) <= 0 && cmp(b.to, a.from) >= 0)
        return true;
      cmp(a.from, b.from) < 0 ? a = (nextResult1 = i1.next(b.from)).value : b = (nextResult2 = i2.next(a.from)).value;
    }
    return false;
  }
  function getRangeSetIterator(node) {
    let state = isEmptyRange(node) ? null : { s: 0, n: node };
    return {
      next(key) {
        const keyProvided = arguments.length > 0;
        while (state) {
          switch (state.s) {
            case 0:
              state.s = 1;
              if (keyProvided) {
                while (state.n.l && cmp(key, state.n.from) < 0)
                  state = { up: state, n: state.n.l, s: 1 };
              } else {
                while (state.n.l)
                  state = { up: state, n: state.n.l, s: 1 };
              }
            case 1:
              state.s = 2;
              if (!keyProvided || cmp(key, state.n.to) <= 0)
                return { value: state.n, done: false };
            case 2:
              if (state.n.r) {
                state.s = 3;
                state = { up: state, n: state.n.r, s: 0 };
                continue;
              }
            case 3:
              state = state.up;
          }
        }
        return { done: true };
      }
    };
  }
  function rebalance(target2) {
    var _a, _b;
    const diff = (((_a = target2.r) === null || _a === void 0 ? void 0 : _a.d) || 0) - (((_b = target2.l) === null || _b === void 0 ? void 0 : _b.d) || 0);
    const r = diff > 1 ? "r" : diff < -1 ? "l" : "";
    if (r) {
      const l = r === "r" ? "l" : "r";
      const rootClone = { ...target2 };
      const oldRootRight = target2[r];
      target2.from = oldRootRight.from;
      target2.to = oldRootRight.to;
      target2[r] = oldRootRight[r];
      rootClone[r] = oldRootRight[l];
      target2[l] = rootClone;
      rootClone.d = computeDepth(rootClone);
    }
    target2.d = computeDepth(target2);
  }
  function computeDepth({ r, l }) {
    return (r ? l ? Math.max(r.d, l.d) : r.d : l ? l.d : 0) + 1;
  }
  var observabilityMiddleware = {
    stack: "dbcore",
    level: 0,
    create: (core) => {
      const dbName = core.schema.name;
      const FULL_RANGE = new RangeSet(core.MIN_KEY, core.MAX_KEY);
      return {
        ...core,
        table: (tableName) => {
          const table = core.table(tableName);
          const { schema } = table;
          const { primaryKey } = schema;
          const { extractKey, outbound } = primaryKey;
          const tableClone = {
            ...table,
            mutate: (req) => {
              const trans = req.trans;
              const mutatedParts = trans.mutatedParts || (trans.mutatedParts = {});
              const getRangeSet = (indexName) => {
                const part = `idb://${dbName}/${tableName}/${indexName}`;
                return mutatedParts[part] || (mutatedParts[part] = new RangeSet());
              };
              const pkRangeSet = getRangeSet("");
              const delsRangeSet = getRangeSet(":dels");
              const { type: type2 } = req;
              let [keys2, newObjs] = req.type === "deleteRange" ? [req.range] : req.type === "delete" ? [req.keys] : req.values.length < 50 ? [[], req.values] : [];
              const oldCache = req.trans["_cache"];
              return table.mutate(req).then((res) => {
                if (isArray2(keys2)) {
                  if (type2 !== "delete")
                    keys2 = res.results;
                  pkRangeSet.addKeys(keys2);
                  const oldObjs = getFromTransactionCache(keys2, oldCache);
                  if (!oldObjs && type2 !== "add") {
                    delsRangeSet.addKeys(keys2);
                  }
                  if (oldObjs || newObjs) {
                    trackAffectedIndexes(getRangeSet, schema, oldObjs, newObjs);
                  }
                } else if (keys2) {
                  const range = { from: keys2.lower, to: keys2.upper };
                  delsRangeSet.add(range);
                  pkRangeSet.add(range);
                } else {
                  pkRangeSet.add(FULL_RANGE);
                  delsRangeSet.add(FULL_RANGE);
                  schema.indexes.forEach((idx) => getRangeSet(idx.name).add(FULL_RANGE));
                }
                return res;
              });
            }
          };
          const getRange = ({ query: { index: index2, range } }) => {
            var _a, _b;
            return [
              index2,
              new RangeSet((_a = range.lower) !== null && _a !== void 0 ? _a : core.MIN_KEY, (_b = range.upper) !== null && _b !== void 0 ? _b : core.MAX_KEY)
            ];
          };
          const readSubscribers = {
            get: (req) => [primaryKey, new RangeSet(req.key)],
            getMany: (req) => [primaryKey, new RangeSet().addKeys(req.keys)],
            count: getRange,
            query: getRange,
            openCursor: getRange
          };
          keys(readSubscribers).forEach((method) => {
            tableClone[method] = function(req) {
              const { subscr } = PSD;
              if (subscr) {
                const getRangeSet = (indexName) => {
                  const part = `idb://${dbName}/${tableName}/${indexName}`;
                  return subscr[part] || (subscr[part] = new RangeSet());
                };
                const pkRangeSet = getRangeSet("");
                const delsRangeSet = getRangeSet(":dels");
                const [queriedIndex, queriedRanges] = readSubscribers[method](req);
                getRangeSet(queriedIndex.name || "").add(queriedRanges);
                if (!queriedIndex.isPrimaryKey) {
                  if (method === "count") {
                    delsRangeSet.add(FULL_RANGE);
                  } else {
                    const keysPromise = method === "query" && outbound && req.values && table.query({
                      ...req,
                      values: false
                    });
                    return table[method].apply(this, arguments).then((res) => {
                      if (method === "query") {
                        if (outbound && req.values) {
                          return keysPromise.then(({ result: resultingKeys }) => {
                            pkRangeSet.addKeys(resultingKeys);
                            return res;
                          });
                        }
                        const pKeys = req.values ? res.result.map(extractKey) : res.result;
                        if (req.values) {
                          pkRangeSet.addKeys(pKeys);
                        } else {
                          delsRangeSet.addKeys(pKeys);
                        }
                      } else if (method === "openCursor") {
                        const cursor = res;
                        const wantValues = req.values;
                        return cursor && Object.create(cursor, {
                          key: {
                            get() {
                              delsRangeSet.addKey(cursor.primaryKey);
                              return cursor.key;
                            }
                          },
                          primaryKey: {
                            get() {
                              const pkey = cursor.primaryKey;
                              delsRangeSet.addKey(pkey);
                              return pkey;
                            }
                          },
                          value: {
                            get() {
                              wantValues && pkRangeSet.addKey(cursor.primaryKey);
                              return cursor.value;
                            }
                          }
                        });
                      }
                      return res;
                    });
                  }
                }
              }
              return table[method].apply(this, arguments);
            };
          });
          return tableClone;
        }
      };
    }
  };
  function trackAffectedIndexes(getRangeSet, schema, oldObjs, newObjs) {
    function addAffectedIndex(ix) {
      const rangeSet = getRangeSet(ix.name || "");
      function extractKey(obj) {
        return obj != null ? ix.extractKey(obj) : null;
      }
      const addKeyOrKeys = (key) => ix.multiEntry && isArray2(key) ? key.forEach((key2) => rangeSet.addKey(key2)) : rangeSet.addKey(key);
      (oldObjs || newObjs).forEach((_, i) => {
        const oldKey = oldObjs && extractKey(oldObjs[i]);
        const newKey = newObjs && extractKey(newObjs[i]);
        if (cmp(oldKey, newKey) !== 0) {
          if (oldKey != null)
            addKeyOrKeys(oldKey);
          if (newKey != null)
            addKeyOrKeys(newKey);
        }
      });
    }
    schema.indexes.forEach(addAffectedIndex);
  }
  var Dexie$1 = class {
    constructor(name, options) {
      this._middlewares = {};
      this.verno = 0;
      const deps = Dexie$1.dependencies;
      this._options = options = {
        addons: Dexie$1.addons,
        autoOpen: true,
        indexedDB: deps.indexedDB,
        IDBKeyRange: deps.IDBKeyRange,
        ...options
      };
      this._deps = {
        indexedDB: options.indexedDB,
        IDBKeyRange: options.IDBKeyRange
      };
      const { addons } = options;
      this._dbSchema = {};
      this._versions = [];
      this._storeNames = [];
      this._allTables = {};
      this.idbdb = null;
      this._novip = this;
      const state = {
        dbOpenError: null,
        isBeingOpened: false,
        onReadyBeingFired: null,
        openComplete: false,
        dbReadyResolve: nop,
        dbReadyPromise: null,
        cancelOpen: nop,
        openCanceller: null,
        autoSchema: true,
        PR1398_maxLoop: 3
      };
      state.dbReadyPromise = new DexiePromise((resolve2) => {
        state.dbReadyResolve = resolve2;
      });
      state.openCanceller = new DexiePromise((_, reject) => {
        state.cancelOpen = reject;
      });
      this._state = state;
      this.name = name;
      this.on = Events(this, "populate", "blocked", "versionchange", "close", { ready: [promisableChain, nop] });
      this.on.ready.subscribe = override(this.on.ready.subscribe, (subscribe) => {
        return (subscriber, bSticky) => {
          Dexie$1.vip(() => {
            const state2 = this._state;
            if (state2.openComplete) {
              if (!state2.dbOpenError)
                DexiePromise.resolve().then(subscriber);
              if (bSticky)
                subscribe(subscriber);
            } else if (state2.onReadyBeingFired) {
              state2.onReadyBeingFired.push(subscriber);
              if (bSticky)
                subscribe(subscriber);
            } else {
              subscribe(subscriber);
              const db2 = this;
              if (!bSticky)
                subscribe(function unsubscribe() {
                  db2.on.ready.unsubscribe(subscriber);
                  db2.on.ready.unsubscribe(unsubscribe);
                });
            }
          });
        };
      });
      this.Collection = createCollectionConstructor(this);
      this.Table = createTableConstructor(this);
      this.Transaction = createTransactionConstructor(this);
      this.Version = createVersionConstructor(this);
      this.WhereClause = createWhereClauseConstructor(this);
      this.on("versionchange", (ev) => {
        if (ev.newVersion > 0)
          console.warn(`Another connection wants to upgrade database '${this.name}'. Closing db now to resume the upgrade.`);
        else
          console.warn(`Another connection wants to delete database '${this.name}'. Closing db now to resume the delete request.`);
        this.close();
      });
      this.on("blocked", (ev) => {
        if (!ev.newVersion || ev.newVersion < ev.oldVersion)
          console.warn(`Dexie.delete('${this.name}') was blocked`);
        else
          console.warn(`Upgrade '${this.name}' blocked by other connection holding version ${ev.oldVersion / 10}`);
      });
      this._maxKey = getMaxKey(options.IDBKeyRange);
      this._createTransaction = (mode, storeNames, dbschema, parentTransaction) => new this.Transaction(mode, storeNames, dbschema, this._options.chromeTransactionDurability, parentTransaction);
      this._fireOnBlocked = (ev) => {
        this.on("blocked").fire(ev);
        connections.filter((c) => c.name === this.name && c !== this && !c._state.vcFired).map((c) => c.on("versionchange").fire(ev));
      };
      this.use(virtualIndexMiddleware);
      this.use(hooksMiddleware);
      this.use(observabilityMiddleware);
      this.use(cacheExistingValuesMiddleware);
      this.vip = Object.create(this, { _vip: { value: true } });
      addons.forEach((addon) => addon(this));
    }
    version(versionNumber) {
      if (isNaN(versionNumber) || versionNumber < 0.1)
        throw new exceptions.Type(`Given version is not a positive number`);
      versionNumber = Math.round(versionNumber * 10) / 10;
      if (this.idbdb || this._state.isBeingOpened)
        throw new exceptions.Schema("Cannot add version when database is open");
      this.verno = Math.max(this.verno, versionNumber);
      const versions = this._versions;
      var versionInstance = versions.filter((v) => v._cfg.version === versionNumber)[0];
      if (versionInstance)
        return versionInstance;
      versionInstance = new this.Version(versionNumber);
      versions.push(versionInstance);
      versions.sort(lowerVersionFirst);
      versionInstance.stores({});
      this._state.autoSchema = false;
      return versionInstance;
    }
    _whenReady(fn) {
      return this.idbdb && (this._state.openComplete || PSD.letThrough || this._vip) ? fn() : new DexiePromise((resolve2, reject) => {
        if (this._state.openComplete) {
          return reject(new exceptions.DatabaseClosed(this._state.dbOpenError));
        }
        if (!this._state.isBeingOpened) {
          if (!this._options.autoOpen) {
            reject(new exceptions.DatabaseClosed());
            return;
          }
          this.open().catch(nop);
        }
        this._state.dbReadyPromise.then(resolve2, reject);
      }).then(fn);
    }
    use({ stack, create, level, name }) {
      if (name)
        this.unuse({ stack, name });
      const middlewares = this._middlewares[stack] || (this._middlewares[stack] = []);
      middlewares.push({ stack, create, level: level == null ? 10 : level, name });
      middlewares.sort((a, b) => a.level - b.level);
      return this;
    }
    unuse({ stack, name, create }) {
      if (stack && this._middlewares[stack]) {
        this._middlewares[stack] = this._middlewares[stack].filter((mw) => create ? mw.create !== create : name ? mw.name !== name : false);
      }
      return this;
    }
    open() {
      return dexieOpen(this);
    }
    _close() {
      const state = this._state;
      const idx = connections.indexOf(this);
      if (idx >= 0)
        connections.splice(idx, 1);
      if (this.idbdb) {
        try {
          this.idbdb.close();
        } catch (e) {
        }
        this._novip.idbdb = null;
      }
      state.dbReadyPromise = new DexiePromise((resolve2) => {
        state.dbReadyResolve = resolve2;
      });
      state.openCanceller = new DexiePromise((_, reject) => {
        state.cancelOpen = reject;
      });
    }
    close() {
      this._close();
      const state = this._state;
      this._options.autoOpen = false;
      state.dbOpenError = new exceptions.DatabaseClosed();
      if (state.isBeingOpened)
        state.cancelOpen(state.dbOpenError);
    }
    delete() {
      const hasArguments = arguments.length > 0;
      const state = this._state;
      return new DexiePromise((resolve2, reject) => {
        const doDelete = () => {
          this.close();
          var req = this._deps.indexedDB.deleteDatabase(this.name);
          req.onsuccess = wrap(() => {
            _onDatabaseDeleted(this._deps, this.name);
            resolve2();
          });
          req.onerror = eventRejectHandler(reject);
          req.onblocked = this._fireOnBlocked;
        };
        if (hasArguments)
          throw new exceptions.InvalidArgument("Arguments not allowed in db.delete()");
        if (state.isBeingOpened) {
          state.dbReadyPromise.then(doDelete);
        } else {
          doDelete();
        }
      });
    }
    backendDB() {
      return this.idbdb;
    }
    isOpen() {
      return this.idbdb !== null;
    }
    hasBeenClosed() {
      const dbOpenError = this._state.dbOpenError;
      return dbOpenError && dbOpenError.name === "DatabaseClosed";
    }
    hasFailed() {
      return this._state.dbOpenError !== null;
    }
    dynamicallyOpened() {
      return this._state.autoSchema;
    }
    get tables() {
      return keys(this._allTables).map((name) => this._allTables[name]);
    }
    transaction() {
      const args = extractTransactionArgs.apply(this, arguments);
      return this._transaction.apply(this, args);
    }
    _transaction(mode, tables, scopeFunc) {
      let parentTransaction = PSD.trans;
      if (!parentTransaction || parentTransaction.db !== this || mode.indexOf("!") !== -1)
        parentTransaction = null;
      const onlyIfCompatible = mode.indexOf("?") !== -1;
      mode = mode.replace("!", "").replace("?", "");
      let idbMode, storeNames;
      try {
        storeNames = tables.map((table) => {
          var storeName = table instanceof this.Table ? table.name : table;
          if (typeof storeName !== "string")
            throw new TypeError("Invalid table argument to Dexie.transaction(). Only Table or String are allowed");
          return storeName;
        });
        if (mode == "r" || mode === READONLY)
          idbMode = READONLY;
        else if (mode == "rw" || mode == READWRITE)
          idbMode = READWRITE;
        else
          throw new exceptions.InvalidArgument("Invalid transaction mode: " + mode);
        if (parentTransaction) {
          if (parentTransaction.mode === READONLY && idbMode === READWRITE) {
            if (onlyIfCompatible) {
              parentTransaction = null;
            } else
              throw new exceptions.SubTransaction("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY");
          }
          if (parentTransaction) {
            storeNames.forEach((storeName) => {
              if (parentTransaction && parentTransaction.storeNames.indexOf(storeName) === -1) {
                if (onlyIfCompatible) {
                  parentTransaction = null;
                } else
                  throw new exceptions.SubTransaction("Table " + storeName + " not included in parent transaction.");
              }
            });
          }
          if (onlyIfCompatible && parentTransaction && !parentTransaction.active) {
            parentTransaction = null;
          }
        }
      } catch (e) {
        return parentTransaction ? parentTransaction._promise(null, (_, reject) => {
          reject(e);
        }) : rejection(e);
      }
      const enterTransaction = enterTransactionScope.bind(null, this, idbMode, storeNames, parentTransaction, scopeFunc);
      return parentTransaction ? parentTransaction._promise(idbMode, enterTransaction, "lock") : PSD.trans ? usePSD(PSD.transless, () => this._whenReady(enterTransaction)) : this._whenReady(enterTransaction);
    }
    table(tableName) {
      if (!hasOwn2(this._allTables, tableName)) {
        throw new exceptions.InvalidTable(`Table ${tableName} does not exist`);
      }
      return this._allTables[tableName];
    }
  };
  var symbolObservable = typeof Symbol !== "undefined" && "observable" in Symbol ? Symbol.observable : "@@observable";
  var Observable = class {
    constructor(subscribe) {
      this._subscribe = subscribe;
    }
    subscribe(x, error, complete) {
      return this._subscribe(!x || typeof x === "function" ? { next: x, error, complete } : x);
    }
    [symbolObservable]() {
      return this;
    }
  };
  function extendObservabilitySet(target2, newSet) {
    keys(newSet).forEach((part) => {
      const rangeSet = target2[part] || (target2[part] = new RangeSet());
      mergeRanges(rangeSet, newSet[part]);
    });
    return target2;
  }
  function liveQuery(querier) {
    return new Observable((observer) => {
      const scopeFuncIsAsync = isAsyncFunction(querier);
      function execute(subscr) {
        if (scopeFuncIsAsync) {
          incrementExpectedAwaits();
        }
        const exec = () => newScope(querier, { subscr, trans: null });
        const rv = PSD.trans ? usePSD(PSD.transless, exec) : exec();
        if (scopeFuncIsAsync) {
          rv.then(decrementExpectedAwaits, decrementExpectedAwaits);
        }
        return rv;
      }
      let closed = false;
      let accumMuts = {};
      let currentObs = {};
      const subscription = {
        get closed() {
          return closed;
        },
        unsubscribe: () => {
          closed = true;
          globalEvents.storagemutated.unsubscribe(mutationListener);
        }
      };
      observer.start && observer.start(subscription);
      let querying = false, startedListening = false;
      function shouldNotify() {
        return keys(currentObs).some((key) => accumMuts[key] && rangesOverlap(accumMuts[key], currentObs[key]));
      }
      const mutationListener = (parts) => {
        extendObservabilitySet(accumMuts, parts);
        if (shouldNotify()) {
          doQuery();
        }
      };
      const doQuery = () => {
        if (querying || closed)
          return;
        accumMuts = {};
        const subscr = {};
        const ret = execute(subscr);
        if (!startedListening) {
          globalEvents(DEXIE_STORAGE_MUTATED_EVENT_NAME, mutationListener);
          startedListening = true;
        }
        querying = true;
        Promise.resolve(ret).then((result) => {
          querying = false;
          if (closed)
            return;
          if (shouldNotify()) {
            doQuery();
          } else {
            accumMuts = {};
            currentObs = subscr;
            observer.next && observer.next(result);
          }
        }, (err) => {
          querying = false;
          observer.error && observer.error(err);
          subscription.unsubscribe();
        });
      };
      doQuery();
      return subscription;
    });
  }
  var domDeps;
  try {
    domDeps = {
      indexedDB: _global.indexedDB || _global.mozIndexedDB || _global.webkitIndexedDB || _global.msIndexedDB,
      IDBKeyRange: _global.IDBKeyRange || _global.webkitIDBKeyRange
    };
  } catch (e) {
    domDeps = { indexedDB: null, IDBKeyRange: null };
  }
  var Dexie = Dexie$1;
  props2(Dexie, {
    ...fullNameExceptions,
    delete(databaseName) {
      const db2 = new Dexie(databaseName, { addons: [] });
      return db2.delete();
    },
    exists(name) {
      return new Dexie(name, { addons: [] }).open().then((db2) => {
        db2.close();
        return true;
      }).catch("NoSuchDatabaseError", () => false);
    },
    getDatabaseNames(cb) {
      try {
        return getDatabaseNames(Dexie.dependencies).then(cb);
      } catch (_a) {
        return rejection(new exceptions.MissingAPI());
      }
    },
    defineClass() {
      function Class(content) {
        extend3(this, content);
      }
      return Class;
    },
    ignoreTransaction(scopeFunc) {
      return PSD.trans ? usePSD(PSD.transless, scopeFunc) : scopeFunc();
    },
    vip,
    async: function(generatorFn) {
      return function() {
        try {
          var rv = awaitIterator(generatorFn.apply(this, arguments));
          if (!rv || typeof rv.then !== "function")
            return DexiePromise.resolve(rv);
          return rv;
        } catch (e) {
          return rejection(e);
        }
      };
    },
    spawn: function(generatorFn, args, thiz) {
      try {
        var rv = awaitIterator(generatorFn.apply(thiz, args || []));
        if (!rv || typeof rv.then !== "function")
          return DexiePromise.resolve(rv);
        return rv;
      } catch (e) {
        return rejection(e);
      }
    },
    currentTransaction: {
      get: () => PSD.trans || null
    },
    waitFor: function(promiseOrFunction, optionalTimeout) {
      const promise = DexiePromise.resolve(typeof promiseOrFunction === "function" ? Dexie.ignoreTransaction(promiseOrFunction) : promiseOrFunction).timeout(optionalTimeout || 6e4);
      return PSD.trans ? PSD.trans.waitFor(promise) : promise;
    },
    Promise: DexiePromise,
    debug: {
      get: () => debug,
      set: (value) => {
        setDebug(value, value === "dexie" ? () => true : dexieStackFrameFilter);
      }
    },
    derive,
    extend: extend3,
    props: props2,
    override,
    Events,
    on: globalEvents,
    liveQuery,
    extendObservabilitySet,
    getByKeyPath,
    setByKeyPath,
    delByKeyPath,
    shallowClone,
    deepClone,
    getObjectDiff,
    cmp,
    asap: asap$1,
    minKey,
    addons: [],
    connections,
    errnames,
    dependencies: domDeps,
    semVer: DEXIE_VERSION,
    version: DEXIE_VERSION.split(".").map((n) => parseInt(n)).reduce((p, c, i) => p + c / Math.pow(10, i * 2))
  });
  Dexie.maxKey = getMaxKey(Dexie.dependencies.IDBKeyRange);
  if (typeof dispatchEvent !== "undefined" && typeof addEventListener !== "undefined") {
    globalEvents(DEXIE_STORAGE_MUTATED_EVENT_NAME, (updatedParts) => {
      if (!propagatingLocally) {
        let event;
        if (isIEOrEdge) {
          event = document.createEvent("CustomEvent");
          event.initCustomEvent(STORAGE_MUTATED_DOM_EVENT_NAME, true, true, updatedParts);
        } else {
          event = new CustomEvent(STORAGE_MUTATED_DOM_EVENT_NAME, {
            detail: updatedParts
          });
        }
        propagatingLocally = true;
        dispatchEvent(event);
        propagatingLocally = false;
      }
    });
    addEventListener(STORAGE_MUTATED_DOM_EVENT_NAME, ({ detail }) => {
      if (!propagatingLocally) {
        propagateLocally(detail);
      }
    });
  }
  function propagateLocally(updateParts) {
    let wasMe = propagatingLocally;
    try {
      propagatingLocally = true;
      globalEvents.storagemutated.fire(updateParts);
    } finally {
      propagatingLocally = wasMe;
    }
  }
  var propagatingLocally = false;
  if (typeof BroadcastChannel !== "undefined") {
    const bc = new BroadcastChannel(STORAGE_MUTATED_DOM_EVENT_NAME);
    globalEvents(DEXIE_STORAGE_MUTATED_EVENT_NAME, (changedParts) => {
      if (!propagatingLocally) {
        bc.postMessage(changedParts);
      }
    });
    bc.onmessage = (ev) => {
      if (ev.data)
        propagateLocally(ev.data);
    };
  } else if (typeof self !== "undefined" && typeof navigator !== "undefined") {
    globalEvents(DEXIE_STORAGE_MUTATED_EVENT_NAME, (changedParts) => {
      try {
        if (!propagatingLocally) {
          if (typeof localStorage !== "undefined") {
            localStorage.setItem(STORAGE_MUTATED_DOM_EVENT_NAME, JSON.stringify({
              trig: Math.random(),
              changedParts
            }));
          }
          if (typeof self["clients"] === "object") {
            [...self["clients"].matchAll({ includeUncontrolled: true })].forEach((client) => client.postMessage({
              type: STORAGE_MUTATED_DOM_EVENT_NAME,
              changedParts
            }));
          }
        }
      } catch (_a) {
      }
    });
    if (typeof addEventListener !== "undefined") {
      addEventListener("storage", (ev) => {
        if (ev.key === STORAGE_MUTATED_DOM_EVENT_NAME) {
          const data = JSON.parse(ev.newValue);
          if (data)
            propagateLocally(data.changedParts);
        }
      });
    }
    const swContainer = self.document && navigator.serviceWorker;
    if (swContainer) {
      swContainer.addEventListener("message", propagateMessageLocally);
    }
  }
  function propagateMessageLocally({ data }) {
    if (data && data.type === STORAGE_MUTATED_DOM_EVENT_NAME) {
      propagateLocally(data.changedParts);
    }
  }
  DexiePromise.rejectionMapper = mapError;
  setDebug(debug, dexieStackFrameFilter);

  // store/db/notes.js
  var db = new Dexie$1("notes_db");
  db.version(2).stores({
    notes: "++id,title,type,body,isArchived,createdAt,updatedAt"
  }).upgrade(() => {
    db.notes.toCollection().modify((note) => {
      note.isArchived = false;
    });
  });
  db.version(1).stores({
    notes: "++id,title,type,body,createdAt,updatedAt"
  });
  var notes_default = db;

  // store/modules/app.js
  var app_default = {
    state: {
      isLoaded: false
    },
    mutations: {
      [POPULATE](state) {
        state.isLoaded = true;
      }
    }
  };

  // store/modules/notes.js
  var notes_default2 = {
    state: [],
    actions: {
      [ADD_NOTE](context, { type: type2, title, body }) {
        const date = new Date();
        return notes_default.notes.add({ type: type2, title, body, createdAt: date, updatedAt: date, isArchived: false }).then((key) => {
          return notes_default.notes.get(key);
        }).then((note) => {
          context.commit(ADD_NOTE, note);
          return note;
        });
      },
      [EDIT_NOTE](context, { id, ...details }) {
        if (!id)
          throw new Error("Cannot update note without ID being specified");
        const date = new Date();
        details.updatedAt = date;
        return notes_default.notes.update(id, details).then(() => {
          return notes_default.notes.get(id);
        }).then((note) => {
          context.commit(EDIT_NOTE, note);
          return note;
        });
      },
      [ARCHIVE_NOTE](context, id) {
        return notes_default.notes.update(id, { isArchived: true }).then(() => {
          context.commit(ARCHIVE_NOTE, id);
        });
      },
      [UNARCHIVE_NOTE](context, id) {
        return notes_default.notes.update(id, { isArchived: false }).then(() => {
          context.commit(UNARCHIVE_NOTE, id);
        });
      },
      [DELETE_NOTE](context, id) {
        return notes_default.notes.delete(id).then(() => {
          context.commit(DELETE_NOTE, id);
        });
      }
    },
    mutations: {
      [POPULATE](state, notes) {
        notes.forEach((note) => {
          state.push(note);
        });
      },
      [ADD_NOTE](state, note) {
        state.push(note);
      },
      [EDIT_NOTE](state, { id, ...details }) {
        const note = state.find((note2) => note2.id === id);
        for (let i in details) {
          note[i] = details[i];
        }
      },
      [ARCHIVE_NOTE](state, id) {
        const note = state.find((note2) => note2.id === id);
        note.isArchived = true;
      },
      [UNARCHIVE_NOTE](state, id) {
        const note = state.find((note2) => note2.id === id);
        note.isArchived = false;
      },
      [DELETE_NOTE](state, id) {
        const note = state.find((note2) => note2.id === id);
        const pos = state.indexOf(note);
        state.splice(pos, 1);
      }
    }
  };

  // store/index.js
  Vue.use(import_vuex_common.default);
  var store = new import_vuex_common.default.Store({
    strict: true,
    modules: {
      app: app_default,
      notes: notes_default2
    }
  });
  notes_default.notes.toArray().then((notes) => {
    store.commit(POPULATE, notes);
  });
  var store_default = store;

  // src/components/ContentCard.vue
  var __vue_script__5 = {
    props: {
      fullscreen: {
        type: Boolean,
        default: false,
        required: false
      },
      preview: {
        type: Boolean,
        default: false,
        required: false
      },
      title: {
        type: String,
        default: "",
        required: false
      },
      to: {
        type: Object,
        default: null,
        required: false
      }
    },
    methods: {
      doAction() {
        if (this.to) {
          this.$router.push(this.to);
        }
      }
    }
  };
  var __vue_render__5 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      {
        class: {
          card: true,
          "card--fullscreen": _vm.fullscreen,
          "card--preview": _vm.preview
        },
        on: { click: _vm.doAction }
      },
      [
        _vm.title ? _c("h2", { staticClass: "card__title" }, [_vm._v(_vm._s(_vm.title))]) : _vm._e(),
        _vm._v(" "),
        _c("div", { staticClass: "card__body" }, [_vm._t("default")], 2),
        _vm._v(" "),
        _vm.$slots.button ? _c("div", { staticClass: "card__actions" }, [_vm._t("button")], 2) : _vm._e()
      ]
    );
  };
  var __vue_staticRenderFns__5 = [];
  __vue_render__5._withStripped = true;
  var __vue_inject_styles__5 = function(inject) {
    if (!inject)
      return;
    inject("data-v-13f0153f_0", { source: "\n.card {\n  padding: var(--spacing);\n}\n.card--fullscreen {\n  display: flex;\n  flex-direction: column;\n  flex: auto;\n}\n.card--fullscreen > .card__body {\n  flex: auto;\n  display: flex;\n  flex-direction: column;\n}\n.card__title {\n  margin: 0;\n  font-size: 1.5rem;\n  font-weight: normal;\n}\n.card__actions {\n  text-align: right;\n}\n.card__actions > * + * {\n  margin-left: 0.5rem;\n}\n.card--preview {\n  margin-bottom: var(--spacing);\n  text-shadow: 0 0 10px hsla(0, 0%, 100%, 0.4);\n  background-color: hsla(0, 0%, 25%, 0.5);\n}\n", map: { "version": 3, "sources": ["src/components/ContentCard.vue"], "names": [], "mappings": ";AAoDA;EACA,uBAAA;AACA;AAEA;EACA,aAAA;EACA,sBAAA;EACA,UAAA;AACA;AAEA;EACA,UAAA;EACA,aAAA;EACA,sBAAA;AACA;AAEA;EACA,SAAA;EACA,iBAAA;EACA,mBAAA;AACA;AAEA;EACA,iBAAA;AACA;AAEA;EACA,mBAAA;AACA;AAEA;EACA,6BAAA;EACA,4CAAA;EACA,uCAAA;AACA", "file": "ContentCard.vue", "sourcesContent": [`<template>
  <div
    :class="{
      card: true,
      'card--fullscreen': fullscreen,
      'card--preview': preview,
    }"
    @click="doAction"
  >
    <h2 v-if="title" class="card__title">{{ title }}</h2>
    <div class="card__body"><slot /></div>
    <div v-if="$slots.button" class="card__actions">
      <slot name="button" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fullscreen: {
      type: Boolean,
      default: false,
      required: false,
    },
    preview: {
      type: Boolean,
      default: false,
      required: false,
    },
    title: {
      type: String,
      default: "",
      required: false,
    },
    to: {
      type: Object,
      default: null,
      required: false,
    },
  },
  methods: {
    doAction() {
      if (this.to) {
        this.$router.push(this.to);
      }
    },
  },
};
<\/script>

<style lang="css">
.card {
  padding: var(--spacing);
}

.card--fullscreen {
  display: flex;
  flex-direction: column;
  flex: auto;
}

.card--fullscreen > .card__body {
  flex: auto;
  display: flex;
  flex-direction: column;
}

.card__title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: normal;
}

.card__actions {
  text-align: right;
}

.card__actions > * + * {
  margin-left: 0.5rem;
}

.card--preview {
  margin-bottom: var(--spacing);
  text-shadow: 0 0 10px hsla(0, 0%, 100%, 0.4);
  background-color: hsla(0, 0%, 25%, 0.5);
}
</style>
`] }, media: void 0 });
  };
  var __vue_scope_id__5 = void 0;
  var __vue_module_identifier__5 = void 0;
  var __vue_is_functional_template__5 = false;
  function __vue_normalize__5(template, style2, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "src/components/ContentCard.vue";
    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional)
        component.functional = true;
    }
    component._scopeId = scope;
    if (true) {
      let hook;
      if (false) {
        hook = function(context) {
          context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
          if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
            context = __VUE_SSR_CONTEXT__;
          }
          if (style2) {
            style2.call(this, createInjectorSSR(context));
          }
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        component._ssrRegister = hook;
      } else if (style2) {
        hook = shadowMode ? function(context) {
          style2.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function(context) {
          style2.call(this, createInjector(context));
        };
      }
      if (hook !== void 0) {
        if (component.functional) {
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }
    return component;
  }
  function __vue_create_injector__5() {
    const styles = __vue_create_injector__5.styles || (__vue_create_injector__5.styles = {});
    const isOldIE = typeof navigator !== "undefined" && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]'))
        return;
      const group = isOldIE ? css.media || "default" : id;
      const style2 = styles[group] || (styles[group] = { ids: [], parts: [], element: void 0 });
      if (!style2.ids.includes(id)) {
        let code = css.source;
        let index2 = style2.ids.length;
        style2.ids.push(id);
        if (false) {
          code += "\n/*# sourceURL=" + css.map.sources[0] + " */";
          code += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + " */";
        }
        if (isOldIE) {
          style2.element = style2.element || document.querySelector("style[data-group=" + group + "]");
        }
        if (!style2.element) {
          const head = document.head || document.getElementsByTagName("head")[0];
          const el = style2.element = document.createElement("style");
          el.type = "text/css";
          if (css.media)
            el.setAttribute("media", css.media);
          if (isOldIE) {
            el.setAttribute("data-group", group);
            el.setAttribute("data-next-index", "0");
          }
          head.appendChild(el);
        }
        if (isOldIE) {
          index2 = parseInt(style2.element.getAttribute("data-next-index"));
          style2.element.setAttribute("data-next-index", index2 + 1);
        }
        if (style2.element.styleSheet) {
          style2.parts.push(code);
          style2.element.styleSheet.cssText = style2.parts.filter(Boolean).join("\n");
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style2.element.childNodes;
          if (nodes[index2])
            style2.element.removeChild(nodes[index2]);
          if (nodes.length)
            style2.element.insertBefore(textNode, nodes[index2]);
          else
            style2.element.appendChild(textNode);
        }
      }
    };
  }
  var __vue_component__5 = /* @__PURE__ */ __vue_normalize__5(
    { render: __vue_render__5, staticRenderFns: __vue_staticRenderFns__5 },
    __vue_inject_styles__5,
    __vue_script__5,
    __vue_scope_id__5,
    __vue_is_functional_template__5,
    __vue_module_identifier__5,
    false,
    __vue_create_injector__5,
    void 0,
    void 0
  );
  var ContentCard_default = __vue_component__5;

  // src/components/UiCheckbox.vue
  var __vue_script__6 = {
    model: {
      prop: "checked"
    },
    props: {
      checked: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    }
  };
  var __vue_render__6 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "label",
      { staticClass: "ui-checkbox" },
      [
        _c("input", {
          staticClass: "ui-checkbox__input",
          attrs: { disabled: _vm.disabled, type: "checkbox" },
          domProps: { checked: _vm.checked },
          on: {
            change: function($event) {
              return _vm.$emit("input", $event.target.checked);
            }
          }
        }),
        _vm._v(" "),
        _vm._t("default")
      ],
      2
    );
  };
  var __vue_staticRenderFns__6 = [];
  __vue_render__6._withStripped = true;
  var __vue_inject_styles__6 = function(inject) {
    if (!inject)
      return;
    inject("data-v-0d807141_0", { source: '\n.ui-checkbox {\n  display: flex;\n  align-items: center;\n}\n.ui-checkbox__input {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 1.2em;\n  height: 1.2em;\n  margin-left: calc(var(--spacing) * 0.25);\n  border: 1px solid var(--color-highlight);\n  border-radius: 1px;\n  background: hsla(0, 0%, 100%, 0.8);\n  font-family: inherit;\n  font-size: inherit;\n  outline: 0;\n  cursor: pointer;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  -ms-appearance: none;\n  appearance: none;\n  transition: 0.05s border-color ease-in-out;\n}\n.ui-checkbox__input:focus {\n  border-color: var(--color-primary);\n  box-shadow: 0 0 5px var(--color-primary);\n}\n.ui-checkbox__input::before {\n  content: "";\n  color: var(--color-highlight);\n  transition: color 0.1s linear, background-color 0.1s linear;\n  speak: none;\n}\n.ui-checkbox__input[disabled] {\n  background: #eaeaea;\n  cursor: not-allowed;\n}\n.ui-checkbox__input[disabled]::before {\n  color: #888;\n}\n.ui-checkbox__input:checked::before {\n  content: "\\2714";\n}\n.ui-checkbox__input:indeterminate::before {\n  content: "\\25FC";\n}\n', map: { "version": 3, "sources": ["src/components/UiCheckbox.vue"], "names": [], "mappings": ";AAgCA;EACA,aAAA;EACA,mBAAA;AACA;AAEA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,YAAA;EACA,aAAA;EACA,wCAAA;EACA,wCAAA;EACA,kBAAA;EACA,kCAAA;EACA,oBAAA;EACA,kBAAA;EACA,UAAA;EACA,eAAA;EACA,wBAAA;EACA,qBAAA;EACA,oBAAA;EACA,gBAAA;EACA,0CAAA;AACA;AAEA;EACA,kCAAA;EACA,wCAAA;AACA;AAEA;EACA,WAAA;EACA,6BAAA;EACA,2DAAA;EACA,WAAA;AACA;AAEA;EACA,mBAAA;EACA,mBAAA;AACA;AAEA;EACA,WAAA;AACA;AAEA;EACA,gBAAA;AACA;AAEA;EACA,gBAAA;AACA", "file": "UiCheckbox.vue", "sourcesContent": [`<template>
  <label class="ui-checkbox">
    <input
      :checked="checked"
      :disabled="disabled"
      type="checkbox"
      class="ui-checkbox__input"
      @change="$emit('input', $event.target.checked)"
    />
    <slot />
  </label>
</template>

<script type="text/javascript">
export default {
  model: {
    prop: "checked",
  },
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
<\/script>

<style lang="css">
.ui-checkbox {
  display: flex;
  align-items: center;
}

.ui-checkbox__input {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.2em;
  height: 1.2em;
  margin-left: calc(var(--spacing) * 0.25);
  border: 1px solid var(--color-highlight);
  border-radius: 1px;
  background: hsla(0, 0%, 100%, 0.8);
  font-family: inherit;
  font-size: inherit;
  outline: 0;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  transition: 0.05s border-color ease-in-out;
}

.ui-checkbox__input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 5px var(--color-primary);
}

.ui-checkbox__input::before {
  content: "";
  color: var(--color-highlight);
  transition: color 0.1s linear, background-color 0.1s linear;
  speak: none;
}

.ui-checkbox__input[disabled] {
  background: #eaeaea;
  cursor: not-allowed;
}

.ui-checkbox__input[disabled]::before {
  color: #888;
}

.ui-checkbox__input:checked::before {
  content: "\\2714";
}

.ui-checkbox__input:indeterminate::before {
  content: "\\25FC";
}
</style>
`] }, media: void 0 });
  };
  var __vue_scope_id__6 = void 0;
  var __vue_module_identifier__6 = void 0;
  var __vue_is_functional_template__6 = false;
  function __vue_normalize__6(template, style2, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "src/components/UiCheckbox.vue";
    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional)
        component.functional = true;
    }
    component._scopeId = scope;
    if (true) {
      let hook;
      if (false) {
        hook = function(context) {
          context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
          if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
            context = __VUE_SSR_CONTEXT__;
          }
          if (style2) {
            style2.call(this, createInjectorSSR(context));
          }
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        component._ssrRegister = hook;
      } else if (style2) {
        hook = shadowMode ? function(context) {
          style2.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function(context) {
          style2.call(this, createInjector(context));
        };
      }
      if (hook !== void 0) {
        if (component.functional) {
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }
    return component;
  }
  function __vue_create_injector__6() {
    const styles = __vue_create_injector__6.styles || (__vue_create_injector__6.styles = {});
    const isOldIE = typeof navigator !== "undefined" && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]'))
        return;
      const group = isOldIE ? css.media || "default" : id;
      const style2 = styles[group] || (styles[group] = { ids: [], parts: [], element: void 0 });
      if (!style2.ids.includes(id)) {
        let code = css.source;
        let index2 = style2.ids.length;
        style2.ids.push(id);
        if (false) {
          code += "\n/*# sourceURL=" + css.map.sources[0] + " */";
          code += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + " */";
        }
        if (isOldIE) {
          style2.element = style2.element || document.querySelector("style[data-group=" + group + "]");
        }
        if (!style2.element) {
          const head = document.head || document.getElementsByTagName("head")[0];
          const el = style2.element = document.createElement("style");
          el.type = "text/css";
          if (css.media)
            el.setAttribute("media", css.media);
          if (isOldIE) {
            el.setAttribute("data-group", group);
            el.setAttribute("data-next-index", "0");
          }
          head.appendChild(el);
        }
        if (isOldIE) {
          index2 = parseInt(style2.element.getAttribute("data-next-index"));
          style2.element.setAttribute("data-next-index", index2 + 1);
        }
        if (style2.element.styleSheet) {
          style2.parts.push(code);
          style2.element.styleSheet.cssText = style2.parts.filter(Boolean).join("\n");
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style2.element.childNodes;
          if (nodes[index2])
            style2.element.removeChild(nodes[index2]);
          if (nodes.length)
            style2.element.insertBefore(textNode, nodes[index2]);
          else
            style2.element.appendChild(textNode);
        }
      }
    };
  }
  var __vue_component__6 = /* @__PURE__ */ __vue_normalize__6(
    { render: __vue_render__6, staticRenderFns: __vue_staticRenderFns__6 },
    __vue_inject_styles__6,
    __vue_script__6,
    __vue_scope_id__6,
    __vue_is_functional_template__6,
    __vue_module_identifier__6,
    false,
    __vue_create_injector__6,
    void 0,
    void 0
  );
  var UiCheckbox_default = __vue_component__6;

  // src/components/EditorListItem.vue
  var __vue_script__7 = {
    components: {
      UiCheckbox: UiCheckbox_default,
      UiIcon: UiIcon_default
    },
    props: {
      editable: {
        type: Boolean,
        default: false
      },
      ticked: {
        type: Boolean,
        default: false
      },
      item: {
        type: Object,
        required: true
      }
    },
    methods: {
      tickItem(isChecked) {
        this.$emit("tick", isChecked);
      },
      editItem(newBody) {
        this.$emit("edit", newBody);
      },
      deleteItem() {
        this.$emit("delete");
      }
    }
  };
  var __vue_render__7 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "li",
      {
        class: {
          "list-editor__item": true,
          "list-editor__item--ticked": _vm.ticked
        }
      },
      [
        _c(
          "UiCheckbox",
          {
            staticStyle: { flex: "auto" },
            attrs: { checked: _vm.item.checked },
            on: {
              input: function($event) {
                return _vm.tickItem($event);
              }
            }
          },
          [
            _vm.editable ? _c("input", {
              staticClass: "form__input list-editor__input",
              attrs: { type: "text", autocapitalize: "sentences" },
              domProps: { value: _vm.item.body },
              on: {
                change: function($event) {
                  return _vm.editItem($event.target.value);
                }
              }
            }) : [_vm._v(_vm._s(_vm.item.body))]
          ],
          2
        ),
        _vm._v(" "),
        _vm.editable ? _c(
          "button",
          {
            staticStyle: { border: "none", background: "none" },
            attrs: { type: "button" },
            on: {
              click: function($event) {
                return _vm.deleteItem();
              }
            }
          },
          [
            _c("UiIcon", {
              staticStyle: { "font-size": "1.4rem" },
              attrs: { type: "delete" }
            })
          ],
          1
        ) : _vm._e()
      ],
      1
    );
  };
  var __vue_staticRenderFns__7 = [];
  __vue_render__7._withStripped = true;
  var __vue_inject_styles__7 = void 0;
  var __vue_scope_id__7 = void 0;
  var __vue_module_identifier__7 = void 0;
  var __vue_is_functional_template__7 = false;
  function __vue_normalize__7(template, style2, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "src/components/EditorListItem.vue";
    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional)
        component.functional = true;
    }
    component._scopeId = scope;
    if (false) {
      let hook;
      if (false) {
        hook = function(context) {
          context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
          if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
            context = __VUE_SSR_CONTEXT__;
          }
          if (style2) {
            style2.call(this, createInjectorSSR(context));
          }
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        component._ssrRegister = hook;
      } else if (style2) {
        hook = shadowMode ? function(context) {
          style2.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function(context) {
          style2.call(this, createInjector(context));
        };
      }
      if (hook !== void 0) {
        if (component.functional) {
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }
    return component;
  }
  var __vue_component__7 = /* @__PURE__ */ __vue_normalize__7(
    { render: __vue_render__7, staticRenderFns: __vue_staticRenderFns__7 },
    __vue_inject_styles__7,
    __vue_script__7,
    __vue_scope_id__7,
    __vue_is_functional_template__7,
    __vue_module_identifier__7,
    false,
    void 0,
    void 0,
    void 0
  );
  var EditorListItem_default = __vue_component__7;

  // src/components/EditorList.vue
  var __vue_script__8 = {
    components: {
      EditorListItem: EditorListItem_default,
      UiCheckbox: UiCheckbox_default
    },
    props: {
      editable: {
        type: Boolean,
        required: false,
        default: false
      },
      preview: {
        type: Boolean,
        required: false,
        default: false
      },
      value: {
        type: String,
        required: true
      }
    },
    data: () => ({
      newItem: "",
      listItems: []
    }),
    computed: {
      untickedItems() {
        return this.listItems.filter((item) => !item.checked);
      },
      tickedItems() {
        return this.listItems.filter((item) => item.checked);
      }
    },
    mounted() {
      const _this = this;
      let i = 0;
      this.listItems = this.value.split("\n").filter((line) => !!line).map((line) => ({
        id: i++,
        checked: line.substr(0, 1) === "1",
        body: line.substr(1)
      }));
      this.$on("finishEditing", function() {
        _this.addItem();
      });
    },
    methods: {
      saveChanges() {
        this.$emit(
          "input",
          this.listItems.map((item) => (item.checked ? "1" : "0") + item.body).join("\n")
        );
      },
      addItem() {
        if (this.newItem.trim()) {
          this.listItems.push({
            id: this.listItems.length,
            checked: false,
            body: this.newItem
          });
          this.newItem = "";
          this.saveChanges();
        }
      },
      editItem(id, newBody) {
        this.listItems[id].body = newBody;
        this.saveChanges();
      },
      tickItem(id, isChecked) {
        this.listItems[id].checked = isChecked;
        this.saveChanges();
      },
      deleteItem(id) {
        if (confirm("Are you sure you want to delete this item?")) {
          const toDelete = this.listItems.find((item) => item.id === id);
          this.listItems.splice(this.listItems.indexOf(toDelete), 1);
          this.saveChanges();
        }
      }
    }
  };
  var __vue_render__8 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "ul",
      { class: { "list-editor": true, "list-editor--preview": _vm.preview } },
      [
        _vm._l(_vm.untickedItems, function(item) {
          return _c("EditorListItem", {
            key: item.id,
            attrs: { item, editable: _vm.editable },
            on: {
              edit: function($event) {
                return _vm.editItem(item.id, $event);
              },
              delete: function($event) {
                return _vm.deleteItem(item.id);
              },
              tick: function($event) {
                return _vm.tickItem(item.id, $event);
              }
            }
          });
        }),
        _vm._v(" "),
        _vm.tickedItems.length ? [
          _c("li", { staticClass: "list-editor__header" }, [
            _vm._v("Completed")
          ]),
          _vm._v(" "),
          _vm._l(_vm.tickedItems, function(item) {
            return _c("EditorListItem", {
              key: item.id,
              attrs: { item, editable: _vm.editable, ticked: true },
              on: {
                edit: function($event) {
                  return _vm.editItem(item.id, $event);
                },
                delete: function($event) {
                  return _vm.deleteItem(item.id);
                },
                tick: function($event) {
                  return _vm.tickItem(item.id, $event);
                }
              }
            });
          })
        ] : _vm._e(),
        _vm._v(" "),
        _vm.listItems.length === 0 ? _c("li", [_c("em", [_vm._v("No items yet")])]) : _vm._e(),
        _vm._v(" "),
        _vm.editable ? _c(
          "li",
          { staticClass: "list-editor__item list-editor__item--divided" },
          [
            _c(
              "UiCheckbox",
              { staticStyle: { flex: "auto" }, attrs: { disabled: "" } },
              [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.newItem,
                      expression: "newItem"
                    }
                  ],
                  staticClass: "form__input list-editor__input",
                  attrs: {
                    type: "text",
                    autocapitalize: "sentences",
                    autofocus: "",
                    placeholder: "New item\u2026"
                  },
                  domProps: { value: _vm.newItem },
                  on: {
                    keyup: function($event) {
                      if (!$event.type.indexOf("key") && _vm._k(
                        $event.keyCode,
                        "enter",
                        13,
                        $event.key,
                        "Enter"
                      )) {
                        return null;
                      }
                      return _vm.addItem.apply(null, arguments);
                    },
                    input: function($event) {
                      if ($event.target.composing) {
                        return;
                      }
                      _vm.newItem = $event.target.value;
                    }
                  }
                })
              ]
            )
          ],
          1
        ) : _vm._e()
      ],
      2
    );
  };
  var __vue_staticRenderFns__8 = [];
  __vue_render__8._withStripped = true;
  var __vue_inject_styles__8 = function(inject) {
    if (!inject)
      return;
    inject("data-v-af90d4a4_0", { source: '\n.list-editor {\n  margin: 0;\n  padding: 0;\n  list-style-type: none;\n}\n.list-editor__header {\n  display: grid;\n  grid-template-columns: 1fr auto 1fr;\n  grid-gap: var(--spacing);\n  align-items: center;\n  color: var(--color-highlight);\n  font-size: 0.8rem;\n  text-transform: uppercase;\n  text-align: center;\n}\n.list-editor__header::before,\n.list-editor__header::after {\n  content: " ";\n  border-top: 1px dashed currentColor;\n}\n.list-editor__item {\n  display: flex;\n  align-items: center;\n  margin: 1rem 0;\n}\n.list-editor__item--divided {\n  padding-top: 1rem;\n  border-top: 1px dashed var(--color-highlight);\n}\n.list-editor__item--ticked {\n  color: hsla(0, 0%, 75%, 0.5);\n  text-decoration: line-through;\n}\n.list-editor__input,\n.form__input.list-editor__input {\n  margin: 0;\n  padding: 0 0 0 0.25rem;\n  color: inherit;\n  background-color: transparent;\n}\n\n/** Preview variant **/\n.list-editor--preview {\n  font-size: 0.9rem;\n}\n.list-editor--preview .list-editor__item {\n  margin: 0;\n}\n', map: { "version": 3, "sources": ["src/components/EditorList.vue"], "names": [], "mappings": ";AA6IA;EACA,SAAA;EACA,UAAA;EACA,qBAAA;AACA;AAEA;EACA,aAAA;EACA,mCAAA;EACA,wBAAA;EACA,mBAAA;EACA,6BAAA;EACA,iBAAA;EACA,yBAAA;EACA,kBAAA;AACA;AAEA;;EAEA,YAAA;EACA,mCAAA;AACA;AAEA;EACA,aAAA;EACA,mBAAA;EACA,cAAA;AACA;AAEA;EACA,iBAAA;EACA,6CAAA;AACA;AAEA;EACA,4BAAA;EACA,6BAAA;AACA;AAEA;;EAEA,SAAA;EACA,sBAAA;EACA,cAAA;EACA,6BAAA;AACA;;AAEA,sBAAA;AACA;EACA,iBAAA;AACA;AAEA;EACA,SAAA;AACA", "file": "EditorList.vue", "sourcesContent": [`<template>
  <ul :class="{ 'list-editor': true, 'list-editor--preview': preview }">
    <EditorListItem
      v-for="item in untickedItems"
      :key="item.id"
      :item="item"
      :editable="editable"
      @edit="editItem(item.id, $event)"
      @delete="deleteItem(item.id)"
      @tick="tickItem(item.id, $event)"
    />

    <template v-if="tickedItems.length">
      <li class="list-editor__header">Completed</li>
      <EditorListItem
        v-for="item in tickedItems"
        :key="item.id"
        :item="item"
        :editable="editable"
        :ticked="true"
        @edit="editItem(item.id, $event)"
        @delete="deleteItem(item.id)"
        @tick="tickItem(item.id, $event)"
      />
    </template>

    <li v-if="listItems.length === 0"><em>No items yet</em></li>
    <li v-if="editable" class="list-editor__item list-editor__item--divided">
      <UiCheckbox disabled style="flex: auto">
        <input
          v-model="newItem"
          type="text"
          autocapitalize="sentences"
          class="form__input list-editor__input"
          autofocus
          placeholder="New item\u2026"
          @keyup.enter="addItem"
        />
      </UiCheckbox>
    </li>
  </ul>
</template>

<script>
import EditorListItem from "./EditorListItem.vue";
import UiCheckbox from "./UiCheckbox.vue";

export default {
  components: {
    EditorListItem,
    UiCheckbox,
  },
  props: {
    editable: {
      type: Boolean,
      required: false,
      default: false,
    },
    preview: {
      type: Boolean,
      required: false,
      default: false,
    },
    value: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    newItem: "",
    listItems: [],
  }),
  computed: {
    untickedItems() {
      return this.listItems.filter((item) => !item.checked);
    },
    tickedItems() {
      return this.listItems.filter((item) => item.checked);
    },
  },
  mounted() {
    const _this = this;
    let i = 0;
    this.listItems = this.value
      .split("\\n")
      .filter((line) => !!line)
      .map((line) => ({
        id: i++,
        checked: line.substr(0, 1) === "1",
        body: line.substr(1),
      }));

    this.$on("finishEditing", function () {
      _this.addItem();
    });
  },
  methods: {
    saveChanges() {
      this.$emit(
        "input",
        this.listItems
          .map((item) => (item.checked ? "1" : "0") + item.body)
          .join("\\n")
      );
    },
    addItem() {
      if (this.newItem.trim()) {
        this.listItems.push({
          id: this.listItems.length,
          checked: false,
          body: this.newItem,
        });

        this.newItem = "";

        this.saveChanges();
      }
    },
    editItem(id, newBody) {
      this.listItems[id].body = newBody;

      this.saveChanges();
    },
    tickItem(id, isChecked) {
      this.listItems[id].checked = isChecked;

      this.saveChanges();
    },
    deleteItem(id) {
      if (confirm("Are you sure you want to delete this item?")) {
        const toDelete = this.listItems.find((item) => item.id === id);
        this.listItems.splice(this.listItems.indexOf(toDelete), 1);

        this.saveChanges();
      }
    },
  },
};
<\/script>

<style lang="css">
.list-editor {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.list-editor__header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-gap: var(--spacing);
  align-items: center;
  color: var(--color-highlight);
  font-size: 0.8rem;
  text-transform: uppercase;
  text-align: center;
}

.list-editor__header::before,
.list-editor__header::after {
  content: " ";
  border-top: 1px dashed currentColor;
}

.list-editor__item {
  display: flex;
  align-items: center;
  margin: 1rem 0;
}

.list-editor__item--divided {
  padding-top: 1rem;
  border-top: 1px dashed var(--color-highlight);
}

.list-editor__item--ticked {
  color: hsla(0, 0%, 75%, 0.5);
  text-decoration: line-through;
}

.list-editor__input,
.form__input.list-editor__input {
  margin: 0;
  padding: 0 0 0 0.25rem;
  color: inherit;
  background-color: transparent;
}

/** Preview variant **/
.list-editor--preview {
  font-size: 0.9rem;
}

.list-editor--preview .list-editor__item {
  margin: 0;
}
</style>
`] }, media: void 0 });
  };
  var __vue_scope_id__8 = void 0;
  var __vue_module_identifier__8 = void 0;
  var __vue_is_functional_template__8 = false;
  function __vue_normalize__8(template, style2, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "src/components/EditorList.vue";
    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional)
        component.functional = true;
    }
    component._scopeId = scope;
    if (true) {
      let hook;
      if (false) {
        hook = function(context) {
          context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
          if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
            context = __VUE_SSR_CONTEXT__;
          }
          if (style2) {
            style2.call(this, createInjectorSSR(context));
          }
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        component._ssrRegister = hook;
      } else if (style2) {
        hook = shadowMode ? function(context) {
          style2.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function(context) {
          style2.call(this, createInjector(context));
        };
      }
      if (hook !== void 0) {
        if (component.functional) {
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }
    return component;
  }
  function __vue_create_injector__7() {
    const styles = __vue_create_injector__7.styles || (__vue_create_injector__7.styles = {});
    const isOldIE = typeof navigator !== "undefined" && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]'))
        return;
      const group = isOldIE ? css.media || "default" : id;
      const style2 = styles[group] || (styles[group] = { ids: [], parts: [], element: void 0 });
      if (!style2.ids.includes(id)) {
        let code = css.source;
        let index2 = style2.ids.length;
        style2.ids.push(id);
        if (false) {
          code += "\n/*# sourceURL=" + css.map.sources[0] + " */";
          code += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + " */";
        }
        if (isOldIE) {
          style2.element = style2.element || document.querySelector("style[data-group=" + group + "]");
        }
        if (!style2.element) {
          const head = document.head || document.getElementsByTagName("head")[0];
          const el = style2.element = document.createElement("style");
          el.type = "text/css";
          if (css.media)
            el.setAttribute("media", css.media);
          if (isOldIE) {
            el.setAttribute("data-group", group);
            el.setAttribute("data-next-index", "0");
          }
          head.appendChild(el);
        }
        if (isOldIE) {
          index2 = parseInt(style2.element.getAttribute("data-next-index"));
          style2.element.setAttribute("data-next-index", index2 + 1);
        }
        if (style2.element.styleSheet) {
          style2.parts.push(code);
          style2.element.styleSheet.cssText = style2.parts.filter(Boolean).join("\n");
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style2.element.childNodes;
          if (nodes[index2])
            style2.element.removeChild(nodes[index2]);
          if (nodes.length)
            style2.element.insertBefore(textNode, nodes[index2]);
          else
            style2.element.appendChild(textNode);
        }
      }
    };
  }
  var __vue_component__8 = /* @__PURE__ */ __vue_normalize__8(
    { render: __vue_render__8, staticRenderFns: __vue_staticRenderFns__8 },
    __vue_inject_styles__8,
    __vue_script__8,
    __vue_scope_id__8,
    __vue_is_functional_template__8,
    __vue_module_identifier__8,
    false,
    __vue_create_injector__7,
    void 0,
    void 0
  );
  var EditorList_default = __vue_component__8;

  // src/components/UiButton.vue
  var __vue_script__9 = {
    props: {
      flavour: {
        type: String,
        default: "default",
        required: false
      },
      to: {
        type: Object,
        default: null,
        required: false
      }
    },
    methods: {
      doAction() {
        if (this.to) {
          this.$router.push(this.to);
        } else {
          this.$emit("click");
        }
      }
    }
  };
  var __vue_render__9 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "button",
      {
        class: "btn btn--" + _vm.flavour,
        attrs: { type: "button" },
        on: { click: _vm.doAction }
      },
      [_vm._t("default")],
      2
    );
  };
  var __vue_staticRenderFns__9 = [];
  __vue_render__9._withStripped = true;
  var __vue_inject_styles__9 = function(inject) {
    if (!inject)
      return;
    inject("data-v-629a53da_0", { source: "\n.btn {\n  padding: 0.7rem 1.4rem;\n  border: none;\n  border-radius: 0.2rem;\n  font-size: 1rem;\n  font-family: inherit;\n  box-shadow: 0 0 2px hsla(0, 0%, 0%, 0.12), 0 2px 2px hsla(0, 0%, 0%, 0.2);\n}\n.btn--default {\n  background-color: hsla(0, 0%, 25%, 0.5);\n  color: var(--color-text);\n}\n.btn--primary {\n  background-color: var(--color-primary);\n  color: var(--color-primary-text);\n}\n.btn--secondary {\n  background-color: var(--color-secondary);\n  color: var(--color-secondary-text);\n}\n.btn:active {\n  background-image: linear-gradient(\n    to left,\n    hsla(0, 0%, 0%, 0.2),\n    hsla(0, 0%, 0%, 0.2)\n  );\n}\n", map: { "version": 3, "sources": ["src/components/UiButton.vue"], "names": [], "mappings": ";AAiCA;EACA,sBAAA;EACA,YAAA;EACA,qBAAA;EACA,eAAA;EACA,oBAAA;EACA,yEAAA;AACA;AAEA;EACA,uCAAA;EACA,wBAAA;AACA;AAEA;EACA,sCAAA;EACA,gCAAA;AACA;AAEA;EACA,wCAAA;EACA,kCAAA;AACA;AAEA;EACA;;;;GAIA;AACA", "file": "UiButton.vue", "sourcesContent": ['<template>\n  <button :class="`btn btn--${flavour}`" type="button" @click="doAction">\n    <slot />\n  </button>\n</template>\n\n<script>\nexport default {\n  props: {\n    flavour: {\n      type: String,\n      default: "default",\n      required: false,\n    },\n    to: {\n      type: Object,\n      default: null,\n      required: false,\n    },\n  },\n  methods: {\n    doAction() {\n      if (this.to) {\n        this.$router.push(this.to);\n      } else {\n        this.$emit("click");\n      }\n    },\n  },\n};\n<\/script>\n\n<style lang="css">\n.btn {\n  padding: 0.7rem 1.4rem;\n  border: none;\n  border-radius: 0.2rem;\n  font-size: 1rem;\n  font-family: inherit;\n  box-shadow: 0 0 2px hsla(0, 0%, 0%, 0.12), 0 2px 2px hsla(0, 0%, 0%, 0.2);\n}\n\n.btn--default {\n  background-color: hsla(0, 0%, 25%, 0.5);\n  color: var(--color-text);\n}\n\n.btn--primary {\n  background-color: var(--color-primary);\n  color: var(--color-primary-text);\n}\n\n.btn--secondary {\n  background-color: var(--color-secondary);\n  color: var(--color-secondary-text);\n}\n\n.btn:active {\n  background-image: linear-gradient(\n    to left,\n    hsla(0, 0%, 0%, 0.2),\n    hsla(0, 0%, 0%, 0.2)\n  );\n}\n</style>\n'] }, media: void 0 });
  };
  var __vue_scope_id__9 = void 0;
  var __vue_module_identifier__9 = void 0;
  var __vue_is_functional_template__9 = false;
  function __vue_normalize__9(template, style2, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "src/components/UiButton.vue";
    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional)
        component.functional = true;
    }
    component._scopeId = scope;
    if (true) {
      let hook;
      if (false) {
        hook = function(context) {
          context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
          if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
            context = __VUE_SSR_CONTEXT__;
          }
          if (style2) {
            style2.call(this, createInjectorSSR(context));
          }
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        component._ssrRegister = hook;
      } else if (style2) {
        hook = shadowMode ? function(context) {
          style2.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function(context) {
          style2.call(this, createInjector(context));
        };
      }
      if (hook !== void 0) {
        if (component.functional) {
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }
    return component;
  }
  function __vue_create_injector__8() {
    const styles = __vue_create_injector__8.styles || (__vue_create_injector__8.styles = {});
    const isOldIE = typeof navigator !== "undefined" && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]'))
        return;
      const group = isOldIE ? css.media || "default" : id;
      const style2 = styles[group] || (styles[group] = { ids: [], parts: [], element: void 0 });
      if (!style2.ids.includes(id)) {
        let code = css.source;
        let index2 = style2.ids.length;
        style2.ids.push(id);
        if (false) {
          code += "\n/*# sourceURL=" + css.map.sources[0] + " */";
          code += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + " */";
        }
        if (isOldIE) {
          style2.element = style2.element || document.querySelector("style[data-group=" + group + "]");
        }
        if (!style2.element) {
          const head = document.head || document.getElementsByTagName("head")[0];
          const el = style2.element = document.createElement("style");
          el.type = "text/css";
          if (css.media)
            el.setAttribute("media", css.media);
          if (isOldIE) {
            el.setAttribute("data-group", group);
            el.setAttribute("data-next-index", "0");
          }
          head.appendChild(el);
        }
        if (isOldIE) {
          index2 = parseInt(style2.element.getAttribute("data-next-index"));
          style2.element.setAttribute("data-next-index", index2 + 1);
        }
        if (style2.element.styleSheet) {
          style2.parts.push(code);
          style2.element.styleSheet.cssText = style2.parts.filter(Boolean).join("\n");
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style2.element.childNodes;
          if (nodes[index2])
            style2.element.removeChild(nodes[index2]);
          if (nodes.length)
            style2.element.insertBefore(textNode, nodes[index2]);
          else
            style2.element.appendChild(textNode);
        }
      }
    };
  }
  var __vue_component__9 = /* @__PURE__ */ __vue_normalize__9(
    { render: __vue_render__9, staticRenderFns: __vue_staticRenderFns__9 },
    __vue_inject_styles__9,
    __vue_script__9,
    __vue_scope_id__9,
    __vue_is_functional_template__9,
    __vue_module_identifier__9,
    false,
    __vue_create_injector__8,
    void 0,
    void 0
  );
  var UiButton_default = __vue_component__9;

  // src/components/EditView.vue
  var __vue_script__10 = {
    components: {
      ContentCard: ContentCard_default,
      EditorList: EditorList_default,
      UiButton: UiButton_default
    },
    data: function() {
      if (this.$route.params.id) {
        const note = this.$store.state.notes.find(
          (note2) => note2.id === parseInt(this.$route.params.id, 10)
        );
        return {
          id: parseInt(this.$route.params.id, 10),
          isNew: false,
          type: note.type,
          title: note.title,
          body: note.body
        };
      } else {
        return {
          id: null,
          isNew: true,
          type: "text",
          title: "",
          body: ""
        };
      }
    },
    mounted() {
      this.resizeTextarea();
    },
    methods: {
      resizeTextarea() {
        const $textarea = this.$refs.editorText;
        if ($textarea) {
          $textarea.style.height = "auto";
          $textarea.style.height = $textarea.scrollHeight + "px";
        }
      },
      saveNote() {
        if (this.type === "list") {
          this.$refs.editorList.$emit("finishEditing");
        }
        if (this.title || this.body) {
          let action = null;
          if (this.isNew) {
            action = this.$store.dispatch(ADD_NOTE, {
              type: this.type,
              title: this.title,
              body: this.body
            });
          } else {
            action = this.$store.dispatch(EDIT_NOTE, {
              id: this.id,
              title: this.title,
              body: this.body
            });
          }
          action.then((note) => {
            this.$router.push({ name: "note", params: { id: note.id } });
          });
        }
      }
    }
  };
  var __vue_render__10 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "ContentCard",
      { attrs: { fullscreen: true } },
      [
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.title,
              expression: "title"
            }
          ],
          staticClass: "form__input form__input--title",
          attrs: {
            autofocus: _vm.isNew,
            type: "text",
            autocapitalize: "sentences",
            placeholder: "Title"
          },
          domProps: { value: _vm.title },
          on: {
            input: function($event) {
              if ($event.target.composing) {
                return;
              }
              _vm.title = $event.target.value;
            }
          }
        }),
        _vm._v(" "),
        _vm.isNew ? _c(
          "select",
          {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.type,
                expression: "type"
              }
            ],
            staticClass: "form__input",
            on: {
              change: function($event) {
                var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
                  return o.selected;
                }).map(function(o) {
                  var val = "_value" in o ? o._value : o.value;
                  return val;
                });
                _vm.type = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
              }
            }
          },
          [
            _c("option", { attrs: { value: "text" } }, [_vm._v("Text")]),
            _vm._v(" "),
            _c("option", { attrs: { value: "list" } }, [_vm._v("List")])
          ]
        ) : _vm._e(),
        _vm._v(" "),
        _vm.type === "text" ? _c("textarea", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.body,
              expression: "body"
            }
          ],
          ref: "editorText",
          staticClass: "form__input form__input--flex",
          staticStyle: { "overflow-y": "hidden" },
          attrs: {
            autofocus: !_vm.isNew,
            autocapitalize: "sentences",
            placeholder: "New note\u2026"
          },
          domProps: { value: _vm.body },
          on: {
            input: [
              function($event) {
                if ($event.target.composing) {
                  return;
                }
                _vm.body = $event.target.value;
              },
              _vm.resizeTextarea
            ]
          }
        }) : _vm._e(),
        _vm._v(" "),
        _vm.type === "list" ? _c("EditorList", {
          ref: "editorList",
          staticStyle: { flex: "auto" },
          attrs: { editable: true },
          model: {
            value: _vm.body,
            callback: function($$v) {
              _vm.body = $$v;
            },
            expression: "body"
          }
        }) : _vm._e(),
        _vm._v(" "),
        _c(
          "UiButton",
          {
            attrs: {
              slot: "button",
              to: _vm.isNew ? { name: "home" } : { name: "note", id: _vm.id }
            },
            slot: "button"
          },
          [_vm._v("Cancel")]
        ),
        _vm._v(" "),
        _c(
          "UiButton",
          {
            attrs: { slot: "button", flavour: "primary" },
            on: {
              click: function($event) {
                return _vm.saveNote();
              }
            },
            slot: "button"
          },
          [_vm._v(_vm._s(_vm.isNew ? "Add note" : "Save"))]
        )
      ],
      1
    );
  };
  var __vue_staticRenderFns__10 = [];
  __vue_render__10._withStripped = true;
  var __vue_inject_styles__10 = function(inject) {
    if (!inject)
      return;
    inject("data-v-b6006284_0", { source: "\n.form__input {\n  display: block;\n  width: 100%;\n  margin: calc(var(--spacing) * 0.5) 0;\n  padding: calc(var(--spacing) * 0.5);\n  border: 0;\n  font-family: inherit;\n  font-size: inherit;\n  color: inherit;\n  background-color: hsla(0, 0%, 75%, 0.2);\n}\n.form__input--title {\n  font-weight: bold;\n}\n.form__input--flex {\n  flex: auto;\n  resize: none;\n}\n.form__actions {\n  margin-top: 1rem;\n  text-align: right;\n}\n", map: { "version": 3, "sources": ["src/components/EditView.vue"], "names": [], "mappings": ";AA8HA;EACA,cAAA;EACA,WAAA;EACA,oCAAA;EACA,mCAAA;EACA,SAAA;EACA,oBAAA;EACA,kBAAA;EACA,cAAA;EACA,uCAAA;AACA;AAEA;EACA,iBAAA;AACA;AAEA;EACA,UAAA;EACA,YAAA;AACA;AAEA;EACA,gBAAA;EACA,iBAAA;AACA", "file": "EditView.vue", "sourcesContent": [`<template>
  <ContentCard :fullscreen="true">
    <input
      v-model="title"
      :autofocus="isNew"
      type="text"
      autocapitalize="sentences"
      placeholder="Title"
      class="form__input form__input--title"
    />

    <select v-if="isNew" v-model="type" class="form__input">
      <option value="text">Text</option>
      <option value="list">List</option>
    </select>

    <textarea
      v-if="type === 'text'"
      v-model="body"
      :autofocus="!isNew"
      ref="editorText"
      autocapitalize="sentences"
      placeholder="New note\u2026"
      class="form__input form__input--flex"
      @input="resizeTextarea"
      style="overflow-y: hidden"
    ></textarea>

    <EditorList
      v-if="type === 'list'"
      ref="editorList"
      v-model="body"
      :editable="true"
      style="flex: auto"
    />

    <UiButton
      slot="button"
      :to="isNew ? { name: 'home' } : { name: 'note', id }"
      >Cancel</UiButton
    >
    <UiButton slot="button" flavour="primary" @click="saveNote()">{{
      isNew ? "Add note" : "Save"
    }}</UiButton>
  </ContentCard>
</template>

<script>
import ContentCard from "./ContentCard.vue";
import EditorList from "./EditorList.vue";
import UiButton from "./UiButton.vue";
import { ADD_NOTE, EDIT_NOTE } from "../../store/mutation-types.js";

export default {
  components: {
    ContentCard,
    EditorList,
    UiButton,
  },
  data: function () {
    if (this.$route.params.id) {
      const note = this.$store.state.notes.find(
        (note) => note.id === parseInt(this.$route.params.id, 10)
      );
      return {
        id: parseInt(this.$route.params.id, 10),
        isNew: false,
        type: note.type,
        title: note.title,
        body: note.body,
      };
    } else {
      return {
        id: null,
        isNew: true,
        type: "text",
        title: "",
        body: "",
      };
    }
  },
  mounted() {
    this.resizeTextarea();
  },
  methods: {
    resizeTextarea() {
      const $textarea = this.$refs.editorText;
      if ($textarea) {
        $textarea.style.height = "auto";
        $textarea.style.height = $textarea.scrollHeight + "px";
      }
    },
    saveNote() {
      // Tell the list editor to save changes
      // This adds anything in "Add to list" field to the list
      if (this.type === "list") {
        this.$refs.editorList.$emit("finishEditing");
      }

      if (this.title || this.body) {
        // Determine save action
        let action = null;
        if (this.isNew) {
          action = this.$store.dispatch(ADD_NOTE, {
            type: this.type,
            title: this.title,
            body: this.body,
          });
        } else {
          action = this.$store.dispatch(EDIT_NOTE, {
            id: this.id,
            title: this.title,
            body: this.body,
          });
        }

        action.then((note) => {
          this.$router.push({ name: "note", params: { id: note.id } });
        });
      }
    },
  },
};
<\/script>

<style lang="css">
.form__input {
  display: block;
  width: 100%;
  margin: calc(var(--spacing) * 0.5) 0;
  padding: calc(var(--spacing) * 0.5);
  border: 0;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  background-color: hsla(0, 0%, 75%, 0.2);
}

.form__input--title {
  font-weight: bold;
}

.form__input--flex {
  flex: auto;
  resize: none;
}

.form__actions {
  margin-top: 1rem;
  text-align: right;
}
</style>
`] }, media: void 0 });
  };
  var __vue_scope_id__10 = void 0;
  var __vue_module_identifier__10 = void 0;
  var __vue_is_functional_template__10 = false;
  function __vue_normalize__10(template, style2, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "src/components/EditView.vue";
    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional)
        component.functional = true;
    }
    component._scopeId = scope;
    if (true) {
      let hook;
      if (false) {
        hook = function(context) {
          context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
          if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
            context = __VUE_SSR_CONTEXT__;
          }
          if (style2) {
            style2.call(this, createInjectorSSR(context));
          }
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        component._ssrRegister = hook;
      } else if (style2) {
        hook = shadowMode ? function(context) {
          style2.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function(context) {
          style2.call(this, createInjector(context));
        };
      }
      if (hook !== void 0) {
        if (component.functional) {
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }
    return component;
  }
  function __vue_create_injector__9() {
    const styles = __vue_create_injector__9.styles || (__vue_create_injector__9.styles = {});
    const isOldIE = typeof navigator !== "undefined" && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]'))
        return;
      const group = isOldIE ? css.media || "default" : id;
      const style2 = styles[group] || (styles[group] = { ids: [], parts: [], element: void 0 });
      if (!style2.ids.includes(id)) {
        let code = css.source;
        let index2 = style2.ids.length;
        style2.ids.push(id);
        if (false) {
          code += "\n/*# sourceURL=" + css.map.sources[0] + " */";
          code += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + " */";
        }
        if (isOldIE) {
          style2.element = style2.element || document.querySelector("style[data-group=" + group + "]");
        }
        if (!style2.element) {
          const head = document.head || document.getElementsByTagName("head")[0];
          const el = style2.element = document.createElement("style");
          el.type = "text/css";
          if (css.media)
            el.setAttribute("media", css.media);
          if (isOldIE) {
            el.setAttribute("data-group", group);
            el.setAttribute("data-next-index", "0");
          }
          head.appendChild(el);
        }
        if (isOldIE) {
          index2 = parseInt(style2.element.getAttribute("data-next-index"));
          style2.element.setAttribute("data-next-index", index2 + 1);
        }
        if (style2.element.styleSheet) {
          style2.parts.push(code);
          style2.element.styleSheet.cssText = style2.parts.filter(Boolean).join("\n");
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style2.element.childNodes;
          if (nodes[index2])
            style2.element.removeChild(nodes[index2]);
          if (nodes.length)
            style2.element.insertBefore(textNode, nodes[index2]);
          else
            style2.element.appendChild(textNode);
        }
      }
    };
  }
  var __vue_component__10 = /* @__PURE__ */ __vue_normalize__10(
    { render: __vue_render__10, staticRenderFns: __vue_staticRenderFns__10 },
    __vue_inject_styles__10,
    __vue_script__10,
    __vue_scope_id__10,
    __vue_is_functional_template__10,
    __vue_module_identifier__10,
    false,
    __vue_create_injector__9,
    void 0,
    void 0
  );
  var EditView_default = __vue_component__10;

  // src/components/ActionButton.vue
  var __vue_script__11 = {
    components: {
      UiIcon: UiIcon_default,
      UiButton: UiButton_default
    },
    props: {
      to: {
        type: Object,
        default: null,
        required: false
      },
      icon: {
        type: String,
        required: true
      }
    },
    methods: {
      doAction() {
        if (this.to) {
          this.$router.push(this.to);
        } else {
          this.$emit("click");
        }
      }
    }
  };
  var __vue_render__11 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "UiButton",
      {
        staticClass: "btn--action",
        attrs: { to: _vm.to, flavour: "secondary" },
        on: { click: _vm.doAction }
      },
      [
        _c("UiIcon", { attrs: { type: _vm.icon } }),
        _vm._v(" "),
        _vm._t("default")
      ],
      2
    );
  };
  var __vue_staticRenderFns__11 = [];
  __vue_render__11._withStripped = true;
  var __vue_inject_styles__11 = function(inject) {
    if (!inject)
      return;
    inject("data-v-8d88d0e6_0", { source: "\n.btn.btn--action {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: fixed;\n  bottom: var(--spacing);\n  right: var(--spacing);\n  padding: var(--spacing);\n  border-radius: 2px;\n}\n.btn.btn--action .icon {\n  margin-right: calc(var(--spacing) * 0.5);\n}\n", map: { "version": 3, "sources": ["src/components/ActionButton.vue"], "names": [], "mappings": ";AAwCA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,eAAA;EACA,sBAAA;EACA,qBAAA;EACA,uBAAA;EACA,kBAAA;AACA;AAEA;EACA,wCAAA;AACA", "file": "ActionButton.vue", "sourcesContent": ['<template>\n  <UiButton :to="to" flavour="secondary" class="btn--action" @click="doAction">\n    <UiIcon :type="icon" />\n    <slot />\n  </UiButton>\n</template>\n\n<script>\nimport UiIcon from "./UiIcon.vue";\nimport UiButton from "./UiButton.vue";\n\nexport default {\n  components: {\n    UiIcon,\n    UiButton,\n  },\n  props: {\n    to: {\n      type: Object,\n      default: null,\n      required: false,\n    },\n    icon: {\n      type: String,\n      required: true,\n    },\n  },\n  methods: {\n    doAction() {\n      if (this.to) {\n        this.$router.push(this.to);\n      } else {\n        this.$emit("click");\n      }\n    },\n  },\n};\n<\/script>\n\n<style lang="css">\n.btn.btn--action {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: fixed;\n  bottom: var(--spacing);\n  right: var(--spacing);\n  padding: var(--spacing);\n  border-radius: 2px;\n}\n\n.btn.btn--action .icon {\n  margin-right: calc(var(--spacing) * 0.5);\n}\n</style>\n'] }, media: void 0 });
  };
  var __vue_scope_id__11 = void 0;
  var __vue_module_identifier__11 = void 0;
  var __vue_is_functional_template__11 = false;
  function __vue_normalize__11(template, style2, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "src/components/ActionButton.vue";
    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional)
        component.functional = true;
    }
    component._scopeId = scope;
    if (true) {
      let hook;
      if (false) {
        hook = function(context) {
          context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
          if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
            context = __VUE_SSR_CONTEXT__;
          }
          if (style2) {
            style2.call(this, createInjectorSSR(context));
          }
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        component._ssrRegister = hook;
      } else if (style2) {
        hook = shadowMode ? function(context) {
          style2.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function(context) {
          style2.call(this, createInjector(context));
        };
      }
      if (hook !== void 0) {
        if (component.functional) {
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }
    return component;
  }
  function __vue_create_injector__10() {
    const styles = __vue_create_injector__10.styles || (__vue_create_injector__10.styles = {});
    const isOldIE = typeof navigator !== "undefined" && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]'))
        return;
      const group = isOldIE ? css.media || "default" : id;
      const style2 = styles[group] || (styles[group] = { ids: [], parts: [], element: void 0 });
      if (!style2.ids.includes(id)) {
        let code = css.source;
        let index2 = style2.ids.length;
        style2.ids.push(id);
        if (false) {
          code += "\n/*# sourceURL=" + css.map.sources[0] + " */";
          code += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + " */";
        }
        if (isOldIE) {
          style2.element = style2.element || document.querySelector("style[data-group=" + group + "]");
        }
        if (!style2.element) {
          const head = document.head || document.getElementsByTagName("head")[0];
          const el = style2.element = document.createElement("style");
          el.type = "text/css";
          if (css.media)
            el.setAttribute("media", css.media);
          if (isOldIE) {
            el.setAttribute("data-group", group);
            el.setAttribute("data-next-index", "0");
          }
          head.appendChild(el);
        }
        if (isOldIE) {
          index2 = parseInt(style2.element.getAttribute("data-next-index"));
          style2.element.setAttribute("data-next-index", index2 + 1);
        }
        if (style2.element.styleSheet) {
          style2.parts.push(code);
          style2.element.styleSheet.cssText = style2.parts.filter(Boolean).join("\n");
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style2.element.childNodes;
          if (nodes[index2])
            style2.element.removeChild(nodes[index2]);
          if (nodes.length)
            style2.element.insertBefore(textNode, nodes[index2]);
          else
            style2.element.appendChild(textNode);
        }
      }
    };
  }
  var __vue_component__11 = /* @__PURE__ */ __vue_normalize__11(
    { render: __vue_render__11, staticRenderFns: __vue_staticRenderFns__11 },
    __vue_inject_styles__11,
    __vue_script__11,
    __vue_scope_id__11,
    __vue_is_functional_template__11,
    __vue_module_identifier__11,
    false,
    __vue_create_injector__10,
    void 0,
    void 0
  );
  var ActionButton_default = __vue_component__11;

  // src/components/CardList.vue
  var __vue_script__12 = {};
  var __vue_render__12 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "card-list" }, [_vm._t("default")], 2);
  };
  var __vue_staticRenderFns__12 = [];
  __vue_render__12._withStripped = true;
  var __vue_inject_styles__12 = function(inject) {
    if (!inject)
      return;
    inject("data-v-120673f4_0", { source: "\n.card-list {\n  margin: var(--spacing);\n}\n.card-list > .card {\n  border-radius: 0.1rem;\n  box-shadow: 0 2px 0.25rem hsla(0, 0%, 0%, 0.1);\n}\n", map: { "version": 3, "sources": ["src/components/CardList.vue"], "names": [], "mappings": ";AAWA;EACA,sBAAA;AACA;AAEA;EACA,qBAAA;EACA,8CAAA;AACA", "file": "CardList.vue", "sourcesContent": ['<template>\n  <div class="card-list">\n    <slot />\n  </div>\n</template>\n\n<script>\nexport default {};\n<\/script>\n\n<style lang="css">\n.card-list {\n  margin: var(--spacing);\n}\n\n.card-list > .card {\n  border-radius: 0.1rem;\n  box-shadow: 0 2px 0.25rem hsla(0, 0%, 0%, 0.1);\n}\n</style>\n'] }, media: void 0 });
  };
  var __vue_scope_id__12 = void 0;
  var __vue_module_identifier__12 = void 0;
  var __vue_is_functional_template__12 = false;
  function __vue_normalize__12(template, style2, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "src/components/CardList.vue";
    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional)
        component.functional = true;
    }
    component._scopeId = scope;
    if (true) {
      let hook;
      if (false) {
        hook = function(context) {
          context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
          if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
            context = __VUE_SSR_CONTEXT__;
          }
          if (style2) {
            style2.call(this, createInjectorSSR(context));
          }
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        component._ssrRegister = hook;
      } else if (style2) {
        hook = shadowMode ? function(context) {
          style2.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function(context) {
          style2.call(this, createInjector(context));
        };
      }
      if (hook !== void 0) {
        if (component.functional) {
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }
    return component;
  }
  function __vue_create_injector__11() {
    const styles = __vue_create_injector__11.styles || (__vue_create_injector__11.styles = {});
    const isOldIE = typeof navigator !== "undefined" && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]'))
        return;
      const group = isOldIE ? css.media || "default" : id;
      const style2 = styles[group] || (styles[group] = { ids: [], parts: [], element: void 0 });
      if (!style2.ids.includes(id)) {
        let code = css.source;
        let index2 = style2.ids.length;
        style2.ids.push(id);
        if (false) {
          code += "\n/*# sourceURL=" + css.map.sources[0] + " */";
          code += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + " */";
        }
        if (isOldIE) {
          style2.element = style2.element || document.querySelector("style[data-group=" + group + "]");
        }
        if (!style2.element) {
          const head = document.head || document.getElementsByTagName("head")[0];
          const el = style2.element = document.createElement("style");
          el.type = "text/css";
          if (css.media)
            el.setAttribute("media", css.media);
          if (isOldIE) {
            el.setAttribute("data-group", group);
            el.setAttribute("data-next-index", "0");
          }
          head.appendChild(el);
        }
        if (isOldIE) {
          index2 = parseInt(style2.element.getAttribute("data-next-index"));
          style2.element.setAttribute("data-next-index", index2 + 1);
        }
        if (style2.element.styleSheet) {
          style2.parts.push(code);
          style2.element.styleSheet.cssText = style2.parts.filter(Boolean).join("\n");
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style2.element.childNodes;
          if (nodes[index2])
            style2.element.removeChild(nodes[index2]);
          if (nodes.length)
            style2.element.insertBefore(textNode, nodes[index2]);
          else
            style2.element.appendChild(textNode);
        }
      }
    };
  }
  var __vue_component__12 = /* @__PURE__ */ __vue_normalize__12(
    { render: __vue_render__12, staticRenderFns: __vue_staticRenderFns__12 },
    __vue_inject_styles__12,
    __vue_script__12,
    __vue_scope_id__12,
    __vue_is_functional_template__12,
    __vue_module_identifier__12,
    false,
    __vue_create_injector__11,
    void 0,
    void 0
  );
  var CardList_default = __vue_component__12;

  // src/components/ListView.vue
  var __vue_script__13 = {
    components: {
      ActionButton: ActionButton_default,
      CardList: CardList_default,
      ContentCard: ContentCard_default,
      EditorList: EditorList_default,
      UiIcon: UiIcon_default
    },
    props: {
      archive: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      notes() {
        const _this = this;
        return this.$store.state.notes.filter((note) => {
          return note.isArchived === _this.archive;
        });
      }
    },
    methods: {
      sortBy(arr, key, isDescending) {
        return arr.slice().sort((a, b) => {
          return (a[key] - b[key]) * (isDescending ? -1 : 1);
        });
      }
    }
  };
  var __vue_render__13 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      [
        _c("ActionButton", { attrs: { to: { name: "compose" }, icon: "add" } }, [
          _vm._v("Add note")
        ]),
        _vm._v(" "),
        _vm.archive ? _c("div", { staticClass: "context-warning" }, [_vm._v("Archive")]) : _vm._e(),
        _vm._v(" "),
        _vm.notes.length ? _c(
          "CardList",
          _vm._l(_vm.sortBy(_vm.notes, "updatedAt", true), function(note) {
            return _c(
              "div",
              { key: note.id },
              [
                _c(
                  "ContentCard",
                  {
                    attrs: {
                      preview: true,
                      to: { name: "note", params: { id: note.id } }
                    }
                  },
                  [
                    note.title ? _c("strong", [_vm._v(_vm._s(note.title))]) : note.type === "list" ? _c("strong", [
                      _vm._v(
                        "List with " + _vm._s(note.body.split("\n").length) + " items"
                      )
                    ]) : _c("span", [
                      _vm._v(_vm._s(note.body.split("\n")[0]))
                    ])
                  ]
                )
              ],
              1
            );
          }),
          0
        ) : _c(
          "div",
          { staticClass: "empty-state" },
          [
            _c("UiIcon", {
              staticStyle: { height: "6rem" },
              attrs: { type: "document" }
            }),
            _vm._v(" "),
            _c("div", [
              _vm._v(
                "\n      You don't have any notes" + _vm._s(_vm.archive ? " in your archive" : "") + ".\n    "
              )
            ])
          ],
          1
        )
      ],
      1
    );
  };
  var __vue_staticRenderFns__13 = [];
  __vue_render__13._withStripped = true;
  var __vue_inject_styles__13 = function(inject) {
    if (!inject)
      return;
    inject("data-v-60efa92a_0", { source: "\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  height: 90vh;\n  justify-content: center;\n  align-items: center;\n  color: #999;\n}\n.context-warning {\n  text-align: center;\n  text-transform: uppercase;\n  font-size: 0.7rem;\n  font-weight: bold;\n  padding-top: 0.5rem;\n  color: #999;\n}\n.preview-text {\n  white-space: pre-wrap;\n  word-break: break-all;\n  word-break: break-word;\n}\n", map: { "version": 3, "sources": ["src/components/ListView.vue"], "names": [], "mappings": ";AAqEA;EACA,aAAA;EACA,sBAAA;EACA,YAAA;EACA,uBAAA;EACA,mBAAA;EACA,WAAA;AACA;AAEA;EACA,kBAAA;EACA,yBAAA;EACA,iBAAA;EACA,iBAAA;EACA,mBAAA;EACA,WAAA;AACA;AAEA;EACA,qBAAA;EACA,qBAAA;EACA,sBAAA;AACA", "file": "ListView.vue", "sourcesContent": [`<template>
  <div>
    <ActionButton :to="{ name: 'compose' }" icon="add">Add note</ActionButton>

    <div v-if="archive" class="context-warning">Archive</div>

    <CardList v-if="notes.length">
      <div v-for="note in sortBy(notes, 'updatedAt', true)" :key="note.id">
        <ContentCard
          :preview="true"
          :to="{ name: 'note', params: { id: note.id } }"
        >
          <strong v-if="note.title">{{ note.title }}</strong>
          <strong v-else-if="note.type === 'list'"
            >List with {{ note.body.split("\\n").length }} items</strong
          >
          <span v-else>{{ note.body.split("\\n")[0] }}</span>
        </ContentCard>
      </div>
    </CardList>
    <div v-else class="empty-state">
      <UiIcon type="document" style="height: 6rem" />
      <div>
        You don't have any notes{{ archive ? " in your archive" : "" }}.
      </div>
    </div>
  </div>
</template>

<script>
import ActionButton from "./ActionButton.vue";
import CardList from "./CardList.vue";
import ContentCard from "./ContentCard.vue";
import EditorList from "./EditorList.vue";
import UiIcon from "./UiIcon.vue";

export default {
  components: {
    ActionButton,
    CardList,
    ContentCard,
    EditorList,
    UiIcon,
  },
  props: {
    archive: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    notes() {
      const _this = this;
      return this.$store.state.notes.filter((note) => {
        return note.isArchived === _this.archive;
      });
    },
  },
  methods: {
    sortBy(arr, key, isDescending) {
      return arr.slice().sort((a, b) => {
        return (a[key] - b[key]) * (isDescending ? -1 : 1);
      });
    },
  },
};
<\/script>

<style lang="css">
.empty-state {
  display: flex;
  flex-direction: column;
  height: 90vh;
  justify-content: center;
  align-items: center;
  color: #999;
}

.context-warning {
  text-align: center;
  text-transform: uppercase;
  font-size: 0.7rem;
  font-weight: bold;
  padding-top: 0.5rem;
  color: #999;
}

.preview-text {
  white-space: pre-wrap;
  word-break: break-all;
  word-break: break-word;
}
</style>
`] }, media: void 0 });
  };
  var __vue_scope_id__13 = void 0;
  var __vue_module_identifier__13 = void 0;
  var __vue_is_functional_template__13 = false;
  function __vue_normalize__13(template, style2, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "src/components/ListView.vue";
    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional)
        component.functional = true;
    }
    component._scopeId = scope;
    if (true) {
      let hook;
      if (false) {
        hook = function(context) {
          context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
          if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
            context = __VUE_SSR_CONTEXT__;
          }
          if (style2) {
            style2.call(this, createInjectorSSR(context));
          }
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        component._ssrRegister = hook;
      } else if (style2) {
        hook = shadowMode ? function(context) {
          style2.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function(context) {
          style2.call(this, createInjector(context));
        };
      }
      if (hook !== void 0) {
        if (component.functional) {
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }
    return component;
  }
  function __vue_create_injector__12() {
    const styles = __vue_create_injector__12.styles || (__vue_create_injector__12.styles = {});
    const isOldIE = typeof navigator !== "undefined" && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]'))
        return;
      const group = isOldIE ? css.media || "default" : id;
      const style2 = styles[group] || (styles[group] = { ids: [], parts: [], element: void 0 });
      if (!style2.ids.includes(id)) {
        let code = css.source;
        let index2 = style2.ids.length;
        style2.ids.push(id);
        if (false) {
          code += "\n/*# sourceURL=" + css.map.sources[0] + " */";
          code += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + " */";
        }
        if (isOldIE) {
          style2.element = style2.element || document.querySelector("style[data-group=" + group + "]");
        }
        if (!style2.element) {
          const head = document.head || document.getElementsByTagName("head")[0];
          const el = style2.element = document.createElement("style");
          el.type = "text/css";
          if (css.media)
            el.setAttribute("media", css.media);
          if (isOldIE) {
            el.setAttribute("data-group", group);
            el.setAttribute("data-next-index", "0");
          }
          head.appendChild(el);
        }
        if (isOldIE) {
          index2 = parseInt(style2.element.getAttribute("data-next-index"));
          style2.element.setAttribute("data-next-index", index2 + 1);
        }
        if (style2.element.styleSheet) {
          style2.parts.push(code);
          style2.element.styleSheet.cssText = style2.parts.filter(Boolean).join("\n");
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style2.element.childNodes;
          if (nodes[index2])
            style2.element.removeChild(nodes[index2]);
          if (nodes.length)
            style2.element.insertBefore(textNode, nodes[index2]);
          else
            style2.element.appendChild(textNode);
        }
      }
    };
  }
  var __vue_component__13 = /* @__PURE__ */ __vue_normalize__13(
    { render: __vue_render__13, staticRenderFns: __vue_staticRenderFns__13 },
    __vue_inject_styles__13,
    __vue_script__13,
    __vue_scope_id__13,
    __vue_is_functional_template__13,
    __vue_module_identifier__13,
    false,
    __vue_create_injector__12,
    void 0,
    void 0
  );
  var ListView_default = __vue_component__13;

  // src/components/ButtonGroup.vue
  var __vue_script__14 = {};
  var __vue_render__14 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "button-group" }, [_vm._t("default")], 2);
  };
  var __vue_staticRenderFns__14 = [];
  __vue_render__14._withStripped = true;
  var __vue_inject_styles__14 = function(inject) {
    if (!inject)
      return;
    inject("data-v-739e6369_0", { source: "\n.button-group {\n  font-size: 0;\n}\n.button-group > .btn:not(:last-child) {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.button-group > .btn:not(:first-child) {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n", map: { "version": 3, "sources": ["src/components/ButtonGroup.vue"], "names": [], "mappings": ";AAWA;EACA,YAAA;AACA;AAEA;EACA,0BAAA;EACA,6BAAA;AACA;AAEA;EACA,yBAAA;EACA,4BAAA;AACA", "file": "ButtonGroup.vue", "sourcesContent": ['<template>\n  <div class="button-group">\n    <slot />\n  </div>\n</template>\n\n<script>\nexport default {};\n<\/script>\n\n<style lang="css">\n.button-group {\n  font-size: 0;\n}\n\n.button-group > .btn:not(:last-child) {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n\n.button-group > .btn:not(:first-child) {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n</style>\n'] }, media: void 0 });
  };
  var __vue_scope_id__14 = void 0;
  var __vue_module_identifier__14 = void 0;
  var __vue_is_functional_template__14 = false;
  function __vue_normalize__14(template, style2, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "src/components/ButtonGroup.vue";
    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional)
        component.functional = true;
    }
    component._scopeId = scope;
    if (true) {
      let hook;
      if (false) {
        hook = function(context) {
          context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
          if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
            context = __VUE_SSR_CONTEXT__;
          }
          if (style2) {
            style2.call(this, createInjectorSSR(context));
          }
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        component._ssrRegister = hook;
      } else if (style2) {
        hook = shadowMode ? function(context) {
          style2.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function(context) {
          style2.call(this, createInjector(context));
        };
      }
      if (hook !== void 0) {
        if (component.functional) {
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }
    return component;
  }
  function __vue_create_injector__13() {
    const styles = __vue_create_injector__13.styles || (__vue_create_injector__13.styles = {});
    const isOldIE = typeof navigator !== "undefined" && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]'))
        return;
      const group = isOldIE ? css.media || "default" : id;
      const style2 = styles[group] || (styles[group] = { ids: [], parts: [], element: void 0 });
      if (!style2.ids.includes(id)) {
        let code = css.source;
        let index2 = style2.ids.length;
        style2.ids.push(id);
        if (false) {
          code += "\n/*# sourceURL=" + css.map.sources[0] + " */";
          code += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + " */";
        }
        if (isOldIE) {
          style2.element = style2.element || document.querySelector("style[data-group=" + group + "]");
        }
        if (!style2.element) {
          const head = document.head || document.getElementsByTagName("head")[0];
          const el = style2.element = document.createElement("style");
          el.type = "text/css";
          if (css.media)
            el.setAttribute("media", css.media);
          if (isOldIE) {
            el.setAttribute("data-group", group);
            el.setAttribute("data-next-index", "0");
          }
          head.appendChild(el);
        }
        if (isOldIE) {
          index2 = parseInt(style2.element.getAttribute("data-next-index"));
          style2.element.setAttribute("data-next-index", index2 + 1);
        }
        if (style2.element.styleSheet) {
          style2.parts.push(code);
          style2.element.styleSheet.cssText = style2.parts.filter(Boolean).join("\n");
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style2.element.childNodes;
          if (nodes[index2])
            style2.element.removeChild(nodes[index2]);
          if (nodes.length)
            style2.element.insertBefore(textNode, nodes[index2]);
          else
            style2.element.appendChild(textNode);
        }
      }
    };
  }
  var __vue_component__14 = /* @__PURE__ */ __vue_normalize__14(
    { render: __vue_render__14, staticRenderFns: __vue_staticRenderFns__14 },
    __vue_inject_styles__14,
    __vue_script__14,
    __vue_scope_id__14,
    __vue_is_functional_template__14,
    __vue_module_identifier__14,
    false,
    __vue_create_injector__13,
    void 0,
    void 0
  );
  var ButtonGroup_default = __vue_component__14;

  // src/components/ModalDialog.vue
  var __vue_script__15 = {
    components: {
      UiButton: UiButton_default
    },
    model: {
      prop: "isOpen"
    },
    props: {
      dismissLabel: {
        type: String,
        default: "Close"
      },
      isOpen: {
        type: Boolean,
        default: false,
        required: true
      }
    },
    data: () => ({
      initialFocus: null
    }),
    watch: {
      isOpen: function(val) {
        const _this = this;
        if (val === true) {
          this.initialFocus = document.activeElement;
          Vue.nextTick(function() {
            _this.$refs.modal.focus();
          });
          document.body.style.overflowY = "hidden";
          this.enforceFocus();
        } else {
          document.body.style.overflowY = "";
          this.deforceFocus();
          this.initialFocus.focus();
        }
      }
    },
    methods: {
      close: function() {
        this.$emit("input", false);
      },
      keyHandle: function(event) {
        if (event.code === "Escape" || event.which === 27) {
          this.close();
        }
      },
      enforceFocus: function() {
        document.addEventListener("focusin", this.focusLock);
      },
      deforceFocus: function() {
        document.removeEventListener("focusin", this.focusLock);
      },
      focusLock: function(event) {
        if (event.target !== document && this.$refs.modal && !this.$refs.modal.contains(event.target)) {
          this.$refs.modal.focus();
        }
      }
    }
  };
  var __vue_render__15 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      {
        class: { modal: true, "modal--visible": _vm.isOpen },
        attrs: { role: "dialog" },
        on: {
          click: function($event) {
            if ($event.target !== $event.currentTarget) {
              return null;
            }
            return _vm.close.apply(null, arguments);
          }
        }
      },
      [
        _c("div", { staticClass: "modal__backdrop" }),
        _vm._v(" "),
        _c(
          "div",
          {
            ref: "modal",
            staticClass: "modal__dialog",
            attrs: {
              "aria-modal": "true",
              "aria-labelledby": "vue-" + _vm._uid + "-title"
            },
            on: { keydown: _vm.keyHandle }
          },
          [
            _c("div", { staticClass: "modal-content" }, [
              _c("div", { staticClass: "modal__header" }, [
                _c(
                  "h4",
                  {
                    staticClass: "modal__title",
                    attrs: { id: "vue-" + _vm._uid + "-title" }
                  },
                  [_vm._t("title")],
                  2
                )
              ]),
              _vm._v(" "),
              _c(
                "div",
                { ref: "body", staticClass: "modal__body" },
                [_vm._t("default")],
                2
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "modal__footer" },
                [
                  _vm.dismissLabel ? _c("UiButton", { on: { click: _vm.close } }, [
                    _vm._v(_vm._s(_vm.dismissLabel))
                  ]) : _vm._e(),
                  _vm._v(" "),
                  _vm._t("button")
                ],
                2
              )
            ])
          ]
        )
      ]
    );
  };
  var __vue_staticRenderFns__15 = [];
  __vue_render__15._withStripped = true;
  var __vue_inject_styles__15 = function(inject) {
    if (!inject)
      return;
    inject("data-v-b724461e_0", { source: "\n.modal {\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  display: none;\n  z-index: 1300;\n  position: fixed;\n  align-items: center;\n  justify-content: center;\n}\n.modal--visible {\n  display: flex;\n  opacity: 1;\n  transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;\n}\n.modal__backdrop {\n  opacity: 1;\n  transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: -1;\n  position: fixed;\n  will-change: opacity;\n  background-color: hsla(0, 0%, 0%, 0.5);\n  -webkit-tap-highlight-color: transparent;\n}\n.modal__dialog {\n  max-width: 600px;\n  flex: 0 1 auto;\n  margin: 32px;\n  display: flex;\n  position: relative;\n  max-height: 90vh;\n  overflow-y: auto;\n  flex-direction: column;\n  background-color: hsla(0, 0%, 25%, 0.5);\n  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),\n    0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);\n}\n.modal__header {\n  flex: 0 0 auto;\n  margin: 0;\n  padding: 24px 24px 20px 24px;\n}\n.modal__title {\n  margin: 0;\n  font-size: 1.2rem;\n}\n.modal__body {\n  flex: 1 1 auto;\n  padding: 0 24px 24px 24px;\n  overflow-y: auto;\n}\n.modal__footer {\n  flex: 0 0 auto;\n  margin: 8px 4px;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n.modal__footer > * + * {\n  margin-left: 0.5rem;\n}\n", map: { "version": 3, "sources": ["src/components/ModalDialog.vue"], "names": [], "mappings": ";AA0GA;EACA,MAAA;EACA,OAAA;EACA,WAAA;EACA,YAAA;EACA,aAAA;EACA,aAAA;EACA,eAAA;EACA,mBAAA;EACA,uBAAA;AACA;AAEA;EACA,aAAA;EACA,UAAA;EACA,0DAAA;AACA;AAEA;EACA,UAAA;EACA,0DAAA;EACA,MAAA;EACA,OAAA;EACA,WAAA;EACA,YAAA;EACA,WAAA;EACA,eAAA;EACA,oBAAA;EACA,sCAAA;EACA,wCAAA;AACA;AAEA;EACA,gBAAA;EACA,cAAA;EACA,YAAA;EACA,aAAA;EACA,kBAAA;EACA,gBAAA;EACA,gBAAA;EACA,sBAAA;EACA,uCAAA;EACA;+EACA;AACA;AAEA;EACA,cAAA;EACA,SAAA;EACA,4BAAA;AACA;AAEA;EACA,SAAA;EACA,iBAAA;AACA;AAEA;EACA,cAAA;EACA,yBAAA;EACA,gBAAA;AACA;AAEA;EACA,cAAA;EACA,eAAA;EACA,aAAA;EACA,mBAAA;EACA,yBAAA;AACA;AAEA;EACA,mBAAA;AACA", "file": "ModalDialog.vue", "sourcesContent": ['<template>\n  <div\n    :class="{ modal: true, \'modal--visible\': isOpen }"\n    role="dialog"\n    @click.self="close"\n  >\n    <div class="modal__backdrop" />\n    <div\n      class="modal__dialog"\n      ref="modal"\n      aria-modal="true"\n      :aria-labelledby="`vue-${_uid}-title`"\n      @keydown="keyHandle"\n    >\n      <div class="modal-content">\n        <div class="modal__header">\n          <h4 :id="`vue-${_uid}-title`" class="modal__title">\n            <slot name="title" />\n          </h4>\n        </div>\n        <div ref="body" class="modal__body">\n          <slot />\n        </div>\n        <div class="modal__footer">\n          <UiButton v-if="dismissLabel" @click="close">{{\n            dismissLabel\n          }}</UiButton>\n          <slot name="button" />\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n\n<script type="text/javascript">\nimport vue from "vue";\nimport UiButton from "./UiButton.vue";\n\nexport default {\n  components: {\n    UiButton,\n  },\n  model: {\n    prop: "isOpen",\n  },\n  props: {\n    dismissLabel: {\n      type: String,\n      default: "Close",\n    },\n    isOpen: {\n      type: Boolean,\n      default: false,\n      required: true,\n    },\n  },\n  data: () => ({\n    initialFocus: null,\n  }),\n  watch: {\n    isOpen: function (val) {\n      const _this = this;\n      if (val === true) {\n        this.initialFocus = document.activeElement;\n        vue.nextTick(function () {\n          _this.$refs.modal.focus();\n        });\n\n        document.body.style.overflowY = "hidden";\n        this.enforceFocus();\n      } else {\n        document.body.style.overflowY = "";\n        this.deforceFocus();\n        this.initialFocus.focus();\n      }\n    },\n  },\n  methods: {\n    close: function () {\n      this.$emit("input", false);\n    },\n    keyHandle: function (event) {\n      if (event.code === "Escape" || event.which === 27) {\n        this.close();\n      }\n    },\n    enforceFocus: function () {\n      document.addEventListener("focusin", this.focusLock);\n    },\n    deforceFocus: function () {\n      document.removeEventListener("focusin", this.focusLock);\n    },\n    focusLock: function (event) {\n      if (\n        event.target !== document &&\n        this.$refs.modal &&\n        !this.$refs.modal.contains(event.target)\n      ) {\n        this.$refs.modal.focus();\n      }\n    },\n  },\n};\n<\/script>\n\n<style media="screen">\n.modal {\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  display: none;\n  z-index: 1300;\n  position: fixed;\n  align-items: center;\n  justify-content: center;\n}\n\n.modal--visible {\n  display: flex;\n  opacity: 1;\n  transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;\n}\n\n.modal__backdrop {\n  opacity: 1;\n  transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: -1;\n  position: fixed;\n  will-change: opacity;\n  background-color: hsla(0, 0%, 0%, 0.5);\n  -webkit-tap-highlight-color: transparent;\n}\n\n.modal__dialog {\n  max-width: 600px;\n  flex: 0 1 auto;\n  margin: 32px;\n  display: flex;\n  position: relative;\n  max-height: 90vh;\n  overflow-y: auto;\n  flex-direction: column;\n  background-color: hsla(0, 0%, 25%, 0.5);\n  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),\n    0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);\n}\n\n.modal__header {\n  flex: 0 0 auto;\n  margin: 0;\n  padding: 24px 24px 20px 24px;\n}\n\n.modal__title {\n  margin: 0;\n  font-size: 1.2rem;\n}\n\n.modal__body {\n  flex: 1 1 auto;\n  padding: 0 24px 24px 24px;\n  overflow-y: auto;\n}\n\n.modal__footer {\n  flex: 0 0 auto;\n  margin: 8px 4px;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n\n.modal__footer > * + * {\n  margin-left: 0.5rem;\n}\n</style>\n'] }, media: "screen" });
  };
  var __vue_scope_id__15 = void 0;
  var __vue_module_identifier__15 = void 0;
  var __vue_is_functional_template__15 = false;
  function __vue_normalize__15(template, style2, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "src/components/ModalDialog.vue";
    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional)
        component.functional = true;
    }
    component._scopeId = scope;
    if (true) {
      let hook;
      if (false) {
        hook = function(context) {
          context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
          if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
            context = __VUE_SSR_CONTEXT__;
          }
          if (style2) {
            style2.call(this, createInjectorSSR(context));
          }
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        component._ssrRegister = hook;
      } else if (style2) {
        hook = shadowMode ? function(context) {
          style2.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function(context) {
          style2.call(this, createInjector(context));
        };
      }
      if (hook !== void 0) {
        if (component.functional) {
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }
    return component;
  }
  function __vue_create_injector__14() {
    const styles = __vue_create_injector__14.styles || (__vue_create_injector__14.styles = {});
    const isOldIE = typeof navigator !== "undefined" && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]'))
        return;
      const group = isOldIE ? css.media || "default" : id;
      const style2 = styles[group] || (styles[group] = { ids: [], parts: [], element: void 0 });
      if (!style2.ids.includes(id)) {
        let code = css.source;
        let index2 = style2.ids.length;
        style2.ids.push(id);
        if (false) {
          code += "\n/*# sourceURL=" + css.map.sources[0] + " */";
          code += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + " */";
        }
        if (isOldIE) {
          style2.element = style2.element || document.querySelector("style[data-group=" + group + "]");
        }
        if (!style2.element) {
          const head = document.head || document.getElementsByTagName("head")[0];
          const el = style2.element = document.createElement("style");
          el.type = "text/css";
          if (css.media)
            el.setAttribute("media", css.media);
          if (isOldIE) {
            el.setAttribute("data-group", group);
            el.setAttribute("data-next-index", "0");
          }
          head.appendChild(el);
        }
        if (isOldIE) {
          index2 = parseInt(style2.element.getAttribute("data-next-index"));
          style2.element.setAttribute("data-next-index", index2 + 1);
        }
        if (style2.element.styleSheet) {
          style2.parts.push(code);
          style2.element.styleSheet.cssText = style2.parts.filter(Boolean).join("\n");
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style2.element.childNodes;
          if (nodes[index2])
            style2.element.removeChild(nodes[index2]);
          if (nodes.length)
            style2.element.insertBefore(textNode, nodes[index2]);
          else
            style2.element.appendChild(textNode);
        }
      }
    };
  }
  var __vue_component__15 = /* @__PURE__ */ __vue_normalize__15(
    { render: __vue_render__15, staticRenderFns: __vue_staticRenderFns__15 },
    __vue_inject_styles__15,
    __vue_script__15,
    __vue_scope_id__15,
    __vue_is_functional_template__15,
    __vue_module_identifier__15,
    false,
    __vue_create_injector__14,
    void 0,
    void 0
  );
  var ModalDialog_default = __vue_component__15;

  // src/components/ToastNotification.vue
  var __vue_script__16 = {
    props: {
      body: {
        type: String,
        required: true
      },
      persist: {
        type: Boolean,
        default: false
      },
      container: {
        type: String,
        default: ".notification-area"
      },
      danger: {
        type: Boolean,
        default: false
      }
    },
    created: function() {
      let $parent = this.$parent;
      if (!$parent) {
        let parent = document.querySelector(this.container);
        if (!parent) {
          const className = this.container.replace(".", "");
          const Notifications = Vue.extend({
            name: "Notifications",
            render: function(createElement2) {
              return createElement2("div", {
                class: {
                  [`${className}`]: true
                }
              });
            }
          });
          $parent = new Notifications().$mount();
          document.body.appendChild($parent.$el);
        } else {
          $parent = parent.__vue__;
        }
        this.$_parent_ = $parent;
      }
    },
    mounted: function() {
      if (this.$_parent_) {
        this.$_parent_.$el.appendChild(this.$el);
        this.$parent = this.$_parent_;
        delete this.$_parent_;
      }
    },
    destroyed: function() {
      this.$el.parentElement.removeChild(this.$el);
    },
    methods: {
      removeIfFinished: function() {
        if (parseInt(window.getComputedStyle(this.$refs.toast).opacity, 10) === 0) {
          this.$destroy();
        }
      }
    }
  };
  var __vue_render__16 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      {
        ref: "toast",
        class: {
          toast: true,
          "toast--danger": _vm.danger,
          "toast--autohide": !_vm.persist
        },
        attrs: { "aria-live": "polite" },
        on: { animationend: _vm.removeIfFinished }
      },
      [_vm._v("\n  " + _vm._s(_vm.body) + "\n")]
    );
  };
  var __vue_staticRenderFns__16 = [];
  __vue_render__16._withStripped = true;
  var __vue_inject_styles__16 = function(inject) {
    if (!inject)
      return;
    inject("data-v-5b314887_0", { source: "\n@keyframes toast-enter {\n0% {\n    opacity: 0;\n}\n100% {\n    opacity: 1;\n}\n}\n@keyframes toast-exit {\n0% {\n    opacity: 1;\n}\n100% {\n    opacity: 0;\n}\n}\n.notification-area {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  margin: 1rem;\n  min-width: 300px;\n  max-width: 500px;\n}\n.notification-area > .toast {\n  position: static;\n  margin-top: 1rem;\n}\n.toast {\n  position: fixed;\n  bottom: 1rem;\n  left: 1rem;\n  min-width: 300px;\n  max-width: 400px;\n  padding: 0.5rem 1rem;\n  border-radius: 2px;\n  background-color: #333;\n  color: #fff;\n  font-size: 0.8rem;\n  transform: translateZ(0);\n  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);\n  animation: toast-enter 0.25s ease-out;\n}\n.toast--autohide {\n  animation: toast-enter 0.25s ease-out, toast-exit 0.5s 2.25s ease-out forwards;\n}\n.toast--danger {\n  background-color: #d9534f;\n}\n", map: { "version": 3, "sources": ["src/components/ToastNotification.vue"], "names": [], "mappings": ";AA8FA;AACA;IACA,UAAA;AACA;AACA;IACA,UAAA;AACA;AACA;AAEA;AACA;IACA,UAAA;AACA;AACA;IACA,UAAA;AACA;AACA;AAEA;EACA,eAAA;EACA,SAAA;EACA,OAAA;EACA,YAAA;EACA,gBAAA;EACA,gBAAA;AACA;AAEA;EACA,gBAAA;EACA,gBAAA;AACA;AAEA;EACA,eAAA;EACA,YAAA;EACA,UAAA;EACA,gBAAA;EACA,gBAAA;EACA,oBAAA;EACA,kBAAA;EACA,sBAAA;EACA,WAAA;EACA,iBAAA;EACA,wBAAA;EACA,yCAAA;EACA,qCAAA;AACA;AAEA;EACA,8EAAA;AACA;AAEA;EACA,yBAAA;AACA", "file": "ToastNotification.vue", "sourcesContent": ['<template>\n  <div\n    :class="{\n      toast: true,\n      \'toast--danger\': danger,\n      \'toast--autohide\': !persist,\n    }"\n    aria-live="polite"\n    @animationend="removeIfFinished"\n    ref="toast"\n  >\n    {{ body }}\n  </div>\n</template>\n\n<script type="text/javascript">\n/**\n * The design of this functionality is basically completely taken from the\n * vue-bulma-notification package, which cleverly handled creating notifications\n * without a space to mount and automatically generating `.notification-area`\n */\nimport Vue from "vue";\n\nexport default {\n  props: {\n    body: {\n      type: String,\n      required: true,\n    },\n    persist: {\n      type: Boolean,\n      default: false,\n    },\n    container: {\n      type: String,\n      default: ".notification-area",\n    },\n    danger: {\n      type: Boolean,\n      default: false,\n    },\n  },\n  created: function () {\n    let $parent = this.$parent;\n    if (!$parent) {\n      let parent = document.querySelector(this.container);\n      if (!parent) {\n        // Lazy create `div.notification-area` container if it doesn\'t yet exist\n        const className = this.container.replace(".", "");\n        const Notifications = Vue.extend({\n          name: "Notifications",\n          render: function (createElement) {\n            return createElement("div", {\n              class: {\n                [`${className}`]: true,\n              },\n            });\n          },\n        });\n        $parent = new Notifications().$mount();\n        document.body.appendChild($parent.$el);\n      } else {\n        $parent = parent.__vue__;\n      }\n\n      /* eslint-disable */\n      this.$_parent_ = $parent;\n      /* eslint-enable */\n    }\n  },\n  mounted: function () {\n    if (this.$_parent_) {\n      this.$_parent_.$el.appendChild(this.$el);\n      this.$parent = this.$_parent_;\n      delete this.$_parent_;\n    }\n  },\n  destroyed: function () {\n    this.$el.parentElement.removeChild(this.$el);\n  },\n  methods: {\n    removeIfFinished: function () {\n      // When the toast finishes an animation which makes it invisible, destroy the DOM element\n      if (\n        parseInt(window.getComputedStyle(this.$refs.toast).opacity, 10) === 0\n      ) {\n        this.$destroy();\n      }\n    },\n  },\n};\n<\/script>\n\n<style media="screen">\n@keyframes toast-enter {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n@keyframes toast-exit {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n\n.notification-area {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  margin: 1rem;\n  min-width: 300px;\n  max-width: 500px;\n}\n\n.notification-area > .toast {\n  position: static;\n  margin-top: 1rem;\n}\n\n.toast {\n  position: fixed;\n  bottom: 1rem;\n  left: 1rem;\n  min-width: 300px;\n  max-width: 400px;\n  padding: 0.5rem 1rem;\n  border-radius: 2px;\n  background-color: #333;\n  color: #fff;\n  font-size: 0.8rem;\n  transform: translateZ(0);\n  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);\n  animation: toast-enter 0.25s ease-out;\n}\n\n.toast--autohide {\n  animation: toast-enter 0.25s ease-out, toast-exit 0.5s 2.25s ease-out forwards;\n}\n\n.toast--danger {\n  background-color: #d9534f;\n}\n</style>\n'] }, media: "screen" });
  };
  var __vue_scope_id__16 = void 0;
  var __vue_module_identifier__16 = void 0;
  var __vue_is_functional_template__16 = false;
  function __vue_normalize__16(template, style2, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "src/components/ToastNotification.vue";
    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional)
        component.functional = true;
    }
    component._scopeId = scope;
    if (true) {
      let hook;
      if (false) {
        hook = function(context) {
          context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
          if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
            context = __VUE_SSR_CONTEXT__;
          }
          if (style2) {
            style2.call(this, createInjectorSSR(context));
          }
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        component._ssrRegister = hook;
      } else if (style2) {
        hook = shadowMode ? function(context) {
          style2.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function(context) {
          style2.call(this, createInjector(context));
        };
      }
      if (hook !== void 0) {
        if (component.functional) {
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }
    return component;
  }
  function __vue_create_injector__15() {
    const styles = __vue_create_injector__15.styles || (__vue_create_injector__15.styles = {});
    const isOldIE = typeof navigator !== "undefined" && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]'))
        return;
      const group = isOldIE ? css.media || "default" : id;
      const style2 = styles[group] || (styles[group] = { ids: [], parts: [], element: void 0 });
      if (!style2.ids.includes(id)) {
        let code = css.source;
        let index2 = style2.ids.length;
        style2.ids.push(id);
        if (false) {
          code += "\n/*# sourceURL=" + css.map.sources[0] + " */";
          code += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + " */";
        }
        if (isOldIE) {
          style2.element = style2.element || document.querySelector("style[data-group=" + group + "]");
        }
        if (!style2.element) {
          const head = document.head || document.getElementsByTagName("head")[0];
          const el = style2.element = document.createElement("style");
          el.type = "text/css";
          if (css.media)
            el.setAttribute("media", css.media);
          if (isOldIE) {
            el.setAttribute("data-group", group);
            el.setAttribute("data-next-index", "0");
          }
          head.appendChild(el);
        }
        if (isOldIE) {
          index2 = parseInt(style2.element.getAttribute("data-next-index"));
          style2.element.setAttribute("data-next-index", index2 + 1);
        }
        if (style2.element.styleSheet) {
          style2.parts.push(code);
          style2.element.styleSheet.cssText = style2.parts.filter(Boolean).join("\n");
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style2.element.childNodes;
          if (nodes[index2])
            style2.element.removeChild(nodes[index2]);
          if (nodes.length)
            style2.element.insertBefore(textNode, nodes[index2]);
          else
            style2.element.appendChild(textNode);
        }
      }
    };
  }
  var __vue_component__16 = /* @__PURE__ */ __vue_normalize__16(
    { render: __vue_render__16, staticRenderFns: __vue_staticRenderFns__16 },
    __vue_inject_styles__16,
    __vue_script__16,
    __vue_scope_id__16,
    __vue_is_functional_template__16,
    __vue_module_identifier__16,
    false,
    __vue_create_injector__15,
    void 0,
    void 0
  );
  var ToastNotification_default = __vue_component__16;

  // src/toast.js
  function toast(body, props3 = {}) {
    props3.body = body;
    const ToastComponent = Vue.extend(ToastNotification_default);
    new ToastComponent({
      el: document.createElement("div"),
      propsData: props3
    });
  }

  // src/components/NoteView.vue
  var __vue_script__17 = {
    components: {
      ActionButton: ActionButton_default,
      ButtonGroup: ButtonGroup_default,
      ContentCard: ContentCard_default,
      UiIcon: UiIcon_default,
      EditorList: EditorList_default,
      ModalDialog: ModalDialog_default,
      UiButton: UiButton_default
    },
    data: () => ({
      showConfirmArchive: false,
      showConfirmDelete: false
    }),
    computed: {
      note() {
        return this.$store.state.notes.find(
          (a) => a.id === parseInt(this.$route.params.id, 10)
        );
      },
      shareSupported() {
        return "share" in navigator;
      }
    },
    methods: {
      archiveNote() {
        this.$store.dispatch(
          this.note.isArchived ? UNARCHIVE_NOTE : ARCHIVE_NOTE,
          this.note.id
        ).then(() => {
          this.$router.push({ name: "home" });
          toast("Note archived");
        });
      },
      share() {
        navigator.share({
          title: this.note.title,
          text: this.note.body
        });
      },
      saveNote(body) {
        this.$store.dispatch(EDIT_NOTE, { id: this.note.id, body });
      },
      deleteNote() {
        this.$store.dispatch(DELETE_NOTE, this.note.id).then(() => {
          this.$router.push({ name: "home" });
          toast("Note deleted");
        });
      }
    }
  };
  var __vue_render__17 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "ContentCard",
      { attrs: { title: _vm.note.title, fullscreen: true } },
      [
        _vm.note.type === "text" ? _c("p", { staticClass: "note__body" }, [
          _vm._v(_vm._s(_vm.note.body))
        ]) : _vm._e(),
        _vm._v(" "),
        _vm.note.type === "list" ? _c("EditorList", {
          attrs: { value: _vm.note.body },
          on: { input: _vm.saveNote }
        }) : _vm._e(),
        _vm._v(" "),
        _c(
          "ButtonGroup",
          {
            staticStyle: { float: "left" },
            attrs: { slot: "button" },
            slot: "button"
          },
          [
            _c(
              "UiButton",
              {
                on: {
                  click: function($event) {
                    _vm.showConfirmDelete = true;
                  }
                }
              },
              [
                _c("UiIcon", {
                  staticStyle: { "font-size": "1.4rem" },
                  attrs: { type: "delete" }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "UiButton",
              {
                on: {
                  click: function($event) {
                    _vm.showConfirmArchive = true;
                  }
                }
              },
              [
                _c("UiIcon", {
                  staticStyle: { "font-size": "1.4rem" },
                  attrs: { type: _vm.note.isArchived ? "unarchive" : "archive" }
                })
              ],
              1
            ),
            _vm._v(" "),
            _vm.shareSupported ? _c(
              "UiButton",
              { on: { click: _vm.share } },
              [
                _c("UiIcon", {
                  staticStyle: { "font-size": "1.4rem" },
                  attrs: { type: "share" }
                })
              ],
              1
            ) : _vm._e()
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "ActionButton",
          {
            attrs: {
              slot: "button",
              to: { name: "edit", id: _vm.note.id },
              icon: "edit"
            },
            slot: "button"
          },
          [_vm._v("Edit")]
        ),
        _vm._v(" "),
        _c(
          "ModalDialog",
          {
            attrs: { "dismiss-label": "Cancel" },
            model: {
              value: _vm.showConfirmDelete,
              callback: function($$v) {
                _vm.showConfirmDelete = $$v;
              },
              expression: "showConfirmDelete"
            }
          },
          [
            _c("template", { slot: "title" }, [_vm._v("Confirm Delete")]),
            _vm._v("\n    Are you sure you want to delete this note?\n    "),
            _c(
              "UiButton",
              {
                attrs: { slot: "button", flavour: "primary" },
                on: {
                  click: function($event) {
                    return _vm.deleteNote();
                  }
                },
                slot: "button"
              },
              [_vm._v("Delete")]
            )
          ],
          2
        ),
        _vm._v(" "),
        _c(
          "ModalDialog",
          {
            attrs: { "dismiss-label": "Cancel" },
            model: {
              value: _vm.showConfirmArchive,
              callback: function($$v) {
                _vm.showConfirmArchive = $$v;
              },
              expression: "showConfirmArchive"
            }
          },
          [
            _c("template", { slot: "title" }, [
              _vm._v(
                "Confirm " + _vm._s(_vm.note.isArchived ? "Unarchive" : "Archive")
              )
            ]),
            _vm._v(
              "\n    Are you sure you want to\n    " + _vm._s(_vm.note.isArchived ? "unarchive" : "archive") + " this note?\n    "
            ),
            _c(
              "UiButton",
              {
                attrs: { slot: "button", flavour: "primary" },
                on: {
                  click: function($event) {
                    return _vm.archiveNote();
                  }
                },
                slot: "button"
              },
              [_vm._v(_vm._s(_vm.note.isArchived ? "Unarchive" : "Archive"))]
            )
          ],
          2
        )
      ],
      1
    );
  };
  var __vue_staticRenderFns__17 = [];
  __vue_render__17._withStripped = true;
  var __vue_inject_styles__17 = function(inject) {
    if (!inject)
      return;
    inject("data-v-679c7e82_0", { source: "\n.note__body {\n  margin: 0;\n  white-space: pre-wrap;\n  user-select: text;\n  -ms-user-select: text;\n  -moz-user-select: text;\n  -webkit-user-select: text;\n}\n", map: { "version": 3, "sources": ["src/components/NoteView.vue"], "names": [], "mappings": ";AA0HA;EACA,SAAA;EACA,qBAAA;EACA,iBAAA;EACA,qBAAA;EACA,sBAAA;EACA,yBAAA;AACA", "file": "NoteView.vue", "sourcesContent": [`<template>
  <ContentCard :title="note.title" :fullscreen="true">
    <p v-if="note.type === 'text'" class="note__body">{{ note.body }}</p>

    <EditorList
      v-if="note.type === 'list'"
      :value="note.body"
      @input="saveNote"
    />

    <ButtonGroup slot="button" style="float: left">
      <UiButton @click="showConfirmDelete = true">
        <UiIcon type="delete" style="font-size: 1.4rem" />
      </UiButton>
      <UiButton @click="showConfirmArchive = true">
        <UiIcon
          :type="note.isArchived ? 'unarchive' : 'archive'"
          style="font-size: 1.4rem"
        />
      </UiButton>
      <UiButton v-if="shareSupported" @click="share">
        <UiIcon type="share" style="font-size: 1.4rem" />
      </UiButton>
    </ButtonGroup>

    <ActionButton slot="button" :to="{ name: 'edit', id: note.id }" icon="edit"
      >Edit</ActionButton
    >

    <ModalDialog v-model="showConfirmDelete" dismiss-label="Cancel">
      <template slot="title">Confirm Delete</template>
      Are you sure you want to delete this note?
      <UiButton slot="button" flavour="primary" @click="deleteNote()"
        >Delete</UiButton
      >
    </ModalDialog>

    <ModalDialog v-model="showConfirmArchive" dismiss-label="Cancel">
      <template slot="title"
        >Confirm {{ note.isArchived ? "Unarchive" : "Archive" }}</template
      >
      Are you sure you want to
      {{ note.isArchived ? "unarchive" : "archive" }} this note?
      <UiButton slot="button" flavour="primary" @click="archiveNote()">{{
        note.isArchived ? "Unarchive" : "Archive"
      }}</UiButton>
    </ModalDialog>
  </ContentCard>
</template>

<script>
import ActionButton from "./ActionButton.vue";
import ButtonGroup from "./ButtonGroup.vue";
import ContentCard from "./ContentCard.vue";
import UiIcon from "./UiIcon.vue";
import EditorList from "./EditorList.vue";
import ModalDialog from "./ModalDialog.vue";
import UiButton from "./UiButton.vue";
import {
  EDIT_NOTE,
  ARCHIVE_NOTE,
  UNARCHIVE_NOTE,
  DELETE_NOTE,
} from "../../store/mutation-types.js";
import toast from "../toast.js";

export default {
  components: {
    ActionButton,
    ButtonGroup,
    ContentCard,
    UiIcon,
    EditorList,
    ModalDialog,
    UiButton,
  },
  data: () => ({
    showConfirmArchive: false,
    showConfirmDelete: false,
  }),
  computed: {
    note() {
      return this.$store.state.notes.find(
        (a) => a.id === parseInt(this.$route.params.id, 10)
      );
    },
    shareSupported() {
      return "share" in navigator;
    },
  },
  methods: {
    archiveNote() {
      this.$store
        .dispatch(
          this.note.isArchived ? UNARCHIVE_NOTE : ARCHIVE_NOTE,
          this.note.id
        )
        .then(() => {
          this.$router.push({ name: "home" });
          toast("Note archived");
        });
    },
    share() {
      navigator.share({
        title: this.note.title,
        text: this.note.body,
      });
    },
    saveNote(body) {
      this.$store.dispatch(EDIT_NOTE, { id: this.note.id, body: body });
    },
    deleteNote() {
      this.$store.dispatch(DELETE_NOTE, this.note.id).then(() => {
        this.$router.push({ name: "home" });
        toast("Note deleted");
      });
    },
  },
};
<\/script>

<style lang="css">
.note__body {
  margin: 0;
  white-space: pre-wrap;
  user-select: text;
  -ms-user-select: text;
  -moz-user-select: text;
  -webkit-user-select: text;
}
</style>
`] }, media: void 0 });
  };
  var __vue_scope_id__17 = void 0;
  var __vue_module_identifier__17 = void 0;
  var __vue_is_functional_template__17 = false;
  function __vue_normalize__17(template, style2, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "src/components/NoteView.vue";
    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional)
        component.functional = true;
    }
    component._scopeId = scope;
    if (true) {
      let hook;
      if (false) {
        hook = function(context) {
          context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
          if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
            context = __VUE_SSR_CONTEXT__;
          }
          if (style2) {
            style2.call(this, createInjectorSSR(context));
          }
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        component._ssrRegister = hook;
      } else if (style2) {
        hook = shadowMode ? function(context) {
          style2.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function(context) {
          style2.call(this, createInjector(context));
        };
      }
      if (hook !== void 0) {
        if (component.functional) {
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }
    return component;
  }
  function __vue_create_injector__16() {
    const styles = __vue_create_injector__16.styles || (__vue_create_injector__16.styles = {});
    const isOldIE = typeof navigator !== "undefined" && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]'))
        return;
      const group = isOldIE ? css.media || "default" : id;
      const style2 = styles[group] || (styles[group] = { ids: [], parts: [], element: void 0 });
      if (!style2.ids.includes(id)) {
        let code = css.source;
        let index2 = style2.ids.length;
        style2.ids.push(id);
        if (false) {
          code += "\n/*# sourceURL=" + css.map.sources[0] + " */";
          code += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + " */";
        }
        if (isOldIE) {
          style2.element = style2.element || document.querySelector("style[data-group=" + group + "]");
        }
        if (!style2.element) {
          const head = document.head || document.getElementsByTagName("head")[0];
          const el = style2.element = document.createElement("style");
          el.type = "text/css";
          if (css.media)
            el.setAttribute("media", css.media);
          if (isOldIE) {
            el.setAttribute("data-group", group);
            el.setAttribute("data-next-index", "0");
          }
          head.appendChild(el);
        }
        if (isOldIE) {
          index2 = parseInt(style2.element.getAttribute("data-next-index"));
          style2.element.setAttribute("data-next-index", index2 + 1);
        }
        if (style2.element.styleSheet) {
          style2.parts.push(code);
          style2.element.styleSheet.cssText = style2.parts.filter(Boolean).join("\n");
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style2.element.childNodes;
          if (nodes[index2])
            style2.element.removeChild(nodes[index2]);
          if (nodes.length)
            style2.element.insertBefore(textNode, nodes[index2]);
          else
            style2.element.appendChild(textNode);
        }
      }
    };
  }
  var __vue_component__17 = /* @__PURE__ */ __vue_normalize__17(
    { render: __vue_render__17, staticRenderFns: __vue_staticRenderFns__17 },
    __vue_inject_styles__17,
    __vue_script__17,
    __vue_scope_id__17,
    __vue_is_functional_template__17,
    __vue_module_identifier__17,
    false,
    __vue_create_injector__16,
    void 0,
    void 0
  );
  var NoteView_default = __vue_component__17;

  // src/main.js
  var router = new VueRouter$1({
    routes: [
      { path: "/", name: "home", component: ListView_default, props: { archive: false } },
      {
        path: "/archive",
        name: "archive",
        component: ListView_default,
        props: { archive: true }
      },
      { path: "/compose", name: "compose", component: EditView_default },
      { path: "/:id", name: "note", component: NoteView_default },
      { path: "/:id/edit", name: "edit", component: EditView_default }
    ]
  });
  Vue.use(VueRouter$1);
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").then((reg) => {
      reg.addEventListener("updatefound", function() {
        toast(
          "A new version of this application is available. Refresh to update."
        );
      });
    });
  }
  var _paq = [];
  _paq.push(["trackPageView"]);
  _paq.push(["enableLinkTracking"]);
  (function() {
    var u = "https://analytics.gregtyler.co.uk/";
    _paq.push(["setTrackerUrl", u + "piwik.php"]);
    _paq.push(["setSiteId", "6"]);
    const script = document.createElement("script");
    const firstScript = document.getElementsByTagName("script")[0];
    script.type = "text/javascript";
    script.async = true;
    script.defer = true;
    script.src = u + "piwik.js";
    firstScript.parentNode.insertBefore(script, firstScript);
  })();
  new Vue({
    router,
    store: store_default,
    el: "#app",
    render: (createElement2) => createElement2(App_default)
  });
})();
/*!
  * vue-router v3.6.5
  * (c) 2022 Evan You
  * @license MIT
  */
/*!
 * Vue.js v2.7.14
 * (c) 2014-2022 Evan You
 * Released under the MIT License.
 */
/*!
 * vuex v3.6.2
 * (c) 2021 Evan You
 * @license MIT
 */
