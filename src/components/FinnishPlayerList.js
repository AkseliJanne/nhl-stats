import React, { useEffect } from 'react'
import { Typography, Container } from '@material-ui/core'
import axios from 'axios'

function FinnishPlayerList() {
    const [finnishPlayers, setFinnishPlayers] = React.useState([])
    const getFinnishPlayers = () => {
        axios.get("https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster").then(response => {
            const teams = response.data.teams
            const promises = []
            for (var i = 0; i < teams.length; i++) {
                const roster = teams[i].roster.roster
                for (var j = 0; j < roster.length; j++) {
                    const id = roster[j].person.id
                    promises.push(axios.get("https://statsapi.web.nhl.com/api/v1/people/" + id))
                }
            }
            Promise.all(promises)
                .then(responses => {
                    var finns = []
                    for (var i = 0; i < responses.length; i++) {
                        const person = responses[i].data.people[0]
                        const birthCountry = responses[i].data.people[0].birthCountry
                        if (birthCountry === "FIN") {
                            finns.push(person)
                        }
                    }
                    console.log(finns)
                    setFinnishPlayers(finns)
                });
        })
    }
    useEffect(() => {
        getFinnishPlayers()
    }, [])
    return (
        <div>
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Full name</th>
                            <th scope="col">Birth date</th>
                            <th scope="col">Age</th>
                            <th scope="col">Team</th>
                            <th scope="col">Height</th>
                            <th scope="col">Weight</th>
                        </tr>
                    </thead>
                    <tbody>
                    {finnishPlayers.length > 0 && finnishPlayers.map((finnishPlayer, i) => <tr key={i}>
                        <td scope="col">{finnishPlayer.fullName}</td>   
                        <td scope="col">{finnishPlayer.birthDate}</td>   
                        <td scope="col">{finnishPlayer.currentAge}</td>   
                        <td scope="col">{finnishPlayer.currentTeam.name}</td>   
                        <td scope="col">{finnishPlayer.height}</td>   
                        <td scope="col">{finnishPlayer.weight}</td>   
                    </tr>)}
                    </tbody>
                </table>
        </div>
    )
}

export default FinnishPlayerList