export function InputComponent() {
  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
      <label className="input bg-amber-200 w-full px-4 py-2 rounded-md shadow flex items-center gap-2">
        <svg
          className="h-5 w-5 opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          type="search"
          required
          placeholder="Explore your creativity"
          className="bg-transparent outline-none w-full"
        />
      </label>
    </div>
  );
}
