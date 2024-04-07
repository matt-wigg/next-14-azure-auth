export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center flex-grow">
      <div
        className="h-6 w-6 border-2 rounded-full border-y-gray-200 border-x-slate-700 animate-spin"
        role="status"
      />
    </div>
  );
}
