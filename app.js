import { getRandomValue } from './utils.js';

const MIN_MONSTER_DAMAGE = 5;
const MAX_MONSTER_DAMAGE = 12;
const MIN_PLAYER_DAMAGE = 8;
const MAX_PLAYER_DAMAGE = 15;

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
    };
  },
  computed: {
    monsterHealthStyle() {
      return { width: `${this.monsterHealth}%` };
    },
    playerHealthStyle() {
      return { width: `${this.playerHealth}%` };
    },
  },
  methods: {
    attackMonster() {
      const attackDamageValue = getRandomValue(
        MAX_MONSTER_DAMAGE,
        MIN_MONSTER_DAMAGE
      );
      this.monsterHealth -= attackDamageValue;
      this.attackPlayer();
    },
    attackPlayer() {
      const attackDamageValue = getRandomValue(
        MAX_PLAYER_DAMAGE,
        MIN_PLAYER_DAMAGE
      );
      this.playerHealth -= attackDamageValue;
    },
  },
});

app.mount('#game');
