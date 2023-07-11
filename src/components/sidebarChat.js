import React, { useState, useEffect } from 'react';
import './sidebarChat.css';
import { Avatar } from '@mui/material';
import db from '../firebase';
import { Link } from "react-router-dom";

function SidebarChat({ id, name, addNewChat }) {
    const [seed, setSeed] = useState("");
    const [messages, setMessages] = useState("");

    // Выводим в правом блоке под названием чата последнее сообщение написанное в данном чате
    useEffect(() => {
      if (id) {
        db.collection('rooms')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => 
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
      }
    }, []);


    useEffect (() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    const createChat = () => {
      const roomName = prompt ("Введите название чата");
      if (roomName) {
        // Работа с бд для создания нового чата
        db.collection('rooms').add({
          name: roomName,
        });
      }
    };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className='sidebarChat'>
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
          <div className="sidebarChat__info">
              <h2>{name}</h2>
              <p>{messages[0]?.message}</p>
          </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className='sidebarChat'><h2>Добавить чат</h2></div>
  )
}

export default SidebarChat