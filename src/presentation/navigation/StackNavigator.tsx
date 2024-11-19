import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screen/auth/LoginPage";
import { RegisterScreen } from "../screen/auth/RegisterScreen";
import { LoadingScreen } from "../screen/loading/LoadingPage";
import { DrawerNavigator } from "./DrawerNavigator";


export type RootStackParams = {
    LoginScreen: undefined;
    LoadingScreen: undefined;
    RegisterScreen: undefined;
    HomeScreen: undefined;
}


const Stack = createStackNavigator<RootStackParams>();


export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
          headerShown: false,
      }}
      initialRouteName="LoadingScreen"
    >
      <Stack.Screen name="LoadingScreen" component={LoadingScreen}  />
      <Stack.Screen name="LoginScreen" component={LoginScreen}  />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen}  />
      <Stack.Screen name="HomeScreen" component={DrawerNavigator} />
        
    </Stack.Navigator>
  )
}