import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import nhllogo from '../logos/logo.png'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
      backgroundColor: '#2e302e',
  },
  button: {
      fontWeight: 'bold',
      color: 'white',
  },
  logo: {
      marginTop: '10px',
  }
}));

function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
         <img src={nhllogo} width="50px" height="50px" className={classes.logo}></img>            
          <Link href="/"><Button className={classes.button}>HOME</Button></Link>
          <Link href="/standings"><Button className={classes.button}>STANDINGS</Button></Link>
          <Link href="/finnishplayers"><Button className={classes.button}>FINNISH PLAYERS</Button></Link>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header