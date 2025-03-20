import React, { useState } from 'react';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Container, Grid2 } from '@mui/material';

const currencies = [
  { name: "Philippine Peso PHP", code: "PHP" },
  { name: "United States Dollar USD", code: "USD" },
  { name: "Japanese Yen JPY", code: "JPY" },
  { name: "Canadian Dollar CAD", code: "CAD" },
];

const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState<string>("PHP");
  const [toCurrency, setToCurrency] = useState<string>("USD");
  const [amount, setAmount] = useState<number>(0);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  const handleConversion = () => {
    // Mock conversion logic (replace this with real API call)
    const conversionRate = 0.85; // Example conversion rate (replace with real API rate)
    setConvertedAmount(amount * conversionRate); // Simple mock conversion
  };

  return (
    <Container maxWidth="sm">
      <form>
        <Grid2 container spacing={3} direction="column" alignItems="center">
          <Grid2 item>
            <FormControl fullWidth>
              <InputLabel>Select From Currency</InputLabel>
              <Select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                label="Select From Currency"
              >
                {currencies.map((currency) => (
                  <MenuItem key={currency.code} value={currency.code}>
                    {currency.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>

          <Grid2 item>
            <FormControl fullWidth>
              <InputLabel>Select To Currency</InputLabel>
              <Select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                label="Select To Currency"
              >
                {currencies.map((currency) => (
                  <MenuItem key={currency.code} value={currency.code}>
                    {currency.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>

          <Grid2 item>
            <TextField
              label="Amount to Convert"
              type="number"
              fullWidth
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </Grid2>

          <Grid2 item>
            <Button variant="contained" color="primary" fullWidth onClick={handleConversion}>
              Convert
            </Button>
          </Grid2>

          {convertedAmount !== null && (
            <Grid2 item>
              <TextField
                label="Converted Amount"
                value={convertedAmount}
                fullWidth
                disabled
              />
            </Grid2>
          )}
        </Grid2>
      </form>
    </Container>
  );
};

export default CurrencyConverter;
