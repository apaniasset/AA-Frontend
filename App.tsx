import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Routes from './app/Navigations/Route';
import { Provider } from 'react-redux';
import store from './app/redux/store';


const App = () =>{
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <Routes/>
        </Provider>
      </SafeAreaProvider>
    );
};

export default App;
