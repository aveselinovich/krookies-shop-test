"use client";

import { ChangeEvent, useEffect, useState } from "react";

type QuantitySelectorProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
};

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 100,
  className = "",
}: QuantitySelectorProps) {
  const [inputValue, setInputValue] = useState(String(value));

  useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  function decrease() {
    onChange(Math.max(min, value - 1));
  }

  function increase() {
    onChange(Math.min(max, value + 1));
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const nextValue = event.target.value.replace(/\D/g, "");
    setInputValue(nextValue);

    if (!nextValue) return;

    const numericValue = Math.min(max, Math.max(min, Number(nextValue)));
    onChange(numericValue);
  }

  function handleInputBlur() {
    if (!inputValue) {
      setInputValue(String(min));
      onChange(min);
      return;
    }

    const numericValue = Math.min(max, Math.max(min, Number(inputValue)));
    setInputValue(String(numericValue));
    onChange(numericValue);
  }

  return (
    <div className={`inline-flex items-center rounded-full bg-[#FFF4F8] p-1 ${className}`}>
      <button
        type="button"
        onClick={decrease}
        disabled={value <= min}
        className="flex h-10 w-10 items-center justify-center rounded-full text-xl font-semibold text-[#54342C] transition hover:bg-[#E6AECB] disabled:cursor-not-allowed disabled:opacity-40"
      >
        −
      </button>

      <input
        type="text"
        inputMode="numeric"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        className="h-10 w-14 bg-transparent text-center text-base font-semibold text-[#54342C] outline-none"
        aria-label="Количество"
      />

      <button
        type="button"
        onClick={increase}
        disabled={value >= max}
        className="flex h-10 w-10 items-center justify-center rounded-full text-xl font-semibold text-[#54342C] transition hover:bg-[#E6AECB] disabled:cursor-not-allowed disabled:opacity-40"
      >
        +
      </button>
    </div>
  );
}
