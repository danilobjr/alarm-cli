module.exports = ({ constants, chalk }) => {
  return {
    numberWidth: 6,
    numberHeight: 5,
    spaceBetweenNumbers: 2,

    clock: {
      paddingTop: 2,
      paddingBottom: 2,

      styleNumber: chalk.blue.bold,
    }
  };
};
