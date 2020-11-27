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
    background: "radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(9,22,62,1) 13%, rgba(20,63,110,1) 28%, rgba(17,49,94,1) 29%, rgba(17,9,75,1) 43%, rgba(3,162,208,1) 81%, rgba(2,174,219,1) 84%, rgba(2,174,219,1) 84%, rgba(34,110,167,1) 91%)"

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
  },
  buttonContainer: {
    textAlign: 'left',
  },
  button: {
    color: 'white',
    fontWeight: 'bold',
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
            <Standings />
          </Route>
          <Route path="/">
            <Header />
            <Container>
              <div className={classes.buttonContainer}>
                <Button className={classes.button} onClick={() => sortTeamsBy("name")}>SORT TEAMS BY NAME</Button>
                <Button className={classes.button} onClick={() => sortTeamsBy("firstYearOfPlay")}>SORT TEAMS BY FIRST YEAR OF PLAY</Button>
              </div>
              <TeamList teams={teams} />
            </Container>
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
