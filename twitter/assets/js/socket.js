// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "assets/js/app.js".

// To use Phoenix channels, the first step is to import Socket,
// and connect at the socket path in "lib/web/endpoint.ex".
//
// Pass the token on params as below. Or remove it
// from the params if you are not using authentication.
import {Socket} from "phoenix"

let socket = new Socket("/socket", {params: {token: window.userToken}})

// When you connect, you'll often need to authenticate the client.
// For example, imagine you have an authentication plug, `MyAuth`,
// which authenticates the session and assigns a `:current_user`.
// If the current user exists you can assign the user's token in
// the connection for use in the layout.
//
// In your "lib/web/router.ex":
//
//     pipeline :browser do
//       ...
//       plug MyAuth
//       plug :put_user_token
//     end
//
//     defp put_user_token(conn, _) do
//       if current_user = conn.assigns[:current_user] do
//         token = Phoenix.Token.sign(conn, "user socket", current_user.id)
//         assign(conn, :user_token, token)
//       else
//         conn
//       end
//     end
//
// Now you need to pass this token to JavaScript. You can do so
// inside a script tag in "lib/web/templates/layout/app.html.eex":
//
//     <script>window.userToken = "<%= assigns[:user_token] %>";</script>
//
// You will need to verify the user token in the "connect/3" function
// in "lib/web/channels/user_socket.ex":
//
//     def connect(%{"token" => token}, socket, _connect_info) do
//       # max_age: 1209600 is equivalent to two weeks in seconds
//       case Phoenix.Token.verify(socket, "user socket", token, max_age: 1209600) do
//         {:ok, user_id} ->
//           {:ok, assign(socket, :user, user_id)}
//         {:error, reason} ->
//           :error
//       end
//     end
//
// Finally, connect to the socket:
socket.connect()

let channelRoomId = window.channelRoomId
if (channelRoomId) {
  let channel = socket.channel(`room:${channelRoomId}`, {})

  channel.join()
    .receive("ok", resp => { console.log("Joined successfully", resp) })
    .receive("error", resp => { console.log("Unable to join", resp) })

  // Now that you are connected, you can join channels with a topic:

  document.querySelector("#new-message").addEventListener('submit', (e) => {
    e.preventDefault()
    let messageInput = e.target.querySelector('#message-content')
    var msglist = document.getElementById("msglist");
    let messageSender = msglist.getAttribute("data-uname");

    channel.push('message:add', { message: messageInput.value })

    messageInput.value = ""
  });

  channel.on(`room:${channelRoomId}:new_message`, (message) => {
    console.log("message", message)
    renderMessageMe(message)
  });
}

let retweetRoomId = window.retweetRoomId
if (retweetRoomId) {
  let channel = socket.channel(`room:${retweetRoomId}`, {})

  channel.join()
    .receive("ok", resp => { console.log("Joined successfully", resp) })
    .receive("error", resp => { console.log("Unable to join", resp) })

  // Now that you are connected, you can join channels with a topic:
   console.log("HERE IN RETWEET JS 1")
  document.querySelector("#new-retweet").addEventListener('submit', (e) => {
    e.preventDefault()
    let messagenumberInput = e.target.querySelector('#message-number')
    var msglist = document.getElementById("msglist");
    let messageSender = msglist.getAttribute("data-uname");
    
    console.log("HERE IN RETWEET JS 2")
    channel.push('message:retweet', { message: messagenumberInput.value })

    messagenumberInput.value = ""
  });

  channel.on(`room:${retweetRoomId}:new_message`, (message) => {
    console.log("message", message)
    renderMessageMe(message)
  });
}

const renderMessageMe = function(message) {
  let messageTemplate = `
      <p>${message.content}</p>
  `
  document.querySelector("#yourtweets").innerHTML += messageTemplate
};

const renderMessage = function(message) {
  let messageTemplate = `
      <p>${message.content}</p>
  `
  document.querySelector("#yourfeed").innerHTML += messageTemplate
};

let subRoomId = window.subRoomId
if (subRoomId) {
  let channel = socket.channel(`room:${subRoomId}`, {})

  channel.join()
    .receive("ok", resp => { console.log("Joined successfully", resp) })
    .receive("error", resp => { console.log("Unable to join", resp) })

  // Now that you are connected, you can join channels with a topic:

  document.querySelector("#new-message").addEventListener('submit', (e) => {
    e.preventDefault()
    var msglist = document.getElementById("msglist");
    let messageSender = msglist.getAttribute("data-uname");

    channel.push('message:add', { message: messageInput.value })

    messageInput.value = ""
  });

  channel.on(`room:${subRoomId}:new_message`, (message) => {
    console.log("message", message)
    renderMessage(message)
  });
}

export default socket
