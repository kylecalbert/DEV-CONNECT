import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from './context/AuthContext'
 
function Protected({children}:any) {
    const {user} = useAuthContext()
    if(!user){
        return<Navigate to='/'/>
    }

  return children
}

export default Protected;