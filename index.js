class Listener {
  Listen(names, target, identifier = 'default') {
    const self = this;
    if (!self['listener_state']) {
      self['listener_state'] = {};
    }
    let nameArray = [];
    if (names && typeof names !== 'object') {
      nameArray.push(names);
    } else {
      nameArray = names;
    }
    for (const name of nameArray) {
      if (self[name] === null) {
        throw `Listen error: ${name}`;
      }
      if (!self['listener_state'][name]) {
        self['listener_state'][name] = {};
        let tmp = self[name];
        switch (typeof self[name]) {
          case 'object': {
              if (self[name].constructor.name && self[name].constructor.name.toString()  === 'Array') {
                var eventify = (arr, callback) => {
                  arr.push = (val) => {
                      Array.prototype.push.call(arr, val);
                      callback();
                  };
                };
                eventify(self[name], () => {
                  self.Say(name, true);
                });
              }
            }
            break;
          default: {
            Object.defineProperty(self, name, {
              get: () => {
                return self[`listener_internal_${name}`];
              },
              set: (val) => {
                self[`listener_internal_${name}`] = val;
                self.Say(name);
              },
            });
            self[name] = tmp;
          }
        }
      }
      if (!self['listener_state'][name][identifier]) {
        self['listener_state'][name][identifier] = [];
      }
      self['listener_state'][name][identifier].push(target);
    }
  }

  Say(name, force = false) {
    const self = this;
    if (!self['listener_state']) {
      self['listener_state'] = {};
    }
    const val = self[name];
    if (self['listener_state'][name]) {
      for (const identifiers in self['listener_state'][name]) {
        for (const listener in self['listener_state'][name][identifiers]) {
          if ()
          self['listener_state'][name][identifiers][listener][name] = val;
          if (force && typeof self['listener_state'][name][identifiers][listener].$forceUpdate === 'function') {
            self['listener_state'][name][identifiers][listener].$forceUpdate();
          }
        }
      }
    }
  }

  Forget(name, identifier = 'default') {
    const self = this;
    if (self['listener_state'][name] && self['listener_state'][name][identifier]) {
      self['listener_state'][name][identifier] = [];
    }
  }
}

/**
 * Module exports.
 * @public
 */

module.exports = Listener
