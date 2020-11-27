import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles({
    root: {
        background: "radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(9,22,62,1) 13%, rgba(20,63,110,1) 28%, rgba(17,49,94,1) 29%, rgba(17,9,75,1) 43%, rgba(3,162,208,1) 81%, rgba(2,174,219,1) 84%, rgba(2,174,219,1) 84%, rgba(34,110,167,1) 91%)",
    },
});

function Standings() {
    const classes = useStyles()
    const [standingTeams, setStandingTeams] = useState([])
    const getStandings = () => {
        axios.get("https://statsapi.web.nhl.com/api/v1/standings").then(response => {
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
            const sortedTeams = teams.sort((a,b) => (a.points > b.points) ? 1 : ((b.points > a.points) ? -1 : 0)).reverse(); 
            setStandingTeams(sortedTeams)
        })
    }
    useEffect(() => {
        getStandings()
    })
    return (
        <div className={classes.root}>
            <Container>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Games played</th>
                        <th scope="col">Wins</th>
                        <th scope="col">Losses</th>
                        <th scope="col">OT</th>
                        <th scope="col">Points</th>
                    </tr>
                </thead>
                <tbody>
                    {standingTeams.map(team => 
                        <tr>
                            <td scope="col">{team.name}</td>
                            <td scope="col">{team.gamesPlayed}</td>
                            <td scope="col">{team.wins}</td>
                            <td scope="col">{team.losses}</td>
                            <td scope="col">{team.ot}</td>
                            <td scope="col">{team.points}</td>
                        </tr>
                    )}

                </tbody>
            </table>
            </Container>
        </div>
    )
}
export default Standings