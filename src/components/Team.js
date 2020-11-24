import React, { useState } from 'react'
import { Typography, Card, Link } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles';
import PlayerList from './PlayerList'
import axios from 'axios'

const useStyles = makeStyles({
    root: {
        padding: '15px',
        display: 'flex',
    },
    team: {
        padding: '10px',
    },
    conference: {
        marginLeft: '50px',
    },
    showRoster: {
        marginLeft: '50px',
    }
});

const API_URL = 'https://statsapi.web.nhl.com/api/v1/teams/'

function Team(props) {
    const { team } = props
    const [showPlayerList, setShowPlayerList] = useState(false)
    const [playerList, setPlayerList] = useState([])
    const [buttonText, setButtonText] = useState('SHOW ROSTER')
    const classes = useStyles();

    const APICall = async (teamID) => {
        axios.get(API_URL + teamID + "?expand=team.roster").then(response => {
            setPlayerList(response.data.teams[0].roster.roster)
        })  
      }
    

    const handleClick = (e) => {    
        const teamID = e.target.id
        APICall(teamID)
        setShowPlayerList(!showPlayerList)
        const buttonTextCopy = buttonText
        if (buttonTextCopy === 'SHOW ROSTER') {
            setButtonText('HIDE ROSTER')
        } else {
            setButtonText('SHOW ROSTER')
        }
    }
    return (
        <Card>
            <div className={classes.root}>
                <img src={"https://assets.nhle.com/logos/nhl/svg/" + team.abbreviation + "_light.svg"} width="50px" height="50px"></img> 
                <Typography variant="h5" className={classes.team}>{team.name}, {team.firstYearOfPlay}, {team.venue.name}</Typography> 
            </div>
            <Typography variant="body1" className={classes.conference}>{team.conference.name} conference</Typography>
            <Typography variant="body1" color="primary"><Link className={classes.showRoster} id={team.id} onClick={handleClick}>{buttonText}</Link></Typography>
            { (showPlayerList === true) ? <PlayerList playerList={playerList}/> : <></> } 
        </Card>
    )
}

export default Team