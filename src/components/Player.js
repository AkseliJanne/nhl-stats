import React, { useEffect, useState } from 'react'
import { Typography, Card } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles({
    root: {
        marginRight: '500px',
    },
    card: {
        padding: '50px',
        width: '500px', 
    }
});

const API_URL = "https://statsapi.web.nhl.com/api/v1/people/"

function Player(props) {
    const classes = useStyles();
    const { playerID } = props
    const [person, setPerson] = useState({})

    const APICall = (playerID) => {
        axios.get(API_URL + playerID).then(response => {
            setPerson(response.data.people[0])
            console.log(response.data.people[0])
        })
    }

    useEffect(() => {
        if (playerID !== undefined) {
            APICall(playerID)
        }
    }, [playerID])

    return (
        <div className={classes.root}>
            {person &&
                <div>
                    <Card className={classes.card}>
                    <Typography variant="h5">Name: {person.fullName}</Typography>
                    <Typography variant="h5">Birth City: {person.birthCity}</Typography>
                    <Typography variant="h5">Birth Date: {person.birthDate}</Typography>
                    {person.captain && <Typography variant="h5">Captain</Typography>}
                    <Typography variant="h5">Age: {person.currentAge}</Typography>
                    <Typography variant="h5">Height: {person.height}</Typography>
                    <Typography variant="h5">Weight: {person.weight} pounds</Typography>
                    <Typography variant="h5">Nationality: {person.nationality}</Typography>
                    <Typography variant="h5">Jersey Number: #{person.primaryNumber}</Typography>      
                              
                
                    </Card>
                </div>
            }
        </div>
    )
}

export default Player