import React, { Component } from 'react';
import {StyleSheet, View, Text, ScrollView, Dimensions} from 'react-native';
import Drawer from 'react-native-drawer';
import MenuItem from './_sidemenu/menuitem.js';
const {height} = Dimensions.get('window');

export default 
class SideMenu extends Component
{
	constructor(props){
		super(props);
	}

	/**
	* Une el estilo default con el otorgado en la propierdad style del parent
	*
	* @author Felix Vasquez, Baum Digital
	*/
	mergeStyles(){
		var style = {
		  drawer: { shadowColor: '#000000', shadowOpacity: 0.3, shadowRadius: 3, backgroundColor: '#F5FCFF', paddingTop: 20},
		  main: {paddingLeft: 3, backgroundColor: 'black'},
		}

		var parentStyle = this.props.style || {};
		style['drawer'] = Object.assign(style.drawer, parentStyle);
		return style;
	}



	/**
	* En caso de existir la propiedad component, toma esta como el contenido del
	* menu, sino genera un listado generico con un array
	*
	* @author Felix Vasquez, Baum Digital
	*/
	getMenuContent(){
		if(Array.isArray(this.props.items)) return buildGenericMenuItems.call(this, this.props.items);
		return this.props.items;
	}


	render()
	{
		return(
			<Drawer
			 	type="overlay"
			 	captureGestures={false}
			 	open = {this.props.opened}
			 	onClose={this.props.onClose}
				content={this.getMenuContent()}
				tapToClose={true}
				openDrawerOffset={0.2} // 20% gap on the right side of drawer
				panCloseMask={0.2}
				closedDrawerOffset={-3}
		        ref={(ref) => this._drawer = ref}
		        styles={this.mergeStyles()} 
		        tweenHandler={(ratio) => ({
					main: { opacity:(2-ratio)/2 }
				})}>
					{this.props.children}
			</Drawer> 
		)
	}
}

function buildGenericMenuItems(items)
{
	var list = items.map((Item, index)=>{
		if(typeof Item === 'function') return <Item key={index}/>;
		return(
			<MenuItem 
				key={index} 
				color={this.props.fontColor || false}
				onPress={()=>this.props.itemPressed(Item)} 
				text={Item.value}
				icon={Item.icon} />
		);
	});

	return(
		<ScrollView 
			style={{height: height}}>
			{list}
		</ScrollView>
	);
	

}
