// calculates post time
export const convertEpoch = (epoch) => {
    let date = new Date(epoch * 1000);
    return date.toLocaleString();
};