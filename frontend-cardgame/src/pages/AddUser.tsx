import { useState } from "react"
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddUser() {

  const [newUser, setNewUser] = useState("");

  const navigate = useNavigate();

  const addUser =  () => {
     fetch("http://localhost:8080/players", {
      method: "POST",
      headers: {"Content-Type": "Application/JSON"},
      body: JSON.stringify({
        "name": newUser
      })
    })
    .then(res => res.json())
    .then(json => {
      if (json.timestamp && json.message && json.error) {
        toast.error("User not added.");
      } else {
        toast.success("User added successfully.");
        navigate("/");
      }
    })
  }

  return (
    <>
      <div>Add User</div>
      <label>Username: </label>
      <input onChange={(e) => setNewUser(e.target.value)} type="text" /> <br />
      <button onClick={addUser}>Add</button>

      <ToastContainer 
        position="bottom-right"
        autoClose={4000}
        theme="dark"/>
    </>
  )
}

export default AddUser