import React, { useEffect, useState} from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles({
    root: {
        marginLeft: '50px',
    },
    finnish: {
        fontWeight: 'bold',
    }
});

const API_URL = "https://statsapi.web.nhl.com/api/v1/people/"

function Player(props) {
    const classes = useStyles();
    const { player } = props
    const [person, setPerson] = useState({})
    const APICall = (playerID) => {
        axios.get(API_URL + playerID).then(response => {
            console.log(response.data.people[0])
            setPerson(response.data.people[0])
        })    
    }

    useEffect(() =>  {
        APICall(player.person.id)    
    },[])

    return (
        <div className={classes.root}>
            {(person.birthCountry === "FIN") ? // if player is Finnish, use bold text
                <Typography className={classes.finnish} variant="body1" id={player.person.id}>{person.birthCountry} #{player.jerseyNumber} {player.person.fullName}, {player.position.name}</Typography>            
            :
                <Typography variant="body1" id={player.person.id}>{person.birthCountry} #{player.jerseyNumber} {player.person.fullName}, {player.position.name}</Typography>
            }
        </div>
    )
}

export default Player