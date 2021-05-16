import * as vscode from 'vscode';

const debugLog = (message: string): void => {
  vscode.window.showInformationMessage(message);
}

const getUserInput = async (label: string = 'Enter your value'): Promise<string | null> => {
  const inputValue = await vscode.window.showInputBox({
    title: label,
  });

  return inputValue ? inputValue : null
}

export { debugLog, getUserInput }
