import { exec } from "child_process";

export default (command) => async (input) => {
	const formattedInput = input;

	const appleScriptCommand = `
    set a to path to frontmost application as text
    
    tell application "TextEdit"
        activate
        set theDoc to make new document with properties {text:"${formattedInput}"}
        tell application "System Events"
            keystroke "a" using {command down}
        end tell
        tell application "System Events"
            tell process "TextEdit"
                click menu bar item "Edit" of menu bar 1
                click menu item "Writing Tools" of menu "Edit" of menu bar item "Edit" of menu bar 1
                click menu item "${command}" of menu 1 of menu item "Writing Tools" of menu "Edit" of menu bar item "Edit" of menu bar 1
            end tell
        end tell
    end tell

    tell application "System Events"
        tell process "TextEdit"
            set copyMenuItem to menu item "Copy" of menu "Edit" of menu bar item "Edit" of menu bar 1
            
            set canCopy to true
            
            repeat while canCopy
                set canCopy to enabled of copyMenuItem
            end repeat
            
            repeat while not canCopy
                set canCopy to enabled of copyMenuItem
            end repeat
        end tell
    end tell

    set res to text of theDoc
    tell application "TextEdit" to close window 1 saving no
    activate application a
    return res
    `;

	return new Promise((resolve, reject) => {
		exec(`osascript -e '${appleScriptCommand}'`, (error, stdout, stderr) => {
			if (error) {
				reject(`Error executing osascript: ${error.message}`);
				return;
			}
			if (stderr) {
				reject(`stderr: ${stderr}`);
				return;
			}

			resolve(stdout);
		});
	});
};
