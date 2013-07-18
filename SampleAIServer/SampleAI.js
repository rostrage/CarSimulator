var net = require('net');
//initialize a server
var server = net.createServer(function(c) { //'connection' listener
	console.log('Player connected');
	c.on('end', function() {
		console.log('Player disconnected');
	});
	//when we recieve data from the simulator
	c.on('data', function(data) {
		//convert the JSON string we recieved into a JSON object
		try
		{
			data = JSON.parse(data.toString());
		}
		catch(err)
		{
			console.log("Couldnt parse json");
		}
		
		//initialize the commands object, this is the object we send back to the car that contains the movement commands
		var commands;
		
		//if the car we are using has a GPS sensor
		if(data.GPS!=null)
		{
			//calculate the angle to the next GPS target based on our current GPS position
			var dx = data.GPS.TargetX-data.GPS.PositionX;
			var dz = data.GPS.TargetZ-data.GPS.PositionZ;
			//angle is in radians
			var angleToTarget = Math.atan(dx/dz);
			var forwardAngle = Math.atan(data.GPS.ForwardX/data.GPS.ForwardZ);
			var angle = angleToTarget+forwardAngle;
			console.log("angleToTarget");
			console.log(angleToTarget);
			console.log("forwardAngle");
			console.log(forwardangle);
			console.log("Angle");
			console.log(angle);
			
			//Always move at max speed for this simple AI.
			commands = {
						"Throttle" : 1.0
					};
					
			//if we are already headed towards the target, continue going straight
			if(angle<.08 && angle>-.08)
			{
				commands.Steer=0.0;
			}
			//if we are going too far to the right, correct and go to the left
			else if(angle>.08)
			{
				commands.Steer=1.0;
			}
			//if we are going too far to the left, correct and go to the right
			else
			{
				commands.Steer=-1.0;
			}	
		}
		//if we don't have a GPS, we are driving blind, and should just go straight
		else
		{
			commands = {
				"Throttle" : 1.0,
				"Steer" : 0.0
			}
		}
		
		//convert the commands back to a string, and send them to the simulator
		c.write(JSON.stringify(commands)+"\n");
	});
});

//set the port we want the server to run on
server.listen(3000, function() { //'listening' listener
	console.log('Server listening on port 3000!');
});
