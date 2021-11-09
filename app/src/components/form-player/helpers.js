export const getPlayerOptions = roster => {
  return Object.keys(roster).map(player => {
    return {
      label: roster[player],
    };
  });
};
