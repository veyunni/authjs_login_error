import {signOut} from '@/auth';

// import { useSession } from 'next-auth/react';

export function SignOut() {

    // const {data:session} = useSession();
    // <p className='text-sky-600'>{session?.user?.name}</p>

    return (
        <form action={
            async () => {
                "use server"
                await signOut({redirectTo: "/"});
        }}>
            
            <button className="bg-sky-500 hover:bg-sky-700 border-solid border-2 w-40" type="submit">Sign Out</button>
        </form>
    );
}
