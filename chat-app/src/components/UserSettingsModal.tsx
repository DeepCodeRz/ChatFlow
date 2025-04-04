import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import React, {useEffect, useRef} from "react";
import {User} from "lucide-react";
import {generateFromEmail} from "unique-username-generator";

export default function UserSettingsModal({email, username, setUsername}: {email: string, username: string, setUsername: (username: string) => void}) {
    const usernameContentRef = useRef<string>("");

    useEffect(() => {
        const randomUsername = generateFromEmail(email, 4);

        setUsername(randomUsername);
    }, [email, setUsername]);

    function handleChange(event: React.FormEvent<HTMLInputElement>) {
        usernameContentRef.current = event.currentTarget.value;
    }

    function handleSave() {
        setUsername(usernameContentRef.current);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline"><User /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" defaultValue={username} className="col-span-3" onChange={(e) => handleChange(e)} />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" onClick={handleSave}>Save changes</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}