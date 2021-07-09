export function getRandomInt(max = 100) {
  return Math.floor(Math.random() * max);
}

export function getRandomColumns() {
  return [
    {
      Header: `Column ${getRandomInt()}`,
      accessor: 'col1',
    },
    {
      Header: `Column ${getRandomInt()}`,
      accessor: 'col2',
    },
  ];
}

export function getRandomData() {
  return [
    {
      col1: `Hello${getRandomInt()}`,
      col2: `World${getRandomInt()}`,
    },
    {
      col1: `Recoil${getRandomInt()}`,
      col2: `Table${getRandomInt()}`,
    },
    {
      col1: `Seems${getRandomInt()}`,
      col2: `Cool${getRandomInt()}`,
    },
  ];
}
