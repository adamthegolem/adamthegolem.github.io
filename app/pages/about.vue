<script setup lang="ts">
const info = useInfoStore();
const {t, language} = useLanguageStore();
useSeoMeta({
  title: computed(() => `${t("About Me||Om mig")} - Adam Golan`)
})
</script>
<template>
  <!-- <UContainer><img src="/img/profile.jpg" class=" md:hidden border-2 shadow-lg rounded-xl md:rounded-full aspect-square"></UContainer> -->
  <UPageHero
    :title="t('Engineer, Designer, & Product Developer||Ingeniør, designer & produktudvikler')"
    orientation="horizontal"
    :headline="t('About Me||Om mig')"
    description="I'm a product developer with a technical mind & a flair for design. I'm an experienced team worker but enjoy digging deep in technical tasks independently. I have a few rotating hobbies which reflect my affinity for balancing technical and design aspects."
    class=" "
    :ui="{
      description: 'flex flex-col gap-3 text-center md:text-start',
      container: 'pt-10 md:pt-24',
      links: 'justify-center md:justify-start',
      title: 'text-3xl md:text-7xl text-center md:text-start',
      headline: 'justify-center md:justify-start'
    }"
    :links="[
      {
        label: t('Get in touch on LinkedIn||Tag kontakt på LinkedIn'),
        to: info.links.linkedIn.to,
        // icon: 'i-ri-linkedin-fill',
        trailingIcon: 'i-lucide-send-horizontal',
        target: '_blank',
      },
      {
        label: t('Or shoot me an email||Eller send mig en email'),
        color: 'neutral',
        variant: 'subtle',
        trailingIcon: 'i-lucide-mail',
        to: info.links.email.to,
        target: '_blank',
      }
    ]"
  >
    <template #top>
      <!-- <UContainer class="md:hidden">
        <img src="/img/profile.jpg" class=" md:hidden border-2 shadow-lg rounded-xl md:rounded-full aspect-square">
      </UContainer> -->
      <img src="/img/profile.jpg" class=" md:hidden aspect-square">

    </template>
    <template #description>
      <p>{{t(info.extendedProfile)}}</p>
      <p></p>
    </template>
    <img src="/img/profile.jpg" class=" border-2 shadow-lg hidden md:block rounded-full aspect-square">
  </UPageHero>
  <UPageSection :title="t('Interests||Interesser')"
    icon="i-lucide-star"
    :description="t(info.freeTime)"
    :ui="{
      description: 'hyphens-auto',
      
    }"
  >
    <UPageGrid>
      <UPageFeature
        v-for="feature in [
          {
            title: t('Programming||Programmering'),
            icon: 'i-lucide-code',
            description: t(`I've programmed since middle school with a focus on web development, but touching on machine learning, game development, browser extensions, and microcontrollers as well.||Jeg har programmeret siden 7. klasse med fokus på webudvikling, men jeg er også kommet ind på machine learning, spiludvikling, browser-udvidelser, og mikrocontrollere.`),
            to: '/projects?skills=oop',
            toLabel: 'See projects here||Se projekter her',
            link: info.links.gitHub,
            color: 'primary' as const,
            textColor: 'text-primary'
          },
          {
            title: t('Music||Musik'),
            icon: 'i-lucide-music',
            description: t(`I've always had an interest in music and songwriting, and in 2018 I started producing and recording songs on my computer. I use Reason as my DAW, while keyboard and my own voice are my instruments of choice.||Jeg har altid været interesseret i musik og sangskrivning, og i 2018 begyndte jeg at producere og optage sange på min computer. Jeg bruger Reason som DAW, mens keyboard og min egen stemme er mit valg af instrumenter.`),
            to: '/music',
            toLabel: 'Take a listen here||Lyt her',
            link: info.links.bandcamp,
            color: 'secondary' as const,
            textColor: 'text-secondary'
          },
          // {
          //   title: t('Creative Writing||Kreativ skrivning'),
          //   icon: 'i-lucide-pencil'
          // },
          {
            title: 'Dungeons & Dragons',
            // icon: 'i-simple-icons-dungeonsanddragons',
            icon: 'i-fa-solid-dice-d20',
            description: t(`Since 2021 I have had a big interest in TTRPGs (role-playing games) like D&D, both as entertainment and as an activity. As a Game Master I plan the game and improvise during it, and I get to use both creative and technical skills.||Siden 2021 jeg har haft stor interesse i TTRPG'er (rollespil) som D&D, både som underholdning og aktivitet. Som Game Master planlægger jeg spillet og improviserer undervejs, og jeg får brugt både mine kreative og tekniske egenskaber.`),
            color: 'tertiary',
            textColor: 'text-tertiary'
          }
        ]"
        v-bind="{...feature, to: undefined}"
        :ui="{
          leadingIcon: feature.textColor
        }"
      >
        <template #description>
          <div class="flex flex-col gap-2 items-start flex-wrap">
            <p>{{ feature.description }}</p>
            <div class="flex gap-2">
              <UButton
                v-if="feature.to"
                :to="feature.to"
                :label="t(feature.toLabel)"
                variant="soft"
                trailing-icon="lucide:arrow-right"
                size="sm"
                :color="feature.color"
              >
              </UButton>
              <UButton
                v-if="feature.link"
                :icon="feature.link.icon"
                :label="`${t('Or on||Eller på')} ${feature.link.label}`"
                color="neutral"
                size="sm"
                variant="link"
                :to="feature.link.to"
                target="_blank"
              >

              </UButton>
            </div>
          </div>
        </template>
      </UPageFeature>
    </UPageGrid>
  </UPageSection>
  <UPageSection
    id="tools"
    :headline="t('What I bring to the table||Hvad jeg bidrager med')"
    icon="i-lucide-tool-case"
    :title="t('Skills & Tools||Færdigheder & værktøjer')"
  >
    <UTabs 
      :items="[
        {
          label: t('Skills||Færdigheder'),
          icon: 'i-lucide-user-cog',
          slot: 'skills'
        },
        {
          label: t('Systems & Software||Systemer & software'),
          icon: 'i-lucide-monitor',
          slot: 'systems'
        },
      ]"
      variant="link"
      :ui="{
        list: 'justify-center',
        content: 'pt-6'
      }"
    >
      <template #skills>
        <UPageGrid>
          <UPageCard
            v-for="skill in info.skills"
            :title="t(skill.name)"
            :description="t(skill.description)"
            :icon="skill.icon"
          >
            
          </UPageCard>
        </UPageGrid>
      </template>
      <template #systems>
        <!-- <div class="flex justify-center mb-2">
          <UInputMenu
            icon="i-lucide-list-filter"
            multiple
            :items="['Software', 'Programming Language'].sort()"
          >
          </UInputMenu>
        </div> -->
        <UPageGrid>
          <UPageCard
            v-for="system in info.softwareAndSystems"
            :title="system.name"
            :description="t(system.description)"
            :ui="{
              footer: 'w-full flex justify-end'
            }"
          >
            <template #header>
              <div class="flex gap-3">
                <div class=" h-6 aspect-square flex">
                  <img
                    :src="system.logo"
                    class=" m-auto"
                  >
                </div>
                <UBadge
                  variant="soft"
                  color="neutral"
                  :label="t(info.systemTypes[system.type]?.label)"
                  :icon="info.systemTypes[system.type]?.icon"
                />
              </div>
            </template>
            <template #footer>
              <UFieldGroup v-if="system.proficiency != undefined">
                <UBadge label="Proficiency" variant="outline"></UBadge>
                <UBadge variant="outline">
                  <Rating :value="system.proficiency" :max="3"></Rating>
                </UBadge>
              </UFieldGroup>
            </template>
          </UPageCard>
        </UPageGrid>
      </template>
    </UTabs>
    
  </UPageSection>
  <!-- <svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="-50 -50 840 1605">
      <g id="Layer_8_copy_2" data-name="Layer 8 copy 2" class=" stroke-white drop-shadow-2xl stroke-30 fill-transparent ">
          <path d="M730,667.4v447.6c0,36.18-29.71,65.55-66.01,64.99-35.67-.54-63.99-30.31-63.99-65.98v-364.01c0-2.76-1.12-5.26-2.93-7.07-1.81-1.81-4.31-2.93-7.07-2.93-5.52,0-10,4.48-10,10v515c0,36.18-29.71,65.55-66.01,64.99-35.67-.54-63.99-30.31-63.99-65.98v-364.01c0-2.76-1.12-5.26-2.93-7.07-1.81-1.81-4.31-2.93-7.07-2.93-5.52,0-10,4.48-10,10v440c0,36.18-29.71,65.55-66.01,64.99-35.67-.54-63.99-30.31-63.99-65.98v-439.01c0-2.76-1.12-5.26-2.93-7.07-1.81-1.81-4.31-2.93-7.07-2.93-5.52,0-10,4.48-10,10v365c0,36.18-29.71,65.55-66.01,64.99-35.66-.54-63.99-30.31-63.99-65.98v-664.01c0-2.76-1.12-5.26-2.93-7.07-1.81-1.81-4.31-2.93-7.07-2.93-5.52,0-10,4.48-10,10v215c0,36.18-29.71,65.55-66.01,64.99-35.66-.54-63.99-30.31-63.99-65.98v-149.01c0-200.76,162.92-364.18,363.49-365h1.51c200.89.01,365,166.32,365,367.4Z"/>
          <path d="M505,140c0,77.2-62.8,140-140,140s-140-62.8-140-140S287.8,0,365,0s140,62.8,140,140Z"/>
      </g>
  </svg> -->
</template>