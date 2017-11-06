require('dotenv').config();
const {PORT, SCOPE, TOKEN, ID} = process.env;
const welcomeMessage = {
	as_user: true,
	link_names: true,
	text: `Welcome to the Screeps Slack! We\'re glad you\'re here.

Below are a few do\'s and dont\'s for the slack. Note that the Do Not\'s are things that you may receive warnings or a ban for based off of severity and repeated offenses. All warnings, temporary bans and permanant bans are at the moderators\' discretion.

The community here is usually a friendly and helpful group, but should you run into any issues, please bring them up to the moderators.`,
	attachments: [
		{
			title: 'Do:',
			text: `* Check #announcements for updates, but do not respond to post or attempt discussion in that channel. You may react to posts with emojis
* Discuss announcements in #announcements-any
* Ask for assistance in #help, not #general
* Ask permission before removing pinned posts or modifying integrations
* Try to keep the discussions in line with the channel you\'re in`,
			color: '#40C040',
		},
		{
			title: 'Do Not:',
			text: `* Remove others' pinned posts without permission
* Remove/reconfigure others' integrations without permissions
* Disrespect people who were asking for help in #help
* Threaten physical injury or harass anyone
* Refuse to disengage from serious arguments when asked to by an admin
* Repeatedly provoke serious arguments
* Engage in sexual harassment`,
			color: '#FF0000',
		},
		{
			title: 'Moderators',
			text: `@atavus
@daboross
@dissi  (community manager)
@o4kapuk(community manager)
@semperrabbit`,
			color: '#74c8ed',
		},
		{
			title: 'Helpful Links:',
			text: `*API*: http://docs.screeps.com/api/
*Game source code*: https://github.com/Screeps
*Alliances*: http://www.leagueofautomatednations.com
*Wiki*: https://wiki.screepspl.us
*Third party tools*: http://docs.screeps.com/third-party.html
*Screeps World*: https://screepsworld.com/
*Spawning room recommendation*: https://screepsworld.com/2017/07/warning-novice-zones-are-lies-where-to-spawn-as-a-noob/`,
		}],
};

var controller = require('botkit').slackbot({
    clientId: ID,
    scopes: [SCOPE],
});

var mBot = controller.spawn({
	token: TOKEN
})

controller.on('direct_message', function(bot, message){
	try{
		controller.storage.users.get(message.user, function(err, user) {
			if (user && user.name) {
				bot.reply(message, welcomeMessage);
			} else {
				bot.reply(message, welcomeMessage);
			}
		});
	}catch(e){
		console.log(e);
	}
});

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

controller.hears('', ['ambient', 'direct_mention', 'mention'], function(bot, message){
//console.log(message);
//	bot.getMessageUser(message, (err, user)=>{
//		console.log(user.username);
//	});
});

mBot.startRTM(function(err,bot,payload) {
	if (err) {
		console.log(err);
		throw new Error('Could not connect to Slack');
	}
});