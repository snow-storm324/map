// auto-push.js
const chokidar = require('chokidar');
const { exec } = require('child_process');

chokidar.watch('./index.html').on('change', () => {
  exec('git add . && git commit -m "Auto update" && git push', (err, stdout, stderr) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log('Site updated:', stdout);
    }
  });
});