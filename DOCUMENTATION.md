# GL.JS: Technical Documentation

GL.JS is a lightweight JavaScript micro-framework designed to provide JSX support, Virtual DOM rendering, and state management using a FLUX architecture. This documentation explains the framework function by function to facilitate understanding and development by other contributors.

## 1. JSX Support: `createElement` Function

### Purpose
The `createElement` function converts JSX or a virtual node structure into a JavaScript object representation. It serves as the core of your component system.

### Code
```javascript
function createElement(type, props, ...children) {
    return {
        type, // Node type (e.g., 'div', 'span', etc.)
        props: props || {}, // Properties such as attributes or event handlers
        children: children.flat().map(child =>
            typeof child === "object" ? child : createTextElement(child)
        ), // Ensures all children are either objects or text elements
    };
}
```

### Breakdown
- **type**: Specifies the HTML tag or component type (e.g., div, span)
- **props**: Contains properties like attributes or event handlers
- **children**: Holds an array of child elements, which are either objects (virtual nodes) or converted to text nodes via createTextElement

## 2. Helper Function: `createTextElement`

### Purpose
This function creates a virtual text node for plain text content.

### Code
```javascript
function createTextElement(text) {
    return {
        type: "TEXT_ELEMENT", // Special type for text nodes
        props: { nodeValue: text }, // Stores the text content
        children: [], // Text nodes don't have children
    };
}
```

### Breakdown
- **type**: Indicates the node is a text element
- **props.nodeValue**: Holds the actual text content
- **children**: Always an empty array since text nodes cannot have child nodes

## 3. Virtual DOM: `render` Function

### Purpose
The render function takes a virtual DOM node and converts it into a real DOM element, appending it to the container.

### Code
```javascript
function render(element, container) {
    const dom =
        element.type === "TEXT_ELEMENT"
            ? document.createTextNode("") // Create a text node
            : document.createElement(element.type); // Create a DOM element

    // Apply properties
    Object.keys(element.props).forEach(name => {
        if (name !== "children") { // Ignore children as they're handled recursively
            dom[name] = element.props[name];
        }
    });

    // Recursively render children
    element.children.forEach(child => render(child, dom));

    // Append to container
    container.appendChild(dom);
}
```

### Breakdown
- Creates Real DOM:
  - If the node is a text element, it creates a text node
  - Otherwise, it creates a standard DOM element
- Applies Properties: Assigns attributes and event listeners (e.g., onclick)
- Renders Children: Recursively processes child nodes

## 4. State Management: `Store` Class

### Purpose
The Store class implements a centralized state management system using FLUX architecture.

### Code
```javascript
class Store {
    constructor(reducer, initialState) {
        this.state = initialState; // Holds the application state
        this.reducer = reducer; // Function to update state based on actions
        this.listeners = []; // Keeps track of subscribers
    }

    getState() {
        return this.state; // Return the current state
    }

    dispatch(action) {
        this.state = this.reducer(this.state, action); // Update state using the reducer
        this.listeners.forEach(listener => listener()); // Notify all subscribers
    }

    subscribe(listener) {
        this.listeners.push(listener); // Add a listener
    }
}
```

### Breakdown
- **constructor(reducer, initialState)**:
  - reducer: A pure function that determines how state changes in response to an action
  - initialState: The initial state of the application
- **getState()**: Returns the current state
- **dispatch(action)**:
  - Calls the reducer to calculate the new state
  - Notifies all subscribers about the state change
- **subscribe(listener)**: Registers a listener (e.g., a function to re-render the app)

## 5. Application Bootstrap: `createApp` Function

### Purpose
The createApp function initializes the application by rendering the root component and setting up reactivity for state changes.

### Code
```javascript
function createApp(rootComponent, rootElement, store) {
    function renderApp() {
        rootElement.innerHTML = ""; // Clear the previous render
        render(rootComponent(store.getState()), rootElement); // Render the root component
    }

    store.subscribe(renderApp); // Re-render on state changes
    console.log("GL.JS Micro-Framework");
    console.log("Initializing application...");
    renderApp(); // Initial render
}
```

### Breakdown
- **rootComponent**: The top-level component of your application
- **rootElement**: The DOM element where the app will be rendered
- **store**: Provides the state for the app
- **renderApp()**:
  - Clears the root element to prevent duplicate renders
  - Calls the render function with the current state and root component
- Subscribes to Store: Ensures the UI updates whenever the state changes

## General Workflow

1. Use createElement to define your virtual DOM structure
2. Implement a reducer function to handle state transitions
3. Create a Store instance with the reducer and initial state
4. Define your root component, using the state from the store
5. Call createApp with your root component, target DOM element, and store

## Example Usage

```javascript
// Reducer
function todoReducer(state, action) {
    switch (action.type) {
        case "ADD_TODO":
            return { ...state, todos: [...state.todos, action.payload] };
        case "REMOVE_TODO":
            return { ...state, todos: state.todos.filter((_, i) => i !== action.payload) };
        default:
            return state;
    }
}

// Initial State
const initialState = { todos: [] };
const store = new Store(todoReducer, initialState);

// Root Component
function App(state) {
    return createElement(
        "div",
        null,
        createElement("h1", null, "To-Do List"),
        createElement("ul", null, ...state.todos.map(todo => createElement("li", null, todo))),
        createElement(
            "button",
            { onclick: () => store.dispatch({ type: "ADD_TODO", payload: "New Task" }) },
            "Add Task"
        )
    );
}

// Initialize App
createApp(App, document.getElementById("app"), store);
```

Feel free to modify or extend this documentation to suit your framework's development! 🚀