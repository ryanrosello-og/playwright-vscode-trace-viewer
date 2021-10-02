// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "playwright-vscode-trace-viewer" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('playwright-vscode-trace-viewer.helloWorld', async (...args) => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from playwright-vscode-trace-viewer!');

		let path = null;
		if (args && args.length > 0) {
			path = args[0].fsPath;
			// if zip file
			let t = await vscode.tasks.fetchTasks();

			// vscode.tasks.taskExecutions[0].task.execution


			const shellExec = new vscode.ShellExecution(`npx playwright show-trace ${path} `);
			let tsk = new vscode.Task({ type: `typesinstaller${Math.random()}` },
				vscode.TaskScope.Workspace,
				`typesinstaller${Math.random()}`,
				`typesinstaller${Math.random()}`,
				shellExec,
				'npm')
			tsk.isBackground = true
			tsk.runOptions.reevaluateOnRerun = true
			try {
				vscode.tasks.executeTask(tsk
				);
			} catch (error) {
				console.log(error)
			}
		} else {
			return;
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
