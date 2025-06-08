const chokidar = require('chokidar');
const { exec } = require('child_process');

const watcher = chokidar.watch('./', {
  ignored: /(^|[\/\\])(\.git|node_modules)/, // ignore .git and node_modules folders
  persistent: true,
});

watcher.on('change', (path) => {
  console.log(`${path} changed, pushing updates...`);
  
  exec('git add . && git commit -m "Auto update" && git push', (err, stdout, stderr) => {
    if (err) {
      console.error('Error pushing changes:', err.message);
      if (stderr) console.error(stderr);
      return;
    }
    console.log('Site updated successfully:\n', stdout);
  });
});