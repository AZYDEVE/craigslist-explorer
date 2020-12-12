const mongoClient = require("../config/mongoClient");
const mongo = require("mongodb");

const readPosts = (filter, sorting, startRange, amount) => {
  return new Promise((resolve, reject) => {
    // console.log('sort', { [sorting['sortBy']]: sorting.sortOrder && sorting.sortOrder === 'desc' ? 1 : -1 });
    // console.log('range', startRange, amount);
    // console.log('filter', filter);

    const query = [];

    if (filter && filter.minPrice) {
      query.push({ "$match": { "price": { "$gte": parseInt(filter.minPrice) } } });
    }

    if (filter && filter.maxPrice) {
      query.push({ "$match": { "price": { "$lte": parseInt(filter.maxPrice) } } });
    }

    if (filter && filter.bedrooms) {
      query.push({ "$match": { "bedrooms": { "$gte": parseInt(filter.bedrooms) } } });
    }

    if (filter && filter.area) {
      query.push({ "$match": { "area": { "$gte": parseInt(filter.area) } } });
    }

    const countPromise = new Promise((resolve, reject) => {
      const countQuery = [...query];
      countQuery.push({ $count: "total" })
      mongoClient
        .getDatabase()
        .connection.collection("data")
        .aggregate(countQuery)
        .toArray((err, docs) => {
          if (err) {
            console.error("error: readPosts", err);
            reject("Failed to get all posts from database");
          } else {
            if (docs && docs.length && docs.length > 0) {
              resolve(docs[0]);
            } else {
              resolve({ total: 0 })
            }
          }
        });
    });

    const dataPromise = new Promise((resolve, reject) => {
      const dataQuery = [...query];
      dataQuery.push(...[
        { $sort: { [sorting['sortBy']]: sorting.sortOrder && sorting.sortOrder === 'desc' ? -1 : 1 } },
        { $skip: startRange },
        { $limit: amount }
      ]);
      mongoClient
        .getDatabase()
        .connection.collection("data")
        .aggregate(dataQuery)
        .toArray((err, docs) => {
          if (err) {
            console.error("error: readPosts", err);
            reject("Failed to get all posts from database");
          } else {
            // console.log('done with posts');
            resolve(docs);
          }
        });
    });

    Promise.all([countPromise, dataPromise])
      .then((data) => {
        // console.log('done with all')
        const result = {};
        result.total = data[0].total;
        result.posts = data[1];
        resolve(result);
      }).catch((err) => {
        reject(err);
      })
  });
};

const readPost = (id) => {
  return new Promise((resolve, reject) => {
    mongoClient
      .getDatabase()
      .connection.collection("data")
      .findOne({ _id: mongo.ObjectId(id) })
      .then((docs) => {
        resolve(docs);
      }).catch((err) => {
        console.error("error: readPost", err);
        reject("Failed to get one post from database");
      });
  });
};

// const addThread = (thread) => {
//   return new Promise((resolve, reject) => {
//     mongoClient
//       .getDatabase()
//       .connection.collection("thread")
//       .insertOne(thread)
//       .then((result, err) => {
//         if (err) {
//           console.error("error: addThread", err);
//           reject("Failed to add thread to database");
//         } else {
//           // The mongo success result is on the following data structure
//           // result.ops: this is an array
//           if (result.ops && result.ops.length && result.ops.length > 0) {
//             // Create user of result and remove password
//             const thread = Thread.from(result.ops[0]);
//             // Return inserted user
//             resolve(thread);
//           } else {
//             resolve(undefined);
//           }
//         }
//       });
//   });
// };

// const addPost = (post) => {
//   return new Promise((resolve, reject) => {
//     mongoClient
//       .getDatabase()
//       .connection.collection("thread")
//       .updateOne({ id: post.threadId }, { $push: { posts: post } })
//       .then((result, err) => {
//         if (err) {
//           console.error("error: addThread", err);
//           reject("Failed to add thread to database");
//         } else {
//           // The mongo success result is on the following data structure
//           // result.ops: this is an array
//           if (result && result.result && result.result.ok > 0) {
//             // Return inserted post
//             resolve(post);
//           } else {
//             resolve(undefined);
//           }
//         }
//       });
//   });
// };

// const checkThreadID = (id) => {
//   return new Promise((resolve, reject) => {
//     mongoClient
//       .getDatabase()
//       .connection.collection("thread")
//       .find(id, {
//         projection: { _id: 0, posts: 0 },
//       })
//       .toArray((err, docs) => {
//         if (err) {
//           console.error("error: readThread", err);
//           reject(err);
//         } else {
//           resolve(docs);
//         }
//       });
//   });
// };

// const getAmountOfThreads = () => {
//   return new Promise((resolve, reject) => {
//     mongoClient
//       .getDatabase()
//       .connection.collection("thread")
//       .countDocuments({})
//       .then((count) => {
//         resolve({ threadCount: count });
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// };

// const getAmountOfPosts = () => {
//   return new Promise((resolve, reject) => {
//     mongoClient
//       .getDatabase()
//       .connection.collection("thread")
//       .aggregate([
//         {
//           $project: {
//             _id: 0,
//             count: { $size: "$posts" },
//           },
//         },
//         {
//           $group: {
//             _id: "$_id",
//             postCount: { $sum: "$count" },
//           },
//         },
//         {
//           $project: {
//             _id: 0,
//           },
//         },
//       ])
//       .toArray((err, docs) => {
//         if (err) {
//           console.error("error: getAmountOfPosts", err);
//           reject("Failed to get posts count from database");
//         } else {
//           if (docs && docs.length && docs.length > 0) {
//             resolve(docs[0]);
//           }
//         }
//       });
//   });
// };

// const searchThread = (term) => {
//   return readPosts(term);
// };

// Export all database functions
module.exports = {
  readPosts, readPost
};
