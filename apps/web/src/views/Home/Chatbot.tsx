import styles from './style.module.css'; // Import your CSS styles
import React, { useState } from 'react';
import axios from 'axios';

const Chatbot: React.FC<React.PropsWithChildren> = () => {


  const [isChatOpen, setChatOpen] = useState(false);

  const toggleChat = () => {
    setChatOpen(!isChatOpen);
  };

  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };
  const sendMessage2 = async () => {console.log('fi')}



    /*   const sendMessage = async () => {
        if (userInput.trim() !== '') {
          // Update the messages state with the new user message
          setMessages([...messages, { type: 'user', text: userInput }]);
          // Reset the user input
          setUserInput('');
    
          try {
            console.log('inside');
            // Make API request using Axios
            const response = await axios.post('http://127.0.0.1:5000/predict', {
              message: userInput,
            }, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
          
            const data = response.data;
            console.log(data);
            const prediction = data.answer;
          
            // Update the messages state with the API response
            setMessages([...messages, { type: 'bot', text: prediction }]);

           console.log(messages);


          } catch (error) {
            console.error('Error making API request:', error);
          }
        }
      }; */

      const sendMessage = async () => {
        if (userInput.trim() !== '') {
          try {
            console.log('inside');
            // Make API request using Axios
            const response = await axios.post('http://127.0.0.1:5000/predict', {
              message: userInput,
            }, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
      
            const data = response.data;
            console.log(data);
            const prediction = data.answer;
      
            // Update the messages state with the new user message and the API response
            setMessages([...messages, { type: 'visitor', text: userInput }, { type: 'operator', text: prediction }]);
          } catch (error) {
            console.error('Error making API request:', error);
          }
      
          // Reset the user input
          setUserInput('');
        }
      };
    
  



  return (
    <div className={styles.container}>
      <div className={styles.chatbox}>
{/*       <div className={`${styles.chatbox__support} ${styles['chatbox--active']}`}> */}
       <div className={`${styles.chatbox__support} ${isChatOpen ? styles['chatbox--active'] : ''}`}> 
          <div className={styles.chatbox__header}>
            <div className={styles['chatbox__image--header']}>
              <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png" alt="image" />
            </div>
            <div className={styles['chatbox__content--header']}>
              <h4 className={styles['chatbox__heading--header']}>Chat support</h4>
              <p className={styles['chatbox__description--header']}>Hi. My name is Sam. How can I help you?</p>
            </div>
          </div>
          <div className={styles['chatbox__messages']}>
            <div>

            {messages.map((message, index) => (
            <div key={index} className={`${styles['messages__item']} ${styles[`messages__item--${message.type}`]}`}>
              {message.text}
            </div>
          ))}


            </div>
          </div>
          <div className={styles['chatbox__footer']}>
            <input type="text" placeholder="Write a message..."  value={userInput}
            onChange={handleInputChange}
            />
            <button    className={`${styles['chatbox__send--footer']} ${styles['send__button']}`}
            onClick={sendMessage}>Send</button>
          </div>
        </div>
        <div className={styles['chatbox__button']}>
          <button onClick={toggleChat}><img src="/images/chatbox-icon.svg" /></button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot