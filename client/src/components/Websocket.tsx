import { useContext, useEffect } from "react";
import { WebsocketContext } from "../contexts/WebsocketContext";

export const Websocket = () => {

    // server socket
    const socket = useContext(WebsocketContext);

    // listen to events when component mounts
    useEffect(() => {
        socket.on("connect", () => {
            console.log("connected");
        })
        socket.on("onMessage", (data) => {
            console.log("onMessage event received");
            console.log(data);
        });

        // when component unmounts unregister those events
        return () => {
            console.log("Unregistering Events...")
            socket.off("connect");
            socket.off("onMessage")
        }
    }, []);

    return (
        <div>
            <div>
                <h1>Websocket Component</h1>
            </div>
        </div>
    );
};