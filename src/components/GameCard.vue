<template>
  <div class="card bg-base-100 shadow-xl">
    <figure>
      <div class="aspect-video w-full bg-base-100" :style="{
        background: imageBg
      }"></div>
    </figure>
    <div class="card-body">
      <h2 class="card-title">
        {{ name }}
      </h2>
      <div class="overflow-x-auto" v-if="!loading">





        <table class="table table-zebra">
          <!-- head -->

          <tbody>
            <!-- row 1 -->
            <tr v-for="(player, index) in players" :key="player.name">
              <th>{{ index + 1 }}</th>
              <td>
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
              </td>
              <td>{{ player.total }}</td>
            </tr>
            <!-- row 2 -->
          </tbody>
        </table>
      </div>
      <div class="flex flex-col gap-4 " v-else>
        <div class="skeleton h-4 w-full"></div>
        <div class="skeleton h-4 w-full"></div>
        <div class="skeleton h-4 w-full"></div>
      </div>
      <div class="card-actions justify-between w-full">
        <div class="flex justify-between items-center w-full">
          <div class="stat">
            <div class="stat-title">Total Games Played</div>
            <div class="stat-value text-2xl">{{ players[0].values.length }}</div>
          </div>
          <button class="btn btn-primary">
            View
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

interface Props {
  name: string,
  logoName: string,
  players: {
    name: string,
    avatar: string,
    values: number[],
    total: number
  }[]
  loading: boolean
}

const props = defineProps<Props>()

const imageBg = computed(() => {
  return `center right 20% / 80% no-repeat url(https://x.boardgamearena.net/data/gamemedia/${props.logoName}/title/en_500.png?h=1654730412), linear-gradient(0deg, #0000004d 0%, #00000000 50%, #0000004d 100%), center / cover no-repeat url(https://x.boardgamearena.net/data/gamemedia/${props.logoName}/banner/default_500.jpg?h=1654731306), center / cover no-repeat url(https://x.boardgamearena.net/data/themereleases/240221-1000/img/mainsite/games/default_banner.jpg)`
})

</script>
