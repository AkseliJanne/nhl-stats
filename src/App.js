import React, { useEffect, useState } from 'react';
import axios from 'axios'
import TeamList from './components/TeamList'
import { Button, Typography } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles';
import logo from'./logos/logo.png'

const API_URL_TEAMS = 'https://statsapi.web.nhl.com/api/v1/teams'

const useStyles = makeStyles({
  root: {
    backgroundColor: 'lightblue',
    marginTop:'-10px',
    marginLeft:'-10px',
  },
  logo: {
    marginTop: '10px',
    marginLeft: '5px',
  }
});



function App() {
  const [teams, setTeams] = useState([])

  const classes = useStyles();
  const APICall = async () => {
    axios.get(API_URL_TEAMS).then(response => {
      setTeams(response.data.teams.reverse())
    })  
  }

  const sortTeamsBy = (value) => {
    const teamsSorted = teams.slice()
    teamsSorted.sort((a, b) => (a[value] > b[value]) ? 1 : ((b[value] > a[value]) ? -1 : 0))
    setTeams(teamsSorted)
  }

  useEffect(() => {
    APICall()
  }, [])

  return (
    <div className={classes.root}>
      <img className={classes.logo} src={logo} width="30px" height="30px"></img>
      <Button onClick={() => sortTeamsBy("name")}>SORT TEAMS BY NAME</Button>
      <Button onClick={() => sortTeamsBy("firstYearOfPlay")}>SORT TEAMS BY FIRST YEAR OF PLAY</Button>
      <TeamList teams={teams} />
    </div>
  );
}

export default App;
