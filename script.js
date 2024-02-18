var namMember = [
    "<img src=kits/2024/png/atx1.png> |<b>Austin FC</b>|<i>The Armadillo Kit</i>|",
    "<img src=kits/2024/png/atl1.png> |<b>Atlanta United</b>|<i>The Placeholder Name Kit</i>|",
    "<img src=kits/2024/png/chi1.png> |<b>Chicago Fire FC</b>|<i>Return to Red</i>|"
    // Add other members here
];

function prefetchImages() {
    var imageUrls = [
        'kits/2024/png/atx1.png',
        'kits/2024/png/atl1.png',
        // Add other image URLs here
    ];

    for (var i = 0; i < imageUrls.length; i++) {
        var img = new Image();
        img.src = imageUrls[i];
    }
}

// Call the function to prefetch images when the page opens
window.onload = function() {
    prefetchImages();
};

// Other functions and variables go here
