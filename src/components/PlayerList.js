import React, { useEffect, useState } from 'react'
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core'
import Player from './Player'

const useStyles = makeStyles({
    root: {
        display:'flex',
    },
    playerContainer: {
    },
    playerListContainer: {
        height: '1500px',
        width: '100%',
        minWidth:'100px',
    }
});

function PlayerList(props) {
    const classes = useStyles();
    const { playerList } = props
    const [showOnePlayer, setShowOnePlayer] = useState(false)
    const [playerID, setPlayerID] = useState(undefined)

    const generateRows = (playerList) => {
        const rows = []
        for (var i = 0; i < playerList.length; i++) {
            rows.push({
                id: playerList[i].person.id,
                fullName: playerList[i].person.fullName,
                jerseyNumber: playerList[i].jerseyNumber,
                position: playerList[i].position.name,
            })
        }
        return rows
    }
    const columns = [
        { field: 'fullName', headerName: 'Full name', width: 260 },
        { field: 'jerseyNumber', headerName: 'Jersey number', width: 130 },
        { field: 'position', headerName: 'Position', width: 260 }
    ];

    const handleRowClick = e => {
        console.log(e)
        setPlayerID(e.data.id)
    }
    return (
        <div className={classes.root}>
            <div className={classes.playerListContainer}>
                {playerList.length > 0 && <DataGrid rows={generateRows(playerList)} columns={columns} pageSize={playerList.length} onRowClick={handleRowClick} />}

            </div>
            <div className={classes.playerContainer}>
                {playerID !== undefined && <Player playerID={playerID}></Player>}
            </div>           
        </div>
    )   
}

export default PlayerList