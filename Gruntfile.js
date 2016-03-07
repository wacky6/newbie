
/* include trailing slash, or you will end up in trouble */
var wwwBin   = 'www-bin/'
var blogBin  = wwwBin+'Blog/'
var blogList = blogBin+'list.json'
var relative = require('path').relative

var postcss = () => require('poststylus')([
    require('autoprefixer')({browsers: '> 5%, last 2 versions'})
])

module.exports = function(grunt){

  grunt.initConfig({
    views: {
      files:     'view/**/*.tmpl',
      outputDir: wwwBin
    },
    blog: {   // configuration for blog related tasks!
      files:          'Blog/**/*.md',
      bloglist:        blogList,
      articleTemplate: 'view/blog-article.tmpl',
      indexTemplate:   'view/blog-index.tmpl',
      outputDir:       blogBin
    },
    stylus: {
      options: { compress: false, use: [postcss] },
      index: {
        files: {[wwwBin+'index.css']: "stylus/index.styl"}
      },
      base: {
        files: {[wwwBin+'base.css']:  "stylus/base.styl"}
      },
      about: {
        files: {[wwwBin+'About/about.css']:  "stylus/about.styl"}
      }
    },
    embed: {
      all: {
        options: { threshold: 0 },
        files: [{ expand:true, cwd: wwwBin, src: ['**/*.html'], dest: wwwBin }]
      }
    },
    babel: {
      webjs: {
        options: {
            sourceMap: true,
            presets: ['es2015'],
            plugins:[]
        },
        files: [{ expand:true, cwd: 'www/', src: ['**/*.js', '!*.min.js'], dest: wwwBin }]
      }
    },
    jshint: {
      node: {
        files: {src: ['*.js', 'lib/**/*.js']},
        options: {
          asi:    true,
          node:   true,
          eqeqeq: true,
          esnext: true,
          laxbreak: true
        }
      }
    },
    watch: {
      options: {spawn: false, event: ['added', 'changed']},
      stylus: {
        files: ['stylus/{page-skeleton,color-palette,nav}.styl'],
        tasks: ['stylus']
      },
      stylusCommon: {
          files: ['stylus/_*.styl'],
          tasks: ['stylus']
      },
      stylusIndex: {
          files: ['stylus/index.styl'],
          tasks: ['stylus:index']
      },
      stylusBase: {
          files: ['stylus/base.styl'],
          tasks: ['stylus:base']
      },
      stylusAbout: {
          files: ['stylus/about.styl'],
          tasks: ['stylus:about']
      },
      node: {
        files: ['*.js'],
        tasks: ['jshint:node']
      },
      webjs: {
        files: ['www/**/*.js'],
        tasks: ['babel:webjs']
      },
      blog: {
        files: ['Blog/**/*.md'],
        tasks: ['blog']
      },
      views: {
        files: ['view/*.tmpl', '!view/{template, nav}.tmpl', '!view/{blog-article, blog-index}.tmpl'],
        tasks: ['views']
      },
      blog_template: {
        files: ['view/blog-{article, index}.tmpl'],
        tasks: ['blog']
      },
      template: {
        files: ['view/common-*.tmpl', 'view/nav.tmpl'],
        tasks: ['blog', 'views']
      }
    }
  })

  grunt.loadNpmTasks('grunt-postcss')
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-stylus')
  grunt.loadNpmTasks('grunt-babel')
  grunt.loadNpmTasks('grunt-embed')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.registerTask('blog', require('./grunt-blog') )
  grunt.registerTask('views', require('./grunt-views') )
  grunt.registerTask('clean', ()=>grunt.file.delete(wwwBin) )

  grunt.registerTask('deploy', 'Deploy to server', [
    'clean',
    'stylus',
    'babel',
    'views',
    'blog',
    'jshint'
  ])


  grunt.event.on('watch', function(action, path, target){
    switch (target) {
    case 'node':
      grunt.config.set('jshint.node.src', path)
    break
    case 'webjs':
      grunt.config.set('babel.dist.src', path)
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
