import { AWSConfig } from "./aws_confing";

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class AWSSettings{
    configs: AWSConfig[] = [];
    readonly filename: string = ".vscode_s3";

    filepath: string;

    constructor(folderpath: string){
        
        this.filepath = path.join(folderpath, this.filename);

        this.load();
    }

    load(){

        fs.readFile(this.filepath,{ encoding:"utf-8" }, (err, data) =>{
            if(err){
                vscode.window.showErrorMessage(err.message);

                this.save();
                return;
            } 
            
            let text = data;
            this.configs = JSON.parse(text) as AWSConfig[];
        });
    }
    
    save(){
        let val = JSON.stringify(this.configs, null);

        fs.writeFile(this.filepath, val, {encoding: "utf-8"} , (err) => {
            if(err){
                vscode.window.showErrorMessage(err.message);
            }
            else{
                vscode.window.showInformationMessage(`設定ファイルを[${this.filepath}]に書き込みました。`);
            }
        });
    }
}