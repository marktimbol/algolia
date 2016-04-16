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
			.typeahead({
				minLength: 2,
				highlight: true,
			}, {
				source: index.ttAdapter(),
				displayKey: 'name',
				templates: {
					suggestion: function(hit) {
						return (
							'<div><p>' + hit._highlightResult.name.value + '</p></div>'
						)
					}
				}
			})
			.on('typeahead:select', function(e, suggestion) {
				this.setState({
					searchKey: suggestion.name
				});
			}.bind(this));	
	},

	handleChange(e) {
		this.setState({ searchKey: e.target.value });
	},

	searchContacts() {
		index.search(this.state.searchKey, null, function(error, result) {
		  this.setState({results: result.hits});
		}.bind(this), { hitsPerPage: 10, page: 0 });		
	},

	render() {

		if( this.state.results !== null )
		{		
			var results = this.state.results.map(function(result, index) {
				return (
					<div key={index}>
						<h3>{result.name}</h3>
					</div>	
				)
			});
		}

		return (
			<div>
				<input type="text" 
					className="form-control typeahead" 
					placeholder="Search contact"
					onChange={this.handleChange} />
					&nbsp;
				<button onClick={this.searchContacts} className="btn btn-default">Search</button>

				<div className="results">
					{results}
				</div>
			</div>	
		)	
	}
});

ReactDOM.render(
	<Search />,
	document.getElementById('Search')
);