import * as vscode from 'vscode';

export async function activate(context: vscode.ExtensionContext) {

	console.log('"playwright-vscode-trace-viewer" is now active!');

	let disposable = vscode.commands.registerCommand('playwright-vscode-trace-viewer.show', async (...args) => {
		let path = null;
		if (args && args.length > 0) {
			path = args[0].fsPath;
			if (!path.endsWith('zip')) {
				vscode.window.showInformationMessage('Please select a valid Playwright Trace file');
				return;
			}
			try {
				const p: vscode.ShellQuotedString = {
					value: path,
					quoting: vscode.ShellQuoting.Strong
				};
		
				const shellExec = new vscode.ShellExecution('npx', ['playwright', 'show-trace', p]);
				const tsk = new vscode.Task({ type: `shell` },
					vscode.TaskScope.Workspace,
					`trace-viewer${Math.random()}` ,
					'shell',
					shellExec);
				vscode.tasks.executeTask(tsk);
			} catch (error) {
				vscode.window.showErrorMessage('Unable to open Playwright trace file: ' + error);
			}
		} else {
			return;
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
