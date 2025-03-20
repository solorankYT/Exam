import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrencyState {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  result: number;
}

const initialState: CurrencyState = {
  amount: 0,
  fromCurrency: 'USD',
  toCurrency: 'EUR',
  result: 0,
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    },
    setFromCurrency: (state, action: PayloadAction<string>) => {
      state.fromCurrency = action.payload;
    },
    setToCurrency: (state, action: PayloadAction<string>) => {
      state.toCurrency = action.payload;
    },
    setResult: (state, action: PayloadAction<number>) => {
      state.result = action.payload;
    },
  },
});

export const { setAmount, setFromCurrency, setToCurrency, setResult } = currencySlice.actions;
export default currencySlice.reducer;
