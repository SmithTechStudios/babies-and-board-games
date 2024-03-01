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


const { data: sushiData, isPending: sushiPending } = useGameData('Sushi', 'B4:E100')
const { data: cantStopData, isPending: cantStopPending } = useGameData('Cant Stop', 'B4:E100')



function useGameData(sheet: string, range: string) {
  return useQuery({
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
}

const sortedSushiPlayers = computed(() => {
  if (sushiPending.value)
    return []

  return [...sushiData.value!].sort((a, b) => a.total - b.total) ?? []
})


const sortedCantStopPlayers = computed(() => {
  if (cantStopPending.value)
    return []

  return [...cantStopData.value!].sort((a, b) => a.total - b.total) ?? []
})
</script>

<template>
  <div>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <GameCard name="Sushi Go Party!"
        logo-url="https://cf.geekdo-images.com/2f9uTicUSXkdPp2Yks6zFw__itemrep/img/Y_jPOWbp6_2qOzymSNIC6SZo4TE=/fit-in/246x300/filters:strip_icc()/pic5885689.jpg"
        :players="sortedSushiPlayers" :loading="sushiPending" />



      <GameCard name="Cant Stop"
        logo-url="https://x.boardgamearena.net/data/gamemedia/cantstop/box/en_180.png?h=1651658243"
        :players="sortedCantStopPlayers" :loading="cantStopPending" />
    </div>
  </div>
</template>
