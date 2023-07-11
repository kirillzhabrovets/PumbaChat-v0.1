import React, { useEffect, useState } from 'react';
import { Avatar, IconButton } from '@mui/material';
import { AttachFile, MoreVert, SearchOutlined, AddReaction, KeyboardVoice } from '@mui/icons-material';
import { useParams } from 'react-router';
import firebase from 'firebase/compat/app';
// import userEvent from '@testing-library/user-event';

import "./Chat.css";
import db from "../firebase";
import { useStateValue } from "./StateProvider";

function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] =useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            db.collection('rooms')
                .doc(roomId).onSnapshot((snapshot) => 
                setRoomName(snapshot.data().name));
            //в firebase создаем коллекцию с name, message и timestamp и при помощи useEffect реализуем в проекте
            db.collection('rooms')
                .doc(roomId).collection('messages')
                .orderBy('timestamp', 'asc').onSnapshot(snapshot => (
                    setMessages(snapshot.docs.map(doc => doc.data()))
                ))
        }
    }, [roomId])

    useEffect (()=>{
        setSeed(Math.floor(Math.random()* 5000));
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("Вы написали >>>", input);

        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput("");
    };


  return (
    <div className='chat'>
        <div className="chat__header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="chat__headerInfo">
                <h3>{roomName}</h3>
                {/* Опираясь на последнее написанное сообщение мы говорим когда собеседник был онлайн */}
                <p>
                    Был онлайн {" "}
                {new Date(
                  messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}
                </p>
            </div>

            <div className="chat__headerRight">
                <IconButton>
                    <SearchOutlined />
                </IconButton>
                <IconButton>
                    <AttachFile />
                </IconButton>
                <IconButton>
                    <MoreVert />
                </IconButton>
            </div>
        </div>


        <div className="chat__body">
            {messages.map((message) => (
                <p className={`chat__message ${message.name === user.displayName && "chat__reciever"}`}>
                    <span className='chat__name'>{message.name}</span>
                        {message.message}

    {/* Метод toUTCString возвращает дату и время привычную для восприятия строку */}                   
                    <span className='chat__timestamp'>
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                </p>
            ))}
        </div>

        <div className="chat__footer">
            <AddReaction />
            <form>
                <input value={input} onChange={e => setInput(e.target.value)} placeholder='Напишите сообщение' type="text" />
                <button onClick={sendMessage} type='submit'>Отправить сообщение</button>
            </form>
            <KeyboardVoice />
        </div>
    </div>
  )
}

export default Chat