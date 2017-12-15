const axios = require('axios');
const querystring = require('querystring');

module.exports = {
  get_token: function (user, password, service, domain) {
    domain = domain || 'stream';
    let url = "https://" + domain + ".watsonplatform.net/authorization/api/v1/token?"
    url +=  querystring.stringify({ url: service });
    console.log(url);
    return axios({
      method: 'GET',
      url: url,
      auth: {
        username: user,
        password: password
      },
    }).then((response) => {
      return Promise.resolve(response.data.token);
    });
  }
};