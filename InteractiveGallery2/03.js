let c = document.createElement("canvas");
let img1 = new Image();
let pixel = 20;
img1.src = document.getElementById("image1").src;

img1.onload = function(){
   document.getElementById("image1").remove();
   createPixelImage()
}

function createPixelImage(){
   let currentImage = document.querySelector('.currentimage')
   if(currentImage) {
      currentImage.remove()
   }
   w=img1.width;
   h=img1.height;

   c.width = w;
   c.height = h;
   ctx = c.getContext("2d");
   ctx.drawImage(img1,0,0);

   let pixelArr = ctx.getImageData(0,0,w,h).data;
   let sample_size = pixel;

   for(let y=0;y<h;y+=sample_size) {
      for(let x=0;x<w;x+=sample_size) {
         let p = (x+(y*w))*4;
         ctx.fillStyle = "rgba(" + pixelArr[p] + "," + pixelArr[p+1] + "," + pixelArr[p+2] + "," + pixelArr[p+3] + ")";
         ctx.fillRect(x,y,sample_size,sample_size);
      }
   }

   let img2 = new Image();
   img2.src = c.toDataURL("image/png");
   img2.width = 600;
   img2.classList.add('currentimage')
   currentImage = document.querySelector('.wrapper').prepend(img2);
}
const pixelSizeSlider = document.getElementById("pixelSize");
const pixelSizeValue = document.getElementById("pixelSizeValue");

pixelSizeSlider.addEventListener("input", () => {
   createPixelImage()
   pixel = parseInt(pixelSizeSlider.value);
});

document.addEventListener("DOMContentLoaded", () => {
   const splashScreen = document.getElementById("splash-screen");
   const mainContent = document.getElementById("main-content");
    // Show the splash screen for 5 seconds
   setTimeout(() => {
     splashScreen.style.display = "none"; // Hide the splash screen
     mainContent.style.display = "block"; // Show the main content
   }, 5000);
 });