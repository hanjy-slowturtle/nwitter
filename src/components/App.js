import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbase';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  const makeSmallUser = (user) => {
    return {
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args)
    };
  };
  const refreshUser = () => {
    setUserObj(makeSmallUser(authService.currentUser));
  };

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      if(user) {
        setUserObj(makeSmallUser(user));
      } else {
        setUserObj(null);
      }
      setInit(true);
    });

    return () => {
      unsubscribe();
    }
  }, []);

  return (
    <>
      {init ? (
        <AppRouter
          userObj={userObj}
          refreshUser={refreshUser}
        /> 
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default App;