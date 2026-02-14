// --- SUPABASE SETUP ---
const SUPABASE_URL = 'https://vwzibkmtlnqyjrmqvjcp.supabase.co';
const SUPABASE_KEY = 'sb_publishable_rK690mconY77dTIDtxFHcA_S5oLuTAe';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Global variable to hold the final data
var finalKitRankingsData = [];

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

// PRELOAD IMAGES
function prefetchImages() {
    for (var i = 0; i < namMember.length; i++) {
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = namMember[i].split('|')[0];
        var img = tempDiv.querySelector('img');
        if (img) {
            var newImg = new Image();
            newImg.src = img.src;
        }
    }
}

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
        
        // Hide Battle UI
        document.getElementById("mainTable").style.display = "none";
        document.getElementById("screenieButton").style.display = "none";
        
        // Trigger Canvas Generation
        generateCanvasPoster();
        
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

// --- NEW CANVAS GENERATION ENGINE ---
function generateCanvasPoster() {
    // Show Loading Overlay
    var overlay = document.getElementById('loadingOverlay');
    overlay.style.display = 'flex';

    var processedNamMember = namMember.map(item => 
        item.replace("New England", "N.E.")
            .replace("Vancouver Whitecaps FC", "Van. Whitecaps")
    );

    var colors = [
        "#00ff57", "#3ef846", "#56f034", "#67e91d", "#75e200", "#80da00", "#89d300", 
        "#91cb00", "#99c300", "#9fbc00", "#a4b400", "#a9ac00", "#aea400", "#b19c00", 
        "#b49400", "#b78c00", "#b98400", "#bb7b00", "#bc7300", "#bd6a00", "#bd6200", 
        "#bd5900", "#bc5000", "#bb4700", "#ba3d00", "#b83300", "#b52700", "#b21a00", 
        "#af0404", "#800000"
    ];

    // Canvas Settings
    var cols = 5;
    var rows = Math.ceil(processedNamMember.length / cols);
    var cardWidth = 180;
    var cardHeight = 260; // Enough space for top bar, rank, image, text
    var gap = 10;
    var padding = 20;
    var headerHeight = 60;
    
    var canvasWidth = (cols * cardWidth) + ((cols - 1) * gap) + (padding * 2);
    var canvasHeight = headerHeight + (rows * cardHeight) + ((rows - 1) * gap) + (padding * 2);

    var canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    var ctx = canvas.getContext('2d');

    // Draw Background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw Header
    ctx.fillStyle = "#000000";
    ctx.font = "32px MLS, sans-serif"; // Tries to use MLS font, falls back to sans
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("2026 MLS KIT RANKINGS", canvasWidth / 2, padding + (headerHeight / 2) - 10);

    // HELPER: Load Image Promise
    function loadImage(src) {
        return new Promise((resolve, reject) => {
            var img = new Image();
            img.crossOrigin = "Anonymous"; 
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error("Failed to load " + src));
            img.src = src;
        });
    }

    // HELPER: Draw Wrapped Text
    function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';
        var lines = [];
        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = ctx.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            lines.push(line);
            line = words[n] + ' ';
          } else {
            line = testLine;
          }
        }
        lines.push(line);
        
        for(var k=0; k<lines.length; k++){
            ctx.fillText(lines[k], x, y + (k*lineHeight));
        }
    }

    // Prepare Tasks
    var tasks = [];
    var ranking = 1;
    var sameRank = 1;

    for (var i = 0; i < processedNamMember.length; i++) {
        (function(index, rank) {
            var dataRaw = processedNamMember[lstMember[0][index]];
            
            // Extract Data manually from string
            // Format: "<img src='path'> |<b>Name</b>|<i>Kit</i>|"
            var parts = dataRaw.split('|');
            var imgTag = parts[0];
            var imgUrl = imgTag.match(/src=['"](.*?)['"]/)[1];
            var teamName = parts[1].replace(/<\/?b>/g, "");
            var kitName = parts[2].replace(/<\/?i>/g, "");
            var rankColor = colors[rank - 1] || "#ccc";

            var col = index % cols;
            var row = Math.floor(index / cols);
            
            var x = padding + (col * (cardWidth + gap));
            var y = padding + headerHeight + (row * (cardHeight + gap));

            // Push the drawing task
            tasks.push(
                loadImage(imgUrl).then(img => {
                    // 1. Draw Card Background (optional border/shadow effect)
                    // ctx.strokeStyle = "#e0e0e0";
                    // ctx.strokeRect(x, y, cardWidth, cardHeight);

                    // 2. Draw Top Color Bar
                    ctx.fillStyle = rankColor;
                    ctx.fillRect(x, y, cardWidth, 10);

                    // 3. Draw Rank #
                    ctx.fillStyle = "#333333";
                    ctx.font = "bold 20px sans-serif";
                    ctx.textAlign = "center";
                    ctx.fillText("#" + rank, x + cardWidth/2, y + 40);

                    // 4. Draw Image (Scaled to fit 140px height max)
                    var imgH = 150;
                    var imgW = cardWidth - 20;
                    // Maintain aspect ratio
                    var scale = Math.min(imgW / img.width, imgH / img.height);
                    var drawW = img.width * scale;
                    var drawH = img.height * scale;
                    var drawX = x + (cardWidth - drawW) / 2;
                    var drawY = y + 55 + (imgH - drawH) / 2; // Center in the image area

                    ctx.drawImage(img, drawX, drawY, drawW, drawH);

                    // 5. Draw Team Name
                    ctx.fillStyle = "#000000";
                    ctx.font = "bold 14px sans-serif";
                    ctx.fillText(teamName, x + cardWidth/2, y + 225);

                    // 6. Draw Kit Name
                    ctx.fillStyle = "#666666";
                    ctx.font = "italic 11px sans-serif";
                    ctx.fillText(kitName, x + cardWidth/2, y + 245);
                })
            );

        })(i, ranking);

        // Rank Logic
        if (i < processedNamMember.length - 1) {
            if (equal[lstMember[0][i]] == lstMember[0][i + 1]) {
                sameRank++;
            } else {
                ranking += sameRank;
                sameRank = 1;
            }
        }
    }

    // Execute all draws then show result
    Promise.all(tasks).then(() => {
        var dataUrl = canvas.toDataURL("image/png");
        overlay.style.display = 'none';
        showModal(dataUrl);
    }).catch(err => {
        console.error(err);
        overlay.style.display = 'none';
        alert("Error generating image.");
    });
}

function showModal(dataUrl) {
    var modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.zIndex = '100000'; 
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.flexDirection = 'column';
    
    var img = new Image();
    img.src = dataUrl;
    
    // Fit to screen visually, but source is high-res
    img.style.maxWidth = '95%';
    img.style.maxHeight = '80vh'; 
    img.style.objectFit = 'contain'; 
    img.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';
    img.style.borderRadius = '4px';

    var txt = document.createElement('div');
    txt.innerHTML = "Right click (or long press) to save.<br>Click anywhere to close.";
    txt.style.color = "#fff";
    txt.style.fontFamily = "sans-serif";
    txt.style.textAlign = "center";
    txt.style.marginBottom = "15px";
    txt.style.fontSize = "14px";

    modal.appendChild(txt);
    modal.appendChild(img);
    
    modal.onclick = function() { document.body.removeChild(modal); };
    document.body.appendChild(modal);
}

window.onload = function() {
    prefetchImages();
    initList();
    showImage();
};
