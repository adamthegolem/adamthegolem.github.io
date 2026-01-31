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
    }
  }
})
