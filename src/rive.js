const stateMachine = "Floor 5";

// Create Rive
const riveInstance = new rive.Rive({
	src: "src/floor-5.riv", //get rive file
	canvas: document.getElementById("rive"), //get correct canvas
	autoplay: true,
	stateMachines: stateMachine, // get correct stateMachine
	automaticallyHandleEvents: true, // Automatically handle RiveHTTPEvents
	onLoad: onLoadHandler,
});

const lessons = 4; // Number of lessons
const inputLessonsStarted = []; // Lessons status
const lessonsDone = []; // Lessons status
const haloLessonActive = []; // Lessons status
const inputIsLessonsHover = []; // Lesson pointer hover
const inputLessonsTrigger = []; // Lesson trigger movement

// Handle the onLoad event
function onLoadHandler() {
	// Prevent a blurry canvas by using the device pixel ratio
	riveInstance.resizeDrawingSurfaceToCanvas();

	// Get inputs
	const inputs = riveInstance.stateMachineInputs(stateMachine);

	// Change marble's color [0, 1 , 2, 3]
	let playerID = 0; // Var to change player
	playerSelector = inputs.find((i) => i.name === "playerProfile");
	playerSelector.value = playerID;

	inputMarbleHover = inputs.find((i) => i.name === "marble hovering");

	for (let i = 1; i <= lessons; i++) {
		// Get lesson started status
		// inputLessonsStarted[0].value = true; (true, false)
		inputLessonsStarted.push(
			inputs.find((input) => input.name === `isLesson${i}Started`)
		);

		// Get lesson done status
		haloLessonActive.push(
			inputs.find((input) => input.name === `isLesson${i}Done`)
		);

		// lessonsDone[0].value = true; (true, false)
		lessonsDone.push(
			riveInstance.retrieveInputAtPath(`isDone${i}`, "compteur").asBool().value
		);

		// Hover effect
		inputIsLessonsHover.push(
			inputs.find((input) => input.name === `Lesson ${i} Hover`)
		);

		// Triggers marble animation
		// inputLessonsTrigger[0].fire()
		inputLessonsTrigger.push(
			inputs.find((input) => input.name === `Trigger Lesson ${i}`)
		);
	}
	// Trigger marble to next level
	triggerNextLevel = inputs.find((i) => i.name === "Trigger Next Level");

	inputLessonsCounter = inputs.find((i) => i.name === "lessonCounter");

	responsiveShrink = inputs.find((i) => i.name === "responsiveShrink");

	isResetting = inputs.find((i) => i.name === "isResetting");
	isResetting.value = true;

	// number of lesson checkers
	riveInstance.setNumberStateAtPath("nLesson", lessons, "compteur");

	// total lessons number
	riveInstance.setTextRunValueAtPath(
		"lessonsTotal",
		lessons.toString(),
		"compteur"
	);
}

// Stop start button from loading in loop
const stopLoader = () => {
	return riveInstance.fireStateAtPath("backTostart", "button start");
};

const shrink = (percent) => {
	responsiveShrink.value = percent;
	return responsiveShrink;
};

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
	const eventIndex = eventName.slice(-1);
	console.log(isMoving.value);

	switch (eventKey) {
		// Fire marble movements from card's buttons
		case "cardbutton":
			if (eventName.split("-")[1] == "next") return triggerNextLevel.fire();
			if (Number.isInteger(Number(eventIndex)))
				return inputLessonsTrigger[eventIndex - 1].fire();
			break;

		// logic when marble arrives
		case "On":
			inputMarbleHover.value = true;

			riveInstance.setBooleanStateAtPath(
				"lessonHover",
				true,
				`Lesson ${eventIndex}`
			);

			isMoving(false);
			break;

		// logic when marble leaves
		case "Off":
			inputMarbleHover.value = false;

			if (eventIndex != 0) {
				riveInstance.setBooleanStateAtPath(
					"lessonHover",
					false,
					`Lesson ${eventIndex}`
				);
			}

			isMoving(true);
			break;

		case "OnHoverEnter":
			document.body.style.cursor = "pointer";
			break;
		case "OnHoverExit":
			document.body.style.cursor = "auto";
			break;
		case "OnClick":
			// Custom logic for click event
			break;

		default:
			console.log("Unhandled event:", eventName);
			break;
	}
};

// Register the event handler
riveInstance.on(rive.EventType.RiveEvent, eventFire);

// To update number in counter
const lessonCounter = () => {
	let total = 0;
	for (let i = 0; i < lessons; i++) {
		total += lessonsDone[i] == true ? 1 : 0;
	}

	riveInstance.setTextRunValueAtPath(
		"lessonsLearned",
		total.toString(),
		"compteur"
	);
	return total;
};

function lessonNdone(n, status) {
	result = status;
	riveInstance.setBooleanStateAtPath(`isDone${n}`, result, "compteur");
	lessonsDone[n - 1] = result;
	haloLessonActive[n - 1].value = result;
	lessonCounter();
}

function isMoving(status) {
	inputs = riveInstance.stateMachineInputs(stateMachine);
	move = inputs.find((i) => i.name === "isMoving");
	return (move.value = status);
}
