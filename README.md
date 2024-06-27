# Floor 5

[Live demo](https://guillaumecartoonbase.github.io/Pasqal-Floor_5/)

## Rive Doc

[runtime](https://help.rive.app/runtimes/overview)

## rive.js

### Player Status

To change the marble's color depending on the user profile.
(integrer, 0-3)

- `0` : Standard marble
- `1` : Blue marble
- `2` : Red marble
- `3` : Green marble

Variable to edit in js: `playerID`

```js
playerSelector = inputs.find((i) => i.name === "playerProfile");
playerSelector.value = playerID;
```

### Lesson Status

#### Setting a Lesson as Done

To mark a specific lesson as done, set the value of `inputLessonsDone` at the desired index to `true`. For example, to mark the first lesson as done:

```js
inputLessonsDone[0].value = true;
```

#### Updating the Lesson Counter

The function `lessonCounter()` is used to update the lesson counter displayed on the right-hand side. Ensure to call this function after making changes to lesson statuses to reflect the updated count.

#### Setting Lesson Progress Percentage

To set a specific progress percentage for a lesson, adjust the `inputLessonsProgress` value at the desired index. For example, to set the progress of the first lesson to 50%:

```js
inputLessonsProgress[0].value = 50;
```

### Triggers

#### Launching a Lesson or Next Level

To launch a specific lesson or the next level, you can use the following commands:

Movement to Lesson 1:

```javascript
inputLessonsTrigger[0].fire();
```

Movement to the Next Level:

```javascript
triggerNextLevel.fire();
```

Web example

```html
<div onclick="card1click()"></div>
```

```js
const card1click = () => {
	inputLessonsTrigger[0].fire(); // fire trigger lesson 1
};
```

### Hover

Example to setup a hover effect on the lessons from web
Use `inputIsLessonsHover[i]` to select the lesson.

```html
<div onmouseenter="cardHover(0)" onmouseleave="cardNoHover(0)"></div>
```

```js
const cardHover = (index) => {
	inputIsLessonsHover[index].value = true;
};
const cardNoHover = (index) => {
	inputIsLessonsHover[index].value = false;
};
```

### Events

Events return an object
(booleans, integrers and strings can be used as value)

Used in a

```js
const eventFire = (riveEvent) => {
	const eventKey = eventName.split("-")[0];
	switch (eventKey) {
		case "OnHoverEnter":
			document.body.style.cursor = "pointer";
			break;
		case "OnHoverExit":
			document.body.style.cursor = "auto";
			break;
}
```

#### Lessons events

```js
LessonEvent1 = { lesson: 1 };
LessonEvent2 = { lesson: 2 };
(...)
NextLevelButton = { level: 2 };
```
