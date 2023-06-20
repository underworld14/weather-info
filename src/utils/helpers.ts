import dayjs from "dayjs";
import { List } from "../types/list";

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const calculateWeatherChartHeight = (value: number, metric: "celcius" | "fahrenheit") => {
  if (metric === "celcius") {
    if (value < 0) {
      return 0;
    }
    if (value > 40) {
      return 100;
    }
    return (value / 40) * 100;
  } else {
    if (value < 32) {
      return 0;
    }
    if (value > 104) {
      return 100;
    }
    return ((value - 32) / (104 - 32)) * 100;
  }
};

export const averageTemperatureOfTheDay = (data: List[]) => {
  const groupByDay = data.reduce((acc, item) => {
    const date = dayjs.unix(item.dt).format("DD.MM.YYYY");
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {} as Record<string, List[]>);

  const averageTemperature = Object.keys(groupByDay).map((key) => {
    const day = groupByDay[key];
    const average = day.reduce((acc, item) => {
      return acc + item.main.temp;
    }, 0);

    return {
      date: key,
      lists: groupByDay[key]
        .map((item) => ({
          dt: item.dt,
          temp: Math.round(item.main.temp),
        }))
        .slice(0, 8),
      weather: day[0].weather[0].main,
      averageTemp: Math.round(average / day.length),
    };
  });

  return averageTemperature;
};
