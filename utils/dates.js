
// convert a date string in format YYYYMMDD into a string to insert into database
const dayStart = (str) => {
    newFormat = `${str.slice(0,4)}-${str.slice(4,6)}-${str.slice(6,8)} 00:00:00`;
    return newFormat
};

const dayEnd = (str) => {
    newFormat = `${str.slice(0,4)}-${str.slice(4,6)}-${str.slice(6,8)} 23:59:59`;
    return newFormat
};

module.exports = {
    dayStart,
    dayEnd
};