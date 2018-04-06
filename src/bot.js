require('dotenv').config();
const {PORT, SCOPE, TOKEN, ID, GENERAL} = process.env;
const controller = require('botkit').slackbot({clientId: ID, scopes: [SCOPE], retry: Number.POSITIVE_INFINITY});
const mBot = controller.spawn({token: TOKEN})
const welcomeMessage = require(__dirname + '/message.js')

const WHISPER_PERCENT = 0.975; // The likelyhood of whispering in #general
const GREETINGS = ['Hi', 'Hello', 'Welcome', 'Welcome to Screeps chat'];
const EMOJIS    = [':slightly_smiling_face::left_hand_wave:', ':right_hand_wave::slightly_smiling_face:', ':upside_down_right_hand_wave::upside_down_face:', ':upside_down_face::upside_down_left_hand_wave:'];

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

controller.hears('welcomebot', ['direct_mention', 'mention', 'ambient'], function(bot, message){
	try{
		if(message.channel != 'C85PY93JA'){
			bot.startConversationInThread(message, function(err, thread){
				thread.say('Lets discuss this in <#C85PY93JA|welcomebot-dev> :slightly_smiling_face:');
			});
		}
	} catch(e){console.log(e);}
})

mBot.startRTM(function(err,bot,payload) {
	if (err) {
		console.log(err);
		throw new Error('Could not connect to Slack');
	}
});
