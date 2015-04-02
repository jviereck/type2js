# Type2JS

What if I tell you the type checker is nothing else than executing your JavaScript code in the type domain?

# Demo

## Binary operator example

Input program:

```js
// File hello_world.js
var a = 1;
var b = a + 2;
var c = b + 'Hello World';
```

Let's transform this into the type domain:

```bash
$ t2js hello_word.js -o hello_world_type.js
```

The result will look like this:

```js
var a = $T.Num(1);
var b = $T.addBinaryOp(a, $T.Num(2));
var c = $T.addBinaryOp(b, $T.Str('Hello World'));
```

And if we want to use stricter binary operators (the ones that throw if they
add together a string an a number for instance):

```bash
$ t2js hello_word.js --strictBinaryOps -o hello_world_type.
```

The new output looks like:

```js
$T.useStrictBinaryOperators();

var a = $T.Num(1);
var b = $T.addBinaryOp(a, $T.Num(2));

// This line will throw an error now as adding an integer and a string.
// > Error: Try to apply binary operation to values of different type.
var c = $T.addBinaryOp(b, $T.Str('Hello World'));
```

## Note

At this point the `t2js` tool does not exist yet. But you can give it
still a try by executing the file `example.js` using `node/iojs`:

```bash
➜  type2js git:(master) iojs example.js
=== BEGIN example_simple
=== FINISH example_simple
=== BEGIN example_simple_strict
/Users/jviereck/develop/type2js/example.js:61
      throw new Error('Try to apply binary operation to values of different ty
            ^
Error: Try to apply binary operation to values of different types.
    at Object.strictAddBinaryOperator [as addBinaryOp] (/Users/jviereck/develop/type2js/example.js:61:13)
    at example_simple_strict (/Users/jviereck/develop/type2js/example.js:107:14)
    at Object.<anonymous> (/Users/jviereck/develop/type2js/example.js:114:1)
    at Module._compile (module.js:410:26)
    at Object.Module._extensions..js (module.js:428:10)
    at Module.load (module.js:335:32)
    at Function.Module._load (module.js:290:12)
    at Function.Module.runMain (module.js:451:10)
    at startup (node.js:123:18)
    at node.js:868:3
```
