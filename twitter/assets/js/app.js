// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.css"

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative paths, for example:
import socket from "./socket"
// var msglist = document.getElementById("msglist");
// var me = msglist.getAttribute("data-uname");
// var room = msglist.getAttribute("data-rname");
// var subscribe = msglist.getAttribute("data-sname");
// import Room from "./room"
// import Sub from "./sub"
// Room.init(socket, me, room)
// Sub.init(socket,me, subscribe)
