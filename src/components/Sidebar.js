import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import './sidebarChat.css';
import SidebarChat from './sidebarChat';
import db from '../firebase';
import { useStateValue } from './StateProvider';

import { Avatar, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';



function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{user}, dispatch] = useStateValue();
  
  useEffect(() => {
    const unsubscribe = db.collection('rooms').onSnapshot(snapshot => (
      setRooms(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data(),
      })
      ))
    ));

  return() => {
    unsubscribe();
  };

}, [])


  return (
    <div className='sidebar'>
        <div className="sidebar__header">
          {/* Аватарка пользователя такая как и в аккаунте гугла */}
          <Avatar src={user ?.photoURL } />
          <div className="sidebar__headerRight">
            <IconButton>
              <DonutLargeIcon />
            </IconButton>
            <IconButton>
              <ChatIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
           
          </div>
        </div>
        
        <div className="sidebar__search">
          <div className="sidebar__searchContainer">
            <SearchIcon />
            <input placeholder='Поиск нужного чата' type='text'/>
          </div>
        </div>

        <div className="sidebar__chats">
          <SidebarChat addNewChat/>
         {rooms.map(room => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} /> 
         ))}
        </div>
    </div>
  );
}

export default Sidebar