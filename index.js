import askAppleIntelligence from "./api.js";

export let rewrite = askAppleIntelligence("Rewrite");
export let friendly = askAppleIntelligence("Make Friendly");
export let professional = askAppleIntelligence("Make Professional");
export let concise = askAppleIntelligence("Make Concise");

export let askAI = async (
	prompt,
	{ history, command } = { history: [], command: "Rewrite" }
) =>
	await askAppleIntelligence(command)(
		`A conversation between user and assistant. Continue with informational reply or answer.${history.map(
			([user, assistant]) => `user ${user} assistant ${assistant}`
		)} user ${prompt}`
	);

export class Chat {
	#command;

	constructor(history = [], command = "Rewrite") {
		this.history = history;
		this.#command = command;
	}

	async ask(prompt) {
		let res;
		try {
			res = await askAI(prompt, {
				history: this.history,
				command: this.#command,
			});
			this.history.push([prompt, res]);
		} catch (e) {
			console.error("Cannot connect to Apple Intelligence.\n\n" + e);
		}
		return res;
	}
}
