## ONIFY
### Futuristic Event Handler Registry


----------


By futuristic I mean it doesn't work on old browsers and can't be transpiled so only use this if your target platforms all support [Proxies](http://caniuse.com/#feat=proxy).

### Usage

    import onify from 'onify'
	
	onify(element)
	
	// Register
	element.on.mousedown = e=>console.log(`That was easy`)
	
	// Clear
	element.on.mousedown = null

#### Namespaces

Use namespaces just as easily.

	element.on.spaced.mouseup = e=>console.log(`I'm namespaced!`)
	
Use as many as you want.

	element.on.name.spaced.mouseup = e=>console.log(`I'm very namespaced!`)

#### Clearing
Setting a handler to a falsy value will clear that handler. But, you can also clear everything with the clear function.

	// Clear everything in the "name" namespace and deeper
	element.on.name.clear()
	
	// Clear everything on the whole element
	element.on.clear()