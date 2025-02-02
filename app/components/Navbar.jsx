"use client"
import Link from 'next/link'
import React from 'react'
import { UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

const Navbar = ({ userId }) => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 font-bold">
                        <span className="bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent text-xl">
                            BeyondChats
                        </span>
                    </Link>

                    <div className="flex items-center gap-4">
                        {
                            !userId && <Link href={"/sign-in"} className='text-black font-semibold hover:text-gray-600'>
                                <Button className="rounded-3xl px-6">

                                    Login
                                </Button>
                            </Link>
                        }


                        <div className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-accent transition-colors">
                            <UserButton
                                appearance={{
                                    elements: {
                                        avatarBox: "h-8 w-8",
                                        userButtonPopoverCard: "shadow-lg"
                                    }
                                }}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar