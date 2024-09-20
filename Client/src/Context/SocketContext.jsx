import { createContext } from "react";
import { useState } from "react";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [contetxsocket, contextsetSocket] = useState([]);
    return(
        <SocketContext.Provider value={{contetxsocket,contextsetSocket}}>{children}</SocketContext.Provider>
    )
}


