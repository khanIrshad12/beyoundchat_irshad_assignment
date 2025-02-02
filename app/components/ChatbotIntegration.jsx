'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BadgeCheck, BotMessageSquare, CheckCircle, CodeIcon, Copy, Mail, Settings, Share2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useCopyToClipboard } from 'react-use'
import { toast } from 'sonner'

const ReactConfetti = dynamic(() => import('react-confetti'), { ssr: false })

export default function ChatbotIntegration({ onPrev }) {
    const [state, setState] = useState({
        testingOpen: false,
        integrationOpen: false,
        successOpen: false,
        confettiActive: true,
        copied: false
    })
    
    const [copyState, copyToClipboard] = useCopyToClipboard()
    const { width, height } = useWindowSize()

    const integrationCode = `<script src="https://beyondchats.com/widget.js"></script>
<script>
  BeyondChats.init({ companyId: 'your-company-id' });
</script>`

    const handleCopy = () => {
        copyToClipboard(integrationCode)
        toast.success('Code copied to clipboard!')
    }

    return (
        <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <AnimatePresence>
                {state.confettiActive && (
                    <ReactConfetti
                        width={width}
                        height={height}
                        recycle={false}
                        numberOfPieces={400}
                        onConfettiComplete={() => setState(p => ({ ...p, confettiActive: false }))}
                    />
                )}
            </AnimatePresence>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="space-y-4"
            >
                <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent">
                    Chatbot Integration
                </h2>
                <p className="text-gray-400">Finalize and test your chatbot integration</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <IntegrationCard
                    icon="test"
                    title="Test Chatbot"
                    description="Preview your chatbot in action"
                    onClick={() => setState(p => ({ ...p, testingOpen: true }))}
                />
                <IntegrationCard
                    icon="integrate"
                    title="Integrate"
                    description="Add to your website"
                    onClick={() => setState(p => ({ ...p, integrationOpen: true }))}
                />
                <IntegrationCard
                    icon="verify"
                    title="Verify"
                    description="Check installation"
                    onClick={() => setState(p => ({ ...p, successOpen: true }))}
                />
            </div>

            <TestDialog
                open={state.testingOpen}
                onOpenChange={open => setState(p => ({ ...p, testingOpen: open }))}
            />

            <IntegrationDialog
                open={state.integrationOpen}
                onOpenChange={open => setState(p => ({ ...p, integrationOpen: open }))}
                code={integrationCode}
                onCopy={handleCopy}
            />

            <SuccessDialog
                open={state.successOpen}
                onOpenChange={open => setState(p => ({ ...p, successOpen: open }))}
            />

            <div className="flex justify-between mt-12">
                <Button onClick={onPrev} variant="outline" className="gap-2">
                    ← Previous Step
                </Button>
                <Badge variant="outline" className="py-1.5 px-3">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Setup Complete
                </Badge>
            </div>
        </motion.div>
    )
}

// Sub-components for better organization
function IntegrationCard({ icon, title, description, onClick }) {
    const icons = {
        test: <BotMessageSquare className='w-14 h-14' />,
        integrate: <Settings className='w-14 h-14 text-gray-400' />,
        verify: <BadgeCheck className='w-14 h-14 text-green-400'/>
    }

    return (
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Card
                className="hover:bg-zinc-900/50 transition-colors cursor-pointer group relative overflow-hidden"
                onClick={onClick}
            >
                {/* Shiny overlay */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(400px_circle_at_var(--x)_var(--y),rgba(99,102,241,0.15),transparent_80%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Content */}
                <CardContent className="p-6 relative z-10">
                    <div className="text-7xl mb-4">{icons[icon]}</div>
                    <h3 className="text-xl font-semibold mb-2">{title}</h3>
                    <p className="text-gray-400">{description}</p>
                </CardContent>
            </Card>
        </motion.div>
    )
}
function TestDialog({ open, onOpenChange }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <span className="bg-indigo-500 w-2 h-2 rounded-full animate-pulse" />
                        Chatbot Preview
                    </DialogTitle>
                </DialogHeader>
                
                <div className="flex-1 relative rounded-xl overflow-hidden border border-zinc-800">
                    <iframe 
                        src="https://example.com" 
                        className="absolute inset-0 w-full h-full"
                    />
                    <div className="absolute bottom-4 right-4 flex gap-2">
                        <Button variant="outline" size="sm">
                            <Share2 className="w-4 h-4 mr-2" />
                            Share Feedback
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

function IntegrationDialog({ open, onOpenChange, code, onCopy }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <CodeIcon className="w-5 h-5 text-purple-400" />
                        Integration Methods
                    </DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="code" className="mt-4">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="code" className="gap-2">
                            <Copy className="w-4 h-4" /> Code
                        </TabsTrigger>
                        <TabsTrigger value="email" className="gap-2">
                            <Mail className="w-4 h-4" /> Email
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="code" className="space-y-4">
                        <div className="relative">
                            <pre className="p-4 rounded-lg bg-zinc-900 text-white text-sm overflow-x-auto">
                                <code className="language-html">{code}</code>
                            </pre>
                            <Button
                                size="sm"
                                className="absolute top-2 right-2 gap-2"
                                onClick={onCopy}
                            >
                                <Copy className="w-4 h-4" />
                                Copy
                            </Button>
                        </div>
                    </TabsContent>

                    <TabsContent value="email" className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Developer Email</label>
                            <input 
                                type="email" 
                                placeholder="developer@company.com"
                                className="w-full px-3 py-2 bg-zinc-900 rounded-lg border border-zinc-800 focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <Button className="w-full gap-2">
                            <Mail className="w-4 h-4" />
                            Send Instructions
                        </Button>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}

function SuccessDialog({ open, onOpenChange }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex flex-col items-center"
                >
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle className="w-12 h-12 text-green-400" />
                    </div>

                    <DialogTitle className="text-2xl mb-4">
                        Integration Successful! 🎉
                    </DialogTitle>

                    <div className="space-y-4 w-full">
                        <Button className="w-full gap-2">
                            Open Admin Panel
                        </Button>
                        <Button variant="outline" className="w-full gap-2">
                            Start Chatting →
                        </Button>

                        <div className="mt-6">
                            <p className="text-gray-400 mb-3">Share your success</p>
                            <div className="flex justify-center gap-2">
                                <Button variant="outline" size="sm">
                                    Twitter
                                </Button>
                                <Button variant="outline" size="sm">
                                    LinkedIn
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </DialogContent>
        </Dialog>
    )
}

// Utility hook for window size
function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    })

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return windowSize
}