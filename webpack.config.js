const path = require("path");

module.exports = {
    entry: "./src/gl.js", // Entry file
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js", // Output file
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, // Transpile JS and JSX files
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx"], // Resolve JS and JSX extensions
    },
    mode: "development",
};
