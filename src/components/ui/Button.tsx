import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-[15px] font-semibold ring-offset-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
    {
        variants: {
            variant: {
                default: "bg-primary text-white hover:bg-[#4338ca] shadow-[0_4px_14px_0_rgb(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5 dark:bg-primary dark:hover:bg-[#4338ca]",
                destructive: "bg-red-500 text-slate-50 hover:bg-red-600 shadow-sm dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-900/90 hover:-translate-y-0.5",
                outline: "border border-slate-200/80 bg-white/50 backdrop-blur-md hover:bg-white hover:text-slate-900 text-slate-700 dark:border-slate-700/80 dark:bg-slate-800/50 dark:text-slate-100 dark:hover:bg-slate-700 shadow-sm hover:shadow-md hover:-translate-y-0.5",
                secondary: "bg-slate-100/80 backdrop-blur-sm text-slate-900 hover:bg-slate-200/80 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:bg-slate-700 hover:-translate-y-0.5 shadow-sm",
                ghost: "hover:bg-slate-100/50 hover:text-slate-900 text-slate-600 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-100",
                link: "text-primary underline-offset-4 hover:underline dark:text-indigo-400",
            },
            size: {
                default: "h-11 px-5 py-2",
                sm: "h-9 rounded-lg px-4 text-sm",
                lg: "h-12 rounded-[14px] px-8 text-base",
                icon: "h-11 w-11 rounded-xl",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
