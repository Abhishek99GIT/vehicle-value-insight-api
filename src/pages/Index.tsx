import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BrandLogo } from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Brain, TrendingUp, Shield, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroBackground from "@/assets/hero-bg.jpg";
import predictionIllustration from "@/assets/prediction-illustration.jpg";

interface PredictionResult {
  original_data: any[];
  predictions: number[];
  processing_time: number;
  filename: string;
}

const Index = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<PredictionResult | null>(null);
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    setResults(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      // In a real app, this would be your FastAPI backend URL
      const API_URL = 'http://localhost:8000';
      
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Mock response for demo - replace with actual API response handling
      setTimeout(() => {
        const mockResults: PredictionResult = {
          original_data: Array.from({ length: 100 }, (_, i) => ({
            year: 2015 + Math.floor(Math.random() * 8),
            manufacturer: ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes'][Math.floor(Math.random() * 5)],
            type: ['sedan', 'SUV', 'truck', 'coupe'][Math.floor(Math.random() * 4)],
            condition: ['excellent', 'good', 'fair'][Math.floor(Math.random() * 3)],
            odometer: Math.floor(Math.random() * 150000) + 10000,
            fuel: 'gas',
            transmission: 'automatic',
            size: 'mid-size',
            cylinders: '6 cylinders'
          })),
          predictions: Array.from({ length: 100 }, () => Math.floor(Math.random() * 40000) + 10000),
          processing_time: 2.34,
          filename: file.name
        };
        setResults(mockResults);
        setIsProcessing(false);
        
        toast({
          title: "Processing Complete!",
          description: `Successfully predicted prices for ${mockResults.predictions.length} vehicles.`,
        });
      }, 3000);
    } catch (error) {
      console.error('Error uploading file:', error);
      setIsProcessing(false);
      
      // For demo, still show mock results even if API fails
      const mockResults: PredictionResult = {
        original_data: Array.from({ length: 50 }, (_, i) => ({
          year: 2015 + Math.floor(Math.random() * 8),
          manufacturer: ['Toyota', 'Honda', 'Ford'][Math.floor(Math.random() * 3)],
          type: ['sedan', 'SUV', 'truck'][Math.floor(Math.random() * 3)],
          condition: ['excellent', 'good', 'fair'][Math.floor(Math.random() * 3)],
          odometer: Math.floor(Math.random() * 150000) + 10000,
        })),
        predictions: Array.from({ length: 50 }, () => Math.floor(Math.random() * 40000) + 10000),
        processing_time: 1.85,
        filename: file.name
      };
      setResults(mockResults);
      
      toast({
        title: "Demo Mode",
        description: "Showing sample results (connect to your FastAPI backend for real predictions).",
      });
    }
  };

  const handleDownload = () => {
    if (!results) return;

    const csvContent = [
      Object.keys(results.original_data[0]).concat(['predicted_price']).join(','),
      ...results.original_data.map((row, index) => 
        Object.values(row).concat([results.predictions[index]]).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `predictions_${results.filename}`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <BrandLogo size="md" />
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="hidden sm:inline-flex">
                AI-Powered Predictions
              </Badge>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: `url(${heroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-hero z-10" />
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4 animate-slide-up">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-brand bg-clip-text text-transparent">
                Vehicle Price Prediction
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                Leverage advanced machine learning to predict accurate vehicle prices from your CSV data
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                <span>ML-Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                <span>Accurate Predictions</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-accent" />
                <span>Secure Processing</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-warning" />
                <span>Fast Results</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {!results && !isProcessing && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold">Get Started</h2>
                <p className="text-lg text-muted-foreground">
                  Upload your vehicle data CSV file to receive instant price predictions
                </p>
              </div>

              <FileUpload onFileSelect={handleFileUpload} isLoading={isProcessing} />

              {/* How It Works */}
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-center">How It Works</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                            1
                          </div>
                          <h3 className="font-semibold">Upload CSV Data</h3>
                        </div>
                        <p className="text-sm text-muted-foreground ml-11">
                          Provide vehicle data including year, manufacturer, condition, and mileage
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                            2
                          </div>
                          <h3 className="font-semibold">AI Processing</h3>
                        </div>
                        <p className="text-sm text-muted-foreground ml-11">
                          Our XGBoost model analyzes your data using advanced feature engineering
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                            3
                          </div>
                          <h3 className="font-semibold">Get Results</h3>
                        </div>
                        <p className="text-sm text-muted-foreground ml-11">
                          Download your CSV with accurate price predictions for each vehicle
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <img 
                        src={predictionIllustration} 
                        alt="AI Prediction Process" 
                        className="rounded-lg shadow-subtle w-full"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {isProcessing && (
            <Card className="text-center py-12 animate-fade-in">
              <CardContent>
                <div className="space-y-6">
                  <div className="mx-auto h-16 w-16 animate-pulse-glow">
                    <Loader2 className="h-16 w-16 animate-spin text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Processing Your Data</h3>
                    <p className="text-muted-foreground">
                      Our AI model is analyzing your vehicle data and generating predictions...
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <Badge variant="outline">
                      This usually takes 2-5 seconds
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {results && <ResultsDisplay results={results} onDownload={handleDownload} />}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/80 backdrop-blur-sm py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <BrandLogo size="sm" />
            <div className="text-sm text-muted-foreground text-center">
              © 2024 V-SOFT Consulting. Advanced AI solutions for business intelligence.
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Powered by XGBoost</span>
              <span>•</span>
              <span>Built with React</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
