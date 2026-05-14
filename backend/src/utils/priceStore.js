const priceStore = {};

export const getPreviousPrice = (symbol) => {
    return priceStore[symbol] || null;
};

export const setPrice = (symbol, price) => {
    priceStore[symbol] = price;
};