import { Typography } from '@material-ui/core/'

function Team(props) {
    const { team } = props
    return (
        <div>
            <Typography variant="h6">{team.name}</Typography>
        </div>
    )
}

export default Team