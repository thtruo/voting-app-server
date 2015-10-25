#A Full Stack Redux Tutorial#

##Introduction##
After using [Meteor 1.1](meteor.com) with [React](http://facebook.github.io/react/), I became delightfully obsessed with the React way of building UI components for my apps. Here's another learning journey for me to (1) better understand [Flux](http://facebook.github.io/react/blog/2014/05/06/flux.html), a structured way of implementing a unidirectional data flow architecture for React applications; (2) practice React; and (3) learn about other pieces of a real-world application stack - ES6, [Babel](http://babeljs.io/), [Socket.io](http://socket.io/), [Webpack](http://webpack.github.io/), and [Mocha](https://mochajs.org/) with [Chai](http://chaijs.com/). For reference, I'm using this [tutorial](http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html).

##Motivation##
In the world of Meteor, I took many of its niceties for granted, especially reactive computation and reactive data sources. On one hand, it is incredible how quickly one can prototype and produce an application in such an integrated full-stack framework like Meteor. However, the nice integrations mean that one is often shielded away from dealing with specific parts of the stack - i.e. module loading, interfacing with a database, how reactivity works, and piecing all these pieces together. Well, I want to venture away from the shield and learn how to develope modular applications outside of Meteor.

##Learnings & Observations##

###The App###
Organizing live votes for groups with the goal of identifying a single winner.

###Summary of Approach###
*TO DO*
1. Architecture
2. Server
3. Client

###Architecture###
*TO DO*

###Server###
*TO DO*

###Client###
*TO DO*


##Learnings about ES6##

To iterate over values of an array, we can use the new `for..of` loop. It looks like this:

    const array = ['a', 'b', 'c', 'd'];
    for (let value of array) {
        console.log(value);
    }
    // console: a, b, c, d

We don't want to use the `for..in` loop from ES5. It was designed to work on plain Objects with string keys and is not great for arrays.

We also may not want to use the `forEach` method from ES5 because we can't break out of the loop using `break` or `return`.


- `for..of` is for looping over data - like values in array
- `for..in` is for looping over object properties
