import React, { Component } from 'react';
import Cache from '../CacheService';
import { View, Image, StyleSheet} from 'react-native';

export default 
class CachedImage extends Component
{
	constructor(props){
		super(props);
		this.state = {

		}
	}

	componentDidMount(){
		this.loadImage();
	}


	refresh(){
		this.loadImage(true);
	}


	loadImage(foreceUpdate){
		var url = this.props.source;
        Cache.image(url,
        {
        	forceUpdate: foreceUpdate,
        	onProgress: this.props.onProgress
        }).then((uri)=>{
            this.setState({source: uri});
        });
	}

	render(){
		return(
			<View style={[styles.container, this.props.style, this.props.size || styles.size]}>
				<Image
                    style={this.props.size || styles.size } 
                    source={this.state.source} />
			</View>
		);
	}
}

const styles = 
StyleSheet.create({
	container:{
		backgroundColor: 'blue'
	},
	size: {
		height: 200,
		width: 200
	}
});