import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-primary text-white hover:bg-primary/80",
                secondary:
                    "border-transparent bg-[#F1EFE6] dark:bg-white/[0.06] text-[#1A211D] dark:text-[#EAEAE8] hover:bg-[#E9E6DB] dark:hover:bg-white/[0.08]",
                destructive:
                    "border-transparent bg-red-500 text-white hover:bg-red-600",
                outline: "text-[#1A211D] dark:text-[#EAEAE8] border-black/[0.08] dark:border-white/[0.08]",
                success: "border-emerald-100 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
                warning: "border-amber-100 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400",
                blue: "border-blue-100 dark:border-blue-500/20 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400",
                brand: "border-primary/20 dark:border-primary/25 bg-primary/[0.06] dark:bg-primary/[0.10] text-primary dark:text-[#55A697]",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    )
}

export { Badge }
