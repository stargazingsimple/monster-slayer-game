import { getRandomValue } from './utils.js';

const MIN_MONSTER_DAMAGE = 5;
const MAX_MONSTER_DAMAGE = 12;
const MIN_PLAYER_DAMAGE = 8;
const MAX_PLAYER_DAMAGE = 15;
const MIN_SPECIAL_ATTACK_DAMAGE = 15;
const MAX_SPECIAL_ATTACK_DAMAGE = 20;
const MIN_HEAL_VALUE = 8;
const MAX_HEAL_VALUE = 20;

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
    isHealPlayerDisabled() {
      return this.playerHealth === 100;
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
    attackMonster(isSpecialAttack = false) {
      this.roundsCounter += 1;

      const maxValue = isSpecialAttack
        ? MAX_SPECIAL_ATTACK_DAMAGE
        : MAX_MONSTER_DAMAGE;
      const minValue = isSpecialAttack
        ? MIN_SPECIAL_ATTACK_DAMAGE
        : MIN_MONSTER_DAMAGE;
      const attackDamageValue = getRandomValue(maxValue, minValue);
      this.monsterHealth -= attackDamageValue;
      this.attackPlayer();
    },
    healPlayer() {
      this.roundsCounter += 1;

      const healValue = getRandomValue(MAX_HEAL_VALUE, MIN_HEAL_VALUE);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.attackPlayer();
    },
  },
});

app.mount('#game');
