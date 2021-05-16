import * as vscode from 'vscode';
import { extensionStructure } from './app';
import type { ExtensionCommandName, ExtensionHandler } from './app';

const _registerCommand = (context: vscode.ExtensionContext, commandName: ExtensionCommandName, commandHandler: ExtensionHandler): void => {
	let disposable = vscode.commands.registerCommand(commandName, () => {
		commandHandler(context);
	});

	context.subscriptions.push(disposable);
}

export function activate(context: vscode.ExtensionContext) {
	for (let [commandName, commandHandler] of Object.entries(extensionStructure)) {
		_registerCommand(context, commandName, commandHandler);
	}	
	
}

export function deactivate() {}
