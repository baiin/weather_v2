const functions = require('firebase-functions');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var cors = require('cors');
var port = 9000;
var helmet = require('helmet');

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

app.get('/city/:term', function(req, res){
        var url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + req.params.term + "&types=(cities)&key=AIzaSyD5b9hjjma1YUrhUsmo4CIdH2NOkxq2qWo";

        request.get(url, function(error, response, body){
                if(error == null){
                        res.set('Cache-Control', 'public, max-age=300, s-maxage-600');
                        res.send(body);
                }
                else{
                        res.send(error);
                }
        });
});

app.get('/weather/:term', function(req, res){

        var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" + req.params.term + "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

        request.get(url, function(error, response, body){
                if(error == null){
                        res.set('Cache-Control', 'public, max-age=300, s-maxage-600');
                        res.send(body);
                }
                else{
                        res.send(error);
                }
        });
});

app.get('/geo/:lat/:lng', function(req, res){
    var key = "AIzaSyCKZjc31iKMrApqZK0eiJM0ofC2kAJbpDk";
    var u = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + req.params.lat + "," + req.params.lng + "&key=" + key;

    request.get(u, function(error, response, body){
        res.send(body);
    });
});


// app.listen(port, function(){
//         console.log('listening on port ' + port);
// });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.app = functions.https.onRequest(app);