import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Heart, Clock, MapPin } from "lucide-react";

interface FavoriteRoute {
  id: string;
  number: string;
  name: string;
  nextDeparture?: string;
}

interface FavoriteRoutesProps {
  onRouteClick?: (routeNumber: string) => void;
}

export default function FavoriteRoutes({ onRouteClick }: FavoriteRoutesProps) {
  const [favorites, setFavorites] = useState<FavoriteRoute[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteBusRoutes');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const addToFavorites = (route: FavoriteRoute) => {
    const newFavorites = [...favorites, route];
    setFavorites(newFavorites);
    localStorage.setItem('favoriteBusRoutes', JSON.stringify(newFavorites));
  };

  const removeFromFavorites = (routeId: string) => {
    const newFavorites = favorites.filter(f => f.id !== routeId);
    setFavorites(newFavorites);
    localStorage.setItem('favoriteBusRoutes', JSON.stringify(newFavorites));
  };

  const isFavorite = (routeId: string) => {
    return favorites.some(f => f.id === routeId);
  };

  // Mock next departure calculation
  const getNextDeparture = () => {
    const now = new Date();
    const next = new Date(now.getTime() + Math.random() * 30 * 60000); // Random time within next 30 minutes
    return next.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
  };

  if (favorites.length === 0) {
    return (
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            <Heart className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Додайте улюблені маршрути для швидкого доступу</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-500" />
          Улюблені маршрути
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {favorites.map((route) => (
            <div
              key={route.id}
              className="p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => onRouteClick?.(route.number)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">№{route.number}</Badge>
                  <span className="text-sm">{route.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromFavorites(route.id);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <Heart className="w-4 h-4 fill-current" />
                </Button>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <Clock className="w-3 h-3" />
                Наступний: {getNextDeparture()}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Export utility functions for other components to use
export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteRoute[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteBusRoutes');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const addToFavorites = (route: FavoriteRoute) => {
    const newFavorites = [...favorites, route];
    setFavorites(newFavorites);
    localStorage.setItem('favoriteBusRoutes', JSON.stringify(newFavorites));
  };

  const removeFromFavorites = (routeId: string) => {
    const newFavorites = favorites.filter(f => f.id !== routeId);
    setFavorites(newFavorites);
    localStorage.setItem('favoriteBusRoutes', JSON.stringify(newFavorites));
  };

  const isFavorite = (routeId: string) => {
    return favorites.some(f => f.id === routeId);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  };
};