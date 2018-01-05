const _ = require('lodash');
const config = {
  username: process.env.WATSON_TEXT_TO_SPEECH_USERNAME,
  password: process.env.WATSON_TEXT_TO_SPEECH_PASSWORD
};
const TextToSpeech = require('watson-developer-cloud/text-to-speech/v1');
const textToSpeech = undefined;
if (config.username) {
  textToSpeech = new TextToSpeech(config);
} 

module.exports = {
  
  textToSpeech: function(options) {
    _.extend(options, { voice: 'en-US_MichaelVoice' });
    return new Promise((resolve, reject) => {
      const transcript = textToSpeech.synthesize(options);
      transcript.on('response', (response) => {
        let data = [];
        response.on('data', function (chunk) {
          data.push(chunk);
        }).on('end', function () {
          resolve(Buffer.concat(data));
        });
      });
    })
  },

  textToSpeechPipe: function(options) {
    _.extend(options, { voice: 'en-US_MichaelVoice' });
    return new Promise((resolve, reject) => {
      const transcript = textToSpeech.synthesize(options);
      transcript.on('response', function (response) {
        response.headers['content-disposition'] = 'attachment; filename=transcript.ogg';
      });
      resolve(transcript);
    });
  }
};