import { Chat } from "../../domain";
import { ChatResponse } from "../interfaces/chat-response.interface";

export class ChatMapper {
    static chatResponseToChat( chatResponse: ChatResponse ): Chat {
        return {
            id: chatResponse.id,
            title: chatResponse.title,
            idUser: chatResponse.user_id
        }
    }

}

