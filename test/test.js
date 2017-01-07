var test, testFramework;

testFramework = function(options) {
  var r, results;
  results = {
    running: null,
    toTest: [],
    total: 0,
    bad: 0
  };
  r = {};
  r.it = function(doString, itFun) {
    console.log(doString);
    return itFun();
  };
  r.describe = function(title, describeFun) {
    var desc;
    desc = {
      title: title,
      fun: describeFun,
      failWarning: function() {
        this.fail = true;
        results.bad++;
        return console.error(this.title + " failed.");
      }
    };
    if (results.running) {
      desc.parent = results.running;
    }
    results.toTest.push(desc);
    return results.total++;
  };
  r.assert = function(result, expected) {
    var bw;
    bw = ", but was:";
    if ('object' === typeof expected) {
      if ('object' !== typeof result) {
        results.running.fail = true;
        return console.error("Expected any object" + bw, result);
      }
    } else if ('function' === typeof expected) {
      if ('function' !== typeof result) {
        results.running.fail = true;
        return console.error("Expected any function" + bw, result);
      }
    } else if (result !== expected) {
      results.running.fail = true;
      return console.error("Expected ", expected, bw, result);
    }
  };
  r.run = function() {
    var e, error;
    while (results.toTest.length > 0) {
      results.running = results.toTest.pop();
      console.log("Testing " + results.running.title);
      try {
        results.running.fun();
      } catch (error) {
        e = error;
        results.running.fail = true;
        console.error("Exception caught", e);
      }
      if (results.running.fail) {
        results.running.failWarning();
        if (results.running.parent && !results.running.parent.fail) {
          results.running.parent.failWarning();
        }
      }
    }
    return console.log("Of " + results.total + " tests, " + results.bad + " failed, " + (results.total - results.bad) + " passed.");
  };
  r;
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

(function() {
  return describe('Trocha JS Routes List engine', function() {
    describe('Route creation', function() {
      it('should create routes via JSON Constructor', function() {
        var r;
        r = trocha({
          routes: {
            simple_route: {},
            simple_scope: {
              $type: trocha.SCOPE
            },
            simple_alias: "simple_alias",
            simple_resource: {
              $type: trocha.RESOURCE,
              $id: "simple_id"
            }
          }
        });
        assert(r.simple_route, {});
        assert(r.simple_scope, {});
        assert(r.simple_resource, {});
        return assert(r.simple_alias, "simple_alias");
      });
      return it('should create routes via post init functions', function() {
        var r;
        r = trocha();
        r._newRoute({
          name: "simple_route"
        });
        r._newScope({
          name: "simple_scope"
        });
        r._newResource({
          name: "simple_resource",
          id: "simple_id"
        });
        r._newAlias({
          name: "simple_alias",
          alias: "simple_alias"
        });
        assert(r.simple_route, {});
        assert(r.simple_scope, {});
        assert(r.simple_resource, {});
        assert(r.simple_alias, "simple_alias");
        return console.log(r);
      });
    });
    describe('Constants returns', function() {
      it('should return HTTP request methods types', function() {
        assert(trocha.OPTIONS, "OPTIONS");
        assert(trocha.GET, "GET");
        assert(trocha.HEAD, "HEAD");
        assert(trocha.POST, "POST");
        assert(trocha.PUT, "PUT");
        assert(trocha.PATCH, "PATCH");
        assert(trocha.DELETE, "DELETE");
        assert(trocha.TRACE, "TRACE");
        return assert(trocha.CONNECT, "CONNECT");
      });
      it('should return default resource tree', function() {
        return assert(trocha.$RESOURCE, {
          $id: 'id',
          show: {
            $hide: true
          },
          edit: {},
          "new": {
            $id: false
          },
          list: {
            $hide: true,
            $id: false
          }
        });
      });
      return it('should return routes types', function() {
        assert(trocha.ROUTE, "ROUTE");
        assert(trocha.SCOPE, "SCOPE");
        return assert(trocha.RESOURCE, "RESOURCE");
      });
    });
    return describe('Constructor', function() {
      return it('should create a valid trocha object', function() {
        var r;
        assert(trocha, function() {});
        r = trocha();
        assert(r, {});
        assert(r._custom, function() {});
        assert(r._newResource, function() {});
        assert(r._newRoute, function() {});
        return assert(r._newScope, function() {});
      });
    });
  });
})();

test.run();
