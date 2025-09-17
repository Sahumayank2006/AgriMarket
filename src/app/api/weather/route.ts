// Mock API response for weather
import { NextResponse } from 'next/server';
import { SAMPLE_WEATHER_DATA } from '@/lib/warehouse-predictions';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const warehouseId = searchParams.get('warehouseId') || 'W01';

  try {
    // In a real app, this would fetch from a weather API
    // For this example, we're using mock data
    const weatherData = SAMPLE_WEATHER_DATA[warehouseId] || SAMPLE_WEATHER_DATA.W01;

    // Simulate slight random variations to make data look more dynamic
    const randomizedWeather = {
      ...weatherData,
      temperature: weatherData.temperature + (Math.random() * 2 - 1), // +/- 1 degree
      humidity: Math.min(100, Math.max(0, weatherData.humidity + (Math.random() * 6 - 3))), // +/- 3%
    };

    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 200));

    return NextResponse.json(randomizedWeather);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}
