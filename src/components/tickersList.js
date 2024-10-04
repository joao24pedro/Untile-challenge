import React from 'react';
import PropTypes from 'prop-types';

const TickerList = ({ tickers }) => {
  if (!tickers.length) return null;

  return (
    <div className="mt-4 grid gap-4">
      {tickers.map((ticker, index) => (
        <div key={index} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <h1 className="text-[32px] font-bold text-gray-700 ">{ticker.base}/{ticker.target}</h1>
              <h3 className="font-semibold text-gray-700 pt-2">Last Value: {ticker.last}</h3>
              <h3 className="font-semibold text-gray-700">Last Trade: {new Date(ticker.timestamp).toLocaleString()}</h3>
            </div>
            <div></div>
            <div className="grid-cols-3">
              {ticker.trade_url && (
                <a 
                  href={ticker.trade_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-semibold text-blue-700 hover:text-blue-700 transition-colors underline"
                >
                  View More
                </a>
              )}
              <h3 className="font-semibold text-gray-700 pt-8">Market Volume: {ticker.volume}</h3>
              <h3 className="font-semibold text-gray-700">Market: {ticker.market.name}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

TickerList.propTypes = {
  tickers: PropTypes.arrayOf(
    PropTypes.shape({
      base: PropTypes.string.isRequired,
      target: PropTypes.string.isRequired,
      last: PropTypes.number.isRequired,
      volume: PropTypes.number.isRequired,
      timestamp: PropTypes.string.isRequired,
      market: PropTypes.shape({
        name: PropTypes.string.isRequired
      }).isRequired,
      trade_url: PropTypes.string
    })
  ).isRequired
};

export default TickerList;