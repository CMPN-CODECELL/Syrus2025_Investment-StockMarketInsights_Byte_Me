
import React, { useState } from 'react';
import { Search } from 'lucide-react';

const StockHeader = ({ stock, setSelectedStock }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const popularStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 184.92, change: 2.34, changePercent: 1.28 },
    { symbol: 'MSFT', name: 'Microsoft Corp', price: 417.88, change: 3.22, changePercent: 0.78 },
    { symbol: 'GOOGL', name: 'Alphabet Inc', price: 142.65, change: -0.42, changePercent: -0.29 },
    { symbol: 'AMZN', name: 'Amazon.com Inc', price: 178.12, change: 1.56, changePercent: 0.88 },
    { symbol: 'TSLA', name: 'Tesla Inc', price: 177.29, change: -5.71, changePercent: -3.12 },
  ];
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSelectStock = (newStock) => {
    setSelectedStock(newStock);
    setSearchQuery('');
  };
  
  const filteredStocks = searchQuery
    ? popularStocks.filter(s => 
        s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className="glass-card rounded-xl p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-primary">{stock.symbol}</span>
            <span className="text-white/80">{stock.name}</span>
          </h1>
          <div className="flex items-center mt-1">
            <span className="text-xl font-semibold">${stock.price}</span>
            <span className={`ml-2 px-2 py-0.5 rounded text-sm font-medium ${stock.change >= 0 ? 'text-finance-positive bg-finance-positive/10' : 'text-finance-negative bg-finance-negative/10'}`}>
              {stock.change >= 0 ? '+' : ''}{stock.change} ({stock.change >= 0 ? '+' : ''}{stock.changePercent}%)
            </span>
          </div>
        </div>
        
        <div className="relative w-full md:w-64">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search stocks..."
              className="w-full pl-10 pr-4 py-2 bg-secondary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          
          {searchQuery && filteredStocks.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-card rounded-md shadow-lg">
              <ul className="py-1">
                {filteredStocks.map(stock => (
                  <li
                    key={stock.symbol}
                    className="px-4 py-2 hover:bg-secondary cursor-pointer"
                    onClick={() => handleSelectStock(stock)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{stock.symbol}</div>
                        <div className="text-sm text-muted-foreground">{stock.name}</div>
                      </div>
                      <div className={stock.change >= 0 ? 'text-finance-positive' : 'text-finance-negative'}>
                        ${stock.price}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex gap-1 mt-4 overflow-x-auto pb-2">
        {popularStocks.map(s => (
          <button
            key={s.symbol}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${s.symbol === stock.symbol ? 'bg-primary text-white' : 'bg-secondary hover:bg-secondary/80'}`}
            onClick={() => setSelectedStock(s)}
          >
            {s.symbol}
          </button>
        ))}
      </div>
    </header>
  );
};

export default StockHeader;
