// --- SUPABASE SETUP ---
const SUPABASE_URL = 'https://vwzibkmtlnqyjrmqvjcp.supabase.co';
const SUPABASE_KEY = 'sb_publishable_rK690mconY77dTIDtxFHcA_S5oLuTAe';
const supabaseDb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const CURRENT_TEMPLATE_ID = 'mls_2026';

// Reusing your color logic for the top borders
const colors = [
    "#00ff57", "#3ef846", "#56f034", "#67e91d", "#75e200", "#80da00", "#89d300", 
    "#91cb00", "#99c300", "#9fbc00", "#a4b400", "#a9ac00", "#aea400", "#b19c00", 
    "#b49400", "#b78c00", "#b98400", "#bb7b00", "#bc7300", "#bd6a00", "#bd6200", 
    "#bd5900", "#bc5000", "#bb4700", "#ba3d00", "#b83300", "#b52700", "#b21a00", 
    "#af0404", "#800000"
];

async function loadCommunityConsensus() {
    try {
        // Query the View, sorted by the lowest average rank (closest to 1.00)
        const { data, error } = await supabaseDb
            .from('consensus_rankings')
            .select('*')
            .eq('template_id', CURRENT_TEMPLATE_ID)
            .order('avg_rank', { ascending: true });

        if (error) throw error;

        const container = document.getElementById('communityResults');
        const voteDisplay = document.getElementById('voteCountDisplay');

        if (!data || data.length === 0) {
            container.innerHTML = "<p style='grid-column: 1 / -1; text-align: center;'>No votes yet! Be the first to rank.</p>";
            voteDisplay.innerText = "0 Total Submissions";
            return;
        }

        // The total_votes column tells us how many people submitted a ranking
        // Since every kit is ranked every time, we can just look at the first kit's vote count
        const totalVotes = data[0].total_votes;
        voteDisplay.innerText = `Based on ${totalVotes} total submissions`;

        let htmlString = "";

        // Loop through the sorted data and build the cards
        data.forEach((kit, index) => {
            const rankNumber = index + 1;
            const rankColor = colors[rankNumber - 1] || "#ccc";
            
            // Format the average rank nicely (e.g., "Avg: 2.45")
            const formattedAvg = parseFloat(kit.avg_rank).toFixed(2);

            htmlString += `
                <div class="result-card" style="border-top: 10px solid ${rankColor};">
                    <span class="rank-badge">#${rankNumber}</span>
                    <img src="${kit.image_path}" class="kit-thumb" alt="${kit.team} kit">
                    <span style="font-weight:bold; font-size:14px; margin-bottom:2px; margin-top:5px;">${kit.team}</span>
                    <span style="font-size:11px; font-style:italic; color:#555;">${kit.kit}</span>
                    <span class="avg-badge">Avg: ${formattedAvg}</span>
                </div>
            `;
        });

        // Inject the HTML into the page
        container.innerHTML = htmlString;

    } catch (err) {
        console.error("Error fetching results:", err);
        document.getElementById('voteCountDisplay').innerText = "Error loading results.";
    }
}

// Fire the function when the page loads
window.onload = loadCommunityConsensus;