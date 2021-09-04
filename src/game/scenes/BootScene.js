import {Scene} from 'phaser'
import sky from '@/game/assets/prova.png';
import win_jug1 from '@/game/assets/win_jug1.png';
import win_jug2 from '@/game/assets/win_jug2.png';
import barrera from '@/game/assets/barrera2.png';
import barrera2 from '@/game/assets/barrera3.png';
import barrera3 from '@/game/assets/barrera4.png';
import barrera_colors_taronja from '@/game/assets/barrera-colors.png';
import barrera_colors_blau from '@/game/assets/barrera-colors-1.png';
import creu from '@/game/assets/creuv.png';
import creub from '@/game/assets/creub.png';
import creut from '@/game/assets/creut.png';
import forma from '@/game/assets/forma.png';
import estelap1 from '@/game/assets/estela_blava.png';
import estelap2 from '@/game/assets/estela_vermella.png';
import flagN from '@/game/assets/flago.png';
import flagA from '@/game/assets/flagb.png';
import baseA from '@/game/assets/baseA.png';
import baseN from '@/game/assets/baseN.png';
import jugadorB from '@/game/assets/jugadorB.png';
import jugadorT from '@/game/assets/jugadorT.png';
import jugadorBE from '@/game/assets/jugadorBE.png';
import jugadorTE from '@/game/assets/jugadorTE.png';
import pwc1 from '@/game/assets/pwc1.png';
import pwc2 from '@/game/assets/pwc2.png';
import pwc3 from '@/game/assets/pwc3.png';
import auraEscut from '@/game/assets/aura_lila.png';
import auraVelocitat from '@/game/assets/aura_verda.png';
import auraEstela from '@/game/assets/aura_groga.png';
import fondo_negre from '@/game/assets/fondo_negre.png';
import tuto from '@/game/assets/tuto.png';
import background from '@/game/assets/background.png';
import fletxa_negra from '@/game/assets/fletxa_negra.png';
import fletxa_blanca from '@/game/assets/fletxa_blanca.png';

export default class BootScene extends Scene {
    constructor() {
        super({key: 'BootScene'})
    }

    preload() {
        this.load.image('sky', sky);
        this.load.image('barrera', barrera);
        this.load.image('barrera2', barrera2);
        this.load.image('barrera3', barrera3);
        this.load.image('barrera_colors_taronja', barrera_colors_taronja);
        this.load.image('barrera_colors_blau', barrera_colors_blau);
        this.load.image('creu', creu);
        this.load.image('creub', creub);
        this.load.image('creut', creut);
        this.load.image('forma', forma);
        this.load.image('estela_blava', estelap1);
        this.load.image('estela_vermella', estelap2);
        this.load.image('flagN', flagN);
        this.load.image('flagA', flagA);
        this.load.image('baseA', baseA);
        this.load.image('baseN', baseN);
        this.load.image('pwc1', pwc1);
        this.load.image('pwc2', pwc2);
        this.load.image('pwc3', pwc3);
        this.load.image('aura_pwc1', auraEscut);
        this.load.image('aura_pwc2', auraVelocitat);
        this.load.image('aura_pwc3', auraEstela);
		this.load.image('fondo_negre', fondo_negre);
        this.load.image('win_jug1', win_jug1);
        this.load.image('win_jug2', win_jug2);
        this.load.image('jugadorB', jugadorB);
        this.load.image('jugadorT', jugadorT);
        this.load.image('jugadorBE', jugadorBE);
        this.load.image('jugadorTE', jugadorTE);
        this.load.image('background', background);
        this.load.image('tuto', tuto);
        this.load.image('fletxa_negra', fletxa_negra);
        this.load.image('fletxa_blanca', fletxa_blanca);
        // this.load.audio('thud', ['assets/thud.mp3', 'assets/thud.ogg'])
    }

    create() {
        var fletxa_blanca, fletxa_negra, tuto;
        this.add.image(600,300,"background");
        tuto = this.add.image(600, 300, 'tuto').setDepth(2);
        tuto.visible = false;
        fletxa_blanca = this.add.image(50, 40, 'fletxa_blanca').setScale(0.1).setInteractive().setDepth(3)
        .on('pointerdown', () => {
            tuto.visible = false;
            fletxa_negra.visible = fletxa_blanca.visible = false;
            fletxa_negra.active = fletxa_blanca.active = false;
            txtFinal.active = true;
            txtFinal2.active = true;
        } )
        .on('pointerout', () => {
            if (fletxa_negra.active && fletxa_blanca.active) {
                fletxa_blanca.visible = false;
                fletxa_negra.visible = true;
            }
        });
        fletxa_blanca.visible = false;
        fletxa_negra = this.add.image(50, 40, 'fletxa_negra').setScale(0.1).setInteractive().setDepth(3)
        .on('pointerover', () => {
            if (fletxa_negra.active && fletxa_blanca.active) {
                fletxa_negra.visible = false;
                fletxa_blanca.visible = true;
            }
        } );
        fletxa_negra.visible = false;

        var txtFinal = this.add.text(588, 164, "Jugar").setFontFamily('Arial').setFontSize(24).setColor('#FFFFFF').setInteractive().setDepth(1)
        .on('pointerdown', () => {
            if (txtFinal.active) {
                this.scene.start('PlayScene');
            }
        } )
        .on('pointerover', () => {txtFinal.setColor("#f96909")} )
        .on('pointerout', () => {txtFinal.setColor("#FFFFFF")});

        var txtFinal2 = this.add.text(560, 423, "Tutorial").setFontFamily('Arial').setFontSize(24).setColor('#FFFFFF').setInteractive().setDepth(1)
        .on('pointerdown', () => {
            fletxa_negra.active = fletxa_blanca.active = true;
            tuto.visible = true;
            fletxa_negra.visible = true;
            txtFinal.active = false;
            txtFinal2.active = false;
        } )
        .on('pointerover', () => {txtFinal2.setColor("#29759b")} )
        .on('pointerout', () => {txtFinal2.setColor("#FFFFFF")});

    }
}
