# ScreepsSlackBot
This slack bot is designed to say hello to new [Screeps Slack](http://chat.screeps.com/) users. It uses [BotKit](https://www.npmjs.com/package/botkit) and the [Slack Real Time Messaging API](https://api.slack.com/rtm) to greet new users in the `#general` channel, and send them a hello message including *Do's*, *Do Not's*, *helpful links* and a *list of moderators* in a direct message.

It is designed to be a configuration under the [Bots](https://screeps.slack.com/apps/A0F7YS25R-bots) app custom integration.


### NPM Requirements
- dotenv (v4.0.0 or higher)
- botkit (v0.6.5 or higher)

### Setup
https://botkit.ai/docs/v4/provisioning/slack-events-api.html

local dev to expose localhost 
ngrok http://ngrok.io/


#### Create a `Bots `configuration in Slack
1. Add the [Bots](https://screeps.slack.com/apps/A0F7YS25R-bots) slack app to your workspace
1. Click on the Bots app under Custom Integrations
![Bots page](https://imgur.com/HRhvm4q.png)
1. Create or open a configuration for the WelcomeBot
![Configuration Page](https://imgur.com/ivNE36c.png)
1. Edit the `Name`, `Icon` and `Full Name` values in the configuration.
![Edit configuration](https://imgur.com/6EAJIyy.png)
1. Copy the `xoxb-` token after the installation process is complete


#### Run locally
1. Get the code
    * Clone this repo and run `npm install`
    * If you edit this for another slack, you will need to edit your message in [message.js](https://github.com/semperrabbit/ScreepsWelcomeBot/blob/master/src/message.js). 
1. Set values in `.env` (copy `.env.sample`):
	* `SCOPE`: **Do not edit this entry.** These are the required permissions to operate.
    * `TOKEN`: Your bot's `xoxb-` token (available on the edit configuration page)
    * `ID`: Your bot's `Name` (available on the edit configuration page)
    * `PORT`: The port that you want to run the web server on
    * `GENERAL`: the ID of your `#general` channel. You may have to [download an export](https://get.slack.help/hc/en-us/articles/201658943-Export-data-and-message-history)  to retrieve your `#general` channel's ID. (defaults to Screeps slack's `#general` channel)
1. Start the app (`npm start`)


### Bot actions
1. On a `team_join` event, the bot will greet the new user in #general
![](https://imgur.com/7eYWC1W.png)
1. On a `team_join` event, the bot will send a [message](https://github.com/semperrabbit/ScreepsWelcomeBot/blob/master/src/message.js) to the new user in a DM
![](https://imgur.com/F8VGOHu.png)
1. Any user can receive the [message](https://github.com/semperrabbit/ScreepsWelcomeBot/blob/master/src/message.js) by saying anything to the bot in DM
![welcome DM](https://imgur.com/j2K3cX9.png)


### Logging
The bot will show a log of all the RTM actions, based off of the default logging in BotKit.

    U:\profile\Documents\GitHub\ScreepsWelcomeBot>npm start
    
    > ScreepsWelcomeBot@1.0.0 start U:\profile\Documents\GitHub\ScreepsWelcomeBot
    > node src/bot.js
    
    Initializing Botkit v0.6.5
    info: ** No persistent storage method specified! Data may be lost when process shuts down.
    info: ** API CALL: https://slack.com/api/rtm.connect
    notice: ** BOT ID: welcome_bot ...attempting to connect to RTM!
    notice: RTM websocket opened
    info: ** API CALL: https://slack.com/api/chat.postMessage
    info: ** API CALL: https://slack.com/api/im.open
    info: [Start]  0  Task for  U7UUSDW2V in D7VCBH13M
    info: >   [Start]  0  Conversation with  U7UUSDW2V in D7VCBH13M
    info: ** API CALL: https://slack.com/api/chat.postMessage
    info: >   [End]  0  Conversation with  U7UUSDW2V in D7VCBH13M
    info: [End]  0  Task for  U7UUSDW2V in D7VCBH13M