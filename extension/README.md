# Chrome extension for ACTS

A proof of concept project that injects a graphical overlay into the DOM to improve UX.

## What is ACTS?

Automated Card Tracking System (ACTS) it is a free service offered by [WARHORSE SIMULATIONS](http://www.warhorsesim.com/). In summary it is a website that lets people play board games online, and tracks the progression of the respective games. I discovered the website while researching TITAN implimentations, of which ACTS is the easiest to access and [Colossus](http://colossus.sourceforge.net/) is the most faithfull implimentation. There is also [TitanHD](https://apps.apple.com/gb/app/titan-hd/id488026817) iPad App, (I don't own apple devices to check it out, and [TitanHD](https://play.google.com/store/apps/details?id=ca.valleygames.titan&hl=en) (Android), which I am evaluation currently.

## Why the extension?

For a while I have wanted a project where I could unintrusively improve the user interface by leveragin the Google Chrome Extenson API. ACTs is an legacy system, that uses ASCII art to render the mainboard and battlelands. To me an absolute ideal candidate for my experiment. I played TITAN alot in my youth.

# What does it do?

The extension hooks onto the DOM, after the pages has rendered and parses the ASCII art into a JSON schema, and then overlays pretty pictures and captures a click event on the injected DOM objects, but leaves origin DOM intact. It is an overlay, no more, no less. And that is all it does. Nothing nefarious :D NO TRICKS or TRACKING.

I would love to explore more complex interactions, but I would only go this with the site owners blessing :D

![](./images/before.png)
![](./images/after.png)

I you played TITAN back in the day, and miss the stunning graphics of the game, then this is for you. I guess it is a loveletter to the now deceased [David A Trampier](https://en.wikipedia.org/wiki/David_A._Trampier), RIP
