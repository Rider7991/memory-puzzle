import React from 'react';

class Card extends React.Component {
	constructor(props) {
		super(props);

		let style = {
			backgroundImage: 'url(images/'+this.props.pairId+'.png)',
		};

		this.state = {
			exposed: false,
			style: style
		}
	}

	changeState() {
		this.setState({
			exposed: !this.state.exposed,
		});
	}

	isReveal() {
		if (this.state.exposed === true) {
			return ' exposed';
		}
		else {
			return ' unexposed';
		}
	}

	hide() {
		this.setState({
			exposed: false,
		});
	}

	render() {
		return(
			<div className={'card ' + this.isReveal()} style={this.state.style} id={this.props.id} onClick={() => {setTimeout(this.props.checkIfFound, 500); this.props.saveId(this.props.pairId, this.props.id); this.changeState(); this.props.exposeCard();}}>
			</div>
		);
	}
}

export default Card;