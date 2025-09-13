"use client";

import { Activity, IndianRupee, Users, Bell, AlertTriangle, Thermometer, Droplets } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

function AdminDashboard() {
  const [temperature, setTemperature] = useState(24.5);
  const [humidity, setHumidity] = useState(65);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const warehouseId = "warehouse-1";
  
  // Fetch weather data
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch('/api/weather?warehouseId=' + warehouseId);
        if (response.ok) {
          const data = await response.json();
          setWeatherData(data);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setWeatherLoading(false);
      }
    };
    
    fetchWeatherData();
    // Fetch every 30 minutes
    const intervalId = setInterval(fetchWeatherData, 30 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [warehouseId]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Farmers</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+573</div>
          <p className="text-xs text-muted-foreground">+12.5% from last month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">201</div>
          <p className="text-xs text-muted-foreground">+18.2% from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          <IndianRupee className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹45,231.89</div>
          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Warehouse Conditions</CardTitle>
          <div className="flex space-x-2">
            <Thermometer className="h-4 w-4 text-red-500" />
            <Droplets className="h-4 w-4 text-blue-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Temperature</p>
              <p className="text-2xl font-bold text-red-500">{temperature}°C</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="text-2xl font-bold text-blue-500">{humidity}%</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Weather Forecast</CardTitle>
          {weatherData?.condition && (
            <div className="text-xl">
              {weatherData.condition.includes('rain') ? '🌧️' : 
               weatherData.condition.includes('cloud') ? '☁️' : 
               weatherData.condition.includes('sun') || weatherData.condition.includes('clear') ? '☀️' : 
               weatherData.condition.includes('snow') ? '❄️' : '🌤️'}
            </div>
          )}
        </CardHeader>
        <CardContent>
          {weatherLoading ? (
            <div className="flex items-center justify-center h-20">
              <p className="text-sm text-muted-foreground">Loading weather data...</p>
            </div>
          ) : weatherData ? (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Condition</p>
                  <p className="text-base font-medium">{weatherData.condition}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Outside Temp</p>
                  <p className="text-base font-medium">{weatherData.temperature}°C</p>
                </div>
              </div>
              
              {weatherData.forecast && weatherData.forecast.length > 0 && (
                <div className="mt-3 pt-3 border-t">
                  <p className="text-sm font-medium mb-2">3-Day Forecast</p>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {weatherData.forecast.slice(0, 3).map((day: any, idx: number) => (
                      <div key={idx} className="p-1 rounded bg-muted/30 text-xs">
                        <div>{new Date(day.date).toLocaleDateString(undefined, { weekday: 'short' })}</div>
                        <div className="text-base my-1">
                          {day.condition.includes('rain') ? '🌧️' : 
                           day.condition.includes('cloud') ? '☁️' : 
                           day.condition.includes('sun') || day.condition.includes('clear') ? '☀️' : 
                           day.condition.includes('snow') ? '❄️' : '🌤️'}
                        </div>
                        <div>{Math.round(day.temperature.min)}-{Math.round(day.temperature.max)}°C</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-20">
              <p className="text-sm text-muted-foreground">Weather data unavailable</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Warehouse Alerts</CardTitle>
          <Badge variant="destructive" className="ml-2">3 New</Badge>
          <Bell className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="p-3 rounded-md border border-red-300 bg-red-50">
              <div className="font-medium text-red-800">Critical Temperature Alert</div>
              <p className="text-sm mt-1 text-red-700">Temperature exceeds safe storage limits</p>
            </div>
            <div className="p-3 rounded-md border border-amber-300 bg-amber-50">
              <div className="font-medium text-amber-800">Humidity Warning</div>
              <p className="text-sm mt-1 text-amber-700">Humidity levels above recommended range</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Product Shelf Life</CardTitle>
          <AlertTriangle className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 border rounded-md">
              <div className="flex justify-between items-center mb-1">
                <div className="font-medium">Tomatoes</div>
                <Badge variant="destructive">Critical</Badge>
              </div>
              <div className="flex justify-between text-xs mb-1">
                <span>Shelf life remaining</span>
                <span className="text-red-600 font-medium">2 days</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
            
            <div className="p-3 border rounded-md">
              <div className="flex justify-between items-center mb-1">
                <div className="font-medium">Potatoes</div>
                <Badge variant="outline">Medium</Badge>
              </div>
              <div className="flex justify-between text-xs mb-1">
                <span>Shelf life remaining</span>
                <span>14 days</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            
            <div className="p-3 border rounded-md">
              <div className="flex justify-between items-center mb-1">
                <div className="font-medium">Onions</div>
                <Badge>Low</Badge>
              </div>
              <div className="flex justify-between text-xs mb-1">
                <span>Shelf life remaining</span>
                <span>28 days</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminDashboard;
