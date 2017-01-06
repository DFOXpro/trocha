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
      fun: describeFun
    };
    if (results.running) {
      desc.parent = results.running;
    }
    results.toTest.push(desc);
    return results.total++;
  };
  r.assert = function(result, expected) {
    if ('object' === typeof result) {
      if ('object' !== typeof expected) {
        results.running.fail = true;
        return console.error("Expected any object, but was ", result);
      }
    } else if ('function' === typeof expected) {
      if ('function' !== typeof result) {
        results.running.fail = true;
        return console.error("Expected any function, but was ", result);
      }
    } else if (result !== expected) {
      results.running.fail = true;
      return console.error("Expected ", expected, ", but was ", result);
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
        console.error("Failed with ", e);
      }
      if (results.running.fail) {
        results.bad++;
        if (results.running.parent && !results.running.parent.fail) {
          results.running.parent.fail = true;
          results.bad++;
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
  return describe('Trocha Js Routes List engine', function() {
    describe('Constants', function() {
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
      return it('should return default resource tree', function() {
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
    });
    return describe('Constructor', function() {
      return it('should create a valid trocha object', function() {
        var r;
        assert(trocha, function() {});
        r = trocha();
        return assert(r, {});
      });
    });
  });
})();

test.run();
