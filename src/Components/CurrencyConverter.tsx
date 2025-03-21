import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Grid,
  CircularProgress,
  Typography,
  Paper,
} from '@mui/material';
import { setAmountFrom, setAmountTo, setFromCurrency, setToCurrency, setExchangeRate } from '../store/currencySlice';
import { useExchange } from '../hooks/useExchange';

const currencies = [
  { name: "United States Dollar USD", code: "USD" },
  { name: "Philippine Peso PHP", code: "PHP" },
  { name: "Japanese Yen JPY", code: "JPY" },
  { name: "Canadian Dollar CAD", code: "CAD" },
];

const CurrencyConverter = () => {
  const dispatch = useDispatch();
  const { amountFrom, amountTo, fromCurrency, toCurrency, exchangeRate } = useSelector(
    (state: { currency: { amountFrom: number; amountTo: number; fromCurrency: string; toCurrency: string; exchangeRate: number } }) => state.currency
  );

  const { data, isLoading, isError, error } = useExchange(fromCurrency, toCurrency);

  useEffect(() => {
    if (data && amountFrom) {
      const rate = data.conversion_rates[toCurrency];
      const convertedAmount = amountFrom * rate;
      dispatch(setAmountTo(convertedAmount));
      dispatch(setExchangeRate(rate));
    }
  }, [data, amountFrom, toCurrency, dispatch]);

  const handleAmountToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = Number(e.target.value);
    dispatch(setAmountTo(newAmount));
    if (exchangeRate) {
      const convertedAmount = newAmount / exchangeRate;
      dispatch(setAmountFrom(convertedAmount));
    }
  };


  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f4f4f4"
      p={2}
    >

        <Grid container spacing={3} direction="column" alignItems="center">
          <Paper sx={{p:5}}>
          <Grid item>
            <Typography variant="h5" gutterBottom textAlign={'center'} pb={5}>
              Currency Converter
            </Typography>
          </Grid>

          <Grid item>
            <FormControl fullWidth>
              <InputLabel>Select From Currency</InputLabel>
              <Select
                value={fromCurrency}
                onChange={(e) => dispatch(setFromCurrency(e.target.value))}
                label="Select From Currency"
                sx={{ mb: 2 }}
              >
                {currencies.map((currency) => (
                  <MenuItem key={currency.code} value={currency.code}>
                    {currency.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Amount in From Currency"
              fullWidth
              type="number"
              value={amountFrom}
              onChange={(e) => dispatch(setAmountFrom(Number(e.target.value)))}
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid item>
            <FormControl fullWidth>
              <InputLabel>Select To Currency</InputLabel>
              <Select
                value={toCurrency}
                onChange={(e) => dispatch(setToCurrency(e.target.value))}
                label="Select To Currency"
                sx={{ mb: 2 }}
              >
                {currencies.map((currency) => (
                  <MenuItem key={currency.code} value={currency.code}>
                    {currency.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Amount in To Currency"
              fullWidth
              type="number"
              value={amountTo}
              onChange={handleAmountToChange}
              sx={{ mb: 2 }}
            />
          </Grid>

          {isLoading && (
            <Grid item>
              <CircularProgress />
            </Grid>
          )}

          {isError && (
            <Grid item>
              <TextField
                label="Error"
                value={`Error: ${error?.message}`}
                fullWidth
                disabled
                color="error"
                sx={{ mb: 2 }}
              />
            </Grid>
          )}
          </Paper>
        </Grid>
    </Box>
  );
};

export default CurrencyConverter;
