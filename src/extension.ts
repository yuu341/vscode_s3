// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { AWSSettings } from './aws/aws_settings';
import { RegisterAwsCommand } from './commands/register_aws_command';
import { UnregisterAwsCommand } from './commands/unregister_aws_command';
import { ICommand } from './interfaces/command';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-s3" is now active!');



	let commands:ICommand[] = [
		new RegisterAwsCommand(context),
		new UnregisterAwsCommand(context),
	];

	commands.forEach(item => {
		// vscode.window.showInformationMessage(item.command);
		let disposable = vscode.commands.registerCommand(item.command, item.doCommand.bind(item));
		context.subscriptions.push(disposable);
	});

}

// this method is called when your extension is deactivated
export function deactivate() {}
