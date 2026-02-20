import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface CardProps {
    id: number;
    icon: LucideIcon;
    isFlipped: boolean;
    isMatched: boolean;
    isShake?: boolean;
    onClick: () => void;
}

const Card = ({ icon: Icon, isFlipped, isMatched, isShake, onClick }: CardProps) => {
    return (
        <div className="card-container" style={{ perspective: 1000, aspectRatio: '1/1' }}>
            <motion.div
                className="card-inner"
                initial={false}
                animate={{
                    rotateY: isFlipped || isMatched ? 180 : 0,
                    x: isShake ? [0, -10, 10, -10, 10, 0] : 0,
                    scale: isMatched ? [1, 1.1, 1] : 1
                }}
                transition={{
                    duration: 0.6,
                    x: { duration: 0.4 }, // Shake duration
                    scale: { duration: 0.3, delay: 0.2 } // Pulse duration 
                }}
                onAnimationComplete={() => { }}
                onClick={onClick}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                    cursor: isFlipped || isMatched ? 'default' : 'pointer',
                }}
            >
                {/* Front Face (Hidden/Back of card) */}
                <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        backgroundColor: '#1E293B', // Slate 800
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid #334155', // Slate 700
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                >
                    <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#64748B' }}>?</span>
                </div>

                {/* Back Face (Visible/Front of card with Icon) */}
                <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        backgroundColor: '#F8FAFC', // Slate 50
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: 'rotateY(180deg)',
                        border: '2px solid #E2E8F0', // Slate 200
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                >
                    <Icon size={40} color="#3B82F6" />
                </div>
            </motion.div>
        </div>
    );
};

export default Card;
