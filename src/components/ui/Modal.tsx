import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { Button } from "./Button"

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    children: React.ReactNode
    footer?: React.ReactNode
    className?: string
}

export function Modal({ isOpen, onClose, title, children, footer, className }: ModalProps) {
    const titleId = React.useId();
    const panelRef = React.useRef<HTMLDivElement>(null);
    const returnFocusRef = React.useRef<HTMLElement | null>(null);
    const onCloseRef = React.useRef(onClose);

    React.useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    React.useEffect(() => {
        if (!isOpen) return

        const previousOverflow = document.body.style.overflow;
        returnFocusRef.current = document.activeElement instanceof HTMLElement
            ? document.activeElement
            : null;
        document.body.style.overflow = 'hidden';
        panelRef.current?.querySelector<HTMLElement>('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])')?.focus();

        const handleDialogKeydown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onCloseRef.current();
                return;
            }
            if (event.key !== 'Tab' || !panelRef.current) return;

            const focusableElements = panelRef.current.querySelectorAll<HTMLElement>(
                'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement?.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement?.focus();
            }
        }

        window.addEventListener('keydown', handleDialogKeydown);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleDialogKeydown);
            if (returnFocusRef.current?.isConnected) returnFocusRef.current.focus();
        };
    }, [isOpen]);

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            {/* backdrop */}
            <div
                className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* panel — removed animate-in classes that depended on uninstalled plugin */}
            <div
                ref={panelRef}
                className={cn(
                    "relative z-[120] flex w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-xl dark:border-white/[0.06] dark:bg-[#1A211D]",
                    footer && "h-[min(80dvh,48rem)]",
                    className
                )}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? titleId : undefined}
                aria-label={title ? undefined : 'Dialog'}
                tabIndex={-1}
            >
                <div className="flex shrink-0 items-center justify-between border-b border-black/[0.04] px-6 py-4 dark:border-white/[0.06]">
                    {title && <h3 id={titleId} className="text-sm font-bold text-[#1A211D] dark:text-white">{title}</h3>}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-[#6B6B73] dark:text-[#8A8A90] hover:bg-[#F1EFE6] dark:hover:bg-white/[0.06] -mr-2"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
                <div className={cn("p-6", footer ? "min-h-0 flex-1 overflow-y-auto" : "max-h-[70vh] overflow-y-auto")}>
                    {children}
                </div>
                {footer && <div className="shrink-0 border-t border-black/[0.08] bg-white dark:border-white/[0.09] dark:bg-[#1A211D]">{footer}</div>}
            </div>
        </div>
    )
}
