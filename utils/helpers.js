// helper code for handlebars inserts
module.exports = {
    // format a date as MM/DD/YYYY
    format_date: (date) => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
        new Date(date).getFullYear()}`;
    },
  };
  