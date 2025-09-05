import React from 'react'
import LoginForm from '../_components/LoginForm/LoginForm'
import { Metadata } from 'next'
import Image from 'next/image'
export const metadata: Metadata = {
  title: 'MeetUsar Login',
  description: 'MeetUsar Login',
}

const Login = () => {
  return (
    <div className='h-screen bg-[url(/login.png)] bg-center bg-cover bg-no-repeat'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 items-center h-full'>
        <div className='col-span-1 sm:col-span-1 lg:col-span-5 order-2 sm:order-1 lg:order-1'>
          <LoginForm />
        </div>
        <div className='col-span-1 sm:col-span-1 lg:col-span-7 order-1 sm:order-2 lg:order-2 flex justify-center items-center h-64 sm:h-80 lg:h-screen'>
          <Image
            src="/logo_section.png"
            alt="login"
            width={1000}
            height={1000}
            className='w-full h-full object-contain lg:object-fill'
          />
        </div>
      </div>
    </div>
  )
}

export default Login