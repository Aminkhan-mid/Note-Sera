let notesData = JSON.parse(localStorage.getItem("Notes")) ||[
    {
        content: "Humans are the greatest stalkers in the world!",
        id: Date.now()
    }
]

const textInput = document.getElementById('textarea')
const saveBtn = document.getElementById('save-btn')

saveBtn.addEventListener("click", function(){
    pushTextValue()
})

function pushTextValue(){
    if(textInput.value){
        notesData.unshift({

            content: textInput.value,
            id: Date.now()
        })
        render()
        textInput.value = ""
        localStorage.setItem("Notes", JSON.stringify(notesData))
    }
}


document.addEventListener('click', function(e){

    if(e.target.classList.contains('del-btn')){
        const noteId = Number(e.target.dataset.id)

        notesData = notesData.filter(function(note){
            return note.id !== noteId
        })
            localStorage.setItem("Notes", JSON.stringify(notesData))
            render()
    }
    
})


function getFeedHtml(){
    let feedHtml = ''

    notesData.forEach(function(note){
        feedHtml += 
        `
        <div class="note">
            <div class="note-inner">
                <p class="note-text">${note.content}
                </p>
                <i class="fa-regular fa-trash-can del-btn" data-id="${note.id}"></i>

            </div>
        </div>
        `
    })
    return feedHtml

}


function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
}
render()