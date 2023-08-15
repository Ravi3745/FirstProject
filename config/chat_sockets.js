module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer ,{         
            allowEIO3: true,
            cors:{             
                origin:'http://localhost:5000',
                methods:['GET','POST']         
            }  
       });
    // this will receive the connection request
    io.sockets.on('connection', function(socket){
        console.log('new connection received', socket.id);
        socket.on('disconnect', function(){
            console.log('socket disconnected!');
        });
        socket.on('join_room', function(data){
            console.log('joining request received', data);
            // this will join the chatroom(codeial) if present if not than create the chatroom 
            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joined', data);
       
        });

        // detect send_message and broadcast to everyone in the room
        socket.on('send_message', function(data){
            io.in(data.chatroom).emit('receive_message', data);
        });
    });
}