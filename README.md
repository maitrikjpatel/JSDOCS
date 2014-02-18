#JSDOCS
-----
##Generating JS documentation using Docco. 


###Getting Started

- Install this grunt plugin next to your project's grunt.js gruntfile with: 
	
		npm install grunt-docco --save-dev

- Then add this line to your project's grunt.js gruntfile:

		grunt.loadNpmTasks('grunt-docco');

-----		
###Documentation

- Add the task config to the grunt initConfig block.

    	docco: {
	      debug: {
    	    src: ['test/**/*.js'],
        	options: {
	          output: 'docs/'
    	    }
	      }
	    }
	    
-----	 
###Example usage

Show help:

	docco --help
	
Install project dependencies with npm install.

	npm install
	
Run Grunt with grunt.

	grunt	
	
JS docuemntations will be generated in *.html files in Docs directory.