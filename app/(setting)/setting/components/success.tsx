import { CircleCheckBig } from 'lucide-react';

export default function SuccessUpdate({message}: {message : string | undefined}) {
  return (
    <div className="flex items-center gap-2 text-green-500 bg-green-100 py-2 px-4 mt-4 rounded-md">
        <CircleCheckBig/>
      <span>{message}</span>
    </div>
  );
}
