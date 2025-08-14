---
title: "Complete Guide to Building and Running Expo(React Native) Apps"
date: 2025-01-13T23:03:02+05:45
draft: false
# weight: 1
# aliases: ["/first"]
categories: ["Expo/React Native"]
tags: ["mobile", "pinned"]
author: "Me"
# author: ["Me", "You"] # multiple authors
showToc: true
TocOpen: false
description: "Desc Text."
canonicalURL: "https://canonical.url/to/page"
ShowReadingTime: true
ShowBreadCrumbs: true
ShowPostNavLinks: true
ShowWordCount: true
cover:
  image: "https://images.ctfassets.net/oae75tj4gg8d/1skfknXgpOlfjzqEAeQDRG/662f837cc678d66eaa9214050fdfaa4b/expo-diagram1_compare_2x.png" # image path/url
  alt: "Complete Guide to Building and Running Expo(React Native) Apps" # alt text
  caption: "<blog image>" # display caption under cover
  relative: false # when using page bundles set this to true
  hidden: true # only hide on current single page
---

![Expo](https://images.ctfassets.net/oae75tj4gg8d/1skfknXgpOlfjzqEAeQDRG/662f837cc678d66eaa9214050fdfaa4b/expo-diagram1_compare_2x.png)

## Summary

This guide covers five main methods to build and run Expo applications:

1. **Expo Go** - Fastest method for development and testing, limited to built-in native modules
2. **Expo Prebuild** - Generates native code when additional native modules are needed
3. **Native Builds** - Direct builds through Android Studio or Xcode
4. **EAS (Expo Application Service)** - Cloud-based build service for production releases
5. **Debugging Tools** - Various options for debugging your Expo app

## 1. Expo Go

The simplest way to test your app during development.

**Basic Commands:**

```bash
npx expo start  # or just: npx expo
```

**Run Options:**

- Scan QR code with Expo Go app on device
- Press `a` - Run on Android (simulator or connected device)
- Press `i` - Run on iOS simulator
- Press `w` - Run in web browser

## 2. Expo Prebuild

Use when you need additional native modules not included in Expo Go.

**Generate Native Code:**

```bash
# Generate for both platforms
npx expo prebuild

# Platform specific
npx expo prebuild --platform android
npx expo prebuild --platform ios

# Reset native code after config changes
npx expo prebuild --clean
```

**Run Development Build:**

```bash
# Build and run
npx expo run:android
npx expo run:ios

# Run on connected device
npx expo run:android --device
npx expo run:ios --device
```

## 3. Native Builds

### Android (via Android Studio)

```bash
# Development build
npx expo run:android

# Release build
npx expo run:android --variant release --device
cd android && ./gradlew assembleRelease
```

### iOS (via Xcode)

```bash
# Development build
npx expo run:ios

# Release build
npx expo run:ios --configuration Release --device
```

**Note:** Keep Metro server running in background for development builds.

## 4. EAS Builds

**Setup:**

```bash
# Install and configure
npm install --global eas-cli
eas login
eas build:configure
```

**Build Commands:**

```bash
# Production builds
eas build --platform all
eas build --platform android
eas build --platform ios

# Development/Preview builds
eas build -p android --profile preview
eas build -p ios --profile preview

# Local builds
eas build -p android --profile development --local
eas build -p ios --profile development --local
```

## 5. Debugging Options

- Press `j` - Open Chrome DevTools
- Press `cmd + ctrl + z` - Open React Native debugger UI
- Install enhanced debugger:
  ```bash
  npx expo install expo-dev-client
  ```
  Then use `cmd + ctrl + z`

## Best Practices

1. Start with Expo Go for rapid development
2. Use Prebuild when you need custom native modules
3. Use EAS for production builds
4. Use Native Builds when you need platform-specific customizations
5. Always test on both platforms before releasing
