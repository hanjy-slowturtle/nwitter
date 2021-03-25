import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbase';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      if(user) {
        setUserObj(user);
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
      {init ? <AppRouter userObj={userObj} /> : "Initializing..."}
    </>
  );
}

export default App;