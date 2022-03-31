// helper code for handlebars inserts
module.exports = {
    // format a date as MM/DD/YYYY
    format_date: (date) => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
        new Date(date).getFullYear()}`;
    },
    // determines if a post has been edited by comparing updated and created dates
    is_edited: (post) => {
      if (JSON.stringify(post.createdAt) === JSON.stringify(post.updatedAt)) {
        return false 
      } else {
        return true
      }
    },
    plurals: (num) => {
      if (num === 1) {
        return '1 gratitude'
      } else {
        return `${num} gratitudes`
      }
    },
    prevDay: (unix) => {
      return unix - 86400;
    },
    nextDay: (unix) => {
      return unix + 86400;
    },
  };
  