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
    },
    table: {
        borderCollapse: 'collapse',
    },
    td: {
        border: '1px solid #dddddd',
        textAlign: 'left',
        padding: '8px',
    },
    columnTitle: {
        fontWeight: 'bold',
    }
});

const API_URL = "https://statsapi.web.nhl.com/api/v1/people/"

function Player(props) {
    const classes = useStyles();
    const { playerID } = props
    const [person, setPerson] = useState({})
    const [stats, setStats] = useState([])
    const APICall = (playerID) => {
        axios.get(API_URL + playerID).then(response => {
            setPerson(response.data.people[0])
        })
        axios.get(API_URL + playerID + "/stats?stats=statsSingleSeason&season=20192020").then(response => {
            console.log(response.data.stats[0].splits)
            setStats(response.data.stats[0].splits)
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
                        <Typography variant="h5">Season 2019-2020</Typography>
                        <table className={classes.table}>
                            <tbody>
                                <tr className={classes.td}>
                                    <th><Typography className={classes.columnTitle}>Games</Typography></th>
                                    <th><Typography className={classes.columnTitle}>Goals</Typography></th>
                                    <th><Typography className={classes.columnTitle}>Assits</Typography></th>
                                    <th><Typography className={classes.columnTitle}>Points</Typography></th>
                                </tr>
                                {stats.length > 0 && stats[0].stat.goals !== undefined &&
                                    <tr className={classes.td}>
                                        <th>{stats[0].stat.games}</th>
                                        <th>{stats[0].stat.goals}</th>
                                        <th>{stats[0].stat.assists}</th>
                                        <th>{stats[0].stat.points}</th>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </Card>
                </div>
            }
        </div>
    )
}

export default Player