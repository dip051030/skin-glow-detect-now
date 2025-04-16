
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, RefreshCw, Shield } from "lucide-react";
import ImageUploader from "@/components/ImageUploader";
import DetectionResult from "@/components/DetectionResult";
import UploadGuide from "@/components/UploadGuide";
import { processImage, revokeImagePreview, type DetectionResult as DetectionResultType } from "@/lib/imageProcessor";
import { showNotification } from "@/components/Notification";

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<DetectionResultType | null>(null);
  const [activeTab, setActiveTab] = useState<string>("upload");

  const handleImageSelected = (file: File) => {
    if (previewUrl) {
      revokeImagePreview(previewUrl);
    }

    setResult(null);
    setSelectedImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    setActiveTab("upload");
    
    showNotification({
      type: "info",
      title: "Image Selected",
      message: "Your image has been uploaded and is ready for analysis."
    });
  };

  const handleDetection = async () => {
    if (!selectedImage) return;

    setIsProcessing(true);
    
    try {
      const detectionResult = await processImage(selectedImage);
      setResult(detectionResult);
      setActiveTab("result");
      
      showNotification({
        type: "success",
        title: "Analysis Complete",
        message: "Your skin image has been successfully analyzed."
      });
    } catch (error) {
      console.error("Error processing image:", error);
      
      showNotification({
        type: "error",
        title: "Analysis Failed",
        message: "An error occurred while analyzing your image. Please try again."
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    if (previewUrl) {
      revokeImagePreview(previewUrl);
    }
    
    setSelectedImage(null);
    setPreviewUrl(null);
    setResult(null);
    setActiveTab("upload");
    
    showNotification({
      type: "info",
      title: "Reset Complete",
      message: "You can now upload a new image for analysis."
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="py-6 border-b border-border bg-card/50 shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" strokeWidth={1.5} />
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Derma<span className="text-primary">Vision</span>
            </h1>
          </div>
          <p className="text-muted-foreground max-w-md text-right hidden md:block">
            Advanced AI-powered skin disease detection and analysis
          </p>
        </div>
      </header>

      <main className="flex-1 py-8 px-4 container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mb-6 text-center animate-fade-in">
            {!selectedImage 
              ? "Upload a skin image for AI analysis" 
              : result 
                ? "Detailed Detection Result" 
                : "Analyzing your image..."}
          </h2>

          {!selectedImage ? (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="animate-fade-in">
                <ImageUploader onImageSelected={handleImageSelected} />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
                <UploadGuide />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                  <TabsTrigger value="upload">Image</TabsTrigger>
                  <TabsTrigger value="result" disabled={!result}>Result</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upload" className="animate-fade-in">
                  <Card className="p-6 border-medical-light/50 bg-gradient-to-b from-background to-medical-light/20 shadow-md">
                    <div className="flex justify-center mb-4">
                      {previewUrl && (
                        <div className="relative rounded-lg overflow-hidden border-2 border-primary/20 shadow-lg transition-all hover:scale-[1.01] duration-300">
                          <img 
                            src={previewUrl} 
                            alt="Selected skin" 
                            className="max-h-[400px] object-contain" 
                          />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-center mt-6 gap-4">
                      {!isProcessing ? (
                        <>
                          <Button 
                            onClick={handleDetection}
                            className="animate-fade-in bg-primary hover:bg-primary/90 shadow-lg transition-all hover:shadow-xl"
                            disabled={!selectedImage}
                          >
                            Analyze Image
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={handleReset}
                            className="animate-fade-in border-medical-dark/30 hover:bg-medical-light/20"
                          >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Reset
                          </Button>
                        </>
                      ) : (
                        <Button disabled className="animate-pulse bg-primary/80">
                          <Loader2 className="h-4 w-4 mr-2 animate-spin-slow" />
                          Analyzing...
                        </Button>
                      )}
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="result" className="animate-fade-in">
                  {result && (
                    <>
                      <DetectionResult result={result} previewUrl={previewUrl} />
                      
                      <div className="flex justify-center mt-6">
                        <Button 
                          variant="outline" 
                          onClick={handleReset}
                          className="animate-fade-in border-medical-dark/30 hover:bg-medical-light/20"
                        >
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Try Another Image
                        </Button>
                      </div>
                    </>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </main>

      <footer className="py-4 border-t border-border bg-card/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DermaVision. All Rights Reserved.
            <span className="block text-xs mt-1">
              For educational purposes. Not a substitute for professional medical advice.
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
