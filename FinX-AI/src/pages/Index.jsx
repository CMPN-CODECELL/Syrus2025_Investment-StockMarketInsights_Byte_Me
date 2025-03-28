
import React, { useState } from 'react';
import StockHeader from '../components/StockHeader';
import AIChat from '../components/AIChat';
import StockChart from '../components/StockChart';
import InsightCards from '../components/InsightCards';
import NewsPanel from '../components/NewsPanel';

const Index = () => {
  const [selectedStock, setSelectedStock] = useState({
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 184.92,
    change: 2.34,
    changePercent: 1.28
  });
  
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your AI financial advisor. How can I help you analyze stocks today?' }
  ]);

  const handleSendMessage = (message) => {
    if (!message.trim()) return;
    
    // Add user message
    setChatMessages(prev => [...prev, { role: 'user', content: message }]);
    
    // Simulate AI response
    setTimeout(() => {
      let response;
      
      if (message.toLowerCase().includes('apple') || message.toLowerCase().includes('aapl')) {
        response = "Based on my analysis of Apple Inc. (AAPL), there are several insights to consider: 1) Sentiment analysis shows strong positive consumer reactions to recent product announcements, 2) Technical indicators suggest a potential breakout above resistance levels, 3) Social media mentions have increased 23% over the past week, correlating with previous price movements. Would you like me to elaborate on any of these points?";
      } else if (message.toLowerCase().includes('recommend') || message.toLowerCase().includes('buy')) {
        response = "While I don't provide direct investment advice, I can share that Apple (AAPL) currently shows strong technical strength with cross-asset correlations indicating resilience despite market volatility. Market sentiment remains bullish, with institutional investment flows showing continued accumulation. Consider your own risk tolerance and investment horizon when making any decisions.";
      } else if (message.toLowerCase().includes('risk') || message.toLowerCase().includes('downside')) {
        response = "Key risk factors for Apple include: 1) Supply chain disruptions in Asia affecting production timelines, 2) Regulatory pressures in EU markets that could impact service revenue, 3) Competitive pressures in the smartphone market showing signs of margin compression. My predictive models suggest a potential volatility increase of 15% over the next month.";
      } else {
        response = "I've analyzed your question about " + message.split(' ').slice(0, 3).join(' ') + "... Based on current market data, sentiment analysis, and technical indicators, I'd recommend looking deeper into sector correlations and recent institutional movements before making any decisions. Would you like me to provide a more specific analysis?";
      }
      
      setChatMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen px-4 bg-gradient-to-br from-background to-background/70">
      <div className='w-full text-white pb-6 h-auto flex justify-center items-center'>
        <img src="public\LOGO.jpg" alt="" width='60px' />
      </div>
      <StockHeader stock={selectedStock} setSelectedStock={setSelectedStock} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-6">
          <StockChart stockSymbol={selectedStock.symbol} />
          <InsightCards stockSymbol={selectedStock.symbol} />
        </div>
        
        <div className="space-y-6">
          <AIChat messages={chatMessages} onSendMessage={handleSendMessage} />
          <NewsPanel stockSymbol={selectedStock.symbol} />
        </div>
      </div>
    </div>
  );
};

export default Index;
