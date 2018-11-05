export default theme => ({
  root: {
    padding: 0,
    marginTop: 64,
    [theme.breakpoints.up('sm')]: {
      marginTop: 72
    }
  }
})