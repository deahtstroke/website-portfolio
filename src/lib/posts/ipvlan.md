---
title: "Why my Stats Crawler needed its own IP-rotating proxy (and why Host networking wasn't the answer)"
description: "Giving containers real IPs: How the Ipvlan driver replaced host networking in my Docker Swarm stack"
date: "2026-07-27"
thumbnailText: "IPvlan"
categories: ["Docker", "Linux", "Networking", "IPvlan", "OSI"]
published: false
colorStart: "180 100% 50%"
colorEnd: "193 100% 50%"
timeToRead: "9 mins"
---

## Setup Before IPVlan

Whilst I went back to one of my projects called [Rivenbot](https://github.com/riven-of-a-thousand-sevrers)
I tried revisiting one of the core modules I had created: The Rotating-Reverse Proxy.
The way that it worked was simple, it attached to one of the interfaces in the host,
given that the interface had the IPv6 addresses attached to it, then it just simply
round-robins through the provided IPs as requests come in, in addition to rate-limiting
based on the target URL path. All of this sounds pretty straight forward when deploying
the proxy right on top of the host, however, the project itself runs all modules
inside container on Docker Swarm.

This puts some heavy constraints on the reverse-proxy in regards to networking.

Swarm handles cross-node service discovery and load-balancing through user-defined
overlay networks. Overlay networks are distributed networks that span every node in
the cluster and let services find each other by name. It's genuinely one
of Swarm's best features, and if you're running services that just need
to talk to each other, you should lean on it as much as possible.

The problem about the reverse-proxy however is that it relies on having discoverable and
routable IPs that a normal docker [bridge network](https://docs.docker.com/engine/network/drivers/bridge/)
would not have, since Docker's IPAM system gives containers private IPs.
And as previously mentioned, the proxy itself needs to have a
network interface that has addressable IPs attached to them.

## The Problem with Host Networking

My first instinct was to use Docker's [host network driver](https://docs.docker.com/engine/network/drivers/host/)
so my proxy would have direct access to the host computer's NIC.
This way I could simply attach my IPv6 addresses using the `ip` utility.
However, there was a small caveat to using this driver: Using host mode
on Docker Swarm bypasses the routing mesh which gives me natural port publishing,
load balancing and DNS resolution. To be super honest, the realest reason of
the three that I did not want to give up was DNS resolution. I wanted to keep,
the convenience of calling my Swarm proxy service by its name and have the cluster
be able to resolve to the right container seamlessly. Therefore,
neither a host network-driver or publishing the proxy's port using
host mode solved my issue.

## IPvlan Network?

Then after some thorough research and triple-checking the available network
drivers that were available with Docker,
