import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Product, Order, ChatMessage } from '../../types';
import { Bot, Send, Loader } from 'lucide-react';

interface AiAssistantProps {
  products: Product[];
  orders: Order[];
}

// Ensure the API key is handled by the environment
const API_KEY = process.env.API_KEY;

const AiAssistant: React.FC<AiAssistantProps> = ({ products, orders }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Bonjour ! Comment puis-je vous aider à analyser vos données de produits ou de commandes aujourd\'hui ?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      if (!API_KEY) {
        throw new Error("API_KEY is not configured.");
      }
      
      const ai = new GoogleGenAI({ apiKey: API_KEY });

      const systemInstruction = `You are a helpful and concise assistant for a pool supply store owner. Your name is 'Pro Piscine AI'.
      You must answer in French.
      Use the provided JSON data to answer questions about products and orders.
      Product data: ${JSON.stringify(products.slice(0, 20))}
      Order data: ${JSON.stringify(orders)}
      Be friendly and professional. If you don't know the answer from the data, say you don't have that information.`;
      
      const chatHistory = messages.map(msg => ({
          role: msg.role,
          parts: [{ text: msg.text }]
      }));
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [...chatHistory, { role: 'user', parts: [{ text: input }] }],
        config: {
          systemInstruction: systemInstruction,
        }
      });
      
      const modelMessage: ChatMessage = { role: 'model', text: response.text };
      setMessages(prev => [...prev, modelMessage]);

    } catch (error) {
      console.error("Error calling Gemini API:", error);
      const errorMessage: ChatMessage = { role: 'model', text: 'Désolé, une erreur est survenue. Assurez-vous que votre clé API est correctement configurée. ' + (error as Error).message };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Bot size={22} className="mr-2 text-[#6366f1]" />
        Assistant IA Conversationnel
      </h3>
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 mb-4 h-96">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'model' && <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0"><Bot size={18} className="text-indigo-500"/></div>}
            <div className={`max-w-md px-4 py-2 rounded-lg ${msg.role === 'user' ? 'bg-cyan-500 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
         {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0"><Bot size={18} className="text-indigo-500"/></div>
              <div className="max-w-md px-4 py-2 rounded-lg bg-gray-100 text-gray-800 rounded-bl-none">
                <Loader className="animate-spin" size={20} />
              </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="flex items-center gap-2 border-t pt-4">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Posez votre question ici..."
          className="flex-1 w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="p-2.5 bg-cyan-500 text-white rounded-lg disabled:bg-gray-400 hover:bg-cyan-600 transition-colors"
        >
          {isLoading ? <Loader className="animate-spin" size={20} /> : <Send size={20} />}
        </button>
      </form>
    </div>
  );
};

export default AiAssistant;