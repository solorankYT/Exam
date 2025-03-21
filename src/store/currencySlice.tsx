import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrencyState {
  amountFrom: number;
  amountTo: number;
  fromCurrency: string;
  toCurrency: string;
  exchangeRate: number;
}

const initialState: CurrencyState = {
  amountFrom: 1,
  amountTo: 0, 
  fromCurrency: 'USD',
  toCurrency: 'PHP',
  exchangeRate: 0,
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setAmountFrom: (state, action: PayloadAction<number>) => {
      state.amountFrom = action.payload;
    },
    setAmountTo: (state, action: PayloadAction<number>) => {
      state.amountTo = action.payload;
    },
    setFromCurrency: (state, action: PayloadAction<string>) => {
      state.fromCurrency = action.payload;
    },
    setToCurrency: (state, action: PayloadAction<string>) => {
      state.toCurrency = action.payload;
    },
    setExchangeRate: (state, action: PayloadAction<number>) => {
      state.exchangeRate = action.payload;
    },
  },
});

export const { setAmountFrom, setAmountTo, setFromCurrency, setToCurrency, setExchangeRate } = currencySlice.actions;
export default currencySlice.reducer;
