function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } var descriptor = privateMap.get(receiver); if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/** @license trocha@0.2.2 - 2019-04-16
* Trocha.js 
* 
* This source code is licensed under the Mozillas Public license 2.0 found in the 
* LICENSE file in the root directory of this source tree. 
*/

/**
 * This file is intended for non module enviorements
 * Works like JQuery or legacy angular
 * Note the parent can be within a clousure or be self(window or worker)
 */
;

(function (parent) {
  /* Begin: src/v2/_core.js */
  // Utility methods

  /* Begin: src/v2/_utils.js */
  var _throwError = function _throwError(scope, error_text, value) {
    var TrochaError =
    /*#__PURE__*/
    function (_Error) {
      _inherits(TrochaError, _Error);

      function TrochaError(scope, error_text, value) {
        var _this;

        _classCallCheck(this, TrochaError);

        // Pass remaining arguments (including vendor specific ones) to parent constructor
        _this = _possibleConstructorReturn(this, _getPrototypeOf(TrochaError).call(this, ERROR_HEADER + error_text)); // Custom debugging information

        _this.scope = scope;
        _this.value = value;
        return _this;
      }

      return TrochaError;
    }(_wrapNativeSuper(Error));

    throw new TrochaError(scope, error_text, value);
  };

  var _throwWarning = function _throwWarning(scope, warning_text, value) {
    console.warn(WARNING_HEADER + warning_text, value || s, scope || s);
  };
  /* End: src/v2/_utils.js */
  // Const used abroad the library

  /* Begin: src/v2/_variables.js */

  /*
   * Why variables are outside the Trocha class?
   * Because protected attributes are still not supported
   * and because Route share a lot of symbols with Trocha
   */
  /// Utility vars


  var s = ''; // Force string

  var DS = '$'; // DEFAULT_SELECTOR
  /// Input attributes

  var ID = 'id';
  var URL = 'url';
  var NAME = 'name';
  var HIDE = 'hide';
  var TYPE = 'type';
  var PREFIX = 'pre';
  var ALIAS = 'alias';
  var QUERY = 'query';
  var POSTFIX = 'post';
  var EXTENDED = 'ext';
  var METHOD = 'method';
  var DOMAIN = 'domain';
  var ROUTES = 'routes';
  var ID_MODE = 'idMode';
  var JUST_ID = 'justId'; // const AFTER_ID = 'afterId' // FAILS & no DOCS

  var FRAGMENT = 'fragment';
  var RESOURCE = 'resource';
  var PARENT_ID = 'parentId';
  var SEPARATOR = 'separator';
  var DEFAULT_ID = 'defaultId';
  var ALWAYS_URL = 'alwaysUrl';
  var ALWAYS_POST = 'alwaysPost';
  var FIRST_SEPARATOR = 'firstSeparator';
  var CUSTOM_SELECTOR = 'customSelector'; /// Request method types
  // @see _Trocha.js /// Offers all the request types

  var GET = 'GET';
  var POST = 'POST';
  var PUT = 'PUT';
  var PATCH = 'PATCH';
  var DELETE = 'DELETE';
  var OPTIONS = 'OPTIONS';
  var HEAD = 'HEAD';
  var TRACE = 'TRACE';
  var CONNECT = 'CONNECT'; /// Route types
  // @see _Trocha.js

  var ROUTE = 'ROUTE';
  var SCOPE = 'SCOPE';
  var _RESOURCE = 'RESOURCE';
  var _ALIAS = 'ALIAS'; /// custom separator
  // @see _Trocha.js

  var SLASH = 'SLASH';
  var BACK_SLASH = 'BACK_SLASH';
  var DOT = 'DOT'; // Next const are private helpers for ID modes

  var _PREID = '_PREID';
  var _AVAILABLE_SEPARATORS = {};
  _AVAILABLE_SEPARATORS[SLASH] = {};
  _AVAILABLE_SEPARATORS[SLASH][SEPARATOR] = '/';
  _AVAILABLE_SEPARATORS[SLASH][FIRST_SEPARATOR] = true;
  _AVAILABLE_SEPARATORS[BACK_SLASH] = {};
  _AVAILABLE_SEPARATORS[BACK_SLASH][SEPARATOR] = '\\';
  _AVAILABLE_SEPARATORS[BACK_SLASH][FIRST_SEPARATOR] = false;
  _AVAILABLE_SEPARATORS[DOT] = {};
  _AVAILABLE_SEPARATORS[DOT][SEPARATOR] = '.';
  _AVAILABLE_SEPARATORS[DOT][FIRST_SEPARATOR] = false;
  _AVAILABLE_SEPARATORS[undefined] = {}; /// ID modes
  // @see _Trocha.js

  var COLON = 'COLON';
  var BRACKETS = 'BRACKETS'; // Next const are private helpers for ID modes

  var _ID_MODE_REPLACE = 'Ñ'; // Can be any rare character

  var _AVAILABLE_ID_MODES = {}; // In teory only used in _FORMAT_ID_FUN

  _AVAILABLE_ID_MODES[BRACKETS] = "{".concat(_ID_MODE_REPLACE, "}");
  _AVAILABLE_ID_MODES[COLON] = ":".concat(_ID_MODE_REPLACE);
  /**
   * Interpolator of id mode to be used in path function
   * @todo should be Route protected(private & inheritable) method
   * @param {string} currentIdMode - can be BRACKETS | COLON
   * @second_order
   * @pure
   * @private
   * @return {function} see function below
   */

  var _FORMAT_ID_FUN = function _FORMAT_ID_FUN(currentIdMode) {
    return (
      /**
       * Interpolate template with _AVAILABLE_ID_MODES[currentIdMode] and idName
       * @param {string} idName
       * @param {template_literal | string} template - should contain _ID_MODE_REPLACE value; default _ID_MODE_REPLACE
       * @lambda
       * @pure false - depends on currentIdMode, _AVAILABLE_ID_MODES and _ID_MODE_REPLACE
       * @example λ('zxc',`asd${_ID_MODE_REPLACE}qwe`) will return 'asd:zxcqwe' or 'asd{zxc}qwe'
       * @return {string}
       */
      function (idName) {
        var template = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _ID_MODE_REPLACE;
        return template.replace(_ID_MODE_REPLACE, _AVAILABLE_ID_MODES[currentIdMode].replace(_ID_MODE_REPLACE, idName));
      }
    );
  }; /// Route return attributes


  var AS = 'as';
  var PATH = 'path'; /// Not used right now
  // const NEW_SCOPE = '_newScope'
  // const NEW_ROUTE = '_newRoute'
  // const NEW_RESOURCE = '_newResource'
  // const NEW_ALIAS = '_newAlias'
  /// BASIC RESOURCE

  var _show = 'show';
  var _edit = 'edit';
  var _new = 'new';
  var _list = 'list';

  var _basicResource = function _basicResource() {
    var SS = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DS;
    // selectedSelector
    var r = {};
    r[SS + ID] = ID;
    r[_show] = {};
    r[_edit] = {};
    r[_new] = {};
    r[_list] = {};
    r[_show][SS + HIDE] = true;
    r[_new][SS + ID] = false;
    r[_list][SS + ID] = false;
    r[_list][SS + HIDE] = true;
    return r;
  }; /// Warnings and erros


  var ERROR_HEADER = 'TrochaJS error: ';
  var WARNING_HEADER = 'TrochaJS warning: ';
  var ERROR_ROUTE_ALREADY_DEFINE = 'Route already declare';
  var ERROR_SCOPE_AS_A_ROUTE = 'Scope is not printable a route';
  var WARNING_RESOURCE_AS_A_ROUTE = 'Resource should not be used as a route';
  var WARNING_ROUTE_ATTRIBUTE_NOT_SUPPORTED = 'Attribute not supported, skiped';
  /* End: src/v2/_variables.js */
  // Trocha class

  /* Begin: src/v2/_Trocha.js */
  // Route classes

  /* Begin: src/v2/_Route.js */

  /**
   * The Class where all other route types inherit
   * @module Route
   * @exports Route
   * @class
   */

  var Route =
  /*#__PURE__*/
  function () {
    /**
     * Holds all the route information, note it's not protected(can't be inhered)
     * @private
     */

    /**
     * Adds a (custom)getter of attribute to mySelf
     * @param {Route} mySelf - tldr this
     * @param {string} attribute - name of the attribute to expose
     * @param {function} fun - to use as a custom getter for attribute
     * @param {boolean} skipSelector - if false will add selectedSelector to getter name
     * @sideEffect mySelf
     * @private
     */

    /**
     * Constructor helper, set attributes and getters of current route
     * @param {Route} mySelf - tldr this
     * @param {string} attribute - name
     * @sideEffect mySelf - add getters, modify #data; posibleRouteDef - delete all attributes
     * @private
     */

    /**
     * Constructor helper, create one child route
     * @param {Route} mySelf - tldr this
     * @param {object} routeDefinition - child route attributes
     * @param {string} name - route name
     * @sideEffect mySelf - add getters, modify #data; routeDefinition add $name
     * @private
     * @throws ERROR_ROUTE_ALREADY_DEFINE
     */

    /**
     * Constructor helper, create child routes
     * @param {Route} mySelf - tldr this
     * @param {object} argChildRoutes - child routeDefinitions
     * @param {boolean} skipResource - prevent infinity loop on resource creation
     * @sideEffect mySelf - add getters, modify #data
     * @private
     * @recursive
     */

    /**
     * getter function of $as
     * @param {Route} mySelf - tldr this
     * @recursive via parent.$as
     * @return {string} flat self and parents name separated by _
     */

    /**
     * This constructor should be used just for test'n debug purposes
     * pure false depends on #data initial attributes
     * @param {Route} myParent
     * @param {routeParamsDefinition} argRouteDef
     * @param {string} argCustomSelector
     * @param {Route} argRoot
     * @param {object} [argChildRoutes={}]
     * @param {string} [argDomain]
     * @param {boolean} [argAlwaysUrl]
     * @param {string} [argPre]
     * @param {string} [argPost]
     * @param {boolean} [argAlwaysPost]
     * @param {Trocha.COLON | Trocha.BRACKETS} [argIdMod=Trocha.COLON]
     * @param {Trocha.SLASH | Trocha.BACK_SLASH | Trocha.DOT} [argSeparator=Trocha.SLASH]
     * @param {boolean} [argfirstSeparator=true]
     */
    function Route(myParent, argRouteDef, argCustomSelector, argRoot) {
      var _this2 = this;

      var _argChildRoutes = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

      var argDomain = arguments.length > 5 ? arguments[5] : undefined;
      var argAlwaysUrl = arguments.length > 6 ? arguments[6] : undefined;
      var argPre = arguments.length > 7 ? arguments[7] : undefined;
      var argPost = arguments.length > 8 ? arguments[8] : undefined;
      var argAlwaysPost = arguments.length > 9 ? arguments[9] : undefined;
      var //argAlwaysPre,// @TODO
      argIdMode = arguments.length > 10 ? arguments[10] : undefined;
      var argSeparator = arguments.length > 11 ? arguments[11] : undefined;
      var argfirstSeparator = arguments.length > 12 ? arguments[12] : undefined;

      _classCallCheck(this, Route);

      _data.set(this, {
        writable: true,
        value: {
          parent: null,
          childs: {},
          SS: DS,
          // selectedSelector
          // next attributes just for root
          alwaysPost: false,
          alwaysUrl: false,
          idMode: COLON,
          domain: '',
          post: '',
          pre: '',
          separator: _AVAILABLE_SEPARATORS[SLASH][SEPARATOR],
          firstSeparator: _AVAILABLE_SEPARATORS[SLASH][FIRST_SEPARATOR]
          /**
           * @param {Route} mySelf - tldr this
           * @param {string} id - id to compare to parents ids
           * @pure
           * @private
           * @recursive
           * @return {boolean} - does the parent or (parent parent and go on) have the id?
           */

        }
      });

      _anyParentHasThisId.set(this, {
        writable: true,
        value: function value(mySelf, id) {
          var SS = _classPrivateFieldGet(mySelf, _data).SS;

          if (!_classPrivateFieldGet(mySelf, _data).parent) return false;
          return _classPrivateFieldGet(mySelf, _data).parent[SS + ID] === id || _classPrivateFieldGet(mySelf, _anyParentHasThisId).call(mySelf, _classPrivateFieldGet(mySelf, _data).parent, id);
        }
      });

      _newGetter.set(this, {
        writable: true,
        value: function value(mySelf, attribute, fun, skipSelector) {
          var SS = skipSelector ? '' : _classPrivateFieldGet(mySelf, _data).SS;
          Object.defineProperty(mySelf, SS + attribute, {
            get: function get() {
              if (fun) return fun();else return _classPrivateFieldGet(mySelf, _data)[attribute];
            },
            enumerable: true,
            configurable: false
          });
        }
      });

      _defineMyAttributes.set(this, {
        writable: true,
        value: function value(mySelf, posibleRouteDef) {
          var SS = _classPrivateFieldGet(mySelf, _data).SS;
          /**
           * @param {string} attribute - name of the attribute to add to #data then remove of mySelf
           * @pure false - depends on mySelf
           * @sideEffect mySelf
           */


          var _setAndDisposeAttribute = function _setAndDisposeAttribute(attribute) {
            _classPrivateFieldGet(mySelf, _data)[attribute] = posibleRouteDef[SS + attribute];
            delete posibleRouteDef[SS + attribute];
          };

          _setAndDisposeAttribute(NAME);

          _setAndDisposeAttribute(ID);

          _setAndDisposeAttribute(DEFAULT_ID);

          _setAndDisposeAttribute(TYPE);

          _setAndDisposeAttribute(METHOD);

          _setAndDisposeAttribute(ALIAS);

          _setAndDisposeAttribute(RESOURCE);

          _setAndDisposeAttribute(HIDE);

          _setAndDisposeAttribute(POSTFIX);

          _setAndDisposeAttribute(JUST_ID);

          _setAndDisposeAttribute(PARENT_ID);

          if (false === posibleRouteDef[_classPrivateFieldGet(mySelf, _data).parent[SS + ID]]) _setAndDisposeAttribute(_classPrivateFieldGet(mySelf, _data).parent[SS + ID]);

          _classPrivateFieldGet(mySelf, _newGetter).call(mySelf, mySelf, NAME);

          _classPrivateFieldGet(mySelf, _newGetter).call(mySelf, mySelf, ID); // @TODO DOCUMENT ME


          _classPrivateFieldGet(mySelf, _newGetter).call(mySelf, mySelf, METHOD);

          _classPrivateFieldGet(mySelf, _newGetter).call(mySelf, mySelf, AS, function () {
            return _classPrivateFieldGet(mySelf, _as).call(mySelf, mySelf);
          });
        }
      });

      _createChildRoute.set(this, {
        writable: true,
        value: function value(mySelf, routeDefinition, name) {
          var SS = _classPrivateFieldGet(mySelf, _data).SS;

          if (_classPrivateFieldGet(mySelf, _data).childs[name]) _throwError(mySelf, ERROR_ROUTE_ALREADY_DEFINE, name);
          var routeSubclasses = [Route, Alias, Resource, Scope];
          routeSubclasses.forEach(function (routeSubclass) {
            if (routeSubclass.is(routeDefinition, SS)) routeDefinition = routeSubclass.diggest(routeDefinition, SS, SS);
          });
          routeDefinition[SS + NAME] = name;
          var routeTypes = {};
          routeTypes[ROUTE] = Route;
          routeTypes[undefined] = Route;
          routeTypes[_ALIAS] = Alias;
          routeTypes[SCOPE] = Scope;
          routeTypes[_RESOURCE] = Resource;
          var newRoute = new routeTypes[routeDefinition[SS + TYPE]](mySelf, routeDefinition, SS, _classPrivateFieldGet(mySelf, _data).root);
          _classPrivateFieldGet(mySelf, _data).childs[name] = newRoute;

          _classPrivateFieldGet(mySelf, _newGetter).call(mySelf, mySelf, name, function () {
            return _classPrivateFieldGet(mySelf, _data).childs[name];
          }, true);
        }
      });

      _diggestChildRoutes.set(this, {
        writable: true,
        value: function value(mySelf, argChildRoutes, skipResource) {
          var SS = _classPrivateFieldGet(mySelf, _data).SS;

          if (!skipResource && _classPrivateFieldGet(mySelf, _data)[TYPE] === _RESOURCE) {
            var resourceChilds = _classPrivateFieldGet(mySelf, _data)[RESOURCE];

            delete resourceChilds[SS + ID];

            _classPrivateFieldGet(mySelf, _diggestChildRoutes).call(mySelf, mySelf, resourceChilds, true);
          }

          var posibleChildRoutesNames = Object.keys(argChildRoutes);

          while (posibleChildRoutesNames.length) {
            var posibleChild = posibleChildRoutesNames.pop();
            if ( // This case disable any <id>=false
            argChildRoutes[posibleChild] === false && _classPrivateFieldGet(mySelf, _anyParentHasThisId).call(mySelf, mySelf, posibleChild)) _classPrivateFieldGet(mySelf, _data)[posibleChild] = false;else {
              _classPrivateFieldGet(mySelf, _createChildRoute).call(mySelf, mySelf, argChildRoutes[posibleChild], posibleChild);

              if (_classPrivateFieldGet(mySelf, _data)[TYPE] === SCOPE) {
                var scopedChild = _objectSpread({}, argChildRoutes[posibleChild]);

                scopedChild[SS + PARENT_ID] = false;

                _classPrivateFieldGet(mySelf, _createChildRoute).call(mySelf, _classPrivateFieldGet(mySelf, _data).parent, scopedChild, posibleChild);
              }
            }
          }
        }
      });

      _as.set(this, {
        writable: true,
        value: function value(mySelf) {
          var SS = _classPrivateFieldGet(mySelf, _data).SS;

          return _classPrivateFieldGet(mySelf, _data).parent[SS + AS] ? "".concat(_classPrivateFieldGet(mySelf, _data).parent[SS + AS], "_").concat(_classPrivateFieldGet(mySelf, _data)[NAME]) : _classPrivateFieldGet(mySelf, _data)[NAME];
        }
      });

      _defineProperty(this, "_newRoute", function (args) {
        args[TYPE] = ROUTE;
        if (!Route.is(args, '')) return false;

        _classPrivateFieldGet(_this2, _createChildRoute).call(_this2, _this2, Route.diggest(args, _classPrivateFieldGet(_this2, _data).SS, ''), args[NAME]);
      });

      _defineProperty(this, "_newScope", function (args) {
        args[TYPE] = SCOPE;
        if (!Scope.is(args, '')) return false;

        _classPrivateFieldGet(_this2, _createChildRoute).call(_this2, _this2, Scope.diggest(args, _classPrivateFieldGet(_this2, _data).SS, ''), args[NAME]);
      });

      _defineProperty(this, "_newAlias", function (args) {
        args[TYPE] = _ALIAS;
        if (!Alias.is(args, '')) return false;

        _classPrivateFieldGet(_this2, _createChildRoute).call(_this2, _this2, Alias.diggest(args, _classPrivateFieldGet(_this2, _data).SS, ''), args[NAME]);
      });

      _defineProperty(this, "_newResource", function (args) {
        args[TYPE] = _RESOURCE;
        if (!Resource.is(args, '')) return false;

        _classPrivateFieldGet(_this2, _createChildRoute).call(_this2, _this2, Resource.diggest(args, _classPrivateFieldGet(_this2, _data).SS, ''), args[NAME]);
      });

      _defineProperty(this, "toString", function () {
        return _classPrivateFieldGet(_this2, _as).call(_this2, _this2);
      });

      var _SS = _classPrivateFieldGet(this, _data).SS = argCustomSelector || DS; // selectedSelector


      if (myParent || argRouteDef && argRouteDef[_SS + NAME] && argRouteDef[_SS + TYPE]) {
        // It's a normal route
        _classPrivateFieldGet(this, _data).parent = myParent;
        _classPrivateFieldGet(this, _data).root = argRoot;

        _classPrivateFieldGet(this, _defineMyAttributes).call(this, this, argRouteDef);

        _classPrivateFieldGet(this, _diggestChildRoutes).call(this, this, argRouteDef);
      } else {
        // It's the root route
        var _setRootAttribute = function _setRootAttribute(attribute, value) {
          return _classPrivateFieldGet(_this2, _data)[attribute] = value !== undefined ? value : _classPrivateFieldGet(_this2, _data)[attribute];
        };

        _setRootAttribute(DOMAIN, argDomain);

        _classPrivateFieldGet(this, _newGetter).call(this, this, DOMAIN);

        _setRootAttribute(ALWAYS_URL, argAlwaysUrl);

        _setRootAttribute(ALWAYS_POST, argAlwaysPost);

        _setRootAttribute(POSTFIX, argPost);

        _setRootAttribute(PREFIX, argPre);

        _setRootAttribute(ID_MODE, argIdMode);

        _setRootAttribute(SEPARATOR, _AVAILABLE_SEPARATORS[argSeparator][SEPARATOR]);

        _setRootAttribute(FIRST_SEPARATOR, argfirstSeparator !== undefined ? argfirstSeparator : _AVAILABLE_SEPARATORS[argSeparator][FIRST_SEPARATOR]);

        _setRootAttribute(_PREID, _classPrivateFieldGet(this, _data)[SEPARATOR] + _ID_MODE_REPLACE);

        _classPrivateFieldGet(this, _data).root = _classPrivateFieldGet(this, _data);
        delete this[PATH];

        _classPrivateFieldGet(this, _newGetter).call(this, this, _RESOURCE, function () {
          return _basicResource(_SS);
        });

        _classPrivateFieldGet(this, _diggestChildRoutes).call(this, this, _argChildRoutes);
      }
    }

    _createClass(Route, [{
      key: "path",
      // prettier-ignore // < Does not work ¬¬

      /* Begin: src/v2/_Route_path.js */
      value: function path() {
        var routeParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var customNameFun = arguments.length > 1 ? arguments[1] : undefined;

        var myData = _classPrivateFieldGet(this, _data),
            parent = myData.parent || {},
            rootData = myData.root,
            SS = myData.SS,
            _formatID = _FORMAT_ID_FUN(rootData[ID_MODE]);

        var r = s;
        if (myData[NAME] === undefined) return ''; // 1 print the domain

        r = rootData[DOMAIN] && // !parent[PATH] &&
        routeParams[URL] !== false && (routeParams[URL] || rootData[ALWAYS_URL]) ? rootData[DOMAIN] : s;
        delete routeParams[URL]; // 2 add the prefix

        r += rootData[PREFIX] && (routeParams[PREFIX] || routeParams[EXTENDED]) ? rootData[PREFIX] : s;
        delete routeParams[PREFIX]; // 3 print parent paths

        var parentPathArg = {};
        var parentPathResponse = parent[PATH](parentPathArg, function () {
          return true;
        });
        var thisIsChildPath = !!parentPathResponse; // 3.1 enable firstSeparator

        var _ = thisIsChildPath || rootData[FIRST_SEPARATOR] ? rootData[SEPARATOR] : s;

        parentPathArg[POSTFIX] = false;
        r += parentPathResponse; // 4.A print name & id(name) from customNameFun like Alias

        var hide = routeParams[HIDE] !== undefined ? routeParams[HIDE] : myData[HIDE] || myData[JUST_ID] && myData[DEFAULT_ID] === false;
        var customNameFromInhered;
        if ('function' === typeof customNameFun) customNameFromInhered = customNameFun(myData, _);
        if ('string' === typeof customNameFromInhered) r += customNameFromInhered;else {
          // 4.B print default name & id(name)
          var myId = _formatID(myData[ID]);

          if ( // 4.B.1 justId case
          routeParams[JUST_ID] !== false && myData[JUST_ID] && myData[ID] && myData[myData[ID]] !== false) {
            r += _ + myId;
          } else {
            // 4.B.2 hide case
            var noIdentifier = myData[ID] ? routeParams[ID] === false : true;
            r += hide ? s : _ + myData[NAME];
            r += noIdentifier ? s : rootData[SEPARATOR] + myId;
          }
        } // 5 add the postfix

        /**
         * @TODO Document hide also remove postfix
         */

        r += rootData[POSTFIX] && !hide && routeParams[POSTFIX] !== false && (rootData[ALWAYS_POST] || myData[POSTFIX] || routeParams[POSTFIX] || routeParams[EXTENDED]) ? rootData[POSTFIX] : s;
        delete routeParams[POSTFIX]; // Note next 2 step first clear the routeParams then later on print the colected data
        // 7-1 get query part(also know as search... the ?asd=1 part)

        var query = {};

        if (routeParams[QUERY]) {
          query = JSON.parse(JSON.stringify(routeParams[QUERY]));
          delete routeParams[QUERY];
        } // 8-1 get fragment part(also know as anchor... the #asd part)


        var fragment = s;

        if (routeParams[FRAGMENT]) {
          fragment = routeParams[FRAGMENT];
          delete routeParams[FRAGMENT];
        } // 6 Replace Or Remove(RoR) Ids
        // 6.1 RoR parentId


        if (parent[SS + ID] && !routeParams[parent[SS + ID]] && (myData[ID] === false || routeParams[PARENT_ID] === false || myData[PARENT_ID] === false)) r = r.replace(_formatID(parent[SS + ID], rootData[_PREID]), s); // 6.2 Remove parents Ids designed in constructor

        Object.keys(myData).forEach(function (idName) {
          if (myData[idName] === false && !routeParams[idName]) return r = r.replace(_formatID(idName, rootData[_PREID]), s);
        }); // 6.2 RoR selected Ids in path params

        Object.keys(routeParams).forEach(function (idName) {
          if (routeParams[idName] === false) // Remove
            r = r.replace(_formatID(idName, rootData[_PREID]), s); // Replace
          else r = r.replace(_formatID(idName), routeParams[idName]);
        }); // 7 Now add the query

        Object.keys(query).forEach(function (key, i, array) {
          if (i === 0) r += '?';
          if (Array.isArray(query[key])) query[key].forEach(function (value, _i) {
            return r += encodeURIComponent(key) + '[]=' + encodeURIComponent(value) + (query[key].length - 1 !== _i || array.length - 1 !== i ? '&' : '');
          });else r += encodeURIComponent(key) + '=' + encodeURIComponent(query[key]) + (array.length - 1 !== i ? '&' : '');
        }); // 8 Now add the fragment

        if (fragment) r += '#' + encodeURIComponent(fragment);
        return r;
      }
      /* End: src/v2/_Route_path.js */

    }], [{
      key: "is",

      /**
       * Check if given routeDefinition is Route
       * @param {object} routeDefinition -
       * @param {string} SS - selectedSelector normally $
       * @static
       * @pure
       * @return {boolean} routeDefinition is route?
       */
      value: function is(routeDefinition, SS) {
        return routeDefinition[SS + TYPE] === ROUTE || 'object' === _typeof(routeDefinition) && routeDefinition[SS + TYPE] === undefined;
      }
      /**
       * This function serve 2 purposes:
       * (With just first 3 params) Sanitize routeDefinition for ROUTE valid params (this behabior is override)
       * (With full params) add <routeDefinition>.<IS><attributes> to <dest>.<SS><attributes> (this behabior is not inhered)
       * @tobe_overload
       * @param {object} routeDefinition -
       * @param {string} SS - selector to be return
       * @param {string} IS - selector to be find
       * @param {object} dest - another routeDefinition
       * @param {array<string>} attributes - to be added from routeDefinition to dest
       * @sideEffect dest
       */

    }]);

    return Route;
  }();
  /* End: src/v2/_Route.js */

  /* Begin: src/v2/_Alias.js */


  var _data = new WeakMap();

  var _anyParentHasThisId = new WeakMap();

  var _newGetter = new WeakMap();

  var _defineMyAttributes = new WeakMap();

  var _createChildRoute = new WeakMap();

  var _diggestChildRoutes = new WeakMap();

  var _as = new WeakMap();

  _defineProperty(Route, "DEFAULT_METHOD", GET);

  _defineProperty(Route, "diggest", function (routeDefinition, SS, IS, dest, attributes) {
    if (dest && attributes) // is used from subroutes
      attributes.forEach(function (attribute) {
        dest[SS + attribute] = routeDefinition[IS + attribute];
      });else {
      var r = {};
      r[SS + TYPE] = ROUTE;
      r[SS + METHOD] = routeDefinition[IS + METHOD] || Route.DEFAULT_METHOD;
      Route.diggest(routeDefinition, SS, IS, r, [ID, HIDE, JUST_ID, POSTFIX, PARENT_ID]);

      Route._trimSelector(IS, routeDefinition, r);

      return r;
    }
  });

  _defineProperty(Route, "_trimSelector", function (IS, src, dest) {
    if (IS === '') return;
    Object.keys(src).forEach(function (attribute) {
      if (attribute.slice(0, 2) !== IS) dest[attribute] = src[attribute];else _throwWarning(Route, WARNING_ROUTE_ATTRIBUTE_NOT_SUPPORTED, attribute);
    });
  });

  var Alias =
  /*#__PURE__*/
  function (_Route) {
    _inherits(Alias, _Route);

    function Alias() {
      var _getPrototypeOf2;

      _classCallCheck(this, Alias);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Alias)).call.apply(_getPrototypeOf2, [this].concat(args)));
    }
    /**
     * Sanitize routeDefinition for ALIAS valid params
     * @static
     * @overload Route.diggest
     * @param {object} routeDefinition
     * @param {string} SS - selector to be return
     * @param {string} IS - selector to be find
     * @return {object} sanitized copy of routeDefinition
     */


    _createClass(Alias, [{
      key: "path",

      /**
       * Print ALIAS type routes
       * diferences with Route.path: use alias instead of name and if it's base will not start with /
       * @see Route.path
       * @overload Route.path
       */
      value: function path() {
        var routeParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return _get(_getPrototypeOf(Alias.prototype), "path", this).call(this, routeParams, function (myData, _) {
          // Note Alias dnt support hide nor justId in creation
          var parent = myData.parent || {};
          var rootData = myData.root;

          var _formatID = _FORMAT_ID_FUN(rootData[ID_MODE]);

          var myId = _formatID(myData[ID], rootData[_PREID]);

          var r = s;

          if (myData[ID] && routeParams[JUST_ID]) {
            r += myId;
          } else {
            var useID = !!myData[ID] && routeParams[myData[ID]] !== false;
            r += parent.constructor.name === 'Trocha' ? s : _;
            r += routeParams[HIDE] ? s : myData[ALIAS];
            r += useID ? myId : s;
          }

          return r;
        });
      }
    }], [{
      key: "diggest",
      value: function diggest(routeDefinition, SS, IS) {
        var r = {};
        r[SS + TYPE] = _ALIAS;
        r[SS + ALIAS] = routeDefinition[IS + ALIAS] || routeDefinition;
        r[SS + METHOD] = routeDefinition[IS + METHOD] || Route.DEFAULT_METHOD;
        Route.diggest(routeDefinition, SS, IS, r, [ID, POSTFIX, PARENT_ID]);
        if ('string' !== typeof routeDefinition) Route._trimSelector(IS, routeDefinition, r);
        return r;
      }
      /**
       * Check if given routeDefinition is ALIAS
       * @see Route.is
       * @pure
       * @static
       * @override
       * @return {boolean} routeDefinition is alias?
       */

    }, {
      key: "is",
      value: function is(routeDefinition, SS) {
        return 'string' === typeof routeDefinition || routeDefinition[SS + TYPE] === _ALIAS && routeDefinition[SS + ALIAS];
      }
    }]);

    return Alias;
  }(Route);
  /* End: src/v2/_Alias.js */

  /* Begin: src/v2/_Resource.js */


  var Resource =
  /*#__PURE__*/
  function (_Route2) {
    _inherits(Resource, _Route2);

    function Resource() {
      var _getPrototypeOf3;

      _classCallCheck(this, Resource);

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return _possibleConstructorReturn(this, (_getPrototypeOf3 = _getPrototypeOf(Resource)).call.apply(_getPrototypeOf3, [this].concat(args)));
    }
    /**
     * @override
     */


    _createClass(Resource, [{
      key: "path",

      /**
       * @override
       */
      value: function path() {
        var routeParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var force = arguments.length > 1 ? arguments[1] : undefined;
        return _get(_getPrototypeOf(Resource.prototype), "path", this).call(this, routeParams, function (myData, _) {
          if ('function' === typeof force && force() !== true) _throwWarning(undefined, WARNING_RESOURCE_AS_A_ROUTE);
          return false;
        });
      }
    }], [{
      key: "diggest",
      value: function diggest(routeDefinition, SS, IS) {
        var r = {};
        r[SS + TYPE] = _RESOURCE;
        r[SS + RESOURCE] = routeDefinition[IS + RESOURCE] || _basicResource(SS);
        Route.diggest(routeDefinition, SS, IS, r, [ID]);

        Route._trimSelector(IS, routeDefinition, r);

        return r;
      }
      /**
       * @override
       */

    }, {
      key: "is",
      value: function is(routeDefinition, SS) {
        return routeDefinition[SS + TYPE] === _RESOURCE && routeDefinition[SS + ID] // &&
        // routeDefinition[SS+RESOURCE]
        ;
      }
    }]);

    return Resource;
  }(Route);
  /* End: src/v2/_Resource.js */

  /* Begin: src/v2/_Scope.js */


  var Scope =
  /*#__PURE__*/
  function (_Route3) {
    _inherits(Scope, _Route3);

    function Scope() {
      var _getPrototypeOf4;

      _classCallCheck(this, Scope);

      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return _possibleConstructorReturn(this, (_getPrototypeOf4 = _getPrototypeOf(Scope)).call.apply(_getPrototypeOf4, [this].concat(args)));
    }
    /**
     * @override
     */


    _createClass(Scope, [{
      key: "path",

      /**
       * @override
       */
      value: function path() {
        var routeParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var force = arguments.length > 1 ? arguments[1] : undefined;
        return _get(_getPrototypeOf(Scope.prototype), "path", this).call(this, routeParams, function (myData, _) {
          if ('function' === typeof force && force() !== true) _throwError(undefined, ERROR_SCOPE_AS_A_ROUTE);
          return false;
        });
      }
    }], [{
      key: "diggest",
      value: function diggest(routeDefinition, SS, IS) {
        var r = {};
        r[SS + TYPE] = SCOPE;
        r[SS + JUST_ID] = true;
        r[SS + DEFAULT_ID] = routeDefinition[IS + DEFAULT_ID] || false;
        Route.diggest(routeDefinition, SS, IS, r, [ID, HIDE]);

        Route._trimSelector(IS, routeDefinition, r);

        return r;
      }
      /**
       * @override
       */

    }, {
      key: "is",
      value: function is(routeDefinition, SS) {
        return 'object' === _typeof(routeDefinition) && routeDefinition[SS + TYPE] === SCOPE && routeDefinition[SS + ID] // Should scope always have id????
        ;
      }
    }]);

    return Scope;
  }(Route);
  /* End: src/v2/_Scope.js */

  /**
   * The main Class of the trocha library
   * @see https://dfoxpro.github.io/trochaJS/#101-intro-to-trocha-js
   * @module Trocha
   * @exports default, Trocha
   * @class
   */


  var Trocha =
  /*#__PURE__*/
  function (_Route4) {
    _inherits(Trocha, _Route4);

    /**
     * @constr0uctor
     * @see https://dfoxpro.github.io/trochaJS/#203-route-definition-parameters
     * @param {object} [arg]
     * @param {routeParamsDefinition} [arg.routes]
     * @param {routeParamsDefinition} arg.routes.<children_route>
     * @param {Trocha.ROUTE | Trocha.SCOPE | Trocha.RESOURCE | Trocha.ALIAS} [arg.routes.$type=Trocha.ROUTE]
     * @param {Trocha.COLON | Trocha.BRACKETS} [arg.idMode=Trocha.COLON]
     * @param {Trocha.SLASH | Trocha.BACK_SLASH | Trocha.DOT} [arg.separator=Trocha.SLASH]
     * @param {String} arg.routes.$alias
     * @param {String} arg.routes.$id
     * @param {string} [arg.customSelector=$]
     * @param {string} [arg.domain]
     * @param {string} [arg.pre]
     * @param {string} [arg.post]
     * @param {boolean} [firstSeparator=true]
     * @param {boolean} [arg.alwaysUrl=false]
     * @param {boolean} [arg.alwaysPost=false]
     */
    function Trocha() {
      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Trocha);

      return _possibleConstructorReturn(this, _getPrototypeOf(Trocha).call(this, null, null, //Because it's the root
      args[CUSTOM_SELECTOR], null, args[ROUTES], args[DOMAIN], args[ALWAYS_URL], args[PREFIX], args[POSTFIX], args[ALWAYS_POST], //args[ALWAYSPRE],/**@TODO
      args[ID_MODE], args[SEPARATOR], args[FIRST_SEPARATOR]));
    } //// STATIC AVAILABLE ATTRIBUTES
    /// Offers all the route types

    /**
     * Default route type
     * Symbol for Route type... route
     * @see https://dfoxpro.github.io/trochaJS/#route
     * @public
     * @static
     */


    _createClass(Trocha, null, [{
      key: "ROUTE",
      get: function get() {
        return ROUTE;
      }
      /**
       * Route type optional to tree definition
       * Symbol for Scope type route
       * @see https://dfoxpro.github.io/trochaJS/#scope
       * @public
       * @static
       */

    }, {
      key: "SCOPE",
      get: function get() {
        return SCOPE;
      }
      /**
       * Route type that contain a CRUD like tree route definition
       * Symbol for Resource type route
       * @see https://dfoxpro.github.io/trochaJS/#resource
       * @public
       * @static
       */

    }, {
      key: "RESOURCE",
      get: function get() {
        return _RESOURCE;
      }
      /**
       * Route type that can be used to abbreviate long name routes, like CDN
       * Symbol for Alias type route
       * @see https://dfoxpro.github.io/trochaJS/#alias
       * @public
       * @static
       */

    }, {
      key: "ALIAS",
      get: function get() {
        return _ALIAS;
      } /// Offers all the request types

      /**
       * HTTP request method
       * Used by browsers to ask CORS permissions
       * @public
       * @static
       */

    }, {
      key: "OPTIONS",
      get: function get() {
        return OPTIONS;
      }
      /**
       * Most common HTTP request method
       * It's tue default method for all routes
       * Used in REST for Read operations
       * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods for all methods info
       * @public
       * @static
       */

    }, {
      key: "GET",
      get: function get() {
        return GET;
      }
      /**
       * HTTP request method
       * Same as get without body response
       * @public
       * @static
       */

    }, {
      key: "HEAD",
      get: function get() {
        return HEAD;
      }
      /**
       * HTTP request method
       * Used in REST for Create operations
       * @public
       * @static
       */

    }, {
      key: "POST",
      get: function get() {
        return POST;
      }
      /**
       * HTTP request method
       * Used in REST for Create operations
       * @public
       * @static
       */

    }, {
      key: "PUT",
      get: function get() {
        return PUT;
      }
      /**
       * HTTP request method
       * Used in REST for Update/Write operations
       * @public
       * @static
       */

    }, {
      key: "PATCH",
      get: function get() {
        return PATCH;
      }
      /**
       * HTTP request method
       * Used in REST for Destroy/Remove operations
       * @public
       * @static
       */

    }, {
      key: "DELETE",
      get: function get() {
        return DELETE;
      }
      /**
       * HTTP request method
       * Used for usage/error log client to server
       * @public
       * @static
       */

    }, {
      key: "TRACE",
      get: function get() {
        return TRACE;
      }
      /**
       * HTTP request method
       * @public
       * @static
       */

    }, {
      key: "CONNECT",
      get: function get() {
        return CONNECT;
      } /// Offers ID modes

      /**
       * Standard definition of Id; used in Angular, React(Router)
       * Symbol for "/:the_id" id mode, default ID mode
       * @public
       * @static
       */

    }, {
      key: "COLON",
      get: function get() {
        return COLON;
      }
      /**
       * Definition of Id used in CanJS and other frameworks
       * Symbol for "/{the_id}" id mode
       * @public
       * @static
       */

    }, {
      key: "BRACKETS",
      get: function get() {
        return BRACKETS;
      }
      /*
       * Offers basic resource structure
       * @See Route constructor for custom selector
       */

    }, {
      key: "$RESOURCE",
      get: function get() {
        return _basicResource();
      }
      /**
       * Standard definition of separator; used in Unix, http
       * Symbol for "/" separator, default separator
       * @public
       * @static
       */

    }, {
      key: "SLASH",
      get: function get() {
        return SLASH;
      }
      /**
       * Used in MS Windows file system
       * Symbol for "\" separator
       * @public
       * @static
       */

    }, {
      key: "BACK_SLASH",
      get: function get() {
        return BACK_SLASH;
      }
      /**
       * Used in localization libraries and other properties enviorements
       * Symbol for "." separator
       * @public
       * @static
       */

    }, {
      key: "DOT",
      get: function get() {
        return DOT;
      }
    }]);

    return Trocha;
  }(Route);
  /* End: src/v2/_Trocha.js */

  /* End: src/v2/_core.js */


  parent.Trocha = Trocha;
  parent.Route = Route;
  parent.Alias = Alias;
  parent.Resource = Resource;
  parent.Scope = Scope;
})(this);
//# sourceMappingURL=trocha_library.babeled.js.map
