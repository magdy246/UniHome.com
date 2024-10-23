export default function Test() {
  return (
    <>
      <div className="flex w-60 flex-col gap-4">
        <div className="skeleton px-4 h-32 w-full rounded-lg shadow-lg bg-white bg-opacity-50 border border-gray-300"></div>
        <div className="skeleton px-4 h-4 w-28 rounded-md bg-white bg-opacity-50 shadow-sm border border-gray-300"></div>
        <div className="skeleton px-4 h-4 w-full rounded-md bg-white bg-opacity-50 shadow-sm border border-gray-300"></div>
        <div className="skeleton px-4 h-4 w-full rounded-md bg-white bg-opacity-50 shadow-sm border border-gray-300"></div>
      </div>
    </>
  );
}
