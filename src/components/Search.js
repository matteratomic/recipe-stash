import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'


const styles = theme => (
    {
        paper:{
            display:'flex',
            justifyContent:'space-between',
            borderRadius:'20px',
            paddingLeft:theme.spacing.unit*2
        },
        input:{
            background:'transparent',
            outline:'none',
            border:'none',
            width:'300px'
        }
        }
)

class Search extends React.Component{
    handleClick = () => {
        let value = this.refs.input.value
        this.props.handleClick(value)
    }
    render(){
        const {classes} = this.props
        return(
            <Paper className={classes.paper}>
            <input ref="input" className={classes.input} placeHolder="e.g  Spagetti and Meatballs"/>
            <IconButton color="secondary" onClick={this.handleClick}>
                <SearchIcon/>
            </IconButton>
            </Paper>
        )
    }
}

export default withStyles(styles)(Search)