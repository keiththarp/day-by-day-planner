$(document).ready(function () {
  const dateDisplay = $("#date-display");
  const todaysDate = moment().format("MMMM DD, YYYY");
  const timeBlock = $(".time-block");
  const planTextArea = $(".plan-text-area");


  // Initializing the Day planner array
  let dayPlanArray = JSON.parse(localStorage.getItem("saved-plan"));
  if (dayPlanArray === null) {
    dayPlanArray = ["", "", "", "", "", "", "", "", "", "", ""];
  }
  localStorage.setItem("saved-plan", JSON.stringify(dayPlanArray));

  // Writing the stored plans to the planner.
  function writeThePlans() {
    planTextArea.each(function (index) {
      $(this).text(dayPlanArray[index]);

    })
  }
  writeThePlans();

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
  const morningBlock = $("#8");
  const eveningBlock = $("#18");

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

  // Let's save the plan!

  timeBlock.on("click", function () {
    const saveButt = event.target;

    const enteredEvent = $(this).find(".plan-text-area").val();
    const eventArrayIndex = parseInt($(this).find(".plan-box").attr("id") - 8);

    // console.log(`this is the variable looking for the plan-box id ${eventArrayIndex}`);
    // console.log(`this is looking for the plan-box id ${$(this).find(".plan-box").attr("id")}`);

    // console.log($(this).find(".plan-text-area").val());
    // console.log($(this).find("i").attr("id"));

    if (saveButt.matches("i")) {
      // console.log(`inside the conditional we have the message = ${enteredEvent} and the time which = ${eventArrayIndex}:00`);
      dayPlanArray[eventArrayIndex] = enteredEvent;
      // console.log(dayPlanArray);
      localStorage.setItem("saved-plan", JSON.stringify(dayPlanArray));
      writeThePlans();
    }
  });

  // All code above here.
});
