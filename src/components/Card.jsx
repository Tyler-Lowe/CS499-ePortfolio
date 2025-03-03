import { motion } from 'framer-motion';

const Card = ({ card }) => {
    if (!card) return <p className="text-gray-500">No Card</p>;

    return (
        <motion.div
            className="bg-white w-24 h-36 border-2 border-gray-300 rounded-lg flex items-center justify-center shadow-lg"
            animate={{ rotateY: 180 }}
            transition={{ duration: 0.5 }}
        >
            {/* This inner div prevents text from being mirrored */}
            <div className="text-center font-bold" style={{ transform: 'rotateY(180deg)' }}>
                {card.value} of {card.suit}
            </div>
        </motion.div>
    );
};

export default Card;
