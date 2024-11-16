'use client';

import {useCallback, useEffect, useState} from "react";
import {User} from "@/models/user";
import {APP_LINK} from "@/constants";
import {useInitData} from "@telegram-apps/sdk-react";
import {useRouter} from "next/navigation";
import UserCard from "@/components/UserCard";

export default function NewDisputePage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const initData = useInitData();
  const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState(false);

  const handleAddNewDispute = async () => {
    if(initData && initData.user && user) {
      const response = await fetch('/api/disputes/add',  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          initiator_id: initData.user.id,
          user_id: user.id,
        })
      });
      const data: { id: string } | { string: string } = await response.json();
      if('id' in data) {
        router.replace('/dispute/' + data.id);
      }
    }
  }

  const handleFetchUser = useCallback(async (query: string) => {
    if(!query) {
      setUser(null);
      return;
    }
    setLoading(true);
    const abortController = new AbortController();
    const response = await fetch('/api/users/find' , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query[0] === '@' ? query.slice(1) : query,
      }),
      signal: abortController.signal
    });

    const data = await response.json();

    setUser(data);
    setLoading(false);

    return () => {
      abortController.abort()
    }
  }, [query]);

  useEffect(() => {
    handleFetchUser(query)
  }, [query]);

  return (
    <div className="grid gap-4 text-black dark:text-white py-6">
      <h2 className="text-h2 text-black dark:text-white">Select user</h2>
      <p>
        If the user is not found, copy the link to invite them to the app:
        <span className="text-[80%] bg-slate-500 text-slate-900 dark:text-slate-300 ml-2 py-1 px-2 rounded-md">{APP_LINK}</span>
      </p>
      <input
        type="text"
        value={query}
        onInput={(event) => { setQuery(event.currentTarget.value) }}
        className="h-[48px] rounded-md border-2 border-slate-900 dark:border-slate-500 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white px-[12px] py-0"
        placeholder="Enter @username type firstname and lastname"
      />

      { !loading && user && <div>
        <UserCard user={user}/>
      </div> }

      { !loading && !user && query && <p>
        User not found, first invite user to the app.
      </p>}

      {user && !loading &&
      <button
        onClick={() => { handleAddNewDispute() }}
        className="mt-4 w-full py-2 px-4 rounded-md bg-blue-500 text-gray-50 dark:bg-blue-800 dark:text-gray-300">
        Start
      </button>}
    </div>
  );
}