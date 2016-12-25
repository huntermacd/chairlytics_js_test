'use strict';

function aggregate(resources) {
  resources.sort(function (a, b) {
    return a.order > b.order ? 1 : a.order < b.order ? -1 : 0;
  });

  var converted = resources.map(function (resource) {
    if (resource.type === 'Person') {
      return {
        type: 'Person',
        order: resource.order,
        people: [resource.name]
      };
    }
    return resource;
  });

  var merged = [];
  var persons = [];

  converted.forEach(function (curr, i, arr) {
    var next = arr[i + 1];

    if (curr.type === 'Person') {
      persons.push(curr);
    } else {
      merged.push(curr);
      return;
    }

    if (persons.length > 1) {
      persons[1].people = persons[0].people.concat(persons[1].people);
      persons.shift();
    }

    if (next !== undefined) {
      if (next.type !== 'Person') {
        merged.push(persons[0]);
        persons.length = 0;
      }
    } else {
      merged.push(persons[0]);
    }
  });

  return merged;
}

var resources = [{
  type: 'Person',
  order: 1,
  name: 'Brian'
}, {
  type: 'Place',
  order: 2,
  name: 'Ohio'
}, {
  type: 'Place',
  order: 12,
  name: 'Ohio'
}, {
  type: 'Person',
  order: 14,
  name: 'Sarah'
}, {
  type: 'Person',
  order: 199,
  name: 'Sam'
}, {
  type: 'Person',
  order: 19,
  name: 'Eric'
}, {
  type: 'Place',
  order: 20,
  name: 'Home'
}];

var aggregated = aggregate(resources);

var root = document.getElementById('root');

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = aggregated[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var r = _step.value;

    // create elements
    var container = document.createElement('div');
    var orderDisplay = document.createElement('div');
    var dataDisplay = document.createElement('div');
    var typeDisplay = document.createElement('div');
    var nameDisplay = document.createElement('div');
    var names = document.createElement('ul');

    // add classes
    container.classList.add('container');
    orderDisplay.classList.add('order');
    dataDisplay.classList.add('data');
    typeDisplay.classList.add('type');
    nameDisplay.classList.add('name');

    // create text nodes
    var orderText = document.createTextNode(r.order);
    var typeText = document.createTextNode(r.type);

    if (r.name !== undefined) {
      var nameText = document.createTextNode(r.name);
      var item = document.createElement('li');
      item.appendChild(nameText);
      names.appendChild(item);
    } else {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = r.people[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var name = _step2.value;

          var _nameText = document.createTextNode(name);
          var _item = document.createElement('li');
          _item.appendChild(_nameText);
          names.appendChild(_item);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }

    // add text nodes
    orderDisplay.appendChild(orderText);
    typeDisplay.appendChild(typeText);

    // append children
    nameDisplay.appendChild(names);
    dataDisplay.appendChild(typeDisplay);
    dataDisplay.appendChild(nameDisplay);
    container.appendChild(orderDisplay);
    container.appendChild(dataDisplay);

    // add to page
    root.appendChild(container);
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}