require('dotenv').config();
const {PORT, SCOPE, TOKEN, ID, GENERAL} = process.env;
const controller = require('botkit').slackbot({clientId: ID, scopes: [SCOPE], retry: Number.POSITIVE_INFINITY});
const mBot = controller.spawn({token: TOKEN})
const welcomeMessage = require(__dirname + '/message.js')

const WHISPER_PERCENT = 0.5; // The likelyhood of whispering in #general
const GREETINGS = ['Hi', 'Hello', 'Welcome', 'Welcome to Screeps chat'];
const EMOJIS    = [':slightly_smiling_face::wave:', ':wave:', ':slightly_smiling_face:', ':upside_down_face:', ':upside_down_face::wave:'];

const greeting = ()=>GREETINGS[Math.floor(Math.random()*GREETINGS.length)];
const emoji    = ()=>EMOJIS   [Math.floor(Math.random()*EMOJIS.length)];

controller.on('team_join', function(bot, event){
	console.log(`Saying hello at ${Date.now()}`);
	try{ // say hello in #general
			mBot.replyWithTyping({channel: GENERAL, user: event.user.id}, // fake the funk for `message` param
				{ text:      `${greeting()}, <@${event.user.id}>. ${emoji()}`,
				  ephemeral: (Math.random() <= WHISPER_PERCENT)});
	}catch(e){console.log(e);}
	try{ // DM welcome and rules
		mBot.startPrivateConversation(
			{ user: event.user.id},function(err,dm) {
				dm.say(welcomeMessage);
			});
	}catch(e){console.log(e);}
});

controller.on('direct_message', function(bot, message){
	try{ // reply to any post not in the below `.hears()` in DM with rules
		bot.reply(message, welcomeMessage);
	}catch(e){console.log(e);}
});

// Users sometimes say, "Thank you for welcoming [username], WelcomeBot"
controller.hears(/thank[\s\S]+for[\s\S+]welcom[\s\S]+WelcomeBot/i,  ['direct_message', 'direct_mention', 'mention', 'ambient'], function(bot, message){
	console.log('I heard someone thanking me');
	bot.replyWithTyping(message, 'You\'re welcome, <@' + message.user + '>. Thank you for thanking me. :smile:');
});

// Users sometimes say, "go home, WelcomeBot, you're drunk"
controller.hears(/go\s+home,?[\s\S]?welcomebot,?[\s\S]?you'?re[\s\S]?drunk/i, ['direct_message', 'direct_mention', 'mention', 'ambient'], function(bot, message){
	bot.replyWithTyping(message, 'I am *not* ducking frunk!! _hiccups_');
});

mBot.startRTM(function(err,bot,payload) {
	if (err) {
		console.log(err);
		throw new Error('Could not connect to Slack');
	}
});
