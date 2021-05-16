import * as vscode from 'vscode';
import { EmailNotifier } from './notifications';
import { getUserInput } from './utils';

import type { Notifier } from './notifications'

type ExtensionCommandName = string
type ExtensionHandler = Function
type ExtensionStructure = {
    [key: string]: ExtensionHandler
}

const setupEmailCreds = async (context: vscode.ExtensionContext): Promise<void> => {
    const emailUser = await getUserInput('Enter email username');
    const emailPassword = await getUserInput('Enter email password');
    const emailTo = await getUserInput('Enter email to address');

    if (emailUser && emailPassword && emailTo) {
        const notifier = new EmailNotifier(emailUser, emailPassword, emailTo)

        context.globalState.update('notifier', notifier);
    } else {
        context.globalState.update('notifier', null);
    }
}

const noteHandler = async (context: vscode.ExtensionContext): Promise<void> => {
    const notifier = <Notifier>context.globalState.get('notifier')

    if (notifier === null) return
    const result = await getUserInput('Enter new note');

    if (result) {
        notifier.notify(result);
    }
}

const extensionStructure: ExtensionStructure = {
    'codenotes.setup': setupEmailCreds,
    'codenotes.note': noteHandler,
}

export { extensionStructure, ExtensionCommandName, ExtensionHandler }