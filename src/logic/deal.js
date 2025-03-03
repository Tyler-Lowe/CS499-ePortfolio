export const generateDeckOfCards = () => {
    const cardSuites = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const cardValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const deckOfCards = [];

    for (const value of cardValues) {
        for (const suit of cardSuites) {
            deckOfCards.push({ suit, value });
        }
    }
    return deckOfCards;
};

function shuffleDeck(deck) {
    for (let index = deck.length - 1; index > 0; index--) {
        const randomPosition = Math.floor(Math.random() * (index + 1));
        [deck[index], deck[randomPosition]] = [deck[randomPosition], deck[index]];
    }
    return deck;
}

export const dealCards = () => {
    const deckToBeDealed = shuffleDeck(generateDeckOfCards());
    const cpuPlayer = [];
    const playerOne = [];
    while (deckToBeDealed.length) {
        playerOne.push(deckToBeDealed.pop());
        if (deckToBeDealed.length) cpuPlayer.push(deckToBeDealed.pop());
    }
    return { cpuPlayer, playerOne };
};
