import { AiOutlineLoading3Quarters } from "react-icons/ai";

// CalculatingPopup component
const CalculatingPopup: React.FC = () => (
  <div className="fade-in fixed top-1 left-1/2 -translate-x-1/2 flex items-center justify-center gap-1 p-2 bg-gray-300 z-10 rounded bg-opacity-50 drop-shadow-md">
    <AiOutlineLoading3Quarters className="text-blue-700 text-3xl animate-spin" />
    <p className="text-black font-bold text-2xl uppercase p-2 rounded select-none">
      Calculating
    </p>
  </div>
);

export default CalculatingPopup;
