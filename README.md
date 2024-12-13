# AutoCommitter - VS Code Extension

The **AutoCommitter** extension for Visual Studio Code automatically commits and pushes changes to a specified GitHub repository every 10 minutes. It's a useful tool for developers who want to save their progress periodically without having to manually commit and push changes.

## Features

- **Auto Commit and Push**: Automatically commits and pushes changes from the active file to a GitHub repository.
- **Customizable GitHub Repository**: Configure your GitHub repository using the extension prompt.
- **Periodic Commit**: Configurable to commit and push changes every 10 minutes.
- **Commit History**: The file is committed with a timestamp in its name for tracking.

## Installation

1. Install the extension from the **VS Code Marketplace**.
2. Open the **Command Palette** (`Ctrl+Shift+P` or `Cmd+Shift+P`) and search for `AutoCommitter`.
3. Configure your GitHub repository when prompted, or use the command `AutoCommitter: Set Repository` to set the repository manually.
4. Start the auto-commit process by running the `AutoCommitter: Start Auto Commit` command from the Command Palette.

## Requirements

- **Git**: Ensure you have Git installed on your system. Create a Repository name your-commit-directory in the user path (ex: C:/Users/User/your-commit-directory). Initialize git in the directory and create a main branch .
- **GitHub**: You need a GitHub account and a repository to commit the changes.
- **Node.js**: The extension uses Node.js for backend processing.

## Usage

1. **Set Repository**: When you first run the extension, you'll be prompted to enter your GitHub repository (in the format `username/repository-name`).
2. **Start Auto Commit**: Once the repository is set, run the `AutoCommitter: Start Auto Commit` command to start the automatic commit process.
3. **Commit Interval**: The extension will commit the file every 10 minutes with the current contents and push it to your GitHub repository.
4. **Log File**: The committed file will be saved with the name `committed_file <timestamp>.txt` in the Git repository.

## How It Works

1. **Auto Commit**: The extension reads the active file content and commits it to the local Git repository.
2. **Push Changes**: The changes are pushed to the GitHub repository that you configure.
3. **Interval**: The commit and push process occurs every 10 minutes. You can modify this duration in the code if necessary.

## Commands

- `AutoCommitter: Set Repository`: Set or change the GitHub repository for commits.
- `AutoCommitter: Start Auto Commit`: Start the automatic commit process.
- `AutoCommitter: Stop Auto Commit`: Stop the automatic commit process.



Contributions are welcome! Please feel free to fork the repository, submit pull requests, or open issues for suggestions and bugs.

## Troubleshooting

- **Error committing or pushing**: If you encounter errors related to pushing commits, ensure that your local repository is correctly set up, and the repository URL is accurate.
- **Personal Access Token**: When setting up the extension, you may be asked to provide a GitHub Personal Access Token for authentication. You can create one in your GitHub account settings u
