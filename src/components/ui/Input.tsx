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
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex items-center justify-center">
                            {startIcon}
                        </div>
                    )}
                    <input
                        type={type}
                        className={cn(
                            "flex h-12 w-full rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-2 text-[15px] text-slate-900 dark:text-slate-100 ring-offset-white dark:ring-offset-slate-950 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4F46E5] focus-visible:border-[#4F46E5] focus-visible:bg-white dark:focus-visible:bg-slate-900 shadow-sm transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50",
                            startIcon ? "pl-11" : "",
                            endIcon ? "pr-11" : "",
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                    {endIcon && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex items-center justify-center">
                            {endIcon}
                        </div>
                    )}
                </div>
                {helperText && (
                    <p className="mt-1 text-xs text-slate-500">{helperText}</p>
                )}
            </div>
        )
    }
)
Input.displayName = "Input"

export { Input }
