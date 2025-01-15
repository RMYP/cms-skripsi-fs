import { TriangleAlert } from "lucide-react";

export default function FaildUpdate({message}: {message : string | undefined}) {
  return (
    <div className="flex items-center gap-2 text-red-500 bg-red-100 py-2 px-4 mt-4 rounded-md">
        <TriangleAlert/>
      <span>{message}</span> 
    </div>
  );
}
