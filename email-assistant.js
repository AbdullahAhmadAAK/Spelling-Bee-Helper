let companies_list = []

// these stay same
let subj = ""
let content = ""

const saveSubjectContent = () => {
    //
    subj = document.getElementById("subject")
    content = document.getElementById("content")

    // render new form
    document.getElementById('left-col').innerHTML = `
    <form action="javascript:void(0)" onsubmit="saveEmail()">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <br><br>
        <button type="submit" class="btn btn-primary">Add Email</button>
        <button type="button" class="btn btn-success" onclick="startSending()">Start Sending</button>
    </form>`
}

const saveEmail = () => {
    const company_obj = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value
    }
    companies_list.push(company_obj)
    document.getElementById("name").value = ""
    document.getElementById("email").value = ""
    console.log('i got saved')
}

const startSending = () => {
    // // prep email
    // const contentInstance = content.replace(/COMPANY/g, )
    // // display it
    // document.getElementById('left-col').innerHTML = `<h1>${subj}</h1><p>${content}</p>`
}