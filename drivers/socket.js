var socketIo = require('socket.io');

module.exports = function(app){
	return {
		io : null,

		init : function(){
			this.io = socketIo(app.server.instance);
			this.listen();
		},

		listen : function(){
			this.io.on('connection', function(socket){
				console.log('User connected');

				for (var i = 0; i < app.config.events.length; i++) {
					var _ev = app.config.events[i],
						_service = _ev.method.split('::')[0],
						_method = _ev.method.split('::')[1];

					socket.on(_ev.listener, app[_service][_method])
				}
				
				// user disconnection
				socket.on('disconnect', function(){
					console.log('user disconnected');
				});
			});

			
		}
	}
}