import Icon from "components/Icon";
import { FC } from "react";

interface ErrorProps {
  value: string;
}

const Error: FC<ErrorProps> = ({ value }) => {
  return (
    <div className="flex gap-1">
      <Icon
        icon={<ion-icon name="close-outline"></ion-icon>}
        className="text-red"
      />
      <div className="text-xs uppercase text-red font-medium">{value}</div>
    </div>
  );
};

export default Error;
