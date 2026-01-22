import { cn } from "../../utils/cn";

export function Card({ children, className, noPadding = false, ...props }) {
    return (
        <div
            className={cn(
                "relative bg-day-surface dark:bg-moss/20 backdrop-blur-sm border border-day-border dark:border-white/5 overflow-hidden group transition-all duration-700 hover:border-day-text/20 dark:hover:border-white/20 hover:bg-day-surface/80 dark:hover:bg-moss/30 hover:shadow-[0_0_30px_-5px_rgba(26,47,35,0.1)] dark:hover:shadow-[0_0_30px_-5px_rgba(26,47,35,0.5)]",
                !noPadding && "p-8",
                className
            )}
            {...props}
        >
            {/* Tech Corners */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-day-text/20 dark:border-white/20 transition-colors" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-day-text/20 dark:border-white/20 transition-colors" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-day-text/20 dark:border-white/20 transition-colors" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-day-text/20 dark:border-white/20 transition-colors" />

            {children}
        </div>
    );
}
