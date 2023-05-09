#!/bin/sh

# Download assets

REPO_URL="https://github.com/PhilippvK/playforia-minigolf"
REPO_NAME="playforia-minigolf"

if [ ! -d "$REPO_NAME" ] ; then
    git clone $REPO_URL $REPO_NAME
else
    cd "$REPO_NAME"
    git pull $URL
    cd ..
fi


mkdir -p ./public/assets/sprites/
mkdir -p ./public/assets/tracks/

cp "./playforia-minigolf/assets/res/AGolf/picture/"* public/assets/sprites/
cp "./playforia-minigolf/tracks/tracks/"* public/assets/tracks/

# Create tracks.json

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