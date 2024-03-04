export function useBackgroundImage(logoName: string) {
  const imageBg = computed(() => {
    return `center right 20% / 80% no-repeat url(https://x.boardgamearena.net/data/gamemedia/${logoName}/title/en_500.png?h=1654730412), linear-gradient(0deg, #0000004d 0%, #00000000 50%, #0000004d 100%), center / cover no-repeat url(https://x.boardgamearena.net/data/gamemedia/${logoName}/banner/default_500.jpg?h=1654731306), center / cover no-repeat url(https://x.boardgamearena.net/data/themereleases/240221-1000/img/mainsite/games/default_banner.jpg)`
  })

  return { imageBg }
}
