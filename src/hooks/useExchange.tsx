import { useQuery } from '@tanstack/react-query';

interface ExchangeRateData {
  conversion_rates: {
    [key: string]: number; 
  };
}

const fetchExchangeRate = async (from: string): Promise<ExchangeRateData> => {
  const apiKey = import.meta.env.VITE_EXCHANGE_API_KEY;
  const response = await fetch(
    `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch exchange rates');
  }

  const data = await response.json();
  return data;
};



export const useExchange = (from: string, to: string) => {
  return useQuery<ExchangeRateData, Error>({
    queryKey: ['exchangeRate', from, to], 
    queryFn: () => fetchExchangeRate(from), 
  });
};

