// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import fs = require('fs');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "remove-console" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('remove-console', () => {
    // The code you place here will be executed every time your command is executed
    let path: string;
    if(vscode.window.activeTextEditor){
      path = vscode.window.activeTextEditor?.document.uri.path
    }else{
      return
    }
    fs.readFile(path,'utf8',(err: any,data: { toString: any; })=>{
      if (err) {
        throw err
      };
      let str = data.toString()
      if(/console.(.+)\((.+)\)/ig.test(str)){
        str = str.replace(/console.(.+)\((.+)\)/ig,'')
        fs.writeFile(path,str,()=>{
          vscode.window.showInformationMessage('console already remove!');
        })
      }else{
        vscode.window.showInformationMessage('have no console');
      }
      
    })
		// Display a message box to the user
	});
  
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
