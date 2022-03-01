import { getGroup, subscribeGroup } from "api/group";
import { useChat } from "context/ChatContext";
import { MouseEventHandler, useEffect, useState } from "react";

function GroupList({ inChangeHandler }: { inChangeHandler: Function }) {
  const [groupList, setGroupList] = useState<any>([]);
  const { dispatch }: any = useChat();

  useEffect(() => {
    const getGroupList = async () => {
      const result = await getGroup();
      setGroupList(result);
    };

    subscribeGroup((data: any) => setGroupList(data));

    getGroupList();
  }, []);

  const getLogo = (logo: string): string => {
    let splitted = logo.split(" ", 2);
    return splitted.length > 1
      ? splitted[0].charAt(0) + splitted[1].charAt(0)
      : splitted[0].charAt(0);
  };

  const changeChat = (chat: any) => {
    dispatch({ type: "CHANGE_CHAT", payload: { chat: chat } });
    inChangeHandler();
  };

  return (
    <div className="flex flex-col gap-4">
      {groupList.map((ele: any) => (
        <div
          className="flex gap-2 uppercase text-peach-white items-center cursor-pointer"
          id={ele.id}
          key={ele.id}
          onClick={() => changeChat(ele)}
        >
          <span className="rounded bg-light-black w-[30px] h-[30px] text-xs flex items-center justify-center">
            {getLogo(ele.name)}
          </span>
          <p className="text-sm ">{ele.name}</p>
        </div>
      ))}
    </div>
  );
}

export default GroupList;
