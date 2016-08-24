this.trocha = (function() {
  var $, $ID, $METHOD, $NAME, $alwaysPost, $alwaysUrl, $customSelector, $domain, $postfix, $prefix, $resource, AFTER_ID, ALIAS, ALWAYS_POST, ALWAYS_URL, AS, CONNECT, CUSTOM, CUSTOM_SELECTOR, DELETE, DOMAIN, EXTENDED, GET, HEAD, HIDE, ID, JUST_ID, METHOD, NAME, NEW_RESOURCE, NEW_ROUTE, NEW_SCOPE, OPTIONS, PARENT_ID, PATCH, PATH, POST, POSTFIX, PREFIX, PUT, RESOURCE, ROUTE, ROUTES, SCOPE, TRACE, TYPE, URL, _, _basicResource, _edit, _list, _new, _show, s, trochaReturn;
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
    var _constructor, _preparePath, _prepareRoutes, as, newResource, newRoute, newScope, routes;
    routes = {};
    _constructor = function(initParams) {
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
      routes[NEW_SCOPE] = newScope;
      routes[NEW_ROUTE] = newRoute;
      routes[NEW_RESOURCE] = newResource;
      routes[CUSTOM] = function(param, routeParam) {
        return _preparePath({}, param)(routeParam);
      };
      if (initParams[ROUTES]) {
        _prepareRoutes(routes, initParams[ROUTES]);
      }
      return routes;
    };
    _prepareRoutes = function(parent, routesJSON, SELECTOR) {
      var _$, posibleRoutes;
      _$ = SELECTOR || routes[$customSelector] || $;
      delete routesJSON[_$ + TYPE];
      posibleRoutes = Object.keys(routesJSON);
      return posibleRoutes.forEach(function(name) {
        var newResourceParam, newRouteParam, newScopeParam, route;
        route = routesJSON[name];
        if (typeof route === 'string') {
          return parent[name] = route;
        } else if (typeof route === 'object') {
          if (route[_$ + TYPE] === SCOPE) {
            newScopeParam = {};
            newScopeParam[NAME] = name;
            if (route[_$ + ID] !== void 0) {
              newScopeParam[ID] = route[_$ + ID];
              delete route[_$ + ID];
            }
            parent[NEW_SCOPE](newScopeParam);
          } else if (route[_$ + TYPE] === RESOURCE) {
            newResourceParam = {};
            newResourceParam[NAME] = name;
            if (route[_$ + ID] !== void 0) {
              newResourceParam[ID] = route[_$ + ID];
              delete route[_$ + ID];
            }
            parent[NEW_RESOURCE](newResourceParam);
          } else {
            newRouteParam = {};
            newRouteParam[NAME] = name;
            if (route[_$ + ID] !== void 0) {
              newRouteParam[ID] = route[_$ + ID];
              delete route[_$ + ID];
            }
            if (route[_$ + METHOD]) {
              newRouteParam[METHOD] = route[_$ + METHOD];
              delete route[_$ + METHOD];
            }
            if (route[_$ + JUST_ID]) {
              newRouteParam[JUST_ID] = route[_$ + JUST_ID];
              delete route[_$ + JUST_ID];
            }
            if (route[_$ + AFTER_ID]) {
              newRouteParam[AFTER_ID] = route[_$ + AFTER_ID];
              delete route[_$ + AFTER_ID];
            }
            if (route[_$ + HIDE]) {
              newRouteParam[HIDE] = route[_$ + HIDE];
              delete route[_$ + HIDE];
            }
            if (route[_$ + POSTFIX]) {
              newRouteParam[POSTFIX] = route[_$ + POSTFIX];
              delete route[_$ + POSTFIX];
            }
            parent[NEW_ROUTE](newRouteParam);
          }
          return _prepareRoutes(parent[name], route);
        } else {
          console.error('Did you mean', _$ + name, '? Route definition must be Object or String');
          throw 'TrochaJS error: [_prepareRoutes] invalid route definition. ' + NAME + ' = ' + name + ' in ' + parent[NAME];
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
        r += (parent[PATH] ? parent[PATH]({post:false}) : s) + _;
        hide = (routeParams[HIDE] !== undefined ? routeParams[HIDE] : param[HIDE]);
        if (parent[$ID] && (param[ID] === false && !routeParams[ID]) || routeParams[PARENT_ID] === false) {
          r = r.replace('/:' + parent[$ID], s);
        }
        if ((routeParams[JUST_ID] !== false) && (param[JUST_ID] && param[ID])) {
          r += _ + ':' + param[ID];
        } else {
          noIdentifier = (!param[ID] ? true : routeParams[ID] === false ? true : false);
          r += (hide? s : param[NAME]);
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
        query = fragment = {};
        if (routeParams.query) {
          query = JSON.parse(JSON.stringify(routeParams.query));
          delete routeParams.query;
        }
        if (routeParams.fragment) {
          fragment = JSON.parse(JSON.stringify(routeParams.fragment));
        }
        delete routeParams.fragment;
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
        return r;
      };
    };
    as = function(parent, param) {
      var pas;
      pas = parent[AS];
      return (!pas ? '' : pas + '_') + param[NAME];
    };
    newScope = function(param) {
      var parent, r;
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
        r = {};
        r[$NAME] = param[NAME];
        r[PATH] = _preparePath(parent, param);
        r[AS] = as(parent, param);
        r[NEW_ROUTE] = newRoute;
        r[NEW_RESOURCE] = newResource;
        return parent[r[$NAME]] = r;
      }
    };
    newRoute = function(param) {
      var parent, r;
      parent = this;
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
          return parent[param[NAME]] = param[ALIAS];
        }
      } else {
        r = {};
        r[$METHOD] = param[METHOD] || GET;
        r[$NAME] = param[NAME];
        r[NEW_ROUTE] = newRoute;
        r[NEW_RESOURCE] = newResource;
        r[NEW_SCOPE] = newScope;
        r[PATH] = _preparePath(parent, param);
        r[AS] = as(parent, param);
        if (param[ID]) {
          r[$ID] = param[ID];
        }
        return parent[r[$NAME]] = r;
      }
    };
    newResource = function(param) {
      var newRouteParam, selector;
      if (!param) {
        return console.info('newRoute({' + NAME + ':String, ' + ID + ':String [, ' + RESOURCE + ':Object]})');
      } else if (typeof param !== 'object') {
        throw 'Trocha.newRoute: require Object input';
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
  trochaReturn.OPTIONS = OPTIONS;
  trochaReturn.GET = GET;
  trochaReturn.HEAD = HEAD;
  trochaReturn.POST = POST;
  trochaReturn.PUT = PUT;
  trochaReturn.PATCH = PATCH;
  trochaReturn.DELETE = DELETE;
  trochaReturn.TRACE = TRACE;
  trochaReturn.CONNECT = CONNECT;
  trochaReturn[RESOURCE] = RESOURCE;
  trochaReturn[ROUTE] = ROUTE;
  trochaReturn[SCOPE] = SCOPE;
  trochaReturn[$ + RESOURCE] = JSON.parse(JSON.stringify(_basicResource));
  return trochaReturn;
})();
