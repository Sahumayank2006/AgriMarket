"use client";

import { useEffect, useState } from "react";
import { Bell, AlertTriangle, Clock, ThermometerSun, Droplets } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { WarehouseAlerts } from "@/components/dashboard/warehouse-alerts";
import { ProductShelfLife } from "@/components/dashboard/product-shelf-life";
import { WarehouseWeatherCard } from "@/components/dashboard/warehouse-weather-card";
import { useSensorData } from "@/hooks/use-sensor-data";

export default function AlertsPage() {
  const { stats, isLoading, error, refetch } = useSensorData(30000);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    setLastUpdated(new Date());
  }, [stats]);

  return (
    <div className="space-y-6 p-4 max-w-full overflow-hidden">
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            Failed to load alert data: {error}
            <Button variant="outline" size="sm" onClick={refetch} className="ml-2 mt-2 sm:mt-0">
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
          <Bell className="mr-3 h-7 w-7 text-red-500" />
          Warehouse Alerts & Monitoring
        </h1>
        <p className="text-gray-600">
          Real-time alerts for warehouse conditions, product shelf life, and weather impacts
        </p>
        <div className="flex items-center mt-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-1" />
          Last updated: {lastUpdated.toLocaleString()}
        </div>
      </div>

      {/* Current Conditions Overview */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">
              Current Temperature
            </CardTitle>
            <ThermometerSun className="h-5 w-5 text-red-500" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-20 mb-2" />
            ) : (
              <div className="text-2xl font-bold text-gray-900">{stats?.avgTemperature || 0}°C</div>
            )}
            <p className="text-sm text-muted-foreground">Warehouse average</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">
              Current Humidity
            </CardTitle>
            <Droplets className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-20 mb-2" />
            ) : (
              <div className="text-2xl font-bold text-gray-900">{stats?.avgHumidity || 0}%</div>
            )}
            <p className="text-sm text-muted-foreground">Warehouse average</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">
              Active Alerts
            </CardTitle>
            <Bell className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">5</div>
            <div className="text-sm text-muted-foreground">
              <Badge variant="destructive" className="mr-1">2 Critical</Badge>
              <Badge variant="outline">3 Medium</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Alerts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column - Warehouse Alerts */}
        <div className="space-y-6">
          <WarehouseAlerts 
            warehouseId="W01"
            temperature={stats?.avgTemperature || 22}
            humidity={stats?.avgHumidity || 60}
            refreshing={isLoading}
            className="h-fit"
          />
          
          <WarehouseWeatherCard 
            warehouseId="W01"
            className="h-fit"
          />
        </div>

        {/* Right Column - Product Shelf Life */}
        <div className="space-y-6">
          <ProductShelfLife 
            warehouseId="W01"
            temperature={stats?.avgTemperature || 22}
            humidity={stats?.avgHumidity || 60}
            className="h-fit"
          />
          
          {/* Additional Alert Statistics */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Alert Statistics</CardTitle>
              <CardDescription className="text-sm text-gray-600">
                Summary of alerts over the past 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                    <span className="font-medium text-red-800">Critical Alerts</span>
                  </div>
                  <Badge variant="destructive">2</Badge>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-amber-500 rounded-full mr-3"></div>
                    <span className="font-medium text-amber-800">High Priority</span>
                  </div>
                  <Badge variant="outline">3</Badge>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                    <span className="font-medium text-yellow-800">Medium Priority</span>
                  </div>
                  <Badge variant="secondary">7</Badge>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span className="font-medium text-green-800">Resolved Today</span>
                  </div>
                  <Badge>12</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
