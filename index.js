/**
 * @format
 */

import {AppRegistry,Text} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import {Input,} from 'react-native-elements';
if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;
if (Input.defaultProps == null) Input.defaultProps = {};
Input.defaultProps.allowFontScaling = false;
AppRegistry.registerComponent(appName, () => App);
