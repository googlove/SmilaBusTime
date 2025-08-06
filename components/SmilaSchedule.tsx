import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Clock, MapPin, Bus, ExternalLink, ChevronDown, Star } from "lucide-react";
import { useFavorites } from "./FavoriteRoutes";

interface SmilaScheduleProps {
  searchNumber: string;
}

interface BusRoute {
  id: string;
  number: string;
  name: string;
  nameUk: string;
  description?: string;
  operatingDays: string;
  directions: {
    [key: string]: {
      name: string;
      nameUk: string;
      times: string[];
      notes?: string[];
    };
  };
  mapUrl?: string;
  trackingUrl?: string;
  fareInfo?: string;
}

const busRoutes: BusRoute[] = [
  {
    id: "3",
    number: "3",
    name: "AS-2 — Voloshkova St.",
    nameUk: "🚍АС-2 — Вул. Волошкова",
    description: "📅Рейси виконуються з вівторка до п'ятниці. 📅В суботу останній рейс об 11:20 до центру.",
    operatingDays: "вт-пт, сб до 11:20",
    directions: {
      "as2": {
        name: "AS-2",
        nameUk: "🚍АС-2",
        times: ["06:30", "08:20", "10:10", "14:00 (суб-нед)", "16:45 (пн-пт)"]
      },
      "kiltseva": {
        name: "Kiltseva",
        nameUk: "🏞 Кільцева",
        times: ["06:50", "07:45", "08:40", "09:40", "10:35", "11:25", "14:20 (суб-нед)", "17:05 (пн-пт)", "17:50 (пн-пт)"]
      },
      "voloshkova": {
        name: "Voloshkova St.",
        nameUk: "🛣️Вул. Волошкова",
        times: ["07:25", "09:15", "11:00", "17:30 (пн-пт)"]
      }
    },
    mapUrl: "https://www.google.com/maps/d/embed?mid=1qQzimEwoNieCy52Cbl7BiXS5XPKNJ4U&ehbc=2E312F"
  },
  {
    id: "4",
    number: "4", 
    name: "Tymurivets — Sagaidachnoho St.",
    nameUk: "🏕️Тимурівець — вул. Петра Сагайдачного (Громова)",
    description: "📅⚠️Дні курсування: щоденно, за винятком неділі, та у суботу до 13:00.",
    operatingDays: "щоденно крім неділі",
    directions: {
      "tymurivets": {
        name: "Tymurivets",
        nameUk: "🏕️Тимурівець",
        times: ["06:40", "07:40", "08:35", "09:36", "11:25", "12:55"],
        notes: ["06:40 - через Гречківку ➡️ Центр ➡️ 🏥КНП 'Смілянська міська лікарня' ➡️ Тимурівець"]
      },
      "evening": {
        name: "Evening",
        nameUk: "🌃Вечір",
        times: ["16:00", "17:10"],
        notes: ["16:00 - З центру ➡️ магазин по 🌩️Вул.Петра Сагайдачного ➡️ Табір"]
      },
      "sagaidachnoho": {
        name: "Sagaidachnoho St.",
        nameUk: "🌩️ Вул. Петра Сагайдачного (магазин)",
        times: ["06:55", "07:55", "08:55", "10:45", "12:20"]
      }
    },
    mapUrl: "https://www.google.com/maps/d/embed?mid=1zz64r9m2eFv75kiMI-DC02EGxm1bQfU&ehbc=2E312F",
    trackingUrl: "https://local3.overseer.ua/locator/index.html?t=3cead81973bfacbb94b116c7e6cf0b0d75D21C61C13A082B7F82ABB15E224B7BA33BBF62&map=google_roadmap&directs=1&tails=1"
  },
  {
    id: "5",
    number: "5",
    name: "BK SEMZ — Fedorova St.",
    nameUk: "⚙️БК СЕМЗ – вул. Федорова",
    description: "📣Рейси виконуються: Щоденно!",
    operatingDays: "щоденно",
    directions: {
      "semz": {
        name: "BK SEMZ",
        nameUk: "⚙️БК СЕМЗ",
        times: ["07:25", "08:55", "10:10", "11:35", "14:30", "16:00", "18:00"]
      },
      "fedorova": {
        name: "Fedorova St.",
        nameUk: "🚍вул. І.Федорова",
        times: ["06:50", "08:15", "09:40", "10:45", "13:55", "15:15", "17:20"]
      }
    },
    mapUrl: "https://www.google.com/maps/d/embed?mid=1gvWIthILW36RHZRzQUZO7I51oO5GTBc&ehbc=2E312F"
  },
  {
    id: "17",
    number: "17",
    name: "Shevchenko Station — AS-1",
    nameUk: "🚉Ст.Шевченка — АС-1",
    description: "🚍№17 автобус курсує до зупинки «АС-1», коротким шляхом.",
    operatingDays: "пн-суб",
    directions: {
      "shevchenko": {
        name: "Shevchenko Station",
        nameUk: "🚆ст.Шевченка",
        times: ["07:20 (пн-суб)", "08:57 (пн-суб)", "10:08 (пн-суб)", "11:28 (пн-суб)", "12:30 (пн-суб)", "15:45 (пн-пт)", "16:52 (пн-пт)"]
      },
      "as1": {
        name: "AS-1",
        nameUk: "🚍АС-1",
        times: ["06:20 (пн-суб)", "08:12 (пн-суб)", "09:32 (пн-суб)", "10:51 (пн-суб)", "11:55 (пн-суб)", "13:05 (пн-суб)", "16:15 (пн-пт)", "17:31 (пн-пт)"]
      }
    },
    mapUrl: "https://www.google.com/maps/d/embed?mid=1TcLlgwou9oaE0OhXOJ4FklBwydwtgF4&ehbc=2E312F"
  },
  {
    id: "30",
    number: "30",
    name: "Shevchenko Station — AS-1",
    nameUk: "🚉Ст.Шевченка — АС-1",
    description: "🚍Дні курсування: щоденно",
    operatingDays: "щоденно",
    directions: {
      "shevchenko": {
        name: "Shevchenko Station",
        nameUk: "🚉станція Т.Шевченка",
        times: ["06:45", "06:55", "07:12", "07:21", "07:28", "07:36", "07:45", "07:53", "08:01", "08:11", "08:19", "08:30", "08:39", "08:49", "08:57", "09:06", "09:15", "09:24", "09:32", "09:41", "09:50", "09:59", "10:08", "10:17", "10:26", "10:35", "10:44", "10:52", "11:05", "11:20", "11:28", "11:37", "11:46", "12:00", "12:20", "12:33", "12:44", "12:54", "13:06", "13:10", "13:20", "13:35", "13:48", "14:00", "14:11", "14:22", "14:33", "14:43", "14:53", "15:03", "15:11", "15:21 (пн-пт)", "15:30", "15:38", "15:46", "15:58", "16:07", "16:16", "16:23", "16:35", "16:43", "16:52", "17:01", "17:20", "17:45", "18:00", "18:20", "18:50", "19:10", "19:40", "20:25", "21:10", "22:15"]
      },
      "as1": {
        name: "AS-1",
        nameUk: "АС-1 (Район: Машбуд)",
        times: ["06:40", "06:50", "07:00", "07:10", "07:20", "07:31", "07:40", "07:50", "08:00", "08:08", "08:17", "08:26", "08:35", "08:44", "08:52", "09:01", "09:10", "09:20", "09:29", "09:37", "09:46", "09:55", "10:04", "10:12", "10:25", "10:38", "10:46", "10:56", "11:06", "11:15", "11:25", "11:42", "12:00", "12:09", "12:18", "12:26", "12:34", "12:42", "12:50", "13:00", "13:13", "13:22", "13:32", "13:43", "13:55", "14:05", "14:15", "14:25", "14:36", "14:48", "15:01", "15:12", "15:23", "15:34", "15:44", "15:54", "16:03 (пн-пт)", "16:11", "16:19", "16:28", "16:42", "16:51", "17:00", "17:09", "17:18", "17:27", "17:35", "17:43", "18:03", "18:20", "18:40", "19:05", "19:35", "19:55", "20:30", "21:05", "21:40", "22:45"]
      }
    },
    mapUrl: "https://www.google.com/maps/d/embed?mid=1Axylm3JiDQ-qzY6ZHu-rlRXSiXcqEN4&ehbc=2E312F"
  },
  {
    id: "32",
    number: "32",
    name: "Shevchenko Station — Hospital",
    nameUk: "🚉Ст.Шевченко — КНП Смілянська міська лікарня",
    description: "🚍ДНІ КУРСУВАННЯ: ЩОДЕННО!",
    operatingDays: "щоденно",
    directions: {
      "shevchenko": {
        name: "Shevchenko Station",
        nameUk: "Ст.Шевченко",
        times: ["06:30 (щоденно, через Плоске)", "07:02 (пн-пт, через Плоске)", "08:30 (щоденно, через Плоске)", "09:10 (пн-пт, через Плоске)", "10:30 (щоденно)", "11:10 (пн-пт)", "13:25 (пн-пт, до Плоского)", "14:28 (щоденно, через Плоске)", "16:25 (щоденно)", "17:10 (пн-пт, через Плоске)", "18:15 (пн-пт)"]
      },
      "hospital": {
        name: "Hospital",
        nameUk: "лікарня КНП Смілянська міська лікарня",
        times: ["07:30 (Щоденно, через Плоске)", "08:12 (пн-пт)", "09:30 (Щоденно, через Плоске)", "10:05 (Пн-пт, через Плоске)", "11:20 (Щоденно, через Плоске)", "12:00 (Пн-пт, через Плоске)", "15:20 (Щоденно, через Плоске)", "15:55 (Пн-пт, через Плоске)", "17:15 (Щоденно, через Плоске)", "18:00 (Пн-пт, через Плоске)", "19:00 (щоденно)"]
      }
    },
    mapUrl: "https://www.google.com/maps/d/embed?mid=1CpFX4FecfM9Z015I2kokOMMPXXxK8fg&ehbc=2E312F",
    trackingUrl: "https://local3.overseer.ua/locator/index.html?t=3cead81973bfacbb94b116c7e6cf0b0d75D21C61C13A082B7F82ABB15E224B7BA33BBF62&map=google_roadmap&directs=1&tails=1"
  },
  {
    id: "302",
    number: "302",
    name: "Shevchenko Station — Cherkasy AS-2",
    nameUk: "🚉Ст.Шевченка(Сміла) — м.Черкаси(АС-2)",
    description: "📅Дні курсування: ЩОДЕННО.",
    operatingDays: "щоденно",
    fareInfo: "💸Вартість проїзду до м.Черкаси: 70 грн. 💸По місту: 10 грн. 💸По м.Черкаси: 13 грн.",
    directions: {
      "shevchenko": {
        name: "Shevchenko Station",
        nameUk: "🚉ст.Шевченко",
        times: ["06:30", "07:15", "07:35", "07:55", "08:15", "08:35", "09:00", "09:25", "09:50", "10:15", "10:35", "11:15", "11:55", "12:15", "12:35", "12:55", "13:55", "14:35", "15:15", "15:35", "15:55", "16:15", "16:35", "16:55", "18:15", "18:35", "18:55", "19:35"]
      },
      "cherkasy": {
        name: "Cherkasy AS-2",
        nameUk: "🌅м.Черкаси(АС-2)",
        times: ["06:10", "06:30", "06:50", "07:15", "07:55", "08:15", "08:35", "08:55", "09:15", "09:55", "10:35", "10:55", "11:15", "11:35", "12:35", "13:15", "13:55", "14:15", "14:35", "14:55", "15:15", "15:35", "15:55", "16:35", "16:55", "17:15", "17:35", "18:15"]
      }
    },
    mapUrl: "https://www.google.com/maps/d/embed?mid=1SqOR3qkr7GEEgsJ-oVSngcTEC7XtSUI&ehbc=2E312F"
  }
];

export default function SmilaSchedule({ searchNumber }: SmilaScheduleProps) {
  const [expandedRoute, setExpandedRoute] = useState<string | null>(null);
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const filteredRoutes = busRoutes.filter(route => 
    !searchNumber || route.number.includes(searchNumber)
  );

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
  };

  const getNextDeparture = (times: string[]) => {
    const currentTime = getCurrentTime();
    // Remove annotations from times for comparison
    const cleanTimes = times.map(time => time.split(' ')[0]);
    const nextDeparture = cleanTimes.find(time => time > currentTime);
    return nextDeparture || cleanTimes[0];
  };

  const handleToggleFavorite = (route: BusRoute, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering the collapsible
    
    if (isFavorite(route.id)) {
      removeFromFavorites(route.id);
    } else {
      addToFavorites({
        id: route.id,
        number: route.number,
        name: route.nameUk,
        nextDeparture: getNextDeparture(Object.values(route.directions)[0]?.times || [])
      });
    }
  };

  return (
    <div className="space-y-4">
      {filteredRoutes.length === 0 && searchNumber && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Маршрут №{searchNumber} не знайдено
            </p>
          </CardContent>
        </Card>
      )}

      {filteredRoutes.map((route) => (
        <Card key={route.id} className="overflow-hidden">
          <Collapsible 
            open={expandedRoute === route.id}
            onOpenChange={(open) => setExpandedRoute(open ? route.id : null)}
          >
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      №{route.number}
                    </Badge>
                    <div className="text-left">
                      <CardTitle className="text-lg">{route.nameUk}</CardTitle>
                      <p className="text-sm text-muted-foreground">{route.operatingDays}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Favorite Star */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleToggleFavorite(route, e)}
                      className={`p-2 hover:bg-transparent ${
                        isFavorite(route.id) 
                          ? 'text-yellow-500 hover:text-yellow-600' 
                          : 'text-gray-400 hover:text-yellow-500'
                      } transition-colors`}
                      title={isFavorite(route.id) ? 'Видалити з улюблених' : 'Додати до улюблених'}
                    >
                      <Star 
                        className={`w-5 h-5 ${
                          isFavorite(route.id) ? 'fill-current' : ''
                        }`} 
                      />
                    </Button>
                    
                    {route.trackingUrl && (
                      <Badge variant="outline" className="text-green-600">
                        📍 Відстеження
                      </Badge>
                    )}
                    <ChevronDown className={`w-4 h-4 transition-transform ${expandedRoute === route.id ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </CardHeader>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <CardContent className="space-y-6">
                {route.description && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-sm text-red-700 dark:text-red-300" dangerouslySetInnerHTML={{ __html: route.description }} />
                  </div>
                )}

                {route.fareInfo && (
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <p className="text-sm text-blue-700 dark:text-blue-300">{route.fareInfo}</p>
                  </div>
                )}

                <Tabs defaultValue={Object.keys(route.directions)[0]} className="w-full">
                  <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${Object.keys(route.directions).length}, 1fr)` }}>
                    {Object.entries(route.directions).map(([key, direction]) => (
                      <TabsTrigger key={key} value={key} className="text-xs">
                        {direction.nameUk}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {Object.entries(route.directions).map(([key, direction]) => (
                    <TabsContent key={key} value={key} className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {direction.nameUk}
                          <Badge variant="outline" className="text-xs">
                            Наступний: {getNextDeparture(direction.times)}
                          </Badge>
                        </h4>
                        
                        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2">
                          {direction.times.map((time, index) => (
                            <Badge key={index} variant="outline" className="justify-center text-xs py-1">
                              {time}
                            </Badge>
                          ))}
                        </div>

                        {direction.notes && direction.notes.length > 0 && (
                          <div className="mt-3 space-y-1">
                            {direction.notes.map((note, index) => (
                              <p key={index} className="text-xs text-muted-foreground">
                                ℹ️ {note}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>

                <div className="flex gap-2 pt-4 border-t">
                  {route.mapUrl && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(route.mapUrl, '_blank')}
                      className="flex items-center gap-1"
                    >
                      <MapPin className="w-3 h-3" />
                      Карта маршруту
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  )}
                  
                  {route.trackingUrl && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(route.trackingUrl, '_blank')}
                      className="flex items-center gap-1 text-green-600 border-green-200 hover:bg-green-50"
                    >
                      <Bus className="w-3 h-3" />
                      Відстеження в реальному часі
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  )}
                </div>

                {route.mapUrl && (
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
                )}
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      ))}
    </div>
  );
}