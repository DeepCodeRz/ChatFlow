import {db} from "../../../../shared/api/firebaseConfig.ts";
import {collection, addDoc} from "firebase/firestore";

interface AddNewMessageParams {
    roomCode: string;
    authorId: string;
    authorUsername: string;
    content: string;
    createdAt: string;
    responseTo?: string;
    reactions?: { [key: string]: number }
}

export default async function addNewMessage(
    messageData: AddNewMessageParams
) {
    try {
        await addDoc(collection(db, "rooms", messageData.roomCode, "messages"), {
            ...messageData
        });
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}