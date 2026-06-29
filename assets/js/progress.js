// progress.js — tracks course progress across pages using localStorage
// Beginner-friendly: plain var, for loops

var PROGRESS_KEY = "aiEthicsCourseProgress";
var TRACKED_ITEMS = ["module1", "module2", "module3", "module4", "module5", "quiz", "checker"];

function getProgress() {
  var stored = localStorage.getItem(PROGRESS_KEY);
  if (!stored) {
    return {};
  }
  try {
    return JSON.parse(stored);
  } catch (err) {
    return {};
  }
}

function saveProgressItem(itemKey) {
  var progress = getProgress();
  progress[itemKey] = true;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  renderProgressBar();
}

function getCompletedCount() {
  var progress = getProgress();
  var count = 0;
  for (var i = 0; i < TRACKED_ITEMS.length; i++) {
    if (progress[TRACKED_ITEMS[i]]) {
      count = count + 1;
    }
  }
  return count;
}

function renderProgressBar() {
  var container = document.getElementById("progressTrack");
  if (!container) {
    return;
  }

  var completed = getCompletedCount();
  var total = TRACKED_ITEMS.length;
  var percent = Math.round((completed / total) * 100);

  var html = "";
  html += '<span class="progress-label font-mono">Your progress: ' + completed + ' / ' + total + '</span>';
  html += '<div class="progress-bar-outer"><div class="progress-bar-inner" style="width:' + percent + '%;"></div></div>';
  html += '<span class="progress-label font-mono">' + percent + '%</span>';

  container.innerHTML = html;
}

// Mark a module as read when its <details> is opened for the first time
function attachModuleTracking() {
  var moduleDetails = document.querySelectorAll("[data-module-key]");
  for (var i = 0; i < moduleDetails.length; i++) {
    var detailsEl = moduleDetails[i];
    detailsEl.addEventListener("toggle", function () {
      if (this.open) {
        var key = this.getAttribute("data-module-key");
        saveProgressItem(key);
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  renderProgressBar();
  attachModuleTracking();
});