# Ember Data Adapter for [Orchestrate.io](http://orchestrate.io)

A very basic adapter for using Orchestrate.io with Ember Data. It's written in 
CoffeeScript cos that's how I roll. Bring on the flame wars, whatever.

If you want to kick the tyres then clone the repo and:

```
npm install
bower install
grunt example
```

Then go to [http://localhost:8000/](http://localhost:8000/) in your browser.

## Getting Started

Install the module with: `bower install ember-orchestrate.io` and then plug it
in like so:

```javascript
App.ApplicationAdapter = DS.OrchestrateIOAdapter.extend({
  apiKey: '{{YOUR API KEY}}'
});
```

At the moment CORS is not supported at `api.orchestrate.io` so you'll need to
use a HTTP proxy. See `example-server.coffee` for a simple example.

If you're using an HTTP proxy then you'll want to specify the host:

```javascript
App.ApplicationAdapter = DS.OrchestrateIOAdapter.extend({
  apiKey: '{{YOUR API KEY}}',
  host: null // uses the originating server
});
```

## Documentation

_(Coming soon)_, if you're in need of some then [let me know](http://twitter.com/simonwade).

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

_(Nothing yet)_

## Todo

- All the tests (it's late!)
- See if we can support live updates
- Everything else

## License
Copyright (c) 2013 Simon Wade. Licensed under the MIT license.
