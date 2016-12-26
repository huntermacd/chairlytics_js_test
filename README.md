# Chartlytics Javascript Exercise

This is my solution to Chairlytics' JavaScript exercise. I opted to keep this project as stripped-down as possible. Beyond using Babel for ES-next transpilation, I utilized no other imported modules. The UI will respond to changes in the `resources` dataset and flexbox and Font Awesome were used to clean up the display of the information. For example, if only one person is grouped in a `Person` type, a single user icon will show. Otherwise, a group of users icon will show. The original outline for the exercise is shown in full below.

## Description

An important corporation is implementing a complex list, you are given a list of resources which can vary by type. There is a natural ordering of these resources determined by the field `order`. To simplify our list, we want to aggregate adjacent (as according to their ordering by `order`) resources with a type of `Person` into one single resource, with a collection of the `name`'s in a new field `people`. The aggregate resources should have an `order` equal to the ~~smallest~~ **largest** `order` within the group.

## Goals

1. Write a function which maps the `INPUT Data` to the `OUTPUT data`, as given below

2. Implement a **simple** user interface which displays the `OUTPUT data` in a way you think makes sense.

## Rules

Use your preferred style of javascript, as long as it is stage 3 or beyond in the TC39 proposal process: https://github.com/tc39/proposals

Implement the frontend in anyway you see fit.

Feel free to submit the project in anyway you see fit.

## INPUT Data

```
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
`      },  {
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
```

## OUTPUT Data

```
[
  {
    "type": "Person",
    "order": 1,
    "people": [
      "Brian"
    ]
  },
  {
    "type": "Place",
    "order": 2,
    "name": "Ohio"
  },
  {
    "type": "Place",
    "order": 12,
    "name": "Ohio"
  },
  {
    "type": "Person",
    "order": 19,
    "people": [
      "Sarah",
      "Eric"
    ]
  },
  {
    "type": "Place",
    "order": 20,
    "name": "Home"
  },
  {
    "type": "Person",
    "order": 199,
    "people": [
      "Sam"
    ]
  }
]
```

#### Note

The reason `Sarah` and `Eric` are grouped as they are is as follows:

 There is no `resource` of `type` `Place` which has an `order` between `Sarah`'s `order` and `Eric`'s `order`, so they get grouped into one cohesive `resource`.

The function should work for any set of `Person` and `Place` `resource`'s
