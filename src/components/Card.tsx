import { LucideIcon } from 'lucide-react';

interface CardProps {
    id: number;
    icon: LucideIcon;
    isFlipped: boolean;
    isMatched: boolean;
    isShake?: boolean;
    disabled?: boolean;
    onClick: () => void;
}

const Card = ({ icon: Icon, isFlipped, isMatched, isShake, disabled, onClick }: CardProps) => {
    return (
        <div className="card-container">
            <div
                className={`card-inner ${isFlipped || isMatched ? 'is-flipped' : ''} ${isMatched ? 'is-matched' : ''} ${isShake ? 'is-shaking' : ''} ${disabled ? 'is-disabled' : ''}`}
                onClick={onClick}
            >
                {/* Back of the card (the side seen first) - Pattern/Logo */}
                <div className="card-front">
                    <div className="card-pattern" />
                    <span>?</span>
                </div>

                {/* Front of the card (the side with the icon) */}
                <div className="card-back">
                    <Icon size={40} color="#3B82F6" />
                </div>
            </div>
        </div>
    );
};

export default Card;
