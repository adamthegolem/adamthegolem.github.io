## Formål
Drivkraften bag dette projekt var de uudholdelige gruppedannelsessessioner på tredje og fjerde semester på integreret design. Vi fik som klasse opgaven selv at skabe fem grupper med hver 5-6 medlemmer. Hvert hold skulle have diversitet i både køn og Belbin-roller med et supplerende krav om at reducere overlap med tidligere grupper.

## Metode
Det resulterende software er lavet med Electron, der kører på Chromium. Det bruger Vue som framework og er skrevet i TypeScript. Det er stylet med Tailwind CSS og bruger Vite som build-værktøj.

## Funktion
Appen har en *Studerende*-side, hvor data om de studerende kan skrives manuelt eller importeres som CSV-fil. Dataen inkluderer navn, køn, top tre Belbin-roller og tidligere gruppemedlemmer.

På *Værksted*-siden kan grupper defineres og gives et antal pladser. I hvert hold kan kønsfordelingen ses i toppen, og i kompasfanen viser et Belbin-kompas hvert medlems roller. En score for gruppebalance kan også ses. Studerende kan derefter blive previewet, trukket og droppet ind i grupper manuelt mens balancen overvåges. Det er også muligt at gøre det automatisk baseret på specifikationer i bunden af siden.

Når grupper er blevet dannet, kan de gemmes som en 'pakke'. Pakker kan ses på *Grupper*-siden. De kan derefter blivet eksporteret sammen i en PDF.