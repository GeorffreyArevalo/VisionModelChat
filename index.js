/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { ChatApp } from './src/ChatApp';

AppRegistry.registerComponent(appName, () => ChatApp);
