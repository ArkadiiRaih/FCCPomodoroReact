module.exports = (env) => {
    return ({
        mode: env.mode,
        module: {
            rules: 
            [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ["babel-loader"]
                },
                {
                    test: /\.s[ac]ss$/,
                    use: [
                        "style-loader",
                        "css-loader",
                        "sass-loader"
                    ]
                },
                {
                    test: /\.wav$/,
                    use: ["file-loader"]
                },
                {
                    test: /\.jpe?g$/,
                    use: "url-loader"
                }
            ]
        },
        output: {
            filename: "bundle.js"
        },
        devServer: {
            contentBase: "./dist",
            compress: true,
            port: 8080,
            watchContentBase: true,
            progress: true
        }
    });
};