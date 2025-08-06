import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Clock, MapPin, Bus, Search, ExternalLink, Star } from "lucide-react";
import { useFavorites } from "./FavoriteRoutes";

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
  schedule: {
    weekdays: string[];
    weekends: string[];
  };
  mapUrl?: string;
  trackingUrl?: string;
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
    color: "#3b82f6",
    schedule: {
      weekdays: ["06:30", "08:20", "10:10", "16:45"],
      weekends: ["14:00", "11:20"]
    },
    mapUrl: "https://www.google.com/maps/d/embed?mid=1qQzimEwoNieCy52Cbl7BiXS5XPKNJ4U&ehbc=2E312F"
  },
  {
    id: 2,
    number: "4",
    name: "Tymurivets — Sagaidachnoho St",
    nameUk: "Тимурівець — Вул. Сагайдачного",
    stops: [busStops[4], busStops[1], busStops[2]],
    color: "#10b981",
    schedule: {
      weekdays: ["06:40", "07:40", "08:35", "09:36", "11:25", "12:55", "16:00", "17:10"],
      weekends: ["06:55", "07:55", "08:55", "10:45", "12:20"]
    },
    mapUrl: "https://www.google.com/maps/d/embed?mid=1zz64r9m2eFv75kiMI-DC02EGxm1bQfU&ehbc=2E312F",
    trackingUrl: "https://local3.overseer.ua/locator/index.html?t=3cead81973bfacbb94b116c7e6cf0b0d75D21C61C13A082B7F82ABB15E224B7BA33BBF62&map=google_roadmap&directs=1&tails=1"
  },
  {
    id: 3,
    number: "5",
    name: "BK SEMZ — Fedorova St",
    nameUk: "БК СЕМЗ — Вул. Федорова",
    stops: [busStops[6], busStops[1], busStops[7]],
    color: "#f59e0b",
    schedule: {
      weekdays: ["07:25", "08:55", "10:10", "11:35", "14:30", "16:00", "18:00"],
      weekends: ["06:50", "08:15", "09:40", "10:45", "13:55", "15:15", "17:20"]
    },
    mapUrl: "https://www.google.com/maps/d/embed?mid=1gvWIthILW36RHZRzQUZO7I51oO5GTBc&ehbc=2E312F"
  },
  {
    id: 4,
    number: "17",
    name: "Shevchenko Station — AS-1",
    nameUk: "Ст. Шевченка — АС-1",
    stops: [busStops[3], busStops[1], busStops[8]],
    color: "#ef4444",
    schedule: {
      weekdays: ["07:20", "08:57", "10:08", "11:28", "12:30", "15:45", "16:52"],
      weekends: ["06:20", "08:12", "09:32", "10:51", "11:55", "13:05"]
    },
    mapUrl: "https://www.google.com/maps/d/embed?mid=1TcLlgwou9oaE0OhXOJ4FklBwydwtgF4&ehbc=2E312F"
  },
  {
    id: 5,
    number: "302",
    name: "Shevchenko Station — Cherkasy",
    nameUk: "Ст. Шевченка — Черкаси",
    stops: [busStops[3], busStops[1], busStops[9]],
    color: "#8b5cf6",
    schedule: {
      weekdays: ["06:30", "07:15", "07:35", "07:55", "08:15", "08:35", "09:00", "09:25", "09:50", "10:15", "10:35", "11:15", "11:55", "12:15", "12:35", "12:55", "13:55", "14:35", "15:15", "15:35", "15:55", "16:15", "16:35", "16:55", "18:15", "18:35", "18:55", "19:35"],
      weekends: ["06:30", "07:35", "08:35", "09:25", "10:15", "11:15", "12:15", "13:55", "15:15", "16:15", "18:15", "19:35"]
    },
    mapUrl: "https://www.google.com/maps/d/embed?mid=1SqOR3qkr7GEEgsJ-oVSngcTEC7XtSUI&ehbc=2E312F"
  }
];

export default function BusSchedule() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoute, setSelectedRoute] = useState<BusRoute | null>(null);
  const [isWeekend, setIsWeekend] = useState(false);
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const filteredRoutes = busRoutes.filter(route =>
    route.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.nameUk.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
  };

  const getNextDeparture = (schedule: string[]) => {
    const currentTime = getCurrentTime();
    const nextDeparture = schedule.find(time => time.split(' ')[0] > currentTime);
    return nextDeparture || schedule[0];
  };

  const handleToggleFavorite = (route: BusRoute, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering the route selection
    
    if (isFavorite(route.id.toString())) {
      removeFromFavorites(route.id.toString());
    } else {
      addToFavorites({
        id: route.id.toString(),
        number: route.number,
        name: route.nameUk,
        nextDeparture: getNextDeparture(isWeekend ? route.schedule.weekends : route.schedule.weekdays)
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          <Input
            placeholder="Пошук маршруту або зупинки..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={!isWeekend ? "default" : "outline"}
            onClick={() => setIsWeekend(false)}
          >
            Будні дні
          </Button>
          <Button
            variant={isWeekend ? "default" : "outline"}
            onClick={() => setIsWeekend(true)}
          >
            Вихідні
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredRoutes.map((route) => (
          <Card key={route.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader
              className="pb-3"
              onClick={() => setSelectedRoute(selectedRoute?.id === route.id ? null : route)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium"
                    style={{ backgroundColor: route.color }}
                  >
                    {route.number}
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Маршрут №{route.number}
                      <Badge variant="secondary">
                        {route.stops.length} зупинок
                      </Badge>
                      {route.trackingUrl && (
                        <Badge variant="outline" className="text-green-600">
                          📍 Трекінг
                        </Badge>
                      )}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm">{route.nameUk}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Favorite Star */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => handleToggleFavorite(route, e)}
                    className={`p-2 hover:bg-transparent ${
                      isFavorite(route.id.toString()) 
                        ? 'text-yellow-500 hover:text-yellow-600' 
                        : 'text-gray-400 hover:text-yellow-500'
                    } transition-colors`}
                    title={isFavorite(route.id.toString()) ? 'Видалити з улюблених' : 'Додати до улюблених'}
                  >
                    <Star 
                      className={`w-5 h-5 ${
                        isFavorite(route.id.toString()) ? 'fill-current' : ''
                      }`} 
                    />
                  </Button>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      Наступний: {getNextDeparture(isWeekend ? route.schedule.weekends : route.schedule.weekdays)}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            {selectedRoute?.id === route.id && (
              <CardContent>
                <Tabs defaultValue="schedule" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="schedule">Розклад</TabsTrigger>
                    <TabsTrigger value="stops">Зупинки</TabsTrigger>
                    <TabsTrigger value="map">Карта</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="schedule" className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">
                          {isWeekend ? "Вихідні дні" : "Будні дні"}
                        </h4>
                        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                          {(isWeekend ? route.schedule.weekends : route.schedule.weekdays).map((time, index) => (
                            <Badge key={index} variant="outline" className="justify-center">
                              {time}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {route.trackingUrl && (
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => window.open(route.trackingUrl, '_blank')}
                            className="w-full text-green-600 border-green-200 hover:bg-green-100"
                          >
                            <Bus className="w-4 h-4 mr-2" />
                            Відстеження автобуса в реальному часі
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="stops" className="space-y-2">
                    {route.stops.map((stop, index) => (
                      <div key={stop.id} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
                              {index + 1}
                            </span>
                            <span>{stop.nameUk}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="map" className="space-y-4">
                    {route.mapUrl ? (
                      <div className="aspect-video w-full">
                        <iframe 
                          src={route.mapUrl}
                          className="w-full h-full rounded-lg border"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground py-8">
                        Карта маршруту недоступна
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}