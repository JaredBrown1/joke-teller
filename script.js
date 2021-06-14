const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disable/Enable button
function toggleButton() {
	button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS Api
function tellMe(joke) {
	console.log("tell me:", joke);
	VoiceRSS.speech({
		key: "f130b13e475048c09217045094d918a7",
		src: joke,
		hl: "en-us",
		v: "Linda",
		r: 0,
		c: "mp3",
		f: "44khz_16bit_stereo",
		ssml: false,
	});
}

// Get Jokes from Joke API
async function getJokes() {
	let joke = "";
	const apiUrl =
		"https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,explicit";
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		if (data.setup) {
			joke = `${data.setup} ... ${data.delivery}`;
		} else {
			joke = data.joke;
		}
		// Text-to-speech
		tellMe(joke);
		// Disable Button
		toggleButton();
	} catch (error) {
		// Catch Errors Here
		console.log("whoops", error);
	}
}

// Event Listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
