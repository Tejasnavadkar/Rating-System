import React, { type ReactNode } from 'react'
import { Navigate} from 'react-router-dom'

interface childrenType {
    children:ReactNode
}

const Protected = ({ children }:childrenType) => {

    const token = localStorage.getItem('token')

    if (!token) { // unauthenticated navigate to login
        return <Navigate to={'/'} />
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default Protected
