import Link from 'next/link';
import { auth } from '@/auth';
import { SignIn } from './auth/sign-in-button';
import { SignOut } from './auth/signout-button';

export default async function Navbar() {
    const session = await auth();
    const username = session?.user?.name;
    const isAdminUser = session?.user?.role === 'ADMIN';

    return (
        <div className="bg-gray-400">
            <div className='flex items-center justify-between max-w-4xl mx-auto py-4'>
                <Link href="/" className='text-lg'>Home</Link>
                {session ? (<><Link href="/user" className='text-lg'><div className='flex items-center'>{username}</div></Link> <SignOut/></>) : <SignIn/>}
            </div>
        </div>
    );
}
