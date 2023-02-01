const vscode = require("vscode");
let defaultTheme = vscode.workspace
  .getConfiguration()
  .get("workbench.colorTheme");

// Activate the extension
function activate(context) {
  // Create the toggle button
  let toggleButton = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    10000000
  );
  toggleButton.command = "turn-the-light.switch";
  toggleButton.text = "👨🏼‍💻";
  toggleButton.tooltip = "Toggle Theme";
  toggleButton.show();

  context.subscriptions.push(toggleButton);

  // Register the toggle command
  let disposable = vscode.commands.registerCommand(
    "turn-the-light.switch",
    function () {
      // Get the current theme
      let currentTheme = vscode.workspace
        .getConfiguration()
        .get("workbench.colorTheme");

      // Determine the new theme
      let newTheme =
        currentTheme === "Default Light+" ? defaultTheme : "Default Light+";

      // Update the configuration
      vscode.workspace
        .getConfiguration()
        .update("workbench.colorTheme", newTheme, true)
        .then(() => {
          // Update the toggle button text
          toggleButton.text = newTheme === "Default Light+" ? "🔅" : "👨🏼‍💻";

          // Show a message
          vscode.window.showInformationMessage(
            `Theme changed to "${newTheme}"`
          );
        });
    }
  );

  // Add the disposable to the context
  context.subscriptions.push(disposable);
}

// Deactivate the extension
function deactivate() {
  vscode.workspace
    .getConfiguration()
    .update("workbench.colorTheme", defaultTheme, true);
}

module.exports = {
  activate,
  deactivate,
};
