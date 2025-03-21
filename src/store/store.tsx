import currencyReducer from './currencySlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    currency: currencyReducer,
  }
});

export default store;
