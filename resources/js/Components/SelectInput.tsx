import { forwardRef, useRef, SelectHTMLAttributes } from "react";

export default forwardRef(function SelectInput(
  {
    className = "",
    children,
    ...props
  }: SelectHTMLAttributes<HTMLSelectElement> & { children: React.ReactNode },
  ref
) {
  const localRef = useRef<HTMLSelectElement>(null);

  return (
    <select
      {...props}
      className={
        "rounded-md border-gray-300 max-width shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 " +
        className
      }
      ref={localRef}
    >
      {children}
    </select>
  );
});
