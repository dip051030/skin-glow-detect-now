
import { useState, useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UploadCloud, Image, Camera } from "lucide-react";
import { createImagePreview } from "@/lib/imageProcessor";

interface ImageUploaderProps {
  onImageSelected: (file: File) => void;
}

const ImageUploader = ({ onImageSelected }: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleImageFile(file);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleImageFile(file);
    }
  };

  const handleImageFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      alert('Please select an image file');
      return;
    }

    // Create preview
    const previewUrl = createImagePreview(file);
    setPreview(previewUrl);

    // Pass file to parent component
    onImageSelected(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className={`w-full max-w-md mx-auto transition-all duration-300 ${isDragging ? 'border-primary border-2' : ''}`}>
      <CardContent className="p-6">
        <div
          className={`
            flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-md
            min-h-[200px] cursor-pointer transition-all duration-300
            ${isDragging ? 'bg-primary/10 border-primary' : 'bg-secondary/20 border-secondary/50 hover:bg-secondary/30'}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          {preview ? (
            <div className="relative w-full max-h-[300px] overflow-hidden rounded-md">
              <img 
                src={preview} 
                alt="Preview" 
                className="w-full h-full object-contain animate-fade-in" 
              />
            </div>
          ) : (
            <>
              <UploadCloud size={48} className="mb-4 text-primary animate-pulse" />
              <p className="text-lg font-medium mb-2">Upload Skin Image</p>
              <p className="text-sm text-muted-foreground text-center">
                Drag and drop an image here or click to browse
              </p>
              <div className="flex gap-4 mt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-2 animate-fade-in" 
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerFileInput();
                  }}
                >
                  <Image size={16} />
                  Browse Files
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-2 animate-fade-in" 
                  onClick={(e) => {
                    e.stopPropagation();
                    // In a real app, this would trigger the device camera
                    alert("Camera functionality would be implemented here");
                  }}
                >
                  <Camera size={16} />
                  Take Photo
                </Button>
              </div>
            </>
          )}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUploader;
