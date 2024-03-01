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
const { isPending, isFetching, isError, data, error } = useQuery({
  queryKey: ['todos'],
  queryFn: async () => {
    const data = await fetch('https://sheets.googleapis.com/v4/spreadsheets/1PxItEjV2RF5gBpMxy-a8loEb76PFH8pGi_7-Hbb3Y4E/values/Sushi!B4:E46?key=AIzaSyCFGiY1AO1wCGzepKqi1-k1g9o4R16Jyhg&majorDimension=COLUMNS')
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
  if (isPending.value)
    return []

  return [...data.value!].sort((a, b) => a.total - b.total) ?? []
})
</script>

<template>
  <div>
    <div class="card bg-base-100 shadow-xl">
      <figure>
        <img class="object-cover"
          src="https://cf.geekdo-images.com/2f9uTicUSXkdPp2Yks6zFw__itemrep/img/Y_jPOWbp6_2qOzymSNIC6SZo4TE=/fit-in/246x300/filters:strip_icc()/pic5885689.jpg"
          alt="Shoes">
      </figure>
      <div class="card-body">
        <h2 class="card-title">
          Sushi Go Party!
        </h2>
        <div class="overflow-x-auto">
          <table v-if="!isPending" class="table table-zebra">
            <!-- head -->

            <tbody>
              <!-- row 1 -->
              <tr v-for="(s, index) in sortedPlayers" :key="s.name">
                <th>{{ index + 1 }}</th>
                <td>
                  <div class="flex items-center gap-2">
                    <div class="avatar">
                      <div class="w-8 rounded-full">
                        <img :src="s.avatar">
                      </div>
                    </div>
                    <span class="font-semibold">
                      {{ s.name }}
                    </span>
                  </div>
                </td>
                <td>{{ s.total }}</td>
              </tr>
              <!-- row 2 -->
            </tbody>
          </table>
        </div>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">
            View
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
