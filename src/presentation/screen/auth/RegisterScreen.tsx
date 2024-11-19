import { StackScreenProps } from "@react-navigation/stack"
import { Button, Icon, Input, Layout, Text } from "@ui-kitten/components"
import { useState } from "react"
import { Alert } from "react-native"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import { AuthLayout } from "../../layouts/AuthLayout"
import { RootStackParams } from "../../navigation/StackNavigator"
import { useAuthStore } from "../../store"

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'>{}

export const RegisterScreen = ({ navigation }: Props) => {


    const { register } = useAuthStore();

    const [showPassword, setShowPassword] = useState(true)

    const [form, setForm] = useState({
        name: '',
        username: '',
        password: '',
    });

    const [isPosting, setIsPosting] = useState(false);

    const onRegister = async() => {

        if(form.username.trim() === '' || form.password.trim() === '' || form.name.trim() === '') return;

        setIsPosting(true);

        const wasSuccess = await register( form.name, form.username, form.password );
        
        setIsPosting(false);

        if(wasSuccess) return;

        Alert.alert('Error', 'El nombre de usuario ya existe.');



    }
    

  return (
    <AuthLayout title="Crear Una Cuenta" subtitle="Ingrese sus Datos Para Crear una Cuenta.">
        <Layout
            style={{ backgroundColor: 'transparent', marginTop: 40 }}
        >
            <Input
                value={ form.name }
                onChangeText={ (name) => setForm({...form, name})}
                placeholder='Nombre Completo'
                autoCapitalize='none'
                keyboardType='default'
                label={'Nombre Completo'}
                style={{
                    marginBottom: 20,
                    borderRadius: 15,
                }}
                accessoryLeft={ <Icon name="person" /> }
                />

            <Input
                value={ form.username }
                onChangeText={ (username) => setForm({...form, username})}
                placeholder='Nombre de Usuario'
                autoCapitalize='none'
                keyboardType='default'
                label={'Nombre de Usuario'}
                style={{
                    marginBottom: 20,
                    borderRadius: 15,
                }}
                accessoryLeft={ <Icon name="person" /> }
                />

            <Input
                value={ form.password }
                onChangeText={ (password) => setForm({...form, password})}
                placeholder='Contraseña'
                autoCapitalize='none'
                secureTextEntry={showPassword}
                label={'Contraseña'}
                style={{
                    marginBottom: 20,
                    borderRadius: 15,
                    
                }}
                accessoryLeft={ <Icon name="lock" /> }
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
                    onPress={onRegister}
                >
                    { isPosting ? 'Cargando...' : 'Crear Cuenta' }
                </Button>
            </Layout>

            <Layout style={{ height: 30 }} />

            <Layout style={{ alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'center', gap: 5 }}>
                <Text style={{ fontSize: 16 }} >¿Tienes Una Cuenta?</Text>
                <Text style={{ fontSize: 16 }} status='primary' category='s1' onPress={() => navigation.navigate('LoginScreen')}>Iniciar Sesión</Text>
            </Layout>
            <Layout style={{ height: 30 }} />

        </Layout>
    </AuthLayout>
  )
}

