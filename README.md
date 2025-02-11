# Currency Converter Application

A modern, user-friendly mobile currency converter built with **React Native**. This app allows users to quickly convert between different currencies, view live exchange rates, and keep track of conversion history with an appealing, visually enhanced interface.

## Screenshots

![Currency Converter App Interface](/assets/currencyconverterapp.png)
*Figure 1: User interface of the Currency Converter App showcasing real-time currency conversion and interactive features.*

## Features

- **Real-Time Currency Conversion**:  
  Fetches live exchange rates via the [ExchangeRate-API](https://www.exchangerate-api.com/) for accurate currency conversions.

- **Currency Picker with Flags**:  
  Displays a comprehensive list of available currencies along with their national flags.

- **Interactive Animation**:  
  Conversion results include fade-in animations for an engaging user experience.

- **Conversion History**:  
  Automatically saves conversion transactions with the option to clear the history.

- **Swap Currency Functionality**:  
  Quickly switch between source and target currencies.

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed.
- **React Native Environment**: Follow the [React Native CLI setup guide](https://reactnative.dev/docs/environment-setup).

### Installation

1. Clone the repository:  
   ```bash  
   git clone https://github.com/NevilPatel01/currency-converter.git  
   cd currency-converter  
   ```
2. Install dependencies:

    ```bash
    npm install  
    ```

3. Set up your ExchangeRate-API key:
-   Replace YOUR_API_KEY in the https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD URL in the code with your API key.

4. Run the app:
    ### for Android
    ```bash
    npx react-native run-android
    ```
    ### for iOS
    ```bash
    npx react-native run-ios
    ```
## Usage

1.  Enter the amount to be converted in the input field.
2.  Select source and target currencies using the dropdown menus.
3.  Tap on Convert to fetch the conversion rate and see the result.
4.  Use the Swap button to quickly exchange source and target currencies.
5.  View past conversions in the History section or clear the history when needed.

## Technologies
-   React Native: Framework for building native mobile applications.
-   Axios: HTTP client for API requests.
-   Animated API: For UI animations.