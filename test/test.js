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
    results.toTest.push({
      title: title,
      fun: describeFun
    });
    return results.total++;
  };
  r.assert = function(result, expected) {
    if (data.result !== data.expected) {
      results.running.fail = true;
      return console.error("Expected ", data.expected, ", but was ", data.result);
    }
  };
  r.run = function() {
    while (results.toTest.length > 0) {
      results.running = results.toTest.pop();
      console.log("Testing " + results.running.title);
      results.running.fun();
      if (results.running.fail) {
        results.bad++;
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
