import { addChat } from "api/chat";
import { useAuth } from "context/AuthContext";
import { useChat } from "context/ChatContext";
import React, { useState } from "react";

function Text() {
  const [value, setValue] = useState("");
  const [typing, setTyping] = useState(false);

  const { state }: any = useAuth();
  const { state: chatState }: any = useChat();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const sendMessage = async () => {
    await addChat(
      chatState.chat.chatId,
      state.user.user.uid,
      state.user.user.displayName,
      state.user.user.photoURL,
      value
    );
    setValue("");
  };

  return (
    <div className="bg-grey p-1 rounded flex gap-4 items-center w-full relative">
      {typing && (
        <div className="absolute text-xs -top-6 text-grey">
          <p>james is typing.......</p>
        </div>
      )}
      <input
        type="text"
        placeholder="type a message here"
        className="py-2 px-2 bg-grey text-light-grey text-xs w-full outline-0 placeholder:text-light-grey placeholder:capitalize"
        value={value}
        onChange={onChangeHandler}
      />
      <span
        className="flex justify-center items-center bg-blue rounded cursor-pointer p-2"
        onClick={sendMessage}
      >
        <ion-icon
          name="send"
          style={{ color: "#FFFFFF" }}
          size="small"
        ></ion-icon>
      </span>
    </div>
  );
}

export default Text;
