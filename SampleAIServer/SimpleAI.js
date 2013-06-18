var net = require('net');
var server = net.createServer(function(c) { //'connection' listener
	console.log('Player connected');
	c.on('end', function() {
		console.log('Player disconnected');
	});
	c.on('data', function(data) {
		console.log(data.toString());
		var commands = {
					"Steer" : 0.0,
					"Throttle" : 1.0
				};
		
		c.write(JSON.stringify(commands)+"\n");
	});
});
server.listen(3000, function() { //'listening' listener
	console.log('Server listening on port 3000!');
});
