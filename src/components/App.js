import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authService, (user) => {
      if (user) {
        setUserObj({
          uid: user.uid,
          displayName: user.displayName,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(false);
      }
      setInit(true);
    });

    return () => unsubscribe(); // cleanup 함수에서 unsubscribe
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      uid: user.uid,
      displayName: user.displayName,
      updateProfile: (args) => user.updateProfile(args),
    })
  };



  return (
    <>
      {init ? (<AppRouter
                  refreshUser={refreshUser}
                  isLoggedIn={Boolean(userObj)}
                  userObj={userObj}
      />
      ) : (
        "initializing..."
      )}

    </>
  );
};

export default App;