import { downloadAndUnzipVSCode } from "vscode-test";
import * as vscode from 'vscode';
import { ICommand } from "../interfaces/command";

export class UnregisterAwsCommand implements ICommand{
    context: vscode.ExtensionContext;

    constructor(context: vscode.ExtensionContext){
      this.context = context;

  }
  
  command: string = "vscode-s3.aws.unregister";
  doCommand(): void {
    vscode.window.showInformationMessage('unregister command');
  }
}