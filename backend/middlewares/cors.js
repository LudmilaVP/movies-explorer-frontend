const allowedCors = [
  'https://localhost:3000',
  'http://localhost:3000',
  'http://moviexplorer.nomoredomains.rocks',
  'https://moviexplorer.nomoredomains.rocks',
];

const corsOption = {
  origin: allowedCors,
  optionsSuccessStatus: 200,
  credentials: true,
};

module.exports = corsOption;
