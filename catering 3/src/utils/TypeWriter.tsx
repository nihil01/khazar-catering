import { motion } from "framer-motion";
import React from "react";

interface TypewriterTextProps {
    text: string;
    delay?: number;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({ text, delay = 0 }) => {
    const characters = text.split("");

    return (
        <p className="mb-4">
            {characters.map((char, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        delay: delay + index * 0.02,
                        duration: 0.05,
                    }}
                >
                    {char}
                </motion.span>
            ))}
        </p>
    );
};
