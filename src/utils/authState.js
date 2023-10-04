import { useState, useEffect } from "react";
import { supabase } from "./supabase";
export const useAuthState = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const { subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          setIsUserLoggedIn(true);

        } else if (event === "SIGNED_OUT") {
          setIsUserLoggedIn(false);
         
        }
      }
    );
    //Unsubscribe on cleanup
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return { isUserLoggedIn };
};
