# API documentation

## POST /api/signup

### Success

**Body:**
```json
{
  "name": "user",
  "email": "user@example.com",
  "password": "secret123",
}
```

**Response:**

Status: 201

```json
{
    "message": "User created successfully. Please log in."
}
```

### Failure

**Body:**
```json
{
  "name": "user",
  "email": "notanemail",
  "password": "secret123",
}
```

**Response:**

Status: 400
```json
{
    "message": "Invalid email address."
}
```

## POST /api/login

### Success

**Body:**
```json
{
  "email": "user@example.com",
  "password": "secret123",
  "remember": true
}
```

**Response:**

Status: 200

```json
{
  "message": "Login successful",
  "user": {
    "name": "User Name",
    "email": "user@example.com"
  }
}
```

Important: save session cookie for re-use

If using Postman, under the 'Test' tab of the login request, store cookie like so:
```javascript
let cookies = pm.response.headers.get('set-cookie');
pm.environment.set("sessionCookie", cookies);
```

### Failure

**Body:**
```json
{
  "email": "userexample.com",
  "password": "secret123",
  "remember": true
}
```

**Response:**

Status: 401
```json
{
    "error": "No user with that email"
}
```

## POST /api/logout

### Success

**Body:**
none

**Headers:**
include session cookie

If using Postman, navigate to the 'Headers' tab and add:
Key: `Cookie`
Value: `{{sessionCookie}}`

**Response:**

Status: 200

```json
{
    "message": "Logged out successfully"
}
```

## GET /api/me

### Success

**Body:**
none

**Headers:**
include session cookie

If using Postman, navigate to the 'Headers' tab and add:

Key: `Cookie`
Value: `{{sessionCookie}}`

**Response:**

Status: 200

```json
{
    "authenticated": true,
    "user": {
        "name": "Tina",
        "email": "tina@fakemail.com"
    }
}
```

## DELETE /api/deleteMe

### Success

**Body:**
none

**Headers:**
include session cookie

If using Postman, navigate to the 'Headers' tab and add:

Key: `Cookie`
Value: `{{sessionCookie}}`

**Response:**

Status: 200

```json
{
    "message": "Account deleted and logged out successfully."
}
```