import React, { useEffect } from 'react'
import { CircularProgress, Container } from '@material-ui/core'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    root: {
        minHeight: '100vh',
        height: '100%',
        background: "radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(17,19,80,1) 0%, rgba(9,22,62,1) 0%, rgba(20,63,110,1) 0%, rgba(17,49,94,1) 29%, rgba(17,9,75,1) 53%, rgba(3,162,208,1) 81%, rgba(2,174,219,1) 84%, rgba(2,174,219,1) 84%, rgba(34,110,167,1) 91%)",
    },
    circle: {
        display: 'block',
        margin: '0 auto',
    },
});

function FinnishPlayerList() {
    const [finnishPlayers, setFinnishPlayers] = React.useState([])
    const classes = useStyles();

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
                    setFinnishPlayers(finns)
                });
        })
    }
    useEffect(() => {
        getFinnishPlayers()
    }, [])
    return (
        <div className={classes.root}>
            <Container>
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
                {finnishPlayers.length === 0 && <CircularProgress className={classes.circle}/>}
                </Container>
        </div>
    )
}

export default FinnishPlayerList