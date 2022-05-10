const {google} = require('googleapis');
const fs = require('fs');
const crypto = require('crypto');

const auth = new google.auth.GoogleAuth({
    keyFile: 'backend/utils/auto-ads-348717-8fc66a193adc.json',
    scopes: ['https://www.googleapis.com/auth/drive']
});

const drive = google.drive({
    version: 'v3',
    auth: auth
});



/**
 * 
 * @param {File} file
 * @returns {Promise<string>}
 */

function uploadFile(file) {
    var fileMetadata = {
        'name': `${crypto.randomBytes(20).toString('hex')}.png`
      };
      var media = {
        mimeType: 'image/png',
        body: fs.createReadStream(file.path),
        parents: '19ugnmDWxO7pWFtYHvl7gXFdiu3YLMXXm'
      };

      return drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
      }).then(file => {
          return file.data.id;
      })
      .catch(err => console.error(err));
} 

module.exports = {
    uploadFile
};