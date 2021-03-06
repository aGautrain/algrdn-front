import React, { useEffect } from "react"
import { io } from "socket.io-client";
import OrderTable from "./OrderTable"


// Composant qui doit permettre de gérer la logique des sockets, et c'est ce composant
// qui appelle le tableau en lui passant en paramètre les ordres

const Home: React.FC<{ token: string }> = ({ token }) => {

    useEffect(() => {
        const socket = io('http://127.0.0.1:4001')
        socket.on("order", (data: string) => {
          console.info('received order', data)
        })
      }, []);

    return (
        <OrderTable orders={[]} />
    )
}

export default Home