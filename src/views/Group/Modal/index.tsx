import { postGroup } from "api/group";
import Input from "components/Input";
import { useAuth } from "context/AuthContext";
import React, { useState } from "react";

function Modal({ closeModal }: { closeModal: React.MouseEventHandler }) {
  const [channelName, setChannelName] = useState("");
  const [channelDesc, setChannelDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{
    channelName?: string;
    channelDesc?: string;
  }>({});

  const { state }: any = useAuth();

  const validate = (e: any) => {
    if (!channelName) {
      error.channelName = "Channel name is required!";
    }

    if (!channelDesc) {
      error.channelDesc = "Channel description is required!";
    }

    onClickHandler(e);
  };

  const onClickHandler = (e: any) => {
    const createGroup = async () => {
      setLoading(true);
      await postGroup({
        name: channelName,
        description: channelDesc,
        owner: state.user.user.uid,
        creationDate: new Date(),
      });
    };

    createGroup();
    closeModal(e);
    setLoading(false);
  };
  return (
    <div className="fixed w-full h-full inset-0 flex items-center justify-center bg-overlay z-50">
      <div className="flex flex-col bg-heavy-black p-4 lg:w-1/3 w-2/3 rounded-lg gap-4">
        <h4 className="text-peach-white uppercase text-sm font-bold">
          new channel
        </h4>
        <Input
          type="text"
          placeholder="channel name"
          className={{
            input:
              "rounded py-2 px-4 bg-grey outline-none text-light-grey text-sm placeholder:text-sm placeholder:capitalize w-full",
            div: "w-full",
          }}
          value={channelName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setChannelName(e.target.value)
          }
        />
        <Input
          className={{
            div: "w-full",
            input:
              "resize-none rounded outline-none text-sm py-2 px-4 bg-grey text-light-grey placeholder:text-sm placeholder:capitalize w-full",
          }}
          placeholder="channel description"
          value={channelDesc}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setChannelDesc(e.target.value)
          }
          textarea={true}
        ></Input>
        <div className="flex justify-end gap-4">
          <button
            className="bg-red rounded px-4 py-1 text-sm text-white capitalize"
            onClick={closeModal}
          >
            cancel
          </button>
          <button
            className="bg-blue rounded px-4 py-1 text-sm text-white capitalize flex gap-1 items-center"
            onClick={validate}
          >
            {loading && (
              <span className="flex items-center animate-spin">
                <ion-icon name="reload-outline"></ion-icon>
              </span>
            )}
            save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
