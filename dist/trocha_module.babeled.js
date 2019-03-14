"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$RESOURCE = exports.ALIAS = exports.RESOURCE = exports.SCOPE = exports.ROUTE = exports.CONNECT = exports.TRACE = exports.DELETE = exports.PATCH = exports.PUT = exports.POST = exports.HEAD = exports.GET = exports.OPTIONS = exports.Route = exports.Trocha = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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

/** @license TrochaJS@0.2.0 - 2019-03-13
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
/* End: src/v2/_utils.js */
// Const used abroad the library

/* Begin: src/v2/_variables.js */

/*
 * Why variables are outside the Trocha class?
 * Because private variables are still not supported
 * and because Route share a lot of symbols with Trocha
 */
// Utility vars


var _ = '/';
var s = ''; // Force string

var DS = '$'; // DEFAULT_SELECTOR
// Request method types

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
var CONNECT = 'CONNECT'; // Route types

exports.CONNECT = CONNECT;
var ROUTE = 'ROUTE';
exports.ROUTE = ROUTE;
var SCOPE = 'SCOPE';
exports.SCOPE = SCOPE;
var _RESOURCE = 'RESOURCE';
var _ALIAS = 'ALIAS'; // Input attributes

exports.ALIAS = _ALIAS;
var ID = 'id';
var RESOURCE = 'resource';
exports.RESOURCE = RESOURCE;
var NAME = 'name';
var HIDE = 'hide';
var URL = 'url';
var TYPE = 'type';
var PREFIX = 'pre';
var ALIAS = 'alias';
var QUERY = 'query';
var FRAGMENT = 'fragment';
var POSTFIX = 'post';
var EXTENDED = 'ext';
var METHOD = 'method';
var DOMAIN = 'domain';
var ROUTES = 'routes';
var JUST_ID = 'justId';
var AFTER_ID = 'afterId'; // FAILS & no DOCS

var PARENT_ID = 'parentId';
var ALWAYS_URL = 'alwaysUrl';
var ALWAYS_POST = 'alwaysPost';
var CUSTOM_SELECTOR = 'customSelector'; // Route return attributes

var AS = 'as';
var PATH = 'path'; // const NEW_SCOPE = '_newScope'
// const NEW_ROUTE = '_newRoute'
// const NEW_RESOURCE = '_newResource'
// const NEW_ALIAS = '_newAlias'
// Main object return attributes

/**
 * @TODO deprecate
 * Reason: all those attributes can have customSelector
 */
// const $prefix = DS+PREFIX
// const $postfix = DS+POSTFIX
// const $alwaysUrl = DS+ALWAYS_URL
// const $alwaysPost = DS+ALWAYS_POST
// const $customSelector = DS+CUSTOM_SELECTOR
//// static final
// BASIC RESOURCE

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
};

exports.$RESOURCE = _basicResource;
var ERROR_HEADER = 'TrochaJS error: ';
var ERROR_ROUTE_ALREADY_DEFINE = 'route already declare';
/* End: src/v2/_variables.js */
// Trocha class

/* Begin: src/v2/_Trocha.js */
// Route class

/* Begin: src/v2/_Route.js */

var Route = function Route(myParent, argRouteDef, argCustomSelector, argRoot) //argAlwaysPre,// @TODO
{
  var _this2 = this;

  var _argChildRoutes = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

  var argDomain = arguments.length > 5 ? arguments[5] : undefined;
  var argAlwaysUrl = arguments.length > 6 ? arguments[6] : undefined;
  var argPre = arguments.length > 7 ? arguments[7] : undefined;
  var argPost = arguments.length > 8 ? arguments[8] : undefined;
  var argAlwaysPost = arguments.length > 9 ? arguments[9] : undefined;

  _classCallCheck(this, Route);

  _data.set(this, {
    writable: true,
    value: {
      parent: null,
      childs: {},
      SS: DS,
      // selectedSelector
      // next just for root
      alwaysPost: false,
      alwaysUrl: false,
      domain: '',
      post: '',
      pre: ''
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

      var _setAndDisposeAttribute = function _setAndDisposeAttribute(attribute) {
        _classPrivateFieldGet(mySelf, _data)[attribute] = posibleRouteDef[SS + attribute];
        delete posibleRouteDef[SS + attribute];
      };

      _setAndDisposeAttribute(NAME);

      _setAndDisposeAttribute(ALIAS);

      _setAndDisposeAttribute(ID);

      _setAndDisposeAttribute(METHOD);

      _setAndDisposeAttribute(ALIAS);

      _setAndDisposeAttribute(TYPE);

      _setAndDisposeAttribute(HIDE);

      _setAndDisposeAttribute(JUST_ID);

      _setAndDisposeAttribute(PARENT_ID);

      if (false === posibleRouteDef[_classPrivateFieldGet(mySelf, _data).parent[SS + ID]]) _setAndDisposeAttribute(_classPrivateFieldGet(mySelf, _data).parent[SS + ID]);

      _classPrivateFieldGet(mySelf, _newGetter).call(mySelf, mySelf, NAME);

      _classPrivateFieldGet(mySelf, _newGetter).call(mySelf, mySelf, ID); // @TODO DOCUMENT ME, TEST ME


      _classPrivateFieldGet(mySelf, _newGetter).call(mySelf, mySelf, METHOD);

      _classPrivateFieldGet(mySelf, _newGetter).call(mySelf, mySelf, AS, function () {
        return _classPrivateFieldGet(mySelf, _as).call(mySelf, mySelf);
      });
    }
  });

  _createChildRoute.set(this, {
    writable: true,
    value: function value(mySelf, routeDefinition, name) {
      if (_classPrivateFieldGet(mySelf, _data).childs[name]) _throwError(mySelf, ERROR_ROUTE_ALREADY_DEFINE, name);

      if ("string" === typeof routeDefinition) {
        var alias = routeDefinition;
        routeDefinition = {};
        routeDefinition[_classPrivateFieldGet(mySelf, _data).SS + ALIAS] = alias;
      }

      routeDefinition[_classPrivateFieldGet(mySelf, _data).SS + NAME] = name;
      var newRoute = new Route(mySelf, routeDefinition, _classPrivateFieldGet(mySelf, _data).SS, _classPrivateFieldGet(mySelf, _data).root);
      _classPrivateFieldGet(mySelf, _data).childs[name] = newRoute;

      _classPrivateFieldGet(mySelf, _newGetter).call(mySelf, mySelf, name, function () {
        return _classPrivateFieldGet(mySelf, _data).childs[name];
      }, true);
    }
  });

  _diggestChildRoutes.set(this, {
    writable: true,
    value: function value(mySelf, argChildRoutes, skipResource) {
      if (skipResource) console.log(argChildRoutes);

      if (!skipResource && _classPrivateFieldGet(mySelf, _data)[TYPE] === _RESOURCE) {
        var SS = _classPrivateFieldGet(mySelf, _data).SS;

        var resourceChilds = argChildRoutes[SS + RESOURCE] || _basicResource(SS);

        delete resourceChilds[SS + ID];

        _classPrivateFieldGet(mySelf, _diggestChildRoutes).call(mySelf, mySelf, resourceChilds, true);

        delete argChildRoutes[SS + RESOURCE];
      }

      var posibleChildRoutesNames = Object.keys(argChildRoutes);

      while (posibleChildRoutesNames.length) {
        var posibleChild = posibleChildRoutesNames.pop();
        if ( // This case is disable any párentId by
        argChildRoutes[posibleChild] === false && _classPrivateFieldGet(mySelf, _anyParentHasThisId).call(mySelf, mySelf, posibleChild)) _classPrivateFieldGet(mySelf, _data)[posibleChild] = false;else {
          // console.log(argChildRoutes[posibleChild], posibleChild);
          _classPrivateFieldGet(mySelf, _createChildRoute).call(mySelf, mySelf, argChildRoutes[posibleChild], posibleChild);
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
    var SS = _classPrivateFieldGet(_this2, _data).SS;

    var newRoutArgs = {};
    newRoutArgs[SS + TYPE] = ROUTE;
    newRoutArgs[SS + METHOD] = args[METHOD];
    newRoutArgs[SS + ID] = args[ID];
    newRoutArgs[SS + HIDE] = args[HIDE];
    newRoutArgs[SS + JUST_ID] = args[JUST_ID];

    _classPrivateFieldGet(_this2, _createChildRoute).call(_this2, _this2, newRoutArgs, args[NAME]);
  });

  _defineProperty(this, "_newScope", function (args) {
    var SS = _classPrivateFieldGet(_this2, _data).SS;

    var newRoutArgs = {};
    newRoutArgs[SS + TYPE] = SCOPE;
    newRoutArgs[SS + ID] = args[ID];

    _classPrivateFieldGet(_this2, _createChildRoute).call(_this2, _this2, newRoutArgs, args[NAME]);
  });

  _defineProperty(this, "_newAlias", function (args) {
    var SS = _classPrivateFieldGet(_this2, _data).SS;

    var newRoutArgs = {};
    newRoutArgs[SS + ALIAS] = args[ALIAS];
    newRoutArgs[SS + TYPE] = _ALIAS;
    newRoutArgs[SS + METHOD] = args[METHOD];

    _classPrivateFieldGet(_this2, _createChildRoute).call(_this2, _this2, newRoutArgs, args[NAME]);
  });

  _defineProperty(this, "_newResource", function (args) {
    var SS = _classPrivateFieldGet(_this2, _data).SS;

    var newRoutArgs = {};
    newRoutArgs[SS + RESOURCE] = args[RESOURCE];
    newRoutArgs[SS + TYPE] = _RESOURCE;
    newRoutArgs[SS + ID] = args[ID];

    _classPrivateFieldGet(_this2, _createChildRoute).call(_this2, _this2, newRoutArgs, args[NAME]);
  });

  _defineProperty(this, "path", function () {
    var routeParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var myData = _classPrivateFieldGet(_this2, _data);

    var parent = myData.parent || {};
    var rootData = myData.root;
    var SS = myData.SS;
    var r = s;
    if (myData[NAME] === undefined) return '';
    if (myData[ALIAS]) return myData[ALIAS]; // 1 print the domain

    r = rootData[DOMAIN] && !parent[PATH] && routeParams[URL] !== false && (routeParams[URL] || rootData[SS + alwaysUrl]) ? rootData[DOMAIN] : s;
    delete routeParams[URL]; // 2 add the prefix

    r += rootData[PREFIX] && (routeParams[PREFIX] || routeParams[EXTENDED]) ? rootData[PREFIX] : s;
    delete routeParams[PREFIX]; // 3 print parent paths

    var parentPathArg = {};
    parentPathArg[POSTFIX] = false;
    r += parent[PATH] ? parent[PATH](parentPathArg) : s; // 4 print name & id(name)

    var myId = ':' + myData[ID];
    var hide = routeParams[HIDE] !== undefined ? routeParams[HIDE] : myData[HIDE];

    if ( // 4.1 justId case
    routeParams[JUST_ID] !== false && myData[JUST_ID] && myData[ID]) {
      r += _ + myId;
    } else {
      // 4.2 hide case
      var noIdentifier = !myData[ID] ? true : routeParams[ID] === false ? true : false;
      r += hide ? s : _ + myData[NAME];
      r += noIdentifier ? s : _ + myId;
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


    var preId = '/:';
    if (parent[SS + ID] && !routeParams[parent[SS + ID]] && (myData[ID] === false || routeParams[PARENT_ID] === false || myData[PARENT_ID] === false)) r = r.replace(preId + parent[SS + ID], s); // 6.2 Remove parents Ids designed in constructor

    Object.keys(myData).forEach(function (idName) {
      if (myData[idName] === false && !routeParams[idName]) return r = r.replace(preId + idName, s);
    }); // 6.2 RoR selected Ids in path params

    Object.keys(routeParams).forEach(function (idName) {
      if (routeParams[idName] === false) // Remove
        r = r.replace(preId + idName, s);else // Replace
        r = r.replace(':' + idName, routeParams[idName]);
    }); // 7 Now add the query

    Object.keys(query).forEach(function (key, i, array) {
      if (i === 0) r += '?';
      r += encodeURIComponent(key) + '=' + encodeURIComponent(query[key]) + (array.length - 1 !== i ? '&' : '');
    }); // 7 Now add the fragment

    if (fragment) r += '#' + encodeURIComponent(fragment); // console.log('path', r);

    return r;
  });

  _defineProperty(this, "toString", function () {
    return _classPrivateFieldGet(_this2, _as).call(_this2, _this2);
  });

  var _SS = _classPrivateFieldGet(this, _data).SS = argCustomSelector || DS; // selectedSelector


  var DEFAULT_ROUTE_DEF = {};
  DEFAULT_ROUTE_DEF[_SS + METHOD] = GET;
  DEFAULT_ROUTE_DEF[_SS + TYPE] = ROUTE;

  var _posibleRouteDef = _objectSpread({}, DEFAULT_ROUTE_DEF, argRouteDef);

  if (myParent || _posibleRouteDef[_SS + NAME] && _posibleRouteDef[_SS + METHOD] && _posibleRouteDef[_SS + TYPE]) {
    // It's a normal route
    _classPrivateFieldGet(this, _data).parent = myParent;
    _classPrivateFieldGet(this, _data).root = argRoot;

    _classPrivateFieldGet(this, _defineMyAttributes).call(this, this, _posibleRouteDef);

    _classPrivateFieldGet(this, _diggestChildRoutes).call(this, this, _posibleRouteDef);
  } else {
    // It's the root route
    _classPrivateFieldGet(this, _data)[DOMAIN] = argDomain || _classPrivateFieldGet(this, _data)[DOMAIN];

    _classPrivateFieldGet(this, _newGetter).call(this, this, DOMAIN);

    _classPrivateFieldGet(this, _data)[ALWAYS_URL] = argAlwaysUrl || _classPrivateFieldGet(this, _data)[ALWAYS_URL];
    _classPrivateFieldGet(this, _data)[ALWAYS_POST] = argAlwaysPost || _classPrivateFieldGet(this, _data)[ALWAYS_POST];
    _classPrivateFieldGet(this, _data)[POSTFIX] = argPost || _classPrivateFieldGet(this, _data)[POSTFIX];
    _classPrivateFieldGet(this, _data)[PREFIX] = argPre || _classPrivateFieldGet(this, _data)[PREFIX];
    _classPrivateFieldGet(this, _data).root = _classPrivateFieldGet(this, _data);
    /**
     * @TODO Document
     * Trocha({customSelector: 'ASD'}).ASDResource
     */

    _classPrivateFieldGet(this, _newGetter).call(this, this, _RESOURCE, function () {
      return _basicResource(_SS);
    });

    _classPrivateFieldGet(this, _diggestChildRoutes).call(this, this, _argChildRoutes);
  }
};
/* End: src/v2/_Route.js */


exports.Route = Route;

var _data = new WeakMap();

var _anyParentHasThisId = new WeakMap();

var _newGetter = new WeakMap();

var _defineMyAttributes = new WeakMap();

var _createChildRoute = new WeakMap();

var _diggestChildRoutes = new WeakMap();

var _as = new WeakMap();

var Trocha =
/*#__PURE__*/
function (_Route) {
  _inherits(Trocha, _Route);

  function Trocha() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Trocha);

    return _possibleConstructorReturn(this, _getPrototypeOf(Trocha).call(this, null, null, //Because it's the root
    args.customSelector, null, args.routes, args.domain, args.alwaysUrl, args.pre, args.post, args.alwaysPost //args.alwaysPre,/**@TODO
    ));
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
