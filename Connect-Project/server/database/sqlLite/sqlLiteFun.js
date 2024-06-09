const sqlLiteDB = require("./sqlLiteConnection");

const runSelectQuery = async (query, args = []) => {
  return new Promise(async (resolve, reject) => {
    const db = await sqlLiteDB.getSqlLiteDB();
    let result = [];

    db.serialize(function () {
      try {
        db.each(
          query,
          args,
          (err, row) => {
            if (err) {
              reject(err);
              return;
            }
            result.push(row);
          },
          function () {
            resolve(result);
            db.close();
          }
        );
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  });
};

async function runInsertQuery(createQuery, insertQuery, bind, callback) {
  const db = await sqlLiteDB.getSqlLiteDB();
  try {
    db.run(createQuery);
    (await db).serialize(() => {
      db.exec("BEGIN TRANSACTION");
      db.run(insertQuery, bind, (err) => {
        if (err) callback(err);
      });
      db.exec("COMMIT");
      db.close();
      console.log("data inserted successfully");
    });
  } catch (e) {
    console.log(e)
  }
}

module.exports = { runSelectQuery,runInsertQuery };
