
/* include trailing slash, or you will end up in trouble */
var wwwBin   = 'www-bin/'
var blogBin  = wwwBin+'Blog/'
var blogList = blogBin+'list.json'

module.exports = function(grunt){

  grunt.initConfig({
    views: {
      files:     ['view/*.tmpl', '!view/_*.tmpl'],
      outputDir: wwwBin
    },
    blog: {   // configuration for blog related tasks!
      files:          'Blog/**/*.md',
      bloglist:        blogList,
      articleTemplate: 'view/Blog/_article.tmpl',
      indexTemplate:   'view/Blog/_index.tmpl',
      outputDir:       blogBin
    },
    stylus: {
      files:     ['stylus/**/*.styl', '!stylus/**/_*.styl'],
      includes:  ['stylus/'],
      outputDir: wwwBin
    },
    copy: {
      css: {
          files: [{expand: true, cwd: 'stylus/', src: ['**/*.css'], dest: wwwBin}]
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
      stylusCommon: {
          files: ['stylus/**/_*.styl'],
          tasks: ['stylus']
      },
      stylus: {
          files: ['stylus/**/*.styl', '!stylus/**/_*.styl'],
          tasks: ['stylus']
      },
      staticCss: {
          files: ['stylus/**/*.css'],
          tasks: ['copy']
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
        files: ['view/*.tmpl', '!view/_.tmpl'],
        tasks: ['views']
      },
      blog_template: {
        files: ['view/Blog/_*.tmpl'],
        tasks: ['blog']
      },
      template: {
        files: ['view/_*.tmpl'],
        tasks: ['blog', 'views']
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-babel')
  grunt.loadNpmTasks('grunt-embed')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.registerTask('blog', require('./grunt-blog') )
  grunt.registerTask('views', require('./grunt-views') )
  grunt.registerTask('stylus', require('./grunt-stylus') )
  grunt.registerTask('clean', ()=>{
    if (grunt.file.exists(wwwBin))
      grunt.file.delete(wwwBin)
    grunt.file.mkdir(wwwBin)
  })

  grunt.registerTask('deploy', 'Deploy to server', [
    'clean',
    'stylus',
    'copy',
    'babel',
    'views',
    'blog',
    'embed',
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
    break
    case 'stylusCommon':
      grunt.config.set('stylus.src', null)
    break
    case 'stylus':
      grunt.config.set('stylus.src', path)
    break
    }
  })
}
