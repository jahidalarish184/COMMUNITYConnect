
import { useState, useRef, useEffect } from "react";
import { SendHorizontal, X, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

// Mock user data
const currentUser = {
  id: 1,
  name: "Current User",
  avatar: "https://randomuser.me/api/portraits/lego/1.jpg"
};

const contacts = [
  {
    id: 2,
    name: "Sarah Johnson",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    status: "online",
    lastSeen: "Just now"
  },
  {
    id: 3,
    name: "Michael Chen",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    status: "offline",
    lastSeen: "2 hours ago"
  },
  {
    id: 4,
    name: "Emma Rodriguez",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    status: "online",
    lastSeen: "Just now"
  }
];

// Mock conversation data
const initialMessages = [
  {
    id: 1,
    senderId: 2,
    receiverId: 1,
    text: "Hi there! Just wanted to check if you're coming to the community garden event this weekend?",
    timestamp: "10:30 AM"
  },
  {
    id: 2,
    senderId: 1,
    receiverId: 2,
    text: "Yes, I'm planning to be there! What time does it start again?",
    timestamp: "10:32 AM"
  },
  {
    id: 3,
    senderId: 2,
    receiverId: 1,
    text: "It starts at 10 AM. I'll be bringing some extra gardening tools if you need any.",
    timestamp: "10:33 AM"
  },
  {
    id: 4,
    senderId: 1,
    receiverId: 2,
    text: "Perfect! I'll bring some refreshments for everyone.",
    timestamp: "10:35 AM"
  }
];

const Messaging = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [activeContact, setActiveContact] = useState(contacts[0]);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Automatically scroll to the bottom of messages when they change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isMinimized) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim() === "") return;
    
    const newMsg = {
      id: messages.length + 1,
      senderId: currentUser.id,
      receiverId: activeContact.id,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage("");
    
    // In a real app, this would send the message to the server
    toast({
      title: "Message Sent",
      description: `Message sent to ${activeContact.name}`,
      duration: 2000,
    });
  };

  const filteredMessages = messages.filter(
    msg => 
      (msg.senderId === currentUser.id && msg.receiverId === activeContact.id) || 
      (msg.senderId === activeContact.id && msg.receiverId === currentUser.id)
  );

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-accent1-500 text-white rounded-full p-4 shadow-lg hover:bg-accent1-600 transition-colors z-50"
        aria-label="Open chat"
      >
        <MessageSquare size={24} />
      </button>
      
      {/* Chat Window */}
      {isOpen && (
        <div 
          className={`fixed bottom-6 right-6 bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-300 z-50 w-80 sm:w-96 ${
            isMinimized ? 'h-16' : 'h-[32rem]'
          }`}
        >
          {/* Chat Header */}
          <div className="bg-accent1-500 text-white p-4 flex items-center justify-between">
            <div className="flex items-center">
              {!isMinimized && (
                <Avatar className="mr-2 h-8 w-8">
                  <img src={activeContact.avatar} alt={activeContact.name} />
                </Avatar>
              )}
              <div>
                <h3 className="font-medium">{isMinimized ? 'Community Chat' : activeContact.name}</h3>
                {!isMinimized && (
                  <span className="text-xs text-white/80">
                    {activeContact.status === 'online' ? 'Online' : activeContact.lastSeen}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <button 
                onClick={toggleMinimize} 
                className="text-white/80 hover:text-white mr-2"
                aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
              >
                {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
              </button>
              <button 
                onClick={toggleChat} 
                className="text-white/80 hover:text-white"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>
          
          {!isMinimized && (
            <>
              <div className="grid grid-cols-3 h-[calc(100%-8rem)]">
                {/* Contacts Sidebar */}
                <div className="col-span-1 border-r border-gray-200 overflow-y-auto">
                  <div className="p-3">
                    <h4 className="font-medium text-sm text-gray-500 mb-2">Contacts</h4>
                    <ul className="space-y-1">
                      {contacts.map(contact => (
                        <li 
                          key={contact.id}
                          onClick={() => setActiveContact(contact)}
                          className={`p-2 rounded cursor-pointer flex items-center ${
                            activeContact.id === contact.id 
                              ? 'bg-accent1-50 text-accent1-600' 
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          <Avatar className="h-8 w-8 mr-2">
                            <img src={contact.avatar} alt={contact.name} />
                          </Avatar>
                          <div className="overflow-hidden">
                            <div className="font-medium text-sm truncate">{contact.name}</div>
                            <div className="text-xs text-gray-500 flex items-center">
                              <span 
                                className={`inline-block w-2 h-2 rounded-full mr-1 ${
                                  contact.status === 'online' ? 'bg-green-500' : 'bg-gray-300'
                                }`}
                              ></span>
                              {contact.status === 'online' ? 'Online' : contact.lastSeen}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Messages Area */}
                <div className="col-span-2 flex flex-col">
                  <div className="flex-1 p-3 overflow-y-auto">
                    <div className="space-y-3">
                      {filteredMessages.map(message => (
                        <div 
                          key={message.id}
                          className={`flex ${message.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[80%] rounded-lg px-3 py-2 ${
                              message.senderId === currentUser.id 
                                ? 'bg-accent1-500 text-white' 
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>
                            <span className={`text-xs mt-1 block ${
                              message.senderId === currentUser.id 
                                ? 'text-white/80' 
                                : 'text-gray-500'
                            }`}>
                              {message.timestamp}
                            </span>
                          </div>
                        </div>
                      ))}
                      <div ref={messageEndRef} />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Message Input Area */}
              <div className="border-t border-gray-200 p-3">
                <form onSubmit={handleSendMessage} className="flex items-center">
                  <Input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 mr-2"
                  />
                  <Button type="submit" size="icon" className="bg-accent1-500 hover:bg-accent1-600">
                    <SendHorizontal size={18} />
                  </Button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

// Extra MessageSquare component to avoid dependency on lucide-react import
const MessageSquare = ({ size }: { size: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

export default Messaging;
