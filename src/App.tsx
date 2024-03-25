import { useSetAtom } from "jotai";
import { routes } from "./Router";
import { useRoutes } from "react-router-dom";
import { authAtom } from "./utils/useAuth";

function App() {
  const setAuth = useSetAtom(authAtom);
  setInterval(() => {
    const authStorage = localStorage.getItem("auth");
    if (!authStorage) {
      return null;
    }

    const expireParsed = JSON.parse(authStorage);
    const expire = expireParsed.expire;

    const currentTime = new Date().getTime() / 1000;
 
    if (currentTime > expire) {
      setAuth(undefined);
    }
  }, 60000);

  const content = useRoutes(routes);
  return content;
}

export default App;
