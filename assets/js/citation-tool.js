// citation-tool.js — interactive style picker for the citation guide
// Beginner-friendly: plain var, for loops

var CITATION_TEMPLATES = {
  apa: {
    label: "APA (7th edition)",
    intext: "(OpenAI, 2026)",
    fullEntry: "OpenAI. (2026). ChatGPT (Mar 2026 version) [Large language model]. https://chat.openai.com",
    note: "Cite the AI tool as if it were the author of a software/model, with a reference list entry."
  },
  harvard: {
    label: "Harvard",
    intext: "(Claude, Anthropic 2026)",
    fullEntry: "Anthropic (2026) Claude [Large language model]. Available at: https://claude.ai (Accessed: 28 June 2026).",
    note: "Cite the company as author, with the access date — common in South African and UK institutions."
  },
  mla: {
    label: "MLA (9th edition)",
    intext: "Not typically used in-text; cite in the works-cited list only.",
    fullEntry: "\"Describe the causes of the French Revolution\" prompt. ChatGPT, 24 Mar. version, OpenAI, 28 June 2026, chat.openai.com.",
    note: "Include the actual prompt you used as part of the works-cited entry."
  }
};

function renderStyleOutput(styleKey) {
  var data = CITATION_TEMPLATES[styleKey];
  var output = document.getElementById("styleOutput");

  var html = "";
  html += "<p class='tag mb-1'>" + data.label + "</p>";
  html += "<div style='background:var(--paper-dim); padding:14px; border-radius:2px; font-family:\"JetBrains Mono\", monospace; font-size:0.82rem; line-height:1.6; margin-bottom:10px; overflow-x:auto;'>";
  html += "<p class='muted-light mb-1'>In-text:</p><p class='mb-2'>" + data.intext + "</p>";
  html += "<p class='muted-light mb-1'>Reference / works-cited entry:</p><p>" + data.fullEntry + "</p>";
  html += "</div>";
  html += "<p class='text-sm muted'>" + data.note + "</p>";

  output.innerHTML = html;
}

function setActiveTab(selectedBtn) {
  var allTabs = document.querySelectorAll(".style-tab");
  for (var i = 0; i < allTabs.length; i++) {
    allTabs[i].classList.remove("btn");
    allTabs[i].classList.add("btn-outline");
  }
  selectedBtn.classList.remove("btn-outline");
  selectedBtn.classList.add("btn");
}

document.addEventListener("DOMContentLoaded", function () {
  var tabs = document.querySelectorAll(".style-tab");

  for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function () {
      var styleKey = this.getAttribute("data-style");
      setActiveTab(this);
      renderStyleOutput(styleKey);
    });
  }

  // Default to APA on load
  renderStyleOutput("apa");
  setActiveTab(tabs[0]);
});