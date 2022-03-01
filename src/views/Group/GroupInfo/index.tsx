import { getUser } from "api/user";
import { useChat } from "context/ChatContext";
import { FC, useEffect, useState } from "react";

const Memeber: FC<{ userId: string }> = ({ userId }) => {
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const findUser = async () => {
      const result = await getUser(userId);
      setUser(result.data());
    };

    findUser();
  }, []);
  return (
    <div className="flex gap-4 items-center">
      <img src={user.photoURL} alt="" className="w-[30px] h-[30px] rounded" />
      <p className="text-sm text-light-grey">{user.displayName}</p>
    </div>
  );
};

function GroupInfo() {
  const { state: chatState }: any = useChat();
  // useEffect(() => {
  //   console.log(chatState);
  // }, []);
  return (
    <>
      <div className="flex flex-col gap-4 text-peach-white">
        <h4 className="text-sm uppercase font-bold">{chatState.chat.name}</h4>
        <p className="text-xs">{chatState.chat.description}</p>
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="text-sm uppercase font-bold text-peach-white">
          members
        </h4>
        <div className="flex flex-col gap-4">
          {chatState.chat.member.map((ele: string) => (
            <Memeber userId={ele} />
          ))}
        </div>
      </div>
    </>
  );
}

export default GroupInfo;
