export default theme => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '0px 16px',
    [theme.breakpoints.up('sm')]: {
      padding: '0px 24px'
    }
  },
  title: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center'
  },
  progress: {
    marginLeft: 16
  },
  itemTitle: {
    display: 'flex',
    alignItems: 'center',
    flex: 1
  }
})