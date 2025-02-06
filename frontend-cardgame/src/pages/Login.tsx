import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Login({userId, setUserId}: {userId: string, setUserId: React.Dispatch<React.SetStateAction<string>>}) {

  const navigate = useNavigate();

  function handleClick () {
    fetch(`http://localhost:8080/player-exists?playerName=${userId}`)
    .then(res => res.json())
    .then(json => {
      if (json === true) {
        navigate("/game");
      } else {
        toast.error("Username is incorrect");
      }
    })
  }

  return (
    <>
      <div>Login</div>
      <label>User name:</label>
      <input value={userId} onChange={e => setUserId(e.target.value)} type="text" /> <br />
      <button onClick={handleClick}>Enter</button>

      <ToastContainer
        position="bottom-right"
        theme="dark"
        autoClose={4000}/>
    </>
  )
}

export default Login