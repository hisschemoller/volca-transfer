
### Verander inhoud van een Slot text input

- setSlot action
  - update slot status en path

### Transfer click Start button

- start action
  - zet alleen isStarted = true

- evaluateSounds action
  - test of er nog een sound te doen is

- fetchRandomSound action
  - requestRandomSound action
    - bepaal de volgende slotIndex
  - fetch random sound gegevens op van Freesound

- loadSound action
  - fetch audio bestand
  - normalize
  - double speed
  - convert to wav
  - convert to syro

- playSound action
  - speel het syro geluid af
  - terug naar evaluatesound

### Nieuw

- START
- kijk of alles gedaan is
- zo nee, 

### externe url

https://www.hisschemoller.com/flash/v019_euclid_fixed/static/audio/bass_low.wav
