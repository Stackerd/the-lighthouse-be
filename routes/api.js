const axios = require("axios");
var express = require("express");
var router = express.Router();

const API_URL = "https://bible-api.com/";

const verses = {
  3: {
    id: "john_3:16",
    reference: "John 3:16",
    verses: [
      {
        book_id: "JHN",
        book_name: "John",
        chapter: 3,
        verse: 16,
        text: "\nFor God so loved the world, that he gave his one and only Son, that whoever believes in him should not perish, but have eternal life.\n\n",
      },
    ],
    text: "\nFor God so loved the world, that he gave his one and only Son, that whoever believes in him should not perish, but have eternal life.\n\n",
    translation_id: "web",
    translation_name: "World English Bible",
    translation_note: "Public Domain",
  },
  4: {
    id: "matthew_6:21",
    reference: "Matthew 6:21",
    verses: [
      {
        book_id: "MAT",
        book_name: "Matthew",
        chapter: 6,
        verse: 21,
        text: "\nfor where your treasure is, there your heart will be also.\n\n",
      },
    ],
    text: "\nfor where your treasure is, there your heart will be also.\n\n",
    translation_id: "web",
    translation_name: "World English Bible",
    translation_note: "Public Domain",
  },
  5: {
    id: "1_john_4:8",
    reference: "1 John 4:8",
    verses: [
      {
        book_id: "1JN",
        book_name: "1 John",
        chapter: 4,
        verse: 8,
        text: "He who doesn’t love doesn’t know God, for God is love.\n",
      },
    ],
    text: "He who doesn’t love doesn’t know God, for God is love.\n",
    translation_id: "web",
    translation_name: "World English Bible",
    translation_note: "Public Domain",
  },
};

const favorites = {};

/* GET home page. */
router.get("/bible/random-verse", async function (req, res, next) {
  console.log(new Date().getDate());
  try {
    const byDate = verses[new Date().getDate()];
    if (byDate) {
      res.json({ ...byDate, favorite: favorites[byDate.id]?.favorite });
      return;
    }
    const randomIndex = Math.floor(Math.random() * verses.length);
    res.json({
      ...verses[randomIndex],
      favorite: favorites[verses[randomIndex].id]?.favorite,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred. Please try again later.");
  }
});

router.get("/bible/search/:reference", async function (req, res, next) {
  try {
    const response = await axios.get(`${API_URL}${req.params.reference}`);
    res.json({
      ...response.data,
      favorite: favorites?.[req.params.reference]?.favorite,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred. Please try again later.");
  }
});

router.get("/bible/favorite", async function (req, res, next) {
  res.json(favorites);
});

router.post("/bible/favorite/:reference", async function (req, res, next) {
  console.log(favorites);
  favorites[req.params.reference] = {
    favorite: !favorites?.[req.params.reference]?.favorite,
    text: req.body.text,
    id: req.params.reference,
    reference: req.body.reference,
  };
  res.json({ success: true });
});

module.exports = router;
