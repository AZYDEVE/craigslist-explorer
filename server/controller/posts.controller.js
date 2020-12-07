const Thread = require("../models/thread");
const mongoClient = require("../config/mongoClient");

const readThreads = (searchTerm) => {
  return new Promise((resolve, reject) => {
    // Merge 2 collection on userId
    // then remove all unnecessary data
    const query = [
      {
        $lookup: {
          from: "user",
          localField: "userId",
          foreignField: "id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          count: {
            $cond: {
              if: { $isArray: "$posts" },
              then: { $size: "$posts" },
              else: "NA",
            },
          },
          post: { $arrayElemAt: ["$posts", 0] },
          user: {
            name: 1,
            id: 1,
          },
          subject: 1,
          created: 1,
          active: 1,
          userId: 1,
          id: 1,
          tags: 1,
          _id: 0,
        },
      },
    ];

    if (searchTerm) {
      query.unshift({ $match: { $text: { $search: searchTerm } } });
    }
    // Sort in reverse order
    mongoClient
      .getDatabase()
      .connection.collection("data")
      .aggregate(query)
      .sort({ created: -1 })
      .toArray((err, docs) => {
        if (err) {
          console.error("error: readThreads", err);
          reject("Failed to get all threads from database");
        } else {
          resolve(docs);
        }
      });
  });
};

const readThread = (id) => {
  return new Promise((resolve, reject) => {
    // Merge 2 collection on userId
    // then remove all unnecessary data
    // source for posts filtering and merging user
    // http://www.petecorey.com/blog/2020/01/29/mongodb-object-array-lookup-aggregation/
    mongoClient
      .getDatabase()
      .connection.collection("thread")
      .aggregate([
        { $match: { id: id } },
        {
          $lookup: {
            from: "user",
            localField: "userId",
            foreignField: "id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $project: {
            _id: 0,
            userId: 0,
            user: {
              _id: 0,
              active: 0,
              hashed_password: 0,
              updated: 0,
              email: 0,
            },
            "posts.threadId": 0,
            "posts.id": 0,
          },
        },
        {
          $unwind: "$posts",
        },
        {
          $lookup: {
            from: "user",
            localField: "posts.userId",
            foreignField: "id",
            as: "posts.user",
          },
        },
        {
          $project: {
            "posts.user": {
              _id: 0,
              active: 0,
              hashed_password: 0,
              updated: 0,
              email: 0,
            },
          },
        },
        {
          $group: {
            _id: "$_id",
            root: { $mergeObjects: "$$ROOT" },
            posts: { $push: "$posts" },
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: ["$root", "$$ROOT"],
            },
          },
        },
        {
          $project: {
            root: 0,
            "posts.userId": 0,
            _id: 0,
          },
        },
      ])
      .toArray((err, docs) => {
        if (err) {
          console.error("error: readThreads", err);
          reject("Failed to get all threads from database");
        } else {
          resolve(docs);
        }
      });
  });
};

const addThread = (thread) => {
  return new Promise((resolve, reject) => {
    mongoClient
      .getDatabase()
      .connection.collection("thread")
      .insertOne(thread)
      .then((result, err) => {
        if (err) {
          console.error("error: addThread", err);
          reject("Failed to add thread to database");
        } else {
          // The mongo success result is on the following data structure
          // result.ops: this is an array
          if (result.ops && result.ops.length && result.ops.length > 0) {
            // Create user of result and remove password
            const thread = Thread.from(result.ops[0]);
            // Return inserted user
            resolve(thread);
          } else {
            resolve(undefined);
          }
        }
      });
  });
};

const addPost = (post) => {
  return new Promise((resolve, reject) => {
    mongoClient
      .getDatabase()
      .connection.collection("thread")
      .updateOne({ id: post.threadId }, { $push: { posts: post } })
      .then((result, err) => {
        if (err) {
          console.error("error: addThread", err);
          reject("Failed to add thread to database");
        } else {
          // The mongo success result is on the following data structure
          // result.ops: this is an array
          if (result && result.result && result.result.ok > 0) {
            // Return inserted post
            resolve(post);
          } else {
            resolve(undefined);
          }
        }
      });
  });
};

const checkThreadID = (id) => {
  return new Promise((resolve, reject) => {
    mongoClient
      .getDatabase()
      .connection.collection("thread")
      .find(id, {
        projection: { _id: 0, posts: 0 },
      })
      .toArray((err, docs) => {
        if (err) {
          console.error("error: readThread", err);
          reject(err);
        } else {
          resolve(docs);
        }
      });
  });
};

const getAmountOfThreads = () => {
  return new Promise((resolve, reject) => {
    mongoClient
      .getDatabase()
      .connection.collection("thread")
      .countDocuments({})
      .then((count) => {
        resolve({ threadCount: count });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getAmountOfPosts = () => {
  return new Promise((resolve, reject) => {
    mongoClient
      .getDatabase()
      .connection.collection("thread")
      .aggregate([
        {
          $project: {
            _id: 0,
            count: { $size: "$posts" },
          },
        },
        {
          $group: {
            _id: "$_id",
            postCount: { $sum: "$count" },
          },
        },
        {
          $project: {
            _id: 0,
          },
        },
      ])
      .toArray((err, docs) => {
        if (err) {
          console.error("error: getAmountOfPosts", err);
          reject("Failed to get posts count from database");
        } else {
          if (docs && docs.length && docs.length > 0) {
            resolve(docs[0]);
          }
        }
      });
  });
};

const searchThread = (term) => {
  return readThreads(term);
};

// Export all database functions
module.exports = {
  addThread,
  readThreads,
  readThread,
  addPost,
  checkThreadID,
  searchThread,
  getAmountOfPosts,
  getAmountOfThreads,
};
