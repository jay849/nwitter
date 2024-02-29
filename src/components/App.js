import {useState} from "react";
// import AppRouter from "./Router";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  // return <div>App</div> ;
  // return <AppRouter />;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(authService.currentUser);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy;{new Date().getFullYear()} Nwitter</footer>
    </>
  )
}

export default App;
