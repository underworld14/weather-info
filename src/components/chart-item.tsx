import dayjs from "dayjs";
import { calculateWeatherChartHeight } from "../utils/helpers";

interface ChartItemProps {
  dt: number;
  temp: number;
  unit: "celcius" | "fahrenheit";
}

export default function ChartItem({ dt, temp, unit }: ChartItemProps) {
  const day = dayjs.unix(dt);
  const hours = day.format("HH");
  const height = calculateWeatherChartHeight(temp, unit);

  return (
    <div className="flex-1">
      <div className="bg-[#0A457B80]/50 h-32 rounded-lg flex items-end">
        <div
          className="bg-secondary w-full rounded-lg px-2 py-1 text-center"
          style={{
            height: `${height}%`,
          }}
        >
          <div className="text-primary-dark text-xs font-bold">{temp}°</div>
        </div>
      </div>
      <div className="text-[#0A457B80]/50 mt-2 font-bold text-center">{hours}</div>
    </div>
  );
}
