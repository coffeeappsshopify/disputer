import { User } from "@/models/user";
import { User as TgUser } from '@telegram-apps/sdk-react';

export default function UserCard({ user }: { user: User | TgUser }) {
  return (
    <div
      className={'grid grid-cols-[60px_minmax(10px,1fr)] text-wrap py-5 px-4 bg-gray-50 dark:bg-gray-900 rounded-[14px] gap-x-4 items-center mb-4'}>
      <div
        className="w-[60px] h-[60px] rounded-full bg-blue-500 flex justify-center items-center text-h1 text-white dark:text-gray-900"
      >
        {user.firstName && user.firstName[0]}{user.lastName && user.lastName[0]}
      </div>
      <div>
        <h1 className="text-h2 truncate mb-1 text-gray-900 dark:text-gray-200">
          {user.firstName} {user.lastName}
        </h1>
        <div className="text-gray-600 dark:text-gray-400">
          {user.username ? '@' + user.username : 'id: ' + user.id}
        </div>
      </div>
    </div>
  );
}