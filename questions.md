#### 1. What is the difference between Component and PureComponent? Give an example where it might break my app.
Both Component and PureComponent are base classes for out custom components. It’s recommended now to use function-based components. The PureComponent will rerender only when props value or state is changed. You can create a pure component using `MyComponent extends PureComponent` or using a React.memo(MyComponent) if you’re using functional react.
It can break the app, when the state/props value is an array or an object. When it’s modified, the reference to it stays the same, and because PureComponent only performs shallow comparison, it behaves like nothing changed.


#### 2. Context + ShouldComponentUpdate might be dangerous. Why is that?
Context is usually used for managaing global state of the application. ShouldComponentUpdate works as it should for local state and props. Combining these two can lead to misbehaviour of the rerenders.

#### 3. Describe 3 ways to pass information from a component to its PARENT.

* A callback function passed to child component. When ran, it can for example change state in parent component.
* Event emitters/CustomEvent 
* Context API 

#### 4. Give 2 ways to prevent components from re-rendering.
* Wrap the component in React.memo()
* Use hooks like useMemo() for heavy calculations


#### 5. What is a fragment and why do we need it? Give an example where it might break my app.
A fragment is a “ghost” element only for react, it’s not rendered in the browser. React expects us to give every component a single parent element. It’s used when we want to skip adding that additional HTML element to our code: 
```
<> 
<h1>Hello!></h1>
<p>How’s life?</p>
</>
```
It should be used with caution because it does not create a node in DOM tree, and does not really wrap the elements. It can break the styles, as we don’t really know what the parent component will be.

#### 6. Give 3 examples of the HOC pattern.
HOC is a design pattern where one component wraps another, and returns an enhanced version of that second component. 

a) 
```
const withLogger = (WrappedComponent) => {
	return (props) => {
	useEffect(() => {console.log(“Component initially rendered!”)}, []);
…
return <WrappedCompoent {...props} />;
}
}
```
usage: 
```
const MyComponentWithLogger = withLogger(MyComponent)
```
b)
```
const withUserContext = (WrappedComponent) => {
  	return (props) => {
   		const userContext = useContext(UserContext);
    		return <WrappedComponent userContext={userContext} {...props} />;
 	};
};
```
usage:
```
const MyComponentWithUserContext = withUserContext(MyComponent);
```
c) React.memo - provides mechanisms to optimise components

#### 7. What's the difference in handling exceptions in promises, callbacks and async...await?
* Callbacks have a syntax, where the first argument is for error and second is for result.
* In Promises we are given methods like .then() to handle resolved values and .catch() to handle errors. 
* With async/await we use try/catch to handle exceptions

#### 8. How many arguments does setState take and why is it async.
It takes two arguments. One is the new updated value the second one is a callback function. The setState in async, because react schedules the updates and rerenders the component only once even if state is changes in a few places.

#### 9. List the steps needed to migrate a Class to Function Component.
* Remove the “class” keyword and “extends Component”
* Refactor lifecycle methods to hooks (useEffect)
* Refactor state to hooks (useState)
* Remove render method
* Refactor component and remove constructor, there is no “this” anymore fot a component

#### 10. List a few ways styles can be used with components.
a) className=”my-class” and define the class in a css file

b) Inline style 
```
<div style={color: ‘red’}></div>
```

c) Styled Components

d) CSS-in-js

#### 11. How to render an HTML string coming from the server.
If we’re getting a html from the server it should be sanitised before using it. 
There are libraries that can help us achieve it (like dom-purify), but we can also use dangerouslySetInnerHTML if we trust the source.
