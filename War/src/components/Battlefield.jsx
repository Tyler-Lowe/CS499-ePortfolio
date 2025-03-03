import Card from './Card';

const Battlefield = ({ cpuCard, playerCard }) => {
    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-center mb-4">Battlefield</h2>
            <div className="flex justify-around items-center">
                <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">CPU Card</h3>
                    <Card card={cpuCard} />
                </div>
                <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">Player Card</h3>
                    <Card card={playerCard} />
                </div>
            </div>
        </div>
    );
};

export default Battlefield;
