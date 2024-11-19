import { launchCamera, launchImageLibrary } from "react-native-image-picker";

export interface ObjImage {
    uri?: string;
    type?: string;
    fileName?: string;
}

export class CameraAdapter {


    static async takePicture(): Promise<ObjImage | undefined> {
    
        const response = await launchCamera({
            mediaType: 'photo',
            quality: 0.7,
            cameraType: 'back'
        });

        if( response.assets && response.assets[0].uri ) {
            return {
                uri: response.assets[0].uri,
                type: response.assets[0].type,
                fileName: response.assets[0].fileName
            };
        }
        
        return;
        
    }
    
    static async getPicturesFromLibrary(): Promise<ObjImage | undefined> {
        
        const response = await launchImageLibrary({
            mediaType: 'photo',
            quality: 0.7,
            selectionLimit: 1
        });
        
        if( response.assets && response.assets[0].uri ) {
            return {
                uri: response.assets[0].uri,
                type: response.assets[0].type,
                fileName: response.assets[0].fileName
            };
        }

        return;

    }

}

