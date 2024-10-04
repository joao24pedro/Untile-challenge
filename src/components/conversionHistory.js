import React from 'react';
import PropTypes from 'prop-types';

const ConversionHistory = ({ history }) => (
  <div className="mt-8">
    <h2 className="text-blue-700 text-lg font-bold mb-4">Results</h2>
    {history.length > 0 ? (
      <ul className="space-y-2">
        {history.map((entry, index) => (
          <li key={index} className="p-2 bg-gray-20 rounded">
            {entry.amount} {entry.inputCurrency} = {entry.convertedAmount.toFixed(6)} {entry.targetCurrency}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500">No conversion history available.</p>
    )}
  </div>
);

ConversionHistory.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.number.isRequired,
      inputCurrency: PropTypes.string.isRequired,
      targetCurrency: PropTypes.string.isRequired,
      convertedAmount: PropTypes.number.isRequired,
      timestamp: PropTypes.string
    })
  ).isRequired
};

export default ConversionHistory;