import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const app = express()
const config = require('../../config/webpack.prod');
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler,config.devServer))

app.use(webpackHotMiddleware(compiler))

app.use(express.static('dist'))

app.listen(config.devServer.port,()=>{
    console.log(`App server is running on port ${config.devServer.port}`)
})