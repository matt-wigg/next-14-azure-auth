export default function Loading() {
  return (
    <main className="flex justify-center items-center h-screen">
      <div
        className="h-12 w-12 border-4 rounded-full border-y-gray-200 border-x-slate-700 animate-spin"
        role="status"
      />
    </main>
  );
}
