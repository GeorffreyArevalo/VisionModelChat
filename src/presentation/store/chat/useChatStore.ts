import { create } from "zustand";
import { createChat, getChatsUser, getMessagesChat, sendMessage } from "../../../actions";
import { ObjImage } from "../../../config/adapters/camera-adapter";
import { Chat, Message } from "../../../domain";
import { ChatMessageResponse } from "../../../infrastructure";

export interface ChatState {
    chats?: Chat[];
    currentChat?: Message[];
    newChat: boolean;
    sendingMessage: boolean;
    idCurrentChat?: number;
    
    getListChats: () => Promise<boolean>;
    getCurrentChat: ( idChat: number ) => Promise<boolean>;
    sendMessage: ( question: string, image?: string, idChat?: number, imageObj?: ObjImage ) => Promise<ChatMessageResponse | null>;
}

export const useChatStore = create<ChatState>()( (set, get) => ({

    chats: undefined,
    currentChat: undefined,
    newChat: false,
    sendingMessage: false,
    idCurrentChat: undefined,

    getListChats: async() => {
        set((value) => ({ ...value, chats: undefined }));
        const resp = await getChatsUser();
        if(!resp){
            set((value) => ({ ...value, chats: undefined }));
            return false;
        }
        set((value) => ({ ...value, chats: resp }));
        return true;
    },
    getCurrentChat: async(idChat: number) => {
        set((value) => ({ ...value, currentChat: undefined, idCurrentChat: idChat, sendingMessage: false }));
        const resp = await getMessagesChat( idChat );
        if(!resp){
            set((value) => ({ ...value, currentChat: undefined }));
            return false;
        }
        set((value) => ({ ...value, currentChat: resp }));
        
        return true;
    },
    sendMessage: async( question: string, image?: string, idChat?: number, imageObj?: ObjImage ) => {


        if( get().currentChat ) {
            set( (value) => ({ ...value, currentChat: [
                ...value.currentChat!, {
                    content: question, role: 'user', urlImage: image
                }
            ] }) );

            set( (value) => ({
                ...value, newChat: false,
            }))
            
        } else {
            set( (value) => ({ ...value, currentChat: [
                {
                    content: question, role: 'user', urlImage: image
                }
            ] }) );

            set( (value) => ({
                ...value, newChat: true,
            }))
        }

        set((value) => ({
            ...value, sendingMessage: true,
        }));
        
        if( get().newChat ) {
            const chat = await createChat( question );

            console.log(chat);
            

            if( chat ) {
                
                if( get().chats ) {
                    set((value) => ({
                        ...value, chats: [chat, ...value.chats!], idCurrentChat: chat.id
                    }));
                }else {
                    set((value) => ({
                        ...value, chats: [chat], idCurrentChat: chat.id
                    }));
                }
            }
        }

        const chatMessage = await sendMessage(question, get().idCurrentChat, imageObj);
        
        if( chatMessage ) {
            if( get().currentChat ) {
                set( (value) => ({ ...value, currentChat: [
                    ...value.currentChat!, {
                        content: chatMessage.answer, role: 'assistant'
                    }
                ] }) );
    
                
            } else {
                set( (value) => ({ ...value, currentChat: [
                    {
                        content: chatMessage.answer, role: 'assistant'
                    }
                ] }) );
            }
        }

        set( (value) => ({
            ...value, sendingMessage: false
        }));
        
        return chatMessage;

    }

}))


