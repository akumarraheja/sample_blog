/**
 * adds a cancelable floating message on document. It also disappears after a few seconds
 * @param {string} message floating message
 * @param {Boolean} warning true or false
 */
function showMsg(message, warning = false) {

    let element = document.getElementById('msg-container');
    if (element == undefined) {
        element = new AkrElement('div')
            .setAttribute('class', 'akr_msg_container')
            .setAttribute('id', 'msg-container')
        document.body.appendChild(element.getElement());
    } else {
        element = AkrElement.getFromHTMLElement(element);
    }
    let newMessage = getNewMessageElement(message, warning);
    element.addChild(newMessage);
}

/**
 * sub-function of addMessage() function. Do not call this function. use addMessage()
 * @param {string} message
 * @param {Boolean} warning
 * @returns {AkrElement}
 */
function getNewMessageElement(message, warning) {
    let messageblock = new AkrElement('div')
        .setAttributeIF('class', 'mx-4 my-2 text-center alert alert-danger alert-dismissible fade show', warning)
        .setAttributeIF('class', 'mx-4 my-2 text-center alert alert-success alert-dismissible fade show', !warning)
        .setAttribute('role', 'alert').setInnerText(message)
        .addChild(new AkrElement('buttom')
            .setAttribute('class', 'btn-close')
            .setAttribute('data-bs-dismiss', 'alert')
            .setAttribute('aria-label', 'Close'))
    setTimeout(() => {
        messageblock.getElement().remove();
    }, 5000);
    return messageblock;
}

/**
 *
 * @param {string} dialogTitle
 * @param {string} dialogMessage
 * @param {string} positive_btn_text
 * @param {string} negative_btn_text
 * @param {function():void} onClickPositiveButton
 * @param {function():void} onClickNegativeButton
 */
function getConfirmationDialog(dialogTitle, dialogMessage, positive_btn_text, negative_btn_text, onClickPositiveButton, onClickNegativeButton) {
    let dialogObject = getModal(dialogTitle, '300px', onClickNegativeButton);
    let content = dialogObject.content;
    content.addChild(
        new AkrElement('div')
        .setAttribute('class', 'w3-padding-small')
        .addChild(
            new AkrElement('div')
            .setAttribute('class', 'w3-center')
            .setAttribute('style', 'margin-bottom: 16px; margin-top: 16px')
            .setInnerText(dialogMessage)
        )
        .addChild(
            new AkrElement('div')
            .setAttribute('style', 'display: flex ; flex-direction: row; justify-content: space-around; align-items: center; w3-padding')
            .addChild(
                new AkrElement('button')
                .setAttribute('class', 'w3-button w3-blue w3-round akr-pointer')
                .setInnerText(positive_btn_text)
                .onClick(() => {
                    onClickPositiveButton();
                    dialogObject.modal.getElement().remove()
                })
            )
            .addChild(
                new AkrElement('button')
                .setAttribute('class', 'w3-button w3-red w3-round akr-pointer')
                .setInnerText(negative_btn_text)
                .onClick(() => {
                    onClickNegativeButton();
                    dialogObject.modal.getElement().remove()
                })
            )
        )
    )
    dialogObject.modal.addClass('w3-show')
    document.body.appendChild(dialogObject.modal.getElement())
}

/**
 *
 * @param Array imagesarray
 * @returns
 */
function getImagesViewer(imagesarray, selectedpic = 0) {
    let i = selectedpic;
    let leftbtn, rightbtn, imgcont;
    let imageelements = [];
    for (let j = 0; j < imagesarray.length; j++) {
        imageelements.push(new AkrElement('img').setAttribute('class', 'w3-animate-opacity').setAttribute('src', imagesarray[j] + "?" + getRndInteger(1000000000, 10000000000)))
    }
    let imageviewer = new AkrElement('div').setAttribute('class', 'image-viewer-modal')
        .addChild(
            leftbtn = new AkrElement('span').setAttribute('class', 'arrow left akr-pointer')
        ).addChild(
            imgcont = new AkrElement('div').setAttribute('class', 'image-viewer-view')
            .addChild(imageelements[i])
        ).addChild(
            rightbtn = new AkrElement('span').setAttribute('class', 'arrow right akr-pointer')
        ).addChild(
            new AkrElement('span').setAttribute('class', 'w3-text-white w3-display-topright akr-pointer').setAttribute('style', 'height:42px;width:42px;font-weight:700;font-size:64px').setInnerHTML('&times;').onClick(() => {
                imageviewer.getElement().remove();
            })
        )
    leftbtn.onClick(() => {
        imgcont.removeAllChildren();
        if (i == 0) {
            i = imagesarray.length - 1;
            imgcont.addChild(imageelements[i])
        } else {
            i -= 1;
            imgcont.addChild(imageelements[i])
        }
    })
    rightbtn.onClick(() => {
        imgcont.removeAllChildren();
        if (i == (imagesarray.length - 1)) {
            i = 0;
            imgcont.addChild(imageelements[i])
        } else {
            i += 1;
            imgcont.addChild(imageelements[i])
        }
    })
    return imageviewer;
}

function clearClassFromClass(classname, classnameelems) {
    let elems = document.getElementsByClassName(classnameelems);
    for (let i = 0; i < elems.length; i++) {
        elems[i].classList.remove(classname)
    }
}

function getLoginModal(modalTitle, modalwidth) {
    let modalData = [];
    modalData['modal'] = new AkrElement('div')
        .setAttribute('class', 'w3-modal')
        .setAttribute('style', 'padding-top: 56px !important; z-index:110')
        .addChild(
            modalData['content'] = new AkrElement('div')
            .setAttribute('class', 'w3-modal-content w3-round w3-animate-top')
            .setAttribute('style', 'padding: 4px; width: 400px; padding-bottom: 32px')
            .addChild(
                new AkrElement('div')
                .setAttribute('style', 'display: flex; flex-direction: row-reverse; justify-content: space-between; align-self: center; width: 100%')
                .addChild(
                    modalData['closebtn'] = new AkrElement('div')
                    .setAttribute('id', 'w3-modal-close-btn w3-text-white')
                    .setAttribute('class', 'w3-hover-text-red w3-text-dark-gray akr-pointer akr-position-relative')
                    .setAttribute('style', 'height: 36px; width: 36px')
                    .addChild(
                        new AkrElement('span')
                        .setAttribute('class', 'w3-display-middle w3-xlarge')
                        .setInnerHTML('&times;')
                    )
                )
            )
        );
    modalData['closebtn'].getElement().addEventListener('click', function() {
        modalData['modal'].removeClass('w3-show');
    })
    if (modalwidth != undefined) {
        modalData['content'].setAttribute('style', 'padding: 4px; width:' + modalwidth + " !important; padding-bottom: 32px")
    }
    modalData['modal'].getElement().addEventListener('keydown', function(e) {
        if (e.keyCode == 27) { // escape key pressed
            modalData['modal'].getElement().remove()
        }
    })
    return modalData;
}

/**
 * returns a modal page object which you can add your content to and later add it to your document.
 * @param {string} modalTitle
 * @param {?string} modalwidth
 * @returns {Array<AkrElement>} modalData object containing 4 AkrElement properties, modalData.modal, modalData.content, modalData.title, modalData.closebtn. you can acquire content HTMLElement from modalData.content.getElement()
 */
function getModal(modalTitle, modalwidth, onclose = false) {
    let modalData = [];
    modalData['modal'] = new AkrElement('div')
        .setAttribute('class', 'w3-modal')
        .addChild(
            modalData['content'] = new AkrElement('div')
            .setAttribute('class', 'w3-modal-content w3-round w3-animate-top')
            .setAttribute('style', 'padding: 4px; width: 400px')
            .addChild(
                new AkrElement('div')
                .setAttribute('style', 'display: flex; flex-direction: row; justify-content: space-between; align-self: center; height: 36px; width: 100%')
                .addChild(
                    modalData['title'] = new AkrElement('div')
                    .setAttribute('class', 'w3-padding')
                    .setAttribute('style', 'align-self: center')
                    .setInnerText(modalTitle)
                )
                .addChild(
                    modalData['closebtn'] = new AkrElement('div')
                    .setAttribute('id', 'w3-modal-close-btn w3-text-white')
                    .setAttribute('class', 'w3-hover-red akr-pointer akr-position-relative')
                    .setAttribute('style', 'height: 36px; width: 36px')
                    .addChild(
                        new AkrElement('span')
                        .setAttribute('class', 'w3-display-middle w3-xlarge')
                        .setInnerHTML('&times;')
                    )
                )
            )
        );
    modalData['closebtn'].getElement().addEventListener('click', function() {
        if (onclose !== false) {
            onclose();
        }
        modalData['modal'].getElement().remove()
    })
    if (modalwidth != undefined) {
        modalData['content'].setAttribute('style', 'padding: 4px; width:' + modalwidth + " !important")
    }
    modalData['modal'].getElement().addEventListener('keydown', function(e) {
        if (e.keyCode == 27) { // escape key pressed
            modalData['modal'].getElement().remove()
        }
    })
    return modalData;
}

/**
 *
 * @param {string} text
 * @returns {string}
 */
function getShortenedString(text) {
    return text.replace(/[^a-zA-Z]/gi, '').toLowerCase();
}

/**
 * checks whether username contains spaces or special characters
 *
 * @param {string} username
 */
function verifyUsername(username) {
    let exp = /^[a-zA-Z0-9]{8,30}$/
    return exp.test(username);
}

function verifyEmail(email) {
    let rx = /^\w+[^@]+@\w+[^@]*\.\w{2,5}$/
    return rx.test(email)
}

function getLoadingBar(tag = '', transparent = false, spinstyle = false) {
    if (transparent == false) {
        return new AkrElement('div').setAttribute('style', 'z-index: 52').setAttribute('class', tag + ' loading-panel w3-animate-opacity').addChild(new AkrElement('span'));
    } else {
        return new AkrElement('div').setAttribute('style', 'z-index: 52; background-color: transparent !important').setAttribute('class', tag + ' loading-panel w3-animate-opacity').addChild(new AkrElement('span').setAttribute('style', spinstyle))
    }
}

function getNoDataPanel(text) {
    return new AkrElement('div').setAttribute('class', 'no-data-panel w3-text-red').addChild(new AkrElement('span').setInnerText(text));
}

function removeLoadingBar(tag = 'loading-panel') {
    $('.' + tag).remove();
}

var md5 = (function() {
    var MD5 = function(d) {
        return M(V(Y(X(d), 8 * d.length)))
    }

    function M(d) {
        for (var _, m = '0123456789abcdef', f = '', r = 0; r < d.length; r++) {
            _ = d.charCodeAt(r)
            f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _)
        }
        return f
    }

    function X(d) {
        for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++) {
            _[m] = 0
        }
        for (m = 0; m < 8 * d.length; m += 8) {
            _[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32
        }
        return _
    }

    function V(d) {
        for (var _ = '', m = 0; m < 32 * d.length; m += 8) _ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255)
        return _
    }

    function Y(d, _) {
        d[_ >> 5] |= 128 << _ % 32
        d[14 + (_ + 64 >>> 9 << 4)] = _
        for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) {
            var h = m
            var t = f
            var g = r
            var e = i
            f = md5ii(f = md5ii(f = md5ii(f = md5ii(f = md5hh(f = md5hh(f = md5hh(f = md5hh(f = md5gg(f = md5gg(f = md5gg(f = md5gg(f = md5ff(f = md5ff(f = md5ff(f = md5ff(f, r = md5ff(r, i = md5ff(i, m = md5ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5ff(r, i = md5ff(i, m = md5ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5ff(r, i = md5ff(i, m = md5ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5ff(r, i = md5ff(i, m = md5ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5gg(r, i = md5gg(i, m = md5gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5gg(r, i = md5gg(i, m = md5gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5gg(r, i = md5gg(i, m = md5gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5gg(r, i = md5gg(i, m = md5gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5hh(r, i = md5hh(i, m = md5hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5hh(r, i = md5hh(i, m = md5hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5hh(r, i = md5hh(i, m = md5hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5hh(r, i = md5hh(i, m = md5hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5ii(r, i = md5ii(i, m = md5ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5ii(r, i = md5ii(i, m = md5ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5ii(r, i = md5ii(i, m = md5ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5ii(r, i = md5ii(i, m = md5ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551)
            m = safeadd(m, h)
            f = safeadd(f, t)
            r = safeadd(r, g)
            i = safeadd(i, e)
        }
        return [m, f, r, i]
    }

    function md5cmn(d, _, m, f, r, i) {
        return safeadd(bitrol(safeadd(safeadd(_, d), safeadd(f, i)), r), m)
    }

    function md5ff(d, _, m, f, r, i, n) {
        return md5cmn(_ & m | ~_ & f, d, _, r, i, n)
    }

    function md5gg(d, _, m, f, r, i, n) {
        return md5cmn(_ & f | m & ~f, d, _, r, i, n)
    }

    function md5hh(d, _, m, f, r, i, n) {
        return md5cmn(_ ^ m ^ f, d, _, r, i, n)
    }

    function md5ii(d, _, m, f, r, i, n) {
        return md5cmn(m ^ (_ | ~f), d, _, r, i, n)
    }

    function safeadd(d, _) {
        var m = (65535 & d) + (65535 & _)
        return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m
    }

    function bitrol(d, _) {
        return d << _ | d >>> 32 - _
    }

    function MD5Unicode(buffer) {
        if (!(buffer instanceof Uint8Array)) {
            buffer = new TextEncoder().encode(typeof buffer === 'string' ? buffer : JSON.stringify(buffer));
        }
        var binary = [];
        var bytes = new Uint8Array(buffer);
        for (var i = 0, il = bytes.byteLength; i < il; i++) {
            binary.push(String.fromCharCode(bytes[i]));
        }
        return MD5(binary.join(''));
    }

    return MD5Unicode;
})();

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/**
 *
 * @param {string} url
 */
function goto(url) {
    let formattedurl;
    if (url.startsWith('http')) {
        formattedurl = url;
    } else if (url.startsWith('/')) {
        formattedurl = location.protocol + '//' + location.hostname + url;
    } else {
        formattedurl = location.protocol + '//' + location.hostname + '/' + url;
    }
    location.assign(formattedurl);
}

function updateCart() {
    let count = document.getElementsByClassName('cart-count');
    $.post('/cart/count', {}, (data, status, xhr) => {
        count[0].innerText = data;
        count[1].innerText = data;
    })
}

function checkout(data = false) {
    if (data != false) {
        goto('account/address?product_id=' + data);
    } else {
        goto('/account/address')
    }
}

function autocomplete(inp, stateinp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        stateinp.value = '';
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        let count = 0;
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].name.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                if (count >= 10) {
                    break;
                }
                count++;
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].name.substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].name.substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i].name + "'>";
                b.innerHTML += "<input type='hidden' value='" + arr[i].state + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    stateinp.value = this.getElementsByTagName("input")[1].value
                        /*close the list of autocompleted values,
                        (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function(e) {
        closeAllLists(e.target);
    });
}
