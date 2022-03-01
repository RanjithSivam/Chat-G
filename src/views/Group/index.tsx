import Dropdown from "views/Group/Dropdown";
import GroupInfo from "views/Group/GroupInfo";
import GroupList from "views/Group/GroupList";
import Search from "views/Group/Search";
import React, { useEffect, useState } from "react";
import { useAuth } from "context/AuthContext";

function Group({
  openModal,
  menu,
}: {
  openModal: React.MouseEventHandler;
  menu: boolean;
}) {
  const [inChat, setInChat] = useState(false);
  const [setting, setsetting] = useState(false);

  const { state: authState }: any = useAuth();
  // useEffect(() => {
  //   console.log(authState);
  // }, []);
  return (
    <div
      className={`lg:flex ${
        menu ? "block" : "hidden"
      } lg:w-1/5 lg:static md:w-2/5 w-4/5 absolute w-full flex flex-col gap-4 bg-dark-black z-10 h-full`}
    >
      {!inChat ? (
        <>
          {/* HEADER */}
          <div
            className="bg-heavy-black px-4 py-2 flex items-center justify-between h-10"
            style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
          >
            <h6 className="text-peach-white capitalize font-bold text-sm">
              channels
            </h6>
            <span
              className="p-1 bg-light-black flex items-center rounded cursor-pointer"
              onClick={openModal}
            >
              <ion-icon
                name="add-outline"
                size="small"
                style={{ color: "#FFFFFF" }}
              ></ion-icon>
            </span>
          </div>

          {/* GROUP */}

          <div className="h-full px-4 py-4 flex flex-col gap-8">
            <Search />
            <GroupList inChangeHandler={() => setInChat(true)} />
          </div>
        </>
      ) : (
        <>
          {/* HEADER */}
          <div
            className="bg-heavy-black px-4 py-2 flex items-center h-10 gap-4"
            style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
          >
            <span
              className="p-1 flex items-center rounded cursor-pointer"
              onClick={() => setInChat(false)}
            >
              <ion-icon
                name="chevron-back-outline"
                size="small"
                style={{ color: "#FFFFFF" }}
              ></ion-icon>
            </span>
            <h6 className="text-peach-white capitalize font-bold text-sm">
              all channels
            </h6>
          </div>
          <div className="h-full px-4 py-4 flex flex-col gap-8 no-scrollbar overflow-y-scroll">
            <GroupInfo />
          </div>
        </>
      )}

      {/* PROFILE */}
      <div
        className="bg-heavy-black flex px-4 py-2 flex items-center justify-between shadow-xl"
        style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
      >
        <div className="flex items-center gap-2">
          <img
            src={`${
              authState.user.user.photoURL
                ? authState.user.user.photoURL
                : "https://picsum.photos/200"
            }`}
            alt="avatar"
            className="w-[30px] h-[30px] rounded"
          />
          <p className="text-light-grey text-xs capitalize font-bold">
            {authState.user.user.displayName}
          </p>
        </div>
        <div className="relative">
          <span
            className="cursor-pointer flex items-center"
            onClick={() => setsetting(!setting)}
          >
            <ion-icon
              name={setting ? "chevron-up-outline" : "chevron-down-outline"}
              style={{ color: "#BDBDBD" }}
            ></ion-icon>
          </span>
          {setting && <Dropdown />}
        </div>
      </div>
    </div>
  );
}

export default Group;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ion-icon": any;
    }
  }
}
