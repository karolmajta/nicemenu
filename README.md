

# Laserfocus Menu README

## Development and installation instructions

### node & npm

This project is a standard nodejs application, which means standard stack
`npm` based stack can be used to set it up and run it.

There is `.nvmrc` so you can do:

```shell script
$ nvm use
```

to automatically select an appropriate `node`/`npm` versions.

### Preparation

To install the dependencies it is sufficient to just do:

```shell script
$ npm install
```

## Building

### Building the application

```shell script
$ npm run build
```

will give you an application that you can host on any static file
server.

Will build the documentation you are now reading.

## Running in development

### Application development

To start a development server run:

```shell script
$ npm run start
```

This will start a development server with livereload and all the bells and
whistles at **http://localhost:8080**.

### Running the tests

Tests can be run with:

```shell script
$ npm run test
```

### Auxiliary scripts

To format the code with `prettier` run:

```shell script
$ npm run format
```

To check the code with `eslint` run:

```shell script
$ npm run lint
``` 

## FAQ

Answers to [Architecture Challenge #2](https://www.notion.so/Architecture-Challenge-2-dd8a3376788b49fe99840714ae9d75cf):

### UI

- > Control Grouping and Sorting
  
  Grouping and sorting is done just by providing groups/items in props
  in correct order. Sort order when searching is now undefined but this
  is easy to fix.

- > Optionally show an Icon
  
  Done.

- > Show A header that contains values from (e.g. Name) from the selected Context
  
  Done.

- > show Shortcut (if available)
  
  Done.

### Flow

- > Actions depending "Focused Context"
  
  This can be achieved using the "submenus" prop. You can create/navigate
  multiple submenus (contexts). Which submenus/context are present is decided
  when creating `Menu` component, so user can use it in any context(s) they
  wish.

- > Actions can have Subactions + Show Subactions only when filtering 
  
  Done. Subactions are basically stored in submenus. All matching subactions
  (disregarding the level of submenu nesting) are shown when searching. For
  simplicity actions (items) with `goto` prop set are not shown where searching
  (a.k.a. actions toggling submenus are not present when search is active).

### Triggering Actions 

- > Individual Actions should also be executable on a button
  
  This is actuall a werid one... I don't know how `Menu` should be in any
  way involved in triggering an action from a button that's just somewhere
  in a page (that's what the video shows). Of course you can have some higher
  level action dispatch mechanism (mobx or redux), but this has nothing to
  do with the `Menu` itself and `Menu` should be unaware of it.

- > Individual Actions should also be executable via shortcut
  
  This is implemented for `Menu`, when `Menu` is shown, but the video
  shows keyboard actions used when hovering over a list item. Just like in
  the answer above, `Menu` shall not be involved in that. In fact, `Menu`
  is not even in the dom at the time this happens... You need some other
  abstraction to handle this (mobx, redux or just a top-level React component).
   

 