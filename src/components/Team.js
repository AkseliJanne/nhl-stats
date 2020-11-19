import React from 'react'
import { Typography, Card } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        padding: '15px',
    },
  });

function Team(props) {
    const { team } = props
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <Typography variant="h6">{team.name} {team.firstYearOfPlay}</Typography>
        </Card>
    )
}

export default Team