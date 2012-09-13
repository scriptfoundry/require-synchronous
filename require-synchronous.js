/*
Copyright (c) 2012 Andrew Adamson

Released under the MIT license
http://opensource.org/licenses/mit-license.php
*/

(function () {
	var self = {},
		originalDefine = window.define,
		originalRequire = window.require,
		modules = [];

	var define = function (id, deps, fn) {
		if (id !== 'requireLib' && id !== 'text') {
			modules.push({"id": id, "deps": deps, "fn": fn});
		}
	};
	
	
	
	var require = function (deps, fn) {
		var sortedModules = [],
			unsortedModules = [],
			resolvedDeps = {},
			maxAttempts = 1000,
			module,
			dep,
			depList,
			canAdd,
			i,
			j;

		unsortedModules = ([]).concat(modules);
		while (unsortedModules.length > 0 && --maxAttempts > 0) {
			
			for (i = unsortedModules.length - 1; i >= 0; i--) {
				canAdd = true;
				module = unsortedModules[i];
				
				for (j = 0; j < module.deps.length; j++) {
					dep = module.deps[j];
					if (resolvedDeps[dep] === undefined) {
						canAdd = false;
						break;
					}
				}
				if (canAdd) {
					resolvedDeps[module.id] = module;
					sortedModules.push(unsortedModules.splice(i,1)[0]);
				}
			}
		}

		for (i = 0; i < sortedModules.length; i++) {
			module = sortedModules[i];
			depList = [];
			for (j = 0; j < module.deps.length; j++) {
				depList.push(resolvedDeps[module.deps[j]]);
			}
			resolvedDeps[module.id] = module.fn.apply(this, depList);
		}
		
		depList = [];
		for (i = 0; i < deps.length; i++) {
			depList.push(resolvedDeps[deps[i]]);
		}

		fn.apply(this, depList);

		window.define = originalDefine || function () {};
		window.require = originalRequire || function () {};
	};
	
	window.define = define;
	window.require = require;
	window.require.config = function() {};

	return self;
} ());