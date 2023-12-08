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
const publishBtn = document.getElementById('publish-button')


publishBtn.addEventListener('click', function() {
    let inputedComment = inputValue.value
    
    push(commentsInDb, inputedComment)
    inputValue.value = ""
    
})


onValue(commentsInDb, function(snapshot) {
    if (snapshot.exists()) {
        let dataBaseValue = Object.values(snapshot.val())

        clearEndorsement()

        for (let i = 0; i < dataBaseValue.length; i++) {
            let allComments = dataBaseValue[i]
            let newComment = document.createElement("li")
            newComment.textContent = allComments
            listplace.append(newComment)
        }
    } else {
        listplace.innerHTML = `<li id="noComments"> No comments here</li>`
    }
    

})
 
function clearEndorsement() {
    listplace.innerHTML = ""
}