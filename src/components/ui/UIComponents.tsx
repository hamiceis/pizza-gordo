import React from "react";
import { cn } from "@/lib/utils";

export { cn };

// Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "destructive"
    | "success";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = "primary",
  size = "md",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    primary: "bg-pizza-red text-white hover:bg-red-700 shadow-md",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    success: "bg-pizza-green text-white hover:bg-lime-800 shadow-sm",
    outline:
      "border border-input bg-transparent hover:bg-muted text-foreground",
    ghost: "hover:bg-muted hover:text-foreground",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  };

  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 py-2",
    lg: "h-12 px-8 text-lg",
    icon: "h-9 w-9",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    />
  );
};

// Badge Component
export const Badge: React.FC<{
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "success" | "danger";
}> = ({ children, className, variant = "default" }) => {
  const base =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

  let styles = "";
  switch (variant) {
    case "default":
      styles =
        "border-transparent bg-pizza-orange text-white hover:bg-orange-600";
      break;
    case "outline":
      styles = "text-foreground border-border";
      break;
    case "success":
      styles = "border-transparent bg-pizza-green text-white";
      break;
    case "danger":
      styles = "border-transparent bg-pizza-red text-white";
      break;
  }

  return <div className={cn(base, styles, className)}>{children}</div>;
};

// Card Component
export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div
    className={cn(
      "rounded-xl border border-border bg-card text-card-foreground shadow-sm",
      className
    )}
  >
    {children}
  </div>
);

// Input Component
export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}) => (
  <input
    className={cn(
      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
);

// Textarea Component
export const Textarea: React.FC<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = ({ className, ...props }) => (
  <textarea
    className={cn(
      "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
);

// Select/Label helpers can be added here if needed, but standard HTML elements work well for simple forms.
export const Label: React.FC<{
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
}> = ({ children, htmlFor, className }) => (
  <label
    htmlFor={htmlFor}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground",
      className
    )}
  >
    {children}
  </label>
);
