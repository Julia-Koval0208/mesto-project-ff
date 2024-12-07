const path = require("path"); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // module.exports — это синтаксис экспорта в Node.js
  entry: { main: "./src/index.js" }, //точка входа
  output: {
    // точка выхода
    path: path.resolve(__dirname, "dist"), // путь
    filename: "main.js", // имя файла
    publicPath: "", // св-во для обновления путей внутри css- и html-файлов
  },

  mode: "development", // добавили режим разработчика
  devServer: {
    static: path.resolve(__dirname, "./dist"), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
    open: true, // сайт будет открываться сам при запуске npm run dev
  },
  module: {
    rules: [
      // rules — это массив правил
      // добавим в него объект правил для бабеля
      {
        // регулярное выражение, которое ищет все js файлы
        test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader
        use: "babel-loader",
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: "/node_modules/",
      },
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource", //позволяет переносить исходные файлы в конечную сборку в том же формате.
      },
      {
        // применять это правило только к CSS-файлам
        test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader", //Если вы используете директиву @import в css-файлах, после подключения postcss-loader, нужно изменить то, как подключается css-loader.
            options: { importLoaders: 1 }, //Значение 1 говорит о том, что некоторые трансформации PostCSS нужно применить до css-loader
          },
          "postcss-loader",
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // путь к файлу index.html
    }),

    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
};
