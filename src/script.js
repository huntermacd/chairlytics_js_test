function aggregate(resources) {
  resources.sort((a, b) => {
    return a.order > b.order ? 1 : a.order < b.order ? -1 : 0;
  });

  let converted = resources.map((resource) => {
    if (resource.type === 'Person') {
      return {
        type: 'Person',
        order: resource.order,
        people: [resource.name]
      };
    }
    return resource;
  });

  let merged = [];
  let persons = [];

  converted.forEach((curr, i, arr) => {
    let next = arr[i + 1];

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

const resources = [{
        type: 'Person',
        order: 1,
        name: 'Brian',
      }, {
        type: 'Place',
        order: 2,
        name: 'Ohio',
      }, {
        type: 'Place',
        order: 12,
        name: 'Ohio',
      }, {
        type: 'Person',
        order: 14,
        name: 'Sarah',
      },  {
        type: 'Person',
        order: 199,
        name: 'Sam',
      }, {
        type: 'Person',
        order: 19,
        name: 'Eric',
      }, {
        type: 'Place',
        order: 20,
        name: 'Home',
      }
    ];

let aggregated = aggregate(resources);

const root = document.getElementById('root');

for (let r of aggregated) {
  // create elements
  let container = document.createElement('div');
  let orderDisplay = document.createElement('div');
  let icon = document.createElement('i');
  let typeDisplay = document.createElement('div');
  let nameDisplay = document.createElement('div');
  let names = document.createElement('ul');

  // add classes
  container.classList.add('container');
  icon.classList.add('fa');

  if (r.type === 'Person') {
    container.classList.add('person');
    r.people.length > 1 ? icon.classList.add('fa-users') : icon.classList.add('fa-user');
  } else {
    container.classList.add('place');
    icon.classList.add('fa-globe');
  }

  // create text nodes
  let orderText = document.createTextNode(r.order);

  if (r.name !== undefined) {
    let nameText = document.createTextNode(r.name);
    let item = document.createElement('li');
    item.appendChild(nameText);
    names.appendChild(item);
  } else {
    for (let name of r.people) {
      let nameText = document.createTextNode(name);
      let item = document.createElement('li');
      item.appendChild(nameText);
      names.appendChild(item);
    }
  }

  // add text nodes
  orderDisplay.appendChild(orderText);

  // append children
  nameDisplay.appendChild(names);
  typeDisplay.appendChild(icon);
  container.appendChild(orderDisplay);
  container.appendChild(typeDisplay);
  container.appendChild(nameDisplay);

  // add to page
  root.appendChild(container);
}
