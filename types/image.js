module.exports = {
  '*.png': require('./path-to-png-handler'),
  '*.jpg': require('./path-to-jpg-handler'),
  '*.jpeg': require('./path-to-jpeg-handler'),
  '*.gif': require('./path-to-gif-handler'),
  '*.svg': require('./path-to-svg-handler'),
};