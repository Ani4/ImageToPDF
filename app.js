const express = require("express");
const app = express();
const fs = require("fs");//help us to initialize ,open and etc the files
const molter = require("multer");//help us to upload all file to the server
const {TesseractWorker} = require("tesseract.js"); //help us to read images in files
