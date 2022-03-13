

class Modal {
    constructor () {
        this.id = `modalid${Math.floor( Math.random() * 100000000 )}`;
        
        this.modal = document.createElement('div');
        this.modal.classList.add('flex', 'modal', 'close');
        this.modal.setAttribute('id', this.id);
        this.html();
    }
    open = ( state = false ) => {
        let classs = this.modal.classList
        state ? classs.remove('close') : classs.add('close');
    }
    add = (content = "") => {
    let query = `#${this.id} .modal-body`;
    let mybody = document.querySelector(query);
       for (  let child of content ) mybody.appendChild( child );
    }
    
    
    html = () => {
        this.modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-body">
                </div>
                <div class="modal-foot flex">
                </div>
            </div>
        `;
        const area = document.getElementById('modal-area')
        area.appendChild( this.modal );

        const foot = this.modal.querySelector('.modal-foot');

        let btn_ok = document.createElement('button');
        btn_ok.innerText = 'OK'
        btn_ok.classList.add('modal-button-success');
        let btn_cancel = document.createElement('button');
        btn_cancel.innerText = 'EXIT'
        btn_cancel.classList.add('modal-button-cancel');

        foot.appendChild(btn_ok)
        foot.appendChild(btn_cancel)


        btn_ok.onclick = (e) => {
            e.preventDefault();
            this.open(false);
        }
        btn_cancel.onclick = (e) => {
            e.preventDefault();
            this.modal.querySelector('.modal-body').innerHTML = "";
            this.open(false);
        }       
    }

}

const my_modal = new Modal();



function HTMLFileContent( List ) {
    const content = [];
    for ( let image of List ) {
        const {
            name, url= "", size, lastModifiedDate = ""
        } = image;
        let img = document.createElement("div");
        img.classList.add('image', 'flex');

        let remove_icon = document.createElement("i");
        remove_icon.classList.add('remove', 'fas', 'fa-times');
        img.innerHTML = `
                <div class="image-detail">
                    <p>Taille : ${Size( size )}</p>
                    <p>Name : ${name}</p>
                    <div>Last Modification : ${new Date(lastModifiedDate).toLocaleString()}</div>
                </div>
        `;
        remove_icon.onclick = ( e ) => {
            e.preventDefault();
            img.remove();
        };

        img.appendChild( remove_icon );
        content.push( img );
    }
    return content;
}



function Size( size ) {
    const table = ['Ko', 'Mo', 'Go'];
    var i = -1;
    while (size > 1024) {
        size  = size / 1024;
        i++;
    }
    return `${Math.floor( size * 100 ) / 100} ${table[i]}`
}