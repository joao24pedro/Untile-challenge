import { API_BASE_URL, API_CURRENCIES, API_SUPPORTED_CURRENCIES } from "../constants/constants";
let supportedCurrenciesCache = null;
let conversionRateCache = {};

// fetch coins
export const fetchCurrencies = async () => {
    try {
      const response = await fetch(`${API_CURRENCIES}`);
      const data = await response.json();
      return data.slice(500, 2650);
    } catch (error) {
      console.error('Error fetching supported currencies:', error);
      throw error;
    }
};

// fetch supported currencies
export const fetchSupportedCurrencies = async () => {
    try {
      const response = await fetch(`${API_SUPPORTED_CURRENCIES}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching supported currencies:', error);
      throw error;
    }
  };
  
  // fetch markets
  export const fetchSupportedMarkets = async (currency) => {
    try {
        const response = await fetch(`${API_BASE_URL}/exchanges/list`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching markets:', error);
        throw error;
    }
  };

  // fetch conversions
  export const fetchConversionRate = async (inputCurrency, targetCurrency) => {
    const cacheKey = `${inputCurrency}-${targetCurrency}`;
    
    if (conversionRateCache[cacheKey]) {
        return conversionRateCache[cacheKey]; // Return from cache if available
    }

    try {
        const response = await fetch(`${API_BASE_URL}/simple/price?ids=${inputCurrency}&vs_currencies=${targetCurrency}&precision=6`);
        
        const data = await response.json();
        const rate = data[inputCurrency][targetCurrency];
        // Cache the rate
        conversionRateCache[cacheKey] = rate;
        return rate;
    } catch (error) {
        console.error('Error fetching conversion:', error);
        throw error; // Rethrow the error to be handled in the calling function
    }
  };

  // fetch exchanges
export const fetchExchangesList = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/exchanges/list`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching exchanges list:', error);
      throw error;
    }
  };
  
  // fetch tickers for a coin
  export const fetchCoinTickers = async (coinId, marketId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/coins/${coinId}/tickers?exchange_ids=${marketId}`);
        const data = await response.json();

        return data.tickers;
    } catch (error) {
        console.error('Error fetching tickers:', error);
        throw error;
    }
};
