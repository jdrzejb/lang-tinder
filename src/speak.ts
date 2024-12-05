type Lang = "pl" | "en";

export function speakText(text: string, lang: Lang) {
  if (!text) return;

  // Check if the browser supports the Web Speech API
  if ("speechSynthesis" in window) {
    // Create a new instance of SpeechSynthesisUtterance
    const utterance = new SpeechSynthesisUtterance(text);

    // Optional: Set the language (e.g., 'en-US')
    // Attempt to select a Polish voice
    const voices = window.speechSynthesis.getVoices();
    const polishVoices = voices.filter((voice) => voice.lang.startsWith(lang));

    if (polishVoices.length > 0) {
      utterance.voice = polishVoices[0]; // Select the first available Polish voice
    }

    // Optional: Set other properties
    utterance.pitch = 1; // Range: 0 to 2
    utterance.rate = 0.5; // Range: 0.1 to 10
    utterance.volume = 1; // Range: 0 to 1
    // Speak the text
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Sorry, your browser does not support text-to-speech functionality.");
  }
}
