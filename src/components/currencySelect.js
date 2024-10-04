import React from 'react';
import PropTypes from 'prop-types';

const CurrencySelect = ({ 
  value, 
  onChange, 
  label, 
  currencies, 
  isLoading, 
  error 
}) => (
  <div className="flex flex-col gap-1">
    <select
      value={value}
      onChange={onChange}
      className="border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent
                disabled:bg-gray-100 disabled:cursor-not-allowed max-w-32 h-12"
      aria-label={label}
      disabled={isLoading || error}
    >
      <option value="">Select {label}</option>
      {currencies?.map((currency) => (
        <option key={currency.id} value={currency.id}>
          {currency.name} ({currency.symbol.toUpperCase()})
        </option>
      ))}
    </select>
    {isLoading && (
      <span className="text-sm text-gray-500">Loading currencies...</span>
    )}
    {error && (
      <span className="text-sm text-red-500">Failed to load currencies</span>
    )}
  </div>
);

CurrencySelect.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired
    })
  ),
  isLoading: PropTypes.bool,
  error: PropTypes.string
};

CurrencySelect.defaultProps = {
  currencies: [],
  isLoading: false,
  error: null
};

export default CurrencySelect;