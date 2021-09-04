import { Scene } from 'phaser';

// VARIABLES EDITABLES (EDITAR VARIABLES ES FA AL CREATE)//////////////////////////////////////////////////////////////////////////
var velocitat; // velocitat players
var rotacio; // rotacio players

var max_last_estela; // esteles que no toquen el player
var maxEstela; // maxim nombre de esteles
var max_gap; // cada quan surten les esteles (cada jugador té aquest valor entre velocitat)

var posInicialJug1; // pos inicial player1
var posInicialJug2; // pos inicial player2

var temps;

var temps_inici;

//PowerUPs
var max_gap_PowerUP;

// VARIABLES NO EDITABLES //////////////////////////////////////////////////////////////////////////
 // CONTROLS
var keys;

 // MAPA
var obstacles_mapa;

 // EQUIPS
var equip_blau;
var equip_taronja;

 // JUGADORS
var player1;
var estelap1;
var last_estelap1;

var player2;
var estelap2;
var last_estelap2;

 //OBJECTES
var base;
var flag;

 // Textos
var textos;

 //PowerUPs
var bonificacio;
var rectSpawn;
var gap_PowerUP = 0;

 //Interficie
var timerTemps;
var fondo_negre;
var scene;

export default class PlayScene extends Scene {
  constructor () {
    super({ key: 'PlayScene' });
  }

  create () {
    // VARIABLES EDITABLES //////////////////////////////////////////////////////////////////////////
    velocitat = 2; // velocitat players
    rotacio = 0.05; // rotacio players

    max_last_estela = 5; // esteles que no toquen el player
    maxEstela = 20 - max_last_estela; // maxim nombre de esteles
    max_gap = 10; // cada quan surten les esteles (cada jugador té aquest valor entre velocitat)

    posInicialJug1 = [1105, 95]; // pos inicial player1
    posInicialJug2 = [95, 505]; // pos inicial player2

    temps = 100;

    temps_inici = 3;

    //PowerUPs
    max_gap_PowerUP = 10;

    // CREATE
    scene = this;
    this.add.image(600, 300, 'sky');
	fondo_negre= this.add.image(600, 300, 'fondo_negre').setDepth(19);

    obstacles_mapa = this.physics.add.group();
    obstacles_mapa.create(600,590,'barrera');
    obstacles_mapa.create(600,12,'barrera');
    obstacles_mapa.create(1190, 300, 'barrera2');
    obstacles_mapa.create(14, 300, 'barrera2');
    obstacles_mapa.create(996, 180, 'barrera_colors_blau');
    obstacles_mapa.create(204, 420, 'barrera_colors_taronja');
    obstacles_mapa.create(348, 157, 'creu');
    obstacles_mapa.create(852, 444, 'creu');
    obstacles_mapa.create(900, 444, 'creub');
    obstacles_mapa.create(805, 444, 'creub');
    obstacles_mapa.create(396, 157, 'creut');
    obstacles_mapa.create(300, 157, 'creut');
    obstacles_mapa.create(600, 300, 'forma');

    rectSpawn = new Phaser.Geom.Rectangle(350, 50, 500, 500);

    textos = {
        equip_blau: this.add.text(1092, 480, '0').setFontFamily('Arial').setFontSize(45).setColor('#ffff00').setInteractive().setDepth(1),
        equip_taronja: this.add.text(84, 71, '0').setFontFamily('Arial').setFontSize(45).setColor('#ffff00').setInteractive().setDepth(1),
        temps: this.add.text(562, 276, temps).setFontFamily('Arial').setFontSize(45).setColor('#ffff00').setInteractive().setDepth(1),
		temps_inici: this.add.text(540, 190, temps_inici).setFontFamily('Arial').setFontSize(200).setColor('#ffffff').setInteractive().setDepth(20).setStroke('#000000', 10)
    };
	textos.temps.visible = false;

    //Timer
    timerTemps = this.time.addEvent({
      delay: 1000,                // ms
      callback: onTemps,
      //args: [],
      loop: true
    });

    // Equips
    equip_blau = {
        color: "blue",
        puntuacio: 0,
		banderes: 0,
		kills: 0,
		deads: 0
    };
    equip_taronja = {
        color: "orange",
        puntuacio: 0,
		banderes: 0,
		kills: 0,
		deads: 0
    };

    //Bases
    base = this.physics.add.staticGroup();
    base.create( posInicialJug2[0], posInicialJug2[1],'baseN').setScale(0.5).refreshBody().equipo = equip_taronja;
    base.create( posInicialJug1[0], posInicialJug1[1],'baseA').setScale(0.5).refreshBody().equipo = equip_blau;

    var base1 = base.getChildren()[0];
    base1.visible = false;
    var base2 = base.getChildren()[1];
    base2.visible = false;
  
    //Jugadors
    player1 = this.physics.add.sprite( posInicialJug1[0],  posInicialJug1[1], 'jugadorB');
    player1.setCollideWorldBounds(true).body.onWorldBounds = true;
    player1.inici = posInicialJug1;
    player1.depth = 11;
    player1.name = "Player1";
    player1.equipo = equip_blau;
    player1.velocitat = velocitat;
    player1.maxEstela = maxEstela;
    player1.max_gap = max_gap / player1.velocitat;
    player1.gap_estela = 0;
    player1.bandera = undefined;
    player1.power = undefined;

    player2 = this.physics.add.sprite( posInicialJug2[0],  posInicialJug2[1], 'jugadorT');
    player2.setCollideWorldBounds(true).body.onWorldBounds = true;
    player2.inici = posInicialJug2;
    player2.depth = 11;
    player2.name = "Player2";
    player2.equipo = equip_taronja;
    player2.velocitat = velocitat;
    player2.maxEstela = maxEstela;
    player2.max_gap = max_gap / player2.velocitat;
    player2.gap_estela = 0;
    player2.bandera = undefined;
    player2.power = undefined;
    player2.rotation = Math.PI;

    keys = this.input.keyboard.addKeys({
      left: 'left',
      right: 'right',
      up:'up',
      w:'w',
      a: 'a',
      d: 'd'
    });

    //Estela
    estelap1 = this.physics.add.group();
    last_estelap1 = this.physics.add.group();
    estelap2 = this.physics.add.group();
    last_estelap2 = this.physics.add.group();

    this.physics.add.overlap([player1,player2], estelap1, die, null, this);
    this.physics.add.overlap([player1,player2], estelap2, die, null, this);
    this.physics.add.overlap([player1,player2], obstacles_mapa, die, null, this);

    this.physics.add.overlap(player1, last_estelap2, die, null, this);
    this.physics.add.overlap(player2, last_estelap1, die, null, this);

    //Banderas
    flag = this.physics.add.staticGroup();
    flag.create(posInicialJug2[0]+10, posInicialJug2[1]-50,'flagN').setScale(1.5).refreshBody().equipo = equip_taronja;
    flag.create(posInicialJug1[0]+10, posInicialJug1[1]-50,'flagA').setScale(1.5).refreshBody().equipo = equip_blau;

    //Iniciar banderas
    var flag1 = flag.getChildren()[0];
	flag1.depth = 12;
    var flag2 = flag.getChildren()[1];
	flag2.depth = 12;

    inicialitzarFlag(flag1);
    inicialitzarFlag(flag2);

    this.physics.add.overlap([player1,player2], flag, collectFlag, null, this);
    this.physics.add.overlap([player1,player2], base, enterBase, null, this);

    //PowerUps
    bonificacio = this.physics.add.staticGroup();
    /*
    bonificacio.create(400,450,'pw1').setScale(0.03).refreshBody().text = "pwc1"; //Escut
    bonificacio.create(300,350,'pw2').setScale(0.03).refreshBody().text = "pwc2"; //Velocitat
    bonificacio.create(500,350,'pw3').setScale(0.03).refreshBody().text = "pwc3"; //Estela
    */

    this.physics.add.overlap([player1,player2], bonificacio ,getPower, null, this);
  }

  update () {

	if (temps_inici === 0)
	{
		// MAPA
		/*
		for (var i = 6; i < obstacles_mapa.getChildren().length; i++)
		{
		  obstacles_mapa.getChildren()[i].angle += 0.5;
		}
		*/

		// JUGADORS
		if (player1.gap_estela >= player1.max_gap) {
			// CREEM ESTELA P1
			if (player1.active) {
				if (estelap1.getChildren().length < player1.maxEstela) {
					last_estelap1.create(player1.x, player1.y, 'estela_blava').setDepth(10);
					last_estelap1.getChildren()[last_estelap1.getChildren().length - 1].parent = player1;
				}
				else {
					last_estelap1.add(estelap1.getChildren()[0]);
					estelap1.remove(estelap1.getChildren()[0]);
					last_estelap1.getChildren()[last_estelap1.getChildren().length - 1].x = player1.x;
					last_estelap1.getChildren()[last_estelap1.getChildren().length - 1].y = player1.y;
				}
				last_estelap1.getChildren()[last_estelap1.getChildren().length - 1].rotation = player1.rotation;

				if (last_estelap1.getChildren().length >= max_last_estela) {
					estelap1.add(last_estelap1.getChildren()[0]);
					last_estelap1.remove(last_estelap1.getChildren()[0]);
				}
			} else {
				// borrem estela
				if (estelap1.getChildren().length > 0) estelap1.getChildren()[0].destroy();
				else if (last_estelap1.getChildren().length > 0) last_estelap1.getChildren()[0].destroy();
				else {
					player1.active = true;
					player1.visible = true;
					player1.velocitat = velocitat;
					player1.maxEstela = maxEstela;
					player1.max_gap = max_gap / player1.velocitat;
					player1.x = player1.inici[0];
					player1.y = player1.inici[1];
					player1.rotation = 0;
					posarInmune(player1);
				}
			}

			player1.gap_estela = 0;
		}
		else
			player1.gap_estela++;

		if (player2.gap_estela >= player2.max_gap) {
		  // CREEM ESTELA P2
		  if(player2.active)
		  {
			  if (estelap2.getChildren().length < player2.maxEstela) {
				  last_estelap2.create(player2.x, player2.y, 'estela_vermella').setDepth(10);
				  last_estelap2.getChildren()[last_estelap2.getChildren().length - 1].parent = player2;
			  }
			  else {
				last_estelap2.add(estelap2.getChildren()[0]);
				estelap2.remove(estelap2.getChildren()[0]);
				last_estelap2.getChildren()[last_estelap2.getChildren().length - 1].x = player2.x;
				last_estelap2.getChildren()[last_estelap2.getChildren().length - 1].y = player2.y;
			  }
			  last_estelap2.getChildren()[last_estelap2.getChildren().length - 1].rotation = player2.rotation;

			  if (last_estelap2.getChildren().length >= max_last_estela)
			  {
				estelap2.add(last_estelap2.getChildren()[0]);
				last_estelap2.remove(last_estelap2.getChildren()[0]);
			  }
		  }
		  else
		  {
			  // borrem estela
			  if (estelap2.getChildren().length > 0) estelap2.getChildren()[0].destroy();
			  else if (last_estelap2.getChildren().length > 0) last_estelap2.getChildren()[0].destroy();
			  else
			  {
					player2.active = true;
					player2.visible = true;
					player2.velocitat = velocitat;
					player2.maxEstela = maxEstela;
					player2.max_gap = max_gap / player2.velocitat;
					player2.x = player2.inici[0];
					player2.y = player2.inici[1];
					player2.rotation = Math.PI;
					posarInmune(player2);
			  }
		  }
			player2.gap_estela = 0;
		}
		else
			player2.gap_estela++;

	  // APLICAR MOVIMENT AUTOMATIC
		// CONTROLS player1
		if (keys.left.isDown)
		  player1.rotation -= rotacio;
		else if (keys.right.isDown)
		  player1.rotation += rotacio;

		if(keys.up.isDown)
		  usePower(player1);

		// CONTROLS player2
		if (keys.a.isDown)
		  player2.rotation -= rotacio;
		else if (keys.d.isDown)
		  player2.rotation += rotacio;

		if(keys.w.isDown)
		  usePower(player2);

		// Calcular desplaçament player1
		player1.x += player1.velocitat * Math.sin(-player1.rotation);
		player1.y += player1.velocitat * Math.cos(-player1.rotation);
		if (player1.aura !== undefined)
		{
			player1.aura.x = player1.x;
			player1.aura.y = player1.y;
		}
		// Calcular desplaçament player2
		player2.x += player2.velocitat * Math.sin(-player2.rotation);
		player2.y += player2.velocitat * Math.cos(-player2.rotation);
		if (player2.aura !== undefined)
		{
			player2.aura.x = player2.x;
			player2.aura.y = player2.y;
		}

		//Moviment banderes
		flag.children.iterate(function (child) {
		  if(child.follow !== undefined){
			child.x = child.follow.x+10;
			child.y = child.follow.y-20;
			child.refreshBody();
		  }
		});
	  } // FI IF (temps_inici === 0)
	} // FI UPDATE
}

function onTemps(){
  if (temps_inici > 0) {
	  temps_inici --;
	  textos.temps_inici.setText(temps_inici);
	  if (temps_inici===0){
		  textos.temps_inici.destroy();
		  fondo_negre.destroy();
		  textos.temps.visible = true;
		  textos.temps_inici = undefined;
	  }
  }
  else {
	  temps--;
	  if (temps === 99) textos.temps.x = 575;
	  else if (temps === 9) textos.temps.x = 588;
	  else if (temps === 5) textos.temps.setColor('#ff0000');
	  textos.temps.setText(temps);
	  if(temps <= 0) {
		    scene.scene.start('EndScene', {equip_blau: equip_blau, equip_taronja: equip_taronja});
	  }

	    // PowerUPs
      if(gap_PowerUP >= max_gap_PowerUP)
      {
          var rand = Math.round(Math.random() * 3);
          var pos = rectSpawn.getRandomPoint();
          if (rand === 0)
              bonificacio.create(pos.x,pos.y,'pwc1').setScale(0.7).refreshBody().text = "pwc1"; //Escut
          else if (rand === 1)
              bonificacio.create(pos.x,pos.y,'pwc2').setScale(0.7).refreshBody().text = "pwc2"; //Velocitat
          else
              bonificacio.create(pos.x,pos.y,'pwc3').setScale(0.7).refreshBody().text = "pwc3"; //Estela

          gap_PowerUP = 0;
      }
      else gap_PowerUP ++;
  }
}

////// POWER UPS /////
function getPower(player, boni){
  if(player.power === undefined){
    player.power = boni.text;
    player.aura = this.add.image(player.x,player.y, 'aura_'+player.power).setDepth(9);
    boni.destroy();
  }
}

function usePower(player){
  if(player.power !== undefined && !player.powerActivat){
    switch(player.power){
      case "pwc1":
        player.escut = true;
        if(player.equipo === equip_taronja)
        {
          player.setTexture("jugadorTE");
        }
        else
        {
          player.setTexture("jugadorBE");
        }
        player.powerActivat = true;
        break;
      case "pwc2":
        player.velocitat += 2;
        player.max_gap = max_gap / player.velocitat;
        player.timer = scene.time.delayedCall(3000, desactivarPower,[player]);
        player.powerActivat = true;
        break;
      case "pwc3":
        player.maxEstela += 10;
        break;
    }
    player.power = undefined;
    player.aura.destroy();
    player.aura = undefined;
  }
}

function desactivarPower(player){
  if (player.velocitat > 2) player.velocitat-=2;
  player.powerActivat = false;
}

// MORIR
function die(player, collision)
{
    if (player.active)
	{
        if(!player.escut && !player.inmune || !collision.parent)
        {
			player.powerActivat = false;
      player.escut = false;
      if(player.equipo === equip_taronja){
          player.setTexture("jugadorT");

      }
      else
      {
          player.setTexture("jugadorB");
      }

            if (player.bandera !== undefined) {
                  player.bandera.reset();
                  player.bandera = undefined;
            }
			player.power = undefined;

			if (player.aura !== undefined)
			{
			  player.aura.destroy();
			  player.aura = undefined;
			}

			player.equipo.deads += 1;
			player.active = false;
			player.visible = false;
			player.velocitat = 0;

			// SUMAR PUNTUACIO
			if (collision.parent && collision.parent.equipo !== player.equipo) {
			  collision.parent.equipo.puntuacio += 1;
			  collision.parent.equipo.kills += 1;
			  if (collision.parent.equipo.color === "blue") {
				  textos.equip_blau.setText(collision.parent.equipo.puntuacio);
				  if (collision.parent.equipo.puntuacio > 9) textos.equip_blau.x = 1080;
			  } else if (collision.parent.equipo.color === "orange") {
				  textos.equip_taronja.setText(collision.parent.equipo.puntuacio);
				  if (collision.parent.equipo.puntuacio > 9) textos.equip_taronja.x = 72;
			  }
			}
        }
        else
        {
          player.escut = false;
          if(player.equipo === equip_taronja){
            player.setTexture("jugadorT");
  
          }
          else
          {
              player.setTexture("jugadorB");
          }
          player.powerActivat = false;
          posarInmune(player);
        }
	}
}

function posarInmune(player){
  player.inmune = true;
  player.timer = scene.time.delayedCall(1000, treureInmune,[player]);
}

function treureInmune(player){
  player.inmune = false;
}

//Si la bandera no es suya y no esta cogida, la coge
function collectFlag(player, flag){
  if(flag.equipo.color !== player.equipo.color && flag.follow === undefined){

    flag.cogida = true;
    flag.follow = player;
    player.bandera = flag;
  }
}

//Si la base es suya y tiene una bandera +10 puntos
function enterBase(player, base){
  if(base.equipo.color === player.equipo.color && player.bandera !== undefined){
      player.equipo.puntuacio += 10;
	  player.equipo.banderes += 1;
      if(player.equipo.color === "blue") {
          textos.equip_blau.setText(player.equipo.puntuacio);
          if (player.equipo.puntuacio > 9) textos.equip_blau.x = 1080;
      }
      else if(player.equipo.color === "orange") {
          textos.equip_taronja.setText(player.equipo.puntuacio);
          if (player.equipo.puntuacio > 9) textos.equip_taronja.x = 72;
      }

    player.bandera.reset();
    player.bandera = undefined;

  }
}

//Inicialitza els atributs de la bandera
function inicialitzarFlag(flag){
    flag.posInicialX = flag.x;
    flag.posInicialY = flag.y;
    var res = function(){this.x = this.posInicialX;this.y = this.posInicialY;this.refreshBody();this.follow = undefined;};
    flag.reset = res;
    flag.follow = undefined;
}
