## Purpose
The impetus for this project was the unmitigated disaster that team creation was during the 3rd and 4th semesters while studying integrated design. We were as a class tasked with generating five teams ourselves with 5-6 members in each. Every team needed to be diverse in both gender and Belbin roles, with the added caveat of reducing overlap with prior teams.

## Method
The software was made using Electron, which runs on Chromium. It uses Vue as a framework and is written in TypeScript. It's styled using Tailwind CSS and uses Vite as a build tool.

## Function
The app has a *Students* page where data about the students can be put in manually or imported as a CSV file. This data includes name, gender, top three Belbin roles, and past team members.

On the *Lab* page teams can be defined and given a number of 'seats'. In each team gender balance can be viewed at the top, and in the compass tab a Belbin chart shows the roles of each member. A team balance score is also shown. Students can then be previewed, dragged, and dropped into teams manually while monitoring the balance. It is also possible to do so automatically based on specifications at the bottom of the page.

Once teams have been created, they can be saved as a 'package'. Packages are viewed on the *Teams* page. They can then be exported together in a PDF.