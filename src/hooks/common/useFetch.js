import { useContext } from "react";
import { useEffect, useState } from "react";
import { CachingClientContext } from "../../@components/commons/CachingClientProvider";

const CacheMemory = {};

export const useFetch = (key, fetcher) => {
  const { scheduler, pushSchedule } = useContext(CachingClientContext);

  const [response, setResponse] = useState();

  useEffect(() => {
    const fetch = async (fetcher) => {
      if (CacheMemory[key]) {
        setResponse(CacheMemory[key]);
        return;
      }

      if (!CacheMemory[key]) {
        const response = await fetcher();

        CacheMemory[key] = response;

        setResponse(response);
      }
    };

    pushSchedule(() => fetch(fetcher));
  }, []);

  useEffect(() => {
    const race = scheduler.map((schedule) => {
      return schedule();
    });

    console.log(race);

    // race.reduce((prev, current) => {
    //   return prev.then(() => current());
    // }, Promise.resolve());
  }, [scheduler]);

  return response;
};
