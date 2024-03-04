<template>
  <div class="grid md:grid-cols-2 gap-4" v-if="game">
    <GameCard :logo-name="logoName" :name="game.name" :loading="loading" :players="players" :show-view="false" />

    <div class="card bg-base-100">
      <div class="card-body">
        <h2 class="card-title">
          Positions
        </h2>
        <apexchart width="100%" type="bar" :options="options" :series="playerByPosition"></apexchart>
      </div>
    </div>

    <div class="card bg-base-100">
      <div class="card-body">
        <h2 class="card-title">
          Points over time
        </h2>
        <apexchart width="100%" type="line" :options="options" :series="pointsOverTime"></apexchart>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { ApexOptions } from 'apexcharts'
import { useGameData } from '~/composables/useGameData'

const route = useRoute('/game/[name]')
const logoName = route.params.name

const game = games.find(game => game.logoName === logoName)!

const { sortedPlayers: players, isPending: loading } = useGameData(game?.tabName, 'B4:E100')

const options: ApexOptions = {
  chart: {
    id: 'vuechart-example',
    toolbar: {
      show: false
    },
  },
  xaxis: {
    categories: ['1', '2', '3', '4'],
  }
}

const occurrences = (array: any[]) => array.reduce(function (acc, curr) {
  return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
}, {});

const playerByPosition = computed(() => {
  if (!players.value) return []
  return players.value.map((player, index) => {

    const values = occurrences(player.values);
    return {
      name: player.name,
      data: [values[1], values[2], values[3], values[4]],
      color: player.colour
    }
  })
});


const pointsOverTime = computed(() => {
  if (!players.value) return []
  return players.value.map((player, index) => {
    return {
      name: player.name,
      data: calculateCumulativeArray(player.values),
      color: player.colour
    }
  })
});


function calculateCumulativeArray(numbers: number[]) {
  if (!Array.isArray(numbers)) {
    throw new Error('Input must be an array of numbers');
  }

  if (numbers.length === 0) {
    return [];
  }

  let cumulativeSum = 0;
  const cumulativeArray = [];

  for (const number of numbers) {
    cumulativeSum += number;
    cumulativeArray.push(cumulativeSum);
  }

  return cumulativeArray;
}


</script>
