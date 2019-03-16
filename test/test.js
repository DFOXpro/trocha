var _clone, base_variables, constants_test, constructor_test, function_path_test, route_types_test, routes_creation_test, test, testFramework;

testFramework = function(options) {
  var r, results;
  results = {
    runningDescribe: null,
    describesToTest: [],
    asserts: 0,
    badAsserts: 0,
    totalBaseDescribes: 0,
    total: 0,
    bad: 0
  };
  r = {};
  r.it = function(doString, itFun) {
    var e;
    console.log(doString);
    try {
      return itFun();
    } catch (error) {
      e = error;
      console.error("BROKEN EXAMPLE " + doString);
      return console.error("Exception caught", e);
    }
  };
  r.describe = function(title, describeFun) {
    var _descNumeral, desc, failWarning, successPromp;
    successPromp = function() {
      return console.log(`%c${desc.title} test success.`, "color: white; font-style: italic; background-color: green;padding: 1em");
    };
    failWarning = function() {
      desc.fail = true;
      results.bad++;
      return console.log(`%c${desc.title} test failed.`, "color: white; font-style: italic; background-color: red;padding: 1em");
    };
    desc = {
      title: '',
      fun: describeFun,
      childsDescribes: [],
      totalChilds: 0,
      failWarning: failWarning,
      successPromp: successPromp
    };
    if (results.runningDescribe) {
      desc.parent = results.runningDescribe;
      desc.position = ++desc.parent.totalChilds;
    } else {
      desc.parent = {
        totalChilds: results.totalBaseDescribes
      };
    }
    results.total++;
    _descNumeral = function(_desc) {
      if (_desc.position) {
        desc.title = `${_desc.position}.${desc.title}`;
      }
      if (_desc.parent) {
        return _descNumeral(_desc.parent);
      } else {
        return desc.title += ` ${title}`;
      }
    };
    _descNumeral(desc);
    if (desc.parent.childsDescribes) {
      return desc.parent.childsDescribes.push(desc);
    } else {
      return results.describesToTest.push(desc);
    }
  };
  r.assertFunctionError = function(faultyFunction, params, expectedException) {
    var e;
    try {
      faultyFunction(params);
      results.badAsserts++;
      results.runningDescribe.fail = true;
      return console.assert(false, {
        expectedException: expectedException,
        msg: 'Expected error in function buts runs ok'
      });
    } catch (error) {
      e = error;
    }
  };
  // console.log 'Spected error was an error', e
  r.assert = function(result, expected) {
    var assertFail, errorMessage;
    assertFail = false;
    results.asserts++;
    errorMessage = '';
    if ('object' === typeof expected) {
      if ('object' !== typeof result) {
        assertFail = true;
        errorMessage = "Expected any object";
      }
    } else if ('function' === typeof expected) {
      if ('function' !== typeof result) {
        assertFail = true;
        errorMessage = "Expected any function";
      }
    } else if (result !== expected) {
      assertFail = true;
      errorMessage = `Expected ${expected}, but was: ${result}`;
    }
    if (assertFail) {
      results.badAsserts++;
      results.runningDescribe.fail = true;
      console.assert(false, {
        expected: expected,
        result: result,
        msg: errorMessage
      });
    }
    return assertFail;
  };
  r.run = function() {
    var _runDescribes;
    _runDescribes = function(describes) {
      var _currentDescribe, e, success;
      success = true;
      while (describes.length > 0) {
        _currentDescribe = results.runningDescribe = describes.shift();
        console.info("Testing " + results.runningDescribe.title);
        try {
          _currentDescribe.fun();
          if (!_runDescribes(_currentDescribe.childsDescribes)) {
            success = false;
          }
          if (!success) {
            _currentDescribe.fail = true;
          }
        } catch (error) {
          e = error;
          _currentDescribe.fail = true;
          console.error("Exception caught", e);
        }
        if (_currentDescribe.fail) {
          _currentDescribe.failWarning();
        } else {
          _currentDescribe.successPromp();
        }
      }
      return success;
    };
    _runDescribes(results.describesToTest);
    return console.log(`Of (${results.asserts - results.badAsserts}/${results.asserts}) assert`, `(${results.total - results.bad}/${results.total}) tests, ${results.bad} failed`);
  };
  if (options && options.global) {
    Object.keys(r).forEach(function(attr) {
      return window[attr] = r[attr];
    });
  }
  return r;
};

test = testFramework({
  global: true
});

// Note this function does not clone functions
_clone = function(object) {
  return JSON.parse(JSON.stringify(object));
};

constants_test = function() {
  describe('Constants returns', function() {
    it('should be no editable', function() {
      Trocha.ROUTE = "Atack!Route";
      Trocha.OPTIONS = "Atack!Option";
      Trocha.$RESOURCE = "Atack!$Resource";
      assert(Trocha.ROUTE, "ROUTE");
      assert(Trocha.OPTIONS, "OPTIONS");
      return assert(Trocha.$RESOURCE, {});
    });
    it('should return HTTP request methods types', function() {
      assert(Trocha.OPTIONS, "OPTIONS");
      assert(Trocha.GET, "GET");
      assert(Trocha.HEAD, "HEAD");
      assert(Trocha.POST, "POST");
      assert(Trocha.PUT, "PUT");
      assert(Trocha.PATCH, "PATCH");
      assert(Trocha.DELETE, "DELETE");
      assert(Trocha.TRACE, "TRACE");
      return assert(Trocha.CONNECT, "CONNECT");
    });
    it('should return default resource tree', function() {
      return assert(Trocha.$RESOURCE, {
        $id: 'id',
        show: {
          $hide: true
        },
        edit: {},
        new: {
          $id: false
        },
        list: {
          $hide: true,
          $id: false
        }
      });
    });
    return it('should return routes types', function() {
      assert(Trocha.ALIAS, "ALIAS");
      assert(Trocha.SCOPE, "SCOPE");
      assert(Trocha.ROUTE, "ROUTE");
      return assert(Trocha.RESOURCE, "RESOURCE");
    });
  });
  return constants_test = void 0;
};

constructor_test = function() {
  describe('Constructor', function() {
    it('should check trocha is a class object', function() {
      var r;
      // https://stackoverflow.com/questions/1249531/how-to-get-a-javascript-objects-class
      assert(Trocha, function() {});
      r = new Trocha();
      return assert(Trocha.name, "Trocha");
    });
    return it('should create a valid trocha object', function() {
      var r;
      r = new Trocha();
      assert(r, {});
      assert(r._newAlias, function() {});
      assert(r._newResource, function() {});
      assert(r._newRoute, function() {});
      assert(r._newScope, function() {});
      assert(r.$RESOURCE, {});
      return assertFunctionError(r.path);
    });
  });
  return constructor_test = void 0;
};

base_variables = function() {
  describe('Base variables returns', function() {
    it('should set customSelector', function() {
      var r;
      r = new Trocha();
      assert(r.$RESOURCE, {});
      assert(r.$domain, "");
      r = new Trocha({
        customSelector: '$$'
      });
      assert(r.$$RESOURCE, {});
      return assert(r.$$domain, "");
    });
    return it('should set domain', function() {
      var r;
      r = new Trocha();
      assert(r.$domain, "");
      r = new Trocha({
        domain: 'asd'
      });
      return assert(r.$domain, "asd");
    });
  });
  return base_variables = void 0;
};

routes_creation_test = function() {
  describe('Route creation', function() {
    describe('Route creation params', function() {
      it('should create trivial route', function() {
        var r;
        r = new Trocha({
          routes: {
            simple_route: {}
          }
        });
        return assert(r.simple_route.path(), '/simple_route');
      });
      it('should create routes without name printing', function() {
        var r;
        r = new Trocha({
          routes: {
            simple_route_without_name: {
              $hide: true
            }
          }
        });
        return assert(r.simple_route_without_name.path(), '');
      });
      it('should create routes with method', function() {
        var r;
        r = new Trocha({
          routes: {
            simple_route_with_method: {
              $method: Trocha.POST
            }
          }
        });
        return assert(r.simple_route_with_method.$method, 'POST');
      });
      it('should create routes with id', function() {
        var r;
        r = new Trocha({
          routes: {
            simple_id_route: {
              $id: 'simple_id'
            }
          }
        });
        return assert(r.simple_id_route.path(), '/simple_id_route/:simple_id');
      });
      it('should create routes with hiden parent id', function() {
        var r;
        r = new Trocha({
          routes: {
            simple_id_route: {
              $id: 'simple_id',
              without_parent_id: {
                $id: false
              }
            }
          }
        });
        return assert(r.simple_id_route.without_parent_id.path(), '/simple_id_route/without_parent_id');
      });
      it('should create routes with just id', function() {
        var r;
        r = new Trocha({
          routes: {
            simple_route_with_just_id: {
              $justId: true,
              $id: 'simple_id'
            }
          }
        });
        return assert(r.simple_route_with_just_id.path(), '/:simple_id');
      });
      // # will fail
      // it 'should create routes with after id', ->
      // 	r = new Trocha routes: simple_route_with_after_id:
      // 		$afterId: true
      // 		$id: 'simple_id'
      // 	assert r.simple_route_with_after_id.path(), '/:simple_id/simple_route_with_after_id'
      it('should create routes with hiden parents id and child id', function() {
        var r;
        r = new Trocha({
          routes: {
            simple_id_route: {
              $id: 'simple_id',
              hide_parent_id: {
                $id: 'child_id',
                $parentId: false
              },
              id_2: {
                $id: 'child_id',
                $parentId: false,
                hide_parents_id: {
                  child_id: false
                },
                // overide_id:
                // 	simple_id: true # does not compute
                hide_glitch: {
                  $id: '$hide',
                  // simple_id: ':$hide' # does not compute
                  l: {
                    $hide: false // This will be ignore in constructor
                  }
                }
              }
            }
          }
        });
        assert(r.simple_id_route.hide_parent_id.path(), '/simple_id_route/hide_parent_id/:child_id');
        assert(r.simple_id_route.id_2.hide_parents_id.path(), '/simple_id_route/id_2/hide_parents_id');
        //check Override
        assert(r.simple_id_route.hide_parent_id.path({
          simple_id: 'asd'
        }), '/simple_id_route/asd/hide_parent_id/:child_id');
        assert(r.simple_id_route.id_2.hide_parents_id.path({
          child_id: 'asd'
        }), '/simple_id_route/id_2/asd/hide_parents_id');
        // assert r.simple_id_route.id_2.overide_id.path(), '/simple_id_route/asd/id_2/:child_id/overide_id'
        return assert(r.simple_id_route.id_2.hide_glitch.l.path(), '/simple_id_route/id_2/:child_id/hide_glitch/:$hide/l');
      });
      it('should create routes with prefix', function() {
        var r;
        r = new Trocha({
          pre: '.the_pre.',
          routes: {
            simple_route_pre: {}
          }
        });
        assert(r.simple_route_pre.path(), '/simple_route_pre');
        assert(r.simple_route_pre.path({
          pre: true
        }), '.the_pre./simple_route_pre');
        return assert(r.simple_route_pre.path({
          ext: true
        }), '.the_pre./simple_route_pre');
      });
      return it('should create routes with postfix', function() {
        var r;
        r = new Trocha({
          post: '.the_post',
          alwaysPost: true,
          routes: {
            simple_route_post: {}
          }
        });
        assert(r.simple_route_post.path(), '/simple_route_post.the_post');
        r = new Trocha({
          post: '.the_post',
          routes: {
            simple_route_post: {}
          }
        });
        assert(r.simple_route_post.path(), '/simple_route_post');
        assert(r.simple_route_post.path({
          post: true
        }), '/simple_route_post.the_post');
        return assert(r.simple_route_post.path({
          ext: true
        }), '/simple_route_post.the_post');
      });
    });
    it('should create routes via JSON Constructor', function() {
      var r;
      r = new Trocha({
        routes: {
          simple_route: {},
          simple_scope: {
            $type: Trocha.SCOPE
          },
          simple_alias: "simple_alias",
          simple_resource: {
            $type: Trocha.RESOURCE,
            $id: "simple_id" //resource must have ID
          }
        }
      });
      assert(r.simple_route, {});
      assert(r.simple_scope, {});
      assert(r.simple_resource, {});
      return assert(r.simple_alias, {});
    });
    return it('should create routes via post init functions', function() {
      var r;
      r = new Trocha();
      r._newRoute({
        name: "simple_route"
      });
      assert(r.simple_route, {});
      r.simple_route._newRoute({
        name: "simple_route"
      });
      assert(r.simple_route.simple_route, {});
      r._newScope({
        name: "simple_scope"
      });
      assert(r.simple_scope, {});
      r._newResource({
        name: "simple_resource",
        id: "simple_id"
      });
      assert(r.simple_resource, {});
      r._newAlias({
        name: "simple_alias",
        alias: "simple_alias"
      });
      return assert(r.simple_alias, {});
    });
  });
  return routes_creation_test = void 0;
};

route_types_test = function() {
  describe('Route types', function() {
    it('should create a route(type route)', function() {
      var r;
      r = new Trocha({
        routes: {
          simple_route: {
            $type: Trocha.ROUTE
          },
          simple_route_with_id: {
            $id: 'my_id',
            $type: Trocha.ROUTE
          },
          simple_route_with_method: {
            $method: Trocha.POST
          },
          The: {
            quick: {
              brown: {
                fox: {
                  jumps: {
                    over: {
                      the: {
                        lazy: {
                          dog: {}
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      });
      assert(r.simple_route, {});
      assert(r.simple_route.constructor.name, "Route");
      assert(r.simple_route.path(), '/simple_route');
      assert(r.simple_route_with_id.path(), '/simple_route_with_id/:my_id');
      assert(r.simple_route_with_method.$method, 'POST');
      assert(r.The.quick.brown.path(), '/The/quick/brown');
      assert(r.The.quick.brown.fox.jumps.over.the.lazy.dog.path(), '/The/quick/brown/fox/jumps/over/the/lazy/dog');
      assert(r.The.quick.brown.fox.jumps.over.the.lazy.dog.$as, 'The_quick_brown_fox_jumps_over_the_lazy_dog');
      return r._newRoute({
        name: 'route_from_method'
      });
    });
    it('should create an alias(route type alias)', function() {
      var r;
      r = new Trocha({
        routes: {
          quick_alias: 'a.flash/alias',
          simple_alias: {
            $type: Trocha.ALIAS,
            $alias: 'the.simple.alias'
          },
          simple_alias_with_id: {
            $type: Trocha.ALIAS,
            $alias: 'the.simple.alias/with/id',
            $id: 'my_id'
          },
          simple_alias_with_method: {
            $type: Trocha.ALIAS,
            $alias: 'the.simple.alias/with?method',
            $method: Trocha.POST
          },
          The: {
            quick: {
              brown: {
                fox: {
                  jumps: {
                    over: {
                      the: {
                        lazy: {
                          dog: 'cat'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      });
      assert(r.simple_alias, {});
      assert(r.simple_alias.constructor.name, "Alias");
      assert(r.quick_alias.path(), 'a.flash/alias');
      assert(r.simple_alias.path(), 'the.simple.alias');
      assert(r.simple_alias_with_id.path(), 'the.simple.alias/with/id/:my_id');
      assert(r.simple_alias_with_method.path(), 'the.simple.alias/with?method');
      assert(r.simple_alias_with_method.$method, 'POST');
      assert(r.The.quick.brown.fox.jumps.over.the.lazy.dog.path(), '/The/quick/brown/fox/jumps/over/the/lazy/cat');
      assert(r.The.quick.brown.fox.jumps.over.the.lazy.dog.$as, 'The_quick_brown_fox_jumps_over_the_lazy_dog');
      r._newAlias({
        name: 'method_alias',
        alias: 'asd',
        id: 'qwe',
        method: Trocha.PATCH
      });
      r.The.quick.brown.fox.jumps.over.the.lazy._newAlias({
        name: 'cat',
        alias: 'tigger'
      });
      assert(r.The.quick.brown.fox.jumps.over.the.lazy.cat.path(), '/The/quick/brown/fox/jumps/over/the/lazy/tigger');
      assert(r.method_alias.path(), 'asd/:qwe');
      return assert(r.method_alias.$method, 'PATCH');
    });
    it('should create an resource(routes tree resource)', function() {
      var r;
      r = new Trocha({
        routes: {
          products: {
            $type: Trocha.RESOURCE,
            $id: "product_id"
          }
        }
      });
      assert(r.products.constructor.name, "Resource");
      assert(r.products.list.constructor.name, "Route");
      assert(r.products.list.path(), '/products');
      assert(r.products.new.path(), '/products/new');
      assert(r.products.show.path(), '/products/:product_id');
      assert(r.products.edit.path(), '/products/:product_id/edit');
      r._newResource({
        name: "services",
        id: "service_id"
      });
      assert(r.services.list.path(), '/services');
      assert(r.services.new.path(), '/services/new');
      assert(r.services.show.path(), '/services/:service_id');
      assert(r.services.edit.path(), '/services/:service_id/edit');
      return it('should create a custom resource', function() {
        r = new Trocha({
          routes: {
            products: {
              $type: Trocha.RESOURCE,
              $id: "product_id",
              $resource: {
                create: {
                  $method: Trocha.POST,
                  $parentId: false,
                  $hide: true
                },
                read: {
                  $hide: true
                },
                update: {
                  $method: Trocha.PATCH,
                  $hide: true
                },
                delete: {
                  $method: Trocha.DELETE,
                  $hide: true
                }
              }
            }
          }
        });
        assert(r.products.constructor.name, "Resource");
        assert(r.products.create.constructor.name, "Route");
        assert(r.products.create.path(), '/products');
        assert(r.products.create.$method, 'POST');
        assert(r.products.read.path(), '/products/:product_id');
        assert(r.products.read.$method, 'GET');
        assert(r.products.update.path(), '/products/:product_id');
        assert(r.products.update.$method, 'PATCH');
        assert(r.products.delete.path(), '/products/:product_id');
        assert(r.products.delete.$method, 'DELETE');
        r._newResource({
          name: "services",
          id: "service_id"
        });
        assert(r.services.list.path(), '/services');
        assert(r.services.new.path(), '/services/new');
        assert(r.services.show.path(), '/services/:service_id');
        return assert(r.services.edit.path(), '/services/:service_id/edit');
      });
    });
    return it('should create an scope(route type scope)', function() {});
  });
  // window.asd = r
  // it 'should create a valid trocha object', ->
  // 	r = new Trocha()
  // 	assert r, {}
  // 	assert r._newAlias, ->
  // 	assert r._newResource, ->
  // 	assert r._newRoute, ->
  // 	assert r._newScope, ->
  // 	assert r.$RESOURCE, {}
  // 	assertFunctionError r.path
  return route_types_test = void 0;
};

function_path_test = function() {
  describe('function path', function() {
    var myRoutes, myRoutesParams;
    myRoutesParams = {
      pre: '/templates', // note the /
      post: '-myH45H.html',
      domain: 'https://mydomain.net.co',
      routes: {
        town: {
          $id: 'town_name',
          house: {
            $id: 'address'
          }
        }
      }
    };
    myRoutes = new Trocha(_clone(myRoutesParams));
    return describe('path() diferent params', function() {
      it('no params', function() {
        assertFunctionError(myRoutes.path);
        assert(myRoutes.town.path(), '/town/:town_name');
        return assert(myRoutes.town.house.path(), '/town/:town_name/house/:address');
      });
      it('url', function() {
        var _myRoutes, _myRoutesParams;
        // true print domain if alwaysUrl is not set.
        assert(myRoutes.town.path(), '/town/:town_name');
        assert(myRoutes.town.path({
          url: true
        }), 'https://mydomain.net.co/town/:town_name');
        // false dnt print domain if alwaysUrl is set.
        _myRoutesParams = _clone(myRoutesParams);
        _myRoutesParams.alwaysUrl = true;
        _myRoutes = new Trocha(_myRoutesParams);
        assert(_myRoutes.town.path(), 'https://mydomain.net.co/town/:town_name');
        return assert(_myRoutes.town.path({
          url: false
        }), '/town/:town_name');
      });
      it('pre', function() {
        // true print prefix.
        assert(myRoutes.town.path(), '/town/:town_name');
        return assert(myRoutes.town.path({
          pre: true
        }), '/templates/town/:town_name');
      });
      it('post', function() {
        var _myRoutes, _myRoutesParams;
        // <Boolean> if post: true print the postfix, if post: false(note just false not undefined nor null nor 0) will ignore alwaysPost route param.
        assert(myRoutes.town.path(), '/town/:town_name');
        assert(myRoutes.town.path({
          post: true
        }), '/town/:town_name-myH45H.html');
        _myRoutesParams = _clone(myRoutesParams);
        _myRoutesParams.alwaysPost = true;
        _myRoutes = new Trocha(_myRoutesParams);
        assert(_myRoutes.town.path(), '/town/:town_name-myH45H.html');
        return assert(_myRoutes.town.path({
          post: false
        }), '/town/:town_name');
      });
      it('ext', function() {
        // true (extended) print prefix and postfix.
        assert(myRoutes.town.path(), '/town/:town_name');
        return assert(myRoutes.town.path({
          ext: true
        }), '/templates/town/:town_name-myH45H.html');
      });
      it('hide', function() {
        var _myRoutes, _myRoutesParams;
        // true Hide the last name of the path, if an id is setted it will appears anyway.
        assert(myRoutes.town.path({
          hide: true
        }), '/:town_name');
        _myRoutesParams = _clone(myRoutesParams);
        _myRoutesParams.routes.town.$hide = true;
        _myRoutes = new Trocha(_myRoutesParams);
        return assert(_myRoutes.town.path(), '/:town_name');
      });
      it('parentId', function() {
        // false Hide the parent route id.
        return assert(myRoutes.town.house.path({
          parentId: false
        }), '/town/house/:address');
      });
      it('id: false', function() {
        // false Hide the route id.
        assert(myRoutes.town.path({
          id: false
        }), '/town');
        return assert(myRoutes.town.house.path({
          id: false
        }), '/town/:town_name/house');
      });
      it('<someId>', function() {
        // <someId>: String set the value of some id of the route.
        assert(myRoutes.town.path({
          town_name: ''
        }), '/town/');
        assert(myRoutes.town.path({
          town_name: 'Engativá'
        }), '/town/Engativá');
        assert(myRoutes.town.house.path({
          address: 'calle_falsa'
        }), '/town/:town_name/house/calle_falsa');
        return assert(myRoutes.town.house.path({
          address: 'calle_falsa',
          town_name: false
        }), '/town/house/calle_falsa');
      });
      it('query', function() {
        // {<attribute>:<value>} Print a define query ?<attribute>=<value>&....
        assert(myRoutes.town.path({ // test trivial case
          query: {
            description: true
          }
        }), '/town/:town_name?description=true');
        assert(myRoutes.town.path({ // test multiple value case
          query: {
            description: true,
            pictures: 4
          }
        }), '/town/:town_name?description=true&pictures=4');
        assert(myRoutes.town.path({ // test array values case
          query: {
            an_array: ['qwe', 'asd', 'zxc']
          }
        }), '/town/:town_name?an_array[]=qwe&an_array[]=asd&an_array[]=zxc');
        assert(myRoutes.town.path({ // test array values case
          query: {
            an_array: ['qwe', 'asd', 'zxc'],
            ert: 1
          }
        }), '/town/:town_name?an_array[]=qwe&an_array[]=asd&an_array[]=zxc&ert=1');
        return assert(myRoutes.town.path({ // test posible breaking point
          query: {
            "ata?&ck": `&?=;:/\\ \t`
          }
        }), '/town/:town_name?ata%3F%26ck=%26%3F%3D%3B%3A%2F%5C%20%09');
      });
      return it('fragment', function() {
        // String Print the fragment #<value>.
        return assert(myRoutes.town.path({
          fragment: 'references'
        }), '/town/:town_name#references');
      });
    });
  });
  return function_path_test = void 0;
};

(function() {
  describe('Trocha JS Routes List engine', function() {
    constants_test();
    constructor_test();
    base_variables();
    routes_creation_test();
    route_types_test();
    return function_path_test();
  });
  return test.run();
})();

//# sourceMappingURL=test.js.map
