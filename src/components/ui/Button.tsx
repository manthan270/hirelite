import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-[15px] font-semibold ring-offset-[#F8F6EE] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-[#101310]",
    {
        variants: {
            variant: {
                default: "bg-primary text-white shadow-sm hover:bg-primary-dark hover:shadow-md dark:bg-primary dark:hover:bg-primary-dark",
                destructive: "bg-red-500 text-white hover:bg-red-600 shadow-sm dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-900/90",
                outline: "border border-black/[0.09] bg-white hover:bg-[#F8F6EE] hover:text-[#1A211D] text-[#1A211D] dark:border-white/[0.1] dark:bg-white/[0.035] dark:text-[#EAEAE8] dark:hover:bg-white/[0.07]",
                secondary: "bg-[#F1EFE6] text-[#1A211D] hover:bg-[#E9E6DB] dark:bg-white/[0.06] dark:text-[#EAEAE8] dark:hover:bg-white/[0.1]",
                ghost: "hover:bg-black/[0.04] hover:text-[#1A211D] text-[#6B6B73] dark:text-[#8A8A90] dark:hover:bg-white/[0.06] dark:hover:text-[#EAEAE8]",
                link: "text-primary underline-offset-4 hover:underline dark:text-[#55A697]",
            },
            size: {
                default: "h-11 px-5 py-2",
                sm: "h-9 rounded-md px-4 text-sm",
                lg: "h-12 rounded-lg px-8 text-base",
                icon: "h-11 w-11 rounded-lg",
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

export { Button }
