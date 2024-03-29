import { Button, Input } from '@nextui-org/react'
import React from 'react'

const NewsLetter = () => {
  return (
    <div className='grid lg:grid-cols-2 items-center mt-8'>
        <h1 className="text-lg md:text-3xl text-center mb-2 lg:text-left lg:mb-0">Join Our Newsletter to Stay in Loop</h1>
        <div>
            <Input size='sm' label="Email" endContent={<Button size='sm'>Subscribe</Button>} />
        </div>
    </div>
  )
}

export default NewsLetter