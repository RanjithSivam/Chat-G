import Icon from "components/Icon";
import { FC } from "react";
import Error from "./Error";

interface InputProps {
  icon?: JSX.Element;
  value?: string | number;
  onChange?: Function;
  error?: string;
  type?: string;
  placeholder: string;
  name?: string;
  className?: { div: string; input: string };
  textarea?: boolean;
}

const Input: FC<InputProps> = ({
  icon,
  value,
  onChange,
  type,
  placeholder,
  error = null,
  className,
  textarea,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {error && <Error value={error} />}
      <div className={`${className?.div} ${error ? "!border-red" : ""}`}>
        {icon && <Icon className={error ? "!text-red" : ""} icon={icon} />}
        {textarea ? (
          <textarea
            rows={5}
            className={`${className?.input} ${
              error ? "placeholder:!text-red" : ""
            }`}
            placeholder={placeholder}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              if (onChange) {
                onChange(e);
              }
            }}
          ></textarea>
        ) : (
          <input
            type={type}
            className={`${className?.input} ${
              error ? "placeholder:!text-red" : ""
            }`}
            placeholder={placeholder}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (onChange) {
                onChange(e);
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Input;
