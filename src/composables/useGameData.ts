import { useQuery } from "@tanstack/vue-query"

export interface Data {
  range: string
  majorDimension: string
  values: string[][]
}

export const games  = [
  {
    name : 'Sushi Go Party!',
    logoName : 'sushigoparty',
    tabName : 'Sushi'
  },
  {
    name : 'Cant Stop',
    logoName : 'cantstop',
    tabName : 'Cant Stop'
  },
  {
    name : 'Lucky Numbers',
    logoName : 'luckynumbers',
    tabName : 'Lucky Numbers'
  },
  {
    name : 'Piraten Kapern',
    logoName : 'piratenkapern',
    tabName : 'Piraten Kapern'
  }
]



export const names = [{
  name: 'Tom',
  avatar: 'https://x.boardgamearena.net/data/data/avatar/defaults/default-2237_92.jpg',
  colour : '#2523ad'  
}, {
  name: 'Poppy',
  avatar: 'https://x.boardgamearena.net/data/data/avatar/defaults/default-2166_92.jpg',
  colour : '#8a00c9'
}, {
  name: 'Kevin',
  avatar: 'https://x.boardgamearena.net/data/data/avatar/0/93/93469/93469841_92.jpg?h=08b87bed01',
  colour : '#ff9d00'
}, {
  name: 'Sophie',
  avatar: 'https://x.boardgamearena.net/data/data/avatar/0/93/93470/93470143_92.jpg?h=6566160386',
  colour : '#009e54'
}]


export function useGameData(sheet: string, range: string) {
  const query = useQuery({
    queryKey: [sheet],
    staleTime : 30000,
    queryFn: async () => {
      const data = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/1PxItEjV2RF5gBpMxy-a8loEb76PFH8pGi_7-Hbb3Y4E/values/${sheet}!${range}?key=AIzaSyCFGiY1AO1wCGzepKqi1-k1g9o4R16Jyhg&majorDimension=COLUMNS`)
      const json = await data.json() as Data
      return json.values.map((value, index) => {
        return {
          name: names[index].name,
          avatar: names[index].avatar,
          colour : names[index].colour,
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
