import Card from './Card';

const PlayerHand = ({ hand }) => {
    return (
        <div className="flex flex-wrap gap-2 justify-center">
            {hand.map((card, index) => (
                <Card key={index} card={card} />
            ))}
        </div>
    );
};

export default PlayerHand;
