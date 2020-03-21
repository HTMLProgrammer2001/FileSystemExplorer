const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin'),
	  HtmlWebpackPlugin = require('html-webpack-plugin');

let conf = {
	entry: {
		main: './src/js/main.js'
	},
	output: {
		filename: 'js/[name].js',
		path: path.resolve(__dirname, './dist')
	},
	devServer: {
		overlay: true
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				exclude: '/node_modules/'
			},
			{
				test: /\.(scss|css)$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ['css-loader', 'sass-loader']
				})
			},
			{
				test: /\.html$/,
				use: ['file-loader?name=[name].html', 'extract-loader', 'html-loader']
			},
			{
				test: /\.(pug|jade)$/,
				use: ['file-loader?name=[name].html', 'extract-loader', 'html-loader', 'pug-html-loader']
			},
			{
				test: /\.(png|jpg|svg)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: 'assets/[name].[ext]'
					}
				}
			}

		]
	},
  	plugins: [
  		new webpack.ProvidePlugin({
			$: 'jquery',
			React: 'react',
			ReactDOM: 'react-dom'
		}),
    	new ExtractTextPlugin("css/[name].css")
  	],

	resolve: {
		alias: {
			pages: path.resolve(__dirname, 'src/pages/'),
			scss: path.resolve(__dirname, 'src/scss/'),
			js: path.resolve(__dirname, 'src/js/'),
			css: path.resolve(__dirname, 'src/css/'),
			assets: path.resolve(__dirname, 'src/assets/'),
			modules: path.resolve(__dirname, 'node_modules')
		},
        extensions: ['.js', '.jsx']
	}
};




module.exports = (env, options) => {
	let mode = options.mode === 'production';

	conf.devtool = mode ? false : 'source-map';

	return conf;
};
