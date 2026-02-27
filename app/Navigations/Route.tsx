import React, { useState, useEffect } from "react";
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch } from 'react-redux';
import StackNavigator from "./StackNavigator";
import themeContext from "../constants/themeContext";
import { COLORS } from "../constants/theme";
import { loadAuth } from "../utils/authStorage";
import { setUser } from "../redux/reducer/user";


const Routes = () => {

  const dispatch = useDispatch();
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    loadAuth().then((data) => {
      if (data) {
        dispatch(setUser(data));
      }
    });
  }, [dispatch]);
  
  const authContext = React.useMemo(() => ({
    setDarkTheme: () => {
      setIsDarkTheme(true);
    },
    setLightTheme: () => {
      setIsDarkTheme(false);
    }
  }), []);

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      background: COLORS.background,
      title: COLORS.title,
      card: COLORS.card,
      text: COLORS.text,
      textLight: COLORS.textLight,
      input: COLORS.input,
      border: COLORS.borderColor,
      checkBoxborder: COLORS.checkBoxborderColor,
      
      //Gray-Color-Code-Light
      gray100:COLORS.Gray100,
      gray90:COLORS.Gray90,
      gray80:COLORS.Gray80,
      gray70:COLORS.Gray70,
      gray60:COLORS.Gray60,
      gray50:COLORS.Gray50,
      gray40:COLORS.Gray40,
      gray30:COLORS.Gray30,
      gray20:COLORS.Gray20,
      gray10:COLORS.Gray10,
    }
  }

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      background: COLORS.darkBackground,
      title: COLORS.darkTitle,
      card: COLORS.darkCard,
      text: COLORS.darkText,
      textLight: COLORS.darkTextLight,
      input: COLORS.darkInput,
      border: COLORS.darkBorder,
      checkBoxborder: COLORS.darkcheckBoxborderColor,

      //Gray-Color-Code-Light
      gray100:COLORS.darkGray100,
      gray90:COLORS.darkGray90,
      gray80:COLORS.darkGray80,
      gray70:COLORS.darkGray70,
      gray60:COLORS.darkGray60,
      gray50:COLORS.darkGray50,
      gray40:COLORS.darkGray40,
      gray30:COLORS.darkGray30,
      gray20:COLORS.darkGray20,
      gray10:COLORS.darkGray10,
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  return (
    <SafeAreaProvider>
      <themeContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          <StackNavigator />
        </NavigationContainer>
      </themeContext.Provider>
    </SafeAreaProvider>
  );

};
export default Routes;
