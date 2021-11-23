# Exercise #1 &ndash; Pervasive Computing

About WoT web thing design

## Smart Coffee Machine

We want to develop an interoperable smart coffee machine (smart-cm) for the Campus, as a WoT Thing. The machine has no
physical UI, it can be used only via app (smartphone or whatever device). It provides an API for users and for
maintainers. In this exercise we focus on users.

Given a specific smart coffee machine (identified in some way), a user with a smartphone should be able to get a
coffee (or a tea, or one of the products available from the specific machine), with the specified options (e.g. sugar
level), as well as check the availability or state the machine, and the current availability of products as well.

The idea is that in the Campus there could be smart coffee machines produced by different vendors but having a shared
smart coffee machine Thing Description, so that they can be used by any app working with that TD.

Given this scenario, then:

- Think about an abstract model of the smart coffee machine with essential capabilities to implement the use case above,
  and define a Thing Description based on the WoT model. An Open API perspective should be adopted, so that the smart
  coffee machine web thing should provide a minimal API focused on its capabilities.
- Design and develop a simplified prototype implementation of the smart-cm web thing (using the software stack that you
  prefer and mocks up where needed) and a basic user app (mobile or desktop) allowing users to interact with a smart-cm,
  to do test/demo.

REMARKS

- In the abstract model and the prototype implementation as well, you may abstract from the payment aspect.
  Nevertheless, think about how your approach could be extended in order to integrate existing API based payment
  services (e.g. [stripe](https://stripe.com), [stripe API](https://stripe.com/docs/api))
- For any other aspects not defined in the text, you can make reasonable assumptions.