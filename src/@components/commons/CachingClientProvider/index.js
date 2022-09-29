import React, { createContext } from "react";
import { useState } from "react";

export const CachingClientContext = createContext();

const CachingClientProvider = ({ children }) => {
  const [scheduler, setScheduler] = useState([]);

  const pushSchedule = (schedule) => {
    setScheduler((prev) => [...prev, schedule]);
  };

  const value = {
    scheduler,
    pushSchedule,
  };

  return (
    <CachingClientContext.Provider value={value}>
      {children}
    </CachingClientContext.Provider>
  );
};

export default CachingClientProvider;
