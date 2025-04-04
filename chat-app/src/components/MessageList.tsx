import {useMessages} from "../hooks/useMessages.ts";
import Message from "@/components/Message.tsx";

export default function MessageList({ ownerId }: { ownerId: string }) {
    const { messages, isLoading, error } = useMessages();

    const messageElements = messages.map((message) => (
        <Message
            key={message.id}
            id={message.id}
            message={message.messageContent}
            author={message.authorUsername}
            isOwned={message.uid === ownerId}
            createdAt={message.createdAt}
        />
    ));

    return (
        <>
            {isLoading ? (
                <div className="w-full h-full flex items-center justify-center text-xl font-semibold">
                    <p>Loading...</p>
                </div>
            ) : error ? (
                <div className="w-full h-full flex items-center justify-center text-xl font-semibold">
                    <p>Error: {error.message}</p>
                </div>
            ) : messageElements.length === 0 ? (
                <div className="w-full h-full flex items-center justify-center text-xl font-semibold">
                    <p>No messages yet.</p>
                </div>
            ) : (
                messageElements
            )}
        </>
    );
}