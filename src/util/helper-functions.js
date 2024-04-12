// calculates post time
export const convertEpoch = (epoch) => {
    const date = new Date(epoch * 1000);
    return date.toLocaleString();
};