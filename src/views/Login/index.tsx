import Button from "components/Button";
import Icon from "components/Icon";
import Input from "components/Input";
import { useAuth } from "context/AuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<{
    email?: string;
    password?: string;
  }>({});

  const { googleOAuth, emailAuth, state: authState }: any = useAuth();

  const validate = () => {
    const error: {
      email?: string;
      password?: string;
    } = {};

    if (!email) {
      error.email = "Email is required!";
    } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      error.email = "Invalid email address";
    }

    if (!password) {
      error.password = "Password is required!";
    }

    setFormError(error);

    if (Object.keys(error).length === 0) {
      emailAuth(email, password);
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center p-4">
      <div className="border border-dim-grey rounded-xl md:w-1/3 w-full p-8 flex flex-col gap-4">
        <p className="flex gap-1 items-center">
          <Icon
            icon={
              <ion-icon
                name="chatbubble-ellipses-outline"
                size="large"
              ></ion-icon>
            }
            className="text-red"
          />
          <p className=" text-sm text-heavy-black">Chat-G</p>
        </p>
        <h4 className="text-base text-dark-black font-bold">Login</h4>
        <div className="flex flex-col gap-3">
          <Input
            type="email"
            placeholder="email"
            icon={<ion-icon name="mail-outline"></ion-icon>}
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            error={formError.email}
            className={{
              input:
                "text-light-grey text-xs w-full outline-0 placeholder:capitalize placeholder:text-light-grey",
              div: "border border-dim-grey py-2 px-2 rounded-lg flex gap-4 items-center",
            }}
          />

          <Input
            icon={<ion-icon name="lock-closed-outline"></ion-icon>}
            type="password"
            placeholder="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            error={formError.password}
            className={{
              input:
                "text-light-grey text-xs w-full outline-0 placeholder:capitalize placeholder:text-light-grey",
              div: "border border-dim-grey py-2 px-2 rounded-lg flex gap-4 items-center",
            }}
          />

          <Button
            value="Login"
            className="bg-blue rounded-lg p-2 text-white text-xs flex items-center justify-center gap-1 cursor-pointer"
            onClick={validate}
            loading={authState.loading}
          />
        </div>
        <p className="text-xs text-light-grey text-center">
          or continue with these social profile
        </p>
        <div className="flex gap-4 justify-center">
          <Icon
            icon={<ion-icon name="logo-google"></ion-icon>}
            onClick={googleOAuth}
            className="text-light-grey w-[30px] h-[30px] rounded-full border border-light-grey"
            loading={authState.loading}
          />

          <Icon
            icon={<ion-icon name="logo-facebook"></ion-icon>}
            className="text-light-grey w-[30px] h-[30px] rounded-full border border-light-grey"
            loading={authState.loading}
          />

          <Icon
            icon={<ion-icon name="logo-twitter"></ion-icon>}
            className="text-light-grey w-[30px] h-[30px] rounded-full border border-light-grey"
            loading={authState.loading}
          />

          <Icon
            icon={<ion-icon name="logo-github"></ion-icon>}
            className="text-light-grey w-[30px] h-[30px] rounded-full border border-light-grey"
            loading={authState.loading}
          />
        </div>
        <p className="text-light-grey text-xs text-center">
          Don’t have an account yet?
          <Link to="/signup" className="text-blue underline decoration-blue">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
