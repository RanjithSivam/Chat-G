import { createContext, useContext, useReducer } from "react";

const initialState = {
  chat: null,
};

const ChatContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_CHAT":
      return { ...state, chat: action.payload.chat };
    default:
      return state;
  }
};

const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
