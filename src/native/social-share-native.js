class SocialShareNative extends HTMLElement {
    constructor() {
        super();
        const styles = getStyles()
        const template = getTemplate(styles)
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.innerHTML = template
    }

    connectedCallback() {
        const wrapper = this._shadowRoot.querySelector('.wrapper') 
        const toggle = this._shadowRoot.querySelector('.toggle')
        const listItems = Array.from(this._shadowRoot.querySelectorAll('.list-item'))
        const listItemButtons = Array.from(this._shadowRoot.querySelectorAll('.list-item button'))

        listItems.forEach((item, index) => {
            item.style.transform = `translateY(${(index + 1) * 3.25}em)`
            item.style.transitionDelay = `${index * 0.15}s`
            item.style.zIndex = `-${index + 1}`
        })

        wrapper.addEventListener('click', event => {
            if (event.target === toggle) {
                this.show = !this.show
            }

            if (listItemButtons.indexOf(event.target) !== -1) {
                this.dispatchEvent(
                    new CustomEvent('share-to', { 
                        detail: event.target.dataset.platform,
                        bubbles: true,
                    })
                )
                this.show = false
            }
        })
    }

    get show () {
        return this.hasAttribute('show')
    }

    set show(val) {
        if (val) {
            this.setAttribute('show', '');
        } else {
            this.removeAttribute('show');
        }
    }
}

customElements.define('social-share-native', SocialShareNative);

function getTemplate(styles) {
    return`
        ${styles}
        <div class="wrapper">
            <strong class="platform">JS</strong>
            <button class="toggle"><img src="/images/share.svg" alt="share"/></button>
            <ul class="list">
                <li class="list-item">
                    <button data-platform="facebook"><img src="/images/facebook.svg" alt="facebook"/></button>
                </li>
                <li class="list-item">
                    <button data-platform="twitter"><img src="/images/twitter.svg" alt="twitter"/></button>
                </li>
                <li class="list-item">
                    <button data-platform="linkedin"><img src="/images/linkedin.svg" alt="linkedin"/></button>
                </li>
                <li class="list-item">
                    <button data-platform="whatsapp"><img src="/images/whatsapp.svg" alt="whatsapp"/></button>
                </li>
            </ul>
        </div>
    `
}

function getStyles() {
    return `
        <style>
            .wrapper {
                position: relative;
            }
            .platform {
                position: absolute;
                left: 50%;
                transform: translate(-50%, -100%);
            }
            img {
                width: 50%;
                height: 50%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
            button {
                width: 3rem;
                height: 3rem;
                border-radius: 50%;
                background-color: teal;
                border: none;
                position: relative;
                cursor: pointer;
                outline: none;
            }
            button:hover {
                background-color: blue;
            }
            button > * {
                pointer-events: none;
            }
            ul {
                list-style: none;
                padding: 0;
                margin: 0;
                position: absolute;
                top: 0;
            }
            li {
                position: absolute;
                top: 0;
            }

            .list-item {
                opacity: 1;
                transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
            }

            :host(:not([show])) .list-item {
                transform: translate(0) !important;
                opacity: 0;
            }

            .toggle {
                z-index: 1;
            }
            :host([show]) .toggle {
                background-color: blue;
            }
        </style>
    `
}