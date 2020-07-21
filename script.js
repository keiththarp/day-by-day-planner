const dateDisplay = $("#date-display");
const todaysDate = moment().format("MMMM DD, YYYY");

// set up variable for altering time blocks
const planBox = $(".plan-box");

// This may eventually be a clock
// setInterval(function () {
//   let m2Time = moment().format("h:mm:ss A");
//   console.log(m2Time);
// }, 1000)

// Displaying the current date as header
dateDisplay.text(todaysDate);

// *** Time Block past/present/future color coding ***
// establish the time in variable as 24 hour time
const militaryTime = parseInt(moment().format("HH"));

// Conditionals for morning and evening blocks

// setting the variables for morning evening blocks
const morningBlock = $("#morning");
const eveningBlock = $("#evening");

// morning block
if (militaryTime < 9) {
  morningBlock.addClass("current-hour");
} else {
  morningBlock.addClass("past-hour");
}

// evening block
if (militaryTime < 18) {
  eveningBlock.addClass("future-hour");
} else {
  eveningBlock.addClass("current-hour");
}

// Jquery forEach function to run through time block divs and asses place on timeline.
planBox.each(function () {

  if (parseInt($(this).attr("id")) < militaryTime) {
    $(this).addClass("past-hour");
  }

  if (parseInt($(this).attr("id")) === militaryTime) {
    $(this).addClass("current-hour");
  }

  if (parseInt($(this).attr("id")) > militaryTime) {
    $(this).addClass("future-hour");
  }

});

