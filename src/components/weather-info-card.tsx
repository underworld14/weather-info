export interface WeatherInfoCardProps {
  averageTemp: number;
  date: string;
  weather: string;
}

export default function WeatherInfoCard({ averageTemp, date, weather }: WeatherInfoCardProps) {
  return (
    <div className="relative w-60 h-60 flex flex-col justify-center items-center bg-[#0A457B]/50 shadow-lg rounded-3xl">
      <img
        className="absolute right-0 weather-icon"
        src={`/weather-icons/Weather=${weather},IsCurrent=True.svg`}
        alt="weather-status"
        style={{
          width: 240,
          height: 170,
          top: -40,
          objectFit: "contain",
        }}
      />
      <div className="text-[#F6D476] font-bold text-6xl mt-10">{averageTemp}°</div>
      <div className="text-white text-2xl font-bold mt-7">{date}</div>
    </div>
  );
}
