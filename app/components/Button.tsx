type Props = {
  children: React.ReactNode;
  onClick: () => void;
  isWide: boolean;
  isGradient: boolean;
  isMono: boolean;
};

const Button: React.FC<Props> = ({
  children,
  onClick,
  isWide,
  isGradient,
  isMono,
}) => (
  <button
    onClick={onClick}
    className={`flex justify-center items-center gap-1 bg-gray-800 text-white h-[60.8px] rounded drop-shadow-md transition-colors ${
      isWide ? "w-[320px]" : "w-[60.8px]"
    } ${
      isGradient
        ? "hover:bg-gradient-to-br hover:from-pink-500 hover:to-blue-500 duration-300"
        : "hover:bg-gray-700"
    } ${isMono ? "font-mono text-4xl" : "text-3xl"}`}
  >
    {children}
  </button>
);

export default Button;
