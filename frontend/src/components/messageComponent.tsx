import { SkeletonCard } from './skeletonComponent';

interface MessageComponentProps {
  message: string;
  isUser: boolean;
  imageUrl: string;
  isLoading: boolean;
  prompt: string;
}

export function MessageComponent({
  message,
  isUser,
  imageUrl,
  isLoading,
  prompt,
}: MessageComponentProps) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div className={`max-w-[70%] ${isUser ? 'order-2' : 'order-1'}`}>
        <div className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
              isUser ? 'bg-blue-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'
            }`}
          >
            {isUser ? 'U' : 'AI'}
          </div>

          <div
            className={`rounded-2xl px-4 py-2 max-w-full ${
              isUser ? 'bg-blue-500 text-white' : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
            }`}
          >
            <p className="text-sm">{message}</p>

            {isLoading && (
              <div className="mt-3">
                <SkeletonCard />
              </div>
            )}

            {!isLoading && imageUrl && (
              <div className="mt-3">
                <img
                  src={imageUrl}
                  alt="Generated"
                  className="max-w-full h-full rounded-lg shadow-lg"
                  style={{ maxWidth: '400px' }}
                />
              </div>
            )}

            {!isUser && prompt && (
              <div className="mt-2 text-xs w-fit h-fit text-gray-300 italic">Prompt: {prompt}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
