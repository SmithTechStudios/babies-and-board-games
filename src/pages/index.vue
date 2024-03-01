<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'

defineOptions({
  name: 'IndexPage',
})

export interface Data {
  range: string
  majorDimension: string
  values: string[][]
}

const names = [{
  name: 'Tom',
  avatar: 'https://x.boardgamearena.net/data/data/avatar/defaults/default-2237_92.jpg',
}, {
  name: 'Poppy',
  avatar: 'https://x.boardgamearena.net/data/data/avatar/defaults/default-2166_92.jpg',
}, {
  name: 'Kevin',
  avatar: 'https://x.boardgamearena.net/data/data/avatar/0/93/93469/93469841_92.jpg?h=08b87bed01',
}, {
  name: 'Sophie',
  avatar: 'https://x.boardgamearena.net/data/data/avatar/0/93/93470/93470143_92.jpg?h=6566160386',

}]


const { sortedPlayers: sortedSushiPlayers, isPending: sushiPending } = useGameData('Sushi', 'B4:E100')
const { sortedPlayers: sortedCantStopPlayers, isPending: cantStopPending } = useGameData('Cant Stop', 'B4:E100')
const { sortedPlayers: sortedLuckyNumbersPlayers, isPending: luckyNumbersPending } = useGameData('Lucky Numbers', 'B4:E100')
const { sortedPlayers: sortedPiratenPlayers, isPending: piratenPending } = useGameData('Piraten Kapern', 'B4:E100')



function useGameData(sheet: string, range: string) {
  const query = useQuery({
    queryKey: [sheet],
    queryFn: async () => {
      const data = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/1PxItEjV2RF5gBpMxy-a8loEb76PFH8pGi_7-Hbb3Y4E/values/${sheet}!${range}?key=AIzaSyCFGiY1AO1wCGzepKqi1-k1g9o4R16Jyhg&majorDimension=COLUMNS`)
      const json = await data.json() as Data
      return json.values.map((value, index) => {
        return {
          name: names[index].name,
          avatar: names[index].avatar,
          values: value.map(v => Number.parseInt(v)),
          total: value.reduce((sum, current) => sum + Number.parseInt(current), 0),
        }
      })
    },
  })

  const sortedPlayers = computed(() => {
    if (query.isPending.value)
      return []

    return [...query.data.value!].sort((a, b) => a.total - b.total) ?? []
  })

  return {
    ...query,
    sortedPlayers
  }

}
</script>

<template>
  <div>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <GameCard name="Sushi Go Party!" logo-name="sushigoparty" :players="sortedSushiPlayers" :loading="sushiPending" />



      <GameCard name="Cant Stop" logo-name="cantstop" :players="sortedCantStopPlayers" :loading="cantStopPending" />

      <GameCard name="Lucky Numbers" logo-name="luckynumbers" :players="sortedLuckyNumbersPlayers"
        :loading="luckyNumbersPending" />

      <GameCard name="Cant Stop" logo-name="piratenkapern" :players="sortedPiratenPlayers" :loading="piratenPending" />
    </div>
  </div>
</template>
