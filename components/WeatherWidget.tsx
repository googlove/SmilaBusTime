import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Cloud, Sun, CloudRain, AlertTriangle } from "lucide-react";

interface WeatherData {
  temperature: number;
  condition: "sunny" | "cloudy" | "rainy" | "snowy";
  description: string;
  warning?: string;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock weather data - in a real app, you'd fetch from a weather API
    setTimeout(() => {
      const mockWeather: WeatherData = {
        temperature: Math.floor(Math.random() * 30) - 5, // -5 to 25°C
        condition: ["sunny", "cloudy", "rainy"][Math.floor(Math.random() * 3)] as any,
        description: "Легка хмарність",
        warning: Math.random() > 0.8 ? "Можливі затримки через погодні умови" : undefined
      };
      setWeather(mockWeather);
      setLoading(false);
    }, 1000);
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="w-5 h-5 text-yellow-500" />;
      case "cloudy":
        return <Cloud className="w-5 h-5 text-gray-500" />;
      case "rainy":
        return <CloudRain className="w-5 h-5 text-blue-500" />;
      default:
        return <Cloud className="w-5 h-5 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-muted animate-pulse rounded" />
            <div className="w-20 h-4 bg-muted animate-pulse rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!weather) return null;

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getWeatherIcon(weather.condition)}
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{weather.temperature}°C</span>
                <span className="text-sm text-muted-foreground">{weather.description}</span>
              </div>
              <span className="text-xs text-muted-foreground">Сміла, Черкаська обл.</span>
            </div>
          </div>
          
          {weather.warning && (
            <Badge variant="outline" className="text-orange-600 border-orange-200">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Увага
            </Badge>
          )}
        </div>
        
        {weather.warning && (
          <div className="mt-3 p-2 bg-orange-50 border border-orange-200 rounded text-xs text-orange-700">
            {weather.warning}
          </div>
        )}
      </CardContent>
    </Card>
  );
}