import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MapPin, Bus, Navigation } from "lucide-react";

interface BusStop {
  id: number;
  name: string;
  nameUk: string;
  coordinates: [number, number];
}

interface BusRoute {
  id: number;
  number: string;
  name: string;
  nameUk: string;
  stops: BusStop[];
  color: string;
}

const busStops: BusStop[] = [
  { id: 1, name: "AS-2", nameUk: "АС-2", coordinates: [49.221, 31.889] },
  { id: 2, name: "City Center", nameUk: "Центр міста", coordinates: [49.223, 31.891] },
  { id: 3, name: "Hospital", nameUk: "КНП Смілянська міська лікарня", coordinates: [49.225, 31.893] },
  { id: 4, name: "Shevchenko Station", nameUk: "Ст. Шевченка", coordinates: [49.220, 31.887] },
  { id: 5, name: "Tymurivets", nameUk: "Тимурівець", coordinates: [49.218, 31.885] },
  { id: 6, name: "Voloshkova St", nameUk: "Вул. Волошкова", coordinates: [49.227, 31.895] },
  { id: 7, name: "BK SEMZ", nameUk: "БК СЕМЗ", coordinates: [49.215, 31.883] },
  { id: 8, name: "Fedorova St", nameUk: "Вул. Федорова", coordinates: [49.230, 31.897] },
  { id: 9, name: "AS-1", nameUk: "АС-1", coordinates: [49.224, 31.890] },
  { id: 10, name: "Cherkasy AS-2", nameUk: "Черкаси АС-2", coordinates: [49.219, 31.888] }
];

const busRoutes: BusRoute[] = [
  {
    id: 1,
    number: "3",
    name: "AS-2 — Voloshkova St",
    nameUk: "АС-2 — Вул. Волошкова",
    stops: [busStops[0], busStops[1], busStops[5]],
    color: "#3b82f6"
  },
  {
    id: 2,
    number: "4",
    name: "Tymurivets — Sagaidachnoho St",
    nameUk: "Тимурівець — Вул. Сагайдачного",
    stops: [busStops[4], busStops[1], busStops[2]],
    color: "#10b981"
  },
  {
    id: 3,
    number: "5",
    name: "BK SEMZ — Fedorova St",
    nameUk: "БК СЕМЗ — Вул. Федорова",
    stops: [busStops[6], busStops[1], busStops[7]],
    color: "#f59e0b"
  },
  {
    id: 4,
    number: "17",
    name: "Shevchenko Station — AS-1",
    nameUk: "Ст. Шевченка — АС-1",
    stops: [busStops[3], busStops[1], busStops[8]],
    color: "#ef4444"
  },
  {
    id: 5,
    number: "302",
    name: "Shevchenko Station — Cherkasy",
    nameUk: "Ст. Шевченка — Черкаси",
    stops: [busStops[3], busStops[1], busStops[9]],
    color: "#8b5cf6"
  }
];

export default function BusMap() {
  const [selectedRoute, setSelectedRoute] = useState<BusRoute | null>(null);
  const [selectedStop, setSelectedStop] = useState<BusStop | null>(null);

  // Convert coordinates to SVG coordinates (simplified projection)
  const toSVG = (coordinates: [number, number]) => {
    const [lat, lng] = coordinates;
    const x = (lng - 31.88) * 8000 + 50;
    const y = (49.23 - lat) * 8000 + 50;
    return [Math.max(10, Math.min(590, x)), Math.max(10, Math.min(390, y))];
  };

  const getRoutesForStop = (stop: BusStop) => {
    return busRoutes.filter(route => route.stops.some(s => s.id === stop.id));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="w-5 h-5" />
            Карта маршрутів м. Сміла
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={!selectedRoute ? "default" : "outline"}
                onClick={() => setSelectedRoute(null)}
                size="sm"
              >
                Всі маршрути
              </Button>
              {busRoutes.map(route => (
                <Button
                  key={route.id}
                  variant={selectedRoute?.id === route.id ? "default" : "outline"}
                  onClick={() => setSelectedRoute(route)}
                  size="sm"
                  className="gap-2"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: route.color }}
                  />
                  №{route.number}
                </Button>
              ))}
            </div>

            <div className="relative">
              <svg
                width="600"
                height="400"
                viewBox="0 0 600 400"
                className="border rounded-lg bg-muted/20 w-full"
              >
                {/* City background */}
                <rect width="600" height="400" fill="#f8fafc" className="dark:fill-gray-800" />
                
                {/* River (simplified) */}
                <path
                  d="M 50 200 Q 200 150 350 180 Q 500 200 550 160"
                  stroke="#3b82f6"
                  strokeWidth="8"
                  fill="none"
                  opacity="0.3"
                />
                
                {/* Draw routes */}
                {busRoutes.map(route => {
                  if (selectedRoute && selectedRoute.id !== route.id) return null;
                  
                  const pathData = route.stops.map((stop, index) => {
                    const [x, y] = toSVG(stop.coordinates);
                    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                  }).join(' ');
                  
                  return (
                    <path
                      key={route.id}
                      d={pathData}
                      stroke={route.color}
                      strokeWidth="3"
                      fill="none"
                      opacity="0.8"
                    />
                  );
                })}
                
                {/* Draw bus stops */}
                {busStops.map(stop => {
                  const [x, y] = toSVG(stop.coordinates);
                  const routesAtStop = getRoutesForStop(stop);
                  const isHighlighted = selectedRoute ? routesAtStop.some(r => r.id === selectedRoute.id) : true;
                  
                  if (!isHighlighted) return null;
                  
                  return (
                    <g key={stop.id}>
                      <circle
                        cx={x}
                        cy={y}
                        r="6"
                        fill={selectedStop?.id === stop.id ? "#ef4444" : "#ffffff"}
                        stroke="#000000"
                        strokeWidth="2"
                        className="cursor-pointer hover:stroke-primary"
                        onClick={() => setSelectedStop(selectedStop?.id === stop.id ? null : stop)}
                      />
                      <text
                        x={x}
                        y={y - 10}
                        textAnchor="middle"
                        className="text-xs font-medium fill-current"
                        style={{ pointerEvents: 'none' }}
                      >
                        {stop.id}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {selectedStop && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    {selectedStop.nameUk}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Маршрути через цю зупинку:</p>
                    <div className="flex flex-wrap gap-2">
                      {getRoutesForStop(selectedStop).map(route => (
                        <Badge key={route.id} variant="outline" className="gap-1">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: route.color }}
                          />
                          №{route.number}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}