export function rgbToLong(red: number, green: number, blue: number) {
  return (red << 16) + (green << 8) + blue;
}
