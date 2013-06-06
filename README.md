# grunt-hash

Append a unique hash to the end of a filename for cache busting. For example:

examples/test1.js => examples/dist/test1.b93fd451.js

##Grunt 0.4

This task now depends on grunt 0.4.x. Please see the [grunt 0.3 to 0.4 migration guide][migration_guide] for more details.

If you are still using grunt 0.3, please install grunt-hash 0.1x

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-hash`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-hash');
```

[grunt]: http://gruntjs.com/
[getting_started]: https://github.com/gruntjs/grunt/blob/master/docs/getting_started.md

## Documentation

```javascript
grunt.initConfig({
	hash: {
		src: 'examples/*.js',  //all your js that needs a hash appended to it
		basePath: 'static/', //base path of your src
        flatten: false, // wether or not to flatten the output - default is true
		mapping: 'examples/assets.json', //mapping file so your server can serve the right files
		dest: 'examples/dist/' //where the new files will be created
	}
});
grunt.loadNpmTasks('grunt-hash');
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## License
Copyright (c) 2012 Greg Allen  
Licensed under the MIT license.

[migration_guide]: https://github.com/gruntjs/grunt/wiki/Upgrading-from-0.3-to-0.4
