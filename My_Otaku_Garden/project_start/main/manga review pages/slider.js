$(document).ready(function () {
    const slider = $(".slider");
    const slides = $(".slide");
    let currentIndex = 0;

    // Function to move the slider to the next slide
    function nextSlide() {
        currentIndex++;
        if (currentIndex >= slides.length) {
            currentIndex = 0;
        }
        updateSlider();
    }

    // Function to move the slider to the previous slide
    function prevSlide() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = slides.length - 1;
        }
        updateSlider();
    }

    // Function to update the slider position
    function updateSlider() {
        const translateX = -currentIndex * 100 + "%";
        slider.css("transform", `translateX(${translateX})`);
    }

    // Set up event listeners for next and previous buttons
    $(".next-button").click(nextSlide);
    $(".prev-button").click(prevSlide);
});