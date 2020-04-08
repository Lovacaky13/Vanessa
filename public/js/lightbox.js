/**
 * @property {HTMLElement} element
 */

import { discovery } from "googleapis/build/src/apis/discovery"

class Lightbox {

    static init() {
        const links = document.querySelectorAll('a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"]')

        .forEach(link => link.addEventListener('click', e => {
            e.preventDefault()
            new Lightbox(e.currentTarget.getAttribute('href'))
        }))
    }

    /**
     * 
     * @param {string} url URL de l'image
     */
    constructor(url) {
        this.element = this.buildDOM(url)
        this.loadImage(url)
        document.body.appendChild(this.element)
    }

    /**
     * 
     * @param {string} url URL de l'image
     */

    loadImage(url) {
        const image = new Image();
        const container = this.element.querySelector('.lightbox__container')
        const loader = document.createElement('div')
        loader.classList.add('lightbox__loader')
        container.appendChild(loader)
        image.onload = function() {
            console.log('chargé')
        }
        image.src = url
    }

    /**
     * 
     * @param {string} url URL de l'image
     * @return {HTMLElement}
     */
    buildDOM(url) {
        const dom = document.createElement('div')
        dom.classList.add('lightbox')
        dom.innerHTML = ` <button class="lightbox__close"><i class="fas fa-times fa-3x"></i></button>
<button class="lightbox__next"><i class="fas fa-chevron-right fa-3x" style="color: white;"></i></button>
<button class="lightbox__prev"><i class="fas fa-chevron-left fa-3x" style="color: white;"></i></button>
<div class="lightbox__container">
</div>`

        return dom
    }
}

Lightbox.init()