class Lightbox {
    static init() {
        const links = document.querySelectorAll('a[href$=".png"],a[href$=".jpg"],a[href$=".jpeg"]')

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
        const element = this.buildDOM(url)
        document.body.appendChild(element)
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
<div class="lightbox__container"></div>
<div class="lightbox__loader">  <li><img src="svg-loaders/circles.svg" width="50" alt=""></li>
  </div>`
        return dom
    }

}

// {
//      <div class="lightbox">
//       <button class="lightbox__close"><i class="fas fa-times fa-3x"></i></button>
//       <button class="lightbox__next"><i class="fas fa-chevron-right fa-3x" style="color: white;"></i></button>
//       <button class="lightbox__prev"><i class="fas fa-chevron-left fa-3x" style="color: white;"></i></button>
//       <div class="lightbox__container">
//         <img src="https://picsum.photos/900/1400" alt="">
//       </div>
//     </div> 
// }

Lightbox.init()