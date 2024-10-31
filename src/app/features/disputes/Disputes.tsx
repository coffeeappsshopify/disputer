import {useEffect, useState} from "react";

export default function Disputes() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {

    const ws = new WebSocket('ws://192.168.1.110:8080');

    ws.onmessage = (event) => {
      const newMessage = event.data;
      const data = newMessage ? JSON.parse(newMessage) : {};
      if(data.status === "insert") {
        if(Array.isArray(data.result)) {
          setMessages((prev) => [...prev, ...data.result]);
        } else {
          setMessages((prev) => [...prev, data.result]);
        }
      } else {
        setMessages((prev) => prev.filter(i => i.id !== data.result.id));
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleAddNewDispute = () => {
    fetch('/api/disputes/add',  {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: 'text'
      })
    })
  }

  return (
    <div>
      <h2 className="text-h2 mb-2">Disputes</h2>
      {JSON.stringify(messages, null, 2)}
      <ul className="grid gap-2">
        <li className="py-5 px-4 bg-gray-50 dark:bg-gray-900 rounded-[14px]">
          You don't have active disputes.
        </li>
        <li className="py-5 px-4 bg-gray-50 dark:bg-gray-900 rounded-[14px]">
          <div>@test</div>
          <div>Dispute about</div>
        </li>
      </ul>
      <button
        onClick={() => handleAddNewDispute()}
        className="mt-4 w-full py-2 px-4 rounded-md bg-blue-500 text-gray-50 dark:bg-blue-800 dark:text-gray-300">Start
        new dispute
      </button>
    </div>
  );
}