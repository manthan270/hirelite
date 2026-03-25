import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    startIcon?: React.ReactNode
    endIcon?: React.ReactNode
    helperText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, startIcon, endIcon, helperText, ...props }, ref) => {
        return (
            <div className="w-full">
                <div className="relative">
                    {startIcon && (
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6B73] pointer-events-none flex items-center justify-center">
                            {startIcon}
                        </div>
                    )}
                    <input
                        type={type}
                        className={cn(
                            "flex h-12 w-full rounded-lg border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-white/[0.04] px-4 py-2 text-[15px] text-[#1A1A1F] dark:text-[#EAEAE8] ring-offset-white dark:ring-offset-[#0A0A0F] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#6B6B73] dark:placeholder:text-[#8A8A90] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#5B4CDB] focus-visible:border-[#5B4CDB] focus-visible:bg-white dark:focus-visible:bg-white/[0.06] transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50",
                            startIcon ? "pl-11" : "",
                            endIcon ? "pr-11" : "",
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                    {endIcon && (
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B6B73] flex items-center justify-center">
                            {endIcon}
                        </div>
                    )}
                </div>
                {helperText && (
                    <p className="mt-1 text-xs text-[#6B6B73]">{helperText}</p>
                )}
            </div>
        )
    }
)
Input.displayName = "Input"

export { Input }
