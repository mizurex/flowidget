import { cn } from "@/lib/utils";
interface buttonProps {
  children: React.ReactNode;
  onClick?  : () => void;
  className? : string;
}
export default function Button({ children, onClick, className }: buttonProps) {
  return (
    <button onClick={onClick} className={cn(`px-6 py-3 font-medium rounded-full bg-white text-black w-fit transition-all shadow-[-3px_5px_0px_#7cff3f] hover:shadow-none hover:translate-x-[-2px] hover:translate-y-[1px] cursor-pointer`, className)}>
        {children}
      </button>
  );
}