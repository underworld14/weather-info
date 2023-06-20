import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { List } from "./types/list";

export interface WeatherState {
  loading: boolean;
  celciusLists: List[];
  fahrenheitLists: List[];
  loadWeather: () => Promise<void>;
}

const useWeatherState = create<WeatherState>()(
  devtools((set) => ({
    loading: false,
    celciusLists: [],
    fahrenheitLists: [],
    loadWeather: async () => {
      set({ loading: true });
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const [metricResponse, imperialResponse] = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Kathmandu&appid=${apiKey}&units=metric`),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Kathmandu&appid=${apiKey}&units=imperial`),
        // throttle the loading to 3 seconds
        new Promise((resolve) => setTimeout(resolve, 3000)),
      ]);

      const metricData = await metricResponse.json();
      const imperialData = await imperialResponse.json();

      set({
        loading: false,
        celciusLists: metricData.list,
        fahrenheitLists: imperialData.list,
      });
    },
  }))
);

export default useWeatherState;
