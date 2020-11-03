import { downloadAndUnzipVSCode } from "vscode-test";
import * as vscode from 'vscode';
import * as aws from 'aws-sdk';
import * as s3 from 'aws-sdk/clients/s3';
import { ICommand } from "../interfaces/command";
import { AWSSettings } from "../aws/aws_settings";

export class RegisterAwsCommand implements ICommand{
    context: vscode.ExtensionContext;


    constructor(context: vscode.ExtensionContext){
        this.context = context;

    }

    command: string = "vscode-s3.aws.register";
    doCommand(): void {
        vscode.window.showInformationMessage('register command');


        let accessKey = "";
        let secretAccessKey = "";
        vscode.window.showInputBox({placeHolder: "Access Key", prompt: "please enter access key."}).then((value) => {
            accessKey = value ?? "";
        });
        
        vscode.window.showInputBox({placeHolder: "Secret Access Key", prompt: "please enter secret access key.", password: true}).then((value) => {
            secretAccessKey = value ?? "";
        });
        
        vscode.window.showInformationMessage(accessKey + ":" + secretAccessKey);
        let s3 = new aws.S3({credentials:{secretAccessKey: secretAccessKey??"", accessKeyId:accessKey??""},region: "ap-northeast-1"});

        s3.listBuckets((err,data) => {
            if(err){
                vscode.window.showErrorMessage(err.message);
                return;
            }

            let uri = this.context.storageUri;

            let result = "";
            data.Buckets?.map(p=>{
                result += p.Name + ",";
            });
            vscode.window.showInformationMessage(result);
        });
    }
}