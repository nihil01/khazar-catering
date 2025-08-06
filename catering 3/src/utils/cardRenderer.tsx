import React from "react";
import { motion } from "framer-motion";

export function AnimatedGrid<T>({
                                    items,
                                    renderItem,
                                    minColumnWidth = "250px",
                                    gap = "1rem",
                                }: {
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    minColumnWidth?: string;
    gap?: string;
}) {
    return (
        <div
            className="grid"
            style={{
                gridTemplateColumns: `repeat(auto-fit, minmax(${minColumnWidth}, 1fr))`,
                gap,
            }}
        >
            {items.map((item, index) => (
                <AnimatedCard key={index}>
                    {renderItem(item, index)}
                </AnimatedCard>
            ))}
        </div>
    );
}


// Анимационная обёртка, показывается 1 раз
function AnimatedCard({ children }: { children: React.ReactNode }) {

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="p-4 rounded-xl shadow bg-white"
        >
        {children}
        </motion.div>
);
}




