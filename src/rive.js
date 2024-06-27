const stateMachine = "Floor 5";

const riveInstance = new rive.Rive({
	src: "src/floor-5.riv", //get rive file
	canvas: document.getElementById("rive"), //get correct canvas
	autoplay: true,
	stateMachines: stateMachine, // get correct stateMachine
	automaticallyHandleEvents: true, // Automatically handle RiveHTTPEvents

	onLoad: () => {
		// Prevent a blurry canvas by using the device pixel ratio
		riveInstance.resizeDrawingSurfaceToCanvas();

		const inputs = riveInstance.stateMachineInputs(stateMachine);

		// Build anim status
		isOn3 = inputs.find((i) => i.name === "isOn3");
		isOn4 = inputs.find((i) => i.name === "isOn4");
		isOn6 = inputs.find((i) => i.name === "isOn6");
		isOn8 = inputs.find((i) => i.name === "isOn8");

		inputMarbleHover = inputs.find((i) => i.name === "marble hovering");
	},

	onStateChange: (e) => {
		// console.log(e.data[0]); // Get the current timeline name
	},
});

// Build anim status
const animationMapping = {
	On3: () => {
		isOn3.value = true;
	},
	Off3: () => {
		isOn3.value = false;
	},
	On4: () => {
		isOn4.value = true;
	},
	Off4: () => {
		isOn4.value = false;
	},
	On6: () => {
		isOn6.value = true;
	},
	Off6: () => {
		isOn6.value = false;
	},
	On8: () => {
		isOn8.value = true;
	},
	Off8: () => {
		isOn8.value = false;
	},
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
	// console.log(eventName);

	const eventKey = eventName.split("-")[0];
	switch (eventKey) {
		case "OnHoverEnter":
			document.body.style.cursor = "pointer";
			break;
		case "OnHoverExit":
			document.body.style.cursor = "auto";
			break;
		case "OnClick":
			// console.log("clicked");
			break;

		// Anim on lessons
		case "On3":
		case "On4":
		case "On6":
		case "On8":
		case "Off3":
		case "Off4":
		case "Off6":
		case "Off8":
			animationMapping[eventKey]();
			break;

		// Levitate marble when on a lesson, not in movement
		case "marbleLevitateON":
			inputMarbleHover.value = true;
			break;
		case "marbleLevitateOFF":
			inputMarbleHover.value = false;
			break;

		default:
			console.log("Unhandled event:", eventName, "\n", riveEvent);
			break;
	}
};

riveInstance.on(rive.EventType.RiveEvent, eventFire);
