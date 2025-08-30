const http = require("http");
const axios = require("axios");

const server = http.createServer(async(req,res) => {
  try {
    //Open Weather Map APIを叩く
    const resoponse = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?q=London&appid=c746351501d6f38a224e8ddaca66188a"
    );

    const data = response.data;

    //ブラウザにHTMLとして返す
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    res.end(`
      <html>
        <head><title>天気アプリ</title></head>
        <body>
          <h1>ロンドンの天気</h1>
          <p>天気: ${data.weather[0].main } (${data.weather[0].description})</p>
          <p>気温: ${data.main.temp} ℃</p>
          <p>湿度: ${data.main.humidity} %</p>
          <p>風速: ${data.wind.speed} m/s</p>
        </body>
      </html>
      `);

  }catch (error) {
    res.writeHead(500, {"Content-Type": "text/plain; charset=utf-8" });
    res.end("APIエラーが発生しました");
    console.error(error);
  }

});

server.listen(3000, () => {
  console.log("http://localhost:3000でサーバー起動中");

});




