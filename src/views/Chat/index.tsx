import { subscribeChat } from "api/chat";
import Text from "views/Chat/Text";
import Message from "views/Chat/Message";
import { useChat } from "context/ChatContext";

import moment from "moment";
import { useEffect, useState } from "react";

function Chat({
  openMenu,
  closeMenu,
}: {
  openMenu: React.MouseEventHandler;
  closeMenu: React.MouseEventHandler;
}) {
  const [groupChats, setGroupChats] = useState<any>([]);
  // {
  //   date: Date;
  //   chat: { avatar: string; time: Date; name: string; message: string }[];
  // }[]
  const { state: chatState }: any = useChat();

  useEffect(() => {
    if (chatState.chat) {
      subscribeChat(chatState.chat.chatId, (e: any) => {
        if (e) {
          setGroupChats(modifyData(e));
        } else {
          setGroupChats([]);
        }
      });
    }
  }, [chatState]);

  const modifyData = (e: any) => {
    return Object.keys(e).map((date) => {
      return {
        date: date,
        chat: e[date],
      };
    });
  };
  return (
    <div className="lg:w-4/5 w-full bg-light-black flex flex-col h-screen gap-4">
      {/* HEADER */}
      <div
        className="md:px-16 md:py-2 px-4 py-1 flex items-center h-10 gap-2"
        style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
      >
        <span
          className="lg:hidden block flex items-center justify-center p-1 text-peach-white cursor-pointer"
          onClick={openMenu}
        >
          <ion-icon name="menu-outline" size="large"></ion-icon>
        </span>
        <h6 className="text-peach-white uppercase font-bold text-sm">
          {chatState.chat?.name}
        </h6>
      </div>

      {/* CHAT */}
      <div
        className="flex flex-col gap-8 md:px-16 md:py-2 px-4 py-1 no-scrollbar overflow-y-scroll h-full"
        onClick={closeMenu}
      >
        {/* MESSAGE */}
        {groupChats.map((ele: any) => (
          <div className="flex flex-col gap-8">
            <div className="text-center">
              <p className="relative inline-block text-light-grey text-xs capitalize top-2.5 bg-light-black px-8">
                {moment(ele.date).format("MMMM D[,] YYYY")}
              </p>
              <div className="h-[1px] bg-light-grey"></div>
            </div>
            {ele.chat.map((chat: any) => (
              <Message {...chat} />
            ))}
          </div>
        ))}
      </div>

      {/* TEXT */}
      <div className="w-full md:px-16 px-4 md:pb-8 md:pt-2 pb-4 pt-1">
        <Text />
      </div>
    </div>
  );
}

export default Chat;
