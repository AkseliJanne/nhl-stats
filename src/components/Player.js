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
                    <Typography variant="h5" color="primary">Name: {person.fullName}</Typography>
                    <Typography variant="h5" color="primary">Birth City: {person.birthCity}</Typography>
                    <Typography variant="h5" color="primary">Birth Date: {person.birthDate}</Typography>
                    {person.captain && <Typography variant="h5" color="primary">Captain</Typography>}
                    <Typography variant="h5" color="primary">Age: {person.currentAge}</Typography>
                    <Typography variant="h5" color="primary">Height: {person.height}</Typography>
                    <Typography variant="h5" color="primary">Nationality: {person.nationality}</Typography>
                    <Typography variant="h5" color="primary">Jersey Number: #{person.primaryNumber}</Typography>                                      
       
                    </Card>
                </div>
            }
        </div>
    )
}

export default Player