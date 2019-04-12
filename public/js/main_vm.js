import ChatMessage from './modules/ChatMessage.js';


const socket=io();

function setUserId({sID, message}) {
    //debugger;
    console.log('connected', sID, message);
    vm.socketID = sID;
}

function appendMessage(message) {
    vm.messages.push(message);
}


const vm = new Vue({
    data: {
        connectedUsers: [],
        socketID: "",
        nickname: "",
        message: "",
        messages: []
    },

    created: function () {
        socket.on('user joined', function (socketId) {
            this.connectedUsers.push(socketId);
        }.bind(this));
    },

    methods: {
        dispatchMessage() {
            //send a chat message
            socket.emit('chat message', { content: this.message, name: this.nickname || "Anonymous"} );
            this.message = "";

        },

        userIsTyping: function (nickname) {
            if(this.areTyping.indexOf(nickname) >= 0) {
                return true;
            }

            return false;

        },
         
        usersAreTyping: function () {
            if(this.areTyping.indexOf(socket.id) <= -1) {
                this.areTyping.push(socket.id);
                socket.emit('user is typing', socket.id);
            }
        },

        stoppedTyping: function (keycode) {
            if (keycode == '13') {
                var index = this.areTyping.indexOf(socket.id);
                if (index >= 0) {
                    this.areTyping.splice(index,1);
                }
            }
        }
    },

    components: {
        newmessage: ChatMessage
    }
}).$mount("#app");

socket.addEventListener('connected', setUserId);
socket.addEventListener('chat message', appendMessage);
socket.addEventListener('disconnect', appendMessage);


socket.addEventListener('connected', setUserId);