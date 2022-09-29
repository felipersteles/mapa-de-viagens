
const router = require("express").Router();
const Pin = require("../models/Pin");

//criar um pin
router.post("/", async (req, res) => {
  const newPin = new Pin(req.body);
  console.log(req.body);

  try {
    const savedPin = await newPin.save();
    

    res.status(200).send(savedPin);
  } catch (err) {
    res.status(500).json(err);
  }
});

//recuperar pins
router.get("/", async (req, res) => {
  try {
    const pins = await Pin.find();
    res.status(200).json(pins);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
