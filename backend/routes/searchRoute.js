const express = require("express");
const app = express();
const Data = require("../models/data");
const Image = require("../models/image")
const router = express.Router();
const multer = require('multer');
const cors = require("cors");

app.use(cors())  
// router.post("/add_data", async (req, res) => {
//   try {
//     const data = new Data({
//       data: req.body.data,
//     });
//     await data.save();
//     res.status(201).send("data inserted");
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });
// router.get("/get_data", async (req, res) => {
//   try {
//     const allData = await Data.find({});
//     res.json(allData);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });
// -------------------------------------------------------------------------------------------------------------------------------------------------


// Configure Multer for handling file uploads
const storage = multer.memoryStorage(); // Store the image data in memory
const upload = multer({ storage: storage });

// Upload an image
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const image = new Image({
      filename: req.file.originalname,
      data: req.file.buffer,
      description: req.body.Description
    });
    await image.save();
    res.status(201).send('Image uploaded successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error uploading image.');
  }
});
router.get('/images', async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching images.');
  }
});
// Fetch an image by filename
router.get('/image/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const image = await Image.findOne({ filename });

    if (!image) {
      return res.status(404).send('Image not found.');
    }

    res.setHeader('Content-Type', 'image/jpeg');
    res.send(image.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching image.');
  }
});

module.exports = router;

