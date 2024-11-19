import { Message } from "../../domain";
import { MessageResponse } from "../interfaces/message-response.interface";

export class MessageMapper {

    static messageResponseToMessage( messageResponse: MessageResponse ): Message {

        return {
            role: messageResponse.role,
            content: messageResponse.content,
            urlImage: messageResponse.url_image,
        }

    }

}

