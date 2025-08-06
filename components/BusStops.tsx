import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MapPin, Clock, Bus, Search } from "lucide-react";

interface BusStop {
  id: number;
  name: string;
  nameUk: string;
  coordinates: [number, number];
  facilities: string[];
}

interface BusRoute {
  id: number;
  number: string;
  nameUk: string;
  color: string;
  schedule: {
    weekdays: string[];
    weekends: string[];
  };
}

const busStops: BusStop[] = [
  { 
    id: 1, 
    name: "AS-2", 
    nameUk: "АС-2", 
    coordinates: [49.221, 31.889],
    facilities: ["Навіс", "Лавка", "Інформаційне табло"]
  },
  { 
    id: 2, 
    name: "City Center", 
    nameUk: "Центр міста", 
    coordinates: [49.223, 31.891],
    facilities: ["Навіс", "Лавка", "Світло"]
  },
  { 
    id: 3, 
    name: "Hospital", 
    nameUk: "КНП Смілянська міська лікарня", 
    coordinates: [49.225, 31.893],
    facilities: ["Навіс", "Лавка"]
  },
  { 
    id: 4, 
    name: "Shevchenko Station", 
    nameUk: "Ст. Шевченка", 
    coordinates: [49.220, 31.887],
    facilities: ["Навіс", "Знак"]
  },
  { 
    id: 5, 
    name: "Market", 
    nameUk: "Ринок", 
    coordinates: [49.218, 31.885],
    facilities: ["Навіс", "Лавка", "Світло", "Інформаційне табло"]
  },
  { 
    id: 6, 
    name: "Park", 
    nameUk: "Парк", 
    coordinates: [49.227, 31.895],
    facilities: ["Лавка", "Знак"]
  },
  { 
    id: 7, 
    name: "Factory", 
    nameUk: "Завод", 
    coordinates: [49.215, 31.883],
    facilities: ["Навіс", "Знак"]
  },
  { 
    id: 8, 
    name: "Residential Area", 
    nameUk: "Житловий район", 
    coordinates: [49.230, 31.897],
    facilities: ["Навіс", "Лавка", "Світло"]
  },
  { 
    id: 9, 
    name: "Sports Complex", 
    nameUk: "Спорткомплекс", 
    coordinates: [49.224, 31.890],
    facilities: ["Навіс", "Лавка"]
  },
  { 
    id: 10, 
    name: "Bus Terminal", 
    nameUk: "Автостанція", 
    coordinates: [49.219, 31.888],
    facilities: ["Навіс", "Лавка", "Світло", "Інформаційне табло", "Каса"]
  }
];

const busRoutes: BusRoute[] = [
  {
    id: 1,
    number: "3",
    nameUk: "АС-2 — Вул. Волошкова",
    color: "#3b82f6",
    schedule: {
      weekdays: ["06:30", "08:20", "10:10", "16:45"],
      weekends: ["14:00", "11:20"]
    }
  },
  {
    id: 2,
    number: "4",
    nameUk: "Тимурівець — Вул. Сагайдачного",
    color: "#10b981",
    schedule: {
      weekdays: ["06:40", "07:40", "08:35", "09:36", "11:25", "12:55", "16:00", "17:10"],
      weekends: ["06:55", "07:55", "08:55", "10:45", "12:20"]
    }
  },
  {
    id: 3,
    number: "5",
    nameUk: "БК СЕМЗ — Вул. Федорова",
    color: "#f59e0b",
    schedule: {
      weekdays: ["07:25", "08:55", "10:10", "11:35", "14:30", "16:00", "18:00"],
      weekends: ["06:50", "08:15", "09:40", "10:45", "13:55", "15:15", "17:20"]
    }
  },
  {
    id: 4,
    number: "17",
    nameUk: "Ст. Шевченка — АС-1",
    color: "#ef4444",
    schedule: {
      weekdays: ["07:20", "08:57", "10:08", "11:28", "12:30", "15:45", "16:52"],
      weekends: ["06:20", "08:12", "09:32", "10:51", "11:55", "13:05"]
    }
  },
  {
    id: 5,
    number: "302",
    nameUk: "Ст. Шевченка — Черкаси",
    color: "#8b5cf6",
    schedule: {
      weekdays: ["06:30", "07:15", "07:35", "07:55", "08:15", "08:35", "09:00", "09:25", "09:50", "10:15", "10:35", "11:15", "11:55", "12:15", "12:35", "12:55", "13:55", "14:35", "15:15", "15:35", "15:55", "16:15", "16:35", "16:55", "18:15", "18:35", "18:55", "19:35"],
      weekends: ["06:30", "07:35", "08:35", "09:25", "10:15", "11:15", "12:15", "13:55", "15:15", "16:15", "18:15", "19:35"]
    }
  }
];

// Mock data for which routes serve which stops
const stopRoutes: { [key: number]: number[] } = {
  1: [1],
  2: [1, 2, 3],
  3: [1],
  4: [4, 5],
  5: [2],
  6: [2],
  7: [3],
  8: [2, 4],
  9: [3, 4],
  10: [3, 5]
};

export default function BusStops() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStop, setSelectedStop] = useState<BusStop | null>(null);
  const [isWeekend, setIsWeekend] = useState(false);

  const filteredStops = busStops.filter(stop =>
    stop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stop.nameUk.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoutesForStop = (stopId: number) => {
    const routeIds = stopRoutes[stopId] || [];
    return busRoutes.filter(route => routeIds.includes(route.id));
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
  };

  const getNextDeparture = (schedule: string[]) => {
    const currentTime = getCurrentTime();
    const nextDeparture = schedule.find(time => time > currentTime);
    return nextDeparture || schedule[0];
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          <Input
            placeholder="Пошук зупинки..."
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
        {filteredStops.map((stop) => {
          const routes = getRoutesForStop(stop.id);
          
          return (
            <Card key={stop.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader
                className="pb-3"
                onClick={() => setSelectedStop(selectedStop?.id === stop.id ? null : stop)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-primary" />
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {stop.nameUk}
                        <Badge variant="secondary">
                          {routes.length} маршрутів
                        </Badge>
                      </CardTitle>
                      <p className="text-muted-foreground text-sm">{stop.name}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {routes.map(route => (
                      <div
                        key={route.id}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                        style={{ backgroundColor: route.color }}
                      >
                        {route.number}
                      </div>
                    ))}
                  </div>
                </div>
              </CardHeader>
              
              {selectedStop?.id === stop.id && (
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="mb-2">Зручності:</h4>
                    <div className="flex flex-wrap gap-2">
                      {stop.facilities.map((facility, index) => (
                        <Badge key={index} variant="outline">
                          {facility}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="mb-2">Маршрути та розклад:</h4>
                    <div className="space-y-3">
                      {routes.map(route => (
                        <div key={route.id} className="p-3 rounded-lg bg-muted/50">
                          <div className="flex items-center gap-2 mb-2">
                            <div
                              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-medium"
                              style={{ backgroundColor: route.color }}
                            >
                              {route.number}
                            </div>
                            <span className="font-medium">{route.nameUk}</span>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground ml-auto">
                              <Clock className="w-4 h-4" />
                              Наступний: {getNextDeparture(isWeekend ? route.schedule.weekends : route.schedule.weekdays)}
                            </div>
                          </div>
                          <div className="grid grid-cols-4 gap-1">
                            {(isWeekend ? route.schedule.weekends : route.schedule.weekdays).slice(0, 8).map((time, index) => (
                              <Badge key={index} variant="outline" className="justify-center text-xs">
                                {time}
                              </Badge>
                            ))}
                          </div>
                          {(isWeekend ? route.schedule.weekends : route.schedule.weekdays).length > 8 && (
                            <p className="text-xs text-muted-foreground mt-1">
                              +{(isWeekend ? route.schedule.weekends : route.schedule.weekdays).length - 8} більше рейсів
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="mb-2">Координати:</h4>
                    <Badge variant="outline">
                      {stop.coordinates[0]}, {stop.coordinates[1]}
                    </Badge>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}