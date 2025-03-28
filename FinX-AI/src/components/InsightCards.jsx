
import React from 'react';
import { TrendingUp, TrendingDown, BarChart, PieChart, Activity } from 'lucide-react';

const InsightCards = ({ stockSymbol }) => {
  // Mock data for insights
  const insights = [
    {
      id: 1,
      title: 'Market Sentiment',
      value: 'Strongly Positive',
      description: 'Social media and news sentiment indicates bullish outlook.',
      change: '+18%',
      changeType: 'positive',
      icon: TrendingUp,
    },
    {
      id: 2,
      title: 'Risk Assessment',
      value: 'Low to Medium',
      description: 'Volatility indicators show stability with upside potential.',
      change: '-12%',
      changeType: 'positive', // Negative change in risk is positive
      icon: Activity,
    },
    {
      id: 3,
      title: 'Sector Performance',
      value: 'Outperforming',
      description: `${stockSymbol} is outperforming its sector by 12.4%.`,
      change: '+12.4%',
      changeType: 'positive',
      icon: BarChart,
    },
    {
      id: 4,
      title: 'Global Correlations',
      value: '0.82 with NASDAQ',
      description: 'Strong correlation with tech indices, less with commodities.',
      change: '+0.05',
      changeType: 'neutral',
      icon: PieChart,
    },
  ];

  // Simulated AI predictions
  const predictions = [
    { 
      title: 'Price Target (30 days)', 
      value: stockSymbol === 'AAPL' ? '$198.50' : 
             stockSymbol === 'MSFT' ? '$445.75' : 
             stockSymbol === 'GOOGL' ? '$155.25' : 
             stockSymbol === 'AMZN' ? '$192.30' : 
             stockSymbol === 'TSLA' ? '$185.50' : 
             '$150.00',
      confidence: '78%',
      impact: 'high'
    },
    {
      title: 'Trading Volume Trend',
      value: 'Increasing',
      confidence: '82%',
      impact: 'medium'
    },
    {
      title: 'Earnings Estimate',
      value: stockSymbol === 'AAPL' ? '$1.32/share' : 
             stockSymbol === 'MSFT' ? '$2.76/share' : 
             stockSymbol === 'GOOGL' ? '$1.85/share' : 
             stockSymbol === 'AMZN' ? '$1.10/share' : 
             stockSymbol === 'TSLA' ? '$0.75/share' : 
             '$1.25/share',
      confidence: '65%',
      impact: 'high'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {insights.map((insight) => (
          <div key={insight.id} className="glass-card rounded-xl p-4 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">{insight.title}</h3>
                <p className="text-lg font-bold mt-1">{insight.value}</p>
              </div>
              <div className={`p-2 rounded-full ${insight.changeType === 'positive' ? 'bg-finance-positive/20' : insight.changeType === 'negative' ? 'bg-finance-negative/20' : 'bg-finance-neutral/20'}`}>
                <insight.icon className={`h-5 w-5 ${insight.changeType === 'positive' ? 'text-finance-positive' : insight.changeType === 'negative' ? 'text-finance-negative' : 'text-finance-neutral'}`} />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{insight.description}</p>
            <div className="flex items-center mt-2">
              <span className={`text-xs font-medium ${insight.changeType === 'positive' ? 'text-finance-positive' : insight.changeType === 'negative' ? 'text-finance-negative' : 'text-finance-neutral'}`}>
                {insight.change} from last week
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="glass-card rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-4">AI-Powered Predictions</h2>
        <div className="space-y-4">
          {predictions.map((prediction, index) => (
            <div key={index} className="bg-secondary/50 rounded-lg p-3">
              <div className="flex flex-wrap items-center justify-between">
                <h3 className="text-sm font-medium">{prediction.title}</h3>
                <div className={`px-2 py-0.5 rounded text-xs font-medium ${
                  prediction.impact === 'high' ? 'bg-finance-positive/20 text-finance-positive' : 
                  prediction.impact === 'medium' ? 'bg-finance-highlight/20 text-finance-highlight' : 
                  'bg-finance-neutral/20 text-finance-neutral'
                }`}>
                  {prediction.impact} impact
                </div>
              </div>
              <div className="flex items-end justify-between mt-2">
                <span className="text-lg font-bold">{prediction.value}</span>
                <span className="text-xs text-muted-foreground">
                  Confidence: <span className="text-white">{prediction.confidence}</span>
                </span>
              </div>
              
              <div className="mt-2 bg-secondary/50 rounded-full h-1.5 w-full">
                <div 
                  className="bg-primary h-1.5 rounded-full" 
                  style={{ width: prediction.confidence }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsightCards;
