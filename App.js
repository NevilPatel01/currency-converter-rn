import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Animated,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

//StAuth10244: I Nevil Patel, 000892482 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
const App = () => {
  const [amount, setAmount] = useState(''); // Stores the entered amount for conversion
  const [sourceCurrency, setSourceCurrency] = useState('USD'); // Stores selected source currency
  const [targetCurrency, setTargetCurrency] = useState('INR'); // Stores selected target currency
  const [conversionResult, setConversionResult] = useState(''); // Stores the conversion result
  const [history, setHistory] = useState([]); // Stores conversion history
  const [currencies, setCurrencies] = useState([]); // Stores available currency codes
  const [flagUrls, setFlagUrls] = useState({}); // Stores URLs for flags based on currency codes
  const fadeAnim = useRef(new Animated.Value(0)).current; // Animated value for fade-in effect

  // useEffect hook to fetch currency codes and flag URLs when the component mounts
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        // Fetch conversion rates data from API
        // API Source: https://www.exchangerate-api.com/
        const response = await axios.get(
          'https://v6.exchangerate-api.com/v6/abfce4e195e5908dc12db64a/latest/USD'
        );
        const currencyCodes = Object.keys(response.data.conversion_rates); // Get all available currency codes
        setCurrencies(currencyCodes); // Update currencies state with available codes
        fetchFlags(currencyCodes); // Fetch flag images for each currency code
      } catch (error) {
        console.error('Error fetching currencies:', error);
      }
    };
    fetchCurrencies();
  }, []);

  // Function to fetch flag image URLs for each currency code
  const fetchFlags = async (currencyCodes) => {
    const flagData = {}; // Object to store URL
    for (let code of currencyCodes) {
      flagData[code] = `https://flagcdn.com/48x36/${code
        .substring(0, 2)
        .toLowerCase()}.png`;
    }
    setFlagUrls(flagData); // Update flag URLs state
  };

  // Function to trigger fade-in animation for conversion result for better aniimation
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Keeps the value visible
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  // Function to calculate currency conversion
  const calculateConversion = async () => {
    if (!amount) return; //  if no amount is found it will exit
    try {
      // Fetch conversation based on selected
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/abfce4e195e5908dc12db64a/latest/${sourceCurrency}`
      );
      const rate = response.data.conversion_rates[targetCurrency]; // Get conversion rate for target currency
      const result = (amount * rate).toFixed(2); // Perform conversion calculation and format to 2 decimal places
      setConversionResult(
        `${amount} ${sourceCurrency} = ${result} ${targetCurrency}`
      ); // Update conversion result
      addToHistory(sourceCurrency, targetCurrency, amount, result); // Add conversion to history
      fadeAnim.setValue(0); // Reset fade animation before starting new animation
      fadeIn(); // Trigger fade-in effect for the new result
    } catch (error) {
      console.error('Error fetching conversion:', error);
    }
  };

  // Function to add conversion result to history
  const addToHistory = (from, to, amount, result) => {
    // Update history state with new conversion
    setHistory([
      { id: history.length + 1, from, to, amount, result },
      ...history,
    ]);
  };

  // Function to clear the conversion history
  const clearHistory = () => setHistory([]);

  // Function to swap source and target currencies
  const swapCurrencies = () => {
    setSourceCurrency(targetCurrency);
    setTargetCurrency(sourceCurrency);
    setConversionResult('');
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://images.pexels.com/photos/5466788/pexels-photo-5466788.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      }}
      style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Currency Converter</Text>
          </View>

          <View style={styles.card}>
            {/* Input field for the amount to be converted */}
            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={(value) => setAmount(value)}
            />

            {/* First Row: Flag and Source Currency Picker */}
            <View style={styles.row}>
              <View style={styles.currencyContainer}>
                {flagUrls[sourceCurrency] && (
                  <Image
                    source={{ uri: flagUrls[sourceCurrency] }}
                    style={styles.flag}
                  />
                )}
                {/* Render all available currencies in the picker */}
                <Picker
                  selectedValue={sourceCurrency}
                  style={styles.picker}
                  onValueChange={(itemValue) => setSourceCurrency(itemValue)}
                  itemStyle={styles.pickerItem}>
                  {currencies.map((currency) => (
                    <Picker.Item
                      key={currency}
                      label={currency}
                      value={currency}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            {/* Second Row: Swap Button */}
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.swapButton}
                onPress={swapCurrencies}>
                <Text style={styles.swapButtonText}> ⇄</Text>
              </TouchableOpacity>
            </View>

            {/* Third Row: Flag and Target Currency Picker */}
            <View style={styles.row}>
              <View style={styles.currencyContainer}>
                {flagUrls[targetCurrency] && (
                  <Image
                    source={{ uri: flagUrls[targetCurrency] }}
                    style={styles.flag}
                  />
                )}
                <Picker
                  selectedValue={targetCurrency}
                  style={styles.picker}
                  onValueChange={(itemValue) => setTargetCurrency(itemValue)}
                  itemStyle={styles.pickerItem}>
                  {currencies.map((currency) => (
                    <Picker.Item
                      key={currency}
                      label={currency}
                      value={currency}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            {/* Calculate Button to trigger conversion */}
            <TouchableOpacity
              style={styles.calculateButton}
              onPress={calculateConversion}>
              <Text style={styles.calculateButtonText}>
                {`Convert ${sourceCurrency} to ${targetCurrency}`}
              </Text>
            </TouchableOpacity>

            {/* Display conversion result or placeholder */}
            {conversionResult ? (
              <Animated.Text style={[styles.result, { opacity: fadeAnim }]}>
                {conversionResult}
              </Animated.Text>
            ) : (
              <Text style={styles.placeholderText}>
                Enter an amount and press Convert
              </Text>
            )}
          </View>

          {/* History Section: Displays previous conversions */}
          <View style={styles.historySection}>
            <View style={styles.historyHeader}>
              <Text style={styles.subHeader}>Conversion History</Text>
              <Button title="Clear" onPress={clearHistory} color="#e74c3c" />
            </View>
            <FlatList
              data={history}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Text style={styles.historyItem}>
                  {item.id}. {item.amount} {item.from} to {item.to} ={' '}
                  {item.result}
                </Text>
              )}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  headerContainer: {
    borderRadius: 15,
    marginVertical: 20,
    margin: 15,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'green',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    padding: 20,
    margin: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 18,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  currencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  flag: {
    width: 48,
    height: 36,
    marginRight: 30,
  },
  picker: {
    height: 50,
    width: 120,
  },
  pickerItem: {
    flex: 1,
    height: 50,
    fontSize: 16,
    textAlign: 'center',
    justifyContent: 'center',
  },
  swapButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swapButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  calculateButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 15,
  },
  calculateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  result: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
    marginTop: 20,
  },
  placeholderText: {
    fontSize: 16,
    color: '#222',
    textAlign: 'center',
    marginTop: 15,
  },
  historySection: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    margin: 15,
    padding: 15,
    marginTop: 20,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  historyItem: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
});

export default App;
