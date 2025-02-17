'use client'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import React from 'react'
import ThreeProvider from './ThreeProvider'

type Props = {}

const Home = (props: Props) => {
    
  return (
    <div className='m-16'>
        <h1 className='text-7xl font-medium text-center '>3D GPT</h1>
            <ThreeProvider/>
    </div>
  )
}

export default Home