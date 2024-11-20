import { auth } from '@/auth';
import { redirect } from 'next/navigation';

import Link  from 'next/link';


export default async function Administration () {
    const session = await auth();
    if (session?.user?.role !== "ADMIN")  {
        redirect('/signin');
    }
    return (
        <div className="px-4 top-0">
	    <p>This is the Administrator Page</p>
        </div>
    );
}
