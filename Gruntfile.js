
/* include trailing slash, or you will end up in trouble */
var wwwBin   = 'www-bin/'
var blogBin  = wwwBin+'Blog/'
var blogList = blogBin+'list.json'
var relative = require('path').relative

module.exports = function(grunt){

  grunt.initConfig({
    views: {
      files:     'view/**/*.swig',
      outputDir: wwwBin
    },
    blog: {   // configuration for blog related tasks!
      files:          'Blog/**/*.md',
      bloglist:        blogList,
      articleTemplate: 'view/blog-article.swig',
      indexTemplate:   'view/blog-index.swig',
      outputDir:       blogBin
    },
    postcss: {
      options: {
        processors: [
          require('autoprefixer')({browsers: '> 5%, last 2 versions'})
        ]
      },
      all: {
        files: [{ expand:true, cwd: 'www/', src: '**/*.css', dest: wwwBin }]
      }
    },
    jshint: {
      web: {
        files: [{ expand:true, cwd: 'www/', src: '**/*.js' }],
        options: {
          asi:     true,
          browser: true,
          globalstrict: true,
          predef:  [ "$", "$$",
                     "injectHeight", "injectGradualFadeInDelay",
                     "forEachIn", "getComputedHeight" ]
        }
      },
      node: {
        files: [{ expand:true, cwd: './', src: '*.js' }],
        options: {
          asi:    true,
          node:   true,
          eqeqeq: true,
          esnext: true
        }
      }
    },
    watch: {
      css: {
        files: ['www/**/*.css'],
        tasks: ['postcss'],
        options: {spawn: false, event: ['added', 'changed']}
      },
      node: {
        files: ['*.js'],
        tasks: ['jshint:node'],
        options: {spawn: false, event: ['added', 'changed']}
      },
      webjs: {
        files: ['www/**/*/js'],
        tasks: ['jshint:web'],
        options: {spawn: false, event: ['added', 'changed']}
      },
      blog: {
        files: ['Blog/**/*.md'],
        tasks: ['blog'],
        options: {spawn: false, event: ['added', 'changed']}
      },
      views: {
        files: ['view/*.swig', '!view/{template, nav}.swig', '!view/{blog-article, blog-index}.swig'],
        tasks: ['views'],
        options: {spawn: false, event: ['added', 'changed']}
      },
      blog_template: {
        files: ['view/blog-{article, index}.swig'],
        tasks: ['blog'],
        options: {spawn: false, event: ['added', 'changed']}
      },
      template: {
        files: ['view/{template, nav}.swig'],
        tasks: ['blog', 'views'],
        options: {spawn: false, event: ['added', 'changed']}
      }
    }
  })

  grunt.loadNpmTasks('grunt-postcss')
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.registerTask('blog', require('./grunt-blog') )
  grunt.registerTask('views', require('./grunt-views') )

  grunt.registerTask('deploy', 'Deploy to server', [
    'postcss',
    'views',
    'blog',
    'jshint'
  ])


  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.event.on('watch', function(action, path, target){
    switch (target) {
    case 'node':
      grunt.config.set('jshint.node.src', path)
    break
    case 'webjs':
      grunt.config.set('jshint.web.src', path)
    break
    case 'css':
      grunt.config.set('postcss.all.files', undefined)
      grunt.config.set('postcss.all.src', path)
      grunt.config.set('postcss.all.dest', wwwBin+relative('www/', path))
    break
    case 'blog':
      grunt.config.set('blog.src', path)
    break
    case 'template': // force a full generation
      grunt.config.set('views.src', null)
      grunt.config.set('blog.src', null)
    break
    case 'blog_template':
      grunt.config.set('blog.src', null)
    break
    case 'views':
      grunt.config.set('views.src', path)
    break;
    }
  })
}
