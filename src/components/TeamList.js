import { Typography } from '@material-ui/core/'
import Team from './Team'

function TeamList(props) {
    const { teams } = props
    return (
        <div>
            <Typography variant="h5">Team List</Typography>
            {(teams.length > 0) ? teams.map(team => <Team team={team} key={team.id}/>): <></>}
        </div>
    )
}

export default TeamList