import Vue from 'vue';
import Game from '@/components/Game';
import template from '@/templates/app.html';

let App = Vue.component('App', {
    template: template,
    components: {Game}

});

export default App;
