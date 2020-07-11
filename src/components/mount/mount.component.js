const path = require('path');

Vue.component('Mount', {
    template: `<div :style="style.base">
        <img :src="src" :alt="data.name" :style="style.img" @click="get" @mouseover="onMouseOver" @mouseleave="mouseover = false"/>
        <div v-if="mouseover" :style="style.tooltip">
            <div>名前：{{data.name}}</div>
            <div>情報{{data.info}}</div>
        </div>
    </div>`
    , props: ["data"]
    , data() {
        return {
            src: path.join(__dirname, `../static/img/${this.data.kind}/${this.data.number}.png`),
            mouseover: false,
            mousePosition: {},
            style: {
                img: {
                    width: '50px',
                    height: '50px',
                    opacity: '1',
                    transition: '0.2s',
                    cursor: 'pointer'
                },
                tooltip: {
                    position: 'absolute',
                    'background-color': 'rgba(255,255,255,0.8)',
                    'border': '1px solid black',
                    'box-shadow': '10px 10px 10px rgba(0,0,0,0.4)',
                    'font-size': '13px',
                    'padding': '2px',
                },
                base: {
                    margin: '5px',
                }
            }
        }
    }
    , mounted: function() {
        this.changeOpacity();
    }
    , methods: {
        get: function() {
            this.data.get = !this.data.get;
            this.changeOpacity();
        },

        changeOpacity: function() {
            if (this.data.get) {
                this.style.img.opacity = '0.3';
            } else {
                this.style.img.opacity = '1';
            }
        },

        onMouseOver: function(e) {
            if (!this.data.get) {
                this.mouseover = true;
                this.mousePosition = {
                    x: e.clientX,
                    y: e.clientY
                }
            }
        }
    }
})