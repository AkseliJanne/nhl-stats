import React, { useEffect, useState } from 'react';
import axios from 'axios'
import TeamList from './components/TeamList'
import Standings from './components/Standings'
import Header from './components/Header'
import FinnishPlayerList from './components/FinnishPlayerList'
import { Button, Container } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles';


import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';

const API_URL_TEAMS = 'https://statsapi.web.nhl.com/api/v1/teams'

const useStyles = makeStyles({
  root: {
    marginTop: '-10px',
    marginLeft: '-10px',
    marginRight: '-10px',
  },
  button: {
    color: 'white',
    fontWeight: 'bold',
  },
  logo: {
    marginTop: '10px',
    marginLeft: '15px',
  },
  standingsContainer: {
    textAlign: 'right',
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
      <Router>
        <Switch>
          <Route path="/finnishplayers">
            <Header />
            <FinnishPlayerList />
          </Route>
          <Route path="/standings">
            <Header />
            <Container maxWidth="sm">
              <Standings />
            </Container>
          </Route>
          <Route path="/">
            <Header />
            <Button onClick={() => sortTeamsBy("name")}>SORT TEAMS BY NAME</Button>
            <Button onClick={() => sortTeamsBy("firstYearOfPlay")}>SORT TEAMS BY FIRST YEAR OF PLAY</Button>
            <TeamList teams={teams} />
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
