import Lottie from "lottie-react";
import weatherSplashAnimation from "../assets/weather-splash-animation.json";
import { ReactComponent as LogoIllustration } from "../assets/illustration.svg";
import { ReactComponent as LogoText } from "../assets/wize-text.svg";

export default function SplashScreen() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto sm:max-w-screen-sm text-center flex flex-col justify-center">
        <div className="flex flex-col h-screen">
          <div className="flex-1 relative">
            <Lottie loop animationData={weatherSplashAnimation} width="100%" className="absolute" />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-gray-400">Your weather will be server in no time</div>
            <div className="mt-8 flex flex-col justify-center items-center">
              <LogoIllustration className="inline" />
              <LogoText className="inline mt-3" />
              <div className="text-primary-dark mt-2">We’ve got you weathered.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
