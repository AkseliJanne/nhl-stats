import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        marginLeft: '50px',
    },
});

function Player(props) {
    const classes = useStyles();
    const { player } = props
    return (
        <div className={classes.root}>
            <Typography variant="body1">#{player.jerseyNumber} {player.person.fullName}, {player.position.name}</Typography>
        </div>
    )
}

export default Player