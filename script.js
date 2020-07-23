$(document).ready(function () {

  const plannerContainer = $(".planner-container");
  const dateDisplay = $("#date-display");
  const now = moment()
  const clockDelineator = $(".clock-delineator");
  const clockDisplay = $(".clock-display");
  console.log(now.format("hh:mm"));


  function addTimeBlock() {
    let planTimeDisplay = moment().hour(8).format("h:00A");
    // let planTimeDisplay = now.format("h:00A");
    for (let i = 0; i < 11; i++) {
      planTimeDisplay = moment().hour(8 + i).format("h:00A");
      if (planTimeDisplay === "8:00AM") { planTimeDisplay = "Morning" };
      if (planTimeDisplay === "6:00PM") { planTimeDisplay = "Evening" };
      const timeBlockDiv = $("<div>").addClass("time-block mx-md-3 mx-lg-5 row");
      plannerContainer.append(timeBlockDiv);
      timeBlockDiv.append($("<div>").addClass("time-box col-3 col-sm-2 col-lg-1 d-flex align-items-center").text(planTimeDisplay));
      const planBoxDiv = $("<div>").addClass("plan-box col col-9 col-sm-10 col-lg-11").attr("id", i + 8);
      timeBlockDiv.append(planBoxDiv);
      planBoxDiv.append($("<textarea>").addClass("plan-text-area"));
      planBoxDiv.append($("<i>").addClass("far fa-save"));
      // planTimeDisplay = now.hour(8 + i).format("h:00A");
    }
  }
  addTimeBlock();
  console.log(now.format("hh:mm"));

  const timeBlock = $(".time-block");
  const planTextArea = $(".plan-text-area");


  // Initializing the Day planner array
  let dayPlanArray = JSON.parse(localStorage.getItem("saved-plan"));
  if (!dayPlanArray) {
    dayPlanArray = ["", "", "", "", "", "", "", "", "", "", ""];
  }
  localStorage.setItem("saved-plan", JSON.stringify(dayPlanArray));

  // Writing the stored plans to the planner.
  function writeThePlans() {
    planTextArea.each(function (index) {
      $(this).text(dayPlanArray[index]);

    })
  }

  // set up variable for altering time blocks
  const planBox = $(".plan-box");

  // Displaying the current date as header
  dateDisplay.text(now.format("MMMM DD, YYYY"));


  // Let's save the plan!
  timeBlock.on("click", function () {
    let saveButt = event.target;

    const enteredEvent = $(this).find(".plan-text-area").val();
    const eventArrayIndex = parseInt($(this).find(".plan-box").attr("id") - 8);

    if (saveButt.matches("i")) {
      saveButt = $(this).find("i");
      dayPlanArray[eventArrayIndex] = enteredEvent;
      localStorage.setItem("saved-plan", JSON.stringify(dayPlanArray));
      saveButt.addClass("fa-saved");
      writeThePlans();
      setTimeout(function () {
        saveButt.removeClass("fa-saved");
      }, 1000);
    }
  });

  let clockPosition = 234;


  function colorCode() {
    let currentTime = moment().subtract("5", "h").add("38", "m");
    console.log(currentTime.format("hh:mm"));
    // currentTime = now.format("hh:mmA")

    let clockHour = parseInt(currentTime.format("H"));
    let clockMinute = parseInt(currentTime.format("m"));
    // clockHour = parseInt(now.format("H"));
    // clockMinute = parseInt(now.format("m"));
    clockPosition = clockHour * 60 + clockMinute - 299;
    if (clockPosition < 241) { clockPosition = 234 };
    if (clockPosition > 834) { clockPosition = 834 };

    clockDisplay.text(currentTime.format("h:mm"));

    clockDelineator.css("top", clockPosition);

    // *** Time Block past/present/future color coding ***

    // Jquery forEach function to run through time block divs to asses past/present/future class.
    planBox.each(function () {

      if (parseInt($(this).attr("id")) === 8 && parseInt($(this).attr("id")) >= clockHour) {
        $(this).addClass("current-hour");
      } else if (parseInt($(this).attr("id")) === 18 && parseInt($(this).attr("id")) <= clockHour) {
        $(this).addClass("current-hour");
      } else if (parseInt($(this).attr("id")) < clockHour) {
        $(this).addClass("past-hour");
      } else if (parseInt($(this).attr("id")) === clockHour) {
        $(this).addClass("current-hour");
      } else {
        $(this).addClass("future-hour");
      }
    });
  }
  setInterval(function () {
    colorCode();
  }, 60000)

  writeThePlans();
  colorCode();

  // All code above here.

});