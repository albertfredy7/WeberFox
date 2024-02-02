import React from 'react'
import { Link } from 'react-router-dom'

function Users() {
    const DUMMY_USER= [
        {
            uid:"101",
            name:"Max",
            email:"max@gmail.com",
            password:"max@123",
            image:"https://riaindia.co.in/wp-content/uploads/2016/01/tutor-8.jpg",
            places:'2'

        },
        {
            uid:"102",
            name:"Manu",
            email:"manu@gmail.com",
            password:"manu@123",
            image:"https://riaindia.co.in/wp-content/uploads/2016/01/tutor-8.jpg",
            places:'3'

        }

    ]

  return (
    <div className='d-flex justify-content-center'>
        
            {DUMMY_USER.length===0? <p>No users found</p>:
                DUMMY_USER.map(item=>(
                    <Link to={`/${item.uid}/places`} style={{textDecoration:"none"}}>
                        <div className='card m-5 p-3  d-flex justify-content-center align-items-center'>
                            <img src={item.image} className='rounded-circle' width={100} alt="" />
                            <h3>{item.name}</h3>
                            <h3>Places : {item.places}</h3>
                            
                        </div>
                    </Link>
                ))
            }
    </div>
  )
}

export default Users