// PREFETCHING IMAGES

var imageUrls = [
    // Main images (32 items)
    'kits/2025/png/atx1.png',
    'kits/2025/png/atl1.png',
    'kits/2025/png/chi1.png',
    'kits/2025/png/cin1.png',
    'kits/2025/png/clb1.png',
    'kits/2025/png/clt1.png',
    'kits/2025/png/col1.png',
    'kits/2025/png/dal1.png',
    'kits/2025/png/dc1.png',
    'kits/2025/png/hou1.png',
    'kits/2025/png/lafc1.png',
    'kits/2025/png/lag1.png',
    'kits/2025/png/mia1.png',
    'kits/2025/png/mia2.png',
    'kits/2025/png/min1.png',
    'kits/2025/png/mtl1.png',
    'kits/2025/png/ne1.png',
    'kits/2025/png/nsh1.png',
    'kits/2025/png/nyc1.png',
    'kits/2025/png/nyrb1.png',
    'kits/2025/png/orl1.png',
    'kits/2025/png/phi1.png',
    'kits/2025/png/por1.png',
    'kits/2025/png/rsl1.png',
    'kits/2025/png/sea1.png',
    'kits/2025/png/sj1.png',
    'kits/2025/png/skc1.png',
    'kits/2025/png/stl1.png',
    'kits/2025/png/tor1.png',
    'kits/2025/png/van1.png',
    'kits/2025/png/sd1.png',
    'kits/2025/png/sd2.png',
    // Thumbnail images (32 items)
    'kits/2025/png/150x/atx1.png',
    'kits/2025/png/150x/atl1.png',
    'kits/2025/png/150x/chi1.png',
    'kits/2025/png/150x/cin1.png',
    'kits/2025/png/150x/clb1.png',
    'kits/2025/png/150x/clt1.png',
    'kits/2025/png/150x/col1.png',
    'kits/2025/png/150x/dal1.png',
    'kits/2025/png/150x/dc1.png',
    'kits/2025/png/150x/hou1.png',
    'kits/2025/png/150x/lafc1.png',
    'kits/2025/png/150x/lag1.png',
    'kits/2025/png/150x/mia1.png',
    'kits/2025/png/150x/mia2.png',
    'kits/2025/png/150x/min1.png',
    'kits/2025/png/150x/mtl1.png',
    'kits/2025/png/150x/ne1.png',
    'kits/2025/png/150x/nsh1.png',
    'kits/2025/png/150x/nyc1.png',
    'kits/2025/png/150x/nyrb1.png',
    'kits/2025/png/150x/orl1.png',
    'kits/2025/png/150x/phi1.png',
    'kits/2025/png/150x/por1.png',
    'kits/2025/png/150x/rsl1.png',
    'kits/2025/png/150x/sea1.png',
    'kits/2025/png/150x/sj1.png',
    'kits/2025/png/150x/skc1.png',
    'kits/2025/png/150x/stl1.png',
    'kits/2025/png/150x/tor1.png',
    'kits/2025/png/150x/van1.png',
    'kits/2025/png/150x/sd1.png',
    'kits/2025/png/150x/sd2.png'
];

function prefetchImages() {
  console.log("prefetchImages ran");
  for (var i = 0; i < imageUrls.length; i++) {
    var img = new Image();
    img.src = imageUrls[i];
  }
}

// Run it on window load
window.onload = function() {
  prefetchImages();
  // If you want to hide the Show Results button at first:
  var screenieBtn = document.getElementById("screenieButton");
  if (screenieBtn) screenieBtn.style.display = "none";
};
