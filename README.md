# `apple-intelligence`

The NPM package to interact with Apple Intelligence through JavaScript.

> _Note_: This is powered through **app automation**. It will only work locally on Mac devices. Learn more about [how this works](#how-does-this-work).

## Installation

Simply run the following command, with your favorite JS package manager!

```
npm install apple-intelligence
```

## API

This package gives you access to 4 Apple Intelligence Writing Tool commands (Rewrite, Make Friendly, Make Professional, Make Concise), as well as the ability to directly ask a query to or chat with Apple Intelligence through a Prompt Injection. **All methods are asynchronous**.

### Writing Tool Commands

The 4 Writing Tool commands simply take a single input with your prompt.

```javascript
import { rewrite, friendly, professional, concise } from "apple-intelligence";

console.log(await rewrite("Hello, world"));
console.log(await friendly("Hello, world"));
console.log(await professional("Hello, world"));
console.log(await concise("Hello, world"));
```

### Ask AI Command

This command takes a input, and uses a prompt injection so you can get a normal LLM-like response. You can also choose to:

1. Pass in a history of prior conversations as context in the format `[userQuery, assistantResponse][]` (Default `[]`)
2. Choose which command the injection runs with. Pass in a Writing Tool function. (Default `rewrite`)

```javascript
import { askAI, professional } from "apple-intelligence";

// Ask normally
console.log(await askAI("What is 1+1?"));

// Ask with context
console.log(
	await askAI("Bear", {
		history: [
			["Cat", "Meow"],
			["Dog", "Woof"],
		],
	})
);

// Ask with another command
console.log(
	await askAI("What's 1+1?", {
		command: professional,
	})
);
```

### Chat Class

The `Chat` class automatically handles history for you. When creating the class, you can optionally pass in history and a command to use, just like the `askAI` function.

The `Chat.ask()` method takes one argument, the query.

```js
import { Chat, professional } from "apple-intelligence";

// Chat normally
let myChat = new Chat();
console.log(await myChat.ask("Who's the first president?"));
console.log(await myChat.ask("Who came after him?"));

// Chat with configuration
let otherChat = new Chat({
	history: [["Who's the first president?", "George Washington"]],
	command: professional,
});
```

## How does this work?

Under the hood, it opens the TextEdit app, with a file that has the input as content, and uses Writing Tools to apply the command to the app. Then, it waits until the text can be copied (showing that the writing tools have completed), then returns the text in that file. It also closes the file without saving to reduce garbage buildup.

Because this is automation based, results may be unexpected. I am not responsible if anything goes wrong in the automation process, though it should rarely be destructive in any way. Please report anything that goes wrong in issues, or submit a PR to fix it.