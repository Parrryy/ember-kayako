# ember-kayako

Adds the Kayako messenger to your app.

## Installation

```
ember install ember-kayako
```

## Configuration

```javascript
// config/environment.js

ENV['kayako'] = {
  subdomain:      "foo", // required
  defaultName:    "Your App's Name",
  welcomeMessage: "How can we help?"
};
```

## Service

The addon installs a `kayako` service which you can use to interact with the messenger:

First inject the `kayako` service into your component/route/controller:

```javascript
export default Ember.Component.extend({
  kayako: Ember.inject.service(),
});
```

Once that's injected you can show/hide the messenger:

```javascript
// show the messenger
this.get('kayako').show();

// hide the messenger
this.get('kayako').hide();
```
