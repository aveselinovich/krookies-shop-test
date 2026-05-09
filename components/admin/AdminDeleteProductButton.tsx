"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TrashIcon } from "@/components/ui/Icons";

type AdminDeleteProductButtonProps = {
  productId: string;
};

function getDeleteMessage(error: string) {
  switch (error) {
    case "forbidden":
      return "Нет доступа к удалению товара";
    default:
      return "Не получилось удалить товар";
  }
}

export function AdminDeleteProductButton({ productId }: AdminDeleteProductButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm("Уверены, что хотите удалить этот товар?");
    if (!confirmed) return;

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "product_delete_failed");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      window.alert(getDeleteMessage(error instanceof Error ? error.message : "product_delete_failed"));
      setIsDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      aria-label="Удалить товар"
      className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#E6AECB] text-[#54342C] shadow-lg transition hover:bg-[#D993B7] disabled:cursor-not-allowed disabled:opacity-60"
    >
      <TrashIcon size={24} />
    </button>
  );
}
