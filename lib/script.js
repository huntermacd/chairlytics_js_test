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

    if (next !== undefined && next.type !== 'Person') {
      merged.push(persons[0]);
      persons.length = 0;
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

console.log(aggregate(resources));