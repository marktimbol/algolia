const React = require('react');
const ReactDOM = require('react-dom');
const algoliasearch = require('algoliasearch');

var client;
var index;

var Search = React.createClass({
	getInitialState() {
		return {
			searchKey: '',
			results: null
		}
	},

	componentDidMount() {
		client = algoliasearch("CU6OGKCO5Z", '51b794f5a668ed95177f5a90986eff84');
		index = client.initIndex('getstarted_actors');

		$('.typeahead')
			.typeahead(null, {
				source: index.ttAdapter(),
				displayKey: 'name',
			})
			.on('typeahead:select', function(e, suggestion) {
				this.setState({
					searchKey: suggestion.name
				});
			}.bind(this));

		index.search('', null, function(error, result) {
		  this.setState({results: result.hits});
		}.bind(this), { hitsPerPage: 10, page: 0 });			
	},

	searchContacts(e) {
		var searchKey = e.target.value;
		this.setState({ searchKey });

		index.search(searchKey, null, function(error, result) {
		  this.setState({results: result.hits});
		}.bind(this), { hitsPerPage: 10, page: 0 });		
	},

	render() {

		if( this.state.results !== null )
		{		
			var results = this.state.results.map(function(result, index) {
				return (
					<div key={index}>
						{result.name}
					</div>	
				)
			});
		}

		return (
			<div>
				<input type="text" 
					className="form-control typeahead" 
					placeholder="Search contact" 
					onChange={this.searchContacts} />

				<div className="results">
				</div>
			</div>	
		)	
	}
});

ReactDOM.render(
	<Search />,
	document.getElementById('Search')
);