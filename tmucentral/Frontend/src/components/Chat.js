import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Talk from 'talkjs';
import { Session, Inbox } from '@talkjs/react';
import { useAuth } from "../contexts/AuthContext" 

function Chat() {
  // Get the current user's email by querying the database
  const PORT = process.env.PORT || 3005;
  const url = `https://tmucentral.onrender.com/api/database/getUserEmail`;

  const { currentUser } = useAuth();
  const email = currentUser.email;
  const location = useLocation();
  let { sellerEmail } = location.state || {};

  // If there is no seller email then use the user's email
  if (!sellerEmail) {
    sellerEmail = email;
  }

  // Create a new talk with the the current user
  const syncUser = useCallback(
    () =>
      new Talk.User({
        id: email,
        name: email.split('@')[0],
        email: email,   
        role: 'buyer',
      }),
    []
  );

  // Add the seller to the conversation as well
  const syncConversation = useCallback((session) => {
    const roomID = email + '-' + sellerEmail.sellerEmail;
    const conversation = session.getOrCreateConversation(roomID);

    const other = new Talk.User({
      id: sellerEmail,
      name: sellerEmail.split('@')[0],
      email: sellerEmail,     
      role: 'seller',
    });
    conversation.setParticipant(session.me);
    conversation.setParticipant(other);

    return conversation;
  }, []);

  // Displaying the chat using the talk.js API with user and conversation above
  return (
    <Session appId="t5jYSKwc" syncUser={syncUser}>
      <Inbox
        syncConversation={syncConversation}
        style={{ width: '100%', height: '85vh' }}
      ></Inbox>
    </Session>
  );
}

export default Chat;
