class DemoVR extends Demo {
    constructor() {
        super();
        this._getDisplay = this._getDisplay.bind(this);
        window.addEventListener('vrdisplayconnect', this._getDisplay);
        window.addEventListener('vrdisplaydisconnect', this._getDisplay);

        this._togglePresent = this._togglePresent.bind(this);
        this._button = document.getElementById('vr-button');
        this._button.addEventListener('click', this._togglePresent);
        this._button.style.display = '';

        this._presentChanged = this._presentChanged.bind(this);
        window.addEventListener('vrdisplaypresentchange', this._presentChanged);

        this._display = null;
        this._getDisplay();
    }
    _getDisplay() {
        navigator.getVRDisplays().then((displays) => {
            displays = displays.filter(displays => displays.capabilities.canPresent);
            if (displays.length === 0) {
                displays = null;
            } else {
                this._display = displays[0];
            }
            console.log('Current display: ${this._display}')
        })
    }

    _togglePresent() {
        if (this._display) {
          if (this._display.isPresenting) {
            this._deactivateVR();
          } else {
            this._activateVR();
          }
        }  
    }
    _activateVR() {
        if (this._display && !this._display.isPresenting) {
          this._display.requestPresent([{
            source: this._renderer.domElement
          }]);
        }
    }
    _deactivateVR() {
        if (this._display && this._display.isPresenting) {
          this._display.exitPresent();
        }
    }

    _presentChanged() {
        if (this._display && this._display.isPresenting) {
          this._button.textContent = 'Exit VR';      
        } else {
          this._button.textContent = 'Enable VR';
        }
    }



}