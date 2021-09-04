import {Scene} from 'phaser'

export default class BootScene extends Scene {
    constructor() {
        super({key: 'EndScene'});
    }

    init (equips)
    {
        if (equips.equip_taronja.puntuacio > equips.equip_blau.puntuacio){
            this.victoria_taronja(equips);
        }
        else if (equips.equip_taronja.puntuacio === equips.equip_blau.puntuacio){
            if (equips.equip_taronja.kills > equips.equip_blau.kills){
                this.victoria_taronja(equips);
            }
            else if (equips.equip_taronja.kills === equips.equip_blau.kills){
                if (equips.equip_taronja.banderes > equips.equip_blau.banderes){
                    this.victoria_taronja(equips);
                }
                else if (equips.equip_taronja.banderes === equips.equip_blau.banderes){
                    if (equips.equip_taronja.deads < equips.equip_blau.deads){
                        this.victoria_taronja(equips);
                    }
                    else{
                        this.victoria_blau(equips);
                    }
                }
                else{
                    this.victoria_blau(equips);
                }
            }
            else{
                this.victoria_blau(equips);
            }
        }
        else{
           this.victoria_blau(equips);
        }
        var txtFinal = this.add.text(500, 500, "Tornar al menu").setFontFamily('Arial').setFontSize(24).setColor('#000000').setInteractive().setDepth(1)
        .on('pointerdown', () => {this.scene.start('BootScene')} )
        .on('pointerover', () => {txtFinal.setColor("#FFFFFF")} )
        .on('pointerout', () => {txtFinal.setColor("#000000")});

    }

    victoria_taronja(equips){
        this.add.image(600, 300, 'win_jug1');
        this.add.text(500, 315, equips.equip_blau.puntuacio).setFontFamily('Arial').setFontSize(24).setColor('#000000').setInteractive().setDepth(1);
        this.add.text(645, 315, equips.equip_blau.kills).setFontFamily('Arial').setFontSize(24).setColor('#000000').setInteractive().setDepth(1);
        this.add.text(770, 315, equips.equip_blau.deads).setFontFamily('Arial').setFontSize(24).setColor('#000000').setInteractive().setDepth(1);
        this.add.text(890, 315, equips.equip_blau.banderes).setFontFamily('Arial').setFontSize(24).setColor('#000000').setInteractive().setDepth(1);

        this.add.text(500, 200, equips.equip_taronja.puntuacio).setFontFamily('Arial').setFontSize(24).setColor('#000000').setInteractive().setDepth(1);
        this.add.text(645, 200, equips.equip_taronja.kills).setFontFamily('Arial').setFontSize(24).setColor('#000000').setInteractive().setDepth(1);
        this.add.text(770, 200, equips.equip_taronja.deads).setFontFamily('Arial').setFontSize(24).setColor('#000000').setInteractive().setDepth(1);
        this.add.text(890, 200, equips.equip_taronja.banderes).setFontFamily('Arial').setFontSize(24).setColor('#000000').setInteractive().setDepth(1);
    }

    victoria_blau(equips){
        this.add.image(600, 300, 'win_jug2');
        this.add.text(500, 315, equips.equip_taronja.puntuacio).setFontFamily('Arial').setFontSize(24).setColor('#000000').setInteractive().setDepth(1);
        this.add.text(645, 315, equips.equip_taronja.kills).setFontFamily('Arial').setFontSize(24).setColor('#000000').setInteractive().setDepth(1);
        this.add.text(770, 315, equips.equip_taronja.deads).setFontFamily('Arial').setFontSize(24).setColor('#000000').setInteractive().setDepth(1);
        this.add.text(890, 315, equips.equip_taronja.banderes).setFontFamily('Arial').setFontSize(24).setColor('#000000').setInteractive().setDepth(1);

        this.add.text(500, 200, equips.equip_blau.puntuacio).setFontFamily('Arial').setFontSize(24).setColor('#000000').setInteractive().setDepth(1);
        this.add.text(645, 200, equips.equip_blau.kills).setFontFamily('Arial').setFontSize(24).setColor('#000000').setInteractive().setDepth(1);
        this.add.text(770, 200, equips.equip_blau.deads).setFontFamily('Arial').setFontSize(24).setColor('#000000').setInteractive().setDepth(1);
        this.add.text(890, 200, equips.equip_blau.banderes).setFontFamily('Arial').setFontSize(24).setColor('#000000').setInteractive().setDepth(1);
    }

    preload() {

    }
    create() {

    }
}
