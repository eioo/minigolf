#!/bin/sh

REPO_URL="https://github.com/PhilippvK/playforia-minigolf"
REPO_NAME="playforia-minigolf"

clone_repo () {
    if [ ! -d "$REPO_NAME" ] ; then
        git clone $REPO_URL $REPO_NAME
    else
        cd "$REPO_NAME"
        git pull $URL | grep -v "Already up to date." 
        cd ..
    fi
}

get_assets () {
    # Copy sprites
    mkdir -p ./public/assets/sprites/
    cp "./playforia-minigolf/assets/res/AGolf/picture/"* public/assets/sprites/
    cp "./playforia-minigolf/assets/res/Shared/picture/"* public/assets/sprites/

    # Copy tracks
    mkdir -p ./public/assets/tracks/
    cp "./playforia-minigolf/tracks/tracks/"* public/assets/tracks/

    # Copy sounds
    mkdir -p ./public/assets/sounds/
    cp "./playforia-minigolf/assets/res/Shared/sound/"* public/assets/sounds/

    # Convert .au sounds to .wav, delete after converting
    for i in ./public/assets/sounds/*.au; do ffmpeg -hide_banner -loglevel error -y -i "$i" "${i%.*}.wav"; done
    rm ./public/assets/sounds/*.au
}

create_tracks_json () {
    # Set the path to the directory containing the tracks
    tracks_path="public/assets/tracks"

    # Get all the files in the tracks directory with .track extension
    files=$(ls "$tracks_path"/*.track)

    # Remove the .track extension from all the files and save them to an array
    for file in $files; do
        filename=$(basename "$file" .track)
        tracks="${tracks:+$tracks, }\"$filename\""
    done

    # Convert the array to a JSON string and save it to a file named "tracks.json"
    printf '[ %s ]\n' "$tracks" > "${tracks_path}/tracks.json"
}

clone_repo
get_assets
create_tracks_json