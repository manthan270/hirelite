import React, { useState } from 'react';
import { Search, Send, MoreVertical, Phone, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data
const INBOX = [
    { id: 1, name: 'Sarah Jenkins', role: 'Recruiter @ TechCorp', time: '10:42 AM', preview: 'Looking forward to the interview...', unread: 2, avatar: 'SJ' },
    { id: 2, name: 'Michael Chen', role: 'Talent Lead @ Netflix', time: 'Yesterday', preview: 'Thanks for applying. We will review...', unread: 0, avatar: 'MC' },
    { id: 3, name: 'Emily Davis', role: 'Hiring Manager @ Stripe', time: 'Mon', preview: 'Could you share some recent work?', unread: 0, avatar: 'ED' },
];

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
        <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col md:flex-row h-[calc(100vh-8rem)] min-h-[600px] transition-colors">

            {/* Sidebar List */}
            <div className="w-full md:w-80 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col h-full shrink-0 hidden md:flex">
                <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Messages</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto w-full custom-scrollbar">
                    {INBOX.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => setActiveChat(chat)}
                            className={`p-4 border-b border-slate-50 dark:border-slate-800/50 cursor-pointer transition-all ${activeChat.id === chat.id ? 'bg-indigo-50/50 dark:bg-indigo-500/10 border-l-4 border-l-primary' : 'hover:bg-slate-50 dark:hover:bg-slate-800/80 border-l-4 border-l-transparent'}`}
                        >
                            <div className="flex gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${activeChat.id === chat.id ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                                    {chat.avatar}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-0.5">
                                        <h3 className={`text-sm truncate pr-2 ${activeChat.id === chat.id ? 'font-bold text-slate-900 dark:text-white' : 'font-semibold text-slate-700 dark:text-slate-300'}`}>{chat.name}</h3>
                                        <span className="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap">{chat.time}</span>
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 truncate">{chat.role}</p>
                                    <div className="flex justify-between items-center">
                                        <p className={`text-sm truncate ${chat.unread > 0 ? 'font-medium text-slate-800 dark:text-slate-200' : 'text-slate-500 dark:text-slate-400'}`}>{chat.preview}</p>
                                        {chat.unread > 0 && (
                                            <span className="w-4 h-4 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center shrink-0 ml-2">
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

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col h-full bg-slate-50/30 dark:bg-slate-950/30 overflow-hidden relative">
                {/* Chat Header */}
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-700 dark:text-indigo-400 font-bold">
                            {activeChat.avatar}
                        </div>
                        <div>
                            <h2 className="font-bold text-slate-900 dark:text-white">{activeChat.name}</h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{activeChat.role} • <span className="text-emerald-600 dark:text-emerald-500 font-medium">Online</span></p>
                        </div>
                    </div>
                    <div className="flex gap-2 text-slate-400 dark:text-slate-500">
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"><Phone className="w-5 h-5" /></button>
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"><Video className="w-5 h-5" /></button>
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"><MoreVertical className="w-5 h-5" /></button>
                    </div>
                </div>

                {/* Message Thread */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col custom-scrollbar pb-32">
                    <AnimatePresence>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className={`flex gap-3 max-w-[80%] ${msg.sender === 'me' ? 'self-end flex-row-reverse' : 'self-start'}`}
                            >
                                {msg.sender === 'them' && (
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-700 dark:text-indigo-400 font-bold text-xs shrink-0 self-end mb-1">
                                        {activeChat.avatar}
                                    </div>
                                )}
                                <div className="flex flex-col gap-1">
                                    <div className={`p-4 rounded-2xl shadow-sm leading-relaxed ${msg.sender === 'me'
                                        ? 'bg-primary text-white rounded-br-none'
                                        : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-none'
                                        }`}
                                    >
                                        <p className={msg.sender === 'me' ? 'text-[15px]' : 'text-[15px]'}>{msg.text}</p>
                                    </div>
                                    <span className={`text-[11px] text-slate-400 dark:text-slate-500 font-medium ${msg.sender === 'me' ? 'text-right pr-1' : 'pl-1'}`}>
                                        {msg.time}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Input Area */}
                <div className="absolute bottom-0 w-full p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-none">
                    <form onSubmit={handleSend} className="relative max-w-4xl mx-auto">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="w-full pl-5 pr-14 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-inner dark:shadow-none text-slate-700 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                        />
                        <button
                            type="submit"
                            disabled={!newMessage.trim()}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-primary text-white rounded-xl hover:bg-primary-dark transition disabled:opacity-50 disabled:hover:bg-primary"
                        >
                            <Send className="w-4 h-4 ml-0.5" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
