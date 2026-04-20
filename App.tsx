import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
import Routes from './app/Navigations/Route';
import { Provider } from 'react-redux';
import store from './app/redux/store';


const App = () =>{
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <Routes/>
          <FlashMessage position="top" />
        </Provider>
      </SafeAreaProvider>
    );
};

export default App;
