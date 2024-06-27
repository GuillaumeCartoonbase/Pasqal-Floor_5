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
		isOn3 = inputs.find((i) => i.name === "isOn3"); // Event to setup
		isOn4 = inputs.find((i) => i.name === "isOn4"); // Event to setup
		isOn6 = inputs.find((i) => i.name === "isOn6"); // Event to setup
		isOn8 = inputs.find((i) => i.name === "isOn8"); // Event to setup

		inputMarbleHover = inputs.find((i) => i.name === "marble hovering");
	},

	onStateChange: (e) => {
		// console.log(e.data[0]); // Get the current timeline name
	},
});

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
	switch (eventName.split("-")[0]) {
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
			isOn3.value = true;
			break;
		case "Off3":
			isOn3.value = false;
			break;
		case "On4":
			isOn4.value = true;
			break;
		case "Off4":
			isOn4.value = false;
			break;
		case "On6":
			isOn6.value = true;
			break;
		case "Off6":
			isOn6.value = false;
			break;
		case "On8":
			isOn8.value = true;
			break;
		case "Off8":
			isOn8.value = false;
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
