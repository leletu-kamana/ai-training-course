// checker.js — heuristic "self-check" for pasted writing
// This is NOT an AI-detection tool. It only reflects a few simple,
// transparent text patterns back at the student for self-reflection.
// Beginner-friendly: plain var, for loops

var GENERIC_TRANSITIONS = [
  "furthermore", "moreover", "in conclusion", "it is important to note",
  "additionally", "in today's society", "overall", "in summary",
  "it is worth noting", "as previously mentioned"
];

var FIRST_PERSON_WORDS = [
  "i think", "i believe", "in my view", "in my opinion", "i feel",
  "my own", "i would argue", "i found", "personally"
];

function countCharacters(text) {
  return text.length;
}

function splitIntoSentences(text) {
  var trimmed = text.trim();
  if (trimmed === "") {
    return [];
  }
  var parts = trimmed.split(/[.!?]+/);
  var sentences = [];
  for (var i = 0; i < parts.length; i++) {
    var cleaned = parts[i].trim();
    if (cleaned.length > 0) {
      sentences.push(cleaned);
    }
  }
  return sentences;
}

function getSentenceLengths(sentences) {
  var lengths = [];
  for (var i = 0; i < sentences.length; i++) {
    var wordCount = sentences[i].split(/\s+/).length;
    lengths.push(wordCount);
  }
  return lengths;
}

function calculateAverage(numbers) {
  if (numbers.length === 0) {
    return 0;
  }
  var sum = 0;
  for (var i = 0; i < numbers.length; i++) {
    sum = sum + numbers[i];
  }
  return sum / numbers.length;
}

function calculateStandardDeviation(numbers, average) {
  if (numbers.length === 0) {
    return 0;
  }
  var sumSquaredDiffs = 0;
  for (var i = 0; i < numbers.length; i++) {
    var diff = numbers[i] - average;
    sumSquaredDiffs = sumSquaredDiffs + (diff * diff);
  }
  var variance = sumSquaredDiffs / numbers.length;
  return Math.sqrt(variance);
}

function countOccurrences(text, phraseList) {
  var lowerText = text.toLowerCase();
  var count = 0;
  for (var i = 0; i < phraseList.length; i++) {
    if (lowerText.indexOf(phraseList[i]) !== -1) {
      count = count + 1;
    }
  }
  return count;
}

function runSelfCheck() {
  var input = document.getElementById("checkerInput");
  var resultBox = document.getElementById("checkerResult");
  var metaBox = document.getElementById("checkerMeta");
  var text = input.value;

  resultBox.className = "checker-result";
  metaBox.innerHTML = "";

  if (text.trim().length < 40) {
    resultBox.classList.add("show", "neutral");
    resultBox.innerHTML = "<strong>Not enough text yet.</strong> Paste at least a few sentences for a meaningful check.";
    return;
  }

  var sentences = splitIntoSentences(text);
  var lengths = getSentenceLengths(sentences);
  var avgLength = calculateAverage(lengths);
  var stdDev = calculateStandardDeviation(lengths, avgLength);

  var transitionCount = countOccurrences(text, GENERIC_TRANSITIONS);
  var firstPersonCount = countOccurrences(text, FIRST_PERSON_WORDS);

  var warningSignals = 0;
  var notes = [];

  if (firstPersonCount === 0) {
    warningSignals = warningSignals + 1;
    notes.push("No first-person framing detected (e.g. \"I think\", \"in my view\"). Worth checking if this is meant to be your own analysis.");
  } else {
    notes.push("Found some first-person framing — a good sign this reflects your own voice.");
  }

  if (stdDev < 3 && sentences.length >= 4) {
    warningSignals = warningSignals + 1;
    notes.push("Sentence lengths are very uniform. Natural writing usually has more variation between short and long sentences.");
  } else if (sentences.length >= 4) {
    notes.push("Sentence length varies naturally across the paragraph.");
  }

  if (transitionCount >= 3) {
    warningSignals = warningSignals + 1;
    notes.push("Several generic transition phrases appear close together (e.g. \"furthermore\", \"moreover\"). Fine occasionally, but stacking them can be a sign the text wasn't reworked into your own style.");
  }

  var resultLevel = "good";
  var headline = "Looks like your own voice.";
  if (warningSignals === 2) {
    resultLevel = "neutral";
    headline = "A couple of things worth a second look.";
  } else if (warningSignals >= 3) {
    resultLevel = "flag";
    headline = "Worth rereading before you submit.";
  }

  resultBox.classList.add("show", resultLevel);

  var html = "<strong>" + headline + "</strong><ul style='margin-top:10px; padding-left:18px; list-style:disc;'>";
  for (var i = 0; i < notes.length; i++) {
    html += "<li style='margin-bottom:6px;'>" + notes[i] + "</li>";
  }
  html += "</ul>";
  resultBox.innerHTML = html;

  metaBox.innerHTML =
    "<span>" + sentences.length + " sentences</span>" +
    "<span>avg " + avgLength.toFixed(1) + " words/sentence</span>" +
    "<span>variation: " + stdDev.toFixed(1) + "</span>";

  // Mark the checker as "used" in the progress tracker, if available
  if (typeof saveProgressItem === "function") {
    saveProgressItem("checker");
  }
}

function clearChecker() {
  document.getElementById("checkerInput").value = "";
  document.getElementById("checkerResult").className = "checker-result";
  document.getElementById("checkerResult").innerHTML = "";
  document.getElementById("checkerMeta").innerHTML = "";
  updateCharCount();
}

function updateCharCount() {
  var input = document.getElementById("checkerInput");
  var countLabel = document.getElementById("charCount");
  countLabel.textContent = input.value.length + " characters";
}

document.addEventListener("DOMContentLoaded", function () {
  var runBtn = document.getElementById("checkerBtn");
  var clearBtn = document.getElementById("checkerClearBtn");
  var input = document.getElementById("checkerInput");

  runBtn.addEventListener("click", runSelfCheck);
  clearBtn.addEventListener("click", clearChecker);
  input.addEventListener("input", updateCharCount);
});