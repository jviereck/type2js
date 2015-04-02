// =============================================================================
// Define a minimal type runtime.

var $T = (function($T) {

  // ===========================================================================
  // BASE TYPES

  // Defines JavaScript's number type.
  //
  // The `jsValue` denotes the value as defined in the JS program if it is known
  // to the type checker when the `NumType` is created.
  var NumType = function(jsValue) {
    this.jsValue = jsValue;
  }

  NumType.prototype.addBinaryOp = function(rhs) {
    if (rhs instanceof NumType) {
      // TODO: How to indicate if the jsvalue is not known at the program point?
      return new NumType(this.jsValue + rhs.jsValue);
    } else if (rhs instanceof StrType) {
      // Perform implicit conversion to StrType here.
      return new StrType(this.jsValue + rhs.jsValue);
    } else {
      // TODO: make this more useful in the future :)
      throw new Error('Cannot apply binary operator!');
    }
  }

  // Defines JavaScript's string type.
  var StrType = function(jsValue) {
    this.jsValue = jsValue;
  }

  StrType.prototype.addBinaryOp = function(rhs) {
    if (rhs instanceof StrType) {
      // TODO: How to indicate if the jsvalue is not known at the program point?
      return new StrType(this.jsValue + rhs.jsValue);
    } else if (rhs instanceof NumType) {
      // Perform implicit conversion to StrType here.
      return new StrType(this.jsValue + rhs.jsValue);
    } else {
      // TODO: make this more useful in the future :)
      throw new Error('Cannot apply binary operator!');
    }
  }

  // ===========================================================================
  // BINARY OPERATORS

  var defaultAddBinaryOperator = function(lhs, rhs) {
    return lhs.addBinaryOp(rhs);
  }

  var strictAddBinaryOperator = function(lhs, rhs) {
    if ((lhs.constructor === NumType || lhs.constructor === StrType) &&
        lhs.constructor === rhs.constructor)
    {
      return defaultAddBinaryOperator(lhs, rhs);
    } else {
      throw new Error('Try to apply binary operation to values of different types.')
    }
  }

  // ===========================================================================
  // EXPOSE TO THE WORLD

  // By default, use the `defaultAddBinaryOperator` for binary operations.
  $T.addBinaryOp = defaultAddBinaryOperator;

  // If invoked, switch the implementation for the binary operation.
  $T.useStrictBinaryOperators = function() {
    $T.addBinaryOp = strictAddBinaryOperator;
  }

  // Expose the types to the type context and wrap them in a function to make
  // the generation easier.
  $T.Num = function(jsValue) { return new NumType(jsValue) };
  $T.Str = function(jsValue) { return new StrType(jsValue) };

  return $T;
})({});

// =============================================================================
// Example programs to "type check".

var example_simple = function() {
  console.log('=== BEGIN example_simple');

  var a = $T.Num(1);
  var b = $T.addBinaryOp(a, $T.Num(2));
  var c = $T.addBinaryOp(b, $T.Str('Hello World'));

  console.log('=== FINISH example_simple');
}

var example_simple_strict = function() {
  console.log('=== BEGIN example_simple_strict');

  $T.useStrictBinaryOperators();

  var a = $T.Num(1);
  var b = $T.addBinaryOp(a, $T.Num(2));

  // This line will throw an error now as adding an integer and a string.
  // > Error: Try to apply binary operation to values of different types.
  var c = $T.addBinaryOp(b, $T.Str('Hello World'));

  console.log('=== FINISH example_simple_strict');
}

// Type check the programs by simply, well, executing them.
example_simple();
example_simple_strict();


