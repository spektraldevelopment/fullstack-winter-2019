'use strict';

const express = require('express');
const http = require('http');
const mongoose = require('mongoose');

// 1. Create main express intance
const router = express();

// 2. Require utility function for adding middleware
const { applyMiddleware } = require('./utils');

// 3a. Require general middleware
const middleWare = require('./middleware');
// 3b. Require error handling middleware
const errorHandlers = require('./middleware/errorHandlers');

// 4. Require routes
const { router: itemsRoutes } = require('./routes/items/itemsRoutes');
const { router: itemRoutes } = require('./routes/item/itemRoutes');

// 5. Require conatants
const { PORT, URL } = require('./utils/constants');

// 6. Apply general middleware
applyMiddleware(middleWare, router);

// 7. Utilise routes
router.use('/items', itemsRoutes);
router.use('/item', itemRoutes);

// 8. Apply error handling middleware (meaningfully last)
applyMiddleware(errorHandlers, router);

// 9. Create a server from express instance
const server = http.createServer(router);

// 10. Start server
server.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
  if (process.send) {
    // NOTE: process is being run by pm2
    process.send('ready');
  }
});

console.log();

mongoose.connect(URL, { useNewUrlParser: true })
  .then(async () => {
    console.log(`CONNECTED to server: ${URL}`);

    // // const myFriend = new Users({
    // //   firstName: 'Reese',
    // //   lastName: 'Wimbly',
    // // });
    // // const friendDoc = await myFriend.save();
    // const users = await Users.find();
    // console.log(users);

    // const myComment = new Comment({
    //   body: "I think you're awesome!",
    //   // date: '',
    //   user: '5ca0d434007d744f5f1d5a2b',
    // });
    // const commentDoc = await myComment.save();

    // const comments = await Comment.find();
    // console.log(comments);
  })
  .catch((err) => {
    console.error(err);
    throw err;
  });
