import { Menu as MenuIcon, X } from "lucide-react";

export default function MenuToggleIcon() {
  return (
    <div className="relative w-6 h-6">
      <div className="absolute inset-0 transition-all duration-300 ease-in-out origin-center opacity-100 scale-100 rotate-0 [div[data-expanded=true]_&]:opacity-0 [div[data-expanded=true]_&]:scale-0 [div[data-expanded=true]_&]:rotate-180">
        <MenuIcon size={24} strokeWidth={1.5} />
      </div>
      <div className="absolute inset-0 transition-all duration-300 ease-in-out origin-center opacity-0 scale-0 -rotate-180 [div[data-expanded=true]_&]:opacity-100 [div[data-expanded=true]_&]:scale-100 [div[data-expanded=true]_&]:rotate-0">
        <X size={24} strokeWidth={1.5} />
      </div>
    </div>
  );
}
