import React from 'react';
import { ChatContainer } from '@/components/ChatContainer/ChatContainer';

const Chatbot: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <ChatContainer />
    </div>
  );
};

export default Chatbot;
