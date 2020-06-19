const express = require("express");
const router = express.Router();
const auth = require("../auth-middleware/check-auth");
const fs = require("fs");
const Papa = require("papaparse");
const csv = fs.createReadStream(__dirname + "/coffee-csv.csv");

let parseddata;
Papa.parse(csv, {
  header: true,
  complete: function(results) {
    parseddata = results;
  }
});
router.get("/", auth, (req, res, next) => {
  try {
    res.status(200).json({
      message: "all coffee",
      data: parseddata.data.slice(0, 200)
    });
  } catch (err) {
    res.status(404).json({
      error: err
    });
  }
});

router.get("/:productId", (req, res, next) => {
  const reqId = req.params.productId;
  const dataToSend = parseddata.data.find(product => product.UPC === reqId);
  try {
    res.status(200).json({
      message: "message",
      data: dataToSend
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
module.exports = router;
