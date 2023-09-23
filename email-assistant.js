let companies_list = []

// these stay same
let subj = ""
let content = ""

const saveSubjectContent = () => {
    //
    subj = document.getElementById("subject").value
    content = document.getElementById("content").value

    // render new form
    document.getElementById('left-col').innerHTML = `
    <form action="javascript:void(0)" onsubmit="saveEmail()">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <label for="name">Company Name:</label>
        <input type="text" id="name" name="name" required>
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
    // prep email
    const company_obj = companies_list.pop();
    console.log(company_obj)

    const contentInstance = content.replace(/COMPANYNAME/g, company_obj.name)
    const emailInstance = company_obj.email

    // display it
    document.getElementById('left-col').innerHTML = `
        <h3>${subj}</h3>
        <h4>To ${emailInstance}</h4>
        <p>${contentInstance}</p>
        <button class="btn btn-success" onclick="startSending()">Send Next</button>
    `
}