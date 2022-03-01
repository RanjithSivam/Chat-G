import { logOut } from "api/auth";
import { useAuth } from "context/AuthContext";

function Dropdown() {
  const { dispatch }: any = useAuth();

  const logOutClickHandler = async () => {
    try {
      const result = await logOut();
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      dispatch({ type: "LOGOUT_ERROR", payload: error });
    }
  };
  return (
    <div className="bg-light-black rounded-lg absolute -top-28 -left-32 w-36">
      <div className="flex flex-col px-2 py-2 gap-2">
        <div className="flex gap-2 capitalize text-peach-white cursor-pointer hover:bg-grey py-1 px-2 rounded">
          <span className="flex items-center justify-center">
            <ion-icon name="person-circle-outline"></ion-icon>
          </span>
          <p className="text-sm flex">my profile</p>
        </div>
        <hr className="text-grey" />
        <div
          className="flex gap-2 capitalize text-red  cursor-pointer hover:bg-grey py-1 px-2 rounded"
          onClick={logOutClickHandler}
        >
          <span className="flex items-center justify-center">
            <ion-icon name="log-out-outline"></ion-icon>
          </span>
          <p className="text-sm">logout</p>
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
