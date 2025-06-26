interface PaginationProps {
  offset: number;
  limit: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  dataLength: number; // length of current data
}

function PaginationComponent({
  offset,
  limit,
  setOffset,
  setLimit,
  dataLength,
}: PaginationProps) {
  const currentPage = Math.floor(offset / limit);

  const handlePrevious = () => {
    if (offset >= limit) {
      setOffset(offset - limit);
    }
  };

  const handleNext = () => {
    // If current page is full, assume there's a next page
    if (dataLength === limit) {
      setOffset(offset + limit);
    }
  };

  return (
    <div className="flex justify-center flex-wrap gap-2 mt-8">
      <button
        className="join-item btn"
        onClick={handlePrevious}
        disabled={offset === 0}
      >
        «
      </button>
      <button className="join-item btn cursor-default">
        Page {currentPage + 1}
      </button>
      <button
        className="join-item btn"
        onClick={handleNext}
        disabled={dataLength < limit}
      >
        »
      </button>

      <div className="flex items-center gap-2 ml-4">
        <label htmlFor="limit-select" className="text-gray-300 text-sm">
          Items per page:
        </label>
        <select
          id="limit-select"
          value={limit}
          onChange={(e) => {
            const newLimit = parseInt(e.target.value);
            setLimit(newLimit);
            setOffset(0); // Reset to first page when limit changes
          }}
          className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 focus:border-cyan-400 focus:outline-none"
        >
          <option value={6}>6</option>
          <option value={12}>12</option>
          <option value={21}>21</option>
          <option value={51}>51</option>
        </select>
      </div>
    </div>
  );
}

export default PaginationComponent;
