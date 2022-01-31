const template = document.createElement('template');
template.innerHTML = `
  <style>
    .fieldset {
      padding: 15px;
      border: 1px solid var(--colors-black);
    }
    
    .fieldset:first-child {
      margin-bottom: 20px;
    }
    
    .legend {
      background-color: var(--colors-black);
      color: var(--colors-white);
      padding: 10px 15px;
    }
    
    .inputs {
      display: flex;
      flex-direction: column;
    }
    
    .input-label {
      display: flex;
      flex-direction: column;
      width: 200px;
      margin-bottom: 10px;
    }
    
    .input {
      padding: 5px 10px;
    }
    
    .submit-button {
      padding: 5px 10px;
      margin-top: 5px;
    }
    
    .thanks {
      margin-top: 5px;
      font-weight: bold;
    }
  </style>

  <form class="form">
    <fieldset class="fieldset">
      <legend class="legend">Choose your favorite monster</legend>

      <input class="radio-item" type="radio" id="kraken" name="monster" />
      <label class="radio-label" for="kraken">Kraken</label><br/>

      <input class="radio-item" type="radio" id="sasquatch" name="monster" />
      <label class="radio-label" for="sasquatch">Sasquatch</label><br/>

      <input class="radio-item" type="radio" id="mothman" name="monster" />
      <label class="radio-label" for="mothman">Mothman</label>
    </fieldset>

    <fieldset class="fieldset">
      <legend class="legend">Meet the monster!</legend>

      <div class="inputs">
        <label class="input-label" for="name">
          Your name
          <input class="input" type="text" id="name" name="name" />
        </label>

        <label class="input-label" for="email">
          Your email address
          <input class="input" type="text" id="email" name="email" />
        </label>

      </div>

      <button class="submit-button" type="submit">Submit</button>
    </fieldset>
  </form>
`;

class FormComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.monsterForm = this.shadowRoot.querySelector('form');
    this.monsterForm.addEventListener('submit', this.handleMonsterFormSubmit.bind(this));
  }

  get isMonsterSelected() {
    const selected = this.shadowRoot.querySelector('input[type="radio"]:checked');

    return Boolean(selected);
  }

  get isNameAndEmailFilled() {
    const name = this.shadowRoot.querySelector('input[name="name"]');
    const email = this.shadowRoot.querySelector('input[name="email"]');

    return name.value && email.value;
  }

  handleSuccess() {
    const inputs = this.shadowRoot.querySelectorAll('input');
    const submitButton = this.shadowRoot.querySelector('button[type="submit"]');

    if (inputs && inputs.length > 0) {
      inputs.forEach((input) => {
        input.disabled = true;
      });
    }

    if (submitButton) {
      const newNode = document.createElement('p');
      newNode.textContent = 'Thank you!';
      newNode.classList.add('thanks');

      submitButton.parentNode.replaceChild(newNode, submitButton);
    }
  }

  handleMonsterFormSubmit(event) {
    event.preventDefault();

    if (this.isMonsterSelected && this.isNameAndEmailFilled) {
      this.handleSuccess();
    }
  }
}

window.customElements.define('form-component', FormComponent);
