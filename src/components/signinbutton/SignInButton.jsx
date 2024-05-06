"use client"
import React from 'react'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

function SignInButton() {
  return (
    <div className="flex flex-col items-center justify-center dark:bg-gray-800 h-full w-full">
      <button className="w-full flex items-center justify-center px-4 py-5 border border-zinc dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150" onClick={() => signIn('google')}>
        <Image src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" width={24} height={24} />
        <span className='ml-2'>Continue with Google</span>
      </button>
    </div>
  )
}

export default SignInButton
