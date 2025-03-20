import { useQuery } from '@tanstack/react-query';

const fetchExchangeRate = async (from: string, to: string) => {
  const apiKey = import.meta.env.VITE_EXCHANGE_API_KEY;
  
  // Correct endpoint for enriched data
  const response = await fetch(
    `https://v6.exchangerate-api.com/v6/${apiKey}/enriched/${from}/${to}`
  );
  
  // Check if the response is successful
  if (!response.ok) {
    throw new Error('Failed to fetch exchange rates');
  }

  const data = await response.json();
  
  return data;
};

export const useExchange = (from: string, to: string) => {
  return useQuery(
    ['exchangeRate', from, to],
    () => fetchExchangeRate(from, to)
  );
};
