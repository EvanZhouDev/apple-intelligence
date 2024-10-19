import askAppleIntelligence from "./api.js";

export let rewrite = askAppleIntelligence("Rewrite");
export let friendly = askAppleIntelligence("Make Friendly");
export let professional = askAppleIntelligence("Make Professional");
export let concise = askAppleIntelligence("Make Concise");

export let askAI = async (prompt, { history = [], command = rewrite } = {}) =>
	await command(
		`A conversation between user and assistant. Continue with informational reply or answer.${history
			.map(([user, assistant]) => ` user ${user} assistant ${assistant}`)
			.join("")} user ${prompt}`
	);

export class Chat {
	#command;

	constructor({ history = [], command = rewrite } = {}) {
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
