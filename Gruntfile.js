'use strict'

const join = require('path').join

const BUILD = 'build/'
    , BUILD_BLOG = join(BUILD,  'blog')

const PAGE = 'page/'
    , BLOG = 'blog/'

module.exports = function(grunt){

  grunt.initConfig({
    page: {
      files:     [join(PAGE, '**/*.tmpl'), '!'+join(PAGE, '**/_*.tmpl')],
      outputDir: BUILD
    },
    blog: {   // configuration for blog related tasks!
      files:           join(BLOG, '**/*.md'),
      articleTemplate: join(PAGE, 'blog/_article.tmpl'),
      indexTemplate:   join(PAGE, 'blog/_index.tmpl'),
      outputDir:       BUILD_BLOG
    },
    stylus: {
      files:     ['stylus/**/*.styl', '!stylus/**/_*.styl'],
      includes:  ['stylus/'],
      outputDir: BUILD
    },
    copy: {
      external: {
          files: [{expand: true, cwd: 'external/', src: ['**/*'], dest: BUILD}]
      },
      page_resource: {
          files: [{expand: true, cwd: PAGE, src: ['**/*', '!**/*.tmpl', '!**/*.js'], dest: BUILD}]
      }
    },
    embed: {
      all: {
        options: { threshold: 0, deleteEmbeddedFiles: true },
        files: [{ expand:true, cwd: BUILD, src: ['**/*.html'], dest: BUILD }]
      }
    },
    babel: {
      webjs: {
        options: {
            sourceMap: true,
            presets: ['es2015'],
            plugins: []
        },
        files: [{ expand:true, cwd: PAGE, src: ['**/*.js', '!*.min.js'], dest: BUILD }]
      }
    },
    eslint: {
      target: ['*.js', 'lib/**/*.js', 'route/**/*.js']
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
      external: {
          files: ['external/**/*'],
          tasks: ['copy']
      },
      webjs: {
        files: [join(PAGE, '**/*.js')],
        tasks: ['babel:webjs']
      },
      blog: {
        files: [join(BLOG, '**/*.md')],
        tasks: ['blog']
      },
      page: {
        files: [join(PAGE, '*.tmpl'), '!'+join(PAGE, '_*.tmpl')],
        tasks: ['page']
      },
      blog_template: {
        files: [join(PAGE, 'blog/_*.tmpl')],
        tasks: ['blog']
      },
      template: {
        files: [join(PAGE, '_*.tmpl')],
        tasks: ['blog', 'page']
      }
    }
  })

  grunt.loadNpmTasks('grunt-eslint')
  grunt.loadNpmTasks('grunt-babel')
  grunt.loadNpmTasks('grunt-embed')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.registerTask('blog', require('./lib/grunt-blog') )
  grunt.registerTask('page', require('./lib/grunt-page') )
  grunt.registerTask('stylus', require('./lib/grunt-stylus') )
  grunt.registerTask('clean', ()=>{
    if (grunt.file.exists(BUILD))
      grunt.file.delete(BUILD)
    grunt.file.mkdir(BUILD)
  })

  grunt.registerTask('deploy', 'Deploy to server', [
    'clean',
    'stylus',
    'copy',
    'babel',
    'page',
    'blog',
    'embed',
    'eslint'
  ])


  grunt.event.on('watch', (action, path, target)=>{
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
      grunt.config.set('page.src', null)
      grunt.config.set('blog.src', null)
    break
    case 'blog_template':
      grunt.config.set('blog.src', null)
    break
    case 'page':
      grunt.config.set('page.src', path)
    break
    case 'stylusCommon':
      grunt.config.set('stylus.src', null)
    break
    case 'stylus':
      grunt.config.set('stylus.src', path)
    break
    case 'external':
      grunt.config.set('copy.external.src', path)
    break
    default:
    break
    }
  })
}
