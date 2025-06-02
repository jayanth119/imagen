interface PaginationProps {
    currentPage: number;
    totalPages: number;
}
function PaginationComponent(pages : PaginationProps) {
  return (
    <div className="flex justify-center flex-wrap gap-2 mt-4">
      <button className="join-item btn">«</button>
      <button className="join-item btn">Page {pages.currentPage ||1}</button>
      <button className="join-item btn">»</button>
    </div>
  );
}

export default PaginationComponent;
