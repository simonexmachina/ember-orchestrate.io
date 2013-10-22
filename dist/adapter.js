/*
ember-orchestrate.io
https://github.com/simonwade/ember-orchestrate.io

Copyright (c) 2013
Licensed under the MIT license.
*/


(function() {
  DS.OrchestrateIOAdapter = DS.RESTAdapter.extend(Ember.Evented, {
    apiKey: null,
    host: 'http://api.orchestrate.io',
    namespace: 'v0',
    defaultSerializer: '_oio',
    findAll: function(store, type, sinceToken) {
      return this.findQuery(store, type, '*');
    },
    findMany: function(store, type, ids) {
      var id, params, _i, _len;
      if (ids.length === 0) {
        return Ember.RSVP.resolve([]);
      }
      params = new Array(ids.length);
      for (_i = 0, _len = ids.length; _i < _len; _i++) {
        id = ids[_i];
        params.push("_id:" + id);
      }
      return this._query(store, type, params);
    },
    findQuery: function(store, type, query) {
      var params, property, value;
      params = [];
      if (typeof query === 'string') {
        params = [query];
      } else {
        for (property in query) {
          value = query[property];
          if (value === null) {
            value = "NOT *";
          } else if (value === "") {
            value = "''";
          }
          params.push("" + property + ":" + value);
        }
      }
      return this._query(store, type, params);
    },
    _query: function(store, type, params) {
      return this.ajax(this.buildURL(type.typeKey), 'GET', {
        data: {
          query: params.join(' ')
        }
      });
    },
    createRecord: function(store, type, record) {
      var data, serializer;
      data = {};
      serializer = store.serializerFor(type.typeKey);
      serializer.serializeIntoHash(data, type, record, {
        includeId: true
      });
      return this.ajax(this.buildURL(type.typeKey, record.id), "PUT", {
        data: data
      });
    },
    ajaxOptions: function(url, type, options) {
      if (!options) {
        options = {};
      }
      options.username = this.apiKey;
      return this._super(url, type, options);
    },
    generateIdForRecord: function(store, type, record) {
      return Math.random().toString(32).substr(2, 7);
    }
  });

  DS.OrchestrateIOSerializer = DS.RESTSerializer.extend({
    serialize: function(record, options) {
      if (!options) {
        options = {};
      }
      options.includeId = true;
      return this._super(record, options);
    },
    extractSingle: function(store, primaryType, payload, recordId, requestType) {
      var payloadForSuper, results;
      results = payload;
      payloadForSuper = {};
      payloadForSuper[primaryType.typeKey] = results[primaryType.typeKey];
      return this._super(store, primaryType, payloadForSuper, recordId, requestType);
    },
    extractArray: function(store, primaryType, payload) {
      var payloadForSuper, result, results, _i, _len, _ref;
      results = [];
      _ref = payload.results;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        result = _ref[_i];
        if (result.value[primaryType.typeKey]) {
          results.push(result.value[primaryType.typeKey]);
        }
      }
      payloadForSuper = {};
      payloadForSuper[primaryType.typeKey] = results;
      return this._super(store, primaryType, payloadForSuper);
    }
  });

  Ember.onLoad('Ember.Application', function(Application) {
    return Application.initializer({
      name: "orchestrateIOAdapter",
      initialize: function(container, application) {
        application.register('serializer:_oio', DS.OrchestrateIOSerializer);
        return application.register('adapter:_oio', DS.OrchestrateIOAdapter);
      }
    });
  });

}).call(this);
