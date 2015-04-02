# Type2JS

What if I tell you the type checker is nothing else than executing your JavaScript code in the type domain?

# Demo

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
