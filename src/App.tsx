import { useEffect } from "react";
import { Transition } from "@headlessui/react";

import useWeatherState from "./weather-state";
import SplashScreen from "./screens/splash-screen";
import WeatherScreen from "./screens/weather-screen";

function App() {
  const { loading, loadWeather } = useWeatherState();

  useEffect(() => {
    loadWeather();
  }, []);

  return (
    <>
      <Transition
        show={loading}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <SplashScreen />
      </Transition>
      {!loading && <WeatherScreen />}
    </>
  );
}

export default App;
