import React from 'react';
import './App.css';
import {auth} from './firebase/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import {SignIn, SignOut} from './components/Auth';
import ChatRoom from './components/ChatRoom';

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>Game Lobby 🔥💬</h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}

export default App;