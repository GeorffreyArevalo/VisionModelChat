import { chatApi } from "../../config";
import { ObjImage } from "../../config/adapters/camera-adapter";
import { ChatMapper, ChatMessageResponse, ChatResponse, MessageMapper, MessageResponse } from "../../infrastructure";



export const getChatsUser = async() => {

    try {
        const {data} = await chatApi.get<ChatResponse[]>('/chat/get_chats_by_user');
        return data.map( ChatMapper.chatResponseToChat );
    } catch (error) {
        console.log(error);
        return null;
    }

}

export const getMessagesChat = async( idChat: number ) => {

    try {
        const { data } = await chatApi.get<MessageResponse[]>(`/chat/get_messages/${idChat}`);
        return data.map( MessageMapper.messageResponseToMessage )
    } catch (error) {
        console.log(error);
        return null;
    }

}

export const createChat = async( title: string ) => {

    try {
        const { data } = await chatApi.post<ChatResponse>('/chat/create_chat', {
            title
        });
        return ChatMapper.chatResponseToChat( data );
    } catch (error) {
        console.log(error);
        return null;
    }

}

export const sendMessage = async( question: string, idChat?: number, image?: ObjImage) => {

    try {
        
        const body = new FormData();

        body.append('question', question);

        if(idChat){
            body.append('id_chat', idChat);
        }
        
        
        if(image){

            body.append('image', {
                uri: image?.uri,
                name: image.fileName,
                type: image.type,
            });

        }


        const {data} = await chatApi.post<ChatMessageResponse>('/chat/send_message', body, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        return data;

    } catch (error) {
        console.log(error);
        return null;
    }

}


