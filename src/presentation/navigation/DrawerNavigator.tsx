import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Image, useColorScheme, useWindowDimensions } from "react-native";
import { ChatScreen } from "../screen/home/ChatScreen";

import { Button, Divider, Icon, Layout, Text } from "@ui-kitten/components";
import { useEffect } from "react";
import { default as theme } from '../../config/theme/theme.json';
import { useAuthStore, useChatStore } from "../store";



const Drawer = createDrawerNavigator();




export const  DrawerNavigator = () => {

  const dimensions = useWindowDimensions();

  const colorSchema = useColorScheme();
  
  

  const backgroundColor = colorSchema === 'dark' ? theme['color-basic-800'] : theme['color-basic-100'];

  const backgroundItemColorActive = colorSchema === 'dark' ? theme['color-basic-900'] : theme['color-basic-200']

  const { getListChats, chats } = useChatStore();

  useEffect(() => {
    getListChats();
  }, []);
  


  return (
    
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}

      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerActiveBackgroundColor: backgroundItemColorActive,
        drawerItemStyle: {
          borderRadius: 10,
        },
        drawerStyle: {
          backgroundColor: backgroundColor
        }
      }}
    >

      <Drawer.Screen
        name="NewChat" component={ChatScreen}
        options={{
          unmountOnBlur: true,
          drawerItemStyle: { display: 'none' }
        }}
      />

      {
        chats != undefined ? (
          chats.map( (chat, index) => (
            <Drawer.Screen
              name={`${index + 1}. ${chat.title}`} component={ChatScreen} key={chat.id}
              initialParams={{ idChat: chat.id }} options={{ unmountOnBlur: true, }}
            />
            
          ))
        ) : <></>
      }

    </Drawer.Navigator>

  )
}

const CustomDrawerContent = ( props: DrawerContentComponentProps ) => {

  const { user } = useAuthStore();
  props
  const onNewChat = () => {
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'NewChat' }]
    })
  }

  return (
    <DrawerContentScrollView>

      <Layout
        style={{
          alignContent: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row'
        }}
      >
        
        <Layout

          style={{
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            gap: 10,
            paddingVertical: 20,
            paddingHorizontal: 15,
            marginTop: 20
          }}
        
        >

          <Image source={require('../../../assets/logo.png')} style={{ height: 30, width: 30 }} />


          <Text category="h5">{user?.name}</Text>

          
          
        </Layout>

        <Button
          appearance='ghost'
          status='primary'
          size="large"
          accessoryRight={ <Icon name='plus-square-outline' /> }
          onPress={onNewChat}
        />

      </Layout>


      <Divider />

        <Layout style={{ height: 15 }} />

        <Text category="p2" style={{ paddingHorizontal: 15, paddingVertical: 5, fontWeight: "900", fontSize: 16 }}>Chats</Text>

      <DrawerItemList {...props}/>
    </DrawerContentScrollView>
  )

}


