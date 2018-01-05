# #AccessibleOlli bus stop concierge backend

## Overview

## Installing

1. Install [Node](https://nodejs.org)
2. Clone this repo
  - *change to directory where you want to install*
  - `git clone git@github.com:AccessibleOlli/olli-stop-backend.git`
  - OR `git clone https://github.com/AccessibleOlli/olli-stop-backend`
3. Install node modules
  - `cd olli-stop-backend`
  - `npm install`
4. Copy the `.env.template` file to `.env` (`cp .env.template .env`). The file should look similar to the following:

```
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
WATSON_ASSISTANT_API_KEY=
```

5. In `.env` specify your twilio credentials and watson assistant api key

## Running

1. `PORT=44000 npm start`

Note: If you change the port you must change the proxy configuration in olli-stop to point to a different port.
