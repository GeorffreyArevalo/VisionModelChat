import { StackScreenProps } from '@react-navigation/stack';
import { Button, Icon, Input, Layout, Text } from '@ui-kitten/components';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';
import { useState } from 'react';
import { Alert } from 'react-native';
import { AuthLayout } from '../../layouts/AuthLayout';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useAuthStore } from '../../store';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'>{}


export const LoginScreen = ({ navigation }: Props) => {

    const { login } = useAuthStore();

    const [showPassword, setShowPassword] = useState<boolean>(true);
    
    const [form, setForm] = useState({
        username: '',
        password: '',
    });

    const [isPosting, setIsPosting] = useState(false);

    const onLogin = async() => {

        if(form.username.trim() === '' || form.password.trim() === '') return;
        setIsPosting(true);
        
        const wasSuccess = await login(form.username, form.password);
        setIsPosting(false);

        if(wasSuccess) return;

        Alert.alert('Error', 'Nombre de usuairo o contraseña incorrectos.')
    }

    
  return (


    <AuthLayout
        title='Iniciar Sesión'
        subtitle='Ingrese sus Credenciales Para Iniciar Sesión'
    >
        <Layout
            style={{ backgroundColor: 'transparent', marginTop: 40 }}
        >

            <Input
                placeholder='Nombre de Usuario'
                label={'Nombre de Usuario'}
                autoCapitalize='none'
                keyboardType='default'
                style={{
                    marginBottom: 20,
                    borderRadius: 15,
                }}
                accessoryLeft={<Icon name='person' />}
                value={ form.username }
                onChangeText={ (username) => setForm({...form, username}) }
            />

            <Input
                value={ form.password }
                onChangeText={ (password) => setForm({...form, password}) }
                placeholder='Contraseña'
                label={'Contraseña'}
                autoCapitalize='none'
                secureTextEntry={showPassword}
                style={{
                    marginBottom: 20,
                    borderRadius: 15,
                }}
                accessoryLeft={ <Icon name='lock' /> }
                accessoryRight={
                    <TouchableWithoutFeedback
                        onPress={() => setShowPassword( currentValue => !currentValue )}
                    >
                        <Icon name={ showPassword ? 'eye' : 'eye-off' } />
                    </TouchableWithoutFeedback>
                }
            />

            <Layout style={{ height: 10 }} />

            <Layout>
                <Button
                    disabled={isPosting}
                    onPress={onLogin}
                >
                    { isPosting ? 'Cargando...' : 'Iniciar Sesión' }
                </Button>
            </Layout>

            <Layout style={{ height: 30 }} />

            <Layout style={{ alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'center', gap: 5 }}>
                <Text style={{ fontSize: 16 }} >¿No tienes Una Cuenta?</Text>
                <Text style={{ fontSize: 16 }} status='primary' category='s1' onPress={() => navigation.navigate('RegisterScreen')}>Crea una</Text>
            </Layout>
            <Layout style={{ height: 30 }} />

        </Layout>
    </AuthLayout>
    
  )
}