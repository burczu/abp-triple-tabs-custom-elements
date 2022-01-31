import './navigation.js';
import './form.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    .app {
      display: flex;
      min-height: 100vh;
      background: var(--colors-background);
      font-family: sans-serif;
    }
    
    .sidebar {
      width: var(--sidebar-width);
      padding: 20px;
    }
    
    .content {
      width: calc(100% - var(--sidebar-width));
      padding: 20px;
      margin: 10px 10px 10px 0;
      background: var(--colors-white);
    }
    
    .title {
      font-size: 28px;
      font-weight: bold;
      text-align: center;
      padding: 20px 0;
    }
    
    .sub-content {
      display: none;
    }
    
    .sub-content.active {
      display: block;
    }
    
    .sub-content-title {
      font-size: 24px;
      font-weight: bold;
      padding: 16px 0;
    }
  </style>

  <div class="app">
    <section class="sidebar">
      <navigation-component></navigation-component>
    </section>
    <section class="content">
      <h1 class="title">ABP Triple Tab Test</h1>
      
      <section class="sub-content active" id="general">
        <h2 class="sub-content-title">General</h2>
        <p>General information here...</p>
      </section>
      
      <section class="sub-content" id="form">
        <h2 class="sub-content-title">Your valuable details</h2>
        
        <form-component></form-component>
      </section>
      
      <section class="sub-content" id="help">
        <h2 class="sub-content-title">Help</h2>
        <p>Help information here...</p>
      </section>
    </section>
  </div>
`;

class AppComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.navComponent = this.shadowRoot.querySelector('navigation-component');
    this.navComponent.addEventListener('navigation-changed', this.handleNavigationChanged.bind(this));
  }

  handleNavigationChanged({ detail }) {
    this.shadowRoot.querySelector('.active').classList.remove('active');
    this.shadowRoot.querySelector(`#${detail}`).classList.add('active');
  };
}

window.customElements.define('app-component', AppComponent);
