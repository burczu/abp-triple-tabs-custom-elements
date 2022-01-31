const template = document.createElement('template');
template.innerHTML = `
  <style>
    .list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
  
    .link {
      padding: 10px;
      display: inline-block;
      width: calc(100% - 20px);
      color: var(--colors-black);
      text-decoration: none;
    }
    
    .link:hover,
    .list-item.active > .link {
      background: var(--colors-white);
    }
  </style>

  <nav class="navigation">
    <ul class="list">
      <li class="list-item active">
        <a class="link" href="#general">General</a>
      </li>
      <li class="list-item">
        <a class="link" href="#form">Form</a>
      </li>
      <li class="list-item">
        <a class="link" href="#help">Help</a>
      </li>
    </ul>
  </nav>
`;

class NavigationComponent extends HTMLElement {
  static get observedAttributes() {
    return ['active'];
  }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.shadowRoot.querySelectorAll('.list-item').forEach((listItem) => {
      listItem.addEventListener('click', this.handleClick.bind(this));
    });
  }

  handleClick(event) {
    event.preventDefault();

    const { target: { hash } } = event;

    this.shadowRoot.querySelector('.active').classList.remove('active');
    this.shadowRoot.querySelector(`a[href="${hash}"]`).parentNode.classList.add('active');

    this.dispatchEvent(
      new CustomEvent(
        'navigation-changed',
        { bubbles: true, composed: true, detail: hash.substr(1, hash.length) }
      ),
    );
  }
}

window.customElements.define('navigation-component', NavigationComponent);
