
// convert a date string in format YYYYMMDD into a string to insert into database
const dayStart = (str) => {
    newFormat = `${str.slice(0,4)}-${str.slice(4,6)}-${str.slice(6,8)} 00:00:00`;
    return newFormat
};

const dayEnd = (str) => {
    newFormat = `${str.slice(0,4)}-${str.slice(4,6)}-${str.slice(6,8)} 23:59:59`;
    return newFormat
};

// convert string of system date to MM/DD/YYYY format
const daySimple = (str) => {
    newFormat = `${str.slice(6,8)}/${str.slice(9,11)}/${str.slice(1,5)}`;
    return newFormat
}

module.exports = {
    dayStart,
    dayEnd,
    daySimple
};