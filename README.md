# RockHawk

## To install:
### Before you install make sure you have:
* npm version >= 5.3.0
* node v8.4.0 or higher.

### After installing node:
1. Download or Clone repo using git on local machine.
2. Using the terminal, navigate to the root project folder and run:
```
npm install
```
3. If you have never installed a react native project you will need to install (via node)
```
npm install -g react-native-cli
```
4. Inside root project directory Run
If you want to run on a IOS simulator, with no device plugged in you can run:
```
react-native run-ios
```
If you have a IOS device plugged in you would open the file /app/ios/RockHawk.xcworkspace and click the run button if xcode lists your device.

To run on android, if you have a device plugged in you can run:
```
react-native run-android
```
If no android device is plugged in, you can load an android simulator via Android Studios, and run the same command as above to load the app on the simulator.
