"use client"
import { useAuth } from '@clerk/nextjs'
import React from 'react'
import Navbar from './Navbar'
import { usePathname } from 'next/navigation'

const ConditionalCheckup = ({ children }) => {
    const path = usePathname()
    const { userId } = useAuth()

    return (
        <div>
            <main className={userId && path == "/dashboard" ? "pt-20" : ""}>
                {path !== "/sign-in" && path !== "/sign-up" &&
                    <Navbar userId={userId} />
                }
                {children}
            </main>
        </div>
    )
}

export default ConditionalCheckup