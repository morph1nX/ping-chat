import React from 'react';
import { ChatMessageProps } from '@/app/types';

function ChatMessage(props: ChatMessageProps) {

  const {message, date} = props;

  return (

    <div className="p-5">
      <div className='flex items-start'>
        <div className='flex-col and space-y-1 border border-gray-300 p-2 rounded-md'>
          <div className='text-gray-600 text-sm'>Username</div>
          <div className='flex items-center space-x-2'>
            <div className='px-4 py-2 rounded-lg inline-block bg-blue-500 text-white max-w-xs'>
              {message}
            </div>
            <div className='text-gray-500 text-xs'>
              {date.toString()}
            </div>
          </div>
        </div>
      </div>

    </div>

  );

}


export default ChatMessage;