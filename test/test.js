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
    if (data.result !== data.expected) {
      results.running.fail = true;
      return console.error("Expected ", data.expected, ", but was ", data.result);
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
    return describe('Constructor', function() {
      return it('should create a valid trocha object', function() {
        var r;
        r = trocha();
        return console.log(r);
      });
    });
  });
})();

test.run();
