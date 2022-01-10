import React, { useEffect, useState } from 'react';
import axios from 'axios'

import './index.css'


const App = () => {
  const [workouts, setWorkout] = useState([])
  const [name, setName] = useState("")
  const [length, setLength] = useState("")
  const [date, setDate] = useState("")
  
  useEffect(()=>{
    console.log('use effect triggered')
  }, [])

  const getWorkoutHistory = () => {
    axios.get('http://localhost:8080/api/getWorkoutHistory')
    .then((response) => {
      setWorkout(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  }

  const clearFields = () => {
    setName("")
    setLength("")
    setDate("")
  }

  const insertWorkout = () =>{
    if ((name.length == "") || (length.length == "") || (date.length == "")) {
      console.log('fields are empty...')
      clearFields()
      return
    }
    let workout = {
      "name": name,
      "length": length,
      "date": date
    }
    console.log('Adding')
    console.log(workout)
    axios.post('http://localhost:8080/api/insertWorkout', workout)
    .then((response) => {
      setWorkout(response.data)
      clearFields()
    })
    .catch(error => {
      console.log(error)
    })
  }

  const listWorkouts = () => {

    return (
      <div>
          <h3>Previous Workouts</h3>
          {workouts.map(workout => (
            <p>{workout["workout"].name}</p>
          ))}
      </div>
    )
  }

  return (
    <div>

      <h1>My Workouts</h1>
      <button className="button" onClick={getWorkoutHistory}>Get My Previous Workouts</button>

      {listWorkouts()}

      <div>
        <h1>Enter a new workout!</h1>
        <p>Name:</p>
        <input type="text" placeholder="Ex. Bench Press" value={name} onChange={(e) => {setName(e.target.value)}}/>
        <p>Length:</p>
        <input type="text" placeholder="Ex. 10 reps" value={length} onChange={(e) => {setLength(e.target.value)}}/>
        <p>Date:</p>
        <input type="text" placeholder="Ex. Oct 10th" value={date} onChange={(e) => {setDate(e.target.value)}}/>
      </div>

      <button className="button" onClick={insertWorkout}>Insert Workout</button>

    </div>
    
  )}

export default App;