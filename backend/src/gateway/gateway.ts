import { OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { subscribe } from "diagnostics_channel";
import { Server } from "socket.io";

@WebSocketGateway()
export class MyGateWay implements OnModuleInit{
    @WebSocketServer()
    server!: Server;

    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log(socket.id);
            console.log("connected")
        })
    }

    // SubscribeMessage: Client -> Server
    // server.emit: Server -> Client
    // example: someone in react does socket.emit("newMessage") with the text "hello". The server listens to newMessage and receives that message, however all the other clients connected to this port didn't receive this message. the server does server.emit("onMessage") containing the body. So every client that is listening to onMessage will receive this message

    @SubscribeMessage("newMessage")
    onNewMessage(@MessageBody() body: any){
        console.log(body)
        this.server.emit('onMessage', {
            msg: "New Message",
            content: body,
        })
    }
}