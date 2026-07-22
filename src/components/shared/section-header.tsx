import { cn } from "@/lib/utils/cn";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-10 md:mb-14",
        align === "center" && "text-center",
        className
      )}
    >
      {subtitle && (
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-accent">
          {subtitle}
        </p>
      )}
      <h2 className="font-serif text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
