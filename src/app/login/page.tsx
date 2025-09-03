import React from 'react'
import LoginForm from '../_components/LoginForm/LoginForm'
import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'MeetUsar Login',
  description: 'MeetUsar Login',
}

const Login = () => {
  return (
    <div>
      <div className='h-screen bg-[url(/login_bg.png)] bg-cover bg-center'>
        <div className='flex items-center h-full lg:w-[40%] w-full justify-center '>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default Login