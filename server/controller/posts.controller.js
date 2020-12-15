const mongoClient = require("../config/mongoClient");
const mongo = require("mongodb");

const readPosts = (filter, sorting, startRange, amount, neighborhood) => {
  return new Promise((resolve, reject) => {
    const query = [];

    if (filter && filter.minPrice) {
      query.push({ $match: { price: { $gte: parseInt(filter.minPrice) } } });
    }

    if (filter && filter.maxPrice) {
      query.push({ $match: { price: { $lte: parseInt(filter.maxPrice) } } });
    }

    if (filter && filter.bedrooms) {
      query.push({ $match: { bedrooms: { $gte: parseInt(filter.bedrooms) } } });
    }

    if (filter && filter.area) {
      query.push({ $match: { area: { $gte: parseInt(filter.area) } } });
    }

    if (neighborhood && neighborhood.length && neighborhood.length > 0) {
      query.push({ $match: { neighborhood: { $in: neighborhood } } });
    }

    const countPromise = new Promise((resolve, reject) => {
      const countQuery = [...query];
      countQuery.push({ $count: "total" });
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
              resolve({ total: 0 });
            }
          }
        });
    });

    const dataPromise = new Promise((resolve, reject) => {
      const dataQuery = [...query];
      dataQuery.push(
        ...[
          {
            $sort: {
              [sorting["sortBy"]]:
                sorting.sortOrder && sorting.sortOrder === "desc" ? -1 : 1,
            },
          },
          { $skip: startRange },
          { $limit: amount },
        ]
      );
      mongoClient
        .getDatabase()
        .connection.collection("data")
        .aggregate(dataQuery)
        .toArray((err, docs) => {
          if (err) {
            console.error("error: readPosts", err);
            reject("Failed to get all posts from database");
          } else {
            resolve(docs);
          }
        });
    });

    Promise.all([countPromise, dataPromise])
      .then((data) => {
        const result = {};
        result.total = data[0].total;
        result.posts = data[1];
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
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
      })
      .catch((err) => {
        console.error("error: readPost", err);
        reject("Failed to get one post from database");
      });
  });
};

// Export all database functions
module.exports = {
  readPosts,
  readPost,
};
