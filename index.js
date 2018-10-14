var fs = require('fs');
var http = require('http');
const Raspi = require('raspi-io');
var io = require('socket.io')(3000);
var five = require("johnny-five");

//Cria o servidor HTTP para gerar o client
http.createServer(function(req, res) {
	res.write( fs.readFileSync('html/index.html', 'utf8') );
	res.end();
}).listen(80);

//Gerencia as conexoes do client com o servidor
io.on('connection', function (socket) {

	console.log("Nova conexao");

});

//Inicia a comunicação com o GPIO da placa
var board = new five.Board({
	io: new Raspi()
});

//Manipula os eventos GPIO
board.on("ready", function() {
	
	var btn = new five.Button({
		pin: 'P1-7'
	});	

	/*
	btn.on("press", function() {
		console.log("Apertado");
		io.sockets.emit('change','close');
	});
	*/

	btn.on("release", function() {
		console.log("Soltado");
		io.sockets.emit('change','ON');
	});

	btn.on("hold", function() {
		console.log("Pressionado");
		io.sockets.emit('change','OFF');
	});

});