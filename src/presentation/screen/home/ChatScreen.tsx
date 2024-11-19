

import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Button, ButtonGroup, Icon, Input, Layout, Spinner, Text } from '@ui-kitten/components';
import { useEffect, useState } from 'react';
import { Alert, Image, useColorScheme, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { CameraAdapter, ObjImage } from '../../../config/adapters/camera-adapter';
import { default as theme } from '../../../config/theme/theme.json';
import { FadeInImage } from '../../components/FadeInImage';
import { useAuthStore, useChatStore } from '../../store';

interface Props extends DrawerScreenProps<any, string> {}

export const ChatScreen = ({ route }: Props) => {

  const { getCurrentChat, currentChat, sendMessage, sendingMessage } = useChatStore();
  const navigation = useNavigation();
  const { logout } = useAuthStore();
  const colorSchema = useColorScheme();
  const { width } = useWindowDimensions();
  const backgroundColorChat = colorSchema === 'dark' ? theme['color-basic-900'] : theme['color-basic-200']
  
  const [textInput, setTextInput] = useState<string>('');
  const [image, setImage] = useState<string | undefined>();
  const [imageObj, setImageObj] = useState<ObjImage | undefined>();

  useEffect(() => {
    getCurrentChat( route.params?.idChat )
  }, []);

  const onSendMessage = async() => {

    if( textInput.trim() === '' ) {
      Alert.alert('Error', 'Debe ingresar un mensaje.');
      return;
    }

    setTextInput('');
    setImage(undefined);

    const resp = await sendMessage( textInput, image, route.params?.idChat, imageObj );

    setImageObj(undefined);
    if(!resp) {
      Alert.alert('Error', 'Ha ocurrido un error al proceosar la respuesta.');
    }


  }

  return (
    <Layout
      style={{
        flex: 1
      }}
    >

      <Layout
        style={{
          paddingVertical: 10,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row'
        }}
      >
        <Button
          onPress={() => navigation.dispatch( DrawerActions.toggleDrawer() )}
          appearance='ghost'
          status='primary'
          accessoryRight={ <Icon name='menu' /> }
        />
        
        <Button
          appearance='ghost'
          status='danger'
          accessoryRight={<Icon name='power' />}
          onPress={ logout }
        />
      </Layout>

      
        <Layout
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          >

            

          {
            (!route.params && !currentChat)
            && (
              <Image source={ require('../../../../assets/logo.png') } style={{ width: 80, height: 80, opacity: .5 }} />
            )
          }

          {
            ( (route.params && !!currentChat) || ( !route.params && !!currentChat ) ) && (
              <ScrollView
                
              >
                <Layout
                  style={{
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: 10,
                    width: width,
                    paddingHorizontal: 10,
                    paddingBottom: 10
                  }}
                >
                  {
                    currentChat.map( (chat, index) => (
                      <Layout style={{
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                        backgroundColor: chat.role === 'assistant' ? backgroundColorChat : theme['color-primary-700'],
                        borderRadius: 15,
                        maxWidth: width * 0.8,
                        alignSelf: chat.role === 'assistant' ? 'flex-start' : 'flex-end',
                      }}
                      key={index}
                      >
                        {
                          !!chat.urlImage && (
                            <FadeInImage uri={chat.urlImage} style={{ width: width * 0.75, height: width * 0.75, objectFit: 'cover' }} />
                          )
                        }
                        <Text>
                          { chat.content }
                        </Text>
                        
                        
                      </Layout>
                    ))

                  }
                  {
                    sendingMessage && (
                      <Layout
                        style={{
                          alignSelf: 'flex-start',
                          borderRadius: 15,
                          maxWidth: width * 0.8,
                          paddingVertical: 10,
                          paddingHorizontal: 15,
                          backgroundColor: backgroundColorChat,
                          opacity: 0.7,
                          flexDirection: 'row',
                          gap: 10
                        }}
                      >
                        <Text>Generando respuesta</Text>
                        <Spinner size='tiny' />
                      </Layout>
                    )
                  }
                </Layout>
              </ScrollView>
            )
          }
          
          {
            (route.params && !currentChat) &&
            (
              <Spinner status='primary' size='giant' />
            )
          }


        </Layout>

      
      <Layout>


          
          {
            image &&
            <Layout
              style={{
                marginBottom: 10,
                alignSelf: 'flex-start',
                position: 'relative'
              }}
            >

              <Button
                accessoryLeft={ <Icon name='close-outline'  /> }
                style={{
                  position: 'absolute',
                  zIndex: 10,
                  right: -10,
                  top: -10,
                  borderRadius: 10000
                }}
                status='danger'
                size='tiny'
                onPress={() => setImage(undefined)}
              />

              <FadeInImage uri={image}
                style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 10 }}
              />
            </Layout>
          }


        

        <Layout
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 5,
            paddingBottom: 10
          }}
        
        >

          

          <ButtonGroup
            appearance='ghost'
          >
            <Button
              accessoryLeft={ <Icon name='camera-outline'  /> }
              style={{
                maxHeight: 40,
                maxWidth: 40
              }}
              appearance='ghost'
              onPress={ async() => {
                const photo = await CameraAdapter.takePicture();
                if(photo) {
                  setImage(photo.uri)
                }
                setImageObj(photo);
              }}
              disabled={sendingMessage}
            />

            <Button
              accessoryLeft={ <Icon name='image-outline'  /> }
              style={{
                maxHeight: 40,
                maxWidth: 40
              }}
              appearance='ghost'
              onPress={ async() => {
                const photo = await CameraAdapter.getPicturesFromLibrary();
                if(photo) {
                  setImage(photo.uri)
                }
                setImageObj(photo);
              }}
              disabled={sendingMessage}
            />

          </ButtonGroup>


          <Input
            placeholder='Escribe algo...'
            style={{
              borderRadius: 15,
              flex: 1
            }}
            multiline
            value={ textInput }
            onChangeText={ (value) =>  setTextInput(value)}
          />

          <Button
            accessoryLeft={ <Icon name='corner-right-up'  /> }
            style={{
              borderRadius: 100,
              maxHeight: 40,
              maxWidth: 50
            }}
            onPress={onSendMessage}
            disabled={sendingMessage}
          />
          
        </Layout>
      </Layout>
      


    </Layout>
  )
}

