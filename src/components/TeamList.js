import { Typography } from '@material-ui/core/'
import Team from './Team'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
    },
});



function TeamList(props) {
    const { teams } = props
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {(teams.length > 0) ? teams.map(team => <Team team={team} key={team.id} />) : <></>}
        </div>
    )
}

export default TeamList