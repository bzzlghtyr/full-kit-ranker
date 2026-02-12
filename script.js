var lstMember = new Array();
var parent = new Array();
var equal = new Array();
var rec = new Array();
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

    lstMember[n] = new Array();
    for (i = 0; i < namMember.length; i++) {
        lstMember[n][i] = i;
    }
    parent[n] = -1;
    totalSize = 0;
    n++;

    for (i = 0; i < lstMember.length; i++) {
        if (lstMember[i].length >= 2) {
            mid = Math.ceil(lstMember[i].length / 2);
            lstMember[n] = new Array();
            lstMember[n] = lstMember[i].slice(0, mid);
            totalSize += lstMember[n].length;
            parent[n] = i;
            n++;
            lstMember[n] = new Array();
            lstMember[n] = lstMember[i].slice(mid, lstMember[i].length);
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

function sortList(flag) {
    var i;
    var str;

    if (flag < 0) {
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
    } else if (flag > 0) {
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
        cmp1 = cmp1 - 2;
        cmp2 = cmp2 - 2;
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
        str = "Matchup #" + (numQuestion - 1) + "<br>100% sorted.";
        document.getElementById("matchupNumber").innerHTML = str;
        document.getElementById("progressBar").style.display = "none";
        document.getElementById("leftField").style.display = "none";
        document.getElementById("rightField").style.display = "none";
        finishKit = 1;
        showResult();
    } else {
        showImage();
    }
}

function showImage() {
    var completionPercentage = Math.floor(finishSize * 100 / totalSize);
    var bar = document.getElementById("progressBar");
    bar.style.width = completionPercentage + "%";
    bar.innerHTML = "";

    var str0 = "Matchup #" + numQuestion + "<br>" + completionPercentage + "% sorted.";
    
    // Parses data from kitinfo.js (Image | Name | Kit)
    var str1 = namMember[lstMember[cmp1][head1]].split("|")[0];
    var str2 = "<br><span style='font-size:18px; font-weight:bold;'>" + namMember[lstMember[cmp1][head1]].split("|")[1] + "</span>";
    var str3 = "<br><span style='font-size:12px; color:#555;'>" + namMember[lstMember[cmp1][head1]].split("|")[2] + "</span>";

    var str4 = namMember[lstMember[cmp2][head2]].split("|")[0];
    var str5 = "<br><span style='font-size:18px; font-weight:bold;'>" + namMember[lstMember[cmp2][head2]].split("|")[1] + "</span>";
    var str6 = "<br><span style='font-size:12px; color:#555;'>" + namMember[lstMember[cmp2][head2]].split("|")[2] + "</span>";

    document.getElementById("matchupNumber").innerHTML = str0;
    document.getElementById("leftField").innerHTML = str1 + str2 + str3;
    document.getElementById("rightField").innerHTML = str4 + str5 + str6;

    numQuestion++;
}

function showResult() {
    var processedNamMember = namMember.map(item => 
        item.replace("New England", "N.E.")
            .replace("Vancouver Whitecaps FC", "Van. Whitecaps")
    );

    var ranking = 1;
    var sameRank = 1;
    var i;

    var colors = [
        "#00ff57", "#3ef846", "#56f034", "#67e91d", "#75e200", "#80da00", "#89d300", 
        "#91cb00", "#99c300", "#9fbc00", "#a4b400", "#a9ac00", "#aea400", "#b19c00", 
        "#b49400", "#b78c00", "#b98400", "#bb7b00", "#bc7300", "#bd6a00", "#bd6200", 
        "#bd5900", "#bc5000", "#bb4700", "#ba3d00", "#b83300", "#b52700", "#b21a00", 
        "#af0404", "#800000"
    ];

    var str = '<div class="mlsfont">2026 MLS Kit Rankings</div>';
    
    str += '<div class="results-grid" id="capture-area">';

    for (i = 0; i < processedNamMember.length; i++) {
        var memberInfo = processedNamMember[lstMember[0][i]].split("|");
        var imgTag = memberInfo[0];
        var teamName = memberInfo[1];
        var kitName = memberInfo[2];
        var rankColor = colors[ranking - 1] || "#ccc"; 

        str += '<div class="result-card" style="border-top: 10px solid ' + rankColor + ';">';
        str += '  <span class="rank-badge">#' + ranking + '</span>';
        str +=    imgTag; // This contains class="kit-thumb" which CSS will resize
        str += '  <span style="font-weight:bold; font-size:14px; margin-bottom:2px;">' + teamName + '</span>';
        str += '  <span style="font-size:11px; font-style:italic; color:#555;">' + kitName + '</span>';
        str += '</div>';

        if (i < processedNamMember.length - 1) {
            if (equal[lstMember[0][i]] == lstMember[0][i + 1]) {
                sameRank++;
            } else {
                ranking += sameRank;
                sameRank = 1;
            }
        }
    }
    str += '</div>';

    var resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.style.display = "block";
    resultsContainer.innerHTML = str;

    var btnDiv = document.getElementById("screenieButton");
    btnDiv.style.display = "block";
    btnDiv.innerHTML = '<button onclick="screencap()" class="save-btn">Save Image</button>';
}

function screencap() {
    var node = document.getElementById('resultsContainer'); 
    
    domtoimage.toPng(node, { bgcolor: '#ffffff' })
        .then(function (dataUrl) {
            var modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.zIndex = '9999';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            modal.style.display = 'flex';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            modal.style.flexDirection = 'column';
            
            var img = new Image();
            img.src = dataUrl;
            img.style.maxHeight = '80%';
            img.style.maxWidth = '90%';
            img.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';
            img.style.marginBottom = '20px';

            var txt = document.createElement('div');
            txt.innerHTML = "Right click to save image. Click anywhere to close.";
            txt.style.color = "#fff";
            txt.style.fontFamily = "sans-serif";
            txt.style.marginBottom = "10px";

            modal.appendChild(txt);
            modal.appendChild(img);
            
            modal.onclick = function() { document.body.removeChild(modal); };
            document.body.appendChild(modal);
        })
        .catch(function (error) {
            console.error(error);
        });
}

window.onload = function() {
    initList();
    showImage();
};
