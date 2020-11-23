import React, { useEffect, useState } from 'react'
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Link } from '@material-ui/core'
import Player from './Player'

const useStyles = makeStyles({
    root: {
        display:'flex',
    },
    playerContainer: {
        padding: '50px'
    },
    playerListContainer: {
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

    const handleClick = e => {
        const id = e.target.id
        setPlayerID(id)
    }

    const getSortedPlayerList = (playerList) => {
        const goalies = playerList.filter(player => player.position.type === "Goalie")
        const defensemen = playerList.filter(player => player.position.type === "Defenseman")
        const forwards = playerList.filter(player => player.position.type === "Forward")
        return goalies.concat(defensemen).concat(forwards)
    }
    return (
        <div className={classes.root}>
            <div className={classes.playerListContainer}>
                <table className={classes.table}>
                <tbody>
                <tr className={classes.td}>
                    <th><Typography className={classes.columnTitle}>Jersey number</Typography></th>
                    <th><Typography className={classes.columnTitle}>Full name</Typography></th>
                    <th><Typography className={classes.columnTitle}>Position</Typography></th>                    
                </tr>            
                {playerList.length > 0 && getSortedPlayerList(playerList).map(player => 
                <tr className={classes.td} key={player.person.id}>
                    <th>
                        <Typography>#{player.jerseyNumber}</Typography>
                    </th>
                    <th>
                        <Link><Typography onClick={handleClick} id={player.person.id}>{player.person.fullName}</Typography></Link>
                    </th>
                    <th>
                        <Typography>{player.position.type}</Typography>
                    </th>                
                </tr>)}
                </tbody>
                </table>
            </div>
            <div className={classes.playerContainer}>
                {playerID !== undefined && <Player playerID={playerID}></Player>}
            </div>           
        </div>
    )   
}

export default PlayerList