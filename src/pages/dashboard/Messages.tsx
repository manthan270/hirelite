import React, { useState } from 'react';
import { Search, Send, MoreVertical, Phone, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { INBOX } from '@/lib/constants';

export default function Messages() {
    const [activeChat, setActiveChat] = useState(INBOX[0]);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! We loved your profile. Are you available for a quick chat this week regarding the Frontend role?", sender: 'them', time: '10:30 AM' },
        { id: 2, text: "Absolutely, I'd love to learn more about the position!", sender: 'me', time: '10:35 AM' },
        { id: 3, text: "Great, I will send over the interview scheduling link to Calendly momentarily. Looking forward to it.", sender: 'them', time: '10:42 AM' },
    ]);
    const [newMessage, setNewMessage] = useState('');

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        setMessages([...messages, { id: Date.now(), text: newMessage, sender: 'me', time: 'Now' }]);
        setNewMessage('');
    };

    return (
        <div className="flex-1 bg-white dark:bg-[#1A211D] rounded-2xl shadow-sm border border-black/[0.04] dark:border-white/[0.06] overflow-hidden flex flex-col md:flex-row h-[calc(100vh-8rem)] min-h-[600px] transition-colors">

            {/* sidebar */}
            <div className="w-full md:w-80 border-r border-black/[0.04] dark:border-white/[0.06] bg-white dark:bg-[#1A211D] flex flex-col h-full shrink-0 hidden md:flex">
                <div className="p-4 border-b border-black/[0.04] dark:border-white/[0.06]">
                    <h2 className="text-xl font-bold text-[#1A211D] dark:text-white mb-4">Messages</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B73] dark:text-[#8A8A90]" />
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            className="w-full pl-9 pr-4 py-2 bg-[#F8F6EE] dark:bg-white/[0.06] border border-black/[0.04] dark:border-white/[0.06] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition text-[#1A211D] dark:text-white placeholder:text-[#6B6B73] dark:placeholder:text-[#8A8A90]"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto w-full">
                    {INBOX.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => setActiveChat(chat)}
                            className={`p-4 border-b border-black/[0.04] dark:border-white/[0.04] cursor-pointer transition-all ${activeChat.id === chat.id ? 'bg-primary/[0.04] dark:bg-primary/[0.08] border-l-4 border-l-primary' : 'hover:bg-[#F8F6EE] dark:hover:bg-white/[0.04] border-l-4 border-l-transparent'}`}
                        >
                            <div className="flex gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${activeChat.id === chat.id ? 'bg-primary text-white' : 'bg-[#F1EFE6] dark:bg-white/[0.06] text-[#6B6B73] dark:text-[#8A8A90]'}`}>
                                    {chat.avatar}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-0.5">
                                        <h3 className={`text-sm truncate pr-2 ${activeChat.id === chat.id ? 'font-bold text-[#1A211D] dark:text-white' : 'font-semibold text-[#6B6B73] dark:text-[#8A8A90]'}`}>{chat.name}</h3>
                                        <span className="text-xs text-[#6B6B73] dark:text-[#8A8A90] whitespace-nowrap">{chat.time}</span>
                                    </div>
                                    <p className="text-xs text-[#6B6B73] dark:text-[#8A8A90] mb-1 truncate">{chat.role}</p>
                                    <div className="flex justify-between items-center">
                                        <p className={`text-sm truncate ${chat.unread > 0 ? 'font-medium text-[#1A211D] dark:text-[#EAEAE8]' : 'text-[#6B6B73] dark:text-[#8A8A90]'}`}>{chat.preview}</p>
                                        {chat.unread > 0 && (
                                            <span className="w-4 h-4 rounded-full bg-primary text-white text-[11px] font-semibold flex items-center justify-center shrink-0 ml-2">
                                                {chat.unread}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* main chat */}
            <div className="flex-1 flex flex-col h-full bg-[#F8F6EE]/30 dark:bg-[#101310]/30 overflow-hidden relative">
                {/* header */}
                <div className="px-6 py-4 border-b border-black/[0.04] dark:border-white/[0.06] bg-white/80 dark:bg-[#1A211D]/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/[0.08] dark:bg-primary/[0.15] flex items-center justify-center text-primary font-bold">
                            {activeChat.avatar}
                        </div>
                        <div>
                            <h2 className="font-bold text-[#1A211D] dark:text-white">{activeChat.name}</h2>
                            <p className="text-xs text-[#6B6B73] dark:text-[#8A8A90]">{activeChat.role} • <span className="font-medium text-[#2F7A61] dark:text-[#8BC6B9]">Online</span></p>
                        </div>
                    </div>
                    <div className="flex gap-2 text-[#6B6B73] dark:text-[#8A8A90]">
                        <button className="p-2 hover:bg-[#F1EFE6] dark:hover:bg-white/[0.06] rounded-lg transition"><Phone className="w-5 h-5" /></button>
                        <button className="p-2 hover:bg-[#F1EFE6] dark:hover:bg-white/[0.06] rounded-lg transition"><Video className="w-5 h-5" /></button>
                        <button className="p-2 hover:bg-[#F1EFE6] dark:hover:bg-white/[0.06] rounded-lg transition"><MoreVertical className="w-5 h-5" /></button>
                    </div>
                </div>

                {/* messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col pb-24">
                    <AnimatePresence>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className={`flex gap-3 max-w-[80%] ${msg.sender === 'me' ? 'self-end flex-row-reverse' : 'self-start'}`}
                            >
                                {msg.sender === 'them' && (
                                    <div className="w-8 h-8 rounded-full bg-primary/[0.08] dark:bg-primary/[0.15] flex items-center justify-center text-primary font-bold text-xs shrink-0 self-end mb-1">
                                        {activeChat.avatar}
                                    </div>
                                )}
                                <div className="flex flex-col gap-1">
                                    <div className={`p-4 rounded-2xl shadow-sm leading-relaxed ${msg.sender === 'me'
                                        ? 'bg-primary text-white rounded-br-none'
                                        : 'bg-white dark:bg-white/[0.06] border border-black/[0.04] dark:border-white/[0.06] text-[#1A211D] dark:text-[#EAEAE8] rounded-bl-none'
                                        }`}
                                    >
                                        <p className="text-[15px]">{msg.text}</p>
                                    </div>
                                    <span className={`text-[11px] text-[#6B6B73] dark:text-[#8A8A90] font-medium ${msg.sender === 'me' ? 'text-right pr-1' : 'pl-1'}`}>
                                        {msg.time}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* input */}
                <div className="absolute bottom-0 w-full p-4 bg-white dark:bg-[#1A211D] border-t border-black/[0.04] dark:border-white/[0.06] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-none">
                    <form onSubmit={handleSend} className="relative max-w-4xl mx-auto">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="w-full pl-5 pr-14 py-4 bg-[#F8F6EE] dark:bg-white/[0.06] border border-black/[0.04] dark:border-white/[0.06] rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-[#1A211D] dark:text-[#EAEAE8] placeholder:text-[#6B6B73] dark:placeholder:text-[#8A8A90]"
                        />
                        <button
                            type="submit"
                            disabled={!newMessage.trim()}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-primary text-white rounded-xl hover:bg-primary/90 transition disabled:opacity-50"
                        >
                            <Send className="w-4 h-4 ml-0.5" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
