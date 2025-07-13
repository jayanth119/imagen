import  { useState, useRef } from 'react';

interface inputComponentProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}
export function InputComponent({ onSubmit, isLoading }: inputComponentProps) {
  const [prompt, setPrompt] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = () => {
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt.trim());
      setPrompt('');
    }
  };

  const handleKeyPress = (e: { key: string; shiftKey: any; preventDefault: () => void; }) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md border-t border-gray-200 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <div className="flex items-center bg-amber-200 w-full px-4 py-3 rounded-2xl shadow-sm border border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-20">
              <svg
                className="h-5 w-5 text-gray-400 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <path d="l21 15-5-5L5 21"></path>
                </g>
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Describe the image you want to generate..."
                className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
                disabled={isLoading}
              />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={!prompt.trim() || isLoading}
            className="px-6 py-3 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
          >
            {isLoading ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </div>
    </div>
  );
}

