
// convert a date string in format YYYYMMDD into a string to insert into database
const dayStart = (str) => {
    newFormat = `${str.slice(0,3)}-${str.slice(4,5)}-${str.slice(6,7)} 00:00:00`;
    return newFormat
};

const dayEnd = (str) => {
    newFormat = `${str.slice(0,3)}-${str.slice(4,5)}-${str.slice(6,7)} 24:59:59`;
    return newFormat
};

module.exports = {
    dayStart,
    dayEnd
};