const variables = [];

function validateregister() {
    let name = $('#name').val();
    let email = $('#email').val();
    let password = $('#password').val();
    if (name.length > 8 && /^\w[\w\d]*@\w[\w\d]*\.[\w\d]+$/.test(email) && password > 8) {
        let register = $('#register');
        register.classList.add('disabled');
        register.children[0].classList.remove('d-none');
    }
    return true;
}

function validatelogin() {
    let email = $('#email').val();
    let password = $('#password').val();
    if (/^\w[\w\d]*@\w[\w\d]*\.[\w\d]+$/.test(email) && password > 8) {
        let login = $('#login');
        login.classList.add('disabled');
        login.children[0].classList.remove('d-none');
    }
    return true;
}

/**
 *
 * @param {HTMLElement} elem
 * @param {string} comment_id
 */
function openreplies(elem, comment_id) {
    let conts = document.getElementsByClassName('commentdiv');
    let replybtns = document.getElementsByClassName('replybtns');
    for (let i = 0; i < conts.length; i++) {
        conts[i].classList.add('d-none');
    }
    for (let i = 0; i < replybtns.length; i++) {
        replybtns[i].classList.remove('d-none');
    }
    elem.parentElement.classList.add('d-none');
    document.getElementsByClassName('comment-' + comment_id)[0].classList.remove('d-none');
}

function openReply() {
    if (typeof variables['reply'] !== 'undefined') {
        let elem = document.getElementsByClassName('comment-' + variables['reply'])[0];
        elem.classList.remove('d-none');
        elem.parentElement.children[(elem.parentElement.children.length - 1)].classList.add('d-none');
        elem.children[(elem.children.length - 2)].scrollIntoView();
    }
}


function deletepost(id) {
    getConfirmationDialog('Delete', 'Are you sure?', 'Yes', 'No', () => {
        window.location.assign('/delete/post/' + id);
    }, () => {})
}

function updatepost(id) {
    window.location.assign('/update/post/' + id);
}

function deletecomment(post, id) {
    getConfirmationDialog('Delete', 'Are you sure?', 'Yes', 'No', () => {
        window.location.assign('/post/' + post + '/delete/comment/' + id);
    }, () => {})
}

/**
 *
 * @param {HTMLElement} elem
 * @param {Number} id
 */
function updatecomment(elem, id) {
    let cmtEditModel = getModal('Edit Comment', '400px');
    let cmtEditContent = cmtEditModel.content;
    let commentinp;
    cmtEditContent.addChild(
        new AkrElement('div').setAttribute('class', 'form-group pt-3 ps-3 pe-3')
        .addChild(
            commentinp = new AkrElement('textarea').setAttribute('maxlength', '500').setAttribute('class', 'form-control p-2 mb-2 h-24').setInnerText(elem.parentElement.previousElementSibling.previousElementSibling.textContent)
        ).addChild(
            new AkrElement('div').setAttribute('class', 'd-flex flex-row p-2 justify-content-around')
            .addChild(
                new AkrElement('button').setAttribute('type', 'button').setAttribute('class', 'btn btn-danger').setInnerText('Cancel').on('click', (elem, e) => {
                    cmtEditModel.modal.getElement().remove();
                })
            ).addChild(
                new AkrElement('button').setAttribute('class', 'btn btn-primary').setAttribute('type', 'button').setInnerText('Save').on('click', () => {
                    $.post('/update/comment/' + id, {
                        "_token": $('meta[name="csrf-token"]').attr('content'),
                        "comment": commentinp.getElement().value
                    }, (data, status, xhr) => {
                        if (data == 1) {
                            window.location.reload();
                        }
                    })
                })
            )
        )
    )

    document.body.appendChild(cmtEditModel.modal.getElement());
    cmtEditModel.modal.addClass('w3-show');
}