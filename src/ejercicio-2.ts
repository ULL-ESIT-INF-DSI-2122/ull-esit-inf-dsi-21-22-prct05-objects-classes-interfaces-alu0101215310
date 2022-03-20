/* eslint-disable no-unused-vars */
export type wallet = Ficha[]

export enum direction {
  n = 0,
  ne = 1,
  no = 2,
  e = 3,
  o = 4,
  s = 5,
  se = 6,
  so = 7
}

/**
 * @class Ficha :Representa una ficha del tablero
 * @method setFill : Define si la ficha esta vacía o no
 * @method getFill : Devuelve el estado de la ficha
 * @method setOwner : Estableece el propietario de la ficha
 * @method getOwner : Devuelve el propietario de la ficha
 */
export class Ficha {
  private owner : boolean;

  constructor(private fill : boolean) {}

  setFill(state : boolean) {
    this.fill = state;
  }
  getFill() {
    return this.fill;
  }

  setOwner(player : boolean) {
    this.owner = player;
  }
  getOwner() {
    return this.owner;
  }
};

/**
 * @class Tablero : Representa el tablero de juego de dimensión 6x7
 * @method game : Inicia el juego y lleva el seguimiento del mismo, además
 * se encarga de pedir a los jugadores sus movmientos
 * @method wallets : Crea un vector que representa las fichas de cada jugador
 * @method insert : Confirma donde se ha insertado la ficha indicada
 * @method check : Comprueba si existe alguna ficha adyacente del mismo
 * jugador para determinar hacia que lado posría ser el 4 en raya
 * @method win : Comprueba en la dirección indicada cuantas fichas del
 * mismo jugador hay de forma consecutiva
 * @method print : Muestra el estado del tablero haciendo uso de caractéres
 * especiales teniendo en cuenta el estado de las fichas y su propietario
 */
export class Tablero {
  private tab : wallet[] = [];
  private winner : boolean;

  constructor() {
    for (let i = 0; i < 6; i++) {
      const col : Ficha[] = [];
      for (let j = 0; j < 7; j++) col.push(new Ficha(false));
      this.tab.push(col);
    }
  }

  game() {
    const scanf = require('scanf');
    const firstPlayerWin : boolean = false;
    const secondPlayerWin : boolean = false;
    const fichasJuego = this.wallets();
    let confirm : boolean = false;
    let counter : number = 1;
    while (firstPlayerWin === false && secondPlayerWin === false &&
      fichasJuego[0].length != 0 && fichasJuego[1].length != 0 &&
        this.winner === undefined) {
      console.log(`\nTurno ${counter}\n`);
      this.print();
      let firstPlay : number = 0;
      while (firstPlay < 1 || firstPlay > 7) {
        console.log('Jugador 1, selecciona una columna de la 1 a la 7: ');
        firstPlay = scanf('%d');
      }
      confirm = this.insert(firstPlay, true);
      while (confirm != true) {
        console.log('Esa columna está llena, selecciona otra: ');
        firstPlay = scanf('%d');
        while (firstPlay < 1 || firstPlay > 7) {
          console.log('Selecciona una columna de la 1 a la 7: ');
          firstPlay = scanf('%d');
        }
        confirm = this.insert(firstPlay, true);
      }
      fichasJuego[0].pop();
      counter++;
      if (this.winner === undefined) {
        console.log(`\nTurno ${counter}\n`);
        this.print();
        let secondPlay : number = 0;
        while (secondPlay < 1 || secondPlay > 7) {
          console.log('Jugador 2, selecciona una columna de la 1 a la 7: ');
          secondPlay = scanf('%d');
        }
        confirm = this.insert(secondPlay, false);
        while (confirm != true) {
          console.log('Esa columna está llena, selecciona otra: ');
          secondPlay = scanf('%d');
          while (secondPlay < 1 || secondPlay > 7) {
            console.log('Selecciona una columna de la 1 a la 7: ');
            secondPlay = scanf('%d');
          }
          confirm = this.insert(secondPlay, false);
        }
        fichasJuego[1].pop();
      }
      counter++;
    }
    this.print();
    if (fichasJuego[0].length != 0 && fichasJuego[1].length != 0) {
      return (this.winner === true) ?
        console.log(`\nGanó el jugador 1\n`) :
        console.log(`\nGanó el jugador 2\n`);
    } else return console.log(`\nHa habido un empate\n`);
  }

  wallets() {
    const fichasPlayer : wallet[] = [];
    const firstPlayer : Ficha[] = [];
    const secondPlayer : Ficha[] = [];
    for (let i = 0; i < 21; i++) {
      const ficha = new Ficha(true);
      ficha.setOwner(true);
      firstPlayer.push(ficha);
    }
    for (let i = 0; i < 21; i++) {
      const ficha = new Ficha(true);
      ficha.setOwner(false);
      secondPlayer.push(ficha);
    }
    fichasPlayer.push(firstPlayer);
    fichasPlayer.push(secondPlayer);
    return fichasPlayer;
  }

  insert(pos : number, prop : boolean) {
    let confirm : boolean = false;
    let row : number;
    for (let i = 0; i < 6; i++) {
      if (this.tab[i][pos - 1].getFill() === false && confirm === false) {
        this.tab[i][pos - 1].setOwner(prop);
        this.tab[i][pos - 1].setFill(true);
        confirm = true;
        row = i;
        const posib = this.check(i, pos - 1);
        if (posib === true) this.winner = prop;
      }
    }
    return confirm;
  }

  check(x : number, y : number) {
    let counter: number = 1;
    if (x != 5) {
      if (this.tab[x + 1][y].getOwner() === this.tab[x][y].getOwner()) {
        if (counter <= this.win(x + 1, y, 1, direction[0])) {
          counter = this.win(x + 1, y, 1, direction[0]) + 1;
        }
      }
    }
    if (x != 5 && y != 6) {
      if (this.tab[x + 1][y + 1].getOwner() === this.tab[x][y].getOwner()) {
        if (counter <= this.win(x + 1, y + 1, 1, direction[1])) {
          counter = this.win(x + 1, y + 1, 1, direction[1]) + 1;
        }
      }
    }
    if (x != 5 && y != 0) {
      if (this.tab[x + 1][y - 1].getOwner() === this.tab[x][y].getOwner()) {
        if (counter <= this.win(x + 1, y - 1, 1, direction[2])) {
          counter = this.win(x + 1, y - 1, 1, direction[2]) + 1;
        }
      }
    }
    if (y != 6) {
      if (this.tab[x][y + 1].getOwner() === this.tab[x][y].getOwner()) {
        if (counter <= this.win(x, y + 1, 1, direction[3])) {
          counter = this.win(x, y + 1, 1, direction[3]) + 1;
        }
      }
    }
    if (y != 0) {
      if (this.tab[x][y - 1].getOwner() === this.tab[x][y].getOwner()) {
        if (counter <= this.win(x, y - 1, 1, direction[4])) {
          counter = this.win(x, y - 1, 1, direction[4]) + 1;
        }
      }
    }
    if (x != 0) {
      if (this.tab[x - 1][y].getOwner() === this.tab[x][y].getOwner()) {
        if (counter <= this.win(x - 1, y, 1, direction[5])) {
          counter = this.win(x - 1, y, 1, direction[5]) + 1;
        }
      }
    }
    if (x != 0 && y != 6) {
      if (this.tab[x - 1][y + 1].getOwner() === this.tab[x][y].getOwner()) {
        if (counter <= this.win(x - 1, y + 1, 1, direction[6])) {
          counter = this.win(x - 1, y + 1, 1, direction[6]) + 1;
        }
      }
    }
    if (x != 0 && y != 0) {
      if (this.tab[x - 1][y - 1].getOwner() === this.tab[x][y].getOwner()) {
        if (counter <= this.win(x - 1, y - 1, 1, direction[7])) {
          counter = this.win(x - 1, y - 1, 1, direction[7]) + 1;
        }
      }
    }
    return (counter === 4) ? true : false;
  }

  win(x : number, y : number, counter : number, dir : string) {
    if (dir === direction[0] && x != 5) {
      if (this.tab[x + 1][y].getOwner() === this.tab[x][y].getOwner()) {
        counter += this.win(x + 1, y, counter, direction[0]);
      }
    }
    if (dir === direction[1] && x != 5 && y != 6) {
      if (this.tab[x + 1][y + 1].getOwner() === this.tab[x][y].getOwner()) {
        counter += this.win(x + 1, y + 1, counter, direction[1]);
      }
    }
    if (dir === direction[2] && x != 5 && y != 0) {
      if (this.tab[x + 1][y - 1].getOwner() === this.tab[x][y].getOwner()) {
        counter += this.win(x + 1, y - 1, counter, direction[2]);
      }
    }
    if (dir === direction[3] && y != 6) {
      if (this.tab[x][y + 1].getOwner() === this.tab[x][y].getOwner()) {
        counter += this.win(x, y + 1, counter, direction[3]);
      }
    }
    if (dir === direction[4] && y != 0) {
      if (this.tab[x][y - 1].getOwner() === this.tab[x][y].getOwner()) {
        counter += this.win(x, y - 1, counter, direction[4]);
      }
    }
    if (dir === direction[5] && x != 0) {
      if (this.tab[x - 1][y].getOwner() === this.tab[x][y].getOwner()) {
        counter += this.win(x - 1, y, counter, direction[5]);
      }
    }
    if (dir === direction[6] && x != 0 && y != 6) {
      if (this.tab[x - 1][y + 1].getOwner() === this.tab[x][y].getOwner()) {
        counter += this.win(x - 1, y + 1, counter, direction[6]);
      }
    }
    if (dir === direction[7] && x != 0 && y != 0) {
      if (this.tab[x - 1][y - 1].getOwner() === this.tab[x][y].getOwner()) {
        counter += this.win(x - 1, y - 1, counter, direction[7]);
      }
    }
    return counter;
  }

  print() {
    const x:string[] = [];
    this.tab.forEach((row) => {
      let y = '';
      row.forEach((col) => {
        if (col.getFill() === false) y += ' - ';
        else if (col.getOwner() === false) y += ' ○ ';
        else y += ' ● ';
      });
      x.push(y);
    });
    x.reverse();
    console.log(x);
  }
};

const game = new Tablero();
game.game();
