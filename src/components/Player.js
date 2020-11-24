import React, { useEffect, useState } from 'react'
import { Typography, Card } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles({
    root: {
        marginRight: '500px',
    },
    card: {
        padding: '5px',
        width: '350px',
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
                        <Typography variant="body2">Name: {person.fullName}</Typography>
                        <Typography variant="body2">Birth City: {person.birthCity}</Typography>
                        <Typography variant="body2">Birth Date: {person.birthDate}</Typography>
                        {person.captain && <Typography variant="body2">Captain</Typography>}
                        <Typography variant="body2">Age: {person.currentAge}</Typography>
                        <Typography variant="body2">Height: {person.height}</Typography>
                        <Typography variant="body2">Weight: {person.weight} pounds</Typography>
                        <Typography variant="body2">Nationality: {person.nationality}</Typography>
                        <Typography variant="body2">Jersey Number: #{person.primaryNumber}</Typography>
                        <Typography variant="body2">Season 2019-2020</Typography>
                        <table className={classes.table}>
                            <tbody>
                                <tr className={classes.td}>
                                    <th><Typography variant="body2" className={classes.columnTitle}>Games</Typography></th>
                                    <th><Typography variant="body2" className={classes.columnTitle}>Goals</Typography></th>
                                    <th><Typography variant="body2" className={classes.columnTitle}>Assits</Typography></th>
                                    <th><Typography variant="body2" className={classes.columnTitle}>Points</Typography></th>
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