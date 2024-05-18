import { cn } from "@/lib/utils";

const PageWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto w-full md:max-w-screen-lg px-7 md:px-10 sm:px-10",
        className
      )}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
