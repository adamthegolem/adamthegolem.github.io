export default defineAppConfig({
  ui: {
    colors: {
      primary: 'teal',
      secondary: "emerald",
      neutral: 'zinc'
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
    inputMenu: {
      slots: {
        content: 'bg-default/90 backdrop-blur-xl'
      }
    },
  }
})
