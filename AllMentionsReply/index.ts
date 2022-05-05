import { Plugin } from 'aliucord/entities';
import { getByProps } from 'aliucord/metro';
import { Patcher } from 'aliucord/utils';

// TODO TODO TODO: CLEANUP!!!

export default class AllMentionsReply extends Plugin {
  public start() {
    const FluxDispatcher = getByProps('_currentDispatchActionType', '_subscriptions', '_waitQueue');
    // const ignoreList = [
    //     "MESSAGE_CREATE",
    //     "PRESENCE_UPDATE",
    //     "MESSAGE_DELETE",
    //     "GUILD_MEMBER_ADD",
    //     "MESSAGE_UPDATE",
    //     "MESSAGE_REACTION_ADD",
    //     "VOICE_STATE_UPDATES",
    //     "WINDOW_FOCUS",
    //     "CHANNEL_UNREAD_UPDATE",
    //     "PRESENCE_UPDATES",
    //     "MESSAGE_REACTION_REMOVE",
    //     "MESSAGE_REACTION_REMOVE_ALL",
    //     "TRACK",
    //     "SESSIONS_REPLACE",
    //     "SELF_PRESENCE_STORE_UPDATE",
    //     "EMBEDDED_ACTIVITY_INBOUND_UPDATE",
    //     "GUILD_MEMBER_UPDATE",
    //     "CHANNEL_UPDATES",
    //     "CHANNEL_DELETE",
    //     "UPDATE_CHANNEL_DIMENSIONS",
    //     "MESSAGE_ACK",
    //     "TYPING_START",
    //     "TYPING_STOP",
    // ];
    // after(FluxDispatcher, "dispatch", (_, ...args) => {
    //     if (ignoreList?.includes(args[0].type)) return;
    //     this.logger.warn(args[0]);
    // });

    const { getCurrentUser } = getByProps('getCurrentUser');
    this.logger.warn(getCurrentUser());

    FluxDispatcher.dispatch({
      type: 'MESSAGE_CREATE',
      message: constructMessage('PLACEHOLDER', { id: '0' }),
    });
    const MessageCreate = FluxDispatcher._orderedActionHandlers.MESSAGE_CREATE[1];
    Patcher.before(MessageCreate, 'actionHandler', (_, args) => {
      const clientUser = getCurrentUser();
      const message = args.message;
      if (message.referenced_message) {
        if (!message.mentions) return;
        if (message.mentions.find((m) => m.id !== clientUser.id)) return;
        this.settings.set('messageStore', { message, ...this.settings.get('messageStore', {}) });
      }
      this.logger.warn(this.settings.get('messageStore', {}));
    });

    FluxDispatcher.dispatch({ type: 'LOAD_RECENT_MENTIONS', guildId: null });
    FluxDispatcher.dispatch({ type: 'LOAD_RECENT_MENTIONS_SUCCESS', messages: [] });
    const LoadRecentMentionsSuccess =
      FluxDispatcher._orderedActionHandlers.LOAD_RECENT_MENTIONS_SUCCESS[3];
    Patcher.before(LoadRecentMentionsSuccess, 'actionHandler', (_, args) => {
      let messages = args.messages;
      messages = [constructMessage('hi', { id: '824921608560181261' }), ...messages];
      args.messages = messages;
    });
  }
}

function constructMessage(message, channel) {
  let msg = {
    id: '967590310844706906',
    type: 0,
    content: '',
    channel_id: channel.id,
    author: {
      id: '295468625240915968',
      username: 'funlennysub',
      avatar: '5a6ff8383a961ba5a7a1ca9f6bfefc54',
      discriminator: '6727',
      publicFlags: 640,
      avatarDecoration: null,
    },
    attachments: [],
    embeds: [],
    mentions: [],
    mention_roles: [],
    pinned: false,
    mention_everyone: false,
    tts: false,
    timestamp: '2022-04-24T00:58:27.064000+00:00',
    edited_timestamp: null,
    flags: 0,
    components: [],
  };

  if (typeof message === 'string') msg.content = message;
  else msg = { ...msg, ...message };

  return msg;
}

/* PING MESSAGE {{{
{
    "type": "MESSAGE_CREATE",
    "channelId": "950452852042637395",
    "message": {
        "guild_id": "950452851249922078",
        "attachments": [],
        "author": {
            "avatar": "d355036644a4fbf9a3a862017bec3a2f",
            "discriminator": "5800",
            "id": "787017887877169173",
            "username": "Dziurwa Spoko",
            "publicFlags": 256,
            "avatarDecoration": null
        },
        "channel_id": "950452852042637395",
        "components": [],
        "content": "trying again",
        "edited_timestamp": null,
        "embeds": [],
        "flags": 0,
        "id": "967746078684360704",
        "member": {
            "deaf": false,
            "hoisted_role": "950885958394449940",
            "joined_at": "2022-03-08T22:40:30.578000+00:00",
            "mute": false,
            "roles": [
                "950885958394449940",
                "950885209233031198"
            ]
        },
        "mention_everyone": false,
        "mention_roles": [],
        "mentions": [
            {
                "avatar": "d17479a828696182a4b0e5aafcf98bf9",
                "discriminator": "4650",
                "id": "952185386350829688",
                "username": "Alyxia",
                "publicFlags": 0,
                "avatarDecoration": null
            }
        ],
        "message_reference": {
            "channel_id": "950452852042637395",
            "guild_id": "950452851249922078",
            "message_id": "967746040566534174"
        },
        "nonce": "973916859432697856",
        "pinned": false,
        "referenced_message": {
            "attachments": [],
            "author": {
                "avatar": "d17479a828696182a4b0e5aafcf98bf9",
                "avatar_decoration": null,
                "discriminator": "4650",
                "id": "952185386350829688",
                "public_flags": 0,
                "username": "Alyxia"
            },
            "channel_id": "950452852042637395",
            "components": [],
            "content": "please try again",
            "edited_timestamp": null,
            "embeds": [],
            "flags": 0,
            "id": "967746040566534174",
            "mention_everyone": false,
            "mention_roles": [],
            "mentions": [],
            "pinned": false,
            "timestamp": "2022-04-24T11:17:15.923000+00:00",
            "tts": false,
            "type": 0
        },
        "timestamp": "2022-04-24T11:17:25.011000+00:00",
        "tts": false,
        "type": 19
    },
    "optimistic": false,
    "isPushNotification": false
}
}}} */

/* REPLIED MESSAGE + PING {{{
{
    "type": "MESSAGE_CREATE",
    "channelId": "950452852042637395",
    "message": {
        "guild_id": "950452851249922078",
        "attachments": [],
        "author": {
            "avatar": "d355036644a4fbf9a3a862017bec3a2f",
            "discriminator": "5800",
            "id": "787017887877169173",
            "username": "Dziurwa Spoko",
            "publicFlags": 256,
            "avatarDecoration": null
        },
        "channel_id": "950452852042637395",
        "components": [],
        "content": "im always doing it",
        "edited_timestamp": null,
        "embeds": [],
        "flags": 0,
        "id": "967746294724591626",
        "member": {
            "deaf": false,
            "hoisted_role": "950885958394449940",
            "joined_at": "2022-03-08T22:40:30.578000+00:00",
            "mute": false,
            "roles": [
                "950885958394449940",
                "950885209233031198"
            ]
        },
        "mention_everyone": false,
        "mention_roles": [],
        "mentions": [
            {
                "avatar": "d17479a828696182a4b0e5aafcf98bf9",
                "discriminator": "4650",
                "id": "952185386350829688",
                "username": "Alyxia",
                "publicFlags": 0,
                "avatarDecoration": null
            }
        ],
        "message_reference": {
            "channel_id": "950452852042637395",
            "guild_id": "950452851249922078",
            "message_id": "967746238344757258"
        },
        "nonce": "973917075447742464",
        "pinned": false,
        "referenced_message": {
            "attachments": [],
            "author": {
                "avatar": "d17479a828696182a4b0e5aafcf98bf9",
                "avatar_decoration": null,
                "discriminator": "4650",
                "id": "952185386350829688",
                "public_flags": 0,
                "username": "Alyxia"
            },
            "channel_id": "950452852042637395",
            "components": [],
            "content": "now reply to this message with ping enabled",
            "edited_timestamp": null,
            "embeds": [],
            "flags": 0,
            "id": "967746238344757258",
            "mention_everyone": false,
            "mention_roles": [],
            "mentions": [],
            "pinned": false,
            "timestamp": "2022-04-24T11:18:03.077000+00:00",
            "tts": false,
            "type": 0
        },
        "timestamp": "2022-04-24T11:18:16.519000+00:00",
        "tts": false,
        "type": 19
    },
    "optimistic": false,
    "isPushNotification": false
}
}}}*/
