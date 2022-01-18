import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import NoteDetails from './app/components/NoteDetails';
import NoteScreen from './app/screens/NoteScreen';
import { LogBox } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerTitle: '', headerTransparent: true}}>
        <Stack.Screen component={NoteScreen} name="NoteScreen" />
        <Stack.Screen component={NoteDetails} name="NoteDetails" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);