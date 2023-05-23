# Minigolf

Remake Playforia.net/Aapeli.com Minigolf game written with TypeScript, powered by React and HTML canvas API.

### Requirements

- Node.js >= 16
- Yarn

### Installation & running

1. _(Optional)_ Default ports used are `8080` (Vite) and `8081` (Socket.IO), these can be configured by adding `.env` file to root of this repository:

   ```sh
   VITE_PORT=8080          # Frontend port
   VITE_WS_HOST=localhost  # Socket.IO server host
   VITE_WS_PORT=8081       # Socket.IO server port
   ```

2. Install and run app:

   ```
   yarn
   yarn dev
   ```

## Thanks

- Thanks to [WorldStarHipHopX](https://github.com/WorldStarHipHopX) for providing the original source code for the game.
- Thanks to [PhilippvK](https://github.com/PhilippvK), [pehala](https://github.com/pehala), [maitovelkkis](https://github.com/maitovelkkis), [buozyte](https://github.com/buozyte) and [officialebz](https://github.com/officialebz) for their contributions at [PhilippvK/playforia-minigolf](https://github.com/PhilippvK/playforia-minigolf).
- Thanks to [Nokkasiili](https://github.com/nokkasiili) for doing the Rust port of the Java version and understanding/cleaning up most of the Java codebase.

## License

[MIT](https://github.com/eioo/minigolf/blob/main/LICENSE)
