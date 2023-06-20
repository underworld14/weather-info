import { useRef } from "react";
import { capitalize } from "../utils/helpers";

interface MetricRadioProps {
  checked: boolean;
  value: string;
  onChange: (e: any) => void;
}

export default function MetricRadio({ checked, value, onChange }: MetricRadioProps) {
  const radioRef = useRef<HTMLInputElement>(null);

  return (
    <button
      className="flex-1 flex bg-[#0A457B] justify-center items-center py-3 rounded-xl shadow-lg hover:bg-[#0A457B]/50 active:scale-90 ease-in duration-200"
      onClick={() => radioRef.current?.click()}
    >
      <input
        ref={radioRef}
        type="radio"
        name="unit"
        value={value}
        className="mr-3"
        checked={checked}
        onChange={onChange}
      />
      <div className="text-white">{capitalize(value)}</div>
    </button>
  );
}
