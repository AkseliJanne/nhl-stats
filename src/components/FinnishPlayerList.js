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
                    promises.push(axios.get("https://statsapi.web.nhl.com/api/v1/people/"+ id))
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
    })
    return (
        <div>
            <Container maxWidth="sm">
            <Typography variant="h3">Finnish player list</Typography>
            {/* <Button onClick={() => console.log(finnishPlayers)}>test</Button> */}
            <ul>
            {finnishPlayers.length > 0 && finnishPlayers.map(finnishPlayer => <li>{finnishPlayer.fullName}</li>)}
            </ul>
            </Container>
        </div>
    )
}

export default FinnishPlayerList