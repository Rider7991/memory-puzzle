import React from 'react';
import ReactDOM from 'react-dom';
import Card from './card';
import './style.css';
import {randomId} from './utils';

const numberOfCards = 18;

class Board extends React.Component {
	constructor(props) {
		super(props);

		this.exposeCard = this.exposeCard.bind(this);
		this.saveId = this.saveId.bind(this);
		this.cardsRefs = [];
		this.clickedCardPairId = [2];
		this.clickedCardId = [2];
		this.checkIfFound = this.checkIfFound.bind(this);

		let cards = [];
		let pairId = [numberOfCards];

		for ( let i = 0; i < numberOfCards/2; i++) {
			let id = randomId(0, numberOfCards/2);

			while (pairId.indexOf(id) !== -1) {
				id = randomId(0, numberOfCards/2);
			}

			pairId[i] = id;
		}

		let duplicatedPairId = pairId.splice(numberOfCards/2, numberOfCards);

		for (let k = 0; k < numberOfCards/2; k++) {
			let id = randomId(0, (numberOfCards/2)-1);

			while (duplicatedPairId.indexOf(pairId[id]) !== -1) {
				id = randomId(0, (numberOfCards/2)-1);
			}

			duplicatedPairId[k] = pairId[id];
		}

		pairId = pairId.concat(duplicatedPairId);

		for (let j = 0; j < numberOfCards; j++) {
			this.cardsRefs.push(React.createRef());
			cards.push(this.renderCard("card-"+j, j, j, pairId[j]));
		}

		this.state = {
			cards: cards,
			exposedCards: 0
		};

	}

	saveId(pairid, id) {
		switch(this.state.exposedCards) {
			case 0:
				this.clickedCardPairId[0] = pairid;
				this.clickedCardId[0] = id;
				break;

			case 1:
				this.clickedCardPairId[1] = pairid;
				this.clickedCardId[1] = id;
				break;

			default:
				this.clickedCardPairId[0] = null;
				this.clickedCardPairId[1] = null;
				this.clickedCardId[0] = null;
				this.clickedCardId[1] = null;
				break;
		}
	}

	checkIfFound() {
		if (this.clickedCardPairId[0] === this.clickedCardPairId[1] && this.clickedCardPairId[1] !== null && this.clickedCardPairId[0] !== null && this.clickedCardId[0] !== this.clickedCardId[1]) {
			let cards = [numberOfCards];
			let j = 0;
			while(j < this.state.cards.length) {
				cards[j] = this.state.cards[j];
				j++;
			}

			let i = 0;
			let counter = 0;
			while(i < cards.length) {
				if (cards[i] !== null && cards[i].props.pairId === this.clickedCardPairId[1]) {
					cards[i] = null;
				}
				if (cards[i] === null)
					counter++;
				i++;
			}

			if (counter === numberOfCards) {
				alert("You have found all pairs! Nice job :-)");
				document.location.href = "https://mateusz-styrna.pl/";
			}

			this.setState({
				exposedCards: 0,
				cards: cards
			});

			this.clickedCardPairId[0] = null;
			this.clickedCardPairId[1] = null;
			this.clickedCardId[0] = null;
			this.clickedCardId[1] = null;
		}
		else
		{
			if (this.clickedCardId[0] === this.clickedCardId[1]) {
				this.setState({
					exposedCards: 0
				});

				this.clickedCardPairId[0] = null;
				this.clickedCardPairId[1] = null;
				this.clickedCardId[0] = null;
				this.clickedCardId[1] = null;
			}
		}
	}

	exposeCard() {
		this.setState({
				exposedCards: this.state.exposedCards + 1,
			}, 
			() => {
				if (this.state.exposedCards > 2) {
					this.setState({
							exposedCards: 0,
						}, 
						() => {
							for(let i = 0; i < this.cardsRefs.length; i++) {
								if (this.cardsRefs[i].current !== null) {
									this.cardsRefs[i].current.hide();
								}
							}
						}
					);
				}
			}
		);
	}

	renderCard(id, key, y, pairId) {
		return <Card id={id} key={key} checkIfFound={this.checkIfFound} exposeCard={this.exposeCard} ref={this.cardsRefs[y]} saveId={this.saveId} pairId={pairId} />;
	}

	render() {
		return(
			<div className="board">
				{this.state.cards}
			</div>
		);
	}
}

ReactDOM.render(
	<Board />,
	document.getElementById('root')
);