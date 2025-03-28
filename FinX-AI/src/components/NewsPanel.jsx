
import React from 'react';
import { Clock, ExternalLink } from 'lucide-react';

const NewsPanel = ({ stockSymbol }) => {
  // Mock news data
  const newsItems = [
    {
      id: 1,
      title: `${stockSymbol} Announces New Product Line, Shares Surge`,
      source: 'Financial Times',
      time: '2 hours ago',
      sentiment: 'positive',
      url: '#'
    },
    {
      id: 2,
      title: `Analysts Raise ${stockSymbol} Price Target After Earnings Beat`,
      source: 'Bloomberg',
      time: '5 hours ago',
      sentiment: 'positive',
      url: '#'
    },
    {
      id: 3,
      title: `${stockSymbol} Faces Supply Chain Challenges in Asian Markets`,
      source: 'Reuters',
      time: '1 day ago',
      sentiment: 'negative',
      url: '#'
    },
    {
      id: 4,
      title: `Industry Outlook: What ${stockSymbol}'s Latest Move Means for the Sector`,
      source: 'The Wall Street Journal',
      time: '1 day ago',
      sentiment: 'neutral',
      url: '#'
    },
  ];

  return (
    <div className="glass-card rounded-xl h-auto">
      <div className="p-4 border-b border-white/10">
        <h2 className="text-lg font-semibold">Latest News Impact</h2>
      </div>
      
      <div className="p-2">
        {newsItems.map((news) => (
          <a 
            key={news.id} 
            href={news.url}
            className="block p-2 hover:bg-secondary/30 rounded-lg transition-colors"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-medium">{news.title}</h3>
              <div className={`h-2 w-2 rounded-full flex-shrink-0 mt-1.5 ${
                news.sentiment === 'positive' ? 'bg-finance-positive' :
                news.sentiment === 'negative' ? 'bg-finance-negative' :
                'bg-finance-neutral'
              }`}></div>
            </div>
            
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <span className="font-medium text-primary">{news.source}</span>
              <div className="flex items-center ml-2">
                <Clock className="h-3 w-3 mr-1" />
                <span>{news.time}</span>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground mt-1 flex items-center">
              <ExternalLink className="h-3 w-3 mr-1" />
              <span>AI sentiment: <span className={
                news.sentiment === 'positive' ? 'text-finance-positive' :
                news.sentiment === 'negative' ? 'text-finance-negative' :
                'text-finance-neutral'
              }>{news.sentiment}</span></span>
            </div>
          </a>
        ))}
      </div>
      
      <div className="p-4 border-t border-white/10">
        <button className="w-full text-center text-sm text-primary hover:underline">
          View all news
        </button>
      </div>
    </div>
  );
};

export default NewsPanel;
