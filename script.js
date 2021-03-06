$(document).ready(function () {

  // Setting up the early variables/grabbing the primary elements.
  const plannerContainer = $(".planner-container");
  const dateDisplay = $("#date-display");
  let now = moment().format("MMMM DD, YYYY");
  const clockDelineator = $(".clock-delineator");
  const clockDisplay = $(".clock-display");

  // Displaying the current date as header
  dateDisplay.text(now);

  // Building the time-blocks to fill the planner.
  function addTimeBlock() {

    // Setting moment up to use it to populate the times
    let planTimeDisplay = moment().hour(8).format("h:00A");
    for (let i = 0; i < 11; i++) {
      // Incrementing moment for each block
      planTimeDisplay = moment().hour(8 + i).format("h:00A");
      // Setting up first and last blocks as Morning/Evening bookends for the day
      if (planTimeDisplay === "8:00AM") { planTimeDisplay = "Morning" };
      if (planTimeDisplay === "6:00PM") { planTimeDisplay = "Evening" };
      // The actual structure for each block
      const timeBlockDiv = $("<div>").addClass("time-block mx-md-3 mx-lg-5 row");
      plannerContainer.append(timeBlockDiv);
      timeBlockDiv.append($("<div>").addClass("time-box col-3 col-sm-2 col-lg-1 d-flex align-items-center").text(planTimeDisplay));
      const planBoxDiv = $("<div>").addClass("plan-box col col-9 col-sm-10 col-lg-11").attr("id", i + 8);
      timeBlockDiv.append(planBoxDiv);
      planBoxDiv.append($("<textarea>").addClass("plan-text-area"));
      planBoxDiv.append($("<i>").addClass("far fa-save"));
    }
  }
  // Calling the function to build the planner
  addTimeBlock();

  // Now that the planner is built we can fetch these elements and set variables
  const timeBlock = $(".time-block");
  const planTextArea = $(".plan-text-area");
  const planBox = $(".plan-box");

  // Initializing the Day planner array to use for local storage
  let dayPlanArray = JSON.parse(localStorage.getItem("saved-plan"));
  if (!dayPlanArray) {
    initializeDayPlanArray();
  }

  // Writing the stored plans to the planner.
  function writeThePlans() {
    planTextArea.each(function (index) {
      $(this).text(dayPlanArray[index]);
    })
  }

  function initializeDayPlanArray() {

    dayPlanArray = ["", "", "", "", "", "", "", "", "", "", "", ""];

    // Clearing the plans each day!
    dayPlanArray[11] = now;
    localStorage.setItem("saved-plan", JSON.stringify(dayPlanArray));
    writeThePlans();
  }

  // Sending the Day Planner array to storage
  localStorage.setItem("saved-plan", JSON.stringify(dayPlanArray));

  // Someone has entered a plan and clicked save, now let's save the plan!
  timeBlock.on("click", function () {
    let saveButt = event.target;

    const enteredEvent = $(this).find(".plan-text-area").val();
    const eventArrayIndex = parseInt($(this).find(".plan-box").attr("id") - 8);

    if (saveButt.matches("i")) {
      saveButt = $(this).find("i");
      dayPlanArray[eventArrayIndex] = enteredEvent;
      localStorage.setItem("saved-plan", JSON.stringify(dayPlanArray));
      // A little style for user feedback on icon click.
      saveButt.addClass("fa-saved");
      writeThePlans();
      setTimeout(function () {
        saveButt.removeClass("fa-saved");
      }, 1000);
    }
  });

  // Initializing the sliding clock variable
  let clockPosition = 234;

  // This function sets the sliding clock position and colors for the time blocks 
  function colorCode() {
    // Setting the clock
    let currentTime = moment();
    clockDisplay.text(currentTime.format("h:mm"));

    // The sliding clock positioning
    let clockHour = parseInt(currentTime.format("H"));
    let clockMinute = parseInt(currentTime.format("m"));
    clockPosition = clockHour * 60 + clockMinute - 299;
    if (clockPosition < 241) { clockPosition = 234 };
    if (clockPosition > 834) { clockPosition = 834 };
    clockDelineator.css("top", clockPosition);

    // Jquery .each to run through time block divs and asses past/present/future class.
    planBox.each(function () {
      const _this = $(this);

      if (parseInt(_this.attr("id")) === 8 && parseInt(_this.attr("id")) >= clockHour) {
        _this.addClass("current-hour");
      } else if (parseInt(_this.attr("id")) === 18 && parseInt(_this.attr("id")) <= clockHour) {
        _this.removeClass("future-hour");
        _this.addClass("current-hour");
      } else if (parseInt(_this.attr("id")) < clockHour) {
        _this.removeClass("current-hour");
        _this.addClass("past-hour");
      } else if (parseInt(_this.attr("id")) === clockHour) {
        _this.removeClass("future-hour");
        _this.addClass("current-hour");
      } else {
        _this.addClass("future-hour");
      }
    });
  }
  // We're going to run the color code function every second to update the clock and set the colors.
  setInterval(function () {

    colorCode();

    // check current date to clear calendar each day
    now = moment().format("MMMM DD, YYYY");
    if (now != dayPlanArray[11]) {
      initializeDayPlanArray();
    }
  }, 1000)

  // Start the app by  building the planner and setting up the colors and clock.
  writeThePlans();
  colorCode();

});