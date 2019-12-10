# SlugRide 

**Team SlugRide:** Neel Jain,  Yuval Gilad, Sean Dow

SlugRide is a cross-platform ride-sharing app designed to assist UCSC students who commute to campus. It allows a driver to list a time and location where they will pick students up on their way to campus, and allows other users of the app to sign up for those rides. 

## Technologies and Frameworks

SlugRide is built using React Native, allowing builds on both iOS and Android with relative ease (Windows Phone support untested). It uses Firebase's cloud storage as its database. 

## Installation

Install React Native using instructions found online. Facebook has a guide which can be found [here](https://facebook.github.io/react-native/docs/getting-started). **Note:** This project uses the React Native CLI, instead of the Expo CLI, so you'll want to follow directions that correspond to the correct CLI. You do not need to initialize a new project.

`NodeJS` and `npm` must also be installed on the system. 

Next, clone the repo in your chosen directory  
```
git clone https://github.com/ygilad-tech/Slug-Ride.git
```

Then `cd` into the repo and install the node dependencies
```
npm install
```  

You've now installed the project and its dependencies. The rest of the installation depends on if you're building for iOS or Android.

-----

### Android

Android installation is as simple as installing Android Studio and creating a virtual device for the emulator to run the app on. Instructions on how to do this may be found online.

### iOS

iOS insallation requires you to install Xcode to gain access to the simulator. If you haven't previously, you may need to install `cocoapods`: 
```
sudo gem install cocoapods
```

Then, `cd` into the `react-native/ios` directory and run:  
```
pod install
```

This should install the cocoapods dependencies. 

-----

### Build the app

Once the installation is complete, you can build the app easily. `cd` into the `react-native` directory, and type:

```react-native start```

This starts up the build server. Then, open another terminal and depending on which platform you're targeting, type either:

```
    react-native run-android
    # or 
    react-native run-ios
```

The simulator / emulator should launch and the app should build!
