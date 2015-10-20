## Card Manager

Card manager is an mobile app built with React Native. It can be bundled into an Android/iOS app.

### Run on Device

For android platform, you can bundle it into an .apk file then run it on an real android device.

#### Generate Installation Target

#### Install on Device

### Development

You are welcome to add any feature or fix a bug for this project.

If React Native is something new to you, this tutorial may be some of help: [Development Tutorial - React Native](https://facebook.github.io/react-native/docs/tutorial.html)

*NOTE: You NEED to know React and Javascript before developing.*

#### Get source code
```
$git clone https://github.com/zhenhuagong/card-manager.git
$cd card-manager
```

#### Prepare the environment

Before you start, there are some tips for you:

- Run `brew update` before `brew install watchman && brew install flow`
- Do `brew unlink node` if you had node installed before via `brew install node`
- If your network connection to Github comes very slow, set protocol for git: `git config --global url."https://github.com/".insteadOf git@github.com:`
- Make sure your current node version is newer than 4.0.0
    + You can use `nvm` to manage your node version
- For android development, you __MAY__ need to create a file named `local.properties` at the directory `android/`
    + `vim android/local.properties`
    + Add a new line into this file: `sdk.dir=/usr/local/opt/android-sdk`

Then you can follow the official tutorial to prepare the environment: [React Native Tutorial](https://facebook.github.io/react-native/docs/getting-started.html)

### Run

#### On Android
```
$npm install
$adb reverse tcp:8081 tcp:8081  # Optional
$react-native run-android
```

#### On iOS

### Debug

### License
[GNU GPL](LICENSE.md)
