'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from "@/lib/utils"
import OrganizationSetup from './OrganizationSetup'
import WebsiteScraping from './WebsiteScraping'
import ChatbotIntegration from './ChatbotIntegration'
import { Bot, Building, Waypoints } from 'lucide-react'

const steps = [
    { title: 'Organization', icon:<Building />  },
    { title: 'Scraping', icon: <Waypoints /> },
    { title: 'Integration', icon: <Bot /> }
]

export default function Setup() {
    const [currentStep, setCurrentStep] = useState(0)
    const [prevStep, setPrevStep] = useState(0)
    const [organizationData, setOrganizationData] = useState({
        companyName: '',
        websiteUrl: '',
        description: '',
    })

    const nextStep = () => {
        setPrevStep(currentStep)
        setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
    }

    const prevStepHandler = () => {
        setPrevStep(currentStep)
        setCurrentStep(prev => Math.max(prev - 1, 0))
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="mb-12">
                <Stepper currentStep={currentStep} prevStep={prevStep} steps={steps} />
            </div>

            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: currentStep > prevStep ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: currentStep > prevStep ? -20 : 20 }}
                    transition={{ duration: 0.25 }}
                >
                    {currentStep === 0 && (
                        <OrganizationSetup 
                            onNext={nextStep}
                            data={organizationData}
                            updateData={setOrganizationData}
                        />
                    )}
                    {currentStep === 1 && (
                        <WebsiteScraping onNext={nextStep} onPrev={prevStepHandler} />
                    )}
                    {currentStep === 2 && (
                        <ChatbotIntegration onPrev={prevStepHandler} />
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

function Stepper({ currentStep, prevStep, steps }) {
    const [containerWidth, setContainerWidth] = useState(0)
    const containerRef = React.useRef(null)

    useEffect(() => {
        if (containerRef.current) {
            setContainerWidth(containerRef.current.offsetWidth)
            // Add resize listener
            const handleResize = () => {
                setContainerWidth(containerRef.current.offsetWidth)
            }
            window.addEventListener('resize', handleResize)
            return () => window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <div className="relative" ref={containerRef}>
            {/* Connection lines */}
            <div className="absolute top-6 left-10 right-0 flex justify-between items-center z-0">
                {steps.map((_, index) => {
                    if (index === steps.length - 1) return null
                    const isActive = index < currentStep
                    const isTransitioning = index === prevStep && index < currentStep
                    
                    return (
                        <motion.div
                            key={index}
                            className="h-1 flex-1 mr-6 rounded-full overflow-hidden bg-zinc-800"
                        >
                            <motion.div
                                className="h-full bg-indigo-600 origin-left"
                                initial={{ scaleX: 0 }}
                                animate={{ 
                                    scaleX: isActive ? 1 : isTransitioning ? [0, 1] : 0,
                                    transition: {
                                        duration: isTransitioning ? 0.5 : 0,
                                        ease: "easeInOut"
                                    }
                                }}
                            />
                        </motion.div>
                    )
                })}
            </div>

            {/* Steps */}
            <div className="flex justify-between relative z-10">
                {steps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <motion.div
                            className={cn(
                                "w-12 h-12 rounded-full flex items-center justify-center text-xl",
                                "transition-colors duration-300",
                                index <= currentStep 
                                    ? "bg-indigo-600 text-white shadow-lg"
                                    : "bg-zinc-800 text-gray-400"
                            )}
                            initial={false}
                            animate={{
                                scale: index === currentStep ? 1.1 : 1
                            }}
                            whileHover={{ scale: 1.1 }}
                        >
                            {step.icon}
                            
                            {/* Ripple effect when transitioning */}
                            {index === currentStep && (
                                <motion.div
                                    className="absolute w-full h-full rounded-full border-2 border-indigo-400"
                                    initial={{ scale: 0.8, opacity: 1 }}
                                    animate={{ scale: 1.2, opacity: 0 }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        ease: "easeOut"
                                    }}
                                />
                            )}
                        </motion.div>
                        <span className={cn(
                            "mt-2 text-sm font-medium",
                            index <= currentStep ? "text-white" : "text-gray-400"
                        )}>
                            {step.title}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}