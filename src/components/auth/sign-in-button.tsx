import { signIn } from "@/auth";

export function SignIn() {
    return (
        <form action={
            async () => {
                "use server";
                await signIn();
            }}>

            <div className="hidden lg:flex lg:justify-end">
                <button className="bg-sky-500 hover:bg-sky-700" type="submit">
                    Sign in <span aria-hidden="true">&rarr;</span>
                </button>
            </div>

        </form>
    );
}

