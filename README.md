# ReactNative-Animations

#### We have two types of animation systems provided by React-Native:

### 1. LayoutAnimation:

- It's easy to setup but we don't have much control over it.

### 2. Animated:

- It's a bit difficult to set up but we get more control over it and therefore can have more complicated animations with it..

## Animated System
Different Modules that helps in defining different paramters for the animations are:
1. Values Module:
  - It has Value and ValueXY objects to define the current values of the element.
2. Types Module:
  - It gives Decay,Spring and Timing object to define the course of animation.
3. Component Module:
  - Defines the actual component on which we apply the animation (Like Image, Text, View etc )
  
### LifeCycle of the animated Component
  1. Component + Animated.View renderes
  2. Animated.View inspects props and find its animated values
  3. AnimatedXY starts changing
  4.  Animated.View sees updated values from AnimatedXY
  5. View updates its styling
  
#### User inputting like touching the screen or dragging the component using fingers, it is handled by Gesture System (PanResponder Sytem) and Component moving will be handled by Animated System.

### Things to know for Gesture System
  1. What are we touching
  2. What component handles touch
  3. How is the gesture changing
PanResponder Object provides many functions for the control like
  - onStartShouldSetPanResponder(): it basically tells wether this should handle,respond to the the interaction made,eg:if it should do anything id user touches the component.it has true or false as return value
  - onPanResponderMove(event,gesture):keeps track of the movement and all the details of the interaction.
  - OnPanResponderRelease():it tells what to do when in interaction removes or is released.
  
  
