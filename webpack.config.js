const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
	entry: './src/scripts/index.js',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'scripts/[name].js',
		assetModuleFilename: 'images/[name][ext]',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(scss|css)$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
			},
			{
				test: /\.(png|jpe?g|gif|svg|webp)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff2?|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.html$/i,
				loader: 'html-loader',
				options: {
					minimize: false,
					sources: {
						list: [
							{
								tag: 'img',
								attribute: 'src',
								type: 'src',
							},
							{
								tag: 'source',
								attribute: 'srcset',
								type: 'src',
							},
							{
								tag: 'use',
								attribute: 'href',
								type: 'src',
							},
						],
					},
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src', 'template.html'),
			filename: 'index.html',
			inject: 'body',
			minify: false,
			scriptLoading: 'defer',
			templateParameters: {
				basePath: '/images/',
			},
		}),
		new FileManagerPlugin({
			events: {
				onStart: {
					delete: ['dist'],
				},
				onEnd: {
					copy: [
						{
							source: path.join(__dirname, 'src', 'assets', 'img'),
							destination: 'dist/images',
						},
						{
							source: path.join(__dirname, 'src', 'scripts'),
							destination: 'dist/scripts',
						},
					],
					delete: ['dist/scripts/index.js'],
				},
			},
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
	],
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		port: 9000,
		watchFiles: ['src/**/*'],
		client: {
			overlay: false,
		},
	},
	optimization: {
		minimizer: [
			new ImageMinimizerPlugin({
				test: /\.(png|jpe?g|gif|svg)$/i,
				minimizer: {
					implementation: ImageMinimizerPlugin.imageminMinify,
					options: {
						plugins: [
							['gifsicle', { interlaced: true }],
							['jpegtran', { progressive: true }],
							['optipng', { optimizationLevel: 5 }],
							['svgo', { name: 'preset-default' }],
						],
					},
				},
			}),
		],
	},
	resolve: {
		alias: {
			'@scripts': path.resolve(__dirname, 'src', 'scripts'),
		},
	},
};
