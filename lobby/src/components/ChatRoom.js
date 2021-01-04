import React, {useState, useRef} from 'react';
import {auth, firestore, firebase} from '../firebase/firebaseConfig';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const ChatRoom = () => {
    const dummy = useRef();
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);
    const [messages] = useCollectionData(query, { idField: 'id' });
    const [formValue, setFormValue] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();
        const { uid, photoURL } = auth.currentUser;

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        })
        setFormValue('');
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (<>
        <main>
            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
            <span ref={dummy}></span>
        </main>
        <form onSubmit={sendMessage}>
            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Message... " />
            <button type="submit" disabled={!formValue}>SEND</button>
        </form>
    </>)
}


const ChatMessage = (props) => {
    const { text, uid, photoURL } = props.message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (<>
        <div className={`message ${messageClass}`}>
        <img alt='IMG' src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
        <p>{text}</p>
        </div>
    </>)
}

export default ChatRoom;