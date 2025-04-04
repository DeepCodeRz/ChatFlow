import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Button} from "@/components/ui/button.tsx";
import {useAuthState, useSignOut} from "react-firebase-hooks/auth";
import {auth} from "@/api/firebaseConfig.ts";
import {useNavigate} from "react-router";
import {Separator} from "@/components/ui/separator";
import MessageList from "@/components/MessageList.tsx";
import {ModeToggle} from "@/components/mode-toggle.tsx";
import MessageBar from "@/components/MessageBar.tsx";
import {useRef, useState} from "react";
import UserSettingsModal from "@/components/UserSettingsModal.tsx";
import useEndSession from "@/hooks/useEndSession.ts";

export default function Application() {
    const [user] = useAuthState(auth);
    const [username, setUsername] = useState<string>("")
    const [signOut, loading] = useSignOut(auth);
    const navigate = useNavigate();
    const bottomRef = useRef<HTMLDivElement>(null);

    useEndSession()

    if (!user) {
        navigate("/");
        return null;
    }

    function handleSignOut(): void {
        signOut().catch(console.error);
    }

    return (
        <Card className="w-164 h-full flex flex-col p-8 justify-between">
            <CardHeader className="p-0 flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <CardTitle className="text-xl">Chat App</CardTitle>
                    <CardDescription>
                        Here is a public chat room. You can chat with other users.
                    </CardDescription>
                </div>
                <div className='flex gap-4'>
                    <Button variant="secondary" onClick={handleSignOut}>
                        {loading ? "..." : "Sign Out"}
                    </Button>
                    <UserSettingsModal email={user.email || ""} username={username} setUsername={setUsername} />
                    <ModeToggle></ModeToggle>
                </div>
            </CardHeader>
            <Separator/>
            <CardContent className="py-2 px-0 flex flex-col gap-6 overflow-y-auto flex-grow">
                <MessageList ownerId={user.uid}/>
                <div ref={bottomRef} className="h-0"></div>
            </CardContent>
            <CardFooter className="p-0 flex gap-4">
                <MessageBar uid={user.uid} authorUsername={username} bottomRef={bottomRef} ></MessageBar>
            </CardFooter>
        </Card>
    );
}