const fs = require('fs');
const ytdl = require('ytdl-core');

const google = require('googleapis');
const youtube = google.youtube('v3');

items = {};

youtube.playlistItems.list({
  key: 'AIzaSyArkLTA0fGljeeCp86LaEQhRz3KW6aS34g',
  part: 'id,snippet',
  playlistId: 'PLib7LoYR5PuDxi8TxxGKxMgf8b-jtoS3i',
  maxResults: 50
}, (err, results) => {
  items = results.items;
  download(0);

});

function download(pos){
  console.log(`Downloading ${items[pos].snippet.title}`);
  ytdl('https://www.youtube.com/watch?v=' + items[pos].snippet.resourceId.videoId,
  {
    quality: 'highest'
  }
  )
  .pipe(fs.createWriteStream(`./downloads/${pos+1} - ${items[pos].snippet.title}.flv`)).on('finish', function(){
    console.log(`Finished Downloading ${items[pos].snippet.title}`);
    if(pos + 1 < items.length){
      download(pos+1)
    }
  });
}