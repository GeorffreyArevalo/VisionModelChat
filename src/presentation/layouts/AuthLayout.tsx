import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { Image, ImageBackground } from "react-native";


interface Props {
    children: React.ReactNode;
    title: string;
    subtitle: string;
}


export const AuthLayout = ({ children, subtitle, title }: Props) => {
    const image = require('../../../assets/bg.png');
  return (
    <ImageBackground
            source={image} resizeMode='cover'
            style={{
                flex: 1,
                justifyContent: 'flex-end',
            }}
        >
            <Layout
                style={{ overflow: 'hidden', borderTopRightRadius: 20, borderTopLeftRadius: 20, paddingHorizontal: 20 }}
            >
                <Image source={ require('../../../assets/logo.png') } style={{ width: 100, height: 101, marginTop: 20, marginBottom: 5, marginHorizontal: 'auto' }}  />
                <Layout>
                    <Text category='h2' style={{
                        textAlign: 'center',
                        paddingVertical: 10
                    }}>{title}</Text>

                    <Text category='p2' style={{ textAlign: 'center', fontSize: 18

                    }}>{subtitle}</Text>

                </Layout>

                {children}



            </Layout>
        </ImageBackground>
  )
}


