# GL.JS - A Lightweight JavaScript Micro-Framework

Welcome to **GL.JS**, a minimalist JavaScript micro-framework designed for simplicity and efficiency. GL.JS enables you to build modern, component-based applications with JSX-like syntax, state management via FLUX architecture, and lightweight Virtual DOM rendering.

---

## Features
- **JSX Support**: Write intuitive, component-based code using a `createElement` function.
- **Virtual DOM Rendering**: Efficiently render and update your UI.
- **FLUX Architecture**: Centralized state management with a straightforward `Store` class.
- **Minimal Setup**: No dependencies or external libraries required.
- **Educational Purpose**: Perfect for learning the inner workings of modern JavaScript frameworks.

---

## Installation
To get started with GL.JS, you only need to include the framework script in your project.

### 1. Clone or Download the Repository
Clone the repository to your local machine:
```bash
git clone https://github.com/gabigonzalz/gljs.git
```

Or download the `gl.js` file directly from the repository.

### 2. Include the Framework in Your Project
Add the `gl.js` script to your HTML file:
```html
<script src="./gl.js"></script>
```

---

## Quick Start
1. **Set Up a Basic Project**:
    Create an `index.html` file with the following structure:
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>GL.JS App</title>
    </head>
    <body>
        <div id="app"></div>
        <script src="./gl.js"></script>
        <script src="./app.js"></script>
    </body>
    </html>
    ```

2. **Create Your Application Logic**:
    In `app.js`, define your reducer, initial state, components, and mount your app:
    ```javascript
    // Reducer
    function reducer(state, action) {
        switch (action.type) {
            case 'INCREMENT':
                return { count: state.count + 1 };
            case 'DECREMENT':
                return { count: state.count - 1 };
            default:
                return state;
        }
    }

    // Initial State
    const initialState = { count: 0 };
    const store = new Store(reducer, initialState);

    // Root Component
    function Counter(state) {
        return createElement(
            'div',
            null,
            createElement('h1', null, `Count: ${state.count}`),
            createElement('button', { onclick: () => store.dispatch({ type: 'INCREMENT' }) }, 'Increment'),
            createElement('button', { onclick: () => store.dispatch({ type: 'DECREMENT' }) }, 'Decrement')
        );
    }

    // Mount App
    createApp(Counter, document.getElementById('app'), store);
    ```

3. Open `index.html` in your browser, and your app will be ready!

**Example application:** [https://github.com/gabigonzalz/gl.js_framework_example](https://github.com/gabigonzalz/gl.js_framework_example)

---

## Development Guide
If you’re interested in contributing or building on GL.JS, here are some steps to help you get started:

### 1. Folder Structure
- `gl.js`: The framework file.
- `app.js`: Your application logic.
- `index.html`: The entry point for your app.

### 2. Build and Extend the Framework
While GL.JS is simple, it can be extended in various ways:
- **Virtual DOM Optimization**: Implement advanced diffing techniques to optimize updates.
- **Component Lifecycle Methods**: Add hooks like `componentDidMount` or `componentWillUnmount`.
- **Routing**: Build a basic routing system to handle different pages in your app.

### 3. Debugging Tips
- Use `console.log` to debug components, props, and state changes.
- Ensure all `type`, `props`, and `children` passed to `createElement` are valid.
- Check your reducer to ensure it correctly handles actions.

---

## Why Use GL.JS?
GL.JS is perfect for:
- **Learning**: Understand the core ideas behind modern frameworks like React.
- **Small Projects**: Build lightweight applications without the overhead of larger libraries.
- **Experimentation**: Customize and extend the framework to suit your needs.

---

## Contributions
We welcome contributions to improve GL.JS! Here’s how you can help:
1. Fork the repository.
2. Create a new branch.
3. Submit a pull request with your changes.

---

## License
GL.JS is open-source and available under the [MIT License](LICENSE).

Happy coding! 🚀

