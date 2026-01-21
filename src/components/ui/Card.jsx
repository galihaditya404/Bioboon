import { cn } from "../../utils/cn";

export function Card({ children, className, noPadding = false, ...props }) {
    return (
        <div
            className={cn(
                "relative bg-moss/20 backdrop-blur-sm border border-white/5 overflow-hidden group transition-all duration-700 hover:border-white/20 hover:bg-moss/30 hover:shadow-[0_0_30px_-5px_rgba(26,47,35,0.5)]",
                !noPadding && "p-8",
                className
            )}
            {...props}
        >
            {/* Tech Corners */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20" />

            {children}
        </div>
    );
}
