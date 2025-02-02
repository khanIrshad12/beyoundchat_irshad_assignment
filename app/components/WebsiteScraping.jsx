'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle, Globe, Zap, ChevronDown, ChevronUp, ChevronRight } from 'lucide-react'
import { Progress } from "@/components/ui/progress"

const initialPages = [
    { url: '/home', status: 'pending', chunks: [] },
    { url: '/about', status: 'pending', chunks: [] },
    { url: '/products', status: 'pending', chunks: [] },
    { url: '/contact', status: 'detected', chunks: [] },
]

const dummyChunks = [
    "Our company was founded in 2015 with a vision to revolutionize...",
    "We specialize in AI-powered solutions for businesses...",
    "Our team consists of experienced professionals from...",
]

export default function WebsiteScraping({ onNext, onPrev }) {
    const [selectedPage, setSelectedPage] = useState(null)
    const [progress, setProgress] = useState(0)
    const [isCompleted, setIsCompleted] = useState(false)
    const [pages, setPages] = useState(initialPages)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setIsCompleted(true)
                    return 100
                }
                const newValue = prev + 1
                
                // Update page status every 25%
                if (newValue % 25 === 0) {
                    setPages(prevPages => prevPages.map((page, index) => 
                        index === newValue / 25 - 1 ? { ...page, status: 'scraped', chunks: dummyChunks } : page
                    ))
                }
                return newValue
            })
        }, 50)

        return () => clearInterval(interval)
    }, [])

    return (
        <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <div className="space-y-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-4"
                >
                    <div className="p-3 rounded-full bg-indigo-500/20">
                        <Zap className="w-8 h-8 text-indigo-400 animate-pulse" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Website Processing</h2>
                        <p className="text-gray-400">Analyzing and training on your website content</p>
                    </div>
                </motion.div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{progress}% Complete</span>
                        <AnimatePresence mode="wait">
                            {!isCompleted ? (
                                <motion.span
                                    key="loading"
                                    className="flex items-center gap-2 text-indigo-400"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span className="text-sm">Training AI model...</span>
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="done"
                                    className="flex items-center gap-2 text-green-400"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <CheckCircle className="w-4 h-4" />
                                    <span className="text-sm">Ready to use!</span>
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                    <Progress value={progress} className="h-3 " />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pages.map((page, index) => (
                    <motion.div
                        key={page.url}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            selectedPage === page.url 
                                ? 'border-indigo-500 bg-zinc-800/50'
                                : 'border-zinc-700 hover:border-zinc-600'
                        }`}
                        onClick={() => setSelectedPage(p => p === page.url ? null : page.url)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Globe className="w-5 h-5 text-gray-400" />
                                <span className="font-medium">{page.url}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <StatusIndicator status={page.status} />
                                {selectedPage === page.url ? (
                                    <ChevronUp className="w-5 h-5" />
                                ) : (
                                    <ChevronDown className="w-5 h-5" />
                                )}
                            </div>
                        </div>

                        <AnimatePresence>
                            {selectedPage === page.url && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-4 space-y-3"
                                >
                                    {page.chunks.map((chunk, i) => (
                                        <motion.div
                                            key={i}
                                            className="p-3 text-sm rounded-lg bg-zinc-800/50"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: i * 0.1 }}
                                        >
                                            {chunk}
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            <div className="flex justify-between mt-12">
                <Button
                    onClick={onPrev}
                    variant="outline"
                    className="gap-2"
                 
                >
                    ← Previous Step
                </Button>
                <Button
                    onClick={onNext}
                    disabled={!isCompleted}
                    className="gap-2 bg-gradient-to-r from-indigo-500 to-purple-500"
                >
                    {isCompleted ? (
                        <>
                            Continue to Integration
                            <ChevronRight className="w-5 h-5" />
                        </>
                    ) : (
                        'Processing...'
                    )}
                </Button>
            </div>
        </motion.div>
    )
}

function StatusIndicator({ status }) {
    const statusConfig = {
        detected: { color: 'bg-blue-500', label: 'Detected' },
        pending: { color: 'bg-yellow-500', label: 'Pending' },
        scraped: { color: 'bg-green-500', label: 'Scraped' }
    }

    return (
        <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${statusConfig[status].color}`} />
            <span className="text-sm text-gray-400">{statusConfig[status].label}</span>
        </div>
    )
}