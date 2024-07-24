# **[Live demo](https://guillaumecartoonbase.github.io/Pasqal-Floor_5/)**

# Rive Doc

Refer to the [Rive runtime documentation](https://help.rive.app/runtimes/overview) for more information.

# Lessons statuses

To mark a lesson 'started' or 'done' (boolean, in array).

## Rive inputs

- `isLesson1Started`
- `isLesson1Done`
- `isLesson2Started`
- `isLesson2Done`
- ...

## Setup in JS

The values are in arrays named:

- `inputLessonsStarted`
- `inputLessonsDone`

```js
const lessons = 6;
const inputLessonsStarted = [];
const inputLessonsDone = [];

for (let i = 1; i <= lessons; i++) {
	inputLessonsDone.push(
		inputs.find((input) => input.name === `isLesson${i}Done`)
	);
}

inputLessonsStarted[0].value = true; // lesson 1 marked started
inputLessonsStarted[2].value = true; // lesson 2 marked done
inputLessonsDone[5].value = false; // lesson 6 marked not done
```

# Lessons Hover status

To set the status of hovering on the lessons (boolean).

## Rive Input names

To change status:

```js
riveInstance.setBooleanStateAtPath(
	"lessonHover", // input name
	true, // status
	`Lesson 1` // lesson picker
);
```

Recorded status:

- `Lesson 1 Hover`
- `Lesson 2 Hover`
- ...

## Setup

### To change status from web

```html
<div onmouseenter="cardHover(1)" onmouseleave="cardNoHover(1)"></div>
```

```js
const cardHover = (index) => {
	riveInstance.setBooleanStateAtPath("lessonHover", true, `Lesson ${index}`);
};
const cardNoHover = (index) => {
	riveInstance.setBooleanStateAtPath("lessonHover", false, `Lesson ${index}`);
};
```

### To check the status

```js
const inputIsLessonsHover = [];

for (let i = 1; i <= lessons; i++) {
	inputIsLessonsHover.push(
		inputs.find((input) => input.name === `Lesson ${i} Hover`)
	);
}

inputIsLessonsHover.value;
```

# Triggers

To trigger the marble movement to a lesson or next level.

## Rive Input names:

- `Trigger Lesson 1`
- `Trigger Lesson 2`
- ...
- `Trigger Next Level`

## Setup in JS

```js
const inputLessonsTrigger = [];

for (let i = 1; i <= lessons; i++) {
	inputLessonsTrigger.push(
		inputs.find((input) => input.name === `Trigger Lesson ${i}`)
	);
}
```

To fire the marble movement :

```js
inputLessonsTrigger[0].fire(); // movement to lesson 1
```

To trigger movement from web

```html
<div onclick="card1click()"></div>
```

```js
const card1click = () => {
	inputLessonsTrigger[0].fire(); // fire trigger lesson 1
};
```

# Player Status

To change the marble's color depending on the user profile.
(integrer, 0-3)

- `0` : Standard marble
- `1` : Blue marble
- `2` : Red marble
- `3` : Green marble

Variable to edit in JS: `playerID`

Rive Input name: `playerProfile`

## Setup in JS

```js
playerSelector = inputs.find((i) => i.name === "playerProfile"); // get rive input
playerSelector.value = playerID;
```

# Events

## Lesson events

- `On-1` : Marble arrived on lesson 1
- `Off-1` : Marble left fron lesson 1
- `cardbutton-1` : Lesson 1 from card
- `LessonEvent-1` : To launch lesson 1
- `cardbutton-next` : Next level from card
- `NextLevelButton` To launch next level
- `OnHoverEnter` : Cursor enters in interactive
- `OnHoverExit` : Cursor exit from interactive
- `OnClick` : Cursor click on interactive

## Setup in JS

Current example:

```js
const eventFire = (riveEvent) => {
	const eventData = riveEvent.data;
	const eventName = eventData.name;
	const eventProperties = eventData.properties;

	const eventKey = eventName.split("-")[0];
	const eventIndex = eventName.slice(-1);

	switch (eventKey) {
		// Fire marble movements from card's buttons
		case "cardbutton":
			if (eventIndex == "next") return triggerNextLevel.fire();
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
			break;

		// logic when marble leaves
		case "Off":
			inputMarbleHover.value = false;

			riveInstance.setBooleanStateAtPath(
				"lessonHover",
				false,
				`Lesson ${eventIndex}`
			);
			break;

		// Change pointer when hovering action
		case "OnHoverEnter":
			document.body.style.cursor = "pointer";
			break;
		case "OnHoverExit":
			document.body.style.cursor = "auto";
			break;
		case "OnClick":
			// Custom logic for click event
			break;
	}
```
