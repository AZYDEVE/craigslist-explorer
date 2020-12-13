const mongoClient = require("../config/mongoClient");

const readAnnotations = (postId, userId) => {
  return new Promise((resolve, reject) => {
    mongoClient
      .getDatabase()
      .connection.collection("annotation")
      .find({ postId, userId })
      .toArray((err, docs) => {
        if (err) {
          console.error("error: readAnnotations", err);
          reject(err);
        } else {
          resolve(docs);
        }
      });
  });
};


const addAnnotation = (annotation) => {
  return new Promise((resolve, reject) => {
    mongoClient
      .getDatabase()
      .connection.collection("annotation")
      .insertOne(annotation)
      .then((result, err) => {
        if (err) {
          console.error("error: addAnnotation", err);
          reject("Failed to add annotation to database");
        } else {
          // The mongo success result is on the following data structure
          // result.ops: this is an array
          if (result.ops && result.ops.length && result.ops.length > 0) {
            // Return inserted annotation
            resolve(result.ops[0]);
          } else {
            resolve(undefined);
          }
        }
      });
  });
};

module.exports = {
  readAnnotations, addAnnotation
};