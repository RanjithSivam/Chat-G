import { FC, MouseEventHandler } from "react";

interface ButtonProps {
  className: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  value: string;
  loading?: boolean;
}

const Button: FC<ButtonProps> = ({
  className,
  onClick,
  value,
  loading = false,
}) => {
  return (
    <button
      className={`${className} ${loading ? "opacity-60 cursor-default" : ""}`}
      onClick={onClick}
      disabled={loading}
    >
      {loading && (
        <span className="flex items-center animate-spin">
          <ion-icon name="reload-outline"></ion-icon>
        </span>
      )}
      {value}
    </button>
  );
};

export default Button;
