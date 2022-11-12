import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { VStack } from "@chakra-ui/react";

const AllUsers = () => {
    const [chats, setChats] = useState([]);
    const url = process.env.REACT_FRONTEND_URL || "http://localhost:5000";
    const fetchData = async () => {
        const { data } = await axios.get(`${url}/api/user`, { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } });
        setChats(data);
    }
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <VStack spacing="10px">
            <div style={{ width: "100vw", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>{chats.map(chat => (<div key={chat._id} style={{ borderBottom: "2px solid black", textAlign: "center" }}>{chat.firstName}  {chat.lastName}</div>))}</div>
        </VStack>
    )
}
export default AllUsers;
