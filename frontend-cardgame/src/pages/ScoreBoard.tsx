import { useEffect, useState } from "react";
import { Game } from "../models/Game";

function ScoreBoard() {

  const [games, setGames] = useState<Game[]>([]);
  const [activePlayer, setActivePlayer] = useState("");
  const [sortBy, setSortBy] = useState("score");
  const [ascOrDesc, setAscOrDesc] = useState("asc");
  const [activePage, setActivePage] = useState(1);
  const [pages, setPages] = useState<number[]>([]);
  const size = 10;

  useEffect(() => {
    fetch(`http://localhost:8080/games?playerName=${activePlayer}&size=${size}&page=${activePage-1}&sort=${sortBy},${ascOrDesc}`)
    .then(res => res.json())
    .then(json => {
      setGames(json.content);
      const pagesArray = [];
      for (let page = 1; page <= json.totalPages; page++) {
        pagesArray.push(page);
      }
      setPages(pagesArray);
    });
    }, [activePage, activePlayer, sortBy, ascOrDesc]);
  
  function removePlayerFilter () {
    setActivePlayer("");
    setActivePage(1);
  }

  function filterbyPlayer (playerName: string) {
    setActivePlayer(playerName);
    setActivePage(1);
  }
  
  function changePage (newPage: number) {
    setActivePage(newPage);
  }

  return (
    <div>
      <label>Sort by: </label>
      <select value={sortBy} onChange={(e) => {
        setSortBy(e.target.value);
        setActivePage(1);
        }} name="sortBy" id="sortBy">
        <option value="duration">Duration</option>
        <option value="score">Score</option>
      </select>
      <select value={ascOrDesc} onChange={(e) => {
        setAscOrDesc(e.target.value);
        setActivePage(1);
        }} name="ascOrDesc" id="ascOrDesc">
        <option value="asc">ascending</option>
        <option value="desc">descending</option>
      </select> <br />

      <button hidden={activePlayer === ""} onClick={removePlayerFilter}>Remove filtering by player {activePlayer}</button>

      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Player</th>
            <th>Score</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game, index) => 
            <tr key={game.id}>
              <td>{((activePage) - 1) * size + index + 1}</td>
              <td onClick={() => filterbyPlayer(game.player.name)}>{game.player.name}</td>
              <td>{game.score}</td>
              <td>{game.duration}</td>
            </tr>)}
        </tbody>
      </table>
      {pages.map(page => 
        <button onClick={() => changePage(page)} key={page}>{page}</button>
      )}
    </div>
)
}

export default ScoreBoard