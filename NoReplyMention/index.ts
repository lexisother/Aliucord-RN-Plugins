import { Plugin } from 'aliucord/entities';
import { getByProps } from 'aliucord/metro';
import { Patcher } from 'aliucord/utils';

export default class NoReplyMention extends Plugin {
  public start() {
    const pendingReplyModule = getByProps('createPendingReply');
    Patcher.before(pendingReplyModule, 'createPendingReply', (_, args) => {
      args[0].shouldMention = false;
    });
  }
}
