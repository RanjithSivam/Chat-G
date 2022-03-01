import { FC, MouseEventHandler } from "react";

interface IconProps {
  icon: JSX.Element;
  className?: string;
  onClick?: MouseEventHandler<HTMLSpanElement>;
  loading?: boolean;
}

const Icon: FC<IconProps> = ({ icon, className, onClick, loading }) => {
  return (
    <button
      className={`flex items-center justify-center ${className} ${
        loading ? "opacity-60" : ""
      }`}
      onClick={onClick}
      disabled={loading}
    >
      {icon}
    </button>
  );
};

export default Icon;
