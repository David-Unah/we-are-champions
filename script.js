import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"




const appSetting = {
    databaseURL: "https://kitty-store-86907-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSetting)
const dataBase = getDatabase(app)
const commentsInDb = ref(dataBase, "Endorsements")

const inputValue = document.getElementById('main-input')
const listplace = document.getElementById('unorderlist')
const fromInput = document.getElementById('from-input')
const toInput = document.getElementById('to-input')
const publishBtn = document.getElementById('publish-button')
let commentDetails = {}

publishBtn.addEventListener('click', function() {
    let inputedComment = inputValue.value
    let fromInputValue = fromInput.value
    let toInputValue = toInput.value
    commentDetails = {
        userName: fromInputValue,
        receiver: toInputValue,
        userComment: inputedComment
    }

    if (inputedComment === '') {
        inputValue.style.border = "1px solid red"
    } else {
        inputValue.style.border = "1px solid transparent"
        push(commentsInDb, commentDetails)
        inputValue.value = ""
        fromInput.value = ""
        toInput.value = ""

    }
    
})


onValue(commentsInDb, function(snapshot) {
    if (snapshot.exists()) {
        let dataBaseValue = Object.entries(snapshot.val())
        clearEndorsement()

        for (let i = 0; i < dataBaseValue.length; i++) {
            let allComments = dataBaseValue[i]
            let newComment = document.createElement("li")
            let receiverName = allComments[1].receiver
            let senderName = allComments[1].userName
            let senderComment = allComments[1].userComment
            newComment.innerHTML = `
            <li>
                <p class="extra-details">To ${receiverName}</p>
                <p id="mainComment">${senderComment}</p>
                <p class="extra-details">From ${senderName}</p>
            </li>
            `
            listplace.append(newComment) 
        }
    } else {
        listplace.innerHTML = `<li id="noComments"> No comments here</li>`
    }
    

})
 
function clearEndorsement() {
    listplace.innerHTML = ""
}