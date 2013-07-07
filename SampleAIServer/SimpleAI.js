var net = require('net');
var server = net.createServer(function(c) { //'connection' listener
	console.log('Player connected');
	c.on('end', function() {
		console.log('Player disconnected');
	});
	c.on('data', function(data) {
<<<<<<< HEAD
		try
		{
			data = JSON.parse(data.toString());
		}
		catch(err)
		{
			console.log("Couldnt parse json");
		}
		console.log(data);
		var commands;
		if(data.GPS!=null)
		{
			var dx = data.GPS.TargetX-data.GPS.PositionX;
			var dz = data.GPS.TargetZ-data.GPS.PositionZ;
			//angle is in radians
			var angleToTarget = Math.atan(dx/dz);
			var forwardAngle = Math.atan(data.GPS.ForwardX/data.GPS.ForwardZ);
			var angle = angleToTarget-forwardAngle;
//			console.log("angletotarget");
//			console.log(angletotarget);
//			console.log("forwardAngle");
//			console.log(forwardAngle);
//			console.log("Angle");
//			console.log(angle);
			commands = {
						"Throttle" : 1.0
					};
			if(angle<.08 && angle>-.08)
			{
				commands.Steer=0.0;
			}
			else if(angle>.08)
			{
				commands.Steer=1.0;
			}
			else
			{
				commands.Steer=-1.0;
			}	
		}
		else
		{
			commands = {
				"Throttle" : 1.0,
				"Steer" : 0.0
			}
		}
=======
		console.log(data.toString());
		var commands = {
					"Steer" : 0.0,
					"Throttle" : 1.0
				};
		
>>>>>>> origin/master
		c.write(JSON.stringify(commands)+"\n");
	});
});
server.listen(3000, function() { //'listening' listener
	console.log('Server listening on port 3000!');
});
