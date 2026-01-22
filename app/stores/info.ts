export const useInfoStore = defineStore("infoStore", () => {
    enum Languages {
        English,
        Danish
    }
    const language = Languages.Danish
    function t(...strings: string[]) {
        // if (text == undefined) return "";
        // const split = text.split("||")
        return strings[Math.min(language, strings.length - 1)] as string
    }
    const contactInfo = {
        address: {
            label: 'Pjentedamsgade 30E, 5000 Odense',
            icon: 'i-lucide-house',
        },
        phoneNumber: {
            label: '+45 51 20 19 77',
            icon: 'i-lucide-phone',
        }
    }
    const profile = 'A product developer with a technical mind & a flair for design. Experienced team worker but enjoys digging deep in technical tasks independently.||Produktudvikler med teknisk hjerne & flair for design. Erfaren gruppearbejder men nyder at dykke ned i tekniske opgaver selvstændigt.'
    const links = {
        linkedIn: {
            label: "LinkedIn",
            to: "https://www.linkedin.com/in/adam-golan-720765310/",
            icon: "i-ri-linkedin-fill",
        },
        email: {
            label: "Email",
            to: "mailto:adamdamgolan@gmail.com",
            icon: "i-lucide-mail",
        },
        gitHub: {
            label: "GitHub",
            to: "https://github.com/adam1279",
            icon: "i-simple-icons-github",
        },
        bandcamp: {
            label: "Bandcamp",
            to: "https://adamthegolem.bandcamp.com/",
            icon: "i-simple-icons-bandcamp",
        },
        youTube: {
            label: "YouTube",
            to: "https://www.youtube.com/@adamthegolem",
            icon: "i-simple-icons-youtube",
        },
    }
    const logoPrefix = "/img/logos/"
    enum SystemType {
        Language,
        Software
    }
    const systemTypes: {
        icon: string,
        label: string
    }[] = [
        {
            // label: t("Programming", "Programmering"),
            label: "Programming||Programmering",
            icon: "i-lucide-code"
        },
        {
            label: "Software",
            icon: "i-lucide-laptop-minimal"
        }
    ]
    const softwareAndSystems: {
        logo: string,
        name: string,
        type: SystemType,
        description?: string,
        proficiency?: number,
    }[] = [
        {
            logo: logoPrefix + 'Adobe_InDesign_CC_icon.svg',
            name: "Adobe InDesign",
            type: SystemType.Software,
            // description: t(
            //     "Layout and graphic design. Posters and plenty of reports.",
            //     "Layout og grafisk design. Plakater og en masse rapporter."
            // ),
            description: "Layout and graphic design. Posters and plenty of reports.||Layout og grafisk design. Plakater og en masse rapporter.",
            proficiency: 3
        },
        {
            logo: logoPrefix + 'adobe-illustrator-seeklogo.com.svg',
            name: "Adobe Illustrator",
            type: SystemType.Software,
            // description: t(
            //     "Vector graphics. Logos, icons, graphs, and illustrations.",
            //     "Vektorgrafik. Logoer, ikoner, grafer og illustrationer."
            // ),
            description: "Vector graphics. Logos, icons, graphs, and illustrations.||Vektorgrafik. Logoer, ikoner, grafer og illustrationer.",
            proficiency: 2.5
        },
        {
            logo: logoPrefix + 'Adobe_Premiere_Pro_CC_icon.svg',
            name: "Adobe Premiere Pro",
            type: SystemType.Software,
            // description: t(
            //     "Video editing. Commercials, demos, and product presentations.",
            //     "Videoredigering. Reklamer, demoer og produktpræsentationer."
            // ),
            description: "Video editing. Commercials, demos, and product presentations.||Videoredigering. Reklamer, demoer og produktpræsentationer.",
            proficiency: 2.5,
        },
        {
            logo: logoPrefix + 'adobe-photoshop-seeklogo.com.svg',
            name: "Adobe Photoshop",
            type: SystemType.Software,
            // description: t(
            //     "Photo editing and compositing. Artwork and product renders.",
            //     "Fotoredigering og compositing. Kunstværk og produktrenderinger."
            // ),
            description: "Photo editing and compositing. Artwork and product renders.||Fotoredigering og compositing. Kunstværk og produktrenderinger.",
            proficiency: 2.5,
        },
        {
            logo: logoPrefix + 'Affinity_(App)_Logo.svg',
            name: "Affinity",
            type: SystemType.Software,
            // description: t(
            //     "Graphic design across the board. Reports, graphics, etc.",
            //     "Grafisk design over hele linjen. Rapporter, grafik, osv."
            // ),
            description: "Graphic design across the board. Reports, graphics, etc.||Grafisk design over hele linjen. Rapporter, grafik, osv.",
            proficiency: 2,
        },
        {
            logo: logoPrefix + 'autodesk-inventor-seeklogo.svg',
            name: "Autodesk Inventor",
            type: SystemType.Software,
            // description: t(
            //     "Computer-aided design. Parts and assemblies for drawings, renders, and 3D printing.",
            //     "Computer-aided design. Parter og samlinger til tegninger, renderinger og 3D-print."
            // ),
            description: "Computer-aided design. Parts and assemblies for drawings, renders, and 3D printing.||Computer-aided design. Parter og samlinger til tegninger, renderinger og 3D-print.",
            proficiency: 2.5
        },
        {
            logo: logoPrefix + 'blender_logo.svg',
            name: "Blender",
            type: SystemType.Software,
            // description: t(
            //     "Modeling, rendering, and animation. Product renders, illustrations, and videos.",
            //     "Modeller, rendering og animation. Produktrenderinger, illustrationer og videoer."
            // ),
            description: "Modeling, rendering, and animation. Product renders, illustrations, and videos.||Modeller, rendering og animation. Produktrenderinger, illustrationer og videoer.",
            proficiency: 2.5
        },
        {
            logo: logoPrefix + 'DaVinci_Resolve_Studio.png',
            name: "DaVinci Resolve",
            type: SystemType.Software,
            // description: t(
            //     "Video editing and VFX. Commercials, demos, and product presentations.",
            //     "Videoredigering og VFX. Reklamer, demoer og produktpræsentationer."
            // ),
            description: "Video editing and VFX. Commercials, demos, and product presentations.||Videoredigering og VFX. Reklamer, demoer og produktpræsentationer.",
            proficiency: 2
        },
        {
            logo: logoPrefix + 'html5-without-wordmark-color.svg',
            name: "HTML",
            type: SystemType.Language,
            // description: t(
            //     "Basic building blocks of the internet.",
            //     "Internettets basale byggeklodser."
            // ),
            description: "Basic building blocks of the internet.||Internettets basale byggeklodser.",
            proficiency: 3,
        },
        {
            logo: logoPrefix + 'Official_CSS_Logo.svg',
            name: "CSS",
            type: SystemType.Language,
            // description: t(
            //     "Standard styling language of the web.",
            //     "Internettets standard for styling."
            // ),
            description: "Standard styling language of the web.||Internettets standard for styling.",
            proficiency: 3,
        },
        {
            logo: logoPrefix + 'Tailwind_CSS_Logo.svg',
            name: "Tailwind CSS",
            type: SystemType.Language,
            proficiency: 3,
        },
        {
            logo: logoPrefix + 'javascript-js-seeklogo.com.svg',
            name: "JavaScript",
            type: SystemType.Language,
            proficiency: 3,
        },
        {
            logo: logoPrefix + 'Typescript_logo_2020.svg',
            name: "TypeScript",
            type: SystemType.Language,
            proficiency: 2.5,
        },
        {
            logo: logoPrefix + 'Vue.js_Logo_2.svg',
            name: "Vue",
            type: SystemType.Language,
            proficiency: 2.5
        },
        {
            logo: logoPrefix + 'nuxt-js-icon.svg',
            name: "Nuxt",
            type: SystemType.Language,
            proficiency: 2.5
        },
        {
            logo: logoPrefix + 'visual-studio-code-seeklogo.com.svg',
            name: "Visual Studio Code",
            type: SystemType.Software,
            proficiency: 3,
        },
        {
            logo: logoPrefix + 'Unity.svg',
            name: "Unity",
            type: SystemType.Software,
            proficiency: 1.5,
        },
        {
            logo: logoPrefix + "Arduino_Logo.svg",
            name: "Arduino",
            type: SystemType.Software,
            proficiency: 2.5,
        },
        {
            logo: logoPrefix + "Logo_C_sharp.svg",
            name: "C#",
            type: SystemType.Language,
            proficiency: 2,
        },
        {
            logo: logoPrefix + "ISO_C++_Logo.svg",
            name: "C++",
            type: SystemType.Language,
            proficiency: 2,
        },
        {
            logo: logoPrefix + "Electron_Software_Framework_Logo.svg",
            name: "Electron",
            type: SystemType.Language,
            proficiency: 2.5,
        }
    ]
    const skills: {
        icon: string,
        name: string,
        id: string,
        description?: string
    }[] = [
        {
            id: "cad",
            name: "CAD",
            icon: "i-lucide-file-box"
        },
        {
            id: "3d-print",
            name: "3D Printing||3D-print",
            icon: "i-hugeicons-3d-printer"
        },
        {
            id: "user-centered-design",
            name: "User-Centered Design||Brugercentreret design",
            icon: "i-lucide-user-search"
        },
        {
            id: "mop",
            name: "Materials & Processes||Materialer & processer",
            icon: "i-lucide-anvil"
        },
        {
            id: "stat-mech-dyn",
            name: "Statics, Mechanics, & Dynamics||Statik, mekanik & dynamik",
            icon: "i-lucide-orbit"
        },
        {
            id: "microcontrollers",
            name: "Microcontrollers & Components||Mikrocontrollere & komponenter",
            icon: "i-lucide-microchip"
        },
        {
            id: "video-editing",
            name: "Video Editing||Videoredigering",
            icon: "i-lucide-clapperboard"
        },
        {
            id: "graphic-design",
            name: "Graphic Design||Grafisk design",
            icon: "i-lucide-spline-pointer"
        },
        {
            id: "webdev",
            name: "Web Development||Webudvikling",
            icon: "i-lucide-globe"
        },
        {
            id: "oop",
            name: "Object-Oriented Programming||Objektorienteret programmering",
            icon: "i-lucide-braces"
        },
        {
            id: "project-management",
            name: "Project Management||Projektledelse",
            icon: "i-lucide-megaphone"
        },
        {
            id: "product-rendering",
            name: "Product Rendering||Produktrendering",
            icon: "i-lucide-wallpaper"
        },
        {
            id: "rapid-prototyping",
            name: "Rapid Prototyping",
            icon: "i-lucide-zap"
        },
    ]
    const subjects = [

    ]
    interface Item {
        title: string,
        location: string,
        description: string,
        icon: string,
        timeSpan?: string,
        start: string,
        end: string,
    }
    interface EducationalItem extends Item {
        image: string,
        readMore: string,
        subjects: string[],
        projects?: string[]
    }
    const educationalItems: EducationalItem[] = [
        {
            icon: "i-lucide-pencil-ruler",
            title: "Bachelor of Engineering in Integrated Design||Diplomingeniør i integreret design",
            location: "University of Southern Denmark||Syddansk Universitet",
            description: 'Well-rounded product development with a generalist mindset. Jack of all trades with equal focus on design and technical challenges.||Velafrundet produktudvikling med en generalistisk tankegang. "Jack of all trades" med lige fokus på design og tekniske udfordringer.',
            // timeSpan: `September 2022 - ${t('February||Februar')} 2026`,
            start: "2022-09-01",
            end: "2026-01-14",
            image: "",
            readMore: "#integrated-design",
            subjects: [
                "Rapid prototyping",
                "User-centered design||Brugercentreret design",
                "Materials & processes||Materialer & processer",
                "Statics, mechanics, & dynamics||Statik, mekanik & dynamik",
                "Micro-controllers & components||Mikrocontrollere & komponenter",
                "CAD",
            ],
            projects: [
                "Design of playground equipment||Design af udstyr til legepladser",
                "Redesign of a kitchen appliance||Redesign af et køkkenredskab",
                "Redesign of an end-effector for laundry sorting||Redesign af en end-effector til vasketøjssortering",
                '“Right to Repair”-oriented redesign of an electric kettle||“Right to Repair”-orienteret redesign af en elkedel',
                "Design of a MIDI controller prototype||Design af en MIDI-kontroller prototype",
            ]
        },
        {
            icon: "i-lucide-laptop",
            title: "HTX - Digital Communication||HTX - Digital kommunikation",
            location: "Slotshaven Gymnasium",
            description: "Technical secondary education with a focus on communication, IT, and computer programming.||Teknisk uddannelse med fokus på kommunikation, IT og programmering.",
            // timeSpan: `August 2018 - ${t('June||Juni')} 2021`,
            start: "2018-08-01",
            end: "2021-06-01",
            image: "",
            readMore: "#htx",
            subjects: [
            "Marketing & graphic design||Marketing & grafisk design",
            "Video & editing||Video & redigering",
            "Web development||Webudvikling",
            "Object-oriented programming||Objektorienteret programmering",
            "Game theory||Spilteori",
            "Game design in Unity||Spildesign i Unity",
            ]
        }
    ]
    interface JobItem extends Item {
        competences: string,
        volunteerWork?: boolean
    }
    const jobItems: JobItem[] = [
        {
            title: "Intern||Praktikant",
            icon: "i-lucide-rotate-3d",
            description: "",
            location: "Amfitech ApS",
            // timeSpan: `${t('February||Februar')} 2025 - July 2025`,
            start: "2025-02-01",
            end: "2025-07-01",
            competences: "3D printing, 3D tracking, workshops, Unity prototyping||3D-print, 3D-tracking, workshops, Unity prototyping"
        },
        {
            title: "Næstformand & SoMe-ansvarlig",
            icon: "i-lucide-thumbs-up",
            description: "Planning and communication in a small team. Handling technical challenges for small events on short notice. Graphics, text, and video for social media.||Planlægning og kommunikation i et lille team. Håndtering af tekniske udfordringer for små events med kort varsel. Grafik, tekst og video til sociale medier.",
            location: "FID - Foreningen for integreret design",
            // timeSpan: `September 2023 - ${t('February||Februar')} 2025`,
            start: "2023-09-01",
            end: "2025-02-01",
            competences: "planning, social media||planlægning, sociale medier",
            volunteerWork: true,
        },
        {
            title: "Warehouse Worker||Lagerarbejder",
            icon: "i-lucide-warehouse",
            description: "Repetitive and exhausting tasks involving physical labor.||Ensformige og udmattende opgaver og fysisk arbejde.",
            location: "Impulse A/S",
            // timeSpan: "August 2020 - September 2020",
            start: "2020-08-01",
            end: "2020-09-01",
            competences: "resilience||udholdenhed"
        },
        {
            title: "Altar Server||Ministrant",
            icon: "i-lucide-church",
            description: "Readings of scripture in front of strangers.||Skriftlæsninger foran fremmede.",
            location: "Ugerløse Church||Ugerløse Kirke",
            // timeSpan: `${'June||Juni'} 2017 - August 2017`,
            start: "2017-06-01",
            end: "2017-08-01",
            competences: "public speaking||offentlig tale"
        },
    ]
    return {links, softwareAndSystems, skills, SystemType, systemTypes, educationalItems, jobItems, contactInfo, profile}
})