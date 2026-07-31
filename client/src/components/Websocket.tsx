import { useContext, useEffect, useState } from "react";
import { WebsocketContext } from "../contexts/WebsocketContext";

//custom type
type MessagePayload = {
    content: string;
    msg: string;
}

export const Websocket = () => {

    const [value, setValue] = useState('');
    const [messages, setMessages] = useState<MessagePayload[]>([])
    // server socket
    const socket = useContext(WebsocketContext);

    // listen to events when component mounts
    useEffect(() => {
        socket.on("connect", () => {
            console.log("connected");
        })
        socket.on("onMessage", (message: MessagePayload) => {
            console.log("onMessage event received");
            console.log(message);
            setMessages((prev) => [...prev, message])
        });

        // when component unmounts unregister those events
        return () => {
            console.log("Unregistering Events...")
            socket.off("connect");
            socket.off("onMessage")
        }
    }, []);

    const onSubmit = () => {
        socket.emit('newMessage', value);
        setValue('');
    }

    return (
        <div>
            <div>
                <h1>Websocket Component</h1>
                <div>
                    {messages.length === 0 ? (<div>No Messages</div>) : (<div>{messages.map((msg) => (<div><p>{msg.content}</p></div>))}</div>)}
                </div>
                <div>
                    <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
                    <button onClick={onSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
};