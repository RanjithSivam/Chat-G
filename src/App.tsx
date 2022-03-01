import Chat from "views/Chat";
import Group from "views/Group";
import Modal from "views/Group/Modal";
import { useState } from "react";
import Signup from "views/Signup";
import Login from "views/Login";
import { useAuth, AuthProvider } from "context/AuthContext";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import ChatProvider from "context/ChatContext";

const ProtectedRoute = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  let { state, user, dispatch }: any = useAuth();
  let location = useLocation();

  if (!state.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

const RedirectRoute = ({ children }: { children: JSX.Element }) => {
  let { state, user, dispatch }: any = useAuth();

  if (state.user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const [modal, setModal] = useState(false);
  const [menu, setMenu] = useState(false);
  return (
    <div className="font-Noto flex relative h-screen">
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <RedirectRoute>
                <Login />
              </RedirectRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirectRoute>
                <Signup />
              </RedirectRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ChatProvider>
                  <Group openModal={() => setModal(true)} menu={menu} />
                  <Chat
                    openMenu={() => setMenu(true)}
                    closeMenu={() => setMenu(false)}
                  />
                  {modal && <Modal closeModal={() => setModal(false)} />}
                </ChatProvider>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
