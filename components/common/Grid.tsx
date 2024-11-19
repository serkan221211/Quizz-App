import { twMerge } from "tailwind-merge";

export const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={twMerge(
      "container px-4 transition-all md:px-10 lg:px-20",
      className
    )}
  >
    {children}
  </div>
);
