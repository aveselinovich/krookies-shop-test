"use client";

import Link from "next/link";
import { useState } from "react";
import { FilterIcon, XIcon } from "@/components/ui/Icons";

type FilterOption = {
  value: string;
  label: string;
};

type AdminOrdersFiltersProps = {
  currentValue?: string;
  options: FilterOption[];
};

export function AdminOrdersFilters({
  currentValue,
  options,
}: AdminOrdersFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentLabel =
    options.find((option) => option.value === currentValue)?.label || "Фильтр";

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div className="relative sm:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-[#54342C] shadow-sm ring-1 ring-[#E6AECB]"
      >
        {isOpen ? <XIcon size={18} /> : <FilterIcon size={18} />}
        {currentLabel}
      </button>

      {isOpen ? (
        <div className="absolute left-0 top-full z-30 mt-3 grid w-[min(82vw,320px)] gap-2 rounded-3xl bg-white p-3 shadow-lg ring-1 ring-black/5">
          {options.map((option) => (
            <Link
              key={option.value}
              href={`/admin/orders?status=${option.value}`}
              onClick={closeMenu}
              className={`rounded-2xl px-4 py-3 text-center text-sm font-semibold ring-1 transition ${
                currentValue === option.value
                  ? "bg-[#54342C] text-white ring-[#54342C]"
                  : "bg-white text-[#54342C] ring-[#E6AECB] hover:bg-[#FFF4F8]"
              }`}
            >
              {option.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
