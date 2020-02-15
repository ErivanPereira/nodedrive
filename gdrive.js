const fs = require("fs");
const {google} = require('googleapis');

/*function imageDownload(id){
  require("./gdrive-auth")((auth) => {
    const drive = google.drive({version: 'v3', auth});

    drive.files.get(
      {fileId: id, alt: 'media'}, 
      {responseType: 'stream'},
      function(err, { data }) {
        if (err) {
          reject("The API returned an error: " + err);
        }
        let buf = [];
        data.on("data", function(e) {
          buf.push(e);
        });
        data.on("end", function(){
          const buffer = Buffer.concat(buf);
          fs.writeFile('/tmp/photo.jpg', buffer, err => {} );
          
          callback(file.data.id);
        });
      }
    );
  })
}*/

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
