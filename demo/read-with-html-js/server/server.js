const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../'))); // Serve static files

const PORT = 3000;
const bookmarksFile = path.join(__dirname, '../data/json/Bookmarks');

// ??????
app.get('/bookmarks', (req, res) => {
  fs.readFile(bookmarksFile, (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

// ??????
app.post('/bookmarks', (req, res) => {
  const jsonContent = JSON.stringify(req.body, null, 2);
  fs.writeFile(bookmarksFile, jsonContent, 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return res.status(500).send(err);
    }
    res.send('Bookmarks file updated successfully');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});