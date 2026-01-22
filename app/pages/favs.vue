<script setup lang="ts">
interface Item {
  title: string,
  image?: string,
}
const sitcoms: Item[] = [
  {
    title: "Brooklyn Nine-Nine",
    image: "https://image.tmdb.org/t/p/original/7tTvREykun6WeGJ4hy7sCG9TOeP.jpg",
  },
  {
    title: "30 Rock",
    image: "https://m.media-amazon.com/images/M/MV5BMTQ4NDQ4OTUzOV5BMl5BanBnXkFtZTcwMjMzMTUyNw@@._V1_FMjpg_UY600_.jpg",
  },
  {
    title: "Community",
    image: "https://image.tmdb.org/t/p/original/acCuY6pAhEGuFVL30ogNSZPyw2y.jpg",
  },
  {
    title: "Arrested Development",
    image: "https://image.tmdb.org/t/p/original/p4r4RD7RsNcJVoz0H6z3dBoTBtW.jpg",
  },
]
const movies: Item[] = [
  {
    title: "A Bug's Life",
    image: "https://image.tmdb.org/t/p/original/Ah3J9OJVc2CNCuH2zMydXy9fmIC.jpg",
  },
  {
    title: "Inglourious Basterds",
    image: "https://image.tmdb.org/t/p/original/jTLuJbn90WrKFDQSqnRm0b42r8t.jpg",
  },
  {
    title: "Spider-Man: Into the Spider-Verse",
    image: "https://image.tmdb.org/t/p/original/hFBGmmMACCeWjUoNBbv755D3Xal.jpg",
  },
  {
    title: "Spider-Man: Across the Spider-Verse",
    image: "https://image.tmdb.org/t/p/original/jN1tz3Z10gUOdb11iPwQd6JBlms.jpg"
  }
]
const shows: Item[] = [
  {
    title: "Over The Garden Wall",
    image: "https://image.tmdb.org/t/p/original/m3lU8n7WxzMecxKZcqhq5y5ESy.jpg",
  },
  {
    title: "Dirk Gently's Holistic Detective Agency",
    image: "https://image.tmdb.org/t/p/original/1cvSkF2NL42St7gyFGVQk66eCeN.jpg",
  },
  {
    title: "Barry",
    image: "https://image.tmdb.org/t/p/original/tu7wAI662scjgxMpV3fiedAZiym.jpg",
  },
  {
    title: "BoJack Horseman",
    image: "https://image.tmdb.org/t/p/original/6JFWzlChcGgLiIUo2COgNlWGFKy.jpg"
  }
]
const lists = [
  {
    title: "Best Sitcoms",
    list: sitcoms
  },
  {
    title: "Best Movies",
    list: movies,
  },
  {
    title: "Best Shows",
    list: shows,
  },
];
</script>
<template>
  <UPageSection v-for="list of lists" :title="list.title">
    <UCarousel
      :items="list.list"
      v-slot="{item}"
      loop
      arrows
      :ui="{
        item: 'md:basis-1/3',
        viewport: 'p-3',
        dots: 'hidden md:flex'
      }"
    >
      <UBlogPost :title="item.title" :image="item.image"
        :ui="{
          header: 'aspect-square'
        }"
      >

      </UBlogPost>
    </UCarousel>

  </UPageSection>
</template>