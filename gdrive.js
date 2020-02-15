const fs = require("fs");
const {google} = require('googleapis');

function imageDownload(id){
  return "https://lh3.google.com/u/0/d/" + id
}

function imageUpload(fileName, filePath, callback){
  require("./gdrive-auth")((auth) => {
    const folder = '1fKeDH57uGj72f6cbdjFT72cOC8MzX0t_';

    const fileMetadata = {
      name : fileName, 
      parents : [folder]
    };

    const media = {
      mimeType: "image/jpeg",
      body: fs.createReadStream(filePath)
    }
    
    const drive = google.drive({version: 'v3', auth});
    drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id'
    }, function (err, file) {
      if (err) {
        // Handle error
        console.error(err);
      } else {
        callback(file.data.id);
      }
    });
  });
}

function imageUpdate(id, filePath, callback){
  require("./gdrive-auth")((auth) => {
    const media = {
      mimeType: "image/jpeg",
      body: fs.createReadStream(filePath)
    }
    
    const drive = google.drive({version: 'v3', auth});
    drive.files.update({
      fileId: id,
      media: media,
      fields: 'id'
    }, function (err, file) {
      if (err) {
        // Handle error
        console.error(err);
      } else {
        callback(file.data.id);
      }
    });
  });
}

function imageDelete(id, callback){
  require("./gdrive-auth")((auth) => {
    const drive = google.drive({version: 'v3', auth});
    drive.files.delete({
      fileId: id,
    }, function (err, file) {
      if (err) {
        // Handle error
        console.error(err);
      } else {
        callback(file.data.id);
      }
    });
  });
}

module.exports = { imageDownload, imageUpload, imageUpdate, imageDelete };
