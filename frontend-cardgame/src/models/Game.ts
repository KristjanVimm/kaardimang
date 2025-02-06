import { Player } from "./Player"

export type Game = {
  id: number,
  score: number,
  duration: number,
  player: Player
}