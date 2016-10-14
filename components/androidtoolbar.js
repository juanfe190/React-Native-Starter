import React, { Component } from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default 
class AndroidToolbar extends Component
{
	constructor(){
		super();
	}

	render(){
		return(
			<View style={[style.wrapper].concat(this.props.style)}>
				<Icon name="menu" color={this.props.color || "white"} size={30} onPress={this.props.menuIconAction} />
				<Text style={[{color: this.props.color || "white"}, style.title]}>{this.props.title || ''}</Text>
				<View style={style.rightComponent}>{this.props.rightComponent || null}</View>
			</View>
		);
	}
}

const style = StyleSheet.create({
	wrapper: {
		flexDirection: 'row',
		backgroundColor: '#e57373',
	    alignSelf: 'stretch',
	    height: 50,
	    top: 0,
	    alignItems: 'center',
	    padding: 5
	},

	title:{
		marginLeft: 25,
		fontSize: 21,
		fontWeight: 'bold'
	},

	rightComponent: {
		flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
		height: 40,
		right: 5,
		position: 'absolute',
		zIndex: 99
	}
});