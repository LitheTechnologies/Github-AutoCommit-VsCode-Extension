import * as vscode from 'vscode';
import simpleGit from 'simple-git';
import * as fs from 'fs';
import * as path from 'path';

let gitRepoName: string | undefined = undefined;

async function promptForRepoName() {
    const repoName = await vscode.window.showInputBox({
        placeHolder: 'Enter GitHub Repository Name',
        prompt: 'Please enter the GitHub repository name (e.g., your-username/your-repo)',
    });

    if (repoName) {
        gitRepoName = repoName;
        vscode.window.showInformationMessage(`Repository set to: ${gitRepoName}`);
    } else {
        vscode.window.showErrorMessage('Repository name is required!');
    }
}

const homeDirectory = process.env.HOME || process.env.USERPROFILE || '';
const gitCommitPath = path.resolve(homeDirectory, 'your-commit-directory');

// Check if directory exists, if not, create it
if (!fs.existsSync(gitCommitPath)) {
    fs.mkdirSync(gitCommitPath, { recursive: true });
}

const git = simpleGit(gitCommitPath);

async function initializeGitRepo() {
    try {
        // Check if .git directory exists, if not, initialize git
        if (!fs.existsSync(path.join(gitCommitPath, '.git'))) {
            await git.init(); // Initialize the Git repository
            vscode.window.showInformationMessage('Git repository initialized.');
        } else {
            vscode.window.showInformationMessage('Git repository already initialized.');
        }
    } catch (error) {
        vscode.window.showErrorMessage(`Error initializing Git repository: ${error}`);
    }
}

async function addRemote() {
    if (!gitRepoName) {
        vscode.window.showErrorMessage('Repository name not set!');
        return;
    }

    const remoteUrl = `https://github.com/${gitRepoName}.git`;

    try {
        // Check if the remote already exists
        const remotes = await git.getRemotes();
        const remoteExists = remotes.some(remote => remote.name === 'origin');

        if (!remoteExists) {
            // Add the remote only if it doesn't exist
            await git.addRemote('origin', remoteUrl);
            vscode.window.showInformationMessage(`Remote added: ${remoteUrl}`);
        } else {
            vscode.window.showInformationMessage('Remote already exists.');
        }
    } catch (error) {
        vscode.window.showErrorMessage(`Error adding remote: ${error}`);
    }
}


function getActiveEditorText(): string | undefined {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const document = editor.document;
        return document.getText();
    }
    return undefined;
}

async function commitAndPushFileToRepo(content: string) {
    const commitFilePath = path.join(gitCommitPath, `committed_file_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.txt`);

    fs.writeFileSync(commitFilePath, content);

    try {
        // Pull the latest changes from the remote before committing
        await git.pull('origin', 'main');
        
        // Commit the changes
        await git.add(commitFilePath).commit(`Auto-commit at ${new Date().toISOString()}`);
        vscode.window.showInformationMessage('File committed successfully!');
        
        // Push the changes to the remote
        await git.push('origin', 'main');
        vscode.window.showInformationMessage('File pushed to GitHub!');
    } catch (error) {
        vscode.window.showErrorMessage(`Error committing or pushing file: ${error}`);
    }
}


function startAutoCommit() {
    setInterval(async () => {
        const content = getActiveEditorText();
        if (content) {
            try {
                await commitAndPushFileToRepo(content);
                console.log("File committed and pushed successfully");
            } catch (error) {
                console.error(`Error in auto-commit or push: ${error}`);
            }
        }
    }, 600000);  // Every 10 minutes
}


export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.startAutoCommit', async () => {
        console.log('Auto-commit command executed');

        if (!gitRepoName) {
            await promptForRepoName(); // Prompt for repository name
        }

        if (gitRepoName) {
            vscode.window.showInformationMessage(`Repository set to: ${gitRepoName}`);
            vscode.window.showInformationMessage('Auto-commit started!');
            startAutoCommit(); // Start auto-commit process
        } else {
            vscode.window.showErrorMessage('Auto-commit cannot start without a repository name!');
        }
    });

    context.subscriptions.push(disposable);
}