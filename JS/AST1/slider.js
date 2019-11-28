const slideIndex=0;



const IMAGE_WIDTH = 804;

const SPACE = 10;

var carousel = document.getElementsByClassName('carousel-container')[0];
var imageWrapper = carousel.getElementsByClassName('carousel-image-wrapper')[0];

var previous = document.getElementById('prev');
var next = document.getElementById('next');






var imageArray = Array.from(imageWrapper.children);
var currentImageIndex = 0;
var imageCount = imageArray.length;

 imageWrapper.style.width = IMAGE_WIDTH * imageCount +'px';


 function slideCarousel()
 {
    if(currentImageIndex >=imageCount)
    {
       currentImageIndex = 0;
    }

     console.log(currentImageIndex);
     
    imageWrapper.style.marginLeft = '-'+ IMAGE_WIDTH*currentImageIndex + 'px';
    currentImageIndex++;

 }



setInterval(slideCarousel,2000);

// const IMAGE_WIDTH = 804;
// var carousel = document.getElementsByClassName('carousel-container')[0];
// var imageWrapper = carousel.getElementsByClassName('carousel-image-wrapper')[0];
// var imageArray = Array.from(imageWrapper.children);


// var currentImageIndex = 0;
// var imageCount = imageArray.length;
// imageWrapper.style.width=IMAGE_WIDTH*imageCount+'px';
// function slideCarousel()
// {


// if(currentImageIndex>=imageCount)
// {
//     currentImageIndex=0;
    

// }
// Console.log(currentImageIndex);

// imageWrapper.style.marginLeft = '-' + IMAGE_WIDTH*currentImageIndex +'px';
// currentImageIndex++;
// }

// setInterval(slideCarousel,1000);




next.addEventListener('click',slideNext);
prev.addEventListener('click',slidePrev);


previous.addEventListener('click', function (e) {
   prevSlide();
});

next.addEventListener('click', function (e) {
   nextSlide();
});


function prevSlide() {
   clearAllAttributes()
   currentIndex--;
   if (currentIndex < 0) {
       currentIndex = imageArray.length - 1;
   }
   addAttributes();
   setTimeout(prevSlide,1000);
}


function nextSlide(){
   clearAllAttributes()
   currentIndex++;
   if(currentIndex>imageArray.length-1){
      currentIndex=0;
   }
   addAttributes();
}
function clearAllAttributes() {
   for (var i = 0; i < imageArray.length; i++) {
       if (imageArray[i].classList.contains('active')) {
           currentIndex = imageArray[i].getAttribute('id');
           imageArray[i].classList.remove("active");
           list[i].classList.remove("active");
       }
   }
}

function addAttributes() {
   imageWrapper.style.marginLeft = '-' + (IMAGE_WIDTH * currentIndex) + 'px';
   imageArray[currentIndex].style.display = "block";
   imageArray[currentIndex].classList.add("active");
   list[currentIndex].classList.add("active");
}

