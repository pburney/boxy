Boxy - Readme
===============================================================

Welcome to Boxy, the cool box dragging app.



Original Prompt
---------------------------------------------------------------

    Please time yourself to up to two hours and get as far as you can on the following:

    HTML5 Canvas Square

     1. create a 300x300 pixel Canvas object

     2. render a 40x40 pixel square into the Canvas object

     3. make the square draggable.

    (Target the most recent stable release of the Chrome browser.)

Start time: 10:02 PM, February 27, 2018

End time: 12:05 AM, February 28, 2018


Response
-----------------------------------------------------------------

I came into this project without any experience working with Canvas, though I knew the basics of what it was. I have a lot of JavaScript experience but these days
do a lot of stuff with either libraries like jQuery or ecosystems like React / Backbone / Underscore. It's fun to get back to basics, but I'm a bit rusty in some places.

Here's how I tackled the problem

Step 1

Get a bit of info about the Canvas API

https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

Step 2

Create the base files. We want to separate the concerns to allow for more easy editing of the parts by different people

Step 3

Define the main functionality of a drag and drop application.

Step 4

Branding! Don't forget to thank the funders. Make it pretty (for some value of pretty)

Step 5

Documentation is key!

Step 6

Finalize the work and finish this README

Step 7

???

Step 8

Profit



Future Enhancements
---------------------------------------------------------------------

This is really rough and could definitely be cleaned up a lot. It probably doesn't look anything like what a person experienced with Canvas programming would do. :-)

I'd really want to have a Box class and a registry to keep track of the different boxes and their positions. I hate that I resorted to using a global state for the box coordinates.

I'd want to clean up the event management to use eventListeners instead of the old-school handlers I used and closures instead of my global CC variable.

It would be nice to change the opacity of the box while it's being dragged to indicate to the user that it's a drag operation. I didn't want to look up all the color numbers
to switch to rgba so I leave it for the future.

We could adjust the tolerances for what it means to "click on the box" and allow users who almost click on the box to still move it

It would be great to do some border detection to avoid things going off the edges of the canvas




Things I learned
---------------------------------------------------------------------

You can't just use the Width/Height defined in CSS... you need to set it in the HTML or programatically. If not, it's a weird scaled canvas

It's not like a DOM where we have separate objects, so we will need to keep track of two states:

  1) if the canvas is being clicked or not and
  2) if the click is over where our box is at the moment

  If both (1) and (2) are true, we want to continually re-render the canvas to show the box under the cursor

Getting the general cursor coordintates was a bit of a challenge since I wasn't responding to an event. I probably could have created a syntetic event but
decided to use the built in mousemove event and keep track of it in state.
