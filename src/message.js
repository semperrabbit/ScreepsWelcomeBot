const welcomeMessage = {
	as_user: true,
	link_names: true,
	text: `Welcome to the Screeps Slack! We\'re glad you\'re here.

Below are a few do\'s and dont\'s for the slack. Note that the Do Not\'s are things that you may receive warnings or a ban for based off of severity and repeated offenses. All warnings, temporary bans and permanant bans are at the moderators\' discretion.

The community here is usually a friendly and helpful group, but should you run into any issues, please bring them up to the moderators.`,
	attachments: [
		{
			title: 'Do:',
			fields: [
				{value: 'Check #announcements for updates, but do not respond to post or attempt discussion in that channel. You may react to posts with emojis'},
				{value: 'Discuss announcements in #announcements-any'},
				{value: 'Ask for assistance in #help, not #general'},
				{value: 'Ask permission before removing pinned posts or modifying integrations'},
				{value: 'Try to keep the discussions in line with the channel you\'re in'},
			],
			mrkdwn_in: ['fields'],
			color: '#40C040',
		},
		{
			title: 'Do Not:',
			fields: [
				{value: 'Remove others\' pinned posts without permission'},
				{value: 'Remove/reconfigure others\' integrations without permissions'},
				{value: 'Disrespect people who were asking for help in #help'},
				{value: 'Threaten physical injury or harass anyone'},
				{value: 'Refuse to disengage from serious arguments when asked to by an admin'},
				{value: 'Repeatedly provoke serious arguments'},
				{value: 'Engage in sexual harassment'},
			],
			mrkdwn_in: ['fields'],
			color: '#C02020',
		},
		{
			title: 'Moderators',
			fields: [
				{value: '@atavus'},
				{value: '@daboross'},
				{value: '@dissi  (community manager)'},
				{value: '@o4kapuk(community manager)'},
				{value: '@semperrabbit'},
			],
			mrkdwn_in: ['fields'],
			color: '#74c8ed',
		},
		{
			title: 'Helpful Links:',
			fields: [
				{value: '*API*: http://docs.screeps.com/api/'},
				{value: '*Game source code*: https://github.com/Screeps'},
				{value: '*Alliances*: http://www.leagueofautomatednations.com'},
				{value: '*Wiki*: https://wiki.screepspl.us'},
				{value: '*Third party tools*: http://docs.screeps.com/third-party.html'},
				{value: '*Screeps World*: https://screepsworld.com/'},
				{value: '*Spawning room recommendation*: https://screepsworld.com/2017/07/warning-novice-zones-are-lies-where-to-spawn-as-a-noob/'},
			],
			mrkdwn_in: ['fields'],
		}],
};
module.exports = welcomeMessage;