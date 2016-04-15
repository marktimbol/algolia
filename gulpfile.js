var elixir = require('laravel-elixir');
var bowersPath = '../../../bower_components/';
/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.sass('app.scss')
    	.scripts([
    		bowersPath + 'jquery/dist/jquery.js',
    		bowersPath + 'typeahead.js/dist/typeahead.bundle.js',
    	], 'public/js/public.js')

    	.browserify('components/Search.js')

    	.version([
	    	'public/js/public.js'
	    ]);
});
