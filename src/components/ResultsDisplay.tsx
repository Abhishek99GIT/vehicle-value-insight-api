import { useState } from "react";
import { Download, Eye, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface PredictionResult {
  original_data: any[];
  predictions: number[];
  processing_time: number;
  filename: string;
}

interface ResultsDisplayProps {
  results: PredictionResult;
  onDownload: () => void;
}

export function ResultsDisplay({ results, onDownload }: ResultsDisplayProps) {
  const [isDataExpanded, setIsDataExpanded] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const avgPrice = results.predictions.reduce((sum, price) => sum + price, 0) / results.predictions.length;
  const minPrice = Math.min(...results.predictions);
  const maxPrice = Math.max(...results.predictions);

  const previewData = results.original_data.slice(0, 5).map((item, index) => ({
    ...item,
    predicted_price: results.predictions[index]
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{results.predictions.length}</div>
            <p className="text-sm text-muted-foreground">Vehicles Processed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">{formatPrice(avgPrice)}</div>
            <p className="text-sm text-muted-foreground">Average Price</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-accent">{formatPrice(minPrice)}</div>
            <p className="text-sm text-muted-foreground">Minimum Price</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">{formatPrice(maxPrice)}</div>
            <p className="text-sm text-muted-foreground">Maximum Price</p>
          </CardContent>
        </Card>
      </div>

      {/* Processing Info */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Processing Complete</CardTitle>
            <Badge variant="secondary" className="bg-success/10 text-success">
              {results.processing_time.toFixed(2)}s
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button onClick={onDownload} variant="brand" className="flex-1">
              <Download className="h-4 w-4" />
              Download Results CSV
            </Button>
            <Button variant="outline" onClick={() => setIsDataExpanded(!isDataExpanded)}>
              <Eye className="h-4 w-4" />
              Preview Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Preview */}
      <Collapsible open={isDataExpanded} onOpenChange={setIsDataExpanded}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Data Preview</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{previewData.length} of {results.predictions.length} rows</Badge>
                  {isDataExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium">Year</th>
                      <th className="text-left p-2 font-medium">Manufacturer</th>
                      <th className="text-left p-2 font-medium">Type</th>
                      <th className="text-left p-2 font-medium">Condition</th>
                      <th className="text-left p-2 font-medium">Odometer</th>
                      <th className="text-left p-2 font-medium">Predicted Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.map((row, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-2">{row.year}</td>
                        <td className="p-2">{row.manufacturer}</td>
                        <td className="p-2">{row.type}</td>
                        <td className="p-2">{row.condition}</td>
                        <td className="p-2">{row.odometer?.toLocaleString()}</td>
                        <td className="p-2 font-medium text-success">
                          {formatPrice(row.predicted_price)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {results.predictions.length > 5 && (
                <p className="text-center text-sm text-muted-foreground mt-4">
                  ...and {results.predictions.length - 5} more rows
                </p>
              )}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
}