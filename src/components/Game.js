import Vue from 'vue';
import template from '@/templates/game.html';

let Game = Vue.component('Game', {
    template: template,
    data() {
        return {
            downloaded: false
        }
    },
    mounted() {
        import(/* webpackChunkName: "game" */ '@/game/game').then(game => {
            this.downloaded = true;
            this.$nextTick(() => game.launch());
        })
    }
});

export default Game;
