this.trocha = (function() {
  var $, $ID, $METHOD, $NAME, $alwaysPost, $alwaysUrl, $customSelector, $domain, $postfix, $prefix, $resource, AFTER_ID, ALIAS, ALWAYS_POST, ALWAYS_URL, AS, CONNECT, CUSTOM, CUSTOM_SELECTOR, DELETE, DOMAIN, EXTENDED, GET, HEAD, HIDE, ID, JUST_ID, METHOD, NAME, NEW_ALIAS, NEW_RESOURCE, NEW_ROUTE, NEW_SCOPE, OPTIONS, PARENT_ID, PATCH, PATH, POST, POSTFIX, PREFIX, PUT, RESOURCE, ROUTE, ROUTES, SCOPE, TRACE, TYPE, URL, _, _basicResource, _edit, _list, _new, _show, s, trochaReturn;
  _ = '/';
  s = '';
  $ = '$';
  OPTIONS = 'OPTIONS';
  GET = 'GET';
  HEAD = 'HEAD';
  POST = 'POST';
  PUT = 'PUT';
  PATCH = 'PATCH';
  DELETE = 'DELETE';
  TRACE = 'TRACE';
  CONNECT = 'CONNECT';
  ROUTE = 'ROUTE';
  SCOPE = 'SCOPE';
  RESOURCE = 'RESOURCE';
  ID = 'id';
  NAME = 'name';
  HIDE = 'hide';
  URL = 'url';
  TYPE = 'type';
  PREFIX = 'pre';
  ALIAS = 'alias';
  POSTFIX = 'post';
  EXTENDED = 'ext';
  METHOD = 'method';
  DOMAIN = 'domain';
  ROUTES = 'routes';
  JUST_ID = 'justId';
  AFTER_ID = 'afterId';
  PARENT_ID = 'parentId';
  ALWAYS_URL = 'alwaysUrl';
  ALWAYS_POST = 'alwaysPost';
  CUSTOM_SELECTOR = 'customSelector';
  AS = $ + 'as';
  $ID = $ + ID;
  PATH = 'path';
  $NAME = $ + NAME;
  $METHOD = $ + METHOD;
  CUSTOM = '_custom';
  NEW_SCOPE = '_newScope';
  NEW_ROUTE = '_newRoute';
  NEW_RESOURCE = '_newResource';
  NEW_ALIAS = '_newAlias';
  $domain = $ + DOMAIN;
  $prefix = $ + PREFIX;
  $postfix = $ + POSTFIX;
  $alwaysUrl = $ + ALWAYS_URL;
  $alwaysPost = $ + ALWAYS_POST;
  $resource = $ + RESOURCE.toLowerCase();
  $customSelector = $ + CUSTOM_SELECTOR;
  _show = 'show';
  _edit = 'edit';
  _new = 'new';
  _list = 'list';
  _basicResource = {};
  _basicResource[$ + ID] = ID;
  _basicResource[_show] = {};
  _basicResource[_edit] = {};
  _basicResource[_new] = {};
  _basicResource[_list] = {};
  _basicResource[_show][$ + HIDE] = true;
  _basicResource[_new][$ + ID] = false;
  _basicResource[_list][$ + ID] = false;
  _basicResource[_list][$ + HIDE] = true;
  trochaReturn = function(initParams) {
    var _basicRouteReturn, _constructor, _preparePath, _prepareRoutes, as, newAlias, newResource, newRoute, newScope, routes;
    if (!initParams) {
      initParams = {};
    }
    routes = {};
    _constructor = function(initParams) {
      routes = _basicRouteReturn();
      if (initParams[DOMAIN]) {
        routes[$domain] = s + initParams[DOMAIN];
      }
      if (initParams[PREFIX]) {
        routes[$prefix] = s + initParams[PREFIX];
      }
      if (initParams[POSTFIX]) {
        routes[$postfix] = s + initParams[POSTFIX];
      }
      if (initParams[RESOURCE.toLowerCase()]) {
        routes[$resource] = initParams[RESOURCE.toLowerCase()];
      }
      if (initParams[CUSTOM_SELECTOR]) {
        routes[$customSelector] = initParams[CUSTOM_SELECTOR];
      }
      if (initParams[ALWAYS_URL]) {
        routes[$alwaysUrl] = initParams[ALWAYS_URL];
      }
      if (initParams[ALWAYS_POST]) {
        routes[$alwaysPost] = initParams[ALWAYS_POST];
      }
      routes[CUSTOM] = function(param, routeParam) {
        return _preparePath({}, param)(routeParam);
      };
      if (initParams[ROUTES]) {
        _prepareRoutes(routes, initParams[ROUTES]);
      }
      return routes;
    };
    _basicRouteReturn = function(parent, param, optionals) {
      var _NEW_NAMES, r;
      if (!optionals) {
        optionals = {};
      }
      r = {};
      if (optionals[ROUTE]) {
        r = optionals[ROUTE];
      }
      _NEW_NAMES = [NEW_SCOPE, NEW_ROUTE, NEW_ALIAS, NEW_RESOURCE];
      if ('object' === typeof r) {
        [newScope, newRoute, newAlias, newResource].forEach(function(newFunction, i) {
          return Object.defineProperty(r, _NEW_NAMES[i], {
            get: function() {
              return newFunction;
            }
          });
        });
      }
      if (parent && param) {
        r[PATH] = _preparePath(parent, param);
        r[$NAME] = param[NAME];
        r[AS] = as(parent, param);
        if (optionals[METHOD]) {
          r[$METHOD] = param[METHOD] || GET;
        }
        if (optionals[ID] && param[ID]) {
          r[$ID] = param[ID];
        }
        parent[param[NAME]] = r;
      }
      return r;
    };
    _prepareRoutes = function(parent, routesJSON, SELECTOR) {
      var _$, posibleRoutes;
      _$ = SELECTOR || routes[$customSelector] || $;
      delete routesJSON[_$ + TYPE];
      posibleRoutes = Object.keys(routesJSON);
      return posibleRoutes.forEach(function(name) {
        var _defineParam, newAliasParam, newRouteParam, route;
        route = routesJSON[name];
        if (typeof route === 'string') {
          newAliasParam = {};
          newAliasParam[NAME] = name;
          newAliasParam[ALIAS] = route;
          return parent[NEW_ALIAS](newAliasParam);
        } else if (typeof route === 'object') {
          _defineParam = function(_route, _param) {
            var posibleDisabledParentIds;
            delete _route[_$ + TYPE];
            _param = _param || {};
            _param[NAME] = name;
            if (_route[_$ + ID] !== void 0) {
              _param[ID] = _route[_$ + ID];
              delete _route[_$ + ID];
            }
            if (_route[_$ + PARENT_ID] === false) {
              _param[PARENT_ID] = false;
              delete _route[_$ + PARENT_ID];
            }
            posibleDisabledParentIds = Object.keys(_route);
            posibleDisabledParentIds.forEach(function(pDPId) {
              if (_route[pDPId] === false && parent.path && parent.path().includes("/:" + pDPId)) {
                _param[pDPId] = false;
                return delete _route[pDPId];
              } else if (_route[pDPId] === false) {
                return console.error("Invalid parent Id " + pDPId + " for " + _param[NAME]);
              }
            });
            return _param;
          };
          if (route[_$ + TYPE] === SCOPE) {
            parent[NEW_SCOPE](_defineParam(route));
          } else if (route[_$ + TYPE] === RESOURCE) {
            parent[NEW_RESOURCE](_defineParam(route));
          } else {
            newRouteParam = {};
            if (route[_$ + HIDE]) {
              newRouteParam[HIDE] = route[_$ + HIDE];
              delete route[_$ + HIDE];
            }
            if (route[_$ + HIDE] === false) {
              delete route[_$ + HIDE];
            }
            if (route[_$ + METHOD]) {
              newRouteParam[METHOD] = route[_$ + METHOD];
              delete route[_$ + METHOD];
            }
            if (route[_$ + JUST_ID]) {
              newRouteParam[JUST_ID] = route[_$ + JUST_ID];
              delete route[_$ + JUST_ID];
            }
            parent[NEW_ROUTE](_defineParam(route, newRouteParam));
          }
          return _prepareRoutes(parent[name], route);
        } else {
          console.error('Did you mean', _$ + name, '? Route definition must be Object(to route) or String(to alias) or Boolean(to disable parent Ids)');
          throw "TrochaJS error: [_prepareRoutes] invalid route definition. " + NAME + " = " + name + " in " + parent[NAME];
        }
      });
    };
    _preparePath = function(parent, param) {
      return function(routeParams) {
        var fragment, hide, noIdentifier, query, r;
        if (!routeParams) {
          routeParams = {};
        }
        if (param[ALIAS]) {
          return param[ALIAS];
        }
        r = (routes[$domain] && !parent[PATH] && (routeParams[URL]||routes[$alwaysUrl]) ? routes[$domain] : s);
        delete routeParams[URL];
        r += ((routeParams[PREFIX] || routeParams[EXTENDED]) && routes[$prefix] ? routes[$prefix] : s);
        delete routeParams[PREFIX];
        r += (parent[PATH] ? parent[PATH]({post:false}) : s);
        hide = (routeParams[HIDE] !== undefined ? routeParams[HIDE] : param[HIDE]);
        if ((routeParams[JUST_ID] !== false) && (param[JUST_ID] && param[ID])) {
          r += _ + ':' + param[ID];
        } else {
          noIdentifier = (!param[ID] ? true : routeParams[ID] === false ? true : false);
          r += (hide? s : _ + param[NAME]);
          r += (noIdentifier ? s : _ + ':' + param[ID]);
        }
        r += (
					routes[$postfix] &&
					routeParams[POSTFIX] != false &&
					!hide &&
					(routes[$alwaysPost] || param[POSTFIX] || routeParams[POSTFIX] || routeParams[EXTENDED])
					? routes[$postfix] : s
				);
        delete routeParams[POSTFIX];
        query = {};
        if (routeParams.query) {
          query = JSON.parse(JSON.stringify(routeParams.query));
          delete routeParams.query;
        }
        if (routeParams.fragment) {
          fragment = routeParams.fragment;
          delete routeParams.fragment;
        }
        if (parent[$ID] && !routeParams[parent[$ID]] && ((param[ID] === false) || (routeParams[PARENT_ID] === false) || (param[PARENT_ID] === false))) {
          r = r.replace('/:' + parent[$ID], s);
        }
        Object.keys(param).forEach(function(v) {
          if (param[v] === false && !routeParams[v]) {
            return r = r.replace('/:' + v, s);
          }
        });
        Object.keys(routeParams).forEach(function(v) {
          if (routeParams[v] === false) {
            return r = r.replace('/:' + v, s);
          } else {
            return r = r.replace(':' + v, routeParams[v]);
          }
        });
        Object.keys(query).forEach(function(key, i, array) {
          if (i === 0) {
            r += '?';
          }
          return r += encodeURIComponent(key) + '=' + encodeURIComponent(query[key]) + (array.length - 1 !== i ? '&' : '');
        });
        if (fragment) {
          r += '#' + encodeURIComponent(fragment);
        }
        return r;
      };
    };
    as = function(parent, param) {
      var pas;
      pas = parent[AS];
      return (!pas ? '' : pas + '_') + param[NAME];
    };
    newScope = function(param) {
      var parent;
      if (!param) {
        return console.info('newScope( { name:String } )');
      } else if (!param[NAME]) {
        console.error('Trocha.newScope given parameters: ', param);
        throw 'Trocha.newScope: Missing name';
      } else if (typeof param[NAME] !== 'string') {
        console.error('Trocha.newScope given parameters: ', param);
        throw 'Trocha.newScope: require String name';
      } else {
        parent = this;
        _basicRouteReturn(parent, param);
        return delete parent[param[NAME]][NEW_SCOPE];
      }
    };
    newAlias = function(param) {
      var args, parent;
      if (!param) {
        return console.info('Trocha.newAlias( {' + NAME + ':String,' + ALIAS + ':String[,' + METHOD + ':String(Default = GET)] } )');
      } else if (!param[NAME]) {
        console.error('Trocha.newAlias given parameters: ', param);
        throw 'Trocha.newAlias: Missing ' + NAME;
      } else if (typeof param[NAME] !== 'string') {
        console.error('Trocha.newAlias given parameters: ', param);
        throw 'Trocha.newAlias: require String ' + NAME;
      } else if (param[ALIAS]) {
        if (typeof param[ALIAS] !== 'string') {
          console.error('Trocha.newAlias given parameters: ', param);
          throw 'Trocha.newAlias: require String ' + ALIAS;
        } else {
          parent = this;
          args = {};
          args[ROUTE] = param[ALIAS];
          return _basicRouteReturn(parent, param, args);
        }
      } else {
        console.error('Trocha.newAlias given parameters: ', param);
        throw 'Trocha.newAlias: Missing ' + ALIAS;
      }
    };
    newRoute = function(param) {
      var args, parent;
      if (!param) {
        return console.info('Trocha.newRoute( {' + NAME + ':String, [' + METHOD + ':String(Default = GET),' + ID + ':false|String,' + HIDE + ':Boolean,' + JUST_ID + ':Boolean,' + AFTER_ID + ':Boolean] } )');
      } else if (!param[NAME]) {
        console.error('Trocha.newRoute given parameters: ', param);
        throw 'Trocha.newRoute: Missing ' + NAME;
      } else if (typeof param[NAME] !== 'string') {
        console.error('Trocha.newRoute given parameters: ', param);
        throw 'Trocha.newRoute: require String ' + NAME;
      } else if (param[ALIAS]) {
        if (typeof param[ALIAS] !== 'string') {
          console.error('Trocha.newRoute given parameters: ', param);
          throw 'Trocha.newRoute: require String ' + ALIAS;
        } else {
          return newAlias(param);
        }
      } else {
        parent = this;
        args = {};
        args[METHOD] = true;
        args[ID] = true;
        return _basicRouteReturn(parent, param, args);
      }
    };
    newResource = function(param) {
      var newRouteParam, selector;
      if (!param) {
        return console.info('newResource({' + NAME + ':String, ' + ID + ':String [, ' + RESOURCE + ':Object]})');
      } else if (typeof param !== 'object') {
        throw 'Trocha.newResource: require Object input';
      } else {
        newRouteParam = {};
        if (param[RESOURCE.toLowerCase()] || routes[$resource]) {
          newRouteParam[param[NAME]] = JSON.parse(JSON.stringify(param[RESOURCE.toLowerCase()] || routes[$resource]));
          selector = routes[$customSelector] || $;
        } else {
          newRouteParam[param[NAME]] = JSON.parse(JSON.stringify(_basicResource));
          selector = $;
        }
        newRouteParam[param[NAME]][$ + ID] = param[ID];
        return _prepareRoutes(this, newRouteParam, selector);
      }
    };
    return _constructor(initParams);
  };
  [OPTIONS, GET, HEAD, POST, PUT, PATCH, DELETE, TRACE, CONNECT, RESOURCE, ROUTE, SCOPE].forEach(function(attribute) {
    return Object.defineProperty(trochaReturn, attribute, {
      get: function() {
        return attribute;
      }
    });
  });
  Object.defineProperty(trochaReturn, $ + RESOURCE, {
    get: function() {
      return _basicResource;
    }
  });
  return trochaReturn;
})();
