# Floor 5

[Live demo](https://guillaumecartoonbase.github.io/Pasqal-Floor_5/)

## Rive Doc

[runtime](https://help.rive.app/runtimes/overview)

## rive.js

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
