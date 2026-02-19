export default defineAppConfig({
  ui: {
    colors: {
      primary: 'teal',
      secondary: "orange",
      neutral: 'zinc',
      tertiary: "purple"
    },
    tooltip: {
      slots: {
        content: 'bg-default/50 backdrop-blur-md'
      },
    },
    popover: {
      slots: {
        content: 'bg-default/50 backdrop-blur-md'
      }
    },
    select: {
      slots: {
        content: 'bg-default/90 backdrop-blur-xl'
      }
    },
    inputMenu: {
      slots: {
        content: 'bg-default/90 backdrop-blur-xl'
      }
    },
    dropdownMenu: {
      slots: {
        // content: 'bg-default/80 backdrop-blur-md'
        viewport: 'max-h-90'
      }
    },
    prose: {
      // h1: {
      //   slots: {
      //     base: 'text-primary'
      //   }
      // },
      // h2: {
      //   slots: {
      //     base: 'text-primary'
      //   }
      // },
    },
    // badge: {
    //   variants: {
    //     variant: {
    //       subtle: "bg-{color}-50 dark:bg-{color}-950 text-{color}-600 dark:text-{color}-400 ring-1 ring-inset ring-{color}-500/25"
    //     }
    //   }
    // }
  }
})
