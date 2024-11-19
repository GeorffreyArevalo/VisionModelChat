import 'react-native-gesture-handler';


import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';

import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as theme } from './config/theme/theme.json';
import { StackNavigator } from './presentation/navigation/StackNavigator';
import { AuthProvider } from './presentation/providers/AuthProvider';

export const ChatApp = () => {

    const colorSchema = useColorScheme();
    
    const themeColor = colorSchema === 'dark' ? eva.dark : eva.light;

    const backgroundColor = colorSchema === 'dark' ? theme['color-basic-800'] : theme['color-basic-100']

  return (
    <>
      <IconRegistry icons={ EvaIconsPack } />
      <ApplicationProvider
          {...eva} theme={  { ...themeColor, ...theme } }
      >
          <NavigationContainer
            theme={{
              dark: colorSchema === 'dark',
              colors: {
                primary: theme['color-primary-500'],
                background: backgroundColor,
                card: theme['color-basic-100'],
                text: theme['color-basic-100'],
                border: theme['color-basic-800'],
                notification: theme['color-primary-500'],
              }
            }}
          >
            <AuthProvider>
              <StackNavigator />
            </AuthProvider>

          </NavigationContainer>

      </ApplicationProvider>
    </>


  )
}


