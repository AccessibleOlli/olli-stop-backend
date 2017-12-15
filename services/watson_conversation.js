const axios = require('axios');
const apiKey = process.env.WATSON_ASSISTANT_API_KEY;
const skillSet = process.env.WATSON_ASSISTANT_SKILL_SET
const url = 'https://watson-personal-assistant-toolkit.mybluemix.net/v2/api/skillSets/' + skillSet + '/converse?api_key=' + apiKey;

module.exports = {
  message: function (messageToSend) {
    var payload = {
      "text": messageToSend,
      "language": "en-US",
      "userID": "app-001",
      "deviceType": "phone",
      "additionalInformation": {
        "context": {}
      }
    };
    return axios({
      method: 'POST',
      url: url,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      data: payload
    }).then((response) => {
      const body = response.data;
      var specialResponse = {
        intents: [],
        entities: [],
        output: {
          action: "",
          text: body.speech.text
        },
        card: body.card
      };
      return Promise.resolve(specialResponse);
    });  
  }
};
