<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { names, useGameData } from '~/composables/useGameData';
defineOptions({
  name: 'IndexPage',
})



const { sortedPlayers: sortedSushiPlayers, isPending: sushiPending } = useGameData('Sushi', 'B4:E100')
const { sortedPlayers: sortedCantStopPlayers, isPending: cantStopPending } = useGameData('Cant Stop', 'B4:E100')
const { sortedPlayers: sortedLuckyNumbersPlayers, isPending: luckyNumbersPending } = useGameData('Lucky Numbers', 'B4:E100')
const { sortedPlayers: sortedPiratenPlayers, isPending: piratenPending } = useGameData('Piraten Kapern', 'B4:E100')




const overallWinners = computed(() => {
  const players = [...names];

  return players.map(player => {
    let score = 0;
    let wins = 0;
    let seconds = 0;
    let thirds = 0;
    [sortedSushiPlayers, sortedCantStopPlayers, sortedLuckyNumbersPlayers, sortedPiratenPlayers].forEach((game) => {
      const gameIndex = game.value.findIndex(p => {
        return p.name === player.name
      })
      const pos = 4 - gameIndex;
      score += pos;
      switch (gameIndex) {
        case 0:
          wins++; break;
        case 1:
          seconds++; break;
        case 2:
          thirds++; break;
      }
    })

    return {
      ...player,
      score,
      wins,
      seconds,
      thirds
    }

  }).sort((a, b) => b.score - a.score)
});


</script>

<template>
  <div>

    <div class="stats stats-vertical shadow w-full mb-4">

      <div class="stat flex justify-between" v-for="winners in overallWinners" :key="winners.name">
        <div class="stat-title flex items-center gap-4">
          <div class="stat-value min-w-10 text-black">{{ winners.score }}</div>
          <div class="avatar">
            <div class="w-8 rounded-full">
              <img :src="winners.avatar">
            </div>
          </div>
          <span>
            {{ winners.name }}
          </span>
        </div>
        <div class="flex gap-4">
          <div class="flex items-center">
            <Icon color="gold" icon="material-symbols:trophy"></Icon>{{ winners.wins }}
          </div>
          <div class="flex items-center">
            <Icon color="silver" icon="material-symbols:trophy" />{{ winners.seconds }}
          </div>
          <div class="flex items-center">
            <Icon class="text-orange-800" icon="material-symbols:trophy" />{{ winners.thirds }}
          </div>

        </div>
      </div>



    </div>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <GameCard name="Sushi Go Party!" logo-name="sushigoparty" :players="sortedSushiPlayers" :loading="sushiPending" />



      <GameCard name="Cant Stop" logo-name="cantstop" :players="sortedCantStopPlayers" :loading="cantStopPending" />

      <GameCard name="Lucky Numbers" logo-name="luckynumbers" :players="sortedLuckyNumbersPlayers"
        :loading="luckyNumbersPending" />

      <GameCard name="Piraten Kapern" logo-name="piratenkapern" :players="sortedPiratenPlayers"
        :loading="piratenPending" />
    </div>
  </div>
</template>
