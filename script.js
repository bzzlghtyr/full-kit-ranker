// --- SUPABASE SETUP ---
const SUPABASE_URL = 'https://vwzibkmtlnqyjrmqvjcp.supabase.co';
const SUPABASE_KEY = 'sb_publishable_rK690mconY77dTIDtxFHcA_S5oLuTAe';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Define what list is currently being ranked
const CURRENT_TEMPLATE_ID = 'mls_2026'; 

// Global variable to hold the final data
var finalKitRankingsData = [];

// --- SORTING VARIABLES ---
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
        // Update progress bar
        document.getElementById("matchupNumber").innerHTML = "Matchup #" + (numQuestion - 1) + "<br>100% sorted.";
        
        // Hide the Battle UI
        document.getElementById("progressBarContainer").style.display = "none";
        document.getElementById("mainTable").style.display = "none";
        
        finishKit = 1;
        
        // --- 1. SEND TO DATABASE (Standard Mode) ---
        captureAndSubmitResults(false);
        
        // --- 2. GENERATE IMAGE ---
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

// --- DEBUG FUNCTION ---
// Attached to the red button in index.html
function debugAutoSort() {
    console.log("Debug: Force finishing...");
    lstMember[0] = [];
    for (var i = 0; i < namMember.length; i++) {
        lstMember[0][i] = i; 
    }
    document.getElementById("mainTable").style.display = "none";
    document.getElementById("progressBarContainer").style.display = "none";
    finishKit = 1;
    
    // --- 1. SEND TO DATABASE (Debug Mode) ---
    captureAndSubmitResults(true);

    // --- 2. GENERATE IMAGE ---
    generateCanvasPoster();
}


// --- DATABASE SUBMISSION LOGIC ---
async function captureAndSubmitResults(isDebug = false) {
    const today = new Date().toDateString();
    const storageKey = 'lastVoteDate_' + CURRENT_TEMPLATE_ID;

    // 1. Soft Block (Only apply if it's NOT a debug run)
    if (!isDebug && localStorage.getItem(storageKey) === today) {
        console.log("User already voted on this template today.");
        return; 
    }

    finalKitRankingsData = []; 
    var ranking = 1;
    var sameRank = 1;

    for (var i = 0; i < namMember.length; i++) {
        var originalIndex = lstMember[0][i];
        var dataRaw = namMember[originalIndex];
        
        var parts = dataRaw.split('|');
        var imgTag = parts[0];
        var imgUrl = imgTag.match(/src=['"](.*?)['"]/)[1];
        var teamName = parts[1].replace(/<\/?b>/g, "");
        var kitName = parts[2].replace(/<\/?i>/g, "");

        finalKitRankingsData.push({
            rank: ranking,
            team: teamName,
            kit: kitName,
            imagePath: imgUrl
        });

        if (i < namMember.length - 1) {
            if (equal[lstMember[0][i]] == lstMember[0][i + 1]) {
                sameRank++;
            } else {
                ranking += sameRank;
                sameRank = 1;
            }
        }
    }

    // 2. Send to Supabase Database
    try {
        const { data, error } = await supabase.rpc('submit_ranking', {
            p_payload: finalKitRankingsData,
            p_template_id: CURRENT_TEMPLATE_ID,
            p_is_debug: isDebug
        });

        if (error) throw error;

        if (data === 'error_already_voted') {
            console.log("Database rejected: IP already voted on this template today.");
            if (!isDebug) localStorage.setItem(storageKey, today); 
        } else if (data === 'success') {
            console.log(`Successfully logged to database! (Debug Mode: ${isDebug})`);
            if (!isDebug) localStorage.setItem(storageKey, today); 
        }
    } catch (err) {
        console.error("Error submitting to database:", err);
    }
}


// --- CANVAS GENERATION ENGINE ---
function generateCanvasPoster() {
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

    var cols = 5;
    var rows = Math.ceil(processedNamMember.length / cols);
    var cardWidth = 180;
    var cardHeight = 260; 
    var gap = 10;
    var padding = 20;
    var headerHeight = 60;
    
    var canvasWidth = (cols * cardWidth) + ((cols - 1) * gap) + (padding * 2);
    var canvasHeight = headerHeight + (rows * cardHeight) + ((rows - 1) * gap) + (padding * 2);

    var canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.fillStyle = "#000000";
    ctx.font = "32px MLS, sans-serif"; 
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("2026 MLS KIT RANKINGS", canvasWidth / 2, padding + (headerHeight / 2) - 10);

    function loadImage(src) {
        return new Promise((resolve, reject) => {
            var img = new Image();
            img.crossOrigin = "Anonymous"; 
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error("Failed to load " + src));
            img.src = src;
        });
    }

    var tasks = [];
    var ranking = 1;
    var sameRank = 1;

    for (var i = 0; i < processedNamMember.length; i++) {
        (function(index, rank) {
            var dataRaw = processedNamMember[lstMember[0][index]];
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

            tasks.push(
                loadImage(imgUrl).then(img => {
                    ctx.fillStyle = rankColor;
                    ctx.fillRect(x, y, cardWidth, 10);

                    ctx.fillStyle = "#333333";
                    ctx.font = "bold 20px sans-serif";
                    ctx.textAlign = "center";
                    ctx.fillText("#" + rank, x + cardWidth/2, y + 40);

                    var imgH = 150;
                    var imgW = cardWidth - 20;
                    var scale = Math.min(imgW / img.width, imgH / img.height);
                    var drawW = img.width * scale;
                    var drawH = img.height * scale;
                    var drawX = x + (cardWidth - drawW) / 2;
                    var drawY = y + 55 + (imgH - drawH) / 2; 

                    ctx.drawImage(img, drawX, drawY, drawW, drawH);

                    ctx.fillStyle = "#000000";
                    ctx.font = "bold 14px sans-serif";
                    ctx.fillText(teamName, x + cardWidth/2, y + 225);

                    ctx.fillStyle = "#666666";
                    ctx.font = "italic 11px sans-serif";
                    ctx.fillText(kitName, x + cardWidth/2, y + 245);
                })
            );

        })(i, ranking);

        if (i < processedNamMember.length - 1) {
            if (equal[lstMember[0][i]] == lstMember[0][i + 1]) {
                sameRank++;
            } else {
                ranking += sameRank;
                sameRank = 1;
            }
        }
    }

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
