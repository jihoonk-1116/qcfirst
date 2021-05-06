/*
Incomplete implement

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const router = express.Router();
const { connect } = require('http2');

const dburl = "mongodb+srv://JihoonDB:6581139a@firstdb.irfsc.mongodb.net/firstDB?retryWrites=true&w=majority";
const conn = mongoose.createConnection(dburl);
//middleware
router.use(methodOverride('_method'));
//Init gfs
let gfs;
conn.once('open', () => {
    //init stream
    gfs = Grid(conn.db,mongoose.mongo);
    gfs.collection('uploads');
})
//Create storage engine
//Citation from
//https://www.youtube.com/watch?v=3f5Q9wDePzY
const storage = new GridFsStorage({
    url: dburl,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
const upload = multer({ storage }); //pass the storage engine

//GET
router.get('/',(req,res)=>{
    res.render();
})

//POST
//Use single() to upload an image
router.post('/upload',upload.single('img'),(req,res)=>{  //26:30
    console.log("upload");
    console.log(req.image);
    res.json({image:req.img});
})


  module.exports = router;
  */