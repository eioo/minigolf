# Minigolf &middot; [![Sponsored by RARE](https://github.com/rareagency/assets/blob/main/sponsored-by-rare.svg?raw=true)](https://rare.fi/)

Remake of the past Playforia.net/Aapeli.com minigolf

## Getting started

You need to download few assets from another repository.

### Installation

1. Clone this repository: [PhilippvK/playforia-minigolf](https://github.com/PhilippvK/playforia-minigolf)

2. Copy all sprites from `assets/res/AGolf/picture/` to this project `public/assets/sprites/` directory.

3. Copy all tracks from `tracks/` to this project `public/assets/tracks/` directory.

4. Generate `tracks.json` file into `public/assets/tracks` directory. It's `string[]` of track names without ".tracks" suffix.

5. Run following commands:

   ```
   yarn install
   yarn dev
   ```

## License

Distributed under the MIT License. See LICENSE for more information.
