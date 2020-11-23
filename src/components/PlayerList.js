import React, { useEffect, useState } from 'react'
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core'
import Player from './Player'

const useStyles = makeStyles({
    root: {
        display:'flex',
    },
    playerContainer: {
    },
    playerListContainer: {
        width: '100%',
        minWidth:'100px',
        marginLeft: '50px',
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

function PlayerList(props) {
    const classes = useStyles();
    const { playerList } = props
    const [playerID, setPlayerID] = useState(undefined)

    return (
        <div className={classes.root}>
            <div className={classes.playerListContainer}>
                <table className={classes.table}>
                <tr className={classes.td}>
                    <th><Typography className={classes.columnTitle}>Jersey number</Typography></th>
                    <th><Typography className={classes.columnTitle}>Full name</Typography></th>
                    <th><Typography className={classes.columnTitle}>Position</Typography></th>                    
                </tr>
            
                {playerList.length > 0 && playerList.map(player => 
                <tr className={classes.td}>
                    <th>
                        <Typography>#{player.jerseyNumber}</Typography>
                    </th>
                    <th>
                        <Typography>{player.person.fullName}</Typography>
                    </th>
                    <th>
                        <Typography>{player.position.name}</Typography>
                    </th>                
                </tr>)}
                
                </table>
            </div>
            <div className={classes.playerContainer}>
                {playerID !== undefined && <Player playerID={playerID}></Player>}
            </div>           
        </div>
    )   
}

export default PlayerList