import React, { Component } from 'react';

import {
	Text, 
	TouchableOpacity,
	StyleSheet
} from 'react-native';

export default 
class Button extends Component
{
	constructor(props){
		super(props);
	}

	render()
	{
		return(
			<TouchableOpacity 
		 		style={[style.button].concat(this.props.style)}
		 		onPress={this.props.onPress}>
		 		<Text style={[style.text].concat(this.props.font)}>{this.props.value}</Text>
		 	</TouchableOpacity>  
		)
	}
}

const style = StyleSheet.create({
  button: {
    backgroundColor: '#e57373',
    padding: 5,
    width: 150,
    margin: 5,
    borderRadius: 2,
    height: 40,
    justifyContent: 'center'
  },

  text: {
  	color: 'white', 
  	textAlign: 'center', 
  	fontSize: 15
  }

});