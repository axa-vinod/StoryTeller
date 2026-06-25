# Random Silly Story Generator

A responsive, premium, and whimsical web application that generates hilarious and unique stories. Built with pure HTML, vanilla CSS, and JavaScript based on the concepts taught in the MDN JavaScript First Steps module.

## 🚀 Features

- **Dynamic Story Generation**: Combines randomized variables (characters, places, funny actions, objects, animals, and foods) with multiple story templates to produce unique tales.
- **Consecutive Duplicate Prevention**: Built-in logic tracks the last generated template and vocabulary items to guarantee that consecutive stories never feel repetitive.
- **Custom Character Name**: Allows the user to input a custom name for the protagonist (with safety filters and length limitations). Uses a random character name if left blank.
- **Unit Conversions (US / UK)**:
  - **US Units**: Renders temperature in Fahrenheit (°F) and weight in pounds (lbs).
  - **UK Units**: Dynamically converts temperature to Celsius (°C) and weight to Stones and Kilograms (`stone (kg)`).
- **Premium UX Design**:
  - Energetic dark-themed glassmorphism interface.
  - Floating ambient light gradients.
  - Artificially simulated 1-second loading spinner for extra polish.
  - Micro-animations for text fade-in.
  - Live timestamps and unique story number counters (`Story #1`, `Story #2`, etc.).
- **Clipboard Utility**: A "Copy Story" button using the Clipboard API accompanied by a visual copy confirmation toast.
- **Full Reset**: A reset button clears active story content, name inputs, options, and index trackers back to the default landing state.

---

## 📂 File Structure

- **[index.html](file:///c:/Users/aksav/.antigravity/Storytell/index.html)**: Semantic elements, unique element IDs for accessibility, page meta descriptions, and CDN integrations (Google Fonts, Lucide Icons).
- **[style.css](file:///c:/Users/aksav/.antigravity/Storytell/style.css)**: Responsive layouts (CSS Grid/Flexbox), dark-mode styling variables, and animation transitions.
- **[main.js](file:///c:/Users/aksav/.antigravity/Storytell/main.js)**: Holds the templates, randomized arrays, calculations, state, event listeners, and DOM manipulation.

---

## 💡 JavaScript Concepts Demonstrated

- **Variables & Constants**: Storing configuration options and state variables.
- **Arrays**: Organizing list options for random picking.
- **Objects**: Bundling vocabulary lists and tracking state structures.
- **Conditionals**: Handing unit choices (`if`/`else`) and fallback name parameters.
- **Math.random()**: Generating randomized indices and weights/temperatures.
- **String Replacement**: Regular expressions to swap out multiple token placeholders globally.
- **DOM Manipulation**: Toggling classes (`hidden`), writing inner HTML, updating content text, and resetting inputs.
- **Event Listeners**: Triggers for buttons (`click`) and keyboard input field (`keydown` for the Enter key).
- **Form Validation & Sanitization**: Stripping out potential HTML markup to prevent XSS issues and limiting character inputs.

---

## 🛠️ How to Run Locally

Since this is a client-side web application, you can run it using any static server. 

### Option 1: Using Node / npx (Recommended)
Open your terminal inside the project directory and run:
```bash
npx http-server -p 8000
```
Then navigate to `http://localhost:8000` in your web browser.

### Option 2: Using VS Code Live Server
If you use Visual Studio Code, right-click `index.html` and choose **"Open with Live Server"**.

### Option 3: Double-click index.html
You can also open the `index.html` file directly in any modern browser by double-clicking it, though some features (such as Lucide icon SVG loading or Clipboard copy API) work best when hosted via a local server URL (`http://localhost`).
