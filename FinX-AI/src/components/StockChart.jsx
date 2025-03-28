
import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area 
} from 'recharts';

const StockChart = ({ stockSymbol }) => {
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState('line');
  const [timeRange, setTimeRange] = useState('1D');
  
  // Generate random data based on stock and time range
  useEffect(() => {
    const generateData = () => {
      // Base price varies by stock symbol (just for demo)
      const basePrice = stockSymbol === 'AAPL' ? 185 :
                       stockSymbol === 'MSFT' ? 420 :
                       stockSymbol === 'GOOGL' ? 142 :
                       stockSymbol === 'AMZN' ? 180 :
                       stockSymbol === 'TSLA' ? 175 : 100;
      
      // Number of data points based on time range
      const dataPoints = timeRange === '1D' ? 24 :
                        timeRange === '1W' ? 7 :
                        timeRange === '1M' ? 30 :
                        timeRange === '3M' ? 90 :
                        timeRange === '1Y' ? 12 : 24;
      
      // Volatility factor
      const volatility = timeRange === '1D' ? 0.5 :
                         timeRange === '1W' ? 2 :
                         timeRange === '1M' ? 5 :
                         timeRange === '3M' ? 10 :
                         timeRange === '1Y' ? 20 : 0.5;
      
      let data = [];
      let lastPrice = basePrice;
      
      for (let i = 0; i < dataPoints; i++) {
        const change = (Math.random() - 0.5) * volatility;
        lastPrice = lastPrice + change;
        
        let label;
        if (timeRange === '1D') {
          label = `${i}:00`;
        } else if (timeRange === '1W') {
          const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
          label = days[i % 7];
        } else if (timeRange === '1M' || timeRange === '3M') {
          label = `Day ${i + 1}`;
        } else {
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          label = months[i % 12];
        }
        
        data.push({
          name: label,
          price: parseFloat(lastPrice.toFixed(2)),
          volume: Math.floor(Math.random() * 1000000)
        });
      }
      
      return data;
    };
    
    setChartData(generateData());
  }, [stockSymbol, timeRange]);

  return (
    <div className="glass-card rounded-xl p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-lg font-semibold">{stockSymbol} Stock Price</h2>
        
        <div className="flex gap-2 mt-2 sm:mt-0">
          <div className="flex bg-secondary rounded-lg overflow-hidden">
            {['1D', '1W', '1M', '3M', '1Y'].map((range) => (
              <button
                key={range}
                className={`px-3 py-1 text-sm ${timeRange === range ? 'bg-primary text-white' : 'hover:bg-secondary/80'}`}
                onClick={() => setTimeRange(range)}
              >
                {range}
              </button>
            ))}
          </div>
          
          <div className="flex bg-secondary rounded-lg overflow-hidden">
            <button
              className={`px-3 py-1 text-sm ${chartType === 'line' ? 'bg-primary text-white' : 'hover:bg-secondary/80'}`}
              onClick={() => setChartType('line')}
            >
              Line
            </button>
            <button
              className={`px-3 py-1 text-sm ${chartType === 'area' ? 'bg-primary text-white' : 'hover:bg-secondary/80'}`}
              onClick={() => setChartType('area')}
            >
              Area
            </button>
          </div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)' }}
                labelStyle={{ color: 'white' }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          ) : (
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)' }}
                labelStyle={{ color: 'white' }}
              />
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="price"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorPrice)"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
      
      <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
        <div>AI prediction confidence: <span className="text-finance-positive font-medium">87%</span></div>
        <div>Predicted trend: <span className="text-finance-positive font-medium">Bullish</span></div>
      </div>
    </div>
  );
};

export default StockChart;
