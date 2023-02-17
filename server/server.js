const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);

app.use(cors())

// FAKE DB

const serverList = [
    {
        server_id: 1,
        server_name: "Sunucu 1",
        server_description: "Sunucu 1 Açıklama",
        ownerId: 1,
        users: [1]
    }, {
        server_id: 2,
        server_name: "Sunucu 2",
        server_description: "Sunucu 2 Açklama",
        ownerId: 1,
        users: [1]
    },
]

const userList = [
    {
        userId: 1,
        username: "Murat6565",
        user_email: "muratakyoll533@gmail.com",
        servers: [1, 2]
    },
    {
        userId: 2,
        username: "Ahmet",
        user_email: "muratakyoll533@gmail.com",
        servers: [1]
    },
]

const messages = [
    {
        serverId: 1,
        username: "ahmet",
        userId: 2,
        message: "Murat Akyol'un mesajı"
    },
    {
        serverId: 1,
        username: "Murat",
        userId: 1,
        message: "Ahmet'in mesajı"
    }
]

let io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// Veri tabanı eklendiğinde socket.io kısımlarındaki boş istekler silinecek ve yerine express api istekleri getirilecek 
// ["MESSAGES","USER","SERVER LİST","GET SERVER MESSAGES"]

io.on("connection", (socket) => {
    socket.on("login", (info) => {
        socket.emit("userInfo", userList.filter((user) => user.userId == info.userId
        ))
    })

    socket.on("getServers", userId => {
        socket.emit("servers", serverList.filter(server => server.users.indexOf(userId) >= 0 ? true : false))
    })

    socket.on("getServerMessages", serverId => {
        console.log(messages.filter(message => message.serverId == serverId))
        socket.emit("messages", messages.filter(message => message.serverId == serverId))
    })

    socket.on("sendMessage", message => {
        messages.push(message)
    })
})

let PORT = 5000

server.listen(PORT, () => {
    console.log(`Sunucu ${PORT} Adresinden Yayınlanmakta!`)
})