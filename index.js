/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import React, { Component } from 'react';
import { Image } from 'react-native';

AppRegistry.registerComponent(appName, () => App);
