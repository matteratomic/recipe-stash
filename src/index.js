import React from 'react';
import ReactDOM from 'react-dom';
import {createMuiTheme,MuiThemeProvider} from '@material-ui/core/styles'
import App from './App';
import * as serviceWorker from './serviceWorker';

const theme = createMuiTheme({
	palette:{
		primary:{
			main:'#ffcc00'
		},
		secondary:{
			main:'#000000'
		}

	}
})

const RecipeStash = ()=> (
	<MuiThemeProvider theme={theme}>
		<App/>
	</MuiThemeProvider>
)

ReactDOM.render(<RecipeStash/>, document.getElementById('root'));
serviceWorker.unregister();
