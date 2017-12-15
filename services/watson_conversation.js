const axios = require('axios');
const api_key = process.env.WATSON_ASSISTANT_API_KEY;
const url = 'https://watson-personal-assistant-toolkit.mybluemix.net/v2/api/skillSets/olli-ces-dev/converse?api_key=' + api_key;

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
      console.log(JSON.stringify(body));
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
  // message: function (messageToSend) {
  //   console.log('messageToSend: ' + JSON.stringify(messageToSend));
  //   var payload = {
  //     id: 'id-dc6',
  //     version: '1.0',
  //     language: 'en-US',
  //     text: messageToSend,
  //     context: {
  //       user: {
  //         id: 'user-f4c'
  //       },
  //       application: {
  //         id: 'Olli',
  //         attributes: {}
  //       },
  //       session: {
  //         attributes: {
  //           current_speed: "20",
  //           max_speed: "30"
  //         }
  //       }
  //     }
  //   };
  //   //console.log('Payload: ' + JSON.stringify(payload));
  //   return axios({
  //     method: 'POST',
  //     url: url,
  //     headers: {
  //       'api_key': api_key
  //     },
  //     data: payload
  //   }).then((response) => {
  //     const body = response.data;
  //     console.log(JSON.stringify(body));
  //     var specialResponse = {
  //       intents: [],
  //       entities: [],
  //       output: {
  //         action: "",
  //         text: body.speech.text
  //       }
  //     };
  //     return Promise.resolve(specialResponse);
  //   });  
  // }
};
