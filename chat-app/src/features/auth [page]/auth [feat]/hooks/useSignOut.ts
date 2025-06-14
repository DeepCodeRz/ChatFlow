import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { useUser } from "@/features/chat [page]/[page-core]/hooks [core]/useUser.tsx";
import { auth, db } from "@/shared/api/firebaseConfig.ts";
import setOfflineStatus from "@/features/auth [page]/auth [feat]/api/setOfflineStatus.ts";

export function useSignOut() {
    const { user } = useUser();
    const [isLoading, setIsLoading] = useState(false);

    const handleSignOut = async () => {
        setIsLoading(true);
        try {
            const userRef = doc(db, "profile", user.uid);

            await updateDoc(userRef, {
                isOnline: false,
            });

            await setOfflineStatus(user.uid)
            await auth.signOut();
        } catch (error) {
            console.error("Error signing out:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return { handleSignOut, isLoading };
}