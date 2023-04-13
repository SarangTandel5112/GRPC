const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "./news.proto";
const express = require('express')

const app = express()

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const NewsService = grpc.loadPackageDefinition(packageDefinition).NewsService;

const client = new NewsService(
    "localhost:50051",
    grpc.credentials.createInsecure()
);



app.listen(3111, () => {
    console.log("client started at 3111");
})

app.get('/getall', (req, res) => {
    client.getAllNews({}, (error, news) => {
        if (error) {
            console.log(error, '-------error--------');
            throw error
        }
        console.log(news, '------news-------');
        res.json(news)
    });
    // client.getNews({ id: '1' }, (error, news) => {
    //     if (error) {
    //         console.log(error, '-----error------');
    //         throw error
    //     }
    //     console.log(news, '------news-------');
    //     res.json(news)
    // });
})

