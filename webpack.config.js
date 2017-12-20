module.exports = {
    entry: './index.js', //for now, eentry is index in root of whole folder
    output: {
        path: __dirname,
        filename: './public/bundle.js' //im assuming bundle will be in the public folder
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
                    presets: ['react', 'env']
                }
            }
        ]
    }
};