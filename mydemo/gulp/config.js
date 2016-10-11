var dest = "./build";
var src = './src';

module.exports = {
  browserSync: {
    server: {
      // Serve up our build folder
      baseDir: dest + '/examples',
      routes: {
        '/' : dest
      }
    }
  },
  sass: {
    src: src + "/styles",
    dest: dest,
    settings: {
      indentedSyntax: true, // Enable .sass syntax!
      imagePath: '/assets/img' // Used by the image-url helper
    }
  },
  images: {
    src: src + "/images/**",
    dest: dest + "/assets/img"
  },
  fonts: {
    src: src + '/fonts/**/*.html',
    dest: dest + '/assets/fonts'
  },
  markup: {
    src: src + '/htdocs/**',
    dest: dest + '/examples'
  },
  jsLibs: {
    src: src + '/javascript/_lib/**',
    dest: dest + '/assets/js/lib'
  },
  browserify: {
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      entries: src + '/javascript/main.js',
      dest: dest,
      outputName: 'bee3D.js'
    }]
  },
  json: {
    src: src + '/javascript/*.json'
  },
  production: {
    css: dest + '/assets/css',
    js: dest + '/assets/js',
    dest: dest
  }
};
