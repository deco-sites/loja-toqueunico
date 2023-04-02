import { forwardRef } from "preact/compat";

import type { ComponentType, JSX } from "preact";

import Spinner from "./Spinner.tsx";

export type Props =
  & Omit<JSX.IntrinsicElements["button"], "as" | "size" | "loading">
  & {
    as?: keyof JSX.IntrinsicElements | ComponentType;
    variant?: keyof typeof variants;
    loading?: boolean;
  };

const variants = {
  primary:
    "text-[#ECCDA5] bg-[#324836] rounded-[10px] h-[36px] px-3 rounded font-button border-transparent hover:bg-[#242D21] hover:text-[#ECCDA5] hover:border-interactive active:bg-interactive active:text-default-inverse active:border-transparent disabled:border-default disabled:text-subdued disabled:bg-interactive-inverse focus:outline-none ",
  secondary:
    "text-[#324836] bg-[#ECCDA5] rounded-[10px] h-[36px] px-3 rounded font-button border-default hover:bg-[#ECCDA5] hover:text-[#242D21] active:bg-interactive active:text-interactive-inverse disabled:border-default disabled:text-subdued disabled:bg-interactive-inverse focus:outline-none",
  tertiary:
    "h-[36px] px-3 rounded bg-interactive-inverse font-button text-button border-transparent hover:bg-hover active:border-interactive disabled:border-transparent disabled:text-subdued focus:outline-none",
  icon:
    "h-[36px] px-2 rounded-full bg-transparent text-default border-transparent hover:bg-hover active:border-interactive disabled:text-subdued disabled:bg-interactive-inverse focus:outline-none",
  "icon-primary":
    "h-[36px] px-2 rounded-md bg-[#324836] text-[#ECCDA5] border-transparent hover:bg-[#242D21] active:border-interactive disabled:text-subdued disabled:bg-interactive-inverse focus:outline-none",
};

const Button = forwardRef<HTMLButtonElement, Props>(({
  variant = "primary",
  as = "button",
  type = "button",
  class: _class = "",
  children,
  loading,
  disabled,
  ...props
}, ref) => {
  const Component = as as ComponentType<
    { disabled?: boolean; className: string; type: string }
  >;
  const styles = variants[variant];

  return (
    <Component
      {...props}
      className={`inline-flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed transition-colors duration-150 ease-in border ${styles} ${_class}`}
      disabled={disabled || loading}
      type={type}
      ref={ref}
    >
      {loading === true ? <Spinner size={24} /> : children}
    </Component>
  );
});

export default Button;
