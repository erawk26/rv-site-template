const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const PurifyCSSPlugin = require('purifycss-webpack')
const BabiliPlugin = require('babili-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const publicPath = '/'

exports.publicPath = publicPath

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    watchOptions: {
      ignored: /node_modules/
    },
    publicPath,
    // Enable history API fallback so HTML5 History API based
    // routing works. Good for complex setups.
    historyApiFallback: true,

    // Display only errors to reduce the amount of output.
    stats: 'errors-only',

    // Parse host and port from env to allow customization.
    //
    // If you use Docker, Vagrant or Cloud9, set
    // host: options.host || '0.0.0.0';
    //
    // 0.0.0.0 is available to all network devices
    // unlike default `localhost`.
    host, // Defaults to `localhost`
    port, // Defaults to 8080

    // overlay: true is equivalent
    overlay: {
      errors: true,
      warnings: false
    }
  }
})

exports.loadPug = (options) => ({
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'html-loader'
          },
          {
            loader: 'pug-html-loader',
            options
          }
        ]
      }
    ]
  }
})

exports.loadVue = (options) => ({
	module: {
		rules: [
			{
				test: /\.vue$/,
				exclude: /node_modules/,
				loader: 'vue-loader',
				options: {
					// loaders: {
					// 	scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
					// 	sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
					// },

					// `preLoaders` are attached before the default loaders.
					// You can use this to pre-process language blocks - a common use
					// case would be build-time i18n.
//					preLoaders: {
//						js: '/path/to/custom/loader'
//					},

					// `postLoaders` are attached after the default loaders.
					//
					// - For `html`, the result returned by the default loader
					//   will be compiled JavaScript render function code.
					//
					// - For `css`, the result will be returned by `vue-style-loader`
					//   which isn't particularly useful in most cases. Using a PostCSS
					//   plugin will be a better option.
					postLoaders: {
						html: 'babel-loader'
					},

					// `excludedPreLoaders` should be regex
					excludedPreLoaders: /(eslint-loader)/
				}
			}
		]
	}
})
exports.extractBundles = (bundles) => ({
  plugins: bundles.map((bundle) => (
    new webpack.optimize.CommonsChunkPlugin(bundle)
  ))
})

exports.lintJS = ({ include, exclude, options }) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        enforce: 'pre',
        loader: 'eslint-loader',
        options
      }
    ]
  }
})

const sharedCSSLoaders = [
  {
    loader: 'css-loader',
    options: {
      localIdentName: '[hash:base64:5]'
    }
  }
]

exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => [require('autoprefixer')]
  }
})

exports.purifyCSS = (options) => ({
  plugins: [
    new PurifyCSSPlugin(options)
  ]
})

exports.minifyCSS = ({ options }) => ({
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessorOptions: options,
      canPrint: true // false for analyzer
    })
  ]
})

exports.loadCSS = ({ include, exclude, use } = {}) => ({
  module: {
    rules: [
      {
        test: /\.scss$/,

        include,
        exclude,

        use: [
          {
            loader: 'style-loader'
          },
          ...sharedCSSLoaders.concat(use)
        ]
      }
    ]
  }
})

exports.extractCSS = ({ include, exclude, use } = {}) => {
  // Output extracted CSS to a file
  const plugin = new ExtractTextPlugin({
    filename: 'styles/[name].[contenthash:8].css',
    allChunks: true
  })

  return {
    module: {
      rules: [
        {
          test: /\.scss$/,

          include,
          exclude,

          use: plugin.extract({
            use: sharedCSSLoaders.concat(use),
            fallback: 'style-loader'
          })
        }
      ]
    },
    plugins: [plugin]
  }
}

exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|svg)$/,

        include,
        exclude,

        use: {
          loader: 'url-loader',
          options
        }
      }
    ]
  }
})

exports.optimizeImages = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/i,

        include,
        exclude,

        use: {

          loader: 'image-webpack-loader',
	        options: {
		        bypassOnDebug: true,
		        mozjpeg: {
			        progressive: true,
			        quality: 65
		        },
		        // optipng.enabled: false will disable optipng
		        optipng: {
			        enabled: false,
		        },
		        pngquant: {
			        quality: '65-90',
			        speed: 4
		        },
		        gifsicle: {
			        interlaced: false,
		        },
		        // the webp option will enable WEBP
		        webp: {
			        quality: 75
		        }
	        }
        }
      }
    ]
  }
})

exports.loadFonts = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        // Capture eot, ttf, woff, and woff2
        test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,

        include,
        exclude,

        use: {
          loader: 'file-loader',
          options
        }
      }
    ]
  }
})

exports.loadJS = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,

        include,
        exclude,

        loader: 'babel-loader',
        options
      }
    ]
  }
})

exports.minifyJS = () => ({
  plugins: [
    new BabiliPlugin()
  ]
})

exports.setFreeVariable = (key, value) => {
  const env = {}
  env[key] = JSON.stringify(value)

  return {
    plugins: [
      new webpack.DefinePlugin(env)
    ]
  }
}

exports.page = ({
  path = '',
  template = require.resolve(
    'html-webpack-plugin/default_index.ejs'
  ),
  title,
  entry,
  chunks
} = {}) => ({
  entry,
  plugins: [
    new HtmlWebpackPlugin({
      filename: `${path && path + '/'}index.html`,
      template,
      title,
      chunks
    })
  ]
})
