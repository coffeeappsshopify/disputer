import {useEffect, useState} from "react";
import {Dispute} from "@/models/dispute";
import Link from "next/link";
import {useInitData} from "@telegram-apps/sdk-react";
import {jsonStringify} from "@/lib/utils";

export default function Disputes() {
  const initData = useInitData();
  const [messages, setMessages] = useState<Dispute[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if( initData && initData.user ) {

      const ws = new WebSocket('ws://192.168.1.190:8080');

      ws.onopen = () => {
        ws.send(jsonStringify({
          type: 'register',
          clientId: initData.user?.id
        }));
      };

      ws.onmessage = (event) => {
        const newMessage = event.data;
        const data: {
          status: "insert-many",
          result: Dispute[]
        } | {
          status: "insert",
          result: Dispute
        } | {
          status: "delete",
          result: Dispute
        } = newMessage ? JSON.parse(newMessage) : {};
        if(data.status === "insert-many") {
          setMessages((prev) => [...data.result]);
        }
        if(data.status === "insert") {
          setMessages((prev) => {
            return [...prev, data.result];
          });
        }
        if(data.status === "delete") {
          setMessages((prev) => prev.filter(i => i.id !== data.result.id));
        }
        setLoading(false);
      };

      return () => {
        ws.close();
      };
    }
  }, [initData]);

  return (
    <div className="py-6">
      <h2 className="text-h2 mb-6 text-black dark:text-white">Disputes</h2>
      <ul className="grid gap-2 mb-6">
        {!loading && messages.length === 0 && (
          <li className="py-5 px-4 bg-gray-50 dark:bg-gray-900 rounded-[14px] text-black dark:text-white">
            You don't have active disputes.
          </li>
        )}
        {!loading && messages.length > 0 && messages.map((i) => (
          <Link
            className="py-5 px-4 bg-gray-50 dark:bg-gray-900 rounded-[14px] text-black dark:text-white"
            key={i.id}
            href={`/dispute/${i.id}`}
          >
            <div>{i.user_1.toString()} vs {i.user_2.toString()}</div>
            <div>{i.summary}</div>
          </Link>
        ))}
      </ul>

      <Link
        href="/dispute/new"
        className="block w-full py-2 px-4 rounded-md bg-blue-500 text-gray-50 dark:bg-blue-800 dark:text-gray-300"
      >
        Start new dispute
      </Link>
    </div>
  );
}