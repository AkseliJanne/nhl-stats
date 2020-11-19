import React from 'react'
import { Typography, Card } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles';

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
    }
});

function Team(props) {
    const { team } = props
    const classes = useStyles();
    return (
        <Card>
            <div className={classes.root}>
                <img src={"https://assets.nhle.com/logos/nhl/svg/" + team.abbreviation + "_light.svg"} width="50px" height="50px"></img>
                <Typography variant="h5" className={classes.team}>{team.name}, {team.firstYearOfPlay}</Typography>
            </div>
            <Typography variant="body1" className={classes.conference}>{team.conference.name} conference</Typography>
        </Card>
    )
}

export default Team