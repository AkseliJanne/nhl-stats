import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Standings() {

    const [standings, setStandings] = useState([])
    const getStandings = () => {
        axios.get("https://statsapi.web.nhl.com/api/v1/standings").then(response => {
            /* Standings data
                -Team
                -Games played
                -Wins
                -Losses
                -OT/Penalties losses
                -Points
            */
           const data = response.data.records
           const teams = []
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < data[i].teamRecords.length; j++) {
                    const records = data[i].teamRecords[j]
                    const team = {
                        name: records.team.name,
                        gamesPlayed: records.gamesPlayed,
                        wins: records.leagueRecord.wins,
                        losses: records.leagueRecord.losses,
                        ot: records.leagueRecord.ot,
                        points: records.points,
                    }
                    teams.push(team)
                }
            }
            console.log(teams)
        })        
    }

    useEffect(() => {
        getStandings()
    }, [standings])
    return (
        <div>

        </div>
    )
}
export default Standings