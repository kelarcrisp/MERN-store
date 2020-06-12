const express = require("express");
const router = express.Router();

const fs = require("fs");
const Papa = require("papaparse");
const csv = fs.createReadStream(__dirname + "/coffee-csv.csv");

let parseddata;
Papa.parse(csv, {
  header: true,
  complete: function(results) {
    // console.log("Finished:", results);
    parseddata = results;
  }
});

router.get("/", (req, res, next) => {
  console.log(typeof data);
  res.status(200).json({
    message: "all coffee",
    data: parseddata.data
  });
});
module.exports = router;
