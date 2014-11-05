lightsounds
===========

Work in progress light driven drum machine using Intel Galileo Gen2.

Client side dials comunicate to the nodejs server, hosted on the Galileo, through socket.io. These dials control the delay between LED flashes. While the server is running, the Galileo will pull data from all light sensors. When time permits, sounds will be played client side when a light flashes creating a light interactive drum machine.

Best run through Intels XDK iot edition.
