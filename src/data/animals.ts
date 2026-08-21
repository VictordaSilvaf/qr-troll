export const ANIMALS = [
  '/animals/1.jpeg',
  '/animals/2.jpeg',
  '/animals/3.jpg',
  '/animals/4.jpg',
  '/animals/5.jpg',
  '/animals/6.jpeg',
  '/animals/7.jpeg',
  '/animals/8.jpeg',
  '/animals/9.webp',
  '/animals/images.jpeg',
] as const

export function pickRandomAnimal(): string {
  const index = Math.floor(Math.random() * ANIMALS.length)
  return ANIMALS[index]
}
