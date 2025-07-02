'use client'

import { Upload } from 'lucide-react'

interface FileUploadProps {
  uploadedFile: File | null
  setUploadedFile: (file: File | null) => void
}

export default function FileUpload({
  uploadedFile,
  setUploadedFile,
}: FileUploadProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length > 0) {
      setUploadedFile(files[0])
    }
  }

  return (
    <div className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
        <span className="w-8 h-8 bg-gradient-to-r from-custom-primary to-custom-secondary rounded-full flex items-center justify-center text-white font-bold mr-4 text-lg">
          1
        </span>
        Upload Your Replay
      </h2>
      {/** biome-ignore lint/a11y/noStaticElementInteractions: <explanation> */}
      <div
        className="glass-effect border-2 border-dashed border-custom-primary/50 rounded-2xl p-8 md:p-12 text-center hover:border-custom-primary transition-all duration-300 cursor-pointer"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Upload className="w-16 h-16 text-custom-primary mx-auto mb-6" />
        <h3 className="text-xl md:text-2xl font-bold mb-3">
          Drop your replay file here
        </h3>
        <p className="text-cream/70 mb-4 text-lg">
          or click to browse your files
        </p>
        <p className="text-sm text-cream/50 mb-6">
          Supports: .dem, .rofl, .replay, .rec files (Max 500MB)
        </p>
        <button className="premium-gradient text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          Select Replay File
        </button>
      </div>
      {uploadedFile && (
        <div className="mt-4 text-center">
          <p className="text-cream/80">Selected: {uploadedFile.name}</p>
        </div>
      )}
    </div>
  )
}
