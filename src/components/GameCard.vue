<template>
  <div class="card bg-base-100 shadow-xl">
    <figure>
      <img class="object-cover" :src="logoUrl" alt="Shoes">
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
      <div class="card-actions justify-end">
        <button class="btn btn-primary">
          View
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

interface Props {
  name: string,
  logoUrl: string,
  players: {
    name: string,
    avatar: string,
    values: number[],
    total: number
  }[]
  loading: boolean
}

defineProps<Props>()

</script>
