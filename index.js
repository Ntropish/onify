export default function onify(element) {
  'use strict'

  if (element.on) return false

  let root = new Proxy(element, ProxyHandler())
  element.on = root
  return true

  function ProxyHandler(namespace = []) {
    let $handlers = {}
    let $namespaces = {}
    return { 
      get(el, prop) {
        let space = namespace.reduce((p,c)=>p[c], root)
        
        // Provide a function to remove all event handlers
        if (prop === `clear`) {
          return function clearNamespace(handlers = Object.keys($handlers)) {

            if (typeof handlers === `string`) handlers = [handlers]

            Object.keys($namespaces).forEach(namespace=>{
              $namespaces[namespace].clear(handlers)
            })

            handlers.forEach(name=>{
              let handler = $handlers[name]
            
              el.removeEventListener(name, handler)
            })
          }
        }

        if (prop === `$handlers`) {
          return $handlers
        }

        // Return the Proxy in the desired namespace and make it if needed
        if (!$namespaces[prop]) {
          $namespaces[prop] = new Proxy(el, ProxyHandler(namespace.concat(prop))) 
        }
        return $namespaces[prop]
      },

      set(el, prop, value) {
        let space = namespace.reduce((p,c)=>p[c], root)

        // Clear handler if setting to falsy
        if (!prop) {
          el.removeEventListener(prop, space.$handlers[prop])
          delete space.$handlers[prop]
          return true
        }

        // Only one handler of each event type per namespace
        if (space.$handlers[prop]) {
          el.removeEventListener(prop, space.$handlers[prop])
        }

        el.addEventListener(prop, value)

        space.$handlers[prop] = value
        return true
      }

    }
  }
}