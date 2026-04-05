# The Unclickable Button

A minimalist kinetic web game where the objective is simple: click the "Play Now" button. The only catch? **The button doesn't want to be clicked.**

Using "magnetic repulsion technology" (aka basic JavaScript math and physics), the button dynamically computes distance and velocity to flee from your cursor just as you get close. This creates an incredibly frantic (and slightly enraging) mini-game experience. 

Can you outsmart it?

## Features

- **Dynamic Evade Mechanics**: The button uses Euclidean distance calculations and velocity clamping to escape swift mouse movements.
- **Panic Jumps**: If cornered, the button can perform a "leap" across the screen simulating a panic jump to break free from your cursor.
- **Speed Detection**: Moving your mouse too quickly triggers a "Slow Down!" anti-cheat overlay.
- **Beautiful UI**: Polished, modern minimalist interface featuring glowing effects, sharp typography, and a cohesive design system using _Plus Jakarta Sans_.

## File Structure

- **`index.html`**: The main landing page setting up the lore, rules, and game introduction.
- **`game.html`**: The interactive "play zone" where the evasion script is active.
- **`front.css`**: Styling specifically tailored for the landing/index page.
- **`style.css`**: Core styling applied across the game's interface.
- **`script.js`**: The physics and cursor-tracking logic that powers the evasive maneuvers.

## Getting Started

To play or experiment with the code:

1. Clone or download this repository to your local machine.
2. Open `index.html` in your favorite modern web browser (e.g., Chrome, Edge, Safari, Firefox).
3. Try to click the button. 
4. (Optional) Get mad and check the console logs or tweak `script.js` parameters to lower the difficulty. 

## Customizing The Difficulty

Want to make the button a bit more forgiving or entirely impossible? Check `script.js`:

- Increase/decrease `speed`, `distance`, `acceleration`.
- Adjust `jumpCoolDown` to control how often the button is allowed to "teleport".
- Modify the `distance < 150` radius which determines when the button begins actively repelling away.

## Author

Created by [TheOslo](https://github.com/TheOslo). 
*Get RageBaited.*
