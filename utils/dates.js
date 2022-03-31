
// convert string of system date to MM/DD/YYYY format
const daySimple = (str) => {
    newFormat = `${str.slice(6,8)}/${str.slice(9,11)}/${str.slice(1,5)}`;
    return newFormat
}

module.exports = {
    daySimple
};