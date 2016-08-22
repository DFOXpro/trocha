this.trocha = (function() {
  var $, $ID, $METHOD, $NAME, $customSelector, $domain, $postfix, $prefix, $resource, AFTER_ID, AS, CONNECT, CUSTOM, CUSTOM_SELECTOR, DELETE, DOMAIN, EXTENDED, GET, HEAD, HIDE, ID, JUST_ID, METHOD, NAME, NEW_RESOURCE, NEW_ROUTE, NEW_SCOPE, OPTIONS, PARENT_ID, PATCH, PATH, POST, POSTFIX, PREFIX, PUT, RESOURCE, ROUTE, ROUTES, SCOPE, TRACE, TYPE, URL, _, _basicResource, _edit, _list, _new, _show, s, trochaReturn;
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
  POSTFIX = 'post';
  EXTENDED = 'ext';
  METHOD = 'method';
  DOMAIN = 'domain';
  ROUTES = 'routes';
  JUST_ID = 'justId';
  AFTER_ID = 'afterId';
  PARENT_ID = 'parentId';
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
    var _preparePath, as, newResource, newRoute, newScope, routes;
    routes = {};
    _preparePath = function(parent, param) {
      return function(routeParams) {
        var fragment, hide, noIdentifier, query, r;
        if (!routeParams) {
          routeParams = {};
        }
        r = (routeParams[URL] && routes[$domain] ? routes[$domain] : s);
        delete routeParams[URL];
        r += ((routeParams[PREFIX] || routeParams[EXTENDED]) && routes[$prefix] ? routes[$prefix] : s);
        delete routeParams[PREFIX];
        r += (parent[PATH] ? parent[PATH]() : s) + _;
        if (parent[$ID] && (param[ID] === false && !routeParams[ID]) || routeParams[PARENT_ID] === false) {
          r = r.replace('/:' + parent[$ID], s);
        }
        if ((routeParams[JUST_ID] !== false) && (param[JUST_ID] && param[ID])) {
          r += _ + ':' + param[ID];
        } else {
          hide = (routeParams[HIDE] !== undefined ? routeParams[HIDE] : param[HIDE]);
          noIdentifier = (!param[ID] ? true : routeParams[ID] === false ? true : false);
          r += (hide? s : param[NAME]);
          r += (noIdentifier ? s : _ + ':' + param[ID]);
        }
        r += ((routeParams[POSTFIX]||routeParams[EXTENDED]) && routes[$postfix] ? routes[$postfix] : s);
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
      if (!param) {
        return console.info('Trocha.newRoute( {' + NAME + ':String, [' + METHOD + ':String(Default = GET),' + ID + ':false|String,' + HIDE + ':Boolean,' + JUST_ID + ':Boolean,' + AFTER_ID + ':Boolean] } )');
      } else if (!param[NAME]) {
        console.error('Trocha.newRoute given parameters: ', param);
        throw 'Trocha.newRoute: Missing name';
      } else if (typeof param[NAME] !== 'string') {
        console.error('Trocha.newRoute given parameters: ', param);
        throw 'Trocha.newRoute: require String name';
      } else {
        parent = this;
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
