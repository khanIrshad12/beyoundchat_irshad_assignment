'use client'

import { useAuth } from "@clerk/nextjs"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
    const { isSignedIn } = useAuth()
    const router = useRouter()

    const handleGetStarted = () => {
        isSignedIn ? router.push('/dashboard') : router.push('/sign-in')
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-6 pt-14">
            <motion.div
                className="text-center max-w-5xl space-y-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h1
                    className="text-5xl lg:text-6xl font-extrabold text-white leading-tight"
                    variants={itemVariants}
                >
                    Transform Your Website with{" "}
                    <span className="text-indigo-400">Intelligent Conversations</span>
                </motion.h1>

                <motion.p
                    className="text-lg lg:text-sm text-gray-300 max-w-2xl mx-auto"
                    variants={itemVariants}
                >
                    Empower your website with our AI-powered chatbot. Engage visitors, answer questions, and boost conversions – all while you focus on what matters most.
                </motion.p>

                <motion.div variants={itemVariants}>
                    <Button
                        onClick={handleGetStarted}
                        size="lg"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-6 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Get Started for Free
                    </Button>
                </motion.div>

                <motion.div
                    className="flex justify-center space-x-6 text-gray-400 text-sm"
                    variants={itemVariants}
                >
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-indigo-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        No credit card required
                    </div>
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-indigo-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Setup in minutes
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}
