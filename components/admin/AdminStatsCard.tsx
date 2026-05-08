import Link from "next/link";

export function AdminStatsCard({
  title,
  value,
  description,
  href,
}: {
  title: string;
  value: number;
  description?: string;
  href?: string;
}) {
  const content = (
    <>
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#54342C]">
        {title}
      </p>
      <p className="mt-4 text-3xl sm:text-4xl font-black text-[#54342C]">{value}</p>
      {description ? (
        <p className="mt-2 text-sm leading-6 text-[#54342C]">{description}</p>
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="flex h-full min-h-[180px] flex-col rounded-3xl bg-[#FFFFFF] p-6 shadow-lg ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md"
      >
        {content}
      </Link>
    );
  }

  return <div className="flex h-full min-h-[180px] flex-col rounded-3xl bg-[#FFFFFF] p-6 shadow-lg ring-1 ring-black/5">{content}</div>;
}
