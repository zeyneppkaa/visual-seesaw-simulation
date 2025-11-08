# Seesaw Simulation
## Thought Process and Design Decisions
I started by breaking down the entire project into tasks in my mind. My first step was to design the info panel, which would display key data such as left and right weights, the next weight, and the tilt angle. Once the info panel was ready, I created the main simulation container and added the pivot and plank elements to it, establishing the core structure of the seesaw.

The next goal was to generate weight objects with random values and allow users to place them on the plank interactively. After implementing this functionality, I focused on activating the physics rules. Using torque calculations, I ensured that each weight affected the plank realistically and applied smooth animations for rotation and object movement.

Finally, I integrated localStorage to preserve the simulation state across page reloads and implemented a reset button to allow users to clear the seesaw and start over.

## Trade-Offs or Limitations
Click Alignment

Issue: Weight objects were not landing exactly at the clicked X-coordinate and sometimes appeared slightly above the plank.

Solution: Adjusted the position calculation to align each weight correctly relative to the plank, improving placement accuracy.

Responsive Design Constraints

Issue: The seesaw was primarily designed for desktop screens. On smaller screens or mobile devices, the layout may not display correctly.

Solution: Currently unresolved; mobile scaling and layout adjustments were not implemented.

Physics-Based Animation Challenge

Issue: Animating the plank and weight objects to behave according to realistic physics was challenging. Smooth rotation, weight displacement, and visual updates had to be coordinated in each frame while keeping the simulation performant.

Solution: Implemented a basic torque calculation and incremental animation updates using requestAnimationFrame to approximate realistic motion while maintaining smooth performance.

## AI Support
Helped understand and resolve the click alignment issue.

Provided guidance for smooth, physics-based plank and weight animations.

Assisted in drafting clear and professional README content.