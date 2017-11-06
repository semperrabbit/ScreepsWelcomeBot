require('dotenv').config();
const {PORT, SCOPE, TOKEN, ID} = process.env;
const controller = require('botkit').slackbot({
    clientId: ID,
    scopes: [SCOPE],
    retry: Number.POSITIVE_INFINITY
});

const mBot = controller.spawn({
	token: TOKEN
})

const welcomeMessage = require(__dirname + '/message.js')

controller.on('team_join', function(bot, event){
	try{ // say hello in #general
		mBot.reply({channel: 'C0HJGK1L2', user: event.user.id}, // hardcode id for #general
			`Welcome, ${event.user.profile.display_name}. :slightly_smiling_face::wave:`
		);
	}catch(e){
		console.log(e);
	}
	try{ // DM welcome and rules
		mBot.startPrivateConversation(
			{ user: event.user.id},function(err,dm) {
				dm.say(welcomeMessage);
			});
	}catch(e){
		console.log(e);
	}
});

controller.on('direct_message', function(bot, message){
	try{ // reply to @'s and DMs with rules
		bot.reply(message, welcomeMessage);
	}catch(e){
		console.log(e);
	}
});

mBot.startRTM(function(err,bot,payload) {
	if (err) {
		console.log(err);
		throw new Error('Could not connect to Slack');
	}
});
