import {createStackNavigator} from '@react-navigation/stack';
import {DarkTheme, DefaultTheme, NavigationContainer, useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import NoteDetails from './components/NoteDetails';
import NoteScreen from './screens/NoteScreen';
import {Appearance, LogBox} from 'react-native';
import NoteProvider from './contexts/NoteProvider';
import { EventRegister } from 'react-native-event-listeners';

const Stack = createStackNavigator();

export default function App() {
  const [darkApp,setDarkApp] = useState(false);
  const appTheme = darkApp ? DarkTheme : DefaultTheme;

  const {colors} = useTheme();
  const colorScheme = Appearance.getColorScheme();

  useEffect(() => {
  
    if(colorScheme == "dark") {
    setDarkApp(true);
    }

    let eventListener = EventRegister.addEventListener(
      'changeThemeEvent',
       (data) => {
         setDarkApp(data);
      });
    return () => {
      EventRegister.removeEventListener(eventListener);
    };
  }, []);

  return (
    <NavigationContainer theme={appTheme}>
      <NoteProvider>
        <Stack.Navigator
          screenOptions={{headerTitle: '', headerTransparent: true}}>
          <Stack.Screen component={NoteScreen} name="NoteScreen" />
          <Stack.Screen component={NoteDetails} name="NoteDetails" />
        </Stack.Navigator>
      </NoteProvider>
    </NavigationContainer>
  );
}

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
