var express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	app = express(),
	http = require('http').Server(app),
	io = require('socket.io')(http),
	define = require('./routes/defineFacebook').facebookManagement,
	facebookDefine = new define();

app.set('views', path.join(__dirname, 'views/'));
app.set('view engine', 'jade');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(require('stylus').middleware({src: __dirname + '/public'}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/url'));

io.on('connection', function(socket){
    socket.on('disconnect', function(){
    	console.log('user disconnected');
    });
    socket.on('message', function(msg){
    	facebookDefine.parseFacebook(msg, function(retData){
    		io.emit('message', retData);
    	})
    });
});

http.listen(88);

module.exports = app;
