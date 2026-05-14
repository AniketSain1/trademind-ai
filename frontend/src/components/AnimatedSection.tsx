import {
    memo
} from "react";

import {
    motion
} from "framer-motion";

type Props = {
    children: React.ReactNode;

    delay?: number;
};

const AnimatedSection = memo(
    function AnimatedSection({
        children,
        delay = 0
    }: Props) {

        return (

            <motion.div

                // ==============================
                // HOVER EFFECT
                // ==============================
                whileHover={{
                    y: -4
                }}

                // ==============================
                // INITIAL STATE
                // ==============================
                initial={{
                    opacity: 0,
                    y: 24,
                    scale: 0.98
                }}

                // ==============================
                // ENTER ANIMATION
                // ==============================
                whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1
                }}

                // ==============================
                // VIEWPORT
                // ==============================
                viewport={{
                    once: true,
                    amount: 0.2
                }}

                // ==============================
                // TRANSITION
                // ==============================
                transition={{
                    duration: 0.55,
                    delay,
                    ease: [0.22, 1, 0.36, 1]
                }}

                // ==============================
                // PERFORMANCE
                // ==============================
                style={{
                    willChange:
                        "transform"
                }}

            >
                {children}
            </motion.div>
        );
    }
);

export default AnimatedSection;