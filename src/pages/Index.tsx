
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, RefreshCw, Shield, Info, Upload, BarChart } from "lucide-react";
import ImageUploader from "@/components/ImageUploader";
import DetectionResult from "@/components/DetectionResult";
import UploadGuide from "@/components/UploadGuide";
import { processImage, revokeImagePreview, type DetectionResult as DetectionResultType } from "@/lib/imageProcessor";
import { showNotification } from "@/components/Notification";
import FeaturesOverview from "@/components/FeaturesOverview";
import ButtonGroup from "@/components/ButtonGroup";

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
            <Shield className="w-8 h-8 text-primary animate-float" strokeWidth={1.5} />
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Derma<span className="text-primary">Vision</span>
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <p className="text-muted-foreground max-w-md text-right hidden md:block">
              Advanced AI-powered skin disease detection and analysis
            </p>
            <Link 
              to="/about" 
              className="flex items-center gap-1.5 text-foreground/70 hover:text-primary transition-colors"
            >
              <Info className="w-4 h-4" />
              <span>About</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8 px-4 container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="relative mb-12">
            <div className="absolute -z-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-50 -top-20 -right-20"></div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-center animate-fade-in">
              {!selectedImage 
                ? "AI-Powered Skin Analysis" 
                : result 
                  ? "Detailed Detection Result" 
                  : "Analyzing your image..."}
            </h2>
            <p className="text-center text-muted-foreground max-w-xl mx-auto animate-fade-in" style={{ animationDelay: "100ms" }}>
              {!selectedImage 
                ? "Upload a skin image and get instant AI analysis to identify potential skin conditions" 
                : result 
                  ? "Review the preliminary assessment of your skin image" 
                  : "Our AI is carefully examining your skin image..."}
            </p>
          </div>

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
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
                  <TabsTrigger value="upload" className="transition-all duration-300">
                    <Upload className="mr-2 h-4 w-4" />
                    Image
                  </TabsTrigger>
                  <TabsTrigger value="result" disabled={!result} className="transition-all duration-300">
                    <BarChart className="mr-2 h-4 w-4" />
                    Result
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="upload" className="animate-fade-in">
                  <Card className="p-6 border-primary/20 bg-gradient-to-b from-background to-primary/5 shadow-md">
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
                    
                    <ButtonGroup spacing="normal" align="center">
                      {!isProcessing ? (
                        <>
                          <Button 
                            onClick={handleDetection}
                            className="animate-scale-up bg-primary hover:bg-primary/90 shadow-lg transition-all hover:shadow-xl"
                            disabled={!selectedImage}
                          >
                            Analyze Image
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={handleReset}
                            className="animate-scale-up border-primary/30 hover:bg-primary/10"
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
                    </ButtonGroup>
                  </Card>
                </TabsContent>
                
                <TabsContent value="result" className="animate-fade-in">
                  {result && (
                    <>
                      <DetectionResult result={result} previewUrl={previewUrl} />
                      
                      <ButtonGroup spacing="normal" align="center">
                        <Button 
                          variant="outline" 
                          onClick={handleReset}
                          className="animate-scale-up border-primary/30 hover:bg-primary/10"
                        >
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Try Another Image
                        </Button>
                      </ButtonGroup>
                    </>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          )}
          
          {!selectedImage && (
            <div className="mt-24 animate-fade-in" style={{ animationDelay: "300ms" }}>
              <FeaturesOverview />
            </div>
          )}
        </div>
      </main>

      <footer className="py-8 border-t border-border bg-card/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" strokeWidth={1.5} />
              <span className="font-medium">DermaVision</span>
            </div>
            
            <ButtonGroup align="center" spacing="wide" className="md:hidden">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
            </ButtonGroup>
            
            <div className="hidden md:flex gap-6">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
            </div>
            
            <p className="text-sm text-muted-foreground text-center md:text-right">
              © {new Date().getFullYear()} DermaVision. All Rights Reserved.
              <span className="block text-xs mt-1">
                For educational purposes. Not a substitute for professional medical advice.
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
