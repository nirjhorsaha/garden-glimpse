'use client'

import { useRef, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Controller } from 'react-hook-form'

interface FileUploadProps {
    control: any
    name: string
    label: string
}

export function FileUpload({ control, name, label }: FileUploadProps) {
    const [imageURL, setImageURL] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const handleImageChange = (onChange: (file: File | null) => void) => async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0]

        if (file) {
            onChange(file)

            const formData = new FormData()
            formData.append('image', file)

            try {
                const response = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API}`,
                    formData
                )
                if (response.data.success) {
                    setImageURL(response.data.data.url)
                    onChange(response.data.data.url) // Pass the URL instead of the file
                }
            } catch (error) {
                console.error('Error uploading image:', error)
                toast.error('Error uploading image. Please try again.')
            }
        } else {
            onChange(null)
        }
    }

    return (
        <div className="py-3">
            <label className="block mb-1 font-semibold" htmlFor={name}>
                {label}
            </label>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
                    <>
                        <input
                            ref={fileInputRef}
                            accept="image/*"
                            className={`w-full border-2 border-gray-600 rounded-lg p-2 ${error ? 'border-red-500' : 'border-gray-300'
                                }`}
                            id={name}
                            type="file"
                            onBlur={onBlur}
                            onChange={handleImageChange(onChange)}
                        />
                        {error && (
                            <p className="text-red-500 text-sm mt-1">{error.message}</p>
                        )}
                    </>
                )}
            />
        </div>
    )
}

