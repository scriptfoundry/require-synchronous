require-synchronous
===================

A synchronous version of Require.js for use with optimized files produced
using [the Require.js AMD framework](https://github.com/jrburke/requirejs)

Why would you need this?
------------------------

Require.js is a very powerful library for breaking large, complex JavaScript
projects into smaller, well organized modules and loading them asynchronously.
Require.js also features an optimizer that bundles all used modules into a
single file for faster download without any change in behaviour. It is very
strongly recommended that you stick to Require.js's pattern of asynchronous
loading, but there are times when this is not possible and can lead to race
conditions in sites that requires code to be loaded in a specific order or
that need code to be in a certain state by a certain point on your page.

Require-synchronous allows you load optimized code and then execute it
immediately, where you need it.

The reason this library was written was to allow synchronous legacy code to be
replaced with Require.js modules.

Why don't you make a pull request on the Require.js repository
--------------------------------------------------------------
I consider Require.js's asynchronous model to be superior to synchronous
models and I wrote this basically to handle an edge case. I consider it a shim
that doesn't have a place in Require.js's code base. 

How do I use this?
------------------

* **optimize** your code using the [Require.js
  optimizer](http://requirejs.org/docs/optimization.html)
* **save** require-synchronous.min.js to your server
* **change** your page code to use require-synchronous.js instead of
  require.js (note that `data-main` will no longer work)
* **load** our optimized code at the point where you need it to be executed

Notes
-----

require-synchronous temporarily overrides any existing methods called
`require()` and `declare()` and restores them as soon as it is completed. This
means that at present it can only be used once (every time `require()` is
invoked, the previous version of require will be restored.) If you find you
need to use this code several times on one page, you should probably consider
more serious architectural changes.
