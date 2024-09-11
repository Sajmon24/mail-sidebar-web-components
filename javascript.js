const appsidebarTemplate = document.getElementById("app-sidebar-button");

class AppsidebarButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.append(appsidebarTemplate.content.cloneNode(true));

    const sidebarButton = this.shadowRoot.querySelector(".sidebar__button");
    const text = this.getAttribute("text");
    const sidebarIcon = this.shadowRoot.querySelector("slot");
    const unreadCount = this.getAttribute("unreadCount");
    const preselected = this.getAttribute("selected");

    this.shadowRoot.querySelector(".sidebar__button-text").innerText = text;
    this.shadowRoot.querySelector(".tooltiptext").innerText = text;
    this.shadowRoot.querySelector("slot").innerText = sidebarIcon;

    if (preselected) {
      sidebarButton.classList.add("Selected");
    }

    if (Number(unreadCount) > 0) {
      this.shadowRoot.querySelector(".sidebar__unread-count").innerText =
        unreadCount;
      this.shadowRoot.querySelector(".sidebar__button").style.fontWeight =
        "bold";
    }

    sidebarButton.addEventListener("click", () => this.buttonClick());
  }

  disconnectedCallback() {
    this.sidebarButton.removeEventListener();
  }

  buttonClick() {
    const allButtons = document.querySelectorAll("app-sidebar-button");
    const buttonIsSelected = this.shadowRoot.querySelector("button");

    allButtons.forEach((button) => {
      const btn = button.shadowRoot.querySelector(".sidebar__button");
      if (btn.classList.contains("Selected")) {
        btn.classList.remove("Selected");
      }
    });

    buttonIsSelected.classList.add("Selected");
  }
}

window.customElements.define("app-sidebar-button", AppsidebarButton);
