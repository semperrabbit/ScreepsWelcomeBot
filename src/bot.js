require('dotenv').config();
const {PORT, SCOPE, TOKEN, ID, GENERAL} = process.env;
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
		if(event.user.profile.display_name != '') {
			mBot.replyWithTyping({channel: GENERAL, user: event.user.id}, // fake the funk for `message` param
				`Welcome, ${event.user.profile.display_name}. :slightly_smiling_face::wave:`
			);
		} else {
			mBot.getMessageUser({channel: GENERAL, user: event.user.id}, // fake the funk for `message` param
				(err, profile)=>{ // try to get the user name if event is missing it
					if(err){ throw new Error(err); }
					if(profile.username != '') {
						mBot.replyWithTyping({channel: GENERAL, user: profile.id}, // fake the funk
							`Welcome, ${profile.username}. :slightly_smiling_face::wave:`);			
					} else { // no username in event or user info inquiry.
						mBot.replyWithTyping({channel: GENERAL, user: profile.id}, // fake the funk
							`Welcome to Screeps Slack. :slightly_smiling_face::wave:`);
					}
				}
			)
		}
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
