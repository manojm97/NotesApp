# React Native NotesApp

 This is a simple notes app built using react native.

# Demo

 Android device | iOS device with dark mode
:----------:|:---------:
<img src="https://github.com/manojm97/NotesApp/blob/master/Notes_App.gif"> | <img src="https://github.com/manojm97/NotesApp/blob/master/NotesApp_iOS.gif" height="800">

# Xcode Simulator Test results

Light mode | Dark mode
:----------:|:---------:
<img src="https://i.postimg.cc/KYMcJYw1/IMG-5551.png"> | <img src="https://i.postimg.cc/XYh7f5HM/IMG-5546.png">


## Setup

## Android Studio
Need to install [Android studio](https://developer.android.com/studio) to setup an app for Android device/Emulator and to run it.

## Xcode
Need Mac and install [Xcode](https://developer.apple.com/xcode) to setup an app for iOS device/Simulator and to run on physical iOS device apple provides free provisioning certificate for 7 days which can be used to sign the app to be able to run on physical device and to extend the app to be tested on physical device after 7 days, need to enroll for apple developer program and purcahse it.

## Using react-native-cli

## For Android

#### `npx react-native start`

Runs metro using node.
This is needed to run the app from development server either in simulator or physical device on Android.

#### `npx react-native run-android`

Like `npx start`, but also attempts to open app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://reactnative.dev/docs/getting-started) for detailed setup).

## For iOS

### iOS working code has been pushed to new branch [iOS-working-code](https://github.com/manojm97/NotesApp/tree/iOS-working-code)

#### Clone iOS working code from this branch [iOS-working-code](https://github.com/manojm97/NotesApp/tree/iOS-working-code)

#### Make sure pods is installed inside ios folder of project root folder

#### `cd ios && pods install && cd ..`

#### `npx react-native run-ios`

Like `npx start`, but also attempts to open app in the iOS Simulator on a Mac and if it it installed.

