import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { getMessages } from '../services/api';

const socket = io('http://localhost:5000');

const ChatRoom = ({ chatRoom }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        socket.emit('joinRoom', chatRoom);

        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.disconnect();
        };
    }, [chatRoom]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const data = await getMessages(chatRoom);
                setMessages(data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };
        fetchMessages();
    }, [chatRoom]);

    const sendMessage = () => {
        socket.emit('message', { chatRoom, content: message });
        setMessage('');
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg.content}</div>
                ))}
            </div>
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatRoom;
