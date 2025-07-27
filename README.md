# thechase-overlay
An open-source OBS overlay, perfect for live streamed quizzes. Inspired by ITV's TV programme "The Chase".
## Prequisites
Any recent version of Node.js should work but I recommend you grab the latest one [here](https://nodejs.org/en).

## Installation
Installation is super simple. You can either git clone or just download by clicking the green 'Code' button at the top or just by pressing [here](https://github.com/NAJJJB/thechase-overlay/archive/refs/heads/main.zip). (does the same thing)
Then, extract the files, open a terminal session (Windows: CMD, Linux, MacOS: Terminal).
Make sure you are in the correct folder and run:
```
node server.js
```
Then just follow the instructions it gives you.
## Usage
Navigate to the url it gives you, it should look a little something like this: `http://localhost:3000/control-panel.html`

Then add:
`http://localhost:3000/overlay.html`
as a 'Browser Source' in OBS. You can preferably set the resolution to 1920x1080, or the size of your stream.

1. Start by modifying the questions to your liking. Guide [here](#creating-new-questions)
2. Reset the display
3. Then just click through the steps, just remember to select what the contestant picked in the software before you reveal contestant's answer, same goes for chaser.
4. Always press save when you have modified a question.

## Creating new questions

I have preloaded the software with some default questions to get you started, these can be changed in the code if you know what you are doing. (control-panel.html ln: 705) 

All questions are written in this format:
```
{

text: "Question?",

options: {

a: "Answer A",

b: "Answer B",

c: "Answer C",

d: "Answer D"

},

correctAnswer: "a",

contestantAnswer: "a",

chaserAnswer: "a"

}
```
You can, for example ask any AI model to generate a bunch of questions in this format if you don't feel like putting them in yourself. Note: there is currently no way to create a new question in the UI, yet. If you want to add more questions, modify the JSON accordingly. Don't forget the comma, except for the last one, of course.

## Planned stuff

 - Animations
 - Sounds
 - Better visuals

## Contributing is very appreciated! Fork, contribute, submit a PR.

# Happy quizzing
