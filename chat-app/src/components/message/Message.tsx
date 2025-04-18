import {Card, CardContent} from "@/components/ui/card.tsx";
import {MessageOptionsDropdown} from "@/components/message/MessageOptionsDropdown.tsx";

/**
 * Message Component
 *
 * Responsible for rendering a single message based on the user type (admin, other user, or self).
 * This component dynamically adjusts its appearance and structure depending on whether the message
 * is owned by the current user, sent by an admin, or sent by another user.
 *
 * Features:
 * - Displays the message content, author, and creation time.
 * - Adjusts styling and layout based on the message ownership and author type.
 * - Includes a dropdown for message options if the message is owned by the current user.
 *
 * Props:
 * - `id` (string): Unique identifier for the message.
 * - `message` (string): The content of the message.
 * - `author` (string): The username of the message author.
 * - `isOwned` (boolean, optional): Indicates if the message is owned by the current user. Defaults to `false`.
 * - `createdAt` (string): The timestamp of when the message was created.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {string} props.id - Unique identifier for the message.
 * @param {string} props.message - The content of the message.
 * @param {string} props.author - The username of the message author.
 * @param {boolean} [props.isOwned=false] - Indicates if the message is owned by the current user.
 * @param {string} props.createdAt - The timestamp of when the message was created.
 * @returns {TSX.Element} The rendered Message component.
 */

export default function Message({id, message, author, isOwned = false, createdAt}: {
    id: string,
    message: string,
    author: string,
    isOwned?: boolean,
    createdAt: string
}) {

    const authorName = isOwned ? "You" : author;
    const isAdmin = author === "ADMIN";
    const flexDirection = isOwned ? "items-end" : "items-start";
    const cardClass =
        isOwned ? "bg-gray-100 text-black dark:bg-input dark:text-primary" :
            isAdmin ? "bg-primary text-white dark:bg-red-500 dark:text-white" :
                "bg-primary-500 dark:bg-secondary dark:text-white";
    const messageStructure = isOwned ? (
        <>
            <MessageOptionsDropdown id={id} />
            <span>{message}</span>
        </>
    ) : <span>{message}</span>;

    return (
        <div className={`w-full flex flex-col gap-2 ${flexDirection}`}>
            <div className={`flex flex-col gap-1 ${flexDirection}`}>
                <div className="flex gap-2 items-center">
                    <span className="font-medium">{authorName}</span>
                </div>
                <Card
                    className={`w-fit p-3 flex gap-2 text-sm
                           ${cardClass}
                       `}
                >
                    <CardContent className="p-0 flex gap-2 items-center">
                        {messageStructure}
                    </CardContent>
                </Card>
            </div>
            <span className="text-xs text-muted-foreground">{createdAt}</span>
        </div>
    );
}