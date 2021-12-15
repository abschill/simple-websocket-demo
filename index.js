const WebSocket = require( 'ws' );


const wss = new WebSocket.WebSocketServer({ port: 8080 });

wss.on( 'connection', ( ws ) => {

    ws.on( 'message', ( data ) => {
        console.log( 'received: %s', data );
        wss.clients.forEach( ( client ) => {

            if ( client.readyState === WebSocket.OPEN ) {
              client.send( data.toString() );
            }
          });
    });

    ws.on( 'close', _ => {
        wss.clients.forEach(( client ) => {
             if ( client.readyState === WebSocket.OPEN ) {
               client.send( 'a user left' );
             }
           });
    } )
    

    ws.send( 'something' );
});