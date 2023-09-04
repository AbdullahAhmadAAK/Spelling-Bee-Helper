let emailsList = []
let emailsListElement = document.getElementById("emailsListElement")

const form = document.getElementById("addLetterForm")

form.addEventListener('submit', (event) => {
    event.preventDefault() // prevent default submission

    // take inputs as they are
    let addressee = document.getElementById('addressee').value // replaces {X}
    const email = document.getElementById('email').value
    let subject = document.getElementById('subject').value
    const company = document.getElementById('company').value // replaces {Y}
    let content = document.getElementById('content').value 

    // if addressee is unique, proceed
    const matchingEmailFound = emailsList.find(email => email.addressee === addressee)
    if(matchingEmailFound) {

        return
    }

    // fix up addressee 
    addressee = "Dear " + addressee + ","

    // fix up subject
    subject = subject.replace("{X}", addressee)
    subject = subject.replace("{Y}", company)

    // fix up content
    content = content.replace("{X}", addressee)
    content = content.replace("{Y}", company)

    // prepare email object
    const newEmailobj = {
        addressee: addressee,
        email: email,
        subject: subject,
        company: company,
        content: content
    }

    // add email object to list of emails
    emailsList.push(newEmailobj)

    // resetting inputs to ""
    document.getElementById('addressee').value = ""
    document.getElementById('email').value = ""
    document.getElementById('subject').value = ""
    document.getElementById('company').value = ""

    // display new list
    displayEmailsList()

    // debugging
    console.log("New Email Obj", newEmailobj)
    console.log("ALL EMAILS", emailsList)
})

document.addEventListener('DOMContentLoaded', () => {
    displayAddForm()
    displayEmailsList()
})

const displayEmailsList = () => {

    emailsListElement.innerHTML = "" // clear old emails first

    emailsList.forEach((emailObj, index) => { // render each email to the emailsListElement

        const listItem = document.createElement('li')
        listItem.textContent = 'Email to ' + emailObj.company

        // Create a new button element
        const viewButton = document.createElement('button')
        viewButton.textContent = 'View'
        viewButton.setAttribute('onclick', `viewEmail(${index})`)
        viewButton.classList.add('btn', 'btn-success')
        
        listItem.appendChild(viewButton)

        emailsListElement.appendChild(listItem)
    })
}

const viewEmail = (email_number) => {   
    // this is supposed to render itself in left column
}

const displayAddForm = () => {
    const left_box = document.getElementById('left-col')

    const html = `
    <form id="addLetterForm">
                <div class="form-group">
                    <label for="addressee">Addressee</label>
                    <input type="text" class="form-control" id="addressee" required>
                </div>
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" class="form-control" id="email" required>
                </div>
                <div class="form-group">
                    <label for="subject">Subject</label>
                    <input type="text" class="form-control" id="subject" required>
                </div>
                <div class="form-group">
                    <label for="company">Company Name</label>
                    <input type="text" class="form-control" id="company" required>
                </div>
                <div class="form-group">
                    <label for="content">Content</label>
                    <textarea class="form-control" id="content" cols="100" rows="10" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
    `
    left_box.innerHTML(html)

}