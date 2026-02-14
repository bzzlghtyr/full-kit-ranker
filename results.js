// --- SUPABASE SETUP ---
const SUPABASE_URL = 'https://vwzibkmtlnqyjrmqvjcp.supabase.co';
const SUPABASE_KEY = 'sb_publishable_rK690mconY77dTIDtxFHcA_S5oLuTAe';
const supabaseDb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const CURRENT_TEMPLATE_ID = 'mls_2026';

// Color gradient for the ranks
const colors = [
    "#00ff57", "#3ef846", "#56f034", "#67e91d", "#75e200", "#80da00", "#89d300", 
    "#91cb00", "#99c300", "#9fbc00", "#a4b400", "#a9ac00", "#aea400", "#b19c00", 
    "#b49400", "#b78c00", "#b98400", "#bb7b00", "#bc7300", "#bd6a00", "#bd6200", 
    "#bd5900", "#bc5000", "#bb4700", "#ba3d00", "#b83300", "#b52700", "#b21a00", 
    "#af0404", "#800000"
];

async function loadCommunityConsensus() {
    try {
        const { data, error } = await supabaseDb
            .from('consensus_rankings')
            .select('*')
            .eq('template_id', CURRENT_TEMPLATE_ID)
            .order('avg_rank', { ascending: true });

        if (error) throw error;

        const container = document.getElementById('communityResults');
        const voteDisplay = document.getElementById('voteCountDisplay');

        if (!data || data.length === 0) {
            container.innerHTML = "<p style='text-align: center; color: #666;'>No votes yet! Be the first to rank.</p>";
            voteDisplay.innerText = "0 Total Submissions";
            return;
        }

        const totalVotes = data[0].total_votes;
        voteDisplay.innerText = `Based on ${totalVotes} total submissions`;

        let htmlString = "";

        data.forEach((kit, index) => {
            const rankNumber = index + 1;
            const rankColor = colors[rankNumber - 1] || "#ccc";
            const formattedAvg = parseFloat(kit.avg_rank).toFixed(2);

            // Build the modern leaderboard row
            htmlString += `
                <div class="lb-row" style="border-left: 8px solid ${rankColor};">
                    <div class="lb-left">
                        <div class="lb-rank">#${rankNumber}</div>
                        <img src="${kit.image_path}" class="lb-thumb" alt="${kit.team} kit">
                    </div>
                    
                    <div class="lb-info">
                        <div class="lb-team">${kit.team}</div>
                        <div class="lb-kit">${kit.kit}</div>
                    </div>
                    
                    <div class="lb-score-container">
                        <div class="lb-score-label">Avg Rank</div>
                        <div class="lb-score-value">${formattedAvg}</div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = htmlString;

    } catch (err) {
        console.error("Error fetching results:", err);
        document.getElementById('voteCountDisplay').innerText = "Error loading results.";
    }
}

window.onload = loadCommunityConsensus;