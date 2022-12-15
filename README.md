## Minimal Working Example of Leaflet in SolidJS

Exactly what it says on the tin. This repo contains a simple SolidJS app with two Leaflet maps and basic reactivity.

The first map places one regular marker, with a button to toggle the marker on or off.

The second uses MarkerClusters to plot random points near Ottawa, Ontario, and has a drop-down menu that lets you filter the points by property. (Language, here, since that's the use case I'm looking at.)

## (More than) One Weird Trick

**Leaflet code needs to run inside an `onMount()` call within your component.**

I couldn't find this documented anywhere and it was a real pain to figure out. But the two examples here should give you enough to work on (and, doubtless, improve on). 

**You need to import the Marker Icon manually if you want to run in production.**

This is apparently a known issue with webpack. I found the solution here: [https://stackoverflow.com/questions/60174040/marker-icon-isnt-showing-in-leaflet](https://stackoverflow.com/questions/60174040/marker-icon-isnt-showing-in-leaflet)
