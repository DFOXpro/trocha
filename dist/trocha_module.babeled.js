"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$RESOURCE = exports.ALIAS = exports.RESOURCE = exports.SCOPE = exports.ROUTE = exports.CONNECT = exports.TRACE = exports.DELETE = exports.PATCH = exports.PUT = exports.POST = exports.HEAD = exports.GET = exports.OPTIONS = exports.Scope = exports.Resource = exports.Alias = exports.Route = exports.Trocha = void 0;

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

/** @license trocha@0.2.1 - 2019-04-10
* Trocha.js 
* 
* This source code is licensed under the Mozillas Public license 2.0 found in the 
* LICENSE file in the root directory of this source tree. 
*/

/**
 * This file is intended for module enviorements
 * Works like React
 * Note we also make public a lot of const for easy usage
 */

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

var _ = '/';
var DS = '$'; // DEFAULT_SELECTOR
/// Request method types

var OPTIONS = 'OPTIONS';
exports.OPTIONS = OPTIONS;
var GET = 'GET';
exports.GET = GET;
var HEAD = 'HEAD';
exports.HEAD = HEAD;
var POST = 'POST';
exports.POST = POST;
var PUT = 'PUT';
exports.PUT = PUT;
var PATCH = 'PATCH';
exports.PATCH = PATCH;
var DELETE = 'DELETE';
exports.DELETE = DELETE;
var TRACE = 'TRACE';
exports.TRACE = TRACE;
var CONNECT = 'CONNECT'; /// Route types

exports.CONNECT = CONNECT;
var ROUTE = 'ROUTE';
exports.ROUTE = ROUTE;
var SCOPE = 'SCOPE';
exports.SCOPE = SCOPE;
var _RESOURCE = 'RESOURCE';
exports.RESOURCE = _RESOURCE;
var _ALIAS = 'ALIAS'; /// ID modes

/**
 * Standard definition of Id; used in Angular, React(Router)
 * Symbol for "/:the_id" id mode, default ID mode
 * @Public via Trocha
 */

exports.ALIAS = _ALIAS;
var COLON = 'COLON';
/**
 * Definition of Id used in CanJS and other frameworks
 * Symbol for "/{the_id}" id mode
 * @Public via Trocha
 */

var BRACKETS = 'BRACKETS'; // Next const are private helpers for ID modes

var _ID_MODE_REPLACE = 'Ñ'; // Can be any rare character

var _PREID = _ + _ID_MODE_REPLACE;

var _AVAILABLE_ID_MODES = {}; // In teory only used in _FORMAT_ID_FUN

_AVAILABLE_ID_MODES[BRACKETS] = "{".concat(_ID_MODE_REPLACE, "}");
_AVAILABLE_ID_MODES[COLON] = ":".concat(_ID_MODE_REPLACE);
/**
 * Interpolator of id mode to be used in path function
 * @todo should be Route protected(private & inheritable) method
 * @param {string} currentIdMode - can be BRACKETS | COLON
 * @second_order
 * @pure
 * @return {function} see function below
 */

var _FORMAT_ID_FUN = function _FORMAT_ID_FUN(currentIdMode) {
  return (
    /**
     * Interpolate template with _AVAILABLE_ID_MODES[currentIdMode] and idName
     * @param {string} idName
     * @param {template literal | string} template - should contain _ID_MODE_REPLACE value; default _ID_MODE_REPLACE
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
}; /// Input attributes


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
var DEFAULT_ID = "defaultId";
var ALWAYS_URL = 'alwaysUrl';
var ALWAYS_POST = 'alwaysPost';
var CUSTOM_SELECTOR = 'customSelector'; /// Route return attributes

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


exports.$RESOURCE = _basicResource;
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
        pre: ''
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
        return _classPrivateFieldGet(_this2, _data)[attribute] = value || _classPrivateFieldGet(_this2, _data)[attribute];
      };

      _setRootAttribute(DOMAIN, argDomain);

      _classPrivateFieldGet(this, _newGetter).call(this, this, DOMAIN);

      _setRootAttribute(ALWAYS_URL, argAlwaysUrl);

      _setRootAttribute(ALWAYS_POST, argAlwaysPost);

      _setRootAttribute(POSTFIX, argPost);

      _setRootAttribute(PREFIX, argPre);

      _setRootAttribute(ID_MODE, argIdMode);

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

      var myData = _classPrivateFieldGet(this, _data);

      var parent = myData.parent || {};
      var rootData = myData.root;
      var SS = myData.SS;

      var _formatID = _FORMAT_ID_FUN(rootData[ID_MODE]);

      var r = s;
      if (myData[NAME] === undefined) return ''; // 1 print the domain

      r = rootData[DOMAIN] && // !parent[PATH] &&
      routeParams[URL] !== false && (routeParams[URL] || rootData[ALWAYS_URL]) ? rootData[DOMAIN] : s;
      delete routeParams[URL]; // 2 add the prefix

      r += rootData[PREFIX] && (routeParams[PREFIX] || routeParams[EXTENDED]) ? rootData[PREFIX] : s;
      delete routeParams[PREFIX]; // 3 print parent paths

      var parentPathArg = {};
      parentPathArg[POSTFIX] = false;
      r += parent[PATH] ? parent[PATH](parentPathArg, function () {
        return true;
      }) : s; // 4.A print name & id(name) from customNameFun like Alias

      var hide = routeParams[HIDE] !== undefined ? routeParams[HIDE] : myData[HIDE] || myData[JUST_ID] && myData[DEFAULT_ID] === false;
      var customNameFromInhered;
      if ('function' === typeof customNameFun) customNameFromInhered = customNameFun(myData);
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
          r += noIdentifier ? s : _ + myId;
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


      if (parent[SS + ID] && !routeParams[parent[SS + ID]] && (myData[ID] === false || routeParams[PARENT_ID] === false || myData[PARENT_ID] === false)) r = r.replace(_formatID(parent[SS + ID], _PREID), s); // 6.2 Remove parents Ids designed in constructor

      Object.keys(myData).forEach(function (idName) {
        if (myData[idName] === false && !routeParams[idName]) return r = r.replace(_formatID(idName, _PREID), s);
      }); // 6.2 RoR selected Ids in path params

      Object.keys(routeParams).forEach(function (idName) {
        if (routeParams[idName] === false) // Remove
          r = r.replace(_formatID(idName, _PREID), s); // Replace
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
     * Check if given routeDefinition is ROUTE
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


exports.Route = Route;

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
      return _get(_getPrototypeOf(Alias.prototype), "path", this).call(this, routeParams, function (myData) {
        // Note Alias dnt support hide nor justId in creation
        var parent = myData.parent || {};
        var rootData = myData.root;

        var _formatID = _FORMAT_ID_FUN(rootData[ID_MODE]);

        var myId = _formatID(myData[ID], _PREID);

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


exports.Alias = Alias;

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
      return _get(_getPrototypeOf(Resource.prototype), "path", this).call(this, routeParams, function (myData) {
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


exports.Resource = Resource;

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
      return _get(_getPrototypeOf(Scope.prototype), "path", this).call(this, routeParams, function (myData) {
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


exports.Scope = Scope;

var Trocha =
/*#__PURE__*/
function (_Route4) {
  _inherits(Trocha, _Route4);

  function Trocha() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Trocha);

    return _possibleConstructorReturn(this, _getPrototypeOf(Trocha).call(this, null, null, //Because it's the root
    args[CUSTOM_SELECTOR], null, args[ROUTES], args[DOMAIN], args[ALWAYS_URL], args[PREFIX], args[POSTFIX], args[ALWAYS_POST], //args[ALWAYSPRE],/**@TODO
    args[ID_MODE]));
  }
  /*
   * STATIC AVAILABLE ATTRIBUTES
   */

  /*
   * Offers all the route types
   */


  _createClass(Trocha, null, [{
    key: "ROUTE",
    get: function get() {
      return ROUTE;
    }
  }, {
    key: "SCOPE",
    get: function get() {
      return SCOPE;
    }
  }, {
    key: "RESOURCE",
    get: function get() {
      return _RESOURCE;
    }
  }, {
    key: "ALIAS",
    get: function get() {
      return _ALIAS;
    }
    /*
     * Offers all the request types
     */

  }, {
    key: "OPTIONS",
    get: function get() {
      return OPTIONS;
    }
  }, {
    key: "GET",
    get: function get() {
      return GET;
    }
  }, {
    key: "HEAD",
    get: function get() {
      return HEAD;
    }
  }, {
    key: "POST",
    get: function get() {
      return POST;
    }
  }, {
    key: "PUT",
    get: function get() {
      return PUT;
    }
  }, {
    key: "PATCH",
    get: function get() {
      return PATCH;
    }
  }, {
    key: "DELETE",
    get: function get() {
      return DELETE;
    }
  }, {
    key: "TRACE",
    get: function get() {
      return TRACE;
    }
  }, {
    key: "CONNECT",
    get: function get() {
      return CONNECT;
    }
    /*
     * Offers ID modes
     */

  }, {
    key: "BRACKETS",
    get: function get() {
      return BRACKETS;
    }
  }, {
    key: "COLON",
    get: function get() {
      return COLON;
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
  }]);

  return Trocha;
}(Route);
/* End: src/v2/_Trocha.js */

/* End: src/v2/_core.js */


exports.Trocha = Trocha;
//# sourceMappingURL=trocha_module.babeled.js.map
