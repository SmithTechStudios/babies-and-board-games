<template>
  <div class="grid md:grid-cols-2 gap-4" v-if="game">
    <GameCard :logo-name="logoName" :name="game.name" :loading="loading" :players="players" :show-view="false" />

    <div class="card bg-base-100">
      <div class="card-body">
        <h2 class="card-title">
          Positions
        </h2>
      </div>
      <apexchart class="p-1" width="100%" type="bar" :options="options" :series="playerByPosition"></apexchart>
    </div>

    <div class="card bg-base-100">
      <div class="card-body">
        <h2 class="card-title">
          Points over time
        </h2>
      </div>

      <apexchart class="p-1" width="100%" type="line" :options="{
    chart: {
      toolbar: {
        show: false
      }
    }
  }" :series="pointsOverTime"></apexchart>
    </div>

    <div class="card bg-base-100">
      <div class="card-body">
        <h2 class="card-title">
          Results
        </h2>
        <div class="overflow-x-auto w-full">
          <table class="table table-zebra relative">
            <!-- head -->
            <thead>
              <tr>
                <th class="sticky top-0 bg-white" v-for="player in players">
                  <div class="flex items-center gap-2">
                    <div class="avatar">
                      <div class="w-8 rounded-full">
                        <img :src="player.avatar">
                      </div>
                    </div>
                    <span class="font-semibold">
                      {{ player.name }}
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- row 1 -->
              <tr v-for="(row, index) in tableRows" :key="index">
                <td class="font-bold" :class="{
    'bg-[gold]': col === 1,
    'bg-[silver]': col === 2,
    'bg-[#ad8a56]': col === 3,
  }" v-for="col in row">{{ col }}</td>
              </tr>

            </tbody>
          </table>
        </div>
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

const tableRows = computed(() => {
  //Create an array thats 100 elements long

  const data: number[][] = Array.from({ length: 100 }, (_, i) => []);
  players.value.map((player, index) => {
    player.values.forEach((value, index) => {
      data[index].push(value)
    })
  })

  return data;
})
</script>
