const stateMachine = "Floor 5";

const riveInstance = new rive.Rive({
	src: "src/floor-5.riv", //get rive file
	canvas: document.getElementById("rive"), //get correct canvas
	autoplay: true,
	stateMachines: stateMachine, // get correct stateMachine
	automaticallyHandleEvents: true, // Automatically handle RiveHTTPEvents
	onLoad: onLoadHandler,
});

// Animation status mapping

const lessons = 9; // Number of lessons
const inputLessonsDone = []; // Lessons status
const inputLessonsProgress = []; // Lessons progress
const inputIsLessonsHover = []; // Lesson pointer hover
const inputLessonsTrigger = []; // Lesson trigger movement

// Handle the onLoad event
function onLoadHandler() {
	// Prevent a blurry canvas by using the device pixel ratio
	riveInstance.resizeDrawingSurfaceToCanvas();

	const inputs = riveInstance.stateMachineInputs(stateMachine);

	// Change marble's color [0, 1 , 2, 3]
	let playerID = 0; // Var to change player
	playerSelector = inputs.find((i) => i.name === "playerProfile");
	playerSelector.value = playerID;

	inputMarbleHover = inputs.find((i) => i.name === "marble hovering");

	for (let i = 1; i <= lessons; i++) {
		// Get lesson done status
		inputLessonsDone.push(
			inputs.find((input) => input.name === `isLesson${i}Done`)
		);
		// inputLessonsDone[0].value = true;

		// Get lesson progress
		inputLessonsProgress.push(
			inputs.find((input) => input.name === `Lesson progress ${i}`)
		);
		// inputLessonsProgress[0].value = 0; // 0-100

		// Hover effect
		inputIsLessonsHover.push(
			inputs.find((input) => input.name === `Lesson ${i} Hover`)
		);
		// inputIsLessonsHover[0].value = true;

		// Triggers marble animation
		inputLessonsTrigger.push(
			inputs.find((input) => input.name === `Trigger Lesson ${i}`)
		);
		// inputLessonsTrigger[0].fire()
	}
	// Trigger marble to next level
	triggerNextLevel = inputs.find((i) => i.name === "Trigger Next Level");
	inputLessonsCounter = inputs.find((i) => i.name === "lessonCounter");
}

// Resize the drawing surface if the window resizes
window.addEventListener(
	"resize",
	() => {
		riveInstance.resizeDrawingSurfaceToCanvas();
	},
	false
);

// Events handling setup
const eventFire = (riveEvent) => {
	const eventData = riveEvent.data;
	const eventName = eventData.name;
	const eventProperties = eventData.properties;

	const eventKey = eventName.split("-")[0];

	switch (eventKey) {
		case "OnHoverEnter":
			document.body.style.cursor = "pointer";
			break;
		case "OnHoverExit":
			document.body.style.cursor = "auto";
			break;
		case "OnClick":
			// Custom logic for click event
			break;

		// Anim on lessons
		case "On":
		case "Off":
			const whereAmI = () => {
				e = eventName.slice(0, -2);
				if (e === "On") return true;
				if (e === "Off") return false;
				return false;
			};

			let lessonN = eventName.slice(-1);
			riveInstance
				.stateMachineInputs(stateMachine)
				.find((i) => i.name === `isOn${lessonN}`).value = whereAmI();
			break;

		// Lesson launcher
		case "LessonEvent":
		case "NextLevelButton":
			console.log(eventName);
			break;

		// Levitate marble when on a lesson, not in movement
		case "marbleLevitateON":
			inputMarbleHover.value = true;
			break;
		case "marbleLevitateOFF":
			inputMarbleHover.value = false;
			break;

		case "cardbutton":
			let cardButton = eventProperties.cardButton;
			for (let i = 0; i < lessons; i++) {
				if (cardButton === i + 1) return inputLessonsTrigger[i].fire();
			}
			if (cardButton === 200) return triggerNextLevel.fire();
			break;

		default:
			console.log("Unhandled event:", eventName, "\n", riveEvent);
			break;
	}
};

// Register the event handler
riveInstance.on(rive.EventType.RiveEvent, eventFire);

// To update number in counter
const lessonCounter = () => {
	let total = 0;
	for (let i = 0; i < lessons; i++) {
		total += inputLessonsDone[i].value == true ? 1 : 0;
	}
	return (inputLessonsCounter.value = total);
};
