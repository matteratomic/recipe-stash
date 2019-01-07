import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'

import Slide from '@material-ui/core/Slide'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'

import Search from './components/Search'

const styles = theme => (
{
  root:{
    display:'flex',
    flexGrow:1,
      [theme.breakpoints.down('sm')]:{
        padding:'50px',
        paddingTop:'100px',
    },
  },
  title:{
    fontFamily:'Kumar One Outline',
    fontSize:'70px',
    lineHeight:'100px',
  },
  subtitle:{
    fontFamily:'Thasadith'
  },
  hero:{
    width:'100vw',
    minHeight:'100vh',
    backgroundColor:'transparent',
    paddingLeft:theme.spacing.unit*4,
  },
  searchSection:{
    display:'flex',
    flexGrow:1,
    width:'100vw',
    backgroundColor:'#f5f5f5',
    paddingTop:theme.spacing.unit*12
  },
  dialogToolbar:{
    backgroundColor:theme.palette.background.paper
  }
}
)

const images = [
'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/beef-stroganoff-horizontal-1539197158.jpg?crop=1.00xw:0.891xh;0.00142xw,0&resize=480:*',
'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/9/25/0/ZB0307H_grilled-chicken-caesar-wrap_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371611416726.jpeg',
'https://i.ytimg.com/vi/Tl4eSYrcEDI/hqdefault.jpg',
'https://hips.hearstapps.com/del.h-cdn.co/assets/17/04/1024x512/landscape-1485748477-caprese-chicken.jpg?resize=480:*',
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0ImNEiNDsi9F2PLQb6gl-G80fkDqY82Qlo6699Cp5nYSPQa4E',
'https://images.media-allrecipes.com/images/58656.png',
'https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F4_3_horizontal_-_1200x900%2Fpublic%2Feverything-jal-poppers.jpg%3Fitok%3DhOodWSR8&w=1000&c=sc&poi=face&q=70',
'https://assets.marthastewart.com/styles/wmax-1500/d38/msl-kitchen-sponge-cakes-0554-md110059/msl-kitchen-sponge-cakes-0554-md110059_horiz.jpg?itok=Bu4cGnhF',
'https://lifemadesweeter.com/wp-content/uploads/Healthy-Fruit-Pizza-Recipe-Photo-1-e1495280537441-1-500x375.jpg'
]

const foods = [
  {name:"Gourmet Turkey",
  description:'A simple delightful dish',
  image:"https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/11/7/0/0170831_Alton-Roast-Turkey_s4x3.jpg.rend.hgtvcom.826.620.suffix/1382540635076.jpeg"
}
]

const SlideUpTransition = props => (
  <Slide direction="up" {...props}/>
)

class App extends Component {

  state = {
    isSearchSectionOpen:false,
    foods:[],
    q:''
  }

  componentDidMount(){
    this.fetchFoods()
  }

  fetchFoods = async (q = "")=> {
    const res = await fetch(`foods?q=${q}`)
    const json = await res.json()
    this.setState({
      foods:json.results || []
    })
  }
  _handleDialogOpen = ()=>{
    this.setState({isSearchSectionOpen:true})
  }

  _handleDialogClose = ()=>{
    this.setState({isSearchSectionOpen:false})
  }
  _handleSearch = (value)=>{
    this.fetchFoods(value)
  }
  render() {
    const {classes} = this.props
    const {foods} = this.state
    return (
      <React.Fragment>
        <Grid className={classes.hero} container spacing={0}>
          <Grid  className={classes.root} xs={12}  md={4} item justify="center" direction="column"  alignItems="flex-start">
            <Typography color="secondary" className={classes.title} gutterBottom variant="h2">Recipe Stash</Typography>
            <Typography color="secondary" gutterBottom className={classes.subtitle} variant="h5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste perferendis vel, eius ad ipsa distinctio laboriosam, eos tenetur magni non.</Typography>
            <Button onClick={this._handleDialogOpen} style={{marginTop:'20px'}} variant="contained" color="secondary">Get Started</Button>
          </Grid>
          <Grid style={{paddingLeft:'20px'}} className={classes.root} xs={12} md={7} item direction="column" justify="center">
            <GridList cellHeight={150} cols={4}>
              {images.map((image,i)=>{
                const colNum = i%4 === 0 ? 2 : 1
                return (
                  <GridListTile cols={colNum}>
                    <img src={image}/>
                  </GridListTile>
                )
              })}
            </GridList>
          </Grid>
        </Grid>
        <Dialog 
        fullScreen
        open={this.state.isSearchSectionOpen}
        onClose={this._handleDialogClose}
        TransitionComponent={SlideUpTransition}
        >
        <AppBar>
          <Toolbar className={classes.dialogToolbar}>
          <IconButton
          onClick={this._handleDialogClose}
           color="secondary">
            <ArrowBack/>
          </IconButton>
          <Typography variant="h5" style={{flexGrow:1}}>
          Recipe Stash
          </Typography>
          </Toolbar>
        </AppBar>
        <Search/>
        <Grid className={classes.searchSection} container direction="column" alignItems="center">
           <Search handleClick={this._handleSearch}/>
            <Grid style={{paddingTop:'30px'}} container direction="row" spacing="32" justify="center">
            {foods.length ? foods.map((food)=>{
              return (
                <Grid item>
                <Card style={{width:345,minHeight:250}}>
                <CardMedia style={{height:130}} image={food.url}/>
                <CardContent>
                  <Typography variant="h5" gutterBottom>{food.name}</Typography>
                  <Typography component="p">{food.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button>View Recipe</Button>
                  <Button>Add to Favorites</Button>
                </CardActions>
              </Card>
              </Grid>
              )
            }): null}
            </Grid>
        </Grid>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App)
