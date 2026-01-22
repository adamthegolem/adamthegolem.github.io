<script setup lang="ts">
const info = useInfoStore();
const {t, language} = useLanguageStore();
</script>
<template>
  <!-- <UContainer><img src="/img/profile.jpg" class=" md:hidden border-2 shadow-lg rounded-xl md:rounded-full aspect-square"></UContainer> -->
  <UPageHero
    :title="t('Engineer, Designer, & Product Developer||Ingeniør, designer & produktudvikler')"
    orientation="horizontal"
    :headline="t('About Me||Om mig')"
    description="I'm a product developer with a technical mind & a flair for design. I'm an experienced team worker but enjoy digging deep in technical tasks independently. I have a few rotating hobbies which reflect my affinity for balancing technical and design aspects."
    :ui="{
      description: 'flex flex-col gap-3 text-justify md:text-start',
      container: 'pt-10 md:pt-24',
      links: 'justify-center md:justify-start'
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
      <p>{{t("I'm a product developer with a technical mind & a flair for design. I'm an experienced team worker but enjoy digging deep in technical tasks independently. I have a few rotating hobbies which reflect my affinity for balancing technical and design aspects.")}}</p>
      <p></p>
    </template>
    <img src="/img/profile.jpg" class=" border-2 shadow-lg hidden md:block rounded-full aspect-square">
  </UPageHero>
  <UPageSection :title="t('Interests||Interesser')"
    icon="i-lucide-star"
    :description="t('I have a few rotating hobbies which reflect my affinity for balancing technical and design aspects. I enjoy songwriting and music production, computer programming projects, and creative writing. And when I can find people to play with, I enjoy being a game master for games such as Dungeons & Dragons.||Jeg har en række roterende interesser, der reflekterer min tiltrækning til det tekniske og det designrelaterede. Jeg elsker sangskrivning og musikproduktion, programmeringsprojekter, og kreativ skrivning. Og når jeg kan finde folk at spille med, agerer jeg game master for spil som Dungeons & Dragons.')"
    :features="[
      {
        title: t('Music||Musik'),
        icon: 'i-lucide-music'
      },
      {
        title: t('Programming||Programmering'),
        icon: 'i-lucide-code'
      },
      {
        title: t('Creative Writing||Kreativ skrivning'),
        icon: 'i-lucide-pencil'
      },
      {
        title: 'Dungeons & Dragons',
        icon: 'i-simple-icons-dungeonsanddragons'
      }
    ]"
  >
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
        <div class="flex justify-center mb-2">
          <UInputMenu
            icon="i-lucide-list-filter"
            multiple
            :items="['Software', 'Programming Language'].sort()"
          >
          </UInputMenu>
        </div>
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
</template>