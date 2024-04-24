// MongoDBクライアントの読み込み
const { MongoClient } = require("mongodb");
// Expressの読み込み
const express = require("express");

// MongoDBの接続文字列 (あなたのクライアントの情報に置き換えてください)
const uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";

// MongoClientのインスタンスを作成
const client = new MongoClient(uri);

// Expressアプリのインスタンスを作成
const app = express();

// サーバー起動
var server = app.listen(3000, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});

// ルートパスで基本情報を返す
app.get("/", function(req, res){
    res.json("rootやで");
});

// HelloWorldを返すテストAPI
app.get("/api/test", function(req, res){
    res.json("HelloWorld");
});

// 映画情報を返すAPI
app.get("/api/movie", async (req, res) => {
    try {
        // MongoDBクライアントを接続
        await client.connect();
        const database = client.db('sample_mflix');
        const movies = database.collection('movies');
        // 映画「Back to the Future」を検索
        const query = { title: 'Back to the Future' };
        const movie = await movies.findOne(query);
        
        if (movie) {
            res.json(movie);
        } else {
            res.status(404).json({ message: "Movie not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        // MongoDBクライアントの接続を閉じる
        await client.close();
    }
});
