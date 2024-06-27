import { auth, signOut } from "@/auth"
import { Button } from "@/components/ui/button";

 const SettingsPage = async () => {
    const session = await auth()
    return (
        <div>
        <h1>Settings</h1>
        <p>Settings page content</p>
        {
            JSON.stringify(session, null, 2)
        }

        <form action={async() => {
            "use server";
            await signOut({redirectTo: "/auth/login"});
        }}>
            <Button type="submit">Logout</Button>
        </form>
        </div>
    )
}


export default SettingsPage;