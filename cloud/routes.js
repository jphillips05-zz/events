module.exports = function(app) {

	var path				   = require('path');
	var parse 				 = require('parse').Parse;

	app.get('/public/states.js', function(req, res){
		res.sendFile('states.js', { root: path.join(__dirname, '../public') });	
	});

	app.get('/public/app.js', function(req, res){
		res.sendFile('app.js', { root: path.join(__dirname, '../public') });
	});

	app.get('/', function(req, res){
	  res.sendFile('index.html', { root: path.join(__dirname, '../public') });
	});

	app.post('/api/event', function(res, req){
		
    parse.initialize(process.env.applicationId, process.env.javascriptId);

		var e = req.req.body;
		var Events = parse.Object.extend('events');
		var event = new Events();

		event.set('EventCategory', e.category);
	  event.set('EventCity', e.city);
		event.set('EventContact', e.contact);
		event.set('EventDate2', e.startDate.length > 0 ? new Date(e.startDate) : undefined);
		event.set('EventEnd', e.endDate.length > 0 ? new Date(e.endDate) : undefined);
		event.set('EventDescription', e.description);
		event.set('EventLocation', e.location);
		event.set('EventName', e.name);
		event.set('EventOrganizer', e.organizer);
		event.set('EventPrice', e.price.length > 0 && isFinite(e.price) ? parseInt(e.price) : 0);
		event.set('EventState', e.state.abbreviation);
		event.set('EventTickets', e.tickets);
		event.set('EventWebsite', e.website);

		event.save().then(
			function(data) {
				res.res.json({success: true});
			}, 
			function(error){
				res.res.json({error: error});
			});
	});
};