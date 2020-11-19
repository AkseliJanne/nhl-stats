import React, { useState } from 'react'
import { Typography } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles';
import Player from './Player'

const useStyles = makeStyles({
    root: {
        padding: '15px',
        display: 'flex',
    },
});

function PlayerList(props) {
    const classes = useStyles();
    const { playerList } = props
    return (
        <div>
            {(playerList.length > 0) ? playerList.map(player => <Player player={player} key={player.person.id}></Player>) : <></>}
        </div>
    )
}

export default PlayerList