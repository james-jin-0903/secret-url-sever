# secret_client

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# Introduction
Implement a secret server. The secret server can be used to store and share secrets using a random generated URL. But the secret can be read only a limited number of times after that it will expire and won’t be available. The secret may have a TTL (Time to live). After the expiration time the secret won’t be available anymore.

# Task
Implement the Secret Server API, with NodeJS + express.js framework on the backend + MongoDb (you can use any additonal library). Store the data using encryption. Provide tests for the backend.

Build a minimal, but functional frontend in VueJS with the ability to create and view secrets (if the hash is known)


# API
**URL** : `/api/secret/[hash]`

**Method** : `GET`

**Auth required** : NO

**Response**

```json
{
  "hash": "[The hash of the string]",
  "secretText": "[The original text]",
  "createdAt": "[The Timestamp the secret was created]",
  "expiresAt": "[The Timestamp the secret if TTL is given]",
  "remainingViews": 0
}
```

**URL** : `/api/secret/`

**Method** : `POST`

**Auth required** : NO

**POST /secret**

```json
{
    "secret": "[This text that will be saved as a secret]",
    "expireAfterViews": "[The secret won't be available after the given number of views]",
    "expireAfter": "[The secret won't be available after the given time. The value is provided in minutes. 0 means never expires]"
}
```

**Response** : Same as `/api/secret/[hash]`


