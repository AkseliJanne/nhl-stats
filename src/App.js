import React, { useEffect, useState } from 'react';
import axios from 'axios'
import TeamList from './components/TeamList'

const API_URL = 'https://statsapi.web.nhl.com/api/v1/teams'

function App() {
  const [teams, setTeams] = useState([])

  const APICall = async () => {
    axios.get(API_URL).then(response => {
      const teamsOrdered = response.data.teams
      teamsOrdered.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
      setTeams(teamsOrdered)
      console.log(teamsOrdered)
    })  
  }

  useEffect(() => {
    APICall()
  }, [])

  return (
    <div className="App">
      <TeamList teams={teams}/>
    </div>
  );
}

export default App;
