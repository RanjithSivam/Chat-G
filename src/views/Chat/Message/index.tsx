import moment from "moment";

interface MessageProp {
  photoURL: string;
  name: string;
  time: Date;
  message: string;
}

const Message: React.FC<MessageProp> = ({ photoURL, name, time, message }) => {
  return (
    <div className="flex gap-4">
      <img
        src={photoURL}
        alt="avatar"
        className="w-[42px] h-[42px] rounded-lg"
      />
      <div className="flex flex-col gap-1">
        <div className="flex gap-4 items-center text-light-grey">
          <h6 className=" text-sm font-bold">{name}</h6>
          <p className="text-xs lowercase">{moment(time).calendar()}</p>
        </div>
        <p className="text-sm text-peach-white">{message}</p>
      </div>
    </div>
  );
};

export default Message;
