import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { AiAssistantWidgetProps, ChatMessage } from '../types';
import { X, Bot, Send, Loader, User, Trash2 } from 'lucide-react';

const AI_HISTORY_KEY = 'aiAssistantHistory';

// FIX: Changed to a named export to be consistent with other components and fix import errors.
export const AiAssistantWidget: React.FC<AiAssistantWidgetProps> = ({ onClose, products, orders, services, portfolioItems, blogPosts, currentUser }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const savedHistory = localStorage.getItem(AI_HISTORY_KEY);
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);
        if (Array.isArray(parsedHistory) && parsedHistory.length > 0) {
          return parsedHistory;
        }
      }
    } catch (error) {
      console.error("Failed to load AI chat history from localStorage:", error);
      localStorage.removeItem(AI_HISTORY_KEY); // Clear corrupted data
    }
    return [
      { role: 'model', text: 'Bonjour ! Je suis l\'assistant IA de Lolirine. Comment puis-je vous aider à trouver des informations sur nos produits, services ou réalisations ?' }
    ];
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Save conversation history to localStorage whenever messages change
  useEffect(() => {
    try {
      // Don't save if it's just the initial default message
      if (messages.length > 1) {
        localStorage.setItem(AI_HISTORY_KEY, JSON.stringify(messages));
      } else {
        // If the conversation is reset to the initial state, clear storage
        localStorage.removeItem(AI_HISTORY_KEY);
      }
    } catch (error) {
      console.error("Failed to save AI chat history to localStorage:", error);
    }
  }, [messages]);

  // Function to clear chat history
  const handleClearHistory = () => {
    localStorage.removeItem(AI_HISTORY_KEY);
    setMessages([
      { role: 'model', text: 'Bonjour ! Je suis l\'assistant IA de Lolirine. Comment puis-je vous aider à trouver des informations sur nos produits, services ou réalisations ?' }
    ]);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const systemInstruction = `Tu es "LoliBot", un assistant IA amical et expert pour "Lolirine Pool Store".
      Ta mission est d'aider les utilisateurs en répondant à leurs questions en te basant EXCLUSIVEMENT sur les données JSON fournies ci-dessous.
      Réponds toujours en français. Sois concis, clair et direct.
      - Si on te demande les produits les plus chers, les moins chers, ou en promotion, base-toi sur le champ 'price' ou 'promoPrice'.
      - Si on te demande des informations sur un service, une réalisation ou un article de blog, utilise les données correspondantes.
      - Si l'information n'est pas dans les données fournies, réponds poliment que tu n'as pas cette information. N'invente jamais de réponse.
      
      CONTEXTE DE L'APPLICATION (DONNÉES JSON) :
      - Utilisateur actuel: ${JSON.stringify(currentUser ? { name: currentUser.name, segment: currentUser.segment } : { name: 'Non connecté' })}
      - Produits disponibles (échantillon): ${JSON.stringify(products.slice(0, 20).map(p => ({id: p.id, name: p.name, category: p.category, price: p.price, promoPrice: p.promoPrice, stock: p.stock, description: p.description?.substring(0,100)})))}
      - Services proposés: ${JSON.stringify(services)}
      - Réalisations (portfolio): ${JSON.stringify(portfolioItems)}
      - Articles de blog: ${JSON.stringify(blogPosts)}
      - Commandes récentes (échantillon): ${JSON.stringify(orders.slice(0, 5))}
      `;

      const chatHistory = messages.map(msg => ({
          role: msg.role,
          parts: [{ text: msg.text }]
      }));
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [...chatHistory, { role: 'user', parts: [{ text: currentInput }] }],
        config: { systemInstruction }
      });
      
      const modelMessage: ChatMessage = { role: 'model', text: response.text };
      setMessages(prev => [...prev, modelMessage]);

    } catch (error) {
      console.error("Error calling Gemini API:", error);
      // FIX: Corrected the string literal syntax which was causing multiple parsing errors by using double quotes.
      const errorMessage: ChatMessage = { role: 'model', text: "Désolé, une erreur est survenue lors de la communication avec l'assistant. Veuillez réessayer plus tard." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[9998] w-full max-w-sm h-[70vh] bg-white rounded-lg shadow-2xl flex flex-col transform transition-all animate-fade-in-up">
      <style>{`
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
      `}</style>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-cyan-600 text-white rounded-t-lg">
        <div className="flex items-center gap-3">
            <Bot size={24} />
            <h3 className="text-lg font-bold">Assistant IA Lolirine</h3>
        </div>
        <div className="flex items-center gap-2">
            <button onClick={handleClearHistory} aria-label="Effacer l'historique" title="Effacer l'historique" className="p-1 rounded-full hover:bg-cyan-700">
                <Trash2 size={18} />
            </button>
            <button onClick={onClose} aria-label="Fermer le chat" className="p-1 rounded-full hover:bg-cyan-700">
              <X size={20} />
            </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'model' && <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0"><Bot size={18} className="text-cyan-600"/></div>}
            <div className={`max-w-xs px-4 py-2 rounded-lg ${msg.role === 'user' ? 'bg-cyan-500 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none shadow-sm'}`}>
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
            </div>
             {msg.role === 'user' && <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0"><User size={18} className="text-gray-600"/></div>}
          </div>
        ))}
         {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0"><Bot size={18} className="text-cyan-600"/></div>
              <div className="max-w-xs px-4 py-3 rounded-lg bg-white text-gray-800 rounded-bl-none shadow-sm flex items-center gap-2">
                <Loader className="animate-spin text-cyan-500" size={16} />
                <span className="text-sm text-gray-500">Réflexion...</span>
              </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Posez votre question..."
            className="flex-1 w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-3 bg-cyan-600 text-white rounded-full disabled:bg-gray-400 hover:bg-cyan-700 transition-colors flex-shrink-0"
            aria-label="Envoyer le message"
          >
            {isLoading ? <Loader className="animate-spin" size={20} /> : <Send size={20} />}
          </button>
        </form>
      </div>
    </div>
  );
};