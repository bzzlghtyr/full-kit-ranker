// -------------------------
// Shuffle Array
// -------------------------
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// -------------------------
// Global Variables
// -------------------------
var lstMember = [];
var parent = [];
var equal = [];
var rec = [];
var cmp1, cmp2;
var head1, head2;
var nrec;
var numQuestion;
var totalSize;
var finishSize;
var finishKit;
var cachedImageUrl = null;  // For caching the generated image

// -------------------------
// Initialize Ranking List
// -------------------------
function initList() {
  var n = 0, mid, i;
  shuffleArray(namMember);
  lstMember[n] = [];
  for (i = 0; i < namMember.length; i++) {
    lstMember[n][i] = i;
  }
  parent[n] = -1;
  totalSize = 0;
  n++;
  for (i = 0; i < lstMember.length; i++) {
    if (lstMember[i].length >= 2) {
      mid = Math.ceil(lstMember[i].length / 2);
      lstMember[n] = lstMember[i].slice(0, mid);
      totalSize += lstMember[n].length;
      parent[n] = i;
      n++;
      lstMember[n] = lstMember[i].slice(mid);
      totalSize += lstMember[n].length;
      parent[n] = i;
      n++;
    }
  }
  for (i = 0; i < namMember.length; i++) { 
    rec[i] = 0; 
  }
  nrec = 0;
  for (i = 0; i <= namMember.length; i++) { 
    equal[i] = -1; 
  }
  cmp1 = lstMember.length - 2;
  cmp2 = lstMember.length - 1;
  head1 = 0;
  head2 = 0;
  numQuestion = 1;
  finishSize = 0;
  finishKit = 0;
}

// -------------------------
// Sorting Logic
// -------------------------
function sortList(kit) {
  var i;
  if (kit < 0) {
    rec[nrec] = lstMember[cmp1][head1];
    head1++;
    nrec++;
    finishSize++;
    while (equal[rec[nrec - 1]] != -1) {
      rec[nrec] = lstMember[cmp1][head1];
      head1++;
      nrec++;
      finishSize++;
    }
  } else if (kit > 0) {
    rec[nrec] = lstMember[cmp2][head2];
    head2++;
    nrec++;
    finishSize++;
    while (equal[rec[nrec - 1]] != -1) {
      rec[nrec] = lstMember[cmp2][head2];
      head2++;
      nrec++;
      finishSize++;
    }
  } else {
    rec[nrec] = lstMember[cmp1][head1];
    head1++;
    nrec++;
    finishSize++;
    while (equal[rec[nrec - 1]] != -1) {
      rec[nrec] = lstMember[cmp1][head1];
      head1++;
      nrec++;
      finishSize++;
    }
    equal[rec[nrec - 1]] = lstMember[cmp2][head2];
    rec[nrec] = lstMember[cmp2][head2];
    head2++;
    nrec++;
    finishSize++;
    while (equal[rec[nrec - 1]] != -1) {
      rec[nrec] = lstMember[cmp2][head2];
      head2++;
      nrec++;
      finishSize++;
    }
  }
  if (head1 < lstMember[cmp1].length && head2 == lstMember[cmp2].length) {
    while (head1 < lstMember[cmp1].length) {
      rec[nrec] = lstMember[cmp1][head1];
      head1++;
      nrec++;
      finishSize++;
    }
  } else if (head1 == lstMember[cmp1].length && head2 < lstMember[cmp2].length) {
    while (head2 < lstMember[cmp2].length) {
      rec[nrec] = lstMember[cmp2][head2];
      head2++;
      nrec++;
      finishSize++;
    }
  }
  if (head1 == lstMember[cmp1].length && head2 == lstMember[cmp2].length) {
    for (i = 0; i < lstMember[cmp1].length + lstMember[cmp2].length; i++) {
      lstMember[parent[cmp1]][i] = rec[i];
    }
    lstMember.pop();
    lstMember.pop();
    cmp1 -= 2;
    cmp2 -= 2;
    head1 = 0;
    head2 = 0;
    if (head1 == 0 && head2 == 0) {
      for (i = 0; i < namMember.length; i++) {
        rec[i] = 0;
      }
      nrec = 0;
    }
  }
  if (cmp1 < 0) {
    var str = "Matchup #" + (numQuestion - 1) + "<br>" + Math.floor(finishSize * 100 / totalSize) + "% sorted.";
    document.getElementById("matchupNumber").innerHTML = str;
    document.getElementById("progressBar").style.display = "none";
    
    // Log final ranking immediately when sorting is complete
    var finalRanking = JSON.stringify(lstMember[0]);
    logResult(finalRanking);
    
    showResult();
    finishKit = 1;
  } else {
    showImage();
  }
}

// -------------------------
// Display Standard Results
// -------------------------
function showResult() {
  var processedNamMember = namMember.map(item =>
    item.replace(/\/png\//g, "/png/150x/").replace("2025 ", "")
  );
  var ranking = 1;
  var sameRank = 1;
  var str = "";
  var i;
  var colors = [
    "hsl(120,40%,80%)", "hsl(116,40%,80%)", "hsl(112,40%,80%)", "hsl(108,40%,80%)",
    "hsl(104,40%,80%)", "hsl(100,40%,80%)", "hsl(96,40%,80%)", "hsl(92,40%,80%)",
    "hsl(88,40%,80%)", "hsl(84,40%,80%)", "hsl(80,40%,80%)", "hsl(76,40%,80%)",
    "hsl(72,40%,80%)", "hsl(68,40%,80%)", "hsl(64,40%,80%)", "hsl(60,40%,80%)",
    "hsl(56,40%,80%)", "hsl(52,40%,80%)", "hsl(48,40%,80%)", "hsl(44,40%,80%)",
    "hsl(40,40%,80%)", "hsl(36,40%,80%)", "hsl(32,40%,80%)", "hsl(28,40%,80%)",
    "hsl(24,40%,80%)", "hsl(20,40%,80%)", "hsl(16,40%,80%)", "hsl(12,40%,80%)",
    "hsl(8,40%,80%)",  "hsl(4,40%,80%)",  "hsl(0,40%,80%)",  "hsl(0,40%,80%)"
  ];

  str += "<table cellspacing='0' cellpadding='0' style='width:1250px; font-size:16px; background-color:#FFF; border:0; margin:0; padding:0;' align='center'>";
  str += "<tr>";
  str += "<td colspan='8' style='text-align:left; font-weight:bold; font-size:24px; font-family:Arial; margin:0; padding:0;'>MLS Kit Rankings</td>";
  str += "</tr>";
  str += "<tr>";
  str += "<td colspan='8' style='text-align:right; font-size:10px; font-family:Arial; margin:0; padding:0;'>Created by: Joseph Même | @ThreeDEF</td>";
  str += "</tr>";
  str += "<tr><td colspan='8' style='margin:0; padding:0;'><hr style='margin:0; padding:0;'></td></tr>";

  for (i = 0; i < processedNamMember.length; i++) {
    if (i % 8 === 0) {
      str += "<tr style='height:auto; margin:0; padding:0;'>";
    }
    var memberInfo = processedNamMember[lstMember[0][i]].split("|");
    let bgColor = colors[ranking - 1];
    var teamName = memberInfo[1];
    var teamFontSize = teamName.length > 18 ? "10px" : "11px";
    str += "<td style='border:1px solid #00025d; margin:0; padding:2px; background-color:" + bgColor +
           "; font-size:12px; text-align:center; font-weight:bolder; font-family:Arial; white-space:nowrap;'>";
    str += "#" + ranking + ": <span style='font-size:" + teamFontSize + ";'>" + teamName + "<br>" + memberInfo[0] + "</span><br>";
    str += "<span style='font-size:8px; line-height:10px;'>" + memberInfo[2] + "</span></td>";
    if ((i + 1) % 8 === 0) {
      str += "</tr>";
    }
    if (i < processedNamMember.length - 1) {
      if (equal[lstMember[0][i]] == lstMember[0][i + 1]) {
        sameRank++;
      } else {
        ranking += sameRank;
        sameRank = 1;
      }
    }
  }
  if (processedNamMember.length % 8 !== 0) {
    str += "</tr>";
  }
  str += "</table>";
  str += "<div style='height:40px;'></div>";

  document.getElementById("resultsContainer").innerHTML = str;
  document.getElementById("resultsContainer").style.display = "block";
  document.getElementById("screenieButton").innerHTML =
    "<br><button onclick='generateShareableImage()' style='font-size:20px; padding:10px 20px; background-color:#ccc; border:none; border-radius:5px'>Show Results</button>";
  document.getElementById("screenieButton").style.display = "block";
}

// -------------------------
// Display Current Matchup
// -------------------------
function showImage() {
  var completionPercentage = Math.floor(finishSize * 100 / totalSize);
  var progressBar = '<div style="width:auto; height:30px; background-color:#f0f0f0; border:1px solid #ccc; border-radius:5px; margin:10px auto;">';
  progressBar += '<div style="width:' + completionPercentage + '%; height:100%; background-color:#4caf50; border-radius:5px;"></div>';
  progressBar += '</div>';
  var str0 = "Matchup #" + numQuestion + "<br>" + completionPercentage + "% sorted.";
  document.getElementById("matchupNumber").innerHTML = str0;
  
  var leftParts = namMember[lstMember[cmp1][head1]].split("|");
  var rightParts = namMember[lstMember[cmp2][head2]].split("|");
  
  var str1 = "<div style='width:300px; height:300px; background-color:white; margin:0 auto;'>" + leftParts[0] + "</div>";
  str1 += "<div style='width:300px; text-align:center; font-size:18px;'>" + leftParts[1] + "</div>";
  str1 += "<div style='width:300px; text-align:center; font-size:12px;'>" + leftParts[2] + "</div>";

  var str2 = "<div style='width:300px; height:300px; background-color:white; margin:0 auto;'>" + rightParts[0] + "</div>";
  str2 += "<div style='width:300px; text-align:center; font-size:18px;'>" + rightParts[1] + "</div>";
  str2 += "<div style='width:300px; text-align:center; font-size:12px;'>" + rightParts[2] + "</div>";

  document.getElementById("leftField").innerHTML = str1;
  document.getElementById("rightField").innerHTML = str2;
  
  numQuestion++;
  document.getElementById("progressBar").innerHTML = progressBar;
}

// -------------------------
// Generate Shareable Image with Caching
// -------------------------
function generateShareableImage() {
  if (cachedImageUrl) {
    showModalWithImage(cachedImageUrl);
    return;
  }
  
  var container = document.getElementById("resultsContainer");
  var clone = container.cloneNode(true);
  clone.style.position = 'absolute';
  clone.style.left = '0';
  clone.style.top = '0';
  document.body.appendChild(clone);
  var width = clone.scrollWidth;
  var height = clone.scrollHeight;
  
  domtoimage.toPng(clone, { width: width, height: height, scale: 2 })
    .then(function(dataUrl) {
      cachedImageUrl = dataUrl;
      document.body.removeChild(clone);
      showModalWithImage(dataUrl);
    })
    .catch(function(error) {
      console.error("Error generating shareable image", error);
      document.body.removeChild(clone);
    });
}

function showModalWithImage(dataUrl) {
  var modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.zIndex = '9999';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  modal.style.display = 'flex';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';

  var img = new Image();
  img.src = dataUrl;
  img.style.maxWidth = '90%';
  img.style.maxHeight = '90%';

  modal.appendChild(img);
  modal.addEventListener('click', function() {
    document.body.removeChild(modal);
  });
  document.body.appendChild(modal);
}

// -------------------------
// Log Final Result to Google Form
// -------------------------
function logResult(resultData) {
  if (localStorage.getItem("rankingLogged")) return;
  var uniqueID = localStorage.getItem("uniqueID") || Date.now().toString();
  localStorage.setItem("uniqueID", uniqueID);

  var formData = new FormData();
  // Replace these with your actual Google Form field IDs
  formData.append("entry.1203843018", resultData);
  formData.append("entry.1862921466", uniqueID);

  var googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSfd63tHUzTeRVjnBeRX3z7Y87wfH38W9NzjgXmgQV8Hgv_MKg/formResponse";

  fetch(googleFormURL, {
    method: "POST",
    mode: "no-cors",
    body: formData
  }).then(function() {
    localStorage.setItem("rankingLogged", "true");
    console.log("Result logged successfully (no-cors).");
  }).catch(function(error) {
    console.error("Error logging result:", error);
  });
}

// -------------------------
// Hidden Shortcut for Testing
// -------------------------
document.addEventListener("keydown", function(e) {
  if (e.ctrlKey && e.shiftKey && e.key === "F") {
    if (cmp1 >= 0) {
      finishKit = 1;
      sortList(-1);
      console.log("Hidden shortcut triggered: finishing ranking.");
    }
  }
});

// -------------------------
// Initialize and Show First Matchup
// -------------------------
initList();
showImage();
