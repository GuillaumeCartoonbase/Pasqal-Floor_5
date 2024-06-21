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
		// myInput = inputs.find((i) => i.name === inputName);
		// myInput.value = true;

		// riveInstance.setTextRunValue(textRun, newString);
	},

	onStateChange: (e) => {
		console.log(e.data[0]); // Get the current timeline name
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
	console.log(eventName);
};

riveInstance.on(rive.EventType.RiveEvent, eventFire);

// Nested inputs setup
//riveInstance.setNumberStateAtPath(inputName, number, path)
//riveInstance.setBooleanStateAtPath(inputName, boolean, path)
//riveInstance.fireStateAtPath(inputName, path)
