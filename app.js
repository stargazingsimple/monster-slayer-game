import { getRandomValue } from './utils.js';

const MIN_MONSTER_DAMAGE = 5;
const MAX_MONSTER_DAMAGE = 12;
const MIN_PLAYER_DAMAGE = 8;
const MAX_PLAYER_DAMAGE = 15;
const MIN_SPECIAL_ATTACK_DAMAGE = 15;
const MAX_SPECIAL_ATTACK_DAMAGE = 20;

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      roundsCounter: 0,
    };
  },
  computed: {
    monsterHealthStyle() {
      return { width: `${this.monsterHealth}%` };
    },
    playerHealthStyle() {
      return { width: `${this.playerHealth}%` };
    },
    isSpecialAttackDisabled() {
      return this.roundsCounter % 3;
    },
  },
  methods: {
    attackPlayer() {
      const attackDamageValue = getRandomValue(
        MAX_PLAYER_DAMAGE,
        MIN_PLAYER_DAMAGE
      );
      this.playerHealth -= attackDamageValue;
    },
    attackMonster(isSuperAttack = false) {
      this.roundsCounter += 1;

      const maxValue = isSuperAttack
        ? MAX_SPECIAL_ATTACK_DAMAGE
        : MAX_MONSTER_DAMAGE;
      const minValue = isSuperAttack
        ? MIN_SPECIAL_ATTACK_DAMAGE
        : MIN_MONSTER_DAMAGE;
      const attackDamageValue = getRandomValue(maxValue, minValue);
      this.monsterHealth -= attackDamageValue;
      this.attackPlayer();
    },
  },
});

app.mount('#game');
