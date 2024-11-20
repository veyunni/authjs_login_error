'use server-only'

import { Metadata } from 'next'
import Link from 'next/link'
 
export const metadata: Metadata = {
  title: 'My Project Home',
}

export default function Home() {
  return (
    <>
      <div>
        <p>The home page</p>
      </div>
    </>
  );
}

