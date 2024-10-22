export default function Loading(){
    return (
        <div className="flex bg-zinc-800 items-center justify-center min-h-screen">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
            <div className="absolute inset-0 flex items-center justify-center">
            </div>
              <span className="text-blue-500 text-lg font-semibold">Loading...</span>
          </div>
        </div>
      );
}