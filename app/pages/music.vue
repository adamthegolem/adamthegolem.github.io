<script setup lang="ts">
interface ITrack {
  title: string,
  bandcamp?: string,
  youtube?: string,
  soundcloud?: string,
  img?: string,
  date?: string,
  unreleased?: boolean
}
const langStore = useLanguageStore()
const { t } = langStore
const tracks: ITrack[] = [
  {
    title: "Empty Roads",
    bandcamp: "https://adamthegolem.bandcamp.com/track/empty-roads",
    img: "https://f4.bcbits.com/img/a1402450881_10.jpg",
    date: t("October 23, 2020||23. oktober, 2020")
  },
  {
    title: "Wishes",
    bandcamp: "https://adamthegolem.bandcamp.com/track/wishes",
    img: "https://f4.bcbits.com/img/a2421815468_10.jpg",
    youtube: "https://www.youtube.com/watch?v=AaHqcifT6kA",
    date: t("February 4, 2021||4. februar, 2021")
  },
  {
    title: "Content",
    bandcamp: "https://adamthegolem.bandcamp.com/track/content",
    img: "https://f4.bcbits.com/img/a0816810023_10.jpg",
    youtube: "https://www.youtube.com/watch?v=KTYW41kYKyY",
    date: t("March 4, 2021||4. marts, 2021")
  },
  {
    title: "The End",
    bandcamp: "https://adamthegolem.bandcamp.com/track/the-end",
    img: "https://f4.bcbits.com/img/a3707957276_10.jpg",
    youtube: "https://www.youtube.com/watch?v=izEH88fSyXk",
    date: t("April 1, 2021||1. april, 2021")
  },
  {
    title: "Full of It",
    bandcamp: "https://adamthegolem.bandcamp.com/track/full-of-it",
    img: "https://f4.bcbits.com/img/a3474471074_10.jpg",
    youtube: "https://www.youtube.com/watch?v=7zPRSOhDboc",
    date: t("May 6, 2021||6. maj, 2021")
  },
  {
    title: "Game Over",
    soundcloud: "https://soundcloud.com/adamthegolem/game-over-draft-1/s-P3pRKrMtf1p?in=adamthegolem/sets/my-tracks/s-47aacqzKqWm&si=e3ebda8359264c558fe21310f4a61e97&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
    img: "https://i1.sndcdn.com/artworks-ku3GqiDpUtDUD7bX-N3E0Kg-t500x500.jpg",
    date: t("November 28, 2021||28. november, 2021"),
    unreleased: true,
  },
  {
    title: "Tests",
    soundcloud: "https://soundcloud.com/adamthegolem/tests-draft-1/s-XAFUT8whYI5?in=adamthegolem/sets/my-tracks/s-47aacqzKqWm&si=e1aa49bfeb224531b80331a9ca7e45f7&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
    img: "https://i1.sndcdn.com/artworks-ku3GqiDpUtDUD7bX-N3E0Kg-t500x500.jpg",
    date: t("November 29, 2021||29. november, 2021"),
    unreleased: true,
  },
  {
    title: "Ashes",
    soundcloud: "https://soundcloud.com/adamthegolem/ashes-draft-3/s-HFagezuA13T?in=adamthegolem/sets/my-tracks/s-47aacqzKqWm&si=6c432c6baefa469f892b31fdc4f7a2f8&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
    img: "https://i1.sndcdn.com/artworks-RmbOIdyuTaaI0qPo-9p0X9A-t500x500.jpg",
    date: t("February 4, 2022||4. februar, 2022"),
    unreleased: true,
  },
  {
    title: "Time",
    soundcloud: "https://soundcloud.com/adamthegolem/time-draft-1/s-L5abUk7RsyB?in=adamthegolem/sets/my-tracks/s-47aacqzKqWm&si=70c374e5e53b456bbf25637f3e341ed0&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
    img: "https://i1.sndcdn.com/artworks-WHLZZWxpjACKw5HF-HWrtzA-t500x500.jpg",
    date: "February 11, 2022",
    unreleased: true,
  },
  {
    title: "Ctrl + Z",
    soundcloud: "https://soundcloud.com/adamthegolem/ctrlz-draft-2/s-Inn3vQdGkHL?in=adamthegolem/sets/my-tracks/s-47aacqzKqWm&si=bea7fd10e4ce4fbeb898ea426aec9f32&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
    img: "https://i1.sndcdn.com/artworks-WHLZZWxpjACKw5HF-HWrtzA-t500x500.jpg",
    date: "February 21, 2022",
    unreleased: true,
  },
  {
    title: "OSC",
    soundcloud: "https://soundcloud.com/adamthegolem/osc-draft-6/s-IpIBxu655G3?in=adamthegolem/sets/my-tracks/s-47aacqzKqWm&si=bb103be47090446f92b94b002a1d8902&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
    img: "https://i1.sndcdn.com/artworks-WHLZZWxpjACKw5HF-HWrtzA-t500x500.jpg",
    date: "July 9, 2022",
    unreleased: true,
  },
  {
    title: "The Hunger",
    soundcloud: "https://soundcloud.com/adamthegolem/the-hunger-draft-2/s-LadEv0Z5v5d?si=cb3e43c9a56d4e5790a8f16f8da189bb&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
    img: "https://i1.sndcdn.com/artworks-4aE0qyMz6yUBHqoD-VFUZqg-t500x500.jpg",
    date: "October 17, 2024",
    unreleased: true,
  },
  {
    title: "The Shadow",
    soundcloud: "https://soundcloud.com/adamthegolem/the-shadow-draft-1/s-mpOhW3jeQfX?si=5238381329d2407bb2d80c8ec32f0845&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
    img: "https://i1.sndcdn.com/artworks-4aE0qyMz6yUBHqoD-VFUZqg-t500x500.jpg",
    date: "January 12, 2025",
    unreleased: true,
  },
  {
    title: "2025-07-30 (Draft 1)",
    soundcloud: "https://soundcloud.com/adamthegolem/2025-07-30-draft-1/s-PhlEugLMKqm?si=b2f2de29cc7840f3ac51bd37540ad597&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
    img: "https://i1.sndcdn.com/avatars-pZhF962UzHg6bdur-FKJRpQ-t500x500.jpg",
    date: "August 10, 2025",
    unreleased: true,
  }
];
interface Site {
  title: string,
  icon: string,
  href?: string
}
</script>
<template>
  <UPageHero :title="t('Music||Musik')"
    
  >

  </UPageHero>
  <UPageSection title="Tracks"
    icon="i-lucide-list-music"
    description="I'm not very good at setting deadlines for songs. So it's been years since I've released anything officially. But here are all of my releases, as well as some demos."
  >
    <UCarousel
      :items="tracks.reverse()"
      v-slot="{item}"
      arrows
      loop
      dots
      prev-icon="i-lucide-chevron-left"
      next-icon="i-lucide-chevron-right"
      :ui="{
        item: 'md:basis-1/3 w-10',
        viewport: 'p-3',
        dots: 'hidden md:flex'
      }"
    >
        <UBlogPost :title="item.title"
          icon="i-lucide-disc-3"
          :image="item.img"
          :date="item.date"
          :badge="(item.unreleased) ? {
            label: 'Demo',
            variant: 'soft',
            color: 'secondary',
            icon: 'i-lucide-cassette-tape'
          } : {
            label: 'Release',
            variant: 'soft',
            color: 'primary',
            icon: 'i-lucide-disc-3'
          }"
          :ui="{
            header: 'aspect-square',
            description: 'flex flex-col gap-3',
            image: ''
          }"
          class="select-none"
        >
          <template #description>
            <span>Adam The Golem</span>
            <!-- <UFieldGroup class=" mt-2">
              <UButton label="Listen now" color="neutral" variant="subtle" target="_blank" :to="[item.bandcamp, item.youtube, item.soundcloud].filter(link => link)[0]"></UButton>
              <UTooltip v-for="link in ([
                {
                  title: 'Bandcamp',
                  icon: 'i-simple-icons-bandcamp',
                  href: item.bandcamp
                },
                {
                  title: 'YouTube',
                  icon: 'i-simple-icons-youtube',
                  href: item.youtube
                },
                {
                  title: 'SoundCloud',
                  icon: 'i-simple-icons-soundcloud',
                  href: item.soundcloud
                }
              ] as Site[]).filter(({href}) => href)">
                <UButton
                  :icon="link.icon"
                  variant="outline"
                  color="neutral"
                  :to="link.href"
                  target="_blank"
                >
                </UButton>
              </UTooltip>

            </UFieldGroup> -->
            <MultiIconButton label="Listen now"
              :icons="[
                {
                  icon: 'i-simple-icons-bandcamp',
                  to: item.bandcamp,
                  exclude: !item.bandcamp,
                },
                {
                  icon: 'i-simple-icons-youtube',
                  to: item.youtube,
                  exclude: !item.youtube,
                },
                {
                  icon: 'i-simple-icons-soundcloud',
                  to: item.soundcloud,
                  exclude: !item.soundcloud,
                }
              ]"
            >

            </MultiIconButton>
          </template>
        </UBlogPost>
    </UCarousel>
  </UPageSection>
</template>