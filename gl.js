// Gl.JS: JavaScript micro-framework


// 1. JSX Support: createElement function
// Converts JSX (or a virtual node structure) into a JavaScript object
function createElement(type, props, ...children) {
    return {
        type, // Node type (e.g., 'div', 'span', etc.)
        props: props || {}, // Properties such as attributes or event handlers
        children: children.flat().map(child =>
            typeof child === "object" ? child : createTextElement(child)
        ), // Ensures all children are either objects or text elements
    };
}


// 2. Virtual DOM and Render Function

// Dom text element creation
// Creates a virtual text node object
function createTextElement(text) {
    return {
        type: "TEXT_ELEMENT", // Special type for text
        props: { nodeValue: text }, // Holds text as 'nodeValue'
        children: [], // Text nodes don’t have children
    };
}


// Renders a virtual DOM node into the real DOM
function render(element, container) {
    // Create the corresponding DOM element
    const dom =
        element.type === "TEXT_ELEMENT"
            ? document.createTextNode("") // Handle text nodes
            : document.createElement(element.type); // Handle standard elements

    // Apply properties to the DOM element
    Object.keys(element.props).forEach(name => {
        if (name !== "children") { // Ignore children as they're handled recursively
            dom[name] = element.props[name];
        }
    });

    // Render and append all children recursively
    element.children.forEach(child => render(child, dom));

    // Append the final DOM element to the container
    container.appendChild(dom);
}


// 3. State Management (FLUX Architecture)
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


// 4. Application Bootstrap
function createApp(rootComponent, rootElement, store) {
    function renderApp() {
        rootElement.innerHTML = ""; // Clear previous render
        render(rootComponent(store.getState()), rootElement); // Render the root component
    }

    store.subscribe(renderApp); // Re-render on state changes
    console.log("GL.JS Micro-Framework"); 
    console.log("Initializing application...");
    renderApp(); // Initial render
}
