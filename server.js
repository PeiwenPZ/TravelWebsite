const mongoose = require('mongoose');

const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UnCaught Rejection! Shutting down...');
  console.log(err.name, err.message);
  //close the server
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => {
  console.log('DB connection successful!');
});

const app = require('./app');

//4) start a server
//creating a port and start listening to port
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Unhandled Rejection! Shutting down...');
  //close the server gracefully
  server.close(() => {
    process.exit(1);
  });
});
