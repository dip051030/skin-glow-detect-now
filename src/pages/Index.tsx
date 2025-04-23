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
import Testimonials from "@/components/Testimonials";
import { LogIn, UserPlus } from "lucide-react";

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
      <header className="py-6 md:pb-7 border-b border-border bg-card/50 shadow-sm animate-popup">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary animate-float" strokeWidth={1.5} />
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Derma<span className="text-primary">Vision</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              to="/about" 
              className="flex items-center gap-1.5 px-2 text-foreground/70 hover:text-primary transition-colors"
            >
              <Info className="w-4 h-4" />
              <span>About</span>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="border-primary/50 text-primary px-5 transition-transform hover:scale-105 animate-popup" style={{ animationDelay: "70ms" }}>
                <LogIn className="w-4 h-4 mr-1" />
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-primary text-white px-5 font-semibold rounded-lg shadow-sm transition-transform hover:scale-105 animate-popup" style={{ animationDelay: "110ms" }}>
                <UserPlus className="w-4 h-4 mr-1" />
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 py-10 px-4 container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="relative mb-12 animate-popup">
            <div className="absolute -z-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-50 -top-20 -right-20"></div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center animate-fade-in">
              {!selectedImage 
                ? "Feel Confident About Your Skin Health" 
                : result 
                  ? "Detailed Detection Result" 
                  : "Analyzing your image..."}
            </h2>
            <p className="text-center text-muted-foreground max-w-xl mx-auto animate-fade-in" style={{ animationDelay: "100ms" }}>
              {!selectedImage 
                ? "Just upload a skin photo and DermaVision’s AI gives you quick, private, research-backed guidance for next steps." 
                : result 
                  ? "Review the preliminary assessment of your skin image" 
                  : "Our AI is carefully examining your skin image..."}
            </p>
          </div>

          {!selectedImage ? (
            <>
              <div className="flex flex-col md:flex-row gap-8 items-stretch animate-popup">
                <div className="flex-1 animate-enter-up">
                  <ImageUploader onImageSelected={handleImageSelected} />
                </div>
                <div className="flex-1 animate-enter-up" style={{ animationDelay: "120ms" }}>
                  <UploadGuide />
                </div>
              </div>
              <div className="mt-14 mb-12 animate-popup" style={{ animationDelay: "190ms" }}>
                <Card className="max-w-2xl mx-auto bg-gradient-to-r from-green-50 via-primary/10 to-green-100 border-primary/20 shadow-md hover-lift">
                  <div className="flex flex-col md:flex-row items-center p-7 gap-8">
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-lg font-semibold mb-1">
                        <span role="img" aria-label="leaf" className="mr-1">🌱</span>
                        Your photo never leaves your device. 100% private.
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Results are instant and confidential. We store nothing without your consent.
                      </p>
                    </div>
                    <div className="flex-1 flex flex-col gap-2 items-center justify-center mt-3 md:mt-0">
                      <Button 
                        className="w-full md:w-auto bg-primary/90 hover:bg-primary text-white px-7 py-3 animate-button-bounce shadow-xl rounded-lg"
                        onClick={() => {
                          document.querySelector<HTMLInputElement>("input[type='file']")?.click()
                        }}
                      >Try Now</Button>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="mt-18 animate-fade-in" style={{ animationDelay: "240ms" }}>
                <FeaturesOverview />
              </div>
              <div className="mt-20 animate-popup" style={{ animationDelay: "320ms" }}>
                <Testimonials />
              </div>
              <div className="mt-20 animate-popup" style={{ animationDelay: "400ms" }}>
                <Card className="bg-gradient-to-tr from-primary/5 to-secondary/20 border-primary/20 hover-lift max-w-3xl mx-auto">
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-3"><Shield className="w-6 h-6 text-primary" strokeWidth={1.5} /><h3 className="font-semibold text-lg">Built on Evidence and Empathy</h3></div>
                    <ul className="list-disc ml-7 text-sm text-muted-foreground mb-2">
                      <li>Created by expert dermatologists and AI scientists.</li>
                      <li>No diagnosis—just guidance for next steps.</li>
                      <li>Always preserves user privacy.</li>
                    </ul>
                    <p className="text-xs mt-2 text-muted-foreground italic">
                      For best results, use a clear photo and consult a doctor for any persistent concern.
                    </p>
                  </div>
                </Card>
              </div>
            </>
          ) : (
            <div className="space-y-8">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full animate-popup">
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
                  <Card className="p-6 border-primary/20 bg-gradient-to-b from-background to-primary/5 shadow-md animate-popup">
                    <div className="flex justify-center mb-4">
                      {previewUrl && (
                        <div className="relative rounded-lg overflow-hidden border-2 border-primary/20 shadow-lg transition-all hover:scale-[1.01] duration-300 animate-popup">
                          <img 
                            src={previewUrl} 
                            alt="Selected skin" 
                            className="max-h-[400px] object-contain" 
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex justify-center mb-2">
                      <ButtonGroup spacing="normal" align="center">
                        {!isProcessing ? (
                          <>
                            <Button 
                              onClick={handleDetection}
                              className="bg-primary shadow-md px-7 py-2 rounded-md font-medium text-white hover:bg-primary/90 animate-button-bounce"
                              disabled={!selectedImage}
                            >
                              Analyze Image
                            </Button>
                            <Button 
                              variant="outline" 
                              onClick={handleReset}
                              className="border-primary/30 px-6 hover:bg-primary/10 text-primary"
                            >
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Reset
                            </Button>
                          </>
                        ) : (
                          <Button disabled className="bg-primary/80 text-white animate-pulse px-7">
                            <Loader2 className="h-4 w-4 mr-2 animate-spin-slow" />
                            Analyzing...
                          </Button>
                        )}
                      </ButtonGroup>
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="result" className="animate-fade-in">
                  {result && (
                    <>
                      <DetectionResult result={result} previewUrl={previewUrl} />
                      <div className="flex justify-center mt-6">
                        <ButtonGroup spacing="normal" align="center">
                          <Button 
                            variant="outline" 
                            onClick={handleReset}
                            className="border-primary/30 px-6 hover:bg-primary/10 text-primary"
                          >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Try Another Image
                          </Button>
                        </ButtonGroup>
                      </div>
                    </>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </main>

      <footer className="py-8 border-t border-border bg-card/70 animate-popup mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" strokeWidth={1.5} />
              <span className="font-medium">DermaVision</span>
            </div>
            <ButtonGroup align="center" spacing="wide" className="md:hidden mt-3">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                Home
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                About
              </Link>
              <Link to="/login" className="text-muted-foreground hover:text-primary transition-colors font-medium flex items-center">
                <LogIn className="w-4 h-4 mr-1" /> Log in
              </Link>
              <Link to="/signup" className="text-primary font-medium hover:underline flex items-center">
                <UserPlus className="w-4 h-4 mr-1" /> Sign up
              </Link>
            </ButtonGroup>
            <div className="hidden md:flex gap-8">
              <Link to="/" className="text-muted-foreground hover:text-primary font-medium transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary font-medium transition-colors">
                About
              </Link>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-right mt-4 md:mt-0">
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
