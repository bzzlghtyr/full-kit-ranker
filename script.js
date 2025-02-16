function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

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

function initList() {
  var n = 0;
  var mid;
  var i;
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

function sortList(kit) {
  var i;
  var str;
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
    str = "Matchup #" + (numQuestion - 1) + "<br>" + Math.floor(finishSize * 100 / totalSize) + "% sorted.";
    document.getElementById("matchupNumber").innerHTML = str;
    document.getElementById("progressBar").style.display = "none";
    showResult();
    finishKit = 1;
  } else {
    showImage();
  }
}

function showResult() {
  var processedNamMember = namMember.map(item =>
    item.replace(/\/png\//g, "/png/150x/").replace("2025 ", "")
  );
  var ranking = 1;
  var sameRank = 1;
  var str = "";
  var i;

  // Muted HSL colors
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
  str += "<tr>";
  str += "<td colspan='8' style='margin:0; padding:0;'><hr style='margin:0; padding:0;'></td>";
  str += "</tr>";

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
  
  // Add extra space at bottom to avoid clipping
  str += "<div style='height:40px;'></div>";

  document.getElementById("resultsContainer").innerHTML = str;
  document.getElementById("resultsContainer").style.display = "block";
  document.getElementById("screenieButton").innerHTML =
    "<br><button onclick='generateShareableImage()' style='font-size:20px; padding:10px 20px; background-color:#ccc; border:none; border-radius:5px'>Show Results</button>";
  document.getElementById("screenieButton").style.display = "block";
}





function showImage() {
  var completionPercentage = Math.floor(finishSize * 100 / totalSize);
  var progressBar = '<div style="width:auto; height:30px; background-color:#f0f0f0; border:1px solid #ccc; border-radius:5px; margin:10px auto;">';
  progressBar += '<div style="width:' + completionPercentage + '%; height:100%; background-color:#4caf50; border-radius:5px;"></div>';
  progressBar += '</div>';
  var str0 = "Matchup #" + numQuestion + "<br>" + completionPercentage + "% sorted.";
  var str1 = "<div style='width:300px; height:300px; background-color:white; margin:0 auto;'>" + namMember[lstMember[cmp1][head1]].split("|")[0] + "</div>";
  var str2 = "<div style='width:300px; text-align:center; font-size:18px;'>" + namMember[lstMember[cmp1][head1]].split("|")[1] + "</div>";
  var str3 = "<div style='width:300px; text-align:center; font-size:12px;'>" + namMember[lstMember[cmp1][head1]].split("|")[2] + "</div>";
  var str4 = "<div style='width:300px; height:300px; background-color:white; margin:0 auto;'>" + namMember[lstMember[cmp2][head2]].split("|")[0] + "</div>";
  var str5 = "<div style='width:300px; text-align:center; font-size:18px;'>" + namMember[lstMember[cmp2][head2]].split("|")[1] + "</div>";
  var str6 = "<div style='width:300px; text-align:center; font-size:12px;'>" + namMember[lstMember[cmp2][head2]].split("|")[2] + "</div>";
  document.getElementById("matchupNumber").innerHTML = str0;
  document.getElementById("leftField").innerHTML = str1 + str2 + str3;
  document.getElementById("rightField").innerHTML = str4 + str5 + str6;
  numQuestion++;
  document.getElementById("progressBar").innerHTML = progressBar;
}

function toNameFace(n) {
  var str = namMember[n];
  return str;
}

function generateShareableImage() {
  var container = document.getElementById("resultsContainer");
  var clone = container.cloneNode(true);
  clone.style.position = 'absolute';
  clone.style.left = '0';
  clone.style.top = '0';
  document.body.appendChild(clone);
  var width = clone.scrollWidth;
  var height = clone.scrollHeight;

  domtoimage.toPng(clone, { width: width, height: height })
    .then(function(dataUrl) {
      document.body.removeChild(clone);
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
    })
    .catch(function(error) {
      console.error("Error generating shareable image", error);
      document.body.removeChild(clone);
    });
}


/*
// Fancy layout functions are currently commented out.
function showFancyLayout() {
  let processedNamMember = namMember.map(item =>
    item.replace(/\/png\//g, "/png/150x/").replace("2025 ", "")
  );
  let str = `
  <div style="font-family:Arial, sans-serif; width:1000px; margin:0 auto; text-align:center; background:#fff; border:1px solid #ccc; padding:10px;">
    <h2 style="font-size:32px; margin-bottom:5px;">Fancy Results Layout</h2>
    <hr style="margin:10px 0;">
    <div style="display:flex; justify-content:space-between; margin-bottom:20px;">
      <div style="width:48%; border:3px solid green; padding:10px;">
        <h3 style="font-size:24px; margin:5px 0;">Best Kit</h3>`;
  let bestIndex = lstMember[0][0];
  let bestKit = processedNamMember[bestIndex].split("|");
  str += `
        <div style="font-size:14px;">
          ${bestKit[0]}<br>
          <b>${bestKit[1]}</b><br>
          <i>${bestKit[2]}</i>
        </div>
      </div>
      <div style="width:48%; border:3px solid red; padding:10px;">
        <h3 style="font-size:24px; margin:5px 0;">Worst Kit</h3>`;
  let worstIndex = lstMember[0][lstMember[0].length - 1];
  let worstKit = processedNamMember[worstIndex].split("|");
  str += `
        <div style="font-size:14px;">
          ${worstKit[0]}<br>
          <b>${worstKit[1]}</b><br>
          <i>${worstKit[2]}</i>
        </div>
      </div>
    </div>
    <h3 style="font-size:20px; margin-bottom:10px;">Full Ranking</h3>
    <table style="width:100%; font-size:14px; border:0; background:#fff;" align="center">
  `;
  for (let i = 0; i < processedNamMember.length; i++) {
    if (i % 4 === 0) {
      str += "<tr>";
    }
    let kitInfo = processedNamMember[lstMember[0][i]].split("|");
    str += `<td style="border:1px solid #ccc; padding:5px; text-align:center;">
             <span style="font-size:12px; font-weight:bold;">#${i+1}</span><br>
             ${kitInfo[0]}<br>
             <span style="font-size:10px;">${kitInfo[1]}</span><br>
             <span style="font-size:8px;">${kitInfo[2]}</span>
             </td>`;
    if ((i + 1) % 4 === 0) {
      str += "</tr>";
    }
  }
  if (processedNamMember.length % 4 !== 0) {
    str += "</tr>";
  }
  str += "</table></div>";
  document.getElementById("fancyResultsContainer").innerHTML = str;
  document.getElementById("fancyResultsContainer").style.display = "block";
  document.getElementById("fancyScreenieButton").innerHTML = "<br><button onclick='generateFancyShareableImage()' style='font-size:20px; padding:10px 20px; background-color:#ccc; border:none; border-radius:5px'>Show Fancy Image</button>";
  document.getElementById("fancyScreenieButton").style.display = "block";
}

function generateFancyShareableImage() {
  let container = document.getElementById("fancyResultsContainer");
  let width = container.scrollWidth;
  let height = container.scrollHeight;
  domtoimage.toPng(container, { width: width, height: height })
    .then(function(dataUrl) {
      let modal = document.createElement('div');
      modal.style.position = 'fixed';
      modal.style.zIndex = '9999';
      modal.style.top = '0';
      modal.style.left = '0';
      modal.style.width = '100vw';
      modal.style.height = '100vh';
      modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
      modal.style.display = 'flex';
      modal.style.justifyContent = 'center';
      modal.style.alignItems = 'center';
      let img = new Image();
      img.src = dataUrl;
      img.style.maxWidth = '90%';
      img.style.maxHeight = '90%';
      modal.appendChild(img);
      modal.addEventListener('click', function() {
        document.body.removeChild(modal);
      });
      document.body.appendChild(modal);
    })
    .catch(function(error) {
      console.error("Error generating fancy shareable image", error);
    });
}
*/
// shortcut to finish ranking quickly for testing
document.addEventListener("keydown", function(e) {
  if (e.ctrlKey && e.shiftKey && e.key === "F") {
    // Only trigger if ranking is not yet finished
    if (cmp1 >= 0) {
      finishKit = 1; // simulate finishing
      showResult();
      console.log("Hidden shortcut triggered: finishing ranking.");
    }
  }
});

initList();
showImage();
