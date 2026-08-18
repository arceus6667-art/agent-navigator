# Agent Navigator

TASK: ADD THE AI AUTONOMOUS WEB AGENT UI

Continue from the existing project.

CURRENT REPOSITORY:
https://github.com/arceus6667-art/pixel-perfect-polish.git

Do NOT rebuild the existing website.
Do NOT redesign the existing IEEE page.
Preserve the current visual implementation exactly.

Use the attached images as visual references:

Image 1 = desired website output

Image 2 = floating PNG agent icon

Image 3 = expanded agent interface

GOAL

Add a floating AI agent launcher to the existing website.

CLOSED STATE

Use the provided PNG image as the agent icon.

Requirements:

Floating above the website content

Fixed positioning

Movable by mouse/touch drag

Smooth dragging

Must stay inside viewport bounds

Remember its last position during the session

Do not interfere with normal page scrolling

Cursor should clearly indicate it is draggable

Preserve the exact PNG appearance

Do not redesign the icon

Default position should visually resemble Image 1.

OPEN STATE

When the user clicks the icon, open the agent interface shown in Image 3.

The interface should:

Open beside/near the icon

Have a polished but compact appearance

Match the provided screenshot

Have open/close behavior

Preserve the website behind it

Never push or resize the page layout

Work on desktop and mobile

INTERACTION

Support:

Drag icon

Click icon to open

Close button

Reopen

Outside-click behavior where appropriate

Keyboard accessibility

Mobile touch dragging

Do NOT create fake AI functionality yet.

RESPONSIVE

Desktop:

Floating icon remains visible

Panel does not go off-screen

Mobile:

Icon remains accessible

Panel fits within viewport

No horizontal overflow

Touch dragging works

IMPORTANT

This prompt is UI-only.

Do not change:

Header

Navigation

IEEE content

Committee

Gallery

Footer

Existing page styling

Implement the floating agent as an isolated reusable component so future prompts can connect the real AI functionality to it.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a79dcab0-7210-4bc4-932c-726d739c1f23).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
