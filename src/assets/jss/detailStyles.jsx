import { Chip } from "@material-ui/core";

export default theme => ({
  root: {
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 64,
    padding: '0px 16px',
    [theme.breakpoints.up('sm')]: {
      padding: '0px 24px'
    }
  },
  title: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden'
  },
  titleText: {
    fontSize: 28,
    color: theme.palette.primary.main,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    padding: 16
  },
  paperContent: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    padding: 16,
    maxWidth: 420,
    [theme.breakpoints.up('sm')]: {
      padding: 24
    }
  },
  avatar: {
    width: 140,
    height: 140,
    marginRight: 32
  },
  genres: {
    flex: 1,
    alignSelf: 'center'
  },
  chip: {
    margin: 2
  } 
})