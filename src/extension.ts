// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "playwright-vscode-trace-viewer" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('playwright-vscode-trace-viewer.helloWorld', (...args) => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from playwright-vscode-trace-viewer!');

		let path = null;
		if (args && args.length > 0) {
			path = args[0].fsPath;
			// if zip file
			const shellExec = new vscode.ShellExecution(`npx playwright show-trace ${path} `);

			try {

				vscode.tasks.executeTask(
					new vscode.Task({ type: 'typesinstaller' },
						vscode.TaskScope.Workspace,
						'TypesInstaller',
						'Types Installer',
						shellExec,
						'npm'));
			} catch (error) {
				console.log(error)
			}
		} else {
			return;
		}




		// const editor = vscode.window.activeTextEditor;
		// if (editor) {
		// 	console.log('has context')
		// 	const p = editor.document.uri.path;
		// 	console.log(p)
		// 	// if (!editor.document.fileName.endsWith('zip')) {
		// 	// 	return;
		// 	// }
		// 	const shellExec = new vscode.ShellExecution(`npx playwright show-trace C:\\ryanrosello-og\\vscode-ext\\pw-tyscript\\test-results\\tests-foo-dev-Page\\trace.zip `);

		// 	vscode.tasks.executeTask(
		// 		new vscode.Task({ type: 'typesinstaller' },
		// 			vscode.TaskScope.Workspace,
		// 			'TypesInstaller',
		// 			'Types Installer',
		// 			shellExec,
		// 			'npm'));
		// }
		// vscode.window.setStatusBarMessage(`files.length > ${args.length}`, 3000);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
