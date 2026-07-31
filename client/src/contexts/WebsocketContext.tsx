import { createContext } from "react";
import {io, Socket} from "socket.io-client";

export const socket = io("http://localhost:9001");
export const WebsocketContext = createContext<Socket>(socket) // one socket connection, otherwise i would create multiple socket connections using this: export const socket = io(localhost)
export const WebsocketProvider = WebsocketContext.Provider;