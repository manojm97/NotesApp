import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import NoteDetails from './components/NoteDetails';
import NoteScreen from './screens/NoteScreen';
import { LogBox } from 'react-native';
import NoteProvider from './contexts/NoteProvider';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);