const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  plugins: [ new HtmlWebpackPlugin({ template: "./src/infra/ui/index.html" }) ],
  devServer: {
    port: 3000,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: ["babel-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: ["file-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg)$/,
        use: [{
          loader: "url-loader",
          options: { limit: false }
        }],
        exclude: /node_modules/
      }
    ]
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@domain": path.resolve(__dirname, "src/domain"),
      "@controllers": path.resolve(__dirname, "src/controllers"),
      "@infra": path.resolve(__dirname, "src/infra")
    }
  }
}