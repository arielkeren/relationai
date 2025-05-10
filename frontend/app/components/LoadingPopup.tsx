import { RiLoaderFill } from "react-icons/ri";

// LoadingPopup component
const LoadingPopup: React.FC = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center gap-1 bg-gray-900 bg-opacity-75 z-50">
    <p className="text-white font-medium text-2xl uppercase bg-gray-950 p-2 rounded bg-opacity-25 drop-shadow-xl">
      Loading models
    </p>
    <RiLoaderFill className="text-white text-6xl animate-spin" />
  </div>
);

export default LoadingPopup;
