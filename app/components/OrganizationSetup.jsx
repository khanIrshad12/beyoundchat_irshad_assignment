'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ChevronRight } from 'lucide-react'

export default function OrganizationSetup({ onNext, data, updateData }) {
    const [companyName, setCompanyName] = useState(data.companyName)
    const [websiteUrl, setWebsiteUrl] = useState(data.websiteUrl)
    const [description, setDescription] = useState(data.description)

    useEffect(() => {
        setCompanyName(data.companyName)
        setWebsiteUrl(data.websiteUrl)
        setDescription(data.description)
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault()
        const newData = { companyName, websiteUrl, description }
        updateData(newData)
        // Here you would typically send the data to your backend
        console.log({ companyName, websiteUrl, description })
        onNext()
    }

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                    Organization Name
                </label>
                <Input
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-700">
                    Website URL
                </label>
                <Input
                    id="websiteUrl"
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Organization Description
                </label>
                <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div className='w-full flex justify-end'>
            <Button
                    type="submit"
                    className="gap-2 bg-gradient-to-r from-indigo-500 to-purple-500"
                >
                    Continue to Scrap
                    <ChevronRight className="w-5 h-5" />

                </Button>

            </div>
        </motion.form>
    )
}