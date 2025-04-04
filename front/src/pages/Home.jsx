import React from 'react'
import CardProjects from '../components/CardProjects'

export default function Home() {
  return (
    <div>
      <div className='d-flex flex-wrap justify-content-center gap-5 p-5'>
        {[1,2,3,4,5,6,9,6,6,9,0].map((elem,i)=>(
          <CardProjects />
        ))}
      </div>
    </div>
  )
}
