const allowedCors = [
  'http://moviexplorer.nomoredomains.rocks',
  'https://moviexplorer.nomoredomains.rocks',
  'https://localhost:3000',
  'http://localhost:3000',
];

const corsOption = {
  origin: allowedCors,
  optionsSuccessStatus: 200,
  credentials: true,
};

module.exports = corsOption;
