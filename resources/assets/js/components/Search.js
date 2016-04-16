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
		index = client.initIndex('dev_ALSBEEF_Burgers');

		$('.typeahead')
			.typeahead({
				minLength: 1,
				highlight: true,
			}, {
				name: 'burgers',
				source: index.ttAdapter(),
				displayKey: 'name',
				templates: {
					suggestion: function(hit) {
						var imagePath = hit.image_path;
						return (
							'<div class="Media">' +
								'<div class="Media__figure">' +
									'<img src="'+imagePath+'" class="img-responsive" alt="" title="" />' +
								'</div>' +

								'<div class="Media__content">' +
									'<h3 class="Media__heading">' + hit._highlightResult.name.value + '</h3>' +
									'<address>' +
										'<p>' +
											hit.email +
										'</p>' +

										'<p>' +
											hit.phone +
										'</p>' +										
									'</address>' +
								'</div>' +
							'</div>' 
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
			<div className="col-md-6">
				<div className="form-group">
					<input type="text"
						className="form-control typeahead" 
						placeholder="Search contact"
						onChange={this.handleChange} />
				</div>

				<div className="form-group">
					<button onClick={this.searchContacts} className="btn btn-default">
						<i className="fa fa-search"></i> Find them all
					</button>
				</div>

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