import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useMemo, useState } from "react";
import Slider from "react-slick";

import useWeatherState from "../weather-state";
import MetricRadio from "../components/metric-radio";
import WeatherInfoCard from "../components/weather-info-card";
import { averageTemperatureOfTheDay } from "../utils/helpers";
import ChartItem from "../components/chart-item";

export default function WeatherScreen() {
  const [unit, setUnit] = useState<"celcius" | "fahrenheit">("celcius");
  const { celciusLists, fahrenheitLists } = useWeatherState();
  const averageTempByDay = useMemo(
    () => averageTemperatureOfTheDay(unit === "celcius" ? celciusLists : fahrenheitLists),
    [celciusLists, fahrenheitLists, unit]
  );
  const [activeSlidedate, setActiveSlidedate] = useState(averageTempByDay[0]?.date);

  const handleRadioChange = (e: any) => {
    setUnit(e.target.value);
    setActiveSlidedate(
      averageTempByDay.find((avg) => avg.date === activeSlidedate)?.date || averageTempByDay[0].date
    );
  };

  return (
    <main className="bg-[#4695EA] min-h-screen">
      <div className="container mx-auto sm:max-w-screen-sm py-12">
        <section className="flex px-4 gap-4">
          <MetricRadio value="celcius" onChange={handleRadioChange} checked={unit === "celcius"} />
          <MetricRadio value="fahrenheit" onChange={handleRadioChange} checked={unit === "fahrenheit"} />
        </section>
        <Slider
          className="mt-20"
          slidesToShow={1}
          slidesToScroll={1}
          centerMode
          afterChange={(index) => setActiveSlidedate(averageTempByDay[index].date)}
        >
          {averageTempByDay.map((item, index) => (
            <WeatherInfoCard key={index} {...item} />
          ))}
        </Slider>
        <section className="mt-16 flex gap-2 px-4">
          {averageTempByDay
            .find((avg) => avg.date === activeSlidedate)
            ?.lists.map((list, index) => (
              <ChartItem key={index} dt={list.dt} unit={unit} temp={list.temp} />
            ))}
        </section>
      </div>
    </main>
  );
}
