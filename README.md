# React Native NotesApp

This is a simple notes app built using react native.

## Demo

<img src="https://github.com/manojm97/NotesApp/blob/master/Notes_App.gif">

## Setup

### Android Studio
Need to install Android studio to setup an app for Android device/Emulator and to run it.

### Xcode
Need Mac and install Xcode to setup an app for iOS device and can only run on Simulator until we enroll for Apple developer program.

## Using react-native-cli

### `npx react-native start`

Runs metro using node.
This is needed to run the app from development server either in simulator or physical device on Android.

#### `npx react-native run-android`

Like `npx start`, but also attempts to open app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://reactnative.dev/docs/getting-started) for detailed setup).

#### `npx react-native run-ios`

Like `npx start`, but also attempts to open app in the iOS Simulator on a Mac and if it it installed.

