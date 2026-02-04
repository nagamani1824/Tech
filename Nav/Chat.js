import React, { useState } from 'react';
import './Chat.css'; // We'll create this for styling

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Welcome to Tech Store Support! I'm here to help you with product information, pricing, orders, and any questions you may have. How can I assist you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [menuLevel, setMenuLevel] = useState('main');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user' };
      setMessages([...messages, userMessage]);
      const currentInput = input;
      setInput('');

      if (currentInput.toLowerCase().includes('laptop') || currentInput.toLowerCase().includes('tablet') || currentInput.toLowerCase().includes('monitor') || currentInput.toLowerCase().includes('accessory')) {
        window.location.href = '/ab';
      } else {
        // Simulate bot response
        setTimeout(() => {
          const botResponse = getBotResponse(currentInput);
          setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
        }, 1000);
      }
    }
  };

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    if (input.includes('price') || input.includes('cost')) {
      return "For pricing information, please check our Offers section or visit our products page. We have competitive prices starting from ₹12,500.";
    }
    if (input.includes('shipping') || input.includes('delivery')) {
      return "We offer free shipping on orders over ₹50,000. Standard delivery takes 3-5 business days within India.";
    }
    if (input.includes('warranty') || input.includes('guarantee')) {
      return "All our products come with a 1-year manufacturer warranty. Extended warranty options are available for purchase.";
    }
    if (input.includes('return') || input.includes('refund')) {
      return "We have a 30-day return policy. Items must be in original condition with all accessories included.";
    }
    if (input.includes('support') || input.includes('help')) {
      return "I'm here to help! You can ask about products, pricing, shipping, or use our quick options above.";
    }
    const responses = [
      "Thank you for your inquiry. How else may I assist you?",
      "I understand. Let me help you with that information.",
      "Excellent question! I'm here to provide the details you need.",
      "We're committed to excellent service. What specific information are you looking for?",
      "As a professional support assistant, I'm equipped to help with all your tech needs."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const sendQuickMessage = (text) => {
    if (text === 'Menu') {
      setMenuLevel('menu');
      return;
    }
    if (text === 'Offers') {
      setMessages(prev => [...prev, { text: "Here are our current promotional offers:\n- Basic Laptop: ₹25,000\n- Entry Tablet: ₹12,500\n- Budget Laptop: ₹33,000\n- Simple Tablet: ₹16,500\n- Affordable Laptop: ₹29,000", sender: 'bot' }]);
      return;
    }
    if (text === 'Contact') {
      setMessages(prev => [...prev, { text: "You can reach us at:\nPhone: 60886025\nEmail: support@techstore.com\nWe're available Monday-Friday, 9AM-6PM", sender: 'bot' }]);
      return;
    }
    if (text === 'Help') {
      setMessages(prev => [...prev, { text: "Common questions:\n• Pricing: Check our Offers section\n• Shipping: Free over ₹50,000\n• Warranty: 1-year on all products\n• Returns: 30-day policy\nAsk me anything or use the Menu for product categories!", sender: 'bot' }]);
      return;
    }
    const userMessage = { text, sender: 'user' };
    setMessages([...messages, userMessage]);

    if (text.toLowerCase().includes('laptop') || text.toLowerCase().includes('tablet') || text.toLowerCase().includes('monitor') || text.toLowerCase().includes('accessory')) {
      window.location.href = '/ab';
    } else {
      // Simulate bot response
      setTimeout(() => {
        const botResponse = getBotResponse(text);
        setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
      }, 1000);
    }
  };

  const handleSubMenu = (text) => {
    setMenuLevel('main'); // Go back to main after selection
    sendQuickMessage(text);
  };

  const goBack = () => {
    setMenuLevel('main');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      {!isOpen && (
        <div className="chat-button" onClick={toggleChat}>
          💬 Support
        </div>
      )}
      {isOpen && (
        <div className={`chat-window ${isOpen ? 'open' : ''}`}>
          <div className="chat-header">
            <span>Tech Support</span>
            <button onClick={toggleChat} className="close-button">Close</button>
          </div>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="quick-buttons row "> 
            {menuLevel === 'main' ? (
              <>
                <button onClick={() => sendQuickMessage('Menu')}>Menu</button>
                <button onClick={() => sendQuickMessage('Offers')}>Offers</button>
                <button onClick={() => sendQuickMessage('Contact')}>Contact</button>
                <button onClick={() => sendQuickMessage('Help')}>Help</button>
              </>
            ) : (
              <>
                <button  onClick={goBack}>Back</button>
                <button onClick={() => handleSubMenu('Laptop')}>Laptop</button>
                <button onClick={() => handleSubMenu('Monitor')}>Monitor</button>
                <button onClick={() => handleSubMenu('Tablet')}>Tablet</button>
                <button onClick={() => handleSubMenu('Accessory')}>Accessory</button>
                <button onClick={() => handleSubMenu('Business')}>Business</button>
                <button onClick={() => handleSubMenu('Gaming')}>Gaming</button>
                
              </>
            ) 
            // (
            //   <>
            //   <button onClick={goBack}>Back</button>
            //   <button onClick={()=> handlesuboffers()}>Offers</button>
            //   </>

            // )
            
            }
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;