import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, User, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { ChatMessage } from '../types/ai';
import { aiService } from '../services/aiService';

export function AssistantPage() {
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);
  
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        { role: 'model', parts: [{ text: t('assistant_greeting') }] }
      ]);
    }
  }, [t, messages.length]);

  const executeToolCall = (toolResponse: any) => {
    const { action, params } = toolResponse;
    let confirmationText = '';

    switch (action) {
      case 'navigateTo':
        if (params.path) {
          navigate(params.path);
          confirmationText = t('ai_navigating_to', { path: params.path });
        }
        break;
      case 'changeTheme':
        if (params.theme && params.theme !== theme) {
          toggleTheme();
          confirmationText = t('ai_theme_changed', { theme: t(params.theme === 'dark' ? 'theme_dark' : 'theme_light') });
        }
        break;
      case 'changeLanguage':
        if (params.lang && params.lang !== language) {
          setLanguage(params.lang);
          confirmationText = t('ai_language_changed', { lang: t(`lang_${params.lang}`) });
        }
        break;
      default:
        console.warn('Unknown tool action:', action);
        // If the action is unknown, treat it as a text response
        const fallbackMessage: ChatMessage = { role: 'model', parts: [{ text: JSON.stringify(toolResponse) }] };
        setMessages(prev => [...prev, fallbackMessage]);
        return;
    }
    
    if (confirmationText) {
      const confirmationMessage: ChatMessage = { role: 'model', parts: [{ text: confirmationText }] };
      setMessages(prev => [...prev, confirmationMessage]);
    }
  };

  const handleSend = async () => {
    if (input.trim() === '' || loading) return;

    const userMessage: ChatMessage = { role: 'user', parts: [{ text: input }] };
    const historyForApi = messages.length > 1 ? messages.slice(1) : [];

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    const responseText = await aiService.getAiResponse(currentInput, historyForApi);
    
    let isToolCall = false;
    try {
      const toolResponse = JSON.parse(responseText);
      if (toolResponse.action && toolResponse.params) {
        executeToolCall(toolResponse);
        isToolCall = true;
      }
    } catch (e) {
      // Not a JSON object, so it's a regular text response.
    }

    if (!isToolCall) {
      const aiMessage: ChatMessage = { role: 'model', parts: [{ text: responseText }] };
      setMessages(prev => [...prev, aiMessage]);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-space-300">
      <div className="text-center py-6 border-b border-gray-200 dark:border-space-100/50">
        <Bot className="text-primary dark:text-primary-light mx-auto mb-2" size={32} />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-arabic">
          {t('assistant_page_title')}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t('assistant_page_subtitle')}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'model' && (
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Bot size={20} className="text-primary-dark dark:text-primary-light" />
              </div>
            )}
            <div
              className={`max-w-xl p-4 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-primary text-white rounded-br-lg'
                  : 'bg-white dark:bg-space-200 border border-gray-200 dark:border-space-100/50 rounded-bl-lg'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.parts[0].text}</p>
            </div>
             {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-space-100 flex items-center justify-center flex-shrink-0">
                <User size={20} className="text-gray-600 dark:text-gray-300" />
              </div>
            )}
          </motion.div>
        ))}
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 justify-start"
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Bot size={20} className="text-primary-dark dark:text-primary-light" />
            </div>
            <div className="max-w-xl p-4 rounded-2xl bg-white dark:bg-space-200 border border-gray-200 dark:border-space-100/50 rounded-bl-lg">
              <Loader2 className="animate-spin" />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-space-100/50 bg-gray-100 dark:bg-space-200/80">
        <div className="flex items-center gap-2 max-w-3xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t('assistant_placeholder')}
            className="w-full px-4 py-3 border border-gray-300 dark:border-space-100 bg-white dark:bg-space-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-gray-800 dark:text-gray-200"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="p-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors shadow-md dark:shadow-glow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <Send size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
