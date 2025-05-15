const brands = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Samsung' },
  { id: 3, name: 'Xiaomi' },
  { id: 4, name: 'OPPO' },
  { id: 5, name: 'Vivo' },
];

exports.getBrands = (req, res) => {
  res.json(brands);
};
