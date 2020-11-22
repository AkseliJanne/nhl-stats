import React, { useEffect, useState } from 'react'
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import Player from './Player'

const useStyles = makeStyles({
    root: {
        padding: '15px',
        display: 'flex',
    },
    playerContainer: {
        textAlign:'left',
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
        { field: 'id', headerName: 'ID', width: 130 },
        { field: 'fullName', headerName: 'Full name', width: 260 },
        { field: 'jerseyNumber', headerName: 'Jersey number', width: 130 },
        { field: 'position', headerName: 'Position', width: 260 }
    ];

    const handleRowClick = e => {
        setPlayerID(e.data.id)
    }
    return (
        <div>
            <div className={classes.playerContainer}>
                    {playerID !== undefined && <Player playerID={playerID}></Player>}
            </div>           
            <div style={{ height: 800, minWidth: '500px' }} >
                {playerList.length > 0 && <DataGrid rows={generateRows(playerList)} columns={columns} pageSize={playerList.length} onRowClick={handleRowClick} />}
            </div>

        </div>
    )
}

export default PlayerList