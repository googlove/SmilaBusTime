import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Input } from "./components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Bus, MapPin, Clock, Navigation, Info, Search, Bell } from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import SmilaSchedule from "./components/SmilaSchedule";
import BusMap from "./components/BusMap";
import BusStops from "./components/BusStops";
import ThemeToggle from "./components/ThemeToggle";
import FavoriteRoutes from "./components/FavoriteRoutes";
import WeatherWidget from "./components/WeatherWidget";
import MarqueeText from "./components/MarqueeText";

export default function App() {
  const [activeTab, setActiveTab] = useState("schedule");
  const [currentTime, setCurrentTime] = useState("");
  const [currentDay, setCurrentDay] = useState("");
  const [busSearchNumber, setBusSearchNumber] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const daysArray = {
    0: 'ПН',
    1: 'ВТ', 
    2: 'СР',
    3: 'ЧТ',
    4: 'ПТ',
    5: 'СБ',
    6: 'НД'
  };

  useEffect(() => {
    const updateClock = () => {
      const date = new Date();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const day = (date.getDay() + 6) % 7; // Convert to Ukrainian week format
      
      setCurrentTime(`${hours}:${minutes}`);
      setCurrentDay(daysArray[day as keyof typeof daysArray]);
    };

    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleRouteSearch = (routeNumber: string) => {
    setBusSearchNumber(routeNumber);
    setActiveTab("schedule");
  };

  const requestNotifications = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      setNotificationsEnabled(permission === "granted");
      
      if (permission === "granted") {
        new Notification("SmilaBusTime", {
          body: "Сповіщення про автобуси увімкнено! 🚌",
          icon: "/favicon.ico"
        });
      }
    }
  };

  const currentDate = new Date().toLocaleDateString('uk-UA', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-4">
            <div className="md:col-span-2">
              <a href="https://www.smila-rada.gov.ua/" target="_blank" rel="noopener noreferrer">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1494790108755-2616c0763d7c?w=400&h=100&fit=crop&q=80"
                  alt="Smila City Logo"
                  className="h-24 object-contain mx-auto md:mx-0"
                />
              </a>
            </div>
            <div className="flex justify-center md:justify-end">
              <ThemeToggle />
            </div>
            <div className="text-center md:text-right">
              <Badge variant="secondary" className="text-2xl px-6 py-3">
                <span className={`mr-2 ${[5, 6].includes((new Date().getDay() + 6) % 7) ? 'text-red-500' : 'text-green-500'}`}>
                  {currentDay}
                </span>
                {currentTime}
              </Badge>
            </div>
          </div>

          {/* Weather Widget */}
          <WeatherWidget />

          {/* Donation and Advertisement with CSS animations */}
          <div className="space-y-4 mb-6">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 overflow-hidden">
              <MarqueeText direction="left" className="text-green-600 dark:text-green-400 font-medium">
                👑Топ донатери: Дмитро Рудас - 100 UAH👑
              </MarqueeText>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 overflow-hidden">
              <MarqueeText direction="right" className="text-green-600 dark:text-green-400 font-medium">
                📰Тут може бути ваша реклама📰
              </MarqueeText>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <a href="https://googlove.netlify.app/donate/index.html" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                    💰 Підтримати проект
                  </Button>
                </a>
              </div>
              <div className="flex-1">
                <a href="http://surl.li/qfuqj" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">
                    📱 Google Play
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Bot Information */}
          <Card className="mb-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-green-700 dark:text-green-300 font-medium mb-2">
                  🤖 Бот розкладу автобусів:
                </p>
                <a 
                  href="https://t.me/SmilaBusTime_bot" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  👉 Тисни сюди
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          {!notificationsEnabled && (
            <Card className="mb-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-blue-600" />
                    <span className="text-blue-700 dark:text-blue-300">Увімкнути сповіщення про автобуси?</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={requestNotifications}
                    className="text-blue-600 border-blue-200 hover:bg-blue-100"
                  >
                    Увімкнути
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Favorites */}
          <FavoriteRoutes onRouteClick={handleRouteSearch} />

          {/* Search Section */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 max-w-md mx-auto">
                <Search className="w-5 h-5" />
                <Input
                  placeholder="Введіть номер автобуса"
                  value={busSearchNumber}
                  onChange={(e) => setBusSearchNumber(e.target.value)}
                />
                <Button onClick={() => setActiveTab("schedule")}>
                  🔍 Пошук
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Розклад
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-2">
              <Navigation className="w-4 h-4" />
              Карта
            </TabsTrigger>
            <TabsTrigger value="stops" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Зупинки
            </TabsTrigger>
            <TabsTrigger value="info" className="flex items-center gap-2">
              <Info className="w-4 h-4" />
              Довідка
            </TabsTrigger>
          </TabsList>

          <TabsContent value="schedule">
            <SmilaSchedule searchNumber={busSearchNumber} />
          </TabsContent>

          <TabsContent value="map">
            <BusMap />
          </TabsContent>

          <TabsContent value="stops">
            <BusStops />
          </TabsContent>

          <TabsContent value="info">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    Інформація про транспортну систему м. Сміла
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="mb-2">Вартість проїзду:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="font-medium">По місту</p>
                        <p className="text-2xl text-primary">10 ₴</p>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="font-medium">До Черкас (№302)</p>
                        <p className="text-2xl text-primary">70 ₴</p>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="font-medium">По Черкасам (№302)</p>
                        <p className="text-2xl text-primary">13 ₴</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2">Пільги (безкоштовно):</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div>🎒 Діти до 7 років</div>
                      <div>🪖 Інваліди війни</div>
                      <div>🎖️ Учасники бойових дій</div>
                      <div>♿ Інваліди 1 категорії</div>
                      <div>👶 Діти-інваліди</div>
                      <div>👤 Діти-сироти</div>
                      <div>🏅 Ветерани АТО, ООС</div>
                      <div>👮 Прокуратура, поліція</div>
                      <div>🔥 Ліквідатори ЧАЕС</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2">Контактна інформація:</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Сайт створений:</span>
                        <span className="font-medium">20 червня 2022 року</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Останнє оновлення:</span>
                        <span className="font-medium">13 травня 2024 року</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2">Попутка:</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Ціна:</span>
                        <span className="font-medium">50-55 грн</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Сміла (Школа №3, Пушка) ➡️ Черкаси (Літак, МБК)
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <a href="https://bit.ly/3BmTmMM" target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">Viber</Button>
                        </a>
                        <a href="https://t.me/PopytkaSmila" target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">Telegram Сміла</Button>
                        </a>
                        <a href="https://t.me/telecar_cherkassy_geo" target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">Telegram Черкаси</Button>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2">Нові функції сайту:</h3>
                    <div className="space-y-2 text-sm">
                      <div>🌙 Темна/світла тема</div>
                      <div>❤️ Улюблені маршрути</div>
                      <div>🔔 Сповіщення про автобуси</div>
                      <div>🌤️ Інформація про погоду</div>
                      <div>📱 Адаптивний дизайн</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <footer className="mt-16 text-center space-y-4">
          <div className="text-sm text-muted-foreground">
            <p>© 2022. All rights reserved, Developed: 
              <a href="https://www.instagram.com/googlove_official/" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline ml-1">
                👨‍💻 Yaroslav Hohulov
              </a>
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>🚀 Зворотній зв'язок з розробником: 
              <a href="https://t.me/flame4ost" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline ml-1">
                писати сюди ✍️
              </a>
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>💼 Канал Сергій Ананко: 
              <a href="https://t.me/serhii_ananko" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline ml-1">
                підписатись ✅
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}